# Technical Architecture

## Architecture summary

ScriptureFlux should be a static single-page app with a React UI shell and a Canvas visualization core.

```txt
Browser
  ├─ React UI layer
  │   ├─ Header / Legend / Controls
  │   ├─ ReferenceCard
  │   └─ Responsive layout
  ├─ Canvas rendering layer
  │   ├─ Static network field
  │   ├─ Active link overlay
  │   └─ Axis / anchor highlights
  └─ Static data layer
      ├─ book metadata
      ├─ verse index metadata
      ├─ cross-reference tuples
      └─ verse text lookup
```

## Recommended stack

| Area | Recommendation |
|---|---|
| Build | Vite |
| UI | React + TypeScript |
| Styling | Tailwind CSS |
| Visualization | HTML5 Canvas 2D |
| Math helpers | D3 scale, D3 quadtree |
| Animation | Framer Motion |
| Deployment | GitHub Pages |

## Why Canvas

Cross-reference datasets can contain tens or hundreds of thousands of links. Rendering each link as an SVG path or DOM node can overload layout, style, and hit-testing. Canvas keeps the link field as a bitmap rendering problem and gives predictable performance.

## Rendering layers

Use two canvases if needed:

```txt
NetworkBackgroundCanvas
  - static or rarely redrawn
  - all faint cross-reference arcs
  - no shadows

InteractionCanvas
  - redrawn on hover/selection/filter change
  - active arc
  - active endpoints
  - transient glow
```

A two-canvas approach prevents unnecessary redraw of the full dataset on every mousemove.

## State model

Recommended app state:

```ts
type AppState = {
  datasetStatus: 'idle' | 'loading' | 'ready' | 'error';
  filters: VisualizationFilters;
  activeLinkId: string | null;
  selectedLinkId: string | null;
  pointer: { x: number; y: number } | null;
  viewport: { width: number; height: number; dpr: number };
};
```

## Data loading

Use static files under `public/data` or imported files under `src/data` for MVP.

Recommended production layout:

```txt
public/data/
  books.json
  verse-index.json
  cross-references.min.json
  verse-text.kjv.min.json
```

## Data preprocessing

Do heavy normalization before runtime.

Runtime should not parse human-formatted references repeatedly. Convert every reference to numeric book/chapter/verse indexes ahead of time.

## Error handling

The app should show a clear fallback panel if:

- data cannot be loaded
- JSON schema is invalid
- browser canvas context is unavailable
- WebGL/Canvas performance is weak

## Browser support

Target current evergreen browsers:

- Chrome
- Edge
- Firefox
- Safari

Do not use experimental browser-only APIs for the MVP.
