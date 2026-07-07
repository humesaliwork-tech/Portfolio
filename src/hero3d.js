import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/**
 * Hero centrepiece: an interactive spiral galaxy of glowing green points.
 * Rotates continuously, tilts toward the pointer, and dissolves as the
 * visitor scrolls past the hero. Pure procedural geometry — no assets.
 */
export function initHero3D(canvas) {
  const isMobile = matchMedia('(max-width: 760px)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 0, 15);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.6 : 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x000000, 0);

  // ── build the spiral galaxy ────────────────────────────────
  const COUNT = isMobile ? 6000 : 14000;
  const ARMS = 4;
  const RADIUS = 9;
  const SPIN = 4.2;

  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const scales = new Float32Array(COUNT);

  const core = new THREE.Color(0x9dffc6);   // bright green core
  const mid = new THREE.Color(0x3dff88);    // bright green
  const edge = new THREE.Color(0x0a6b39);   // deep green edge

  for (let i = 0; i < COUNT; i++) {
    const t = Math.pow(Math.random(), 0.7);      // bias toward the core
    const radius = t * RADIUS;
    const branch = ((i % ARMS) / ARMS) * Math.PI * 2;
    const spin = t * SPIN;
    const angle = branch + spin;

    // fuzz that widens toward the edge
    const spread = 0.28 + t * 0.9;
    const rx = (Math.random() - 0.5) * spread * (Math.random() < 0.5 ? 1 : 1.4);
    const ry = (Math.random() - 0.5) * spread * 0.5;
    const rz = (Math.random() - 0.5) * spread * (Math.random() < 0.5 ? 1 : 1.4);

    positions[i * 3] = Math.cos(angle) * radius + rx;
    positions[i * 3 + 1] = ry + (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 2] = Math.sin(angle) * radius + rz;

    const c = core.clone();
    c.lerp(mid, Math.min(1, t * 1.6));
    if (t > 0.55) c.lerp(edge, (t - 0.55) / 0.45);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    scales[i] = (1 - t) * 1.5 + 0.35;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  const uniforms = {
    uTime: { value: 0 },
    uSize: { value: (isMobile ? 22 : 32) * renderer.getPixelRatio() },
    uProgress: { value: 0 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uSize;
      uniform float uProgress;
      attribute float aScale;
      varying vec3 vColor;
      varying float vFade;
      void main() {
        vColor = color;
        vec3 p = position;
        // gentle vertical drift so the disc breathes
        p.y += sin(uTime * 0.6 + p.x * 0.4 + p.z * 0.3) * 0.12;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float twinkle = 0.7 + 0.3 * sin(uTime * 2.0 + aScale * 40.0);
        gl_PointSize = uSize * aScale * twinkle * (1.0 - uProgress * 0.6) / -mv.z;
        vFade = 1.0 - uProgress;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vFade;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor, a * a * vFade);
      }
    `,
  });

  // Desktop: shift the bright core into the open right-side negative
  // space. Mobile: lift it into the upper area so it clears the name.
  const offsetX = isMobile ? 0 : 3.4;
  const offsetY = isMobile ? 6.2 : 0;
  const galaxy = new THREE.Points(geo, material);
  galaxy.rotation.x = -0.9;   // tilt to a galaxy view
  galaxy.position.set(offsetX, offsetY, 0);
  scene.add(galaxy);

  // faint core glow sprite
  const glowTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(180,255,210,0.9)');
    g.addColorStop(0.3, 'rgba(61,255,136,0.35)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    opacity: isMobile ? 0.28 : 0.42,
  }));
  glow.scale.set(isMobile ? 5.5 : 7, isMobile ? 5.5 : 7, 1);
  glow.position.set(offsetX, offsetY, 0);
  scene.add(glow);

  // ── post: bloom ────────────────────────────────────────────
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(innerWidth, innerHeight),
    isMobile ? 0.6 : 0.8, 0.75, 0.05
  );
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // ── interaction state ──────────────────────────────────────
  const pointer = new THREE.Vector2(0, 0);
  const pTarget = new THREE.Vector2(0, 0);
  addEventListener('pointermove', (e) => {
    pTarget.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
  });

  let progress = 0;        // 0 in hero, 1 scrolled away
  let running = true;
  const api = {
    setProgress(p) { progress = p; canvas.style.opacity = String(1 - p * 0.9); },
    setRunning(r) { running = r; },
  };

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    composer.setSize(innerWidth, innerHeight);
    uniforms.uSize.value = (isMobile ? 22 : 32) * renderer.getPixelRatio();
  });

  const clock = new THREE.Clock();
  const loop = () => {
    requestAnimationFrame(loop);
    if (!running) return;
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    uniforms.uProgress.value = progress;

    pointer.lerp(pTarget, 0.05);
    galaxy.rotation.y = t * (reduce ? 0 : 0.075) + pointer.x * 0.35;
    galaxy.rotation.x = -0.9 + pointer.y * 0.22;
    galaxy.rotation.z = pointer.x * 0.08;
    glow.material.opacity = ((isMobile ? 0.28 : 0.42) - progress * 0.4);
    camera.position.z = 15 + progress * 6;

    composer.render();
  };
  loop();

  return api;
}
