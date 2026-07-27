/**
 * ISMS Global Edu — Main JavaScript
 * Version: 1.0.0
 *
 * Modules:
 * 1. Sticky header / scroll handler
 * 2. Mobile nav drawer
 * 3. FAQ accordion
 * 4. Success stories carousel
 * 5. Counselling form — validation + states
 * 6. Journey step animation (IntersectionObserver)
 * 7. Stat counter animation
 * 8. Smooth scroll for anchors
 */

"use strict";

/* ─── Utility ───────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─── 1. Sticky Header ───────────────────────── */
(function initStickyHeader() {
  const header = $('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── 2. Mobile Nav Drawer ───────────────────── */
(function initMobileNav() {
  const toggle = $('.header__menu-toggle');
  const mobileNav = $('.mobile-nav');
  const backdrop = $('.mobile-nav__backdrop');
  const closeBtn = $('.mobile-nav__close');

  if (!toggle || !mobileNav) return;

  function openNav() {
    mobileNav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeNav() {
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    isOpen ? closeNav() : openNav();
  });

  backdrop && backdrop.addEventListener('click', closeNav);
  closeBtn && closeBtn.addEventListener('click', closeNav);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeNav();
  });

  // Close on nav link click
  $$('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', closeNav);
  });
})();

/* ─── 3. FAQ Accordion ───────────────────────── */
(function initFaq() {
  const items = $$('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = $('.faq-question', item);
    const answer = $('.faq-answer', item);

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(other => {
        other.classList.remove('open');
        const otherBtn = $('.faq-question', other);
        otherBtn && otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
})();

/* ─── 4. Success Stories Carousel ───────────── */
(function initCarousel() {
  const carousel = $('.success-carousel');
  if (!carousel) return;

  const track = $('.success-track', carousel);
  const cards = $$('.success-card', carousel);
  const prevBtn = $('.carousel-btn--prev', carousel.parentElement || document);
  const nextBtn = $('.carousel-btn--next', carousel.parentElement || document);
  const dotsContainer = $('.carousel-dots', carousel.parentElement || document);

  if (!track || !cards.length) return;

  let currentIndex = 0;
  let visibleCount = getVisibleCount();
  let totalSlides = Math.ceil(cards.length / visibleCount);
  let autoplayInterval = null;

  function getVisibleCount() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    $$('.carousel-dot', dotsContainer).forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    const cardWidth = cards[0].offsetWidth + 24; // gap = 24px
    track.style.transform = `translateX(-${currentIndex * visibleCount * cardWidth}px)`;
    updateDots();
    updateBtns();
  }

  function updateBtns() {
    prevBtn && (prevBtn.disabled = currentIndex === 0);
    nextBtn && (nextBtn.disabled = currentIndex >= totalSlides - 1);
  }

  prevBtn && prevBtn.addEventListener('click', () => {
    goTo(currentIndex - 1);
    stopAutoplay();
  });

  nextBtn && nextBtn.addEventListener('click', () => {
    goTo(currentIndex + 1);
    stopAutoplay();
  });

  // Keyboard support
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goTo(currentIndex - 1); stopAutoplay(); }
    if (e.key === 'ArrowRight') { goTo(currentIndex + 1); stopAutoplay(); }
  });

  // Auto-pause on hover/focus
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);

  // Recalculate on resize
  window.addEventListener('resize', () => {
    visibleCount = getVisibleCount();
    totalSlides = Math.ceil(cards.length / visibleCount);
    currentIndex = 0;
    track.style.transform = 'translateX(0)';
    buildDots();
    updateBtns();
  }, { passive: true });

  buildDots();
  updateBtns();
})();

