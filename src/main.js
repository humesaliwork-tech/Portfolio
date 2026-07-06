import '@fontsource/cinzel/400.css';
import '@fontsource/cinzel/700.css';
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import './styles/main.css';

import gsap from 'gsap';
import { World } from './scene/World.js';
import { Knight } from './scene/Knight.js';
import { Portal } from './scene/Portal.js';
import { Particles } from './scene/Particles.js';
import { populate } from './populate.js';
import { buildStory } from './story.js';

populate();

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

const knight = new Knight();
world.add(knight.group);
world.onTick((t) => knight.tick(t));

const portal = new Portal();
world.add(portal.group);
world.onTick((t) => portal.tick(t));

const particles = new Particles(world.isMobile ? 240 : 420);
world.add(particles.points);
world.onTick((t) => particles.tick(t));

world.start();
buildStory(world, knight, portal);

// ── loader → intro ───────────────────────────────────────────
const num = document.getElementById('loader-num');
const fill = document.getElementById('loader-fill');
const progress = { v: 0 };

const ready = Promise.all([
  document.fonts?.ready ?? Promise.resolve(),
  new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
]);

const warmup = gsap.to(progress, {
  v: 90,
  duration: 2.2,
  ease: 'power2.out',
  onUpdate: () => {
    num.textContent = Math.round(progress.v);
    fill.style.transform = `scaleX(${progress.v / 100})`;
  },
});

ready.then(() => {
  warmup.kill();
  gsap.to(progress, {
    v: 100,
    duration: 0.5,
    ease: 'power1.inOut',
    onUpdate: () => {
      num.textContent = Math.round(progress.v);
      fill.style.transform = `scaleX(${progress.v / 100})`;
    },
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
  tl.from(
    world.camState,
    { pz: 15, py: 3.4, duration: 2.4, ease: 'power3.out' },
    '-=0.3'
  );
  tl.to(
    '#hero .reveal',
    { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
    '-=1.8'
  );
  tl.to(['.site-head', '.rail'], { opacity: 1, duration: 1 }, '-=0.8');
  tl.to('#scroll-hint', { opacity: 1, duration: 1 }, '-=0.6');
}
