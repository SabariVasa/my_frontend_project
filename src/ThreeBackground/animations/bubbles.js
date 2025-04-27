import * as THREE from 'three';

export default function createBubbles(scene, camera, color, density, speed) {
  const bubbles = [];
  const bubbleCount = Math.floor(100 * density);
  const geometry = new THREE.SphereGeometry(0.1, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color });

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = new THREE.Mesh(geometry, material);
    bubble.position.set(
      (Math.random() - 0.5) * 10,
      Math.random() * 5 - 2.5,
      (Math.random() - 0.5) * 5
    );
    scene.add(bubble);
    bubbles.push(bubble);
  }

  return {
    objects: { bubbles },
    animateFn: ({ bubbles }) => {
      for (let b of bubbles) {
        b.position.y += 0.01 * speed;
        if (b.position.y > 3) b.position.y = -3;
      }
    },
  };
}
