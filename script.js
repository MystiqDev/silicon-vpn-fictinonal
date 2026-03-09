/* SiliconVPN — script.js */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Navbar scroll state ─────────────────────────── */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ─── Mobile sidebar ──────────────────────────────── */
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose   = document.getElementById('mobile-close');
  const mobileLinks   = mobileMenu.querySelectorAll('.mobile-nav a, .mobile-nav-cta');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('visible');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('visible');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileClose.addEventListener('click', closeMenu);
  mobileOverlay.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ─── Scroll-triggered fade-up ───────────────────── */
  const fadeTargets = document.querySelectorAll('.fade-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeTargets.forEach(el => revealObserver.observe(el));

  /* ─── FAQ accordion ───────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all within the same panel
      const parentPanel = item.closest('.faq-panel');
      if (parentPanel) {
        parentPanel.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
      }

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ─── FAQ category tabs ────────────────────────────── */
  const faqTabBtns  = document.querySelectorAll('.faq-tab');
  const faqPanels   = document.querySelectorAll('.faq-panel');

  faqTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      faqTabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      faqPanels.forEach(p  => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const activePanel = document.querySelector(`.faq-panel[data-panel="${target}"]`);
      if (activePanel) activePanel.classList.add('active');
    });
  });

  /* ─── Back to top ─────────────────────────────────── */
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── Close sidebar on resize past 768px ─────────── */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

});
