/**
 * Personalized gifting — taxonomy and product catalogue.
 *
 * PRICING NOTE
 * ------------
 * `price` is intentionally `null` on every product. Studioz D has not supplied
 * figures, and inventing them would be worse than showing none. Cards render
 * "Price on enquiry" instead. `priceTier` is a non-monetary planning scale that
 * powers the range filter; swap both fields once real pricing exists.
 *
 * IMAGES
 * ------
 * Paths resolve to `public/assets/images/gifts/`. The shipped files are
 * generated placeholders — drop real product photography in under the same
 * filename and nothing else changes.
 */

const RATIO_DIMENSIONS = {
  '1/1': [1400, 1400],
  '4/5': [1280, 1600],
  '3/4': [1200, 1600],
  '4/3': [1600, 1200],
  '3/2': [1600, 1067],
};

/**
 * Real product photography supplied by the studio, keyed by file stem.
 *
 * The numbers are the TRUE pixel dimensions of the file on disk. Nothing is
 * re-cropped here, so every ratio the site renders is the ratio of the
 * photograph itself and no product image can ever appear stretched.
 *
 * Regenerate with:  npm run gifts -- "<source folder>"
 */
const PHOTOS = {
  'acrylic-photo-panel': [1800, 1776],
  'acrylic-mandir-panel': [1800, 1776],
  'crystal-photo-block': [1800, 1776],
  'rotating-photo-cube': [1800, 1776],
  'infinity-name-lamp': [1800, 1776],
  'photo-jigsaw': [1800, 1776],
  'photo-music-mug': [1800, 1776],
  'engraved-bottle': [1800, 1776],
  'polaroid-prints': [1800, 1776],
  'collage-frame': [1800, 1776],
  'watercolour-frame': [1800, 1776],
  'story-frame': [1800, 2400],
  'caricature-standee': [1800, 2400],
  'engraved-wood-photo': [1800, 1776],
  'leather-wallet': [1800, 1776],
  'leather-wallet-set': [1800, 1776],
  'leather-hamper': [1800, 1776],
  'corporate-desk-set': [1800, 1776],
  'corporate-hamper': [1800, 1776],
  'corporate-leather-range': [1800, 1776],
};

const photo = (key, alt) => {
  const size = PHOTOS[key];
  if (!size) throw new Error(`Unknown gift photograph: ${key}`);
  const [width, height] = size;
  return {
    src: `/assets/images/gifts/studioz-d-gift-${key}.webp`,
    width,
    height,
    aspect: `${width}/${height}`,
    orientation: width > height ? 'landscape' : width < height ? 'portrait' : 'square',
    alt,
  };
};

const gimg = (file, aspect, alt) => {
  const [width, height] = RATIO_DIMENSIONS[aspect] ?? RATIO_DIMENSIONS['1/1'];
  return {
    src: `/assets/images/gifts/${file}`,
    width,
    height,
    aspect,
    orientation: width > height ? 'landscape' : width < height ? 'portrait' : 'square',
    alt,
  };
};

/** The four discovery axes on the /gifts page. */
export const giftGroups = [
  {
    id: 'occasion',
    label: 'By Occasion',
    blurb: 'Start with the day you are marking.',
  },
  {
    id: 'relationship',
    label: 'By Relationship',
    blurb: 'Start with the person you are giving it to.',
  },
  {
    id: 'creation',
    label: 'By Creation',
    blurb: 'Start with the object you want to end up holding.',
  },
  {
    id: 'feeling',
    label: 'By Feeling',
    blurb: 'Start with what you actually want to say.',
  },
];

/**
 * Gift categories. `routable: true` means the category owns a URL at
 * `/gifts/:slug` and appears in the sitemap.
 */
