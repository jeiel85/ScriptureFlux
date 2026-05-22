# ScriptureFlux Design Bundle

> Bible Cross-Reference Network Visualization  
> Generated: 2026-05-22

## Purpose

This bundle converts the Gemini conversation brief into a coding-agent-ready Markdown specification package.

The target product is a static, open-source web application that visualizes the organic structure of the Bible by placing the 66 books along a continuous axis and drawing curved cross-reference links between related passages.

## Recommended usage

1. Create a new GitHub repository.
2. Copy this entire bundle into the repository root.
3. Ask your coding agent to read `AGENTS.md` first.
4. Then ask it to implement the app according to the documents in numerical order.

## File map

| File | Purpose |
|---|---|
| `AGENTS.md` | Primary execution prompt for Claude Code, Cursor, Antigravity, etc. |
| `01_PROJECT_BRIEF.md` | Product identity, goals, non-goals, target experience |
| `02_PRODUCT_REQUIREMENTS.md` | Functional and non-functional requirements |
| `03_TECHNICAL_ARCHITECTURE.md` | Framework, rendering, routing, state, deployment |
| `04_DATASET_AND_LICENSE_STRATEGY.md` | Dataset sources, Bible text licensing, attribution rules |
| `05_DATA_SCHEMA_AND_PIPELINE.md` | Normalized data model and preprocessing pipeline |
| `06_VISUALIZATION_RENDERING_SPEC.md` | Canvas rendering, Bezier curves, hover detection |
| `07_UI_UX_DESIGN_GUIDE.md` | Visual tone, layout, motion, responsive rules |
| `08_COMPONENT_STRUCTURE.md` | React component breakdown and file tree |
| `09_IMPLEMENTATION_ROADMAP.md` | Practical development phases |
| `10_QA_AND_PERFORMANCE_CHECKLIST.md` | Acceptance tests, performance budget, edge cases |
| `11_GITHUB_DEPLOYMENT.md` | GitHub repository setup and GitHub Pages deployment |
| `12_AGENT_PROMPTS.md` | Ready-to-paste prompts for vibe coding sessions |
| `ScriptureFlux_Agent_Master_Spec.md` | Single-file consolidated spec for agents |

## Important legal note

The cross-reference mapping and Bible text source must be reviewed before public redistribution. Prefer public-domain or clearly licensed sources, and keep source attribution visible in the repository and UI.


---

# Agent Instructions: ScriptureFlux

You are implementing a production-ready static web app named **ScriptureFlux**.

## First objective

Build a modern, high-performance Bible cross-reference visualization page.

The user wants a page where:

- The 66 books of the Bible are represented as one continuous visual axis.
- Individual verses are not displayed by default.
- Related verses are connected by elegant curved lines.
- Hovering a line highlights the relationship and shows the two linked passages in an overlay card.
- The page is primarily presentational, not conversational or form-driven.
- The visual style must be modern, dynamic, refined, and trustworthy.

## Implementation constraints

Use this stack unless the user explicitly changes it:

- Vite
- React
- TypeScript
- Tailwind CSS
- HTML5 Canvas 2D
- D3 only for scales/quadtree/math helpers, not for rendering thousands of DOM nodes
- Framer Motion for overlay and UI transitions

## Critical rendering rule

Do not render tens of thousands of SVG paths as DOM elements.

Use Canvas for the link field. Use normal DOM/React components only for UI chrome, labels, tooltips, controls, and overlay cards.

## Critical performance rule

Do not apply `shadowBlur`, `filter`, or expensive gradient logic to every cross-reference link on every frame.

Correct pattern:

1. Draw the full background network with low alpha and no glow.
2. Use spatial indexing or sampled hit geometry to detect one active link.
3. Redraw only the active link with glow and thicker stroke.
4. Throttle pointer interactions with `requestAnimationFrame`.

## Data rule

Use indexed numeric arrays for the large relationship matrix.

Recommended matrix:

