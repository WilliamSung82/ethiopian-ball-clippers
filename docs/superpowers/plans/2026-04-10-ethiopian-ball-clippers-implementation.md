# Ethiopian Ball Clippers Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a 5-page showstopper static website for Ethiopian Ball Clippers — a B2B African coffee supplier targeting Turkish coffee shops.

**Architecture:** Pure static site (no build step). 5 HTML pages share a common CSS design system and JS module for animations. Three.js for 3D hero elements, GSAP+ScrollTrigger for scroll animations. Netlify for hosting and form handling. All libraries loaded via CDN.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS (ES modules), Three.js (CDN), GSAP + ScrollTrigger (CDN), Google Fonts, Netlify Forms, Netlify CLI

---

## File Structure

```
/
├── index.html              # Home / Landing page
├── catalog.html            # Coffee catalog with filters
├── coffee-detail.html      # Individual coffee detail page
├── about.html              # About / Our Story with map
├── contact.html            # Contact / Request Samples with tabs
├── css/
│   ├── global.css          # Reset, CSS variables, nav, footer, floating bg, shared components
│   ├── home.css            # Hero, origin cards, stats, CTA banner
│   ├── catalog.css         # Filter bar, coffee grid cards
│   ├── detail.css          # Split hero, specs grid, tasting chart, brewing guide, supplier
│   ├── about.css           # About hero, map, timeline, flip cards, partners
│   └── contact.css         # Tabs, forms, sample picker, FAQ accordion
├── js/
│   ├── data.js             # Coffee data array (shared across pages)
│   ├── main.js             # Nav scroll effect, custom cursor, floating bg init, page transitions
│   ├── three-scene.js      # Three.js coffee bean 3D scene (home + detail heroes)
│   ├── animations.js       # GSAP ScrollTrigger setup: parallax, staggered reveals, counters
│   ├── catalog-filter.js   # Filter pill clicks, search input, card show/hide with GSAP
│   ├── map.js              # Map pin hover → tooltip show/hide
│   └── contact.js          # Tab switching, FAQ accordion toggle, sample picker select logic
├── assets/
│   └── map/
│       ├── africa.svg      # MapSVG CC0 Africa continent data (75 countries)
│       └── turkey.svg      # MapSVG CC0 Turkey province data
└── netlify.toml            # Netlify deployment config
```

---

## Task 1: Project Foundation — CSS Design System + Global Layout

**Files:**
- Create: `css/global.css`
- Create: `netlify.toml`

This task builds the entire shared CSS foundation: reset, CSS custom properties (colors, typography, spacing), navigation, footer, floating coffee bean background, button styles, and shared utility classes. Every subsequent page depends on this file.

- [ ] **Step 1: Create `netlify.toml`**

```toml
[build]
  publish = "/"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

- [ ] **Step 2: Create `css/global.css` — Reset + Variables**

```css
/* === RESET === */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg-deep);
  color: var(--cream);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow-x: hidden;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }
img { max-width: 100%; display: block; }
ul, ol { list-style: none; }

/* === CSS VARIABLES === */
:root {
  /* Colors */
  --bg-deep: #0a0705;
  --bg-dark: #1a1208;
  --bg-mid: #2a1f10;
  --gold: #d4a574;
  --copper: #c8956e;
  --cream: #f5e6d3;

  /* Typography */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Spacing */
  --section-pad: 120px 48px;
  --nav-height: 72px;

  /* Transitions */
  --ease-out-expo: cubic-bezier(0.23, 1, 0.32, 1);
}
```

- [ ] **Step 3: Add navigation styles to `css/global.css`**

Append to `css/global.css`:

```css
/* === NAVIGATION === */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 20px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(10, 7, 5, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(212, 165, 116, 0.1);
  transition: background 0.3s, padding 0.3s;
}
.nav.scrolled {
  padding: 14px 48px;
  background: rgba(10, 7, 5, 0.95);
}
.nav-logo {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--gold);
  letter-spacing: 2px;
}
.nav-logo span { color: var(--cream); font-weight: 300; }
.nav-links { display: flex; gap: 32px; }
.nav-links a {
  color: rgba(245, 230, 211, 0.6);
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: color 0.3s;
  position: relative;
}
.nav-links a:hover,
.nav-links a.active { color: var(--gold); }
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 1px;
  background: var(--gold);
  transition: width 0.3s var(--ease-out-expo);
}
.nav-links a:hover::after,
.nav-links a.active::after { width: 100%; }

