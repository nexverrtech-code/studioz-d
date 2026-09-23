import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Reveal, RevealText } from '@/components/motion/Reveal';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Interior page hero.
 *
 * Two variants:
 *  `image` — a photograph behind the type, with a scrim tuned for contrast
 *  `plain` — type on the ivory surface, used where no hero image exists
 *
 * Both reserve header height with `pt-header`, so the fixed header never
 * overlaps the breadcrumb or the headline.
 */
export const PageHero = ({
  eyebrow,
  title,
  lede,
  image,
  imageAlt = '',
  variant = image ? 'image' : 'plain',
  breadcrumbs,
  align = 'left',
  children,
  className,
  minHeight = '42svh',
}) => {
  const isImage = variant === 'image';
  const tone = isImage ? 'light' : 'dark';
  const centered = align === 'center';

  return (
    <section
      className={cn(
        'bleed relative pt-header',
        isImage ? 'bg-ink-900' : 'bg-ivory-50',
        className
      )}
    >
      {isImage && (
        <>
          <div className="absolute inset-0">
            <OptimizedImage
              src={image}
              alt={imageAlt}
              sizes={SIZES.full}
              priority
              className="h-full w-full"
              imgClassName="h-full w-full"
              style={{ aspectRatio: 'auto' }}
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/55 to-ink-950/30"
            aria-hidden="true"
          />
        </>
      )}

      <div
        className={cn('shell relative flex flex-col justify-end', isImage ? 'pb-10 pt-20' : 'pb-9 pt-12')}
        style={{ minHeight: isImage ? minHeight : undefined }}
      >
        {breadcrumbs && (
          <Breadcrumbs trail={breadcrumbs} tone={tone} className="mb-5" />
        )}

        <div
          className={cn(
            'flex flex-col gap-5',
            centered && 'items-center text-center'
          )}
        >
          {eyebrow && (
            <Reveal direction="fade" duration={0.5}>
              <p
                className={cn(
                  'eyebrow flex items-center gap-3',
                  isImage && 'text-champagne-400'
                )}
              >
                <span
                  className={cn(
                    'h-px w-8 shrink-0',
                    isImage ? 'bg-champagne-400/50' : 'bg-ink-300'
                  )}
                  aria-hidden="true"
                />
                {eyebrow}
              </p>
            </Reveal>
          )}

          <h1
            className={cn(
              'font-display uppercase leading-[0.96] tracking-[0.01em]',
              'text-[clamp(2.1rem,1.4rem+3.2vw,4.4rem)]',
              isImage ? 'text-ivory-50' : 'text-ink-900',
              centered ? 'max-w-[20ch]' : 'max-w-[18ch]'
            )}
          >
            <RevealText text={title} />
          </h1>

          {lede && (
            <Reveal direction="up" delay={0.14}>
              <p
                className={cn(
                  'lede',
                  isImage && 'text-ivory-200/85',
                  centered && 'mx-auto'
                )}
              >
                {lede}
              </p>
            </Reveal>
          )}

          {children && (
            <Reveal direction="up" delay={0.2} className="mt-2">
              {children}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
