import * as THREE from 'three';
import { radialTexture } from './World.js';

/**
 * The emerald gate: an arch of light drawn in a shader,
 * backed by a soft halo. `uniforms.uBoost` is driven by the
 * scroll story (the portal flares in the final chapter).
 */
export class Portal {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, 0, -5);

    this.uniforms = {
      uTime: { value: 0 },
      uBoost: { value: 1 },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform float uBoost;
        varying vec2 vUv;

        void main() {
          // plane space: x in [-2.6, 2.6], y in [0, 8]
          vec2 p = vec2((vUv.x - 0.5) * 5.2, vUv.y * 8.0);

          // arch SDF: straight sides up to y=4.2, semicircle above
          float a = 1.5; // arch half-width
          float d;
          if (p.y < 4.2) {
            d = abs(p.x) - a;
          } else {
            d = length(p - vec2(0.0, 4.2)) - a;
          }

          float pulse = 1.0 + 0.06 * sin(uTime * 1.4) + 0.03 * sin(uTime * 3.7);

          // bright core, kept inside the arch
          float core = smoothstep(0.1, -0.4, d);
          // tight aura with faint banding
          float aura = exp(-max(d, 0.0) * 2.4) * 0.45;
          aura *= 1.0 + 0.12 * sin(d * 9.0 - uTime * 0.9);

          // fade the light near the floor line
          float floorFade = smoothstep(0.0, 0.55, p.y);

          vec3 coreCol = vec3(0.58, 1.0, 0.78);
          vec3 auraCol = vec3(0.1, 0.9, 0.5);

          vec3 col = (coreCol * core * 1.1 + auraCol * aura) * pulse * uBoost;
          float alpha = clamp((core * 1.2 + aura * 0.8) * floorFade, 0.0, 1.0) * min(uBoost, 1.4);

          gl_FragColor = vec4(col * floorFade, alpha);
        }
      `,
    });

    this.arch = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 8), mat);
    this.arch.position.y = 4;
    this.group.add(this.arch);

    // ambient halo behind the arch
    const haloTex = radialTexture([
      [0, 'rgba(60,255,170,0.5)'],
      [0.4, 'rgba(25,140,90,0.18)'],
      [1, 'rgba(0,0,0,0)'],
    ], 512);
    this.halo = new THREE.Mesh(
      new THREE.PlaneGeometry(11, 12),
      new THREE.MeshBasicMaterial({
        map: haloTex,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.halo.position.set(0, 4.4, -0.6);
    this.group.add(this.halo);
  }

  tick(t) {
    this.uniforms.uTime.value = t;
    this.halo.material.opacity =
      (0.27 + Math.sin(t * 0.8) * 0.04) * this.uniforms.uBoost.value;
  }
}
