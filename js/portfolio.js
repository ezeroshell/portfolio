/**
 * portfolio.js — рендер, модалка, галерея, типы работ
 */
(function () {
  'use strict';

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  const projects = DATA.projects || [];
  const assets   = DATA.assets   || [];

  const grid        = document.getElementById('portfolio-grid');
  const modal       = document.getElementById('portfolio-modal');
  const modalPage   = document.getElementById('portfolio-modal-page');
  const pmodHeader  = document.getElementById('pmod-header');
  const pmodTabs    = document.getElementById('pmod-tabs');
  const pmodContent = document.getElementById('pmod-content');
  const pmodDetails = document.getElementById('pmod-details');
  const pmodLink    = document.getElementById('pmod-project-link');
  const modalClose  = document.getElementById('modal-close');
  const modalPrev   = document.getElementById('modal-prev');
  const modalNext   = document.getElementById('modal-next');
  const modalCount  = document.getElementById('modal-counter');
  const backToExp   = document.getElementById('back-to-exp');

  const galleryEl    = document.getElementById('gallery');
  const galleryStage = document.getElementById('gallery-stage');
  const galleryCap   = document.getElementById('gallery-caption');
  const galleryCnt   = document.getElementById('gallery-counter');
  const galleryClose = document.getElementById('gallery-close');
  const galleryPrev  = document.getElementById('gallery-prev');
  const galleryNext  = document.getElementById('gallery-next');

  let currentView   = 'projects';
  let activeIdx     = -1;
  let galleryImages = [];
  let galleryIdx    = 0;
  let openedFromExp = false;

  const EXP_MAP = {
    'exp-1': 'various-cases',
    'exp-2': 'indie-vertical-slice',
    'exp-3': 'mmo-systems',
    'exp-4': 'mmo-systems',
    'exp-5': 'mmo-systems',
  };

  const TYPE_META = {
    images:     { label: 'Изображения',  icon: 'IMG' },
    docs:       { label: 'Документация', icon: 'DOC' },
    sheets:     { label: 'Таблицы',      icon: 'TAB' },
    videos:     { label: 'Видео',        icon: 'VID' },
    prototypes: { label: 'Прототипы',    icon: 'PRO' },
    other:      { label: 'Другое',       icon: '···' },
  };

  const TAB_ORDER = ['docs', 'sheets', 'images', 'videos', 'prototypes', 'other'];

  // ── Helpers ──────────────────────────────────
  function initials(s) {
    const w = s.split(/\s+/);
    return w.length >= 2 ? (w[0][0] + w[1][0]).toUpperCase() : s.substring(0,2).toUpperCase();
  }

  function plural(n, a, b, c) {
    const m = n % 10, h = n % 100;
    if (h >= 11 && h <= 19) return c;
    if (m === 1) return a;
    if (m >= 2 && m <= 4) return b;
    return c;
  }

  // ── GRID ─────────────────────────────────────
  function renderGrid() {
    if (!grid) return;
    grid.innerHTML = '';
    currentView === 'projects' ? renderCaseCards() : renderTypeCards();
  }

  function renderCaseCards() {
    projects.forEach((p, idx) => {
      const pa   = assets.filter(a => a.projectId === p.id);
      const imgs = pa.filter(a => a.type === 'images');
      const first = imgs[0];

      // Skip placeholder projects with no assets
      const hasAnyAssets = pa.length > 0;

      const card = document.createElement('div');
      card.className = 'pcard' + (hasAnyAssets ? '' : ' pcard--placeholder');
      card.tabIndex = 0;
      card.setAttribute('role', 'button');

      let previewHTML;
      if (first) {
        previewHTML = `<div class="pcard-preview"><img src="${first.thumb}" alt="" loading="lazy">${imgs.length > 1 ? `<span class="pcard-preview-count">${imgs.length} фото</span>` : ''}</div>`;
      } else {
        previewHTML = `<div class="pcard-preview pcard-preview-empty"><span class="pcard-preview-icon">${initials(p.title)}</span></div>`;
      }

      // Count by type
      const counts = {};
      pa.forEach(a => { counts[a.type] = (counts[a.type] || 0) + 1; });

      card.innerHTML = `
        ${previewHTML}
        <div class="pcard-body">
          <div class="pcard-period">${p.period}</div>
          <h3 class="pcard-title">${p.title}</h3>
          <p class="pcard-sub">${p.subtitle}</p>
          <div class="pcard-tags">${p.tags.slice(0,5).map(t => `<span class="pcard-tag">${t}</span>`).join('')}</div>
          <div class="pcard-meta">
            ${Object.entries(counts).map(([type, n]) => `<span class="pcard-meta-item">${TYPE_META[type]?.icon || type} ${n}</span>`).join('')}
            ${!hasAnyAssets ? '<span class="pcard-meta-item pcard-meta-item--soon">Скоро</span>' : ''}
          </div>
        </div>
      `;

      const open = () => openModal(idx);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }});
      grid.appendChild(card);
    });
  }

  function renderTypeCards() {
    const grouped = {};
    assets.forEach(a => { if (!grouped[a.type]) grouped[a.type] = []; grouped[a.type].push(a); });

    TAB_ORDER.forEach(type => {
      const items = grouped[type];
      if (!items?.length) return;
      const meta  = TYPE_META[type];
      const first = items.find(a => a.thumb) || null;

      const card = document.createElement('div');
      card.className = 'pcard pcard-type';
      card.tabIndex  = 0;
      card.setAttribute('role', 'button');

      card.innerHTML = `
        ${first
          ? `<div class="pcard-preview"><img src="${first.thumb}" alt="" loading="lazy"></div>`
          : `<div class="pcard-preview pcard-preview-icon-box"><span class="pcard-preview-icon">${meta.icon}</span></div>`}
        <div class="pcard-body">
          <h3 class="pcard-title">${meta.label}</h3>
          <p class="pcard-sub">${items.length} ${plural(items.length, 'материал', 'материала', 'материалов')}</p>
          <div class="pcard-meta">
            ${[...new Set(items.map(a => a.projectId))].map(pid => {
              const pr = projects.find(pp => pp.id === pid);
              return pr ? `<span class="pcard-meta-item">${pr.title}</span>` : '';
            }).join('')}
          </div>
        </div>
      `;

      const open = () => openTypeView(type);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }});
      grid.appendChild(card);
    });
  }

  // ── MODAL ────────────────────────────────────
  function openModal(idx, fromExp) {
    if (idx < 0 || idx >= projects.length) return;
    activeIdx = idx;
    openedFromExp = !!fromExp;

    document.body.style.overflow = 'hidden';
    modal.hidden = false;
    updateModalNav();
    fillProject(projects[idx]);
    modalPage.scrollTop = 0;

    if (openedFromExp && backToExp) backToExp.hidden = false;
    if (window.XP) XP.add(10, modal, 'portfolio-open-' + projects[idx].id);
  }

  function fillProject(p) {
    const pa     = assets.filter(a => a.projectId === p.id);
    const images = pa.filter(a => a.type === 'images');
    const first  = images[0];

    pmodHeader.innerHTML = `
      <div class="pm-head">
        ${first ? `
          <div class="pm-head-img" id="pm-cover-btn" tabindex="0" role="button">
            <img src="${first.thumb}" alt="">
            <div class="pm-head-img-overlay">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
              ${images.length > 1 ? images.length + ' фото' : 'Увеличить'}
            </div>
          </div>` : ''}
        <div class="pm-head-text">
          <span class="pm-period">${p.period}</span>
          <h2 class="pm-title">${p.title}</h2>
          <p class="pm-role">${p.role}</p>
          <div class="pm-tags">${p.tags.map(t => `<span class="pm-tag">${t}</span>`).join('')}</div>
        </div>
      </div>
      <p class="pm-summary">${p.summary}</p>
    `;

    const coverBtn = document.getElementById('pm-cover-btn');
    if (coverBtn && images.length) {
      const open = () => openGallery(images, 0);
      coverBtn.addEventListener('click', open);
      coverBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }});
    }

    const groups    = {};
    pa.forEach(a => { if (!groups[a.type]) groups[a.type] = []; groups[a.type].push(a); });
    const available = TAB_ORDER.filter(t => groups[t]?.length);

    if (!available.length) {
      pmodTabs.innerHTML    = '';
      pmodContent.innerHTML = '<p class="pm-empty">Материалы можно обсудить на интервью.</p>';
    } else {
      pmodTabs.innerHTML = available.map((type, i) => {
        const m = TYPE_META[type];
        return `<button class="pm-tab${i === 0 ? ' active' : ''}" data-tab="${type}" type="button">${m.label}<span class="pm-tab-n">${groups[type].length}</span></button>`;
      }).join('');

      fillTab(groups[available[0]], available[0]);

      pmodTabs.querySelectorAll('.pm-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          pmodTabs.querySelectorAll('.pm-tab').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          fillTab(groups[btn.dataset.tab], btn.dataset.tab);
        });
      });
    }

    pmodDetails.innerHTML = `
      <div class="pm-section"><h4 class="pm-section-h">Что делал</h4><ul class="pm-list">${p.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul></div>
      <div class="pm-section"><h4 class="pm-section-h">Результат</h4><ul class="pm-list">${p.results.map(r => `<li>${r}</li>`).join('')}</ul></div>
    `;

    if (pmodLink) {
      pmodLink.innerHTML = p.link
        ? `<a href="${p.link}" class="pm-ext-link" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Открыть проект</a>`
        : '';
    }
  }

  function fillTab(list, type) {
    if (!pmodContent) return;

    if (type === 'images') {
      pmodContent.innerHTML = `<div class="pm-gallery-grid">${list.map((a, i) =>
        `<div class="pm-gal-item" data-gi="${i}" tabindex="0" role="button"><img src="${a.thumb}" alt="${a.title}" loading="lazy"><div class="pm-gal-label">${a.title}</div></div>`
      ).join('')}</div>`;

      pmodContent.querySelectorAll('[data-gi]').forEach(el => {
        const open = () => openGallery(list, parseInt(el.dataset.gi, 10));
        el.addEventListener('click', open);
        el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }});
      });

    } else if (type === 'videos') {
      pmodContent.innerHTML = `<div class="pm-doc-list">${list.map(a => {
        const isYT = a.url && (a.url.includes('youtube') || a.url.includes('youtu.be'));
        return `<div class="pm-doc-item">
          <div class="pm-doc-marker">▶</div>
          <div class="pm-doc-body">
            <div class="pm-doc-title">${a.title}</div>
            <div class="pm-doc-desc">${a.desc}</div>
            ${a.url ? `<a href="${a.url}" class="pm-asset-link" target="_blank" rel="noopener">${isYT ? 'Смотреть на YouTube' : 'Открыть видео'} →</a>` : ''}
          </div>
        </div>`;
      }).join('')}</div>`;

    } else if (type === 'prototypes') {
      pmodContent.innerHTML = `<div class="pm-doc-list">${list.map(a =>
        `<div class="pm-doc-item">
          <div class="pm-doc-marker">⬡</div>
          <div class="pm-doc-body">
            <div class="pm-doc-title">${a.title}</div>
            <div class="pm-doc-desc">${a.desc}</div>
            ${a.url ? `<a href="${a.url}" class="pm-asset-link pm-asset-link--play" target="_blank" rel="noopener">▶ Играть</a>` : ''}
          </div>
        </div>`
      ).join('')}</div>`;

    } else {
      pmodContent.innerHTML = `<div class="pm-doc-list">${list.map(a =>
        `<div class="pm-doc-item">
          <div class="pm-doc-marker">${TYPE_META[a.type]?.icon || '—'}</div>
          <div class="pm-doc-body">
            <div class="pm-doc-title">${a.title}</div>
            <div class="pm-doc-desc">${a.desc}</div>
            ${a.url ? `<a href="${a.url}" class="pm-asset-link" target="_blank" rel="noopener">Открыть →</a>` : ''}
          </div>
        </div>`
      ).join('')}</div>`;
    }
  }

  // ── TYPE VIEW ────────────────────────────────
  function openTypeView(type) {
    activeIdx = -1;
    const items = assets.filter(a => a.type === type);
    const meta  = TYPE_META[type];

    document.body.style.overflow = 'hidden';
    modal.hidden = false;

    if (modalPrev) { modalPrev.style.visibility = ''; modalPrev.disabled = true; }
    if (modalNext) { modalNext.style.visibility = ''; modalNext.disabled = true; }
    if (modalCount) modalCount.textContent = meta.label;

    pmodHeader.innerHTML  = `<h2 class="pm-title">${meta.label}</h2>`;
    pmodTabs.innerHTML    = '';
    pmodDetails.innerHTML = '';
    if (pmodLink) pmodLink.innerHTML = '';

    const byProj = {};
    items.forEach(a => {
      const pr = projects.find(pp => pp.id === a.projectId);
      const name = pr ? pr.title : 'Другое';
      if (!byProj[name]) byProj[name] = [];
      byProj[name].push(a);
    });

    let html = '';
    Object.entries(byProj).forEach(([projName, list]) => {
      html += `<h4 class="pm-section-h" style="margin-top:16px;margin-bottom:10px">${projName}</h4>`;
      if (type === 'images') {
        html += `<div class="pm-gallery-grid">${list.map((a, i) =>
          `<div class="pm-gal-item" data-tv-proj="${projName}" data-tv-idx="${i}" tabindex="0" role="button"><img src="${a.thumb}" alt="${a.title}" loading="lazy"><div class="pm-gal-label">${a.title}</div></div>`
        ).join('')}</div>`;
      } else {
        html += `<div class="pm-doc-list">${list.map(a =>
          `<div class="pm-doc-item"><div class="pm-doc-marker">${meta.icon}</div><div class="pm-doc-body"><div class="pm-doc-title">${a.title}</div><div class="pm-doc-desc">${a.desc}</div>${a.url ? `<a href="${a.url}" class="pm-asset-link" target="_blank" rel="noopener">Открыть →</a>` : ''}</div></div>`
        ).join('')}</div>`;
      }
    });

    pmodContent.innerHTML = html;

    if (type === 'images') {
      Object.entries(byProj).forEach(([projName, list]) => {
        pmodContent.querySelectorAll(`[data-tv-proj="${projName}"]`).forEach(el => {
          const open = () => openGallery(list, parseInt(el.dataset.tvIdx, 10));
          el.addEventListener('click', open);
          el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }});
        });
      });
    }

    modalPage.scrollTop = 0;
  }

  // ── MODAL NAV ────────────────────────────────
  function updateModalNav() {
    if (!modalCount) return;
    modalCount.textContent = projects[activeIdx]?.title || '';
    if (modalPrev) { modalPrev.style.visibility = ''; modalPrev.disabled = activeIdx <= 0; }
    if (modalNext) { modalNext.style.visibility = ''; modalNext.disabled = activeIdx >= projects.length - 1; }
  }

  function closeModal() {
    activeIdx = -1;
    modal.hidden = true;
    document.body.style.overflow = '';
    openedFromExp = false;
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  if (modalPrev) modalPrev.addEventListener('click', () => { if (activeIdx > 0) openModal(activeIdx - 1); });
  if (modalNext) modalNext.addEventListener('click', () => { if (activeIdx < projects.length - 1) openModal(activeIdx + 1); });

  document.addEventListener('keydown', e => {
    if (!modal || modal.hidden) return;
    if (galleryEl && !galleryEl.hidden) return;
    if (e.key === 'Escape')     { closeModal(); return; }
    if (e.key === 'ArrowLeft'  && activeIdx > 0) openModal(activeIdx - 1);
    if (e.key === 'ArrowRight' && activeIdx < projects.length - 1) openModal(activeIdx + 1);
  });

  if (backToExp) backToExp.addEventListener('click', () => {
    closeModal();
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  });

  // ── GALLERY ──────────────────────────────────
  function openGallery(images, startIdx) {
    galleryImages = images;
    galleryIdx = startIdx;
    galleryEl.hidden = false;
    renderGallerySlide();
    galleryClose?.focus();
  }

  function closeGallery() {
    galleryEl.hidden = true;
    galleryImages = [];
  }

  function renderGallerySlide() {
    const img = galleryImages[galleryIdx];
    if (!img) return;
    galleryStage.innerHTML = `<img src="${img.url || img.thumb}" alt="${img.title}" class="gallery-image" draggable="false">`;
    galleryCap.innerHTML = `<strong>${img.title}</strong>${img.desc ? `<span>${img.desc}</span>` : ''}`;
    galleryCnt.textContent = `${galleryIdx + 1} / ${galleryImages.length}`;
    if (galleryPrev) galleryPrev.disabled = galleryIdx <= 0;
    if (galleryNext) galleryNext.disabled = galleryIdx >= galleryImages.length - 1;
  }

  if (galleryClose) galleryClose.addEventListener('click', closeGallery);
  if (galleryEl) galleryEl.addEventListener('click', e => { if (e.target === galleryEl) closeGallery(); });
  if (galleryPrev) galleryPrev.addEventListener('click', () => { if (galleryIdx > 0) { galleryIdx--; renderGallerySlide(); }});
  if (galleryNext) galleryNext.addEventListener('click', () => { if (galleryIdx < galleryImages.length - 1) { galleryIdx++; renderGallerySlide(); }});

  let touchX = 0;
  if (galleryEl) {
    galleryEl.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    galleryEl.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) < 40) return;
      if (dx < 0 && galleryIdx < galleryImages.length - 1) { galleryIdx++; renderGallerySlide(); }
      if (dx > 0 && galleryIdx > 0) { galleryIdx--; renderGallerySlide(); }
    }, { passive: true });
  }

  document.addEventListener('keydown', e => {
    if (!galleryEl || galleryEl.hidden) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft' && galleryIdx > 0) { galleryIdx--; renderGallerySlide(); }
    if (e.key === 'ArrowRight' && galleryIdx < galleryImages.length - 1) { galleryIdx++; renderGallerySlide(); }
  });

  // ── MODE SWITCH ──────────────────────────────
  document.querySelectorAll('.portfolio-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.portfolio-mode-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentView = btn.dataset.view;
      renderGrid();
    });
  });

  // ── EXPERIENCE → MODAL (без скролла) ────────
  document.querySelectorAll('[data-open-project]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const projectId = btn.dataset.openProject;
      const idx = projects.findIndex(p => p.id === projectId);
      if (idx !== -1) openModal(idx, true);
    });
  });

  // Legacy links
  document.querySelectorAll('.exp-link[data-jump-tab]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const tab = link.dataset.jumpTab;
      const projectId = EXP_MAP[link.dataset.jumpExp];
      if (!projectId) return;
      const idx = projects.findIndex(p => p.id === projectId);
      if (idx === -1) return;
      openModal(idx, true);
      setTimeout(() => { pmodTabs.querySelector(`[data-tab="${tab}"]`)?.click(); }, 180);
    });
  });

  document.querySelectorAll('.exp-link[data-jump-project]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const idx = projects.findIndex(p => p.id === link.dataset.jumpProject);
      if (idx !== -1) openModal(idx, true);
    });
  });

  // ── INIT ─────────────────────────────────────
  function init() { renderGrid(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.PortfolioExplorer = { openModal, closeModal };
})();