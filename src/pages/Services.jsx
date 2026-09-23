import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CtaSection } from '@/components/sections/CtaSection';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { services, serviceGroups, getServicesByGroup } from '@/data/services';
import { creativeProcess } from '@/data/about';
import { breadcrumbSchema, collectionPageSchema } from '@/utils/seo';

const GROUP_BLURBS = {
  Celebrations: 'Days with a schedule, a crowd and exactly one chance to get it right.',
  People: 'Sessions built around a person, at whatever pace they need.',
  Brands: 'Imagery with a job to do — and the specs to match.',
  Motion: 'Sound, movement and time. The things a still cannot hold.',
};

export const Services = () => {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <>
      <Seo
        title="Photography & Film Services"
        description="Wedding, pre-wedding, portrait, maternity, family, event, product and commercial photography, plus cinematic films and reels — by Studioz D."
        path="/services"
        image="/assets/images/services/studioz-d-wedding-photography-hero.svg"
        schemas={[
          breadcrumbSchema(trail),
          collectionPageSchema({
            name: 'Photography & Film Services',
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

      <PageHero
        eyebrow="Services"
        title="Created around your story."
        lede="From photographs that preserve a moment to visual content that helps a product stand out, Studioz D creates imagery with intention."
        image="/assets/images/services/studioz-d-wedding-photography-hero.svg"
        imageAlt="Wedding photography by Studioz D"
        breadcrumbs={trail}
      />

      {serviceGroups.map((group, groupIndex) => {
        const groupServices = getServicesByGroup(group);
        if (groupServices.length === 0) return null;

        return (
          <section
            key={group}
            className={groupIndex % 2 === 1 ? 'bleed bg-ivory-100 section' : 'section'}
            aria-labelledby={`group-${group}`}
          >
            <div className="shell">
              <SectionHeading
                eyebrow={`${String(groupIndex + 1).padStart(2, '0')} — ${group}`}
                title={GROUP_BLURBS[group]}
                id={`group-${group}`}
                className="mb-8"
                titleClassName="text-fluid-2xl"
              />

              <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groupServices.map((service, index) => (
                  <RevealItem key={service.slug} className="min-w-0">
                    <ServiceCard
                      service={service}
                      priority={groupIndex === 0 && index < 2}
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      <section className="bleed bg-ink-900 section" aria-labelledby="services-process">
        <div className="shell">
          <SectionHeading
            eyebrow={creativeProcess.eyebrow}
            title={creativeProcess.heading}
            id="services-process"
            tone="light"
            lede="The same six steps whether it is a wedding day or a forty-product catalogue."
            className="mb-9"
          />
          <ProcessSteps steps={creativeProcess.steps} tone="dark" columns={6} />
        </div>
      </section>

      <CtaSection
        eyebrow="Next Step"
        headingLines={['Tell us what', 'you are picturing.']}
        copy="A date, a place, a product or just a rough idea. We will tell you honestly what it would take and whether we are the right studio for it."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'See Our Work', to: '/works' }}
      />
    </>
  );
};

export default Services;
