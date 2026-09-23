import { useMemo, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GiftCard } from '@/components/cards/GiftCard';
import { EmptyState } from '@/components/common/States';
import { CtaSection } from '@/components/sections/CtaSection';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import {
  getGiftCategory,
  getGiftsByCategory,
  routableGiftCategories,
  priceTiers,
} from '@/data/gifts';
import { breadcrumbSchema, collectionPageSchema } from '@/utils/seo';
import { trackFilter } from '@/services/analytics.service';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'name', label: 'A–Z' },
];

export const GiftCategory = () => {
  const { category: slug } = useParams();
  const category = getGiftCategory(slug);
  const [sort, setSort] = useState('featured');
  const [tier, setTier] = useState(null);

  // Hooks must run unconditionally, so the 404 check happens below them.
  const items = useMemo(() => {
    if (!category) return [];
    let list = getGiftsByCategory(category.id);
    if (tier) list = list.filter((gift) => gift.priceTier === tier);

    const sorted = [...list];
    if (sort === 'newest') sorted.sort((a, b) => Number(b.newest) - Number(a.newest));
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [category, sort, tier]);

  // Unknown or non-routable category → 404 rather than an empty shell.
  if (!category || !category.routable) return <Navigate to="/404" replace />;

  const siblings = routableGiftCategories
    .filter((entry) => entry.group === category.group && entry.id !== category.id)
    .slice(0, 6);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Gifts', path: '/gifts' },
    { name: category.label, path: `/gifts/${category.slug}` },
  ];

  return (
    <>
      <Seo
        title={category.title}
        description={category.blurb}
        path={`/gifts/${category.slug}`}
        image={items[0]?.images[0]?.src ?? category.image}
        schemas={[
          breadcrumbSchema(trail),
          collectionPageSchema({
            name: category.title,
            description: category.blurb,
            path: `/gifts/${category.slug}`,
            items: items.map((gift) => ({
              name: gift.name,
              path: `/gifts/product/${gift.slug}`,
            })),
          }),
        ]}
      />

      <PageHero
        eyebrow={category.label}
        title={category.headline}
        lede={category.blurb}
        breadcrumbs={trail}
        variant="plain"
      />

      <section className="section-sm" aria-labelledby="gift-category-items">
        <div className="shell">
          <SectionHeading
            eyebrow={`${items.length} ${items.length === 1 ? 'creation' : 'creations'}`}
            title={category.title}
            id="gift-category-items"
            className="mb-8"
            titleClassName="text-fluid-2xl"
          />

          {/* Lightweight controls — the full filter set lives on /gifts */}
          <div className="mb-10 flex flex-col gap-4 border-y border-ink-100 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="shrink-0 text-[0.62rem] uppercase tracking-widest text-ink-300">
                Range
              </span>
              <button
                type="button"
                onClick={() => setTier(null)}
                aria-pressed={tier === null}
                className="chip shrink-0"
              >
                Any
              </button>
              {priceTiers.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => {
                    trackFilter('gift-category', entry.id);
                    setTier(tier === entry.id ? null : entry.id);
                  }}
                  aria-pressed={tier === entry.id}
                  className="chip shrink-0"
                >
                  {entry.label}
                </button>
              ))}
            </div>

            <div className="flex min-w-0 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="shrink-0 text-[0.62rem] uppercase tracking-widest text-ink-300">
                Sort
              </span>
              {SORTS.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSort(entry.id)}
                  aria-pressed={sort === entry.id}
                  className="chip shrink-0"
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>

          {items.length === 0 ? (
            <EmptyState
              title="Nothing in this collection yet."
              body="It is still being built. In the meantime, tell us what you are picturing and we will make it."
              action={{ label: 'Browse all gifts', to: '/gifts' }}
            />
          ) : (
            <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
              {items.map((gift, index) => (
                <RevealItem key={gift.slug} className="min-w-0">
                  <GiftCard gift={gift} priority={index < 4} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="bleed bg-ivory-100 section-sm" aria-labelledby="sibling-categories">
          <div className="shell">
            <SectionHeading
              eyebrow="Also Explore"
              title="Nearby collections"
              id="sibling-categories"
              className="mb-8"
              titleClassName="text-fluid-2xl"
            />
            <div className="flex flex-wrap gap-2">
              {siblings.map((sibling) => (
                <Link key={sibling.id} to={`/gifts/${sibling.slug}`} className="chip">
                  {sibling.label}
                  <ArrowRight className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        eyebrow={category.label}
        headingLines={['Not quite', 'what you pictured?']}
        copy="Describe it and we will tell you honestly whether it can be built, what it would involve, and how long it would take."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'All Gifts', to: '/gifts' }}
        whatsappMessage={`Hello Studioz D, I am looking at ${category.label.toLowerCase()} gifts.`}
      />
    </>
  );
};

export default GiftCategory;
