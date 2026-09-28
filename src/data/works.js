/**
 * Portfolio data — projects, their story blocks and every photograph.
 *
 * These are the studio's REAL photographs, supplied by Studioz D and imported
 * with `npm run photos`. Every `file` below resolves to a `.webp` in
 * `public/assets/images/works/`, with responsive AVIF/WebP variants beside it
 * that `OptimizedImage` picks up automatically.
 *
 * WHAT THE SUPPLIED WORK COVERS
 * -----------------------------
 * Weddings, pre-weddings, engagements, receptions, bridal and groom portraits,
 * couple portraits, baby, maternity, product and commercial work. There is no
 * film or reels work in the set, so those categories are deliberately absent
 * rather than padded with stand-ins. Add them when it exists.
 *
 * COLLECTIONS
 * -----------
 * Most projects are one celebration. The last four are COLLECTIONS: frames
 * from several different sessions grouped by subject (brides, grooms, couples,
 * babies), because that is how the studio supplied them. Their copy says so,
 * and they carry no `year` — a single year would be a claim about one event.
 *
 * The second batch of photography repeated 41 frames already on the site.
 * Those were matched by perceptual hash against the existing files and left
 * out, so no photograph appears twice in the gallery.
 *
 * CLIENT NAMES
 * ------------
 * Project titles are editorial. No client is named in copy — a couple's names
 * are visible inside one photograph because the studio chose to share it, but
 * naming people in text is a separate permission nobody has given.
 *
 * Every image carries explicit width/height so the browser reserves the right
 * box before the file arrives. That is what keeps CLS at zero in a gallery
 * this dense.
 */

/** Pixel dimensions per supported aspect ratio, used to reserve layout space. */
const RATIO_DIMENSIONS = {
  '1/1': [1400, 1400],
  '4/5': [1280, 1600],
  '3/4': [1200, 1600],
  '2/3': [1100, 1650],
  '3/2': [1600, 1067],
  '4/3': [1600, 1200],
  '16/9': [1920, 1080],
  '21/9': [1920, 823],
};

/**
 * Compact image factory. Keeps the data readable while still emitting the full
 * metadata (dimensions, aspect, alt, caption) every gallery component expects.
 */
const img = (file, aspect, alt, caption = '') => {
  const [width, height] = RATIO_DIMENSIONS[aspect] ?? RATIO_DIMENSIONS['3/2'];
  return {
    src: `/assets/images/works/${file}`,
    width,
    height,
    aspect,
    /** Orientation drives masonry column placement and lightbox sizing. */
    orientation: width > height ? 'landscape' : width < height ? 'portrait' : 'square',
    alt,
    caption,
  };
};

/**
 * Canonical portfolio taxonomy.
 *
 * `segment` is non-null only for categories that own a dedicated URL.
 * `heroTitle` / `seoTitle` are written per category rather than generated,
 * because "Weddings Photography" is exactly the kind of wording a template
 * produces and a person never would.
 */
export const workCategories = [
  { id: 'all', label: 'All', segment: null },
  {
    id: 'wedding',
    label: 'Weddings',
    segment: 'weddings',
    heroTitle: 'Wedding Stories',
    seoTitle: 'Wedding Photography',
    lede: 'Church aisles, silk sarees and the moment a room turns. Full days, start to finish.',
  },
  {
    id: 'bridal',
    label: 'Bridal',
    segment: 'bridal',
    heroTitle: 'Bridal Portraits',
    seoTitle: 'Bridal Portrait Photography',
    lede: 'The make-up chair, the mirror, the jewellery — and the last quiet minutes before the day begins.',
  },
  { id: 'groom', label: 'Groom', segment: null },
  {
    id: 'pre-wedding',
    label: 'Pre-Weddings',
    segment: 'pre-weddings',
    heroTitle: 'Pre-Wedding Sessions',
    seoTitle: 'Pre-Wedding Photography',
    lede: 'The one session with no schedule to keep and nobody else in the room.',
  },
  {
    id: 'engagement',
    label: 'Engagements',
    segment: 'engagements',
    heroTitle: 'Engagements',
    seoTitle: 'Engagement Photography',
    lede: 'The ring takes four seconds. The faces around it are what the photographs are for.',
  },
  {
    id: 'reception',
    label: 'Receptions',
    segment: 'receptions',
    heroTitle: 'Receptions',
    seoTitle: 'Reception Photography',
    lede: 'Stage light, sparklers and two families becoming one guest list.',
  },
  {
    id: 'portrait',
    label: 'Portraits',
    segment: 'portraits',
    heroTitle: 'Portraits',
    seoTitle: 'Portrait Photography',
    lede: 'Where the work is mostly getting someone comfortable enough to stop performing.',
  },
  { id: 'couples', label: 'Couples', segment: null },
  {
    id: 'baby',
    label: 'Baby & Family',
    segment: 'baby-family',
    heroTitle: 'Baby & Family',
    seoTitle: 'Newborn & Baby Photography',
    lede: 'Newborns, little ones, and the sets built around them.',
  },
  {
    id: 'maternity',
    label: 'Maternity',
    segment: 'maternity',
    heroTitle: 'Maternity',
    seoTitle: 'Maternity Photography',
    lede: 'The last weeks before hello.',
  },
  {
    id: 'product',
    label: 'Product',
    segment: 'product',
    heroTitle: 'Product',
    seoTitle: 'Product Photography',
    lede: 'Styled and lit so the product does the talking.',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    segment: 'commercial',
    heroTitle: 'Commercial',
    seoTitle: 'Commercial Photography',
    lede: 'Campaign imagery on built sets.',
  },
];

