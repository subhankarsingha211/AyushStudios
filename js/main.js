// ── NAV SCROLL ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── HAMBURGER ──
const ham = document.querySelector('.hamburger');
const mob = document.querySelector('.mobile-menu');
if (ham && mob) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = ham.classList.contains('open') ? 'hidden' : '';
  });
}

// ── NOTICEABLE SCROLL REVEAL (GLOBAL ALL PAGES) ──
function initScrollReveal() {
  const isExcluded = (el) => {
    const EXCLUDE_PARENTS = ['nav', 'footer', 'script', 'style', '.mobile-menu', '.modal', '.switcher-pill', '.reviews-marquee-track'];
    for (const sel of EXCLUDE_PARENTS) {
      if (el.closest(sel)) return true;
    }
    return false;
  };

  // 1. Identify grid items and card containers for automatic staggering
  const STAGGER_CONTAINERS = [
    '.brands-grid',
    '.works-grid',
    '.packages-grid',
    '.stats-grid',
    '.process-steps',
    '.principles-grid',
    '.brand-pills',
    '.direct-methods',
    '.cards-grid'
  ];

  STAGGER_CONTAINERS.forEach(containerSel => {
    document.querySelectorAll(containerSel).forEach(container => {
      if (isExcluded(container)) return;
      const children = Array.from(container.children).filter(c => !isExcluded(c));
      children.forEach((child, idx) => {
        child.classList.add('auto-reveal');
        const delay = (idx * 0.1).toFixed(2); // 100ms staggered cascade
        child.style.setProperty('--ar-delay', delay + 's');
      });
    });
  });

  // 2. Target general content headings, blocks, and elements
  const CONTENT_SELECTORS = [
    'section > .container > .reveal',
    '.service-block-header',
    '.section-label',
    '.brands-intro',
    '.works-header',
    '.testimonials-header',
    '.cta-banner .reveal',
    '.custom-build',
    '.about-hero-inner',
    '.about-story-grid',
    '.contact-grid',
    '.contact-hero',
    '.page-hero'
  ];

  CONTENT_SELECTORS.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (isExcluded(el)) return;
      if (!el.classList.contains('reveal') && !el.classList.contains('auto-reveal')) {
        el.classList.add('auto-reveal');
      }
    });
  });

  // 3. Setup IntersectionObserver for first-time scroll revealing
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'ar-visible');
        obs.unobserve(entry.target); // Trigger only once on first scroll
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -45px 0px'
  });

  // Observe all .reveal and .auto-reveal elements
  const allRevealElements = document.querySelectorAll('.reveal, .auto-reveal');
  allRevealElements.forEach(el => {
    if (isExcluded(el)) return;

    // Check if element is already in the upper viewport on initial load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      // Reveal immediately or on initial load
      setTimeout(() => {
        el.classList.add('visible', 'ar-visible');
      }, 60);
    } else {
      revealObserver.observe(el);
    }
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}


// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}
const counterEls = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const suffix = e.target.dataset.suffix || '';
      const el = e.target;
      animateCounter({ textContent: '' ,
        set textContent(v) { el.textContent = v + suffix; }
      }, parseInt(e.target.dataset.count), 1800);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObs.observe(el));

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && href.includes(currentPage)) a.classList.add('active');
});
