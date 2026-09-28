/**
 * Client testimonials.
 *
 * These are real Google reviews supplied by the studio. Nothing here was
 * written or edited by us — see the note on `testimonials` below.
 *
 * TO PUBLISH REAL TESTIMONIALS
 * 1. Add entries below using the shape in `testimonialTemplate`.
 * 2. Set `published: true` on each one you have permission to show.
 * That is all — the home page section switches itself on automatically.
 *
 * Note: we still do NOT emit Review/AggregateRating JSON-LD from this data.
 * Review markup has strict eligibility rules and misusing it risks a manual
 * action. Wire it to a verified review source instead.
 */

/** Reference shape. Not rendered — it exists so the fields are documented. */
export const testimonialTemplate = {
  id: 'testimonial-000',
  /** Name exactly as the client agreed to be credited. */
  name: '',
  /** Optional context line, e.g. 'Wedding, 2026'. Leave blank if unsure. */
  context: '',
  /** The quote, in the client's own words. Do not paraphrase. */
  quote: '',
  /** Which side of the studio the words relate to. */
  service: 'photography',
  /** Gate — nothing renders until this is explicitly true. */
  published: false,
};

/**
 * Google review summary, as supplied by the studio from its Google Business
 * Profile on 28 September 2026. Update both numbers together when they change.
 */
export const reviewSummary = {
  rating: 4.9,
  count: 30,
  source: 'Google',
  /** Google's own "people often mention" topics for this profile. */
  topics: ['Photo quality', 'Talented photographers', 'Special moments', 'Photo availability'],
};

const review = (id, name, quote, service = 'photography') => ({
  id,
  name,
  context: 'Google review',
  quote,
  service,
  published: true,
});

/**
 * Real Google reviews, supplied by the studio. Quoted exactly — spelling,
 * punctuation and emoji as written. Where Google truncates a review behind
 * "More", the quote ends at the ellipsis rather than being completed.
 */
export const testimonials = [
  review('google-01', 'Logeshwaran M', 'These guys are absolutely, incredibly talented which by just taking a quick look at any of the photos on here it is plain to see. Looking through all of our wedding photos, we are blown away by how natural and beautiful they all are.. …'),
  review('google-02', 'Masana Mani', 'Best service ever had with best quality ✅️ and affordable prices 😀 The photographer here is really good 👌 They patiently heard my ideas and the outcome is way beyond my expectations 😍 …'),
  review('google-03', 'Devi', 'Who goes above and beyond to get that perfectly unique shot..!!🔥 These guys were Professional, entertaining and just made the day a blast!♥️'),
  review('google-04', 'Pugalendhi Radhakrishnan', '"Simply Awesome !!!!" We have booked these guys for my wedding photoshoot. They are incredibly talented and extremely detail-oriented. Along with capturing …'),
  review('google-05', 'Vishal Murali', 'Started from reference, now they are my brothers (Dinesh, Naren).. They did an absolutely fantastic work.. Just to be open frank, I don’t know to give a pose but they guided me very well.. From my family everyone was happy with photoshoot …'),
  review('google-06', 'Lilly Mary', 'Good shop to make photo frames....', 'gifts'),
  review('google-07', 'Jagan Durairaj', 'If you need a better photo stills pls reach out to DK. They have given unforgettable memories to rejoice. Thanks Studioz D & team 👍'),
  review('google-08', 'Raja. A', 'Awesome work I really liked the photos thank you so much this is my second event with them I’m fully satisfied.'),
  review('google-09', 'Krishnakumar A', 'Very good and fast service... makes your photos available in 5mins, quality is also good...💯'),
  review('google-10', 'Sneha Prabha', 'Their picture quality was good and the team are so co operative and happy with their work.'),
  review('google-11', 'Priyanka R', 'Excellent photography... Nice ambience and quick service.'),
  review('google-12', 'Srini Vaas', 'Superb team superb work 😊. Highly recommended. …'),
  review('google-13', 'Kavitha Raghu', 'Had a great experience and fantabulous work by StudiozD team'),
];

/** Only ever returns entries explicitly cleared for publication. */
export const getPublishedTestimonials = (limit = 6) =>
  testimonials.filter((entry) => entry.published && entry.quote?.trim()).slice(0, limit);

export const hasTestimonials = () => getPublishedTestimonials(1).length > 0;

export default testimonials;
