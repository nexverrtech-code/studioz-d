import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Reveal, RevealText } from '@/components/motion/Reveal';
import { useCanHover } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';
import { trackCta } from '@/services/analytics.service';

/**
 * Two Worlds — the gateway's most important section.
 *
 * Studioz D is two businesses under one name. Rather than showing both
 * catalogues at once and asking the visitor to work it out, the landing page
 * asks a single question and then commits to the answer.
 *
 * Desktop: two panels that start 50/50 and shift to roughly 58/42 when one is
 * focused. Driven by `flex-basis`, so the pair always sums to 100% and the row
 * can never overflow its container regardless of the ratio.
 *
 * Touch: two stacked, complete blocks. Nothing is behind a hover, because
 * there is no hover — the supporting copy and CTA are always visible.
 */

const WORLDS = [
  {
    id: 'photography',
    label: 'Photography',
    action: 'Capture it.',
    /** Short, scannable. Not a services list — this is a signpost. */
    facets: ['Photography', 'Films', 'Stories', 'People', 'Brands'],
    to: '/services',
    cta: 'Explore Photography',
    /*
     * Two files, because the two presentations are genuinely different shapes.
     * The desktop panel is a wide box (roughly 3:2, and it widens further on
     * hover); the touch card is 4:5. One file could only serve one of them —
     * the other would lose half of itself to the crop.
     */
    image: '/assets/images/works/studioz-d-pre-wedding-rocks-wave-gown.webp',
    alt: 'Couple on wet rocks as a wave breaks behind them, the gown caught in the spray, photographed by Studioz D',
    imageTall: '/assets/images/works/studioz-d-pre-wedding-rocks-twirl.webp',
    altTall: 'Couple dancing on rocks as a wave breaks behind them, photographed by Studioz D',
    position: 'center 45%',
  },
  {
    id: 'gifts',
    label: 'Customized Gifts',
    action: 'Keep it.',
    facets: ['Personalized', 'Meaningful', 'Made for you'],
    to: '/gifts',
    cta: 'Explore Gifts',
    /**
     * A composite, not a product shot: one of the studio's own photographs
     * presented framed, which is exactly what the gifting service does with
     * it. Regenerate with `npm run mockups`; replace when real product
     * photography exists.
     */
    image: '/assets/images/gifts/studioz-d-gift-framed-print-panel.webp',
    alt: 'A Studioz D bridal portrait printed, matted and framed on a wall',
    imageTall: '/assets/images/gifts/studioz-d-gift-framed-print.webp',
    altTall: 'A Studioz D bridal portrait printed, matted and framed on a wall',
    position: 'center 50%',
  },
];

/** The content block shared by both presentations, so they cannot drift. */
const PanelContent = ({ world, tone, expanded }) => {
  const light = tone === 'light';

  return (
    <>
      <span
        className={cn(
          'text-[0.62rem] font-semibold uppercase tracking-widest-xl',
          light ? 'text-champagne-400' : 'text-champagne-700'
        )}
      >
        {world.label}
      </span>

      <span
        className={cn(
          'font-display leading-[0.95]',
          light ? 'text-ivory-50' : 'text-ink-900',
          'text-[clamp(2rem,1.5rem+2.6vw,3.6rem)]'
        )}
      >
        {world.action}
      </span>

      {/* Facet list — a signpost, not a menu. */}
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {world.facets.map((facet, index) => (
          <span key={facet} className="flex items-center gap-3">
            {index > 0 && (
              <span
                className={cn('h-px w-3', light ? 'bg-ivory-100/30' : 'bg-ink-300')}
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                'text-[0.7rem] uppercase tracking-widest',
                light ? 'text-ivory-200/75' : 'text-ink-400'
              )}
            >
              {facet}
            </span>
          </span>
        ))}
      </span>

      <span
        className={cn(
          'mt-1 inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-widest-xl',
          light ? 'text-ivory-100' : 'text-ink-900'
        )}
      >
        {world.cta}
        <ArrowRight
          className={cn(
            'h-4 w-4 transition-transform duration-500 ease-editorial',
            expanded && 'translate-x-1.5'
          )}
          strokeWidth={1.7}
          aria-hidden="true"
        />
      </span>
    </>
  );
};

export const TwoWorlds = () => {
  const [active, setActive] = useState(null);
  const canHover = useCanHover();

  return (
    <section className="section" aria-labelledby="two-worlds-title">
      <div className="shell">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10">
          <Reveal direction="fade" duration={0.5}>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-ink-300" aria-hidden="true" />
              Two Creative Worlds
            </p>
          </Reveal>

          <h2
            id="two-worlds-title"
            className="max-w-[20ch] font-display text-[clamp(1.8rem,1.35rem+2.1vw,3rem)] uppercase leading-[1.02] text-ink-900"
          >
            <RevealText text="Two ways to keep a moment." />
          </h2>

          <Reveal direction="up" delay={0.12}>
            <p className="lede">
              Choose how you want Studioz D to become part of your story.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ------------------------------------------------- Desktop panels */}
      {canHover && (
        <div
          className="shell hidden lg:flex lg:gap-4"
          onMouseLeave={() => setActive(null)}
        >
          {WORLDS.map((world) => {
            const isActive = active === world.id;
            const isDimmed = active !== null && !isActive;

            return (
              <Link
                key={world.id}
                to={world.to}
                onMouseEnter={() => setActive(world.id)}
                onFocus={() => setActive(world.id)}
                onBlur={() => setActive(null)}
                onClick={() => trackCta(world.cta, 'two-worlds')}
                aria-label={`${world.label} — ${world.cta}`}
                /*
                 * Fixed, equal halves. An earlier version animated the widths
                 * on hover (50% -> 58/42), which re-cropped the photograph
                 * live and read as the card stretching. The two businesses are
                 * equal, so the two panels stay equal; hover is expressed in
                 * the scrim, the image scale and the arrow instead.
                 */
                className="group relative min-w-0 flex-1 basis-0 overflow-hidden"
              >
                <OptimizedImage
                  src={world.image}
                  alt={world.alt}
                  aspect="4/5"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  objectPosition={world.position}
                  className="h-[clamp(26rem,46vh,34rem)] w-full"
                  imgClassName={cn(
                    'transition-transform duration-[1100ms] ease-editorial',
                    isActive && 'scale-[1.05]'
                  )}
                  style={{ aspectRatio: 'auto' }}
                />

                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-0 transition-colors duration-700',
                    isDimmed
                      ? 'bg-ink-950/70'
                      : 'bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent'
                  )}
                />

                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-7 transition-transform duration-700 ease-editorial xl:p-9',
                    isActive && '-translate-y-1'
                  )}
                >
                  <PanelContent world={world} tone="light" expanded={isActive} />
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* --------------------------------------- Touch / small screens -- */}
      <div className={cn('shell grid gap-5 sm:grid-cols-2', canHover && 'lg:hidden')}>
        {WORLDS.map((world) => (
          <Link
            key={world.id}
            to={world.to}
            onClick={() => trackCta(world.cta, 'two-worlds')}
            aria-label={`${world.label} — ${world.cta}`}
            className="group flex h-full flex-col"
          >
            <OptimizedImage
              src={world.imageTall ?? world.image}
              alt={world.altTall ?? world.alt}
              aspect="4/5"
              sizes="(min-width: 640px) 50vw, 100vw"
              objectPosition={world.position}
              className="w-full"
              imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.04]"
            />
            <span className="flex flex-1 flex-col items-start gap-3 pt-5">
              <PanelContent world={world} tone="dark" expanded={false} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TwoWorlds;
