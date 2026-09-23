/**
 * Tailwind class sanity check.
 *
 * Guards two failure modes that are completely silent — no error, no warning,
 * the class simply generates no CSS and the element renders unstyled:
 *
 *  1. OPACITY MODIFIERS outside the scale. Tailwind's opacity scale runs in
 *     steps of five, so `bg-ink-950/97` emits nothing. That shipped a
 *     see-through lightbox backdrop.
 *
 *  2. NAMED TOKENS that were never defined. `z-sticky` looks correct and
 *     reads correctly, but if `zIndex.sticky` is missing from the config the
 *     element falls back to `z-index: auto`. That let gallery images paint
 *     over the sticky filter bar.
 *
 * Runs as part of `npm run lint` and before `npm run build`.
 */

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import resolveConfig from 'tailwindcss/resolveConfig.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

const { theme } = resolveConfig(
  (await import(pathToFileURL(path.join(ROOT, 'tailwind.config.js')).href)).default
);

/* ------------------------------------------------------------- Rule 1 -- */

const OPACITY_UTILITIES =
  'bg|text|border|from|via|to|ring|divide|outline|decoration|placeholder|accent|caret|fill|stroke|shadow';

const OPACITY_MODIFIER = new RegExp(
  `\\b(${OPACITY_UTILITIES})-([a-z]+-\\d{2,3}|black|white)\\/(\\d{1,3})\\b`,
  'g'
);

/* ------------------------------------------------------------- Rule 2 -- */

/**
 * Prefixes whose value must exist in the resolved theme. Only prefixes with
 * an unambiguous one-to-one mapping are listed — `text-` and `bg-` are
 * skipped because they span several scales.
 */
const TOKEN_SCALES = [
  { prefix: 'z-', scale: 'zIndex' },
  { prefix: 'ease-', scale: 'transitionTimingFunction' },
  { prefix: 'max-w-', scale: 'maxWidth' },
  { prefix: 'tracking-', scale: 'letterSpacing' },
  { prefix: 'aspect-', scale: 'aspectRatio' },
  { prefix: 'shadow-', scale: 'boxShadow' },
];

/**
 * Strings that match a utility pattern but are not classes — CSS property
 * names and keywords that legitimately appear in styles, inline style
 * objects and comments.
 */
const IGNORED = new Set([
  'z-index',
  'aspect-ratio',
  'max-width',
  'ease-in-out',
  'ease-out',
  'ease-in',
  'shadow-sm',
  'shadow-md',
  'shadow-lg',
  'shadow-xl',
  'shadow-none',
  'shadow-inner',
]);

const isArbitrary = (value) => value.startsWith('[') || value.startsWith('(');

const walk = async (dir, files = []) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (/\.(jsx?|css)$/.test(entry.name)) files.push(full);
  }
  return files;
};

const run = async () => {
  const files = await walk(SRC);
  const problems = [];

  for (const file of files) {
    const relative = path.relative(ROOT, file).split(path.sep).join('/');
    const lines = (await readFile(file, 'utf8')).split('\n');

    lines.forEach((line, index) => {
      /* Rule 1 — opacity modifiers */
      OPACITY_MODIFIER.lastIndex = 0;
      let match;
      while ((match = OPACITY_MODIFIER.exec(line))) {
        const value = Number(match[3]);
        if (value % 5 !== 0) {
          const nearest = Math.round(value / 5) * 5;
          problems.push({
            file: relative,
            line: index + 1,
            found: match[0],
            why: 'opacity outside the step-of-5 scale',
            fix: `${match[0].replace(`/${value}`, `/${nearest}`)} (or ${match[0].replace(/\/(\d+)$/, '/[0.$1]')})`,
          });
        }
      }

      /* Rule 2 — named tokens */
      for (const { prefix, scale } of TOKEN_SCALES) {
        const pattern = new RegExp(`(?<![\\w-])-?${prefix}([a-z0-9][a-z0-9./[\\]()-]*)`, 'g');
        let token;
        while ((token = pattern.exec(line))) {
          const value = token[1];
          const full = token[0].replace(/^-/, '');
          if (isArbitrary(value) || IGNORED.has(full)) continue;
          // Tailwind falls back to DEFAULT for a bare prefix.
          const key = value === '' ? 'DEFAULT' : value;
          if (theme[scale] && !(key in theme[scale])) {
            problems.push({
              file: relative,
              line: index + 1,
              found: full,
              why: `"${key}" is not defined in theme.${scale}`,
              fix: `add it to tailwind.config.js, or use an arbitrary value`,
            });
          }
        }
      }
    });
  }

  if (problems.length === 0) {
    console.log(`Tailwind check — ${files.length} files scanned, no silent classes found.`);
    return;
  }

  console.error(
    `\nTailwind check FAILED — ${problems.length} class${problems.length === 1 ? '' : 'es'} that generate no CSS:\n`
  );
  for (const problem of problems) {
    console.error(`  ${problem.file}:${problem.line}`);
    console.error(`    ${problem.found}  —  ${problem.why}`);
    console.error(`    fix: ${problem.fix}\n`);
  }
  process.exitCode = 1;
};

run().catch((error) => {
  console.error('Tailwind check failed to run:', error);
  process.exitCode = 1;
});
