import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { cn } from '@/utils/cn';

/**
 * Numbered process steps.
 *
 * Desktop: a connected row, with a single hairline running behind the numbers
 * rather than per-item borders (which produce double lines at the joins).
 * Mobile: a vertical list with the rule down the left.
 */
export const ProcessSteps = ({ steps = [], tone = 'light', columns = 5, className }) => {
  const isDark = tone === 'dark';

  const gridColumns =
    {
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-3 xl:grid-cols-6',
    }[columns] ?? 'lg:grid-cols-5';

  return (
    <div className={cn('relative', className)}>
      {/* Connector — desktop only, behind the content. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-0 right-0 top-[0.7rem] hidden h-px lg:block',
          isDark ? 'bg-ivory-100/15' : 'bg-ink-200'
        )}
      />

      <RevealGroup
        className={cn('relative grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2', gridColumns)}
      >
        {steps.map((step) => (
          <RevealItem key={step.step} className="flex min-w-0 gap-4 lg:flex-col lg:gap-4">
            <div className="flex shrink-0 lg:block">
              <span
                className={cn(
                  'flex h-6 items-center text-[0.68rem] font-semibold tabular-nums tracking-widest-xl',
                  isDark ? 'bg-ink-900 text-champagne-400' : 'bg-ivory-50 text-champagne-700',
                  // Padding-right lets the tile mask the connector line
                  // behind it, so the numbers sit on the rule cleanly.
                  'lg:pr-4'
                )}
              >
                {step.step}
              </span>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <h3
                className={cn(
                  'font-display text-fluid-lg leading-tight',
                  isDark ? 'text-ivory-50' : 'text-ink-900'
                )}
              >
                {step.title}
              </h3>
              <p
                className={cn(
                  'text-fluid-sm leading-relaxed',
                  isDark ? 'text-ivory-200/70' : 'text-ink-400'
                )}
              >
                {step.body}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
};

export default ProcessSteps;
