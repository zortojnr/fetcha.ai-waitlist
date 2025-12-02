## Goal
Remove all horizontal scrolling across breakpoints (320–1920px) by fixing overflow sources and applying safe global styles while preserving branding and responsiveness.

## Likely Overflow Sources
- Full‑bleed sections using negative margins can exceed viewport on mobile.
- HeroGlow absolute layer (`w-[1200px]`) can extend beyond viewport.
- Any usage of `w-screen`/`100vw` on elements with padding can overflow.
- Images without explicit `max-width: 100%` insurance.

## Fix Strategy
### 1) Global CSS Safety
- Add to `globals.css`:
```
html, body { overflow-x: hidden; }
img, video { max-width: 100%; height: auto; }
```
- Keep `box-sizing: border-box` (Tailwind base already covers).

### 2) Remove Mobile Full‑Bleed
- Replace `.full-bleed` usage on hero/benefits/pricing with normal containers by default.
- Reintroduce full‑bleed only on large screens via Tailwind arbitrary values (no custom class), e.g.:
  - `lg:mx-[calc(50%-50vw)] lg:w-[100vw]` on a wrapper div
- Default (mobile/tablet): no negative margins; just `w-full` containers.

### 3) Constrain HeroGlow Layer
- Update `src/components/HeroGlow.jsx` from fixed `w-[1200px]` to viewport‑safe fill:
  - Wrapper: `absolute inset-0 -z-10 overflow-hidden`
  - Glow block: use `left-1/2 -translate-x-1/2 max-w-[100vw] w-[90vw] sm:w-[80vw] md:w-[70vw] h-[50vh] sm:h-[55vh] md:h-[60vh]` with large blur but contained inside `overflow-hidden` parent.
- Alternatively: set parent section `overflow-hidden` to clip any residual.

### 4) Replace Any `w-screen`/100vw
- Search and replace `w-screen`/`width:100vw` with `w-full` unless specifically used in controlled full‑bleed at `lg`.

### 5) Section Wrappers
- Hero/Benefits/Pricing sections:
  - Remove custom `.full-bleed` class applications
  - Use: `container mx-auto w-full px-4 sm:px-6 lg:px-8`
  - For edge‑to‑edge visuals on desktop only, wrap inner with: `lg:mx-[calc(50%-50vw)] lg:w-[100vw]` to avoid mobile overflow.

### 6) Verify Buttons/Grids
- Ensure grids use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4` with `items-stretch` and don’t set fixed widths.
- Ensure prices `whitespace-nowrap` but within flex containers that don’t overflow.

### 7) Testing
- DevTools at 320, 360, 390, 412, 768, 1024, 1280, 1440, 1920.
- Confirm no horizontal scroll, check hero/pricing/form interactions.
- Rebuild and run preview; quick Lighthouse check.

## Code Changes to Apply (Concise)
### globals.css
```
html, body { overflow-x: hidden; }
img, video { max-width: 100%; height: auto; }
```

### HeroGlow.jsx (contain absolute glow)
Change to:
```
export default function HeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 w-[90vw] sm:w-[80vw] md:w-[70vw] h-[50vh] sm:h-[55vh] md:h-[60vh] rounded-full blur-3xl opacity-60 animate-glow" style={{
        background: 'radial-gradient(closest-side, rgba(243,201,105,0.15), transparent), radial-gradient(closest-side, rgba(99,102,241,0.15), transparent), radial-gradient(closest-side, rgba(34,197,94,0.08), transparent)'
      }} />
    </div>
  )
}
```

### App.jsx (remove mobile full‑bleed)
- Hero, Benefits, Pricing section wrappers:
  - Default to `container ...` wrappers
  - Optional desktop ONLY full‑bleed wrapper using Tailwind arbitrary values:
```
<div className="lg:mx-[calc(50%-50vw)] lg:w-[100vw]">
  <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8"> ... </div>
</div>
```

### PricingSection.jsx
- Ensure outer wrapper uses `container` by default; avoid `.full-bleed` custom class.
- Maintain `items-stretch` and equal-height flex cards.

## Deliverables
- Updated components/files: `globals.css`, `HeroGlow.jsx`, `App.jsx`, `PricingSection.jsx`.
- Removed horizontal scrolling at all breakpoints; layout centered and stable on mobile.
- Summary of overflow fixes applied and validations performed.

Confirm and I will implement these updates, rebuild, and verify (including cross‑breakpoint manual checks) to deliver production‑ready code without horizontal overflow.