import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

/**
 * Scroll reveal.
 *
 * Only opacity and transform animate, so a reveal can never cause layout
 * shift. Under reduced motion the element renders plainly — visible, in
 * place, with no transition at all.
 */
const VARIANTS = {
  up: { hidden: { opacity: 0, y: 26 }, shown: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -22 }, shown: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 32 }, shown: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -32 }, shown: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, shown: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.97 }, shown: { opacity: 1, scale: 1 } },
};

export const Reveal = ({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.72,
  amount = 0.25,
  once = true,
  className,
  ...rest
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (reducedMotion) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount }}
      variants={VARIANTS[direction] ?? VARIANTS.up}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
};

/**
 * Staggers direct children. Use for card grids and lists — the delay is
 * applied by the parent so children stay simple.
 */
export const RevealGroup = ({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.18,
  once = true,
  ...rest
}) => {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/** Child of `RevealGroup`. Inherits the parent's stagger timing. */
export const RevealItem = ({ children, className, direction = 'up', as = 'div', ...rest }) => {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (reducedMotion) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Component
      className={className}
      variants={VARIANTS[direction] ?? VARIANTS.up}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
};

/**
 * Word-by-word headline reveal.
 *
 * Words are wrapped in an overflow-hidden span and slid up from beneath it,
 * which reads as a mask rather than a fade. Whitespace is preserved with real
 * spaces so the text still selects and copies correctly.
 */
export const RevealText = ({
  text,
  className,
  as: Tag = 'span',
  delay = 0,
  stagger = 0.045,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const words = String(text).split(' ');

  if (reducedMotion) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={cn('inline', className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className="inline-block overflow-hidden align-bottom"
            // Extra room below the baseline stops descenders (g, y, p) being
            // clipped by the mask.
            style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.82,
                delay: delay + index * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
};

export default Reveal;
