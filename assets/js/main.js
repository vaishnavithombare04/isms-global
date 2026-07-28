/**
 * ISMS Global Edu — Main JavaScript & Global Component Renderer
 * Version: 2.0.0
 *
 * Modules:
 * 0. Global Header, Utility Bar, Mobile Nav, & Footer Dynamic Component Renderer
 * 1. Sticky header / scroll handler
 * 2. Mobile nav drawer
 * 3. FAQ accordion
 * 4. Success stories carousel
 * 5. Counselling form — validation + states
 * 6. Journey step animation (IntersectionObserver)
 * 7. Stat counter animation
 * 8. Smooth scroll for anchors
 * 9. Finder Form (Hero)
 */

"use strict";

/* ─── Utility ───────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─── 0. Global Component Renderer ───────────── */
(function renderGlobalComponents() {
  // Determine if the current page is inside a subdirectory
  const pathLower = window.location.pathname.toLowerCase();
  const isUnderServices = pathLower.includes('/services/') || pathLower.split('/').includes('services');
  const prefix = isUnderServices ? '../' : '';

  // Determine current page filename
  const path = window.location.pathname;
  let currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  if (!currentPage.endsWith('.html') && currentPage !== 'index.html') {
    currentPage += '.html';
  }

  const isDestinationPage = currentPage.startsWith('study-');
  const isServicePage = isUnderServices || currentPage === 'personalized-counselling.html' || currentPage === 'pre-departure-support.html' || currentPage === 'application-support.html' || currentPage === 'visa-preparation.html' || currentPage === 'university-selection.html';

  // 1. Render Utility Bar & Header
  const headerWrapperHtml = `
  <div class="utility-bar" role="navigation" aria-label="Quick access links">
    <div class="container container--wide">
      <div class="utility-bar__inner">
        <p class="utility-bar__tagline">17 Years of Trusted Study Abroad Guidance &nbsp;·&nbsp; Free Counselling for Students</p>
        <nav class="utility-bar__links">
          <a href="${prefix}courses.html" aria-label="Browse available courses">Courses</a>
          <a href="${prefix}scholarships.html" aria-label="Explore scholarships">Scholarships</a>
          <a href="${prefix}universities.html" aria-label="Search universities">Universities</a>
          <a href="${prefix}index.html#events" aria-label="View upcoming events">Events</a>
          <a href="${prefix}personalized-counselling.html" aria-label="Get personalised guidance">Guide Me</a>
          <a href="${prefix}application-support.html" aria-label="Get an instant university offer">Get Instant Offer</a>
        </nav>
      </div>
    </div>
  </div>

  <header class="site-header" role="banner">
    <div class="container container--wide">
      <div class="header__inner">

        <a href="${prefix}index.html" class="header__logo" aria-label="ISMS Global Edu — home">
          <div class="header__logo-mark" aria-hidden="true">IG</div>
          <div class="header__logo-text">
            <span class="header__logo-name">ISMS Global Edu</span>
            <span class="header__logo-tagline">Study Abroad Experts</span>
          </div>
        </a>

        <nav class="header__nav" aria-label="Main navigation">
          <ul class="nav__list" role="list">

            <li class="nav__item">
              <a href="${prefix}study-destinations.html" class="nav__link ${isDestinationPage ? 'nav__link--active' : ''}" aria-haspopup="true" aria-expanded="false">
                Study Destinations
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.5 6l3.5 3.5L11.5 6"/></svg>
              </a>
              <div class="nav__dropdown" role="region" aria-label="Study destinations">
                <div class="nav__dropdown-grid">
                  <a href="${prefix}study-uk.html" class="nav__dropdown-item ${currentPage === 'study-uk.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/gb.svg" alt="UK Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">United Kingdom</div><div class="nav__dropdown-sub">Top-ranked universities</div></div></a>
                  <a href="${prefix}study-ireland.html" class="nav__dropdown-item ${currentPage === 'study-ireland.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/ie.svg" alt="Ireland Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">Ireland</div><div class="nav__dropdown-sub">EU residency gateway</div></div></a>
                  <a href="${prefix}study-australia.html" class="nav__dropdown-item ${currentPage === 'study-australia.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/au.svg" alt="Australia Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">Australia</div><div class="nav__dropdown-sub">World-class education</div></div></a>
                  <a href="${prefix}study-usa.html" class="nav__dropdown-item ${currentPage === 'study-usa.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/us.svg" alt="USA Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">USA</div><div class="nav__dropdown-sub">Leading research institutions</div></div></a>
                  <a href="${prefix}study-new-zealand.html" class="nav__dropdown-item ${currentPage === 'study-new-zealand.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/nz.svg" alt="New Zealand Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">New Zealand</div><div class="nav__dropdown-sub">Safe, scenic, welcoming</div></div></a>
                  <a href="${prefix}study-dubai.html" class="nav__dropdown-item ${currentPage === 'study-dubai.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/ae.svg" alt="Dubai UAE Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">Dubai</div><div class="nav__dropdown-sub">Global business hub</div></div></a>
                  <a href="${prefix}study-france.html" class="nav__dropdown-item ${currentPage === 'study-france.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/fr.svg" alt="France Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">France</div><div class="nav__dropdown-sub">Art, culture &amp; innovation</div></div></a>
                  <a href="${prefix}study-germany.html" class="nav__dropdown-item ${currentPage === 'study-germany.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/de.svg" alt="Germany Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">Germany</div><div class="nav__dropdown-sub">Engineering excellence</div></div></a>
                  <a href="${prefix}study-netherlands.html" class="nav__dropdown-item ${currentPage === 'study-netherlands.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/nl.svg" alt="Netherlands Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">Netherlands</div><div class="nav__dropdown-sub">English-taught programmes</div></div></a>
                  <a href="${prefix}study-spain.html" class="nav__dropdown-item ${currentPage === 'study-spain.html' ? 'nav__dropdown-item--active' : ''}"><span class="nav__dropdown-flag"><img src="${prefix}assets/images/flags/es.svg" alt="Spain Flag" width="24" height="16" style="border-radius:2px;vertical-align:middle;"></span><div><div class="nav__dropdown-label">Spain</div><div class="nav__dropdown-sub">Vibrant student culture</div></div></a>
                </div>
              </div>
            </li>

            <li class="nav__item"><a href="${prefix}courses.html" class="nav__link ${currentPage === 'courses.html' ? 'nav__link--active' : ''}">Courses</a></li>
            <li class="nav__item"><a href="${prefix}universities.html" class="nav__link ${currentPage === 'universities.html' ? 'nav__link--active' : ''}">Universities</a></li>
            <li class="nav__item"><a href="${prefix}scholarships.html" class="nav__link ${currentPage === 'scholarships.html' ? 'nav__link--active' : ''}">Scholarships</a></li>

            <li class="nav__item">
              <a href="${prefix}services/index.html" class="nav__link ${isServicePage ? 'nav__link--active' : ''}" aria-haspopup="true" aria-expanded="false">
                Services
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.5 6l3.5 3.5L11.5 6"/></svg>
              </a>
              <div class="nav__dropdown" role="region" aria-label="Our services" style="min-width: 660px;">
                <div class="nav__dropdown-grid" style="grid-template-columns: repeat(2,1fr); gap: var(--space-2);">
                  <a href="${prefix}personalized-counselling.html" class="nav__dropdown-item ${currentPage === 'personalized-counselling.html' ? 'nav__dropdown-item--active' : ''}">
                    <span class="nav__dropdown-flag"><i class="fa-solid fa-bullseye" style="color:var(--color-red);" aria-hidden="true"></i></span>
                    <div>
                      <div class="nav__dropdown-label">Personalised Counselling</div>
                      <div class="nav__dropdown-sub">Tailored study abroad planning</div>
                    </div>
                  </a>
                  <a href="${prefix}university-selection.html" class="nav__dropdown-item ${currentPage === 'university-selection.html' ? 'nav__dropdown-item--active' : ''}">
                    <span class="nav__dropdown-flag"><i class="fa-solid fa-landmark" style="color:var(--color-navy);" aria-hidden="true"></i></span>
                    <div>
                      <div class="nav__dropdown-label">University Shortlisting</div>
                      <div class="nav__dropdown-sub">Match profile &amp; destination</div>
                    </div>
                  </a>
                  <a href="${prefix}courses.html" class="nav__dropdown-item ${currentPage === 'courses.html' ? 'nav__dropdown-item--active' : ''}">
                    <span class="nav__dropdown-flag"><i class="fa-solid fa-book-open" style="color:var(--color-navy);" aria-hidden="true"></i></span>
                    <div>
                      <div class="nav__dropdown-label">Course Selection Guidance</div>
                      <div class="nav__dropdown-sub">Programs matching career goals</div>
                    </div>
                  </a>
                  <a href="${prefix}application-support.html" class="nav__dropdown-item ${currentPage === 'application-support.html' ? 'nav__dropdown-item--active' : ''}">
                    <span class="nav__dropdown-flag"><i class="fa-solid fa-clipboard-list" style="color:var(--color-red);" aria-hidden="true"></i></span>
                    <div>
                      <div class="nav__dropdown-label">Application &amp; Offer Support</div>
                      <div class="nav__dropdown-sub">SOP, LOR &amp; offer acceptance</div>
                    </div>
                  </a>
                  <a href="${prefix}scholarships.html" class="nav__dropdown-item ${currentPage === 'scholarships.html' ? 'nav__dropdown-item--active' : ''}">
                    <span class="nav__dropdown-flag"><i class="fa-solid fa-award" style="color:var(--color-navy);" aria-hidden="true"></i></span>
                    <div>
                      <div class="nav__dropdown-label">Scholarships &amp; Education Loans</div>
                      <div class="nav__dropdown-sub">Funding &amp; financial planning</div>
                    </div>
                  </a>
                  <a href="${prefix}visa-preparation.html" class="nav__dropdown-item ${currentPage === 'visa-preparation.html' ? 'nav__dropdown-item--active' : ''}">
                    <span class="nav__dropdown-flag"><i class="fa-solid fa-passport" style="color:var(--color-red);" aria-hidden="true"></i></span>
                    <div>
                      <div class="nav__dropdown-label">Visa Preparation</div>
                      <div class="nav__dropdown-sub">Country rules &amp; interview prep</div>
                    </div>
                  </a>
                  <a href="${prefix}pre-departure-support.html" class="nav__dropdown-item ${currentPage === 'pre-departure-support.html' ? 'nav__dropdown-item--active' : ''}">
                    <span class="nav__dropdown-flag"><i class="fa-solid fa-plane-departure" style="color:var(--color-red);" aria-hidden="true"></i></span>
                    <div>
                      <div class="nav__dropdown-label">Pre-Departure Support</div>
                      <div class="nav__dropdown-sub">Flights, forex &amp; accommodation</div>
                    </div>
                  </a>
                  <a href="${prefix}services/post-arrival-support.html" class="nav__dropdown-item ${currentPage === 'post-arrival-support.html' ? 'nav__dropdown-item--active' : ''}">
                    <span class="nav__dropdown-flag"><i class="fa-solid fa-house-user" style="color:var(--color-navy);" aria-hidden="true"></i></span>
                    <div>
                      <div class="nav__dropdown-label">Post-Arrival Guidance</div>
                      <div class="nav__dropdown-sub">Airport, SIM, banking &amp; orientation</div>
                    </div>
                  </a>
                </div>
              </div>
            </li>

            <li class="nav__item"><a href="${prefix}about.html" class="nav__link ${currentPage === 'about.html' ? 'nav__link--active' : ''}">About Us</a></li>
            <li class="nav__item"><a href="${prefix}contact.html" class="nav__link ${currentPage === 'contact.html' ? 'nav__link--active' : ''}">Contact Us</a></li>
          </ul>
        </nav>

        <div class="header__actions">
          <a href="${prefix}index.html#counselling" class="btn btn-primary btn-red">Book Free Counselling</a>
          <button class="header__menu-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>

      </div>
    </div>
  </header>
  `;

  // 2. Render Mobile Navigation Drawer
  const mobileNavHtml = `
  <div class="mobile-nav__backdrop"></div>
  <div class="mobile-nav__drawer">
    <div class="mobile-nav__header">
      <div class="header__logo" aria-hidden="true">
        <div class="header__logo-mark">IG</div>
        <div class="header__logo-text">
          <span class="header__logo-name">ISMS Global Edu</span>
        </div>
      </div>
      <button class="mobile-nav__close" aria-label="Close navigation menu"><i class="fa-solid fa-xmark"></i></button>
    </div>

    <nav aria-label="Mobile navigation">
      <ul class="mobile-nav__list" role="list">
        <li><a href="${prefix}study-uk.html" class="mobile-nav__link">Study in the UK</a></li>
        <li><a href="${prefix}study-ireland.html" class="mobile-nav__link">Study in Ireland</a></li>
        <li><a href="${prefix}study-australia.html" class="mobile-nav__link">Study in Australia</a></li>
        <li><a href="${prefix}study-usa.html" class="mobile-nav__link">Study in the USA</a></li>
        <li><a href="${prefix}study-new-zealand.html" class="mobile-nav__link">Study in New Zealand</a></li>
        <li><a href="${prefix}study-dubai.html" class="mobile-nav__link">Study in Dubai</a></li>
        <li><a href="${prefix}study-france.html" class="mobile-nav__link">Study in France</a></li>
        <li><a href="${prefix}study-germany.html" class="mobile-nav__link">Study in Germany</a></li>
        <li><a href="${prefix}study-netherlands.html" class="mobile-nav__link">Study in the Netherlands</a></li>
        <li><a href="${prefix}study-spain.html" class="mobile-nav__link">Study in Spain</a></li>
        <li><a href="${prefix}courses.html" class="mobile-nav__link">Courses</a></li>
        <li><a href="${prefix}universities.html" class="mobile-nav__link">Universities</a></li>
        <li><a href="${prefix}scholarships.html" class="mobile-nav__link">Scholarships</a></li>
        <li><a href="${prefix}personalized-counselling.html" class="mobile-nav__link">Personalised Counselling</a></li>
        <li><a href="${prefix}university-selection.html" class="mobile-nav__link">University Shortlisting</a></li>
        <li><a href="${prefix}application-support.html" class="mobile-nav__link">Application &amp; Offer Support</a></li>
        <li><a href="${prefix}visa-preparation.html" class="mobile-nav__link">Visa Preparation</a></li>
        <li><a href="${prefix}pre-departure-support.html" class="mobile-nav__link">Pre-Departure Support</a></li>
        <li><a href="${prefix}services/post-arrival-support.html" class="mobile-nav__link">Post-Arrival Guidance</a></li>
        <li><a href="${prefix}about.html" class="mobile-nav__link">About Us</a></li>
        <li><a href="${prefix}contact.html" class="mobile-nav__link">Contact Us</a></li>
      </ul>
    </nav>

    <div class="mobile-nav__cta">
      <a href="${prefix}index.html#counselling" class="btn btn-primary btn-red" style="width:100%;justify-content:center;">Book Free Counselling</a>
    </div>
  </div>
  `;

  // 3. Render Footer
  const footerInnerHtml = `
  <div class="container container--wide">

    <div class="footer__main">

      <div class="footer__brand">
        <a href="${prefix}index.html" class="header__logo" aria-label="ISMS Global Edu — home">
          <div class="header__logo-mark" aria-hidden="true">IG</div>
          <div class="header__logo-text">
            <span class="header__logo-name">ISMS Global Edu</span>
            <span class="header__logo-tagline">Study Abroad Experts</span>
          </div>
        </a>
        <p class="footer__desc">
          Empowering students across India with world-class study abroad guidance, transparent counselling, and end-to-end admission and visa assistance.
        </p>
        <div class="footer__socials" aria-label="Social media channels">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener">f</a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener">in</a>
          <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener">yt</a>
        </div>
      </div>

      <nav aria-label="Study destinations links">
        <div class="footer__col-title">Study Destinations</div>
        <ul class="footer__links">
          <li><a href="${prefix}study-uk.html">United Kingdom</a></li>
          <li><a href="${prefix}study-ireland.html">Ireland</a></li>
          <li><a href="${prefix}study-australia.html">Australia</a></li>
          <li><a href="${prefix}study-usa.html">USA</a></li>
          <li><a href="${prefix}study-new-zealand.html">New Zealand</a></li>
          <li><a href="${prefix}study-dubai.html">Dubai</a></li>
          <li><a href="${prefix}study-france.html">France</a></li>
          <li><a href="${prefix}study-germany.html">Germany</a></li>
          <li><a href="${prefix}study-netherlands.html">Netherlands</a></li>
          <li><a href="${prefix}study-spain.html">Spain</a></li>
        </ul>
      </nav>

      <nav aria-label="Student services links">
        <div class="footer__col-title">Student Services</div>
        <ul class="footer__links">
          <li><a href="${prefix}personalized-counselling.html">Personalised Counselling</a></li>
          <li><a href="${prefix}courses.html">Course Selection</a></li>
          <li><a href="${prefix}university-selection.html">University Shortlisting</a></li>
          <li><a href="${prefix}application-support.html">Applications &amp; Offers</a></li>
          <li><a href="${prefix}scholarships.html">Scholarships &amp; Loans</a></li>
          <li><a href="${prefix}visa-preparation.html">Visa Preparation</a></li>
          <li><a href="${prefix}pre-departure-support.html">Pre-Departure Support</a></li>
          <li><a href="${prefix}services/post-arrival-support.html">Post-Arrival Guidance</a></li>
        </ul>
      </nav>

      <nav aria-label="Resources links">
        <div class="footer__col-title">Resources</div>
        <ul class="footer__links">
          <li><a href="${prefix}courses.html">Courses</a></li>
          <li><a href="${prefix}scholarships.html">Scholarships</a></li>
          <li><a href="${prefix}universities.html">Universities</a></li>
          <li><a href="${prefix}index.html#events">Events</a></li>
          <li><a href="${prefix}personalized-counselling.html">Guide Me</a></li>
          <li><a href="${prefix}application-support.html">Get Instant Offer</a></li>
        </ul>

        <div class="footer__col-title" style="margin-top:2rem;">Company</div>
        <ul class="footer__links">
          <li><a href="${prefix}about.html">About Us</a></li>
          <li><a href="${prefix}contact.html">Contact Us</a></li>
        </ul>
      </nav>

    </div>

    <div class="footer__bottom">
      <p>© ${new Date().getFullYear()} ISMS Global Edu. All rights reserved.</p>
      <nav class="footer__legal-links" aria-label="Legal links">
        <a href="${prefix}contact.html">Privacy Policy</a>
        <a href="${prefix}contact.html">Terms &amp; Conditions</a>
        <a href="${prefix}contact.html">Cookie Policy</a>
      </nav>
    </div>

  </div>
  `;

  // Inject Header Elements into DOM
  let siteHeaderContainer = $('#site-header');
  let existingHeader = $('.site-header');
  let existingUtilBar = $('.utility-bar');

  if (siteHeaderContainer) {
    siteHeaderContainer.innerHTML = headerWrapperHtml;
  } else if (existingUtilBar && existingHeader) {
    const headerParent = existingHeader.parentNode;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerWrapperHtml;
    headerParent.insertBefore(tempDiv.firstElementChild, existingUtilBar); // utility bar
    headerParent.insertBefore(tempDiv.lastElementChild, existingHeader); // sticky header
    existingUtilBar.remove();
    existingHeader.remove();
  } else if (existingHeader) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerWrapperHtml;
    existingHeader.parentNode.replaceChild(tempDiv.lastElementChild, existingHeader);
  }

  // Inject Mobile Nav
  let mobileNav = $('.mobile-nav');
  if (!mobileNav) {
    mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobile-nav';
    mobileNav.setAttribute('role', 'dialog');
    mobileNav.setAttribute('aria-modal', 'true');
    mobileNav.setAttribute('aria-label', 'Navigation menu');
    document.body.appendChild(mobileNav);
  }
  mobileNav.innerHTML = mobileNavHtml;

  // Inject Footer
  let siteFooterContainer = $('#site-footer');
  let footer = $('.site-footer');

  if (siteFooterContainer) {
    siteFooterContainer.innerHTML = `<footer class="site-footer" role="contentinfo">${footerInnerHtml}</footer>`;
  } else if (footer) {
    footer.innerHTML = footerInnerHtml;
  }
})();

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
    const cardWidth = cards[0].offsetWidth + 24;
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

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goTo(currentIndex - 1); stopAutoplay(); }
    if (e.key === 'ArrowRight') { goTo(currentIndex + 1); stopAutoplay(); }
  });

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);

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

    const inputs = $$('input, select, textarea', form);
    const valid = inputs.map(validateField).every(Boolean);

    if (!valid) {
      const firstError = $('[class~="error"]', form) || $('.form-field__error.visible', form);
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

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
        const eased = 1 - Math.pow(1 - progress, 3);
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

    const counsellingSection = document.getElementById('counselling');
    if (counsellingSection) {
      counsellingSection.scrollIntoView({ behavior: 'smooth' });

      const destField = document.getElementById('destination');
      const levelField = document.getElementById('studyLevel');
      if (destField && destination) destField.value = destination;
      if (levelField && level) levelField.value = level;
    }
  });
})();
