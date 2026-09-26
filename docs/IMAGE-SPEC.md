# Studioz D — image specification

What every image slot on the site expects, where the files live, and what is
still missing. Written so a photographer or a supplier can work from it without
reading any code.

Last verified against the running site on 26 September 2026.

---

## 1. The rule this site follows

Images are **never stretched**. Every image is drawn with `object-fit: cover` or
`object-fit: contain` inside a box whose shape is declared in the code, so a
photograph is either shown whole or cropped — never squashed or pulled.

Where a supplied photograph's shape did not match the box it was going into, the
**box was changed to match the photograph**, not the other way round. That is why
several ratios in the code changed in this update (listed in §5).

Two places deliberately letterbox instead of cropping, because cropping a product
is worse than a margin around it:

| Where | File | Behaviour |
|---|---|---|
| Product gallery, main image | `src/pages/GiftDetails.jsx` | `contain` — the whole product is always visible |
| Personalization preview | `src/components/gifts/CustomizePreview.jsx` | `contain` |
| Product card, non-square files | `src/components/cards/GiftCard.jsx` | `contain` when the file is more than 15% off square |

---

## 2. Where the files live

```
public/assets/images/
├── gifts/        ← personalized gift photography  (24 files + variants)
├── works/        ← client photography             (43 files + variants)
├── services/     ← service imagery                (12 files still placeholder)
├── journal/      ← article covers
├── brand/        ← logo, favicons
└── og/           ← social share cards (1200 × 630)
```

### Naming and responsive variants — this part is not optional

Every raster image must ship with its resized variants beside it, or **the
image will render blank in the browser**. A `srcset` candidate that 404s does
not fall back to the original file.

```
studioz-d-gift-photo-jigsaw.webp        ← the file referenced from the data module
studioz-d-gift-photo-jigsaw-480.webp    ← variants
studioz-d-gift-photo-jigsaw-640.webp
studioz-d-gift-photo-jigsaw-960.webp
studioz-d-gift-photo-jigsaw-1280.webp
studioz-d-gift-photo-jigsaw-1600.webp
studioz-d-gift-photo-jigsaw-480.avif    ← same widths again in AVIF
… -640 / -960 / -1280 / -1600.avif
```

Do not create these by hand. Drop the originals in a folder and run:

```bash
npm run gifts -- "C:/path/to/the/new/gift/photos"
```

for gift photography (`scripts/import-gifts.mjs` — the filename → output-name map
is at the top of that file), or

```bash
npm run photos -- "C:/path/to/the/photos" wedding
```

for client photography. Both scripts apply EXIF rotation, keep the source ratio
exactly, emit every variant, and print the real pixel dimensions to paste into
the data module.

`npm run build` fails if any referenced image is missing its variants.

---

## 3. Every image slot, with the ratio and size it wants

### Gifts

| # | Slot | Pages | Declared in | Ratio | Largest rendered size | Supply at least |
|---|---|---|---|---|---|---|
| G1 | Product card tile | `/gifts`, `/gifts/:category`, related products, search results | `src/components/cards/GiftCard.jsx:48` | **1 : 1** | 340 px | **1400 × 1400** |
| G2 | Category tile | `/gifts` — "By Occasion" and "By Creation" grids | `src/components/gifts/GiftDiscovery.jsx:36` | **1 : 1** | 330 px | **1400 × 1400** |
| G3 | Product gallery, main | `/gifts/product/:slug` | `src/pages/GiftDetails.jsx:82` | 1 : 1 frame, **contain — no crop** | 670 px | **1400 px on the long edge** |
| G4 | Product gallery, thumbnail | `/gifts/product/:slug` | `src/pages/GiftDetails.jsx:111` | 1 : 1 | 220 px | same file as G3 |
| G5 | Personalization preview | `/gifts/product/:slug` | `src/components/gifts/CustomizePreview.jsx:80` | 1 : 1 frame, **contain — no crop** | 660 px | same file as G3 |
| G6 | Gifts hero, lead image | `/gifts` | `src/pages/Gifts.jsx` → `HERO_MEDIA` | **the file's own ratio** | 432 px | **1200 px wide** |
| G7 | Gifts hero, inset image | `/gifts` | same | **the file's own ratio** | 190 px | **640 px wide** |
| G8 | Category hero cluster | `/gifts/:category` | `src/pages/GiftCategory.jsx` → `heroMedia` | **own ratio** of the first two products in the collection | 430 px | reuses G1 files |
| G9 | Two Worlds gifts panel | `/` | `src/components/sections/TwoWorlds.jsx:56` | **4 : 5** | 690 px | **1280 × 1600** |
| G10 | Home hero inset card | `/` | `src/components/hero/BrandHero.jsx` → `GIFT_CARD` | **own ratio** | 208 px | **640 px wide** |

### Photography

