import { getActiveConfig } from './content-loader';
import type { PaperType, PrintSize, PrintColor, Quantity } from '../types';

export function getWhatsAppPhone(): string {
  return getActiveConfig().general.whatsappNumber;
}
export const WHATSAPP_PHONE = getWhatsAppPhone();

export function calculatePrice(
  qty: Quantity,
  size: PrintSize,
  paper: PaperType,
  color: PrintColor,
  withDesign: boolean
): { total: number; unitPrice: number; designCost: number } {
  const config = getActiveConfig();
  const matrix = config.calculator.pricingMatrix as Record<string, Record<string, Record<string, number>>>;
  const qtyKey = String(qty);
  
  const base = matrix[qtyKey]?.[size]?.[color] ?? 590;
  
  const paperObj = config.calculator.papers.find(p => p.id === paper);
  const paperMultiplier = paperObj ? paperObj.multiplier : 1.0;
  
  const designCost = withDesign ? config.calculator.designServiceCost : 0;
  
  const total = Math.round(base * paperMultiplier) + designCost;
  const unitPrice = +(total / qty).toFixed(2);

  return { total, unitPrice, designCost };
}

export function generateWhatsAppQuoteUrl(
  qty: Quantity,
  size: PrintSize,
  paper: PaperType,
  color: PrintColor,
  withDesign: boolean,
  total: number
): string {
  const config = getActiveConfig();
  const sizeObj = config.calculator.sizes.find(s => s.id === size);
  const paperObj = config.calculator.papers.find(p => p.id === paper);
  const colorObj = config.calculator.colors.find(c => c.id === color);

  const sizeLabel = sizeObj ? `${sizeObj.label} (${sizeObj.dimensions})` : size;
  const paperLabel = paperObj ? paperObj.label : paper;
  const colorLabel = colorObj ? colorObj.label : color;

  const message = `¡Hola ${config.general.siteName}! 👋 Quiero solicitar una cotización:

📄 *Detalles del Pedido:*
• *Cantidad:* ${qty.toLocaleString()} volantes
• *Tamaño:* ${sizeLabel}
• *Papel:* ${paperLabel}
• *Impresión:* ${colorLabel}
• *Servicio de Diseño:* ${withDesign ? 'Sí, requiero diseño' : 'Ya tengo diseño listo'}

💰 *Total Estimado:* $${total.toLocaleString('es-MX')} MXN
🚚 ¿Me podrían confirmar sobre envíos a toda la república?`;

  return `https://wa.me/${config.general.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function initCalculator(): void {
  const form = document.getElementById('flyer-calc-form') as HTMLFormElement | null;
  if (!form) return;

  const totalEl = document.getElementById('calc-total-price');
  const unitEl = document.getElementById('calc-unit-price');
  const sizeValEl = document.getElementById('calc-size-val');
  const paperValEl = document.getElementById('calc-paper-val');
  const colorValEl = document.getElementById('calc-color-val');
  const qtyValEl = document.getElementById('calc-qty-val');
  const ctaBtn = document.getElementById('calc-whatsapp-btn') as HTMLAnchorElement | null;

  function update(): void {
    if (!form) return;
    const config = getActiveConfig();

    const qty = parseInt((form.querySelector('input[name="calc_qty"]:checked') as HTMLInputElement)?.value || '1000') as Quantity;
    const size = ((form.querySelector('input[name="calc_size"]:checked') as HTMLInputElement)?.value || 'cuarto-carta') as PrintSize;
    const paper = ((form.querySelector('input[name="calc_paper"]:checked') as HTMLInputElement)?.value || 'couche-130') as PaperType;
    const color = ((form.querySelector('input[name="calc_color"]:checked') as HTMLInputElement)?.value || '4x0') as PrintColor;
    const withDesign = (form.querySelector('input[name="calc_design"]') as HTMLInputElement)?.checked ?? false;

    const { total, unitPrice } = calculatePrice(qty, size, paper, color, withDesign);

    const sizeObj = config.calculator.sizes.find(s => s.id === size);
    const paperObj = config.calculator.papers.find(p => p.id === paper);

    if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-MX')} MXN`;
    if (unitEl) unitEl.textContent = `$${unitPrice.toFixed(2)} c/u`;
    if (sizeValEl) sizeValEl.textContent = sizeObj ? `${sizeObj.label} (${sizeObj.dimensions})` : size;
    if (paperValEl) paperValEl.textContent = paperObj ? paperObj.label : paper;
    if (colorValEl) colorValEl.textContent = color === '4x0' ? '1 cara (4x0)' : '2 caras (4x4)';
    if (qtyValEl) qtyValEl.textContent = `${qty.toLocaleString()} pzas`;

    if (ctaBtn) {
      ctaBtn.href = generateWhatsAppQuoteUrl(qty, size, paper, color, withDesign, total);
    }
  }

  form.addEventListener('change', update);
  update();
}
