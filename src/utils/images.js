/**
 * Image helpers.
 *
 * All responsive-source logic lives here so `OptimizedImage` stays the only
 * component that knows how a picture element is assembled.
 *
 * HOW REPLACEMENT WORKS
 * ---------------------
 * The shipped placeholders are SVG (vector — a srcset would be meaningless).
 * When real raster photography replaces them, `buildSources` automatically
 * starts emitting AVIF/WebP `<source>` entries and a width-based `srcSet`,
 * provided the variants exist alongside the original:
 *
 *   studioz-d-wedding-01.webp        ← the `src` in the data file
 *   studioz-d-wedding-01-640.webp    ← generated variants
 *   studioz-d-wedding-01-1024.webp
 *   studioz-d-wedding-01-1600.webp
 *   studioz-d-wedding-01.avif        ← optional modern format
 */

/** Widths we ask the browser to choose between. */
export const RESPONSIVE_WIDTHS = [480, 640, 960, 1280, 1600, 1920];

/** Vector and animated formats must never get a width-based srcset. */
const NON_RESPONSIVE = /\.(svg|gif)$/i;

export const isVector = (src = '') => /\.svg$/i.test(src);

const splitExtension = (src = '') => {
  const index = src.lastIndexOf('.');
  if (index < 0) return [src, ''];
  return [src.slice(0, index), src.slice(index + 1)];
};

/**
 * Builds `<source>` descriptors plus a fallback srcSet.
 * Returns `{ sources: [], srcSet: '' }` for vectors, which is exactly right.
 */
export const buildSources = (src, { widths = RESPONSIVE_WIDTHS, formats = ['avif', 'webp'] } = {}) => {
  if (!src || NON_RESPONSIVE.test(src)) return { sources: [], srcSet: '' };

  const [base, ext] = splitExtension(src);
  const candidates = widths.map((width) => ({ width }));

  const sources = formats.map((format) => ({
    type: `image/${format}`,
    srcSet: candidates.map(({ width }) => `${base}-${width}.${format} ${width}w`).join(', '),
  }));

  const srcSet = candidates.map(({ width }) => `${base}-${width}.${ext} ${width}w`).join(', ');

  return { sources, srcSet };
};

/**
 * Sensible `sizes` presets. Passing the right one is what stops a phone
 * downloading a 1920px file for a 170px thumbnail.
 */
export const SIZES = {
  /** Edge-to-edge hero. */
  full: '100vw',
  /** Half-width on desktop, full on mobile. */
  half: '(min-width: 1024px) 50vw, 100vw',
  /** Three-up grid. */
  third: '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw',
  /** Four-up product grid. */
  quarter: '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw',
  /** Masonry column. */
  masonry: '(min-width: 1440px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  /** Small card thumbnail. */
  thumb: '(min-width: 768px) 220px, 140px',
  /** Lightbox — capped so we never fetch more than the viewport can show. */
  lightbox: '(min-width: 1024px) 90vw, 100vw',
};

/**
 * CSS `aspect-ratio` value. Always returns something, so a card can reserve
 * its box even when dimensions are missing from the data.
 */
export const aspectValue = (image, fallback = '3 / 2') => {
  if (!image) return fallback;
  if (image.aspect) return image.aspect.replace('/', ' / ');
  if (image.width && image.height) return `${image.width} / ${image.height}`;
  return fallback;
};

/**
 * Masonry column balancing.
 *
 * Rather than a fixed round-robin (which produces ragged bottoms), each image
 * goes into whichever column is currently shortest, measured in relative
 * height. That is what gives the grid its art-directed rhythm while keeping
 * every column roughly level.
 */
export const distributeIntoColumns = (items, columnCount) => {
  const count = Math.max(1, columnCount);
  const columns = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);

  for (const item of items) {
    const ratio = item.width && item.height ? item.height / item.width : 1.4;
    let shortest = 0;
    for (let i = 1; i < count; i += 1) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(item);
    heights[shortest] += ratio;
  }

  return columns;
};

/**
 * A 1×1 transparent GIF. Used as the `src` of a decorative placeholder so a
 * failed load never shows the browser's broken-image glyph.
 */
export const BLANK_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
