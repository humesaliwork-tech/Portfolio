# Ignyte Design System

## Company & product context

**Ignyte** (Ignyte Assurance Platform™) is a cybersecurity **GRC (Governance,
Risk & Compliance) automation SaaS**, founded 2012, HQ Miamisburg, Ohio, led by
former US Air Force/Navy security & compliance officers. Its AI-enabled
platform helps organizations achieve and maintain certifications — **CMMC
2.0, FedRAMP, ISO 27001, HITRUST, SOC 2** — by automating evidence collection,
cross-mapping controls between frameworks, and producing near-real-time audit
dashboards. Customers span Defense Industrial Base contractors, healthcare,
banking, and technology companies; the product itself is a former internal
tool for the founder's compliance consultancy, now a full-stack cloud
application. (Public web presence: `ignyteplatform.com`.)

**Sources used to build this system:**
- `ignyte.creatingbrandaffinity.com` — the brand's hosted guideline microsite
  (Release 1.0, May 2025): pages `/01-strategy`, `/brand-personality-concept`,
  `/components-brandmark`, `/10-digital-applications`. This is a brand-agency
  template; its "Our Brand" narrative copy (startup-growth-platform framing,
  "The future of business...") reads as **unfinished/generic placeholder
  copy** from the template, inconsistent with Ignyte's actual GRC/compliance
  business found via public research — flagged as a caveat, see below.
- Local folder `MAIN/` — brand artwork export package: brandmark (black/white,
  raster + vector), favicon, sub-brand lockups (**Ignyte Genesis**, **Ignyte
  SOC**), tier/product marks (**Ignyte Quadra**, **Ignyte Starlight**, **Ignyte
  Velocity**), an external badge, and an email signature template. No product
  UI, app codebase, or Figma file was included.
- Uploaded files: brandmark PNGs, favicon SVG, and additional exported
  artboards mirroring the `MAIN/` package.

**Caveat — no product codebase or screens provided.** Only brand/logo assets
and the guideline microsite were available; no app screenshots, Figma link,
or frontend codebase for the actual Ignyte Assurance Platform product was
attached. The `ui_kits/website/` kit is therefore an **original composition**
applying this brand system to a realistic marketing-site structure for
Ignyte's real product category — not a recreation of an existing screen.
Please attach the real product codebase or Figma file to get a faithful
UI kit of the actual application.

## Content fundamentals

**Tone of voice** (from the brand guideline site), four pillars:
- **Clarity** — zero fluff, straight to the point, minimal words, plain
  vocabulary matched to the audience.
- **Intelligent** — knowledgeable; gives the reader the tools/process/info to
  act, not just inspiration.
- **Inspiring** — motivational, "hyper-drive your business," but paired with
  concrete claims (e.g. "ten times faster").
- **Confident** — approachable, talks in the reader's language, not stiff or
  legalistic despite being a compliance product.

**Values:** Agile, Effective, Energetic, Curious.

**Voice in practice:**
- Second person ("you," "your business") over third person; direct address.
- Short declarative sentences; numbers over adjectives ("ten times faster,"
  "months, not years") — specific proof points over vague superlatives.
- No emoji in brand-authored copy (guideline site and lockups are text/type
  only). Social captions in the wild use occasional emoji, but that's
  informal social-media voice, not the core brand voice — **default to no
  emoji** in product/marketing surfaces.
- Headlines lead with the outcome ("Get certified in months, not years"), body
  copy explains the mechanism plainly.

## Visual foundations

- **Color:** the brand is deliberately restrained — "technology greys" doing
  the structural work, with a **single, rare, saturated yellow** ("ignyting")
  as the one accent. Yellow is a spotlight, not a backdrop: it shows up on
  buttons, the brandmark, and small highlights, never as a large fill or a
  gradient background. See `tokens/colors.css`.
- **Gradients:** the *only* gradient in the source material is inside the
  star brandmark itself (yellow → cool silver-grey, diagonal, on the angled
  facets) — a brand signature, not a general UI technique. Do not apply
  gradients to buttons, cards, or page backgrounds.
- **Type:** a bold geometric-grotesque display face for the wordmark and
  headlines (flat terminals, near-circular counters), paired with a plain
  humanist sans for body copy so long compliance copy stays legible. See
  Font substitution note below.
- **Spacing:** generous, airy — hero sections and section padding run
  64–110px, not tight SaaS-dashboard density. 4px base unit.
  See `tokens/spacing.css`.
