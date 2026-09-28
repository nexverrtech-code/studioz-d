import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { StorySection } from '@/components/sections/StorySection';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CtaSection } from '@/components/sections/CtaSection';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import {
  philosophy,
  approach,
  creativeProcess,
  studio,
  behindTheScenes,
  team,
} from '@/data/about';
import { siteConfig } from '@/config/site';
import { breadcrumbSchema, organizationSchema } from '@/utils/seo';
import { SIZES } from '@/utils/images';

export const About = () => {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <Seo
        title="About the Studio"
        description="Studioz D is a creative photography and personalized-gifting studio built around one idea — meaningful moments deserve meaningful treatment."
        path="/about"
        image="/assets/images/works/studioz-d-portrait-groom-getting-ready.webp"
        schemas={[breadcrumbSchema(trail), organizationSchema()]}
      />

      <PageHero
        eyebrow="About Studioz D"
        title="We chase the moment before it disappears."
        lede="Studioz D is a creative photography and personalized-gifting studio built around one simple idea — meaningful moments deserve meaningful treatment."
        accent="the moment"
        image="/assets/images/works/studioz-d-reception-stage-couple-seated.webp"
        imageAlt="Bride and groom seated together at a green-lit reception, photographed by Studioz D"
        layout="immersive"
        railLabel="The Studio"
        railIndex="01"
        facets={['Photography', 'Films', 'Personalized Gifts']}
        breadcrumbs={trail}
        minHeight="48svh"
      />

      {/* Opening statement */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal direction="up">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-ink-300" aria-hidden="true" />
              Who We Are
            </p>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal direction="up">
              <p className="max-w-prose text-fluid-lg leading-relaxed text-ink-600">
                We photograph people, celebrations, products and stories. Then, through
                customized creations, we help those memories move beyond the screen and into
                everyday life.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.14}>
              <p className="font-display text-fluid-2xl leading-snug text-ink-900">
                {siteConfig.promise.capture} {siteConfig.promise.create}{' '}
                <span className="text-champagne-700">{siteConfig.promise.keep}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <StorySection
        eyebrow={philosophy.eyebrow}
        headingLines={['A moment is only unrepeatable', 'if someone was paying attention.']}
        paragraphs={philosophy.body.slice(0, 1)}
        image="/assets/images/works/studioz-d-wedding-bride-silk-saree-window.webp"
        imageAlt="Bride in a silk saree at a shuttered window, photographed by Studioz D"
        imageAspect="3/2"
      />

      {/* Approach */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="approach-title">
        <div className="shell">
          <SectionHeading
            eyebrow={approach.eyebrow}
            title={approach.heading}
            id="approach-title"
            className="mb-5"
          />

          <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {approach.pillars.slice(0, 3).map((pillar, index) => (
              <RevealItem
                key={pillar.title}
                className="flex min-w-0 flex-col gap-3 border-t border-ink-200 pt-6"
              >
                <span className="text-[0.66rem] font-semibold tabular-nums tracking-widest-xl text-champagne-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-fluid-xl leading-tight text-ink-900">
                  {pillar.title}
                </h3>
                <p className="text-fluid-sm leading-relaxed text-ink-400">{pillar.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Creative process */}
      <section className="bleed bg-ink-900 section" aria-labelledby="about-process-title">
        <div className="shell">
          <SectionHeading
            eyebrow={creativeProcess.eyebrow}
            title={creativeProcess.heading}
            id="about-process-title"
            tone="light"
            className="mb-5"
          />
          <ProcessSteps steps={creativeProcess.steps} tone="dark" columns={6} />
        </div>
      </section>

      {/* The studio */}
      <section className="section" aria-labelledby="studio-title">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Vertical rather than horizontal: on the stacked mobile layout a
              sideways offset would start the image outside the viewport. */}
          <Reveal direction="up" className="min-w-0">
            <OptimizedImage
              src="/assets/images/works/studioz-d-pre-wedding-candlelit-hall.webp"
              alt="Couple in a warm hall lined with lit wall lamps, photographed by Studioz D"
              /* 3:2 — the ratio of the file, so nothing is cropped. */
              aspect="3/2"
              sizes={SIZES.half}
              className="w-full"
            />
          </Reveal>

          <div className="flex min-w-0 flex-col gap-6">
            <SectionHeading
              eyebrow={studio.eyebrow}
              title={studio.heading}
              id="studio-title"
              titleClassName="text-fluid-2xl"
            />

            {studio.body.slice(0, 1).map((paragraph, index) => (
              <Reveal key={index} direction="up" delay={index * 0.06}>
                <p className="max-w-prose text-fluid-base leading-relaxed text-ink-500">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal direction="up" delay={0.16}>
              <ul className="flex flex-col gap-2.5 border-t border-ink-200 pt-6">
                {studio.facilities.map((facility) => (
                  <li key={facility} className="flex items-start gap-3 text-fluid-sm text-ink-500">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne-600"
                      aria-hidden="true"
                    />
                    <span className="min-w-0">{facility}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-[0.72rem] leading-relaxed text-ink-300">{studio.addressNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Behind the scenes */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="bts-title">
        <div className="shell">
          <SectionHeading
            eyebrow={behindTheScenes.eyebrow}
            title={behindTheScenes.heading}
            id="bts-title"
            lede={behindTheScenes.body[0]}
            className="mb-5"
          />

          <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {behindTheScenes.notes.map((note) => (
              <RevealItem
                key={note.label}
                className="flex min-w-0 flex-col gap-2 border-t border-ink-200 pt-5"
              >
                <span className="text-[0.62rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
                  {note.label}
                </span>
                <span className="text-fluid-sm leading-relaxed text-ink-500">{note.value}</span>
              </RevealItem>
            ))}
          </RevealGroup>

        </div>
      </section>

      {/* Team — roles only until the studio supplies names */}
      <section className="section" aria-labelledby="team-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Our Team"
            title="Six roles, one room"
            id="team-title"
            lede="A small team with clear roles — whoever shoots your day is never rushed to edit it."
            className="mb-5"
          />

          <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <RevealItem key={member.id} className="flex min-w-0 flex-col gap-3">
                {member.image && (
                  <OptimizedImage
                    src={member.image}
                    alt={member.name ? `${member.name}, ${member.role}` : member.role}
                    aspect="4/5"
                    sizes={SIZES.third}
                    className="mb-2 w-full"
                  />
                )}

                <span className="text-[0.62rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
                  {member.role}
                </span>

                {member.name && (
                  <h3 className="font-display text-fluid-xl text-ink-900">{member.name}</h3>
                )}

                <p className="text-fluid-sm leading-relaxed text-ink-400">{member.focus}</p>

                {member.bio && (
                  <p className="text-fluid-sm leading-relaxed text-ink-400">{member.bio}</p>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection
        eyebrow="Work With Us"
        headingLines={['If it matters to you,', 'it is worth photographing properly.']}
        copy="Tell us what you are planning. We will tell you honestly how we would approach it — and whether we are the right studio for it."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'See Our Work', to: '/works' }}
      />
    </>
  );
};

export default About;
