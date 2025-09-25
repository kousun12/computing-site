### Framer Motion micro‑canvases in the spirit of Sol LeWitt

Goal: A horizontal strip of small, ambient, looping canvases. Each tile animates subtly. Clicking a tile reveals the instruction text (“the rule”). Keep rules simple, declarative, and composable.

Global display notes
- Minimal ink‑on‑paper palette by default; optional muted primaries variant
- Square tiles, responsive `viewBox`, 8–16s loop, staggered phases across elements
- Subtle motion only (opacity, strokeDashoffset, transform, color); no hard cuts
- Click: reveal rule text overlay; ESC/blur hides; hover shows title only

Schema (planning only)
- id, title, rule (display text), motion (props to animate), tempo (s), density, palette

Tiles (rule statements + motion notes)

1) Arcs from Corners, Phased
- Rule: Divide the square into an n×n grid. In each cell draw one quarter‑circle arc connecting two adjacent sides. The directions cycle ↘ ↗ ↖ ↙ across the grid.
- Motion: Arc directions rotate through the cycle; strokeDashoffset breathes; per‑row phase offsets.

2) Lines from Corners to Grid Points
- Rule: From each corner, draw straight lines to every grid intersection. Use low opacity so overlaps accumulate.
- Motion: Opacity and strokeWidth gently pulse; endpoints drift ±1px on a slow sine to “breathe.”

3) Not‑Straight Lines Across the Field
- Rule: Fill the square with lines that are not straight, each connecting one edge to the opposite edge, spaced evenly.
- Motion: Apply a low‑frequency phase shift to control points; alternate rows counter‑phase; occasional tiny pause.

4) Four Directional Bands
- Rule: Create four sets of parallel lines (↑ → ↓ ←). Tiles show one set at a time or in combinations.
- Motion: Crossfade between orientation sets; strokeDashoffset slowly translates lines along their direction.

5) Center Spokes
- Rule: From the center, draw lines to every grid intersection along the boundary.
- Motion: Spokes reveal in a rotating wipe; opacity decays with angle distance from the leading edge.

6) Nested Squares, Alternating Strokes
- Rule: Draw concentric squares spaced by one grid unit; alternate stroke/blank.
- Motion: Scale oscillation ±1%; stroke phase flips every few seconds; subtle rotation ±1° with easing.

7) Checkerboard Diagonals
- Rule: On a checkerboard of cells, draw ↘ in dark cells and ↗ in light cells.
- Motion: Swap diagonal orientation across the entire board in a smooth crossfade; stagger by rows.

8) Quartered Circles in a Grid
- Rule: Place circles at grid intersections; show quarter segments such that adjacent quarters complement.
- Motion: Segment startAngle sweeps continuously; segments grow/shrink via strokeDasharray animation.

9) Edge‑Origin Arcs
- Rule: From midpoints along each edge, draw arcs to other edge points at fixed intervals.
- Motion: Active origin sweeps around the perimeter; previous arcs fade; timing eases in/out.

10) Orthogonal Crosshatch
- Rule: Draw evenly spaced horizontal lines, then evenly spaced vertical lines over them.
- Motion: Alternate which orientation is prominent via opacity; tiny vertical/horizontal drift (±0.5px) to avoid stasis.

11) Rotating Orientation Field
- Rule: At each grid cell, draw a short line segment whose angle is a function of its (x,y) position.
- Motion: Globally rotate the field slowly; per‑cell angle also modulates with a 2D sine for shimmering.

12) Spiral Stroke
- Rule: Draw a single continuous spiral from center outward until the bounds.
- Motion: StrokeDashoffset animates forward slowly; periodic micro‑accelerations (easeInOut) then rest.

13) Alternating Perimeter Walk
- Rule: Draw one line along the perimeter, then inset by one unit and repeat until filled.
- Motion: A tracing light follows the current perimeter path; previously traced lines fade to baseline.

14) Rays Between Side Midpoints
- Rule: From the midpoints of opposing sides, draw rays to all grid intersections along the opposite side.
- Motion: Swap active side pair every loop; rays ripple in groups with short delays.

15) Diamonds from Grid Centers
- Rule: At each grid cell center, draw a diamond sized to the cell. Alternate fill/stroke in a checker pattern.
- Motion: Diamonds gently scale and rotate ±2° out of phase by row; fill opacity breathes.

16) Random Choice of Two Rules Per Cell
- Rule: For each cell, choose between rule A (↘ diagonal) and rule B (quarter arc ↗) using a fixed seed.
- Motion: Seed remains fixed; a slow “swap pass” moves across the grid flipping choices in its wake, then reverses.

17) Concentric Rings with Missing Quadrants
- Rule: Draw concentric circles; remove one quadrant per ring, rotating the missing quadrant each ring.
- Motion: Missing quadrant rotates continuously; thickness pulses slightly with the beat.

18) Offset Lattice
- Rule: Draw vertical lines; every other row is offset by half a cell (like brickwork). Add short connectors.
- Motion: Offset slides from 0 to 0.5 cell and back; connectors appear/disappear at turning points.

19) Center Squares with Radiating Gaps
- Rule: Arrange nested squares; remove one side per square cycling through N,E,S,W.
- Motion: The missing side travels around the shape; gaps glow (opacity up) just before the side returns.

20) Two‑Tone Partition Panels
- Rule: Partition the tile into four panels; each panel shows one family (arcs from corners, arcs from sides, lines to corners, lines to sides).
- Motion: Panels crossfade focus one by one; non‑focused panels dim to 40%.

Interaction copy (example overlays)
- “Divide the square into an n×n grid. In each cell draw one quarter‑circle connecting two sides. Directions cycle across the grid.”
- “From each corner draw lines to every grid point. Use light strokes so overlaps accumulate.”
- “Fill the square with not‑straight lines, each spanning from one edge to the opposite.”

Implementation notes (for later)
- Use SVG + Framer Motion; map rules to pure geometry functions, motion to variants/transitions
- Expose `tempo`, `density`, and `palette` per tile; default loops are seamless and phase‑staggered
- Clicking a tile toggles an overlay panel that contains the exact rule text

