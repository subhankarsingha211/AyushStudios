// Determine path depth dynamically to handle root vs /pages/ directories correctly
const pathParts = window.location.pathname.split('/');
const isSubpage = pathParts.slice(-2)[0] === 'pages' || window.location.pathname.includes('/pages/');
const rootPrefix = isSubpage ? '../' : '';
const pagesPrefix = isSubpage ? '' : 'pages/';

// ── SHARED NAV HTML ──
const NAV_HTML = `
<nav class="nav" id="main-nav">
  <div class="nav-inner">
    <a href="${rootPrefix}index.html" class="nav-logo">
      <div class="nav-logo-main">Ayush Studios</div>
    </a>
    <div class="nav-links">
      <a href="${rootPrefix}index.html">Home</a>
      <div class="nav-dropdown">
        <a href="#">Studios</a>
        <div class="dropdown-menu">
          <a href="${pagesPrefix}harmonics.html">Harmonics Heaven</a>
          <a href="${pagesPrefix}moments.html">Moments Magic</a>
        </div>
      </div>
      <a href="${rootPrefix}services.html">Services</a>
      <a href="${rootPrefix}work.html">Works</a>
      <a href="${rootPrefix}about.html">About</a>
      <a href="${rootPrefix}contact.html">Contact</a>
    </div>
    <a href="${rootPrefix}contact.html" class="nav-cta btn">Book Now</a>
    <div class="hamburger" id="hamburger">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>
<div class="mobile-menu" id="mobile-menu">
  <a href="${rootPrefix}index.html">Home</a>
  <a href="${pagesPrefix}harmonics.html">Harmonics Heaven</a>
  <a href="${pagesPrefix}moments.html">Moments Magic</a>
  <a href="${rootPrefix}services.html">Services</a>
  <a href="${rootPrefix}work.html">Works</a>
  <a href="${rootPrefix}about.html">About</a>
  <a href="${rootPrefix}contact.html">Contact</a>
  <a href="${rootPrefix}contact.html" style="color:var(--gold)">Book Now →</a>
</div>
`;

// ── SHARED FOOTER HTML ──
const FOOTER_HTML = `
<div class="back-to-top-container">
  <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="back-to-top-btn" aria-label="Back to top">
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    </svg>
    <span>Back to Top</span>
  </button>
</div>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo-main">Ayush Studios</div>
        <div class="footer-logo-sub">Sound · Vision · Emotion</div>
        <p class="footer-tagline">"Crafting sonic narratives<br>and visual symphonies."</p>
        <div style="margin-top:24px; display:flex; gap:12px;">
          <a href="${rootPrefix}work.html" target="_blank" class="btn btn-outline" style="padding:10px 20px; font-size:10px;">Works</a>
          <a href="${rootPrefix}services.html" target="_blank" class="btn btn-gold" style="padding:10px 20px; font-size:10px;">Services</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Studios</div>
        <div class="footer-links">
          <a href="${pagesPrefix}harmonics.html">Harmonics Heaven</a>
          <a href="${pagesPrefix}moments.html">Moments Magic</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <div class="footer-links">
          <a href="${rootPrefix}services.html">Services</a>
          <a href="${rootPrefix}work.html">Works</a>
          <a href="${rootPrefix}about.html">About Us</a>
          <a href="${rootPrefix}contact.html">Contact</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Contact</div>
        <div class="footer-contact-item">
          <span class="footer-contact-label">Email</span>
          <a href="mailto:ayush.studio@gmail.com" class="footer-contact-val">ayush.studio@gmail.com</a>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-label">WhatsApp</span>
          <a href="https://wa.me/917001XXXXXX" class="footer-contact-val">+91 70XX XXXXXX</a>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-label">Studio Address</span>
          <span class="footer-contact-val">Dinhata, Cooch Behar<br>West Bengal, India</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© 2026 Ayush Studios. All rights reserved. Crafted with intention.</span>
      <div class="footer-socials">
        <a href="https://youtube.com/@ayushpaulofficial7?si=ZauTlD4HOKteV7SR" target="_blank" title="YouTube">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23 7s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.2 3 12 3 12 3s-4.2 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.2v1.9C.7 15.2 1 17.3 1 17.3s.3 2 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.2 21.4 12 21.5 12 21.5s4.2 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.7 1.2-2.7 1.2-2.7s.3-2.1.3-4.2v-1.8C23.3 9.1 23 7 23 7zm-13.5 8.5V8.7l8.1 3.4-8.1 3.4z"/></svg>
        </a>
        <a href="https://www.instagram.com/ayushpaulofficial7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" title="Instagram">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
        <a href="https://wa.me/917001XXXXXX" target="_blank" title="WhatsApp">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>
`;

// ── INJECT ──
document.getElementById('nav-placeholder').innerHTML = NAV_HTML;
document.getElementById('footer-placeholder').innerHTML = FOOTER_HTML;
