import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/** Soft radial-gradient texture, used for drifting fog sprites. */
export function radialTexture(stops, size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [offset, color] of stops) g.addColorStop(offset, color);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.clock = new THREE.Clock();
    this.tickables = [];
    this.pointer = new THREE.Vector2(0, 0);   // smoothed
    this.pointerRaw = new THREE.Vector2(0, 0);
    this.isMobile = matchMedia('(max-width: 760px)').matches;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020806);

    this.camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 60);
    this.camera.position.set(0, 0, 10);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, this.isMobile ? 1.5 : 2));
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    this._buildMist();
    this._buildComposer();
    this._bindEvents();
  }

  _buildMist() {
    const tex = radialTexture([
      [0, 'rgba(90,200,150,0.14)'],
      [0.6, 'rgba(60,140,105,0.05)'],
      [1, 'rgba(0,0,0,0)'],
    ]);
    this.mist = new THREE.Group();
    const spots = [
      [-2.6, -2.2, 1.2, 8, 2.8],
      [2.8, -2.6, 1.6, 7, 2.4],
      [0, -1.6, 0.8, 10, 3.2],
    ];
    for (const [x, y, z, w, h] of spots) {
      const m = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      m.position.set(x, y, z);
      m.scale.set(w, h, 1);
      m.userData.baseX = x;
      m.userData.seed = Math.random() * 10;
      this.mist.add(m);
    }
    this.scene.add(this.mist);

    this.tickables.push((t) => {
      for (const m of this.mist.children) {
        m.position.x = m.userData.baseX + Math.sin(t * 0.06 + m.userData.seed) * 1.4;
        m.material.opacity = 0.3 + Math.sin(t * 0.1 + m.userData.seed * 2) * 0.12;
      }
    });
  }

  _buildComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(innerWidth, innerHeight),
      0.32,  // strength — the keyart carries its own glow
      0.75,  // radius
      0.78   // threshold
    );
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  _bindEvents() {
    addEventListener('resize', () => {
      this.camera.aspect = innerWidth / innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(innerWidth, innerHeight);
      this.composer.setSize(innerWidth, innerHeight);
    });
    addEventListener('pointermove', (e) => {
      this.pointerRaw.set(
        (e.clientX / innerWidth) * 2 - 1,
        (e.clientY / innerHeight) * 2 - 1
      );
    });
  }

  add(obj) { this.scene.add(obj); }
  onTick(fn) { this.tickables.push(fn); }

  start() {
    const loop = () => {
      const t = this.clock.getElapsedTime();
      this.pointer.lerp(this.pointerRaw, 0.05);

      for (const fn of this.tickables) fn(t);

      // whisper of camera sway so fog and embers feel dimensional
      this.camera.position.x = this.pointer.x * 0.12;
      this.camera.position.y = -this.pointer.y * 0.08;
      this.camera.lookAt(0, 0, 0);

      this.composer.render();
      requestAnimationFrame(loop);
    };
    loop();
  }
}
