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
