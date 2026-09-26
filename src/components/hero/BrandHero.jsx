import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useSectionProgress } from '@/hooks/useSectionProgress';
import { cn } from '@/utils/cn';
import { trackCta } from '@/services/analytics.service';

/**
 * Landing hero — "it doesn't stop at the photograph".
 *
 * The hero is not a layout, it is a single move.
 *
 * You arrive on a full-bleed photograph: exactly what a photography studio's
 * landing page looks like. Then, as you scroll, the photograph pulls back. A
 * mat and a frame assemble around it, the black falls away to a lit wall, and
 * a shadow settles underneath. The thing you arrived at as an image is now an
 * object hanging on a wall.
 *
 * That one gesture is the whole business — photograph the moment, then make it
 * into something you keep — stated as an action rather than as two panels with
 * a caption each. Both halves are in the hero at all times; which one you are
 * looking at is a function of how far you have scrolled.
 *
 * WHY IT SCALES DOWN AND NOT UP
 * -----------------------------
 * The artwork is laid out at its LARGEST size and scaled down to its final
 * size. Browsers rasterise at the pre-transform size, so scaling a small box up
 * would show a soft, upscaled photograph for the whole animation. Scaling a
 * large box down stays sharp at every frame. The frame and mat are sized in rem
 * against that large layout, which is why the numbers look oversized here — at
 * the end scale they land at roughly 14px and 10px.
 *
 * Under `prefers-reduced-motion` the section collapses to the end state: the
 * framed print on the wall, with the same words. No pinning, no scroll scene.
 */

const PHOTO = {
  src: '/assets/images/works/studioz-d-pre-wedding-sunset-lift-silhouette.webp',
  alt: 'Couple silhouetted against a sunset as he lifts her off the ground, photographed by Studioz D',
  position: 'center 45%',
};

const FACETS = ['Weddings', 'Portraits', 'Films', 'Frames', 'Engraving', 'Hampers'];

/** Largest sensible width for the framed print once it has settled. */
const END_WIDTH = (viewportWidth) => Math.min(viewportWidth * 0.62, 360);

