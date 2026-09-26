import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GiftDiscovery } from '@/components/gifts/GiftDiscovery';
import { GiftFilters } from '@/components/gifts/GiftFilters';
import { GiftCard } from '@/components/cards/GiftCard';
import { EmptyState } from '@/components/common/States';
import { CtaSection } from '@/components/sections/CtaSection';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { filterGifts, getGiftBySlug, gifts, giftCategories } from '@/data/gifts';
import { breadcrumbSchema, collectionPageSchema } from '@/utils/seo';
import { trackFilter } from '@/services/analytics.service';

const GIFT_PROCESS = [
  { step: '01', title: 'Choose a memory', body: 'Send the photographs — yours or ones we took. Phone shots are usually fine.' },
  { step: '02', title: 'Add your words', body: 'A name, a date, a line only the two of you understand.' },
  { step: '03', title: 'See the proof', body: 'We lay it out and share it with you before anything is cut or printed.' },
  { step: '04', title: 'We make it', body: 'Printed, framed, engraved and finished in our own workshop.' },
  { step: '05', title: 'You keep it', body: 'On a wall, on a shelf, or in someone else’s hands.' },
];

/**
 * Hero cluster. Two real pieces, each in a box shaped to its own photograph —
 * the supplied product photography is square, so the hero gives it a square
 * box instead of cropping a quarter of it away into a banner.
 */
const HERO_MEDIA = [
  getGiftBySlug('acrylic-photo-panel')?.images[0],
  getGiftBySlug('crystal-photo-block')?.images[0],
].filter(Boolean);

/** The four axes a `?filter=` param may seed. */
const FILTER_AXES = ['occasion', 'relationship', 'creation', 'feeling'];

const DEFAULT_FILTERS = {
  occasion: null,
  relationship: null,
  creation: null,
  feeling: null,
  tiers: [],
  personalizedOnly: false,
  featuredOnly: false,
  sort: 'featured',
};

