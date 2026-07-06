import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { chapters } from './data/content.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Binds the scroll position to the 3D world (camera path, portal flare,
 * knight turn) and to the DOM (chapter reveals, rail, header tag).
 */
export function buildStory(world, knight, portal) {
  // ── buttery scroll ──────────────────────────────────────────
  const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ── camera choreography ────────────────────────────────────
  // one keyframe per chapter — the master timeline is scrubbed
  // across the entire document.
  const s = world.camState;
  // Text columns sit left, so every mid-tale shot frames the knight
  // on the right of the screen (target pushed to -x).
  const shots = [
    { px: 0.0, py: 1.7, pz: 9.6, tx: 0, ty: 2.1, tz: 0 },     // gate
    { px: 3.2, py: 1.9, pz: 5.8, tx: -1.0, ty: 2.3, tz: 0 },  // calling
    { px: 3.8, py: 2.3, pz: 6.6, tx: -1.7, ty: 2.2, tz: 0 },  // campaigns
    { px: 0.0, py: 2.6, pz: 13.5, tx: 0, ty: 2.9, tz: 0 },    // conquests (pull back)
    { px: 4.4, py: 2.7, pz: 8.8, tx: -2.5, ty: 2.2, tz: 0 },  // arsenal (subject far right)
    { px: 2.0, py: 1.15, pz: 7.6, tx: -1.2, ty: 2.6, tz: 0 }, // honors (low hero shot)
    { px: 1.5, py: 2.1, pz: 4.4, tx: -0.5, ty: 2.9, tz: -5 }, // summon (toward the portal)
  ];

  // Each chapter transition is scrubbed while its section scrolls
  // into view, so the camera always lands with the right text.
  chapters.forEach((ch, i) => {
    if (i === 0) return;
    gsap.to(s, {
      ...shots[i],
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

  // Finale: the knight squares up to the portal and it flares open.
  const finale = () => ({
    scrollTrigger: {
      trigger: '#summon',
      start: 'top bottom',
      end: 'top 10%',
      scrub: 0.8,
    },
    ease: 'none',
    immediateRender: false,
  });
  gsap.to(knight.group.rotation, { y: Math.PI * 0.85, ...finale() });
  gsap.to(portal.uniforms.uBoost, { value: 1.35, ...finale() });
  gsap.to(world.portalLight, { intensity: 75, ...finale() });
  gsap.to(world.bloom, { strength: 0.72, ...finale() });

  // dim the stage while the gallery is on screen so the work pops
  gsap.to([world.fillLight, world.hemi], {
    intensity: 0.15,
    scrollTrigger: {
      trigger: '#conquests',
      start: 'top 60%',
      end: 'top 10%',
      scrub: true,
    },
  });
  gsap.to([world.fillLight, world.hemi], {
    intensity: (i) => [0.55, 0.4][i],
    scrollTrigger: {
      trigger: '#arsenal',
      start: 'top 90%',
      end: 'top 40%',
      scrub: true,
    },
  });

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
  gsap.to('#scroll-hint', {
    opacity: 0,
    scrollTrigger: {
      trigger: '#calling',
      start: 'top 95%',
      end: 'top 70%',
      scrub: true,
    },
  });

  return { lenis };
}
