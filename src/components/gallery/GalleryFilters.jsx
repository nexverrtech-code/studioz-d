import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Category filter bar.
 *
 * Desktop  → chips wrap onto multiple rows
 * Mobile   → a single horizontally-scrolling rail
 *
 * The rail is the important detail: `overflow-x: auto` lives on THIS
 * container, so only the chips scroll. The page itself never gains a
 * horizontal scrollbar, which is the usual failure mode of scrolling filter
 * bars.
 *
 * Edge-to-edge on mobile uses padding rather than negative margins, so the
 * container can never be wider than its parent.
 */
export const GalleryFilters = ({
  categories = [],
  active = 'all',
  onChange,
  counts = {},
  className,
  label = 'Filter by category',
}) => {
  const railRef = useRef(null);
  const activeRef = useRef(null);

  // Keep the selected chip in view when the filter changes from elsewhere
  // (a category route, say). `nearest` prevents an unwanted vertical jump.
  useEffect(() => {
    const node = activeRef.current;
    if (!node || !railRef.current) return;
    node.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  return (
    <div className={cn('w-full max-w-full', className)}>
      <div
        ref={railRef}
        role="group"
        aria-label={label}
        className={cn(
          'flex gap-2 overflow-x-auto pb-1',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'overscroll-x-contain',
          // Wrap once there is room; scroll when there is not.
          'lg:flex-wrap lg:overflow-visible lg:pb-0'
        )}
      >
        {categories.map((category) => {
          const isActive = category.id === active;
          const count = counts[category.id];

          return (
            <button
              key={category.id}
              ref={isActive ? activeRef : null}
              type="button"
              onClick={() => onChange(category.id)}
              aria-pressed={isActive}
              className="chip shrink-0"
            >
              {category.label}
              {typeof count === 'number' && (
                <span
                  className={cn(
                    'ml-1 text-[0.62rem] tabular-nums',
                    isActive ? 'text-ivory-100/60' : 'text-ink-300'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryFilters;
