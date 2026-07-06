# Humes Ali — The Knight's Tale

Interactive 3D portfolio of **Syed Humes Ali**, Senior Creative Designer & 3D Artist (Dubai).

A scroll-driven WebGL storytelling experience: a dark sentinel knight stands before an
emerald portal while the page scrolls through six chapters — About, Experience,
Selected Works, Skills, Awards and Contact. Inspired by cinematic story sites, themed
around a warrior in the dark.

## Stack

- [Three.js](https://threejs.org/) — procedural 3D scene (knight, portal, embers, fog, bloom)
- [GSAP ScrollTrigger](https://gsap.com/scrolltrigger/) — scroll choreography, pinned horizontal gallery
- [Lenis](https://lenis.darkroom.engineering/) — smooth inertial scrolling
- [Vite](https://vitejs.dev/) — dev server & build

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

`vite.config.js` uses a relative base (`./`), so the `dist/` folder works on any static
host — GitHub Pages, Netlify, Vercel, or a plain web server.

## Editing content

All copy, projects, experience, skills, honors and contact details live in one file:

- **`src/data/content.js`**

Project images are hotlinked from the public Google Drive portfolio folder via
Google's thumbnail CDN (`drive.google.com/thumbnail?id=…`). To swap an image,
replace the Drive file ID; to self-host, drop files into `public/` and change the
URLs to local paths. The linked Drive folder must remain link-shared ("anyone with
the link can view") for images to load.

## Where things live

| Area | File |
| --- | --- |
| 3D scene setup, lights, fog, bloom | `src/scene/World.js` |
| The knight (procedural model + cape wind) | `src/scene/Knight.js` |
| The portal (arch shader + halo) | `src/scene/Portal.js` |
| Ember particles | `src/scene/Particles.js` |
| Scroll → camera/DOM choreography | `src/story.js` |
| DOM population from content data | `src/populate.js` |
| Loader & boot | `src/main.js` |
| Theme & layout | `src/styles/main.css` |
