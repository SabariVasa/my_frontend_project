import * as THREE from 'three';

export default function createWaves(scene, camera, color, density, speed) {
  const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
  const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
  camera.position.z = 7;

  return {
    objects: { plane, geometry },
    animateFn: ({ geometry }) => {
      const time = performance.now() * 0.001 * speed;
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        geometry.attributes.position.setZ(i, Math.sin(x * 2 + time) + Math.cos(y * 2 + time));
      }
      geometry.attributes.position.needsUpdate = true;
    },
  };
}
