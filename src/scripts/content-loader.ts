import defaultConfig from '../data/site-config.json';

const STORAGE_KEY = 'volantes_site_config';

export type SiteConfigType = typeof defaultConfig;

/**
 * Retorna la configuración base directamente de los datos públicos centralizados (site-config.json)
 */
export function getBaseConfig(): SiteConfigType {
  return JSON.parse(JSON.stringify(defaultConfig)) as SiteConfigType;
}

/**
 * Returns active configuration:
 * Prioritizes localStorage (GUI edits by owner), falls back to .env base config.
 */
export function getActiveConfig(): SiteConfigType {
  const baseConfig = getBaseConfig();
  if (typeof window === 'undefined') return baseConfig;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...baseConfig, ...parsed };
    }
  } catch (e) {
    console.warn('Error reading stored config:', e);
  }

  return baseConfig;
}

/**
 * Saves owner GUI changes into localStorage and updates DOM
 */
export function saveActiveConfig(config: SiteConfigType): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  applyConfigToDOM(config);
}

/**
 * Resets configuration back to .env base values
 */
export function resetActiveConfig(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  applyConfigToDOM(getBaseConfig());
}

/**
 * Dynamically binds and updates text nodes & links in the DOM
 */
export function applyConfigToDOM(config: SiteConfigType = getActiveConfig()): void {
  if (typeof document === 'undefined') return;

  // General texts
  document.querySelectorAll<HTMLElement>('[data-bind="general.siteName"]').forEach(el => {
    el.textContent = config.general.siteName;
  });

  document.querySelectorAll<HTMLElement>('[data-bind="general.siteSubtitle"]').forEach(el => {
    el.textContent = config.general.siteSubtitle;
  });

  document.querySelectorAll<HTMLElement>('[data-bind="general.phoneNumber"]').forEach(el => {
    el.textContent = config.general.phoneNumber;
  });

  document.querySelectorAll<HTMLElement>('[data-bind="general.secondaryPhone"]').forEach(el => {
    el.textContent = config.general.secondaryPhone;
  });

  document.querySelectorAll<HTMLElement>('[data-bind="general.email"]').forEach(el => {
    el.textContent = config.general.email;
  });

  document.querySelectorAll<HTMLElement>('[data-bind="general.address"]').forEach(el => {
    el.textContent = config.general.address;
  });

  document.querySelectorAll<HTMLElement>('[data-bind="general.topBannerText"]').forEach(el => {
    el.textContent = config.general.topBannerText;
  });

  // Pages
  document.querySelectorAll<HTMLElement>('[data-bind="home.title"]').forEach(el => {
    el.textContent = config.home.title;
  });

  document.querySelectorAll<HTMLElement>('[data-bind="home.intro"]').forEach(el => {
    el.textContent = config.home.intro;
  });

  document.querySelectorAll<HTMLElement>('[data-bind="entrega.text"]').forEach(el => {
    el.textContent = config.entrega.text;
  });

  document.querySelectorAll<HTMLElement>('[data-bind="contacto.subtitle"]').forEach(el => {
    el.textContent = config.contacto.subtitle;
  });

  // Dynamic WhatsApp links
  const waUrl = `https://wa.me/${config.general.whatsappNumber}?text=${encodeURIComponent('¡Hola! Me gustaría cotizar volantes.')}`;
  document.querySelectorAll<HTMLAnchorElement>('.whatsapp-link-dynamic, a[href^="https://wa.me/"]').forEach(a => {
    if (!a.id || a.id !== 'calc-whatsapp-btn') {
      a.href = waUrl;
    }
  });
}
