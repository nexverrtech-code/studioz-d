/**
 * Static sitemap + robots generator.
 *
 * Reads the same data files the app renders from, so `sitemap.xml` cannot
 * drift out of sync with the routes that actually exist. Dynamic routes
 * (projects, gift products, journal articles) are enumerated from data rather
 * than maintained by hand.
 *
 * Runs after `vite build`, writing into `dist/`. Also refreshes
 * `public/robots.txt` so the Sitemap directive matches the configured domain.
 *
 * Run with: npm run sitemap  (or automatically via npm run build)
 */

import { writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

/** Site origin, matching `VITE_SITE_URL`. Trailing slashes are stripped. */
const SITE_URL = (process.env.VITE_SITE_URL || 'https://studiozd.com').replace(/\/+$/, '');

const load = async (file) => import(pathToFileURL(path.join(DATA, file)).href);

const today = new Date().toISOString().slice(0, 10);

/**
 * Priority and change frequency reflect genuine editorial intent: the home
 * page and the two commercial hubs change most and matter most; legal pages
 * barely change at all.
 */
const entry = (loc, { priority = 0.6, changefreq = 'monthly', lastmod = today } = {}) => ({
  loc: `${SITE_URL}${loc}`,
  priority,
  changefreq,
  lastmod,
});

const run = async () => {
  const [services, works, gifts, journal] = await Promise.all([
    load('services.js'),
    load('works.js'),
    load('gifts.js'),
    load('journal.js'),
  ]);

  const urls = [
    entry('/', { priority: 1.0, changefreq: 'weekly' }),
    entry('/about', { priority: 0.7 }),
    entry('/services', { priority: 0.9, changefreq: 'monthly' }),
    entry('/works', { priority: 0.9, changefreq: 'weekly' }),
    entry('/gifts', { priority: 0.9, changefreq: 'weekly' }),
    entry('/journal', { priority: 0.8, changefreq: 'weekly' }),
    entry('/contact', { priority: 0.8 }),
    entry('/faq', { priority: 0.6 }),
    entry('/sitemap', { priority: 0.3, changefreq: 'yearly' }),
    entry('/privacy-policy', { priority: 0.2, changefreq: 'yearly' }),
    entry('/terms', { priority: 0.2, changefreq: 'yearly' }),
  ];

  for (const service of services.services) {
    urls.push(entry(`/services/${service.slug}`, { priority: 0.8 }));
  }

  for (const category of works.routableWorkCategories) {
    urls.push(entry(`/works/${category.segment}`, { priority: 0.7, changefreq: 'weekly' }));
  }

  for (const work of works.works) {
    urls.push(entry(`/works/${work.slug}`, { priority: 0.7 }));
  }

  for (const category of gifts.routableGiftCategories) {
    urls.push(entry(`/gifts/${category.slug}`, { priority: 0.75, changefreq: 'weekly' }));
  }

  for (const gift of gifts.gifts) {
    urls.push(entry(`/gifts/product/${gift.slug}`, { priority: 0.65 }));
  }

  for (const article of journal.journal) {
    urls.push(
      entry(`/journal/${article.slug}`, { priority: 0.6, lastmod: article.date })
    );
  }

  // The admin console is deliberately absent — it is noindexed and has no
  // business in search results.

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const robots = `User-agent: *
Allow: /

# Frontend-only admin surface — no customer value in search results.
Disallow: /admin
Disallow: /admin/

Sitemap: ${SITE_URL}/sitemap.xml
`;

  // Always update public/, and dist/ too when a build has produced it.
  const targets = [path.join(ROOT, 'public')];
  try {
    await access(path.join(ROOT, 'dist'), constants.F_OK);
    targets.push(path.join(ROOT, 'dist'));
  } catch {
    // No dist yet — running the script standalone before a build.
  }

  for (const target of targets) {
    await mkdir(target, { recursive: true });
    await writeFile(path.join(target, 'sitemap.xml'), xml, 'utf8');
    await writeFile(path.join(target, 'robots.txt'), robots, 'utf8');
  }

  console.log(
    `Studioz D sitemap — ${urls.length} URLs written to ${targets
      .map((t) => path.basename(t))
      .join(' and ')} (${SITE_URL}).`
  );
};

run().catch((error) => {
  console.error('Sitemap generation failed:', error);
  process.exitCode = 1;
});
