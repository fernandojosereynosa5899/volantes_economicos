import rawConfig from '../data/site-config.json';

/**
 * URL base oficial de GitHub para servir las imágenes en alta velocidad
 * Repositorio: https://github.com/fernandojosereynosa5899/volantes_economicos
 */
export const GITHUB_IMG_BASE = 'https://raw.githubusercontent.com/fernandojosereynosa5899/volantes_economicos/main/img';

/**
 * Retorna la URL directa de GitHub para cualquier imagen
 */
export function getGithubImageUrl(filename: string): string {
  const encodedName = encodeURIComponent(filename);
  return `${GITHUB_IMG_BASE}/${encodedName}`;
}

/**
 * Configuración Pública Central del Sitio - Volantes Económicos
 * Al ser información 100% pública (contacto, horarios, servicios y precios),
 * no requiere de variables de entorno (.env) y está centralizada aquí.
 */
export const siteConfig = rawConfig;
export type SiteConfig = typeof rawConfig;

export default siteConfig;
