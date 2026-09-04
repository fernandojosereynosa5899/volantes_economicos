import { getActiveConfig } from './content-loader';

export function initGallery(): void {
  // Filters
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const cards = document.querySelectorAll<HTMLElement>('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal
  const modal = document.getElementById('gallery-lightbox') as HTMLElement | null;
  const modalImg = document.getElementById('lightbox-target-img') as HTMLImageElement | null;
  const modalTitle = document.getElementById('lightbox-target-title');
  const modalDesc = document.getElementById('lightbox-target-desc');
  const modalCategory = document.getElementById('lightbox-target-category');
  const modalBtn = document.getElementById('lightbox-whatsapp-cta') as HTMLAnchorElement | null;
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  function openLightbox(card: HTMLElement): void {
    const src = card.getAttribute('data-img') || '';
    const title = card.getAttribute('data-title') || 'Diseño de Volante Publicitario';
    const category = card.getAttribute('data-category') || 'Promociones';
    const desc = card.getAttribute('data-desc') || 'Diseño profesional optimizado para atracción de clientes y ventas.';

    if (modalImg) modalImg.src = src;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalCategory) modalCategory.textContent = category;

    if (modalBtn) {
      const text = `¡Hola Volantes Económicos! Me interesa cotizar un volante con un estilo similar a este: "${title}" (${category}). ¿Podrían orientarme con los paquetes disponibles?`;
      const waNumber = getActiveConfig().general.whatsappNumber;
      modalBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    }

    modal?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(): void {
    modal?.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  closeBtn?.addEventListener('click', closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeLightbox();
    }
  });
}