```ts
type CrossReferenceTuple = [
  sourceBookIndex: number,
  sourceChapter: number,
  sourceVerse: number,
  targetBookIndex: number,
  targetChapter: number,
  targetVerse: number,
  weight: number
];
```

## Development order

1. Scaffold app.
2. Create static sample dataset.
3. Implement Bible book metadata and verse indexing utilities.
4. Implement Canvas visualization with sample data.
5. Add hover detection and ReferenceCard.
6. Add data loader and production dataset adapter.
7. Add responsive layout.
8. Add performance measurements.
9. Add GitHub Pages deployment workflow.
10. Polish visual style and accessibility.

## Definition of done

The app must run locally with:

```bash
npm install
npm run dev
```

The app must build with:

```bash
npm run build
```

The deployed static build must work on GitHub Pages.


---

# Project Brief: ScriptureFlux

## Project name

**ScriptureFlux**

## One-line concept

A modern static web visualization that reveals the organic cross-reference structure of the Bible by connecting related passages across the 66 books.

## Background

The product is inspired by Bible cross-reference visualizations: the Bible is treated as a continuous structured text, and related passages are connected visually. The user specifically wants a display-focused page, not a chat app, study app, or reading app.

## Core user experience

The initial screen should feel like a refined map of Scripture:

1. A dark, trustworthy canvas fills the page.
2. The 66 books appear as a continuous Bible axis.
3. Thousands of faint arcs show relationships between passages.
4. Hovering a curve activates it.
5. The activated curve glows.
6. A glassmorphism overlay shows:
   - source reference
   - source verse text
   - target reference
   - target verse text
   - relationship weight/type when available

## Goals

- Make the interconnectedness of Scripture visually obvious.
- Keep the first impression beautiful and credible.
- Avoid clutter by hiding verse text until interaction.
- Make the project suitable for GitHub open-source release.
- Make the codebase friendly to coding agents and future maintainers.

## Non-goals

- Do not build a full Bible reader in the first release.
- Do not build accounts, notes, highlights, or social features.
- Do not require a backend for the first release.
- Do not depend on paid Bible APIs for the public demo.
- Do not embed copyrighted Bible translations unless permission is clear.

## Primary audience

- Bible readers who appreciate visual structure.
- Pastors, teachers, and students.
- Developers interested in biblical data visualization.
- Visitors arriving from GitHub or a landing page.

## Success criteria

The product is successful if a first-time visitor immediately understands:

> “This shows how passages across the Bible are connected.”

The implementation is successful if it remains smooth with a large cross-reference dataset and can be deployed as a static site.


---

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


---

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


---

# Dataset and License Strategy

## Primary data categories

ScriptureFlux needs three kinds of data:

1. Bible book metadata
2. Cross-reference relationship data
3. Verse text for hover overlays

These must be treated separately because their licenses may differ.

## Cross-reference dataset candidates

### OpenBible.info cross references

OpenBible.info provides a Bible cross-reference dataset and states that the page has about 340,000 cross references. It also states that the data draws primarily from public-domain sources, especially *Treasury of Scripture Knowledge*, and offers a downloadable data zip.

Recommended use:

- Use as the first candidate for the cross-reference matrix.
- Preserve attribution.
- Verify the downloaded zip contents and license text before committing it to the repository.
- Keep a `DATA_SOURCES.md` file documenting the source and transformation steps.

### Treasury of Scripture Knowledge

The OpenBible.info page indicates that much of its data comes from *Treasury of Scripture Knowledge*. This is a historically important source for public-domain cross-reference data. Confirm edition/source details before republishing transformed data.

## Verse text strategy

### Important rule

Do not assume every Bible translation can be freely redistributed.

For the public GitHub version, choose one of these approaches:

#### Option A: Public-domain English text for demo

Use KJV text from Project Gutenberg for the English demo if the target distribution is compatible with Project Gutenberg terms and United States public-domain status.

Pros:

- Easy to redistribute in the United States.
- Good for open demo.
- Stable source.

Cons:

