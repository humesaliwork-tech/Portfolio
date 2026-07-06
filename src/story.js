import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { chapters } from './data/content.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Binds scroll to the keyart stage (cinematic crops, crossfades,
 * dimming, finale flare) and to the DOM (reveals, rail, header tag).
 */
export function buildStory(world, stage) {
  // ── buttery scroll ──────────────────────────────────────────
  const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ── horizontal conquest gallery ─────────────────────────────
  // Created FIRST: the pin adds scroll distance, and ScrollTrigger
  // must process it before any trigger that sits below it on the
  // page, or their start positions miss by the pinned distance.
  const track = document.getElementById('gallery-track');
  const pin = document.getElementById('gallery-pin');
  const horizontal = () => -(track.scrollWidth - innerWidth);
  gsap.to(track, {
    x: horizontal,
    ease: 'none',
    scrollTrigger: {
      trigger: pin,
      start: 'top 12%',
      end: () => `+=${-horizontal()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  // ── scene per chapter ───────────────────────────────────────
  // img: artwork slot · scale/ox/oy: cinematic crop · dim: brightness
  // Art slots: 0 full-body front · 1 full-body close · 2 helmet · 3 wide side
  const scenes = [
    { img: 0, scale: 1.02, ox: 0.0,   oy: 0.008, dim: 1.0 },  // gate
    { img: 3, scale: 1.14, ox: 0.02,  oy: 0.02,  dim: 1.0 },  // calling — knight right, void left
    { img: 3, scale: 1.34, ox: -0.08, oy: 0.0,   dim: 0.95 }, // campaigns — push in
    { img: 0, scale: 1.5,  ox: 0.0,   oy: 0.05,  dim: 0.14 }, // conquests — darkened backdrop
    { img: 1, scale: 1.16, ox: -0.05, oy: 0.05,  dim: 0.68 }, // arsenal
    { img: 2, scale: 1.08, ox: 0.03,  oy: 0.0,   dim: 0.8 },  // honors — the helm
    { img: 0, scale: 1.55, ox: 0.0,   oy: 0.05,  dim: 0.9 },  // summon — toward the portal
  ];

  function cropOf(sc) {
    return { scale: sc.scale, offsetX: sc.ox, offsetY: sc.oy, dim: sc.dim };
  }

  // Walk the chapters and emit explicit fromTo keyframes per plane.
  // Every tween carries its own start AND end state, so overlapping
  // scrubbed tweens on the same plane can never apply stale values,
  // regardless of creation order or refresh timing.
  const planeStates = stage.planes.map(() => null);
  scenes.forEach((sc) => {
    // pre-position each artwork at the crop of its first appearance
    if (!planeStates[sc.img]) planeStates[sc.img] = { ...cropOf(sc), opacity: 0 };
  });
  planeStates.forEach((s, i) => {
    if (!s) planeStates[i] = { scale: 1.1, offsetX: 0, offsetY: 0, dim: 1, opacity: 0 };
  });
  planeStates[scenes[0].img].opacity = 1;
  stage.planes.forEach((p, i) => Object.assign(p.state, planeStates[i]));

  let prevStates = planeStates.map((s) => ({ ...s }));
  chapters.forEach((ch, i) => {
    if (i === 0) return;
    const sc = scenes[i];
    planeStates.forEach((s, pi) => { s.opacity = pi === sc.img ? 1 : 0; });
    Object.assign(planeStates[sc.img], cropOf(sc));

    planeStates.forEach((to, pi) => {
      const from = prevStates[pi];
      const changed = Object.keys(to).some((k) => to[k] !== from[k]);
      if (!changed) return;
      gsap.fromTo(stage.planes[pi].state, { ...from }, {
        ...to,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: `#${ch.id}`,
          start: 'top bottom',
          end: 'top 12%',
          scrub: 0.6,
        },
      });
    });
    prevStates = planeStates.map((s) => ({ ...s }));
  });

  // finale — the portal flares as you reach the gate
  const finale = () => ({
    scrollTrigger: {
      trigger: '#summon',
      start: 'top 70%',
      end: 'bottom bottom',
      scrub: 0.8,
    },
    ease: 'none',
    immediateRender: false,
  });
  gsap.to(stage.flareState, { value: 0.85, ...finale() });
  gsap.to(world.bloom, { strength: 0.75, ...finale() });

  // ── chapter reveals ────────────────────────────────────────
  document.querySelectorAll('.chapter').forEach((section) => {
    const items = section.querySelectorAll('.reveal');
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 62%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // ── rail + header chapter tag ──────────────────────────────
  const dots = [...document.querySelectorAll('.rail-dot')];
  const numeral = document.getElementById('chapter-numeral');
  const label = document.getElementById('chapter-label');

  chapters.forEach((ch, i) => {
    ScrollTrigger.create({
      trigger: `#${ch.id}`,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (!self.isActive) return;
        dots.forEach((d, j) => d.classList.toggle('is-active', i === j));
        numeral.textContent = ch.numeral;
        label.textContent = ch.label;
      },
    });
  });

  const scrollTo = (id) =>
    lenis.scrollTo(`#${id}`, { duration: 1.8, easing: (x) => 1 - Math.pow(1 - x, 3) });

  dots.forEach((d) =>
    d.addEventListener('click', () => scrollTo(d.dataset.target))
  );
  document.querySelectorAll('[data-nav]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      scrollTo(a.getAttribute('href').slice(1));
    })
  );

  // hide the scroll hint once the tale begins
  ScrollTrigger.create({
    trigger: '#calling',
    start: 'top 90%',
    onEnter: () => gsap.to('#scroll-hint', { opacity: 0, duration: 0.5, overwrite: true }),
    onLeaveBack: () => gsap.to('#scroll-hint', { opacity: 1, duration: 0.5, overwrite: true }),
  });

  // process triggers in page order on every refresh, regardless of
  // creation order (matters because of the pinned gallery)
  ScrollTrigger.sort();
  ScrollTrigger.refresh();

  return { lenis };
}
