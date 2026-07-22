/* du teaser — press-to-ignite scene (dynamic motion pass).
   Real photoreal finger (alpha cutout) + official du icon as the lit card face.
   Everything is driven off useScene()'s progress so it time-stretches and
   exports frame-exact. The loop is seamless: the composition at progress 0 and
   progress 1 is the same settled, near-black frame. */
const { useScene, SceneStage, useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakSlider } = window;

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (x) => { x = clamp01(x); return x * x * (3 - 2 * x); };       // smoothstep
const smoother = (x) => { x = clamp01(x); return x * x * x * (x * (x * 6 - 15) + 10); }; // smootherstep
const seg = (p, a, b) => smooth((p - a) / (b - a));
const easeOut = (x) => 1 - Math.pow(1 - clamp01(x), 3);
const easeIn = (x) => Math.pow(clamp01(x), 3);
const easeInOut = (x) => { x = clamp01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const easeOutBack = (x) => { x = clamp01(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, t) => a + (b - a) * t;
// A clean unit impulse: 0 → rises fast → decays slow. `rise`/`fall` in progress units.
const impulse = (t, rise, fall) => (t <= 0 ? 0 : (1 - Math.exp(-t / rise)) * Math.exp(-t / fall));

// Stage 1080 x 1350
const CENTER = { left: 340, top: 372, w: 400, h: 400, r: 78 };
const LEFT = { left: 74, top: 424, w: 250, h: 340, r: 48 };
const RIGHT = { left: 756, top: 424, w: 250, h: 340, r: 48 };

const FINGER_W = 700;
const FINGER_H = FINGER_W / 0.8688;
const TIP_X = 0.5028 * FINGER_W;
const TIP_Y = 0;
const TOUCH = { x: 540, y: 625 };

const TAU = Math.PI * 2;

function GlassCard({ box, dim, reveal, flash = 0 }) {
  return (
    <div style={{
      position: 'absolute', left: box.left, top: box.top, width: box.w, height: box.h,
      borderRadius: box.r,
      background: 'linear-gradient(157deg,#3c3e46 0%,#282a31 38%,#15161b 72%,#0b0c10 100%)',
      border: '1px solid rgba(255,255,255,0.16)',
      boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -22px 44px rgba(0,0,0,0.55), 0 30px 72px rgba(0,0,0,0.85)',
      opacity: (dim ? 0.82 : 1) * reveal,
      overflow: 'hidden',
    }}>
      {/* strong glossy diagonal streak on the left */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(118deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.09) 14%, rgba(255,255,255,0) 34%)',
        pointerEvents: 'none',
      }} />
      {/* faint reflection on the right edge */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(300deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 22%)',
        pointerEvents: 'none',
      }} />
      {/* cool rim-light that catches the button's ignition, then fades */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(200deg, rgba(120,150,255,0.55) 0%, rgba(90,200,235,0.28) 30%, rgba(0,0,0,0) 62%)',
        opacity: 0.7 * flash,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

// A side glass card that floats on its own axis and recoils when the button
// ignites. `phase` staggers the two cards so they never move in lockstep;
// `dir` (-1 left / +1 right) sends the recoil outward.
function FloatingCard({ box, p, phase, dir, shock, glowNear, F, M }) {
  // Continuous idle float — integer harmonics of the loop stay seamless.
  const fy = (Math.sin(p * TAU * 1 + phase) * 9 + Math.sin(p * TAU * 2 + phase * 1.7) * 3) * F;
  const fx = (Math.sin(p * TAU * 1 + phase + 1.2) * 4) * F;
  const z = Math.sin(p * TAU * 1 + phase + 0.6) * 26 * F;           // depth drift
  const rx = Math.sin(p * TAU * 1 + phase + 0.9) * 3.2 * F;          // tilt toward/away
  const ry = (dir * 3 + Math.cos(p * TAU * 1 + phase) * 3.5) * F;    // yaw, biased outward

  // Ignition recoil: a quick outward shove + settle-back the instant the
  // button lights, plus a tiny scale dip. Decays to nothing well before loop end.
  const recoilX = dir * shock * 26 * M;
  const recoilScale = 1 - shock * 0.035 * M;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      transform: `perspective(1400px) translateX(${fx + recoilX}px) translateY(${fy}px) translateZ(${z}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${recoilScale})`,
      transformOrigin: `${box.left + box.w / 2}px ${box.top + box.h / 2}px`,
      willChange: 'transform',
    }}>
      <GlassCard box={box} dim reveal={1} flash={glowNear} />
    </div>
  );
}

