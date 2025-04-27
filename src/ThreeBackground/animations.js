// src/ThreeBackground/animations.js
import * as THREE from 'three';

// AI Circuit animation function (embedded system)
export const animateCircuitAI = (circuitLines, nodes, clock) => {
  const time = clock.getElapsedTime();
  
  // Pulsing effect for circuit lines
  circuitLines.rotation.x += 0.005;  
  circuitLines.rotation.y += 0.005;  
  circuitLines.material.opacity = Math.abs(Math.sin(time * 0.5)) * 0.5;
  
  // Glowing effect on nodes (simulating AI interaction)
  nodes.forEach((node, index) => {
    node.scale.set(1 + Math.sin(time + index * 0.5) * 0.2, 1 + Math.cos(time + index * 0.5) * 0.2, 1);
    node.material.emissive.setHex(0x00ff00); // Green glow for AI interaction
  });
  
  // Change circuit line opacity dynamically (representing data flow)
  circuitLines.material.opacity = Math.abs(Math.sin(time * 0.3)) * 0.6;
};
