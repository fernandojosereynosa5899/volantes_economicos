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
}
