import * as THREE from 'three';

/**
 * Drifting embers / dust motes, twinkling in the portal light.
 */
export class Particles {
  constructor(count = 420) {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);

    // embers live in front of the keyart plane (z > 0)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7.4;
      positions[i * 3 + 2] = 0.3 + Math.random() * 3.4;
      seeds[i] = Math.random() * 100;
      sizes[i] = 0.35 + Math.random() * 1.1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    this.uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(devicePixelRatio, 2) },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aSeed;
        attribute float aSize;
        varying float vTwinkle;

        void main() {
          vec3 p = position;
          float t = uTime * 0.16;
          // slow rise with wrap across the viewport band
          p.y = mod(p.y + 3.7 + t * (0.4 + fract(aSeed) * 0.6), 7.4) - 3.7;
          p.x += sin(uTime * 0.25 + aSeed) * 0.5;
          p.z += cos(uTime * 0.18 + aSeed * 1.7) * 0.3;

          vTwinkle = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.8 + fract(aSeed * 0.13) * 1.6) + aSeed));

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * 26.0 * uPixelRatio / -mv.z;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vTwinkle;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float glow = smoothstep(0.5, 0.0, d);
          vec3 col = mix(vec3(0.25, 1.0, 0.62), vec3(0.8, 1.0, 0.9), vTwinkle * 0.5);
          gl_FragColor = vec4(col, glow * glow * vTwinkle * 0.85);
        }
      `,
    });

    this.points = new THREE.Points(geo, mat);
  }

  tick(t) {
    this.uniforms.uTime.value = t;
  }
}