export const giftCategories = [
  /* ------------------------------------------------------------ OCCASION */
  {
    id: 'birthday',
    slug: 'birthday',
    label: 'Birthday',
    group: 'occasion',
    routable: true,
    title: 'Birthday Gifts',
    headline: 'A year of them, in one object.',
    blurb:
      'Birthday gifts built from photographs rather than guesswork — the frames, prints and keepsakes that actually get kept.',
    image: '/assets/images/gifts/studioz-d-gift-polaroid-prints.webp',
  },
  {
    id: 'anniversary',
    slug: 'anniversary',
    label: 'Anniversary',
    group: 'occasion',
    routable: true,
    title: 'Anniversary Gifts',
    headline: 'Proof that you kept going.',
    blurb:
      'Anniversary creations made from your own photographs, with the date, the words and the year you want to remember.',
    image: '/assets/images/gifts/studioz-d-gift-infinity-name-lamp.webp',
  },
  {
    id: 'wedding',
    slug: 'wedding',
    label: 'Wedding',
    group: 'occasion',
    routable: true,
    title: 'Wedding Gifts',
    headline: 'Something from the day itself.',
    blurb:
      'Wedding gifting and keepsakes — albums, frames and memory boxes built from the photographs of the day.',
    image: '/assets/images/gifts/studioz-d-gift-acrylic-photo-panel.webp',
  },
  {
    id: 'engagement',
    slug: 'engagement',
    label: 'Engagement',
    group: 'occasion',
    routable: true,
    title: 'Engagement Gifts',
    headline: 'The start of the story.',
    blurb:
      'Engagement keepsakes for the couple and the families — personalized with names, dates and the words that fit.',
    image: '/assets/images/gifts/studioz-d-gift-rotating-photo-cube.webp',
  },
  {
    id: 'baby-shower',
    slug: 'baby-shower',
    label: 'Baby Shower',
    group: 'occasion',
    routable: false,
    title: 'Baby Shower Gifts',
    headline: 'Before the first photograph.',
    blurb: 'Keepsakes for the weeks before, and the ones that follow.',
    image: '/assets/images/gifts/studioz-d-gift-photo-jigsaw.webp',
  },
  {
    id: 'housewarming',
    slug: 'housewarming',
    label: 'Housewarming',
    group: 'occasion',
    routable: false,
    title: 'Housewarming Gifts',
    headline: 'A wall that needed something.',
    blurb: 'Framed work and personalized pieces for a new home.',
    image: '/assets/images/gifts/studioz-d-gift-acrylic-mandir-panel.webp',
  },
  {
    id: 'graduation',
    slug: 'graduation',
    label: 'Graduation',
    group: 'occasion',
    routable: false,
    title: 'Graduation Gifts',
    headline: 'The end of a long one.',
    blurb: 'Personalized pieces that mark the finish properly.',
    image: '/assets/images/gifts/studioz-d-gift-engraved-wood-photo.webp',
  },
  {
    id: 'festive',
    slug: 'festive',
    label: 'Festive',
    group: 'occasion',
    routable: false,
    title: 'Festive Gifts',
    headline: 'Given by the dozen, still personal.',
    blurb: 'Festive hampers and keepsakes personalized at volume.',
    image: '/assets/images/gifts/studioz-d-gift-leather-hamper.webp',
  },

  /* -------------------------------------------------------- RELATIONSHIP */
  {
    id: 'couples',
    slug: 'couples',
    label: 'Couples',
    group: 'relationship',
    routable: true,
    title: 'Gifts for Couples',
    headline: 'Two names, one object.',
    blurb:
      'Couple gifts built from your own photographs — frames, plaques and keepsakes personalized with both names.',
    image: '/assets/images/gifts/studioz-d-gift-photo-music-mug.webp',
  },
  {
    id: 'parents',
    slug: 'parents',
    label: 'Parents',
    group: 'relationship',
    routable: true,
    title: 'Gifts for Parents',
    headline: 'They kept every photograph. Give them a good one.',
    blurb:
      'Gifts for parents and grandparents — printed, framed and personalized, built to sit somewhere they will see every day.',
    image: '/assets/images/gifts/studioz-d-gift-engraved-wood-photo.webp',
  },
  {
    id: 'friends',
    slug: 'friends',
    label: 'Friends',
    group: 'relationship',
    routable: true,
    title: 'Gifts for Friends',
    headline: 'For the group chat that became a decade.',
    blurb:
      'Personalized gifts for friends — collages, prints and keepsakes made from the photographs you already have.',
    image: '/assets/images/gifts/studioz-d-gift-collage-frame.webp',
  },
  {
    id: 'baby-family',
    slug: 'baby-family',
    label: 'Baby & Family',
    group: 'relationship',
    routable: true,
    title: 'Baby & Family Gifts',
    headline: 'The years that go fastest.',
    blurb:
      'Personalized keepsakes for new arrivals, milestones and whole-family frames.',
    image: '/assets/images/gifts/studioz-d-gift-story-frame.webp',
  },
  {
    id: 'husband',
    slug: 'husband',
    label: 'Husband',
    group: 'relationship',
    routable: false,
    title: 'Gifts for Him',
    headline: 'Not another watch.',
    blurb: 'Personalized keepsakes with something actually in them.',
    image: '/assets/images/gifts/studioz-d-gift-leather-wallet.webp',
  },
  {
    id: 'wife',
    slug: 'wife',
    label: 'Wife',
    group: 'relationship',
    routable: false,
    title: 'Gifts for Her',
    headline: 'Chosen, not picked up.',
    blurb: 'Personalized pieces built from your own photographs.',
    image: '/assets/images/gifts/studioz-d-gift-infinity-name-lamp.webp',
  },
  {
    id: 'kids',
    slug: 'kids',
    label: 'Kids',
    group: 'relationship',
    routable: false,
    title: 'Gifts for Kids',
    headline: 'Their name, their photograph.',
    blurb: 'Personalized name gifts and framed prints for children.',
    image: '/assets/images/gifts/studioz-d-gift-photo-jigsaw.webp',
  },
  {
    id: 'colleagues',
    slug: 'colleagues',
    label: 'Colleagues',
    group: 'relationship',
    routable: false,
    title: 'Gifts for Colleagues',
    headline: 'Personal, without being personal.',
    blurb: 'Considered desk pieces and team gifting.',
    image: '/assets/images/gifts/studioz-d-gift-corporate-desk-set.webp',
  },

  /* ------------------------------------------------------------ CREATION */
  {
    id: 'photo-frames',
    slug: 'photo-frames',
    label: 'Photo Frames',
    group: 'creation',
    routable: true,
    title: 'Personalized Photo Frames',
    headline: 'A photograph on a drive is not a photograph.',
    blurb:
      'Framed prints in wood, metal and acrylic — printed, mounted and personalized by Studioz D.',
    image: '/assets/images/gifts/studioz-d-gift-watercolour-frame.webp',
  },
  {
    id: 'acrylic-frames',
    slug: 'acrylic-frames',
    label: 'Acrylic Frames',
    group: 'creation',
    routable: false,
    title: 'Acrylic Photo Frames',
    headline: 'Light passes through it.',
    blurb: 'Edge-lit and clear acrylic frames with engraved personalization.',
    image: '/assets/images/gifts/studioz-d-gift-acrylic-photo-panel.webp',
  },
  {
    id: 'photo-collages',
    slug: 'photo-collages',
    label: 'Photo Collages',
    group: 'creation',
    routable: false,
    title: 'Photo Collages',
    headline: 'More than one moment.',
    blurb: 'Multi-frame collage layouts designed around your set.',
    image: '/assets/images/gifts/studioz-d-gift-collage-frame.webp',
  },
  {
    id: 'photo-albums',
    slug: 'photo-albums',
    label: 'Photo Albums',
    group: 'creation',
    routable: false,
    title: 'Photo Albums',
    headline: 'Built to be opened, not stored.',
    blurb: 'Lay-flat albums designed page by page.',
    image: '/assets/images/gifts/studioz-d-gift-framed-print-oak.webp',
  },
  {
    id: 'custom-hampers',
    slug: 'custom-hampers',
    label: 'Personalized Hampers',
    group: 'creation',
    routable: true,
    title: 'Personalized Gift Hampers',
    headline: 'Curated, not assembled.',
    blurb:
      'Gift hampers built around a theme and a photograph, personalized piece by piece.',
    image: '/assets/images/gifts/studioz-d-gift-leather-hamper.webp',
  },
  {
    id: 'memory-gifts',
    slug: 'memory-gifts',
    label: 'Memory Gifts',
    group: 'creation',
    routable: true,
    title: 'Memory Gifts & Keepsake Boxes',
    headline: 'Somewhere for the things worth keeping.',
    blurb:
      'Memory boxes, keepsake sets and printed collections that hold more than one moment.',
    image: '/assets/images/gifts/studioz-d-gift-crystal-photo-block.webp',
  },
  {
    id: 'custom-name-gifts',
    slug: 'custom-name-gifts',
    label: 'Custom Name Gifts',
    group: 'creation',
    routable: false,
    title: 'Custom Name Gifts',
    headline: 'One name changes everything.',
    blurb: 'Engraved and cut name pieces, made to order.',
    image: '/assets/images/gifts/studioz-d-gift-engraved-bottle.webp',
  },
  {
    id: 'photo-plaques',
    slug: 'photo-plaques',
    label: 'Photo Plaques',
    group: 'creation',
    routable: false,
    title: 'Photo Plaques',
    headline: 'Print, mounted properly.',
    blurb: 'Wood and metal plaques with a photograph fused to the surface.',
    image: '/assets/images/gifts/studioz-d-gift-engraved-wood-photo.webp',
  },
  {
    id: 'corporate',
    slug: 'corporate',
    label: 'Corporate Gifts',
    group: 'creation',
    routable: true,
    title: 'Corporate Gifting',
    headline: 'Volume, without looking like volume.',
    blurb:
      'Branded and personalized corporate gifting — onboarding sets, client gifts and milestone pieces.',
    image: '/assets/images/gifts/studioz-d-gift-corporate-hamper.webp',
  },
  {
    id: 'return-gifts',
    slug: 'return-gifts',
    label: 'Return Gifts',
    group: 'creation',
    routable: true,
    title: 'Return Gifts',
    headline: 'The thing guests actually take home.',
    blurb:
      'Personalized return gifts for weddings, birthdays and celebrations, produced at volume.',
    image: '/assets/images/gifts/studioz-d-gift-photo-music-mug.webp',
  },
  {
    id: 'personalized',
    slug: 'personalized',
    label: 'Everything Personalized',
    group: 'collection',
    routable: true,
    title: 'Personalized Photo Gifts',
    headline: 'Choose a memory. Add your words. Make it yours.',
    blurb:
      'Every Studioz D creation that carries a name, a date, a message or a photograph — in one place.',
    image: '/assets/images/gifts/studioz-d-gift-rotating-photo-cube.webp',
  },

  /* ------------------------------------------------------------- FEELING */
  {
    id: 'thank-you',
    slug: 'thank-you',
    label: 'Say Thank You',
    group: 'feeling',
    routable: false,
    title: 'Ways to Say Thank You',
    headline: 'For the ones who showed up.',
    blurb: 'Gifts that say it without needing a card.',
    image: '/assets/images/gifts/studioz-d-gift-polaroid-prints.webp',
  },
  {
    id: 'i-love-you',
    slug: 'i-love-you',
    label: 'Say I Love You',
    group: 'feeling',
    routable: false,
    title: 'Ways to Say I Love You',
    headline: 'Out loud, in an object.',
    blurb: 'Personalized pieces for the people you do not need to impress.',
    image: '/assets/images/gifts/studioz-d-gift-infinity-name-lamp.webp',
  },
  {
    id: 'celebrate-us',
    slug: 'celebrate-us',
    label: 'Celebrate Us',
    group: 'feeling',
    routable: false,
    title: 'Celebrate Us',
    headline: 'A milestone worth marking.',
    blurb: 'Couple and family pieces for the years that counted.',
    image: '/assets/images/gifts/studioz-d-gift-crystal-photo-block.webp',
  },
  {
    id: 'remember-this',
    slug: 'remember-this',
    label: 'Remember This',
    group: 'feeling',
    routable: false,
    title: 'Remember This',
    headline: 'Before it blurs.',
    blurb: 'Keepsakes built to hold a specific moment.',
    image: '/assets/images/gifts/studioz-d-gift-polaroid-prints.webp',
  },
  {
    id: 'congratulations',
    slug: 'congratulations',
    label: 'Congratulations',
    group: 'feeling',
    routable: false,
    title: 'Congratulations',
    headline: 'They earned it.',
    blurb: 'Personalized pieces for a genuine achievement.',
    image: '/assets/images/gifts/studioz-d-gift-engraved-wood-photo.webp',
  },
  {
    id: 'just-because',
    slug: 'just-because',
    label: 'Just Because',
    group: 'feeling',
    routable: false,
    title: 'Just Because',
    headline: 'No occasion required.',
    blurb: 'The gift given on an ordinary Tuesday.',
    image: '/assets/images/gifts/studioz-d-gift-photo-jigsaw.webp',
  },
];

