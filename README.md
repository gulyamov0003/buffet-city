# Buffet City — website

A single-page site for **Buffet City**, a self-service buffet restaurant at
7010 S Pulaski Rd, Chicago, IL 60629.

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion 11

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production bundle into dist/
npm run preview    # serve the built bundle
npm run typecheck
```

---

## ⚠️ Two things to do before this goes live

### 1. Replace the photography

**Every image in `public/images/` is licensed stock food photography
(Unsplash License) — not a photograph of Buffet City.** They are placeholders
so the layout could be judged at full quality.

To swap them, drop real photos in at the same filenames. Each image needs three
widths; the `-400 / -800 / -1600` suffix is what the responsive `srcset` reads:

```
public/images/<name>-400.webp
public/images/<name>-800.webp
public/images/<name>-1600.webp
```

Then update the matching entry in [`src/data/media.ts`](src/data/media.ts) —
its `width`/`height` (so the aspect ratio reservation stays correct and nothing
reflows while loading), its `alt`, and its `lqip` blur placeholder.

Nothing else in the codebase references an image path directly.

The 21 image slots, and what each one is for:

| Slot | Used by |
|---|---|
| `hero-platter` | hero centrepiece, final CTA backdrop, gallery |
| `orange-chicken`, `chicken-broccoli`, `sushi-rolls` | the three guest favourites |
| `dimsum`, `shrimp-plate`, `sushi-slate`, `tacos`, `burger` | the five cuisine cards |
| `buffet-station`, `interior-warm` | About section |
| `spread`, `fish-ice`, `ribs` | menu-section panels |
| `lomein`, `friedrice`, `salmon-plate`, `fried-shrimp`, `interior-bar`, `guests-bar`, `dining-table` | gallery |

### 2. Set the real domain

The restaurant has no website on its Google listing, so there was no domain to
use. `https://buffetcitychicago.example` is a stand-in in two places — Open
Graph needs absolute URLs, which is the only reason a placeholder exists:

- [`index.html`](index.html) — `<link rel="canonical">`, `og:url`, `og:image`,
  `twitter:image`, and the `url`/`image` fields of the JSON-LD block
- [`public/robots.txt`](public/robots.txt) — the `Sitemap:` line

---

## Where the facts live

[`src/data/restaurant.ts`](src/data/restaurant.ts) is the single source of
truth. Every factual claim rendered anywhere on the site resolves from it, so
there is exactly one place to correct if something changes.

It also records what is **deliberately absent**, and the components are built
around those gaps rather than papering over them:

| Not known | How the site handles it |
|---|---|
| Opening hours | The Location card says hours aren't published and asks visitors to call ahead. No hours are shown, and `openingHoursSpecification` is omitted from the schema. |
| Per-dish prices | No price appears on any dish card. Only the verified `$20–30 per person` band is shown. |
| Full menu contents | The three menu-section tabs (Overview / Seafood Combo Platter / Meat Combo) are real section names from the listing, but their contents aren't published — so each panel says so and routes to the phone. |
| Online reservations | No reservation UI exists. Every booking-shaped CTA is "Call Us". `acceptsReservations` is omitted from the schema rather than asserted either way. |
| Delivery partners | Delivery is listed as available; no partner brand is named. |
| Testimonials | No invented quotes or attributed names. The Reviews section paraphrases one real Google review and links to the listing for the rest. |

### About the `aggregateRating`

The 3.8/5 from 2,251 reviews is genuine and is displayed to visitors. It is
**not** in the JSON-LD. Google's structured-data policy disallows a business
marking up its own review score on `LocalBusiness` types ("self-serving
reviews"), and doing so risks a manual action. Showing it is fine; claiming it
in markup is the part that isn't.

---

## Architecture

```
src/
├── data/
│   ├── restaurant.ts   verified facts — the only source of factual claims
│   └── media.ts        image manifest: alt text, dimensions, blur placeholders
├── hooks/index.ts      reduced motion, hover capability, 3D tilt, scroll spy,
│                       scroll lock, clipboard, smooth scroll
├── components/
│   ├── ui/
│   │   ├── Icons.tsx       one SVG family, 1.6 stroke, 24px grid
│   │   └── Primitives.tsx  SmartImage, Reveal, Button, ScrollProgress, SectionHeading
│   ├── Nav.tsx         sticky nav, scroll spy, mobile drawer
│   ├── Hero.tsx        3D image stack, cursor-reactive depth
│   ├── About.tsx       counter-drifting parallax images
│   ├── Cuisines.tsx    five category cards with tilt
│   ├── Menu.tsx        guest favourites + tabbed menu sections
│   ├── Gallery.tsx     filterable masonry + lightbox
│   ├── Reviews.tsx     rating card + verified review points
│   ├── Location.tsx    services, address card, embedded map
│   └── Closing.tsx     final CTA + footer
└── index.css           design tokens, primitives, keyframes, reduced motion
```

### Design tokens

Defined once in `src/index.css` under `@theme`. Contrast was measured against
the real composited pixels, not estimated:

| Token | On `ink` | Note |
|---|---|---|
| `cream` `#F7F1E6` | 17.8:1 | body and headings |
| `cream-dim` `#C9BFB0` | 11.0:1 | secondary text |
| `muted` `#9A9186` | 6.4:1 | tertiary text — still above 4.5:1 |
| `gold` `#E0B368` | 10.3:1 | accents; **buttons take dark text, never white** (white on gold is 1.9:1) |
| `ember` `#C6452C` | 4.1:1 | **decorative and large display only** |
| `ember-soft` `#E8765C` | 6.8:1 | the ember tone that is safe at body size |

Text over photographs was measured by sampling the actual image pixels behind
each label and compositing the scrim alpha. Worst case is the Mexican cuisine
card at 11.4:1 for its heading and 7.0:1 for its body copy.

### Motion

Every decorative animation is gated twice — a CSS `prefers-reduced-motion`
block that zeroes durations and kills the `.a-*` keyframes and all `.u-3d`
transforms, and the `usePrefersReducedMotion` hook that Framer Motion,
the 3D tilt, and the magnetic buttons all read. The tilt and magnetic effects
additionally require `(hover: hover) and (pointer: fine)`, so they never run on
touch.

### Performance

- Images are WebP at three widths with a real `srcset`/`sizes`, lazy below the
  fold, and hold their aspect ratio from the manifest so CLS stays at zero.
- A 24px blur placeholder is inlined per image (~325 bytes) and cross-fades out.
- The hero image is preloaded in `index.html` and marked `fetchpriority="high"`.
  (React 18 only passes the all-lowercase spelling — `fetchPriority` is React
  19+ and gets silently dropped.)
- Framer Motion and React are split into separate chunks.

Production bundle: ~110 KB of JavaScript gzipped, ~15 KB CSS gzipped.

---

## Verified during the build

Navigation, menu tabs, gallery filters and lightbox, the copy-address button,
the mobile drawer, every `tel:` and Maps link, keyboard traps and focus
return, touch-target sizes, contrast over photography, and horizontal overflow
were each exercised in a real browser rather than assumed. Details are in the
build notes; the short version is that all of it works and no fabricated
restaurant information appears anywhere in the output.
