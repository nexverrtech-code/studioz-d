import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { BrandHero } from '@/components/hero/BrandHero';
import { TwoWorlds } from '@/components/sections/TwoWorlds';
import { SectionHeading } from '@/components/common/SectionHeading';
import { CardDeck } from '@/components/sections/CardDeck';
import { Testimonials } from '@/components/sections/Testimonials';
import { Reveal, RevealText } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/buttons/MagneticButton';
import { getFeaturedWorks } from '@/data/works';
import { getFeaturedGifts } from '@/data/gifts';
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/utils/seo';
import { siteConfig } from '@/config/site';
import { trackCta } from '@/services/analytics.service';

/**
 * The landing page is a GATEWAY, not a summary of the whole site.
 *
 * Studioz D runs two businesses. Previously this page tried to present both in
 * full — thirteen sections, the entire services grid, the whole gift taxonomy
 * — which meant a visitor had to scroll past one business to find the other.
 *
 * Now it does four things and stops: says who the studio is, asks which world
 * you want, proves BOTH halves are real, and offers a way in. The photography
 * detail lives at /services and the gifting detail at /gifts.
 *
 * Balance is the rule here. Every band either covers both businesses (the
 * hero, Two Worlds, the story, the closing CTA) or is one of a matched pair
 * (Selected Works / Selected Creations). Nothing on this page belongs to one
 * half without its counterpart.
 */
export const Home = () => {
  // Six is enough to prove the work without duplicating the Works page.
  const selectedWorks = getFeaturedWorks(6);

  /*
   * The gifting half gets a band of its own rather than a link in a paragraph.
   * Without it this page showed six photographs and no products, which read as
   * a photography site that also sells something — the opposite of the point.
   */
  const selectedCreations = getFeaturedGifts(8);

  /* Both decks take the same card shape; each keeps its photographs' ratio. */
  const workCards = selectedWorks.map((work) => ({
    key: work.slug,
    to: `/works/${work.slug}`,
    image: work.coverImage,
    alt: `${work.title} — ${work.category} photography by Studioz D`,
    eyebrow: work.category,
    title: work.title,
    cta: 'View story',
  }));
  const giftCards = selectedCreations.map((gift) => ({
    key: gift.slug,
    to: `/gifts/product/${gift.slug}`,
    image: gift.images[0]?.src,
    alt: gift.images[0]?.alt ?? gift.name,
    eyebrow: gift.category,
    title: gift.name,
    cta: 'Customize',
  }));

  return (
    <>
      <Seo
        title={null}
        description={siteConfig.description}
        path="/"
        image="/assets/images/works/studioz-d-wedding-sparkler-entry.webp"
        schemas={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
      />

      {/* 1 — Cinematic brand hero */}
      <BrandHero />

      {/* 2 — Two Worlds: the choice this page exists to offer */}
      <TwoWorlds />

      {/* Real Google reviews, just before the work they describe */}
      <Testimonials />

      {/* 3 — Selected works: a tease, not the gallery */}
      <section className="bleed bg-ivory-100 section" aria-labelledby="selected-works-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected Works"
            title="Moments we were trusted with"
            id="selected-works-title"
            action={{ label: 'View all works', to: '/works' }}
            className="mb-4"
            titleClassName="text-fluid-2xl"
          />
          <CardDeck cards={workCards} aspect="3/2" />
        </div>
      </section>

      {/* 4 — Selected creations: the gifting half, at equal weight */}
      <section className="section" aria-labelledby="selected-creations-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected Creations"
            title="Things people kept"
            id="selected-creations-title"
            action={{ label: 'View all gifts', to: '/gifts' }}
            className="mb-4"
            titleClassName="text-fluid-2xl"
          />
          <CardDeck cards={giftCards} aspect="1/1" />
        </div>
      </section>

      {/* 5 — Short studio story */}
      <section className="section" aria-labelledby="studio-story-title">
        <div className="shell grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <h2
            id="studio-story-title"
            className="font-display text-[clamp(1.8rem,1.4rem+1.9vw,2.9rem)] uppercase leading-[1.04] text-ink-900"
          >
            <span className="block">
              <RevealText text="Capture it." />
            </span>
            <span className="block">
              <RevealText text="Create it." delay={0.08} />
            </span>
            <span className="block text-champagne-700">
              <RevealText text="Keep it." delay={0.16} />
            </span>
          </h2>

          <div className="flex flex-col gap-5">
            <Reveal direction="up">
              <p className="max-w-prose text-fluid-lg leading-relaxed text-ink-600">
                We photograph the moments you plan for years — then print, frame and engrave
                them into something you can hold.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.14}>
              <Link
                to="/about"
                className="link-underline self-start text-[0.72rem] font-semibold uppercase tracking-widest-xl text-ink-900"
              >
                About the studio
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 — Final CTA, routing back into the two worlds */}
      <section className="bleed bg-ink-900" aria-labelledby="home-cta-title">
        <div className="shell py-section">
          <div className="flex flex-col items-center gap-7 text-center">
            <Reveal direction="fade">
              <p className="eyebrow flex items-center gap-3 text-champagne-400">
                <span className="h-px w-8 bg-champagne-400/50" aria-hidden="true" />
                Where to next
              </p>
            </Reveal>

            <h2
              id="home-cta-title"
              className="max-w-[22ch] font-display text-[clamp(1.9rem,1.35rem+2.5vw,3.6rem)] uppercase leading-[1.03] text-ivory-50"
            >
              <span className="block">
                <RevealText text="Your story deserves to become" />
              </span>
              <span className="block">
                <RevealText text="something you can keep." delay={0.08} />
              </span>
            </h2>

            <Reveal direction="up" delay={0.16}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton
                  to="/services"
                  variant="light"
                  icon={ArrowUpRight}
                  onClick={() => trackCta('Explore Photography', 'home-cta')}
                >
                  Explore Photography
                </MagneticButton>
                <MagneticButton
                  to="/gifts"
                  variant="ghostLight"
                  icon={ArrowUpRight}
                  onClick={() => trackCta('Explore Gifts', 'home-cta')}
                >
                  Explore Gifts
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
