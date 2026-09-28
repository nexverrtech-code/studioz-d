/**
 * Navigation model.
 *
 * Studioz D is one brand with two businesses, so there is no single correct
 * nav bar. The header shows the nav for the world the visitor is currently in
 * (see `hooks/useWorld.js`), because putting twelve photography services and
 * thirty gift categories in one menu helps nobody.
 *
 * Desktop, tablet and mobile all read from this file, but each renders it with
 * its own layout — the mobile drawer is not a squeezed desktop bar.
 */

/**
 * The studio's two creative worlds. Declared here rather than in the hook so
 * this module stays dependency-free — the build's asset scanner imports it
 * directly in Node, where the `@/` alias does not resolve.
 */
export const WORLDS = {
  LANDING: 'landing',
  PHOTOGRAPHY: 'photography',
  GIFTS: 'gifts',
};

/**
 * The two worlds, as the header's switch presents them.
 *
 * This is the one piece of navigation on every page: which half of the studio
 * you are in, and a single step to the other. Because the switch owns the
 * cross-world jump, the per-world link lists below no longer repeat
 * "Photography" and "Gifts" as ordinary items.
 *
 * `image` is used by the mobile drawer and the footer, where each world gets a
 * tile. Both files are 3:2, matching the 3:2 boxes they are shown in.
 */
export const worldSwitch = [
  {
    id: WORLDS.PHOTOGRAPHY,
    label: 'Photography',
    lead: 'Capture it.',
    to: '/services',
    enquire: '/contact?interest=photography',
    enquireLabel: 'Book a shoot',
    image: '/assets/images/works/studioz-d-pre-wedding-rocks-wave-gown.webp',
    alt: 'Couple on wet rocks as a wave breaks behind them, photographed by Studioz D',
    slideAspect: '3/2',
    slides: [
      '/assets/images/works/studioz-d-wedding-sparkler-entry.webp',
      '/assets/images/works/studioz-d-bridal-gold-headpiece-smile.webp',
      '/assets/images/works/studioz-d-pre-wedding-rocks-wave-gown.webp',
      '/assets/images/works/studioz-d-baby-newborn-floral-nest.webp',
    ],
  },
  {
    id: WORLDS.GIFTS,
    label: 'Gifts',
    lead: 'Keep it.',
    to: '/gifts',
    enquire: '/contact?interest=gift',
    enquireLabel: 'Order a gift',
    image: '/assets/images/gifts/studioz-d-gift-framed-print-panel.webp',
    alt: 'A Studioz D bridal portrait printed, matted and framed on a wall',
    slideAspect: '1/1',
    slides: [
      '/assets/images/gifts/studioz-d-gift-acrylic-photo-panel.webp',
      '/assets/images/gifts/studioz-d-gift-caricature-standee-square.webp',
      '/assets/images/gifts/studioz-d-gift-crystal-photo-block.webp',
      '/assets/images/gifts/studioz-d-gift-infinity-name-lamp.webp',
    ],
  },
];

/**
 * The landing bar. Shown on the gateway and on shared pages (contact, FAQ,
 * legal) where the visitor has not committed to a world yet. The switch beside
 * it names both worlds; these are the pages that belong to neither.
 */
export const landingNav = [
  { label: 'Works', to: '/works' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/journal' },
];

/** Inside the photography world. The full service list is the switch's menu. */
export const photographyNav = [
  { label: 'Works', to: '/works' },
  { label: 'Journal', to: '/journal' },
  { label: 'About', to: '/about' },
];

/** Inside the gifts world. */
export const giftsNav = [
  { label: 'Occasions', to: '/gifts#gift-group-occasion' },
  { label: 'Creations', to: '/gifts#gift-group-creation' },
  { label: 'Personalized', to: '/gifts/personalized' },
];

const NAV_BY_WORLD = {
  [WORLDS.LANDING]: landingNav,
  [WORLDS.PHOTOGRAPHY]: photographyNav,
  [WORLDS.GIFTS]: giftsNav,
};

export const navForWorld = (world) => NAV_BY_WORLD[world] ?? landingNav;

/**
 * Mobile drawer list. The drawer opens with a tile for each world, so this is
 * everything else: Home first as the way back to the gateway, Contact last.
 */
export const mobileNavForWorld = (world) => [
  { label: 'Home', to: '/' },
  ...navForWorld(world),
  { label: 'Contact', to: '/contact' },
];

/** Kept for any consumer that still wants the flat list. */
export const primaryNav = landingNav;
export const mobileNav = mobileNavForWorld(WORLDS.LANDING);

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

/**
 * Footer. Mirrors the landing page's two worlds: one panel each, at equal
 * weight, then a short column for the pages that belong to neither.
 * Every link here resolves to a real route.
 */
export const footerWorldLinks = {
  [WORLDS.PHOTOGRAPHY]: [
    { label: 'Weddings', to: '/services/wedding-photography' },
    { label: 'Pre-Wedding', to: '/services/pre-wedding-photography' },
    { label: 'Bridal Portraits', to: '/works/bridal' },
    { label: 'Baby & Family', to: '/services/baby-family-photography' },
    { label: 'Portraits', to: '/services/portrait-photography' },
    { label: 'Films', to: '/services/cinematic-films' },
  ],
  [WORLDS.GIFTS]: [
    { label: 'Photo Frames', to: '/gifts/photo-frames' },
    { label: 'Memory Gifts', to: '/gifts/memory-gifts' },
    { label: 'Hampers', to: '/gifts/custom-hampers' },
    { label: 'Anniversary', to: '/gifts/anniversary' },
    { label: 'Corporate', to: '/gifts/corporate' },
    { label: 'Personalized', to: '/gifts/personalized' },
  ],
};

export const footerStudio = {
  heading: 'Studio',
  links: [
    { label: 'Works', to: '/works' },
    { label: 'About', to: '/about' },
    { label: 'Journal', to: '/journal' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
  ],
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
