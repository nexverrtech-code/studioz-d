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
    image: '/assets/images/gifts/studioz-d-gift-category-birthday.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-anniversary.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-wedding.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-engagement.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-baby-shower.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-housewarming.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-graduation.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-festive.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-couples.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-parents.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-friends.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-baby-family.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-husband.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-wife.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-kids.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-colleagues.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-photo-frames.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-acrylic.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-collage.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-albums.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-hampers.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-memory.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-name.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-plaques.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-corporate.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-return.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-personalized.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-thank-you.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-love.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-celebrate.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-remember.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-congratulations.svg',
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
    image: '/assets/images/gifts/studioz-d-gift-category-just-because.svg',
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
      'A solid wood frame with a museum-grade print and a hand-cut mount. Engraved on the base with your words.',
    longDescription:
      'The frame everything else is compared to. We print on archival matte stock, mount it with a generous border, and set it behind low-reflection glazing so the photograph reads from across a room. The base carries an engraved line — a name, a date, or a sentence that only the two of you will understand.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Engraving is set on the frame base. Up to 40 characters reads best.',
    },
    material: 'Solid wood frame, archival matte print, acid-free mount board, low-reflection glazing',
    sizes: ['8x10 in', '11x14 in', '16x20 in', '20x28 in'],
    options: ['Natural oak', 'Walnut', 'Charcoal black', 'Ivory white'],
    production: 'Made to order after artwork approval. Timelines confirmed at enquiry.',
    care: 'Wipe glazing with a dry microfibre cloth. Keep out of direct sunlight to protect the print.',
    images: [
      gimg('studioz-d-gift-wood-frame-01.svg', '1/1', 'Personalized solid wood photo frame by Studioz D'),
      gimg('studioz-d-gift-wood-frame-02.svg', '4/5', 'Detail of engraved personalization on a wooden photo frame'),
      gimg('studioz-d-gift-wood-frame-03.svg', '4/3', 'Wood photo frame styled on a wall in a home interior'),
    ],
    related: ['acrylic-edge-frame', 'family-collage-frame', 'wedding-memory-box'],
  },
  {
    id: 'gift-002',
    slug: 'acrylic-edge-frame',
    name: 'Acrylic Edge Frame',
    category: 'Acrylic Frames',
    categories: ['acrylic-frames', 'photo-frames', 'couples', 'anniversary', 'personalized', 'celebrate-us'],
    priceTier: 'signature',
    price: null,
    featured: true,
    newest: true,
    tagline: 'Light gets into it.',
    description:
      'A photograph set inside polished acrylic, with names and a date etched into the edge.',
    longDescription:
      'Acrylic changes how a print behaves — colour sits deeper, and the polished edge catches whatever light is in the room. We etch the personalization into that edge rather than across the image, so the photograph stays untouched.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'photo'],
      note: 'Edge etching suits short text — two names and a date is the sweet spot.',
    },
    material: 'Cast acrylic block, direct-print photographic layer, polished edges',
    sizes: ['6x8 in', '8x12 in', '12x16 in'],
    options: ['Clear polish', 'Frosted back', 'Standing base', 'Wall mount'],
    production: 'Cut and finished to order. Timelines confirmed at enquiry.',
    care: 'Clean with a soft damp cloth only. Avoid abrasive cleaners, which will haze acrylic.',
    images: [
      gimg('studioz-d-gift-acrylic-frame-01.svg', '1/1', 'Personalized acrylic photo frame with etched edge detail'),
      gimg('studioz-d-gift-acrylic-frame-02.svg', '4/5', 'Acrylic photo block catching light on a shelf'),
      gimg('studioz-d-gift-acrylic-frame-03.svg', '4/3', 'Detail of etched names on an acrylic photo frame'),
    ],
    related: ['classic-wood-photo-frame', 'couple-name-plaque', 'anniversary-year-print'],
  },
  {
    id: 'gift-003',
    slug: 'family-collage-frame',
    name: 'Family Collage Frame',
    category: 'Photo Collages',
    categories: ['photo-collages', 'photo-frames', 'parents', 'baby-family', 'friends', 'personalized'],
    priceTier: 'premium',
    price: null,
    featured: true,
    newest: false,
    tagline: 'More than one moment, arranged properly.',
    description:
      'A multi-opening frame laid out around your photographs rather than a fixed template.',
    longDescription:
      'Most collage frames force your photographs into whatever holes the manufacturer cut. We do it the other way round: send the set, and the layout is designed around the images — their orientations, their crops and which one deserves to be biggest.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Layouts are designed for 3 to 12 photographs. A title line can be set into the mount.',
    },
    material: 'Wood frame, custom-cut acid-free mount, archival matte prints',
    sizes: ['12x16 in', '16x24 in', '24x36 in'],
    options: ['3 openings', '5 openings', '7 openings', '9 openings', '12 openings'],
    production: 'Layout proofed with you before production begins.',
    care: 'Dust the glazing with a dry cloth. Keep away from direct sunlight and damp walls.',
    images: [
      gimg('studioz-d-gift-collage-frame-01.svg', '4/3', 'Personalized family photo collage frame by Studioz D'),
      gimg('studioz-d-gift-collage-frame-02.svg', '1/1', 'Detail of a multi-opening photo collage layout'),
      gimg('studioz-d-gift-collage-frame-03.svg', '4/5', 'Collage frame styled in a family living room'),
    ],
    related: ['classic-wood-photo-frame', 'lay-flat-photo-album', 'grandparents-print-set'],
  },
  {
    id: 'gift-004',
    slug: 'lay-flat-photo-album',
    name: 'Lay-Flat Photo Album',
    category: 'Photo Albums',
    categories: ['photo-albums', 'wedding', 'anniversary', 'couples', 'personalized', 'remember-this'],
    priceTier: 'premium',
    price: null,
    featured: true,
    newest: false,
    tagline: 'Built to be opened, not stored.',
    description:
      'A hand-bound album with pages that lie completely flat, so a photograph can cross the spread uninterrupted.',
    longDescription:
      'The page design is the work here. We sequence the images so the album reads as a story, give the important frames a full spread, and let the quiet ones sit small. The binding lies flat, which means a single photograph can run across both pages without disappearing into a gutter.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Cover embossing and an opening dedication page are both included.',
    },
    material: 'Lay-flat bound pages, thick photographic stock, linen or leather cover',
    sizes: ['8x8 in', '10x10 in', '12x12 in', '12x16 in'],
    options: ['Linen cover', 'Leather cover', 'Debossed title', 'Presentation box'],
    production: 'Page design proofed with you before binding. Timelines confirmed at enquiry.',
    care: 'Store flat or upright, away from humidity. Handle pages by their edges.',
    images: [
      gimg('studioz-d-gift-album-01.svg', '4/3', 'Lay-flat personalized photo album opened to a full spread'),
      gimg('studioz-d-gift-album-02.svg', '1/1', 'Detail of an embossed album cover with personalized title'),
      gimg('studioz-d-gift-album-03.svg', '3/2', 'Photo album presented in its keepsake box'),
    ],
    related: ['wedding-memory-box', 'family-collage-frame', 'anniversary-year-print'],
  },
  {
    id: 'gift-005',
    slug: 'wedding-memory-box',
    name: 'Wedding Memory Box',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'wedding', 'couples', 'anniversary', 'personalized', 'remember-this'],
    priceTier: 'premium',
    price: null,
    featured: true,
    newest: true,
    tagline: 'Somewhere for the things too small to frame.',
    description:
      'A lined keepsake box holding printed photographs, with room left for everything else you kept.',
    longDescription:
      'The invitation. The ribbon. The ticket stubs. Every wedding leaves behind a pile of small things that have nowhere to live. This box gives them one — lined, compartmented, and filled with a printed set of your photographs on heavy stock.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'The lid carries engraved names and a date. Interior print sets are chosen with you.',
    },
    material: 'Rigid board box, fabric lining, archival photographic prints',
    sizes: ['9x9 in', '11x11 in', '12x16 in'],
    options: ['Linen finish', 'Suede finish', '25-print set', '50-print set', 'USB well'],
    production: 'Assembled to order once the print selection is approved.',
    care: 'Keep dry and out of direct sun. Handle prints by their edges.',
    images: [
      gimg('studioz-d-gift-memory-box-01.svg', '4/3', 'Personalized wedding memory keepsake box by Studioz D'),
      gimg('studioz-d-gift-memory-box-02.svg', '1/1', 'Memory box filled with printed photographs and keepsakes'),
      gimg('studioz-d-gift-memory-box-03.svg', '4/5', 'Detail of engraved lid on a personalized memory box'),
    ],
    related: ['lay-flat-photo-album', 'classic-wood-photo-frame', 'anniversary-hamper'],
  },
  {
    id: 'gift-006',
    slug: 'couple-name-plaque',
    name: 'Couple Name Plaque',
    category: 'Custom Name Gifts',
    categories: ['custom-name-gifts', 'couples', 'anniversary', 'wedding', 'personalized', 'i-love-you'],
    priceTier: 'keepsake',
    price: null,
    featured: false,
    newest: false,
    tagline: 'Two names, cut from one piece.',
    description:
      'Names and a date cut into solid wood or brushed metal, finished to sit on a shelf or a wall.',
    longDescription:
      'Restraint is the point. No photograph, no colour, no decoration — just two names and the date they became relevant, cut cleanly into a good material and finished by hand.',
    personalization: {
      available: true,
      fields: ['name', 'date'],
      note: 'Two names plus a date. Longer text moves to the plaque reverse.',
    },
    material: 'Solid wood or brushed brass, hand-finished edges',
    sizes: ['6x4 in', '9x6 in', '12x8 in'],
    options: ['Oak', 'Walnut', 'Brushed brass', 'Blackened steel', 'Standing', 'Wall-mounted'],
    production: 'Cut and finished to order after proof approval.',
    care: 'Dust with a dry cloth. Oil finishes can be refreshed annually.',
    images: [
      gimg('studioz-d-gift-name-plaque-01.svg', '4/3', 'Personalized couple name plaque in solid wood'),
      gimg('studioz-d-gift-name-plaque-02.svg', '1/1', 'Detail of engraved names and date on a plaque'),
    ],
    related: ['acrylic-edge-frame', 'anniversary-year-print', 'classic-wood-photo-frame'],
  },
  {
    id: 'gift-007',
    slug: 'anniversary-year-print',
    name: 'Anniversary Year Print',
    category: 'Photo Plaques',
    categories: ['photo-plaques', 'anniversary', 'couples', 'personalized', 'celebrate-us'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: false,
    tagline: 'One year, one frame, every year.',
    description:
      'A photograph fused to a wood or metal plaque, with the year set large and the words set small.',
    longDescription:
      'Built as a series. Each year gets its own plaque, the same format and the same finish, so a wall slowly fills up with a decade. The first one is a gift; by the fourth it is a tradition.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'The year prints large. A short line sits beneath it.',
    },
    material: 'Birch ply or aluminium substrate, dye-sublimation photographic surface',
    sizes: ['8x8 in', '10x10 in', '12x12 in'],
    options: ['Birch ply', 'White aluminium', 'Matte finish', 'Satin finish'],
    production: 'Printed and finished to order.',
    care: 'Wipe with a damp cloth. The surface is scratch-resistant but not scratch-proof.',
    images: [
      gimg('studioz-d-gift-year-print-01.svg', '1/1', 'Personalized anniversary photo plaque with year detail'),
      gimg('studioz-d-gift-year-print-02.svg', '4/5', 'Series of anniversary plaques arranged on a wall'),
    ],
    related: ['couple-name-plaque', 'acrylic-edge-frame', 'lay-flat-photo-album'],
  },
  {
    id: 'gift-008',
    slug: 'birthday-print-set',
    name: 'Birthday Print Set',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'birthday', 'friends', 'personalized', 'just-because'],
    priceTier: 'keepsake',
    price: null,
    featured: true,
    newest: false,
    tagline: 'A year of them, in a box that fits in a hand.',
    description:
      'A boxed set of heavy-stock prints, sequenced and captioned on the reverse.',
    longDescription:
      'Send the photographs from the year — the good ones and the badly-lit ones that everybody loves anyway. They come back printed on thick stock, sequenced, captioned by hand on the back, and boxed.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Reverse captions are set from your own text, one per print.',
    },
    material: 'Archival matte prints on 320gsm stock, rigid presentation box',
    sizes: ['5x7 in prints', '6x8 in prints'],
    options: ['25 prints', '50 prints', '100 prints', 'Handwritten captions', 'Printed captions'],
    production: 'Printed to order once the selection is confirmed.',
    care: 'Handle by the edges. Keep the box closed and dry.',
    images: [
      gimg('studioz-d-gift-print-set-01.svg', '4/3', 'Boxed set of personalized photographic prints'),
      gimg('studioz-d-gift-print-set-02.svg', '1/1', 'Detail of handwritten captions on the reverse of prints'),
    ],
    related: ['wedding-memory-box', 'friends-collage-print', 'birthday-hamper'],
  },
  {
    id: 'gift-009',
    slug: 'birthday-hamper',
    name: 'Birthday Hamper',
    category: 'Personalized Hampers',
    categories: ['custom-hampers', 'birthday', 'friends', 'personalized', 'just-because'],
    priceTier: 'premium',
    price: null,
    featured: false,
    newest: true,
    tagline: 'Curated, not assembled.',
    description:
      'A hamper built around one theme and one photograph, with every piece personalized.',
    longDescription:
      'Most hampers are a basket of unrelated things. This one starts with a theme and a single photograph, and every item in it connects back to that. Contents are chosen with you, so nothing arrives that nobody wanted.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Contents, theme and the personalized pieces inside are all agreed with you first.',
    },
    material: 'Rigid presentation box or woven basket, fabric fill, personalized inserts',
    sizes: ['Compact', 'Standard', 'Large'],
    options: ['Framed print included', 'Print set included', 'Keepsake card', 'Ribbon colour'],
    production: 'Assembled after the contents list is confirmed.',
    care: 'Contents vary — care notes are included with each hamper.',
    images: [
      gimg('studioz-d-gift-birthday-hamper-01.svg', '4/3', 'Personalized birthday gift hamper curated by Studioz D'),
      gimg('studioz-d-gift-birthday-hamper-02.svg', '1/1', 'Detail of personalized contents inside a gift hamper'),
      gimg('studioz-d-gift-birthday-hamper-03.svg', '4/5', 'Gift hamper styled and ready to give'),
    ],
    related: ['birthday-print-set', 'anniversary-hamper', 'corporate-welcome-set'],
  },
  {
    id: 'gift-010',
    slug: 'anniversary-hamper',
    name: 'Anniversary Hamper',
    category: 'Personalized Hampers',
    categories: ['custom-hampers', 'anniversary', 'couples', 'personalized', 'celebrate-us'],
    priceTier: 'premium',
    price: null,
    featured: false,
    newest: false,
    tagline: 'For the year you both remember differently.',
    description:
      'A two-person hamper with a framed print, a keepsake and a printed set at its centre.',
    longDescription:
      'Built around the year rather than the occasion. We start with the photographs from those twelve months, choose one for the frame, and build the rest of the hamper outward from it.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Both names and the anniversary date carry across every personalized piece.',
    },
    material: 'Rigid presentation box, fabric fill, framed print, personalized inserts',
    sizes: ['Standard', 'Large'],
    options: ['Wood frame', 'Acrylic frame', 'Print set', 'Engraved keepsake'],
    production: 'Assembled after the contents list is confirmed.',
    care: 'Contents vary — care notes are included with each hamper.',
    images: [
      gimg('studioz-d-gift-anniversary-hamper-01.svg', '4/3', 'Personalized anniversary gift hamper by Studioz D'),
      gimg('studioz-d-gift-anniversary-hamper-02.svg', '1/1', 'Framed print and keepsakes inside an anniversary hamper'),
    ],
    related: ['birthday-hamper', 'lay-flat-photo-album', 'couple-name-plaque'],
  },
  {
    id: 'gift-011',
    slug: 'grandparents-print-set',
    name: 'Grandparents Print Set',
    category: 'Photo Frames',
    categories: ['photo-frames', 'parents', 'baby-family', 'personalized', 'thank-you'],
    priceTier: 'signature',
    price: null,
    featured: true,
    newest: false,
    tagline: 'Printed large enough to actually see.',
    description:
      'A matched set of framed prints, sized and contrast-adjusted for easy viewing across a room.',
    longDescription:
      'Grandparents get sent photographs constantly and see almost none of them. This is the fix: a matched set of framed prints, sized generously, printed with slightly lifted contrast so they read clearly from a chair on the other side of the room.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'photo'],
      note: 'Each frame can carry a name and a year on the mount.',
    },
    material: 'Wood frames, archival matte prints, acid-free mounts',
    sizes: ['8x10 in', '11x14 in'],
    options: ['Set of 2', 'Set of 3', 'Set of 4', 'Matching finish', 'Mixed finish'],
    production: 'Printed and framed to order.',
    care: 'Dust with a dry cloth. Keep out of direct sunlight.',
    images: [
      gimg('studioz-d-gift-grandparents-set-01.svg', '4/3', 'Matched set of framed family prints for grandparents'),
      gimg('studioz-d-gift-grandparents-set-02.svg', '1/1', 'Framed family photograph with a personalized mount'),
    ],
    related: ['family-collage-frame', 'classic-wood-photo-frame', 'baby-milestone-frame'],
  },
  {
    id: 'gift-012',
    slug: 'baby-milestone-frame',
    name: 'Baby Milestone Frame',
    category: 'Photo Frames',
    categories: ['photo-frames', 'baby-family', 'baby-shower', 'kids', 'personalized', 'remember-this'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: true,
    tagline: 'The year that goes fastest.',
    description:
      'A multi-opening frame built for the first twelve months, with room for the details that come with them.',
    longDescription:
      'Designed for the first year specifically: twelve openings sized for monthly photographs, plus a central space for the name, the date and the numbers everybody writes down and then loses.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'The centre panel holds the name, birth date and the details you choose.',
    },
    material: 'Wood frame, custom-cut acid-free mount, archival prints',
    sizes: ['16x20 in', '20x28 in'],
    options: ['Natural oak', 'Ivory white', 'Soft grey', '12 openings', '13 openings with centre'],
    production: 'Layout proofed with you before printing.',
    care: 'Dust the glazing with a dry cloth. Keep away from damp walls.',
    images: [
      gimg('studioz-d-gift-baby-frame-01.svg', '4/3', 'Personalized baby milestone photo frame with twelve openings'),
      gimg('studioz-d-gift-baby-frame-02.svg', '1/1', 'Detail of the personalized centre panel on a milestone frame'),
    ],
    related: ['grandparents-print-set', 'family-collage-frame', 'kids-name-print'],
  },
  {
    id: 'gift-013',
    slug: 'kids-name-print',
    name: 'Kids Name Print',
    category: 'Custom Name Gifts',
    categories: ['custom-name-gifts', 'kids', 'baby-family', 'birthday', 'personalized', 'just-because'],
    priceTier: 'keepsake',
    price: null,
    featured: false,
    newest: false,
    tagline: 'Their name, at their height.',
    description:
      'A framed name print designed around a child’s photograph, hung low enough for them to see it.',
    longDescription:
      'A name print that is actually for the child rather than the room. The type is large, the photograph is theirs, and the whole thing is designed to be hung at their eye level rather than an adult’s.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'photo'],
      note: 'The name sets large. A birth date can sit beneath it.',
    },
    material: 'Archival matte print, wood frame, acrylic glazing (shatter-safe)',
    sizes: ['8x10 in', '11x14 in', '16x20 in'],
    options: ['Acrylic glazing', 'Natural oak', 'Ivory white', 'Soft sage'],
    production: 'Designed and proofed with you before printing.',
    care: 'Acrylic glazing cleans with a soft damp cloth. Avoid abrasive cleaners.',
    images: [
      gimg('studioz-d-gift-kids-name-01.svg', '4/5', 'Personalized name print for a child with photograph'),
      gimg('studioz-d-gift-kids-name-02.svg', '1/1', 'Detail of typography on a personalized kids name print'),
    ],
    related: ['baby-milestone-frame', 'couple-name-plaque', 'grandparents-print-set'],
  },
  {
    id: 'gift-014',
    slug: 'friends-collage-print',
    name: 'Friends Collage Print',
    category: 'Photo Collages',
    categories: ['photo-collages', 'friends', 'birthday', 'personalized', 'thank-you'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: false,
    tagline: 'For the group chat that became a decade.',
    description:
      'A single-sheet collage print pulling a decade of badly-lit phone photographs into one composition.',
    longDescription:
      'The photographs are terrible and that is the whole appeal. We take the phone shots, the group selfies and the blurry ones from a decade of nights out, colour-correct them just enough, and lay them into a single composition that is genuinely nice to look at.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'A title line and up to 30 photographs. Phone-quality images are fine.',
    },
    material: 'Archival matte print, optional wood frame',
    sizes: ['12x16 in', '16x24 in', '24x36 in'],
    options: ['Print only', 'Framed', '12 photographs', '20 photographs', '30 photographs'],
    production: 'Layout proofed with you before printing.',
    care: 'Frame behind glazing for display. Store flat if unframed.',
    images: [
      gimg('studioz-d-gift-friends-collage-01.svg', '4/3', 'Personalized friends photo collage print'),
      gimg('studioz-d-gift-friends-collage-02.svg', '1/1', 'Detail of a collage print layout with multiple photographs'),
    ],
    related: ['family-collage-frame', 'birthday-print-set', 'birthday-hamper'],
  },
  {
    id: 'gift-015',
    slug: 'corporate-welcome-set',
    name: 'Corporate Welcome Set',
    category: 'Corporate Gifts',
    categories: ['corporate', 'colleagues', 'personalized', 'congratulations'],
    priceTier: 'premium',
    price: null,
    featured: true,
    newest: false,
    tagline: 'Volume, without looking like volume.',
    description:
      'An onboarding set personalized per recipient, produced to a consistent brand standard.',
    longDescription:
      'Corporate gifting usually fails in one of two directions: identical and impersonal, or personal and inconsistent. These sets are produced to a single brand standard, with the personalized element handled per recipient, so a hundred of them arrive looking like one considered decision.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date'],
      note: 'Per-recipient names are handled from a supplied list. Brand assets are matched to your guidelines.',
    },
    material: 'Rigid branded box, personalized inserts, printed and engraved pieces',
    sizes: ['Compact', 'Standard'],
    options: ['Branded box', 'Engraved desk piece', 'Printed welcome card', 'Bulk 25+', 'Bulk 100+'],
    production: 'Produced to a confirmed brief and recipient list. Volume timelines agreed at enquiry.',
    care: 'Contents vary — care notes are included in each set.',
    images: [
      gimg('studioz-d-gift-corporate-set-01.svg', '4/3', 'Personalized corporate welcome gift set'),
      gimg('studioz-d-gift-corporate-set-02.svg', '1/1', 'Detail of branded corporate gift packaging'),
    ],
    related: ['corporate-desk-frame', 'milestone-award-plaque', 'birthday-hamper'],
  },
  {
    id: 'gift-016',
    slug: 'corporate-desk-frame',
    name: 'Corporate Desk Frame',
    category: 'Corporate Gifts',
    categories: ['corporate', 'colleagues', 'photo-frames', 'personalized', 'congratulations'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: false,
    tagline: 'Personal, without being personal.',
    description:
      'A restrained desk frame carrying a team photograph and an engraved line.',
    longDescription:
      'Sized for a desk rather than a wall, and built to be unobtrusive. A team photograph, a clean frame, and one engraved line — the kind of object that survives three office moves.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'photo'],
      note: 'One engraved line on the base. Names are handled from a supplied list.',
    },
    material: 'Brushed metal or wood frame, archival print, standing base',
    sizes: ['5x7 in', '6x8 in'],
    options: ['Brushed steel', 'Walnut', 'Blackened finish', 'Bulk 25+'],
    production: 'Produced to order against a confirmed list.',
    care: 'Dust with a dry cloth.',
    images: [
      gimg('studioz-d-gift-desk-frame-01.svg', '1/1', 'Personalized corporate desk photo frame'),
      gimg('studioz-d-gift-desk-frame-02.svg', '4/3', 'Desk frame styled in a workspace setting'),
    ],
    related: ['corporate-welcome-set', 'milestone-award-plaque', 'classic-wood-photo-frame'],
  },
  {
    id: 'gift-017',
    slug: 'milestone-award-plaque',
    name: 'Milestone Award Plaque',
    category: 'Photo Plaques',
    categories: ['photo-plaques', 'corporate', 'colleagues', 'graduation', 'personalized', 'congratulations'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: false,
    tagline: 'They earned it. Make it look like it.',
    description:
      'An engraved plaque for a work anniversary, a graduation or a genuine achievement.',
    longDescription:
      'Awards usually look cheap because they are designed to be cheap. This one is not — solid material, clean type, deep engraving, and an optional photograph fused to the face rather than stuck on it.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Name, achievement line and date. A photograph can be fused to the face.',
    },
    material: 'Solid wood or brushed brass, deep-engraved face, optional photographic panel',
    sizes: ['6x8 in', '8x10 in', '10x14 in'],
    options: ['Walnut', 'Brushed brass', 'Blackened steel', 'With photograph', 'Text only'],
    production: 'Engraved to order after proof approval.',
    care: 'Dust with a dry cloth. Brass can be polished with a suitable cloth.',
    images: [
      gimg('studioz-d-gift-award-plaque-01.svg', '4/3', 'Personalized engraved milestone award plaque'),
      gimg('studioz-d-gift-award-plaque-02.svg', '1/1', 'Detail of deep engraving on an award plaque'),
    ],
    related: ['corporate-welcome-set', 'corporate-desk-frame', 'anniversary-year-print'],
  },
  {
    id: 'gift-018',
    slug: 'wedding-return-gift',
    name: 'Wedding Return Gift',
    category: 'Return Gifts',
    categories: ['return-gifts', 'wedding', 'festive', 'personalized', 'thank-you'],
    priceTier: 'keepsake',
    price: null,
    featured: true,
    newest: false,
    tagline: 'The thing guests actually take home.',
    description:
      'A small personalized keepsake produced at volume, with a printed card carrying your words.',
    longDescription:
      'Return gifts fail when they are forgettable. Keeping it small and making it specific fixes that — one good photograph, a printed card with the couple’s own line on it, and packaging that does not look like it was bought in bulk, even though it was.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'One shared design across the run. Guest names can be added per-piece on request.',
    },
    material: 'Printed keepsake card, small framed print or engraved piece, presentation sleeve',
    sizes: ['Card + 4x6 print', 'Card + small frame', 'Card + engraved keepsake'],
    options: ['Bulk 50+', 'Bulk 100+', 'Bulk 250+', 'Guest names added', 'Shared design'],
    production: 'Volume production with lead times agreed at enquiry.',
    care: 'Keep dry until distributed.',
    images: [
      gimg('studioz-d-gift-return-01.svg', '1/1', 'Personalized wedding return gift keepsake'),
      gimg('studioz-d-gift-return-02.svg', '4/3', 'Return gifts arranged for a celebration'),
    ],
    related: ['festive-keepsake-set', 'wedding-memory-box', 'corporate-welcome-set'],
  },
  {
    id: 'gift-019',
    slug: 'festive-keepsake-set',
    name: 'Festive Keepsake Set',
    category: 'Personalized Hampers',
    categories: ['custom-hampers', 'festive', 'return-gifts', 'corporate', 'personalized', 'thank-you'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: true,
    tagline: 'Given by the dozen, still personal.',
    description:
      'A festive set produced in quantity with per-recipient personalization built into the run.',
    longDescription:
      'Designed for the season when a lot of gifts go out at once. The core set is consistent, the personalized element varies per recipient, and the production is planned so quantity does not turn into compromise.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'photo'],
      note: 'Per-recipient names handled from a supplied list. One shared design across the run.',
    },
    material: 'Presentation box, printed inserts, personalized keepsake',
    sizes: ['Compact', 'Standard'],
    options: ['Bulk 25+', 'Bulk 50+', 'Bulk 100+', 'Printed card', 'Engraved keepsake'],
    production: 'Volume production with lead times agreed at enquiry.',
    care: 'Contents vary — care notes are included.',
    images: [
      gimg('studioz-d-gift-festive-set-01.svg', '4/3', 'Personalized festive keepsake gift set'),
      gimg('studioz-d-gift-festive-set-02.svg', '1/1', 'Detail of festive gift packaging and personalization'),
    ],
    related: ['wedding-return-gift', 'corporate-welcome-set', 'birthday-hamper'],
  },
  {
    id: 'gift-020',
    slug: 'engagement-keepsake-frame',
    name: 'Engagement Keepsake Frame',
    category: 'Photo Frames',
    categories: ['photo-frames', 'engagement', 'couples', 'personalized', 'celebrate-us'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: false,
    tagline: 'The start of the story, framed.',
    description:
      'A double-opening frame holding the moment and the detail, with names set into the mount.',
    longDescription:
      'Two openings, because an engagement is two photographs: the moment it happened, and the close detail of the ring. The mount carries both names and the date, cut rather than printed.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'photo'],
      note: 'Both names and the date are cut into the mount board.',
    },
    material: 'Wood frame, custom-cut acid-free mount, archival prints',
    sizes: ['11x14 in', '12x18 in'],
    options: ['Natural oak', 'Walnut', 'Ivory white', 'Two openings', 'Three openings'],
    production: 'Layout proofed before production.',
    care: 'Dust with a dry cloth. Keep out of direct sunlight.',
    images: [
      gimg('studioz-d-gift-engagement-frame-01.svg', '4/3', 'Personalized engagement keepsake photo frame'),
      gimg('studioz-d-gift-engagement-frame-02.svg', '1/1', 'Detail of cut names on an engagement frame mount'),
    ],
    related: ['classic-wood-photo-frame', 'couple-name-plaque', 'lay-flat-photo-album'],
  },
  {
    id: 'gift-021',
    slug: 'housewarming-wall-set',
    name: 'Housewarming Wall Set',
    category: 'Photo Frames',
    categories: ['photo-frames', 'housewarming', 'parents', 'friends', 'personalized', 'congratulations'],
    priceTier: 'premium',
    price: null,
    featured: false,
    newest: false,
    tagline: 'A wall that needed something.',
    description:
      'A coordinated set of framed prints, laid out as a gallery wall rather than sold as singles.',
    longDescription:
      'New walls are the hardest thing to fill. This is a coordinated set — matched frames, a designed arrangement, and a paper template so it goes up straight the first time.',
    personalization: {
      available: true,
      fields: ['name', 'date', 'photo'],
      note: 'Arrangement is designed around your photographs and the wall dimensions you send.',
    },
    material: 'Matched wood frames, archival matte prints, acid-free mounts, hanging template',
    sizes: ['Set of 3', 'Set of 5', 'Set of 7'],
    options: ['Natural oak', 'Walnut', 'Charcoal black', 'Mixed sizes', 'Uniform sizes'],
    production: 'Arrangement proofed with you before framing.',
    care: 'Dust with a dry cloth. Use the supplied template for hanging.',
    images: [
      gimg('studioz-d-gift-wall-set-01.svg', '4/3', 'Coordinated gallery wall set of framed prints'),
      gimg('studioz-d-gift-wall-set-02.svg', '3/2', 'Gallery wall arrangement styled in a new home'),
    ],
    related: ['family-collage-frame', 'grandparents-print-set', 'classic-wood-photo-frame'],
  },
  {
    id: 'gift-022',
    slug: 'travel-memory-map',
    name: 'Travel Memory Print',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'couples', 'friends', 'anniversary', 'personalized', 'remember-this'],
    priceTier: 'signature',
    price: null,
    featured: false,
    newest: true,
    tagline: 'Everywhere you went, on one sheet.',
    description:
      'A composed print pairing photographs with the places and dates they belong to.',
    longDescription:
      'Part photograph, part record. Images sit alongside the place names and dates they came from, composed into a single sheet that works as a piece of design rather than a scrapbook page.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Place names, dates and a title line, set with your photographs.',
    },
    material: 'Archival matte print, optional wood frame',
    sizes: ['12x16 in', '16x24 in', '24x36 in'],
    options: ['Print only', 'Framed', '6 locations', '12 locations', '20 locations'],
    production: 'Layout proofed with you before printing.',
    care: 'Frame behind glazing for display. Store flat if unframed.',
    images: [
      gimg('studioz-d-gift-travel-print-01.svg', '4/3', 'Personalized travel memory print with photographs and locations'),
      gimg('studioz-d-gift-travel-print-02.svg', '1/1', 'Detail of location and date typography on a travel print'),
    ],
    related: ['friends-collage-print', 'birthday-print-set', 'lay-flat-photo-album'],
  },
  {
    id: 'gift-023',
    slug: 'thank-you-card-set',
    name: 'Thank You Card Set',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'wedding', 'return-gifts', 'personalized', 'thank-you'],
    priceTier: 'keepsake',
    price: null,
    featured: false,
    newest: false,
    tagline: 'For the ones who showed up.',
    description:
      'Printed thank-you cards carrying one of your own photographs and your own words.',
    longDescription:
      'A card with a photograph on it gets kept. A card with a stock illustration does not. These use a frame from your own gallery on the face and leave the inside blank, because whatever you write there will be better than anything we could print.',
    personalization: {
      available: true,
      fields: ['name', 'message', 'date', 'photo'],
      note: 'Photograph on the face, printed line on the back. Inside left blank to write in.',
    },
    material: '350gsm uncoated card, matte photographic face, envelopes included',
    sizes: ['A6', 'A5', 'Square 5x5 in'],
    options: ['Pack of 25', 'Pack of 50', 'Pack of 100', 'Printed message', 'Blank inside'],
    production: 'Printed to order after proof approval.',
    care: 'Keep dry. Uncoated stock takes ink well — any pen works.',
    images: [
      gimg('studioz-d-gift-cards-01.svg', '4/3', 'Personalized photographic thank you card set'),
      gimg('studioz-d-gift-cards-02.svg', '1/1', 'Detail of a printed photographic card face'),
    ],
    related: ['wedding-return-gift', 'birthday-print-set', 'wedding-memory-box'],
  },
  {
    id: 'gift-024',
    slug: 'bespoke-commission',
    name: 'Bespoke Commission',
    category: 'Memory Gifts',
    categories: ['memory-gifts', 'personalized', 'couples', 'parents', 'corporate', 'just-because'],
    priceTier: 'bespoke',
    price: null,
    featured: true,
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
      gimg('studioz-d-gift-bespoke-01.svg', '4/3', 'Bespoke personalized creation by Studioz D'),
      gimg('studioz-d-gift-bespoke-02.svg', '1/1', 'Detail of a custom-built keepsake piece'),
    ],
    related: ['wedding-memory-box', 'milestone-award-plaque', 'travel-memory-map'],
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
