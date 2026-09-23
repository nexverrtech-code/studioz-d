/**
 * Analytics.
 *
 * A single façade over GA4 and Microsoft Clarity so components never touch a
 * vendor global directly. Everything degrades silently when a provider is not
 * configured — calling `trackEvent` with no GA4 ID is a no-op, not an error.
 *
 * Scripts are injected lazily on first use rather than in index.html, so an
 * unconfigured deployment ships zero third-party bytes.
 */

import { siteConfig } from '@/config/site';

/** Canonical event names. Import these instead of typing strings at call sites. */
export const EVENTS = {
  PAGE_VIEW: 'page_view',
  VIEW_WORK: 'view_work',
  VIEW_GIFT: 'view_gift',
  VIEW_SERVICE: 'view_service',
  CTA_CLICK: 'cta_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  EMAIL_CLICK: 'email_click',
  PHONE_CLICK: 'phone_click',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  GIFT_ENQUIRY: 'gift_enquiry',
  PHOTOGRAPHY_ENQUIRY: 'photography_enquiry',
  SCROLL_DEPTH: 'scroll_depth',
  SEARCH: 'search',
  FILTER_APPLY: 'filter_apply',
  LIGHTBOX_OPEN: 'lightbox_open',
};

const state = {
  ga4Loaded: false,
  clarityLoaded: false,
  /** Queued events fired before a provider finished loading. */
  queue: [],
};

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

const injectScript = (src, attrs = {}) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

/* ------------------------------------------------------------------ GA4 -- */

const loadGa4 = async () => {
  const id = siteConfig.analytics.ga4MeasurementId;
  if (!id || state.ga4Loaded || !isBrowser()) return;
  state.ga4Loaded = true;

  window.dataLayer = window.dataLayer || [];
  // Must stay a function declaration — gtag relies on `arguments`.
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, {
    // The SPA router sends page_view manually on every route change.
    send_page_view: false,
    anonymize_ip: true,
  });

  try {
    await injectScript(`https://www.googletagmanager.com/gtag/js?id=${id}`);
    state.queue.splice(0).forEach(({ name, params }) => window.gtag('event', name, params));
  } catch {
    // A blocked analytics script must never break the site.
    state.ga4Loaded = false;
  }
};

/* -------------------------------------------------------------- Clarity -- */

const loadClarity = async () => {
  const id = siteConfig.analytics.clarityProjectId;
  if (!id || state.clarityLoaded || !isBrowser()) return;
  state.clarityLoaded = true;

  window.clarity =
    window.clarity ||
    function clarity(...args) {
      (window.clarity.q = window.clarity.q || []).push(args);
    };

  try {
    await injectScript(`https://www.clarity.ms/tag/${id}`);
  } catch {
    state.clarityLoaded = false;
  }
};

/* ----------------------------------------------------------------- API -- */

/** Boots whichever providers are configured. Safe to call more than once. */
export const initAnalytics = () => {
  if (!isBrowser()) return;
  loadGa4();
  loadClarity();
};

/**
 * Sends an event. Unconfigured providers are a silent no-op, and events fired
 * before the GA4 script resolves are queued rather than dropped.
 */
export const trackEvent = (name, params = {}) => {
  if (!isBrowser() || !name) return;

  const payload = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== '')
  );

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, payload);
  } else if (siteConfig.analytics.ga4MeasurementId) {
    state.queue.push({ name, params: payload });
    if (state.queue.length > 50) state.queue.shift();
  }

  if (typeof window.clarity === 'function') {
    try {
      window.clarity('event', name);
    } catch {
      /* Clarity is best-effort. */
    }
  }
};

export const trackPageView = ({ path, title }) => {
  if (!isBrowser()) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', EVENTS.PAGE_VIEW, {
      page_path: path,
      page_title: title,
      page_location: `${window.location.origin}${path}`,
    });
  } else if (siteConfig.analytics.ga4MeasurementId) {
    state.queue.push({
      name: EVENTS.PAGE_VIEW,
      params: { page_path: path, page_title: title },
    });
  }
};

