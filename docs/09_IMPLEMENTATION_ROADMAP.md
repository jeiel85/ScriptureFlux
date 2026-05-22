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
