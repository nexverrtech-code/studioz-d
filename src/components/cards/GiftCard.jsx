import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { priceTiers } from '@/data/gifts';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

/**
 * Gift product card.
 *
 * PRICE: renders "Price on enquiry" because Studioz D has not supplied
 * figures. The tier label beside it is a planning band, not a price. Swap
 * both for a real currency value when pricing exists — the layout already
 * reserves the row.
 *
 * Sizing: the whole card is fluid and `h-full`, so a two-up mobile grid at
 * 320px still produces readable cards rather than crushed ones.
 */
/**
 * How far from square an image may be before the card stops cropping it.
 *
 * The supplied product photography is 1800x1776 — 1.4% off square, which a
 * square tile crops invisibly. Anything further out (a 3:4 standee, a 4:3
 * framed print) is letterboxed onto the card's own ivory instead, so the grid
 * still aligns and no product is ever shown with a quarter of it missing.
 */
const SQUARE_TOLERANCE = 0.15;

export const GiftCard = ({ gift, priority = false, className, dense = false }) => {
  const tier = priceTiers.find((entry) => entry.id === gift.priceTier);
  const image = gift.images[0];
  const ratio = image?.width && image?.height ? image.width / image.height : 1;
  const fitsSquare = Math.abs(ratio - 1) <= SQUARE_TOLERANCE;

  return (
    <Link
      to={`/gifts/product/${gift.slug}`}
      data-cursor="open"
      className={cn('group flex h-full w-full max-w-full flex-col', className)}
      aria-label={`${gift.name} — ${gift.description}`}
    >
      <div className="relative">
        <OptimizedImage
          src={image?.src}
          alt={image?.alt ?? `${gift.name} by Studioz D`}
          width={image?.width}
          height={image?.height}
          aspect="1/1"
          objectFit={fitsSquare ? 'cover' : 'contain'}
          sizes={SIZES.quarter}
          priority={priority}
          className="w-full bg-ivory-100"
          imgClassName="transition-transform duration-[900ms] ease-editorial hoverable:group-hover:scale-[1.05]"
        />

        {gift.personalization.available && (
          <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 bg-ivory-50/95 px-2.5 py-1.5 text-[0.55rem] font-semibold uppercase tracking-widest text-ink-800 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-champagne-600" strokeWidth={1.8} aria-hidden="true" />
            Personalized
          </span>
        )}

        {gift.newest && (
          <span className="pointer-events-none absolute right-3 top-3 bg-ink-900 px-2.5 py-1.5 text-[0.55rem] font-semibold uppercase tracking-widest text-ivory-100">
            New
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-4">
        <span className="text-[0.56rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
          {gift.category}
        </span>

        <h3 className="clamp-2 font-display text-fluid-lg leading-tight text-ink-900">
          {gift.name}
        </h3>

        {!dense && (
          <p className="clamp-2 text-fluid-xs leading-relaxed text-ink-400">{gift.description}</p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <span className="flex min-w-0 flex-col">
            <span className="text-[0.68rem] font-medium text-ink-700">Price on enquiry</span>
            {tier && (
              <span className="text-[0.56rem] uppercase tracking-widest text-ink-300">
                {tier.label}
              </span>
            )}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[0.58rem] font-semibold uppercase tracking-widest-xl text-ink-900">
            Customize
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GiftCard;
