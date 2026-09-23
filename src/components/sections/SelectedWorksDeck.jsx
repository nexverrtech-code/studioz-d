import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { useCanHover, useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Selected Works — three presentations of the same data.
 *
 *  Desktop (hover + fine pointer): an interactive deck. Cards overlap, tilt
 *    toward the cursor on two axes, lift on Z, and push their neighbours
 *    apart. All spring-driven.
 *  Tablet: a plain two-column grid. The 3D work is dropped entirely — it
 *    depends on a cursor that is not there.
 *  Mobile: a snap-scrolling swipe rail.
 *
 * Every card is a real `<Link>` in all three modes, so keyboard and
 * screen-reader users get identical behaviour regardless of the visuals.
 */

const DeckCard = ({ work, index, total, hovered, setHovered }) => {
  const cardRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  // Pointer position within the card, normalised to -0.5 … 0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springConfig = { stiffness: 190, damping: 20, mass: 0.7 };
  const sx = useSpring(px, springConfig);
  const sy = useSpring(py, springConfig);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-11, 11]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);

  const isActive = hovered === index;
  const isIdle = hovered === null;

  // Neighbours slide away from the active card so it has room to lift.
  const distance = isIdle ? 0 : index - hovered;
  const push = isIdle || isActive ? 0 : Math.sign(distance) * Math.max(0, 46 - Math.abs(distance) * 12);

  // A gentle arc at rest, so the deck reads as a deck rather than a row.
  const restTilt = (index - (total - 1) / 2) * 1.6;

  const handleMouseMove = (event) => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
    setHovered(null);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      style={{
        // Overlap: every card after the first pulls back over its neighbour.
        marginLeft: index === 0 ? 0 : 'clamp(-4rem, -3vw, -2rem)',
        zIndex: isActive ? total + 1 : index,
        perspective: 1200,
      }}
      animate={{
        x: push,
        y: isActive ? -18 : 0,
        scale: isActive ? 1.045 : isIdle ? 1 : 0.975,
      }}
      transition={{ type: 'spring', stiffness: 210, damping: 24, mass: 0.7 }}
      onMouseEnter={() => setHovered(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      <motion.div
        style={
          reducedMotion
            ? undefined
            : { rotateX, rotateY, rotateZ: isActive ? 0 : restTilt, transformStyle: 'preserve-3d' }
        }
        className="transition-shadow duration-500 ease-editorial"
      >
        <Link
          to={`/works/${work.slug}`}
          data-cursor="story"
          onFocus={() => setHovered(index)}
          onBlur={reset}
          className={cn(
            'group block bg-ivory-50',
            isActive ? 'shadow-lift-lg' : 'shadow-lift'
          )}
          aria-label={`Open ${work.title} — ${work.category}`}
        >
          <OptimizedImage
            src={work.coverImage}
            alt={`${work.title} — ${work.category} photography by Studioz D`}
            aspect="3/4"
            sizes={SIZES.third}
            className="w-full"
            imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
          />

          <div className="flex items-start justify-between gap-4 border-x border-b border-ink-100 bg-ivory-50 px-5 py-5">
            <div className="flex min-w-0 flex-col gap-1.5">
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
                {work.category}
              </span>
              <span className="clamp-2 font-display text-fluid-xl leading-tight text-ink-900">
                {work.title}
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-widest-xl text-ink-400">
                View Story
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

/** Shared card for the non-deck presentations. */
const PlainCard = ({ work, className }) => (
  <Link
    to={`/works/${work.slug}`}
    data-cursor="story"
    className={cn('group block w-full max-w-full', className)}
    aria-label={`Open ${work.title} — ${work.category}`}
  >
    <OptimizedImage
      src={work.coverImage}
      alt={`${work.title} — ${work.category} photography by Studioz D`}
      aspect="3/4"
      sizes={SIZES.half}
      className="w-full"
      imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.04]"
    />
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
          {work.category}
        </span>
        <span className="clamp-2 font-display text-fluid-xl leading-tight text-ink-900">
          {work.title}
        </span>
      </div>
      <ArrowUpRight
        className="mt-1 h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.6}
        aria-hidden="true"
      />
    </div>
  </Link>
);

export const SelectedWorksDeck = ({ works = [], className }) => {
  const [hovered, setHovered] = useState(null);
  const canHover = useCanHover();
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isTablet = useMediaQuery('(min-width: 640px)');
  const reducedMotion = usePrefersReducedMotion();

  if (works.length === 0) return null;

  const deckItems = works.slice(0, 4);

  /* ------------------------------------------------------------- Deck -- */
  if (isDesktop && canHover && !reducedMotion) {
    return (
      <div
        className={cn('flex w-full max-w-full items-start justify-center px-2 py-6', className)}
        onMouseLeave={() => setHovered(null)}
      >
        {deckItems.map((work, index) => (
          <div key={work.slug} className="w-[min(25%,300px)] min-w-0">
            <DeckCard
              work={work}
              index={index}
              total={deckItems.length}
              hovered={hovered}
              setHovered={setHovered}
            />
          </div>
        ))}
      </div>
    );
  }

  /* ---------------------------------------------------- Tablet: 2-col -- */
  if (isTablet) {
    return (
      <div className={cn('grid grid-cols-2 gap-6 lg:gap-8', className)}>
        {works.slice(0, 4).map((work) => (
          <PlainCard key={work.slug} work={work} />
        ))}
      </div>
    );
  }

  /* --------------------------------------------- Mobile: swipe rail  -- */
  return (
    <div className={cn('bleed', className)}>
      <div className="rail gap-4 px-[var(--sd-gutter)] pb-2">
        {works.slice(0, 6).map((work) => (
          <div key={work.slug} className="w-[74vw] max-w-[320px] shrink-0">
            <PlainCard work={work} />
          </div>
        ))}
      </div>
      <p className="shell mt-2 text-[0.62rem] uppercase tracking-widest-xl text-ink-300">
        Swipe for more
      </p>
    </div>
  );
};

export default SelectedWorksDeck;
