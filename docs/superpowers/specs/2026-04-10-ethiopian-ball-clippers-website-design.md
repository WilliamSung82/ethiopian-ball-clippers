# Ethiopian Ball Clippers — Website Design Spec

## Overview

A 5-page showstopper website for **Ethiopian Ball Clippers**, a B2B coffee supplier connecting African single-origin coffees with independent Turkish coffee shops. The site serves as a catalog, brand story, and lead generation tool — not an e-commerce store.

**Business model:** Source directly from African cooperatives, sell to small independent Turkish coffee shops. Revenue comes from quote-based wholesale orders and ongoing supply relationships.

**Target audience:** Small independent Turkish coffee shop owners looking for unique, high-quality single-origin coffees for cezve brewing.

## Tech Stack

- **Core:** HTML5, CSS3 (custom properties), Vanilla JavaScript (ES modules)
- **3D & Animation:** Three.js (3D hero elements), GSAP + ScrollTrigger (scroll animations, page transitions), Canvas API (particle effects)
- **Fonts:** Playfair Display (headings, serif), Inter (body, sans-serif) via Google Fonts
- **Assets:** CDN-loaded libraries, optimized WebP images
- **Hosting:** Netlify (static files, Netlify Forms for inquiry/sample handling)
- **No build step.** Pure static files deployed directly.

## Visual Design System

### Color Palette (Dark & Premium)

| Token       | Hex       | Usage                          |
|-------------|-----------|--------------------------------|
| bg-deep     | `#0a0705` | Page background                |
| bg-dark     | `#1a1208` | Card backgrounds, sections     |
| bg-mid      | `#2a1f10` | Highlighted regions, hovers    |
| gold        | `#d4a574` | Primary accent, headings, CTAs |
| copper      | `#c8956e` | Secondary accent, gradients    |
| cream       | `#f5e6d3` | Body text, hero text           |

### Typography

- **Headings:** Playfair Display (serif), italic for emphasis words
- **Body:** Inter (sans-serif), light weight for descriptions
- **Labels:** Inter, 0.65-0.75rem, uppercase, letter-spacing 2-4px, gold color

### Animation Level: Full Showstopper

- **Hero:** 3D rotating coffee bean (Three.js), floating particle steam, cinematic text reveal with letter-spacing animation
- **Scroll:** GSAP ScrollTrigger parallax layers, scroll-jacked sections, staggered card reveals with cubic-bezier easing
- **Cursor:** Custom cursor with gold trail, magnetic hover on buttons, card tilt on mouse move (perspective transform)
- **Transitions:** Coffee-pour wipe page transitions, smooth section fades
- **Background:** Floating SVG coffee beans (12+), steam wisps, golden dust particles with box-shadow glow, ambient glow spots — visible across all pages
- **Micro-interactions:** Button lift + shadow on hover, card border-color transitions, rating dot fills, flip cards (3D transform)

## Pages

### 1. Home / Landing Page (`index.html`)

**Sections:**
1. **Navigation** — Fixed, glass-effect (backdrop-filter blur), gold logo "ETHIOPIAN BALL CLIPPERS", 5 nav links
2. **Hero** (100vh) — Full-screen with:
   - 3D rotating coffee bean (Three.js, right side)
   - Rising particle steam effect (Canvas)
   - Badge: "Premium African Coffee for Turkish Brewing"
   - Headline: "From African *Origins* to Your Cezve"
   - Subtext with max-width constraint
   - Dual CTAs: "Explore Coffees" (primary gold), "Request Samples" (outlined)
   - Scroll indicator with pulse animation
3. **Featured Origins** — Section label + title + 3 country cards (Ethiopia, Kenya, Rwanda) with:
   - Gradient image backgrounds per country
   - Country flag emoji
   - Region names, description, flavor tags (pill badges)
   - Hover: translateY(-8px) + border-color change
4. **Stats Strip** — 4 animated counters: 12+ Origins, 40+ Varieties, 25+ Partners, 100% Direct Trade
5. **CTA Banner** — "Ready to Transform Your Menu?" with radial glow background
6. **Footer** — Logo + copyright, minimal

### 2. Coffee Catalog (`catalog.html`)

