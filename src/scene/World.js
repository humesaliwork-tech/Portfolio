import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/** Soft radial-gradient texture, used for halos and ground mist. */
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
    this.scene.fog = new THREE.FogExp2(0x020806, 0.042);

    this.camera = new THREE.PerspectiveCamera(
      40, innerWidth / innerHeight, 0.1, 80
    );

    // Camera state driven by the scroll story; parallax is layered on top.
    this.camState = {
      px: 0, py: 1.6, pz: 9.6,
      tx: 0, ty: 2.0, tz: 0,
    };
    this.lookTarget = new THREE.Vector3();

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, this.isMobile ? 1.5 : 2));
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this._buildLights();
    this._buildGround();
    this._buildMist();
    this._buildComposer();
    this._bindEvents();
  }

  _buildLights() {
    // Emerald blaze pouring out of the portal behind the knight.
    this.portalLight = new THREE.PointLight(0x2bff9e, 45, 40, 2);
    this.portalLight.position.set(0, 2.6, -4.2);
    this.scene.add(this.portalLight);

    // Faint cold fill so the armour front isn't pure void.
    this.fillLight = new THREE.DirectionalLight(0x2a4a3e, 0.55);
    this.fillLight.position.set(3.5, 5, 7);
    this.scene.add(this.fillLight);

    this.hemi = new THREE.HemisphereLight(0x11362a, 0x000000, 0.4);
    this.scene.add(this.hemi);
  }

  _buildGround() {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x050b09,
      roughness: 0.65,
      metalness: 0.25,
    });
    const ground = new THREE.Mesh(new THREE.CircleGeometry(40, 48), mat);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    // Light spill from the portal across the floor.
    const spillTex = radialTexture([
      [0, 'rgba(80,255,175,0.85)'],
      [0.35, 'rgba(35,180,115,0.35)'],
      [1, 'rgba(0,0,0,0)'],
    ]);
    this.spill = new THREE.Mesh(
      new THREE.PlaneGeometry(11, 15),
      new THREE.MeshBasicMaterial({
        map: spillTex,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.spill.rotation.x = -Math.PI / 2;
    this.spill.position.set(0, 0.02, -1.6);
    this.scene.add(this.spill);
  }

  _buildMist() {
    const tex = radialTexture([
      [0, 'rgba(90,200,150,0.16)'],
      [0.6, 'rgba(60,140,105,0.06)'],
      [1, 'rgba(0,0,0,0)'],
    ]);
    this.mist = new THREE.Group();
    const spots = [
      [-3.4, 0.9, -1.5, 9, 3.4],
      [3.6, 0.7, -2.5, 8, 3],
      [0, 1.1, -3.6, 12, 4],
    ];
    for (const [x, y, z, w, h] of spots) {
      const m = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.55,
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
        m.position.x = m.userData.baseX + Math.sin(t * 0.07 + m.userData.seed) * 1.2;
        m.material.opacity = 0.42 + Math.sin(t * 0.11 + m.userData.seed * 2) * 0.14;
      }
    });
  }

  _buildComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(innerWidth, innerHeight),
      0.55,  // strength
      0.8,   // radius
      0.72   // threshold
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
      // Ease the pointer for a heavy, cinematic parallax.
      this.pointer.lerp(this.pointerRaw, 0.045);

      for (const fn of this.tickables) fn(t);

      const s = this.camState;
      this.camera.position.set(
        s.px + this.pointer.x * 0.55,
        s.py - this.pointer.y * 0.3,
        s.pz
      );
      this.lookTarget.set(s.tx + this.pointer.x * 0.2, s.ty, s.tz);
      this.camera.lookAt(this.lookTarget);

      this.composer.render();
      requestAnimationFrame(loop);
    };
    loop();
  }
}
