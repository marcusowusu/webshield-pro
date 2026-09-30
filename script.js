/* ============================================================
   WEBSHIELD PRO — script.js
   Interactions: nav scroll, mobile menu, billing toggle,
   form handlers, scroll reveal, toast notifications
   ============================================================ */

'use strict';

/* ===== NAV SCROLL EFFECT ===== */
(function initNavScroll() {
  const nav = document.querySelector('.nav-wrapper');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== MOBILE HAMBURGER ===== */
(function initHamburger() {
  const btn   = document.getElementById('hamburger-btn');
  const links = document.getElementById('nav-links');
  const acts  = document.querySelector('.nav-actions');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    if (acts) acts.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    // Animate hamburger → X
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      if (acts) acts.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();

/* ===== BILLING TOGGLE ===== */
function toggleBilling() {
  const toggle   = document.getElementById('billing-toggle');
  const price    = document.getElementById('pro-price');
  const period   = document.getElementById('pro-period');
  const note     = document.getElementById('pro-annual-note');

  if (!toggle || !price) return;

  if (toggle.checked) {
    price.textContent  = '$12';
    period.textContent = '/ month';
    if (note) note.textContent = 'Billed annually at $149/year. You save $79.';
  } else {
    price.textContent  = '$19';
    period.textContent = '/ month';
    if (note) note.textContent = 'Billed monthly. Switch to annual and save $79/year.';
  }
}

/* ===== TOAST NOTIFICATION ===== */
function showToast(message, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ===== TOOLKIT DOWNLOAD HANDLER ===== */
function handleToolkitDownload() {
  const emailInput = document.getElementById('toolkit-email');
  if (!emailInput) return;
  const email = emailInput.value.trim();

  if (!email || !isValidEmail(email)) {
    emailInput.style.borderColor = '#EF4444';
    emailInput.focus();
    showToast('⚠️ Please enter a valid business email address.');
    setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
    return;
  }

  // Simulate download
  const btn = document.getElementById('toolkit-download-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      Preparing download…
    `;
  }

  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Toolkit Sent!
      `;
      btn.style.background = '#22C55E';
      btn.style.borderColor = '#22C55E';
    }
    emailInput.value = '';
    showToast('🎉 Your toolkit is on its way! Check your inbox.');
    setTimeout(() => {
      if (btn) {
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Free Toolkit
        `;
      }
    }, 3000);
  }, 1800);
}

/* ===== SIGNUP FORM HANDLER ===== */
function handleSignup(event) {
  event.preventDefault();
  const form     = document.getElementById('signup-form');
  const success  = document.getElementById('signup-success');
  const btn      = document.getElementById('signup-submit-btn');
  const name     = document.getElementById('signup-name');
  const email    = document.getElementById('signup-email');
  const business = document.getElementById('signup-business');

  // Basic validation
  let valid = true;
  [name, email, business].forEach(field => {
    if (!field) return;
    const empty = !field.value.trim();
    const invalidEmail = field === email && field.value.trim() && !isValidEmail(field.value.trim());
    if (empty || invalidEmail) {
      field.style.borderColor = '#EF4444';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) {
    showToast('⚠️ Please fill in all required fields correctly.');
    return;
  }

  // Simulate submission
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      Creating your account…
    `;
  }

  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Get Started Free →';
    }
    if (form) form.reset();
    if (success) success.hidden = false;
    showToast('🎉 Welcome to WebShield Pro! Check your email to confirm.');
    setTimeout(() => { if (success) success.hidden = true; }, 6000);
  }, 2000);
}

/* ===== CONTACT FORM HANDLER ===== */
function handleContact(event) {
  event.preventDefault();
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  const btn     = document.getElementById('contact-submit-btn');
  const name    = document.getElementById('contact-name');
  const email   = document.getElementById('contact-email');
  const message = document.getElementById('contact-message');

  let valid = true;
  [name, email, message].forEach(field => {
    if (!field) return;
    const empty = !field.value.trim();
    const invalidEmail = field === email && field.value.trim() && !isValidEmail(field.value.trim());
    if (empty || invalidEmail) {
      field.style.borderColor = '#EF4444';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) {
    showToast('⚠️ Please fill in all required fields correctly.');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      Sending…
    `;
  }

  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    }
    if (form) form.reset();
    if (success) success.hidden = false;
    showToast('✉️ Message sent! We\'ll be in touch within 1 business day.');
    setTimeout(() => { if (success) success.hidden = true; }, 6000);
  }, 1800);
}

/* ===== SCROLL REVEAL ===== */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.feature-card, .pricing-card, .section-header, .contact-item, .contact-guarantee, .trust-logo-pill'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
})();

/* ===== SMOOTH ACTIVE NAV HIGHLIGHT ===== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.fontWeight = '';
        });
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) {
          active.style.color = 'var(--navy)';
          active.style.fontWeight = '700';
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
})();

/* ===== UTILITY ===== */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===== SPINNER KEYFRAME (injected) ===== */
(function injectSpinnerStyle() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
})();
