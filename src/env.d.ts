/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_NAME?: string;
  readonly PUBLIC_SITE_SUBTITLE?: string;
  readonly PUBLIC_TOP_BANNER_TEXT?: string;
  readonly PUBLIC_WHATSAPP_NUMBER?: string;
  readonly PUBLIC_PHONE_NUMBER?: string;
  readonly PUBLIC_SECONDARY_PHONE?: string;
  readonly PUBLIC_EMAIL?: string;
  readonly PUBLIC_FACEBOOK_URL?: string;
  readonly PUBLIC_MESSENGER_NAME?: string;
  readonly PUBLIC_ADDRESS?: string;
  readonly PUBLIC_SCHEDULE_WEEKDAYS?: string;
  readonly PUBLIC_SCHEDULE_SATURDAY?: string;
  readonly PUBLIC_SCHEDULE_SUNDAY?: string;
  readonly PUBLIC_PRICE_1000_4X0?: string;
  readonly PUBLIC_PRICE_1000_4X4?: string;
  readonly PUBLIC_PRICE_2500_4X0?: string;
  readonly PUBLIC_PRICE_5000_4X0?: string;
  readonly PUBLIC_PRICE_10000_4X0?: string;
  readonly PUBLIC_PRICE_DESIGN_COST?: string;
  readonly PUBLIC_HOME_TITLE?: string;
  readonly PUBLIC_HOME_INTRO?: string;
  readonly PUBLIC_SHIPPING_TEXT?: string;
  readonly PUBLIC_CONTACT_SUBTITLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
