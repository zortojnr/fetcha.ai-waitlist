## Goal
Ensure the Business Type select shows clearly readable text at all times on mobile and desktop (white dropdown with black text), avoiding white‑on‑white issues from dark mode and OS theming.

## Approach
- Update the select styling in `src/components/WaitlistForm.jsx` to explicitly use a white background and black text for the collapsed state and while focused.
- Normalize native select rendering for consistency across browsers using `appearance-none` and an inline caret icon.
- Add a small CSS helper for iOS Safari to force black text if dark mode affects the control (`-webkit-text-fill-color`).
- Keep accessible focus rings and touch target size.

## Changes
### 1) Component: `src/components/WaitlistForm.jsx`
- Replace current select classes with:
```
<select
  className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white text-black border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand.gold appearance-none"
>
```
- Wrap the select in a relative container and add a right‑aligned caret (SVG) to avoid native arrows that can be low contrast:
```
<div className="relative">
  <select ... className="... pr-10 ...">
    ...options
  </select>
  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-black/70">
    ▼
  </span>
</div>
```
- Ensure the first option (empty) reads “Select (optional)” with visible text:
```
<option value="">Select (optional)</option>
```

### 2) CSS: `src/styles/globals.css`
- Add an iOS Safari text color fix class for selects, used only if necessary:
```
.select-black { -webkit-text-fill-color: #000; }
```
- Apply `className="... select-black"` to the select for iOS reliability.

## Notes
- Native dropdown lists are OS‑styled; we can’t fully control list appearance across platforms, but setting the collapsed value to black text on white background ensures readability.
- The caret replacement ensures consistent contrast regardless of platform dark mode.

## Testing
- Verify on mobile sizes: 320, 360, 390, 412 px
- Test iOS Safari (dark mode), Android Chrome, and desktop browsers
- Confirm focus ring and touch target ≥44px

## Outcome
- Collapsed select shows black text on white background
- Focused select keeps black text and visible focus ring
- Dropdown remains readable and accessible across devices and themes