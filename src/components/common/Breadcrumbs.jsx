import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Breadcrumb trail.
 *
 * `trail` is [{ name, path }], root-first, with the current page last.
 * Long trails scroll inside their own container rather than widening the page
 * — which is what stops a deep product URL causing horizontal overflow at
 * 320px.
 */
export const Breadcrumbs = ({ trail = [], tone = 'dark', className }) => {
  if (trail.length < 2) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('max-w-full overflow-x-auto [scrollbar-width:none]', className)}
    >
      <ol className="flex items-center gap-2 whitespace-nowrap py-1">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  className={cn(
                    'h-3 w-3 shrink-0',
                    tone === 'light' ? 'text-ivory-300/50' : 'text-ink-300'
                  )}
                  aria-hidden="true"
                  strokeWidth={1.8}
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn(
                    'text-[0.68rem] font-semibold uppercase tracking-widest-xl',
                    tone === 'light' ? 'text-ivory-100' : 'text-ink-900'
                  )}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className={cn(
                    'link-underline text-[0.68rem] font-semibold uppercase tracking-widest-xl transition-colors',
                    tone === 'light'
                      ? 'text-ivory-300/70 hover:text-ivory-100'
                      : 'text-ink-400 hover:text-ink-900'
                  )}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
