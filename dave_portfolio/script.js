/* ============================================
   script.js — Asp Dave Digital Marketing Site
   ============================================ */

/* ── Custom Cursor ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform     = 'translate(-50%, -50%) scale(2)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorRing.style.opacity   = '1';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform     = 'translate(-50%, -50%) scale(1)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorRing.style.opacity   = '0.6';
  });
});

/* ── Navbar Scroll Shadow ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Mobile Menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Close menu when any mobile nav link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/* ── Scroll Reveal ── */
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

/* ── Count-Up Animation ── */
const counters        = document.querySelectorAll('.count-up');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el       = entry.target;
      const target   = parseInt(el.dataset.target);
      const duration = 1600;
      const step     = target / (duration / 16);
      let current    = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 16);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

/* ── Contact Form ── */
const form       = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameVal    = document.getElementById('name').value.trim();
  const emailVal   = document.getElementById('email').value.trim();
  const messageVal = document.getElementById('message').value.trim();

  const nameField    = document.getElementById('name');
  const emailField   = document.getElementById('email');
  const messageField = document.getElementById('message');

  // Validation — highlight empty required fields in red
  let hasError = false;
  [{ val: nameVal, field: nameField }, { val: emailVal, field: emailField }, { val: messageVal, field: messageField }]
    .forEach(({ val, field }) => {
      if (!val) {
        field.style.borderColor = '#c94040';
        setTimeout(() => field.style.borderColor = '', 2000);
        hasError = true;
      }
    });

  if (hasError) return;

  // Simulate submission — replace setTimeout with your real endpoint (Formspree / EmailJS / backend)
  const btn = form.querySelector('.btn-submit');
  btn.textContent  = 'Sending...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    form.style.display       = 'none';
    successMsg.style.display = 'block';
  }, 1200);
});