export const Gifts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // A `?filter=` param (used by non-routable discovery tiles) pre-seeds the
  // matching axis, so those links land on a filtered view rather than the top
  // of an unfiltered page.
  const seededFilter = searchParams.get('filter');

  /** Resolves `?filter=` to the axis it belongs on, or null if unusable. */
  const seededAxis = useMemo(() => {
    if (!seededFilter) return null;
    const category = giftCategories.find((entry) => entry.id === seededFilter);
    if (!category || !FILTER_AXES.includes(category.group)) return null;
    return { group: category.group, id: category.id };
  }, [seededFilter]);

  const [filters, setFilters] = useState(() =>
    seededAxis ? { ...DEFAULT_FILTERS, [seededAxis.group]: seededAxis.id } : DEFAULT_FILTERS
  );

  /**
   * Keeps the filter state in step with `?filter=`.
   *
   * The initialiser above only runs once, and this page does not remount when
   * only the query string changes — so without this, moving between two
   * discovery tiles (`?filter=photo-albums` → `?filter=kids`) would update the
   * URL while the results stayed on the previous filter.
   *
   * Three transitions, handled distinctly:
   *  - param changed        → re-seed from the URL
   *  - param removed        → clear back to defaults ("all gifts" links)
   *  - never had a param    → leave manually-chosen filters alone
   */
  const previousSeed = useRef(seededAxis);

  useEffect(() => {
    const hadSeed = previousSeed.current !== null;
    previousSeed.current = seededAxis;

    if (seededAxis) {
      setFilters((current) =>
        current[seededAxis.group] === seededAxis.id
          ? current
          : { ...DEFAULT_FILTERS, [seededAxis.group]: seededAxis.id }
      );
      return;
    }

    if (hadSeed) setFilters(DEFAULT_FILTERS);
  }, [seededAxis]);

  const setFilter = useCallback(
    (key, value) => {
      trackFilter('gifts', `${key}:${value}`);
      setFilters((current) => ({ ...current, [key]: value }));
    },
    []
  );

  const toggleTier = useCallback((tierId) => {
    setFilters((current) => ({
      ...current,
      tiers: current.tiers.includes(tierId)
        ? current.tiers.filter((id) => id !== tierId)
        : [...current.tiers, tierId],
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    // Drop the seed param too, otherwise a reload re-applies it.
    if (seededFilter) setSearchParams({}, { replace: true });
  }, [seededFilter, setSearchParams]);

  const results = useMemo(() => filterGifts(filters), [filters]);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Gifts', path: '/gifts' },
  ];

  return (
    <>
      <Seo
        title="Personalized Gifts"
        description="Personalized photo gifts by Studioz D — frames, albums, memory boxes, hampers and keepsakes built from your own photographs. Choose a memory, add your words, make it yours."
        path="/gifts"
        image="/assets/images/gifts/studioz-d-gift-framed-print-wide.webp"
        schemas={[
          breadcrumbSchema(trail),
          collectionPageSchema({
            name: 'Personalized Gifts',
            description:
              'Personalized photo gifts, frames, albums and keepsakes made by Studioz D.',
            path: '/gifts',
            items: gifts.map((gift) => ({
              name: gift.name,
              path: `/gifts/product/${gift.slug}`,
            })),
          }),
        ]}
      />

      <PageHero
        eyebrow="Customized Gifts"
        title="Made from your story."
        accent="your story"
        lede="Choose a memory. Add your words. Make it yours."
        railLabel="Gifts"
        railIndex="02"
        media={HERO_MEDIA}
        facets={['Frames', 'Acrylic', 'Crystal', 'Engraving', 'Hampers', 'Corporate']}
        breadcrumbs={trail}
      />

      {/* Discovery */}
      <section className="section" aria-labelledby="gift-discovery-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="Start Anywhere"
            title="Four ways to find the right one"
            id="gift-discovery-heading"
            lede="Occasion, person, object, or simply what you want to say."
            className="mb-9"
          />
          <GiftDiscovery />
        </div>
      </section>

      {/* Catalogue */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="gift-catalogue-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="Every Creation"
            title="The full catalogue"
            id="gift-catalogue-heading"
            lede="Filter by occasion, person, creation type or feeling. Everything is made to order."
            className="mb-7"
            titleClassName="text-fluid-2xl"
          />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12">
            <GiftFilters
              filters={filters}
              setFilter={setFilter}
              toggleTier={toggleTier}
              resetFilters={resetFilters}
              resultCount={results.length}
            />

            <div className="min-w-0">
              <div className="mb-6 hidden items-center justify-between gap-4 lg:flex">
                <p className="text-fluid-sm text-ink-400">
                  {results.length} {results.length === 1 ? 'creation' : 'creations'}
                </p>
                <p className="text-[0.68rem] uppercase tracking-widest text-ink-300">
                  Every piece is quoted on enquiry
                </p>
              </div>

              {results.length === 0 ? (
                <EmptyState
                  title="Nothing matches that combination."
                  body="Try removing a filter, or tell us what you are picturing and we will build it."
                  action={{ label: 'Start a conversation', to: '/contact' }}
                />
              ) : (
                <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
                  {results.map((gift, index) => (
                    <RevealItem key={gift.slug} className="min-w-0">
                      <GiftCard gift={gift} priority={index < 4} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" aria-labelledby="gift-process-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="How It Works"
            title="Five steps, and you see it before we make it"
            id="gift-process-heading"
            className="mb-9"
            titleClassName="text-fluid-2xl"
          />
          <ProcessSteps steps={GIFT_PROCESS} columns={5} />
        </div>
      </section>

      <CtaSection
        eyebrow="Personalized Gifting"
        headingLines={['Some things', 'should not stay on a drive.']}
        copy="Tell us the occasion, the person and roughly what you are picturing. We will come back with options, a proof and a timeline."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'See Our Work', to: '/works' }}
        whatsappMessage="Hello Studioz D, I would like to enquire about a personalized gift."
      />
    </>
  );
};

export default Gifts;