/**
 * Non-monetary planning tiers. These power the range filter without publishing
 * figures the studio has not set. Replace with real currency bands when
 * pricing is confirmed.
 */
export const priceTiers = [
  { id: 'keepsake', label: 'Keepsake', order: 1, note: 'Single small piece' },
  { id: 'signature', label: 'Signature', order: 2, note: 'Framed and printed work' },
  { id: 'premium', label: 'Premium', order: 3, note: 'Albums, large formats, sets' },
  { id: 'bespoke', label: 'Bespoke', order: 4, note: 'Built entirely to brief' },
];

/** Personalization fields a product can accept. */
export const personalizationFields = ['name', 'message', 'date', 'photo'];

export const gifts = [
  {
    id: 'gift-001',
    slug: 'classic-wood-photo-frame',
    name: 'Classic Wood Photo Frame',
    category: 'Photo Frames',
    categories: ['photo-frames', 'parents', 'anniversary', 'housewarming', 'personalized', 'remember-this'],
    priceTier: 'signature',
    price: null,
    featured: true,
    newest: false,
    tagline: 'One photograph, given the room it deserves.',
    description:
      'A solid wood frame with a printed enlargement and a hand-cut mount, engraved on the base with your words.',
    longDescription:
      'The frame everything else is compared to. We print the photograph, mount it with a generous border and set it behind glazing so it reads from across a room. The base carries an engraved line — a name, a date, or a sentence that only the two of you will understand.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Engraving is set on the frame base. Up to 40 characters reads best.',
    },
    material: 'Wood frame, photographic print, mount board and glazing',
    sizes: ['Confirmed at enquiry'],
    options: ['Natural oak', 'Walnut', 'Charcoal black', 'Ivory white'],
    production: 'Made to order after artwork approval. Timelines confirmed at enquiry.',
    care: 'Wipe glazing with a dry microfibre cloth. Keep out of direct sunlight to protect the print.',
    images: [
      gimg('studioz-d-gift-framed-print-oak.webp', '1/1', 'A Studioz D photograph printed, matted and framed in solid wood'),
    ],
    related: ['grandparents-print-set', 'watercolour-portrait-frame', 'collage-photo-frame'],
  },
  {
    id: 'gift-002',
    slug: 'grandparents-print-set',
    name: 'Grandparents Print Set',
    category: 'Photo Frames',
    categories: ['photo-frames', 'parents', 'baby-family', 'personalized', 'remember-this', 'thank-you'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: false,
    tagline: 'The photographs they will actually put up.',
    description:
      'A matched set of framed prints, sized and finished so they work as a group on one wall.',
    longDescription:
      'Grandparents rarely want a whole album. They want two or three photographs, printed properly, in frames that match. We select and size the set together so it hangs as one piece rather than three unrelated frames.',
    personalization: {
      available: true,
      fields: ['message', 'date', 'photo'],
      note: 'A short engraved line can be added to one frame in the set.',
    },
    material: 'Wood frames, photographic prints, mount board',
    sizes: ['Confirmed at enquiry'],
    options: ['Set of two', 'Set of three', 'Matched finishes'],
    production: 'Made to order after the selection is approved.',
    care: 'Dust with a dry cloth. Keep away from direct sunlight.',
    images: [
      gimg('studioz-d-gift-framed-print-wide.webp', '4/3', 'A Studioz D photograph printed, matted and framed on a wall'),
    ],
    related: ['classic-wood-photo-frame', 'collage-photo-frame', 'engraved-wood-photo'],
  },
  {
    id: 'gift-003',
    slug: 'acrylic-photo-panel',
    name: 'Acrylic Photo Panel',
    category: 'Acrylic Frames',
    categories: ['acrylic-frames', 'photo-frames', 'wedding', 'couples', 'anniversary', 'personalized', 'celebrate-us'],
    priceTier: 'signature',
    price: null,
    featured: true,
    newest: true,
    tagline: 'Light gets into it.',
    description:
      'A photograph printed onto acrylic and wall-mounted on polished standoffs, so it floats off the wall.',
    longDescription:
      'Acrylic changes how a print behaves — colour sits deeper and the polished edge catches whatever light is in the room. Mounted on standoffs, the panel stands a little proud of the wall and picks up a shadow line behind it. Best with a photograph that has strong colour in it.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'photo'],
      note: 'Names and a date can be etched into the border, so the photograph itself stays untouched.',
    },
    material: 'Printed acrylic panel with metal standoff mounts',
    sizes: ['Confirmed at enquiry'],
    options: ['Standoff wall mount', 'Clear polish', 'Frosted back'],
    production: 'Cut and finished to order. Timelines confirmed at enquiry.',
    care: 'Clean with a soft damp cloth only. Abrasive cleaners will haze acrylic.',
    images: [
      photo('acrylic-photo-panel', 'A wedding photograph printed on an acrylic panel and mounted on a wall with polished standoffs'),
    ],
    related: ['acrylic-mandir-panel', 'crystal-photo-block', 'classic-wood-photo-frame'],
  },
  {
    id: 'gift-004',
    slug: 'acrylic-mandir-panel',
    name: 'Acrylic Mandir Panel',
    category: 'Acrylic Frames',
    categories: ['acrylic-frames', 'housewarming', 'festive', 'parents', 'personalized'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: true,
    tagline: 'For the corner of the house that matters most.',
    description:
      'A devotional panel printed on acrylic and sized to the back wall of a home mandir.',
    longDescription:
      'A printed acrylic panel made to fit the niche it will live in. Measured to the opening rather than bought off a shelf, so the border sits flush and the artwork is not cropped by the woodwork around it.',
    personalization: {
      available: true,
      fields: ['name', 'photo'],
      note: 'Send the measurements of the niche and the artwork you want printed.',
    },
    material: 'Printed acrylic panel, sized to the opening',
    sizes: ['Made to your measurements'],
    options: ['Wall mount', 'Recessed fit', 'Backlit-ready'],
    production: 'Cut to your measurements after a proof is approved.',
    care: 'Soft damp cloth only. Keep lamps and flames clear of the surface.',
    images: [
      photo('acrylic-mandir-panel', 'A devotional print on an acrylic panel fitted to the back wall of a home mandir'),
    ],
    related: ['acrylic-photo-panel', 'engraved-wood-photo', 'classic-wood-photo-frame'],
  },
  {
    id: 'gift-005',
    slug: 'crystal-photo-block',
    name: '3D Crystal Photo Block',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'couples', 'anniversary', 'birthday', 'personalized', 'i-love-you'],
    priceTier: 'signature',
    price: null,
    featured: true,
    newest: true,
    tagline: 'A photograph, etched inside glass.',
    description:
      'A laser-etched crystal block holding a photograph as a three-dimensional image inside the glass.',
    longDescription:
      'The photograph is converted to a point cloud and etched inside a solid crystal block by laser, so the image sits in the middle of the glass rather than on its surface. It reads best against a dark background, and under a small light it lifts off the block entirely.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'photo'],
      note: 'High-contrast photographs with a clear subject etch best. Send the original file, not a screenshot.',
    },
    material: 'Optical crystal block, internal laser etching',
    sizes: ['Confirmed at enquiry'],
    options: ['Portrait block', 'Landscape block', 'LED light base'],
    production: 'Etched to order once the photograph is approved.',
    care: 'Dust with a dry cloth. Handle by the edges — fingerprints show on polished crystal.',
    images: [
      photo('crystal-photo-block', 'A couple photograph laser-etched inside a clear crystal block'),
    ],
    related: ['rotating-photo-cube', 'infinity-name-lamp', 'acrylic-photo-panel'],
  },
  {
    id: 'gift-006',
    slug: 'rotating-photo-cube',
    name: 'Rotating Photo Cube Lamp',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'couples', 'anniversary', 'birthday', 'personalized', 'celebrate-us'],
    priceTier: 'signature',
    price: null,
    featured: true,
    newest: true,
    tagline: 'Four photographs, turning.',
    description:
      'A lit cube that carries a photograph on each face and turns slowly on its base.',
    longDescription:
      'Four photographs, one on each face, lit from inside and turning on a powered base. It works as a lamp when the room is dark and as an object on a shelf when it is not.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'photo'],
      note: 'Four photographs, one per face. Portrait crops suit the faces better than wide ones.',
    },
    material: 'Printed acrylic faces, internal LED, powered rotating base',
    sizes: ['Confirmed at enquiry'],
    options: ['Warm light', 'Cool light', 'USB powered'],
    production: 'Printed and assembled to order after the four photographs are approved.',
    care: 'Wipe faces with a soft dry cloth. Keep the base away from water.',
    images: [
      photo('rotating-photo-cube', 'A lit photo cube on a rotating base, carrying a different photograph on each face'),
    ],
    related: ['crystal-photo-block', 'infinity-name-lamp', 'photo-music-mug'],
  },
  {
    id: 'gift-007',
    slug: 'infinity-name-lamp',
    name: 'Infinity Name Lamp',
    category: 'Custom Name Gifts',
    categories: ['custom-name-gifts', 'couples', 'anniversary', 'wife', 'husband', 'personalized', 'i-love-you'],
    priceTier: 'keepsake',
    price: null,
    featured: true,
    newest: false,
    tagline: 'Two names and the date, lit from below.',
    description:
      'An engraved acrylic panel on a lit wooden base, carrying two names and a date.',
    longDescription:
      'The names, the date and the artwork are engraved into a clear acrylic panel that sits in a lit wooden base. The engraving catches the light and the rest of the panel disappears, so the names appear to float above the base.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'message'],
      note: 'Two names and one date is the sweet spot. Long sentences lose the effect.',
    },
    material: 'Engraved acrylic panel, wooden LED base',
    sizes: ['Confirmed at enquiry'],
    options: ['Warm light', 'USB powered', 'Battery base'],
    production: 'Engraved to order once the names and date are confirmed.',
    care: 'Soft dry cloth. Avoid solvent cleaners on the acrylic.',
    images: [
      photo('infinity-name-lamp', 'An engraved acrylic lamp on a wooden base showing two names, hearts and a date'),
    ],
    related: ['rotating-photo-cube', 'crystal-photo-block', 'engraved-steel-bottle'],
  },
  {
    id: 'gift-008',
    slug: 'photo-jigsaw-puzzle',
    name: 'Photo Jigsaw Puzzle',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'couples', 'kids', 'birthday', 'friends', 'personalized', 'just-because'],
    priceTier: 'keepsake',
    price: null,
    featured: false,
    newest: true,
    tagline: 'They have to build it before they can see it.',
    description:
      'Your photograph printed as a jigsaw puzzle, supplied boxed and ready to give.',
    longDescription:
      'A photograph printed onto puzzle board and cut into pieces. It makes a gift out of the act of looking at it — the picture only arrives once the last piece goes in. Supplied in a box so it can be wrapped as it is.',
    personalization: {
      available: true,
      fields: ['photo', 'message'],
      note: 'One clear photograph works better than a collage — small faces get lost across the cuts.',
    },
    material: 'Printed puzzle board, boxed',
    sizes: ['Confirmed at enquiry'],
    options: ['Framed finish', 'Gift box', 'Message card'],
    production: 'Printed and cut to order after the photograph is approved.',
    care: 'Keep dry. Store flat in the box between builds.',
    images: [
      photo('photo-jigsaw', 'A couple photograph printed as a jigsaw puzzle, partly assembled on a desk'),
    ],
    related: ['polaroid-print-set', 'photo-music-mug', 'collage-photo-frame'],
  },
  {
    id: 'gift-009',
    slug: 'photo-music-mug',
    name: 'Photo & Music Code Mug',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'couples', 'friends', 'birthday', 'personalized', 'just-because'],
    priceTier: 'keepsake',
    price: null,
    featured: false,
    newest: true,
    tagline: 'A photograph, and the song that goes with it.',
    description:
      'A printed mug carrying a photograph, a song title and a scannable code that plays it.',
    longDescription:
      'The photograph goes on one side with the song title underneath and a scannable code below that. Point a phone at the code and the track starts playing. It is a small thing that gets used every morning, which is more than most gifts manage.',
    personalization: {
      available: true,
      fields: ['photo', 'name', 'message'],
      note: 'Send the photograph and the song. The code is generated from the track you choose.',
    },
    material: 'Ceramic mug, printed finish',
    sizes: ['Confirmed at enquiry'],
    options: ['White', 'Inner colour', 'Matching pair'],
    production: 'Printed to order after the layout is approved.',
    care: 'Hand wash to protect the print. Not for the dishwasher.',
    images: [
      photo('photo-music-mug', 'A white mug printed with a couple photograph, a song title and a scannable music code'),
    ],
    related: ['photo-jigsaw-puzzle', 'engraved-steel-bottle', 'polaroid-print-set'],
  },
  {
    id: 'gift-010',
    slug: 'engraved-steel-bottle',
    name: 'Engraved Steel Bottle',
    category: 'Custom Name Gifts',
    categories: ['custom-name-gifts', 'colleagues', 'corporate', 'friends', 'birthday', 'personalized', 'congratulations'],
    priceTier: 'keepsake',
    price: null,
    featured: false,
    newest: false,
    tagline: 'Their name, on the thing they carry every day.',
    description:
      'An insulated steel bottle engraved with a name, with a temperature display in the cap.',
    longDescription:
      'A vacuum-insulated steel bottle with the name engraved down the body and a temperature readout set into the lid. It is the kind of gift that gets used rather than shelved, which is the whole point of putting somebody’s name on it.',
    personalization: {
      available: true,
      fields: ['name'],
      note: 'One name or a short word engraves cleanly. Logos are possible for bulk orders.',
    },
    material: 'Vacuum-insulated stainless steel, temperature display lid',
    sizes: ['Confirmed at enquiry'],
    options: ['Single colour', 'Bulk order', 'Gift box'],
    production: 'Engraved to order. Bulk timelines confirmed at enquiry.',
    care: 'Hand wash. Keep the display lid out of water.',
    images: [
      photo('engraved-bottle', 'An insulated steel bottle engraved with a name, beside a lid showing a temperature reading'),
    ],
    related: ['corporate-desk-set', 'leather-wallet', 'photo-music-mug'],
  },
  {
    id: 'gift-011',
    slug: 'polaroid-print-set',
    name: 'Polaroid Print Set',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'couples', 'friends', 'birthday', 'return-gifts', 'personalized', 'just-because'],
    priceTier: 'keepsake',
    price: null,
    featured: false,
    newest: false,
    tagline: 'Small prints, meant to be handled.',
    description:
      'A set of small bordered prints with space under each one to write on.',
    longDescription:
      'Photographs printed small, with a white border and a wide margin at the bottom for a date or a line of handwriting. They are made to be held, pegged up, posted or kept in a pocket rather than hung on a wall.',
    personalization: {
      available: true,
      fields: ['photo', 'message', 'date'],
      note: 'Send as many photographs as you want in the set; captions can be printed or left blank to write on.',
    },
    material: 'Bordered photographic prints',
    sizes: ['Confirmed at enquiry'],
    options: ['Printed captions', 'Blank margin', 'Gift box'],
    production: 'Printed to order once the selection is approved.',
    care: 'Handle by the border. Keep out of direct sunlight.',
    images: [
      photo('polaroid-prints', 'A hand holding three small bordered photographic prints of couples'),
    ],
    related: ['photo-jigsaw-puzzle', 'collage-photo-frame', 'story-frame'],
  },
  {
    id: 'gift-012',
    slug: 'collage-photo-frame',
    name: 'Collage Photo Frame',
    category: 'Photo Collages',
    categories: ['photo-collages', 'photo-frames', 'friends', 'baby-family', 'parents', 'birthday', 'personalized'],
    priceTier: 'signature',
    price: null,
    featured: true,
    newest: false,
    tagline: 'Years of photographs, in one frame.',
    description:
      'A framed collage that lays out a run of photographs as a single composition, with a cut-out figure standing off the surface.',
    longDescription:
      'Rather than a grid of equal squares, the layout is built around one or two photographs that carry the piece, with the rest arranged behind them. A cut-out figure is raised off the surface so the frame has depth when you look at it side-on.',
    personalization: {
      available: true,
      fields: ['photo', 'name', 'message', 'date'],
      note: 'Send everything you have — we lay it out and send a proof before anything is printed.',
    },
    material: 'Framed print with raised cut-out layer',
    sizes: ['Confirmed at enquiry'],
    options: ['Black frame', 'Natural wood', 'Colour or black and white'],
    production: 'Laid out, proofed and then printed and assembled to order.',
    care: 'Dust the face with a dry cloth. Do not press on the raised cut-out.',
    images: [
      photo('collage-frame', 'A black frame holding a black and white photo collage with a raised cut-out figure standing off the surface'),
    ],
    related: ['story-frame', 'classic-wood-photo-frame', 'polaroid-print-set'],
  },
  {
    id: 'gift-013',
    slug: 'watercolour-portrait-frame',
    name: 'Watercolour Portrait Frame',
    category: 'Photo Frames',
    categories: ['photo-frames', 'couples', 'anniversary', 'wedding', 'personalized', 'i-love-you'],
    priceTier: 'signature',
    price: null,
    featured: true,
    newest: true,
    tagline: 'Your photograph, painted.',
    description:
      'A photograph redrawn as a watercolour portrait, printed and framed.',
    longDescription:
      'The photograph is worked into a watercolour illustration — the figures stay recognisable while the background dissolves into brushwork. Printed on textured stock and framed, it reads as a painting rather than a photograph, which is the point.',
    personalization: {
      available: true,
      fields: ['photo', 'name', 'date'],
      note: 'Works best from a photograph where the faces are sharp and well lit.',
    },
    material: 'Illustrated print on textured stock, wood frame',
    sizes: ['Confirmed at enquiry'],
    options: ['Black frame', 'Natural wood', 'Print only'],
    production: 'Illustrated to order. A proof is shared before printing.',
    care: 'Keep out of direct sunlight. Dust the glazing with a dry cloth.',
    images: [
      photo('watercolour-frame', 'A framed watercolour portrait of a couple, held up outdoors'),
    ],
    related: ['caricature-standee', 'classic-wood-photo-frame', 'story-frame'],
  },
  {
    id: 'gift-014',
    slug: 'story-frame',
    name: 'Personalized Story Frame',
    category: 'Custom Name Gifts',
    categories: ['custom-name-gifts', 'birthday', 'friends', 'baby-family', 'personalized', 'celebrate-us'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: true,
    tagline: 'Everything about them, on one page.',
    description:
      'A framed layout that maps somebody out — their name, their photographs and the details only their people know.',
    longDescription:
      'Part poster, part portrait. Photographs sit alongside handwritten notes, dates, in-jokes and the small details that describe a person better than a caption would. We build the layout from what you send and proof it with you before it is printed and framed.',
    personalization: {
      available: true,
      fields: ['name', 'photo', 'message', 'date'],
      note: 'The more detail you send, the better this one works. Lists, nicknames, dates — all of it.',
    },
    material: 'Printed layout, wood frame',
    sizes: ['Confirmed at enquiry'],
    options: ['Black frame', 'Natural wood', 'Colour or monochrome'],
    production: 'Designed and proofed with you, then printed and framed.',
    care: 'Dust the glazing with a dry cloth. Keep out of direct sunlight.',
    images: [
      photo('story-frame', 'Hands holding a framed personalized layout of photographs, notes and dates'),
    ],
    related: ['collage-photo-frame', 'caricature-standee', 'polaroid-print-set'],
  },
  {
    id: 'gift-015',
    slug: 'caricature-standee',
    name: 'Caricature Standee',
    category: 'Custom Name Gifts',
    categories: ['custom-name-gifts', 'couples', 'wedding', 'engagement', 'anniversary', 'personalized', 'celebrate-us'],
    priceTier: 'keepsake',
    price: null,
    featured: true,
    newest: true,
    tagline: 'The two of you, drawn.',
    description:
      'A cut-out caricature on a standing base, with names printed underneath.',
    longDescription:
      'An illustrated caricature, cut to shape and mounted on a base so it stands on a shelf or a desk. Outfits, jewellery and the names underneath are all drawn to brief — most people send a wedding photograph and ask for the same clothes.',
    personalization: {
      available: true,
      fields: ['name', 'photo', 'date'],
      note: 'Send a clear photograph of each person and say what you want them wearing.',
    },
    material: 'Printed cut-out board on a wooden base',
    sizes: ['Confirmed at enquiry'],
    options: ['Two figures', 'Family group', 'Names printed on the base'],
    production: 'Illustrated, proofed, then cut and mounted to order.',
    care: 'Dust with a dry cloth. Keep the base off wet surfaces.',
    images: [
      photo('caricature-standee', 'A cut-out caricature of a couple in traditional wedding clothes, standing on a wooden base with their names printed underneath'),
    ],
    related: ['watercolour-portrait-frame', 'story-frame', 'infinity-name-lamp'],
  },
  {
    id: 'gift-016',
    slug: 'engraved-wood-photo',
    name: 'Engraved Wood Photo',
    category: 'Photo Plaques',
    categories: ['photo-plaques', 'parents', 'baby-family', 'housewarming', 'graduation', 'personalized', 'thank-you'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: false,
    tagline: 'Burned into the grain, not printed on it.',
    description:
      'A family photograph and a line of text engraved directly into a wooden panel.',
    longDescription:
      'The photograph is laser-engraved into the wood itself, so the image is made of the grain rather than sitting on top of it. It ages the way wood ages. A line of text is engraved alongside it — a name, a year, or a sentence worth keeping.',
    personalization: {
      available: true,
      fields: ['photo', 'message', 'name', 'date'],
      note: 'Photographs with clear separation between the subjects and the background engrave best.',
    },
    material: 'Laser-engraved wooden panel',
    sizes: ['Confirmed at enquiry'],
    options: ['Standing panel', 'Wall mount', 'Border detail'],
    production: 'Engraved to order after the artwork is approved.',
    care: 'Dust along the grain with a dry cloth. Keep away from damp.',
    images: [
      photo('engraved-wood-photo', 'A family photograph and a line of text laser-engraved into a wooden panel'),
    ],
    related: ['acrylic-mandir-panel', 'classic-wood-photo-frame', 'grandparents-print-set'],
  },
  {
    id: 'gift-017',
    slug: 'leather-wallet',
    name: 'Personalized Leather Wallet',
    category: 'Custom Name Gifts',
    categories: ['custom-name-gifts', 'husband', 'friends', 'colleagues', 'birthday', 'personalized', 'just-because'],
    priceTier: 'keepsake',
    price: null,
    featured: false,
    newest: false,
    tagline: 'A name plate, fitted rather than printed.',
    description:
      'A leather wallet with a metal name plate and charm fitted to the face, supplied boxed.',
    longDescription:
      'A leather wallet with a brushed metal plate carrying the name, and a small charm beside it. Available on its own or boxed with a matching belt and keyring as a set.',
    personalization: {
      available: true,
      fields: ['name'],
      note: 'One name per plate. Short names sit better than long ones.',
    },
    material: 'Leather, metal name plate and charm',
    sizes: ['Confirmed at enquiry'],
    options: ['Wallet only', 'Wallet and belt set', 'Choice of charm', 'Gift box'],
    production: 'Plates are engraved and fitted to order.',
    care: 'Wipe with a dry cloth. Keep leather away from prolonged damp.',
    images: [
      photo('leather-wallet', 'A leather wallet with a brushed metal name plate and charm fitted to the face'),
      photo('leather-wallet-set', 'A boxed set of a leather wallet and matching belt, both fitted with engraved name plates'),
    ],
    related: ['couple-leather-hamper', 'engraved-steel-bottle', 'corporate-desk-set'],
  },
  {
    id: 'gift-018',
    slug: 'couple-leather-hamper',
    name: 'Couple Leather Hamper',
    category: 'Personalized Hampers',
    categories: ['custom-hampers', 'couples', 'wedding', 'anniversary', 'engagement', 'personalized', 'celebrate-us'],
    priceTier: 'premium',
    price: null,
    featured: true,
    newest: false,
    tagline: 'Two sets, one box.',
    description:
      'A boxed set of leather accessories for a couple, each piece fitted with its own engraved plate.',
    longDescription:
      'Wallets, a passport holder, a keyring, an eyewear case and a pen, laid into one box and finished with engraved plates for each person. It is the gift people buy for a wedding when they want to give something both of them will use.',
    personalization: {
      available: true,
      fields: ['name'],
      note: 'Two names, one per set. Tell us which pieces you want included.',
    },
    material: 'Leather accessories with engraved metal plates, presentation box',
    sizes: ['Confirmed at enquiry'],
    options: ['Choice of colour', 'Choice of pieces', 'Presentation box'],
    production: 'Assembled and engraved to order.',
    care: 'Wipe with a dry cloth. Keep leather away from prolonged damp.',
    images: [
      photo('leather-hamper', 'A presentation box of leather accessories for a couple, each fitted with an engraved name plate'),
    ],
    related: ['leather-wallet', 'corporate-hamper', 'caricature-standee'],
  },
  {
    id: 'gift-019',
    slug: 'corporate-desk-set',
    name: 'Corporate Desk Set',
    category: 'Corporate Gifts',
    categories: ['corporate', 'colleagues', 'custom-hampers', 'personalized', 'congratulations'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: false,
    tagline: 'Branded properly, or not at all.',
    description:
      'A boxed bottle, pen and keyring set carrying a name or a company mark.',
    longDescription:
      'The onboarding set: an insulated bottle, a pen and a keyring laid into one box, each carrying either the recipient’s name or the company mark. Made in runs, with the layout proofed once and then repeated.',
    personalization: {
      available: true,
      fields: ['name'],
      note: 'Send the logo as a vector file. Individual names are possible across a run.',
    },
    material: 'Insulated bottle, metal pen and keyring, presentation box',
    sizes: ['Confirmed at enquiry'],
    options: ['Company mark', 'Individual names', 'Bulk runs'],
    production: 'Proofed once, then produced as a run. Timelines depend on quantity.',
    care: 'Hand wash the bottle. Wipe the rest with a dry cloth.',
    images: [
      photo('corporate-desk-set', 'A black presentation box holding an insulated bottle, a pen and a keyring marked for branding'),
    ],
    related: ['corporate-hamper', 'corporate-leather-range', 'engraved-steel-bottle'],
  },
  {
    id: 'gift-020',
    slug: 'corporate-hamper',
    name: 'Corporate Gift Hamper',
    category: 'Corporate Gifts',
    categories: ['corporate', 'colleagues', 'custom-hampers', 'personalized', 'thank-you'],
    priceTier: 'premium',
    price: null,
    featured: true,
    newest: false,
    tagline: 'The whole desk, in one box.',
    description:
      'A larger branded set — notebook, mug, bottle, pen and keyring — laid into a single presentation box.',
    longDescription:
      'The set you send to clients rather than staff. A notebook, a mug, a bottle, a pen and a keyring, each carrying the mark, arranged in one box so it presents well the moment the lid comes off.',
    personalization: {
      available: true,
      fields: ['name'],
      note: 'Send the logo as a vector file. Tell us which pieces you want in the box.',
    },
    material: 'Notebook, ceramic mug, insulated bottle, pen and keyring, presentation box',
    sizes: ['Confirmed at enquiry'],
    options: ['Choice of pieces', 'Company mark', 'Bulk runs'],
    production: 'Proofed once, then produced as a run. Timelines depend on quantity.',
    care: 'Hand wash the mug and bottle. Wipe the rest with a dry cloth.',
    images: [
      photo('corporate-hamper', 'A presentation box holding a branded notebook, mug, bottle, pen and keyring'),
    ],
    related: ['corporate-desk-set', 'corporate-leather-range', 'couple-leather-hamper'],
  },
  {
    id: 'gift-021',
    slug: 'corporate-leather-range',
    name: 'Corporate Leather Range',
    category: 'Corporate Gifts',
    categories: ['corporate', 'colleagues', 'custom-name-gifts', 'personalized', 'congratulations'],
    priceTier: 'premium',
    price: null,
    featured: false,
    newest: true,
    tagline: 'One set, in five colourways.',
    description:
      'Leather desk sets — wallet, card holder, keyring and pen — engraved per recipient and available across a range of colours.',
    longDescription:
      'The same set of leather pieces produced in several colourways, so a run can be varied by team or by seniority without changing the format. Each piece carries its own engraved plate, which means a bulk order still arrives personalised per person.',
    personalization: {
      available: true,
      fields: ['name'],
      note: 'Send the list of names with the order. Each set is engraved individually.',
    },
    material: 'Leather accessories with engraved metal plates, presentation boxes',
    sizes: ['Confirmed at enquiry'],
    options: ['Five colourways', 'Individual names', 'Bulk runs'],
    production: 'Engraved per recipient and boxed as a run.',
    care: 'Wipe with a dry cloth. Keep leather away from prolonged damp.',
    images: [
      photo('corporate-leather-range', 'Five leather desk sets in different colours, each with engraved name plates, shown together as a range'),
    ],
    related: ['corporate-hamper', 'corporate-desk-set', 'leather-wallet'],
  },
  {
    id: 'gift-022',
    slug: 'bespoke-commission',
    name: 'Bespoke Commission',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'personalized', 'celebrate-us', 'remember-this'],
    priceTier: 'bespoke',
    price: null,
    featured: false,
    newest: false,
    tagline: 'If you can describe it, we can probably build it.',
    description:
      'A creation designed from scratch when nothing in the catalogue is quite right.',
    longDescription:
      'Sometimes the idea does not exist yet. A specific object, an unusual material, a format nobody makes. Tell us what you are imagining and we will tell you honestly whether it can be built, what it would take, and whether we are the right studio for it.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Everything is open. The conversation starts with what you are picturing.',
    },
    material: 'Determined by the commission',
    sizes: ['Made to brief'],
    options: ['Concept and design included', 'Material sourcing', 'Prototype stage'],
    production: 'Scoped and quoted individually. Timelines depend on the build.',
    care: 'Supplied with the finished piece.',
    images: [
      gimg('studioz-d-gift-framed-print-square.webp', '1/1', 'A Studioz D bridal portrait printed, matted and framed on a wall'),
    ],
    related: ['crystal-photo-block', 'story-frame', 'collage-photo-frame'],
  },
];

