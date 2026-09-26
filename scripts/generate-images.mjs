/**
 * Placeholder image generator.
 *
 * Studioz D has not supplied photography yet. Rather than shipping broken
 * <img> tags or grey boxes, this script writes a tasteful abstract SVG for
 * every image path referenced anywhere in `src/`, using the brand palette.
 *
 * Two properties make this useful rather than decorative:
 *
 *  1. DETERMINISTIC — a file's composition is derived from its own name, so
 *     the same path always produces the same image across machines and
 *     rebuilds. Nothing flickers between deploys.
 *
 *  2. NON-DESTRUCTIVE — an existing file is never overwritten. Drop a real
 *     photograph in at the same path and it simply wins.
 *
 * REPLACING WITH REAL PHOTOGRAPHY
 *   1. Save the photograph to the same path, e.g.
 *      public/assets/images/works/studioz-d-wedding-the-beginning-01.webp
 *   2. Update the `.svg` extension in the matching data file.
 *   Nothing else changes — every component reads the path from data.
 *
 * Run with: npm run images
 */

import { mkdir, readFile, readdir, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');

/* ------------------------------------------------------------------ Palette */

/**
 * Warm, low-saturation palettes drawn from the design tokens. Each is a
 * {deep, mid, light, accent} set so the same composition code can produce
 * both a dark cinematic frame and a bright airy one.
 */
const PALETTES = {
  wedding: { deep: '#2A2522', mid: '#8D7046', light: '#F1EADF', accent: '#D8C09A' },
  preWedding: { deep: '#3C3531', mid: '#B08E5C', light: '#F8F4EC', accent: '#E4D3B8' },
  portrait: { deep: '#14110F', mid: '#554C46', light: '#E6DCCD', accent: '#C9A876' },
  maternity: { deep: '#554C46', mid: '#C9A4A4', light: '#FDFBF7', accent: '#DCC0C0' },
  family: { deep: '#3C3531', mid: '#C4B49D', light: '#FDFBF7', accent: '#D8CBB8' },
  event: { deep: '#1D1917', mid: '#97593B', light: '#E6DCCD', accent: '#C98A6B' },
  product: { deep: '#0B0908', mid: '#766B63', light: '#F1EADF', accent: '#BFB5AC' },
  commercial: { deep: '#1D1917', mid: '#71734F', light: '#F1EADF', accent: '#B0B294' },
  film: { deep: '#0B0908', mid: '#3C3531', light: '#9A8F86', accent: '#C9A876' },
  gift: { deep: '#2A2522', mid: '#B4704F', light: '#F8F4EC', accent: '#DCAA90' },
  journal: { deep: '#3C3531', mid: '#8E9070', light: '#F8F4EC', accent: '#C9A876' },
  neutral: { deep: '#2A2522', mid: '#9A8F86', light: '#F1EADF', accent: '#C9A876' },
};

/** Maps a filename to a palette by keyword, longest match first. */
const paletteFor = (name) => {
  const n = name.toLowerCase();
  if (n.includes('pre-wedding')) return PALETTES.preWedding;
  if (n.includes('wedding') || n.includes('engagement')) return PALETTES.wedding;
  if (n.includes('maternity')) return PALETTES.maternity;
  if (n.includes('family') || n.includes('baby') || n.includes('kids')) return PALETTES.family;
  if (n.includes('portrait')) return PALETTES.portrait;
  if (n.includes('event') || n.includes('first-light')) return PALETTES.event;
  if (n.includes('product') || n.includes('weight-grain')) return PALETTES.product;
  if (n.includes('commercial') || n.includes('studio-floor')) return PALETTES.commercial;
  if (n.includes('film') || n.includes('vows') || n.includes('one-take')) return PALETTES.film;
  if (n.includes('gift') || n.includes('frame') || n.includes('hamper') || n.includes('album'))
    return PALETTES.gift;
  if (n.includes('journal')) return PALETTES.journal;
  return PALETTES.neutral;
};

/* -------------------------------------------------------------------- Seed */

/** FNV-1a — small, fast, and stable across runtimes. */
const hash = (input) => {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const rng = (seed) => {
  let value = seed || 1;
  return () => {
    value ^= value << 13;
    value ^= value >>> 17;
    value ^= value << 5;
    value >>>= 0;
    return value / 4294967296;
  };
};

/* ------------------------------------------------------------ Compositions */

/**
 * Five compositions, each evoking a different kind of photograph. All are
 * built from gradients and simple shapes — no filters, so they rasterise
 * instantly even with forty of them on a page.
 */
const COMPOSITIONS = [
  /* 0 — Horizon: a landscape or wide establishing frame. */
  (w, h, p, rand, id) => {
    const horizon = h * (0.52 + rand() * 0.2);
    const sunX = w * (0.2 + rand() * 0.6);
    const sunR = Math.min(w, h) * (0.07 + rand() * 0.06);
    return `
    <defs>
      <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${p.deep}"/>
        <stop offset="58%" stop-color="${p.mid}"/>
        <stop offset="100%" stop-color="${p.accent}"/>
      </linearGradient>
      <linearGradient id="ground-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${p.deep}" stop-opacity="0.92"/>
        <stop offset="100%" stop-color="${p.deep}"/>
      </linearGradient>
      <radialGradient id="sun-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${p.light}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="${p.light}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky-${id})"/>
    <circle cx="${sunX}" cy="${horizon - sunR * 0.4}" r="${sunR * 3.4}" fill="url(#sun-${id})"/>
    <circle cx="${sunX}" cy="${horizon - sunR * 0.4}" r="${sunR}" fill="${p.light}" opacity="0.5"/>
    <path d="M0 ${horizon} L${w} ${horizon * 0.94} L${w} ${h} L0 ${h} Z" fill="url(#ground-${id})"/>`;
  },

  /* 1 — Figure: a soft silhouette against directional light. */
  (w, h, p, rand, id) => {
    const cx = w * (0.34 + rand() * 0.32);
    const headR = Math.min(w, h) * 0.12;
    const headY = h * (0.3 + rand() * 0.08);
    return `
    <defs>
      <radialGradient id="key-${id}" cx="${30 + rand() * 40}%" cy="26%" r="78%">
        <stop offset="0%" stop-color="${p.light}"/>
        <stop offset="52%" stop-color="${p.mid}"/>
        <stop offset="100%" stop-color="${p.deep}"/>
      </radialGradient>
      <linearGradient id="figure-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${p.deep}" stop-opacity="0.82"/>
        <stop offset="100%" stop-color="${p.deep}" stop-opacity="0.96"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#key-${id})"/>
    <circle cx="${cx}" cy="${headY}" r="${headR}" fill="url(#figure-${id})"/>
    <path d="M${cx - headR * 2.1} ${h}
             C${cx - headR * 2} ${headY + headR * 2.2},
              ${cx - headR * 1.15} ${headY + headR * 1.05},
              ${cx} ${headY + headR * 1.02}
             C${cx + headR * 1.15} ${headY + headR * 1.05},
              ${cx + headR * 2} ${headY + headR * 2.2},
              ${cx + headR * 2.1} ${h} Z"
          fill="url(#figure-${id})"/>`;
  },

  /* 2 — Still life: an object on a surface, with a cast shadow. */
  (w, h, p, rand, id) => {
    const surface = h * 0.68;
    const objW = w * (0.2 + rand() * 0.16);
    const objH = h * (0.26 + rand() * 0.18);
    const objX = w * 0.5 - objW / 2;
    return `
    <defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${p.light}"/>
        <stop offset="100%" stop-color="${p.accent}"/>
      </linearGradient>
      <linearGradient id="obj-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${p.mid}"/>
        <stop offset="100%" stop-color="${p.deep}"/>
      </linearGradient>
      <linearGradient id="shade-${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${p.deep}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${p.deep}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
    <rect y="${surface}" width="${w}" height="${h - surface}" fill="${p.mid}" opacity="0.28"/>
    <ellipse cx="${objX + objW * 1.05}" cy="${surface + 6}" rx="${objW * 0.95}" ry="${h * 0.028}" fill="url(#shade-${id})"/>
    <rect x="${objX}" y="${surface - objH}" width="${objW}" height="${objH}" rx="3" fill="url(#obj-${id})"/>
    <rect x="${objX + objW * 0.1}" y="${surface - objH + objH * 0.1}" width="${objW * 0.18}" height="${objH * 0.8}" fill="${p.light}" opacity="0.14"/>`;
  },

  /* 3 — Layers: overlapping translucent bands, an abstract detail frame. */
  (w, h, p, rand, id) => {
    const bands = Array.from({ length: 5 }, (_, i) => {
      const y = h * (0.1 + i * 0.16 + rand() * 0.04);
      const bh = h * (0.08 + rand() * 0.1);
      const opacity = (0.16 + rand() * 0.22).toFixed(2);
      const skew = w * (rand() * 0.12);
      return `<path d="M0 ${y} L${w} ${y - skew * 0.3} L${w} ${y + bh - skew * 0.3} L0 ${y + bh} Z" fill="${
        i % 2 === 0 ? p.light : p.accent
      }" opacity="${opacity}"/>`;
    }).join('\n    ');

    return `
    <defs>
      <linearGradient id="layers-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${p.deep}"/>
        <stop offset="55%" stop-color="${p.mid}"/>
        <stop offset="100%" stop-color="${p.deep}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#layers-${id})"/>
    ${bands}`;
  },

  /* 4 — Low key: a single pool of light in deep shadow. */
  (w, h, p, rand, id) => {
    const lx = 24 + rand() * 52;
    const ly = 22 + rand() * 46;
    return `
    <defs>
      <radialGradient id="pool-${id}" cx="${lx}%" cy="${ly}%" r="62%">
        <stop offset="0%" stop-color="${p.accent}"/>
        <stop offset="34%" stop-color="${p.mid}"/>
        <stop offset="100%" stop-color="${p.deep}"/>
      </radialGradient>
      <linearGradient id="vignette-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${p.deep}" stop-opacity="0.45"/>
        <stop offset="45%" stop-color="${p.deep}" stop-opacity="0"/>
        <stop offset="100%" stop-color="${p.deep}" stop-opacity="0.6"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#pool-${id})"/>
    <rect width="${w}" height="${h}" fill="url(#vignette-${id})"/>
    <rect x="${w * 0.08}" y="${h * 0.08}" width="${w * 0.84}" height="${h * 0.84}" fill="none" stroke="${p.light}" stroke-opacity="0.1" stroke-width="1.5"/>`;
  },
];

/* ----------------------------------------------------- Dimensions per path */

/** Aspect ratios inferred from the numeric suffix, mirroring the data files. */
const RATIOS = [
  [1600, 1067], // 3:2
  [1200, 1600], // 3:4
  [1600, 1200], // 4:3
  [1100, 1650], // 2:3
  [1920, 1080], // 16:9
  [1400, 1400], // 1:1
  [1280, 1600], // 4:5
  [1920, 823], // 21:9
];

const dimensionsFor = (relPath, seed) => {
  const name = relPath.toLowerCase();
  // Category tiles and product shots are square or portrait by design.
  if (name.includes('gift-category')) return [1280, 1600];
  if (name.includes('/gifts/')) return [1400, 1400];
  if (name.includes('-hero')) return [1920, 1080];
  // Service cards render in a 3:2 box (see components/cards/ServiceCard.jsx).
  if (name.includes('-card')) return [1600, 1067];
  if (name.includes('/journal/')) return [1600, 1067];
  if (name.includes('/og/')) return [1200, 630];
  return RATIOS[seed % RATIOS.length];
};

/* ------------------------------------------------------------- Generation */

const buildSvg = (relPath) => {
  const seed = hash(relPath);
  const rand = rng(seed);
  const palette = paletteFor(relPath);
  const [w, h] = dimensionsFor(relPath, seed);

  // A short id keeps gradient ids unique per file, so two inlined SVGs on the
  // same page cannot collide.
  const id = seed.toString(36).slice(0, 6);
  const composition = COMPOSITIONS[seed % COMPOSITIONS.length](w, h, palette, rand, id);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Studioz D placeholder image">
  <title>Studioz D — placeholder</title>
${composition}
</svg>
`;
};

/* --------------------------------------------------------------- Scanning */

const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.css', '.html']);
const IMAGE_REFERENCE = /["'`](\/assets\/images\/[A-Za-z0-9._/-]+\.(?:svg|webp|avif|jpg|jpeg|png))["'`]/g;

const walk = async (dir, files = []) => {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      await walk(full, files);
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
};

/**
 * Data modules build most image paths with a template literal
 * (`/assets/images/works/${file}`), which no regex over source text can see.
 * So we also IMPORT each data module and walk its exported values for real
 * resolved paths. These files are dependency-free ESM, so Node can load them
 * directly.
 */
const DATA_MODULES = [
  'works.js',
  'gifts.js',
  'services.js',
  'journal.js',
  'about.js',
  'navigation.js',
  'faq.js',
];

const ASSET_PATH = /^\/assets\/images\/[A-Za-z0-9._/-]+\.(svg|webp|avif|jpg|jpeg|png)$/;

/** Depth-limited walk over a module's exports, collecting asset paths. */
const collectFromValue = (value, into, depth = 0) => {
  if (depth > 8 || value == null) return;
  if (typeof value === 'string') {
    if (ASSET_PATH.test(value)) into.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectFromValue(item, into, depth + 1);
    return;
  }
  if (typeof value === 'object') {
    for (const item of Object.values(value)) collectFromValue(item, into, depth + 1);
  }
};

const collectFromData = async (into) => {
  for (const file of DATA_MODULES) {
    const full = path.join(SRC, 'data', file);
    try {
      const module = await import(pathToFileURL(full).href);
      collectFromValue({ ...module }, into);
    } catch (error) {
      console.warn(`  ! could not read data module ${file}: ${error.message}`);
    }
  }
};

const collectReferences = async () => {
  const files = await walk(SRC);
  files.push(path.join(ROOT, 'index.html'));

  const references = new Set();

  // 1. Literal paths written directly in components and pages.
  for (const file of files) {
    let content;
    try {
      content = await readFile(file, 'utf8');
    } catch {
      continue;
    }
    for (const match of content.matchAll(IMAGE_REFERENCE)) {
      references.add(match[1]);
    }
  }

  // 2. Paths assembled at runtime inside the data modules.
  await collectFromData(references);

  return [...references].sort();
};

const exists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

/* --------------------------------------------------- Social share fallback */

/** The OG image is the one placeholder that carries the wordmark. */
const buildShareImage = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Studioz D">
  <defs>
    <linearGradient id="share-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14110F"/>
      <stop offset="60%" stop-color="#2A2522"/>
      <stop offset="100%" stop-color="#3C3531"/>
    </linearGradient>
    <radialGradient id="share-glow" cx="24%" cy="28%" r="62%">
      <stop offset="0%" stop-color="#C9A876" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#C9A876" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#share-bg)"/>
  <rect width="1200" height="630" fill="url(#share-glow)"/>
  <rect x="60" y="60" width="1080" height="510" fill="none" stroke="#F8F4EC" stroke-opacity="0.14"/>
  <text x="110" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="92" letter-spacing="18" fill="#FDFBF7">STUDIOZ</text>
  <text x="110" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="92" letter-spacing="18" fill="#C9A876" dx="612">D</text>
  <text x="114" y="368" font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="7" fill="#9A8F86">PHOTOGRAPHY · FILMS · PERSONALIZED GIFTS</text>
  <text x="114" y="470" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="#E6DCCD">Capture the moment. Create the memory. Keep it forever.</text>
</svg>
`;


/* ------------------------------------------------- Responsive variants -- */

/**
 * Verifies that every referenced RASTER image has the responsive siblings
 * `OptimizedImage` will ask for.
 *
 * This is not cosmetic. The component emits an AVIF/WebP srcSet derived purely
 * from the filename, so a `.webp` shipped without its `-640.webp` siblings
 * makes the browser select a candidate that 404s — and a failed srcSet
 * candidate does NOT fall back to `src`. The image renders blank with no
 * error anywhere. That shipped once already, on the landing page.
 */
const RESPONSIVE_WIDTHS = [480, 640, 960, 1280, 1600, 1920];

const checkVariants = async (references) => {
  const problems = [];

  for (const reference of references) {
    const ext = path.extname(reference).toLowerCase();
    // Vectors are never given a srcSet, so they need no siblings.
    if (ext === '.svg' || ext === '.gif') continue;
    // Variants are themselves variants; do not recurse.
    if (/-\d{3,4}\.(webp|avif|jpe?g|png)$/i.test(reference)) continue;
    // Social share cards are referenced only from <meta>, never rendered
    // through OptimizedImage, so they need no responsive siblings.
    if (reference.includes('/og/')) continue;

    const abs = path.join(PUBLIC, reference.replace(/^\//, ''));
    if (!(await exists(abs))) continue; // handled by the generator above

    const stem = reference.replace(/\.[^.]+$/, '');
    const { width } = await imageWidth(abs);

    // Only widths at or below the source are generated, so only those are
    // required. A missing smaller width is a real break.
    const required = RESPONSIVE_WIDTHS.filter((w) => !width || w <= width);
    const missing = [];
    for (const w of required) {
      const variant = path.join(PUBLIC, `${stem}-${w}${ext}`.replace(/^\//, ''));
      if (!(await exists(variant))) missing.push(`${w}${ext}`);
    }
    if (missing.length === required.length && required.length > 0) {
      problems.push({ reference, missing: `all ${required.length} widths` });
    } else if (missing.length > 0) {
      problems.push({ reference, missing: missing.join(', ') });
    }
  }

  return problems;
};

/** Reads an image's pixel width without pulling in a decoder for the whole file. */
const imageWidth = async (file) => {
  try {
    const sharp = (await import('sharp')).default;
    const meta = await sharp(file).metadata();
    return { width: meta.width };
  } catch {
    return { width: null };
  }
};

/* ------------------------------------------------------------------- Main */

const run = async () => {
  const references = await collectReferences();
  let created = 0;
  let skipped = 0;

  for (const reference of references) {
    const target = path.join(PUBLIC, reference.replace(/^\//, ''));

    if (await exists(target)) {
      skipped += 1;
      continue;
    }

    // Only ever generate SVG. A referenced .webp that does not exist is a
    // real problem the developer should see, not something to paper over.
    if (path.extname(target) !== '.svg') {
      console.warn(`  ! missing non-SVG asset (not generated): ${reference}`);
      continue;
    }

    await mkdir(path.dirname(target), { recursive: true });

    const content = reference.includes('/og/') ? buildShareImage() : buildSvg(reference);
    await writeFile(target, content, 'utf8');
    created += 1;
  }

  console.log(
    `Studioz D images — ${created} generated, ${skipped} already present, ${references.length} referenced.`
  );

  const variantProblems = await checkVariants(references);
  if (variantProblems.length > 0) {
    console.error(
      `
  Missing responsive variants — these images will render BLANK in the browser:
`
    );
    for (const problem of variantProblems) {
      console.error(`    ${problem.reference}`);
      console.error(`      missing: ${problem.missing}`);
    }
    console.error(
      `
  Generate them with \`npm run photos\` (photographs) or \`npm run mockups\` (gift mockups).
`
    );
    process.exitCode = 1;
  }
};

run().catch((error) => {
  console.error('Image generation failed:', error);
  process.exitCode = 1;
});
