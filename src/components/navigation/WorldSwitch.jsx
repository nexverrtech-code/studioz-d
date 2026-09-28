import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { worldSwitch } from '@/data/navigation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn';

/**
 * The two-world switch.
 *
 * Studioz D is one brand with two businesses, and this is the only control
 * that says so on every page: which half you are in, and one step to the
 * other. A solid block sits behind the current world and slides across when
 * you change sides — it is the same element moving, not two states swapping,
 * so the change reads as travel rather than as a reload.
 *
 * On shared pages (home, contact, FAQ, legal) neither side is current and
 * there is no block: the switch simply offers both.
 *
 * Square, not a pill. Everything else on the site is cut square, and a
 * rounded toggle would read as borrowed from an app.
 *
 * `aria-current="true"` marks the current WORLD, which is not necessarily the
 * current page — /works belongs to photography without being /services — so
 * it is the set-membership value rather than `"page"`.
 */
export const WorldSwitch = ({
  world,
  tone = 'dark',
  onSegmentHover,
  className,
  // Each rendered switch needs its own id, or two switches on one screen
  // would animate a single shared block between them.
  layoutId = 'world-switch-block',
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const light = tone === 'light';

  return (
    <ul
      className={cn(
        'relative inline-flex shrink-0 items-stretch border transition-colors duration-300',
        light ? 'border-ivory-100/30' : 'border-ink-200',
        className
      )}
    >
      {worldSwitch.map((item, index) => {
        const current = world === item.id;

        return (
          <li
            key={item.id}
            className={cn(
              'relative flex',
              index > 0 && (light ? 'border-l border-ivory-100/30' : 'border-l border-ink-200')
            )}
          >
            {current && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className={cn('absolute inset-0', light ? 'bg-ivory-50' : 'bg-ink-900')}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 420, damping: 40, mass: 0.9 }
                }
              />
            )}

            <Link
              to={item.to}
              aria-current={current ? 'true' : undefined}
              onMouseEnter={() => onSegmentHover?.(item.to)}
              onFocus={() => onSegmentHover?.(item.to)}
              className={cn(
                'relative flex h-9 items-center px-4 text-[0.64rem] font-semibold uppercase tracking-widest-xl transition-colors duration-300',
                current
                  ? light
                    ? 'text-ink-900'
                    : 'text-ivory-50'
                  : light
                    ? 'text-ivory-100/75 hover:text-ivory-50'
                    : 'text-ink-500 hover:text-ink-900'
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default WorldSwitch;
