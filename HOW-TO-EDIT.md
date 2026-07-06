# How to edit your portfolio (no coding experience needed)

The site **redeploys itself automatically** every time you change a file on
GitHub. You do not need to install anything: open a file on github.com, click
the ✏️ pencil icon, edit, press **Commit changes** — about a minute later the
live site is updated at https://humesaliwork-tech.github.io/Portfolio/

> If a change breaks the site, open the repo's **Actions** tab — a red ✗ on
> "Deploy to GitHub Pages" means a typo in your edit (usually a missing comma
> or quote). Click it to see the error line, or just undo your last commit
> (three-dot menu on the commit → Revert).

---

## 1. Everything you'd normally edit is in ONE file

**`src/data/content.js`** contains all text and projects:

| What | Where in the file |
| --- | --- |
| Name, title, phone, email, LinkedIn, bio | `profile` |
| Chapter names (The Calling, The Arsenal…) | `chapters` |
| Work experience entries | `experience` |
| Featured projects (the big gallery) | `projects` |
| Complete-works grid (small tiles) | `archive` |
| Skills & software pills | `arsenal` |
| Awards | `honors` |
| Education | `education` |

### Add a featured project

Copy an existing block inside `projects = [ ... ]` and edit it:

```js
{
  title: 'My New Project',
  drive: driveFolder('DRIVE_FOLDER_ID'),      // "Full folder" button
  category: 'Brand Identity',
  year: '2026',
  description: 'One or two sentences about it.',
  images: [
    driveImg('DRIVE_IMAGE_FILE_ID'),          // first image = card cover
    driveImg('ANOTHER_IMAGE_FILE_ID'),
  ],
},
```

- **DRIVE_FOLDER_ID** — open the folder in Google Drive, copy the part of the
  URL after `/folders/`.
- **DRIVE_IMAGE_FILE_ID** — open the image in Drive, copy the part of the URL
  after `/file/d/` and before `/view`.
- The folder must be link-shared: right-click → Share → "Anyone with the link".
- Order in the list = order in the gallery. Move blocks around to re-rank.
- To use an image that is NOT on Drive: upload it to `public/img/` in this
  repo, then write `'img/my-picture.jpg'` instead of `driveImg(...)`.

### Add a tile to the complete-works grid

Same idea, inside `archive = [ ... ]`:

```js
{ name: 'New Client', category: 'Campaign Design',
  drive: driveFolder('FOLDER_ID'), thumb: driveImg('IMAGE_ID', 400) },
```

`thumb` is optional — without it the tile shows the first letter.

---

## 2. Fonts

Three fonts are defined in **`src/styles/main.css`** (top of the file):

```css
--font-display: 'Syne', ...;            /* big headings   */
--font-serif:  'Cormorant Garamond'...; /* italic accents */
--font-ui:     'Space Grotesk', ...;    /* labels & body  */
```

To switch to another Google Font (e.g. "Sora"):
1. In **`package.json`**, under `dependencies`, add `"@fontsource/sora": "^5.0.0"`.
2. In **`src/main.js`**, add `import '@fontsource/sora/700.css';` next to the
   other font imports (one line per weight you need).
3. In **`src/styles/main.css`**, change the variable: `--font-display: 'Sora', ...`.

Browse available fonts at https://fontsource.org (every Google Font is there).

## 3. Colors

Also at the top of `src/styles/main.css`:

```css
--ink:   #030807;   /* page background          */
--bone:  #e8f5ee;   /* text                     */
--ember: #37ffa8;   /* the green accent         */
```

Change `--ember` (and `--ember-deep`, `--ember-glow`) to re-theme the accent.

## 4. The knight artwork

The four images live in **`public/img/`** as `knight-1.jpg` … `knight-4.jpg`
(1 full-body front · 2 full-body close · 3 helmet · 4 wide side view).
Replace a file with a same-style image to change the scene. Wide 16:9,
2000px+, deep blacks work best.

## 5. Which artwork/crop each chapter uses

In **`src/story.js`** find the `scenes` table — one line per chapter:

```js
{ img: 3, scale: 1.14, ox: 0.02, oy: 0.02, dim: 1.0 },  // calling
```

`img` = which artwork (0–3) · `scale` = zoom · `ox/oy` = pan · `dim` = brightness.

## 6. Working on your own computer (optional)

Only needed for bigger changes. Install [Node.js](https://nodejs.org), then:

```bash
git clone https://github.com/humesaliwork-tech/Portfolio.git
cd Portfolio
npm install
npm run dev        # live preview at http://localhost:5173
```

Push your commits and the site deploys automatically.

## 7. Fixing bugs later

Any AI coding assistant (Claude, ChatGPT, Copilot…) can maintain this repo —
it is a standard Vite + Three.js + GSAP project. Point it at this file and
`README.md` first; the code is small and heavily commented.
