/**
 * ISMS Global Edu — Design Variant v1 Script Coordinator
 * Implements high-performance, manual scroll interactions, timeline tracing, 
 * parallax, count-ups, bento mouse tilt, tuition calculator, and FAQ accordions.
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initScrollProgressBar();
  initHeaderScrollEffect();
  initParallaxHero();
  initScrollReveal();
  initCounterAnimations();
  initTimelineDrawing();
  initBento3DTilt();
  initTestimonialsMarquee();
  initTuitionCalculator();
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

/* ─── Header Shrink on Scroll ─── */
function initHeaderScrollEffect() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle("site-header--scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* ─── Parallax Hero Background ─── */
function initParallaxHero() {
  const mapOverlay = document.getElementById("hero-map");
  if (!mapOverlay) return;

  let ticking = false;

  const updateParallax = () => {
    const scrollPos = window.scrollY;
    mapOverlay.style.setProperty("--parallax-offset", `${scrollPos * 0.3}px`);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/* ─── Staggered Scroll Reveal ─── */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ─── Animated Stats Counters ─── */
function initCounterAnimations() {
  const counterElements = document.querySelectorAll(".stat-num[data-target]");
  if (counterElements.length === 0) return;

  const easeOutQuad = t => t * (2 - t);

  const animateCounter = el => {
    const targetVal = parseInt(el.getAttribute("data-target"), 10);
    const duration = 2000;
    let startTime = null;

    const step = timestamp => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentVal = Math.floor(easeOutQuad(percentage) * targetVal);
      el.textContent = currentVal + (el.getAttribute("data-suffix") || "");

      if (percentage < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = targetVal + (el.getAttribute("data-suffix") || "");
      }
    };

    window.requestAnimationFrame(step);
  };

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counterElements.forEach(el => observer.observe(el));
}

/* ─── Scroll-Linked Timeline Drawing ─── */
function initTimelineDrawing() {
  const activeLine = document.getElementById("timeline-active-line");
  const timelineSection = document.getElementById("timeline-section");
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (!activeLine || !timelineSection) return;

  const pathLength = 1000;
  activeLine.style.strokeDasharray = pathLength;
  activeLine.style.strokeDashoffset = pathLength;

  const drawTimeline = () => {
    const rect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const startOffset = windowHeight / 2;
    const scrollDistance = -rect.top + startOffset;
    const totalHeight = rect.height;
    
    let progress = scrollDistance / totalHeight;
    progress = Math.max(0, Math.min(progress, 1));

    const offsetVal = pathLength - (progress * pathLength);
    activeLine.style.strokeDashoffset = offsetVal;

    timelineItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < windowHeight * 0.6) {
        item.classList.add("timeline-item--active");
      } else {
        item.classList.remove("timeline-item--active");
      }
    });
  };

  window.addEventListener("scroll", drawTimeline, { passive: true });
  drawTimeline();
}

/* ─── Bento Grid Mouse 3D Tilt ─── */
function initBento3DTilt() {
  const cards = document.querySelectorAll(".bento-card");
  if (cards.length === 0) return;

  if (window.matchMedia("(pointer: coarse)").matches) return;

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const width = rect.width;
      const height = rect.height;
      
      const rotateX = ((y / height) - 0.5) * -16;
      const rotateY = ((x / width) - 0.5) * 16;
      
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      card.style.transition = "transform 0.5s ease";
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s ease";
    });
  });
}

/* ─── Testimonials Carousel Clone ─── */
function initTestimonialsMarquee() {
  const track = document.getElementById("testimonials-track");
  if (!track) return;

  const cards = Array.from(track.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });
}

/* ─── Tuition & Scholarship Estimator Logic ─── */
function initTuitionCalculator() {
  const countrySelect = document.getElementById("est-country");
  const scoreInput = document.getElementById("est-score");
  const scoreVal = document.getElementById("score-val");
  const calcBtn = document.getElementById("calc-btn");
  
  const resTuition = document.getElementById("res-tuition");
  const resScholarship = document.getElementById("res-scholarship");
  const resNet = document.getElementById("res-net");

  if (!countrySelect || !scoreInput || !calcBtn) return;

  // Real-time slider indicator
  scoreInput.addEventListener("input", () => {
    scoreVal.textContent = `${scoreInput.value}%`;
  });

  const runCalculation = () => {
    const selectedOpt = countrySelect.options[countrySelect.selectedIndex];
    const baseCost = parseFloat(selectedOpt.getAttribute("data-cost"));
    const currency = selectedOpt.getAttribute("data-curr");
    const score = parseFloat(scoreInput.value);

    // Calculate scholarship tier
    let waiverPct = 0;
    let waiverTier = "No Waiver Available";
    if (score >= 95) {
      waiverPct = 0.50; // 50%
      waiverTier = "Elite Tier (50% Waiver)";
    } else if (score >= 85) {
      waiverPct = 0.25; // 25%
      waiverTier = "Merit Tier (25% Waiver)";
    } else if (score >= 75) {
      waiverPct = 0.15; // 15%
      waiverTier = "Academic Tier (15% Waiver)";
    } else if (score >= 65) {
      waiverPct = 0.05; // 5%
      waiverTier = "Entrance Tier (5% Waiver)";
    }

    const waiverAmount = baseCost * waiverPct;
    const netCost = baseCost - waiverAmount;

    // Output formatted results
    resTuition.textContent = `${currency}${baseCost.toLocaleString()}`;
    resScholarship.textContent = waiverTier;
    resNet.textContent = `${currency}${netCost.toLocaleString()}/year`;
  };

  calcBtn.addEventListener("click", runCalculation);
  runCalculation(); // run initially
}

/* ─── FAQ Accordion Handler ─── */
function initFAQAccordion() {
  const triggers = document.querySelectorAll(".faq-trigger");
  if (triggers.length === 0) return;

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const parent = trigger.parentElement;
      const isOpen = parent.classList.contains("faq-item--active");

      // Close all accordion panels
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("faq-item--active");
        item.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
      });

      // If clicked item wasn't open, open it
      if (!isOpen) {
        parent.classList.add("faq-item--active");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}
