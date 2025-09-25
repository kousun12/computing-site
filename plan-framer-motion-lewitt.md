### Framer Motion micro‑canvases in the spirit of Sol LeWitt

Goal: A horizontal strip of small, ambient, looping canvases. Each tile animates subtly. Clicking a tile reveals the instruction text (“the rule”). Keep rules simple, declarative, and composable.

Global display notes
- Minimal ink‑on‑paper palette by default; optional muted primaries variant
- Square tiles, responsive `viewBox`, 16–32s loop with long holds; staggered phases across elements
- Very subtle motion only (opacity, strokeDashoffset, transform, color); no hard cuts, no jitter
- Reduce density where patterns could moiré; prefer 1–2px stroke and generous negative space
- Click: reveal rule text overlay; ESC/blur hides; hover shows title only

Schema (planning only)
- id, title, rule (display text), motion (props to animate), tempo (s), density, palette

Curated tiles (slow, ambient)

1) Arcs from Corners, Phased
- Rule: Divide the square into an n×n grid. In each cell draw one quarter‑circle arc connecting two adjacent sides. The directions cycle ↘ ↗ ↖ ↙ across the grid.
- Motion: Very slow orientation morph through the cycle (24–48s); slight strokeDashoffset “tide”; per‑row delays.

2) Not‑Straight Lines Across the Field
- Rule: Fill the square with lines that are not straight, each connecting one edge to the opposite edge, spaced evenly.
- Motion: Low‑frequency phase shift on control points; alternate rows in gentle counter‑phase; long rests between changes.

3) Lines from Corners to Selected Grid Points
- Rule: From each corner, draw straight lines to a subsampled set of grid intersections (e.g., every other point along the boundary).
- Motion: Opacity and strokeWidth breathe on a long cycle; endpoints drift ≤0.5px on a very slow sine.

4) Nested Squares, Alternating Strokes
- Rule: Draw concentric squares spaced by one grid unit; alternate stroke/blank.
- Motion: Scale oscillation within ±1%; occasional phase flip; subtle rotation within ±0.5° with long easing.

5) Quartered Circles in a Grid
- Rule: Place circles at grid intersections; show one quarter segment per circle such that adjacent quarters complement.
- Motion: Segment startAngle sweeps very slowly; segment length modulates softly via strokeDasharray.

6) Edge‑Origin Arcs
- Rule: From midpoints along each edge, draw arcs to other edge points at fixed intervals.
- Motion: Active origin precesses around the perimeter; prior arcs linger and fade; timing eases in/out.

7) Spiral Stroke
- Rule: Draw a single continuous spiral from center outward until the bounds.
- Motion: StrokeDashoffset traces forward on a long cycle; tiny, infrequent accelerations with generous holds.

8) Alternating Perimeter Trace
- Rule: Draw one line along the outer perimeter; inset by one unit and repeat until filled.
- Motion: A slow tracing head advances; completed paths relax to a faint baseline; long dwell at corners.

9) Concentric Rings with Missing Quadrants
- Rule: Draw concentric circles; remove one quadrant per ring, rotating the missing quadrant each ring.
- Motion: Missing quadrants rotate continuously at different rates; stroke thickness pulses subtly.

10) Slow Orientation Field
- Rule: At each grid cell, draw a short line segment whose angle is a smooth function of (x,y).
- Motion: Global field rotates slowly; no per‑cell shimmer—only the global drift.

11) Breathing Dot Field
- Rule: At each grid intersection place a small dot; keep spacing generous.
- Motion: Dot radius varies with a traveling low‑contrast wave across the grid; amplitude minimal; long cycle.

12) Diagonal Lines with Traveling Opacity Band
- Rule: Draw evenly spaced diagonal lines at 45°. Maintain constant geometry.
- Motion: A soft opacity band sweeps across the field over 20–40s; no sharp edges.

Interaction copy (example overlays)
- “Divide the square into an n×n grid. In each cell draw one quarter‑circle connecting two sides. Directions cycle across the grid.”
- “From each corner draw lines to a sparse set of boundary grid points; keep strokes light so overlaps accumulate softly.”
- “Fill the square with not‑straight lines, each spanning from one edge to the opposite.”

Implementation notes (for later)
- Use SVG + Framer Motion; map rules to pure geometry functions, motion to variants/transitions
- Expose `tempo`, `density`, and `palette` per tile; default loops are seamless and phase‑staggered
- Clicking a tile toggles an overlay panel that contains the exact rule text

