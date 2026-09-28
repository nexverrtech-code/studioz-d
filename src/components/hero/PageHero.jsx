import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Reveal, RevealText } from '@/components/motion/Reveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Interior page hero.
 *
 * Built as a measured editorial plate rather than a banner: a drawn hairline
 * frame, a vertical index rail, a masked headline with one accented word, and
 * — where the page has imagery — an offset two-image cluster that overlaps the
 * type column instead of sitting behind it.
 *
 * LAYOUTS
 * -------
 * `split`      type column + image cluster. The default whenever media exists.
 *              Every image keeps its own aspect ratio, so near-square product
 *              photography is never forced into a letterbox.
 * `immersive`  one wide photograph behind the type, for pages where the
 *              photograph itself is the subject. Only use with landscape
 *              imagery — a square photo in a wide band loses most of itself.
 * `plain`      type only, on the ivory surface.
 *
 * WHY THE LAYOUT PICKS THE RATIO, NOT THE OTHER WAY ROUND
 * -------------------------------------------------------
 * `OptimizedImage` always covers its box, so an image can never be stretched —
 * but it can be cropped. `split` exists so that images whose natural shape is
 * square or portrait (all of the supplied gift photography) get a box that
 * matches, instead of being cropped to a 3:1 banner.
 */

/** Splits a title so one phrase can be set in accented display italic. */
const splitAccent = (title, accent) => {
  if (!accent) return [title, null, null];
  const index = title.toLowerCase().indexOf(String(accent).toLowerCase());
  if (index < 0) return [title, null, null];
  return [
    title.slice(0, index).trimEnd(),
    title.slice(index, index + accent.length),
    title.slice(index + accent.length).trimStart(),
  ];
};

/** Vertical index rail. Hidden below `lg`, where there is no room for it. */
const Rail = ({ label, index, light }) => (
  <div className="relative hidden shrink-0 lg:flex lg:w-14 lg:flex-col lg:items-center lg:gap-4">
    {index && (
      <span
        className={cn(
          'font-display text-fluid-lg leading-none',
          light ? 'text-champagne-400' : 'text-champagne-600'
        )}
      >
        {index}
      </span>
    )}

    <motion.span
      aria-hidden="true"
      className={cn('w-px flex-1 origin-top', light ? 'bg-ivory-100/25' : 'bg-ink-200')}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
    />

    {label && (
      <span
        className={cn(
          'text-[0.58rem] font-semibold uppercase tracking-widest-2xl',
          light ? 'text-ivory-200/60' : 'text-ink-300'
        )}
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        {label}
      </span>
    )}
  </div>
);

/** Hairline that draws itself in from the left on mount. */
const DrawnRule = ({ light, className, delay = 0 }) => (
  <motion.span
    aria-hidden="true"
    className={cn(
      'block h-px w-full origin-left',
      light ? 'bg-ivory-100/25' : 'bg-ink-200',
      className
    )}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
  />
);

/**
 * Facet strip — a signpost for what the page contains. Wraps rather than
 * scrolls, so it can never introduce horizontal overflow.
 */
const Facets = ({ items, light }) => (
  <Reveal direction="fade" delay={0.28} className="w-full">
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {items.map((facet, index) => (
        <li key={facet} className="flex min-w-0 items-center gap-3">
          {index > 0 && (
            <span
              aria-hidden="true"
              className={cn('h-px w-4 shrink-0', light ? 'bg-ivory-100/30' : 'bg-ink-200')}
            />
          )}
          <span
            className={cn(
              'text-[0.62rem] uppercase tracking-widest',
              light ? 'text-ivory-200/70' : 'text-ink-400'
            )}
          >
            {facet}
          </span>
        </li>
      ))}
    </ul>
  </Reveal>
);

/**
 * Offset image cluster.
 *
 * The lead image sits in its own natural ratio; a second, smaller image
 * overlaps its lower-left corner. On touch and small screens the pair becomes
 * a simple two-column row, because an overlap at 360px is just a collision.
 */
