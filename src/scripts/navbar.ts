export function initNavbar(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const toggleBtn = document.querySelector<HTMLButtonElement>('.mobile-toggle');
  const drawer = document.querySelector<HTMLElement>('.mobile-drawer');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  toggleBtn?.addEventListener('click', () => {
    if (!drawer) return;
    drawer.classList.toggle('is-open');
    const isOpen = drawer.classList.contains('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close drawer on link click
  const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer?.classList.remove('is-open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    });
  });
}