**Sections:**
1. **Page Header** — Title "Our Coffees" with radial gradient glow
2. **Filter Bar** — Horizontal filter pills:
   - Origin: All, Ethiopia, Kenya, Rwanda, Tanzania, Uganda, Burundi
   - Profile: Fruity, Floral, Chocolatey, Spiced
   - Search input (right-aligned)
   - Filter animation: GSAP stagger on card reflow
3. **Coffee Grid** — Auto-fill grid (min 320px columns), 6+ cards:
   - Gradient image area with badge (Single Origin / Best Seller / New / Limited)
   - Country flag
   - Quick-view overlay on hover (slides up from bottom)
   - Card body: origin line with decorative rule, coffee name (Playfair), description
   - Meta row: Roast, Altitude, Process, Body (dot rating)
   - Flavor tags
   - Hover: translateY(-12px) scale(1.01), border glow, shadow
4. **Footer**

**Coffee data (initial catalog):**
- Yirgacheffe Kochere (Ethiopia) — Light, Natural, Jasmine/Bergamot/Honey
- Nyeri AA Gatomboya (Kenya) — Medium, Washed, Blackcurrant/Grapefruit/Wine
- Huye Red Bourbon (Rwanda) — Medium, Washed, Peach/Brown Sugar/Silky
- Kilimanjaro Peaberry (Tanzania) — Medium-Dark, Washed, Chocolate/Black Tea/Bright
- Sidamo Guji Natural (Ethiopia) — Light, Natural, Blueberry/Dark Chocolate/Fruity
- Kayanza Long Miles (Burundi) — Medium, Washed, Red Apple/Vanilla/Clean

### 3. Coffee Detail Page (`coffee-detail.html`)

**Sections:**
1. **Breadcrumb** — Home > Coffees > Coffee Name
2. **Split Hero** — 2-column grid:
   - Left: Visual area with floating 3D bean, pulsing glow, flag, badge
   - Right: Origin label, coffee name (3rem Playfair), region + elevation, long description, specs grid (6 cells: Roast, Process, Varietal, Altitude, Harvest, SCA Score), dual CTAs (Request Sample / Get Quote), flavor tags
3. **Tasting Profile** — 2-column:
   - Left: SVG radar chart (Aroma, Acidity, Sweetness, Body, Finish)
   - Right: Horizontal bar ratings with numerical scores
4. **Turkish Brewing Guide** — 4-step card grid: Dose (7g), Water (65ml), Heat (Low), Time (3-4 min)
5. **Supplier Card** — Avatar, cooperative name, location, description, stats (farmers, cooperatives, altitude, certifications)
6. **Footer**

### 4. About / Our Story (`about.html`)

**Sections:**
1. **Hero** (100vh) — "Bridging Two *Coffee Cultures*", staggered reveal animations, scroll indicator
2. **Mission** — 2-column: visual card + 3-paragraph story text
3. **Route Map** — Real SVG map (MapSVG CC0 data) showing:
   - All African countries rendered with actual geographic outlines
   - East Africa origins highlighted (brighter fill + thicker stroke)
   - Turkey rendered from province-level SVG data
   - Animated dashed route line from East Africa to Turkey
   - Traveling dot animation along route
   - HTML tooltip overlays (not SVG) for each origin pin with cooperative details
   - Grid lines and ocean labels for cartographic feel
4. **Timeline** — Animated vertical timeline (2024, 2025, 2026) with:
   - Animated fill track
   - Popping icon nodes with delay stagger
   - Alternating left/right content with stat cards
5. **Values** — 3 flip cards (3D CSS transform on hover):
   - Front: icon + title + "hover to explore"
   - Back: description + key stat
   - Direct Trade (87% more income), Turkish-Optimized (200+ cuppings), Sustainability (100% shade-grown)
6. **Partners Grid** — 6 country cards with expanding description on hover
7. **CTA** + **Footer**