| # | Slot | Pages | Declared in | Ratio | Largest rendered size | Supply at least |
|---|---|---|---|---|---|---|
| P1 | Project card | `/`, `/works`, `/works/:category`, `/journal/:slug`, `/404` | `src/components/cards/WorkCard.jsx` (default) | **3 : 2** | 460 px | **1600 × 1067** |
| P2 | Featured project | `/works` | `src/components/sections/FeaturedProjects.jsx:44` | **3 : 2** | 690 px | **1600 × 1067** |
| P3 | Masonry gallery | `/works`, `/works/:category` | `src/components/gallery/MasonryGallery.jsx` | **each photo's own ratio** | column width | as shot |
| P4 | Lightbox | anywhere the gallery opens | `src/components/gallery/GalleryLightbox.jsx` | **own ratio** | viewport | **1920 px long edge** |
| P5 | Service card | `/services`, `/services/:slug` | `src/components/cards/ServiceCard.jsx:24` | **3 : 2** (4 : 3 compact) | 460 px | **1600 × 1067** |
| P6 | Immersive page hero | `/works`, `/works/:slug`, `/services`, `/services/:slug`, `/about`, `/journal/:slug` | `src/components/hero/PageHero.jsx` (`layout="immersive"`) | fills the band, roughly **3 : 1 at desktop** | 1430 × 500 | **2400 px wide, landscape** |
| P7 | Story block, primary | `/about`, `/services` | `src/components/sections/StorySection.jsx` (`imageAspect`) | **declared per page** | 680 px | native |
| P8 | Story block, inset | `/services` | same (`secondaryAspect`) | **declared per page** | 260 px | native |
| P9 | Journal featured card | `/journal` | `src/components/cards/JournalCard.jsx` | **3 : 2** | 930 px | **1600 × 1067** |
| P10 | Journal card | `/journal`, `/journal/:slug` | same | **4 : 3** | 460 px | **1600 × 1200** |
| P11 | About opening image | `/about` | `src/pages/About.jsx:151` | **3 : 2** | 680 px | **1600 × 1067** |
| P12 | Team portrait | `/about` | `src/pages/About.jsx:241` | **4 : 5** | 440 px | **1200 × 1500** |
| P13 | Home hero | `/` | `src/components/hero/BrandHero.jsx` | desktop: fills the band · mobile: **4 : 5** | full width | **2400 px wide, landscape** |
| P14 | Two Worlds photography panel | `/` | `src/components/sections/TwoWorlds.jsx:39` | **4 : 5** | 690 px | **1280 × 1600** |
| P15 | Social share card | every page | `public/assets/images/og/` | **1200 × 630** | — | **1200 × 630** |

---

## 4. What is still missing — supply these and the placeholders disappear

Everything on the gifts side now uses real photography. **22 of 22 products and
33 of 33 categories.** The gaps are all on the photography side.

### 4.1 Six services have no photography at all — 12 files

These render as abstract generated placeholders. Drop real files in
`public/assets/images/services/` under exactly these names, then run
`npm run images` to confirm and `npm run build` to generate variants.

| Service | Page | Hero file — needs **2400 × 1600 (3 : 2), landscape** | Card file — needs **1600 × 1067 (3 : 2)** |
|---|---|---|---|
| Maternity | `/services/maternity-photography` | `studioz-d-maternity-photography-hero.svg` → `.webp` | `studioz-d-maternity-photography-card.svg` → `.webp` |
| Baby & Family | `/services/baby-family-photography` | `studioz-d-baby-family-photography-hero.svg` → `.webp` | `studioz-d-baby-family-photography-card.svg` → `.webp` |
| Product | `/services/product-photography` | `studioz-d-product-photography-hero.svg` → `.webp` | `studioz-d-product-photography-card.svg` → `.webp` |
| Commercial | `/services/commercial-photography` | `studioz-d-commercial-photography-hero.svg` → `.webp` | `studioz-d-commercial-photography-card.svg` → `.webp` |
| Cinematic Films | `/services/cinematic-films` | `studioz-d-cinematic-films-hero.svg` → `.webp` | `studioz-d-cinematic-films-card.svg` → `.webp` |
| Reels | `/services/reels` | `studioz-d-reels-hero.svg` → `.webp` | `studioz-d-reels-card.svg` → `.webp` |

After adding the files, change the extension in `src/data/services.js` from
`.svg` to `.webp` on the matching `heroImage` / `cardImage` line.

### 4.2 Team portraits — `/about`

Slot P12 is wired up but hidden, because no member of the team has an `image`
set in `src/data/about.js`. Six people are listed. Supply portraits at
**1200 × 1500 (4 : 5)** as
`public/assets/images/about/studioz-d-team-<name>.webp` and add the path to each
member's `image` field.

### 4.3 Gift photography that would benefit from a second angle

Every product renders correctly today. These would improve if a second or
better frame existed:

