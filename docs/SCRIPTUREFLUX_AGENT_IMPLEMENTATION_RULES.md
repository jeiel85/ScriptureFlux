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
