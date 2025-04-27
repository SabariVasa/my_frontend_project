import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeLoader = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;
    let circle;
    const radius = 2;

    const init = () => {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;  // Distance from the loader to camera

      // Renderer setup
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Lighting setup
      const pointLight = new THREE.PointLight(0xFFFFFF, 2, 50);
      pointLight.position.set(0, 0, 5);
      scene.add(pointLight);

      // Create the arc reactor (central ring with inner glowing effects)
      const material = new THREE.MeshStandardMaterial({
        color: 0x00FF00,
        emissive: 0x00FF00,
        emissiveIntensity: 1,
        wireframe: true
      });

      // Create a ring for the arc reactor
      const geometry = new THREE.RingGeometry(radius, radius + 0.2, 32);
      circle = new THREE.Mesh(geometry, material);
      scene.add(circle);

      // Add rotating inner circles (glowing rings)
      for (let i = 0; i < 5; i++) {
        const innerMaterial = new THREE.MeshStandardMaterial({
          color: 0xFFFFFF,
          emissive: 0x00FF00,
          emissiveIntensity: 0.5,
          wireframe: true,
        });
        const innerCircle = new THREE.Mesh(new THREE.RingGeometry(radius * (i + 0.5), radius * (i + 0.6), 32), innerMaterial);
        scene.add(innerCircle);
      }

      // Resize handler for the canvas
      window.addEventListener('resize', onWindowResize, false);
      animate();
    };

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the arc reactor
      if (circle) {
        circle.rotation.z += 0.01;  // Slowly rotate the main circle
      }

      // Render the scene
      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (renderer) renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }} />;
};

export default ThreeLoader;