export const works = [
  /* ---------------------------------------------------------- WEDDINGS -- */
  {
    id: 'work-001',
    slug: 'the-vow-made-aloud',
    title: 'The Vow Made Aloud',
    category: 'Wedding',
    categories: ['wedding', 'couples'],
    primaryCategory: 'wedding',
    year: '2023',
    location: '',
    featured: true,
    heroRank: 1,
    service: 'wedding-photography',
    description:
      'A church wedding photographed from the bridal party through to the sparklers — the formal, the family and the noise in between.',
    story: [
      'Church weddings run to a script, and the script is not the interesting part. The interesting part is the four women in mint green holding bouquets and talking over each other while they wait.',
      'We photographed the order of service properly, then spent the rest of the day turned the other way.',
    ],
    behindTheFrame:
      'Available light inside the church, a single off-camera source for the entrance, and no flash at all during the ceremony.',
    coverImage: '/assets/images/works/studioz-d-wedding-sparkler-entry.webp',
    images: [
      img('studioz-d-wedding-bride-bridesmaids.webp', '3/2', 'Bride in a white gown and veil with three bridesmaids in mint green dresses holding bouquets outside the church', 'Before the doors'),
      img('studioz-d-wedding-church-party.webp', '3/2', 'Wedding party gathered outside a blue-lit church facade, groomsmen in cream suits and bridesmaids in mint green', 'The whole party'),
      img('studioz-d-wedding-church-entrance.webp', '2/3', 'Bride and groom standing together at the church entrance beneath a chandelier, framed by floral arrangements', 'At the door'),
      img('studioz-d-wedding-sparkler-entry.webp', '3/2', 'Newlyweds wearing garlands walking between cold-spark fountains and flower urns at their reception entrance', 'The entrance'),
    ],
  },
  {
    id: 'work-002',
    slug: 'before-she-walked-out',
    title: 'Before She Walked Out',
    category: 'Wedding',
    categories: ['wedding', 'portrait', 'bridal'],
    primaryCategory: 'wedding',
    year: '2022',
    location: '',
    featured: true,
    heroRank: 7,
    service: 'wedding-photography',
    description:
      'Bridal portraits taken in the last quiet half hour, before anyone else was allowed into the room.',
    story: [
      'Every bride gets about thirty minutes alone between being ready and being seen. It is the calmest she will be all day, and almost nobody photographs it.',
      'One window, one room, and no audience.',
    ],
    behindTheFrame:
      'Window light only, with the shutters half closed to cut it into bands across the saree.',
    coverImage: '/assets/images/works/studioz-d-wedding-bride-silk-saree-window.webp',
    images: [
      img('studioz-d-wedding-bride-silk-saree-window.webp', '3/2', 'South Indian bride in an orange and pink silk saree with gold jewellery standing at a blue shuttered window in shafts of light', 'Through the shutters'),
      img('studioz-d-wedding-bride-silk-saree-smiling.webp', '3/2', 'Bride in traditional silk saree and gold jewellery smiling beside a window, mehndi visible on her hands', 'A moment to herself'),
      img('studioz-d-wedding-bridal-portrait-bouquet.webp', '3/2', 'Bridal portrait against a warm orange backdrop, the bride holding a large white baby’s breath bouquet to her face', 'Behind the flowers'),
    ],
  },
  {
    id: 'work-003',
    slug: 'the-room-turned-green',
    title: 'The Room Turned Green',
    category: 'Reception',
    categories: ['reception', 'wedding', 'couples'],
    primaryCategory: 'reception',
    year: '2022',
    location: '',
    featured: false,
    service: 'event-photography',
    description:
      'A reception lit entirely in green and gold, photographed on the stage and in the garden behind it.',
    story: [
      'The stage lighting was green, which most photographers treat as a problem to correct. We leaned into it instead — the whole evening had one colour and the photographs should say so.',
      'The frames people liked best were the two taken outside, away from the stage, when nobody was watching.',
    ],
    behindTheFrame:
      'Matched the white balance to the stage rather than fighting it, then used a warm off-camera light to separate the couple from the green.',
    coverImage: '/assets/images/works/studioz-d-reception-stage-couple-seated.webp',
    images: [
      img('studioz-d-reception-stage-couple-standing.webp', '3/2', 'Couple standing together on a green-lit reception stage, the groom in a cream sherwani and the bride in an olive lehenga', 'On the stage'),
      img('studioz-d-reception-stage-couple-seated.webp', '3/2', 'Bride and groom seated on a white sofa at their reception, framed by floral garlands and a monogrammed backdrop', 'Between greetings'),
      img('studioz-d-reception-night-couple-close.webp', '3/2', 'Couple standing close together at night among green foliage, the groom in a cream sherwani', 'Outside, briefly'),
    ],
  },

  /* ------------------------------------------------------ PRE-WEDDINGS -- */
  {
    id: 'work-004',
    slug: 'enchanted',
    title: 'Enchanted',
    category: 'Pre-Wedding',
    categories: ['pre-wedding', 'couples'],
    primaryCategory: 'pre-wedding',
    year: '2024',
    location: '',
    featured: true,
    heroRank: 2,
    service: 'pre-wedding-photography',
    description:
      'A pre-wedding session shot on wet rock at the water line, timed so every frame had a wave in it.',
    story: [
      'They wanted the sea in the photographs. Not behind them — in them.',
      'So we worked on the rocks at the edge of the tide for two hours, waiting for the sets to come in, and got soaked doing it. The wave frame took about forty attempts.',
    ],
    behindTheFrame:
      'Shot into the light with the sun low behind the spray. Everything white was chosen so the couple would separate from the dark rock.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-wave-kiss.webp',
    images: [
      img('studioz-d-pre-wedding-wave-kiss.webp', '3/2', 'Couple in white kissing on rocks as a large wave breaks behind them, backlit by low sun', 'Forty attempts'),
      img('studioz-d-pre-wedding-rocks-dip-enchanted.webp', '4/5', 'Couple dip-dancing barefoot on wet rocks at sunset, the woman in a white dress leaning back', 'Lost in love'),
      img('studioz-d-pre-wedding-rocks-twirl.webp', '4/5', 'Couple dancing on rocks by the sea, the man twirling the woman under his arm', 'The turn'),
      img('studioz-d-pre-wedding-double-exposure.webp', '4/5', 'Double exposure combining the couple lying together with them dancing on the shoreline', 'Two frames, one'),
      img('studioz-d-pre-wedding-overhead-sand.webp', '3/2', 'Overhead frame of a couple in white lying head to head on wet sand beside a bouquet', 'From above'),
    ],
  },
  {
    id: 'work-005',
    slug: 'where-the-sea-met-us',
    title: 'Where the Sea Met Us',
    category: 'Pre-Wedding',
    categories: ['pre-wedding', 'couples'],
    primaryCategory: 'pre-wedding',
    year: '2023',
    location: '',
    featured: true,
    heroRank: 5,
    service: 'pre-wedding-photography',
    description:
      'A gown-and-suit pre-wedding shoot on the coast, from an overcast dusk through to a proposal on the rocks.',
    story: [
      'A wedding gown on a beach is either a cliché or it is not, and the difference is entirely the weather.',
      'We got a heavy grey sky, a rough sea and a horse that turned up uninvited. None of it was planned and all of it is in the edit.',
    ],
    behindTheFrame: 'No reflectors, no flash. The cloud cover did the work.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-rocks-wave-gown.webp',
    images: [
      img('studioz-d-pre-wedding-beach-gown-dusk.webp', '3/2', 'Couple embracing on a beach at dusk under a heavy grey sky, the bride in a white gown and veil holding a bouquet', 'Grey sky'),
      img('studioz-d-pre-wedding-rocks-wave-gown.webp', '3/2', 'Bride in a white gown and groom in a dark suit standing on rocks as a wave breaks behind them', 'The set came in'),
      img('studioz-d-pre-wedding-proposal-rocks.webp', '3/2', 'Man kneeling on the rocks offering flowers to a woman in a white gown, waves breaking behind', 'On one knee'),
      img('studioz-d-pre-wedding-beach-horse.webp', '3/2', 'Couple standing on the sand beside a horse, the woman in a white gown and the man in a white shirt', 'Uninvited'),
    ],
  },
  {
    id: 'work-006',
    slug: 'the-long-road',
    title: 'The Long Road',
    category: 'Pre-Wedding',
    categories: ['pre-wedding', 'couples', 'portrait'],
    primaryCategory: 'pre-wedding',
    year: '2021',
    location: '',
    featured: true,
    heroRank: 6,
    service: 'pre-wedding-photography',
    description:
      'A pre-wedding session that started on an empty tree-lined road and finished under festoon lights.',
    story: [
      'The road was the whole idea. Empty, lined both sides, and long enough that we could just walk and talk until they forgot the camera.',
      'Everything good came from the walking.',
    ],
    behindTheFrame:
      'One lens the entire session. The only lighting was a string of festoon bulbs already hanging in the garden.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-tree-lined-road.webp',
    images: [
      img('studioz-d-pre-wedding-tree-lined-road.webp', '3/2', 'Couple walking hand in hand down an empty tree-lined road in autumn light', 'Just walking'),
      img('studioz-d-pre-wedding-road-dip.webp', '2/3', 'Man dipping his partner in a dance pose in the middle of a tree-lined road', 'Mid-road'),
      img('studioz-d-pre-wedding-golden-hour-close.webp', '2/3', 'Couple standing forehead to forehead at golden hour with the sun setting over the sea behind them', 'Golden hour'),
      img('studioz-d-pre-wedding-festoon-lights.webp', '3/2', 'Couple facing each other under hanging festoon bulbs and yellow foliage at night', 'Under the bulbs'),
    ],
  },
  {
    id: 'work-007',
    slug: 'last-light',
    title: 'Last Light',
    category: 'Pre-Wedding',
    categories: ['pre-wedding', 'couples'],
    primaryCategory: 'pre-wedding',
    year: '2024',
    location: '',
    featured: true,
    service: 'pre-wedding-photography',
    description:
      'Three silhouettes from the last twenty minutes of a beach session, once the sun was low enough to shoot straight into.',
    story: [
      'Silhouettes only work when you give up on faces entirely. The moment you try to keep detail in the skin, the sky goes and the whole thing collapses.',
      'So we exposed for the sun and let them go black.',
    ],
    behindTheFrame:
      'Exposed for the sky, about four stops under the subjects. Everything in these frames is shape.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-sunset-shore-walk.webp',
    images: [
      img('studioz-d-pre-wedding-sunset-lift-silhouette.webp', '4/5', 'Silhouette of a man lifting his partner in the surf against a deep orange sunset', 'The lift'),
      img('studioz-d-pre-wedding-sunset-shore-walk.webp', '3/2', 'Couple walking along the shoreline in silhouette, the sun low and reflecting off the wet sand', 'Along the edge'),
      img('studioz-d-pre-wedding-sunset-embrace-silhouette.webp', '2/3', 'Close silhouette of a couple about to kiss, the setting sun directly behind them', 'Last of it'),
    ],
  },
  {
    id: 'work-008',
    slug: 'the-quiet-hours',
    title: 'The Quiet Hours',
    category: 'Pre-Wedding',
    categories: ['pre-wedding', 'couples'],
    primaryCategory: 'pre-wedding',
    year: '2023',
    location: '',
    featured: false,
    service: 'pre-wedding-photography',
    description:
      'A session built around four unrelated ideas — newspapers, a boat, a flowering wall and an old house.',
    story: [
      'Some couples want one look. These two wanted four, and were willing to move four times to get them.',
      'The newspaper frame was theirs, not ours. We would never have suggested it and it is the best photograph of the day.',
    ],
    behindTheFrame:
      'Four setups, four lighting approaches, one afternoon into night. The boat frame is a long exposure with the couple holding still.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-boat-night.webp',
    images: [
      img('studioz-d-pre-wedding-newspapers-bokeh.webp', '3/2', 'Couple lying together on a floor covered in newspapers, shot through out-of-focus warm lights', 'Their idea'),
      img('studioz-d-pre-wedding-boat-night.webp', '3/2', 'Couple sitting in a red boat on still water at night, an ornate balustrade bridge lit behind them', 'Held still'),
      img('studioz-d-pre-wedding-bougainvillea-close.webp', '2/3', 'Couple standing close together framed by bougainvillea branches and leaves', 'Through the branches'),
      img('studioz-d-pre-wedding-heritage-house.webp', '3/2', 'Couple seated on the steps of a traditional tiled heritage house, the woman in a red outfit, greenery in the foreground', 'The old house'),
    ],
  },
  {
    id: 'work-009',
    slug: 'the-blue-doors',
    title: 'The Blue Doors',
    category: 'Pre-Wedding',
    categories: ['pre-wedding', 'couples'],
    primaryCategory: 'pre-wedding',
    year: '2022',
    location: '',
    featured: false,
    service: 'pre-wedding-photography',
    description:
      'A colour-led session using painted walls and doorways as the whole set, finishing on a silhouette at sunset.',
    story: [
      'The location was chosen entirely for its paintwork — white arches, teal shutters, a green door and a red frame, all within about fifty metres.',
      'The magenta gown was picked afterwards, to fight all of it.',
    ],
    behindTheFrame:
      'Shot low and wide to let the architecture dominate, then one long lens frame at the end for the silhouette.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-magenta-gown-arch.webp',
    images: [
      img('studioz-d-pre-wedding-magenta-gown-arch.webp', '3/2', 'Couple beneath a white arch with teal shutters, the woman in a magenta gown with the train sweeping across the frame', 'Against the white'),
      img('studioz-d-pre-wedding-magenta-gown-doorway.webp', '3/2', 'Couple standing against a stone and brick wall with green and red painted doors, the woman in a magenta gown', 'Every colour at once'),
      img('studioz-d-pre-wedding-sunset-tree-silhouette.webp', '3/2', 'Silhouette of a couple standing under a spreading tree against an orange sunset sky', 'And then none'),
    ],
  },
  {
    id: 'work-010',
    slug: 'colour-then-smoke',
    title: 'Colour, Then Smoke',
    category: 'Pre-Wedding',
    categories: ['pre-wedding', 'couples'],
    primaryCategory: 'pre-wedding',
    year: '2021',
    location: '',
    featured: false,
    service: 'pre-wedding-photography',
    description:
      'A two-location session — a smoke flare in a park, then the coast with the sea doing the rest.',
    story: [
      'Smoke flares are used badly more often than well. The trick is to let it drift past rather than sit in it, and to shoot the second after it clears.',
      'The beach frames afterwards were the opposite: nothing added at all.',
    ],
    behindTheFrame:
      'The two beach frames put the subject small and far back, with a blurred foreground for depth.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-yellow-smoke.webp',
    images: [
      img('studioz-d-pre-wedding-yellow-smoke.webp', '3/2', 'Couple embracing on a park path as yellow smoke drifts behind them, the woman in a purple gown', 'As it cleared'),
      img('studioz-d-pre-wedding-beach-red-dress.webp', '3/2', 'Woman in a red dress walking along the shoreline, seen past a blurred figure in the foreground', 'Far back'),
      img('studioz-d-pre-wedding-beach-saree-waves.webp', '3/2', 'Woman in an orange saree standing in the surf, framed past a blurred figure and breaking spray', 'Through the spray'),
    ],
  },
  {
    id: 'work-011',
    slug: 'a-hundred-candles',
    title: 'A Hundred Candles',
    category: 'Pre-Wedding',
    categories: ['pre-wedding', 'couples'],
    primaryCategory: 'pre-wedding',
    year: '2022',
    location: '',
    featured: false,
    service: 'pre-wedding-photography',
    description:
      'A session shot entirely in warm interiors — a painted courtyard wall and a hall lined with wall lamps.',
    story: [
      'Orange walls, yellow kurta, peach saree. On paper it should not work.',
      'It works because everything in the frame is the same temperature, so nothing fights.',
    ],
    behindTheFrame:
      'No added light in the hall. The wall lamps were the whole setup, which is why the couple are small in the frame.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-candlelit-hall.webp',
    images: [
      img('studioz-d-pre-wedding-orange-wall-leaves.webp', '3/2', 'Couple standing against an orange wall painted with large green monstera leaves, the woman in a pink saree', 'Painted wall'),
      img('studioz-d-pre-wedding-candlelit-hall.webp', '3/2', 'Couple holding hands in a warm orange hall lined with dozens of lit wall lamps beneath hanging lanterns', 'Every lamp on'),
    ],
  },

  /* ------------------------------------------------------- ENGAGEMENT -- */
  {
    id: 'work-012',
    slug: 'under-the-arch',
    title: 'Under the Arch',
    category: 'Engagement',
    categories: ['engagement', 'reception', 'couples'],
    primaryCategory: 'engagement',
    year: '2023',
    location: '',
    featured: true,
    service: 'engagement-photography',
    description:
      'An engagement evening photographed against a floral arch strung with blue fairy lights.',
    story: [
      'The arch was built that afternoon and taken down the same night. It existed for about six hours.',
      'Most of what we shot was in the last of it, once the formal part was over and they stopped standing to attention.',
    ],
    behindTheFrame:
      'The blue string lights set the colour. A single warm light on the couple keeps their skin from going blue with everything else.',
    coverImage: '/assets/images/works/studioz-d-engagement-floral-arch-embrace.webp',
    images: [
      img('studioz-d-engagement-floral-arch-embrace.webp', '3/2', 'Man in a cream suit kissing his partner on the forehead in front of a floral arch strung with blue fairy lights', 'After the formal part'),
      img('studioz-d-engagement-floral-arch-dance.webp', '3/2', 'Engaged couple dancing in front of a floral arch, the woman in a navy sequinned gown leaning back', 'The first dance'),
      img('studioz-d-engagement-floral-arch-foreheads.webp', '3/2', 'Couple standing forehead to forehead beside a white floral installation, hands joined', 'Quiet, briefly'),
    ],
  },

  /* --------------------------------------------------------- PORTRAIT -- */
  {
    id: 'work-013',
    slug: 'in-her-frame',
    title: 'In Her Frame',
    category: 'Portrait',
    categories: ['portrait'],
    primaryCategory: 'portrait',
    year: '2021',
    location: '',
    featured: false,
    service: 'portrait-photography',
    description:
      'Two portraits made on location — one under a banyan tree, one in the half hour before a wedding.',
    story: [
      'Both of these are environmental portraits, which is a formal way of saying the background is half the picture.',
      'Take the motorcycle away and it is a photograph of a woman standing near a tree.',
    ],
    behindTheFrame:
      'Available light for both. The groom portrait uses the suit on the hanger as a foreground layer rather than a prop.',
    coverImage: '/assets/images/works/studioz-d-portrait-motorcycle-banyan.webp',
    images: [
      img('studioz-d-portrait-motorcycle-banyan.webp', '3/2', 'Woman in a black dress and sunglasses leaning against a Royal Enfield motorcycle beneath a banyan tree', 'Under the banyan'),
      img('studioz-d-portrait-groom-getting-ready.webp', '4/3', 'Groom in a white shirt fastening his cuff, his blue suit hanging in the blurred foreground', 'Half an hour to go'),
    ],
  },

  /* ------------------------------------------------------- COLLECTIONS -- */
  {
    id: 'work-014',
    slug: 'the-getting-ready-room',
    title: 'The Getting-Ready Room',
    category: 'Bridal',
    categories: ['bridal', 'portrait', 'wedding'],
    primaryCategory: 'bridal',
    year: '',
    location: '',
    featured: true,
    heroRank: 3,
    service: 'wedding-photography',
    description:
      'Bridal portraits from several weddings — the make-up chair, the mirror, the jewellery, and the last quiet minutes before anyone else comes in.',
    story: [
      'Most of a wedding day is spent being looked at. The hour before it is the only part that still belongs to the bride — the brush, the earring that will not sit right, the laugh at something said off-camera.',
      'These come from different weddings and different brides. What they share is the room.',
    ],
    behindTheFrame:
      'Mostly window light, with mirrors and make-up compacts used as a second frame inside the photograph.',
    coverImage: '/assets/images/works/studioz-d-bridal-gold-headpiece-smile.webp',
    images: [
      img('studioz-d-bridal-gold-headpiece-smile.webp', '3/2', 'Bride in a gold headpiece and a yellow and red silk saree smiling as someone adjusts her hair', 'Nearly ready'),
      img('studioz-d-bridal-makeup-artist-eyes.webp', '3/2', 'Make-up artist brushing a bride’s eyelids as she sits in a gold headpiece and yellow silk saree', 'Eyes closed'),
      img('studioz-d-bridal-maang-tikka-close.webp', '2/3', 'Close portrait of a bride in a jewelled maang tikka and gold bangle looking up into the light', 'Into the light'),
      img('studioz-d-bridal-garden-red-silk.webp', '3/2', 'Bride in a red silk saree and layered gold temple jewellery standing in a garden beneath trees', 'Under the trees'),
      img('studioz-d-bridal-compact-mirror-blush.webp', '3/2', 'Bride smiling in the mirror of a make-up compact as a brush sweeps across her cheek', 'In the compact'),
      img('studioz-d-bridal-silhouette-jasmine.webp', '2/3', 'Silhouette of a bride with jasmine woven into her braid against a glowing orange backdrop', 'Jasmine'),
      img('studioz-d-bridal-overhead-eyes-closed.webp', '3/2', 'Overhead view of a bride with her eyes closed, wearing a gold headpiece and a yellow and red silk saree', 'From above'),
      img('studioz-d-bridal-red-lehenga-orange-wall.webp', '2/3', 'Bride in an embroidered red lehenga and diamond jewellery smiling against a deep orange wall', 'Red on orange'),
      img('studioz-d-bridal-mirror-heart-hands.webp', '3/2', 'Bride making a heart shape with her hennaed hands, seen in a small mirror among blurred make-up', 'Hands'),
      img('studioz-d-bridal-leaves-headpiece.webp', '3/2', 'Bride in a red saree adjusting her headpiece, framed by leaves on a garden path', 'On the path'),
      img('studioz-d-bridal-eyeliner-green-silk.webp', '3/2', 'Make-up artist lining a bride’s eyes, the bride in a gold headpiece and a green and blue silk saree', 'The last line'),
      img('studioz-d-bridal-blue-room-mirror.webp', '3/2', 'Bride in a red lehenga fixing an earring in a blue-lit room, reflected in a mirror', 'Blue room'),
      img('studioz-d-bridal-diamond-choker-close.webp', '3/2', 'Close portrait of a smiling bride in a diamond choker and jhumka earrings, a leaf blurred in the foreground', 'Diamonds'),
      img('studioz-d-bridal-green-silk-bangles.webp', '3/2', 'Bride in a green and blue silk saree with gold jewellery adjusting her bangles', 'Bangles'),
      img('studioz-d-bridal-flower-garland-smile.webp', '3/2', 'Smiling bride wearing a red flower garland and gold jewellery, guests blurred behind her', 'Garlanded'),
      img('studioz-d-bridal-doorway-laugh-mirror.webp', '3/2', 'Bride in a red lehenga laughing with a hand to her face in a doorway, reflected in a mirror', 'Caught laughing'),
      img('studioz-d-bridal-peach-saree-terrace.webp', '3/2', 'Bride in a peach silk saree and silver jewellery standing on a terrace against green trees', 'The terrace'),
      img('studioz-d-bridal-pink-saree-earring.webp', '3/2', 'Bride in a pink saree and gold jewellery fastening an earring against a red curtain', 'The earring'),
      img('studioz-d-bridal-white-gown-curtains.webp', '3/2', 'Bride in a white gown and pearl necklace looking out beside sheer white curtains', 'White on white'),
      img('studioz-d-bridal-two-in-green-silk.webp', '3/2', 'Two women in green silk blouses and gold jewellery looking toward the window, jasmine and red flowers in the nearer one’s braid', 'Side by side'),
      img('studioz-d-bridal-green-silk-ring-light.webp', '3/2', 'Bride in a green silk saree and pink maang tikka looking down beside a ring light', 'The ring light'),
    ],
  },
  {
    id: 'work-015',
    slug: 'the-other-mirror',
    title: 'The Other Mirror',
    category: 'Groom',
    categories: ['groom', 'portrait', 'wedding'],
    primaryCategory: 'groom',
    year: '',
    location: '',
    featured: false,
    service: 'wedding-photography',
    description:
      'Groom portraits from several weddings — sherwanis, suits, watches, and the getting-ready room nobody else photographs.',
    story: [
      'The bride’s room gets an hour of attention. The groom’s room usually gets five minutes and a blurred frame of someone doing up a button.',
      'These are the portraits that happen when that room is given the same care.',
    ],
    behindTheFrame:
      'Coloured light and mirrors do most of the work — a reflection soft in the foreground, the groom sharp behind it.',
    coverImage: '/assets/images/works/studioz-d-groom-gold-sherwani-lamp.webp',
    images: [
      img('studioz-d-groom-gold-sherwani-lamp.webp', '3/2', 'Groom in a gold brocade sherwani standing between curtained windows, lit by a single wall lamp', 'Gold'),
      img('studioz-d-groom-white-suit-doorway.webp', '3/2', 'Groom in a white suit and blue shirt buttoning his jacket in a warm-lit doorway, seen past a blurred shoulder', 'Buttoning up'),
      img('studioz-d-groom-black-sherwani-blue-light.webp', '3/2', 'Groom in a black sequinned sherwani under deep blue light, framed through a mirror', 'Blue'),
      img('studioz-d-groom-gold-sherwani-watch.webp', '3/2', 'Groom in a gold sherwani fastening his watch in a doorway, a mirrored reflection soft in the foreground', 'The watch'),
      img('studioz-d-groom-black-sherwani-red-light.webp', '3/2', 'Groom in a black sherwani in magenta and red light, seen twice through a mirror', 'Red'),
      img('studioz-d-groom-style-watch-layout.webp', '3/2', 'Album layout pairing a groom in a black sherwani under blue light with an inset close-up of his watch, titled Groom Style', 'The details'),
    ],
  },
  {
    id: 'work-016',
    slug: 'wherever-they-stood',
    title: 'Wherever They Stood',
    category: 'Couples',
    categories: ['couples', 'wedding', 'engagement'],
    primaryCategory: 'couples',
    year: '',
    location: '',
    featured: false,
    service: 'wedding-photography',
    description:
      'Couple portraits from four different celebrations — a ceremony, a tractor, a car roof and a stage.',
    story: [
      'Not one story but four: a garlanded ceremony, a bright yellow tractor, a car with its roof open, and a stage hung with flowers and lights.',
      'Four couples, four settings, and the same job every time — find the frame where they forget the camera is there.',
    ],
    behindTheFrame:
      'Shot in whatever light each day had — daylight for the tractor and the car, stage light for the rest.',
    coverImage: '/assets/images/works/studioz-d-couple-yellow-tractor.webp',
    images: [
      img('studioz-d-couple-yellow-tractor.webp', '3/2', 'Couple in traditional dress sitting together on a bright yellow tractor beneath trees', 'Their ride'),
      img('studioz-d-couple-red-lehenga-gold-sherwani.webp', '3/2', 'Bride in a red embroidered lehenga and groom in a gold sherwani standing close against a backdrop of roses and blue lights', 'Close'),
      img('studioz-d-wedding-ceremony-garlands.webp', '3/2', 'Bride and groom wearing flower garlands seated during a traditional wedding ceremony, family gathered close around them', 'The ceremony'),
      img('studioz-d-couple-car-sunroof.webp', '3/2', 'Couple standing up through the sunroof of a white car, the woman in a green and gold silk saree with flowers in her hair', 'Through the roof'),
    ],
  },
  {
    id: 'work-017',
    slug: 'first-portraits',
    title: 'First Portraits',
    category: 'Baby & Family',
    categories: ['baby'],
    primaryCategory: 'baby',
    year: '',
    location: '',
    featured: true,
    heroRank: 4,
    service: 'baby-family-photography',
    description:
      'Newborn and baby sessions — a floral nest, a tiny guitar, a tub of water and a pair of fairy wings.',
    story: [
      'Newborn sessions run on the baby’s timetable. The set is built and warm before they arrive, and the photographs happen in the stretches between feeds.',
      'Older babies are the opposite problem. The set has to be bright and interesting enough to hold them for a minute — which is all the minute you get.',
    ],
    behindTheFrame:
      'Soft, even light and a colour story per set — autumn leaves, rose prints, blue fur, a pink moon.',
    coverImage: '/assets/images/works/studioz-d-baby-newborn-floral-nest.webp',
    images: [
      img('studioz-d-baby-newborn-floral-nest.webp', '3/2', 'Sleeping newborn wrapped in sage green, curled in a nest of orange leaves and yellow knit on a rose-print backdrop', 'The nest'),
      img('studioz-d-baby-newborn-tiny-guitar.webp', '2/3', 'Sleeping newborn wrapped in blue with a denim cap, a tiny wooden guitar resting beside them on a blue fur throw', 'Unplugged'),
      img('studioz-d-baby-windmill-cart.webp', '3/2', 'Baby in a headband sitting in a small wooden cart beside a wooden windmill on a soft pink set', 'The little cart'),
      img('studioz-d-baby-fairy-wings-moon.webp', '2/3', 'Baby in pink fairy wings holding a wand, sitting on a white crescent-moon prop', 'On the moon'),
      img('studioz-d-baby-newsboy-cap-stool.webp', '3/2', 'Baby in a checked newsboy cap and braces lying on a wooden folding stool against dark wood panelling', 'Newsboy'),
      img('studioz-d-baby-bath-tub.webp', '2/3', 'Baby sitting in a small white tub of water wearing a gold chain, a pale blue backdrop behind', 'Bath time'),
      img('studioz-d-baby-newborn-feet-leaves.webp', '3/2', 'Close-up of a sleeping newborn’s feet in the foreground, the baby wrapped in green among orange leaves', 'Ten toes'),
    ],
  },
  {
    id: 'work-018',
    slug: 'before-hello',
    title: 'Before Hello',
    category: 'Maternity',
    categories: ['maternity'],
    primaryCategory: 'maternity',
    year: '',
    location: '',
    featured: false,
    service: 'maternity-photography',
    description:
      'Maternity sessions from several families — silk sarees, a garden, a stone wall and a lot of laughing.',
    story: [
      'The last weeks before a baby arrives go fast. These sessions slow them down for an hour.',
    ],
    behindTheFrame: 'Window light and a single soft source, indoors and out.',
    coverImage: '/assets/images/works/studioz-d-maternity-husband-cradling-bump.webp',
    images: [
      img('studioz-d-maternity-husband-cradling-bump.webp', '3/2', 'Husband cradling his wife’s bump, both smiling, against a maroon wall and wooden doors', 'Both hands'),
      img('studioz-d-maternity-pink-saree-stone-wall.webp', '2/3', 'Expectant mother in a pink silk saree looking down at her bump, lit against a dark stone wall', 'Looking down'),
      img('studioz-d-maternity-blue-saree-spotlights.webp', '3/2', 'Expectant mother in a blue and green silk saree holding her bump in a dark room lit by small spotlights', 'Spotlit'),
      img('studioz-d-maternity-red-silk-saree.webp', '2/3', 'Expectant mother in a red silk saree and gold jewellery, one hand resting on her bump', 'In red'),
      img('studioz-d-maternity-garden-couple-green-saree.webp', '3/2', 'Couple in a garden, the husband lifting his wife’s chin as she holds her bump in a green and gold saree', 'In the garden'),
      img('studioz-d-maternity-green-saree-stone-wall.webp', '2/3', 'Expectant mother in a green saree and pink embroidered blouse against a dark stone wall', 'Stone and silk'),
      img('studioz-d-maternity-couple-laughing-blue-saree.webp', '3/2', 'Expectant couple laughing together, the mother in a blue silk saree raising her hennaed hands', 'Laughing'),
      img('studioz-d-maternity-husband-peeking-pillar.webp', '2/3', 'Husband peeking around a stone pillar towards his wife in a green saree', 'Peeking'),
      img('studioz-d-maternity-white-dress-ivy-wall.webp', '3/2', 'Expectant mother in a white dress and flower crown standing against a wall of green ivy', 'Against the ivy'),
      img('studioz-d-maternity-garden-couple-portrait.webp', '2/3', 'Couple in a garden, the husband behind his wife as she holds her bump in a green saree', 'Together'),
      img('studioz-d-maternity-pink-saree-window.webp', '3/2', 'Expectant mother in a pink and orange silk saree standing by a bright window', 'By the window'),
      img('studioz-d-maternity-blue-saree-reflection.webp', '2/3', 'Expectant mother in a blue silk saree smiling, her reflection soft in the foreground', 'Reflection'),
      img('studioz-d-maternity-blue-saree-mirror.webp', '3/2', 'Expectant mother in a blue silk saree and orange blouse, seen past a mirror in the foreground', 'The mirror'),
    ],
  },
  {
    id: 'work-019',
    slug: 'still-life',
    title: 'Still Life',
    category: 'Product',
    categories: ['product'],
    primaryCategory: 'product',
    year: '',
    location: '',
    featured: false,
    service: 'product-photography',
    description: 'Product stills for skincare, essential oils and a kitchen appliance.',
    story: ['Styled, lit and shot so the product is the only thing you look at.'],
    behindTheFrame: 'Studio light on stone, marble and wood surfaces.',
    coverImage: '/assets/images/works/studioz-d-product-essential-oils-flat-lay.webp',
    images: [
      img('studioz-d-product-essential-oils-flat-lay.webp', '3/2', 'Flat lay of essential oil bottles, a brush and a tin of balm on grey stone', 'The flat lay'),
      img('studioz-d-product-skincare-tube-stones.webp', '3/2', 'Skincare tube balanced between two round stones on white marble', 'Balanced'),
      img('studioz-d-product-blender-green-juice.webp', '3/2', 'Blender of green juice surrounded by celery, lettuce, lemon and ginger on a wooden table', 'Fresh'),
    ],
  },
  {
    id: 'work-020',
    slug: 'campaign-day',
    title: 'Campaign Day',
    category: 'Commercial',
    categories: ['commercial'],
    primaryCategory: 'commercial',
    year: '',
    location: '',
    featured: false,
    service: 'commercial-photography',
    description: 'Fashion campaign portraits made on a styled studio set.',
    story: ['Built sets, directed poses and colour that holds together across a campaign.'],
    behindTheFrame: 'Studio sets with controlled, directional light.',
    coverImage: '/assets/images/works/studioz-d-commercial-red-outfit-staircase.webp',
    images: [
      img('studioz-d-commercial-red-outfit-staircase.webp', '3/2', 'Model in a red outfit posing on a wooden staircase beside dried pampas grass', 'The staircase'),
      img('studioz-d-commercial-red-lehenga-set.webp', '3/2', 'Model in a red lehenga standing in a styled set with a carved cabinet and patterned rug', 'The set'),
    ],
  },
];

