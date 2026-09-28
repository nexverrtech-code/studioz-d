import { useMemo, useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GalleryFilters } from '@/components/gallery/GalleryFilters';
import { JournalCard } from '@/components/cards/JournalCard';
import { EmptyState } from '@/components/common/States';
import { CtaSection } from '@/components/sections/CtaSection';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { journal, journalCategories, getArticles, getFeaturedArticles } from '@/data/journal';
import { breadcrumbSchema, collectionPageSchema } from '@/utils/seo';
import { trackFilter } from '@/services/analytics.service';

export const Journal = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const articles = useMemo(() => getArticles(activeCategory), [activeCategory]);
  const featured = getFeaturedArticles(1)[0];

  const counts = useMemo(() => {
    const entries = {};
    for (const category of journalCategories) {
      entries[category.id] = getArticles(category.id).length;
    }
    return entries;
  }, []);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Journal', path: '/journal' },
  ];

  // The featured article is pulled out of the grid on the unfiltered view so
  // it is never shown twice.
  const gridArticles =
    activeCategory === 'all' && featured
      ? articles.filter((article) => article.slug !== featured.slug)
      : articles;

  return (
    <>
      <Seo
        title="Journal"
        description="Guides and studio notes from Studioz D — how to prepare for a shoot, what to wear, how to choose a photographer, and how to pick a personalized gift that means something."
        path="/journal"
        image={featured?.coverImage}
        schemas={[
          breadcrumbSchema(trail),
          collectionPageSchema({
            name: 'The Studioz D Journal',
            description: 'Guides, notes and practical writing from the studio.',
            path: '/journal',
            items: journal.map((article) => ({
              name: article.title,
              path: `/journal/${article.slug}`,
            })),
          }),
        ]}
      />

      <PageHero
        eyebrow="The Journal"
        title="Things worth knowing first."
        lede="Practical writing from the studio — how to prepare, what to expect, and how to choose well. No filler, no keyword padding."
        accent="worth knowing"
        railLabel="Journal"
        facets={['Preparing', 'Choosing', 'Behind the work']}
        breadcrumbs={trail}
        variant="plain"
      />

      <div
        className="sticky z-sticky border-y border-ink-100 bg-ivory-50/95 backdrop-blur-md"
        style={{ top: 'var(--sd-header-h)' }}
      >
        <div className="shell py-3">
          <GalleryFilters
            categories={journalCategories}
            active={activeCategory}
            onChange={(id) => {
              trackFilter('journal', id);
              setActiveCategory(id);
            }}
            counts={counts}
            label="Filter articles by category"
          />
        </div>
      </div>

      {/* Featured article */}
      {activeCategory === 'all' && featured && (
        <section className="section-sm" aria-labelledby="journal-featured">
          <div className="shell">
            <SectionHeading
              eyebrow="Start Here"
              title="The one most people read first"
              id="journal-featured"
              className="mb-5"
              titleClassName="text-fluid-2xl"
            />
            <div className="max-w-4xl">
              <JournalCard article={featured} featured priority />
            </div>
          </div>
        </section>
      )}

      {/* Article grid */}
      <section className="section-sm pb-section" aria-labelledby="journal-all">
        <div className="shell">
          <SectionHeading
            eyebrow={
              activeCategory === 'all'
                ? 'Everything'
                : journalCategories.find((entry) => entry.id === activeCategory)?.label
            }
            title={`${articles.length} ${articles.length === 1 ? 'article' : 'articles'}`}
            id="journal-all"
            className="mb-5"
            titleClassName="text-fluid-2xl"
          />

          {gridArticles.length === 0 ? (
            <EmptyState
              title="No stories found."
              body="Nothing published in this category yet. Try another, or read everything."
              action={{ label: 'Read all articles', to: '/journal' }}
            />
          ) : (
            <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {gridArticles.map((article, index) => (
                <RevealItem key={article.slug} className="min-w-0">
                  <JournalCard article={article} priority={index < 3} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      <CtaSection
        eyebrow="Still Deciding?"
        headingLines={['Reading only', 'gets you so far.']}
        copy="If you would rather just ask, that works too. Tell us what you are planning and we will give you a straight answer."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'See Our Work', to: '/works' }}
      />
    </>
  );
};

export default Journal;
