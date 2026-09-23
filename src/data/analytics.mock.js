/**
 * DEMO DATA — analytics dashboard.
 *
 * Shaped to mirror what a GA4 Data API response would provide, so
 * `services/analytics.service.js` can be repointed at a real endpoint without
 * touching a single chart component. Nothing here is a real measurement.
 */

/** Deterministic PRNG — the dashboard must not jitter between renders. */
const seeded = (seed) => {
  let value = seed;
  return () => {
    value = (value * 1103515245 + 12345) % 2147483648;
    return value / 2147483648;
  };
};

const isoDay = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
};

const shortDay = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

/**
 * Daily visitor series with a weekly rhythm (weekends run lighter for a
 * studio site) plus a gentle upward drift.
 */
const buildTimeSeries = (days = 30) => {
  const rand = seeded(90222026);
  return Array.from({ length: days }, (_, index) => {
    const daysAgo = days - 1 - index;
    const iso = isoDay(daysAgo);
    const weekday = new Date(iso).getDay();
    const weekendDip = weekday === 0 || weekday === 6 ? 0.68 : 1;
    const drift = 1 + index / (days * 2.4);
    const noise = 0.82 + rand() * 0.36;

    const visitors = Math.round(120 * weekendDip * drift * noise);
    const sessions = Math.round(visitors * (1.18 + rand() * 0.14));
    const pageViews = Math.round(sessions * (2.4 + rand() * 0.9));

    return { date: iso, label: shortDay(iso), visitors, sessions, pageViews };
  });
};

export const visitorSeries = buildTimeSeries(30);

const sum = (key) => visitorSeries.reduce((total, row) => total + row[key], 0);

/** Headline tiles. `delta` is percent change vs the previous equal period. */
export const summaryMetrics = [
  { id: 'visitors', label: 'Visitors', value: sum('visitors'), delta: 12.4, format: 'number' },
  { id: 'pageViews', label: 'Page Views', value: sum('pageViews'), delta: 9.1, format: 'number' },
  { id: 'sessions', label: 'Sessions', value: sum('sessions'), delta: 10.6, format: 'number' },
  { id: 'engagement', label: 'Engaged Sessions', value: 61.8, delta: 3.2, format: 'percent' },
  { id: 'leads', label: 'Leads', value: 42, delta: 18.9, format: 'number' },
  { id: 'whatsapp', label: 'WhatsApp Clicks', value: 187, delta: 22.5, format: 'number' },
  { id: 'email', label: 'Email Clicks', value: 96, delta: -4.3, format: 'number' },
];

export const trafficSources = [
  { source: 'Organic Search', visitors: 1486, share: 41.2 },
  { source: 'Instagram', visitors: 968, share: 26.8 },
  { source: 'Direct', visitors: 612, share: 17.0 },
  { source: 'Referral', visitors: 318, share: 8.8 },
  { source: 'Google Business', visitors: 224, share: 6.2 },
];

export const topPages = [
  { path: '/', title: 'Home', views: 4128, avgSeconds: 96 },
  { path: '/works', title: 'Our Work', views: 2874, avgSeconds: 142 },
  { path: '/gifts', title: 'Personalized Gifts', views: 2311, avgSeconds: 118 },
  { path: '/services/wedding-photography', title: 'Wedding Photography', views: 1962, avgSeconds: 164 },
  { path: '/works/the-vow-made-aloud', title: 'The Vow Made Aloud', views: 1487, avgSeconds: 203 },
  { path: '/services', title: 'Services', views: 1246, avgSeconds: 88 },
  { path: '/contact', title: 'Contact', views: 1104, avgSeconds: 74 },
  { path: '/gifts/anniversary', title: 'Anniversary Gifts', views: 892, avgSeconds: 126 },
];

export const topWorks = [
  { title: 'The Vow Made Aloud', category: 'Wedding', views: 1487 },
  { title: 'Enchanted', category: 'Pre-Wedding', views: 1194 },
  { title: 'Where the Sea Met Us', category: 'Pre-Wedding', views: 906 },
  { title: 'Under the Arch', category: 'Engagement', views: 842 },
  { title: 'Before She Walked Out', category: 'Wedding', views: 671 },
  { title: 'In Her Frame', category: 'Portrait', views: 588 },
];

export const topGiftCategories = [
  { category: 'Photo Frames', views: 1342, enquiries: 18 },
  { category: 'Anniversary', views: 1086, enquiries: 14 },
  { category: 'Personalized Hampers', views: 864, enquiries: 11 },
  { category: 'Memory Gifts', views: 742, enquiries: 9 },
  { category: 'Corporate Gifts', views: 518, enquiries: 7 },
  { category: 'Return Gifts', views: 396, enquiries: 5 },
];

export const deviceDistribution = [
  { device: 'Mobile', sessions: 2718, share: 68.4 },
  { device: 'Desktop', sessions: 1016, share: 25.6 },
  { device: 'Tablet', sessions: 238, share: 6.0 },
];

export const conversionEvents = [
  { event: 'whatsapp_click', label: 'WhatsApp Click', count: 187 },
  { event: 'form_submit', label: 'Enquiry Submitted', count: 42 },
  { event: 'email_click', label: 'Email Click', count: 96 },
  { event: 'gift_enquiry', label: 'Gift Enquiry', count: 61 },
  { event: 'photography_enquiry', label: 'Photography Enquiry', count: 78 },
  { event: 'phone_click', label: 'Phone Click', count: 34 },
];

/** Selectable ranges. The demo set filters the 30-day series client-side. */
export const dateRanges = [
  { id: '7d', label: 'Last 7 days', days: 7 },
  { id: '14d', label: 'Last 14 days', days: 14 },
  { id: '30d', label: 'Last 30 days', days: 30 },
];

export default visitorSeries;
