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