/* Mobile hamburger - hidden on desktop */
.nav-toggle { display: none; }
```

- [ ] **Step 4: Add button styles to `css/global.css`**

```css
/* === BUTTONS === */
.btn-primary {
  display: inline-block;
  padding: 16px 40px;
  background: linear-gradient(135deg, var(--gold), var(--copper));
  color: var(--bg-deep);
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 4px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(212, 165, 116, 0.3);
}
.btn-secondary {
  display: inline-block;
  padding: 16px 40px;
  background: transparent;
  color: var(--gold);
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 1px solid rgba(212, 165, 116, 0.3);
  border-radius: 4px;
  transition: border-color 0.3s, background 0.3s;
}
.btn-secondary:hover {
  border-color: var(--gold);
  background: rgba(212, 165, 116, 0.05);
}
```

- [ ] **Step 5: Add footer, section helpers, and labels to `css/global.css`**

```css
/* === FOOTER === */
.footer {
  padding: 60px 48px 40px;
  border-top: 1px solid rgba(212, 165, 116, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-logo {
  font-family: var(--font-heading);
  color: var(--gold);
  font-size: 1rem;
  letter-spacing: 2px;
}
.footer-copy {
  font-size: 0.75rem;
  color: rgba(245, 230, 211, 0.3);
}

/* === SECTION HELPERS === */
.section { padding: var(--section-pad); }
.section-label {
  font-size: 0.7rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 16px;
}
.section-title {
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--cream);
  margin-bottom: 16px;
}
.section-sub {
  color: rgba(245, 230, 211, 0.4);
  max-width: 500px;
  line-height: 1.7;
  margin-bottom: 60px;
}

/* === TAGS === */
.tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(212, 165, 116, 0.08);
  border: 1px solid rgba(212, 165, 116, 0.15);
  border-radius: 16px;
  font-size: 0.7rem;
  color: var(--gold);
}
```

- [ ] **Step 6: Add floating coffee bean background CSS to `css/global.css`**

```css
/* === FLOATING COFFEE BACKGROUND === */
.floating-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.floating-bg .bean {
  position: absolute;
  animation: bean-drift linear infinite;
}
.floating-bg .bean svg {
  filter: drop-shadow(0 0 8px rgba(212, 165, 116, 0.3));
}
@keyframes bean-drift {
  0%   { transform: translateY(110vh) rotate(0deg) scale(1); }
  25%  { transform: translateY(75vh) rotate(180deg) scale(1.15); }
  50%  { transform: translateY(45vh) rotate(360deg) scale(0.9); }
  75%  { transform: translateY(15vh) rotate(540deg) scale(1.1); }
  100% { transform: translateY(-80px) rotate(720deg) scale(1); }
}
.floating-bg .steam {
  position: absolute;
  width: 3px;
  border-radius: 50%;
  animation: steam-swirl linear infinite;
}
@keyframes steam-swirl {
  0%   { transform: translateY(100vh) translateX(0) scaleX(1); opacity: 0; }
  10%  { opacity: 0.5; }
  50%  { transform: translateY(40vh) translateX(25px) scaleX(3); opacity: 0.25; }
  100% { transform: translateY(-10vh) translateX(-15px) scaleX(6); opacity: 0; }
}
.floating-bg .dust {
  position: absolute;
  border-radius: 50%;
  animation: dust-orbit ease-in-out infinite;
}
@keyframes dust-orbit {
  0%   { transform: translate(0, 0) scale(0.5); opacity: 0.15; }
  30%  { transform: translate(40px, -50px) scale(1.3); opacity: 0.5; }
  60%  { transform: translate(-25px, -100px) scale(1); opacity: 0.3; }
  100% { transform: translate(15px, -160px) scale(0.5); opacity: 0.1; }
}

