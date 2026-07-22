/**
 * XP / Gamification System
 * Должен загружаться первым (остальные JS от него зависят)
 */

window.XP = (function () {
  'use strict';

  const MAX_LEVEL  = 10;
  const PER_LEVEL  = 80;   // снижено с 100 — теперь max достижим
  const STORAGE_KEY = 'ezeroshell-xp-v2';

  const LEVEL_MESSAGES = {
    2:  '▲ LVL 2 — Системы изучены',
    3:  '▲ LVL 3 — Доступ к прототипам',
    4:  '▲ LVL 4 — Player Journey открыт',
    5:  '▲ LVL 5 — Экспертный уровень',
    6:  '▲ LVL 6 — Глубокое погружение',
    7:  '▲ LVL 7 — Мастер систем',
    8:  '▲ LVL 8 — Гуру дизайна',
    9:  '▲ LVL 9 — Легенда',
    10: '★ MAX — Полная картина',
  };

  // ── State ──────────────────────────────────────────────
  let current  = 0;
  let level    = 1;
  let seen     = new Set();   // uniqueId для дедупликации
  let sections = new Set();   // посещённые секции
  let _lastPopupTs = 0;

  // ── Persistence ────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      current  = d.current  || 0;
      level    = d.level    || 1;
      seen     = new Set(d.seen     || []);
      sections = new Set(d.sections || []);
    } catch (_) { /* private mode или битые данные */ }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        current, level,
        seen:     [...seen],
        sections: [...sections],
      }));
    } catch (_) {}
  }

  // ── UI ─────────────────────────────────────────────────
  function updateUI() {
    const fill  = document.getElementById('xp-fill');
    const lvlEl = document.getElementById('xp-level');
    const bar   = document.querySelector('.xp-bar');

    if (!fill || !lvlEl) return;

    const pct = level >= MAX_LEVEL ? 100 : (current / PER_LEVEL) * 100;
    fill.style.width = Math.min(pct, 100) + '%';

    if (bar) bar.setAttribute('aria-valuenow', Math.round(pct));

    if (level >= MAX_LEVEL) {
      lvlEl.textContent = 'MAX';
      lvlEl.style.color = '#ffd700';
    } else {
      lvlEl.textContent = 'LVL ' + level;
      lvlEl.style.color = '';
    }
  }

  function showLevelUp() {
    const el = document.getElementById('level-notification');
    if (!el) return;
    el.textContent = LEVEL_MESSAGES[level] || ('▲ LVL ' + level);
    el.classList.add('visible');
    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(() => el.classList.remove('visible'), 3200);
  }

  function spawnPopup(sourceEl, amount) {
    const now = Date.now();
    if (now - _lastPopupTs < 280) return;   // дебаунс
    _lastPopupTs = now;

    const rect = sourceEl.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'xp-popup';
    el.textContent = '+' + amount + ' XP';
    el.setAttribute('aria-hidden', 'true');
    el.style.left = (rect.left + rect.width / 2 - 24) + 'px';
    el.style.top  = (rect.top + window.scrollY - 14) + 'px';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }

  // ── Core ───────────────────────────────────────────────
  function add(amount, sourceEl, uniqueId) {
    if (uniqueId && seen.has(uniqueId)) return;
    if (uniqueId) seen.add(uniqueId);
    if (level >= MAX_LEVEL) return;

    current += amount;

    if (sourceEl) spawnPopup(sourceEl, amount);

    // Level-up loop
    while (current >= PER_LEVEL && level < MAX_LEVEL) {
      current -= PER_LEVEL;
      level++;
      showLevelUp();
    }

    if (level >= MAX_LEVEL) current = PER_LEVEL;

    updateUI();
    save();
  }

  function addSection(id, labelEl) {
    if (sections.has(id)) return;
    sections.add(id);
    setTimeout(() => add(15, labelEl, 'section-' + id), 500);
  }

  // ── Init ───────────────────────────────────────────────
  function init() {
    load();
    // Ждём DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateUI);
    } else {
      updateUI();
    }
  }

  init();

  return { add, addSection };
})();