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

// ── REVEAL ON SCROLL (manual .reveal elements) ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ── AUTO REVEAL ON SCROLL (global, all pages) ──
// Selectors to auto-animate — excludes nav, footer, scripts and anything already .reveal
const AUTO_SELECTORS = [
  'h1', 'h2', 'h3', 'h4',
  'p', 'blockquote',
  '.section-label',
  '.package-card', '.pillar-card', '.service-item',
  '.stat-item', '.work-card', '.strip-thumb',
  '.process-step', '.pillar-card',
  '.synergy-visual', '.synergy-content',
  '.brand-hero-subtitle', '.brand-hero-desc',
  '.footer-col-title', '.footer-links',
  'img:not(.nav img)', 'figure',
  '.btn-gold, .btn-outline, .btn-ghost',
  '.divider-gold',
  '.launch-cta-box', '.cta-brand',
  '[class*="card"]', '[class*="block"]',
].join(',');

// Exclusion: skip elements already inside a .reveal, already tagged, in nav/footer, or in <script>/<style>
const EXCLUDE_PARENTS = ['nav', 'footer', 'script', 'style', '.mobile-menu', '.modal', '.switcher-pill'];

function isExcluded(el) {
  if (el.classList.contains('reveal') || el.classList.contains('auto-reveal')) return true;
  if (el.closest('.reveal') || el.closest('.auto-reveal')) return true;
  for (const sel of EXCLUDE_PARENTS) {
    if (el.closest(sel)) return true;
  }
  // Skip elements already in viewport at load (above the fold) — don't animate hero instantly
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.6 && rect.top >= 0) return true;
  return false;
}

// Group siblings so we can stagger them
function getSiblingIndex(el) {
  const parent = el.parentElement;
  if (!parent) return 0;
  const siblings = Array.from(parent.children).filter(c => c.classList.contains('auto-reveal'));
  return siblings.indexOf(el);
}

// Run after DOM is fully ready
window.addEventListener('DOMContentLoaded', () => {
  const candidates = document.querySelectorAll(AUTO_SELECTORS);
  candidates.forEach(el => {
    if (isExcluded(el)) return;
    el.classList.add('auto-reveal');
  });

  // Assign stagger delays per group of siblings
  document.querySelectorAll('.auto-reveal').forEach(el => {
    const idx = getSiblingIndex(el);
    const delay = Math.min(idx * 0.05, 0.3); // max 300ms stagger
    el.style.setProperty('--ar-delay', delay + 's');
  });

  // Observe them
  const arObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('ar-visible');
        arObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.auto-reveal').forEach(el => arObserver.observe(el));
});


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
