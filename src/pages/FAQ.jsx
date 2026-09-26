import { useMemo, useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { CtaSection } from '@/components/sections/CtaSection';
import { EmptyState } from '@/components/common/States';
import { faqGroups, allFaqs } from '@/data/faq';
import { breadcrumbSchema, faqSchema } from '@/utils/seo';
import { cn } from '@/utils/cn';

export const FAQ = () => {
  const [activeGroup, setActiveGroup] = useState('all');

  const groups = useMemo(
    () => (activeGroup === 'all' ? faqGroups : faqGroups.filter((g) => g.id === activeGroup)),
    [activeGroup]
  );

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers about booking, shoot days, editing, delivery and personalized gifting at Studioz D — including what we will and will not commit to before a conversation."
        path="/faq"
        schemas={[breadcrumbSchema(trail), faqSchema(allFaqs)]}
      />

      <PageHero
        eyebrow="FAQ"
        title="Straight answers, before you ask."
        lede="Booking, shoot days, editing, delivery and gifting. Where a number depends on the project, we say so rather than inventing one."
        accent="before you ask"
        railLabel="Questions"
        facets={['Booking', 'Shoot day', 'Editing', 'Delivery', 'Gifting']}
        breadcrumbs={trail}
        variant="plain"
      />

      {/* Group filter */}
      <div className="shell">
        <div
          className="flex gap-2 overflow-x-auto border-y border-ink-100 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:overflow-visible"
          role="group"
          aria-label="Filter questions by topic"
        >
          <button
            type="button"
            onClick={() => setActiveGroup('all')}
            aria-pressed={activeGroup === 'all'}
            className="chip shrink-0"
          >
            All
            <span
              className={cn(
                'ml-1 text-[0.62rem] tabular-nums',
                activeGroup === 'all' ? 'text-ivory-100/60' : 'text-ink-300'
              )}
            >
              {allFaqs.length}
            </span>
          </button>
          {faqGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroup(group.id)}
              aria-pressed={activeGroup === group.id}
              className="chip shrink-0"
            >
              {group.label}
              <span
                className={cn(
                  'ml-1 text-[0.62rem] tabular-nums',
                  activeGroup === group.id ? 'text-ivory-100/60' : 'text-ink-300'
                )}
              >
                {group.items.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="shell-narrow flex flex-col gap-14">
          {groups.length === 0 ? (
            <EmptyState
              title="Nothing here."
              body="Try another topic, or just ask us directly."
              action={{ label: 'Contact us', to: '/contact' }}
            />
          ) : (
            groups.map((group) => (
              <div key={group.id} className="flex flex-col gap-6">
                <h2
                  id={`faq-${group.id}`}
                  className="font-display text-fluid-2xl text-ink-900 scroll-mt-header"
                >
                  {group.label}
                </h2>
                <FaqAccordion items={group.items} idPrefix={`faq-${group.id}`} />
              </div>
            ))
          )}
        </div>
      </section>

      <CtaSection
        eyebrow="Still Unsure"
        headingLines={['Not on the list?', 'Just ask.']}
        copy="Anything specific to your date, your venue or your idea is better answered in a conversation than a FAQ entry."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'See Our Work', to: '/works' }}
      />
    </>
  );
};

export default FAQ;
