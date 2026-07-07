import '@fontsource-variable/bricolage-grotesque';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './styles/main.css';

import gsap from 'gsap';
import { populate, wireProjects, setLenis } from './populate.js';
import { initInteractions, playReveals } from './interactions.js';

populate();
const { lenis } = initInteractions();
setLenis(lenis);
wireProjects();

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
  v: 100,
  duration: 1.6,
  ease: 'power2.inOut',
  onUpdate: () => { num.textContent = Math.round(progress.v); },
});

ready.then(() => gsap.delayedCall(1.7, lift));

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
  tl.add(playReveals, '-=0.5');
}