/* ------------------------------------------------------------------------ */
/* Selectors                                                                 */
/* ------------------------------------------------------------------------ */

export const getGiftBySlug = (slug) => gifts.find((gift) => gift.slug === slug) ?? null;

export const getGiftCategory = (slug) =>
  giftCategories.find((category) => category.slug === slug) ?? null;

export const routableGiftCategories = giftCategories.filter((category) => category.routable);

export const getCategoriesByGroup = (groupId) =>
  giftCategories.filter((category) => category.group === groupId);

/**
 * `personalized` is a cross-cutting collection rather than a tag, so it
 * resolves to every product that accepts personalization.
 */
export const getGiftsByCategory = (categoryId) => {
  if (!categoryId || categoryId === 'all') return gifts;
  if (categoryId === 'personalized') {
    return gifts.filter((gift) => gift.personalization.available);
  }
  return gifts.filter((gift) => gift.categories.includes(categoryId));
};

export const getFeaturedGifts = (limit = 8) =>
  gifts.filter((gift) => gift.featured).slice(0, limit);

export const getRelatedGifts = (slug, limit = 4) => {
  const current = getGiftBySlug(slug);
  if (!current) return gifts.slice(0, limit);
  const explicit = current.related.map(getGiftBySlug).filter(Boolean);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const fill = gifts.filter(
    (gift) => gift.slug !== slug && !explicit.some((match) => match.slug === gift.slug)
  );
  return [...explicit, ...fill].slice(0, limit);
};