- Archaic language.
- Copyright status can vary outside the United States.

#### Option B: No bundled verse text

Bundle only references. Fetch or display verse text only if the user configures an allowed source.

Pros:

- Lowest licensing risk.
- Clean open-source distribution.

Cons:

- Hover card is less impressive until configured.

#### Option C: User-provided Bible text

Allow local JSON import or repository-level configuration for licensed translations.

Pros:

- Flexible.
- Can support Korean translations if the user has rights.

Cons:

- More implementation work.
- Public demo cannot include restricted translations.

## Korean Bible text caution

Most modern Korean Bible translations are copyrighted. Do not bundle Korean verse text unless the license explicitly permits redistribution in this web app.

For Korean UI, the reference labels can be Korean while the verse text source remains configurable.

## Attribution requirements

Create:

```txt
ATTRIBUTION.md
DATA_SOURCES.md
LICENSE
```

UI footer should include:

- cross-reference dataset source
- Bible text source
- app repository link
- short license notice

## Recommended MVP decision

For the first public MVP:

1. Use OpenBible.info cross-reference data after verifying its license and keeping attribution.
2. Use KJV public-domain text for English demo overlays.
3. Make Bible text provider replaceable.
4. Do not bundle copyrighted Korean Bible text.
5. Provide Korean UI labels separately from verse text.


---

# Data Schema and Pipeline

## Canonical book metadata

Create a complete `books.json` with all 66 books.

Recommended shape:

```json
[
  {
    "index": 0,
    "osis": "Gen",
    "id": "GEN",
    "ko": "창세기",
    "en": "Genesis",
    "chapters": 50,
    "testament": "OT",
    "section": "Law"
  }
]
```

## Verse index metadata

Each book needs cumulative verse offsets so that every verse can be projected onto the global Bible axis.

Recommended shape:

```json
{
  "totalVerses": 31102,
  "books": [
    {
      "bookIndex": 0,
      "startVerseOffset": 0,
      "verseCount": 1533,
      "chapterVerseCounts": [31, 25, 24]
    }
  ]
}
```

## Cross-reference matrix

Large cross-reference data should be compressed.

Recommended tuple:

```ts
type CrossReferenceTuple = [
  sourceBookIndex: number,
  sourceChapter: number,
  sourceVerse: number,
  targetBookIndex: number,
  targetChapter: number,
  targetVerse: number,
  weight: number
];
```

Example:

```json
[
  [0, 1, 1, 42, 1, 1, 1.0]
]
```

## Runtime enriched object

At runtime, convert tuples into enriched render objects:

```ts
type RenderLink = {
  id: number;
  source: VerseRef;
  target: VerseRef;
  sourceOffset: number;
  targetOffset: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  weight: number;
  testamentClass: 'OT_TO_OT' | 'OT_TO_NT' | 'NT_TO_NT' | 'NT_TO_OT';
};
```

## Verse text lookup

Recommended compact key:

```ts
const key = `${bookIndex}.${chapter}.${verse}`;
```

Example:

```json
{
  "0.1.1": "In the beginning God created the heaven and the earth.",
  "42.1.1": "In the beginning was the Word, and the Word was with God, and the Word was God."
}
```

## Projection algorithm

### Step 1: Convert verse ref to global offset

```ts
function toGlobalVerseOffset(ref: VerseRef, verseIndex: VerseIndex): number {
  const book = verseIndex.books[ref.bookIndex];
  const chapterStart = sum(book.chapterVerseCounts.slice(0, ref.chapter - 1));
  return book.startVerseOffset + chapterStart + (ref.verse - 1);
}
```

### Step 2: Convert global offset to X coordinate

```ts
function offsetToX(offset: number, totalVerses: number, width: number, padding: number): number {
  return padding + (offset / Math.max(totalVerses - 1, 1)) * (width - padding * 2);
}
```

## Preprocessing script requirements

Create a Node script:

```txt
scripts/prepare-data.ts
```

Responsibilities:

