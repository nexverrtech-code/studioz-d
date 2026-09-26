import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Project card, used by related-work rails and category grids.
 * Caption always sits below the image — never hidden behind a hover.
 */
// 3:2 by default: eleven of the thirteen project covers are 3:2 files, so a
// portrait box would crop nearly half the width off most of them.
export const WorkCard = ({ work, priority = false, aspect = '3/2', className }) => (
  <Link
    to={`/works/${work.slug}`}
    data-cursor="story"
    className={cn('group flex h-full w-full max-w-full flex-col', className)}
    aria-label={`Open ${work.title} — ${work.category} project`}
  >
    <OptimizedImage
      src={work.coverImage}
      alt={`${work.title} — ${work.category} photography by Studioz D`}
      aspect={aspect}
      sizes={SIZES.third}
      priority={priority}
      className="w-full"
      imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.04]"
    />

    <div className="flex min-w-0 flex-1 flex-col gap-2 pt-4">
      <span className="flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
        {work.category}
        {work.year && (
          <>
            <span className="h-px w-4 bg-ink-200" aria-hidden="true" />
            <span className="text-ink-300">{work.year}</span>
          </>
        )}
      </span>

      <h3 className="flex items-start justify-between gap-3 font-display text-fluid-xl leading-tight text-ink-900">
        <span className="clamp-2 min-w-0">{work.title}</span>
        <ArrowUpRight
          className="mt-1 h-4 w-4 shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-900"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </h3>

      <p className="clamp-2 text-fluid-sm text-ink-400">{work.description}</p>
    </div>
  </Link>
);

export default WorkCard;
