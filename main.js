// Nav scroll behavior
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile menu
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Menu tabs
function showCategory(id) {
  document.querySelectorAll('.menu__grid').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('tab--active'));
  document.getElementById(id).classList.remove('hidden');
  event.currentTarget.classList.add('tab--active');
}

// Smooth reveal on scroll — only animate if reduced-motion isn't preferred
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealEls = document.querySelectorAll('.about__card, .menu__item, .review__card, .contact__detail');

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const show = (el) => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  };

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { show(e.target); observer.unobserve(e.target); } }),
    { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));

  // Fallback: reveal everything after 2s in case observer doesn't fire
  setTimeout(() => revealEls.forEach(show), 2000);
}
