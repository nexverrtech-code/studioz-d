/**
 * Gift product photography import.
 *
 * The client supplies product imagery as large JPEGs in a shared Drive folder.
 * This turns them into the exact files the site expects, WITHOUT changing any
 * aspect ratio: every output keeps its source ratio to the pixel, so nothing
 * on the site can ever appear stretched. Where a layout slot wants a different
 * shape, the slot is changed — never the photograph.
 *
 *   npm run gifts -- "<source folder>"
 *
 * For each source file it writes, into public/assets/images/gifts/:
 *   <base>.webp            the main file referenced from src/data/gifts.js
 *   <base>-<w>.webp        responsive variants (only widths <= the source)
 *   <base>-<w>.avif        same widths, modern format
 *
 * It prints the real pixel dimensions and ratio of every file so the data
 * module can carry honest width/height values.
 */

import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'assets', 'images', 'gifts');

/** Must match RESPONSIVE_WIDTHS in src/utils/images.js. */
const WIDTHS = [480, 640, 960, 1280, 1600, 1920];

/**
 * Source filename -> output base name.
 *
 * Names describe the object, not a claimed customer. The people and names
 * printed on these pieces are the supplier's own sample personalization.
 */
const MAP = {
  'Acrylic_Photo_Frame.jpg': 'studioz-d-gift-acrylic-photo-panel',
  'Acrylic_Photo_Frame_1.jpg': 'studioz-d-gift-acrylic-mandir-panel',
  '3D_Laser_Etched_Crystal.jpg': 'studioz-d-gift-crystal-photo-block',
  'Custom_Photo_Puzzle.jpg': 'studioz-d-gift-photo-jigsaw',
  'Customized_Mug_for_Couple.jpg': 'studioz-d-gift-photo-music-mug',
  'Customized_Personalized_Name_and_Charm_Leather_Mens_Wallet_Gift_Hamper.jpg':
    'studioz-d-gift-leather-hamper',
  'Infinity_LED_Lamp.jpg': 'studioz-d-gift-infinity-name-lamp',
  'Personalised_Temperature_Hydration_Bottle.jpg': 'studioz-d-gift-engraved-bottle',
  'ROTATING_CUBE.jpg': 'studioz-d-gift-rotating-photo-cube',
  'corporate_gifts_.jpg': 'studioz-d-gift-corporate-desk-set',
  'corporate_gifts_1.jpg': 'studioz-d-gift-corporate-hamper',
  'corporate_gifts_2.jpg': 'studioz-d-gift-corporate-leather-range',
  'frame_S.jpg': 'studioz-d-gift-collage-frame',
  'frame_d.jpg': 'studioz-d-gift-watercolour-frame',
  'polaroid_photos.jpg': 'studioz-d-gift-polaroid-prints',
  'pro_1.jpg': 'studioz-d-gift-story-frame',
  'pro_2.jpg': 'studioz-d-gift-caricature-standee',
  'pro_3.jpg': 'studioz-d-gift-engraved-wood-photo',
  'pro_4.jpg': 'studioz-d-gift-leather-wallet',
  'pro_4_4.jpg': 'studioz-d-gift-leather-wallet-set',
};

/** Reduces a ratio to its simplest whole-number form for the data module. */
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const simplify = (w, h) => {
  const d = gcd(w, h);
  return `${w / d}/${h / d}`;
};

const run = async () => {
  const source = process.argv[2];
  if (!source) {
    console.error('Usage: npm run gifts -- "<source folder>"');
    process.exit(1);
  }

  await mkdir(OUT, { recursive: true });

  const files = (await readdir(source)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const rows = [];

  for (const file of files) {
    const base = MAP[file];
    if (!base) {
      console.warn(`  skipped (not in MAP): ${file}`);
      continue;
    }

    const input = path.join(source, file);
    // `rotate()` with no argument applies the EXIF orientation and drops it,
    // so the pixels on disk match what every browser will draw.
    const pipeline = sharp(input).rotate();
    const { width, height } = await pipeline.metadata();

    await pipeline
      .clone()
      .webp({ quality: 84, effort: 5 })
      .toFile(path.join(OUT, `${base}.webp`));

    for (const w of WIDTHS.filter((candidate) => candidate <= width)) {
      await pipeline
        .clone()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(path.join(OUT, `${base}-${w}.webp`));

      await pipeline
        .clone()
        .resize({ width: w, withoutEnlargement: true })
        .avif({ quality: 58, effort: 4 })
        .toFile(path.join(OUT, `${base}-${w}.avif`));
    }

    rows.push({ file, base, width, height, ratio: simplify(width, height) });
    console.log(`  ${base}.webp  ${width}x${height}  (${simplify(width, height)})`);
  }

  console.log('\n--- paste-ready dimensions -------------------------------');
  for (const r of rows) {
    console.log(
      `${r.base}: { width: ${r.width}, height: ${r.height}, aspect: '${r.ratio}' },  // from ${r.file}`
    );
  }
  console.log(`\n${rows.length} gift images imported into ${path.relative(ROOT, OUT)}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
