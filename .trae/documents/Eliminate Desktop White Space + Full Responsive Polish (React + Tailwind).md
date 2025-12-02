## Goal
Revise the layout to fully utilize horizontal space on desktop while keeping mobile-first responsiveness, accessibility, and consistent branding. Validate across 320–1920px viewports.

## High-Level Approach
- Mobile-first Tailwind utilities drive breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`).
- Introduce full-bleed sections to remove side white space where appropriate (hero/pricing).
- Constrain readable content with a max width (1440px) while expanding visual elements to viewport width.
- Normalize touch targets and fluid typography.

## Layout & Container Strategy
- Configure a max content width: `max-w-[1440px]` for inner wrappers on large screens.
- Add a `.full-bleed` utility so backgrounds and section wrappers can span edge-to-edge (removes desktop side white space).
- Replace `max-w-4xl` limits in hero demo with responsive, wider containers.

## Component-Specific Updates
- Navigation
  - Make header full-bleed; inner content uses the 1440px container.
  - Ensure links reach `min-h-[44px]` and maintain spacing across breakpoints.
- Hero
  - Use full-bleed wrapper for the glow/demo area to remove side white space.
  - Replace hard width caps with `w-full` + responsive aspect ratios; increase `max-w` to 1440px for text block.
  - Clamp typography for readable scaling from mobile to desktop.
- Benefits & Pricing
  - Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4` with `gap-6 lg:gap-8` and `items-stretch`.
  - Convert section containers to full-bleed visuals with centered inner content to reduce desktop margins.
  - Keep pricing buttons full-width, sharp-edged; ensure `whitespace-nowrap` on prices.
- Waitlist Form
  - Ensure `w-full sm:w-auto` button, `min-h-[44px]` inputs, visible text and focus rings.

## Responsive Images & Meta
- Confirm viewport meta tag exists; add `theme-color` if helpful.
- Add `srcset`/`sizes` for hero demo image (e.g., 800/1200/1600 widths) to optimize loading across devices.

## Accessibility & Touch
- Ensure all interactive controls have `min-h-[44px]` and keyboard-focus rings.
- Keep `aria-expanded` and semantic `button` usage for mobile menu.

## Tailwind Enhancements
- Extend Tailwind config for container behavior and screens if needed.
- Add `.full-bleed` CSS utility in globals for edge-to-edge sections.

## Testing Plan
- Chrome DevTools device sizes: 320, 360, 414, 768, 1024, 1280, 1440, 1920.
- Verify no horizontal overflow, proper hierarchy, readable typography, and accessible interactions.
- Lighthouse quick audit for performance and accessibility.

## Implementation Steps (Files)
1. `src/styles/globals.css`: add `.full-bleed` utility and confirm CSS variables for spacing.
2. `src/App.jsx`: apply full-bleed wrappers to hero/pricing sections; remove narrow `max-w` constraints; ensure responsive grids.
3. `src/components/Navbar.jsx`: make header full-bleed, adjust touch target sizes.
4. `src/components/PricingSection.jsx`: full-bleed container usage, wider layout on desktop, `xl` spacing tweaks.
5. `public/`: add hero demo image variants and update `<img>` in `App.jsx` to use `srcset/sizes`.

On approval, I will implement these changes, rebuild, and verify across 320–1920px to confirm correct behavior and optimized desktop space usage.