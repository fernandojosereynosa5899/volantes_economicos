export function initAnimations(): void {
  // Check for prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-item, .step-card, .sidebar-widget, .closing-cta-card').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const animatableSelector = '.reveal-item, .step-card, .sidebar-widget, .closing-cta-card';
  const elements = document.querySelectorAll(animatableSelector);
  
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    initImageLoadAnimations();
    return;
  }

  // Stagger delays for sibling cards
  const containers = document.querySelectorAll('.steps-detailed-list, .gallery-grid, .page-layout-grid');
  containers.forEach(container => {
    const children = container.querySelectorAll('.step-card, .gallery-card, .sidebar-widget');
    children.forEach((child, index) => {
      const el = child as HTMLElement;
      if (!el.style.transitionDelay) {
        // Stagger smoothly between 0.05s and 0.25s
        el.style.transitionDelay = `${Math.min(index % 4 * 0.08, 0.3)}s`;
      }
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
  initImageLoadAnimations();
}

/**
 * Monitorea la descarga de imágenes en la página para mostrar una
 * animación shimmer mientras descargan y un fade-in suave al completarse.
 */
export function initImageLoadAnimations(): void {
  const images = document.querySelectorAll<HTMLImageElement>(
    '.gallery-img, .pagina-product-image img, .trabajo-card-item img, img[loading="lazy"], .img-lazy-animate'
  );

  images.forEach((img) => {
    const wrapper = img.closest(
      '.gallery-img-wrapper, .pagina-product-image, .trabajo-card-item, .img-shimmer-wrapper'
    );

    const markLoaded = () => {
      img.classList.add('is-loaded');
      wrapper?.classList.add('is-loaded');
    };

    if (img.complete && img.naturalHeight !== 0) {
      markLoaded();
    } else {
      img.classList.remove('is-loaded');
      wrapper?.classList.remove('is-loaded');

      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', markLoaded, { once: true });
    }
  });
}
