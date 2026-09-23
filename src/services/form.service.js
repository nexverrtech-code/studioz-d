/**
 * Enquiry delivery.
 *
 * EmailJS is loaded lazily on first submit — it is ~15KB that nobody who
 * never opens a form should have to download.
 *
 * When EmailJS is not configured the submit does NOT silently pretend to
 * succeed. It returns a `not-configured` result so the form can fall back to
 * WhatsApp / mailto, which is honest and still gets the enquiry through.
 */

import { siteConfig, hasEmailJs } from '@/config/site';

export const SUBMIT_RESULT = {
  SUCCESS: 'success',
  NOT_CONFIGURED: 'not-configured',
  SPAM: 'spam',
  ERROR: 'error',
};

/**
 * Two cheap, accessible spam defences:
 *  1. A honeypot field hidden from humans — bots fill it, people cannot see it.
 *  2. A minimum time-on-form. Nobody completes a seven-field enquiry in under
 *     three seconds; automated submissions routinely do.
 */
const MIN_FILL_MS = 3000;

export const checkSpamSignals = ({ honeypot, startedAt }) => {
  if (honeypot && String(honeypot).trim().length > 0) {
    return { isSpam: true, reason: 'honeypot' };
  }
  if (startedAt && Date.now() - startedAt < MIN_FILL_MS) {
    return { isSpam: true, reason: 'too-fast' };
  }
  return { isSpam: false, reason: null };
};

/** Shapes form state into the flat variables an EmailJS template expects. */
export const buildTemplateParams = (values, meta = {}) => ({
  from_name: values.name ?? '',
  from_email: values.email ?? '',
  from_phone: values.phone ?? '',
  interest: values.interest ?? '',
  gift_category: values.giftCategory ?? '',
  preferred_date: values.preferredDate ?? '',
  budget: values.budget ?? '',
  message: values.message ?? '',
  /** Attribution — useful when the studio wants to know what worked. */
  source_page: meta.sourcePage ?? '',
  referrer: meta.referrer ?? '',
  utm_source: meta.utmSource ?? '',
  utm_campaign: meta.utmCampaign ?? '',
  submitted_at: new Date().toISOString(),
});

/** Reads UTM attribution from the current URL and the referrer. */
export const readAttribution = () => {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    sourcePage: window.location.pathname,
    referrer: document.referrer || '',
    utmSource: params.get('utm_source') ?? '',
    utmCampaign: params.get('utm_campaign') ?? '',
  };
};

/**
 * Sends an enquiry.
 * Always resolves — callers branch on `result.status`, never on a thrown error.
 */
export const submitEnquiry = async (values, { honeypot, startedAt } = {}) => {
  const spam = checkSpamSignals({ honeypot, startedAt });
  if (spam.isSpam) {
    // Bots get a generic failure; they learn nothing about which check fired.
    return { status: SUBMIT_RESULT.SPAM, reason: spam.reason };
  }

  if (!hasEmailJs()) {
    return {
      status: SUBMIT_RESULT.NOT_CONFIGURED,
      reason:
        'EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY.',
    };
  }

  try {
    const emailjs = await import('@emailjs/browser');
    const { serviceId, templateId, publicKey } = siteConfig.emailjs;

    await emailjs.send(serviceId, templateId, buildTemplateParams(values, readAttribution()), {
      publicKey,
    });

    return { status: SUBMIT_RESULT.SUCCESS };
  } catch (error) {
    return {
      status: SUBMIT_RESULT.ERROR,
      reason: error?.text || error?.message || 'The enquiry could not be sent.',
    };
  }
};

/** Prefilled WhatsApp text for the fallback path and product enquiry buttons. */
export const buildEnquiryMessage = (values = {}) => {
  const lines = [`Hello ${siteConfig.name}, I would like to enquire.`];
  if (values.name) lines.push(`Name: ${values.name}`);
  if (values.interest) lines.push(`Interested in: ${values.interest}`);
  if (values.giftCategory) lines.push(`Gift: ${values.giftCategory}`);
  if (values.preferredDate) lines.push(`Preferred date: ${values.preferredDate}`);
  if (values.message) lines.push(`\n${values.message}`);
  return lines.join('\n');
};

export default submitEnquiry;
