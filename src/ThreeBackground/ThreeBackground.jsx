import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackground = ({ color = "#00ffff", speed = 1 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#060818");

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    // Lights
    const ambientLight = new THREE.AmbientLight(color, 0.4);
    const pointLight = new THREE.PointLight(color, 1.2);
    pointLight.position.set(0, 0, 10);
    scene.add(ambientLight, pointLight);

    // Main group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Helpers
    const createArcSegment = (radius, startAngle, endAngle) => {
      const curve = new THREE.ArcCurve(0, 0, radius, startAngle, endAngle, false);
      const points = curve.getPoints(60);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color,
        linewidth: 20,
        transparent: true,
        opacity: 0.9
      });
      geometry.attributes.position.array.forEach((_, index) => {
        if (index % 2 === 1) {
          geometry.attributes.position.array[index] *= 1.1; // Increase this multiplier for line height
        }
      });
      return new THREE.Line(geometry, material);
    };

    const createSteppedCircle = (radius, segments, rotationSpeed = 1) => {
      const group = new THREE.Group();
      const gap = Math.PI / 40;
      const angleStep = (Math.PI * 2) / segments;

      for (let i = 0; i < segments; i++) {
        const start = i * angleStep;
        const end = start + angleStep - gap;
        const arc = createArcSegment(radius, start, end);
        group.add(arc);
      }

      group.userData.rotationSpeed = rotationSpeed;
      return group;
    };

    // Add circles
    const circles = [
      createSteppedCircle(2.2, 4, 0.3),
      createSteppedCircle(1.7, 3, -0.4),
      createSteppedCircle(1.2, 2, 0.5),
      createSteppedCircle(0.7, 8, -0.7)
    ];
    circles.forEach(circle => mainGroup.add(circle));

    // Align mainGroup to the right
    mainGroup.position.x = 6; // ⭐ Shift circles to right (tune this value)
    mainGroup.position.y = -1; // Optional: slight up/down adjustment

    // Hover effect state
    let hover = false;
    mount.addEventListener("mouseenter", () => (hover = true));
    mount.addEventListener("mouseleave", () => (hover = false));

    // Animate
    const animate = () => {
        requestAnimationFrame(animate);
      
        const elapsed = clock.getElapsedTime();
      
        // 👉 When hovering, reduce the rotation speed
        const rotationSpeedMultiplier = hover ? 0.4 : 1; 
        // 0.4 = 40% speed during hover. (You can tweak it)
      
        circles.forEach(group => {
          group.rotation.z = elapsed * speed * group.userData.rotationSpeed * rotationSpeedMultiplier;
        });
      
        const targetRotationX = hover ? 0.3 : 0;
        const targetRotationY = hover ? 0.3 : 0;
      
        const smoothness = 0.015; // Slow tilt speed
        // mainGroup.rotation.x += (-targetRotationX + mainGroup.rotation.x) * smoothness;
        // mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * smoothness;
      
        renderer.render(scene, camera);
    };          
    animate();
    // if (hover) {
    //     animate();
    // }
    

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [color, speed]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
      }}
    />
  );
};

export default ThreeBackground;