/* ─── 5. Counselling Form ────────────────────── */
(function initCounsellingForm() {
  const form = $('#counselling-form');
  if (!form) return;

  const formContent = form;
  const successState = $('#form-success');
  const errorState = $('#form-error');
  const submitBtn = $('#form-submit');

  const validators = {
    fullName: (v) => v.trim().length >= 2 ? '' : 'Please enter your full name.',
    mobile: (v) => /^\d{6,15}$/.test(v.replace(/\s/g, '')) ? '' : 'Please enter a valid mobile number.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    city: (v) => v.trim().length >= 2 ? '' : 'Please enter your city.',
    destination: (v) => v !== '' ? '' : 'Please select a preferred destination.',
    studyLevel: (v) => v !== '' ? '' : 'Please select a study level.',
    consentTerms: (v) => v ? '' : 'You must agree to our terms to proceed.',
    consentContact: (v) => v ? '' : 'Please consent to being contacted.',
  };

  function validateField(input) {
    const name = input.name || input.id;
    const validator = validators[name];
    if (!validator) return true;

    const value = input.type === 'checkbox' ? input.checked : input.value;
    const errorMsg = validator(value);
    const errorEl = document.getElementById(`${name}-error`);

    input.classList.toggle('error', !!errorMsg);

    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.toggle('visible', !!errorMsg);
    }

    return !errorMsg;
  }

  // Live validation on blur
  $$('input, select, textarea', form).forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('change', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? 'Submitting…' : 'Book Free Counselling';
    if (loading) submitBtn.classList.add('loading');
    else submitBtn.classList.remove('loading');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const inputs = $$('input, select, textarea', form);
    const valid = inputs.map(validateField).every(Boolean);

    if (!valid) {
      const firstError = $('[class~="error"]', form) || $('.form-field__error.visible', form);
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);

    // Simulate form submission (replace with real endpoint in production)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production: replace with real API call
    // const response = await fetch('/api/counselling', { method: 'POST', body: new FormData(form) });
    // if (!response.ok) throw new Error('Network error');

    setLoading(false);
    formContent.style.display = 'none';
    successState && (successState.style.display = '');
    successState && successState.classList.add('visible');
  });

  const resetBtn = $('#form-reset');
  resetBtn && resetBtn.addEventListener('click', () => {
    form.reset();
    formContent.style.display = '';
    successState && successState.classList.remove('visible');
    successState && (successState.style.display = 'none');
    $$('.form-field__error', form).forEach(el => el.classList.remove('visible'));
    $$('.error', form).forEach(el => el.classList.remove('error'));
  });
})();

/* ─── 6. Journey Step Intersection Animation ─── */
(function initJourneyAnimation() {
  const steps = $$('.journey-step');
  if (!steps.length || !('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  steps.forEach(step => obs.observe(step));
})();

/* ─── 7. Stat Counter Animation ─────────────── */
(function initStatCounters() {
  const stats = $$('[data-count]');
  if (!stats.length || !('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = el.getAttribute('data-count');
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';

      // Only animate numeric targets
      const numTarget = parseInt(target.replace(/,/g, ''), 10);
      if (isNaN(numTarget)) {
        el.textContent = prefix + target + suffix;
        obs.unobserve(el);
        return;
      }

      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(eased * numTarget);
        el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => obs.observe(el));
})();

/* ─── 8. Smooth Scroll ───────────────────────── */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ─── 9. Finder Form (Hero) ──────────────────── */
(function initFinderForm() {
  const finderForm = $('#finder-form');
  if (!finderForm) return;

  finderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = finderForm.querySelector('[name="subject"]').value;
    const destination = finderForm.querySelector('[name="finderDestination"]').value;
    const level = finderForm.querySelector('[name="studyLevel"]').value;

    // Scroll to counselling form and pre-fill if possible
    const counsellingSection = document.getElementById('counselling');
    if (counsellingSection) {
      counsellingSection.scrollIntoView({ behavior: 'smooth' });

      // Pre-fill destination and level
      const destField = document.getElementById('destination');
      const levelField = document.getElementById('studyLevel');
      if (destField && destination) destField.value = destination;
      if (levelField && level) levelField.value = level;
    }
  });
})();
