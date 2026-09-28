import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/buttons/Button';
import { getPublishedTestimonials, reviewSummary } from '@/data/testimonials';
import { siteConfig } from '@/config/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { pad2 } from '@/utils/format';

/**
 * Client words.
 *
 * ⚠️ The data file ships EMPTY on purpose — see `data/testimonials.js`. Rather
 * than inventing quotes, this section renders an honest placeholder inviting
 * the first conversation. Add published entries to the data file and the
 * carousel below switches on automatically, with no code change.
 *
 * No Review or AggregateRating structured data is emitted from here either
 * way; that markup needs a verified review source.
 */
export const Testimonials = () => {
  const entries = getPublishedTestimonials(20);
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  /* --------------------------------------------------- Empty (default) */
  if (entries.length === 0) {
    return (
      <section className="section" aria-labelledby="testimonials-title">
        <div className="shell">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 border border-ink-100 bg-ivory-100/60 px-6 py-14 text-center sm:px-12">
            <Quote className="h-8 w-8 text-champagne-600" strokeWidth={1.1} aria-hidden="true" />

            <p className="eyebrow">In Their Words</p>

            <h2 id="testimonials-title" className="text-fluid-2xl text-ink-900">
              We would rather show you the work than quote ourselves.
            </h2>

            <p className="max-w-prose-sm text-fluid-base text-ink-500">
              Client words will appear here as they are shared with us — in full, unedited, and
              only ever with permission. In the meantime, the photographs make the case better
              than a paraphrase would.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button to="/works" variant="solid">
                See the work
              </Button>
              <Button to="/contact" variant="outline">
                Start a conversation
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------ Populated */
  const current = entries[index];
  const go = (next) => setIndex(((next % entries.length) + entries.length) % entries.length);

  return (
    <section className="section" aria-labelledby="testimonials-title">
      <div className="shell">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <SectionHeading
            eyebrow="In Their Words"
            title="What clients say"
            id="testimonials-title"
            align="center"
            titleClassName="text-fluid-2xl"
          />
          {/* The aggregate, shown beside the quotes so the selection is honest. */}
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-fluid-sm text-ink-500">
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} className="h-4 w-4 fill-champagne-500 text-champagne-500" strokeWidth={1} />
              ))}
            </span>
            <span className="font-semibold text-ink-900">{reviewSummary.rating}</span>
            {siteConfig.social.googleBusiness ? (
              <a
                href={siteConfig.social.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                {reviewSummary.count} {reviewSummary.source} reviews
              </a>
            ) : (
              <span>
                {reviewSummary.count} {reviewSummary.source} reviews
              </span>
            )}
          </p>
          <p className="text-[0.62rem] uppercase tracking-widest text-ink-300">
            Often mentioned: {reviewSummary.topics.join(' · ')}
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <Quote
            className="mx-auto mb-5 h-7 w-7 text-champagne-600"
            strokeWidth={1.1}
            aria-hidden="true"
          />

          <div className="min-h-[10rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <p className="font-display text-fluid-xl leading-snug text-ink-900">
                  “{current.quote}”
                </p>
                <footer className="flex flex-col gap-1">
                  <cite className="not-italic text-[0.72rem] font-semibold uppercase tracking-widest-xl text-ink-900">
                    {current.name}
                  </cite>
                  {current.context && (
                    <span className="text-[0.68rem] uppercase tracking-widest text-ink-300">
                      {current.context}
                    </span>
                  )}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {entries.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center border border-ink-200 text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </button>
              <span className="text-[0.7rem] tabular-nums tracking-widest-xl text-ink-400">
                {pad2(index + 1)} / {pad2(entries.length)}
              </span>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center border border-ink-200 text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
