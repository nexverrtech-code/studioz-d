import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSwipe } from '@/hooks/useSwipe';
import { SIZES } from '@/utils/images';
import { pad2 } from '@/utils/format';
import { cn } from '@/utils/cn';
import { siteConfig } from '@/config/site';
import { trackCta } from '@/services/analytics.service';

const SLIDE_MS = 7000;

export const heroSlides = [
  {
    id: 'moments',
    lines: ['Your Moments.', 'Our Frame.'],
    copy: 'Stories aren’t created twice. We capture them while they’re alive.',
    primary: { label: 'Explore Our Work', to: '/works' },
    secondary: { label: 'Let’s Create Yours', to: '/contact' },
    image: '/assets/images/works/studioz-d-pre-wedding-wave-kiss.webp',
    alt: 'Couple in white kissing on rocks as a wave breaks behind them, photographed by Studioz D',
    position: 'center 40%',
  },
  {
    id: 'memories',
    lines: ['Memories', 'Made Personal.'],
    copy: 'Turn meaningful moments into something you can keep, share and gift.',
    primary: { label: 'Explore Gifts', to: '/gifts' },
    secondary: { label: 'See How It Works', to: '/gifts/personalized' },
    image: '/assets/images/works/studioz-d-engagement-floral-arch-embrace.webp',
    alt: 'Engaged couple in front of a floral arch strung with blue fairy lights, photographed by Studioz D',
    position: 'center 50%',
  },
  {
    id: 'more',
    lines: ['More Than', 'A Photograph.'],
    copy: 'Emotion, movement, light and personality — captured the Studioz D way.',
    primary: { label: 'View Photography', to: '/services' },
    secondary: { label: 'Start a Conversation', to: '/contact' },
    image: '/assets/images/works/studioz-d-wedding-bride-silk-saree-window.webp',
    alt: 'Bride in a silk saree standing at a shuttered window in shafts of light, photographed by Studioz D',
    position: 'center 35%',
  },
];

/**
 * Home hero.
 *
 * Desktop: a full-viewport cinematic carousel — image cross-fades with a
 * slow Ken Burns drift, headline words mask up, and a progress rail tracks
 * the slide timer.
 *
 * Mobile: NOT a shrunken overlay. The image sits above the content in a
 * stacked layout, so the headline is always on a clean background and can
 * never land on a face. Swipe changes slides.
 *
 * Autoplay pauses on hover, on focus within, when the tab is hidden, and is
 * off entirely under reduced motion. There is also a visible play/pause
 * control, because an auto-advancing carousel with no way to stop it is an
 * accessibility failure.
 */
