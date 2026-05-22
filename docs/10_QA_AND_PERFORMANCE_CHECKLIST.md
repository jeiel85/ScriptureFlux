# QA and Performance Checklist

## Functional checks

- [ ] App loads with no console errors.
- [ ] 66 books render in correct order.
- [ ] Old Testament and New Testament are visually distinguishable.
- [ ] Cross-reference arcs connect correct source and target positions.
- [ ] Hovering a visible arc activates the correct relationship.
- [ ] ReferenceCard displays correct source and target labels.
- [ ] Verse text lookup returns expected text for known references.
- [ ] Filters update visible links.
- [ ] Attribution footer is visible.

## Data checks

- [ ] Every book has a valid index.
- [ ] Every chapter count is correct.
- [ ] Every verse reference validates against the verse index.
- [ ] Invalid references are reported by the preprocessing script.
- [ ] Duplicate links are either removed or intentionally retained.
- [ ] Production dataset is smaller after minification/compression.

## Performance checks

Use Chrome DevTools Performance panel.

Target:

- [ ] Initial render completes without long UI freeze.
- [ ] Pointer movement remains responsive.
- [ ] Hover detection is throttled with `requestAnimationFrame`.
- [ ] Full background canvas does not redraw on every pointer event.
- [ ] Active glow applies only to one or a small number of selected links.
- [ ] No continuous animation runs unless necessary.
- [ ] Resize handler is debounced or ResizeObserver-driven.
- [ ] Event listeners are cleaned up on unmount.

## Visual checks

- [ ] Network field is visible but not overwhelming.
- [ ] Active link is immediately recognizable.
- [ ] Overlay card remains readable against the background.
- [ ] UI feels reverent/trustworthy rather than arcade-like.
- [ ] Mobile card does not overflow viewport.
- [ ] Labels are not cluttered on small screens.

## Accessibility checks

- [ ] Text contrast is sufficient.
- [ ] Reduced motion mode disables non-essential motion.
- [ ] Interactive controls are keyboard-focusable.
- [ ] Footer attribution is readable.
- [ ] Canvas has an accessible description.

## Browser checks

Test:

- [ ] Chrome
- [ ] Edge
- [ ] Firefox
- [ ] Safari if available
- [ ] Android Chrome if possible
- [ ] iOS Safari if possible

## Release checks

- [ ] `npm run build` succeeds.
- [ ] GitHub Pages path works.
- [ ] Repository README explains data source and licensing.
- [ ] `ATTRIBUTION.md` is present.
- [ ] `DATA_SOURCES.md` is present.
- [ ] License file is present.
