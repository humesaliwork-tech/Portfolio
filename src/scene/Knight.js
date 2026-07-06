import * as THREE from 'three';

/**
 * A dark sentinel assembled from primitives — read as a silhouette
 * rim-lit by the portal behind him, in the spirit of the reference:
 * head bowed, both gauntlets resting on a greatsword, tattered cape.
 * Total height ≈ 3.4 units, standing on y = 0, facing +z.
 */
export class Knight {
  constructor() {
    this.group = new THREE.Group();

    this.armorMat = new THREE.MeshStandardMaterial({
      color: 0x131c18,
      metalness: 0.88,
      roughness: 0.38,
    });
    this.clothMat = new THREE.MeshStandardMaterial({
      color: 0x050a08,
      metalness: 0.15,
      roughness: 0.92,
      side: THREE.DoubleSide,
    });
    this.steelMat = new THREE.MeshStandardMaterial({
      color: 0x39463f,
      metalness: 0.95,
      roughness: 0.28,
    });
    this.gemMat = new THREE.MeshStandardMaterial({
      color: 0x0a1f16,
      emissive: 0x2bff9e,
      emissiveIntensity: 1.6,
      roughness: 0.3,
    });

    this._buildLegs();
    this._buildTorso();
    this._buildArmsAndSword();
    this._buildHead();
    this._buildCape();
  }

