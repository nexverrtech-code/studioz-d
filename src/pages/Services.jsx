import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { WorkCard } from '@/components/cards/WorkCard';
import { JournalCard } from '@/components/cards/JournalCard';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CtaSection } from '@/components/sections/CtaSection';
import { StorySection } from '@/components/sections/StorySection';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { services, serviceGroups, getServicesByGroup } from '@/data/services';
import { getFeaturedWorks } from '@/data/works';
import { getLatestArticles } from '@/data/journal';
import { creativeProcess } from '@/data/about';
import { breadcrumbSchema, collectionPageSchema } from '@/utils/seo';

const GROUP_BLURBS = {
  Celebrations: 'Days with a schedule, a crowd and exactly one chance to get it right.',
  People: 'Sessions built around a person, at whatever pace they need.',
  Brands: 'Imagery with a job to do — and the specs to match.',
  Motion: 'Sound, movement and time. The things a still cannot hold.',
};

/**
 * The PHOTOGRAPHY WORLD landing page.
 *
 * This is where "Explore Photography" on the gateway leads, so it carries the
 * photography story that used to sit on the home page: the studio's approach,
 * the full service range, real work, and the process. A visitor arriving here
 * should immediately know they are on the photography side of Studioz D.
 */
export const Services = () => {
  const selectedWorks = getFeaturedWorks(3);
  const latestArticles = getLatestArticles(3);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Photography', path: '/services' },
  ];

  return (
    <>
      <Seo
        title="Photography & Film"
        description="Wedding, pre-wedding, engagement, portrait and event photography by Studioz D — plus films, reels and commercial work. Observational coverage, edited as a story."
        path="/services"
        image="/assets/images/works/studioz-d-wedding-sparkler-entry.webp"
        schemas={[
          breadcrumbSchema(trail),
          collectionPageSchema({
            name: 'Photography & Film',
            description:
              'The full range of photography, film and commercial services offered by Studioz D.',
            path: '/services',
            items: services.map((service) => ({
              name: service.title,
              path: `/services/${service.slug}`,
            })),
          }),
        ]}
      />

      {/* 1 — Photography world hero */}
      <PageHero
        eyebrow="Photography"
        title="Created around your story."
        lede="Photographs that keep a moment, and imagery that helps a brand stand out."
        accent="your story"
        image="/assets/images/works/studioz-d-pre-wedding-beach-horse.webp"
        imageAlt="Couple on a beach under a stormy sky beside a painted horse, photographed by Studioz D"
        imageTall={{
          src: '/assets/images/works/studioz-d-pre-wedding-golden-hour-close.webp',
          alt: 'Couple forehead to forehead by the sea at golden hour, photographed by Studioz D',
        }}
        layout="immersive"
        railLabel="Photography"
        railIndex="01"
        facets={['Weddings', 'Pre-Wedding', 'Portraits', 'Events', 'Brands', 'Films']}
        breadcrumbs={trail}
        minHeight="50svh"
      />

      {/* 2 — Photography introduction */}
      <StorySection
        eyebrow="Our Photography"
        headingLines={['We don’t just take pictures.', 'We notice the moment.']}
        paragraphs={[
          'The glance before the ceremony, the laugh nobody planned — the small details that become the biggest memories.',
        ]}
        image="/assets/images/works/studioz-d-pre-wedding-bougainvillea-close.webp"
        imageAlt="Couple standing close together framed by bougainvillea branches, photographed by Studioz D"
        imageAspect="2/3"
        secondaryImage="/assets/images/works/studioz-d-wedding-bridal-portrait-bouquet.webp"
        secondaryImageAlt="Bridal portrait behind a white bouquet, photographed by Studioz D"
        secondaryAspect="3/2"
      />

      {/* 3 — The service range */}
      {serviceGroups.map((group, groupIndex) => {
        const groupServices = getServicesByGroup(group);
        if (groupServices.length === 0) return null;

        return (
          <section
            key={group}
            className={groupIndex % 2 === 0 ? 'bleed bg-ivory-100 section' : 'section'}
            aria-labelledby={`group-${group}`}
          >
            <div className="shell">
              <SectionHeading
                eyebrow={`${String(groupIndex + 1).padStart(2, '0')} — ${group}`}
                title={GROUP_BLURBS[group]}
                id={`group-${group}`}
                className="mb-5"
                titleClassName="text-fluid-2xl"
              />

              <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groupServices.map((service, index) => (
                  <RevealItem key={service.slug} className="min-w-0">
                    <ServiceCard service={service} priority={groupIndex === 0 && index < 2} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      {/* 4 — Selected works */}
      <section className="section" aria-labelledby="photography-works">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected Works"
            title="Recent stories"
            id="photography-works"
            action={{ label: 'View all works', to: '/works' }}
            className="mb-5"
            titleClassName="text-fluid-2xl"
          />
          <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            {selectedWorks.map((work) => (
              <RevealItem key={work.slug} className="min-w-0">
                <WorkCard work={work} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 5 — Process */}
      <section className="bleed bg-ink-900 section" aria-labelledby="services-process">
        <div className="shell">
          <SectionHeading
            eyebrow={creativeProcess.eyebrow}
            title={creativeProcess.heading}
            id="services-process"
            tone="light"
            className="mb-5"
          />
          <ProcessSteps steps={creativeProcess.steps} tone="dark" columns={6} />
        </div>
      </section>

      {/* 6 — Journal */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="photography-journal">
        <div className="shell">
          <SectionHeading
            eyebrow="The Journal"
            title="Worth knowing before you book"
            id="photography-journal"
            action={{ label: 'Read the journal', to: '/journal' }}
            className="mb-5"
            titleClassName="text-fluid-2xl"
          />
          <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3">
            {latestArticles.map((article) => (
              <RevealItem key={article.slug} className="min-w-0">
                <JournalCard article={article} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 7 — Contact */}
      <CtaSection
        eyebrow="Next Step"
        headingLines={['Tell us what', 'you are picturing.']}
        copy="A date, a place or a rough idea — we will tell you honestly what it takes."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'See Our Work', to: '/works' }}
      />
    </>
  );
};

export default Services;
