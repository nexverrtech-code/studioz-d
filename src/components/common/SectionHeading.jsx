import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Reveal } from '@/components/motion/Reveal';

/**
 * The section header used across every page.
 *
 * Handles the eyebrow / title / lede / optional action row in one place, so
 * vertical rhythm stays identical from Home to the admin-free pages. On
 * mobile the action drops below the text instead of competing for the row.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'dark',
  action,
  className,
  titleClassName,
  as: Tag = 'h2',
  id,
}) => {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        centered ? 'items-center text-center' : 'items-start',
        !centered && action && 'md:flex-row md:items-end md:justify-between md:gap-10',
        className
      )}
    >
      <div className={cn('flex max-w-full flex-col gap-4', centered && 'items-center')}>
        {eyebrow && (
          <Reveal direction="fade" duration={0.5}>
            <p
              className={cn(
                'eyebrow flex items-center gap-3',
                tone === 'light' && 'text-ivory-300/80'
              )}
            >
              <span
                className={cn(
                  'h-px w-8 shrink-0',
                  tone === 'light' ? 'bg-ivory-300/40' : 'bg-ink-300'
                )}
                aria-hidden="true"
              />
              {eyebrow}
            </p>
          </Reveal>
        )}

        {title && (
          <Reveal direction="up" delay={0.05}>
            <Tag
              id={id}
              className={cn(
                'text-fluid-3xl',
                tone === 'light' ? 'text-ivory-100' : 'text-ink-900',
                centered ? 'max-w-[22ch]' : 'max-w-[26ch]',
                titleClassName
              )}
            >
              {title}
            </Tag>
          </Reveal>
        )}

        {lede && (
          <Reveal direction="up" delay={0.12}>
            <p
              className={cn(
                'lede',
                tone === 'light' && 'text-ivory-300/85',
                centered && 'mx-auto text-center'
              )}
            >
              {lede}
            </p>
          </Reveal>
        )}
      </div>

      {action && (
        <Reveal direction="fade" delay={0.18} className={cn('shrink-0', centered && 'mt-2')}>
          {typeof action === 'object' && action.to ? (
            <Link
              to={action.to}
              className={cn(
                'link-underline text-[0.74rem] font-semibold uppercase tracking-widest-xl',
                tone === 'light' ? 'text-ivory-100' : 'text-ink-900'
              )}
            >
              {action.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.6} />
            </Link>
          ) : (
            action
          )}
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
