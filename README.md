# Studioz D

Frontend for **Studioz D** — a creative photography studio and personalized-gifting brand.

> Capture the moment. Create the memory. Keep it forever.

React + Vite. **Frontend only** — no backend, no database. Every piece of data
lives in `src/data/`, and every place a server would normally sit is a clearly
marked module in `src/services/`.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev
```

Open http://localhost:5173.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Tailwind check → placeholder images → Vite build → sitemap |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint + the Tailwind class check |
| `npm run brand` | Regenerate logo/favicon/OG assets from `brand/logo-master.png` |
| `npm run photos -- <folder> <category>` | Import real photographs → responsive AVIF/WebP + a data snippet |
| `npm run images` | Generate any missing placeholder images |
| `npm run sitemap` | Regenerate `sitemap.xml` and `robots.txt` |
| `npm run check:css` | Catch Tailwind classes that silently emit no CSS |

---

## ⚠️ Before this goes live

Nothing in this build invents business information. These are the real gaps,
and each one is a deliberate blank rather than an oversight.

### 1. Fill in `.env.local`

Copy `.env.example`. Anything left blank simply **hides** its UI rather than
rendering a dead link — an unconfigured WhatsApp number means no WhatsApp
button anywhere, not a button that goes nowhere.

| Variable | Effect if blank |
| --- | --- |
| `VITE_SITE_URL` | Canonicals and the sitemap use `https://studiozd.com` |
| `VITE_EMAILJS_*` | The enquiry form cannot send; it says so honestly and offers a fallback |
| `VITE_WHATSAPP_NUMBER` | No WhatsApp buttons, no floating button, no mobile dock action |
| `VITE_CONTACT_EMAIL` / `_PHONE` | Those contact rows are omitted |
| `VITE_BUSINESS_*` | `LocalBusiness` structured data is omitted entirely |
| `VITE_GA4_MEASUREMENT_ID`, `VITE_CLARITY_PROJECT_ID` | Zero third-party scripts load |
| `VITE_ADMIN_DEMO_PASSCODE` | Defaults to `studiozd-demo` |

### 2. Photography — real, and what is still missing

**The portfolio is the studio's own work.** 43 photographs were supplied and
imported with `npm run photos`, which produced responsive AVIF + WebP variants
at every breakpoint. `src/data/works.js` is built entirely from them.

What the supplied set covers:

| Category | Projects |
| --- | --- |
| Weddings | 3 |
| Pre-Weddings | 8 |
| Engagements | 1 |
| Receptions | 1 |
| Portraits | 1 |

**What is still a generated placeholder**, because no photographs exist for it:

- every **gift** product and category image (24 products)
- the **Customized Gifts** panel in the home page's Two Worlds section
- service cards for **maternity, baby & family, product, commercial,
  cinematic films and reels**
- three journal covers on gifting topics

The portfolio taxonomy was reduced to match reality — there are no Product,
Commercial, Film, Maternity or Baby & Family categories in `/works`, because
padding a portfolio with stand-ins is worse than a shorter portfolio. Those
service *pages* still exist, since offering a service is the studio's call.

To add more, it stays one command:

```bash
npm run photos -- ./incoming/new-shoot works
```

Per photograph that produces the main `.webp`, responsive variants, and
`import-works-snippet.txt` with real dimensions and aspect ratios filled in.
Paste it into the data file and **write real alt text for every frame** — the
snippet leaves a loud placeholder so it cannot be forgotten.

`OptimizedImage` picks up the AVIF/WebP `<source>` entries and the width-based
`srcSet` automatically from the naming convention. No component changes.

### 2b. The logo says something the site does not

The supplied logo reads **"StudiozD — The Wedding Planner"**, in teal and
orange. The brief this site was built to describes a *photography and
personalized-gifting studio*, in charcoal / ivory / champagne.

The supplied photography supports the logo: it is **entirely weddings,
pre-weddings, engagements and portraits**. There is no product, commercial or
gifting work in it at all.

Nothing has been silently reconciled. What was done:

- the real logo is used everywhere — header, footer, favicons, OG card, JSON-LD
- its measured colours ship as `brand.teal` (`#028E93`) and `brand.orange`
  (`#F28C47`) tokens, used where the UI sits beside the mark
