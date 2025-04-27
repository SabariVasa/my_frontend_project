import * as THREE from 'three';

export default function createParticles(scene, camera, color, density, speed) {
  const count = Math.floor(1000 * density);
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color, size: 0.05 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  return {
    objects: { points },
    animateFn: ({ points }) => {
      points.rotation.y += 0.001 * speed;
    },
  };
}
