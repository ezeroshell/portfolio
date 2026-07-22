/**
 * particles.js — объёмная система частиц с depth, glow, пульсацией
 */
(function initParticles() {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const isMobile = window.innerWidth < 768;
  const isLowEnd = (navigator.hardwareConcurrency || 4) <= 2 ||
                   (navigator.deviceMemory        || 8) <= 2;

  const COUNT = isMobile ? 20 : isLowEnd ? 50 : 100;

  // 4 depth layers for volume
  const LAYERS = [
    { share: 0.30, speed: 0.06, sizeMin: 0.6, sizeMax: 1.0, par: 0.010, alpha: 0.12, color: [0,180,160] },
    { share: 0.25, speed: 0.12, sizeMin: 0.9, sizeMax: 1.6, par: 0.025, alpha: 0.20, color: [74,158,255] },
    { share: 0.25, speed: 0.20, sizeMin: 1.2, sizeMax: 2.2, par: 0.042, alpha: 0.28, color: [0,212,170] },
    { share: 0.20, speed: 0.30, sizeMin: 1.8, sizeMax: 3.2, par: 0.065, alpha: 0.38, color: [100,200,255] },
  ];

  let W = 0, H = 0;
  let particles = [];
  let mx = 0, my = 0;
  let raf = 0;
  let isVisible = true;
  let lastMouse = 0;
  let resizeTimer;
  let time = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function build() {
    particles = [];
    LAYERS.forEach((layer, layerIdx) => {
      const n = Math.round(COUNT * layer.share);
      for (let i = 0; i < n; i++) {
        const sz = layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin);
        particles.push({
          bx: Math.random() * W,
          by: Math.random() * H,
          vx: (Math.random() - 0.5) * layer.speed,
          vy: (Math.random() - 0.5) * layer.speed,
          r:  sz,
          baseR: sz,
          p:  layer.par,
          alpha: layer.alpha * (0.7 + Math.random() * 0.3),
          baseAlpha: layer.alpha,
          color: layer.color,
          layer: layerIdx,
          phase: Math.random() * Math.PI * 2,   // для пульсации
          pulseSpeed: 0.3 + Math.random() * 0.6,
          pulseAmp: 0.15 + Math.random() * 0.25,
        });
      }
    });

    // Sort by layer (back to front) for depth
    particles.sort((a, b) => a.layer - b.layer);
  }

  function frame() {
    if (!isVisible) return;

    time += 0.016;
    ctx.clearRect(0, 0, W, H);

    const cx = mx - W / 2;
    const cy = my - H / 2;

    for (let i = 0, len = particles.length; i < len; i++) {
      const p = particles[i];

      p.bx += p.vx;
      p.by += p.vy;

      // wrap
      if (p.bx < -12)      p.bx = W + 12;
      else if (p.bx > W + 12) p.bx = -12;
      if (p.by < -12)      p.by = H + 12;
      else if (p.by > H + 12) p.by = -12;

      const x = p.bx + cx * p.p;
      const y = p.by + cy * p.p;

      // Pulsating size and alpha
      const pulse = Math.sin(time * p.pulseSpeed + p.phase);
      const r = p.baseR * (1 + pulse * p.pulseAmp);
      const alpha = p.alpha * (0.85 + pulse * 0.15);

      // Glow for larger particles (front layers)
      if (p.layer >= 2 && r > 1.5) {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 3.5);
        grad.addColorStop(0, `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha * 0.4})`);
        grad.addColorStop(0.4, `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha * 0.12})`);
        grad.addColorStop(1, `rgba(${p.color[0]},${p.color[1]},${p.color[2]},0)`);
        ctx.beginPath();
        ctx.arc(x, y, r * 3.5, 0, 6.2832);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 6.2832);
      ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha})`;
      ctx.fill();
    }

    raf = requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible) frame();
    else cancelAnimationFrame(raf);
  });

  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastMouse < 50) return;
    lastMouse = now;
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  if (isMobile && window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      if (e.gamma == null) return;
      mx = W / 2 + (e.gamma / 45) * (W / 2);
      my = H / 2 + ((e.beta - 45) / 45) * (H / 2);
    }, { passive: true });
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); build(); }, 200);
  }, { passive: true });

  resize();
  build();
  frame();
})();