/**
 * DEMO DATA — frontend lead management.
 *
 * Nothing here is a real person or a real enquiry. It exists so the /admin
 * surface can be built, reviewed and handed over with realistic shapes and
 * volumes. The admin UI shows a persistent "demo data" banner so this can
 * never be mistaken for live records.
 *
 * Replacing it with a backend means swapping `services/lead.service.js` —
 * the components read from the service, never from this file.
 */

export const LEAD_STATUSES = [
  { id: 'new', label: 'New', tone: 'info' },
  { id: 'contacted', label: 'Contacted', tone: 'neutral' },
  { id: 'discussion', label: 'Discussion', tone: 'neutral' },
  { id: 'quotation-sent', label: 'Quotation Sent', tone: 'accent' },
  { id: 'confirmed', label: 'Confirmed', tone: 'success' },
  { id: 'completed', label: 'Completed', tone: 'success' },
  { id: 'lost', label: 'Lost', tone: 'muted' },
];

export const LEAD_SOURCES = ['Organic Search', 'Instagram', 'Referral', 'Direct', 'Google Business', 'WhatsApp'];

/** Deterministic PRNG so the demo dataset is identical on every render/build. */
const seeded = (seed) => {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
};

const pick = (rand, list) => list[Math.floor(rand() * list.length) % list.length];

const INITIALS = ['A', 'R', 'S', 'M', 'K', 'N', 'P', 'V', 'D', 'T', 'J', 'H'];
const SURNAMES = [
  'Sharma', 'Menon', 'Iyer', 'Kapoor', 'Nair', 'Reddy', 'Joshi',
  'Bose', 'Rao', 'Verma', 'Patel', 'Khanna',
];

const SERVICE_INTERESTS = [
  'Wedding Photography',
  'Pre-Wedding Photography',
  'Portrait Photography',
  'Event Photography',
  'Product Photography',
  'Cinematic Films',
  'Baby & Family Photography',
  'Customized Gift',
];

const GIFT_INTERESTS = [
  'Photo Frames',
  'Personalized Hampers',
  'Memory Gifts',
  'Corporate Gifts',
  'Return Gifts',
  'Photo Albums',
  '',
];

const LANDING_PAGES = [
  '/',
  '/services/wedding-photography',
  '/gifts',
  '/works/the-beginning',
  '/services/pre-wedding-photography',
  '/gifts/anniversary',
  '/journal/how-to-prepare-for-your-pre-wedding-photoshoot',
  '/contact',
];

const UTM_SOURCES = ['google', 'instagram', 'direct', 'referral', 'newsletter'];
const UTM_CAMPAIGNS = ['wedding-season', 'gifting-festive', 'brand-always-on', 'journal-organic', ''];

const NOTES = [
  'Asked about full-day coverage and a film.',
  'Wants a framed set for parents. Sending photographs this week.',
  'Comparing two studios. Follow up after the weekend.',
  'Corporate gifting, roughly 80 recipients.',
  'Date not fixed yet — checking venue availability first.',
  'Wants the album and the memory box together.',
  'Needs product photographs for a marketplace listing.',
  '',
];

/** Budget is captured as a band, not a figure — matching the enquiry form. */
const BUDGET_BANDS = ['Not sure yet', 'Exploring options', 'Budget agreed', 'Flexible'];

const daysAgoIso = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(9 + (days % 9), (days * 7) % 60, 0, 0);
  return date.toISOString();
};

const futureIso = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

/** Builds a stable demo dataset of `count` leads. */
const buildLeads = (count = 42) => {
  const rand = seeded(20260922);
  return Array.from({ length: count }, (_, index) => {
    const createdDaysAgo = Math.floor(rand() * 90);
    const interest = pick(rand, SERVICE_INTERESTS);
    const isGift = interest === 'Customized Gift' || rand() > 0.72;
    const status = pick(rand, LEAD_STATUSES).id;
    const initial = pick(rand, INITIALS);
    const surname = pick(rand, SURNAMES);

    return {
      id: `SD-${String(2400 + index).padStart(4, '0')}`,
      name: `${initial}. ${surname}`,
      /** Masked in demo data — never a dialable number. */
      phone: `+•• ••••• ${String(10000 + Math.floor(rand() * 89999)).slice(0, 5)}`,
      email: `${surname.toLowerCase()}.${initial.toLowerCase()}@example.com`,
      service: isGift ? '' : interest,
      giftCategory: isGift ? pick(rand, GIFT_INTERESTS) : '',
      eventDate: rand() > 0.35 ? futureIso(Math.floor(rand() * 220) + 10) : '',
      budget: pick(rand, BUDGET_BANDS),
      source: pick(rand, LEAD_SOURCES),
      landingPage: pick(rand, LANDING_PAGES),
      utmSource: pick(rand, UTM_SOURCES),
      utmCampaign: pick(rand, UTM_CAMPAIGNS),
      status,
      notes: pick(rand, NOTES),
      createdAt: daysAgoIso(createdDaysAgo),
    };
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const mockLeads = buildLeads();

export const getStatusMeta = (id) =>
  LEAD_STATUSES.find((status) => status.id === id) ?? LEAD_STATUSES[0];

export default mockLeads;
