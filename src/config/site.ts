import rawConfig from '../data/site-config.json';

/**
 * URL base oficial de GitHub para servir las imágenes en alta velocidad
 * Repositorio: https://github.com/fernandojosereynosa5899/volantes_economicos
 */
export const GITHUB_REPO_RAW = 'https://raw.githubusercontent.com/fernandojosereynosa5899/volantes_economicos/main';
export const GITHUB_IMG_BASE = `${GITHUB_REPO_RAW}/img`;

/**
 * Retorna la URL directa oficial de GitHub en máxima resolución y calidad
 */
export function getGithubImageUrl(filenameOrPath: string): string {
  const clean = filenameOrPath.startsWith('/') ? filenameOrPath.slice(1) : filenameOrPath;
  if (clean.startsWith('public/images/') || clean.startsWith('img/')) {
    return `${GITHUB_REPO_RAW}/${clean}`;
  }
  if (clean.startsWith('images/')) {
    return `${GITHUB_REPO_RAW}/public/${clean}`;
  }
  return `${GITHUB_IMG_BASE}/${encodeURIComponent(clean)}`;
}

/**
 * Configuración Pública Central del Sitio - Volantes Económicos
 * Al ser información 100% pública (contacto, horarios, servicios y precios),
 * no requiere de variables de entorno (.env) y está centralizada aquí.
 */
export const siteConfig = rawConfig;
export type SiteConfig = typeof rawConfig;

export default siteConfig;
