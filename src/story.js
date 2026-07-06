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

  // ── scene per chapter ───────────────────────────────────────
  // img: artwork slot · scale/ox/oy: cinematic crop · dim: brightness
  // Art slots: 0 full-body front · 1 full-body close · 2 helmet · 3 wide side
  const scenes = [
    { img: 0, scale: 1.06, ox: 0.0,   oy: -0.01, dim: 1.0 },  // gate
    { img: 3, scale: 1.14, ox: 0.02,  oy: 0.02,  dim: 1.0 },  // calling — knight right, void left
    { img: 3, scale: 1.34, ox: -0.08, oy: 0.0,   dim: 0.95 }, // campaigns — push in
    { img: 0, scale: 1.5,  ox: 0.0,   oy: 0.05,  dim: 0.14 }, // conquests — darkened backdrop
    { img: 1, scale: 1.16, ox: -0.05, oy: 0.0,   dim: 0.68 }, // arsenal
    { img: 2, scale: 1.08, ox: 0.03,  oy: 0.0,   dim: 0.8 },  // honors — the helm
    { img: 0, scale: 1.55, ox: 0.0,   oy: 0.05,  dim: 0.9 },  // summon — toward the portal
  ];

  // initial state
  const first = scenes[0];
  stage.planes.forEach((p, pi) => {
    p.state.opacity = pi === first.img ? 1 : 0;
    if (pi === first.img) Object.assign(p.state, cropOf(first));
  });

  function cropOf(sc) {
    return { scale: sc.scale, offsetX: sc.ox, offsetY: sc.oy, dim: sc.dim };
  }

  chapters.forEach((ch, i) => {
    if (i === 0) return;
    const sc = scenes[i];
    const prev = scenes[i - 1];
    const st = () => ({
      trigger: `#${ch.id}`,
      start: 'top bottom',
      end: 'top 12%',
      scrub: 0.6,
    });

    // crop / dim of the incoming artwork
    gsap.to(stage.planes[sc.img].state, {
      ...cropOf(sc),
      ease: 'none',
      immediateRender: false,
      scrollTrigger: st(),
    });

    // crossfade if the artwork changes
    if (sc.img !== prev.img) {
      gsap.to(stage.planes[sc.img].state, {
        opacity: 1,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: st(),
      });
      gsap.to(stage.planes[prev.img].state, {
        opacity: 0,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: st(),
      });
    }
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

  // ── horizontal conquest gallery ─────────────────────────────
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

  return { lenis };
}