- read raw cross-reference source
- parse source and target references
- normalize book names
- map references to book indexes
- reject invalid references with a report
- emit compact JSON files
- emit `data-report.json`

## Data validation

Validate:

- book index is 0–65
- chapter exists for the book
- verse exists for the chapter
- no self-duplicate links unless intentionally allowed
- weight is numeric
- source and target text exists if verse text is bundled

## Output files

```txt
public/data/books.json
public/data/verse-index.json
public/data/cross-references.min.json
public/data/verse-text.kjv.min.json
public/data/data-report.json
```


---

# Visualization Rendering Specification

## Coordinate model

Default layout: horizontal linear Bible axis.

```txt
Genesis ........................................ Revelation
|-----------------------------------------------------------|
```

All cross-reference arcs rise above the axis.

## Canvas setup

Use device pixel ratio scaling:

```ts
function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number, dpr: number) {
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}
```

## Bezier curve

Use cubic Bezier curves.

```ts
function drawArc(ctx: CanvasRenderingContext2D, link: RenderLink, intensity: number) {
  const dx = Math.abs(link.x1 - link.x0);
  const height = Math.max(60, Math.min(420, dx * 0.35));

  const cp1x = link.x0;
  const cp1y = link.y0 - height;
  const cp2x = link.x1;
  const cp2y = link.y1 - height;

  ctx.beginPath();
  ctx.moveTo(link.x0, link.y0);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, link.x1, link.y1);
  ctx.stroke();
}
```

## Default network rendering

Default rendering should be subtle:

```ts
ctx.globalAlpha = 0.035;
ctx.lineWidth = 0.65;
ctx.shadowBlur = 0;
```

## Active link rendering

Only the active link should glow:

```ts
ctx.globalAlpha = 1;
ctx.lineWidth = 2.5;
ctx.shadowBlur = 15;
ctx.shadowColor = '#10b981';
ctx.strokeStyle = '#10b981';
```

## Color classes

Recommended:

| Relationship | Color |
|---|---|
| OT → OT | `rgba(59, 130, 246, 0.35)` |
| OT → NT | `rgba(16, 185, 129, 0.45)` |
| NT → NT | `rgba(236, 72, 153, 0.35)` |
| same book | `rgba(168, 85, 247, 0.32)` |
| same chapter | `rgba(148, 163, 184, 0.30)` |

## Hover detection

### MVP approach

Sample points along each Bezier curve and store them in a spatial index.

```ts
type HitPoint = {
  x: number;
  y: number;
  linkId: number;
};
```

Create a D3 quadtree:

```ts
const tree = d3.quadtree<HitPoint>()
  .x(d => d.x)
  .y(d => d.y)
  .addAll(hitPoints);
```

On pointer move:

```ts
const nearest = tree.find(pointer.x, pointer.y, hoverRadius);
```

If nearest exists, activate its link.

### Optimization

Do not sample every link too densely.

Recommended sampling:

- short links: 6 points
- medium links: 10 points
- long links: 16 points

Rebuild the quadtree only when:

- data changes
- filters change
- viewport changes

## Redraw strategy

### Full redraw triggers

- initial load
- resize
- data loaded
- filter changed

### Interaction redraw triggers

- active link changed
- selected link changed

Pointer move should not redraw the full background layer.

## Axis rendering

Axis should include:

- subtle base line
- book segment ticks
- larger OT/NT division
- optional short book labels
- hover anchor dots

## Mobile behavior

On mobile:

- tap selects a link
- card appears as bottom sheet
- axis labels reduce to abbreviated labels
- filters collapse into a floating button


---

# UI/UX Design Guide

## Design keywords

- modern
- refined
- trustworthy
- sacred but not old-fashioned
- dynamic geometric
- quiet premium
- data visualization first

## Visual direction

Use a deep navy/charcoal background with faint radial gradients. The network should look like a sacred constellation or illuminated manuscript translated into modern data art.

## Palette