- the portfolio now reflects only the work that exists
- the ink/ivory/champagne system and every line of copy are **unchanged**

Three open decisions for the studio:

1. **Positioning** — the logo and the portfolio both say wedding photography.
   The navigation, services and copy still say photography + gifts.
2. **The gifting half** — it has a full catalogue of 24 products and no
   photographs. Either send product shots, or cut it.
3. **Palette** — the site can be re-tuned to the logo's teal/orange. That is a
   deliberate design change rather than a bug fix, so it was not made
   unilaterally.

Regenerate every brand asset from a new master with `npm run brand`.

### 3. Testimonials are deliberately empty

`src/data/testimonials.js` ships as an empty array and the home-page section
renders an honest empty state. Add real, permitted quotes and set
`published: true` — the carousel switches itself on. No `Review` or
`AggregateRating` structured data is emitted either way; that markup needs a
verified review source.

### 4. Team members are roles, not people

`src/data/about.js` lists roles with empty `name`, `image` and `bio`. Fill
them in and the cards render all three.

### 5. There is no pricing

Every product shows **"Price on enquiry"**. `priceTier` is a non-monetary
planning scale that powers the range filter without publishing figures the
studio has not set. Replace both fields when pricing is confirmed.

### 6. Legal pages need a lawyer

`/privacy-policy` and `/terms` accurately describe what this frontend does, in
plain language, and carry a visible pre-launch notice. They are not legal
advice and do not cover jurisdiction, entity details or commercial terms.

### 7. `/admin` is a demo, not a secured area

See **Admin console** below.

---

## Architecture

```
src/
├── components/     layout, navigation, hero, sections, cards, gallery,
│                   gifts, forms, buttons, motion, seo, common, admin
├── pages/          one file per route (+ pages/admin)
├── data/           services · works · gifts · journal · faq · about ·
│                   navigation · testimonials · *.mock
├── services/       analytics · form · lead · auth · api.client
├── hooks/          media queries, scroll, focus trap, escape, swipe, lenis, search
├── utils/          cn · format · images · seo (JSON-LD)
├── config/         site.js — the single source of business configuration
└── styles/         variables.css · globals.css · animations.css
```

**Backend-ready seam.** Components never import mock data directly. They call
`services/*`, which today resolve from `src/data/*.mock.js` with a small
artificial delay so loading and error states are genuinely exercised. Point
those functions at `services/api.client.js` and the UI is unchanged.

---

## Design system

Tokens live in `src/styles/variables.css` and are mirrored in
`tailwind.config.js`.

- **Ink** — deep charcoal, the primary
- **Ivory** — warm cream surfaces
- **Champagne** — the accent
- **Terracotta / rose / olive** — sparingly, for state and tone
- **Brand teal `#028E93` / orange `#F28C47`** — sampled from the studio
  logo, used where the UI sits beside the mark (see §2b)

Type is Cormorant Garamond (display) over Manrope (body), on a fully fluid
`clamp()` scale so nothing overflows at 320px or balloons at 2560px.

### Layout contract

One container rule, applied everywhere:

```css
.shell { width: min(100% - (var(--sd-gutter) * 2), 1400px); margin-inline: auto; }
```

Gutters step 16 → 24 → 32 → 48px by breakpoint. `--sd-header-h` and
`--sd-dock-h` are published as CSS variables so fixed chrome reserves real
space instead of floating over content. The z-index scale is documented in
`variables.css`; nothing sets a bare `z-index`.

---

## Responsive behaviour

Each band is authored, not shrunk.

| Surface | Mobile | Tablet | Desktop |
| --- | --- | --- | --- |
| Header | Drawer | Compact bar | Full bar + mega-menu |
| Hero | Image → content → CTA (stacked) | Stacked | Full-bleed cinematic carousel |
| Selected Works | Snap-scroll rail | 2-column grid | Interactive 3D card deck |
| Gallery | 1–2 column | 2–3 column | 3–4 column editorial masonry |
| Photo story | Native swipe rail | Swipe rail | Pinned horizontal scroll (GSAP) |
| Gift filters | Bottom sheet | Bottom sheet | Sticky sidebar |
| Contact | 1 column | 2 column | 2 column |
| Admin | Drawer | Compact sidebar | Persistent sidebar |