/* === CUSTOM CURSOR === */
.cursor-dot {
  position: fixed;
  width: 8px; height: 8px;
  background: var(--gold);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s;
  mix-blend-mode: difference;
}
.cursor-ring {
  position: fixed;
  width: 32px; height: 32px;
  border: 1px solid rgba(212, 165, 116, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.15s ease-out, width 0.3s, height 0.3s;
}
.cursor-ring.hover {
  width: 48px; height: 48px;
  border-color: var(--gold);
}

/* Content layer sits above floating bg */
.content-layer { position: relative; z-index: 1; }
```

- [ ] **Step 7: Verify in browser**

Create a minimal `index.html` to test:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ethiopian Ball Clippers</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/global.css">
</head>
<body>
  <nav class="nav">
    <a href="index.html" class="nav-logo">ETHIOPIAN <span>BALL CLIPPERS</span></a>
    <div class="nav-links">
      <a href="index.html" class="active">Home</a>
      <a href="catalog.html">Coffees</a>
      <a href="about.html">Our Story</a>
      <a href="contact.html">Contact</a>
    </div>
  </nav>
  <div class="content-layer">
    <div style="height:100vh;display:flex;align-items:center;justify-content:center;">
      <h1 style="font-family:var(--font-heading);font-size:3rem;color:var(--gold);">Foundation Test</h1>
    </div>
    <footer class="footer">
      <div class="footer-logo">ETHIOPIAN BALL CLIPPERS</div>
      <div class="footer-copy">&copy; 2026 Ethiopian Ball Clippers. All rights reserved.</div>
    </footer>
  </div>
</body>
</html>
```

Open in browser. Verify: dark background, gold nav, Playfair heading, footer renders. Then delete this test content — the real `index.html` is built in Task 3.

- [ ] **Step 8: Commit**

```bash
git add css/global.css netlify.toml
git commit -m "feat: add CSS design system, nav, footer, floating bg styles"
```

---

## Task 2: Shared JavaScript — Data, Nav, Cursor, Floating Background

**Files:**
- Create: `js/data.js`
- Create: `js/main.js`

- [ ] **Step 1: Create `js/data.js` — Coffee catalog data**

```js
export const coffees = [
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
    body: 3,
    badge: "Single Origin",
    description: "Jasmine and bergamot with a honey-sweet finish. Naturally processed at 1,900m altitude.",
    longDescription: "A stunning naturally processed coffee from the Kochere washing station in Yirgacheffe. Jasmine and bergamot aromatics unfold into a honey-sweet body with a clean, lingering finish. Exceptional complexity that shines in Turkish brewing — the fine grind and slow extraction reveal layers of floral and fruit character.",
    flavors: ["Jasmine", "Bergamot", "Honey", "Stone Fruit", "Citrus Zest"],
    tasting: { aroma: 9.2, acidity: 8.5, sweetness: 8.8, body: 7.0, finish: 8.7, balance: 9.0 },
    brewing: { dose: "7g", water: "65ml", heat: "Low", time: "3–4 min" },
    supplier: {
      name: "Kochere Cooperative Union",
      location: "Kochere, Gedeo Zone, Ethiopia",
      farmers: 4200,
      cooperatives: 34,
      altitude: "1,800–2,100m",
      certifications: "Fair Trade since 2008"
    },
    gradient: "linear-gradient(135deg, #2d1a0a, #1a0e05, #3d2510)"
  },
  {
    id: "nyeri-aa-gatomboya",
    name: "Nyeri AA Gatomboya",
    country: "Kenya",
    countryCode: "KE",
    flag: "🇰🇪",
    region: "Nyeri County",
    altitude: "1,850m",
    roast: "Medium",
    process: "Washed",
    varietal: "SL28",
    harvest: "Oct–Dec",
    scaScore: 89.0,
    body: 4,
    badge: "Best Seller",
    description: "Blackcurrant and grapefruit with a wine-like body. Washed process, SL28 varietal.",
    longDescription: "A bold, wine-like cup from the Gatomboya washing station in Nyeri. The SL28 varietal delivers intense blackcurrant and grapefruit with a full, juicy body. Washed processing preserves bright acidity that cuts through the richness of Turkish brewing, creating an unforgettable cup.",
    flavors: ["Blackcurrant", "Grapefruit", "Wine", "Tomato", "Dark Chocolate"],
    tasting: { aroma: 8.8, acidity: 9.0, sweetness: 8.2, body: 8.5, finish: 8.8, balance: 8.5 },
    brewing: { dose: "7g", water: "65ml", heat: "Low", time: "3–4 min" },
    supplier: {
      name: "Gatomboya Washing Station",
      location: "Nyeri, Central Kenya",
      farmers: 1200,
      cooperatives: 1,
      altitude: "1,700–1,900m",
      certifications: "Rainforest Alliance"
    },
    gradient: "linear-gradient(135deg, #2d0d1a, #1a0810, #4a1525)"
  },
  {
    id: "huye-red-bourbon",
    name: "Huye Red Bourbon",
    country: "Rwanda",
    countryCode: "RW",
    flag: "🇷🇼",
    region: "Huye District, Southern Province",
    altitude: "1,700m",
    roast: "Medium",
    process: "Washed",
    varietal: "Red Bourbon",
    harvest: "Mar–Jun",
    scaScore: 87.5,
    body: 5,
    badge: "New Arrival",
    description: "Peach and brown sugar with silky mouthfeel. Fully washed Red Bourbon from Huye cooperative.",
    longDescription: "Silky and luxurious, this fully washed Red Bourbon from the Huye Mountain cooperative delivers peach and brown sugar sweetness with a remarkably smooth body. The clean cup profile makes it an ideal introduction to African coffees for Turkish brewing — approachable yet complex.",
    flavors: ["Peach", "Brown Sugar", "Silky", "Caramel", "Plum"],
    tasting: { aroma: 8.5, acidity: 7.8, sweetness: 9.0, body: 8.8, finish: 8.5, balance: 9.2 },
    brewing: { dose: "7g", water: "65ml", heat: "Low", time: "3–4 min" },
    supplier: {
      name: "Huye Mountain Coffee",
      location: "Huye, Southern Province, Rwanda",
      farmers: 2800,
      cooperatives: 8,
      altitude: "1,600–1,800m",
      certifications: "Organic, Fair Trade"
    },
    gradient: "linear-gradient(135deg, #0d1a2d, #081018, #15254a)"
  },
  {
    id: "kilimanjaro-peaberry",
    name: "Kilimanjaro Peaberry",
    country: "Tanzania",
    countryCode: "TZ",
    flag: "🇹🇿",
    region: "Kilimanjaro Region",
    altitude: "1,600m",
    roast: "Medium-Dark",
    process: "Washed",
    varietal: "Bourbon/Typica",
    harvest: "Jul–Oct",
    scaScore: 86.5,
    body: 4,
    badge: "Single Origin",
    description: "Bright acidity with dark chocolate and black tea notes. Grown on volcanic slopes at high altitude.",
    longDescription: "Grown on the volcanic slopes of Mount Kilimanjaro, this Peaberry delivers concentrated flavor — each cherry produces a single round bean instead of two flat ones. Dark chocolate and black tea dominate, with a bright acidity that lifts the cup. The volcanic soil imparts a mineral depth that shines in Turkish preparation.",
    flavors: ["Dark Chocolate", "Black Tea", "Bright", "Mineral", "Citrus"],
    tasting: { aroma: 8.2, acidity: 8.5, sweetness: 7.8, body: 8.0, finish: 8.0, balance: 8.3 },
    brewing: { dose: "7g", water: "65ml", heat: "Low", time: "3–4 min" },
    supplier: {
      name: "Kilimanjaro Plantation Ltd",
      location: "Moshi, Kilimanjaro, Tanzania",
      farmers: 800,
      cooperatives: 3,
      altitude: "1,400–1,800m",
      certifications: "UTZ Certified"
    },
    gradient: "linear-gradient(135deg, #1a2d0d, #0d1a08, #2d4a15)"
  },
  {
    id: "sidamo-guji-natural",
    name: "Sidamo Guji Natural",
    country: "Ethiopia",
    countryCode: "ET",
    flag: "🇪🇹",
    region: "Guji Zone, Oromia",
    altitude: "2,100m",
    roast: "Light",
    process: "Natural",
    varietal: "Heirloom",
    harvest: "Nov–Jan",
    scaScore: 90.0,
    body: 3,
    badge: "Limited",
    description: "Blueberry explosion with dark chocolate undertones. Sun-dried natural process creates intense fruit-forward character.",
    longDescription: "A fruit bomb from the Guji zone. Sun-dried on raised African beds, this natural process coffee delivers an intense blueberry character backed by dark chocolate undertones. At 2,100m elevation, the slow cherry maturation concentrates sugars and creates a cup that is both wild and refined. In a cezve, the fruit notes become almost jam-like.",
    flavors: ["Blueberry", "Dark Chocolate", "Fruity", "Jam", "Wine"],
    tasting: { aroma: 9.5, acidity: 8.8, sweetness: 9.2, body: 7.5, finish: 9.0, balance: 8.8 },
    brewing: { dose: "7g", water: "65ml", heat: "Low", time: "3–4 min" },
    supplier: {
      name: "Guji Highland Cooperative",
      location: "Hambela, Guji Zone, Ethiopia",
      farmers: 3500,
      cooperatives: 12,
      altitude: "1,900–2,200m",
      certifications: "Organic"
    },
    gradient: "linear-gradient(135deg, #2d2d0d, #1a1a08, #4a4a15)"
  },
  {
    id: "kayanza-long-miles",
    name: "Kayanza Long Miles",
    country: "Burundi",
    countryCode: "BI",
    flag: "🇧🇮",
    region: "Kayanza Province",
    altitude: "1,800m",
    roast: "Medium",
    process: "Washed",
    varietal: "Bourbon",
    harvest: "Apr–Jul",
    scaScore: 86.0,
    body: 3,
    badge: "Single Origin",
    description: "Red apple and vanilla with a clean, sweet finish. Grown by smallholders in Kayanza province.",
    longDescription: "From the Long Miles Coffee Project in Kayanza, this washed Bourbon delivers red apple sweetness and vanilla bean aromatics with a remarkably clean finish. The high-altitude terroir and meticulous washing produce a cup of exceptional clarity — every flavor note is distinct and well-defined.",
    flavors: ["Red Apple", "Vanilla", "Clean", "Honey", "Floral"],
    tasting: { aroma: 8.0, acidity: 8.2, sweetness: 8.5, body: 7.5, finish: 8.0, balance: 8.8 },
    brewing: { dose: "7g", water: "65ml", heat: "Low", time: "3–4 min" },
    supplier: {
      name: "Long Miles Coffee Project",
      location: "Kayanza, Kayanza Province, Burundi",
      farmers: 1500,
      cooperatives: 4,
      altitude: "1,700–1,900m",
      certifications: "Direct Trade"
    },
    gradient: "linear-gradient(135deg, #1a2d2d, #0d1a1a, #154a4a)"
  }
];

export const origins = [
  { country: "Ethiopia", flag: "🇪🇹", cooperatives: 12, regions: "Yirgacheffe · Sidamo · Harrar · Guji · Limu", desc: "The birthplace of coffee. Heirloom varietals from 1,700–2,200m altitude." },
  { country: "Kenya", flag: "🇰🇪", cooperatives: 5, regions: "Nyeri · Kirinyaga · Embu · Murang'a", desc: "SL28/SL34 varietals with bold, wine-like character." },
  { country: "Rwanda", flag: "🇷🇼", cooperatives: 4, regions: "Huye · Nyamasheke · Gakenke", desc: "Red Bourbon excellence. Silky body and caramel sweetness." },
  { country: "Tanzania", flag: "🇹🇿", cooperatives: 3, regions: "Kilimanjaro · Arusha · Mbeya", desc: "Volcanic Peaberry with chocolate and black tea complexity." },
  { country: "Burundi", flag: "🇧🇮", cooperatives: 2, regions: "Kayanza · Ngozi", desc: "Clean, sweet cups with red apple and vanilla notes." },
  { country: "Uganda", flag: "🇺🇬", cooperatives: 2, regions: "Mount Elgon · Rwenzori", desc: "Full-bodied with nutty, chocolatey depth." }
];
```

- [ ] **Step 2: Create `js/main.js` — Nav, cursor, floating background**

```js
// === NAV SCROLL EFFECT ===
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// === CUSTOM CURSOR ===
const cursorDot = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX - 4 + 'px';
  cursorDot.style.top = mouseY - 4 + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX - 16 + 'px';
  cursorRing.style.top = ringY - 16 + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Magnetic hover on buttons and links
document.querySelectorAll('a, button, .btn-primary, .btn-secondary').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// === FLOATING BACKGROUND ===
function initFloatingBg() {
  const container = document.querySelector('.floating-bg');
  if (!container) return;

  // Coffee beans
  const beanConfigs = [
    { left: '3%', w: 44, h: 66, dur: 18, delay: 0, fill: '#a08060' },
    { left: '14%', w: 36, h: 54, dur: 24, delay: 3, fill: '#8b7050' },
    { left: '28%', w: 40, h: 60, dur: 20, delay: 7, fill: '#b09070' },
    { left: '40%', w: 32, h: 48, dur: 26, delay: 1, fill: '#9a7e5e' },
    { left: '55%', w: 48, h: 72, dur: 22, delay: 5, fill: '#b8966e' },
    { left: '68%', w: 34, h: 51, dur: 28, delay: 9, fill: '#8b7050' },
    { left: '82%', w: 42, h: 63, dur: 19, delay: 11, fill: '#a89070' },
    { left: '93%', w: 28, h: 42, dur: 30, delay: 4, fill: '#9a8060' },
    { left: '8%', w: 30, h: 45, dur: 25, delay: 16, fill: '#b09070' },
    { left: '48%', w: 38, h: 57, dur: 32, delay: 14, fill: '#a89070' },
    { left: '75%', w: 46, h: 69, dur: 21, delay: 8, fill: '#b8966e' },
    { left: '35%', w: 34, h: 51, dur: 27, delay: 13, fill: '#9a7e5e' },
  ];

  beanConfigs.forEach(cfg => {
    const bean = document.createElement('div');
    bean.className = 'bean';
    bean.style.cssText = `left:${cfg.left};width:${cfg.w}px;height:${cfg.h}px;animation-duration:${cfg.dur}s;animation-delay:${cfg.delay}s;`;
    bean.innerHTML = `<svg viewBox="0 0 40 60"><ellipse cx="20" cy="30" rx="16" ry="26" fill="${cfg.fill}"/><line x1="20" y1="6" x2="20" y2="54" stroke="#5a4530" stroke-width="2"/></svg>`;
    container.appendChild(bean);
  });

  // Steam wisps
  const steamConfigs = [
    { left: '8%', h: 150, dur: 10, delay: 0 },
    { left: '22%', h: 120, dur: 13, delay: 2 },
    { left: '38%', h: 180, dur: 15, delay: 5 },
    { left: '55%', h: 130, dur: 11, delay: 1 },
    { left: '72%', h: 160, dur: 14, delay: 7 },
    { left: '88%', h: 100, dur: 12, delay: 4 },
    { left: '45%', h: 140, dur: 16, delay: 9 },
  ];

  steamConfigs.forEach(cfg => {
    const steam = document.createElement('div');
    steam.className = 'steam';
    steam.style.cssText = `left:${cfg.left};height:${cfg.h}px;background:linear-gradient(to top,rgba(212,165,116,0.22),transparent);animation-duration:${cfg.dur}s;animation-delay:${cfg.delay}s;`;
    container.appendChild(steam);
  });

  // Dust particles
  for (let i = 0; i < 12; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust';
    const size = 3 + Math.random() * 3;
    dust.style.cssText = `left:${5 + Math.random() * 90}%;top:${10 + Math.random() * 80}%;width:${size}px;height:${size}px;background:rgba(212,165,116,${0.4 + Math.random() * 0.25});animation-duration:${7 + Math.random() * 5}s;animation-delay:${Math.random() * 8}s;box-shadow:0 0 ${size + 3}px rgba(212,165,116,${0.2 + Math.random() * 0.2});`;
    container.appendChild(dust);
  }
}

document.addEventListener('DOMContentLoaded', initFloatingBg);
```

- [ ] **Step 3: Verify nav scroll + cursor + floating bg work**

Open `index.html` in browser (update it to include `<div class="floating-bg"></div>` and `<script src="js/main.js"></script>`). Verify: beans float up, steam wisps animate, cursor dot follows mouse, ring trails behind with lag, nav gets `.scrolled` class on scroll.

- [ ] **Step 4: Commit**

```bash
git add js/data.js js/main.js
git commit -m "feat: add coffee data, nav scroll effect, custom cursor, floating bg"
```

---

## Task 3: Home Page

**Files:**
- Create: `css/home.css`
- Create: `js/three-scene.js`
- Create: `js/animations.js`
- Overwrite: `index.html`

- [ ] **Step 1: Create `css/home.css`**

```css
/* === HERO === */
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 60% 40%, rgba(42, 31, 16, 0.8) 0%, var(--bg-deep) 70%);
}
.hero-particles {
  position: absolute;
  inset: 0;
}
.hero-particles .particle {
  position: absolute;
  width: 2px; height: 2px;
  background: rgba(212, 165, 116, 0.3);
  border-radius: 50%;
  animation: float-up 8s infinite;
}
@keyframes float-up {
  0%   { transform: translateY(100vh) scale(0); opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 0.5; }
  100% { transform: translateY(-20vh) scale(1.5); opacity: 0; }
}

/* Three.js canvas container */
.hero-canvas {
  position: absolute;
  right: -5%; top: 50%;
  transform: translateY(-50%);
  width: 500px; height: 500px;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 24px;
}
.hero-badge {
  display: inline-block;
  padding: 8px 20px;
  border: 1px solid rgba(212, 165, 116, 0.3);
  border-radius: 24px;
  font-size: 0.7rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 32px;
  opacity: 0;
}
.hero-title {
  font-family: var(--font-heading);
  font-size: 5rem;
  line-height: 1.05;
  color: var(--cream);
  margin-bottom: 24px;
  opacity: 0;
}
.hero-title em {
  font-style: italic;
  color: var(--gold);
}
.hero-sub {
  font-size: 1.1rem;
  color: rgba(245, 230, 211, 0.5);
  max-width: 500px;
  margin: 0 auto 40px;
  line-height: 1.7;
  opacity: 0;
}
.hero-cta {
  display: inline-flex;
  gap: 16px;
  opacity: 0;
}
.hero-scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(245, 230, 211, 0.3);
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
}
.scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, rgba(212, 165, 116, 0.5), transparent);
  animation: scroll-pulse 2s infinite;
}
@keyframes scroll-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

/* === ORIGINS GRID === */
.origins-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.origin-card {
  background: linear-gradient(145deg, rgba(26, 18, 8, 0.8), rgba(10, 7, 5, 0.9));
  border: 1px solid rgba(212, 165, 116, 0.08);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.4s var(--ease-out-expo), border-color 0.4s;
  cursor: pointer;
}
.origin-card:hover {
  transform: translateY(-8px);
  border-color: rgba(212, 165, 116, 0.25);
}
.origin-img {
  height: 220px;
  position: relative;
  overflow: hidden;
}
.origin-img-bg { position: absolute; inset: 0; }
.origin-img-bg.ethiopia { background: linear-gradient(135deg, #2d4a1a, #1a2d0d); }
.origin-img-bg.kenya    { background: linear-gradient(135deg, #4a1a1a, #2d0d0d); }
.origin-img-bg.rwanda   { background: linear-gradient(135deg, #1a2d4a, #0d1a2d); }
.origin-country {
  position: absolute;
  bottom: 16px; left: 16px;
  font-family: var(--font-heading);
  font-size: 1.8rem;
  color: var(--cream);
}
.origin-flag { position: absolute; top: 16px; right: 16px; font-size: 1.5rem; }
.origin-body { padding: 24px; }
.origin-region {
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}
.origin-desc {
  font-size: 0.9rem;
  color: rgba(245, 230, 211, 0.5);
  line-height: 1.6;
  margin-bottom: 16px;
}
.origin-tags { display: flex; gap: 8px; flex-wrap: wrap; }

/* === STATS === */
.stats-section {
  background: linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 50%, var(--bg-deep) 100%);
  padding: 100px 48px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.stat-number {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  color: var(--gold);
  margin-bottom: 8px;
}
.stat-label {
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(245, 230, 211, 0.4);
}

/* === CTA BANNER === */
.cta-banner {
  padding: var(--section-pad);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-banner::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(212, 165, 116, 0.06) 0%, transparent 70%);
}
.cta-banner h2 {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  color: var(--cream);
  margin-bottom: 16px;
  position: relative;
}
.cta-banner p {
  color: rgba(245, 230, 211, 0.4);
  margin-bottom: 40px;
  position: relative;
}
```

- [ ] **Step 2: Create `js/three-scene.js` — 3D coffee bean**

```js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function initThreeScene(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(500, 500);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Coffee bean shape — ellipsoid with crease
  const beanGeometry = new THREE.SphereGeometry(1, 32, 32);
  // Flatten into bean shape
  const positions = beanGeometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    let x = positions.getX(i);
    let y = positions.getY(i);
    let z = positions.getZ(i);
    // Elongate
    y *= 1.5;
    // Flatten sides
    x *= 0.7;
    // Add crease
    const creaseDepth = 0.15 * Math.exp(-x * x * 20) * Math.cos(y * 1.2);
    z -= creaseDepth;
    positions.setXYZ(i, x, y, z);
  }
  beanGeometry.computeVertexNormals();

  const beanMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d2a14,
    roughness: 0.6,
    metalness: 0.1,
  });

  const bean = new THREE.Mesh(beanGeometry, beanMaterial);
  bean.rotation.x = 0.3;
  bean.rotation.z = -0.3;
  scene.add(bean);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xd4a574, 0.4);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xd4a574, 1.2);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xc8956e, 0.6);
  rimLight.position.set(-3, -2, -3);
  scene.add(rimLight);

  // Animation loop
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  function animate() {
    requestAnimationFrame(animate);
    bean.rotation.y += 0.005;
    bean.rotation.x += Math.sin(Date.now() * 0.001) * 0.002;
    // Float effect
    bean.position.y = Math.sin(Date.now() * 0.001) * 0.15;
    // Mouse follow
    bean.rotation.x += (mouseY * 0.3 - bean.rotation.x) * 0.02;
    bean.rotation.z += (-mouseX * 0.3 - bean.rotation.z) * 0.02;
    renderer.render(scene, camera);
  }
  animate();
}
```

- [ ] **Step 3: Create `js/animations.js` — GSAP ScrollTrigger setup**

```js
// GSAP and ScrollTrigger loaded via CDN in HTML <script> tags
// This file registers animations after DOM is ready

export function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance animation
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 }, 0.3)
    .fromTo('.hero-title', { opacity: 0, y: 40, letterSpacing: '8px' }, { opacity: 1, y: 0, letterSpacing: '0px', duration: 1.2 }, 0.5)
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, 0.8)
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8 }, 1.0);

  // Set initial states
  gsap.set(['.hero-badge', '.hero-sub', '.hero-cta'], { y: 20 });

  // Staggered card reveals
  gsap.utils.toArray('.origin-card, .coffee-card, .partner-card, .pc').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      delay: i % 3 * 0.15,
      ease: 'power3.out',
    });
  });

  // Stats counter animation
  gsap.utils.toArray('.stat-number').forEach(stat => {
    const target = stat.textContent;
    const num = parseInt(target);
    if (isNaN(num)) return;
    const suffix = target.replace(/[\d]/g, '');

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(stat, {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            stat.textContent = Math.round(parseFloat(stat.textContent)) + suffix;
          },
        });
      },
      once: true,
    });
  });

  // Section fade-ins
  gsap.utils.toArray('.section-label, .section-title, .section-sub').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });
  });
}
```

- [ ] **Step 4: Create `index.html` — Full home page**

Write the complete `index.html` with all sections: nav, hero (with Three.js canvas container, particles, badge, title, subtitle, CTAs, scroll indicator), featured origins (3 cards: Ethiopia, Kenya, Rwanda with flags, regions, descriptions, flavor tags), stats strip (4 counters), CTA banner, footer. Include:
- Google Fonts link
- `css/global.css` + `css/home.css` stylesheets
- `<div class="floating-bg"></div>` before content layer
- GSAP CDN script tags (gsap.min.js + ScrollTrigger.min.js)
- `<script src="js/main.js"></script>` (regular script)
- `<script type="module">` block importing and calling `initThreeScene('hero-canvas')` and `initAnimations()`
- Particle divs (9 particles with varied left positions and animation delays)

- [ ] **Step 5: Verify in browser**

Open `index.html`. Verify: 3D bean rotates and follows mouse, particles float up, hero text animates in sequence, origin cards stagger-reveal on scroll, stat numbers count up, floating bg beans visible, custom cursor works.

- [ ] **Step 6: Commit**

```bash
git add index.html css/home.css js/three-scene.js js/animations.js
git commit -m "feat: add home page with 3D hero, scroll animations, origin cards"
```

---

## Task 4: Coffee Catalog Page

**Files:**
- Create: `css/catalog.css`
- Create: `js/catalog-filter.js`
- Create: `catalog.html`

- [ ] **Step 1: Create `css/catalog.css`**

Styles for: page header with radial glow, filter bar (horizontal pill buttons for origin + profile, search input), coffee card grid (auto-fill min 320px), coffee card (gradient image area, badge, flag, quick-view overlay slide-up on hover, card body with origin line + decorative rule, coffee name, description, meta row with roast/altitude/process/body dots, flavor tags, hover lift + border glow + shadow animation).

- [ ] **Step 2: Create `js/catalog-filter.js`**

```js
import { coffees } from './data.js';

export function initCatalogFilter() {
  const grid = document.querySelector('.catalog-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.querySelector('.search-input');
  if (!grid) return;

  let activeOrigin = 'All';
  let activeProfile = null;
  let searchTerm = '';

  function renderCards() {
    const filtered = coffees.filter(c => {
      const matchOrigin = activeOrigin === 'All' || c.country === activeOrigin;
      const matchProfile = !activeProfile || c.flavors.some(f =>
        f.toLowerCase().includes(activeProfile.toLowerCase())
      );
      const matchSearch = !searchTerm ||
        c.name.toLowerCase().includes(searchTerm) ||
        c.country.toLowerCase().includes(searchTerm) ||
        c.flavors.some(f => f.toLowerCase().includes(searchTerm));
      return matchOrigin && matchProfile && matchSearch;
    });

    grid.innerHTML = filtered.map(c => `
      <a href="coffee-detail.html?id=${c.id}" class="coffee-card">
        <div class="card-img">
          <div class="card-gradient" style="background:${c.gradient}"></div>
          <div class="card-badge">${c.badge}</div>
          <div class="card-flag">${c.flag}</div>
          <div class="card-quick"><span class="card-quick-btn">Quick View →</span></div>
        </div>
        <div class="card-body">
          <div class="card-origin">${c.country} · ${c.region.split(',')[0]}</div>
          <div class="card-name">${c.name}</div>
          <div class="card-desc">${c.description}</div>
          <div class="card-meta">
            <div class="meta-item"><span class="meta-label">Roast</span><span class="meta-value">${c.roast}</span></div>
            <div class="meta-item"><span class="meta-label">Altitude</span><span class="meta-value">${c.altitude}</span></div>
            <div class="meta-item"><span class="meta-label">Process</span><span class="meta-value">${c.process}</span></div>
            <div class="meta-item"><span class="meta-label">Body</span>
              <div class="rating">${Array.from({ length: 5 }, (_, i) => `<div class="dot${i < c.body ? ' filled' : ''}"></div>`).join('')}</div>
            </div>
          </div>
          <div class="card-tags">${c.flavors.slice(0, 3).map(f => `<span class="tag">${f}</span>`).join('')}</div>
        </div>
      </a>
    `).join('');

    // Re-trigger GSAP animations on new cards
    if (typeof gsap !== 'undefined') {
      gsap.from('.coffee-card', {
        opacity: 0, y: 40, duration: 0.6,
        stagger: 0.1, ease: 'power3.out'
      });
    }
  }

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-group');
      if (group) {
        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      }
      btn.classList.add('active');

      if (btn.dataset.origin !== undefined) {
        activeOrigin = btn.dataset.origin;
      }
      if (btn.dataset.profile !== undefined) {
        activeProfile = btn.dataset.profile || null;
      }
      renderCards();
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase();
      renderCards();
    });
  }

  // Initial render
  renderCards();
}
```

- [ ] **Step 3: Create `catalog.html`**

Full page with: nav (Coffees link active), page header ("Our Coffees"), filter bar with two groups (origin pills: All/Ethiopia/Kenya/Rwanda/Tanzania/Uganda/Burundi using `data-origin` attributes; profile pills: Fruity/Floral/Chocolatey/Spiced using `data-profile`), search input, empty `.catalog-grid` div (JS fills it), footer. Include global.css + catalog.css, GSAP CDN, main.js, module script importing `initCatalogFilter` and `initAnimations`.

- [ ] **Step 4: Verify in browser**

Open `catalog.html`. Verify: 6 coffee cards render, clicking "Ethiopia" shows 2 cards, clicking "Kenya" shows 1, search "blueberry" shows Sidamo Guji, "All" resets. Cards animate on filter change.

- [ ] **Step 5: Commit**

```bash
git add catalog.html css/catalog.css js/catalog-filter.js
git commit -m "feat: add coffee catalog page with filtering and search"
```

---

## Task 5: Coffee Detail Page

**Files:**
- Create: `css/detail.css`
- Create: `coffee-detail.html`

- [ ] **Step 1: Create `css/detail.css`**

Styles for: breadcrumb, split hero (2-column grid — left visual area with 3D bean placeholder/glow, right info column), origin label, coffee name (3rem), region text, long description, specs grid (3-col with 1px gap borders), CTA buttons row, flavor tags (larger pills), tasting section (2-col: radar chart SVG container + horizontal bar ratings), brewing guide (4-col card grid with icons), supplier card (grid with avatar + info).

- [ ] **Step 2: Create `coffee-detail.html`**

This page reads `?id=` from the URL query string to find the coffee in `data.js`. Include a `<script type="module">` that:
1. Imports `coffees` from `data.js`
2. Gets `id` from `new URLSearchParams(window.location.search).get('id')`
3. Finds the matching coffee (defaults to first if not found)
4. Populates all DOM elements: breadcrumb name, flag, badge, origin label, coffee name, region + altitude, long description, 6 specs grid cells, flavor tags, tasting bar widths + values, brewing guide values, supplier card info
5. Generates the SVG radar chart dynamically based on tasting scores

Include all sections from the mockup: breadcrumb, split hero (with `.hero-canvas-detail` for Three.js), tasting profile (radar SVG + bar ratings), Turkish brewing guide (4 steps), supplier card, footer.

- [ ] **Step 3: Verify in browser**

Open `coffee-detail.html?id=yirgacheffe-kochere`. Verify: all data populates, radar chart renders, bars show correct widths, brewing guide displays, supplier info shows. Try `?id=nyeri-aa-gatomboya` — different data loads.

- [ ] **Step 4: Commit**

```bash
git add coffee-detail.html css/detail.css
git commit -m "feat: add coffee detail page with tasting chart, brewing guide, supplier"
```

---

## Task 6: About / Our Story Page

**Files:**
- Create: `css/about.css`
- Create: `js/map.js`
- Copy: `assets/map/africa.svg` (from `/tmp/africa.svg`)
- Copy: `assets/map/turkey.svg` (from `/tmp/turkey.svg`)
- Create: `about.html`

- [ ] **Step 1: Copy map SVG assets**

```bash
mkdir -p assets/map
cp /tmp/africa.svg assets/map/africa.svg
cp /tmp/turkey.svg assets/map/turkey.svg
```

- [ ] **Step 2: Create `js/map.js` — Map tooltip interactions**

```js
export function initMap() {
  const pins = document.querySelectorAll('.map-pin');
  pins.forEach(pin => {
    const tipId = pin.dataset.tip;
    const el = document.getElementById('tip-' + tipId);
    if (!el) return;
    pin.addEventListener('mouseenter', () => el.classList.add('show'));
    pin.addEventListener('mouseleave', () => el.classList.remove('show'));
  });
}
```

- [ ] **Step 3: Create `css/about.css`**

Styles for: about hero (100vh, staggered text reveals), mission section (2-col grid), route map container (border-radius 24px, overflow hidden, relative position for tooltip layer), map SVG (full width), highlighted country paths (`.hl` class with hover fill change), map pin styles (cursor pointer, hover scale), tooltip layer (absolute positioned HTML overlays with `.show` class for opacity), animated timeline (vertical track with fill animation, alternating 3-col grid items, icon nodes with pop animation), values flip cards (3D perspective, `transform-style: preserve-3d`, front/back with `backface-visibility: hidden`, hover rotateY), partner cards with expanding content on hover, CTA section.

- [ ] **Step 4: Create `about.html`**

This is the largest page. Build it with an embedded SVG map using the real MapSVG data. The approach:

1. Use a Python/Node script (run once) to extract Africa country paths and Turkey province paths from the downloaded SVGs and embed them inline in the HTML
2. OR load `assets/map/africa.svg` and `assets/map/turkey.svg` via fetch and inject into the map container

**Recommended approach:** Pre-build the map SVG inline in the HTML (same approach as the mockup v4). Use the Python script from the brainstorming phase to generate the combined map SVG content.

The page includes: nav, hero with scroll indicator, mission section, route map section (with inline SVG containing all country paths + Turkey transform group + animated route line + traveling dot + pin groups with `data-tip` attributes), HTML tooltip overlays for each origin + Turkey, timeline section (3 items alternating), values flip cards (3 cards), partners grid (6 cards), CTA section, footer.

Run:
```bash
python3 -c "
# Same script from brainstorming phase to generate combined map SVG
# Reads /tmp/africa.svg and /tmp/turkey.svg, outputs map section HTML
# (see Task 6 implementation notes)
"
```

- [ ] **Step 5: Verify in browser**

Open `about.html`. Verify: real Africa + Turkey outlines render, East Africa highlighted, route line animates with traveling dot, hovering pins shows tooltip cards, timeline fills and nodes pop, value cards flip on hover, partner cards expand on hover, floating coffee bg visible.

- [ ] **Step 6: Commit**

```bash
git add about.html css/about.css js/map.js assets/map/
git commit -m "feat: add about page with real SVG map, timeline, flip cards"
```

---

## Task 7: Contact / Request Samples Page

**Files:**
- Create: `css/contact.css`
- Create: `js/contact.js`
- Create: `contact.html`

- [ ] **Step 1: Create `css/contact.css`**

Styles for: contact hero (shorter than home hero, centered text, animated entrance), tab switcher (pill-style container with `.active` state background + gold color), tab content panels (`.active` display block, fade-up animation), form grid (2-col: form card + info sidebar), form card (dark gradient background, rounded, padded), form elements (input, select, textarea — dark bg, gold border on focus with box-shadow ring, custom select arrow SVG), form row (2-col grid for paired fields), sample picker (2-col grid of clickable cards with `.selected` state border + check mark), info sidebar cards (stacked), FAQ section (accordion with `.open` class toggling max-height, rotating + arrow).

- [ ] **Step 2: Create `js/contact.js`**

```js
export function initContact() {
  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + target).classList.add('active');
    });
  });

  // Sample picker — max 3 selections
  const sampleOptions = document.querySelectorAll('.sample-option');
  sampleOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      if (opt.classList.contains('selected')) {
        opt.classList.remove('selected');
      } else {
        const selected = document.querySelectorAll('.sample-option.selected');
        if (selected.length < 3) {
          opt.classList.add('selected');
        }
      }
    });
  });

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    question.addEventListener('click', () => {
      // Close others
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });
}
```

- [ ] **Step 3: Create `contact.html`**

Full page with: nav (Contact active), hero ("Get in *Touch*"), tab switcher (3 buttons with `data-tab`), three tab content panels:

**Samples tab:** sample picker grid (6 coffees from data.js, each with flag, name, origin, `.so-check` circle), form fields (name, shop name, email, phone, address, notes), submit button. Sidebar: 4 info cards (What You'll Receive, Delivery Timeline, After Tasting, Direct Contact).

**Quote tab:** form fields (name, business, email, phone, coffee selector dropdown, volume dropdown, frequency dropdown, notes), submit. Sidebar: 3 info cards.

**General tab:** form fields (name, email, subject dropdown, message textarea), submit. Sidebar: 3 info cards (email, phone, address).

All forms have `data-netlify="true"` and unique `name` attributes for Netlify Forms.

FAQ section: 5 items with question + answer.

Footer.

- [ ] **Step 4: Verify in browser**

Open `contact.html`. Verify: tabs switch content, sample picker allows max 3 selections, FAQ items toggle (only one open at a time), form inputs have focus styles, Netlify form attributes present.

- [ ] **Step 5: Commit**

```bash
git add contact.html css/contact.css js/contact.js
git commit -m "feat: add contact page with tabs, sample picker, FAQ accordion"
```

---

## Task 8: Cross-Page Polish + Link Wiring

**Files:**
- Modify: `index.html` (update links)
- Modify: `catalog.html` (update links)
- Modify: `coffee-detail.html` (update links)
- Modify: `about.html` (update links)
- Modify: `contact.html` (update links)

- [ ] **Step 1: Wire all navigation links across pages**

Ensure every page's nav links point to correct HTML files and the correct link has `.active` class per page:
- Home: `index.html` active
- Coffees: `catalog.html` active
- Our Story: `about.html` active
- Contact: `contact.html` active

- [ ] **Step 2: Wire CTA buttons**

- Home "Explore Coffees" → `catalog.html`
- Home "Request Samples" → `contact.html`
- Home CTA banner "Request Free Samples" → `contact.html`
- Detail "Request Sample" → `contact.html`
- Detail "Get Quote" → `contact.html#quote` (add JS to auto-switch tab on hash)
- About CTA → `contact.html`
- Catalog cards → `coffee-detail.html?id=xxx`

- [ ] **Step 3: Add card tilt effect to `js/main.js`**

Append to `main.js`:

```js
// Card tilt on mouse move
document.querySelectorAll('.origin-card, .coffee-card, .tl-card, .tlk').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
```

- [ ] **Step 4: Test all page transitions**

Navigate: Home → Coffees → click a card → Detail → Back → Our Story → Contact → switch tabs → FAQ → Home. Verify all links work, active states update, no broken references.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: wire cross-page navigation, CTA links, card tilt effects"
```

---

## Task 9: Deploy to Netlify

**Files:**
- None new (uses existing `netlify.toml`)

- [ ] **Step 1: Install Netlify CLI if needed**

```bash
npm install -g netlify-cli
```

- [ ] **Step 2: Login to Netlify**

```bash
netlify login
```

This opens a browser for OAuth — follow the prompts.

- [ ] **Step 3: Deploy to Netlify**

```bash
cd /Users/williamsung/Projects/african-coffee-collective
netlify deploy --prod --dir .
```

When prompted for a site, select "Create & configure a new site". Choose a team and optionally set a custom site name (e.g., `ethiopian-ball-clippers`).

Expected output:
```
Deploy path: /Users/williamsung/Projects/african-coffee-collective
Deploying to main site URL...
✔ Deploy is live!

Website URL: https://ethiopian-ball-clippers.netlify.app
```

- [ ] **Step 4: Verify live site**

Open the Netlify URL in browser. Check all 5 pages load, animations work, forms show Netlify form badge (or submit test).

- [ ] **Step 5: Commit deploy config if any changes**

```bash
git add -A
git commit -m "chore: deploy to Netlify"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | CSS Design System + Global Layout | `css/global.css`, `netlify.toml` |
| 2 | Shared JS — Data, Nav, Cursor, Floating BG | `js/data.js`, `js/main.js` |
| 3 | Home Page | `index.html`, `css/home.css`, `js/three-scene.js`, `js/animations.js` |
| 4 | Catalog Page | `catalog.html`, `css/catalog.css`, `js/catalog-filter.js` |
| 5 | Detail Page | `coffee-detail.html`, `css/detail.css` |
| 6 | About Page + Map | `about.html`, `css/about.css`, `js/map.js`, `assets/map/*` |
| 7 | Contact Page | `contact.html`, `css/contact.css`, `js/contact.js` |
| 8 | Cross-Page Polish | Modify all HTML files + `js/main.js` |
| 9 | Deploy to Netlify | CLI commands only |

**Total: 9 tasks, ~20 files, 0 build tools**