export const HomeHero = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const rafRef = useRef(0);
  const startRef = useRef(0);

  const slide = heroSlides[index];
  const total = heroSlides.length;

  const goTo = useCallback((next) => {
    setIndex(((next % total) + total) % total);
    setProgress(0);
    startRef.current = performance.now();
  }, [total]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const swipeHandlers = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });

  // Autoplay + progress on a single rAF loop, so the rail and the advance can
  // never drift apart.
  useEffect(() => {
    if (reducedMotion || paused) return undefined;

    startRef.current = performance.now() - progress * SLIDE_MS;

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const ratio = Math.min(1, elapsed / SLIDE_MS);
      setProgress(ratio);
      if (ratio >= 1) {
        setIndex((current) => (current + 1) % total);
        setProgress(0);
        startRef.current = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // `progress` is intentionally excluded: including it would restart the
    // loop on every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reducedMotion, total, index]);

  // Never animate in a background tab.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const headline = (
    <h1 className="font-display uppercase leading-[0.94] tracking-[0.01em]">
      {slide.lines.map((line, lineIndex) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reducedMotion ? false : { y: '108%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.9,
              delay: reducedMotion ? 0 : 0.1 + lineIndex * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );

  const ctas = (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        to={slide.primary.to}
        onClick={() => trackCta(slide.primary.label, 'hero')}
        className={cn('btn', isDesktop ? 'btn-light' : 'btn-solid')}
      >
        {slide.primary.label}
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
      </Link>
      <Link
        to={slide.secondary.to}
        onClick={() => trackCta(slide.secondary.label, 'hero')}
        className={cn('btn', isDesktop ? 'btn-ghost-light' : 'btn-outline')}
      >
        {slide.secondary.label}
      </Link>
    </div>
  );

  /* ------------------------------------------------------ Slide controls */
  const controls = (tone) => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
        {heroSlides.map((entry, entryIndex) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={entryIndex === index}
            aria-label={`Slide ${entryIndex + 1}: ${entry.lines.join(' ')}`}
            onClick={() => goTo(entryIndex)}
            className="group flex h-10 items-center"
          >
            <span
              className={cn(
                'relative block h-[2px] overflow-hidden transition-all duration-500 ease-editorial',
                entryIndex === index ? 'w-12' : 'w-5',
                tone === 'light' ? 'bg-ivory-100/30' : 'bg-ink-200'
              )}
            >
              {entryIndex === index && (
                <span
                  className={cn(
                    'absolute inset-y-0 left-0 origin-left',
                    tone === 'light' ? 'bg-ivory-100' : 'bg-ink-900'
                  )}
                  style={{ width: `${(reducedMotion ? 1 : progress) * 100}%` }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
          className={cn(
            'flex h-9 w-9 items-center justify-center border transition-colors',
            tone === 'light'
              ? 'border-ivory-100/25 text-ivory-100/70 hover:border-ivory-100/60 hover:text-ivory-100'
              : 'border-ink-200 text-ink-400 hover:border-ink-900 hover:text-ink-900'
          )}
        >
          {paused ? (
            <Play className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Pause className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          )}
        </button>
      )}

      <span
        className={cn(
          'text-[0.68rem] tabular-nums tracking-widest-xl',
          tone === 'light' ? 'text-ivory-100/60' : 'text-ink-300'
        )}
      >
        {pad2(index + 1)} / {pad2(total)}
      </span>
    </div>
  );

  /* ------------------------------------------------------------ Desktop */
  if (isDesktop) {
    return (
      <section
        className="bleed relative h-svh min-h-[620px] overflow-hidden bg-ink-900"
        aria-roledescription="carousel"
        aria-label="Studioz D introduction"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reducedMotion ? false : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 9, ease: 'linear' }}
            >
              <OptimizedImage
                src={slide.image}
                alt={slide.alt}
                sizes={SIZES.full}
                // The only eagerly-loaded image on the page — it is the LCP.
                priority={index === 0}
                objectPosition={slide.position}
                className="h-full w-full"
                imgClassName="h-full w-full"
                style={{ aspectRatio: 'auto' }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Scrim tuned so the headline clears WCAG contrast without burying
            the photograph. */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/45 to-ink-950/15"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 to-transparent"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col pt-header">
          <div className="shell flex flex-1 items-center">
            <div className="flex max-w-[46rem] flex-col gap-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  className="flex flex-col gap-7"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.4 }}
                >
                  <p className="eyebrow text-champagne-400">
                    {siteConfig.promise.capture} {siteConfig.promise.create}
                  </p>

                  <div className="text-[clamp(2.6rem,1.4rem+4.4vw,5.4rem)] text-ivory-50">
                    {headline}
                  </div>

                  <p className="max-w-[38ch] text-fluid-lg text-ivory-200/85">{slide.copy}</p>

                  {ctas}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="shell flex items-center justify-between gap-6 pb-10">
            {controls('light')}

            <div className="hidden items-center gap-3 xl:flex">
              <span className="text-[0.62rem] uppercase tracking-widest-xl text-ivory-100/50">
                Scroll
              </span>
              <span className="block h-10 w-px bg-ivory-100/20" aria-hidden="true">
                <span className="sd-scroll-cue block h-full w-px bg-ivory-100" />
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------- Mobile & tablet (stacked) */
  return (
    <section
      className="bleed pt-header"
      aria-roledescription="carousel"
      aria-label="Studioz D introduction"
      {...swipeHandlers}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
        >
          <div className="relative">
            <OptimizedImage
              src={slide.image}
              alt={slide.alt}
              aspect="4/5"
              sizes={SIZES.full}
              priority={index === 0}
              objectPosition={slide.position}
              className="w-full"
            />
            {/* Category tag sits in a corner rather than over the subject. */}
            <span className="absolute left-4 top-4 bg-ivory-50/95 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-widest-xl text-ink-800 backdrop-blur-sm">
              {siteConfig.promise.capture}
            </span>
          </div>

          <div className="shell flex flex-col gap-5 py-8">
            <div className="text-[clamp(2rem,1.3rem+3.4vw,3.2rem)] text-ink-900">{headline}</div>
            <p className="text-fluid-base text-ink-500">{slide.copy}</p>
            {ctas}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="shell flex items-center justify-between gap-4 pb-8">
        {controls('dark')}
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center border border-ink-200 text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default HomeHero;
