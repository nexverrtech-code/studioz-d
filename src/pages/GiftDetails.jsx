import { useEffect, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowRight, Package, Ruler, Sparkles, Wrench } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SectionHeading } from '@/components/common/SectionHeading';
import { CustomizePreview } from '@/components/gifts/CustomizePreview';
import { GiftCard } from '@/components/cards/GiftCard';
import { CtaSection } from '@/components/sections/CtaSection';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { WhatsAppButton, EmailButton } from '@/components/buttons/ContactButtons';
import { getGiftBySlug, getRelatedGifts, priceTiers, getGiftCategory } from '@/data/gifts';
import { breadcrumbSchema, giftProductSchema } from '@/utils/seo';
import { trackGiftView } from '@/services/analytics.service';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

export const GiftDetails = () => {
  const { slug } = useParams();
  const gift = getGiftBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (gift) trackGiftView(gift);
    setActiveImage(0);
  }, [gift]);

  if (!gift) return <Navigate to="/404" replace />;

  const related = getRelatedGifts(gift.slug, 4);
  const tier = priceTiers.find((entry) => entry.id === gift.priceTier);
  const primaryCategory = gift.categories
    .map((id) => getGiftCategory(id))
    .find((entry) => entry?.routable);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Gifts', path: '/gifts' },
    ...(primaryCategory
      ? [{ name: primaryCategory.label, path: `/gifts/${primaryCategory.slug}` }]
      : []),
    { name: gift.name, path: `/gifts/product/${gift.slug}` },
  ];

  const enquiryMessage = `Hello Studioz D, I would like to enquire about the ${gift.name}.`;

  const specs = [
    { icon: Package, label: 'Material', value: gift.material },
    { icon: Ruler, label: 'Sizes', value: gift.sizes.join(' · ') },
    { icon: Wrench, label: 'Production', value: gift.production },
    { icon: Sparkles, label: 'Care', value: gift.care },
  ];

  return (
    <>
      <Seo
        title={gift.name}
        description={`${gift.description} Personalized and made to order by Studioz D.`}
        path={`/gifts/product/${gift.slug}`}
        image={gift.images[0]?.src}
        type="product"
        schemas={[breadcrumbSchema(trail), giftProductSchema(gift)]}
      />

      <div className="pt-header">
        <div className="shell pt-8">
          <Breadcrumbs trail={trail} />
        </div>
      </div>

      {/* Product header */}
      <section className="section-sm">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          {/* -------------------------------------------------- Gallery */}
          <div className="flex min-w-0 flex-col gap-4">
            <OptimizedImage
              src={gift.images[activeImage]?.src}
              alt={gift.images[activeImage]?.alt ?? gift.name}
              width={gift.images[activeImage]?.width}
              height={gift.images[activeImage]?.height}
              aspect="1/1"
              /* contain, not cover: the gallery must never crop a product. */
              objectFit="contain"
              sizes={SIZES.half}
              priority
              className="w-full bg-ivory-100"
            />

            {gift.images.length > 1 && (
              <div
                className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="group"
                aria-label="Product images"
              >
                {gift.images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show image ${index + 1} of ${gift.images.length}`}
                    aria-pressed={index === activeImage}
                    className={cn(
                      'w-20 shrink-0 border-2 transition-colors sm:w-24',
                      index === activeImage ? 'border-ink-900' : 'border-transparent hover:border-ink-200'
                    )}
                  >
                    <OptimizedImage
                      src={image.src}
                      alt=""
                      aspect="1/1"
                      sizes={SIZES.thumb}
                      className="w-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ----------------------------------------------------- Detail */}
          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-ink-300" aria-hidden="true" />
                {gift.category}
              </p>
              <h1 className="font-display text-[clamp(1.9rem,1.4rem+2.2vw,3.2rem)] leading-tight text-ink-900">
                {gift.name}
              </h1>
              <p className="text-fluid-lg italic text-ink-400">{gift.tagline}</p>
            </div>

            <p className="max-w-prose text-fluid-base leading-relaxed text-ink-600">
              {gift.longDescription}
            </p>

            {/* Price row — honest placeholder, no invented figure */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ink-100 py-5">
              <div className="flex flex-col">
                <span className="font-display text-fluid-xl text-ink-900">Price on enquiry</span>
                <span className="text-[0.68rem] text-ink-300">
                  Every piece is made to order and quoted individually.
                </span>
              </div>
              {tier && (
                <span className="chip" title={tier.note}>
                  {tier.label}
                </span>
              )}
            </div>

            {/* Personalization */}
            {gift.personalization.available && (
              <div className="flex flex-col gap-3 bg-ivory-100 p-5">
                <p className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-widest-xl text-ink-900">
                  <Sparkles className="h-3.5 w-3.5 text-champagne-600" strokeWidth={1.8} aria-hidden="true" />
                  Personalization
                </p>
                <div className="flex flex-wrap gap-2">
                  {gift.personalization.fields.map((field) => (
                    <span
                      key={field}
                      className="border border-ink-200 px-2.5 py-1 text-[0.62rem] uppercase tracking-widest text-ink-600"
                    >
                      {field}
                    </span>
                  ))}
                </div>
                <p className="text-fluid-sm text-ink-500">{gift.personalization.note}</p>
              </div>
            )}

            {/* Options */}
            {gift.options.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="eyebrow">Available options</p>
                <div className="flex flex-wrap gap-2">
                  {gift.options.map((option) => (
                    <span key={option} className="chip">
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Enquiry */}
            <div className="mt-2 flex flex-wrap gap-3">
              <WhatsAppButton
                message={enquiryMessage}
                context={`gift:${gift.slug}`}
                variant="solid"
              >
                Ask About This Gift
              </WhatsAppButton>
              <EmailButton
                subject={`Enquiry — ${gift.name}`}
                body={enquiryMessage}
                context={`gift:${gift.slug}`}
              />
              <Link to="/contact" className="btn btn-outline">
                Enquiry Form
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bleed bg-ivory-100 section-sm" aria-labelledby="gift-specs">
        <div className="shell">
          <SectionHeading
            eyebrow="The Details"
            title="What it is made of, and how"
            id="gift-specs"
            className="mb-7"
            titleClassName="text-fluid-2xl"
          />
          <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label} className="flex min-w-0 flex-col gap-2 border-t border-ink-200 pt-5">
                <dt className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
                  <spec.icon className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" />
                  {spec.label}
                </dt>
                <dd className="text-fluid-sm leading-relaxed text-ink-500">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Customize preview */}
      {gift.personalization.available && (
        <section className="section" aria-labelledby="gift-customize">
          <div className="shell">
            <SectionHeading
              eyebrow="Customize"
              title="See it with your words on it"
              id="gift-customize"
              lede="A live preview, right here in your browser. Nothing is uploaded or stored."
              className="mb-8"
              titleClassName="text-fluid-2xl"
            />
            <CustomizePreview gift={gift} />
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bleed bg-ivory-100 section" aria-labelledby="gift-related">
          <div className="shell">
            <SectionHeading
              eyebrow="You Might Also Like"
              title="Related creations"
              id="gift-related"
              action={{ label: 'All gifts', to: '/gifts' }}
              className="mb-8"
              titleClassName="text-fluid-2xl"
            />
            <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
              {related.map((item) => (
                <RevealItem key={item.slug} className="min-w-0">
                  <GiftCard gift={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaSection
        eyebrow="Make It Yours"
        headingLines={['A gift that could have gone', 'to anyone will be treated like it did.']}
        copy="Send us the photographs and the words. We will proof it with you before anything is made."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'Browse Gifts', to: '/gifts' }}
        whatsappMessage={enquiryMessage}
      />
    </>
  );
};

export default GiftDetails;
