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
 * An interactive deck of cards, used for both halves of the studio on the
 * landing page — projects and gifts.
 *
 *  Desktop (hover + fine pointer): cards overlap, tilt toward the cursor on
 *    two axes, lift on Z and push their neighbours apart. All spring-driven.
 *  Tablet: a plain two-column grid; the 3D work needs a cursor.
 *  Mobile: a snap-scrolling swipe rail.
 *
 * `cards` is plain data — { key, to, image, alt, eyebrow, title, cta } — and
 * `aspect` is the ratio of the photographs, so each deck crops nothing.
 */

const DeckCard = ({ card, aspect, index, total, hovered, setHovered }) => {
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
          to={card.to}
          onFocus={() => setHovered(index)}
          onBlur={reset}
          className={cn('group block bg-ivory-50', isActive ? 'shadow-lift-lg' : 'shadow-lift')}
          aria-label={`${card.title} — ${card.eyebrow}`}
        >
          <OptimizedImage
            src={card.image}
            alt={card.alt}
            aspect={aspect}
            sizes={SIZES.third}
            className="w-full"
            imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
          />

          <div className="flex flex-col gap-1.5 border-x border-b border-ink-100 bg-ivory-50 px-5 py-4">
            <span className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
              {card.eyebrow}
            </span>
            <span className="clamp-2 font-display text-fluid-xl leading-tight text-ink-900">
              {card.title}
            </span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-widest-xl text-ink-400">
              {card.cta ?? 'View'}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

/** Shared card for the non-deck presentations. */
const PlainCard = ({ card, aspect }) => (
  <Link to={card.to} className="group block w-full max-w-full" aria-label={`${card.title} — ${card.eyebrow}`}>
    <OptimizedImage
      src={card.image}
      alt={card.alt}
      aspect={aspect}
      sizes={SIZES.half}
      className="w-full"
      imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.04]"
    />
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
          {card.eyebrow}
        </span>
        <span className="clamp-2 font-display text-fluid-lg leading-tight text-ink-900">{card.title}</span>
      </div>
      <ArrowUpRight
        className="mt-1 h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.6}
        aria-hidden="true"
      />
    </div>
  </Link>
);

export const CardDeck = ({ cards = [], aspect = '3/2', className }) => {
  const [hovered, setHovered] = useState(null);
  const canHover = useCanHover();
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isTablet = useMediaQuery('(min-width: 640px)');
  const reducedMotion = usePrefersReducedMotion();

  if (cards.length === 0) return null;

  /* ------------------------------------------------------------- Deck -- */
  if (isDesktop && canHover && !reducedMotion) {
    const deck = cards.slice(0, 4);
    return (
      <div
        className={cn('flex w-full max-w-full items-start justify-center px-2 py-4', className)}
        onMouseLeave={() => setHovered(null)}
      >
        {deck.map((card, index) => (
          <div key={card.key} className="w-[min(25%,300px)] min-w-0">
            <DeckCard
              card={card}
              aspect={aspect}
              index={index}
              total={deck.length}
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
      <div className={cn('grid grid-cols-2 gap-6', className)}>
        {cards.slice(0, 4).map((card) => (
          <PlainCard key={card.key} card={card} aspect={aspect} />
        ))}
      </div>
    );
  }

  /* --------------------------------------------- Mobile: swipe rail  -- */
  return (
    <div className={cn('bleed', className)}>
      <div className="rail gap-4 px-[var(--sd-gutter)] pb-2">
        {cards.slice(0, 6).map((card) => (
          <div key={card.key} className="w-[74vw] max-w-[320px] shrink-0">
            <PlainCard card={card} aspect={aspect} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDeck;
