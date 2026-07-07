import '@fontsource-variable/bricolage-grotesque';
import '@fontsource/instrument-serif';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './styles/main.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { populate, wireProjects, setLenis } from './populate.js';
import { initInteractions, playReveals } from './interactions.js';
import { initHero3D } from './hero3d.js';

gsap.registerPlugin(ScrollTrigger);

populate();
const { lenis } = initInteractions();
setLenis(lenis);
wireProjects();

// ── hero 3D spiral ───────────────────────────────────────────
let hero = null;
try {
  hero = initHero3D(document.getElementById('hero-canvas'));
  // dissolve the spiral as the hero scrolls away; pause when offscreen
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => hero.setProgress(self.progress),
    onToggle: (self) => hero.setRunning(self.isActive || self.progress < 1),
  });
} catch (e) {
  // no WebGL — the hero still reads as a clean typographic page
  document.getElementById('hero-canvas')?.remove();
}

// ── loader → intro ───────────────────────────────────────────
const loader = document.getElementById('loader');
const num = document.getElementById('loader-num');
const progress = { v: 0 };

lenis.stop();
document.body.classList.add('no-scroll');

const ready = Promise.all([
  document.fonts?.ready ?? Promise.resolve(),
  new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
]);

gsap.to(progress, {
  v: 100, duration: 1.7, ease: 'power2.inOut',
  onUpdate: () => { num.textContent = Math.round(progress.v); },
});

ready.then(() => gsap.delayedCall(1.8, lift));

function lift() {
  const tl = gsap.timeline({
    onComplete: () => {
      loader.remove();
      lenis.start();
      document.body.classList.remove('no-scroll');
    },
  });
  tl.to('#loader .loader-word span, #loader .loader-num', {
    yPercent: -120, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'power3.in',
  });
  tl.to(loader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.2');
  tl.from('#hero-canvas', { opacity: 0, duration: 1.4, ease: 'power2.out' }, '-=0.7');
  tl.add(playReveals, '-=1.1');
}