/* ------------------------------------------------------------------------ */
/* Selectors                                                                 */
/* ------------------------------------------------------------------------ */

export const getWorkBySlug = (slug) => works.find((work) => work.slug === slug) ?? null;

export const getCategoryBySegment = (segment) =>
  workCategories.find((category) => category.segment === segment) ?? null;

export const getCategoryById = (id) =>
  workCategories.find((category) => category.id === id) ?? null;

/** Categories that own a URL — used to build the sitemap and category routes. */
export const routableWorkCategories = workCategories.filter((category) => category.segment);

export const filterWorks = (categoryId = 'all') =>
  categoryId === 'all' ? works : works.filter((work) => work.categories.includes(categoryId));

export const getFeaturedWorks = (limit = 8) => {
  const featured = works.filter((work) => work.featured);
  const ordered = [...featured].sort((a, b) => (a.heroRank ?? 99) - (b.heroRank ?? 99));
  return ordered.slice(0, limit);
};

/** Projects linked from a service detail page. */
export const getWorksByService = (serviceSlug, limit = 3) =>
  works.filter((work) => work.service === serviceSlug).slice(0, limit);

/** Sibling projects for the "related work" rail, never including the current one. */
export const getRelatedWorks = (slug, limit = 3) => {
  const current = getWorkBySlug(slug);
  if (!current) return works.slice(0, limit);
  const sameCategory = works.filter(
    (work) => work.slug !== slug && work.categories.some((id) => current.categories.includes(id))
  );
  const fill = works.filter(
    (work) => work.slug !== slug && !sameCategory.some((match) => match.slug === work.slug)
  );
  return [...sameCategory, ...fill].slice(0, limit);
};

