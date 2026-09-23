/**
 * Brand asset pipeline.
 *
 * Takes the studio's master logo (a 13334 × 7500 PNG straight from the
 * designer, 21.5 MB) and produces every web-ready variant the site needs.
 *
 * Why this is a script and not a one-off: the master will be re-supplied when
 * the brand is tweaked, and hand-exporting eight sizes is exactly the kind of
 * job that drifts. Run it again and every asset is regenerated consistently.
 *
 *   npm run brand              # uses brand/logo-master.png
 *   npm run brand -- <path>    # or point it at a new master
 *
 * The master is trimmed to its artwork bounds first, because the supplied
 * file is a round badge floating in a very large transparent canvas — without
 * trimming, every exported size would be mostly empty space.
 */

import { mkdir, access, copyFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MASTER = process.argv[2] ?? path.join(ROOT, 'brand', 'logo-master.png');
const OUT = path.join(ROOT, 'public', 'assets', 'brand');

/** Square badge sizes. The header uses 96, the footer 128, cards 256. */
const MARK_SIZES = [64, 96, 128, 192, 256, 384, 512];

/** Brand colours sampled from the logo, for the OG card background. */
const BRAND = {
  ink: '#14110F',
  ivory: '#FDFBF7',
  teal: '#0E7C86',
  orange: '#E8823A',
};

const exists = async (file) => {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const run = async () => {
  if (!(await exists(MASTER))) {
    console.error(`Brand master not found: ${MASTER}`);
    console.error('Place the studio logo at brand/logo-master.png, or pass a path.');
    process.exitCode = 1;
    return;
  }

  await mkdir(OUT, { recursive: true });

  const meta = await sharp(MASTER).metadata();

  // Trim the transparent surround so exports are all artwork.
  const trimmed = await sharp(MASTER).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
  const { width, height } = trimmed.info;
  const side = Math.max(width, height);

  // Pad back to a perfect square so the round badge is never cropped or
  // horizontally offset at any size.
  const square = await sharp(trimmed.data)
    .extend({
      top: Math.floor((side - height) / 2),
      bottom: Math.ceil((side - height) / 2),
      left: Math.floor((side - width) / 2),
      right: Math.ceil((side - width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const written = [];

  /* --- Square mark, PNG + WebP at each size ---------------------------- */
  for (const size of MARK_SIZES) {
    const base = sharp(square).resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });

    await base.clone().png({ compressionLevel: 9, quality: 90 }).toFile(
      path.join(OUT, `studioz-d-logo-${size}.png`)
    );
    await base.clone().webp({ quality: 90 }).toFile(
      path.join(OUT, `studioz-d-logo-${size}.webp`)
    );
    written.push(`studioz-d-logo-${size}.{png,webp}`);
  }

  /* --- Favicons -------------------------------------------------------- */
  await sharp(square).resize(180, 180).png().toFile(path.join(ROOT, 'public', 'apple-touch-icon.png'));
  await sharp(square).resize(32, 32).png().toFile(path.join(ROOT, 'public', 'favicon-32.png'));
  await sharp(square).resize(192, 192).png().toFile(path.join(ROOT, 'public', 'icon-192.png'));
  await sharp(square).resize(512, 512).png().toFile(path.join(ROOT, 'public', 'icon-512.png'));
  written.push('apple-touch-icon.png', 'favicon-32.png', 'icon-192.png', 'icon-512.png');

  /* --- Open Graph share card ------------------------------------------ */
  // The logo centred on the brand's dark surface, at the 1200×630 ratio every
  // social platform crops to.
  const ogLogo = await sharp(square).resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: BRAND.ink },
  })
    .composite([{ input: ogLogo, top: 135, left: 420 }])
    .png()
    .toFile(path.join(ROOT, 'public', 'assets', 'images', 'og', 'studioz-d-share.png'));
  written.push('assets/images/og/studioz-d-share.png');

  console.log(
    `Studioz D brand — master ${meta.width}×${meta.height}, trimmed to ${width}×${height}.`
  );
  console.log(`  ${written.length} asset groups written to public/assets/brand/ and public/.`);
};

run().catch((error) => {
  console.error('Brand asset generation failed:', error);
  process.exitCode = 1;
});

export { MARK_SIZES, BRAND, copyFile };
