import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useCanHover } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * A CTA that leans slightly toward the cursor.
 *
 * Gated on a real hover-capable pointer AND reduced-motion, so on touch it is
 * simply a Button with no wrapper behaviour at all. The pull is capped at a
 * few pixels — enough to feel responsive, never enough to move the hit target
 * out from under the cursor.
 */
export const MagneticButton = ({ strength = 0.28, maxOffset = 10, children, ...buttonProps }) => {
  const wrapperRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canHover = useCanHover();
  const reducedMotion = usePrefersReducedMotion();

  const enabled = canHover && !reducedMotion;

  const handleMouseMove = (event) => {
    if (!enabled) return;
    const node = wrapperRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);

    setOffset({
      x: Math.max(-maxOffset, Math.min(maxOffset, dx * strength)),
      y: Math.max(-maxOffset, Math.min(maxOffset, dy * strength)),
    });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  if (!enabled) return <Button {...buttonProps}>{children}</Button>;

  return (
    <motion.span
      ref={wrapperRef}
      className="inline-flex max-w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onBlur={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.6 }}
    >
      <Button {...buttonProps}>{children}</Button>
    </motion.span>
  );
};

export default MagneticButton;
