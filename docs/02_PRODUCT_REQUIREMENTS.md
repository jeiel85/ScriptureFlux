# Product Requirements

## MVP scope

### RQ-001: Bible axis

Render the 66 books of the Bible as a single continuous horizontal axis.

Acceptance criteria:

- Books appear in canonical Protestant order.
- Old Testament and New Testament are visually distinguishable.
- Each book segment is proportionate to its verse count, not merely equal-width.
- Book boundaries are visible at normal desktop resolution.

### RQ-002: Cross-reference arcs

Render cross-reference links between related passages.

Acceptance criteria:

- Each link connects source and target positions on the Bible axis.
- Links use smooth cubic Bezier curves.
- Default links are faint enough not to overpower the page.
- Link density should create a network-field impression without blocking labels.

### RQ-003: Hover interaction

Hovering a link reveals its relationship.

Acceptance criteria:

- The active link becomes visually distinct.
- Non-active links dim or remain background-level.
- Source and target anchor points are highlighted.
- The UI remains responsive during pointer movement.

### RQ-004: Reference overlay

Display a verse information card when a link is active.

Acceptance criteria:

- The overlay shows source reference and target reference.
- The overlay shows verse text only on interaction.
- The overlay uses a dark glassmorphism style.
- The overlay stays inside viewport bounds.
- On mobile, the overlay anchors to a bottom sheet.

### RQ-005: Static deployment

The project must deploy without a server.

Acceptance criteria:

- `npm run build` produces static assets.
- GitHub Pages deployment is supported.
- Data files load from relative paths.
- Refreshing the deployed page does not break routing.

## Nice-to-have scope

### RQ-101: Filter controls

- Old Testament only
- New Testament only
- OT-to-NT links
- Same-book links
- Same-chapter links
- Minimum weight threshold

### RQ-102: Mini statistics

Show:

- total books
- total verses
- total cross references loaded
- active filter
- current hovered reference

### RQ-103: Search jump

Allow searching a reference like `John 1:1` and center/focus nearby links.

### RQ-104: Shareable state

Encode selected filters and hovered/selected reference in URL query parameters.

## Non-functional requirements

### Performance

Target:

- 60 FPS for hover feedback on modern desktop browsers.
- Usable interaction on mid-range mobile devices.
- Initial load should stay reasonable by using compressed static data.

### Accessibility

- Provide keyboard focus mode for selected links.
- Maintain sufficient color contrast.
- Do not rely only on color to convey Old/New Testament.
- Respect `prefers-reduced-motion`.

### Maintainability

- Keep data preprocessing separate from rendering code.
- Avoid hard-coded magic numbers in rendering.
- Add comments only where logic is non-obvious.
- Prefer TypeScript types for dataset and geometry models.

### Legal and attribution

- Include `ATTRIBUTION.md` or a visible footer for dataset and Bible text sources.
- Avoid redistributing restricted Bible translations without permission.
