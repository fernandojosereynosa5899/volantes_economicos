import { getActiveConfig } from './content-loader';

export function initContactForm(): void {
  const form = document.getElementById('quick-quote-form') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (form.querySelector('#contact-name') as HTMLInputElement)?.value || '';
    const phone = (form.querySelector('#contact-phone') as HTMLInputElement)?.value || '';
    const email = (form.querySelector('#contact-email') as HTMLInputElement)?.value || '';
    const service = (form.querySelector('#contact-service') as HTMLSelectElement)?.value || 'Volantes 1/4 de Carta';
    const message = (form.querySelector('#contact-message') as HTMLTextAreaElement)?.value || '';

    const text = `¡Hola Volantes Económicos! 👋
Mi nombre es: *${name}*
Teléfono: *${phone}*
Correo: *${email}*
Interés: *${service}*

Mensaje adicional:
${message}`;

    const waNumber = getActiveConfig().general.whatsappNumber;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}