const MediaCluster = ({ media, parallax, reducedMotion }) => {
  const [lead, second] = media;

  return (
    <div className="relative w-full min-w-0 self-center">
      <motion.div
        className="relative"
        style={reducedMotion ? undefined : { y: parallax.lead }}
      >
        <OptimizedImage
          src={lead.src}
          alt={lead.alt ?? ''}
          width={lead.width}
          height={lead.height}
          aspect={lead.aspect ?? '4/5'}
          objectPosition={lead.position ?? 'center'}
          sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 38vw, 100vw"
          priority
          className="w-full bg-ivory-200"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 -right-2 h-16 w-16 border-b border-r border-champagne-500/60 sm:-bottom-3 sm:-right-3 sm:h-20 sm:w-20"
        />
      </motion.div>

      {second && (
        <motion.div
          className={cn(
            'relative z-raised mt-3 w-[62%] max-w-[15rem] shadow-lift',
            // Only overlap where there is room for it to read as design.
            'sm:absolute sm:-bottom-10 sm:-left-8 sm:mt-0 sm:w-[46%] lg:-left-10 lg:-bottom-12'
          )}
          style={reducedMotion ? undefined : { y: parallax.second }}
        >
          <OptimizedImage
            src={second.src}
            alt={second.alt ?? ''}
            width={second.width}
            height={second.height}
            aspect={second.aspect ?? '1/1'}
            objectPosition={second.position ?? 'center'}
            sizes="(min-width: 1024px) 18vw, 40vw"
            className="w-full border-[6px] border-ivory-50 bg-ivory-200"
          />
        </motion.div>
      )}
    </div>
  );
};