**Floating background on all sections:** 12 SVG coffee beans (warm brown fills #8b6e50 to #b8966e, clearly visible), 7 steam wisps, 12 golden dust particles with glow, ambient radial glow spots.

### 5. Contact / Request Samples (`contact.html`)

**Sections:**
1. **Hero** — "Get in *Touch*", centered, animated entrance
2. **Tab Switcher** — 3 tabs with pill-style toggle:
   - **Request Samples** (default): Interactive sample picker (click-to-select cards, up to 3 coffees), contact form fields, shipping address, notes. Sidebar: What You'll Receive, Delivery Timeline, After Tasting, Direct Contact
   - **Get a Quote**: Coffee selector dropdown, volume (5-100+ kg), frequency (weekly/monthly), form fields. Sidebar: Pricing Structure, Flexible Ordering, Contact
   - **General Inquiry**: Subject dropdown, message textarea. Sidebar: Email, Phone, Address
3. **FAQ Accordion** — 5 items with click-to-expand, +/rotate animation:
   - Minimum order (5kg), International shipping, Turkish grind, Freshness (roast-to-order), Certifications
4. **Footer**

**Forms:** All forms use Netlify Forms (add `data-netlify="true"` attribute). No backend required.

## File Structure

```
/
├── index.html              # Home
├── catalog.html            # Coffee Catalog
├── coffee-detail.html      # Coffee Detail (template)
├── about.html              # About / Our Story
├── contact.html            # Contact / Request Samples
├── css/
│   ├── global.css          # Reset, variables, nav, footer, floating bg
│   ├── home.css            # Home-specific styles
│   ├── catalog.css         # Catalog grid, filters, cards
│   ├── detail.css          # Detail page layout
│   ├── about.css           # About page, map, timeline, values
│   └── contact.css         # Forms, tabs, FAQ
├── js/
│   ├── main.js             # Shared: nav, cursor, page transitions, floating bg
│   ├── three-scene.js      # Three.js hero setup
│   ├── animations.js       # GSAP ScrollTrigger registrations
│   ├── catalog-filter.js   # Filter/search logic
│   ├── map.js              # Map tooltip interactions
│   └── contact.js          # Tab switching, FAQ accordion, sample picker
├── assets/
│   ├── map/
│   │   ├── africa.svg      # MapSVG CC0 Africa data
│   │   └── turkey.svg      # MapSVG CC0 Turkey data
│   └── images/             # Coffee/origin photos (WebP)
└── netlify.toml            # Netlify config
```

## Netlify Deployment

- **Build:** None required — static files served directly
- **Forms:** Netlify Forms with `data-netlify="true"` on all 3 contact forms
- **Config (`netlify.toml`):**
  ```toml
  [build]
    publish = "/"

  [[headers]]
    for = "/*"
    [headers.values]
      X-Frame-Options = "DENY"
      X-Content-Type-Options = "nosniff"
  ```
- **Deploy command:** `netlify deploy --prod --dir .` (or drag-and-drop via Netlify UI)

## Data Model (Static JSON or inline)

Coffee data stored as a JS object/array in a shared data file or inline per page. No database. Structure per coffee:

```js
{
  id: "yirgacheffe-kochere",
  name: "Yirgacheffe Kochere",
  country: "Ethiopia",
  countryCode: "ET",
  flag: "🇪🇹",
  region: "Gedeo Zone, SNNPR",
  altitude: "1,900m",
  roast: "Light",
  process: "Natural",
  varietal: "Heirloom",
  harvest: "Nov–Jan",
  scaScore: 88.5,
  body: 3,           // out of 5
  badge: "Single Origin",
  description: "...",
  longDescription: "...",
  flavors: ["Jasmine", "Bergamot", "Honey", "Stone Fruit", "Citrus Zest"],
  tasting: { aroma: 9.2, acidity: 8.5, sweetness: 8.8, body: 7.0, finish: 8.7, balance: 9.0 },
  brewing: { dose: "7g", water: "65ml", heat: "Low", time: "3–4 min" },
  supplier: { name: "Kochere Cooperative Union", location: "Kochere, Gedeo Zone", farmers: 4200, cooperatives: 34, certifications: ["Fair Trade"] }
}
```

## External Dependencies (CDN)

- Three.js: `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js`
- GSAP + ScrollTrigger: `https://cdn.jsdelivr.net/npm/gsap@3.12.4/dist/gsap.min.js` + ScrollTrigger plugin
- Google Fonts: Playfair Display (400, 400i, 700) + Inter (300, 400, 600)

No npm, no build tools, no node_modules.

## Out of Scope

- E-commerce / shopping cart / payment processing
- User accounts / authentication
- CMS / admin panel
- Blog (deferred to future phase)
- Mobile app
- Email marketing integration
- Analytics (can be added post-launch via Netlify snippet injection)
