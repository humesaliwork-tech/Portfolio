import * as THREE from 'three';

/**
 * The keyart stage: each chapter of the story is a cinematic crop of
 * one of the knight artworks, projected on a full-bleed plane and
 * displaced by a generated depth map — so the dark knight shifts
 * against the glowing portal under the pointer (fake-3D parallax),
 * while GSAP scrubs crops (uScale/uOffset), crossfades between
 * artworks, dims the stage for the gallery and flares the portal in
 * the finale.
 *
 * Art sources: local files in /public/img (add your own keyart there),
 * each with a remote fallback so the site works before they exist.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uTex;
  uniform sampler2D uDepth;
  uniform vec2 uParallax;
  uniform float uScale;
  uniform vec2 uOffset;
  uniform float uDim;
  uniform float uOpacity;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // cinematic crop
    vec2 uv = (vUv - 0.5) / uScale + 0.5 + uOffset;
    // depth parallax — the dark knight (near) slides over the portal (far)
    float d = texture2D(uDepth, uv).r;
    vec2 puv = uv + uParallax * (d - 0.42);
    puv = clamp(puv, vec2(0.001), vec2(0.999));
    vec3 col = texture2D(uTex, puv).rgb;

    // gentle breathing of the bright portal light
    float breathe = sin(uTime * 0.55) * 0.05;
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col += col * smoothstep(0.35, 1.0, lum) * breathe * 2.0;

    gl_FragColor = vec4(col * uDim, uOpacity);
  }
`;

class KeyartPlane {
  constructor(world, sources, index) {
    this.world = world;
    this.index = index;

    this.state = {
      scale: 1.1,
      offsetX: 0,
      offsetY: 0,
      dim: 1,
      opacity: index === 0 ? 1 : 0,
    };

    this.uniforms = {
      uTex: { value: null },
      uDepth: { value: null },
      uParallax: { value: new THREE.Vector2() },
      uScale: { value: 1.1 },
      uOffset: { value: new THREE.Vector2() },
      uDim: { value: 1 },
      uOpacity: { value: this.state.opacity },
      uTime: { value: 0 },
    };

    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
      })
    );
    this.mesh.renderOrder = index;
    this.mesh.visible = index === 0;
    this.imgAspect = 16 / 9;
    // portrait cover-crops land deep inside the bright portal — temper it
    this.mobileDim = matchMedia('(max-width: 760px)').matches ? 0.82 : 1;
    world.add(this.mesh);

    this.ready = this._load(sources);
  }

  async _load(sources) {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    for (const url of sources) {
      try {
        const tex = await loader.loadAsync(url);
        tex.colorSpace = THREE.SRGBColorSpace;
        this.uniforms.uTex.value = tex;
        this.imgAspect = tex.image.width / tex.image.height;
        this.uniforms.uDepth.value = makeDepthMap(tex.image);
        this.resize();
        return true;
      } catch {
        // try the next source
      }
    }
    return false;
  }

  /** cover the camera frustum at z=0, like background-size: cover */
  resize() {
    const cam = this.world.camera;
    const viewH = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z;
    const viewW = viewH * cam.aspect;
    const h = Math.max(viewH, viewW / this.imgAspect);
    this.mesh.scale.set(h * this.imgAspect, h, 1);
  }

  tick(t, pointer) {
    const u = this.uniforms;
    const s = this.state;
    u.uTime.value = t;
    u.uScale.value = s.scale;
    u.uOffset.value.set(s.offsetX, s.offsetY);
    u.uDim.value = s.dim * this.mobileDim;
    u.uOpacity.value = s.opacity;
    u.uParallax.value.set(pointer.x * 0.036, pointer.y * 0.022);
    this.mesh.visible = s.opacity > 0.004 && !!u.uTex.value;
  }
}

export class KeyartStage {
  /**
   * @param world World instance
   * @param arts  array of source-URL arrays, one per artwork slot
   */
  constructor(world, arts) {
    this.world = world;
    this.planes = arts.map((sources, i) => new KeyartPlane(world, sources, i));
    this.ready = Promise.all(this.planes.map((p) => p.ready));

    // finale flare — additive glow that blooms over the portal
    this.flareState = { value: 0 };
    this.flare = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshBasicMaterial({
        map: flareTexture(),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.flare.position.set(0, 0.3, 0.5);
    this.flare.renderOrder = 10;
    world.add(this.flare);

    addEventListener('resize', () => this.planes.forEach((p) => p.resize()));
    world.onTick((t) => {
      for (const p of this.planes) p.tick(t, world.pointer);
      this.flare.material.opacity =
        this.flareState.value * (0.7 + Math.sin(t * 2.1) * 0.08);
    });
  }

  /** how many artworks have finished (or failed) loading — for the loader bar */
  onProgress(cb) {
    let done = 0;
    for (const p of this.planes) p.ready.then(() => cb(++done, this.planes.length));
  }
}

function flareTexture(size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(190,255,225,0.9)');
  g.addColorStop(0.35, 'rgba(60,255,170,0.42)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Fake depth from luminance: in this keyart the glowing portal is the far
 * plane and the near-black knight the near plane, so blurred inverse
 * brightness is a serviceable depth map.
 */
function makeDepthMap(img) {
  const W = 160, H = 90;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, W, H);
  let src;
  try {
    src = ctx.getImageData(0, 0, W, H).data;
  } catch {
    // canvas tainted by a non-CORS remote image — flat depth, no parallax
    const flat = new Uint8Array(W * H).fill(128);
    const tex = new THREE.DataTexture(flat, W, H, THREE.RedFormat);
    tex.needsUpdate = true;
    return tex;
  }

  let depth = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const lum =
      (src[i * 4] * 0.299 + src[i * 4 + 1] * 0.587 + src[i * 4 + 2] * 0.114) / 255;
    depth[i] = 1 - lum; // dark = near
  }

  const blur = (data, radius) => {
    const a = new Float32Array(data.length);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        let sum = 0, n = 0;
        for (let k = -radius; k <= radius; k++) {
          sum += data[y * W + Math.min(W - 1, Math.max(0, x + k))];
          n++;
        }
        a[y * W + x] = sum / n;
      }
    const b = new Float32Array(data.length);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        let sum = 0, n = 0;
        for (let k = -radius; k <= radius; k++) {
          sum += a[Math.min(H - 1, Math.max(0, y + k)) * W + x];
          n++;
        }
        b[y * W + x] = sum / n;
      }
    return b;
  };
  depth = blur(depth, 4);
  depth = blur(depth, 2);

  const bytes = new Uint8Array(W * H);
  for (let i = 0; i < bytes.length; i++) bytes[i] = depth[i] * 255;
  const tex = new THREE.DataTexture(bytes, W, H, THREE.RedFormat);
  tex.minFilter = tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}
