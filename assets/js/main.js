// main.js — 18 FES ARCHIVE

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hamburger menu ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll-reveal for year cards ── */
  if ('IntersectionObserver' in window) {
    const cards = document.querySelectorAll('.year-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s, box-shadow 0.3s ease`;
      observer.observe(card);
    });
  }

  /* ── Active nav highlight by current path ── */
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = link.getAttribute('href').replace(/\\/g, '/');
    // remove leading ../
    const cleanLink = linkPath.replace(/^(\.\.\/)+/, '');
    if (currentPath.endsWith(cleanLink)) {
      link.classList.add('active');
    }
  });

});