/** The headline, shared by the scroll scene and the reduced-motion fallback. */
const Headline = ({ as: Tag = 'h1', tone, animate = true, reducedMotion }) => {
  const lines = [
    ['Capture the', 'moment.'],
    ['Create the', 'memory.'],
  ];

  return (
    <Tag
      className={cn(
        'font-display uppercase leading-[0.95] tracking-[0.01em]',
        'text-[clamp(2.2rem,1.4rem+3.2vw,4.2rem)]',
        tone === 'light' ? 'text-ivory-50' : 'text-ink-900'
      )}
    >
      {lines.map(([lead, accent], index) => (
        <span key={accent} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={!animate || reducedMotion ? false : { y: '106%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.95,
              delay: reducedMotion ? 0 : 0.1 + index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {lead}{' '}
            <span
              className={cn(
                'italic lowercase',
                tone === 'light' ? 'text-champagne-300' : 'text-champagne-600'
              )}
            >
              {accent}
            </span>
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/** Small uppercase signposts. Rendered on both surfaces, so it takes a tone. */
const Facets = ({ tone }) => (
  <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
    {FACETS.map((facet, index) => (
      <li key={facet} className="flex items-center gap-3">
        {index > 0 && (
          <span
            aria-hidden="true"
            className={cn('h-px w-4 shrink-0', tone === 'light' ? 'bg-ivory-100/30' : 'bg-ink-200')}
          />
        )}
        <span
          className={cn(
            'text-[0.62rem] uppercase tracking-widest',
            tone === 'light' ? 'text-ivory-200/70' : 'text-ink-400'
          )}
        >
          {facet}
        </span>
      </li>
    ))}
  </ul>
);

/**
 * The framed print, minus the animation. Both branches render this.
 *
 * `photoClass` sizes the PHOTOGRAPH, not the frame. That matters: the frame's
 * border and mat add roughly 200px at the arrival scale, so sizing the outer
 * element to the viewport would leave the photograph short of the edges and
 * the mat visible from the first frame — which gives the ending away.
 */
const FramedArtwork = ({ artRef, frameClass, photoClass = 'w-full' }) => (
  <div className={cn('relative border-ink-800 bg-ivory-50 shadow-lift-lg', frameClass)}>
    <div ref={artRef} className={photoClass}>
      <OptimizedImage
        src={PHOTO.src}
        alt={PHOTO.alt}
        aspect="4/5"
        sizes="100vw"
        // The hero photograph is the LCP element on the landing page.
        priority
        objectPosition={PHOTO.position}
        className="w-full"
      />
    </div>
  </div>
);

/** Caption under the settled print. States what just happened. */
const EndCaption = () => (
  <div className="flex flex-col items-center gap-5 text-center">
    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.6rem] font-semibold uppercase tracking-widest-xl text-ink-400">
      <span className="text-champagne-700">01</span>
      Photographed
      <span className="h-px w-5 bg-ink-200" aria-hidden="true" />
      <span className="text-champagne-700">02</span>
      Made into something you keep
    </p>

    <p className="max-w-[46ch] text-fluid-base leading-relaxed text-ink-500">
      One studio, two halves. We photograph the moment, then make it into something
      you can hold.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      <Link
        to="/services"
        onClick={() => trackCta('Explore Photography', 'brand-hero')}
        className="link-underline inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-widest-xl text-ink-900"
      >
        Photography
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
      </Link>
      <span className="h-3 w-px bg-ink-200" aria-hidden="true" />
      <Link
        to="/gifts"
        onClick={() => trackCta('Explore Gifts', 'brand-hero')}
        className="link-underline inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-widest-xl text-ink-900"
      >
        Customized Gifts
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </div>
  </div>
);

export const BrandHero = () => {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const artRef = useRef(null);

  /**
   * How far the artwork has to shrink. Derived from the laid-out width rather
   * than hard-coded, because that width is itself viewport-relative.
   */
  const [endScale, setEndScale] = useState(0.26);
  const [endY, setEndY] = useState(-90);

  const measure = useCallback(() => {
    const node = artRef.current;
    // `offsetWidth` is the layout width, unaffected by the transform above it.
    if (!node?.offsetWidth) return;
    setEndScale(END_WIDTH(window.innerWidth) / node.offsetWidth);
    setEndY(-Math.round(window.innerHeight * 0.11));
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  /* 0 while the section's top is at the top of the viewport, 1 once its
     bottom is — i.e. exactly the window in which the child stays pinned. */
  const scrollYProgress = useSectionProgress(sectionRef);

  /* The move itself. Everything below is driven by this one progress value. */
  const scale = useTransform(scrollYProgress, [0, 0.78], [1, endScale]);
  const y = useTransform(scrollYProgress, [0, 0.78], [0, endY]);
  const wall = useTransform(scrollYProgress, [0.12, 0.52], ['#0B0908', '#EFE7DB']);
  const glow = useTransform(scrollYProgress, [0.35, 0.75], [0, 1]);

  /*
   * The two type blocks never overlap. The opening block is gone by 0.28 and
   * the closing one does not begin until 0.58, so neither is ever asked to
   * hold contrast against a background that is halfway between ink and ivory.
   */
  const openOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0]);
  const openY = useTransform(scrollYProgress, [0, 0.24], [0, -28]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const endOpacity = useTransform(scrollYProgress, [0.58, 0.86], [0, 1]);
  const endShift = useTransform(scrollYProgress, [0.58, 0.86], [22, 0]);
  /* The closing block holds real links. While it is transparent it must also
     be untouchable, or a click on the photograph would open a page. */
  const endPointer = useTransform(scrollYProgress, (value) => (value > 0.62 ? 'auto' : 'none'));

  /* ------------------------------------------------- Reduced motion ---- */
  if (reducedMotion) {
    return (
      <section
        className="bleed bg-[#EFE7DB] pt-header"
        aria-label="Studioz D — photography and personalized creations"
      >
        <div className="shell flex flex-col items-center gap-9 py-14">
          <FramedArtwork
            frameClass="border-[0.85rem] p-[0.7rem]"
            photoClass="w-[min(62vw,22.5rem)]"
          />
          <Headline tone="dark" animate={false} reducedMotion />
          <EndCaption />
        </div>
      </section>
    );
  }

  /* ------------------------------------------------- The scroll scene -- */
  return (
    <section
      ref={sectionRef}
      // One screen of arrival, then ~0.65 of a screen of transformation.
      className="bleed relative h-[165svh]"
      aria-label="Studioz D — photography and personalized creations"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {/* The wall the print ends up on. Black at first, so the arrival
            reads as a photograph rather than as a room. */}
        <motion.div className="absolute inset-0" style={{ backgroundColor: wall }} />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            opacity: glow,
            background:
              'radial-gradient(70% 55% at 50% 38%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/*
          Laid out large, scaled down. The frame and mat are sized against that
          large layout — at the settled scale they resolve to a normal frame.
        */}
        {/* `shrink-0`: the artwork is deliberately wider than the flex line it
            sits on, and a shrunk frame would squeeze the photograph out of it. */}
        <motion.div style={{ scale, y }} className="relative shrink-0 will-change-transform">
          <FramedArtwork
            artRef={artRef}
            frameClass="border-[3.6rem] p-[2.6rem]"
            /* 4:5, so height is 1.25x this. Covers any viewport up to 1.25:1. */
            photoClass="w-[max(104vw,84vh)]"
          />
        </motion.div>

        {/* ---- Arrival: the photograph, with the studio's statement ---- */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ opacity: openOpacity, y: openY }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[24rem] bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent"
          />
          <div className="shell relative flex flex-col gap-6 pb-12">
            <span className="h-px w-full bg-ivory-100/25" aria-hidden="true" />
            <Headline tone="light" />
            <Facets tone="light" />
          </div>
        </motion.div>

        {/* ---- Settled: the object, and the way into either half ------- */}
        <motion.div
          className="absolute inset-x-0 bottom-0"
          style={{ opacity: endOpacity, y: endShift, pointerEvents: endPointer }}
        >
          <div className="shell flex justify-center pb-[clamp(2rem,7vh,4.5rem)]">
            <EndCaption />
          </div>
        </motion.div>

        <motion.span
          className="pointer-events-none absolute bottom-5 right-gutter hidden flex-col items-center gap-2 text-ivory-100/50 xl:flex"
          style={{ opacity: cueOpacity }}
          aria-hidden="true"
        >
          <span className="text-[0.6rem] uppercase tracking-widest-xl">Scroll</span>
          <ArrowDown className="h-4 w-4 sd-scroll-cue" strokeWidth={1.5} />
        </motion.span>
      </div>
    </section>
  );
};

export default BrandHero;