/**
 * The single filtering entry point used by /gifts and every category page.
 * Every clause is a narrowing step, so filters compose predictably.
 */
export const filterGifts = ({
  category = 'all',
  occasion = null,
  relationship = null,
  creation = null,
  feeling = null,
  tiers = [],
  personalizedOnly = false,
  featuredOnly = false,
  sort = 'featured',
  query = '',
} = {}) => {
  let result = getGiftsByCategory(category);

  for (const axis of [occasion, relationship, creation, feeling]) {
    if (axis) result = result.filter((gift) => gift.categories.includes(axis));
  }

  if (tiers.length > 0) result = result.filter((gift) => tiers.includes(gift.priceTier));
  if (personalizedOnly) result = result.filter((gift) => gift.personalization.available);
  if (featuredOnly) result = result.filter((gift) => gift.featured);

  const trimmed = query.trim().toLowerCase();
  if (trimmed) {
    result = result.filter((gift) =>
      `${gift.name} ${gift.category} ${gift.description} ${gift.tagline}`
        .toLowerCase()
        .includes(trimmed)
    );
  }

  const tierOrder = Object.fromEntries(priceTiers.map((tier) => [tier.id, tier.order]));
  const sorted = [...result];
  switch (sort) {
    case 'newest':
      sorted.sort((a, b) => Number(b.newest) - Number(a.newest));
      break;
    case 'tier-asc':
      sorted.sort((a, b) => (tierOrder[a.priceTier] ?? 9) - (tierOrder[b.priceTier] ?? 9));
      break;
    case 'tier-desc':
      sorted.sort((a, b) => (tierOrder[b.priceTier] ?? 0) - (tierOrder[a.priceTier] ?? 0));
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'featured':
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
  }
  return sorted;
};

/** Flat option list reused by the contact form's gift-category select. */
export const giftCategoryOptions = giftCategories
  .filter((category) => category.routable)
  .map((category) => ({ value: category.slug, label: category.label }));

/** Lightweight index powering the site-wide search. */
export const giftSearchIndex = gifts.map((gift) => ({
  type: 'gift',
  slug: gift.slug,
  title: gift.name,
  category: gift.category,
  description: gift.description,
  to: `/gifts/product/${gift.slug}`,
  image: gift.images[0]?.src,
  haystack: [gift.name, gift.category, gift.description, gift.tagline, ...gift.categories]
    .join(' ')
    .toLowerCase(),
}));

export default gifts;
