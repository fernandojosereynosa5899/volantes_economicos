import { getActiveConfig } from './content-loader';

export function initContactForm(): void {
  const forms = [
    document.getElementById('main-contact-form'),
    document.getElementById('quick-quote-form')
  ].filter(Boolean) as HTMLFormElement[];

  forms.forEach((form) => {
    const getFormData = () => {
      const name = (form.querySelector('#contact-name') as HTMLInputElement)?.value.trim() || '';
      const phone = (form.querySelector('#contact-phone') as HTMLInputElement)?.value.trim() || '';
      const email = (form.querySelector('#contact-email') as HTMLInputElement)?.value.trim() || '';
      const message = (form.querySelector('#contact-message') as HTMLTextAreaElement)?.value.trim() || '';
      return { name, phone, email, message };
    };

    // 1. Enviar por WhatsApp
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { name, phone, email, message } = getFormData();

      if (!name || !phone) {
        alert('Por favor, ingresa al menos tu nombre y teléfono.');
        return;
      }

      const text = `¡Hola Volantes Económicos! 👋
Mi nombre es: *${name}*
Teléfono: *${phone}*
Correo: *${email || 'No especificado'}*

Detalles del Pedido:
${message || 'Me interesa cotizar volantes económicos.'}`;

      const waNumber = getActiveConfig().general.whatsappNumber;
      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });

    // 2. Enviar por Correo Electrónico
    const emailBtn = form.querySelector('#btn-send-email') as HTMLButtonElement | null;
    if (emailBtn) {
      emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const { name, phone, email, message } = getFormData();

        if (!name || !phone) {
          alert('Por favor, ingresa al menos tu nombre y teléfono antes de enviar.');
          return;
        }

        const targetEmail = getActiveConfig().general.email;
        const subject = encodeURIComponent(`Cotización de Volantes - ${name}`);
        const body = encodeURIComponent(`Hola, me interesa una cotización de volantes:

• Nombre: ${name}
• Teléfono: ${phone}
• Correo de contacto: ${email || 'No especificado'}

Mensaje / Detalles:
${message || 'Por favor contáctenme para cotizar.'}
`);

        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
      });
    }
  });
}