/**
 * Flattens every project image into a single photograph stream for the
 * masonry gallery, carrying its parent project forward for captions and links.
 */
export const getAllPhotos = (categoryId = 'all') =>
  filterWorks(categoryId).flatMap((work) =>
    work.images.map((image, index) => ({
      ...image,
      id: `${work.id}-${index}`,
      workSlug: work.slug,
      workTitle: work.title,
      category: work.category,
      categories: work.categories,
      year: work.year,
      location: work.location,
      index,
    }))
  );

/** The "Studioz D Wall" — one signature frame per featured project. */
export const getWallPhotos = (limit = 5) =>
  getFeaturedWorks(limit).map((work) => ({
    ...work.images[0],
    workSlug: work.slug,
    workTitle: work.title,
    category: work.category,
  }));

/** Frames used by the horizontal photo story, one per project for variety. */
export const getStoryPhotos = (limit = 9) =>
  works.slice(0, limit).map((work, index) => ({
    ...(work.images[1] ?? work.images[0]),
    number: String(index + 1).padStart(2, '0'),
    workSlug: work.slug,
    workTitle: work.title,
    category: work.category,
  }));

/** Lightweight index powering the site-wide search. */
export const workSearchIndex = works.map((work) => ({
  type: 'work',
  slug: work.slug,
  title: work.title,
  category: work.category,
  description: work.description,
  to: `/works/${work.slug}`,
  image: work.coverImage,
  haystack: [work.title, work.category, work.description, ...work.categories]
    .join(' ')
    .toLowerCase(),
}));

export default works;
