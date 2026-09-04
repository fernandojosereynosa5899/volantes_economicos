import rawConfig from '../data/site-config.json';

/**
 * Global Environment Configuration
 * Reads all PUBLIC_* environment variables from .env via import.meta.env
 * Eliminates any hardcoded data in templates or scripts.
 */
export const ENV = {
  // General & Branding
  siteName: import.meta.env.PUBLIC_SITE_NAME || rawConfig.general.siteName,
  siteSubtitle: import.meta.env.PUBLIC_SITE_SUBTITLE || rawConfig.general.siteSubtitle,
  topBannerText: import.meta.env.PUBLIC_TOP_BANNER_TEXT || rawConfig.general.topBannerText,

  // Contact & Social
  whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER || rawConfig.general.whatsappNumber,
  phoneNumber: import.meta.env.PUBLIC_PHONE_NUMBER || rawConfig.general.phoneNumber,
  secondaryPhone: import.meta.env.PUBLIC_SECONDARY_PHONE || rawConfig.general.secondaryPhone,
  email: import.meta.env.PUBLIC_EMAIL || rawConfig.general.email,
  facebookUrl: import.meta.env.PUBLIC_FACEBOOK_URL || rawConfig.general.facebookUrl,
  messengerName: import.meta.env.PUBLIC_MESSENGER_NAME || rawConfig.general.messengerName,
  address: import.meta.env.PUBLIC_ADDRESS || rawConfig.general.address,

  // Schedule
  schedule: {
    weekdays: import.meta.env.PUBLIC_SCHEDULE_WEEKDAYS || rawConfig.general.schedule.weekdays,
    saturday: import.meta.env.PUBLIC_SCHEDULE_SATURDAY || rawConfig.general.schedule.saturday,
    sunday: import.meta.env.PUBLIC_SCHEDULE_SUNDAY || rawConfig.general.schedule.sunday,
  },

  // Main Texts
  homeTitle: import.meta.env.PUBLIC_HOME_TITLE || rawConfig.home.title,
  homeIntro: import.meta.env.PUBLIC_HOME_INTRO || rawConfig.home.intro,
  shippingText: import.meta.env.PUBLIC_SHIPPING_TEXT || rawConfig.entrega.text,
  contactSubtitle: import.meta.env.PUBLIC_CONTACT_SUBTITLE || rawConfig.contacto.subtitle,

  // Calculator Base Prices
  prices: {
    p1000_4x0: Number(import.meta.env.PUBLIC_PRICE_1000_4X0) || rawConfig.calculator.pricingMatrix['1000']['cuarto-carta']['4x0'],
    p1000_4x4: Number(import.meta.env.PUBLIC_PRICE_1000_4X4) || rawConfig.calculator.pricingMatrix['1000']['cuarto-carta']['4x4'],
    p2500_4x0: Number(import.meta.env.PUBLIC_PRICE_2500_4X0) || rawConfig.calculator.pricingMatrix['2500']['cuarto-carta']['4x0'],
    p5000_4x0: Number(import.meta.env.PUBLIC_PRICE_5000_4X0) || rawConfig.calculator.pricingMatrix['5000']['cuarto-carta']['4x0'],
    p10000_4x0: Number(import.meta.env.PUBLIC_PRICE_10000_4X0) || rawConfig.calculator.pricingMatrix['10000']['cuarto-carta']['4x0'],
    designCost: Number(import.meta.env.PUBLIC_PRICE_DESIGN_COST) || rawConfig.calculator.designServiceCost,
  }
};
