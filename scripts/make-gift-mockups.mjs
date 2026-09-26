/**
 * Gift presentation mockups.
 *
 * The gifting half of Studioz D has supplied no product photography, and the
 * abstract placeholders looked visibly weaker than the real photographs beside
 * them — which made the "two equal worlds" idea on the landing page fall flat.
 *
 * These are composites, NOT invented products: a real Studioz D photograph
 * presented inside a frame on a wall, which is literally what the gifting
 * service does with it. Nothing is claimed that is not true, and no AI imagery
 * or stock photography is involved.
 *
 * Replace these the moment real product shots exist — they are a stopgap, and
 * `npm run photos -- <folder> gifts` is the path.
 *
 *   npm run mockups
 */

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WORKS = path.join(ROOT, 'public', 'assets', 'images', 'works');
const OUT = path.join(ROOT, 'public', 'assets', 'images', 'gifts');

/** Must match RESPONSIVE_WIDTHS in src/utils/images.js. */
const WIDTHS = [480, 640, 960, 1280, 1600, 1920];

/** Warm neutral wall tones, drawn from the site's ivory/champagne palette. */
const WALL = { top: '#EFE7DB', bottom: '#DED2C2' };

const svgWall = (w, h) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="${WALL.top}"/>
      <stop offset="100%" stop-color="${WALL.bottom}"/>
    </linearGradient>
    <radialGradient id="pool" cx="50%" cy="34%" r="62%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#wall)"/>
  <rect width="${w}" height="${h}" fill="url(#pool)"/>
</svg>`);

/** Soft contact shadow under and around the frame. */
const svgShadow = (w, h, fx, fy, fw, fh) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${Math.round(fw * 0.045)}"/>
    </filter>
  </defs>
  <rect x="${fx + fw * 0.02}" y="${fy + fh * 0.035}" width="${fw}" height="${fh}"
        fill="#3C3531" opacity="0.28" filter="url(#blur)"/>
</svg>`);

/**
 * Builds one framed-print mockup.
 *
 * @param source  a real photograph from public/assets/images/works
 * @param out     output filename
 * @param opts    canvas size, frame colour and mat width
 */
const buildFrame = async (source, out, { width, height, frame = '#2A2522', mat = 0.055, scale = 0.68 }) => {
  // Frame occupies `scale` of the canvas width, centred slightly high.
  const frameW = Math.round(width * scale);
  const photoAspect = 4 / 5;
  const frameH = Math.round(frameW / photoAspect);
  const frameX = Math.round((width - frameW) / 2);
  const frameY = Math.round((height - frameH) / 2 - height * 0.03);

  const border = Math.round(frameW * 0.035);
  const matPx = Math.round(frameW * mat);

  const innerW = frameW - border * 2;
  const innerH = frameH - border * 2;
  const photoW = innerW - matPx * 2;
  const photoH = innerH - matPx * 2;

  const photo = await sharp(path.join(WORKS, source))
    .rotate()
    .resize(photoW, photoH, { fit: 'cover', position: 'attention' })
    .toBuffer();

  // frame plate -> mat -> photo, composited in order
  const framePlate = await sharp({
    create: { width: frameW, height: frameH, channels: 4, background: frame },
  })
    .composite([
      {
        input: await sharp({
          create: { width: innerW, height: innerH, channels: 4, background: '#FBF7F0' },
        })
          .png()
          .toBuffer(),
        top: border,
        left: border,
      },
      { input: photo, top: border + matPx, left: border + matPx },
    ])
    .png()
    .toBuffer();

  const composed = await sharp(svgWall(width, height))
    .composite([
      { input: svgShadow(width, height, frameX, frameY, frameW, frameH), top: 0, left: 0 },
      { input: framePlate, top: frameY, left: frameX },
    ])
    .png()
    .toBuffer();

  await sharp(composed).webp({ quality: 88 }).toFile(path.join(OUT, out));

  /**
   * Responsive variants, matching what `npm run photos` produces.
   *
   * OptimizedImage emits an AVIF/WebP srcSet for every raster image purely
   * from the naming convention. Without these siblings the browser picks a
   * candidate that 404s and the image renders blank — it does NOT fall back
   * to `src`. Shipping the base file alone is not enough.
   */
  const stem = out.replace(/\.webp$/, '');
  for (const target of WIDTHS) {
    if (target > width) continue;
    const resized = sharp(composed).resize({ width: target, withoutEnlargement: true });
    await resized.clone().webp({ quality: 82 }).toFile(path.join(OUT, `${stem}-${target}.webp`));
    await resized.clone().avif({ quality: 62 }).toFile(path.join(OUT, `${stem}-${target}.avif`));
  }

  return out;
};

const run = async () => {
  await mkdir(OUT, { recursive: true });

  const made = [];
  made.push(
    await buildFrame('studioz-d-wedding-bridal-portrait-bouquet.webp', 'studioz-d-gift-framed-print.webp', {
      width: 1280,
      height: 1600,
      frame: '#2A2522',
      scale: 0.66,
    })
  );
  made.push(
    await buildFrame('studioz-d-pre-wedding-golden-hour-close.webp', 'studioz-d-gift-framed-print-oak.webp', {
      width: 1400,
      height: 1400,
      frame: '#8D7046',
      scale: 0.58,
    })
  );
  made.push(
    await buildFrame('studioz-d-engagement-floral-arch-foreheads.webp', 'studioz-d-gift-framed-print-wide.webp', {
      width: 1600,
      height: 1200,
      frame: '#1D1917',
      scale: 0.5,
    })
  );

  // Square companion to the 4:5 portrait mockup. The gift card grid is 1:1,
  // and cropping the 4:5 file into it would cut a quarter off the frame.
  made.push(
    await buildFrame('studioz-d-wedding-bridal-portrait-bouquet.webp', 'studioz-d-gift-framed-print-square.webp', {
      width: 1400,
      height: 1400,
      frame: '#2A2522',
      scale: 0.6,
    })
  );

  // Landscape companion for the Two Worlds panel, which renders roughly 3:2
  // on desktop. A portrait file there lost half its width to the crop.
  made.push(
    await buildFrame('studioz-d-wedding-bridal-portrait-bouquet.webp', 'studioz-d-gift-framed-print-panel.webp', {
      width: 1600,
      height: 1067,
      frame: '#2A2522',
      scale: 0.46,
    })
  );

  console.log(`Studioz D gift mockups — ${made.length} written to public/assets/images/gifts/`);
  made.forEach((f) => console.log(`  ${f}`));
  console.log('These are composites of the studio’s OWN photographs in a frame, not products.');
};

run().catch((error) => {
  console.error('Gift mockup generation failed:', error);
  process.exitCode = 1;
});
