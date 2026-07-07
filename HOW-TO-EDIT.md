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
| Work experience entries | `experience` |
| Featured projects (the Selected Work list) | `projects` |
| Complete archive (small tiles) | `archive` |
| Skills & software | `arsenal` |
| Awards | `honors` |
| Education | `education` |

### Change a project's cover photo or add more images

Each project has an `images` list. The **first** image is the cover /
hover preview; the rest show inside the project's detail panel.

```js
{
  title: 'DIFC Ignyte',
  category: 'Brand & Event Design',
  year: '2024–26',
  drive: driveFolder('DRIVE_FOLDER_ID'),   // "Full folder on Drive" button
  video: driveFolder('DRIVE_FOLDER_ID'),   // optional "Watch motion & video" button
  description: 'One or two sentences.',
  images: [
    driveImg('FIRST_IMAGE_ID'),   // ← FIRST = the cover / hover preview
    driveImg('SECOND_IMAGE_ID'),  // ← add as many lines as you like
    driveImg('THIRD_IMAGE_ID'),
  ],
},
```

- **Change the cover** → move a different `driveImg(...)` line to the top,
  or replace the first ID.
- **Add images** → add more `driveImg('IMAGE_ID'),` lines.
- **IMAGE_ID** → open the image in Google Drive; the URL is
  `drive.google.com/file/d/`**`THIS_PART`**`/view`. Copy the middle part.
- **FOLDER_ID** → the part after `/folders/` in a Drive folder URL.
- The Drive folder must be link-shared: right-click → Share → "Anyone with the link".
- Order in the `projects` list = order on the site. Move blocks to re-rank.
- To use a non-Drive image: upload it to `public/img/` in this repo and write
  `'img/my-picture.jpg'` instead of `driveImg(...)`.

### Add a project

Copy a whole `{ … }` block inside `projects = [ … ]` and edit its fields.

### Add an archive tile

Same idea inside `archive = [ … ]`:

```js
{ name: 'New Client', category: 'Campaign Design',
  drive: driveFolder('FOLDER_ID'), thumb: driveImg('IMAGE_ID', 400) },
```

`thumb` is optional — without it the tile shows the first letter.

---

## 2. Fonts

Two fonts, defined at the top of **`src/styles/main.css`**:

```css
--font-display: 'Bricolage Grotesque Variable', ...;  /* headings, big type */
--font-ui: 'Inter', ...;                              /* body, labels */
```

To switch to another Google Font (e.g. "Space Grotesk"):
1. In **`package.json`** → `dependencies`, add `"@fontsource-variable/space-grotesk": "^5.0.0"`
   (or `@fontsource/space-grotesk` for a non-variable font).
2. In **`src/main.js`**, add `import '@fontsource-variable/space-grotesk';`
   next to the other font imports.
3. In **`src/styles/main.css`**, change the variable:
   `--font-display: 'Space Grotesk Variable', sans-serif;`

Browse fonts at https://fontsource.org (every Google Font is there).

## 3. Colors

Also at the top of `src/styles/main.css`:

```css
--paper: #ece9e2;   /* warm background      */
--ink:   #17150f;   /* near-black text      */
--accent: #cc4a1f;  /* the rust accent      */
--muted: #6f6b62;   /* secondary grey text  */
```

Change `--accent` to re-theme the highlight color everywhere (links, hovers,
the "available" dot, index numbers). Change `--paper` + `--ink` together if
you want a different base (e.g. a dark theme: swap them).

## 4. The little details

- **"Available for work" status** — the header line; edit the text in
  `index.html` (search for `Available for work`).
- **Marquee words** (the scrolling ribbon under the hero) — edit the `words`
  array near the top of `src/populate.js`.
- **Hero tagline / lede** — in `index.html` (the `.hero` section).

## 5. Working on your own computer (optional)

Only needed for bigger changes. Install [Node.js](https://nodejs.org), then:

```bash
git clone https://github.com/humesaliwork-tech/Portfolio.git
cd Portfolio
npm install
npm run dev        # live preview at http://localhost:5173
```

Push your commits and the site deploys automatically.

## 6. Fixing bugs or making bigger changes later

Any AI coding assistant (Claude, ChatGPT, Copilot…) can maintain this repo —
it is a standard Vite + GSAP + Lenis project (plain HTML/CSS/JS, no framework).
Point it at this file and `README.md` first; the code is small and commented.

**Where things live:**

| Area | File |
| --- | --- |
| All content / projects / text | `src/data/content.js` |
| Page structure | `index.html` |
| Theme, layout, typography | `src/styles/main.css` |
| Building the page from data + project panel | `src/populate.js` |
| Smooth scroll, custom cursor, reveals, hover previews | `src/interactions.js` |
| Loader & startup | `src/main.js` |