```txt
Background: #090D16
Panel: rgba(15, 23, 42, 0.72)
Panel border: rgba(255, 255, 255, 0.10)
Main text: #F8FAFC
Secondary text: #CBD5E1
Muted text: #64748B
OT blue: #3B82F6
NT rose: #EC4899
Active emerald: #10B981
Sacred gold accent: #D4AF37
```

## Typography

Recommended:

- UI font: Inter, Pretendard, system sans-serif
- Reference labels: semibold
- Verse text: readable serif optional, such as Georgia, but only inside the verse card
- Avoid decorative fonts in data-heavy regions

## Layout

Desktop:

```txt
┌──────────────────────────────────────────────────────┐
│ Header: title, subtitle, GitHub link                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│             Canvas visualization area                │
│                                                      │
│                                                      │
│ Bible axis near lower third                          │
├──────────────────────────────────────────────────────┤
│ Footer / attribution / small stats                   │
└──────────────────────────────────────────────────────┘
```

## Header copy

Suggested title:

```txt
ScriptureFlux
```

Suggested subtitle:

```txt
A visual map of cross-references across the 66 books of Scripture.
```

## Reference card

Card fields:

- Source
- Source reference
- Source verse text
- Cross-reference indicator
- Target reference
- Target verse text
- Optional weight/source label

Desktop card placement:

- near pointer with viewport collision detection
- or fixed right-side inspection panel when selected

Mobile card placement:

- bottom sheet
- 80–90% width
- max height 45vh
- scrollable verse text

## Motion

Use motion sparingly:

- card fade/scale in: 150–220 ms
- active link glow: immediate or 120 ms
- background network: no constant animation by default
- optional slow ambient gradient only if it does not affect performance

## Accessibility

- Respect `prefers-reduced-motion`.
- Provide a text equivalent for active cross-reference.
- Make footer attribution readable.
- Ensure keyboard selection can inspect links eventually.
- Do not rely entirely on color; use labels and legend.

## Trust cues

Add subtle credibility elements:

- source attribution footer
- clear data count
- GitHub link
- no manipulative religious language in UI
- avoid excessive neon effects
- keep text sober and factual


---

# Component Structure

## Recommended file tree

```txt
scriptureflux/
├── public/
│   └── data/
│       ├── books.json
│       ├── verse-index.json
│       ├── cross-references.sample.json
│       └── verse-text.sample.json
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── AppShell.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Legend.tsx
│   │   ├── visualization/
│   │   │   ├── BibleNetworkCanvas.tsx
│   │   │   ├── CanvasLayer.tsx
│   │   │   └── AxisLabels.tsx
│   │   └── ui/
│   │       ├── ReferenceCard.tsx
│   │       ├── FilterPanel.tsx
│   │       └── LoadingState.tsx
│   ├── data/
│   │   ├── bibleBooks.ts
│   │   └── sampleCrossReferences.ts
│   ├── hooks/
│   │   ├── useDataset.ts
│   │   ├── useCanvasSize.ts
│   │   ├── usePointerRaf.ts
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── geometry/
│   │   │   ├── bezier.ts
│   │   │   ├── projection.ts
│   │   │   └── hitTest.ts
│   │   ├── rendering/
│   │   │   ├── drawAxis.ts
│   │   │   ├── drawLinks.ts
│   │   │   └── drawActiveLink.ts
│   │   ├── data/
│   │   │   ├── normalize.ts
│   │   │   ├── validate.ts
│   │   │   └── labels.ts
│   │   └── constants.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   ├── bible.ts
│   │   ├── dataset.ts
│   │   └── visualization.ts
│   └── main.tsx
├── scripts/
│   └── prepare-data.ts
├── AGENTS.md
├── ATTRIBUTION.md
├── DATA_SOURCES.md
├── package.json
└── vite.config.ts
```

## Core components

### `AppShell`

Owns full-page layout.

Responsibilities:

- Header
- main visualization container
- footer attribution
- global background

### `BibleNetworkCanvas`

Owns canvas lifecycle and rendering orchestration.

Props:

