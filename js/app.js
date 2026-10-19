// Victor Burbano — CV site interactions.
// Content is static and crawlable; JavaScript only adds progressive enhancements.

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Mobile navigation scrollspy.
  // ---------------------------------------------------------------------------
  (function scrollspy() {
    const links = [...document.querySelectorAll('.mnav-link[data-section]')];
    if (!links.length || !('IntersectionObserver' in window)) return;

    const bySection = Object.fromEntries(links.map((link) => [link.dataset.section, link]));
    const setActive = (id) => {
      links.forEach((link) => link.classList.remove('active'));
      if (bySection[id]) bySection[id].classList.add('active');
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActive(visible[0].target.id);
    }, {
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0.05, 0.25, 0.5]
    });

    document.querySelectorAll('main section[id], main aside[id]').forEach((section) => {
      observer.observe(section);
    });

    // Initial state: first section.
    setActive('about');
  })();

  // ---------------------------------------------------------------------------
  // Accessible lightbox for the CubeLearn screenshots.
  // ---------------------------------------------------------------------------
  (function lightbox() {
    const dialog = document.getElementById('lightbox');
    const image = document.getElementById('lightbox-img');
    const closeButton = document.getElementById('lightbox-close');
    const previousButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');
    if (!dialog || !image || !closeButton || !previousButton || !nextButton) return;

    const images = [...document.querySelectorAll('.screenshot-img')];
    if (!images.length) return;

    let current = 0;
    let lastFocused = null;

    const updateArrows = () => {
      previousButton.disabled = current === 0;
      nextButton.disabled = current === images.length - 1;
    };

    const show = (index) => {
      current = index;
      const source = images[current];
      image.src = source.currentSrc || source.src;
      image.alt = source.alt || '';
      updateArrows();
    };

    const open = (index) => {
      lastFocused = document.activeElement;
      show(index);
      dialog.classList.add('open');
      dialog.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    };

    const close = () => {
      dialog.classList.remove('open');
      dialog.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      image.src = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    };

    dialog.setAttribute('aria-hidden', 'true');

    images.forEach((img, index) => {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Open image: ' + (img.alt || 'CubeLearn screenshot'));
      img.addEventListener('click', () => open(index));
      img.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open(index);
        }
      });
    });

    previousButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (current > 0) show(current - 1);
    });
    nextButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (current < images.length - 1) show(current + 1);
    });
    closeButton.addEventListener('click', close);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) close();
    });

    document.addEventListener('keydown', (event) => {
      if (!dialog.classList.contains('open')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft' && current > 0) show(current - 1);
      if (event.key === 'ArrowRight' && current < images.length - 1) show(current + 1);
      if (event.key === 'Tab') {
        // Keep focus inside the dialog.
        const focusable = [closeButton, previousButton, nextButton].filter((el) => !el.disabled);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  })();

  // ---------------------------------------------------------------------------
  // Dynamic year (keeps the footer current without editing HTML every year).
  // ---------------------------------------------------------------------------
  (function year() {
    const target = document.getElementById('y');
    if (target) target.textContent = String(new Date().getFullYear());
  })();

  // ---------------------------------------------------------------------------
  // Print: open all FAQ details so they are not clipped on paper.
  // ---------------------------------------------------------------------------
  (function printDetails() {
    const details = [...document.querySelectorAll('details')];
    if (!details.length) return;
    let previous = [];
    window.addEventListener('beforeprint', () => {
      previous = details.map((item) => item.open);
      details.forEach((item) => { item.open = true; });
    });
    window.addEventListener('afterprint', () => {
      details.forEach((item, index) => { item.open = previous[index]; });
    });
  })();
})();
