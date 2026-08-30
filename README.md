# Atmos — Weather Intelligence

A rebuilt React + TypeScript weather experience focused on **Modern Minimalism, Liquid Glass and Spatial UI** rather than a conventional dashboard.

## Highlights
- Open-Meteo geocoding + forecast APIs; no backend or API key.
- Three switchable visual systems: Minimal, Liquid Glass, Spatial.
- Dark/light mode and Celsius/Fahrenheit preference.
- Lazy-loaded Three.js atmospheric orb with adaptive pixel ratio and disposal.
- GSAP entrance motion, hover depth and responsive transitions.
- Current conditions, 12-hour rhythm and 7-day forecast.
- Search dropdown with debounced remote lookup, loading state and keyboard-friendly native controls.
- Reduced-motion support and semantic controls.
- Vite manual chunks for Three.js/GSAP to keep the initial bundle lean.
- CI workflow with typecheck, tests and production build.

## Setup
```bash
npm install
npm run dev
```

Production:
```bash
npm run build
npm run preview
```

Tests:
```bash
npm test
```

## Structure
```text
src/
  components/    Search, controls, forecast, WebGL scene
  context/       Theme/mode/unit state
  lib/           Open-Meteo API + weather utilities
  types/         Shared TypeScript types
  App.tsx
  main.tsx
  styles.css
```

## WebGL / 3D
The hero visual is a lightweight Three.js scene: an icosahedral weather orb, atmospheric ring and particle field. Its material changes with the weather code. Renderer pixel ratio is capped, the scene is lazy-loaded, and resources/animation frames are disposed during unmount.

## Motion
GSAP handles high-level entrance choreography while CSS handles inexpensive hover/focus states. `prefers-reduced-motion` disables nonessential motion.

## API
Open-Meteo is queried directly from the browser. Weather data is fetched for seven days and the hourly series is reduced to the next twelve hours for the dashboard.