```ts
type BibleNetworkCanvasProps = {
  books: BibleBook[];
  verseIndex: VerseIndex;
  links: CrossReferenceTuple[];
  verseText: VerseTextMap;
  filters: VisualizationFilters;
  onActiveLinkChange: (link: ActiveLink | null) => void;
};
```

### `ReferenceCard`

Displays the selected/hovered relationship.

Props:

```ts
type ReferenceCardProps = {
  activeLink: ActiveLink | null;
  pointer: { x: number; y: number } | null;
  mode: 'hover' | 'selected';
};
```

### `Legend`

Explains line colors.

### `FilterPanel`

Optional in MVP, useful in v1.

## Hooks

### `useDataset`

Loads static JSON files.

Return shape:

```ts
{
  status: 'loading' | 'ready' | 'error';
  books: BibleBook[];
  verseIndex: VerseIndex;
  links: CrossReferenceTuple[];
  verseText: VerseTextMap;
  error?: Error;
}
```

### `useCanvasSize`

Uses `ResizeObserver` to provide container bounds and DPR.

### `usePointerRaf`

Throttles pointer events to animation frames.

## Type safety

All external data must be validated before rendering.

Do not assume JSON files are valid.


---

# Implementation Roadmap

## Phase 0: Repository setup

Tasks:

- Create Vite React TypeScript app.
- Install Tailwind CSS.
- Install D3 and Framer Motion.
- Configure ESLint/Prettier if desired.
- Add GitHub Pages deployment workflow.

Deliverable:

- Blank dark page with title and footer.

## Phase 1: Static sample visualization

Tasks:

- Create a small sample dataset with 20–50 cross references.
- Add complete 66-book metadata.
- Implement verse offset projection.
- Render axis and sample arcs.

Deliverable:

- A working visual prototype with no hover.

## Phase 2: Hover and overlay

Tasks:

- Implement Bezier point sampling.
- Build quadtree hit testing.
- Add active link glow.
- Add ReferenceCard.
- Add viewport collision handling.

Deliverable:

- Hovering a curve reveals source and target verse card.

## Phase 3: Dataset pipeline

Tasks:

- Build `scripts/prepare-data.ts`.
- Normalize raw cross-reference input.
- Validate book/chapter/verse references.
- Emit compact matrix JSON.
- Emit data report.

Deliverable:

- Production-style data files loaded by the app.

## Phase 4: Performance optimization

Tasks:

- Split background and interaction canvas if needed.
- Avoid full redraw on pointer movement.
- Memoize computed geometry.
- Add filter-aware quadtree rebuild.
- Add performance debug overlay behind a dev flag.

Deliverable:

- Smooth interaction with a large dataset.

## Phase 5: UI polish

Tasks:

- Add legend.
- Add statistics strip.
- Add filter panel.
- Add mobile bottom sheet behavior.
- Add reduced-motion support.
- Add attribution footer.

Deliverable:

- Presentable public beta.

## Phase 6: Release readiness

Tasks:

- Add README.
- Add screenshots/GIF.
- Add attribution and data source documentation.
- Confirm licenses.
- Deploy to GitHub Pages.
- Create v0.1.0 release tag.

Deliverable:

- Public GitHub repository and live demo.

## Suggested issue breakdown

1. `chore: scaffold Vite React TypeScript app`
2. `feat: add 66-book metadata and verse projection`
3. `feat: render Bible axis on canvas`
4. `feat: render cross-reference arcs from sample data`
5. `feat: implement quadtree hover detection`
6. `feat: add reference overlay card`
7. `feat: add dataset preprocessing script`
8. `perf: split static and interaction canvas layers`
9. `feat: add filters and legend`
10. `docs: add attribution and data source notes`
11. `ci: deploy to GitHub Pages`


---

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


---

# GitHub Deployment Guide

## Repository name suggestions

Recommended:

```txt
scriptureflux
```

Alternatives:

```txt
bible-cross-reference-map
scripture-network-visualizer
crossref-scripture-map
```

