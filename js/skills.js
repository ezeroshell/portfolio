/**
 * skills.js — попап для skill-tag и skill-node
 * Зависит от window.XP (xp-system.js грузится первым)
 */
(function initSkills() {
  'use strict';

  const popup     = document.getElementById('skill-popup');
  const titleEl   = document.getElementById('skill-popup-title');
  const descEl    = document.getElementById('skill-popup-desc');
  const closeBtn  = document.getElementById('skill-popup-close');

  if (!popup || !titleEl || !descEl) return;

  let activeEl = null;

  // ── Позиционирование ─────────────────────────────────
  function positionPopup(triggerEl) {
    const rect    = triggerEl.getBoundingClientRect();
    const popW    = 380;
    const popH    = popup.offsetHeight || 160;
    const vw      = window.innerWidth;
    const vh      = window.innerHeight;
    const scrollY = window.scrollY;

    // Горизонталь: центруем под триггером, не выходим за края
    let left = rect.left + rect.width / 2 - popW / 2;
    left = Math.max(12, Math.min(left, vw - popW - 12));

    // Вертикаль: снизу или сверху
    let top;
    if (rect.bottom + popH + 12 <= vh) {
      top = rect.bottom + scrollY + 10;
    } else {
      top = rect.top + scrollY - popH - 10;
    }

    popup.style.left = left + 'px';
    popup.style.top  = top  + 'px';
    // сбрасываем fixed → absolute для корректного scroll-поведения
    popup.style.position = 'absolute';
  }

  // ── Show / Hide ──────────────────────────────────────
  function show(triggerEl, title, desc) {
    activeEl = triggerEl;
    titleEl.textContent = title;
    descEl.textContent  = desc;
    popup.setAttribute('aria-hidden', 'false');
    // Показываем до позиционирования, чтобы offsetHeight был реальным
    popup.classList.add('visible');
    positionPopup(triggerEl);
  }

  function hide() {
    popup.classList.remove('visible');
    popup.setAttribute('aria-hidden', 'true');
    activeEl = null;
  }

  // ── Close button ─────────────────────────────────────
  if (closeBtn) closeBtn.addEventListener('click', hide);

  // ── Skill Tags ───────────────────────────────────────
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', e => {
      e.stopPropagation();

      if (activeEl === tag && popup.classList.contains('visible')) {
        hide(); return;
      }

      const isNew = !tag.classList.contains('explored');
      tag.classList.add('explored');
      show(tag, tag.textContent.trim(), tag.dataset.desc || '');

      if (isNew && window.XP) {
        XP.add(8, tag, 'skill-tag-' + (tag.dataset.skillId || tag.textContent.trim()));
      }
    });

    tag.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tag.click(); }
    });
  });

  // ── Skill Nodes ──────────────────────────────────────
  document.querySelectorAll('.skill-node').forEach(node => {
    node.addEventListener('click', e => {
      e.stopPropagation();

      if (activeEl === node && popup.classList.contains('visible')) {
        hide(); return;
      }

      const labelEl = node.querySelector('.skill-node-label');
      const title   = labelEl ? labelEl.textContent.trim() : '';
      const isNew   = !node.classList.contains('activated');
      node.classList.add('activated');
      show(node, title, node.dataset.desc || '');

      if (isNew && window.XP) {
        XP.add(10, node, 'skill-node-' + (node.dataset.skillId || title));
      }
    });

    node.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); node.click(); }
    });
  });

  // ── Закрытие по клику вне ────────────────────────────
  document.addEventListener('click', e => {
    if (!popup.contains(e.target) &&
        !e.target.closest('.skill-tag') &&
        !e.target.closest('.skill-node')) {
      hide();
    }
  });

  // ── Escape ───────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hide();
  });

  // ── Репозиция при ресайзе ────────────────────────────
  let rTimer;
  window.addEventListener('resize', () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(() => {
      if (activeEl && popup.classList.contains('visible')) positionPopup(activeEl);
    }, 120);
  }, { passive: true });

})();