Hover-dependent behaviour is gated on `(hover: hover) and (pointer: fine)` —
never on screen width, because a touch laptop has a wide screen and no hover.

---

## Motion

Framer Motion for reveals, overlays and page transitions. GSAP ScrollTrigger
only for the pinned horizontal gallery, imported dynamically so it never
enters the initial bundle. Lenis for smooth scrolling, automatically disabled
on touch devices and under reduced motion.

`prefers-reduced-motion` is honoured globally in CSS **and** in JS — reduced
motion removes movement without ever leaving content invisible.

---

## Accessibility

Semantic landmarks, a skip link, visible focus on everything, labelled
dialogs with focus traps and scroll locking, `aria-live` for form and gallery
state, and full keyboard support in the lightbox (`Esc` / `←` / `→`).

No information is hidden behind hover: on touch devices, gallery captions
render permanently **below** the image rather than in an overlay.

---

## SEO

- Unique title, description and canonical per route (verified across 23 routes)
- Open Graph + Twitter cards; work/gift/journal pages use their own imagery
- JSON-LD: `Organization`, `WebSite`, `BreadcrumbList`, `Service`,
  `ImageGallery`, `Product`, `Article`, `FAQPage`, `CollectionPage`
- `sitemap.xml` (94 URLs) generated at build time from the same data the app
  renders, so it cannot drift
- `robots.txt` disallows `/admin`; the admin routes are also `noindex`

**Nothing fabricated.** `utils/seo.js` prunes empty values and skips whole
schemas rather than emitting hollow ones — no `LocalBusiness` without an
address, no `offers` without a price, no reviews or ratings at all.

### Why not react-helmet-async

It was removed. It rendered **nothing at all** in the production build while
working correctly in dev, so every route shipped with the home page's title
and no structured data. `src/components/seo/head-manager.js` replaces it in
~120 lines with no dev/prod divergence. It uses a stack so overlapping route
transitions cannot corrupt the head.

---

## Performance

- Home ships in the main bundle (best LCP); every other route is lazy
- Vendor chunks split: react, router, motion, gsap, forms, charts
- Recharts (~410 kB) loads **only** inside `/admin` — no customer downloads it
- Only the first hero image is eager; everything else is lazy with explicit
  `width`/`height` and `aspect-ratio`, so CLS stays at zero
- `scrollbar-gutter: stable` means opening a modal never shifts the layout

---

## Admin console

`/admin/analytics` and `/admin/leads`, behind `/admin/login`.

> **This is not authentication.** The passcode ships inside the JavaScript
> bundle and anyone can read it. It exists so the surface is not stumbled into
> during review, and so a real provider has an obvious place to land.

Replace `src/services/auth.service.js` (`signIn` / `isAuthenticated` /
`signOut`) with a provider that verifies server-side, and add a real check
behind `components/admin/RequireAuth.jsx`. Nothing else in the admin UI needs
to change.

All figures and records are generated sample data, and the console shows a
permanent, non-dismissible banner saying so.

---

## Build guards

`npm run lint` and `npm run build` run `scripts/check-tailwind.mjs`, which
catches classes that generate **no CSS at all**. Both failures below happened
during this build — nothing errors, nothing warns, the element just renders
unstyled:

| Failure | Real symptom |
| --- | --- |
| Opacity outside the step-of-5 scale (`bg-ink-950/97`) | See-through lightbox backdrop |
| A named token that was never defined (`z-sticky`) | Gallery images painted over the sticky filter bar |

The second check resolves the actual Tailwind config, so any `z-`, `ease-`,
`max-w-`, `tracking-`, `aspect-` or `shadow-` token that is not in the theme
fails the build with the file, line and a suggested fix.

Adding a new named token means adding it in **two** places, which the check
enforces: `tailwind.config.js` (for the class) and `styles/variables.css`
(for the `--z-*` documentation of what the layer is for).

---

## Deployment

Static host. `dist/` after `npm run build`.

Requires SPA history fallback — every unknown path must serve `index.html`, or
deep links 404.

- **Netlify** — `public/_redirects`: `/* /index.html 200`
- **Vercel** — `vercel.json` rewrite `/(.*)` → `/index.html`
- **Nginx** — `try_files $uri $uri/ /index.html;`

Set `VITE_SITE_URL` in the build environment so canonicals and the sitemap
point at the real domain.