function Press() {
  const { progress: p } = useScene();
  const tw = window.__DU || { glow: 1, speed: 1, motion: 1, float: 1 };
  const M = tw.motion != null ? tw.motion : 1;   // overall motion intensity
  const F = tw.float != null ? tw.float : 1;     // idle-float amount

  const CONTACT = 0.33;               // exact frame the fingertip meets the glass
  const relStart = 0.60, relEnd = 0.90;

  // ── Phase 1 — Approach ──────────────────────────────────────────────
  // Rises from below with a controlled, decelerating reach (ease-in-out:
  // gathers, accelerates, then softens into the glass — reads as intent).
  const riseFrac = clamp01((p - 0.04) / (CONTACT - 0.04));
  const reach = easeInOut(riseFrac);
  // Depth: the finger comes *toward* camera as it rises (subtle grow).
  const depth = lerp(0.93, 1.0, easeOut(riseFrac));

  // ── Phase 3 — Release ───────────────────────────────────────────────
  // Slower, looser, uncurling withdrawal down its own arc.
  const wFrac = clamp01((p - relStart) / (relEnd - relStart));
  const withdraw = smoother(wFrac);

  let fy, depthScale;
  if (p < CONTACT) { fy = lerp(860, 0, reach); depthScale = depth; }
  else if (p < relStart) { fy = 0; depthScale = 1.0; }               // Phase 2 — hold
  else { fy = lerp(0, 940, withdraw); depthScale = lerp(1.0, 0.95, withdraw); }

  // ── Contact dynamics ────────────────────────────────────────────────
  // Sharp impact spike + sustained pad compression while held, released loose.
  const dt = p - CONTACT;
  const impact = Math.exp(-Math.pow(dt / 0.014, 2));                 // razor spike at touch
  const pressIn = seg(p, CONTACT, CONTACT + 0.025);
  const pressHold = pressIn * (1 - 0.28 * seg(p, 0.40, relStart));   // eases off slightly during hold
  const press = pressHold * (1 - seg(p, relStart, relStart + 0.14));  // release ramps compression back out
  const squash = clamp01(press * 0.55 + impact * 0.5) * M;

  // Damped landing bounce right after contact (soft-tissue settle).
  let settleY = 0;
  if (p >= CONTACT && p < 0.56) {
    const ts = dt;
    settleY = Math.exp(-ts * 24) * Math.sin(ts * 58) * 9 * M;
  }

  // Lateral arc + wrist tilt + a touch of skew for 3D lean.
  let fx = 0, rot = 0, skew = 0;
  if (p < CONTACT) {
    const s = Math.sin(riseFrac * Math.PI);
    fx = (1 - reach) * 20 * s;
    rot = (1 - reach) * 3.2;
    skew = (1 - reach) * 2.4;
  } else if (p >= relStart) {
    const s = Math.sin(wFrac * Math.PI);
    fx = -withdraw * 16 * s - withdraw * 8;
    rot = -withdraw * 5.0;
    skew = -withdraw * 3.0;
  }

  // Continuous micro-life — joint flex + tremor; integer harmonics stay
  // loop-seamless. Amplitude scales with motion intensity.
  const flex = press * Math.sin(p * TAU * 5 + 0.9) * 0.7;
  const tremorY = (Math.sin(p * TAU * 3) * 0.9 + Math.sin(p * TAU * 7 + 1.1) * 0.4 + flex) * M;
  const tremorX = (Math.sin(p * TAU * 2 + 1.7) * 0.9 + Math.sin(p * TAU * 5 + 0.4) * 0.35) * M;
  const tremorR = (Math.sin(p * TAU * 3 + 0.5) * 0.35 + press * Math.sin(p * TAU * 6) * 0.45) * M;

  const fingerTx = fx + tremorX;
  const fingerTy = fy + settleY + press * 12 + tremorY;
  const fingerRot = rot + tremorR;

  // ── Glow ignition (CAUSED by the touch) ─────────────────────────────
  // Fast attack at contact, full while pressed, settles to a calm charged
  // glow after the hand leaves, then fades to black for the seamless loop.
  const attack = seg(p, CONTACT, CONTACT + 0.055);
  const held = 1 - 0.34 * seg(p, 0.62, 0.82);                       // full → calm ~0.66
  const lit = attack * held * (1 - seg(p, 0.92, 1.0));
  const pulse = 0.5 + 0.5 * Math.sin(p * Math.PI * 2 * 6 * tw.speed);
  const flash = impact * 0.55;
  const glow = clamp01(lit * (0.82 + 0.18 * pulse) + flash * (p >= CONTACT ? 1 : 0)) * tw.glow;

  // Shockwave that radiates from the touch point on impact.
  const shock = impulse(dt, 0.010, 0.11) * M;                        // for card recoil + ring
  const ringT = seg(p, CONTACT, CONTACT + 0.26);
  const ringScale = lerp(0.35, 2.3, easeOut(ringT));
  const ringOpacity = (1 - ringT) * attack * 0.5;

  // Rim-light the side cards catch from the ignition (proximity flash).
  const glowNear = clamp01(glow * 0.9 + shock * 0.6);

  const sweep = seg(p, CONTACT, CONTACT + 0.16);                    // outline sweep ignites on touch
  const faceFill = seg(p, CONTACT + 0.05, CONTACT + 0.20) * lit;

  // Center card bob + press push-in, and a subtle pop the instant it lights.
  const bob = Math.sin(p * TAU * 2) * 3.2 * F + Math.sin(p * TAU * 1 + 0.4) * 4 * F;
  const pop = 1 + 0.035 * impulse(dt, 0.02, 0.14) * M;
  const centerScale = pop * (1 - press * 0.02);
  const cy = CENTER.top + bob + press * 12;

  // Establishing beat: scene emerges from near-black as the finger rises,
  // settles back at the end (seamless loop). A whisper of overall breathing
  // keeps even the quiet frames alive.
  const reveal = 0.16 + 0.84 * seg(p, 0.02, 0.30) * (1 - seg(p, 0.90, 1.0));
  const breathe = 1 + 0.006 * Math.sin(p * TAU * 1) * F;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        transform: `scale(${breathe})`, transformOrigin: '540px 675px',
        willChange: 'transform',
      }}>
        {/* floating side cards */}
        <div style={{ opacity: reveal }}>
          <FloatingCard box={LEFT} p={p} phase={0.0} dir={-1} shock={shock} glowNear={glowNear} F={F} M={M} />
          <FloatingCard box={RIGHT} p={p} phase={Math.PI} dir={+1} shock={shock} glowNear={glowNear} F={F} M={M} />
        </div>

        {/* bloom behind center card */}
        <div style={{
          position: 'absolute',
          left: CENTER.left - 130, top: CENTER.top - 130,
          width: CENTER.w + 260, height: CENTER.h + 260,
          borderRadius: '50%',
          background: 'radial-gradient(closest-side, rgba(124,45,240,.9) 0%, rgba(60,80,225,.66) 40%, rgba(24,190,220,.52) 68%, rgba(24,190,220,0) 100%)',
          filter: 'blur(62px)',
          opacity: (0.12 + 0.88 * glow) * reveal,
          transform: `translateY(${bob + press * 12}px) scale(${1 + 0.09 * glow})`,
          pointerEvents: 'none',
        }} />

        {/* expanding shock ring from the touch point */}
        {ringOpacity > 0.001 && (
          <div style={{
            position: 'absolute',
            left: TOUCH.x - 200, top: TOUCH.y - 200, width: 400, height: 400,
            borderRadius: '50%',
            border: '3px solid rgba(150,180,255,0.9)',
            boxShadow: '0 0 26px rgba(90,140,255,0.7), inset 0 0 26px rgba(60,200,235,0.5)',
            opacity: ringOpacity,
            transform: `scale(${ringScale})`,
            pointerEvents: 'none',
          }} />
        )}

        {/* center card */}
        <div style={{ transform: `translateY(${bob + press * 12}px) scale(${centerScale})`, transformOrigin: `${CENTER.left + CENTER.w / 2}px ${CENTER.top + CENTER.h / 2}px` }}>
          <div style={{ position: 'absolute', left: CENTER.left, top: CENTER.top, width: CENTER.w, height: CENTER.h, borderRadius: CENTER.r, overflow: 'hidden' }}>
            <GlassCard box={{ ...CENTER, left: 0, top: 0 }} reveal={reveal} />
            <img src="assets/du-icon.png" alt="du"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: faceFill }} />
          </div>
        </div>

        {/* perimeter outline: faint at rest, bright neon sweep on ignite */}
        <svg width={CENTER.w + 8} height={CENTER.h + 8}
          style={{ position: 'absolute', left: CENTER.left - 4, top: cy - 4, overflow: 'visible', pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="edge" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#9b1fe6" />
              <stop offset="0.5" stopColor="#4a3ce6" />
              <stop offset="1" stopColor="#1cccea" />
            </linearGradient>
          </defs>
          <rect x="6" y="6" width={CENTER.w - 4} height={CENTER.h - 4} rx={CENTER.r} fill="none"
            stroke="url(#edge)" strokeWidth="2.5" opacity={(0.16 + 0.12 * glow) * reveal} />
          <rect x="6" y="6" width={CENTER.w - 4} height={CENTER.h - 4} rx={CENTER.r} fill="none"
            stroke="url(#edge)" strokeWidth="5" strokeLinecap="round"
            pathLength="100" strokeDasharray="100" strokeDashoffset={100 * (1 - sweep)}
            opacity={glow}
            style={{ filter: `drop-shadow(0 0 ${9 + 16 * glow}px rgba(95,120,255,${0.65 * glow})) drop-shadow(0 0 ${7 + 12 * glow}px rgba(24,205,235,${0.65 * glow}))` }} />
        </svg>

        {/* real photoreal finger */}
        <img src="assets/finger.png" alt=""
          style={{
            position: 'absolute',
            left: TOUCH.x - TIP_X, top: TOUCH.y - TIP_Y,
            width: FINGER_W, height: FINGER_H,
            transform: `translate(${fingerTx}px, ${fingerTy}px) rotate(${fingerRot}deg) skewX(${skew}deg) scale(${depthScale * (1 + squash * 0.035)}, ${depthScale * (1 - squash * 0.06)})`,
            willChange: 'transform',
            transformOrigin: `${TIP_X}px 0px`,
            filter: `drop-shadow(0 ${12 + press * 6}px ${28 + press * 10}px rgba(0,0,0,0.62))`,
            opacity: reveal,
          }} />
      </div>
    </div>
  );
}

