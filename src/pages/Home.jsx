import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { HomeHero } from '@/components/hero/HomeHero';
import { TwoWorlds } from '@/components/sections/TwoWorlds';
import { SelectedWorksDeck } from '@/components/sections/SelectedWorksDeck';
import { StorySection } from '@/components/sections/StorySection';
import { WhyStudiozD } from '@/components/sections/WhyStudiozD';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaSection } from '@/components/sections/CtaSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { JournalCard } from '@/components/cards/JournalCard';
import { FeaturedGallery } from '@/components/gallery/FeaturedGallery';
import { GiftDiscovery } from '@/components/gifts/GiftDiscovery';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { getFeaturedWorks, getAllPhotos } from '@/data/works';
import { services, getFeaturedServices } from '@/data/services';
import { getFeaturedGifts } from '@/data/gifts';
import { getLatestArticles } from '@/data/journal';
import { creativeProcess } from '@/data/about';
import { GiftCard } from '@/components/cards/GiftCard';
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/utils/seo';
import { siteConfig } from '@/config/site';

/** Eight frames across the full spread of the studio's work. */
const buildFeaturedPhotos = () => {
  const wanted = ['wedding', 'portrait', 'pre-wedding', 'event', 'product', 'gift'];
  const pool = getAllPhotos();
  const picked = [];

  // One signature frame per discipline first, so the set is never dominated
  // by whichever category happens to have the most images.
  for (const category of wanted) {
    const match = pool.find(
      (photo) => photo.categories.includes(category) && !picked.includes(photo)
    );
    if (match) picked.push(match);
  }

  // Top up from the featured projects to reach eight.
  for (const photo of pool) {
    if (picked.length >= 8) break;
    if (!picked.includes(photo)) picked.push(photo);
  }

  return picked.slice(0, 8);
};

