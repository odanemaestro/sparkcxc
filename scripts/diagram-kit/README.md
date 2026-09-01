# Diagram kit

Done by: Odane Robinson

A small geometry toolkit for building CSEC exam-style SVG diagrams from the
actual given facts (angles, lengths, coordinates) instead of hand-typed,
eyeballed coordinates.

## Why this exists

Every diagram bug found and fixed in `public/cxc2025/*.svg` during this
project's QA pass was the same root cause: coordinates were typed by hand
to *look* roughly right, without actually being derived from - or checked
against - the numbers given in the question. That produced real errors
that were easy to miss visually but simple to catch mathematically:

- Points labelled "on the circumference" that were 30–60% of the way to
  the circle's centre instead of actually on it.
- A "parallelogram" that was really an unequal-sided trapezoid.
- An 18° sector drawn with unequal radii at roughly a 70° angle.
- Text labels sitting directly on top of the very line they were meant to
  describe (e.g. a "15 m" label with the line passing straight through it).
- An angle label floating outside its own angle's wedge.

This toolkit is that same verification process, productized into small,
tested functions, so a new diagram is built *and checked* the same way
from the start.

## Usage

```js
const {
  polarPoint, distance, midpoint, perpendicularOffset,
  angleBisectorPoint, angleBetween, labelOverlapsLine,
} = require("./scripts/diagram-kit");

// 1. Compute points from the given facts, not by eyeballing pixels.
const O = { x: 450, y: 430 };
const P = polarPoint(O, -20, 300); // 20 deg left of vertical, 300px out
const Q = polarPoint(O, 20, 300);

// 2. Verify the geometry actually matches what the diagram claims,
//    BEFORE writing any SVG.
if (Math.abs(distance(O, P) - distance(O, Q)) > 1e-6) {
  throw new Error("OP and OQ should be equal length");
}
if (Math.abs(angleBetween(O, P, Q) - 40) > 1e-6) {
  throw new Error("Angle POQ should be 40 degrees");
}

// 3. Place labels using the offset helpers instead of guessing a position,
//    so they land clear of the lines they're near by construction.
const label = perpendicularOffset(O, P, /* distance */ 30, /* awayFrom */ Q);

// 4. Before shipping, double-check no label ended up back on top of a line.
const overlaps = labelOverlapsLine(
  { text: "15 m", x: label.x, y: label.y, fontSize: 18, anchor: "middle" },
  O, P
);
if (overlaps) throw new Error("Label overlaps its own line - reposition it");
```

See `generate-example.js` for a complete worked example that rebuilds
`jan_q6_cheese.svg` from its three given facts (radius, height, 18°
angle), verifies the geometry, and only then writes the SVG file.

## Functions

| Function | What it's for |
|---|---|
| `polarPoint(origin, angleDeg, length)` | A point at a given compass-style angle (0° = up) and distance from an origin - for placing vertices from "OP = 15m at 20° from vertical" style facts. |
| `distance(a, b)` | Straight-line distance between two points - for verifying two sides are actually equal length. |
| `midpoint(a, b)` | Midpoint of a segment. |
| `perpendicularOffset(a, b, dist, awayFrom)` | A point offset perpendicular to segment a–b, on the side farther from `awayFrom` - for placing a label near a line without landing back on top of it. |
| `angleBisectorPoint(vertex, p1, p2, dist)` | A point on the bisector of the angle at `vertex` between rays toward `p1`/`p2` - for centering an angle label inside its own wedge. |
| `angleBetween(vertex, p1, p2)` | The actual angle (in degrees) at a vertex between two other points - for verifying a drawn angle matches what the question states. |
| `labelOverlapsLine(label, a, b, minGap?)` | Whether a text label's estimated bounding box overlaps a line segment - the check used to catch every "label sitting on a line" bug this session. |

## Running the tests

This lives outside `src/` on purpose (it's a build-time/authoring tool,
not app code), so it isn't picked up by Create React App's Jest config.
Run its tests directly with plain Node:

```bash
node scripts/diagram-kit/index.test.js
```