/* ------------------------------------------------- Convenience wrappers -- */

export const trackWorkView = (work) =>
  trackEvent(EVENTS.VIEW_WORK, { work_slug: work?.slug, work_category: work?.category });

export const trackGiftView = (gift) =>
  trackEvent(EVENTS.VIEW_GIFT, { gift_slug: gift?.slug, gift_category: gift?.category });

export const trackServiceView = (service) =>
  trackEvent(EVENTS.VIEW_SERVICE, { service_slug: service?.slug });

export const trackCta = (label, location) =>
  trackEvent(EVENTS.CTA_CLICK, { cta_label: label, cta_location: location });

export const trackWhatsApp = (context) =>
  trackEvent(EVENTS.WHATSAPP_CLICK, { context });

export const trackEmail = (context) => trackEvent(EVENTS.EMAIL_CLICK, { context });

export const trackPhone = (context) => trackEvent(EVENTS.PHONE_CLICK, { context });

export const trackFormStart = (formName) => trackEvent(EVENTS.FORM_START, { form_name: formName });

export const trackFormSubmit = (formName, { interest, isGift } = {}) => {
  trackEvent(EVENTS.FORM_SUBMIT, { form_name: formName, interest });
  trackEvent(isGift ? EVENTS.GIFT_ENQUIRY : EVENTS.PHOTOGRAPHY_ENQUIRY, { interest });
};

export const trackFormError = (formName, reason) =>
  trackEvent(EVENTS.FORM_ERROR, { form_name: formName, reason });

export const trackSearch = (query, resultCount) =>
  trackEvent(EVENTS.SEARCH, { search_term: query, result_count: resultCount });

export const trackFilter = (surface, value) =>
  trackEvent(EVENTS.FILTER_APPLY, { surface, filter_value: value });

export const trackLightboxOpen = (context) => trackEvent(EVENTS.LIGHTBOX_OPEN, { context });

/* ----------------------------------------------------------- Scroll depth */

const DEPTH_MILESTONES = [25, 50, 75, 90];

/**
 * Fires `scroll_depth` once per milestone per page. Returns a teardown
 * function; the caller resets it on route change so depths are per-page.
 */
export const observeScrollDepth = (path) => {
  if (!isBrowser()) return () => {};

  const fired = new Set();
  let ticking = false;

  const read = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable > 0) {
      const percent = (window.scrollY / scrollable) * 100;
      for (const milestone of DEPTH_MILESTONES) {
        if (percent >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          trackEvent(EVENTS.SCROLL_DEPTH, { percent_scrolled: milestone, page_path: path });
        }
      }
    }
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(read);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
};

/* -------------------------------------------- Dashboard data (demo layer) */

/**
 * The /admin dashboard reads through this function, never from the mock file
 * directly. Swap the body for a real GA4 Data API call and nothing in the UI
 * needs to change.
 */
export const fetchDashboardData = async (rangeId = '30d') => {
  const [
    { visitorSeries, summaryMetrics, trafficSources, topPages, topWorks, topGiftCategories, deviceDistribution, conversionEvents, dateRanges },
  ] = await Promise.all([import('@/data/analytics.mock')]);

  const range = dateRanges.find((entry) => entry.id === rangeId) ?? dateRanges[2];
  const series = visitorSeries.slice(-range.days);

  // Recompute the volume tiles so the range selector visibly does something.
  const total = (key) => series.reduce((sum, row) => sum + row[key], 0);
  const metrics = summaryMetrics.map((metric) => {
    if (metric.id === 'visitors') return { ...metric, value: total('visitors') };
    if (metric.id === 'pageViews') return { ...metric, value: total('pageViews') };
    if (metric.id === 'sessions') return { ...metric, value: total('sessions') };
    return metric;
  });

  return {
    isDemoData: true,
    range,
    ranges: dateRanges,
    series,
    metrics,
    trafficSources,
    topPages,
    topWorks,
    topGiftCategories,
    deviceDistribution,
    conversionEvents,
  };
};

export default {
  initAnalytics,
  trackEvent,
  trackPageView,
  EVENTS,
};
