# PROMPT: Add a "Certifications" Section to Janver Manlapaz's Portfolio

Copy everything below the line into Antigravity as your task prompt.

---

## CONTEXT

I'm working on my personal 3D interactive developer portfolio (`janver-portfolio`), built with **React 18 + TypeScript + Vite**, **Three.js / @react-three/fiber / @react-three/drei**, **GSAP + ScrollTrigger**, and **Lenis** smooth scroll on desktop. Mobile (`<= 768px`) disables Lenis and uses native scroll. The project already has a consistent pattern of section components (e.g. `About.tsx`, `Career.tsx`, `WhatIDo.tsx`, `Work.tsx`) each paired with a dedicated CSS file in `src/components/styles/`, and a centralized content config at `src/config.ts`.

I want you to add a brand-new **Certifications** section to the home page that fits seamlessly into the existing design language, animation system, and file structure.

## GOAL

Build a `Certifications` section that:
1. Displays my certifications (title, issuing organization, date, optional credential link, optional badge/logo image) in an interactive, visually impressive layout.
2. Uses smooth, scroll-driven animation consistent with the rest of the site (GSAP ScrollTrigger + Lenis on desktop, graceful native-scroll fallback on mobile — matching the pattern already used in `Work.tsx` and `WhatIDo.tsx`).
3. Incorporates a **subtle 3D or pseudo-3D effect** (tilt-on-hover / perspective card flip / depth-layered parallax) that feels native to a WebGL-driven portfolio — NOT a heavy new Three.js scene, but CSS 3D transforms or lightweight `@react-three/fiber` elements if it fits performance budget.
4. Matches the existing visual system exactly (see Design Requirements below) — no generic Bootstrap-looking cards.

## WHERE THIS FITS

- **New component:** `src/components/Certifications.tsx`
- **New stylesheet:** `src/components/styles/Certifications.css`
- **Content source:** Add a `certifications` array to `src/config.ts` (mirror how other sections pull content from config — do not hardcode data inside the component)
- **Placement:** Insert into `MainContainer.tsx` in the section order — logically it should sit right after `Career.tsx` (career timeline) and before `WhatIDo.tsx` or `Work.tsx`. Confirm the best placement by inspecting `MainContainer.tsx`'s current section order and use your judgment on flow (career → certifications → skills/work feels natural).
- **Scroll animation registration:** Wire it into `src/components/utils/GsapScroll.ts` following the same ScrollTrigger timeline pattern used for other sections, so it participates in the existing scroll orchestration rather than running an isolated/conflicting animation.
- **Navbar (optional but preferred):** Add a "Certifications" anchor link to `Navbar.tsx` if it has a section nav list, matching existing link styling and scroll-to behavior.

## CONTENT MODEL (add to config.ts)

Each certification entry should support:
```ts
interface Certification {
  id: string;
  title: string;            // e.g. "HENNGE Global Internship Program"
  issuer: string;           // e.g. "HENNGE K.K."
  date: string;             // e.g. "2026"
  credentialUrl?: string;   // link to verify/view certificate
  badgeImage?: string;      // path to logo/badge, fallback to issuer initials if absent
  description?: string;     // 1-2 line summary of what it covers
}
```
Seed it with placeholder entries for now (I'll swap in my real certifications after), including at least: HENNGE Global Internship Program Admission Challenge, and 2 more generic placeholders clearly marked `// TODO: replace with real cert data`.

## DESIGN REQUIREMENTS (must match existing portfolio system)

- **Typography, color variables, spacing:** Pull from the global CSS variables defined in `src/index.css` — do not introduce new hardcoded hex colors, fonts, or spacing values. Inspect `index.css` first and reuse existing custom properties.
- **Layout style reference:** Study `WhatIDo.css` (the "interactive dashed blueprint cards") and `Work.css` (horizontal pin-scrolling gallery) before designing — the Certifications section should feel like a sibling of these, not a foreign component. A card-grid or horizontal-scroll-strip of "certificate cards" with a blueprint/technical aesthetic (dashed borders, mono-spaced labels, corner brackets) would fit the existing visual language well — but defer to whatever's actually established in those files.
- **Hover/interaction state:** On desktop, hovering a certification card should trigger a subtle 3D tilt (perspective transform following cursor position) plus a soft glow/border highlight — similar interaction weight to the magnetic social icons in `SocialIcons.tsx`. On mobile/touch, skip the tilt and use a simpler tap/focus state.
- **Entrance animation:** Cards should animate in on scroll (staggered fade + slide + slight 3D rotate-in), timed via GSAP ScrollTrigger, matching the easing/duration conventions already used elsewhere in `GsapScroll.ts` (inspect and reuse the same ease curves, e.g. if the site uses `power3.out` or similar, stay consistent).
- **Responsive behavior:** Full responsive support — desktop grid/horizontal layout, tablet adjusted columns, mobile single-column stacked cards with the native-touch-scroll rules already applied site-wide (`touch-action: pan-y`).
- **Section heading:** Follow the same heading treatment pattern used in other sections (check `About.tsx`/`Career.tsx` for heading markup/animation, e.g. `HoverLinks.tsx` or `splitText.ts` character-split reveal) so the "Certifications" title animates in consistently with other section titles.

## TECHNICAL CONSTRAINTS

- TypeScript strict typing throughout — no `any`.
- No new heavy dependencies. Use existing libs already in `package.json` (`gsap`, `three`/`@react-three/fiber`/`@react-three/drei` if a light 3D touch is used, `react-icons` for issuer/verify icons).
- Keep bundle-size discipline in mind — this project already does custom chunk splitting in `vite.config.ts` for `three`/`gsap`/vendor; don't regress that.
- Respect the dual-scroll architecture: any ScrollTrigger/Lenis-dependent behavior must have a working fallback path for the mobile branch where Lenis is disabled.
- Accessible markup: certificate cards should be reachable via keyboard, credential links should have proper `aria-label`s, and images need `alt` text.
- Clean up all GSAP ScrollTriggers/timelines on unmount to avoid memory leaks or duplicate triggers on route change (check how existing components handle cleanup in `useEffect` return functions and mirror that).

## DELIVERABLES

1. `src/components/Certifications.tsx` — fully implemented component.
2. `src/components/styles/Certifications.css` — fully styled, matching design system.
3. Updated `src/config.ts` — with the `Certification` interface and seeded `certifications` array.
4. Updated `src/components/MainContainer.tsx` — section inserted in correct order.
5. Updated `src/components/utils/GsapScroll.ts` — new section wired into the scroll animation orchestration.
6. Updated `src/components/Navbar.tsx` — nav link added (if applicable).
7. A short summary at the end explaining: where you placed the section and why, what animation approach you chose (CSS 3D vs Fiber) and why, and any assumptions you made about placeholder certification data.

## QUALITY BAR

Before finishing, verify:
- The section visually feels like it was designed by the same person who built the rest of the site — not bolted on.
- Scroll performance stays smooth (no jank) on both desktop (Lenis) and mobile (native scroll).
- The 3D/tilt effect degrades gracefully on touch devices and reduced-motion preferences (`prefers-reduced-motion` should disable/simplify the tilt and entrance animation).
- No console errors/warnings, no unused imports, no TypeScript errors.

Take your time, inspect the existing files thoroughly before writing new code, and prioritize consistency with what's already built over introducing a new visual style.
