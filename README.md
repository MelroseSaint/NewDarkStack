<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# DarkStackStudios — NewDarkStack

Minimal, ultra‑dark portfolio app with neon accents. Built with React + Vite + Tailwind, mirroring the “Solo Studio” aesthetic and hero layout.

## Quick Start

- Install: `npm install`
- Dev: `npm run dev`
- Preview: `npm run build && npm run preview`

## Project Structure

- `src/main.tsx` bootstraps React and mounts `App.tsx`
- `public/hero-image.jpg` is the hero image used in the landing section
- `tailwind.config.js` defines neon palette and animations

## Hero Image

- Place your file at `public/hero-image.jpg`
- Component references it via `/hero-image.jpg` to leverage Vite static serving

## Environment

- Optional: set `GEMINI_API_KEY` in `.env.local` if integrating AI features
