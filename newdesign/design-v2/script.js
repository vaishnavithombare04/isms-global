/**
 * ISMS Global Edu — Design Variant v2 Script Coordinator
 * Implements mouse-drag carousel, sticky horizontal timeline pin scroll-jack, 
 * cursor radial spotlight glow, tabbed selectors, and accordion FAQ panels.
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initScrollProgressBar();
  initHeaderScrollEffect();
  initDraggableCarousel();
  initScrollReveal();
  initCursorSpotlight();
  initHorizontalScrollJacking();
  initNeonBlobsParallax();
  initTabbedSelectors();
  initFAQAccordion();
});

/* ─── Scroll Progress Bar ─── */
function initScrollProgressBar() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const progress = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
}

/* ─── Glass Header Scroll Blur ─── */
function initHeaderScrollEffect() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle("site-header--scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* ─── Draggable/Swipeable Quick Access Carousel ─── */
function initDraggableCarousel() {
  const carousel = document.getElementById("carousel-outer");
  const track = document.getElementById("carousel-inner");
  if (!carousel || !track) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let xOffset = 0;

  const handleStart = e => {
    isDown = true;
    startX = (e.pageX || e.touches[0].pageX) - track.offsetLeft;
    scrollLeft = xOffset;
  };

  const handleEnd = () => {
    isDown = false;
  };

  const handleMove = e => {
    if (!isDown) return;
    e.preventDefault();
    const x = (e.pageX || e.touches[0].pageX) - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    xOffset = scrollLeft + walk;

    const maxScroll = -(track.scrollWidth - carousel.clientWidth);
    xOffset = Math.min(0, Math.max(xOffset, maxScroll));
    track.style.transform = `translateX(${xOffset}px)`;
  };

  carousel.addEventListener("mousedown", handleStart);
  carousel.addEventListener("touchstart", handleStart, { passive: true });

  carousel.addEventListener("mouseleave", handleEnd);
  carousel.addEventListener("mouseup", handleEnd);
  carousel.addEventListener("touchend", handleEnd);

  carousel.addEventListener("mousemove", handleMove);
  carousel.addEventListener("touchmove", handleMove, { passive: false });
}

/* ─── Staggered Scroll Reveal (Alternating Left/Right) ─── */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if (reveals.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("reveal")) {
          entry.target.classList.add("reveal--active");
        } else if (entry.target.classList.contains("reveal-left")) {
          entry.target.classList.add("reveal-left--active");
        } else if (entry.target.classList.contains("reveal-right")) {
          entry.target.classList.add("reveal-right--active");
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

/* ─── Cursor Spotlight Glow ─── */
function initCursorSpotlight() {
  const cards = document.querySelectorAll(".service-card, .essential-card");
  if (cards.length === 0) return;

  let ticking = false;

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
          ticking = false;
        });
        ticking = true;
      }
    });
  });
}

/* ─── Sticky Horizontal Pinned Scroll-jack ─── */
function initHorizontalScrollJacking() {
  const container = document.getElementById("timeline-container");
  const sticky = document.getElementById("timeline-sticky");
  const track = document.getElementById("timeline-track");
  if (!container || !sticky || !track) return;

  let ticking = false;

  const handleScroll = () => {
    if (window.innerWidth < 768) {
      track.style.transform = "none";
      ticking = false;
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (containerRect.top <= 0 && containerRect.bottom >= windowHeight) {
      const totalScrollableHeight = container.clientHeight - windowHeight;
      const currentScrollPosition = -containerRect.top;
      
      let progress = currentScrollPosition / totalScrollableHeight;
      progress = Math.max(0, Math.min(progress, 1));

      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslation = trackWidth - viewportWidth;

      const translation = progress * maxTranslation * -1.05;
      track.style.transform = `translateX(${translation}px)`;
    } else if (containerRect.top > 0) {
      track.style.transform = "translateX(0px)";
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  handleScroll();
}

/* ─── Neon Blobs Scroll Parallax ─── */
function initNeonBlobsParallax() {
  const blob1 = document.getElementById("hero-blob-1");
  const blob2 = document.getElementById("hero-blob-2");
  if (!blob1 && !blob2) return;

  let ticking = false;

  const updateBlobs = () => {
    const scrollPos = window.scrollY;
    
    if (blob1) {
      const transY = scrollPos * 0.15;
      const scale = Math.max(0.7, 1 - (scrollPos * 0.0005));
      blob1.style.transform = `translateY(${transY}px) scale(${scale})`;
    }

    if (blob2) {
      const transY = -scrollPos * 0.1;
      const scale = Math.min(1.3, 1 + (scrollPos * 0.0004));
      blob2.style.transform = `translateY(${transY}px) scale(${scale})`;
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateBlobs);
      ticking = true;
    }
  }, { passive: true });
}

/* ─── Interactive Country Selector Hub Tab Switcher ─── */
function initTabbedSelectors() {
  const triggers = document.querySelectorAll(".tab-trigger");
  const panels = document.querySelectorAll(".tab-panel");
  if (triggers.length === 0) return;

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      // Deactivate all triggers and panels
      triggers.forEach(t => {
        t.classList.remove("tab-trigger--active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach(p => p.classList.remove("tab-panel--active"));

      // Activate selected trigger and panels
      trigger.classList.add("tab-trigger--active");
      trigger.setAttribute("aria-selected", "true");
      const targetId = trigger.getAttribute("data-target");
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add("tab-panel--active");
      }
    });
  });
}

/* ─── Neon FAQ Accordion Handler ─── */
function initFAQAccordion() {
  const triggers = document.querySelectorAll(".faq-trigger");
  if (triggers.length === 0) return;

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const parent = trigger.parentElement;
      const isOpen = parent.classList.contains("faq-item--active");

      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("faq-item--active");
        item.querySelector("i").className = "fa-solid fa-plus";
        item.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        parent.classList.add("faq-item--active");
        trigger.querySelector("i").className = "fa-solid fa-xmark";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}
