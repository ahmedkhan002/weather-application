# Atmos — Spatial Weather Intelligence

A production-oriented weather experience built around the idea of a cinematic operating system for understanding the atmosphere. It combines live Open-Meteo data, a GPU-friendly Three.js environment, GSAP motion, an interactive timeline, forecast visualizations, preferences, favorites, geolocation and shareable location routes.

## Stack

Next.js App Router, TypeScript, React, Tailwind CSS v4, Three.js/WebGL, GSAP, Leaflet/React Leaflet, Open-Meteo and Zod, with Vitest tests.

## Architecture

- `app/api/weather/route.ts` — validated server-side weather boundary with ten-minute caching.
- `app/api/geocode/route.ts` — server-side location search boundary with daily revalidation.
- `lib/weather.ts` — provider-independent domain types, validation, transformation and unit conversion.
- `components/WeatherScene.tsx` — dynamically imported Three.js atmospheric scene.
- `components/WeatherMap.tsx` — interactive map surface.
- `app/page.tsx` — client interaction shell: timeline, search, favorites, settings and synchronized visualizations.
- `app/weather/[location]/page.tsx` — shareable routes and dynamic metadata.

## Features

- City/country autocomplete and keyboard-first `Ctrl/Cmd + K` search
- Browser geolocation
- Favorites persisted locally
- Shareable `/weather/[location]` routes
- Celsius/Fahrenheit and km/h/mph/m/s preferences
- Auto/dark/light theme
- 48-hour hourly timeline and 10-day forecast
- Temperature graph and atmospheric metric visualizations
- Wind compass, humidity liquid, UV gauge and pressure rings
- Sunrise/sunset solar arc and moon phase
- Interactive Leaflet map
- Loading, API, geolocation and empty-search states
- Reduced-motion support

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The default Open-Meteo integration requires no API key. `.env.example` documents extension points for a future private provider.

## Production

```bash
npm run build
npm start
```

## Tests

```bash
npm test
```

## Performance

Three.js is dynamically imported, renderer pixel ratio is capped at 1.5, particle counts adapt to the weather state, resources are disposed on teardown, weather requests are cached, and the client uses local state instead of a global state library. Reduced-motion preferences are respected.

## Screenshots

Add deployment screenshots here.
