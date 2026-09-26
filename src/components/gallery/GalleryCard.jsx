import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';
import { useCanHover } from '@/hooks/useMediaQuery';

/**
 * A single photograph in the gallery.
 *
 * Two behaviours, chosen by pointer capability rather than screen width:
 *
 *  hover-capable → caption is revealed on hover over a soft scrim
 *  touch         → caption sits permanently BELOW the image
 *
 * That second rule is the important one: on touch there is no hover, so
 * hiding the title behind one would make it unreachable. The photograph is
 * never permanently covered in either mode.
 *
 * Renders as a button (opens the lightbox) or a link (opens the project),
 * so keyboard users get the correct semantics either way.
 */
export const GalleryCard = ({
  photo,
  onOpen,
  index = 0,
  priority = false,
  sizes = SIZES.masonry,
  showMeta = true,
  className,
}) => {
  const canHover = useCanHover();

  const media = (
    <OptimizedImage
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      aspect={photo.aspect}
      sizes={sizes}
      priority={priority}
      className="w-full bg-ivory-200"
      imgClassName={cn(
        'transition-transform duration-[900ms] ease-editorial',
        canHover && 'group-hover:scale-[1.035]'
      )}
    >
      {/* Hover caption — desktop only, and only while hovered */}
      {canHover && showMeta && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent p-5 opacity-0 transition-opacity duration-500 ease-editorial group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <span className="block text-[0.6rem] font-semibold uppercase tracking-widest-xl text-champagne-400">
            {photo.category}
          </span>
          <span className="mt-1 flex items-end justify-between gap-3">
            <span className="clamp-2 font-display text-fluid-lg leading-tight text-ivory-100">
              {photo.workTitle}
            </span>
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-ivory-100"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </span>
        </span>
      )}
    </OptimizedImage>
  );

  const content = (
    <>
      {media}
      {/* Touch caption — always visible, sits below the frame */}
      {!canHover && showMeta && (
        <span className="mt-3 flex items-start justify-between gap-3">
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[0.58rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
              {photo.category}
            </span>
            <span className="clamp-2 font-display text-fluid-base leading-tight text-ink-900">
              {photo.workTitle}
            </span>
          </span>
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-ink-400"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      )}
    </>
  );

  const shared = cn('group block w-full max-w-full text-left', className);

  if (onOpen) {
    return (
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`View ${photo.workTitle} — ${photo.category}. ${photo.alt}`}
        className={shared}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={`/works/${photo.workSlug}`}
      aria-label={`Open ${photo.workTitle} — ${photo.category} project`}
      className={shared}
    >
      {content}
    </Link>
  );
};

export default GalleryCard;
