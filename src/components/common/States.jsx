import { Link } from 'react-router-dom';
import { ArrowRight, ImageOff, SearchX, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Empty, loading and error states.
 *
 * Kept together because they share one job: making an absence of content look
 * deliberate rather than broken.
 */

export const EmptyState = ({
  icon: Icon = SearchX,
  title = 'Nothing here yet.',
  body,
  action,
  className,
}) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-4 border border-dashed border-ink-200 px-6 py-16 text-center',
      className
    )}
  >
    <Icon className="h-7 w-7 text-ink-300" strokeWidth={1.2} aria-hidden="true" />
    <h3 className="font-display text-fluid-xl text-ink-900">{title}</h3>
    {body && <p className="max-w-prose-sm text-fluid-sm text-ink-400">{body}</p>}
    {action?.to && (
      <Link
        to={action.to}
        className="link-underline mt-1 text-[0.74rem] font-semibold uppercase tracking-widest-xl text-ink-900"
      >
        {action.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.6} />
      </Link>
    )}
  </div>
);

/** Gallery-specific empty state, wording per the brief. */
export const GalleryEmptyState = ({ className }) => (
  <EmptyState
    icon={ImageOff}
    title="No stories here yet."
    body="This collection is still being built. There is plenty to see everywhere else."
    action={{ label: 'Explore all works', to: '/works' }}
    className={className}
  />
);

export const SearchEmptyState = ({ query, className }) => (
  <EmptyState
    icon={SearchX}
    title="No stories found."
    body={
      query
        ? `Nothing matched “${query}”. Try another search, or browse by category.`
        : 'Try another search, or browse by category.'
    }
    action={{ label: 'Browse all works', to: '/works' }}
    className={className}
  />
);

export const ErrorState = ({ title = 'Something went wrong.', body, onRetry, className }) => (
  <div
    role="alert"
    className={cn(
      'flex flex-col items-center justify-center gap-4 border border-terracotta-300 bg-terracotta-300/10 px-6 py-14 text-center',
      className
    )}
  >
    <AlertCircle className="h-7 w-7 text-terracotta-500" strokeWidth={1.3} aria-hidden="true" />
    <h3 className="font-display text-fluid-xl text-ink-900">{title}</h3>
    {body && <p className="max-w-prose-sm text-fluid-sm text-ink-500">{body}</p>}
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="link-underline text-[0.74rem] font-semibold uppercase tracking-widest-xl text-ink-900"
      >
        Try again
      </button>
    )}
  </div>
);

/**
 * Skeleton card. `aspect` keeps the placeholder the same shape as the real
 * card, so swapping one for the other shifts nothing.
 */
export const SkeletonCard = ({ aspect = '3 / 4', className, lines = 2 }) => (
  <div className={cn('flex flex-col gap-3', className)} aria-hidden="true">
    <div className="sd-skeleton w-full" style={{ aspectRatio: aspect }} />
    <div className="sd-skeleton h-3 w-1/3" />
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        className="sd-skeleton h-3"
        style={{ width: index === lines - 1 ? '60%' : '85%' }}
      />
    ))}
  </div>
);

export const SkeletonGrid = ({ count = 6, columns = 'sm:grid-cols-2 lg:grid-cols-3', aspect }) => (
  <div className={cn('grid grid-cols-1 gap-x-6 gap-y-8', columns)}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} aspect={aspect} />
    ))}
  </div>
);

/** Route-transition loader. Minimal by design — no full-screen curtain. */
export const RouteLoader = () => (
  <div
    className="flex min-h-[60svh] items-center justify-center px-gutter"
    role="status"
    aria-live="polite"
  >
    <div className="flex flex-col items-center gap-4">
      <span className="font-display text-fluid-lg tracking-widest-xl text-ink-300">
        STUDIOZ D
      </span>
      <span className="relative block h-px w-24 overflow-hidden bg-ink-200">
        <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-champagne-600" />
      </span>
      <span className="sr-only">Loading</span>
    </div>
  </div>
);

export default EmptyState;
