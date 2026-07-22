/**
 * main.js — инициализация UI: глитч-имя, role-toggle,
 * мобильное меню, scroll-reveal, active nav, smooth scroll,
 * section XP, header scroll-state
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════════
     HELPERS
     ══════════════════════════════════════════ */
  const GLITCH_CHARS = 'アイウエオカキクケコ01█▓▒░#@%&';

  function glitchTo(el, target, speed, done) {
    let i = 0;
    const id = setInterval(() => {
      el.textContent = target.split('').map((ch, idx) =>
        idx < i ? target[idx]
                : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      ).join('');
      i += 0.6;
      if (i >= target.length) {
        el.textContent = target;
        clearInterval(id);
        if (done) done();
      }
    }, speed);
  }

  /* ══════════════════════════════════════════
     1. NAME GLITCH TOGGLE
     ══════════════════════════════════════════ */
  (function initNameGlitch() {
    const btn    = document.getElementById('header-name');
    if (!btn) return;
    const textEl = btn.querySelector('.toggle-text');
    if (!textEl) return;

    
    const REAL   = 'Igor Bakcheev';   
    const ALT    = 'ezeroshell';
    let isAlt    = false;
    let busy     = false;

    function toggle() {
      if (busy) return;
      busy = true;
      const target = isAlt ? REAL : ALT;
      isAlt = !isAlt;
      btn.classList.add('glitch-active');
      glitchTo(textEl, target, 32, () => {
        btn.classList.remove('glitch-active');
        busy = false;
      });
      if (window.XP) XP.add(5, btn, 'name-toggle');
    }

    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  })();

  /* ══════════════════════════════════════════
     2. ROLE TOGGLE
     ══════════════════════════════════════════ */
  (function initRoleToggle() {
    const btn = document.getElementById('role-toggle');
    if (!btn) return;
    const textEl = btn.querySelector('.toggle-text');
    if (!textEl) return;

    const ROLES = ['Ведущий', 'Системный', 'Level', 'Нарративный'];
    const EASTER_EGG    = 'Охуе...';
    const EASTER_REACT  = 'показалось..';

    let idx  = 0;
    let busy = false;

    function playEasterEgg() {
      busy = true;
      glitchTo(textEl, EASTER_EGG, 28, () => {
        setTimeout(() => {
          glitchTo(textEl, EASTER_REACT, 24, () => {
            setTimeout(() => {
              idx = 0;
              glitchTo(textEl, ROLES[0], 28, () => { busy = false; });
            }, 80);
          });
        }, 80);
      });
      if (window.XP) XP.add(20, btn, 'easter-egg');
    }

    function toggle() {
      if (busy) return;
      idx++;
      if (idx >= ROLES.length) { playEasterEgg(); return; }
      busy = true;
      glitchTo(textEl, ROLES[idx], 30, () => { busy = false; });
      if (window.XP) XP.add(4, btn, 'role-' + idx);
    }

    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  })();

  /* ══════════════════════════════════════════
     3. MOBILE MENU
     ══════════════════════════════════════════ */
  (function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const menu      = document.getElementById('mobile-menu');
    if (!toggleBtn || !menu) return;

    function openMenu() {
      menu.hidden = false;
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      
      const first = menu.querySelector('a, button');
      if (first) first.focus();
    }

    function closeMenu() {
      menu.hidden = true;
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function isOpen() { return !menu.hidden; }

    toggleBtn.addEventListener('click', () => isOpen() ? closeMenu() : openMenu());

    
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen()) {
        closeMenu();
        toggleBtn.focus();
      }
    });

    
    document.addEventListener('click', e => {
      if (isOpen() && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMenu();
      }
    });
  })();

  /* ══════════════════════════════════════════
     4. HEADER SCROLL STATE
     ══════════════════════════════════════════ */
  (function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;
    function update() {
      header.classList.toggle('scrolled', window.scrollY > 20);
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  })();

  /* ══════════════════════════════════════════
     5. SCROLL REVEAL
     ══════════════════════════════════════════ */
  (function initReveal() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('visible');

        if (el.classList.contains('reveal-stagger')) {
          Array.from(el.children).forEach((child, i) => {
            setTimeout(() => {
              child.style.opacity  = '1';
              child.style.transform = 'translateY(0)';
            }, i * 55);
          });
        }

        io.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
  })();

  /* ══════════════════════════════════════════
     6. ACTIVE NAV HIGHLIGHT
     ══════════════════════════════════════════ */
  (function initActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.header-nav a');
    if (!navLinks.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { threshold: 0.25, rootMargin: '-60px 0px -45% 0px' });

    sections.forEach(s => io.observe(s));
  })();

  /* ══════════════════════════════════════════
     7. SMOOTH SCROLL
     ══════════════════════════════════════════ */
  (function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 68;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  })();

  /* ══════════════════════════════════════════
     8. SECTION XP
     ══════════════════════════════════════════ */
  (function initSectionXP() {
    if (!window.XP) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id  = entry.target.id;
        const lbl = entry.target.querySelector('.section-label') || entry.target;
        XP.addSection(id, lbl);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.25 });

    document.querySelectorAll('section[id]').forEach(s => io.observe(s));
  })();

  /* ══════════════════════════════════════════
     9. EXPERIENCE ACCORDION
     ══════════════════════════════════════════ */
  (function initExpAccordion() {
    const timeline  = document.getElementById('exp-timeline');
    const expandBtn = document.getElementById('exp-expand-all');
    if (!timeline) return;

    const entries = timeline.querySelectorAll('.exp-entry');
    let allExpanded = false;

    
    entries.forEach(entry => {
      const toggleBtn = entry.querySelector('.exp-entry-toggle');
      const body      = entry.querySelector('.exp-body');
      if (!toggleBtn || !body) return;

      toggleBtn.addEventListener('click', () => {
        const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !isOpen);
        body.setAttribute('aria-hidden', isOpen);

        if (isOpen) {
          body.hidden = true;
        } else {
          body.hidden = false;
        }

        
        if (!isOpen && window.XP) {
          XP.add(5, toggleBtn, 'exp-expand-' + entry.dataset.expId);
        }
      });
    });

    
    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        allExpanded = !allExpanded;
        const label = expandBtn.querySelector('span');

        entries.forEach(entry => {
          const btn  = entry.querySelector('.exp-entry-toggle');
          const body = entry.querySelector('.exp-body');
          if (!btn || !body) return;

          btn.setAttribute('aria-expanded', allExpanded);
          body.setAttribute('aria-hidden', !allExpanded);
          body.hidden = !allExpanded;
        });

        if (label) {
          label.textContent = allExpanded ? 'Свернуть все позиции' : 'Показать все позиции';
        }
        expandBtn.classList.toggle('expanded', allExpanded);
      });
    }
  })();


})();