# du teaser — dynamic motion pass

The finger/press animation was static and mechanical. This pass reworks the
motion in `project/du-teaser-scene.jsx` (all driven off `useScene()` progress,
so it stays time-stretchable and frame-exact for export, with a seamless loop).

## What changed

**Finger press (real physics)**
- Decelerated *reach* on approach (ease-in-out: gathers → accelerates → softens
  into the glass) instead of a linear rise.
- Depth cue — the finger scales up slightly as it comes toward camera.
- Contact: razor impact spike + sustained pad compression while held, plus a
  damped soft-tissue *settle bounce* right after touch.
- Loose, uncurling *withdrawal* on its own arc (rotation + skew) rather than a
  straight drop.
- Continuous joint-flex / tremor micro-life on integer harmonics (loop-seamless).

**Glass cards (now alive)**
- Each side card floats on its own axis — vertical bob, lateral drift, depth
  (`translateZ`) and 3D tilt (`rotateX/rotateY`), staggered in phase so they
  never move in lockstep.
- Ignition *recoil*: the instant the button lights, the side cards get a quick
  outward shove + scale dip that settles back — a shockwave reaction.
- Rim-light flash: the cards catch the button's ignition color, then fade.
- Center card floats, pushes in on press, and *pops* slightly on ignite.

**Glow ignition (caused by the touch)**
- Expanding *shock ring* radiates from the touch point on impact.
- Stronger bloom, confident pulse, neon edge-sweep on ignite.

**New tweaks** (in the Tweaks panel): *Motion intensity* and *Float amount*
sliders, alongside the existing Glow strength / Pulse speed.

## Optional next step — photoreal AI video (Higgsfield)

For a fully photoreal result, the static composite
`project/uploads/du teaser-Static 1@2x.png` is the ideal seed frame for a
Higgsfield image-to-video generation (finger press + glow ignition + floating
cards). That step needs Higgsfield credits (≈7.5+); it was not run in this pass
due to insufficient credits on the connected account. Once a credited account is
connected in a fresh session, generate the clip and drop it in as a
`VideoSprite` (see the video contract in `project/animations-v2.jsx`).
