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

## The knight keyart (important)

The 3D stage projects four knight artworks onto WebGL planes with a
depth-parallax shader. **Add your artwork files here:**

```
public/img/knight-1.jpg   — full-body front, portal centered   (hero / gallery / finale)
public/img/knight-2.jpg   — full-body close-up                 (skills chapter)
public/img/knight-3.jpg   — helmet close-up                    (awards chapter)
public/img/knight-4.jpg   — wide side view, knight at right    (about / experience)
```

Wide images (~16:9, ≥2000px) with deep blacks work best. Until a file exists,
the site falls back to AI-generated stand-in art hosted on a CDN
(`FALLBACK` in `src/main.js`).

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
| Renderer, fog sprites, bloom | `src/scene/World.js` |
| Keyart stage (depth-parallax planes, crossfades, flare) | `src/scene/Keyart.js` |
| Ember particles | `src/scene/Particles.js` |
| Scroll → scene/DOM choreography | `src/story.js` |
| DOM population from content data | `src/populate.js` |
| Loader & boot | `src/main.js` |
| Theme & typography | `src/styles/main.css` |