export const Home = () => {
  const featuredWorks = getFeaturedWorks(6);
  const featuredPhotos = buildFeaturedPhotos();
  const featuredServices = getFeaturedServices(8);
  const featuredGifts = getFeaturedGifts(4);
  const latestArticles = getLatestArticles(3);

  return (
    <>
      <Seo
        title={null}
        description={siteConfig.description}
        path="/"
        schemas={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
      />

      {/* 1 — Hero */}
      <HomeHero />

      {/* 2 — Two Worlds */}
      <TwoWorlds />

      {/* 3 — Selected Works */}
      <section className="section-sm" aria-labelledby="selected-works-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected Works"
            title="A collection of moments, stories and creations"
            id="selected-works-title"
            lede="Six projects that show how we see a day, a person, a product — and what happens to the photographs afterwards."
            action={{ label: 'View all works', to: '/works' }}
            className="mb-8"
          />
        </div>
        <div className="shell">
          <SelectedWorksDeck works={featuredWorks} />
        </div>
      </section>

      {/* 4 — Photography Story */}
      <StorySection
        eyebrow="Our Photography"
        headingLines={['We don’t just take pictures.', 'We notice the moment.']}
        paragraphs={[
          'The quiet glance before the ceremony. The laugh nobody planned. The hands that find each other in a crowded room. The little details that become the biggest memories.',
          'Studioz D approaches photography as visual storytelling — combining observation, composition, emotion and cinematic perspective to create photographs that still feel alive years later.',
        ]}
        cta={{ label: 'Discover Our Photography', to: '/services' }}
        image="/assets/images/works/studioz-d-pre-wedding-bougainvillea-close.webp"
        imageAlt="Couple standing close together framed by bougainvillea branches, photographed by Studioz D"
        secondaryImage="/assets/images/works/studioz-d-wedding-bridal-portrait-bouquet.webp"
        secondaryImageAlt="Bridal portrait behind a white bouquet, photographed by Studioz D"
      />

      {/* 5 — Photography Categories */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="services-title">
        <div className="shell">
          <SectionHeading
            eyebrow="What We Photograph"
            title="Created around your story"
            id="services-title"
            lede="Twelve ways we work with light — from a full wedding day to a single product on a white ground."
            action={{ label: 'All services', to: '/services' }}
            className="mb-8"
          />

          <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, index) => (
              <RevealItem key={service.slug} className="min-w-0">
                <ServiceCard service={service} priority={index < 2} />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-12 flex justify-center">
            <Link to="/services" className="btn btn-outline">
              See all {services.length} services
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6 — Customized Gifts */}
      <StorySection
        tone="dark"
        reverse
        eyebrow="Customized Gifts"
        headingLines={['A photograph on a drive', 'is not a photograph.']}
        paragraphs={[
          'Choose a memory. Add your words. Make it yours. Frames, albums, hampers and keepsakes built from photographs you already have — or ones we take for you.',
          'Everything is printed, framed and personalized in our own workshop, which is why the object and the image end up looking like they belong together.',
        ]}
        cta={{ label: 'Explore Gifts', to: '/gifts' }}
        image="/assets/images/works/studioz-d-wedding-church-entrance.webp"
        imageAlt="Bride and groom at the church entrance beneath a chandelier, photographed by Studioz D"
        secondaryImage="/assets/images/works/studioz-d-pre-wedding-overhead-sand.webp"
        secondaryImageAlt="Overhead frame of a couple lying on wet sand beside a bouquet, photographed by Studioz D"
      />

      {/* 7 — Gift Discovery */}
      <section className="section" aria-labelledby="gift-discovery-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Find the Right One"
            title="Four ways in"
            id="gift-discovery-title"
            lede="Start with the occasion, the person, the object, or simply what you want to say."
            action={{ label: 'All gifts', to: '/gifts' }}
            className="mb-8"
          />

          <GiftDiscovery groups={['occasion']} />

          <div className="mt-14">
            <div className="mb-8 flex items-end justify-between gap-6">
              <h3 className="font-display text-fluid-2xl text-ink-900">Most asked for</h3>
              <Link
                to="/gifts"
                className="link-underline shrink-0 text-[0.7rem] font-semibold uppercase tracking-widest-xl text-ink-900"
              >
                Browse all
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>

            <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
              {featuredGifts.map((gift) => (
                <RevealItem key={gift.slug} className="min-w-0">
                  <GiftCard gift={gift} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* 8 — Featured Work */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="featured-gallery-title">
        <div className="shell">
          <SectionHeading
            eyebrow="From the Gallery"
            title="Frames worth stopping on"
            id="featured-gallery-title"
            lede="A mix from across the studio — weddings, portraits, products and the gifts that came out of them."
            action={{ label: 'View all works', to: '/works' }}
            className="mb-8"
          />

          <FeaturedGallery photos={featuredPhotos} />
        </div>
      </section>

      {/* 9 — Why Studioz D */}
      <WhyStudiozD />

      {/* 10 — Creative Process */}
      <section className="bleed bg-ink-900 section" aria-labelledby="process-title">
        <div className="shell">
          <SectionHeading
            eyebrow={creativeProcess.eyebrow}
            title={creativeProcess.heading}
            id="process-title"
            tone="light"
            className="mb-9"
          />
          <ProcessSteps steps={creativeProcess.steps} tone="dark" columns={6} />
        </div>
      </section>

      {/* 11 — Testimonials */}
      <Testimonials />

      {/* 12 — Journal Preview */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="journal-title">
        <div className="shell">
          <SectionHeading
            eyebrow="The Journal"
            title="Guides, notes and things worth knowing first"
            id="journal-title"
            lede="Practical writing from the studio — how to prepare, what to expect, and how to choose well."
            action={{ label: 'Read the journal', to: '/journal' }}
            className="mb-8"
          />

          <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3">
            {latestArticles.map((article, index) => (
              <RevealItem key={article.slug} className="min-w-0">
                <JournalCard article={article} priority={index === 0} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 13 — CTA */}
      <CtaSection />
    </>
  );
};

export default Home;
