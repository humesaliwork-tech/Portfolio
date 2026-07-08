import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function initInteractions() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── smooth scroll ──────────────────────────────────────────
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // ── tab navigation with a cinematic wipe transition ────────
  const wipe = document.getElementById('wipe');
  let wiping = false;
  const jump = (href) => {
    if (wiping) return;
    const target = document.querySelector(href);
    if (!target) return;
    wiping = true;
    gsap.timeline({ onComplete: () => { wiping = false; } })
      .set(wipe, { transformOrigin: 'left center', scaleX: 0 })
      .to(wipe, { scaleX: 1, duration: 0.42, ease: 'power3.inOut' })
      .add(() => lenis.scrollTo(href, { immediate: true }))
      .set(wipe, { transformOrigin: 'right center' })
      .to(wipe, { scaleX: 0, duration: 0.5, ease: 'power3.inOut' }, '+=0.05');
  };
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href?.startsWith('#')) return;
      e.preventDefault();
      jump(href);
    });
  });

  // ── custom cursor ──────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const cLabel = cursor.querySelector('.cursor-label');
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const target = { ...pos };
  addEventListener('pointermove', (e) => {
    target.x = e.clientX; target.y = e.clientY;
  });
  const renderCursor = () => {
    pos.x += (target.x - pos.x) * 0.2;
    pos.y += (target.y - pos.y) * 0.2;
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

  const hoverSel = 'a, button, .work-row, [data-cursor]';
  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest(hoverSel);
    if (!t) return;
    const label = t.getAttribute('data-cursor');
    cursor.classList.add('is-hover');
    if (label && label !== 'home') {
      cursor.classList.add('is-label');
      cLabel.textContent = label;
    }
  });
  document.addEventListener('pointerout', (e) => {
    if (!e.target.closest(hoverSel)) return;
    cursor.classList.remove('is-hover', 'is-label');
    cLabel.textContent = '';
  });

  // ── work-list hover preview ────────────────────────────────
  const preview = document.getElementById('work-preview');
  const previewImg = document.getElementById('work-preview-img');
  const pv = { x: 0, y: 0 };
  const pvTarget = { x: 0, y: 0 };
  let previewOn = false;
  document.querySelectorAll('.work-row').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      const src = row.dataset.img;
      if (!src) return;
      previewImg.src = src;
      preview.classList.add('is-visible');
      previewOn = true;
    });
    row.addEventListener('pointerleave', () => {
      preview.classList.remove('is-visible');
      previewOn = false;
    });
  });
  addEventListener('pointermove', (e) => { pvTarget.x = e.clientX; pvTarget.y = e.clientY; });
  const renderPreview = () => {
    pv.x += (pvTarget.x - pv.x) * 0.12;
    pv.y += (pvTarget.y - pv.y) * 0.12;
    if (previewOn) preview.style.transform =
      `translate(${pv.x}px, ${pv.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderPreview);
  };
  requestAnimationFrame(renderPreview);

  // ── marquee ────────────────────────────────────────────────
  const track = document.getElementById('marquee-track');
  if (track && !reduce) {
    gsap.to(track, { xPercent: -33.333, duration: 22, ease: 'none', repeat: -1 });
  }

  // ── active tab tracking (Studio spans about → recognition) ──
  const tab = (name) => document.querySelector(`.nav a[data-tab="${name}"]`);
  const setActive = (name) => {
    document.querySelectorAll('.nav a').forEach((a) =>
      a.classList.toggle('is-active', a.dataset.tab === name));
  };
  const zones = [
    ['hero', '#hero', '#hero'],
    ['work', '#work', '#work'],
    ['studio', '#about', '#recognition'],
    ['contact', '#contact', '#contact'],
  ];
  zones.forEach(([name, startSel, endSel]) => {
    ScrollTrigger.create({
      trigger: startSel, start: 'top 45%',
      endTrigger: endSel, end: 'bottom 45%',
      onToggle: (self) => { if (self.isActive) setActive(name); },
    });
  });

  return { lenis };
}

// ── reveal animations, run after loader lifts ────────────────
export function playReveals() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    document.querySelectorAll('.reveal-fade').forEach((n) => { n.style.opacity = 1; n.style.transform = 'none'; });
    return;
  }

  // hero — line masks + fades
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('#hero-title .line > span', {
    yPercent: 110, duration: 1.1, stagger: 0.1,
  });
  tl.to('.hero .reveal-fade', {
    opacity: 1, y: 0, duration: 0.9, stagger: 0.08,
  }, '-=0.7');
  tl.to('.site-head', { opacity: 1, duration: 0.6 }, '-=0.6');

  // section headings + rows fade up on scroll
  const groups = [
    '.section-head', '.work-row', '.about-lead', '.about-block',
    '.exp-row', '.caps-col', '.rec-row', '.contact .reveal-fade', '.contact-foot',
    '.btn-line',
  ];
  document.querySelectorAll(groups.join(',')).forEach((n) => {
    if (n.closest('.hero')) return;
    gsap.set(n, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: n, start: 'top 88%', once: true,
      onEnter: () => gsap.to(n, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
    });
  });

  // contact mail line reveal
  gsap.set('#contact-mail .line > span', { yPercent: 110 });
  ScrollTrigger.create({
    trigger: '.contact', start: 'top 70%', once: true,
    onEnter: () => gsap.to('#contact-mail .line > span', { yPercent: 0, duration: 1, ease: 'power3.out' }),
  });

  ScrollTrigger.refresh();
}