| Product | Page | Why | What to supply |
|---|---|---|---|
| Rotating Photo Cube Lamp | `/gifts/product/rotating-photo-cube` | The supplied file is an **advertising creative with headline text and feature badges printed into the image** ("Turn Memories Into A Gift", "360° ROTATION"…). It works, but it is a poster, not a product photograph. | A clean shot of the lit cube, no overlaid text. **1400 × 1400** |
| Corporate Leather Range | `/gifts/product/corporate-leather-range` | The file is a five-up grid of five separate photographs. Legible at full size, busy as a small card. | One hero shot of the range. **1400 × 1400** |
| Personalized Story Frame | `/gifts/product/story-frame` | File is 1800 × 2400 (3 : 4). The card grid is square, so the card **letterboxes** it rather than cropping. | Optional 1 : 1 alternate. **1400 × 1400** |
| Caricature Standee | `/gifts/product/caricature-standee` | Same — 3 : 4 file, letterboxed in the square card. | Optional 1 : 1 alternate. **1400 × 1400** |
| All 20 supplied gift files | everywhere | They are **1800 × 1776** — 1.4% off square. The square tile trims 24 px of width, which is invisible. | Nothing needed. Shoot future products at a true **1 : 1** to keep it exact. |

### 4.4 Art direction — two slots use a different file per breakpoint

Two places on the site change shape between desktop and phone by so much that
one file cannot serve both. Rather than crop, each renders a different
photograph. If either file is replaced, **replace both**.

| Slot | Desktop file (landscape) | Phone file (portrait) | Declared in |
|---|---|---|---|
| Home hero | `works/studioz-d-wedding-sparkler-entry.webp` — fills a wide band | `works/studioz-d-pre-wedding-rocks-twirl.webp` — 4 : 5 | `src/components/hero/BrandHero.jsx` |
| Two Worlds panels | `works/studioz-d-pre-wedding-rocks-wave-gown.webp` and `gifts/studioz-d-gift-framed-print-panel.webp` — roughly 3 : 2 | `works/studioz-d-pre-wedding-sunset-lift-silhouette.webp` and `gifts/studioz-d-gift-framed-print.webp` — 4 : 5 | `src/components/sections/TwoWorlds.jsx` (`image` / `imageTall`) |

### 4.5 One intentional crop, listed for completeness

| Where | Page | Crop | Why it stays |
|---|---|---|---|
| Immersive page heroes | `/works`, `/works/:slug`, `/services`, `/services/:slug`, `/about`, `/journal/:slug` | Landscape photographs in a wide band — some height is trimmed | This is what a full-bleed hero is for. Supply at **2400 px wide** so the trimmed frame is still sharp. |

---

## 5. Ratios that changed in this update, and why

| File | Was | Now | Reason |
|---|---|---|---|
| `components/gifts/GiftDiscovery.jsx` | 4 : 5 | 1 : 1 | Gift photography is square; a 4 : 5 tile cut a quarter off every product |
| `components/cards/GiftCard.jsx` | 1 : 1 cover | 1 : 1, `contain` when >15% off square | Stops the two portrait products losing 25% |
| `pages/GiftDetails.jsx` (main) | 1 : 1 cover | 1 : 1 `contain` | A product gallery must never crop the product |
| `components/gifts/CustomizePreview.jsx` | 1 : 1 cover | 1 : 1 `contain` | Same |
| `components/cards/WorkCard.jsx` | 4 : 5 | 3 : 2 | 11 of 13 project covers are 3 : 2 files; the portrait box cut 47% |
| `components/cards/ServiceCard.jsx` | 4 : 5 | 3 : 2 | Service imagery is 3 : 2 |
| `components/cards/JournalCard.jsx` (featured) | 16 : 9 | 3 : 2 | Article covers are 3 : 2 |
| `pages/NotFound.jsx` | 4 : 5 | 3 : 2 | Project covers again |
| `pages/About.jsx` | 4 : 3 | 3 : 2 | Matches the file |
| `components/sections/StorySection.jsx` | fixed 4 : 5 / 1 : 1 | caller declares `imageAspect` / `secondaryAspect` | Lets each page state the real ratio of the photograph it passes |
| `components/sections/TwoWorlds.jsx` | one file for both layouts | separate landscape and portrait files | The desktop panel is 1.6 : 1 and the touch card is 4 : 5 — one file lost 47–51% in whichever layout it did not suit. Now 7% on desktop, 0% on touch |
| `components/hero/BrandHero.jsx` | one landscape file for both layouts | separate landscape and portrait files | The phone hero was cropping 47% off the width of a 3 : 2 photograph |
| `data/works.js` | two projects had portrait covers | landscape covers from the same projects | Those two were the only 47% crops left in the project grids |
| `data/services.js` | two portrait card images | landscape ones | Same |
| `scripts/generate-images.mjs` | `-card` placeholders 4 : 5 | 3 : 2 | Matches the new service card |

### Measured result

Swept at 320 px, 390 px and 1440 px across `/`, `/gifts`, every routable gift
category, gift product pages, `/works`, `/works/:category`, `/works/:slug`,
`/services`, `/services/:slug`, `/about`, `/journal`, `/contact`, `/faq` and
`/sitemap`:

- horizontal overflow: **0 px on every page at every width**
- images failing to load: **0**
- images cropped by more than 12%: **0**, apart from the full-bleed heroes in §4.5
