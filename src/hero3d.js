import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/**
 * Hero centrepiece: a sword whose blade also reads as a digital pen —
 * a fine tapering nib, an emerald "ink" line down the fuller, a ribbed
 * barrel grip and a capped pommel. It floats, rotates, tilts to the
 * pointer and drifts as the visitor scrolls. Light, no post-processing,
 * so it stays smooth on mobile and over a white page.
 */
export function initHero3D(canvas) {
  const isMobile = matchMedia('(max-width: 760px)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ACCENT = 0xffffff;
  const ACCENT_BRIGHT = 0xffffff;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 0, 15);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.6 : 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // soft studio reflections for the metal
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  // lights
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 8, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(ACCENT_BRIGHT, 1.4);
  rim.position.set(-6, -2, -4);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  // ── materials ──────────────────────────────────────────────
  // chrome / silver so the blade reads on a black page
  const steel = new THREE.MeshStandardMaterial({ color: 0xf2f2f2, metalness: 1, roughness: 0.16 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x9a9a9a, metalness: 1, roughness: 0.34 });
  const emissive = new THREE.MeshStandardMaterial({
    color: 0x111111, emissive: 0xffffff, emissiveIntensity: 2.6, metalness: 0.4, roughness: 0.3,
  });

  // ── build the sword / pen ──────────────────────────────────
  const sword = new THREE.Group();

  // BLADE — a 4-sided cone gives a diamond cross-section tapering to a
  // fine nib point. Flattened on Z so it reads as a blade / pen nib.
  const blade = new THREE.Mesh(new THREE.ConeGeometry(0.42, 7.2, 4, 1), steel);
  blade.geometry.rotateY(Math.PI / 4);
  blade.scale.set(1, 1, 0.28);
  blade.position.y = 1.9;
  sword.add(blade);

  // FULLER — glowing emerald "ink line" down the centre of the blade
  const fuller = new THREE.Mesh(new THREE.BoxGeometry(0.07, 6.4, 0.05), emissive);
  fuller.position.set(0, 2.0, 0.12);
  sword.add(fuller);
  const fullerBack = fuller.clone();
  fullerBack.position.z = -0.12;
  sword.add(fullerBack);

  // NIB detail near the tip — a split tine + breather dot, pen-like
  const nibTine = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.0, 0.06), emissive);
  nibTine.position.set(0, -1.35, 0.12);
  sword.add(nibTine);
  const breather = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), emissive);
  breather.position.set(0, -0.7, 0.12);
  sword.add(breather);

  // GUARD — slim crossguard / grip collar
  const guard = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.28, 0.5), steel);
  guard.position.y = -1.7;
  sword.add(guard);
  guard.geometry.translate(0, 0, 0);
  const guardGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.16), emissive);
  guardGem.position.set(0, -1.7, 0.28);
  sword.add(guardGem);

  // GRIP — ribbed barrel (reads as a pen body)
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 2.6, 24), darkSteel);
  grip.position.y = -3.15;
  sword.add(grip);
  for (let i = 0; i < 9; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.245, 0.02, 8, 24), steel);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -2.05 - i * 0.26;
    sword.add(ring);
  }

  // POMMEL — capped end with a clip (pen top)
  const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 20), steel);
  pommel.position.y = -4.6;
  pommel.scale.y = 0.8;
  sword.add(pommel);
  const clip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.9, 0.06), steel);
  clip.position.set(0.24, -4.15, 0);
  sword.add(clip);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), emissive);
  tip.position.y = 5.5;
  sword.add(tip);

  // present the whole object at a dynamic diagonal, right of the type
  sword.rotation.z = 0.42;
  sword.rotation.x = 0.1;
  sword.scale.setScalar(isMobile ? 0.58 : 0.8);
  scene.add(sword);

  // glowing tip sprite
  const glowTex = radialTex(ACCENT_BRIGHT);
  const tipGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.9,
  }));
  tipGlow.scale.set(1.5, 1.5, 1);
  sword.add(tipGlow);
  tipGlow.position.y = 5.5;

  // faint light pool under the object (over the black page)
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 9),
    new THREE.MeshBasicMaterial({ map: radialTex(0xffffff, 0.5), transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -5.6;
  scene.add(shadow);

  // ── interaction ────────────────────────────────────────────
  const pointer = new THREE.Vector2(0, 0);
  const pTarget = new THREE.Vector2(0, 0);
  addEventListener('pointermove', (e) => {
    pTarget.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
  });

  let progress = 0, running = true;
  const api = {
    setProgress(p) { progress = p; canvas.style.opacity = String(1 - p * 0.85); },
    setRunning(r) { running = r; },
  };

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  const clock = new THREE.Clock();
  const baseX = isMobile ? 0.4 : 4.6;   // sit right of the type on desktop
  const baseY = isMobile ? 3.8 : 0;     // lift into the top area on mobile
  const loop = () => {
    requestAnimationFrame(loop);
    if (!running) return;
    const t = clock.getElapsedTime();
    pointer.lerp(pTarget, 0.06);

    sword.position.x = baseX + pointer.x * 0.6;
    sword.position.y = baseY + Math.sin(t * 0.9) * 0.25 - progress * 4;
    sword.rotation.y = t * (reduce ? 0 : 0.35) + pointer.x * 0.5;
    sword.rotation.z = 0.42 + pointer.y * 0.12 + progress * 0.5;
    sword.rotation.x = 0.1 - pointer.y * 0.15;
    emissive.emissiveIntensity = 2.4 + Math.sin(t * 2.2) * 0.5;
    tipGlow.material.opacity = (0.8 + Math.sin(t * 2.2) * 0.2) * (1 - progress);
    shadow.position.x = sword.position.x;
    shadow.material.opacity = 0.06 * (1 - progress);

    renderer.render(scene, camera);
  };
  loop();

  return api;
}

function radialTex(hex, inner = 1) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const col = new THREE.Color(hex);
  const r = Math.round(col.r * 255), g = Math.round(col.g * 255), b = Math.round(col.b * 255);
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, `rgba(${r},${g},${b},${inner})`);
  grad.addColorStop(0.4, `rgba(${r},${g},${b},${inner * 0.35})`);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}
