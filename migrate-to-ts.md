## Migrate computing-site from Vite Vanilla JS to React + TypeScript

This plan converts the current vanilla Vite app to React + TypeScript, mirroring the simple setup in `~/code/lewitt` while keeping concerns independent and avoiding unnecessary dependencies.

### Goals
- **Simplicity**: only add React, TypeScript, and the Vite React plugin.
- **Separation of concerns**: content as values, behavior in components, styles in CSS.
- **Parity**: preserve look/feel, asset paths, and the current dev port 51731.

---

### Phase 1 — Foundation (tooling and scaffolding)
1) Install minimal deps with Bun (align with `lewitt`):
```bash
cd /Users/rob/code/computing-site
bun add react@^19.1.1 react-dom@^19.1.1
bun add -d typescript@~5.8.3 @types/react@^19.1.13 @types/react-dom@^19.1.9 @vitejs/plugin-react@^5.0.2
```

2) Add TS config files (copy from `~/code/lewitt` with minimal edits):
- `tsconfig.json` referencing `tsconfig.app.json` and `tsconfig.node.json`.
- `tsconfig.app.json` with bundler mode, `jsx: react-jsx`, `strict: true`, and `include: ["src"]`.
- `tsconfig.node.json` for Vite config build info.

3) Convert Vite config to TypeScript and add React plugin:
- Replace `vite.config.js` with `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: { allowedHosts: true },
  plugins: [react()],
})
```

4) Update `package.json` scripts (preserve port 51731); execute them with `bun run`:
- `"dev": "vite --port 51731"`
- `"build": "tsc -b && vite build"`
- `"preview": "vite preview"`

5) Create React entry files:
- `src/main.tsx`: mount React to `#root` and import `./index.css`.
- `src/App.tsx`: temporary app shell.
- `src/index.css`: will hold moved global styles from `index.html`.

---

### Phase 2 — HTML → React (declarative UI, same visuals)
1) Update `index.html` body:
- Keep the entire `<head>` as-is (meta, fonts, title, favicon).
- Replace body content with a single `<div id="root"></div>`.
- Remove inline `<style>` and `<script>` tags.

2) Move styles:
- Copy the entire `<style>` block from `index.html` into `src/index.css` unchanged.
- Import `src/index.css` in `src/main.tsx`.

3) Port markup to React:
- Move the current body HTML into `src/App.tsx` as JSX.
- Fix asset paths: use `/res/...` for all images (standardize the two hero images currently using `/public/res/...` to `/res/...`).

4) Replace inline script (hero crossfade) with a component:
- Create `src/components/Hero.tsx` rendering the three images.
- Use `useEffect` with `setInterval(7000)` to toggle the `active` class; cleanup on unmount.
- Optionally define the image list as a value array (e.g., `src/data/heroImages.ts`) to keep data separate from behavior.

5) Scrolling strip:
- Create `src/components/ScrollingStrip.tsx` that renders items from a value array `{ src, label }`.
- Reuse existing CSS keyframes; no additional libs needed.

---

### Phase 3 — Assets and paths
- Keep images in `public/res` so they’re served at `/res/...` without code imports.
- If desired later, move specific assets into `src/assets` and import them for type safety (optional, not required for parity).

---

### Phase 4 — Verify and build
```bash
bun run dev
# verify UI matches the current site
bun run build && bun run preview
```

---

### Optional (keep it simple)
- Linting: copy `eslint.config.js` from `~/code/lewitt` if you want consistent rules.
- Content as values: split long prose into arrays/blocks (simple modules) to keep JSX lean; defer Markdown parsers to avoid dependencies.
- Cleanup: remove `src/main.js`, `src/counter.js`, and `src/javascript.svg` once React is in place.

---

### File mapping
- `index.html` → body becomes `<div id="root"></div>`; head unchanged.
- Inline `<style>` → `src/index.css`.
- Inline `<script>` → `src/components/Hero.tsx` effect.
- Page content → `src/App.tsx` (+ small components like `Hero` and `ScrollingStrip`).
- Config parity → `vite.config.ts`, `tsconfig.*` modeled after `~/code/lewitt`.

---

### Checklist
- [ ] Deps installed (React, React DOM, TS, types, plugin-react)
- [ ] `tsconfig.*` added
- [ ] `vite.config.ts` with `server.allowedHosts` and React plugin
- [ ] `src/main.tsx`, `src/App.tsx`, `src/index.css` created
- [ ] `index.html` body → `#root`; styles and script moved
- [ ] Hero logic ported to `Hero.tsx`; scrolling strip to `ScrollingStrip.tsx`
- [ ] Asset paths standardized to `/res/...`
- [ ] Dev parity verified; build and preview succeed

