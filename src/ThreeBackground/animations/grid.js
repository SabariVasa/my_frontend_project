import * as THREE from 'three';

export default function createGrid(scene, camera, color, density, speed) {
  const grid = new THREE.GridHelper(20, 40, color, color);
  scene.add(grid);

  return {
    objects: { grid },
    animateFn: ({ grid }) => {
      grid.rotation.x += 0.001 * speed;
      grid.rotation.z += 0.001 * speed;
    },
  };
}
