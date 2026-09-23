/**
 * Client testimonials.
 *
 * ⚠️ DELIBERATELY EMPTY ON LAUNCH.
 *
 * Studioz D has not supplied real client words, and inventing them would put
 * fabricated quotes — and, worse, fabricated review structured data — in front
 * of customers. So this array ships empty and the Testimonials section renders
 * its honest empty state instead.
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

export const testimonials = [];

/** Only ever returns entries explicitly cleared for publication. */
export const getPublishedTestimonials = (limit = 6) =>
  testimonials.filter((entry) => entry.published && entry.quote?.trim()).slice(0, limit);

export const hasTestimonials = () => getPublishedTestimonials(1).length > 0;

export default testimonials;
