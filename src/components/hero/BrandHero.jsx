import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getGiftBySlug } from '@/data/gifts';
import { SIZES } from '@/utils/images';

/**
 * Landing hero.
 *
 * Deliberately one photograph and one statement, not a carousel. The gateway's
 * job is to say who Studioz D is and move the visitor to the Two Worlds
 * choice — a rotating hero competes with that, and auto-advancing slides mean
 * the headline a visitor reads is a matter of timing.
 *
 * What makes it the studio's rather than a stock banner: a drawn hairline
 * frame, a vertical index rail, one accented word per line, and a second image
 * card that puts the gifting half of the business into the opening frame
 * instead of leaving it to be discovered further down.
 *
 * Desktop: full-bleed image with the type set in the lower-left, away from the
 * subject. Mobile: image above, type below, so a headline can never land on a
 * face.
 */

/** The gifting half, shown at its own ratio inside the opening frame. */
const GIFT_CARD = getGiftBySlug('watercolour-portrait-frame')?.images[0];

const FACETS = ['Weddings', 'Portraits', 'Films', 'Personalized Gifts'];

export const BrandHero = () => {
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  /*
   * Art-directed, not resized. The desktop hero is a wide band and the phone
   * hero is a 4:5 card — one file cannot serve both, and forcing the landscape
   * frame into the phone card cost 47% of its width.
   */
  const image = isDesktop
    ? '/assets/images/works/studioz-d-wedding-sparkler-entry.webp'
    : '/assets/images/works/studioz-d-pre-wedding-rocks-twirl.webp';
  const alt = isDesktop
    ? 'Newlyweds wearing garlands walking between cold-spark fountains at their reception, photographed by Studioz D'
    : 'Couple dancing on rocks as a wave breaks behind them, photographed by Studioz D';

  /**
   * Two lines, each with its closing noun set in champagne display italic —
   * the one typographic move the whole site repeats.
   */
  const LINES = [
    ['Capture the', 'moment.'],
    ['Create the', 'memory.'],
  ];

  /** `accentClass` differs by surface: the mobile block sits on ivory. */
  const buildHeadline = (accentClass) => (
    <h1 className="font-display uppercase leading-[0.95] tracking-[0.01em]">
      {LINES.map(([lead, accent], index) => (
        <span key={accent} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reducedMotion ? false : { y: '106%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.95,
              delay: reducedMotion ? 0 : 0.08 + index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {lead}{' '}
            <span className={`italic lowercase ${accentClass}`}>{accent}</span>
          </motion.span>
        </span>
      ))}
    </h1>
  );

  const support = (
    <>
      <p className="max-w-[40ch] text-fluid-lg">
        Photography and personalized creations, designed around the moments that matter.
      </p>
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {FACETS.map((facet, index) => (
          <li key={facet} className="flex items-center gap-3">
            {index > 0 && (
              <span className="h-px w-4 shrink-0 bg-current opacity-30" aria-hidden="true" />
            )}
            <span className="text-[0.62rem] uppercase tracking-widest opacity-80">{facet}</span>
          </li>
        ))}
      </ul>
    </>
  );

  /* ------------------------------------------------------------ Desktop */
  if (isDesktop) {
    return (
      <section
        ref={sectionRef}
        className="bleed relative h-[min(88svh,52rem)] min-h-[34rem] overflow-hidden bg-ink-900"
      >
        <motion.div
          className="absolute inset-x-0 -top-[7%] bottom-[-7%]"
          style={reducedMotion ? undefined : { y: backdropY }}
        >
          <motion.div
            className="h-full w-full"
            initial={reducedMotion ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'linear' }}
          >
            <OptimizedImage
              src={image}
              alt={alt}
              sizes={SIZES.full}
              // The only eagerly-loaded image on the page — it is the LCP.
              priority
              objectPosition="center 45%"
              className="h-full w-full"
              imgClassName="h-full w-full"
              style={{ aspectRatio: 'auto' }}
            />
          </motion.div>
        </motion.div>

        {/* Scrim weighted to the lower-left, where the type sits. */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-ink-950/85 via-ink-950/40 to-ink-950/10"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col justify-end pt-header">
          <div className="shell flex items-end justify-between gap-10 pb-12">
            {/* Index rail — the same one every interior page carries. */}
            <div className="mb-1 hidden w-14 shrink-0 flex-col items-center gap-4 self-stretch pt-24 xl:flex">
              <span className="font-display text-fluid-lg leading-none text-champagne-400">01</span>
              <motion.span
                aria-hidden="true"
                className="w-px flex-1 origin-top bg-ivory-100/25"
                initial={reducedMotion ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              />
              <span
                className="text-[0.58rem] font-semibold uppercase tracking-widest-2xl text-ivory-200/60"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                Two Worlds
              </span>
            </div>

            <div className="flex max-w-[54rem] flex-col gap-6 text-ivory-50">
              <motion.span
                aria-hidden="true"
                className="block h-px w-full origin-left bg-ivory-100/25"
                initial={reducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              />
              <div className="text-[clamp(2.4rem,1.5rem+3.4vw,4.4rem)]">
                {buildHeadline('text-champagne-300')}
              </div>
              <div className="flex flex-col gap-4 text-ivory-200/85">{support}</div>
            </div>

            {/*
              The second world, present in the opening frame. Decorative, not a
              link — the Two Worlds choice sits immediately below and a
              competing CTA here would only split the decision.
            */}
            {GIFT_CARD && (
              <motion.figure
                className="mb-1 hidden w-[13rem] shrink-0 flex-col gap-3 2xl:flex"
                style={reducedMotion ? undefined : { y: cardY }}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <OptimizedImage
                  src={GIFT_CARD.src}
                  alt={GIFT_CARD.alt}
                  width={GIFT_CARD.width}
                  height={GIFT_CARD.height}
                  aspect={GIFT_CARD.aspect}
                  sizes="13rem"
                  className="w-full border-[6px] border-ivory-50/90 shadow-lift"
                />
                <figcaption className="flex items-center gap-2.5 text-[0.58rem] font-semibold uppercase tracking-widest-xl text-ivory-100/70">
                  <span className="h-px w-4 bg-ivory-100/40" aria-hidden="true" />
                  Keep it.
                </figcaption>
              </motion.figure>
            )}

            <span
              className="mb-2 hidden shrink-0 flex-col items-center gap-3 text-ivory-100/50 xl:flex 2xl:hidden"
              aria-hidden="true"
            >
              <span className="text-[0.6rem] uppercase tracking-widest-xl">Choose</span>
              <ArrowDown className="h-4 w-4 sd-scroll-cue" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------- Mobile and tablet */
  return (
    <section ref={sectionRef} className="bleed pt-header">
      <div className="relative">
        <OptimizedImage
          src={image}
          alt={alt}
          aspect="4/5"
          sizes={SIZES.full}
          priority
          objectPosition="center 45%"
          className="w-full"
        />

        {/*
          The gift card overlaps the photograph's lower edge rather than
          sitting beside it, which is what makes the pairing read as one
          composition at phone width. Inset from the gutter so it can never
          touch the viewport edge.
        */}
        {GIFT_CARD && (
          <figure className="absolute -bottom-6 right-gutter w-[34%] max-w-[9.5rem] shadow-lift">
            <OptimizedImage
              src={GIFT_CARD.src}
              alt={GIFT_CARD.alt}
              width={GIFT_CARD.width}
              height={GIFT_CARD.height}
              aspect={GIFT_CARD.aspect}
              sizes="40vw"
              className="w-full border-4 border-ivory-50"
            />
          </figure>
        )}
      </div>

      <div className="shell flex flex-col gap-5 pb-8 pt-12 text-ink-900">
        <span className="block h-px w-full bg-ink-200" aria-hidden="true" />
        <div className="text-[clamp(1.5rem,1rem+2.5vw,2.9rem)]">
          {buildHeadline('text-champagne-600')}
        </div>
        <div className="flex flex-col gap-4 text-ink-500">{support}</div>
      </div>
    </section>
  );
};

export default BrandHero;
