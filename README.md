# Atmos — Weather Intelligence

A highly art-directed React + TypeScript weather application built around **three genuinely different interface systems**: Modern Minimalism, Liquid Glass, and Spatial UI. This is intentionally more than a weather card: the same live atmosphere is expressed through different visual grammars.

## What is included
- Live Open-Meteo geocoding and forecast data; no backend or API key.
- Current temperature, feels-like, condition, humidity, wind, visibility and pressure.
- 18-hour atmospheric timeline with precipitation probability.
- 7-day forecast with condition, high/low, rain probability and wind.
- Solar/UV section with sunrise, solar noon and sunset presentation.
- Full atmospheric report modal and preferences modal.
- Debounced city search with remote loading state, clear action and result details.
- Celsius/Fahrenheit switching.
- Three visual systems that change component geometry, surfaces and interaction language — not just background colors.
- Lazy Three.js WebGL atmosphere with adaptive pixel ratio and disposal.
- GSAP section choreography plus CSS hover/focus motion.
- Smooth scrolling and reduced-motion fallback.
- Responsive layouts for desktop, tablet and mobile.
- GitHub Actions CI for build/test verification.

## The three UI systems
### Modern Minimalism
Editorial typography, hard grid lines, restrained radius, whitespace, monochrome hierarchy and data-first rows. It treats weather like a premium information publication.

### Liquid Glass
Translucent surfaces, layered blur, soft borders, floating controls, pill-shaped interaction and depth created by overlapping panels. It is intentionally tactile rather than simply applying a gradient.

### Spatial UI
Dark atmospheric canvas, floating objects, depth cues, orbital labels and a WebGL weather object. Cards and controls behave like objects placed in a spatial system rather than flat dashboard tiles.

## Run locally
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

## Architecture
```text
src/
  components/
    WeatherScene.tsx       lazy Three.js WebGL scene
  lib/
    weather.ts             Open-Meteo client + weather helpers
  App.tsx                  dashboard, modals and interaction state
  main.tsx                 React entry
  styles.css               responsive design systems
.github/workflows/ci.yml   build + test CI
```

## WebGL / performance
The Three.js scene is dynamically imported so the 3D dependency is not required for the first application module. Renderer pixel ratio is capped at 1.5, geometry/materials are disposed on teardown, and the animation loop is cancelled on unmount. Vite creates separate `three` and `motion` chunks.

Search requests are debounced, hourly rendering is bounded to the useful near-term window, and CSS is preferred for inexpensive hover/focus states. `prefers-reduced-motion` removes nonessential animation.

## Data
Weather comes directly from Open-Meteo's public geocoding and forecast endpoints. No server, API key or user account is required.
