"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function WaterWorldSplashAnimation({ onComplete, isReducedMotion = false }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0284c7, 0.012);

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(60, initW / initH, 0.1, 1000);
    camera.position.set(0, 15, 25);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x335577, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // --- WATER PLANE GEOMETRY & MATERIAL ---
    const size = 50;
    const segments = 128;
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshStandardMaterial({
      color: 0x1e88e5,
      roughness: 0.2,
      metalness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.94,
    });

    const water = new THREE.Mesh(geometry, material);
    scene.add(water);

    const clock = new THREE.Clock();
    const posAttr = geometry.attributes.position;
    const originalPositions = posAttr.array.slice();

    const startTime = performance.now();
    const duration = 4.8;
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const time = clock.getElapsedTime();

      // Sum of sine waves for natural water movement
      for (let i = 0; i < posAttr.count; i++) {
        const x = originalPositions[i * 3];
        const z = originalPositions[i * 3 + 2];

        const wave1 = Math.sin(x * 0.3 + time * 1.5) * 0.5;
        const wave2 = Math.cos(z * 0.2 + time * 1.0) * 0.4;
        const wave3 = Math.sin((x + z) * 0.15 + time * 2.0) * 0.3;

        posAttr.setY(i, wave1 + wave2 + wave3);
      }

      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      renderer.render(scene, camera);

      if (elapsed < duration) {
        animFrame = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animFrame = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none pointer-events-none">
      <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0284C7]/50 via-[#38BDF8]/30 to-[#0369A1]/65 -z-10" />

      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: -6, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#0EA5E9] border-3 border-white text-white font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-pulse">🌊</span>
          <span>WATER WORLD 3D WATER WAVE SIMULATION!</span>
          <span className="text-2xl">✨</span>
        </div>
      </motion.div>
    </div>
  );
}
