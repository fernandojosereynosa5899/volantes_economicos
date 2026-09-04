import rawConfig from '../data/site-config.json';

/**
 * Configuración Pública Central del Sitio - Volantes Económicos
 * Al ser información 100% pública (contacto, horarios, servicios y precios),
 * no requiere de variables de entorno (.env) y está centralizada aquí.
 */
export const siteConfig = rawConfig;
export type SiteConfig = typeof rawConfig;

export default siteConfig;
