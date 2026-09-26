import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { giftGroups, getCategoriesByGroup } from '@/data/gifts';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Gift discovery.
 *
 * Four ways into the same catalogue — occasion, relationship, creation and
 * feeling. Categories without their own route link into `/gifts` with the
 * filter pre-applied via a query string, so no link is ever dead.
 */

const categoryHref = (category) =>
  category.routable ? `/gifts/${category.slug}` : `/gifts?filter=${category.id}`;

/** Image-led tiles, used for the primary (occasion / creation) axes. */
const TileGrid = ({ categories }) => (
  <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
    {categories.map((category) => (
      <RevealItem key={category.id} className="min-w-0">
        <Link
          to={categoryHref(category)}
          data-cursor="open"
          className="group flex h-full flex-col"
          aria-label={`${category.label} gifts — ${category.blurb}`}
        >
          <OptimizedImage
            src={category.image}
            alt={`${category.label} personalized gifts by Studioz D`}
            /* Square, because the supplied gift photography is square. A
               4:5 tile would crop a quarter off every product. */
            aspect="1/1"
            sizes={SIZES.quarter}
            className="w-full"
            imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.05]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
              <span className="clamp-2 font-display text-fluid-base leading-tight text-ivory-50">
                {category.label}
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-ivory-100 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </span>
          </OptimizedImage>
        </Link>
      </RevealItem>
    ))}
  </RevealGroup>
);

/** Text-only rows, used for the lighter (relationship / feeling) axes. */
const LinkList = ({ categories }) => (
  <RevealGroup className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
    {categories.map((category) => (
      <RevealItem key={category.id} className="min-w-0">
        <Link
          to={categoryHref(category)}
          className="group flex items-center justify-between gap-4 border-b border-ink-100 py-4 transition-colors hover:border-ink-900"
        >
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="font-display text-fluid-lg leading-tight text-ink-900">
              {category.label}
            </span>
            <span className="clamp-1 text-fluid-xs text-ink-400">{category.headline}</span>
          </span>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-900"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </Link>
      </RevealItem>
    ))}
  </RevealGroup>
);

export const GiftDiscovery = ({ groups = ['occasion', 'relationship', 'creation', 'feeling'], className }) => (
  <div className={cn('flex flex-col gap-16 lg:gap-24', className)}>
    {giftGroups
      .filter((group) => groups.includes(group.id))
      .map((group) => {
        const categories = getCategoriesByGroup(group.id);
        if (categories.length === 0) return null;

        const useTiles = group.id === 'occasion' || group.id === 'creation';

        return (
          <section key={group.id} aria-labelledby={`gift-group-${group.id}`}>
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div className="flex flex-col gap-2">
                <h2
                  id={`gift-group-${group.id}`}
                  className="font-display text-fluid-2xl text-ink-900"
                >
                  {group.label}
                </h2>
                <p className="text-fluid-sm text-ink-400">{group.blurb}</p>
              </div>
              <span className="shrink-0 text-[0.64rem] uppercase tracking-widest-xl text-ink-300">
                {categories.length} collections
              </span>
            </div>

            {useTiles ? (
              <TileGrid categories={categories} />
            ) : (
              <LinkList categories={categories} />
            )}
          </section>
        );
      })}
  </div>
);

export default GiftDiscovery;
