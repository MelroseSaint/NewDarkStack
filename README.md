# DarkStackStudios

Where One Mind Builds Infinite Possibilities.

## Overview
- Single‑page app built with `React` + `Vite` and styled with `TailwindCSS`.
- Neon aesthetic with animated background and hero section.
- Maintained by ObscuraCode (@SaintLabs).

## Quick Start
- Prerequisites: `Node >= 18`
- Install: `npm install`
- Develop: `npm run dev` (starts on `http://localhost:3000`)
- Build: `npm run build`
- Preview build: `npm run preview`

## Project Structure
- `index.html` entry document
- `src/App.jsx` main UI (hero, about, navbar, animations)
- `src/main.jsx` bootstraps React
- `src/index.css` Tailwind layers and custom styles
- `public/hero-image.jpg` hero image asset
- `tailwind.config.js`, `postcss.config.js`, `vite.config.js` tooling
- `vercel.json` deployment config

## Hero Image
- Place the image at `public/hero-image.jpg`
- The element source is defined in `src/App.jsx:307`
- Fallback text appears if the file is missing

## Scripts
- `npm run dev` start local dev server
- `npm run build` production build to `dist`
- `npm run preview` serve the built `dist`

## Git Workflow
- Default branch: `main`
- Feature branches for changes: `feature/<short-description>`
- Example:
  - `git checkout -b feature/hero-image-under-hero`
  - `git add -A && git commit -m "feat(hero): add hero image under hero"`
  - `git push -u origin feature/hero-image-under-hero`
  - Open a PR into `main`

## Authenticate To Push
- Credential Manager (recommended on Windows):
  - `git config --global credential.helper manager-core`
  - Push and paste a fine‑grained PAT (Contents: Read & write)
- GitHub CLI:
  - `gh auth login --web --scopes repo`
- SSH:
  - Add your `id_ed25519.pub` to GitHub, use `git@github.com:MelroseSaint/DarkStackStudios.git`

## Troubleshooting
- Non‑fast‑forward push rejected:
  - `git fetch origin`
  - `git rebase origin/main`
  - Resolve conflicts → `git add -A` → `git rebase --continue`
  - `git push -u origin main`
- Prefer a safe force only if replacing history is intentional:
  - `git push -u origin main --force-with-lease`

## Deployment
- Deployed on Vercel
- Build output: `dist`
- Ensure environment variables (if any) are configured in Vercel

## Session Changelog
- Added hero image block under hero in `src/App.jsx:307`
- Introduced feature branch `feature/hero-image-under-hero`
- Documented secure push methods (Credential Manager, CLI, SSH)
- Added troubleshooting for non‑fast‑forward errors
