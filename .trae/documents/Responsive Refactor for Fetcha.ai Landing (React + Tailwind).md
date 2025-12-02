## Overview
Refactor the current React + Tailwind landing page to be fully responsive from mobile through large desktops while preserving branding, visuals, and form/edge-function behavior. Implement mobile‑first patterns, fluid typography, responsive grids, accessible navigation, performant assets, and verification.

## Responsive Architecture
- Mobile‑first classes across components using Tailwind `sm`, `md`, `lg`, `xl`, `2xl` breakpoints.
- Containers: `container mx-auto w-full px-4 sm:px-6 md:px-6 lg:px-8` and `max-w-[1440px]` at `xl/2xl`.
- Grids/Flex: use `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` and `flex flex-col md:flex-row` where appropriate.
- Fluid units: `rem` base for spacing, `vw/vh` where sensible (hero height), clamp typography.

## Breakpoint Implementation
- Mobile (sm, 360–480px): single column for hero/benefits/pricing/form; compact nav; base spacing ~16px (`px-4`, `py-4`).
- Tablet (md, 768–1024px): two columns for hero auxiliary blocks, benefits grid 2‑up, pricing 2‑up; spacing ~24px.
- Desktop (lg, ≥1280px): multi‑column layouts; hero full‑width; spacing ~32px.
- Large screens (xl/2xl, ≥1440px): container `max-w-[1440px]`, increased leading and font sizes.

## Component Updates
### Navigation (`src/components/Navbar.jsx`)
- Add mobile menu: hamburger button toggles a collapsible list with `aria-expanded` and focusable links.
- Scale logo: `w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8`.
- Spacing: `py-3 sm:py-4 md:py-5`; link group uses `gap-3 sm:gap-4` and stacks on mobile.

### Hero (`src/App.jsx` section)
- Fluid typography via CSS clamp: `text-[clamp(1.75rem,4vw,3.5rem)]` for H1; subtext `text-[clamp(0.95rem,2vw,1.125rem)]`.
- Dynamic height: wrapper `min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh]` and responsive padding.
- CTA/button reposition: on small screens place CTA under copy; ensure `w-full sm:w-auto`.
- Demo asset: switch to responsive `<img>` with `srcset`/`sizes` and `object-contain` inside aspect box.

### Benefits (`src/components/BenefitCard.jsx` + layout in `src/App.jsx`)
- Equal heights with `h-full` and parent grid `items-stretch`.
- Internal spacing consistent: `p-5 sm:p-6`.
- Icon size scales: `w-8 h-8 sm:w-10 sm:h-10`.

### Pricing (`src/components/PricingSection.jsx`)
- Cards: equal height with `h-full flex flex-col`; button pinned bottom via `mt-auto`.
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` and consistent gaps.
- Comparison grid: stack feature labels and values on mobile (`grid-cols-2 md:grid-cols-4`); avoid overflow.
- Buttons (Pro/Business) remain white, sharp (`rounded-none`), full‑width; ensure touch area ≥44px.
- Currency formatting: keep `₦` and large size; ensure non‑wrapping via `whitespace-nowrap`.

### Waitlist Form (`src/components/WaitlistForm.jsx`)
- Inputs: `text-white` for visibility on dark; `w-full`, `min-h-[44px]`.
- Spacing: `space-y-3 sm:space-y-4`; button `w-full sm:w-auto`.
- Validation messages responsive; ensure no layout shift.

### Images & Media
- Provide `srcset` for hero/demo image variants in `public/` (e.g., `demo-800.jpg`, `demo-1200.jpg`, `demo-1600.jpg`) and update `<img>` with `sizes`.
- Aspect ratio wrappers: `aspect-[16/9] md:aspect-[21/9]` and `object-contain`.
- Conditional visibility: hide heavy media on very small devices if needed using `hidden sm:block`.

## Tailwind & Styles
- Extend `tailwind.config.js`:
  - `screens` remain default; add container `maxWidth: 1440px` via utilities.
  - Add `fontSize` utilities for clamp via CSS variables.
- `src/styles/globals.css`:
  - Add CSS custom properties: `--space`, `--radius`, `--leading` for theming.
  - Define `.container-1440 { max-width: 1440px; }` if needed.

## Hooks & Animation
- `src/hooks/useToggle.js`: simple toggle for mobile menu.
- `src/hooks/useIntersection.js`: intersection observer to reveal cards (fade/slide) with reduced motion respect.
- Apply `animate-glow` remains; add scroll reveal classes conditionally.

## Performance
- Code splitting: lazy load `SocialProof` (`React.lazy`) and possibly `PricingSection` if below fold.
- Lazy images: `loading="lazy"` on non‑critical images; prefetch hero.
- Asset compression: convert demo asset to optimized JPG/WebP variants.

## Accessibility & UX
- Nav: proper `button` semantics, keyboard navigation, focus rings.
- Touch targets ≥44px; no horizontal scroll; readable typography at all sizes.

## Testing Protocol
- Use Chrome DevTools’ device toolbar to test 360px, 414px, 768px, 1024px, 1280px, 1440px, 1920px.
- (Optional) BrowserStack runs across Android/iOS Chrome/Safari.
- Lighthouse performance and accessibility pass.
- Visual checks: ensure cards equal height and grids don’t overflow.

## Deliverables
- Updated React components with clear inline comments explaining responsive choices and prop handling.
- Prop types via `prop-types` for shared components (`BenefitCard`, `PricingSection` tier mapping, `Navbar`).
- Tailwind config extensions and small custom utilities.
- Short responsiveness guide and breakpoint reference (added to project notes, not heavy docs).

## Implementation Plan (Files)
1. `src/components/Navbar.jsx`: add mobile menu, responsive spacing.
2. `src/App.jsx`: hero clamp typography, responsive containers, CTA positioning; integrate responsive demo image; keep glow.
3. `src/components/BenefitCard.jsx`: equal height and responsive spacing.
4. `src/components/PricingSection.jsx`: equal height, responsive grid, white buttons for Pro/Business, comparison grid stacking.
5. `src/components/WaitlistForm.jsx`: spacing and input accessibility tweaks.
6. `src/styles/globals.css`: CSS vars for spacing/typography; optional utilities.
7. `public/`: add demo image variants and update hero `<img>` with `srcset`/`sizes`.
8. Add `prop-types` dependency and props across components.

## Approval
On approval, I will implement the above changes, rebuild, and verify across breakpoints with a live preview, ensuring no overflow and consistent branding throughout.