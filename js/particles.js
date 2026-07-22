/**
 * particles.js — Ghost in the Shell
 * Равномерная сетка, объёмные секущие линии, интерактивные узлы
 */
(function initParticles() {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const PI2 = 6.2831853;

  const isMobile = window.innerWidth < 768;
  const isLowEnd = (navigator.hardwareConcurrency || 4) <= 2 ||
                   (navigator.deviceMemory || 8) <= 2;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const useHiDPI = !isMobile && !isLowEnd && dpr > 1;

  /* ═══════════════════════════════════════════
     ПАЛИТРА
     ═══════════════════════════════════════════ */
  const C = {
    grid:  [0, 170, 140],
    node:  [80, 220, 180],
    scan:  [0, 180, 140],
    // Линии — от дальних к ближним
    l0: [0, 100, 85],
    l1: [0, 135, 110],
    l2: [0, 170, 140],
    l3: [50, 210, 170],
  };

  /* ── Кэш RGBA ── */
  const _s = {};
  function rgba(c, a) {
    // Округляем alpha до сотых — меньше уникальных строк
    const ra = (a * 100 + 0.5) | 0;
    const k = c[0] * 1000000 + c[1] * 10000 + c[2] * 100 + ra;
    return _s[k] || (_s[k] = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (ra * 0.01) + ')');
  }
  function rgb(c) { return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')'; }

  /* ── Sin LUT ── */
  const SN = 1024;
  const SL = new Float32Array(SN);
  for (let i = 0; i < SN; i++) SL[i] = Math.sin(i / SN * PI2);
  function fsin(x) {
    const t = x * (SN / PI2);
    return SL[((t % SN) + SN) & (SN - 1)];
  }

  /* ═══════════════════════════════════════════
     КОНФИГ
     ═══════════════════════════════════════════ */
  const GRID_SP = isMobile ? 44 : 30;
  const GRID_A  = 0.045;
  const GRID_LW = 0.5;
  const GRID_PAR = 0.008;
  const GRID_DOT = 0.7;
  const GRID_DOT_A = 0.06;

  // Дыхание сцены
  const BREATHE_SPEED = 0.15;
  const BREATHE_AMP = 0.12;

  // Секущие линии — 4 слоя глубины
  const LL = [
    { n: isMobile ? 2 : 4, w: .3,  a: .025, spd: [3, 8],   c: C.l0, par: .003, dash: true },
    { n: isMobile ? 2 : 4, w: .6,  a: .04,  spd: [6, 15],  c: C.l1, par: .010, dash: true },
    { n: isMobile ? 1 : 3, w: 1.2, a: .07,  spd: [12, 30], c: C.l2, par: .025, dash: false },
    { n: isMobile ? 1 : 2, w: 2.0, a: .10,  spd: [20, 50], c: C.l3, par: .045, dash: false },
  ];

  // Сканлайн
  const SCAN = !isLowEnd;
  const SC_SPD = 50;
  const SC_W = 80;
  const SC_A = 0.04;
  const SC_WAIT = 8;

  // Курсорные узлы
  const NODE_R = 160;

  /* ═══════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════ */
  let W = 0, H = 0, W2 = 0, H2 = 0;
  let backLines = [];   // слои 0-1 (под всем)
  let frontLines = [];  // слои 2-3 (поверх)
  let mx, my, smx, smy;
  let raf = 0, vis = true, lastMs = 0, resizeT;
  let t = 0, lt = 0;

  let scanY = -SC_W, scanGo = false, scanCD = SC_WAIT * 0.4;

  let gridOC = null, scanOC = null;
  let gridDirty = true, scanDirty = true;

  /* ───────── resize ───────── */
  function resize() {
    if (useHiDPI) {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    } else {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    W2 = W * 0.5; H2 = H * 0.5;
    gridDirty = true;
    scanDirty = true;
  }

  /* ═══════════════════════════════════════════
     OFFSCREEN: Сетка (pattern-based)
     ═══════════════════════════════════════════ */
  function bakeGrid() {
    const sp = GRID_SP;
    const pad = 80;
    const gw = W + pad * 2;
    const gh = H + pad * 2;

    if (!gridOC) gridOC = document.createElement('canvas');
    gridOC.width = gw; gridOC.height = gh;

    const g = gridOC.getContext('2d');
    g.clearRect(0, 0, gw, gh);

    // Единая сетка
    g.strokeStyle = rgba(C.grid, GRID_A);
    g.lineWidth = GRID_LW;
    g.beginPath();
    for (let x = 0; x <= gw; x += sp) { g.moveTo(x, 0); g.lineTo(x, gh); }
    for (let y = 0; y <= gh; y += sp) { g.moveTo(0, y); g.lineTo(gw, y); }
    g.stroke();

    // Узловые точки
    g.fillStyle = rgba(C.grid, GRID_DOT_A);
    for (let x = 0; x <= gw; x += sp) {
      for (let y = 0; y <= gh; y += sp) {
        g.beginPath();
        g.arc(x, y, GRID_DOT, 0, PI2);
        g.fill();
      }
    }

    gridDirty = false;
  }

  /* ═══════════════════════════════════════════
     OFFSCREEN: Сканлайн-полоса
     Рисуем один раз, двигаем по Y через drawImage
     ═══════════════════════════════════════════ */
  function bakeScan() {
    const h = SC_W * 2;
    if (!scanOC) scanOC = document.createElement('canvas');
    scanOC.width = 1;   // 1px wide — растянем при отрисовке
    scanOC.height = h;

    const g = scanOC.getContext('2d');
    g.clearRect(0, 0, 1, h);

    const sc = C.scan;
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0,    rgba(sc, 0));
    grad.addColorStop(0.42, rgba(sc, SC_A));
    grad.addColorStop(0.48, rgba(sc, SC_A * 2.5));
    grad.addColorStop(0.52, rgba(sc, SC_A * 2.5));
    grad.addColorStop(0.58, rgba(sc, SC_A));
    grad.addColorStop(1,    rgba(sc, 0));

    g.fillStyle = grad;
    g.fillRect(0, 0, 1, h);

    scanDirty = false;
  }

  /* ═══════════════════════════════════════════
     BUILD: Линии
     ═══════════════════════════════════════════ */
  function buildLines() {
    backLines = [];
    frontLines = [];

    for (let li = 0; li < LL.length; li++) {
      const L = LL[li];
      const arr = li < 2 ? backLines : frontLines;
      for (let i = 0; i < L.n; i++) {
        arr.push(mkLine(L, li));
      }
    }
  }

  function mkLine(L, li) {
    const h = Math.random() > 0.5;
    const sp = L.spd[0] + Math.random() * (L.spd[1] - L.spd[0]);
    const d = Math.random() > 0.5 ? 1 : -1;
    const axMax = h ? W : H;
    const perpMax = h ? H : W;

    return {
      h: h,
      perp: Math.random() * perpMax,
      pos: d > 0 ? -60 : axMax + 60,
      spd: sp * d,
      w: L.w * (0.7 + Math.random() * 0.6),
      a: L.a * (0.6 + Math.random() * 0.8),
      c: L.c,
      par: L.par,
      li: li,
      ph: Math.random() * PI2,
      drift: (Math.random() - 0.5) * 0.8,
      wavePh: Math.random() * PI2,
      waveAmp: 0.3 + Math.random() * 0.5,
      dash: L.dash,
      // Sweep: серия точек вместо градиента
      sweepDots: 3 + Math.floor(Math.random() * 4),
      sweepSpan: 30 + L.w * 25,
    };
  }

  function respawn(l) {
    const L = LL[l.li];
    const n = mkLine(L, l.li);
    Object.assign(l, n);
  }

  /* ═══════════════════════════════════════════
     DRAW: Линии (один массив)
     ═══════════════════════════════════════════ */
  function drawLines(arr, dt, cx, cy, breathe, doMove) {
    for (let i = 0; i < arr.length; i++) {
      const l = arr[i];

      if (doMove) {
        l.pos += l.spd * dt;
        // Волнообразный дрейф
        l.perp += l.drift * dt + fsin(t * l.waveAmp + l.wavePh) * 0.15 * dt;

        // Bounds
        const axMax = l.h ? W : H;
        if ((l.spd > 0 && l.pos > axMax + 100) ||
            (l.spd < 0 && l.pos < -100)) {
          respawn(l);
          continue;
        }
      }

      const px = cx * l.par;
      const py = cy * l.par;

      const pulse = 0.7 + 0.3 * fsin(t * 0.4 + l.ph);
      const alpha = l.a * pulse * (1 + breathe * 0.5);
      if (alpha < 0.004) continue;

      // Координаты
      let perpCoord;
      if (l.h) {
        perpCoord = l.perp + py;
        if (perpCoord < -30 || perpCoord > H + 30) continue;
      } else {
        perpCoord = l.perp + px;
        if (perpCoord < -30 || perpCoord > W + 30) continue;
      }

      // Реакция на курсор — линии рядом с мышью чуть ярче
      let proxBoost = 0;
      if (!isMobile) {
        const perpMouse = l.h ? smy : smx;
        const dd = Math.abs(perpCoord - perpMouse);
        if (dd < 120) proxBoost = (1 - dd / 120) * 0.4;
      }

      const finalA = Math.min(alpha + proxBoost * l.a, 0.3);

      // Dash для дальних слоёв
      if (l.dash) {
        ctx.setLineDash([2, GRID_SP - 2]);
        ctx.lineDashOffset = -t * l.spd * 0.3;
      }

      // Основная линия
      ctx.lineWidth = l.w;
      ctx.strokeStyle = rgba(l.c, finalA);
      ctx.beginPath();
      if (l.h) {
        ctx.moveTo(-20, perpCoord);
        ctx.lineTo(W + 20, perpCoord);
      } else {
        ctx.moveTo(perpCoord, -20);
        ctx.lineTo(perpCoord, H + 20);
      }
      ctx.stroke();

      if (l.dash) {
        ctx.setLineDash([]);
      }

      // Sweep — серия точек вместо градиента
      const sweepX = l.h ? l.pos + px : perpCoord;
      const sweepY = l.h ? perpCoord : l.pos + py;

      if (sweepX > -80 && sweepX < W + 80 &&
          sweepY > -80 && sweepY < H + 80) {

        const dots = l.sweepDots;
        const span = l.sweepSpan;
        const sa = finalA * 2;

        ctx.fillStyle = rgb(l.c);

        for (let d = 0; d < dots; d++) {
          // Распределяем точки от головы к хвосту
          const frac = d / (dots - 1 || 1);
          const offset = (frac - 0.5) * span * 2;
          const dotA = sa * (1 - frac * 0.7);  // голова ярче, хвост тусклее
          const dotR = l.w * (1.8 - frac * 0.8);

          if (dotA < 0.005) continue;

          let dx, dy;
          if (l.h) {
            dx = sweepX - offset * Math.sign(l.spd);
            dy = sweepY;
          } else {
            dx = sweepX;
            dy = sweepY - offset * Math.sign(l.spd);
          }

          ctx.globalAlpha = dotA;
          ctx.beginPath();
          ctx.arc(dx, dy, dotR, 0, PI2);
          ctx.fill();
        }

        // Яркое ядро
        ctx.globalAlpha = sa * 0.6;
        ctx.beginPath();
        ctx.arc(sweepX, sweepY, l.w * 2.5, 0, PI2);
        ctx.fill();

        // Ореол для ближних
        if (l.li >= 2) {
          ctx.globalAlpha = sa * 0.08;
          ctx.beginPath();
          ctx.arc(sweepX, sweepY, l.w * 8, 0, PI2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }
    }
  }

  /* ═══════════════════════════════════════════
     DRAW: Курсорные узлы
     ═══════════════════════════════════════════ */
  function drawNodes(ox, oy, breathe) {
    if (isMobile) return;

    const sp = GRID_SP;
    const sxo = ox % sp;
    const syo = oy % sp;
    const r = NODE_R;
    const r2 = r * r;

    const c0 = Math.max(0, Math.floor((smx - r - sxo) / sp));
    const c1 = Math.ceil((smx + r - sxo) / sp);
    const r0 = Math.max(0, Math.floor((smy - r - syo) / sp));
    const r1 = Math.ceil((smy + r - syo) / sp);

    const nc = C.node;

    // Batch: один fillStyle, меняем только globalAlpha
    ctx.fillStyle = rgb(nc);

    for (let c = c0; c <= c1; c++) {
      const nx = c * sp + sxo;
      const ddx = nx - smx;
      const ddx2 = ddx * ddx;

      // Ранний отсев по X
      if (ddx2 > r2) continue;

      for (let ri = r0; ri <= r1; ri++) {
        const ny = ri * sp + syo;
        const ddy = ny - smy;
        const d2 = ddx2 + ddy * ddy;
        if (d2 > r2) continue;

        const prox = 1 - Math.sqrt(d2) / r;
        const p2 = prox * prox;
        const wave = 0.5 + 0.5 * fsin(t * 2.5 + nx * 0.08 + ny * 0.08);
        const a = p2 * wave * (0.22 + breathe * 0.1);
        if (a < 0.008) continue;

        const nr = 0.8 + p2 * 2.2;

        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(nx, ny, nr, 0, PI2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ═══════════════════════════════════════════
     DRAW: Сканлайн (из кэша)
     ═══════════════════════════════════════════ */
  function drawScan(dt) {
    if (!SCAN) return;

    if (!scanGo) {
      scanCD -= dt;
      if (scanCD <= 0) { scanGo = true; scanY = -SC_W; }
      return;
    }

    scanY += SC_SPD * dt;
    if (scanY > H + SC_W) {
      scanGo = false;
      scanCD = SC_WAIT + Math.random() * 4;
      return;
    }

    // Растягиваем 1px-wide полосу на всю ширину
    if (scanDirty) bakeScan();
    ctx.drawImage(scanOC, 0, 0, 1, SC_W * 2, 0, scanY - SC_W, W, SC_W * 2);

    // Тонкая яркая линия
    ctx.strokeStyle = rgba(C.scan, SC_A * 3);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(W, scanY);
    ctx.stroke();
  }

  /* ═══════════════════════════════════════════
     MAIN FRAME
     ═══════════════════════════════════════════ */
  function frame(ts) {
    if (!vis) return;

    if (!lt) lt = ts;
    const dt = Math.min((ts - lt) * 0.001, 0.1);
    lt = ts;
    t += dt;

    ctx.clearRect(0, 0, W, H);

    // Сглаживание мыши (framerate-independent)
    const e = dt * 5;  // ~0.083 при 60fps, линейная аппроксимация exp decay
    const ef = e > 1 ? 1 : e;
    smx += (mx - smx) * ef;
    smy += (my - smy) * ef;

    const cx = smx - W2;
    const cy = smy - H2;
    const gox = cx * GRID_PAR;
    const goy = cy * GRID_PAR;

    // Дыхание сцены
    const breathe = fsin(t * BREATHE_SPEED) * BREATHE_AMP;

    /*  Порядок слоёв:
        1  Сетка (offscreen)
        2  Дальние линии (пунктирные, тонкие)
        3  Курсорные узлы
        4  Сканлайн
        5  Ближние линии (сплошные, толстые)
    */

    // 1. Сетка
    if (gridDirty) bakeGrid();
    ctx.drawImage(gridOC, -80 + gox, -80 + goy);

    // 2. Дальние линии
    drawLines(backLines, dt, cx, cy, breathe, true);

    // 3. Узлы
    drawNodes(gox, goy, breathe);

    // 4. Скан
    drawScan(dt);

    // 5. Ближние линии
    drawLines(frontLines, dt, cx, cy, breathe, true);

    raf = requestAnimationFrame(frame);
  }

  /* ───────── Events ───────── */
  document.addEventListener('visibilitychange', () => {
    vis = !document.hidden;
    if (vis) { lt = 0; raf = requestAnimationFrame(frame); }
    else cancelAnimationFrame(raf);
  });

  document.addEventListener('mousemove', e => {
    const n = Date.now();
    if (n - lastMs < 32) return;
    lastMs = n;
    mx = e.clientX; my = e.clientY;
  }, { passive: true });

  if (isMobile && window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      if (e.gamma == null) return;
      mx = W2 + (e.gamma / 45) * W2;
      my = H2 + ((e.beta - 45) / 45) * H2;
    }, { passive: true });
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { resize(); buildLines(); }, 200);
  }, { passive: true });

  window.addEventListener('blur', () => {
    if (vis) { vis = false; cancelAnimationFrame(raf); }
  });
  window.addEventListener('focus', () => {
    if (!vis && !document.hidden) { vis = true; lt = 0; raf = requestAnimationFrame(frame); }
  });

  /* ───────── Init ───────── */
  resize();
  mx = W2; my = H2; smx = mx; smy = my;
  buildLines();
  raf = requestAnimationFrame(frame);
})();