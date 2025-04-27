import * as THREE from 'three';

export default function createCircuit(scene, camera, color, density, speed) {
  const lines = [];
  const lineCount = Math.floor(200 * density);
  const material = new THREE.LineBasicMaterial({ color });

  for (let i = 0; i < lineCount; i++) {
    const points = [
      new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, 0),
      new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    lines.push(line);
  }

  return {
    objects: { lines },
    animateFn: ({ lines }) => {
      lines.forEach((line, i) => {
        line.rotation.z += 0.001 * speed * (i % 2 === 0 ? 1 : -1);
      });
    },
  };
}
