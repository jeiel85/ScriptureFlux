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
