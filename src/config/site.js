/**
 * Studioz D — single source of truth for brand and business configuration.
 *
 * IMPORTANT: every real-world detail (phone, email, address, social profiles)
 * is intentionally EMPTY until the studio supplies it. Nothing here is
 * invented. Fill the matching `VITE_*` value in `.env.local` and the whole
 * site — links, footer, structured data, contact dock — updates at once.
 *
 * Helpers below (`hasWhatsApp`, `hasEmail`, ...) let components hide a channel
 * cleanly instead of rendering a dead link.
 */

const env = import.meta.env ?? {};

/** Reads an env var, trims it, and treats blank strings as "not configured". */
const read = (key, fallback = '') => {
  const value = env[key];
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

/** Strips everything but digits — WhatsApp deep links require a bare number. */
const digitsOnly = (value) => value.replace(/\D/g, '');

const siteUrl = read('VITE_SITE_URL', 'https://studiozd.com').replace(/\/+$/, '');

export const siteConfig = {
  name: 'Studioz D',
  legalName: 'Studioz D',
  /** Used as the <title> suffix and in structured data. */
  tagline: 'Photography, Films & Personalized Gifts',
  /** The brand promise, used verbatim across hero, footer and CTA surfaces. */
  promise: {
    capture: 'Capture the moment.',
    create: 'Create the memory.',
    keep: 'Keep it forever.',
  },
  description:
    'Studioz D is a creative photography and personalized-gifting studio. We capture weddings, portraits, events and products — then turn those memories into gifts made from your story.',
  shortDescription: 'Photography, films and personalized creations.',
  url: siteUrl,
  locale: 'en_IN',
  language: 'en',
  /** Launch/founding year is left null on purpose — no invented history. */
  foundingYear: null,
  copyrightYear: 2026,

  /* --------------------------------------------------------------------- */
  /* Contact channels — blank until configured.                             */
  /* --------------------------------------------------------------------- */
  contact: {
    whatsappNumber: digitsOnly(read('VITE_WHATSAPP_NUMBER')),
    email: read('VITE_CONTACT_EMAIL'),
    phone: read('VITE_CONTACT_PHONE'),
  },

  /* --------------------------------------------------------------------- */
  /* Address — omitted entirely from structured data unless complete.       */
  /* --------------------------------------------------------------------- */
  address: {
    street: read('VITE_BUSINESS_STREET'),
    locality: read('VITE_BUSINESS_LOCALITY'),
    region: read('VITE_BUSINESS_REGION'),
    postalCode: read('VITE_BUSINESS_POSTAL_CODE'),
    country: read('VITE_BUSINESS_COUNTRY'),
  },

  social: {
    instagram: read('VITE_INSTAGRAM_URL'),
    googleBusiness: read('VITE_GOOGLE_BUSINESS_URL'),
    youtube: read('VITE_YOUTUBE_URL'),
  },

  analytics: {
    ga4MeasurementId: read('VITE_GA4_MEASUREMENT_ID'),
    clarityProjectId: read('VITE_CLARITY_PROJECT_ID'),
    searchConsoleVerification: read('VITE_GSC_VERIFICATION'),
  },

  emailjs: {
    serviceId: read('VITE_EMAILJS_SERVICE_ID'),
    templateId: read('VITE_EMAILJS_TEMPLATE_ID'),
    publicKey: read('VITE_EMAILJS_PUBLIC_KEY'),
  },

  admin: {
    /**
     * Frontend-only demo gate. This is NOT authentication — the passcode ships
     * in the bundle. It exists so the dashboard is not stumbled into, and so
     * `services/auth.service.js` has a seam where a real provider drops in.
     */
    demoPasscode: read('VITE_ADMIN_DEMO_PASSCODE', 'studiozd-demo'),
  },

  seo: {
    defaultOgImage: '/assets/images/og/studioz-d-share.png',
    twitterHandle: '',
  },
};

/* ------------------------------------------------------------------------ */
/* Availability helpers — components use these to hide unconfigured channels */
/* ------------------------------------------------------------------------ */

export const hasWhatsApp = () => siteConfig.contact.whatsappNumber.length >= 8;
export const hasEmail = () => siteConfig.contact.email.includes('@');
export const hasPhone = () => siteConfig.contact.phone.length >= 6;
export const hasAddress = () =>
  Boolean(siteConfig.address.locality && siteConfig.address.country);

/** True only when EmailJS is fully configured; the form degrades gracefully otherwise. */
export const hasEmailJs = () =>
  Boolean(
    siteConfig.emailjs.serviceId &&
      siteConfig.emailjs.templateId &&
      siteConfig.emailjs.publicKey
  );

/**
 * Builds a wa.me deep link with a prefilled message.
 * Returns null when no number is configured so callers can fall back to email.
 */
export const buildWhatsAppLink = (message = '') => {
  if (!hasWhatsApp()) return null;
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Builds a mailto: link with subject and body. Returns null when unconfigured. */
export const buildMailtoLink = ({ subject = '', body = '' } = {}) => {
  if (!hasEmail()) return null;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${siteConfig.contact.email}${query ? `?${query}` : ''}`;
};

export const buildTelLink = () =>
  hasPhone() ? `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}` : null;

/** Absolute URL for canonicals, OG tags and JSON-LD. */
export const absoluteUrl = (path = '/') => {
  if (!path) return siteConfig.url;
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
};

/** Every configured social profile, as a flat list for `sameAs` in JSON-LD. */
export const socialProfiles = () =>
  Object.values(siteConfig.social).filter((url) => url.startsWith('http'));

export default siteConfig;
