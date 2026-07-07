import '@fontsource/syne/600.css';
import '@fontsource/syne/700.css';
import '@fontsource/syne/800.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import './styles/main.css';

import gsap from 'gsap';
import { World } from './scene/World.js';
import { KeyartStage } from './scene/Keyart.js';
import { Particles } from './scene/Particles.js';
import { populate, wireProjects } from './populate.js';
import { buildStory } from './story.js';
import { wireSound } from './audio.js';

populate();

// ── the four knight artworks ─────────────────────────────────
// Drop your own keyart into public/img as knight-1.jpg … knight-4.jpg
// (1 full-body front · 2 full-body close · 3 helmet close-up · 4 wide
// side view). Until a file exists, the generated fallback art is used.
const FALLBACK =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3A9SZn4dAhJ71TsHiyaNNYmkcoH/hf_20260706_103058_8dfa698e-b7b9-4747-ae4e-4dbab75e4a4a.png';
const ARTS = [1, 2, 3, 4].map((n) => [`img/knight-${n}.jpg`, FALLBACK]);

// ── build the world ──────────────────────────────────────────
const canvas = document.getElementById('stage');
let world;
try {
  world = new World(canvas);
} catch {
  // WebGL unavailable — leave the DOM story readable on a dark page.
  document.getElementById('loader').remove();
  document.querySelectorAll('.reveal').forEach((n) => {
    n.style.opacity = 1;
    n.style.transform = 'none';
  });
  throw new Error('WebGL not available');
}

const stage = new KeyartStage(world, ARTS);

const particles = new Particles(world.isMobile ? 200 : 380);
world.add(particles.points);
world.onTick((t) => particles.tick(t));

world.start();
const { lenis } = buildStory(world, stage);
wireProjects(lenis);
wireSound();
if (import.meta.env.DEV || location.search.includes('debug')) {
  window.__stage = stage;
  window.__world = world;
}

// ── loader → intro ───────────────────────────────────────────
const num = document.getElementById('loader-num');
const fill = document.getElementById('loader-fill');
const progress = { v: 0 };
let artDone = 0;

const paint = () => {
  num.textContent = Math.round(progress.v);
  fill.style.transform = `scaleX(${progress.v / 100})`;
};

// crawl toward 90 while textures stream in; each finished artwork
// raises the floor, fonts + first frame close it out.
const warmup = gsap.to(progress, {
  v: 88,
  duration: 3.2,
  ease: 'power1.out',
  onUpdate: paint,
});
stage.onProgress((done, total) => {
  artDone = done / total;
  progress.v = Math.max(progress.v, artDone * 88);
  paint();
});

const ready = Promise.all([
  stage.ready,
  document.fonts?.ready ?? Promise.resolve(),
  new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
]);

ready.then(() => {
  warmup.kill();
  gsap.to(progress, {
    v: 100,
    duration: 0.5,
    ease: 'power1.inOut',
    onUpdate: paint,
    onComplete: intro,
  });
});

function intro() {
  const tl = gsap.timeline();
  tl.to('#loader', {
    opacity: 0,
    duration: 0.9,
    ease: 'power2.inOut',
    onComplete: () => document.getElementById('loader').remove(),
  });
  // cinematic settle onto the gate
  const hero = stage.planes[0].state;
  tl.from(hero, { scale: hero.scale * 1.14, duration: 2.6, ease: 'power3.out' }, '-=0.4');
  tl.to(
    '#hero .reveal',
    { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
    '-=2.0'
  );
  tl.to(['.site-head', '.rail'], { opacity: 1, duration: 1 }, '-=0.9');
  tl.to('#scroll-hint', { opacity: 1, duration: 1 }, '-=0.6');
}
