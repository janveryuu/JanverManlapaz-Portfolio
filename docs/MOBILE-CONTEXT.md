# 📱 Mobile UI Redesign Handoff & Context Guide

> **Project:** Janver Manlapaz — Developer Portfolio  
> **Live Production URL:** [https://janver-manlapaz-portfolio.vercel.app/](https://janver-manlapaz-portfolio.vercel.app/)  
> **Tech Stack:** React 18, TypeScript, Vite, GSAP (ScrollTrigger), Three.js / WebGL, CSS Modules / Vanilla CSS, Vercel Serverless Functions

---

## 🎯 Purpose of This Handoff

This archive is prepared specifically for an **AI UI Builder / Mobile Redesign Specialist** (e.g., v0, Cursor, or design engineer) to overhaul and refine the **mobile user experience (360px – 768px viewport widths)** while keeping visual parity and brand consistency with the desktop experience.

---

## 🎨 Design System & Core Brand Tokens

All global variables and reset tokens live in [`src/index.css`](src/index.css). **Do not overwrite or replace these tokens** — reuse them to maintain visual consistency:

```css
:root {
  --backgroundColor: #0b080c;         /* Deep obsidian/dark violet base */
  --accentColor: #c481ff;             /* Vibrant lavender/violet accent */
  --secondaryAccent: #c2a4ff;        /* Muted purple glow/tag accent */
  --textColor: #ffffff;               /* Crisp white primary text */
  --mutedTextColor: #adacac;          /* Secondary/body muted gray */
  --borderColor: #363636;             /* Grid and divider line borders */
  --cWidth: calc(100% - 30px);        /* Responsive container width */
  --cMaxWidth: 1920px;
}
```

### Aesthetic DNA:
1. **Dark Obsidian Blueprint Aesthetic:** Minimalist dark backgrounds with subtle radial purple ambient lighting.
2. **Dashed Borders & Corner Crosshairs:** Blueprint style cards (`border: 1px dashed rgba(255, 255, 255, 0.2)` with corner brackets `::before` / `::after`).
3. **Typography:** `Geist`, `Outfit`, and `Inter` sans-serif headings with high contrast hierarchy and uppercase taglines.

---

## 📱 Current Mobile Behavior & Architecture

1. **Touch Scrolling vs. Smooth Scroll (Lenis):**
   * On desktop, the site uses Lenis smooth scrolling.
   * On mobile (`<= 768px`), Lenis is explicitly bypassed in `src/components/MainContainer.tsx`, and standard native touch scrolling is applied (`touch-action: pan-y`, `-webkit-overflow-scrolling: touch`) to avoid touch lag or hijacked gestures.

2. **Hero / Landing Section (`Landing.tsx` & `Landing.css`):**
   * **Desktop:** Interactive 3D Spline/Three.js character head that tracks cursor movement.
   * **Mobile (`<= 1024px`):** The Three.js WebGL canvas is unmounted / hidden, and an optimized responsive circular profile image (`/images/janver-coolselfie.png`) is shown instead.

3. **Horizontal Galleries on Mobile (`Work.tsx` & `Certifications.tsx`):**
   * **Desktop:** Uses GSAP ScrollTrigger pinning to translate cards horizontally (`Work`: Left-to-Right, `Certifications`: Reversed Right-to-Left).
   * **Mobile (`<= 768px`):** Pinning is disabled (`if (window.innerWidth <= 768) return;`), and cards currently fall back to vertical stacked cards.

4. **"What I Do" Blueprint Section (`WhatIDo.tsx` & `WhatIDo.css`):**
   * Two blueprint cards: **Full-Stack Developer** and **AI Engineer**.
   * On desktop, cards expand on hover. On mobile/touch devices, touch click toggles the active card state (`what-content-active`).

5. **Navigation (`Navbar.tsx` & `Navbar.css`):**
   * Desktop: Fixed top header with floating links (`About`, `Work`, `Certs`, `Contact`, `Play`).
   * Mobile: Animated hamburger toggle button revealing a full-screen drawer menu with social links.

6. **Interactive AI Playground (`src/pages/Play.tsx`):**
   * Route: `/play`
   * Features a Chess engine game alongside an AI Chatbot personality clone connected to Groq LLaMA 3.3 via `api/chat.js`.

---

## ⚠️ Known Mobile Pain Points & Focus Areas for Redesign

Please focus your mobile UX redesign on the following opportunities:

1. **Vertical Rhythm & Page Height in Work / Certifications:**
   * When the horizontal pin-scroll falls back to vertical stacking on mobile, each card takes up substantial vertical viewport space (~500px–600px each).
   * *Opportunity:* Consider designing a sleek, native touch-swipeable horizontal carousel (with pagination dots or snap points) or a more compact card variant for mobile screens.

2. **Mobile Tap Targets & Thumb Ergonomics:**
   * Ensure interactive buttons (e.g., Certificate Inspect button, modal close `X`, project external links) have minimum 44×44px touch targets.
   * Ensure bottom sheet / modal inspection for certificates is easily dismissible via swipe-down or tap.

3. **"What I Do" Blueprint Cards on Narrow Viewports (360px–390px):**
   * Tag pills (`LLM Integration`, `Prompt Engineering`, `Full Stack`) can wrap into 3–4 rows on very small screens. Optimize padding and pill sizing so cards remain compact.

4. **Hero Section Framing on Mobile:**
   * Review text alignment between the heading `JANVER MANLAPAZ`, the rotating subtitle `Full Stack Dev / AI Engineer`, and the circular selfie avatar to create a punchy, above-the-fold hero presentation.

5. **Performance & Asset Loading:**
   * All images have already been converted to WebP (`< 200KB` each). Keep layout shifts minimal and avoid heavy layout reflows during scroll.

---

## 🗂️ Project Directory Map

```text
janver-portfolio/
├── api/
│   └── chat.js                     # Vercel serverless function (Groq LLaMA 3.3 API)
├── public/
│   ├── images/
│   │   ├── certificates/           # Optimized WebP certificate images
│   │   ├── janver-coolselfie.png   # Mobile hero profile image
│   │   └── ... (project logos & previews)
│   └── ...
├── src/
│   ├── assets/                     # 3D models and static graphic assets
│   ├── components/
│   │   ├── Character/              # Three.js 3D model scene & canvas
│   │   ├── styles/                 # Dedicated component stylesheets
│   │   │   ├── About.css
│   │   │   ├── Career.css
│   │   │   ├── Certifications.css  # Pinned gallery / mobile card styles
│   │   │   ├── Contact.css
│   │   │   ├── Landing.css         # Hero section styles
│   │   │   ├── Loading.css
│   │   │   ├── Navbar.css          # Header & mobile drawer styles
│   │   │   ├── WhatIDo.css         # Blueprint cards & tag styling
│   │   │   └── Work.css            # Project portfolio styling
│   │   ├── utils/                  # GSAP scroll, split text & animation helpers
│   │   ├── About.tsx
│   │   ├── Career.tsx
│   │   ├── Certifications.tsx      # Certifications section + Lightbox modal
│   │   ├── Contact.tsx
│   │   ├── Landing.tsx             # Hero section
│   │   ├── MainContainer.tsx       # Main page assembler & scroll manager
│   │   ├── Navbar.tsx              # Navigation bar + mobile menu
│   │   ├── WhatIDo.tsx             # Skillsets & capabilities
│   │   ├── Work.tsx                # Featured projects showcase
│   │   └── WorkImage.tsx
│   ├── context/
│   │   └── LoadingProvider.tsx     # Loading animation state & breakpoint control
│   ├── pages/
│   │   ├── Play.tsx                # Chess & AI Chat page
│   │   └── Play.css
│   ├── config.ts                   # Centralized data store (Projects, Certs, Skills, Bio)
│   ├── App.tsx                     # React Router config
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles & CSS design tokens
├── index.html                      # HTML root & SEO metadata
├── package.json                    # Dependencies & scripts
├── vite.config.ts                  # Vite build & chunking configuration
├── vercel.json                     # Vercel routing & serverless rewrites
└── MOBILE-CONTEXT.md               # This context file
```

---

## 🔒 Security & Cleanliness Checklist

- [x] Zero `.env` files or hardcoded API keys in this archive.
- [x] Zero `node_modules` or `.git` directory clutter.
- [x] All asset paths map cleanly to `/public` and `/src`.
- [x] Ready for direct import into v0, Cursor, StackBlitz, or any modern React tooling.
