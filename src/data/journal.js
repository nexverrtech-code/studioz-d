/**
 * Journal — long-form guides and studio notes.
 *
 * Article bodies are block arrays rather than HTML strings, so the renderer
 * stays in control of typography, spacing and internal linking. Supported
 * blocks: `heading`, `paragraph`, `list`, `quote`, `callout`, `link`.
 */

export const journalCategories = [
  { id: 'all', label: 'All' },
  { id: 'photography', label: 'Photography' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'pre-weddings', label: 'Pre-Weddings' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'events', label: 'Events' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'guides', label: 'Guides' },
  { id: 'studio', label: 'Studio Stories' },
];

export const journal = [
  {
    id: 'jr-001',
    slug: 'how-to-prepare-for-your-pre-wedding-photoshoot',
    title: 'How to Prepare for Your Pre-Wedding Photoshoot',
    category: 'guides',
    categoryLabel: 'Guides',
    tags: ['pre-weddings', 'guides'],
    date: '2026-08-18',
    readingMinutes: 6,
    excerpt:
      'Nine things worth sorting before the day, and three that genuinely do not matter as much as you think.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-tree-lined-road.webp',
    coverAlt: 'Couple walking together during a pre-wedding photography session',
    featured: true,
    body: [
      {
        type: 'paragraph',
        text: 'Most couples arrive at a pre-wedding shoot slightly nervous and over-prepared in the wrong areas. They have three outfit changes and no idea what they want the photographs to feel like. Here is what actually moves the needle.',
      },
      { type: 'heading', text: 'Decide what the photographs are for' },
      {
        type: 'paragraph',
        text: 'This sounds obvious and almost nobody does it. Invitation cards need horizontal frames with clean space for type. A reception screen needs wide crops. Instagram needs vertical. If you tell us on day one, we shoot for all three. If you tell us after, we are cropping and hoping.',
      },
      { type: 'heading', text: 'Pick the time before you pick the place' },
      {
        type: 'paragraph',
        text: 'A mediocre location in good light beats a spectacular one at noon, every single time. We plan sessions backwards from the hour, then find places that work in it. If a location only works at 6:40pm, that is when we shoot, and everything else bends around it.',
      },
      { type: 'heading', text: 'Two outfits. Three at most.' },
      {
        type: 'paragraph',
        text: 'Every outfit change costs roughly twenty-five minutes once you account for finding somewhere, changing, and re-settling. With three changes in a four-hour session you have spent an hour and a quarter not being photographed. Two is usually the right answer: one relaxed, one dressed.',
      },
      {
        type: 'list',
        items: [
          'Solid colours and simple textures photograph better than busy prints',
          'Avoid tight logos and slogans — they date the photographs instantly',
          'Bring shoes you can actually walk in, because you will walk',
          'Coordinate with each other without matching exactly',
        ],
      },
      { type: 'heading', text: 'Eat something' },
      {
        type: 'paragraph',
        text: 'Not a joke. The single most common reason a session loses energy in hour three is that nobody has eaten since breakfast. Faces go flat, patience goes, and it shows in every frame.',
      },
      { type: 'heading', text: 'Give us something real to work with' },
      {
        type: 'paragraph',
        text: 'The best direction we can give is not a pose — it is a prompt. Walk and tell each other about the worst holiday you have taken together. Argue about whose family is louder. The photographs from those thirty seconds are the ones that end up framed.',
      },
      {
        type: 'quote',
        text: 'The frames people keep are almost never the ones where they were trying to look good.',
      },
      { type: 'heading', text: 'Three things that matter less than you think' },
      {
        type: 'list',
        items: [
          'The weather. Overcast is excellent light. Rain has produced some of our favourite frames.',
          'Being photogenic. That is a lighting and timing problem, and it is our job, not yours.',
          'Knowing how to pose. If you did, the photographs would look posed.',
        ],
      },
      {
        type: 'callout',
        text: 'Planning a session? The pre-wedding page walks through how we approach locations, light and timing.',
        linkLabel: 'See how we shoot pre-weddings',
        linkTo: '/services/pre-wedding-photography',
      },
    ],
    relatedServices: ['pre-wedding-photography', 'wedding-photography'],
    relatedWorks: ['the-long-road', 'enchanted'],
    relatedArticles: ['what-to-wear-for-a-couple-photoshoot', 'how-to-choose-your-wedding-photography-style'],
  },
  {
    id: 'jr-002',
    slug: 'what-to-wear-for-a-couple-photoshoot',
    title: 'What to Wear for a Couple Photoshoot',
    category: 'guides',
    categoryLabel: 'Guides',
    tags: ['guides', 'pre-weddings', 'portraits'],
    date: '2026-07-29',
    readingMinutes: 5,
    excerpt:
      'A practical wardrobe guide that has nothing to do with trends and everything to do with how fabric behaves in front of a lens.',
    coverImage: '/assets/images/works/studioz-d-pre-wedding-magenta-gown-doorway.webp',
    coverAlt: 'Couple in coordinated outfits during a portrait session',
    featured: true,
    body: [
      {
        type: 'paragraph',
        text: 'Clothing advice for photoshoots is usually a list of colours somebody liked. This is a list of behaviours — how fabric moves, how colour reflects, and what the camera does with both.',
      },
      { type: 'heading', text: 'Coordinate, do not match' },
      {
        type: 'paragraph',
        text: 'Identical outfits read as a costume. Completely unrelated outfits read as two people who arrived separately. The middle ground is a shared palette with different values: one of you in the deeper tone, one in the lighter.',
      },
      { type: 'heading', text: 'Texture beats pattern' },
      {
        type: 'paragraph',
        text: 'A camera flattens. Pattern fights that flattening and usually wins, pulling attention straight off the face. Texture — linen, raw cotton, knit, silk — does the opposite: it catches light, gives the frame depth, and never competes for attention.',
      },
      { type: 'heading', text: 'Watch what colour does to skin' },
      {
        type: 'paragraph',
        text: 'A bright saturated shirt on a sunny day bounces its own colour straight onto the chin and neck. Green is the worst offender, red is close behind. It is correctable in the edit, but correcting it costs some of the natural skin tone. Muted and mid-tone colours avoid the problem entirely.',
      },
      {
        type: 'list',
        items: [
          'Mid-tones photograph most reliably — they hold detail in both highlights and shadow',
          'Pure white blows out in bright sun; off-white and cream do not',
          'Pure black loses all texture in low light; charcoal keeps it',
          'Check the fit sitting down, not just standing up',
        ],
      },
      { type: 'heading', text: 'Movement is a wardrobe decision' },
      {
        type: 'paragraph',
        text: 'If you want frames with movement in them — walking, turning, a skirt catching wind — you need fabric that moves. Structured, heavy clothing produces still photographs no matter how much the person moves inside it.',
      },
      {
        type: 'quote',
        text: 'Wear something you would actually be comfortable sitting in for four hours. Comfort shows up in the face before it shows up anywhere else.',
      },
      { type: 'heading', text: 'The thing nobody mentions' },
      {
        type: 'paragraph',
        text: 'Bring the clothes on hangers, not folded in a bag. Creases photograph. A steamer in the car has saved more sessions than any lens we own.',
      },
      {
        type: 'callout',
        text: 'Thinking about a portrait session? Here is how we approach light, direction and getting people comfortable.',
        linkLabel: 'Portrait photography',
        linkTo: '/services/portrait-photography',
      },
    ],
    relatedServices: ['portrait-photography', 'pre-wedding-photography'],
    relatedWorks: ['in-her-frame', 'the-blue-doors'],
    relatedArticles: ['how-to-prepare-for-your-pre-wedding-photoshoot', 'what-makes-a-portrait-work'],
  },
  {
    id: 'jr-003',
    slug: 'candid-vs-traditional-wedding-photography',
    title: 'Candid vs Traditional Wedding Photography',
    category: 'weddings',
    categoryLabel: 'Weddings',
    tags: ['weddings', 'photography'],
    date: '2026-07-10',
    readingMinutes: 7,
    excerpt:
      'The two approaches are usually presented as a choice. In practice, a wedding needs both — and the interesting question is the ratio.',
    coverImage: '/assets/images/works/studioz-d-wedding-church-party.webp',
    coverAlt: 'Candid moment captured during a wedding ceremony',
    featured: true,
    body: [
      {
        type: 'paragraph',
        text: 'Every wedding enquiry eventually arrives at the same question: do you shoot candid or traditional? It is framed as a choice between two philosophies. It is really a question about proportion.',
      },
      { type: 'heading', text: 'What traditional actually gives you' },
      {
        type: 'paragraph',
        text: 'Traditional coverage means directed, composed frames: the family groups, the formal couple portraits, the posed ritual moments. It gets dismissed as stiff, and badly done it is. But it produces the photographs that get printed, framed and sent to relatives. It is also the only reliable way to guarantee that every important person is in at least one good frame.',
      },
      {
        type: 'paragraph',
        text: 'Skip it entirely and you will discover six months later that there is no clean photograph of the couple with both sets of parents. That gap is not fixable.',
      },
      { type: 'heading', text: 'What candid actually gives you' },
      {
        type: 'paragraph',
        text: 'Candid coverage is observational: the photographer stays out of the event and photographs what happens. It produces the frames with genuine emotion in them, because nothing was arranged. The cost is unpredictability — you cannot guarantee a specific photograph, only the conditions that make good ones likely.',
      },
      {
        type: 'quote',
        text: 'Traditional coverage guarantees the photographs you need. Candid coverage produces the ones you did not know you wanted.',
      },
      { type: 'heading', text: 'The ratio is the real decision' },
      {
        type: 'paragraph',
        text: 'Most weddings work out somewhere around eighty percent candid and twenty percent directed, with the directed portion concentrated into two tight windows — one after the ceremony for family groups, one at good light for couple portraits. Compressing the posed work into those windows means the rest of the day stays yours.',
      },
      {
        type: 'list',
        items: [
          'Build the family group list before the day — it is the difference between fifteen minutes and fifty',
          'Put couple portraits at golden hour, not at whatever moment happens to be free',
          'Tell your photographer which relationships matter most; they cannot guess',
          'Accept that the ceremony itself should be observed, not directed',
        ],
      },
      { type: 'heading', text: 'How we handle it' },
      {
        type: 'paragraph',
        text: 'We shoot observationally by default and schedule the directed work deliberately. During the ceremony we do not interrupt, reposition anyone or ask for anything to be repeated. Afterwards, the family groups run from a pre-agreed list so they move fast and nobody is left out.',
      },
      {
        type: 'callout',
        text: 'See how a full day comes together, from the quiet morning through to the last car leaving.',
        linkLabel: 'The Vow Made Aloud — a wedding story',
        linkTo: '/works/the-vow-made-aloud',
      },
    ],
    relatedServices: ['wedding-photography', 'cinematic-films'],
    relatedWorks: ['the-vow-made-aloud', 'the-room-turned-green'],
    relatedArticles: ['how-to-choose-your-wedding-photography-style', 'how-to-prepare-for-your-pre-wedding-photoshoot'],
  },
  {
    id: 'jr-004',
    slug: 'how-to-choose-your-wedding-photography-style',
    title: 'How to Choose Your Wedding Photography Style',
    category: 'weddings',
    categoryLabel: 'Weddings',
    tags: ['weddings', 'guides'],
    date: '2026-06-22',
    readingMinutes: 6,
    excerpt:
      'Forget the labels. Four questions that will tell you more about the right photographer than any portfolio comparison.',
    coverImage: '/assets/images/works/studioz-d-wedding-sparkler-entry.webp',
    coverAlt: 'Wedding couple portrait in warm evening light',
    featured: false,
    body: [
      {
        type: 'paragraph',
        text: 'Photographers describe their style in words that have stopped meaning anything. Documentary. Editorial. Fine art. Timeless. Every studio claims at least three. Here are four questions that will actually tell you something.',
      },
      { type: 'heading', text: '1. Look at a full gallery, not a portfolio' },
      {
        type: 'paragraph',
        text: 'A portfolio is thirty frames from three hundred weddings. It tells you what a photographer can do on their best day. Ask to see one complete wedding, start to finish. That tells you what they deliver on an average one — which is the day you are actually booking.',
      },
      { type: 'heading', text: '2. Check how the colour ages' },
      {
        type: 'paragraph',
        text: 'Heavy stylistic grading dates fast. A strong orange-teal treatment looks current for about two years and then looks exactly like the year it was made. Neutral, accurate colour with good skin tones does not date. Look at a photographer’s work from four years ago and ask whether it still looks right.',
      },
      { type: 'heading', text: '3. Ask what happens when the light is bad' },
      {
        type: 'paragraph',
        text: 'Anyone can shoot a golden-hour portrait. The real test is a 9pm reception in a hall lit by three yellow bulbs. Ask to see work from a badly-lit venue. How a photographer handles that hour tells you more than any amount of sunset work.',
      },
      { type: 'heading', text: '4. Notice who is in the frames' },
      {
        type: 'paragraph',
        text: 'Some photographers shoot almost entirely couple-focused work. Beautiful, and you will have nothing of your grandmother. Look at whether the galleries include the guests, the families, the people at the edges. Those frames become more valuable every year.',
      },
      {
        type: 'quote',
        text: 'In ten years you will not remember what the photographs looked like. You will remember who was in them.',
      },
      { type: 'heading', text: 'And one thing that is not about photography at all' },
      {
        type: 'paragraph',
        text: 'You are going to spend twelve hours with this person on a significant day. Have a conversation before you book. If it is awkward on a call, it will be awkward in your getting-ready room at 6am.',
      },
      {
        type: 'callout',
        text: 'Talk it through with us — no pitch, just a conversation about what your day actually needs.',
        linkLabel: 'Start a conversation',
        linkTo: '/contact',
      },
    ],
    relatedServices: ['wedding-photography', 'engagement-photography'],
    relatedWorks: ['the-vow-made-aloud', 'before-she-walked-out'],
    relatedArticles: ['candid-vs-traditional-wedding-photography', 'how-to-prepare-for-your-pre-wedding-photoshoot'],
  },
  {
    id: 'jr-005',
    slug: 'personalized-gift-ideas-for-an-anniversary',
    title: 'Personalized Gift Ideas for an Anniversary',
    category: 'gifts',
    categoryLabel: 'Gifts',
    tags: ['gifts', 'guides'],
    date: '2026-06-04',
    readingMinutes: 5,
    excerpt:
      'Seven anniversary gifts built from photographs you already have, ranked roughly by how long they stay meaningful.',
    coverImage: '/assets/images/journal/studioz-d-journal-anniversary-gifts.svg',
    coverAlt: 'Personalized anniversary photo gifts arranged together',
    featured: true,
    body: [
      {
        type: 'paragraph',
        text: 'The best anniversary gifts are specific. Not "something romantic" — something that could only have been given by you, to them, this year. Photographs are the shortcut to that, because they are already specific.',
      },
      { type: 'heading', text: 'Start a series, not a gift' },
      {
        type: 'paragraph',
        text: 'One framed print from the year is nice. The same format, every year, slowly filling a wall is something else entirely. The first one is a present. By the fifth it is a tradition, and it becomes harder to stop than to continue.',
      },
      { type: 'heading', text: 'Print the year, not the highlights' },
      {
        type: 'paragraph',
        text: 'The instinct is to pick the best photographs. Resist it. A boxed set of fifty prints from an ordinary year — the kitchen, the drive, the dog, the badly-lit dinner — is more affecting than ten perfect ones, because it is what the year actually looked like.',
      },
      {
        type: 'list',
        items: [
          'A framed print from a photograph they have never seen large',
          'An album covering one specific year, sequenced properly',
          'A boxed print set with captions handwritten on the reverse',
          'An engraved plaque with the date and nothing else',
          'A memory box for the things too small to frame',
          'A travel print pairing the photographs with the places',
          'An acrylic block with both names etched into the edge',
        ],
      },
      { type: 'heading', text: 'Write the words yourself' },
      {
        type: 'paragraph',
        text: 'Every personalized gift has a text field, and most people fill it with something safe. The safe option is forgettable. A specific line — something only the two of you would understand — is what makes the object survive a house move.',
      },
      {
        type: 'quote',
        text: 'Nobody has ever kept a gift because the engraving was well-written. They keep it because it was true.',
      },
      { type: 'heading', text: 'A note on timing' },
      {
        type: 'paragraph',
        text: 'Anything printed, framed or engraved is made to order. Layouts get proofed, materials get cut, and that takes real time. Start the conversation two or three weeks earlier than feels necessary.',
      },
      {
        type: 'callout',
        text: 'Browse anniversary creations, or tell us what you are picturing and we will build it.',
        linkLabel: 'Anniversary gifts',
        linkTo: '/gifts/anniversary',
      },
    ],
    relatedServices: ['custom-photography', 'portrait-photography'],
    relatedWorks: ['before-she-walked-out', 'under-the-arch'],
    relatedArticles: ['how-to-choose-a-meaningful-photo-gift', 'photo-frame-ideas-for-parents'],
  },
  {
    id: 'jr-006',
    slug: 'how-to-choose-a-meaningful-photo-gift',
    title: 'How to Choose a Meaningful Photo Gift',
    category: 'gifts',
    categoryLabel: 'Gifts',
    tags: ['gifts', 'guides'],
    date: '2026-05-16',
    readingMinutes: 5,
    excerpt:
      'Most photo gifts fail for the same three reasons. Here is how to avoid all of them.',
    coverImage: '/assets/images/journal/studioz-d-journal-meaningful-gift.svg',
    coverAlt: 'Personalized photo frame styled on a shelf at home',
    featured: false,
    body: [
      {
        type: 'paragraph',
        text: 'A photo gift is an easy idea and a surprisingly easy thing to get wrong. Three failures account for almost all of them.',
      },
      { type: 'heading', text: 'Failure one: the wrong photograph' },
      {
        type: 'paragraph',
        text: 'The most technically good photograph is rarely the most meaningful one. A slightly soft frame of someone mid-laugh beats a sharp one of everyone smiling correctly. Choose for the moment, not the execution. We can fix a lot in printing; we cannot add feeling.',
      },
      { type: 'heading', text: 'Failure two: the wrong size' },
      {
        type: 'paragraph',
        text: 'People consistently choose prints too small. A 5x7 on a shelf disappears within a week of being received. Go one size larger than feels sensible — the photograph needs to be visible from where people actually sit.',
      },
      { type: 'heading', text: 'Failure three: no place to put it' },
      {
        type: 'paragraph',
        text: 'This is the one nobody considers. Before choosing anything, picture the specific surface it will live on. A desk frame for someone who works from a laptop on their sofa is a gift that lives in a drawer.',
      },
      {
        type: 'list',
        items: [
          'Wall space available? Framed prints and gallery sets',
          'Shelf or desk? Standing frames, acrylic blocks, small plaques',
          'Nowhere obvious? Albums and memory boxes — they store beautifully',
          'Someone who travels? Print sets and cards, which move easily',
        ],
      },
      { type: 'heading', text: 'The test that works' },
      {
        type: 'paragraph',
        text: 'Ask yourself whether the gift could be given to anyone else. If the answer is yes, it needs more work. Specificity is the entire mechanism — the name, the date, the line that only makes sense to two people.',
      },
      {
        type: 'quote',
        text: 'A gift that could have gone to anyone will be treated like it did.',
      },
      {
        type: 'callout',
        text: 'Not sure which creation fits? Browse by occasion, relationship or feeling.',
        linkLabel: 'Explore personalized gifts',
        linkTo: '/gifts',
      },
    ],
    relatedServices: ['custom-photography'],
    relatedWorks: ['before-she-walked-out', 'under-the-arch'],
    relatedArticles: ['personalized-gift-ideas-for-an-anniversary', 'photo-frame-ideas-for-parents'],
  },
  {
    id: 'jr-007',
    slug: 'photo-frame-ideas-for-parents',
    title: 'Photo Frame Ideas for Parents',
    category: 'gifts',
    categoryLabel: 'Gifts',
    tags: ['gifts', 'guides'],
    date: '2026-04-28',
    readingMinutes: 4,
    excerpt:
      'Parents get sent hundreds of photographs and see almost none of them. Printing is the fix.',
    coverImage: '/assets/images/journal/studioz-d-journal-frames-for-parents.svg',
    coverAlt: 'Framed family photographs arranged on a wall',
    featured: false,
    body: [
      {
        type: 'paragraph',
        text: 'There is a specific gap worth closing. Parents and grandparents receive a constant stream of photographs on their phones and genuinely look at almost none of them. Not because they do not care — because a phone gallery is not a place anyone looks at pictures.',
      },
      { type: 'heading', text: 'Print bigger than you think' },
      {
        type: 'paragraph',
        text: 'Eyesight changes. A print that reads perfectly at arm’s length may not read from a chair across the room, which is where it will actually be viewed from. Go up a size, and ask for slightly lifted contrast in the print — it makes a genuine difference to legibility.',
      },
      { type: 'heading', text: 'A set beats a single' },
      {
        type: 'paragraph',
        text: 'One framed photograph is a nice object. Three matched frames become a small arrangement, and arrangements get noticed, rearranged and added to. Matched finishes across the set are what make it look deliberate rather than accumulated.',
      },
      {
        type: 'list',
        items: [
          'A matched set of two or three, same finish, different sizes',
          'A collage frame if there are a lot of people to include',
          'A milestone frame for a grandchild’s first year',
          'An album, if wall space is genuinely finished',
        ],
      },
      { type: 'heading', text: 'Include yourself' },
      {
        type: 'paragraph',
        text: 'The most common omission in family gifting: photographs of the children and grandchildren, and none of the giver. Parents want a current photograph of you. Put one in the set.',
      },
      {
        type: 'quote',
        text: 'The photograph they want most is usually the one you did not think to include.',
      },
      {
        type: 'callout',
        text: 'See the framed sets and collage layouts built for exactly this.',
        linkLabel: 'Gifts for parents',
        linkTo: '/gifts/parents',
      },
    ],
    relatedServices: ['baby-family-photography', 'portrait-photography'],
    relatedWorks: ['the-room-turned-green', 'under-the-arch'],
    relatedArticles: ['how-to-choose-a-meaningful-photo-gift', 'personalized-gift-ideas-for-an-anniversary'],
  },
  {
    id: 'jr-008',
    slug: 'what-makes-a-portrait-work',
    title: 'What Makes a Portrait Work',
    category: 'portraits',
    categoryLabel: 'Portraits',
    tags: ['portraits', 'photography'],
    date: '2026-04-02',
    readingMinutes: 5,
    excerpt:
      'It is not the lens, the light or the location. It is the ninety seconds before anyone picks up a camera.',
    coverImage: '/assets/images/works/studioz-d-portrait-motorcycle-banyan.webp',
    coverAlt: 'Studio portrait with soft directional lighting',
    featured: false,
    body: [
      {
        type: 'paragraph',
        text: 'Almost everyone says they photograph badly. Almost nobody does. What they have experienced is being photographed badly — which is a different problem with a different fix.',
      },
      { type: 'heading', text: 'The face is doing something before the shutter moves' },
      {
        type: 'paragraph',
        text: 'Point a camera at someone and they perform. The chin lifts, the smile sets, the eyes go slightly wide. It happens in under a second and it is completely involuntary. Every portrait session is really a process of waiting that reaction out.',
      },
      { type: 'heading', text: 'Which is why we start slowly' },
      {
        type: 'paragraph',
        text: 'The first ten minutes of a portrait session should not produce usable frames, and if they do it is luck. That time is for conversation, for letting someone get bored of the camera being in the room. Everything after that looks different.',
      },
      {
        type: 'quote',
        text: 'A good portrait looks like the person. A bad one looks like someone being photographed.',
      },
      { type: 'heading', text: 'Light is a decision about a face' },
      {
        type: 'paragraph',
        text: 'There is no default portrait lighting, despite what a lot of studios operate on. Soft frontal light flatters some faces and flattens others. Hard directional light builds structure on a face that has it and creates problems on one that does not. The setup should be chosen after meeting the person, not before.',
      },
      { type: 'heading', text: 'Show people the frames' },
      {
        type: 'paragraph',
        text: 'Reviewing during the session is not a courtesy, it is a technique. The moment someone sees one frame they genuinely like, the tension goes out of their shoulders and the next fifty frames improve. It also means the final selection contains no surprises.',
      },
      {
        type: 'callout',
        text: 'Studio or location, the approach is the same — get comfortable first, shoot second.',
        linkLabel: 'Portrait photography',
        linkTo: '/services/portrait-photography',
      },
    ],
    relatedServices: ['portrait-photography', 'commercial-photography'],
    relatedWorks: ['in-her-frame', 'last-light'],
    relatedArticles: ['what-to-wear-for-a-couple-photoshoot', 'how-to-choose-your-wedding-photography-style'],
  },
  {
    id: 'jr-009',
    slug: 'inside-a-studioz-d-shoot-day',
    title: 'Inside a Studioz D Shoot Day',
    category: 'studio',
    categoryLabel: 'Studio Stories',
    tags: ['studio', 'photography'],
    date: '2026-03-14',
    readingMinutes: 6,
    excerpt:
      'What actually happens between the first alarm and the last frame — including the parts that are mostly waiting.',
    coverImage: '/assets/images/works/studioz-d-portrait-groom-getting-ready.webp',
    coverAlt: 'Behind the scenes of a photography shoot day',
    featured: false,
    body: [
      {
        type: 'paragraph',
        text: 'Shoot days look glamorous in behind-the-scenes reels and are mostly logistics. Here is an honest version.',
      },
      { type: 'heading', text: 'The day before' },
      {
        type: 'paragraph',
        text: 'Cards formatted, batteries charged, sensors cleaned, backup bodies packed. This takes about two hours and is the least interesting part of the job. It is also the part that prevents every avoidable disaster.',
      },
      { type: 'heading', text: 'Arriving early' },
      {
        type: 'paragraph',
        text: 'We arrive at least an hour before anything is scheduled to happen. Not to shoot — to look. Where the windows are, which direction the room faces, where the light will be in three hours, which corner is going to be a problem. Most good frames are decided before the first one is taken.',
      },
      {
        type: 'list',
        items: [
          'Check the light in every room that will be used',
          'Find the backup plan for the space that will not work',
          'Confirm the schedule with whoever is actually running it',
          'Identify where to stand during the moments that only happen once',
        ],
      },
      { type: 'heading', text: 'The waiting' },
      {
        type: 'paragraph',
        text: 'A large part of any event shoot is standing still. Not shooting, not moving, just watching a room and waiting for something to happen in it. Photographers who are constantly shooting are usually missing more than they catch.',
      },
      {
        type: 'quote',
        text: 'The frame you were waiting for arrives about four seconds after you stop expecting it.',
      },
      { type: 'heading', text: 'Backing up before leaving' },
      {
        type: 'paragraph',
        text: 'Cards are copied to two separate drives before anyone leaves the venue. Not at home, not tomorrow. This is non-negotiable, and it is the reason we have never lost a day’s work.',
      },
      { type: 'heading', text: 'The edit is the longer half' },
      {
        type: 'paragraph',
        text: 'A twelve-hour shoot produces several thousand frames. Culling, sequencing, grading and finishing takes considerably longer than the shooting did — and it is where a set of photographs becomes a story rather than a folder.',
      },
      {
        type: 'callout',
        text: 'See what comes out of a full day, edited as a story rather than sorted by timestamp.',
        linkLabel: 'View our work',
        linkTo: '/works',
      },
    ],
    relatedServices: ['wedding-photography', 'event-photography'],
    relatedWorks: ['the-vow-made-aloud', 'the-room-turned-green'],
    relatedArticles: ['candid-vs-traditional-wedding-photography', 'what-makes-a-portrait-work'],
  },
];

