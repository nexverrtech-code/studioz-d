import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Service card.
 *
 * `h-full` plus a flex column means every card in a row matches height
 * regardless of copy length — no ragged grids, no absolute positioning.
 */
export const ServiceCard = ({ service, priority = false, className, compact = false }) => (
  <Link
    to={`/services/${service.slug}`}
    data-cursor="open"
    className={cn('group flex h-full w-full max-w-full flex-col', className)}
    aria-label={`${service.title} — ${service.summary}`}
  >
    <OptimizedImage
      src={service.cardImage}
      alt={`${service.title} by Studioz D`}
      /* Service hero images are 3:2 photographs; a 4:5 box cut 47% of them. */
      aspect={compact ? '4/3' : '3/2'}
      sizes={SIZES.third}
      priority={priority}
      className="w-full"
      imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.05]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-ink-950/0 transition-colors duration-500 hoverable:group-hover:bg-ink-950/10"
      />
    </OptimizedImage>

    <div className="flex min-w-0 flex-1 flex-col gap-2 pt-5">
      <span className="text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
        {service.group}
      </span>

      <h3 className="flex items-start justify-between gap-3 font-display text-fluid-xl leading-tight text-ink-900">
        <span className="min-w-0">{service.title}</span>
        <ArrowUpRight
          className="mt-1 h-4 w-4 shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-900"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </h3>

      {!compact && (
        <p className="clamp-3 text-fluid-sm text-ink-400">{service.summary}</p>
      )}

      {/* Rule grows on hover — a quiet affordance that needs no extra text. */}
      <span
        aria-hidden="true"
        className="mt-auto block h-px w-10 origin-left bg-ink-300 transition-all duration-500 ease-editorial group-hover:w-full group-hover:bg-ink-900"
      />
    </div>
  </Link>
);

export default ServiceCard;