function DuTeaserApp() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  window.__DU = {
    glow: t.glowStrength,
    speed: t.pulseSpeed,
    motion: t.motionIntensity != null ? t.motionIntensity : 1,
    float: t.floatAmount != null ? t.floatAmount : 1,
  };
  return (
    <React.Fragment>
      <SceneStage
        key={`${t.glowStrength}:${t.pulseSpeed}:${t.motionIntensity}:${t.floatAmount}`}
        width={1080} height={1350} bg="#000000"
        scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        {{ Press }}
      </SceneStage>
      <TweaksPanel>
        <TweakSection label="Motion" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakSlider label="Motion intensity" value={t.motionIntensity != null ? t.motionIntensity : 1} min={0.4} max={1.8} step={0.05} unit="x" onChange={(v) => setTweak('motionIntensity', v)} />
        <TweakSlider label="Float amount" value={t.floatAmount != null ? t.floatAmount : 1} min={0} max={1.8} step={0.05} unit="x" onChange={(v) => setTweak('floatAmount', v)} />
        <TweakSection label="Glow" />
        <TweakSlider label="Glow strength" value={t.glowStrength} min={0.4} max={1.5} step={0.05} onChange={(v) => setTweak('glowStrength', v)} />
        <TweakSlider label="Pulse speed" value={t.pulseSpeed} min={0.3} max={2} step={0.1} unit="x" onChange={(v) => setTweak('pulseSpeed', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}
window.DuTeaserApp = DuTeaserApp;
