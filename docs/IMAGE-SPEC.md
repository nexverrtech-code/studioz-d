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

**The full ladder is always required.** The site advertises every width from
480 to 1920 for every photograph, whatever its size, and a high-density screen
will ask for the top of that ladder. For a photograph narrower than 1920 px the
build writes those top rungs itself, at the photograph's own native size — no
upscaling, just the largest real resolution under the name the browser asked
for. Before this was fixed, 80 advertised files did not exist, and any of them
would have rendered as a blank image on a retina screen.

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

### 4.1 Every service now has real imagery

Maternity, Product and Commercial now use the studio's own photographs (the
**Before Hello**, **Still Life** and **Campaign Day** collections), with their
galleries on each service page. Cinematic Films and Reels use frames from the
studio's own films, and each page plays its film (see §4.1b).

One supplied product frame was left out: `product 4.jpg` (a bag, sneakers and
jeans on a white sweep, with a softbox and camera in shot). It shows typical
AI-generation artefacts — an unbranded camera with distorted lens geometry, a
malformed tripod head, melted laces and buckle — so it was not presented as
Studioz D's work. Send a real product shoot to replace it.

### 4.1b Films — `public/assets/videos/`

| Page | Film | Hero, desktop / phone | Card + player poster |
|---|---|---|---|
| `/services/cinematic-films` | `studioz-d-pre-wedding-film.mp4` — 1:11, 29 MB | sunset silhouettes (16 : 9) / dunes (2 : 3 slice) | the arch (16 : 9) |
| `/services/reels` | `studioz-d-wedding-teaser.mp4` — 0:47, 20 MB | bride close-up (16 : 9) / same frame (2 : 3 slice) | temple garden (16 : 9) |

- Films are re-encoded from the supplied 1920 × 1080 masters (165 MB and 97 MB)
  to H.264 1080p at about 3.3 Mbps with `+faststart`, so they stream as they
  play. The player uses `preload="none"`: nothing downloads until someone
  presses play.
- Stills are single frames chosen for sharpness, stored in
  `public/assets/images/services/studioz-d-cinematic-film-*` and
  `studioz-d-wedding-teaser-*`. Phone heroes are a 720 × 1080 slice of a frame,
  cropped, never squeezed. Being video frames, they top out at 1920 × 1080, so
  they are a touch softer than the photographs on large retina screens.
- The teaser is landscape. A native **9 : 16** reel would suit the Reels page
  better. Send one and it replaces the teaser (`video` in `src/data/services.js`).
- The teaser shows the couple's names and wedding date on screen (the welcome
  board at 0:02, a title at 0:16). Publish only with the couple's consent.

To add or replace a film, re-encode the master and point `video.src` at it:

```bash
ffmpeg -i master.mp4 -map_metadata -1 -c:v libx264 -preset slow -crf 23 -maxrate 3500k -bufsize 7000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 128k -movflags +faststart public/assets/videos/studioz-d-<name>.mp4
```

### 4.2 Team portraits — `/about`

Slot P12 is wired up but hidden, because no member of the team has an `image`
set in `src/data/about.js`. Six people are listed. Supply portraits at
**1200 × 1500 (4 : 5)** as
`public/assets/images/about/studioz-d-team-<name>.webp` and add the path to each
member's `image` field.

### 4.3 Gift photography — what the second batch delivered

Four re-shoots were requested. Each file sent back was compared against the
existing images by perceptual hash as well as by eye:

| Requested | Sent as | Result |
|---|---|---|
| Caricature Standee, square | `Caricature Standee.jpg`, 1400 × 1400 | **Delivered.** A genuine 1 : 1 re-shoot. Now the product's first image and the Engagement category tile — the card fills its square instead of being letterboxed. The taller original stays as the second gallery image. |
| Rotating Photo Cube Lamp, clean, no text | `Rotating Photo Cube Lamp.jpg`, 1400 × 1400 | **Not delivered.** The same advertising creative as before — headline, tagline and feature badges still printed into the image — resized to square. |
| Corporate Leather Gift Range, one range shot | `Corporate Leather Gift Range.jpg`, 1400 × 1400 | **Not delivered.** This is the navy corporate hamper (notebook, mug, bottle, keyring, pen) already used for **Corporate Gift Hamper**, under a new name. The leather range still uses the five-up grid. |
| Personalized Story Frame, square | `Personalized Frame.jpg`, 1400 × 1400 | **Not delivered.** This is the black-and-white friends **collage** frame already used for **Collage Photo Frame**, not the story frame with the name layout. The story frame is still its 3 : 4 original, letterboxed in the card. |