## Initial repository setup

```bash
npm create vite@latest scriptureflux -- --template react-ts
cd scriptureflux
npm install
npm install d3 framer-motion
npm install -D tailwindcss @tailwindcss/vite
```

Follow the current Tailwind + Vite setup instructions for the installed Tailwind version.

## Suggested package scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "prepare:data": "tsx scripts/prepare-data.ts"
  }
}
```

## GitHub Pages deployment

Create:

```txt
.github/workflows/deploy.yml
```

Suggested workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

## Vite base path

If deploying to:

```txt
https://USERNAME.github.io/scriptureflux/
```

configure:

```ts
// vite.config.ts
export default defineConfig({
  base: '/scriptureflux/',
  plugins: [react()]
});
```

If deploying to a custom domain or user root page, use:

```ts
base: '/'
```

## Documentation files

Add:

```txt
README.md
DATA_SOURCES.md
ATTRIBUTION.md
LICENSE
```

## README outline

```md
# ScriptureFlux

A modern Bible cross-reference visualization.

## Features

## Demo

## Data sources

## Local development

## Build

## Deployment

## License and attribution
```

## Release process

1. Confirm dataset license.
2. Confirm Bible text license.
3. Run build.
4. Deploy to GitHub Pages.
5. Tag release:

```bash
git tag v0.1.0
git push origin v0.1.0
```


---

# Agent Prompts

## Prompt 1: Initial scaffold

```txt
이 저장소의 AGENTS.md와 01~11번 설계 문서를 정독해줘.
Vite + React + TypeScript + Tailwind 기반으로 ScriptureFlux 앱을 구현해줘.

1차 목표는 다음이야:
- 66권 성경 축 렌더링
- 샘플 교차참조 데이터 렌더링
- Canvas 기반 Bezier 곡선 렌더링
- 기본 Header/Footer/Attribution
- npm run dev / npm run build 성공

SVG로 수천 개 path를 만들지 말고 Canvas를 사용해줘.
```

## Prompt 2: Hover interaction

```txt
현재 ScriptureFlux 앱에 hover interaction을 구현해줘.

요구사항:
- Bezier curve를 샘플링해서 hit point를 만들 것
- d3-quadtree 또는 동등한 공간 인덱스를 사용할 것
- pointermove는 requestAnimationFrame으로 throttle 할 것
- active link만 glow 처리할 것
- ReferenceCard에 source/target reference와 verse text를 표시할 것
- viewport 밖으로 카드가 나가지 않도록 보정할 것
```

## Prompt 3: Dataset pipeline

```txt
scripts/prepare-data.ts를 만들어줘.

목표:
- raw cross-reference 데이터를 읽고
- book/chapter/verse를 정규화하고
- 66권 book index로 변환하고
- 잘못된 reference를 data-report.json에 기록하고
- compact tuple matrix로 public/data/cross-references.min.json을 출력해줘.

Matrix format:
[sourceBookIndex, sourceChapter, sourceVerse, targetBookIndex, targetChapter, targetVerse, weight]
```

## Prompt 4: Performance pass

```txt
Canvas 성능 최적화를 해줘.

반드시 지킬 것:
- 전체 cross-reference background layer는 pointermove마다 다시 그리지 말 것
- shadowBlur는 active link에만 적용할 것
- ResizeObserver와 cleanup을 정확히 구현할 것
- large dataset 기준으로 geometry memoization 구조를 만들 것
- performance debug flag를 추가해서 link count, hit point count, frame time을 확인할 수 있게 할 것
```

## Prompt 5: Release readiness

```txt
GitHub Pages 배포 가능한 형태로 정리해줘.

작업:
- README.md 작성
- DATA_SOURCES.md 작성
- ATTRIBUTION.md 작성
- .github/workflows/deploy.yml 작성
- vite.config.ts base path 설명 주석 추가
- npm run build 통과 확인
- public demo에서 저작권 문제가 없도록 verse text와 dataset 출처를 명확히 분리해줘
```
