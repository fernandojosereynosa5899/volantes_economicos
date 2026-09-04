export function initFAQ(): void {
  const faqItems = document.querySelectorAll<HTMLElement>('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector<HTMLButtonElement>('.faq-question-btn');
    const panel = item.querySelector<HTMLElement>('.faq-answer-panel');

    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Optional: close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherPanel = otherItem.querySelector<HTMLElement>('.faq-answer-panel');
          if (otherPanel) otherPanel.style.maxHeight = '0px';
          otherItem.querySelector('button')?.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        if (panel) panel.style.maxHeight = '0px';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
