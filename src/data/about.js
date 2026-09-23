/**
 * About-page content: philosophy, approach, process, studio and team.
 *
 * TEAM NOTE
 * ---------
 * Team members are listed by ROLE only. No names, photographs or biographies
 * have been supplied by the studio, and inventing them would put fictional
 * people on a real business site. Add `name`, `image` and `bio` to each entry
 * when the studio provides them — the cards already render those fields.
 */

export const philosophy = {
  eyebrow: 'Our Philosophy',
  heading: 'A moment is only unrepeatable if someone was paying attention.',
  body: [
    'Photography gets talked about as a technical craft. Most of it is not. The technical part — light, exposure, lens choice — is the price of entry, and it becomes invisible within a few years of doing it properly.',
    'What stays difficult is noticing. Knowing which two seconds in an eight-hour day are the ones worth having. Being in the right position before anything happens, because afterwards is too late.',
    'That is the part we care about, and it is the reason our work looks the way it does.',
  ],
};

export const approach = {
  eyebrow: 'Our Approach',
  heading: 'Observe first. Direct only when it helps.',
  pillars: [
    {
      title: 'We watch before we shoot',
      body: 'Arriving early is not politeness, it is method. An hour spent understanding a room decides most of the frames that come out of it.',
    },
    {
      title: 'We stay out of the moment',
      body: 'Ceremonies are not repeated for the camera. Celebrations are not paused. What is in the photographs is what actually happened.',
    },
    {
      title: 'We direct where it earns its place',
      body: 'Portraits get gentle direction, because nobody knows what to do with their hands. Everything else is left alone.',
    },
    {
      title: 'We edit like it is a story',
      body: 'A gallery is sequenced, not sorted. It has a beginning, a middle and a last frame, and it is finished when it reads as one thing.',
    },
    {
      title: 'We keep colour honest',
      body: 'Heavy stylistic grading looks current for two years and dated forever after. Accurate colour and true skin tones do not age.',
    },
    {
      title: 'We finish the job off the drive',
      body: 'Photographs that live only on a hard disk are photographs nobody sees. Printing, framing and gifting is the other half of the work.',
    },
  ],
};

export const creativeProcess = {
  eyebrow: 'Our Creative Process',
  heading: 'Six steps, and none of them are a surprise.',
  steps: [
    {
      step: '01',
      title: 'Conversation',
      body: 'We start by understanding what the photographs are actually for — and who they matter to.',
    },
    {
      step: '02',
      title: 'Direction',
      body: 'Mood, references and a clear plan. You know what you are getting before anything is booked.',
    },
    {
      step: '03',
      title: 'Preparation',
      body: 'Locations scouted at the hour we will shoot them. Schedules, light and logistics settled in advance.',
    },
    {
      step: '04',
      title: 'Capture',
      body: 'The shoot itself, run quietly, with a team sized to the day.',
    },
    {
      step: '05',
      title: 'Craft',
      body: 'Culling, sequencing, colour and finishing. The longer half of the work, and where the story gets made.',
    },
    {
      step: '06',
      title: 'Keep',
      body: 'Galleries delivered, then printed, framed or built into something that lives in a house.',
    },
  ],
};

export const studio = {
  eyebrow: 'Our Studio',
  heading: 'A room built for light, and a workshop built for everything after.',
  body: [
    'The studio runs as two connected spaces. One is set up for photography: controlled light, neutral walls, and enough height to work without compromise.',
    'The other is where the printing, framing, mounting and personalization happens. Keeping both under one roof is the reason a photograph and the object it becomes end up looking like they belong together.',
  ],
  facilities: [
    'Controlled studio lighting for portrait, product and commercial work',
    'Neutral cyclorama and interchangeable backdrops',
    'Colour-managed editing and proofing suite',
    'In-house printing on archival photographic stock',
    'Framing, mounting and finishing workshop',
    'Engraving and personalization bench',
  ],
  /** Address intentionally omitted — see `config/site.js`. */
  addressNote:
    'Studio visits are by appointment. Send an enquiry and we will share directions and a time.',
};

export const behindTheScenes = {
  eyebrow: 'Behind the Scenes',
  heading: 'Most of this job is not the interesting part.',
  body: [
    'Cards formatted the night before. Batteries charged in pairs. Two backup drives filled before anyone leaves a venue. Layouts proofed three times before anything is cut.',
    'None of it makes a good reel. All of it is why nothing has ever gone wrong.',
  ],
  notes: [
    { label: 'Before every shoot', value: 'Gear prepared, locations scouted at the shooting hour' },
    { label: 'During', value: 'Dual-card capture, nothing written to a single point of failure' },
    { label: 'After', value: 'Two separate backups completed before leaving the venue' },
    { label: 'In production', value: 'Every printed or engraved piece proofed before it is made' },
  ],
};

/**
 * Roles, not people. Add `name`, `image` and `bio` once the studio supplies
 * them — `TeamGrid` renders all three when present and falls back cleanly.
 */
export const team = [
  {
    id: 'role-photography',
    role: 'Photography',
    name: '',
    image: '',
    bio: '',
    focus: 'Weddings, portraits, families and events — the observational side of the studio.',
  },
  {
    id: 'role-films',
    role: 'Films & Motion',
    name: '',
    image: '',
    bio: '',
    focus: 'Cinematic films, short form and the sound that makes them work.',
  },
  {
    id: 'role-commercial',
    role: 'Product & Commercial',
    name: '',
    image: '',
    bio: '',
    focus: 'Catalogue, lifestyle and brand imagery built to a spec.',
  },
  {
    id: 'role-post',
    role: 'Post-Production',
    name: '',
    image: '',
    bio: '',
    focus: 'Culling, sequencing, colour and the finishing that turns files into a story.',
  },
  {
    id: 'role-gifting',
    role: 'Gifting & Production',
    name: '',
    image: '',
    bio: '',
    focus: 'Printing, framing, engraving and every personalized creation.',
  },
  {
    id: 'role-client',
    role: 'Client Experience',
    name: '',
    image: '',
    bio: '',
    focus: 'Planning, scheduling and making sure nothing lands as a surprise.',
  },
];

/** Reasons to choose the studio — claims kept to things that are verifiable. */
export const whyStudiozD = [
  {
    number: '01',
    title: 'Two halves of one idea',
    body: 'Photography and personalized gifting under one roof. The people who took the photograph are the people who print and frame it.',
  },
  {
    number: '02',
    title: 'Observational by default',
    body: 'We do not stage ceremonies, repeat moments or direct celebrations. What is in the frame is what happened.',
  },
  {
    number: '03',
    title: 'Colour that will still look right',
    body: 'No heavy stylistic grading. Accurate, timeless colour that does not date the photographs to the year they were taken.',
  },
  {
    number: '04',
    title: 'Sequenced, not sorted',
    body: 'Every gallery is edited as a story with a beginning and an end, rather than delivered as a folder of files.',
  },
  {
    number: '05',
    title: 'Nothing lands as a surprise',
    body: 'Coverage, deliverables, timelines and costs are agreed in writing before a shoot. Proofs are approved before anything is produced.',
  },
  {
    number: '06',
    title: 'Off the drive, into the room',
    body: 'The job is not finished at delivery. It is finished when the photograph is on a wall, in an album, or in someone else’s hands.',
  },
];

export default philosophy;
