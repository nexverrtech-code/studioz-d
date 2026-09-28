/**
 * Photography, film and commercial services.
 *
 * Each entry drives BOTH the /services grid card and the full
 * /services/:slug detail page, so there is exactly one place to edit a
 * service. Image paths point at files in `public/assets/images/services/` —
 * drop real photography in under the same filename and nothing else changes.
 */

export const services = [
  {
    id: 'svc-wedding',
    slug: 'wedding-photography',
    title: 'Wedding Photography',
    shortTitle: 'Wedding',
    group: 'Celebrations',
    featured: true,
    tagline: 'Your day happens once. Your photographs should keep bringing it back.',
    summary:
      'Full-day coverage built around the people in the room — the rituals, the rush, and the quiet seconds nobody else catches.',
    heroImage: '/assets/images/works/studioz-d-wedding-church-party.webp',
    // Low-set crop keeps everyone's feet in the wide band.
    heroPosition: 'center 70%',
    heroImageTall: '/assets/images/works/studioz-d-bridal-red-lehenga-orange-wall.webp',
    cardImage: '/assets/images/works/studioz-d-wedding-bride-silk-saree-window.webp',
    intro:
      'A wedding is hours of noise, colour and movement wrapped around a handful of moments that actually matter. We shoot both. The celebration gives the day its scale; the glances, the held hands and the unplanned laughter give it meaning. Our coverage is unhurried and observational — close enough to catch the detail, far enough back that the day stays yours.',
    whatWeCapture: [
      'Candid moments as they happen, never staged after the fact',
      'Couple portraits in the light the day gives us',
      'The full ceremony, start to finish, without interruption',
      'Decor, attire and the details you spent months choosing',
      'Family and group frames, organised so nobody is left out',
      'Cinematic sequences that hold the feel of the day, not just the facts',
    ],
    experience: [
      {
        title: 'We learn the day before we shoot it',
        body: 'A conversation about the schedule, the families, the rituals and the people who matter most. By the time we arrive we already know where to stand.',
      },
      {
        title: 'We work quietly',
        body: 'No repeated posing, no crowd direction during the ceremony. The photographs look unforced because the shoot was.',
      },
      {
        title: 'You see the day again, in order',
        body: 'Your gallery is edited as a story with a beginning and an end — not a folder of files sorted by timestamp.',
      },
    ],
    process: [
      { step: '01', title: 'Conversation', body: 'We talk through the dates, venues, rituals and the coverage you actually need.' },
      { step: '02', title: 'Plan', body: 'A shot approach built around your schedule, your light and your family.' },
      { step: '03', title: 'Shoot', body: 'Coverage across the events, with a team sized to the day.' },
      { step: '04', title: 'Edit', body: 'A consistent, timeless grade — colour that will still look right in twenty years.' },
      { step: '05', title: 'Deliver', body: 'Your full gallery, plus album and framed-print options if you want them.' },
    ],
    relatedWorkCategory: 'wedding',
    relatedServices: ['pre-wedding-photography', 'engagement-photography', 'cinematic-films'],
    relatedGiftCategory: 'wedding',
    ctaLabel: 'Plan Your Wedding Story',
    faq: [
      {
        q: 'How far in advance should we book?',
        a: 'As early as your date is fixed. Wedding season fills quickly, and an early conversation means we can plan around your schedule rather than fit into it.',
      },
      {
        q: 'Do you cover multi-day and multi-city weddings?',
        a: 'Yes. Coverage is planned event by event, with the team sized to each function. Travel and multi-day logistics are discussed upfront so there are no surprises.',
      },
      {
        q: 'Will you direct us, or just observe?',
        a: 'Both, in the right proportion. Portraits get gentle direction so you look like yourselves at your best. Ceremonies and celebrations are observed, not staged.',
      },
      {
        q: 'When do we receive the photographs?',
        a: 'A small preview set comes first, while the day is still fresh. The full edited gallery follows — timelines are confirmed in writing before the shoot.',
      },
    ],
  },
  {
    id: 'svc-pre-wedding',
    slug: 'pre-wedding-photography',
    title: 'Pre-Wedding Photography',
    shortTitle: 'Pre-Wedding',
    group: 'Celebrations',
    featured: true,
    tagline: 'Before the guest list. Before the schedule. Just the two of you.',
    summary:
      'A relaxed shoot built around who you are together, in locations that mean something — or simply photograph beautifully.',
    heroImage: '/assets/images/works/studioz-d-pre-wedding-wave-kiss.webp',
    cardImage: '/assets/images/works/studioz-d-pre-wedding-beach-saree-waves.webp',
    intro:
      'A pre-wedding shoot is the one session where nothing else is competing for attention. No timings to keep, no relatives waiting. That space is what makes the photographs work — people relax, and what they actually look like together starts to show.',
    whatWeCapture: [
      'How you are with each other when nobody is watching',
      'Location and landscape used as part of the story, not just a backdrop',
      'Golden-hour and blue-hour light, planned around the clock',
      'Movement — walking, turning, laughing mid-sentence',
      'Quiet close portraits alongside the wide cinematic frames',
      'Outfit and mood changes across the session',
    ],
    experience: [
      {
        title: 'Locations chosen for light, not just looks',
        body: 'We scout and time the session around when a place is at its best. The same spot at the wrong hour is a different photograph entirely.',
      },
      {
        title: 'Direction without stiffness',
        body: 'We give you something to do rather than a pose to hold. That is the whole difference between a photograph and a portrait.',
      },
      {
        title: 'Images you will actually use',
        body: 'Pre-wedding frames become invites, save-the-dates, reception screens and framed gifts. We shoot with those crops in mind.',
      },
    ],
    process: [
      { step: '01', title: 'Mood', body: 'We talk through the feel you want — cinematic, editorial, warm, minimal.' },
      { step: '02', title: 'Location', body: 'Shortlist and scout, planned around the light and the time you have.' },
      { step: '03', title: 'Shoot', body: 'A relaxed half or full session, with room for outfit changes.' },
      { step: '04', title: 'Edit', body: 'A consistent grade across the set so it reads as one story.' },
      { step: '05', title: 'Deliver', body: 'Your gallery, plus print-ready and social-ready crops.' },
    ],
    relatedWorkCategory: 'pre-wedding',
    relatedServices: ['wedding-photography', 'engagement-photography', 'reels'],
    relatedGiftCategory: 'couples',
    ctaLabel: 'Plan Your Pre-Wedding Shoot',
    faq: [
      {
        q: 'How long does a pre-wedding session take?',
        a: 'Most sessions run a half or full day depending on the number of locations and outfit changes. We plan it around light rather than clock hours.',
      },
      {
        q: 'How many outfits should we bring?',
        a: 'Two or three is usually right. More than that and the session turns into changing rather than shooting. We send guidance once the locations are set.',
      },
      {
        q: 'What if the weather turns?',
        a: 'We plan a backup approach with every shoot. Overcast light is genuinely excellent for portraits, and rain has made some of our favourite frames.',
      },
    ],
  },
  {
    id: 'svc-engagement',
    slug: 'engagement-photography',
    title: 'Engagement Photography',
    shortTitle: 'Engagement',
    group: 'Celebrations',
    featured: false,
    tagline: 'The yes, the ring, and the faces of everyone who saw it happen.',
    summary:
      'Coverage of the ceremony and the celebration around it, with equal attention on the couple and the families.',
    heroImage: '/assets/images/works/studioz-d-engagement-floral-arch-embrace.webp',
    cardImage: '/assets/images/works/studioz-d-engagement-floral-arch-foreheads.webp',
    intro:
      'An engagement is the first time both families are in one room as one family. That shift is worth photographing properly — the ritual itself, and everything happening at the edges of it.',
    whatWeCapture: [
      'The ring exchange and the ritual, uninterrupted',
      'Reactions from the people watching',
      'Couple portraits before and after the ceremony',
      'Both families, together and separately',
      'Decor, stage and the details of the setup',
      'The celebration once the formal part is done',
    ],
    experience: [
      { title: 'Two sides, equal coverage', body: 'Engagements involve two families with two sets of expectations. We plan the group frames in advance so nobody is missed.' },
      { title: 'Fast, unobtrusive setup', body: 'Most engagements happen in a compressed window. We work quickly and stay out of the ceremony.' },
      { title: 'Ready for what comes next', body: 'These frames feed straight into wedding invites and announcement posts, so we shoot for those formats too.' },
    ],
    process: [
      { step: '01', title: 'Brief', body: 'Venue, timing, rituals and the family list.' },
      { step: '02', title: 'Plan', body: 'A frame plan for the ceremony and the group portraits.' },
      { step: '03', title: 'Shoot', body: 'Coverage across the ceremony and celebration.' },
      { step: '04', title: 'Edit', body: 'Warm, consistent colour across the full set.' },
      { step: '05', title: 'Deliver', body: 'Full gallery plus a quick-turnaround announcement selection.' },
    ],
    relatedWorkCategory: 'engagement',
    relatedServices: ['wedding-photography', 'pre-wedding-photography', 'event-photography'],
    relatedGiftCategory: 'engagement',
    ctaLabel: 'Plan Your Engagement Coverage',
    faq: [
      {
        q: 'Can you cover a surprise proposal?',
        a: 'Yes, and it is one of our favourite things to shoot. It needs a quiet planning conversation beforehand about position, timing and how to stay unseen.',
      },
      {
        q: 'Do you handle the family group photographs?',
        a: 'Yes. We build a list with you in advance so the groups move quickly and no one gets left out in the rush.',
      },
    ],
  },
  {
    id: 'svc-portrait',
    slug: 'portrait-photography',
    title: 'Portrait Photography',
    shortTitle: 'Portrait',
    group: 'People',
    featured: true,
    tagline: 'A good portrait looks like the person, not the pose.',
    summary:
      'Studio and location portraits for individuals, professionals and creatives — considered light, honest expression.',
    heroImage: '/assets/images/works/studioz-d-portrait-motorcycle-banyan.webp',
    cardImage: '/assets/images/works/studioz-d-portrait-groom-getting-ready.webp',
    intro:
      'Most people think they photograph badly. Usually they have just never been photographed well. A portrait session is mostly about getting someone comfortable enough to stop performing — after that, the light does the rest.',
    whatWeCapture: [
      'Natural expression rather than held smiles',
      'Controlled studio light, or the character of available light',
      'Headshots framed for professional and social use',
      'Full-length and environmental frames',
      'Personality details — hands, posture, the way someone sits',
      'Black-and-white conversions alongside colour',
    ],
    experience: [
      { title: 'We start slow', body: 'The first ten minutes are conversation, not shooting. Everything after that looks different.' },
      { title: 'Light chosen to suit the face', body: 'Soft, hard, directional — the lighting is a decision about the person, not a fixed studio preset.' },
      { title: 'You see frames as we go', body: 'Reviewing in-session lets us adjust together, so the final set holds no surprises.' },
    ],
    process: [
      { step: '01', title: 'Brief', body: 'What the portraits are for, and the feel you want.' },
      { step: '02', title: 'Setup', body: 'Studio or location, with light planned to match.' },
      { step: '03', title: 'Shoot', body: 'A relaxed session with in-session review.' },
      { step: '04', title: 'Select', body: 'We shortlist together, so the final edit is yours.' },
      { step: '05', title: 'Deliver', body: 'Retouched finals in print and digital crops.' },
    ],
    relatedWorkCategory: 'portrait',
    relatedServices: ['maternity-photography', 'baby-family-photography', 'commercial-photography'],
    relatedGiftCategory: 'photo-frames',
    ctaLabel: 'Book a Portrait Session',
    faq: [
      {
        q: 'What should I wear?',
        a: 'Solid colours and comfortable fits photograph best. Bring two or three options and we will choose together once we see the light.',
      },
      {
        q: 'How much retouching do you do?',
        a: 'Enough to remove the temporary and nothing that removes the person. Blemishes and stray hairs go; the things that make you recognisable stay.',
      },
      {
        q: 'Studio or outdoors?',
        a: 'Both work. Studio gives complete control, location gives context. We decide based on what the portraits are for.',
      },
    ],
  },
  {
    id: 'svc-maternity',
    slug: 'maternity-photography',
    title: 'Maternity Photography',
    shortTitle: 'Maternity',
    group: 'People',
    featured: false,
    tagline: 'A few weeks that will never happen the same way twice.',
    summary:
      'Calm, comfortable maternity sessions — soft light, unhurried pace, and frames that centre on connection.',
    heroImage: '/assets/images/works/studioz-d-maternity-blue-saree-spotlights.webp',
    heroImageTall: '/assets/images/works/studioz-d-maternity-pink-saree-stone-wall.webp',
    cardImage: '/assets/images/works/studioz-d-maternity-husband-cradling-bump.webp',
    intro:
      'Maternity photographs work best when they are gentle. The session is paced around how you feel that day, with breaks whenever you want them, and light kept soft throughout.',
    whatWeCapture: [
      'Quiet solo portraits with soft directional light',
      'Partner frames, and older siblings if they are part of it',
      'Hands, silhouette and the small details of the moment',
      'Home sessions in your own space, if you prefer',
      'Movement and fabric, used gently',
      'Both colour and monochrome treatments',
    ],
    experience: [
      { title: 'Your pace, not ours', body: 'Sessions are scheduled with generous time. Sitting down for ten minutes is part of the plan, not a delay.' },
      { title: 'Comfort first', body: 'Poses are chosen around what feels easy. Nothing held, nothing strained.' },
      { title: 'A private, calm setup', body: 'Small crew, quiet room, no audience unless you want one.' },
    ],
    process: [
      { step: '01', title: 'Conversation', body: 'Timing, comfort, and what you want the session to feel like.' },
      { step: '02', title: 'Plan', body: 'Studio or home, with wardrobe guidance sent ahead.' },
      { step: '03', title: 'Shoot', body: 'An unhurried session with plenty of breaks.' },
      { step: '04', title: 'Edit', body: 'Soft, warm finishing that keeps skin natural.' },
      { step: '05', title: 'Deliver', body: 'Gallery plus framed and album options.' },
    ],
    relatedWorkCategory: 'maternity',
    relatedServices: ['baby-family-photography', 'portrait-photography', 'custom-photography'],
    relatedGiftCategory: 'baby-family',
    ctaLabel: 'Plan a Maternity Session',
    faq: [
      {
        q: 'When is the right time to shoot?',
        a: 'Most people find the later second trimester or early third comfortable, but the right time is whenever you feel good. We will plan around how you are doing.',
      },
      {
        q: 'Can we shoot at home?',
        a: 'Yes, and home sessions are often the most relaxed. We work with your available light and bring only what the room needs.',
      },
    ],
  },
  {
    id: 'svc-baby-family',
    slug: 'baby-family-photography',
    title: 'Baby & Family Photography',
    shortTitle: 'Baby & Family',
    group: 'People',
    featured: true,
    tagline: 'Children do not pose. That is the entire point.',
    summary:
      'Newborn, milestone and family sessions built around play — patient, safe, and shot at the pace of the child.',
    // Real work from the studio's baby sessions (see `first-portraits` in
    // data/works.js). Both are 3:2, matching the hero band and the card.
    heroImage: '/assets/images/works/studioz-d-baby-newsboy-cap-stool.webp',
    cardImage: '/assets/images/works/studioz-d-baby-windmill-cart.webp',
    intro:
      'The best family photographs are almost never the ones where everybody was looking at the camera. We shoot around what the family is actually doing, and the frames where everyone is genuinely present tend to be the ones that get framed.',
    whatWeCapture: [
      'Newborn details — hands, feet, the first week of expressions',
      'Milestone sessions as a child starts sitting, standing, running',
      'Whole-family frames including grandparents',
      'Siblings together, usually mid-chaos',
      'Home sessions in the rooms where life actually happens',
      'Parent-and-child portraits that are about the pair, not the pose',
    ],
    experience: [
      { title: 'Patience is the method', body: 'We work around naps, feeds and moods. A session that runs long because a baby needed a break is a session that worked.' },
      { title: 'Safety before the shot', body: 'Newborn work is handled carefully, with a parent within reach at every moment. No pose is worth a risk.' },
      { title: 'Play, not instruction', body: 'Older children get a game rather than a direction. It is the only reliable way to get a real expression.' },
    ],
    process: [
      { step: '01', title: 'Conversation', body: 'Ages, routines and the best window in the day.' },
      { step: '02', title: 'Plan', body: 'Home or studio, with a loose shot list rather than a rigid one.' },
      { step: '03', title: 'Shoot', body: 'A relaxed session paced around the child.' },
      { step: '04', title: 'Edit', body: 'Clean, warm colour that keeps skin tones true.' },
      { step: '05', title: 'Deliver', body: 'Gallery plus frame and album options for grandparents.' },
    ],
    relatedWorkCategory: 'baby',
    relatedServices: ['maternity-photography', 'portrait-photography', 'event-photography'],
    relatedGiftCategory: 'baby-family',
    ctaLabel: 'Plan a Family Session',
    faq: [
      {
        q: 'What if my child will not cooperate?',
        a: 'That is normal and completely fine. We build extra time into every family session, and some of the best frames come out of the moments that were not going to plan.',
      },
      {
        q: 'How early should newborn sessions happen?',
        a: 'The first couple of weeks are ideal for sleepy newborn frames, but sessions work well at any age. We will plan around how you and the baby are doing.',
      },
    ],
  },
  {
    id: 'svc-event',
    slug: 'event-photography',
    title: 'Event Photography',
    shortTitle: 'Events',
    group: 'Celebrations',
    featured: false,
    tagline: 'The room, the people, and the moment the energy turns.',
    summary:
      'Birthdays, receptions, launches, conferences and ceremonies — documented cleanly, delivered fast.',
    heroImage: '/assets/images/works/studioz-d-reception-stage-couple-seated.webp',
    cardImage: '/assets/images/works/studioz-d-pre-wedding-candlelit-hall.webp',
    intro:
      'Every event has a shape: the setup, the arrivals, the centre of gravity, and the long tail afterwards. We shoot all four, so you end up with a record of the event rather than a handful of pictures from its loudest twenty minutes.',
    whatWeCapture: [
      'Venue and setup before the doors open',
      'Arrivals, guests and the room filling up',
      'The key moment — the cut, the speech, the reveal',
      'Candid guest interaction throughout',
      'Stage, sponsor and brand detail where it matters',
      'Group frames organised without stalling the event',
    ],
    experience: [
      { title: 'We read the run sheet', body: 'Knowing what happens at 7:40 means being in position at 7:38. Most missed moments are planning failures, not camera failures.' },
      { title: 'Discreet on the floor', body: 'Minimal gear footprint, no disruptive lighting rigs unless the event calls for it.' },
      { title: 'Fast turnaround when you need it', body: 'Same-night or next-day selects are available when the photographs have to go out while the event is still news.' },
    ],
    process: [
      { step: '01', title: 'Brief', body: 'Run sheet, venue, key people and must-have frames.' },
      { step: '02', title: 'Recce', body: 'Light and layout checked ahead where possible.' },
      { step: '03', title: 'Shoot', body: 'Coverage across the full event window.' },
      { step: '04', title: 'Edit', body: 'Consistent colour, fast selects if required.' },
      { step: '05', title: 'Deliver', body: 'Full gallery plus social-ready crops.' },
    ],
    relatedWorkCategory: 'reception',
    relatedServices: ['wedding-photography', 'commercial-photography', 'reels'],
    relatedGiftCategory: 'corporate',
    ctaLabel: 'Discuss Your Event',
    faq: [
      {
        q: 'How quickly can we get photographs?',
        a: 'A fast-select batch can be delivered the same night or next day when the event needs it. The full edited gallery follows on the agreed timeline.',
      },
      {
        q: 'Do you cover multi-day events?',
        a: 'Yes. Coverage is planned session by session, with the team sized to each day.',
      },
    ],
  },
  {
    id: 'svc-product',
    slug: 'product-photography',
    title: 'Product Photography',
    shortTitle: 'Product',
    group: 'Brands',
    featured: true,
    tagline: 'A product photograph has one job: make someone want to hold it.',
    summary:
      'Catalogue, lifestyle and detail imagery built for listings, campaigns and storefronts.',
    heroImage: '/assets/images/works/studioz-d-product-blender-green-juice.webp',
    heroPosition: '28% 50%',
    cardImage: '/assets/images/works/studioz-d-product-skincare-tube-stones.webp',
    intro:
      'Online, the photograph is the product. Texture, weight, finish and scale all have to come through in a single frame, usually on a small screen. That takes controlled light, careful styling and a lot of attention to edges.',
    whatWeCapture: [
      'Clean catalogue frames on white and neutral grounds',
      'Lifestyle context that shows scale and use',
      'Macro detail — texture, stitching, finish, material',
      'Consistent angle sets across a full range',
      'Styled flat-lays and grouped compositions',
      'Crops prepared for marketplace and storefront specs',
    ],
    experience: [
      { title: 'Consistency across the range', body: 'Angles, distance and light are locked so a forty-product catalogue looks like one shoot, not forty.' },
      { title: 'Shot to spec', body: 'Marketplace requirements, aspect ratios and background rules are built into the shoot rather than fixed afterwards.' },
      { title: 'Styling that serves the product', body: 'Props support the object and never compete with it.' },
    ],
    process: [
      { step: '01', title: 'Brief', body: 'Range, usage, platforms and required specs.' },
      { step: '02', title: 'Test', body: 'A sample set shot and approved before the full run.' },
      { step: '03', title: 'Shoot', body: 'Full range captured against the locked setup.' },
      { step: '04', title: 'Retouch', body: 'Clean edges, true colour, consistent output.' },
      { step: '05', title: 'Deliver', body: 'Named, sized and platform-ready files.' },
    ],
    relatedWorkCategory: 'product',
    relatedServices: ['commercial-photography', 'reels', 'cinematic-films'],
    relatedGiftCategory: 'corporate',
    ctaLabel: 'Discuss a Product Shoot',
    faq: [
      {
        q: 'Do you shoot on pure white for marketplaces?',
        a: 'Yes. Marketplace background and framing requirements are handled at capture, so files arrive compliant rather than needing rework.',
      },
      {
        q: 'Can you match photographs to an existing catalogue?',
        a: 'Yes. Send reference frames from the existing set and we will match angle, light and colour so new products slot in seamlessly.',
      },
      {
        q: 'How do products reach the studio?',
        a: 'Courier or drop-off both work. We confirm handling, return and insurance details before anything is sent.',
      },
    ],
  },
  {
    id: 'svc-commercial',
    slug: 'commercial-photography',
    title: 'Commercial Photography',
    shortTitle: 'Commercial',
    group: 'Brands',
    featured: false,
    tagline: 'Imagery that does a job — and still looks like it was made by people.',
    summary:
      'Brand campaigns, team portraits, interiors and space photography for businesses that care how they look.',
    heroImage: '/assets/images/works/studioz-d-commercial-red-outfit-staircase.webp',
    heroPosition: '58% 50%',
    cardImage: '/assets/images/works/studioz-d-commercial-red-lehenga-set.webp',
    intro:
      'Commercial work starts with a question rather than a camera: what does this image need to do? Sell a space, introduce a team, anchor a campaign. The answer shapes everything from the lens to the light.',
    whatWeCapture: [
      'Brand campaign imagery built to a creative direction',
      'Team and leadership portraits with a consistent treatment',
      'Interiors, workspaces and retail environments',
      'Process and craft — people actually doing the work',
      'Hero frames sized for web, print and out-of-home',
      'Library sets for ongoing marketing use',
    ],
    experience: [
      { title: 'Direction before production', body: 'We agree the creative and the deliverables list first. Shoot days then run to plan instead of improvising.' },
      { title: 'Usage made explicit', body: 'Where images will run, for how long, in what formats — written down before the shoot, not negotiated after.' },
      { title: 'Built for reuse', body: 'We shoot with negative space and alternate crops so one frame serves a banner, a post and a print.' },
    ],
    process: [
      { step: '01', title: 'Discovery', body: 'Brand, audience, campaign goal and deliverables.' },
      { step: '02', title: 'Direction', body: 'Mood, references and a shot list you sign off on.' },
      { step: '03', title: 'Production', body: 'Crew, location and scheduling handled.' },
      { step: '04', title: 'Shoot', body: 'Full day or multi-day capture against the list.' },
      { step: '05', title: 'Deliver', body: 'Retouched masters plus every crop you need.' },
    ],
    relatedWorkCategory: 'commercial',
    relatedServices: ['product-photography', 'cinematic-films', 'portrait-photography'],
    relatedGiftCategory: 'corporate',
    ctaLabel: 'Start a Commercial Project',
    faq: [
      {
        q: 'How are usage rights handled?',
        a: 'Usage is agreed in writing before the shoot — channels, territory and duration. Everything is explicit so nothing needs renegotiating later.',
      },
      {
        q: 'Can you work to our existing brand guidelines?',
        a: 'Yes. Share the guidelines and any existing imagery and we will match treatment, colour and tone.',
      },
    ],
  },
  {
    id: 'svc-films',
    slug: 'cinematic-films',
    title: 'Cinematic Films',
    shortTitle: 'Films',
    group: 'Motion',
    featured: true,
    tagline: 'Sound, movement and time — the three things a photograph cannot hold.',
    summary:
      'Wedding films, brand stories and documentary shorts, cut for feeling rather than length.',
    heroImage: '/assets/images/services/studioz-d-cinematic-film-sunset.webp',
    // High-set crop keeps both heads on ultra-wide screens.
    heroPosition: 'center 20%',
    heroImageTall: '/assets/images/services/studioz-d-cinematic-film-dunes-tall.webp',
    cardImage: '/assets/images/services/studioz-d-cinematic-film-arch.webp',
    video: { src: 'https://video.nexverrtech.com/studioz-d-pre-wedding-film.mp4', label: 'Pre-wedding film', duration: '1:11' },
    //https://video.studiozd.com/
    intro:
      'A film gives you back the things a still leaves out — a voice, a pause, the noise of a room. We shoot with a light footprint and edit with restraint, because the goal is something you will actually rewatch.',
    whatWeCapture: [
      'Ceremony and speech audio recorded properly, not as an afterthought',
      'Movement — entrances, dances, the walk down an aisle',
      'Interview and vow audio used as the spine of the edit',
      'Atmosphere: the room, the light, the details in motion',
      'A short highlight cut alongside the full-length film',
      'Brand and documentary storytelling for businesses',
    ],
    experience: [
      { title: 'Audio is half the film', body: 'Clean sound is what separates a film from a montage. We plan mic placement as carefully as camera position.' },
      { title: 'Shot to be cut', body: 'Coverage is planned around the edit, so the story holds together rather than being rescued in post.' },
      { title: 'Restraint in the grade', body: 'A treatment that still looks right in ten years beats one that looks current for six months.' },
    ],
    process: [
      { step: '01', title: 'Story', body: 'What the film is about, beyond what happens in it.' },
      { step: '02', title: 'Plan', body: 'Coverage, audio and crew mapped to the schedule.' },
      { step: '03', title: 'Shoot', body: 'Capture across the events or the production days.' },
      { step: '04', title: 'Edit', body: 'Assembly, sound design, grade and licensed music.' },
      { step: '05', title: 'Deliver', body: 'Highlight cut, full film and social edits.' },
    ],
    relatedWorkCategory: null,
    relatedServices: ['reels', 'wedding-photography', 'commercial-photography'],
    relatedGiftCategory: 'memory-gifts',
    ctaLabel: 'Discuss a Film',
    faq: [
      {
        q: 'How long is a wedding film?',
        a: 'A highlight cut usually sits between three and six minutes. A full-length film runs longer and covers the ceremony and speeches properly. Most couples want both.',
      },
      {
        q: 'Is the music licensed?',
        a: 'Yes. Every film uses properly licensed music, so your film will not be muted or taken down when you share it.',
      },
      {
        q: 'Do photography and film work together?',
        a: 'Yes, and it is the better way to book. One team, one plan, and neither side stepping into the other side of the frame.',
      },
    ],
  },
  {
    id: 'svc-reels',
    slug: 'reels',
    title: 'Reels & Short Form',
    shortTitle: 'Reels',
    group: 'Motion',
    featured: false,
    tagline: 'Short does not mean thrown together.',
    summary:
      'Vertical films for social — shot, cut and paced for a feed, without looking like everything else in it.',
    heroImage: '/assets/images/services/studioz-d-wedding-teaser-bride.webp',
    heroPosition: 'center 15%',
    heroImageTall: '/assets/images/services/studioz-d-wedding-teaser-bride-tall.webp',
    cardImage: '/assets/images/services/studioz-d-wedding-teaser-temple.webp',
    video: { src: 'https://video.nexverrtech.com/studioz-d-wedding-teaser.mp4', label: 'Wedding teaser', duration: '0:47' },
    //https://video.studiozd.com/
    //npm run build
    //npm run build
    intro:
      'Short-form is its own craft. It is vertical, it is silent for the first second, and it has to earn the next five. We shoot native vertical rather than cropping down from a wide frame, and cut to a rhythm that suits the subject.',
    whatWeCapture: [
      'Native 9:16 capture rather than cropped landscape',
      'Hooks designed to work in the first second, muted',
      'Product, venue and process sequences',
      'Behind-the-scenes and teaser cuts',
      'On-trend pacing without losing the brand voice',
      'Caption-ready versions with burned-in text on request',
    ],
    experience: [
      { title: 'Vertical from the start', body: 'Framing, movement and composition are planned for a phone screen, not rescued in the crop.' },
      { title: 'A batch, not a one-off', body: 'Most clients need a month of content, so we shoot in sets and deliver a library.' },
      { title: 'Sound handled properly', body: 'Licensed audio, clean voice capture, and versions that still work on mute.' },
    ],
    process: [
      { step: '01', title: 'Concept', body: 'Hooks, formats and the content calendar.' },
      { step: '02', title: 'Plan', body: 'A shoot day mapped to multiple deliverables.' },
      { step: '03', title: 'Shoot', body: 'Native vertical capture across the set.' },
      { step: '04', title: 'Edit', body: 'Cut, graded, captioned and scored.' },
      { step: '05', title: 'Deliver', body: 'A batch of ready-to-post files.' },
    ],
    relatedWorkCategory: null,
    relatedServices: ['cinematic-films', 'product-photography', 'commercial-photography'],
    relatedGiftCategory: 'corporate',
    ctaLabel: 'Plan a Reel Series',
    faq: [
      {
        q: 'How many reels come from one shoot day?',
        a: 'It depends on the concepts, but a planned day typically produces a batch rather than a single film. We agree the deliverable count before the shoot.',
      },
      {
        q: 'Do you write the concepts?',
        a: 'We can. Some clients arrive with a plan, others want the hooks and formats developed with them. Both work.',
      },
    ],
  },
  {
    id: 'svc-custom',
    slug: 'custom-photography',
    title: 'Custom Photography',
    shortTitle: 'Custom',
    group: 'People',
    featured: false,
    tagline: 'If it matters to you, it is worth photographing properly.',
    summary:
      'For the sessions that do not fit a category — anniversaries, reunions, farewells, personal projects.',
    heroImage: '/assets/images/works/studioz-d-pre-wedding-newspapers-bokeh.webp',
    cardImage: '/assets/images/works/studioz-d-pre-wedding-orange-wall-leaves.webp',
    intro:
      'Some of the most meaningful sessions we shoot have no standard name. A grandmother in her kitchen. A workshop before it closes. Four friends who have not been in one city since college. Tell us what it is and we will build the session around it.',
    whatWeCapture: [
      'Anniversary and milestone sessions',
      'Reunions, farewells and last-day-in-a-place shoots',
      'Personal creative and passion projects',
      'Pets and the people who love them',
      'Homes, studios and spaces before they change',
      'Anything that has a reason behind it',
    ],
    experience: [
      { title: 'We start with why', body: 'The reason behind the session decides the approach. That conversation comes before any planning.' },
      { title: 'Built from scratch', body: 'No template, no package to fit into. The session is shaped to the subject.' },
      { title: 'Small and personal', body: 'Custom sessions run with a minimal crew. Usually that is the point.' },
    ],
    process: [
      { step: '01', title: 'Tell us', body: 'What it is, who it is for, and why now.' },
      { step: '02', title: 'Shape it', body: 'We propose an approach, location and timing.' },
      { step: '03', title: 'Shoot', body: 'A session built entirely around the subject.' },
      { step: '04', title: 'Edit', body: 'Treatment chosen to suit the story.' },
      { step: '05', title: 'Deliver', body: 'Gallery, plus prints and gift options.' },
    ],
    relatedWorkCategory: 'portrait',
    relatedServices: ['portrait-photography', 'baby-family-photography', 'cinematic-films'],
    relatedGiftCategory: 'memory-gifts',
    ctaLabel: 'Tell Us Your Idea',
    faq: [
      {
        q: 'What counts as a custom session?',
        a: 'Anything that does not fit neatly into the other categories. If it matters to you, it is worth a conversation — we will tell you honestly whether we are the right studio for it.',
      },
      {
        q: 'Can you travel for a session?',
        a: 'Yes. Travel is planned and quoted transparently as part of the conversation.',
      },
    ],
  },
];

/* ------------------------------------------------------------------------ */
/* Selectors                                                                 */
/* ------------------------------------------------------------------------ */

export const getServiceBySlug = (slug) => services.find((service) => service.slug === slug) ?? null;

export const getFeaturedServices = (limit = 6) =>
  services.filter((service) => service.featured).slice(0, limit);

export const getRelatedServices = (slug) => {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedServices
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter(Boolean);
};

/** Service groups, in presentation order, for the /services page. */
export const serviceGroups = ['Celebrations', 'People', 'Brands', 'Motion'];

export const getServicesByGroup = (group) =>
  services.filter((service) => service.group === group);

/** Flat option list reused by the contact form's "Interested in" select. */
export const serviceOptions = services.map((service) => ({
  value: service.slug,
  label: service.title,
}));

export default services;
