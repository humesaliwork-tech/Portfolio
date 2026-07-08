# Syed Humes Ali — Portfolio

> **Editing the site yourself?** Read **[HOW-TO-EDIT.md](HOW-TO-EDIT.md)** —
> plain-English instructions for changing text, projects, fonts and colors
> straight from github.com (auto-deploys on every commit).

The portfolio of **Syed Humes Ali**, Senior Creative Designer & 3D Artist (Dubai).

A modern, editorial, typography-led single-page site — stark black-&-white palette, a calligraphy-meets-grotesk type system
(Instrument Serif italic + Bricolage Grotesque + Inter), a framed layout, custom
cursor, smooth inertial scrolling, and an interactive **3D sword that doubles as
a digital pen** (Three.js) floating in the hero — it rotates, tilts to the
pointer and drifts on scroll. Work-first project list with hover previews and a
slide-in detail panel. Tabbed navigation (Index / Work / Studio / Contact) with cinematic wipe
transitions between views. Design direction inspired by lml.cc.

## Stack

- [GSAP + ScrollTrigger](https://gsap.com/) — reveals, marquee, scroll triggers
- [Lenis](https://lenis.darkroom.engineering/) — smooth inertial scrolling
- [Vite](https://vitejs.dev/) — dev server & build
- Plain HTML / CSS / JS — no framework

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & deploy

```bash
npm run build      # outputs static site to dist/
npm run preview    # serve the build locally
```

`vite.config.js` uses a relative base (`./`), so `dist/` works on any static
host — GitHub Pages (already wired via `.github/workflows/deploy.yml`),
Netlify, Vercel, or a plain web server.

## Editing content

All copy, projects, experience, skills, awards and contact details live in
one file: **`src/data/content.js`**. See [HOW-TO-EDIT.md](HOW-TO-EDIT.md).

Project images are hotlinked from the public Google Drive portfolio folder via
Google's thumbnail CDN (`drive.google.com/thumbnail?id=…`). The linked Drive
folders must remain link-shared ("anyone with the link can view").

## Where things live

| Area | File |
| --- | --- |
| All content / projects / text | `src/data/content.js` |
| Page structure | `index.html` |
| Theme, layout, typography | `src/styles/main.css` |
| The 3D sword / digital-pen hero | `src/hero3d.js` |
| Build page from data + project detail panel | `src/populate.js` |
| Smooth scroll, custom cursor, reveals, hover previews | `src/interactions.js` |
| Loader & startup | `src/main.js` |
