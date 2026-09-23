/**
 * Navigation model.
 *
 * Desktop, tablet and mobile all read from this file, but each renders it with
 * its own layout — the mobile drawer is not a squeezed desktop bar.
 */

/** Primary bar (desktop). Contact lives in the CTA, not the list. */
export const primaryNav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Works', to: '/works' },
  { label: 'Gifts', to: '/gifts' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/journal' },
];

/** Mobile drawer adds Contact as a full row, since there is room for it. */
export const mobileNav = [...primaryNav, { label: 'Contact', to: '/contact' }];

/**
 * Optional mega-menu payload for the desktop Services / Gifts entries.
 * Kept deliberately short — a menu is a signpost, not a sitemap.
 */
export const navFlyouts = {
  '/services': {
    title: 'Photography & Film',
    blurb: 'Twelve ways we tell a story with light.',
    columns: [
      {
        heading: 'Celebrations',
        links: [
          { label: 'Wedding', to: '/services/wedding-photography' },
          { label: 'Pre-Wedding', to: '/services/pre-wedding-photography' },
          { label: 'Engagement', to: '/services/engagement-photography' },
          { label: 'Events', to: '/services/event-photography' },
        ],
      },
      {
        heading: 'People',
        links: [
          { label: 'Portrait', to: '/services/portrait-photography' },
          { label: 'Maternity', to: '/services/maternity-photography' },
          { label: 'Baby & Family', to: '/services/baby-family-photography' },
          { label: 'Custom Shoots', to: '/services/custom-photography' },
        ],
      },
      {
        heading: 'Brands & Motion',
        links: [
          { label: 'Product', to: '/services/product-photography' },
          { label: 'Commercial', to: '/services/commercial-photography' },
          { label: 'Cinematic Films', to: '/services/cinematic-films' },
          { label: 'Reels', to: '/services/reels' },
        ],
      },
    ],
  },
  '/gifts': {
    title: 'Personalized Gifts',
    blurb: 'Choose a memory. Add your words. Make it yours.',
    columns: [
      {
        heading: 'By Occasion',
        links: [
          { label: 'Birthday', to: '/gifts/birthday' },
          { label: 'Anniversary', to: '/gifts/anniversary' },
          { label: 'Wedding', to: '/gifts/wedding' },
          { label: 'Engagement', to: '/gifts/engagement' },
        ],
      },
      {
        heading: 'By Relationship',
        links: [
          { label: 'Couples', to: '/gifts/couples' },
          { label: 'Parents', to: '/gifts/parents' },
          { label: 'Friends', to: '/gifts/friends' },
          { label: 'Baby & Family', to: '/gifts/baby-family' },
        ],
      },
      {
        heading: 'By Creation',
        links: [
          { label: 'Photo Frames', to: '/gifts/photo-frames' },
          { label: 'Custom Hampers', to: '/gifts/custom-hampers' },
          { label: 'Memory Gifts', to: '/gifts/memory-gifts' },
          { label: 'Corporate', to: '/gifts/corporate' },
        ],
      },
    ],
  },
};

/** Footer link groups. */
export const footerNav = {
  explore: {
    heading: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Services', to: '/services' },
      { label: 'Works', to: '/works' },
      { label: 'Gifts', to: '/gifts' },
      { label: 'About', to: '/about' },
      { label: 'Journal', to: '/journal' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  photography: {
    heading: 'Photography',
    links: [
      { label: 'Wedding', to: '/services/wedding-photography' },
      { label: 'Pre-Wedding', to: '/services/pre-wedding-photography' },
      { label: 'Portrait', to: '/services/portrait-photography' },
      { label: 'Events', to: '/services/event-photography' },
      { label: 'Products', to: '/services/product-photography' },
      { label: 'Films', to: '/services/cinematic-films' },
    ],
  },
  gifts: {
    heading: 'Gifts',
    links: [
      { label: 'Birthday', to: '/gifts/birthday' },
      { label: 'Anniversary', to: '/gifts/anniversary' },
      { label: 'Wedding', to: '/gifts/wedding' },
      { label: 'Couples', to: '/gifts/couples' },
      { label: 'Frames', to: '/gifts/photo-frames' },
      { label: 'Hampers', to: '/gifts/custom-hampers' },
      { label: 'Corporate', to: '/gifts/corporate' },
    ],
  },
};

export const legalNav = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Sitemap', to: '/sitemap' },
];

/** Admin shell navigation — never surfaced in customer-facing navigation. */
export const adminNav = [
  { label: 'Analytics', to: '/admin/analytics', icon: 'BarChart3' },
  { label: 'Leads', to: '/admin/leads', icon: 'Inbox' },
];

export default primaryNav;
