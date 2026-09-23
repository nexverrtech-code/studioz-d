import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { formatArticleDate } from '@/data/journal';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Journal article card.
 * `featured` gives it a wider image and a visible excerpt.
 */
export const JournalCard = ({ article, featured = false, priority = false, className }) => (
  <article className={cn('flex h-full w-full max-w-full flex-col', className)}>
    <Link
      to={`/journal/${article.slug}`}
      data-cursor="open"
      className="group flex h-full flex-col"
      aria-label={`Read ${article.title}`}
    >
      <OptimizedImage
        src={article.coverImage}
        alt={article.coverAlt}
        aspect={featured ? '16/9' : '4/3'}
        sizes={featured ? SIZES.half : SIZES.third}
        priority={priority}
        className="w-full"
        imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.04]"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3 pt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.58rem] font-semibold uppercase tracking-widest-xl">
          <span className="text-champagne-700">{article.categoryLabel}</span>
          <span className="h-px w-4 bg-ink-200" aria-hidden="true" />
          <time dateTime={article.date} className="text-ink-300">
            {formatArticleDate(article.date)}
          </time>
        </div>

        <h3
          className={cn(
            'clamp-3 font-display leading-tight text-ink-900',
            featured ? 'text-fluid-2xl' : 'text-fluid-xl'
          )}
        >
          {article.title}
        </h3>

        <p className={cn('text-fluid-sm text-ink-400', featured ? 'clamp-3' : 'clamp-2')}>
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-widest text-ink-300">
            <Clock className="h-3 w-3" strokeWidth={1.7} aria-hidden="true" />
            {article.readingMinutes} min read
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-widest-xl text-ink-900">
            Read
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  </article>
);

export default JournalCard;
