/* ─── ISMS Global Edu Services Core Script ─── */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordions();
  initSteppers();
  initStickyHeader();
});

// Sticky Header scroll background transitions
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
}

// Mobile Hamburger Navigation Drawer Toggling
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.header__nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('nav--open');
  });

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav--open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav--open');
    }
  });
}

// FAQ Accordion Interaction
function initAccordions() {
  const triggers = document.querySelectorAll('.faq-accordion__trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-accordion__item');
      const isActive = item.classList.contains('active');
      
      // Close all items
      document.querySelectorAll('.faq-accordion__item').forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Journey/Application Steppers Interaction
function initSteppers() {
  const headers = document.querySelectorAll('.stepper-node__header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const node = header.closest('.stepper-node');
      const isActive = node.classList.contains('active');
      
      // Close all steps
      document.querySelectorAll('.stepper-node').forEach(n => n.classList.remove('active'));
      
      if (!isActive) {
        node.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      } else {
        header.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