Still needed, at **1400 × 1400, 1 : 1**:

- **Rotating Photo Cube Lamp** — the lit cube on its own, no text or graphics.
- **Corporate Leather Range** — one photograph of the leather sets together.
- **Personalized Story Frame** — the framed name layout (the "LAYA KEERTHI" style piece).

The other three square files in the batch — crystal block, acrylic frame,
infinity lamp — are the same photographs already on the site, at a lower
resolution than the originals, so the originals were kept.

All other gift photographs are **1800 × 1776**, 1.4% off square. The square
tile trims 24 px of width, which is invisible. Nothing is needed there; future
products shot at a true 1 : 1 keep it exact.

### 4.3b The photography folders — what was new

The five folders held 79 photographs. Compared by perceptual hash against the
43 already on the site:

| Folder | Sent | Already on the site | New | Where the new ones went |
|---|---|---|---|---|
| Outdoor | 13 | 13 | 0 | — every frame was a re-send |
| Groom Portraits | 7 | 1 | 6 | **The Other Mirror** — `/works/the-other-mirror`, Groom filter |
| Couple Portraits | 28 | 24 | 4 | **Wherever They Stood** — `/works/wherever-they-stood` |
| Bridal Portraits | 24 | 3 | 21 | **The Getting-Ready Room** — `/works/the-getting-ready-room`, new `/works/bridal` |
| Baby Shoots | 7 | 0 | 7 | **First Portraits** — `/works/first-portraits`, new `/works/baby-family` |

Re-sends were left out so no photograph appears twice. Three baby photographs
were exported sideways (shot in portrait, saved without the orientation flag)
and were turned upright on import; the originals in Drive are unchanged.

The portfolio is now **17 projects, 81 photographs**. The four new projects are
collections from several sessions, not single events, and their copy says so.

### 4.4 Art direction — two slots use a different file per breakpoint

Two places on the site change shape between desktop and phone by so much that
one file cannot serve both. Rather than crop, each renders a different
photograph. If either file is replaced, **replace both**.

| Slot | Desktop file (landscape) | Phone file (portrait) | Declared in |
|---|---|---|---|
| Photography page hero (`/services`) | `works/studioz-d-pre-wedding-beach-horse.webp` | `works/studioz-d-pre-wedding-golden-hour-close.webp` | `src/pages/Services.jsx` (`image` / `imageTall`) |
| Wedding service hero | `works/studioz-d-wedding-church-party.webp` (crop set low, `center 70%`) | `works/studioz-d-bridal-red-lehenga-orange-wall.webp` | `src/data/services.js` (`heroImage` / `heroImageTall`) |
| Two Worlds panels | `works/studioz-d-pre-wedding-rocks-wave-gown.webp` and `gifts/studioz-d-gift-framed-print-panel.webp` — roughly 3 : 2 | `works/studioz-d-pre-wedding-rocks-twirl.webp` and `gifts/studioz-d-gift-framed-print.webp` — 4 : 5 | `src/components/sections/TwoWorlds.jsx` (`image` / `imageTall`) |

### 4.4b The landing hero is a scroll scene, not a picture

The hero on `/` is a single photograph that a frame assembles around as you
scroll — the frame, mat and wall are drawn in the DOM, not composited into a
file. So there is **one** hero image to supply, and it must be **4 : 5**:

| File | Ratio | Supply at least |
|---|---|---|
| `works/studioz-d-pre-wedding-sunset-lift-silhouette.webp` | 4 : 5 | **2000 × 2500** |

It is set in one place, `PHOTO` at the top of
`src/components/hero/BrandHero.jsx`. Two things matter when replacing it:

- **It must be 4 : 5.** The arrival frame sizes the photograph to cover any
  viewport up to 1.25 : 1 on that assumption. A landscape file would be
  cropped to half its width on a phone.
- **It has to read at both sizes.** It fills the screen on arrival and ends up
  roughly 360px wide on a wall. A photograph with a single strong shape —
  a silhouette, a strong colour field — survives that. A busy group shot does
  not.

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