- **Backgrounds:** flat color fields (white, near-black `#1a1a1c`, or the
  palest grey) — no photography, no full-bleed lifestyle imagery, no
  textures/patterns/noise/grain were present in the source material. The star
  mark itself can sit large and semi-cropped in a dark hero as the sole
  decorative motif.
- **Animation & motion:** no animation was demonstrated in source material.
  Given the "confident, clarity" tone, we specify **short, linear-feeling
  transitions** (120–320ms, standard easing, no bounce/overshoot) for
  interactive states — nothing was found to contradict this, but it is a
  reasoned default, not observed.
- **Hover states:** buttons/cards use a small lift + shadow increase (cards)
  or a deepened yellow (`--ignyte-yellow-700`) for primary-button hover —
  never a lighten-to-white or opacity fade, since the surface is already
  light.
- **Press states:** a subtle `scale(0.97)` on buttons; no color shift beyond
  hover's.
- **Borders & shadows:** thin 1–1.5px cool-grey borders (`--color-border-*`);
  shadows are soft, neutral-grey, low-elevation (`--shadow-sm/md/lg`) — never
  colored/yellow shadows.
- **Corner radii:** restrained — 4–14px on UI chrome (`--radius-sm/md/lg`).
  The brandmark itself is 100% hard-edged parallelograms/diamonds with zero
  rounding; UI components are allowed soft-but-small radii, but avoid large
  pill-shaped buttons/cards (pills are reserved for `Tag` chips only).
- **Cards:** flat white surface, 1px grey border, soft shadow, small radius —
  explicitly **no colored left-border accent** (a pattern this brand does not
  use; the one exception is `Toast`, which borrows a thin tone-colored left
  edge for scannability).
- **Transparency/blur:** used sparingly — a dark scrim (`rgba(26,26,28,0.45)`)
  behind modals, and low-opacity white text/dividers on dark surfaces
  (footer, hero). No frosted-glass/backdrop-blur effects were present in
  source material.
- **Imagery color vibe:** not applicable — no photography was present in any
  source material. If/when real product or lifestyle photography is
  supplied, keep it cool-toned to sit alongside the grey/yellow palette.

## Iconography

No icon font, SVG icon set, or icon usage guidance was present in the brand
materials — the only pictorial elements found are the brandmark family itself
(star/diamond mark, wordmark) and one linework illustration, `Mentor
icon.svg` (a simple two-figure "mentorship" line drawing, copied to
`assets/icons/`). No emoji or unicode-glyph icon usage was observed.
**Recommendation:** since this brand has no defined icon system, pair it with
a neutral, single-weight line icon set — **Lucide** (CDN:
`https://unpkg.com/lucide@latest`) is the closest stylistic match to the
brandmark's clean geometric linework and is used as a placeholder/substitute
in the UI kit above. Flagging this as a substitution — if Ignyte has a house
icon set, please supply it.

## Index

- `styles.css` — root stylesheet entry (imports `tokens/*.css`).
- `tokens/` — `colors.css`, `fonts.css` (self-hosted Faktum `@font-face`),
  `typography.css`, `spacing.css` (spacing + radii + shadow + motion tokens).
- `fonts/` — `Faktum-*.woff2` webfont files (uploaded by user).
- `assets/logo/` — brandmark (wordmark SVG/PNG, black+white), star mark PNG,
  favicon SVG, sub-brand lockups (Genesis, SOC), tier mark (Quadra) variants.
- `assets/icons/` — `mentor-icon.svg` (the one brand illustration found).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand
  groups) shown in the Design System tab.
- `components/` — reusable primitives (standard set authored from scratch;
  no component source was provided):
  - `core/` — **Button, Badge, Tag, Card**
  - `forms/` — **Input, Select, Checkbox, Radio, Switch**
  - `navigation/` — **Tabs**
  - `feedback/` — **Tooltip, Toast**
  - `overlay/` — **Dialog**
- `ui_kits/website/` — marketing homepage kit (Nav, Hero, Frameworks grid,
  dashboard preview, CTA banner, Footer, demo-request Dialog) — see its
  README for the "no source screens" caveat.
- `SKILL.md` — Claude-Code-compatible skill wrapper for this system.

## Typography — fonts

**Faktum** is the real Ignyte display typeface (uploaded by the user),
self-hosted as woff2 via `@font-face` in `tokens/fonts.css`, weights 100–800.
It matches the wordmark's bold geometric-grotesque letterforms exactly and
replaces the earlier Poppins placeholder. Body copy still uses **Inter** from
Google Fonts — no brand body-copy font was supplied, and Inter remains a
reasoned substitute for long-form legibility alongside Faktum's geometric
display forms. If a house body font exists, upload it and we'll self-host it
the same way.
