import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { SectionHeading } from '@/components/common/SectionHeading';
import { useCanHover } from '@/hooks/useMediaQuery';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

const WORLDS = [
  {
    id: 'photography',
    label: 'Photography',
    action: 'Capture it.',
    copy: 'Weddings, portraits, families, products and films — photographed as they happen, edited as a story.',
    to: '/services',
    cta: 'Explore Photography',
    image: '/assets/images/works/studioz-d-wedding-bride-silk-saree-smiling.webp',
    alt: 'Bride in a traditional silk saree smiling beside a window, photographed by Studioz D',
  },
  {
    id: 'gifts',
    label: 'Customized Gifts',
    action: 'Keep it.',
    copy: 'Frames, albums, hampers and keepsakes built from your own photographs, personalized with your words.',
    to: '/gifts',
    cta: 'Explore Gifts',
    // NOTE: the gifting side of the studio has supplied no photography yet,
    // so this panel still uses a generated placeholder. Swap it the moment
    // real product shots exist — see README §2.
    image: '/assets/images/gifts/studioz-d-gift-wood-frame-03.svg',
    alt: 'Personalized wood photo frame styled on a wall by Studioz D',
  },
];

/**
 * Two Worlds.
 *
 * Desktop (hover-capable): two panels that respond to hover — the focused
 * side expands, the other recedes. Driven by flex-basis so the pair always
 * sums to 100% and nothing can spill outside the row.
 *
 * Touch: two stacked, complete cards. No hover dependency, no hidden content,
 * both fully tappable.
 */
export const TwoWorlds = () => {
  const [active, setActive] = useState(null);
  const canHover = useCanHover();

  return (
    <section className="section" aria-labelledby="two-worlds-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Two Halves, One Studio"
          title="Two ways to keep a moment"
          id="two-worlds-title"
          lede="One side photographs it while it is happening. The other makes sure it does not stay stuck on a hard drive."
          className="mb-8"
        />
      </div>

      {/* ------------------------------------------------- Desktop panels */}
      {canHover ? (
        <div
          className="shell hidden lg:flex lg:gap-5"
          onMouseLeave={() => setActive(null)}
        >
          {WORLDS.map((world) => {
            const isActive = active === world.id;
            const isDimmed = active !== null && !isActive;

            return (
              <Link
                key={world.id}
                to={world.to}
                data-cursor="explore"
                onMouseEnter={() => setActive(world.id)}
                onFocus={() => setActive(world.id)}
                onBlur={() => setActive(null)}
                aria-label={`${world.label} — ${world.cta}`}
                className="group relative min-w-0 overflow-hidden transition-[flex-basis] duration-700 ease-editorial"
                style={{
                  // Basis sums to 100 in every state, so the row can never
                  // overflow its container.
                  flexBasis: isActive ? '58%' : isDimmed ? '42%' : '50%',
                  flexGrow: 0,
                  flexShrink: 1,
                }}
              >
                <OptimizedImage
                  src={world.image}
                  alt={world.alt}
                  aspect="4/3"
                  sizes={SIZES.half}
                  className="w-full"
                  imgClassName={cn(
                    'transition-transform duration-[1100ms] ease-editorial',
                    isActive && 'scale-[1.06]'
                  )}
                />

                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-0 transition-colors duration-700',
                    isDimmed
                      ? 'bg-ink-950/65'
                      : 'bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent'
                  )}
                />

                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-8">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-widest-xl text-champagne-400">
                    {world.label}
                  </span>
                  <span className="font-display text-fluid-4xl leading-none text-ivory-50">
                    {world.action}
                  </span>
                  <span
                    className={cn(
                      'max-w-[42ch] text-fluid-sm text-ivory-200/85 transition-all duration-500 ease-editorial',
                      isActive
                        ? 'max-h-24 opacity-100'
                        : 'max-h-0 overflow-hidden opacity-0'
                    )}
                  >
                    {world.copy}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-widest-xl text-ivory-100">
                    {world.cta}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}

      {/* ------------------------------------------- Touch / small screens */}
      <div className={cn('shell grid gap-6 sm:grid-cols-2', canHover && 'lg:hidden')}>
        {WORLDS.map((world) => (
          <Link
            key={world.id}
            to={world.to}
            className="group flex h-full flex-col"
            aria-label={`${world.label} — ${world.cta}`}
          >
            <OptimizedImage
              src={world.image}
              alt={world.alt}
              aspect="4/3"
              sizes={SIZES.half}
              className="w-full"
              imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.04]"
            />
            <div className="flex flex-1 flex-col gap-3 pt-5">
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
                {world.label}
              </span>
              <span className="font-display text-fluid-3xl leading-none text-ink-900">
                {world.action}
              </span>
              <p className="text-fluid-sm text-ink-400">{world.copy}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[0.64rem] font-semibold uppercase tracking-widest-xl text-ink-900">
                {world.cta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TwoWorlds;