  /* helper: cylinder from a → b */
  _limb(a, b, r1, r2, mat = this.armorMat) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(r2, r1, len, 12),
      mat
    );
    mesh.position.copy(a).addScaledVector(dir, 0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    this.group.add(mesh);
    return mesh;
  }

  _add(geo, mat, x, y, z, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    m.rotation.set(rx, ry, rz);
    this.group.add(m);
    return m;
  }

  _buildLegs() {
    for (const side of [-1, 1]) {
      const x = side * 0.24;
      // thigh + greave with a slight stance
      this._limb(new THREE.Vector3(x, 1.62, 0), new THREE.Vector3(x * 1.25, 0.9, 0.05), 0.16, 0.13);
      this._limb(new THREE.Vector3(x * 1.25, 0.9, 0.05), new THREE.Vector3(x * 1.35, 0.12, 0.02), 0.13, 0.15);
      // knee cop
      this._add(new THREE.SphereGeometry(0.15, 12, 10), this.armorMat, x * 1.25, 0.9, 0.07, 1, 0.9, 1);
      // sabaton
      this._add(new THREE.BoxGeometry(0.24, 0.16, 0.5), this.armorMat, x * 1.35, 0.08, 0.12);
    }
    // faulds / hip skirt
    this._add(
      new THREE.CylinderGeometry(0.46, 0.68, 0.55, 18, 1, true),
      this.armorMat, 0, 1.5, 0, 1, 1, 0.82
    );
  }

  _buildTorso() {
    // cuirass
    this.torso = this._add(
      new THREE.CylinderGeometry(0.52, 0.4, 1.1, 18),
      this.armorMat, 0, 2.2, 0, 1, 1, 0.74
    );
    // chest ridge
    this._add(new THREE.BoxGeometry(0.07, 0.95, 0.1), this.armorMat, 0, 2.22, 0.36, 1, 1, 1, 0.06);
    // belt
    this._add(new THREE.TorusGeometry(0.44, 0.05, 8, 20), this.steelMat, 0, 1.72, 0, 1, 1, 1, Math.PI / 2);
    // belt clasp gem
    this._add(new THREE.OctahedronGeometry(0.07), this.gemMat, 0, 1.72, 0.37);
    // pauldrons — two plates each
    for (const side of [-1, 1]) {
      this._add(new THREE.SphereGeometry(0.3, 14, 12), this.armorMat, side * 0.62, 2.62, 0, 1.15, 0.82, 1.05);
      this._add(new THREE.SphereGeometry(0.24, 14, 12), this.armorMat, side * 0.72, 2.48, 0, 1.1, 0.7, 1);
    }
  }

  _buildArmsAndSword() {
    // Greatsword planted point-down in front: pommel ~y1.9
    const grip = new THREE.Vector3(0, 1.78, 0.52);

    for (const side of [-1, 1]) {
      const shoulder = new THREE.Vector3(side * 0.6, 2.55, 0.04);
      const elbow = new THREE.Vector3(side * 0.46, 2.05, 0.3);
      const hand = new THREE.Vector3(side * 0.1, 1.86, 0.5);
      this._limb(shoulder, elbow, 0.11, 0.09);
      this._limb(elbow, hand, 0.09, 0.1);
      // gauntlet
      this._add(new THREE.BoxGeometry(0.16, 0.18, 0.18), this.armorMat, hand.x, hand.y - 0.02, hand.z);
    }

    // pommel
    this._add(new THREE.SphereGeometry(0.08, 10, 10), this.steelMat, grip.x, 1.98, grip.z);
    // grip
    this._limb(new THREE.Vector3(0, 1.96, 0.52), new THREE.Vector3(0, 1.62, 0.52), 0.04, 0.04, this.clothMat);
    // crossguard
    this._add(new THREE.BoxGeometry(0.6, 0.055, 0.09), this.steelMat, 0, 1.6, 0.52);
    this._add(new THREE.OctahedronGeometry(0.055), this.gemMat, 0, 1.6, 0.57);
    // blade — diamond cross-section, tapering to the floor
    const blade = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.012, 1.55, 4, 1),
      this.steelMat
    );
    blade.position.set(0, 0.8, 0.52);
    blade.rotation.y = Math.PI / 4;
    blade.scale.z = 0.35;
    this.group.add(blade);
  }

  _buildHead() {
    this.head = new THREE.Group();
    this.head.position.set(0, 2.92, 0.06);

    const helm = new THREE.Mesh(
      new THREE.SphereGeometry(0.27, 18, 14),
      this.armorMat
    );
    helm.scale.set(0.92, 1.12, 1);
    this.head.add(helm);

    // visor
    const visor = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.09, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x01110a, roughness: 0.9 })
    );
    visor.position.set(0, 0.02, 0.18);
    this.head.add(visor);

    // crest ridge
    const crest = new THREE.Mesh(
      new THREE.BoxGeometry(0.035, 0.34, 0.42),
      this.steelMat
    );
    crest.position.set(0, 0.22, -0.02);
    crest.rotation.x = -0.18;
    this.head.add(crest);

    // gorget
    const gorget = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.3, 0.28, 14),
      this.armorMat
    );
    gorget.position.set(0, -0.3, 0);
    this.head.add(gorget);

    this.head.rotation.x = 0.34; // head bowed
    this.group.add(this.head);
  }

  _buildCape() {
    const COLS = 24, ROWS = 32;
    const geo = new THREE.PlaneGeometry(1, 1, COLS, ROWS);
    const pos = geo.attributes.position;

    // Precompute a torn bottom edge per column.
    const tear = [];
    for (let i = 0; i <= COLS; i++) {
      tear.push(
        Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.55
      );
    }

    this.capeBase = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i) + 0.5;       // 0..1 across
      const v = pos.getY(i) + 0.5;       // 0 bottom … 1 top
      const col = Math.round(u * COLS);

      const width = THREE.MathUtils.lerp(2.6, 1.05, v);
      const x = (u - 0.5) * width;
      let y = 2.78 - (1 - v) * 2.62;
      // ragged hem — pull the lowest rows up by the tear amount
      const hem = Math.max(0, 1 - v * 6);
      y += tear[col] * hem;
      const z = -0.34 - (1 - v) * (1 - v) * 1.05;

      this.capeBase[i * 3] = x;
      this.capeBase[i * 3 + 1] = y;
      this.capeBase[i * 3 + 2] = z;
      pos.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();

    this.cape = new THREE.Mesh(geo, this.clothMat);
    this.group.add(this.cape);
  }

  /** breathe + wind, called every frame */
  tick(t) {
    // breathing
    this.torso.position.y = 2.2 + Math.sin(t * 0.85) * 0.012;
    this.head.rotation.x = 0.34 + Math.sin(t * 0.85 + 0.6) * 0.02;

    // cape wind
    const pos = this.cape.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const bx = this.capeBase[i * 3];
      const by = this.capeBase[i * 3 + 1];
      const bz = this.capeBase[i * 3 + 2];
      const sag = THREE.MathUtils.clamp((2.78 - by) / 2.6, 0, 1); // 0 top → 1 hem
      const w =
        Math.sin(by * 2.1 + t * 1.5) * 0.1 +
        Math.sin(bx * 2.6 + t * 2.2 + by) * 0.07;
      const sway = Math.sin(t * 0.7 + by * 0.8) * 0.12;
      pos.setXYZ(
        i,
        bx + sway * sag * sag,
        by,
        bz + w * sag
      );
    }
    pos.needsUpdate = true;
    this.cape.geometry.computeVertexNormals();
  }
}