/* ------------------------------------------------------------------------ */
/* Selectors                                                                 */
/* ------------------------------------------------------------------------ */

const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

export const getArticleBySlug = (slug) => journal.find((article) => article.slug === slug) ?? null;

export const getArticles = (categoryId = 'all') => {
  const list =
    categoryId === 'all'
      ? [...journal]
      : journal.filter(
          (article) => article.category === categoryId || article.tags.includes(categoryId)
        );
  return list.sort(byDateDesc);
};

export const getFeaturedArticles = (limit = 3) =>
  [...journal].filter((article) => article.featured).sort(byDateDesc).slice(0, limit);

export const getLatestArticles = (limit = 3) => [...journal].sort(byDateDesc).slice(0, limit);

export const getRelatedArticles = (slug, limit = 2) => {
  const current = getArticleBySlug(slug);
  if (!current) return getLatestArticles(limit);
  const explicit = (current.relatedArticles ?? []).map(getArticleBySlug).filter(Boolean);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const fill = journal.filter(
    (article) => article.slug !== slug && !explicit.some((match) => match.slug === article.slug)
  );
  return [...explicit, ...fill].slice(0, limit);
};

/** Formats an ISO date for display without pulling in a date library. */
export const formatArticleDate = (iso) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

/** Lightweight index powering the site-wide search. */
export const journalSearchIndex = journal.map((article) => ({
  type: 'journal',
  slug: article.slug,
  title: article.title,
  category: article.categoryLabel,
  description: article.excerpt,
  to: `/journal/${article.slug}`,
  image: article.coverImage,
  haystack: [article.title, article.categoryLabel, article.excerpt, ...article.tags]
    .join(' ')
    .toLowerCase(),
}));

export default journal;