export const PageHero = ({
  eyebrow,
  title,
  lede,
  /** Legacy single-image prop. Becomes the lead of `media` when given. */
  image,
  imageAlt = '',
  /** [{ src, alt, aspect, width, height, position }] — up to two are used. */
  media,
  /**
   * Immersive only: { src, alt, position } shown below 640px, where the
   * backdrop is a 2:3 portrait box. Pass a portrait photograph so phones get a
   * whole frame instead of the middle third of a landscape one.
   */
  imageTall,
  /** `split` | `immersive` | `plain`. Inferred when omitted. */
  layout,
  /** Legacy alias: `variant="image"` meant a full-bleed photograph. */
  variant,
  /** Phrase inside `title` to set in accented display italic. */
  accent,
  /** Short signpost words rendered under the lede. */
  facets,
  /** Vertical rail label + numeral, e.g. "Gifts" / "02". */
  railLabel,
  railIndex,
  breadcrumbs,
  align = 'left',
  children,
  className,
  minHeight = '42svh',
}) => {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const isPhone = useMediaQuery('(max-width: 639px)');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const leadY = useTransform(scrollYProgress, [0, 1], ['0%', '-9%']);
  const secondY = useTransform(scrollYProgress, [0, 1], ['0%', '7%']);
  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const list = (media ?? (image ? [{ src: image, alt: imageAlt }] : [])).filter(Boolean);

  const resolved =
    layout ??
    (variant === 'image' && list.length > 0
      ? 'immersive'
      : list.length > 0
        ? 'split'
        : 'plain');

  const isImmersive = resolved === 'immersive' && list.length > 0;
  const backdrop = isPhone && imageTall ? imageTall : list[0];
  const isSplit = resolved === 'split' && list.length > 0;
  const light = isImmersive;
  const centered = align === 'center';

  const [before, accented, after] = splitAccent(title, accent);

  return (
    <section
      ref={sectionRef}
      data-hero={resolved}
      className={cn(
        'bleed relative isolate overflow-hidden pt-header',
        isImmersive ? 'bg-ink-900' : 'bg-ivory-50',
        className
      )}
    >
      {isImmersive && (
        <>
          <motion.div
            className="absolute inset-x-0 -top-[8%] bottom-[-8%]"
            style={reducedMotion ? undefined : { y: backdropY }}
          >
            <OptimizedImage
              key={backdrop.src}
              src={backdrop.src}
              alt={backdrop.alt ?? imageAlt}
              sizes={SIZES.full}
              objectPosition={backdrop.position ?? 'center'}
              priority
              className="h-full w-full"
              imgClassName="h-full w-full"
              style={{ aspectRatio: 'auto' }}
            />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/55 to-ink-950/25"
          />
          {/* A second, horizontal wash keeps the left-aligned type legible
              over a busy photograph without dimming the whole frame. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ink-950/55 via-transparent to-transparent"
          />
        </>
      )}

      <div className="shell relative z-base">
        <DrawnRule light={light} className="mt-4" />

        <div
          className={cn(
            'flex gap-8 pb-10 pt-7 lg:gap-12',
            isSplit ? 'flex-col lg:flex-row lg:items-stretch lg:pb-16 lg:pt-10' : 'flex-col'
          )}
          style={{ minHeight: isImmersive ? minHeight : undefined }}
        >
          <Rail label={railLabel ?? eyebrow} index={railIndex} light={light} />

          <div
            className={cn(
              'flex min-w-0 flex-1 flex-col justify-end gap-5',
              isSplit && 'lg:max-w-[46rem] lg:justify-center',
              centered && 'items-center text-center'
            )}
          >
            {breadcrumbs && (
              <Breadcrumbs trail={breadcrumbs} tone={light ? 'light' : 'dark'} className="mb-1" />
            )}

            {eyebrow && (
              <Reveal direction="fade" duration={0.5}>
                <p className={cn('eyebrow flex items-center gap-3', light && 'text-champagne-400')}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-px w-8 shrink-0',
                      light ? 'bg-champagne-400/50' : 'bg-ink-300'
                    )}
                  />
                  {eyebrow}
                </p>
              </Reveal>
            )}

            <h1
              className={cn(
                'font-display uppercase leading-[0.94] tracking-[0.01em]',
                'text-[clamp(2.1rem,1.35rem+3.4vw,4.6rem)]',
                light ? 'text-ivory-50' : 'text-ink-900',
                centered ? 'max-w-[20ch]' : 'max-w-[17ch]'
              )}
            >
              {accented ? (
                <>
                  {before && (
                    <>
                      <RevealText text={before} />{' '}
                    </>
                  )}
                  <span
                    className={cn(
                      'italic lowercase',
                      light ? 'text-champagne-300' : 'text-champagne-600'
                    )}
                  >
                    <RevealText text={accented} delay={0.06} />
                  </span>
                  {after && (
                    <>
                      {/* No space before a closing full stop or comma. */}
                      {/^[.,;:!?)\]]/.test(after) ? '' : ' '}
                      <RevealText text={after} delay={0.12} />
                    </>
                  )}
                </>
              ) : (
                <RevealText text={title} />
              )}
            </h1>

            {lede && (
              <Reveal direction="up" delay={0.14}>
                <p className={cn('lede', light && 'text-ivory-200/85', centered && 'mx-auto')}>
                  {lede}
                </p>
              </Reveal>
            )}

            {children && (
              <Reveal direction="up" delay={0.2} className="mt-1">
                {children}
              </Reveal>
            )}

            {facets?.length > 0 && (
              <div className="mt-2 flex flex-col gap-4">
                <DrawnRule light={light} delay={0.3} />
                <Facets items={facets} light={light} />
              </div>
            )}
          </div>

          {isSplit && (
            <div className="w-full min-w-0 shrink-0 lg:w-[clamp(19rem,32%,27rem)]">
              <MediaCluster
                media={list.slice(0, 2)}
                parallax={{ lead: leadY, second: secondY }}
                reducedMotion={reducedMotion}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
