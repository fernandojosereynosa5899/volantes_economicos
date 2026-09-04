export type PaperType = 'couche-130' | 'couche-150' | 'bond-90';

export type PrintSize = 'cuarto-carta' | 'media-carta' | 'carta-completa';

export type PrintColor = '4x0' | '4x4';

export type Quantity = 1000 | 2500 | 5000 | 10000 | 20000;

export interface PriceOption {
  quantity: Quantity;
  paper: PaperType;
  size: PrintSize;
  color: PrintColor;
  withDesign: boolean;
  basePrice: number;
}

export interface PackageDeal {
  id: string;
  name: string;
  badge?: string;
  quantity: string;
  size: string;
  paper: string;
  colors: string;
  price: number;
  featured?: boolean;
  features: string[];
}

export interface FlyerDesign {
  id: number;
  title: string;
  category: 'Restaurantes' | 'Servicios' | 'Promociones' | 'Eventos' | 'Salud y Belleza';
  image: string;
  description: string;
  dimensions: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  business: string;
  city: string;
  text: string;
  rating: number;
}
