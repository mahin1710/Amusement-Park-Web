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
    scene.fog = new THREE.FogExp2(0x0284c7, 0.015);

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(46, initW / initH, 0.1, 1000);
    camera.position.set(0, 8, 42);
    camera.lookAt(0, 3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.5);
    sunLight.position.set(20, 40, 25);
    scene.add(sunLight);

    const aquaLight = new THREE.PointLight(0x38bdf8, 3.5, 60);
    aquaLight.position.set(0, 10, 15);
    scene.add(aquaLight);

    // --- 1. CONTINUOUS 3D OCEAN WAVE SURGE (Curling Barrel & Crest) ---
    const waveGroup = new THREE.Group();
    scene.add(waveGroup);

    const wavePoints = [
      new THREE.Vector3(-36, -3, -4),
      new THREE.Vector3(-22, -1, -2),
      new THREE.Vector3(-8, 3.5, 1),
      new THREE.Vector3(2, 7.8, 4),   // Crest
      new THREE.Vector3(12, 3.5, 5),  // Barrel lip
      new THREE.Vector3(24, 0, 2),
      new THREE.Vector3(38, -2, -3),
    ];
    const waveCurve = new THREE.CatmullRomCurve3(wavePoints);

    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.78,
      ior: 1.333,
      reflectivity: 0.92,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.9,
    });

    const foamMat = new THREE.MeshStandardMaterial({
      color: 0xf0fdfa,
      roughness: 0.2,
      transparent: true,
      opacity: 0.88,
    });

    // Wave Body
    const waveBodyGeo = new THREE.TubeGeometry(waveCurve, 80, 3.2, 18, false);
    const waveBody = new THREE.Mesh(waveBodyGeo, waterMat);
    waveGroup.add(waveBody);

    // Frothy White Crest Tube
    const crestGeo = new THREE.TubeGeometry(waveCurve, 80, 1.1, 12, false);
    const crestMesh = new THREE.Mesh(crestGeo, foamMat);
    crestMesh.position.y += 0.5;
    waveGroup.add(crestMesh);

    // --- 2. LEAPING PLAYFUL DOLPHIN ---
    const dolphinMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.25 });
    const dolphinBellyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });

    const dolphin = new THREE.Group();
    dolphin.position.set(0, 9, 3.5);

    const dBody = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16), dolphinMat);
    dBody.scale.set(0.8, 0.75, 2.4);
    dolphin.add(dBody);

    const dBelly = new THREE.Mesh(new THREE.SphereGeometry(1.3, 14, 14), dolphinBellyMat);
    dBelly.scale.set(0.7, 0.5, 2.1);
    dBelly.position.set(0, -0.3, 0);
    dolphin.add(dBelly);

    const dFin = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.1, 4), dolphinMat);
    dFin.rotation.x = -0.5;
    dFin.position.set(0, 0.9, -0.3);
    dolphin.add(dFin);

    scene.add(dolphin);

    // --- 3. DYNAMIC WATER SPLASH DROPLETS ---
    const splashDroplets: { mesh: THREE.Mesh; vx: number; vy: number; vz: number; life: number; age: number }[] = [];
    const dropGeo = new THREE.DodecahedronGeometry(0.45, 1);
    const dropMat = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, roughness: 0.1, transparent: true, opacity: 0.9 });

    for (let i = 0; i < 70; i++) {
      const drop = new THREE.Mesh(dropGeo, dropMat);
      drop.position.set(-8 + Math.random() * 16, 3 + Math.random() * 4, 2 + Math.random() * 4);
      scene.add(drop);
      splashDroplets.push({
        mesh: drop,
        vx: 2 + Math.random() * 8,
        vy: 5 + Math.random() * 12,
        vz: (Math.random() - 0.5) * 5,
        life: 1.0 + Math.random() * 0.5,
        age: Math.random() * 0.8,
      });
    }

    // Floating Bubbles
    const bubbles: { mesh: THREE.Mesh; speed: number; x0: number; wFreq: number }[] = [];
    const bGeo = new THREE.SphereGeometry(0.5, 12, 12);
    const bMat = new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.6 });

    for (let i = 0; i < 35; i++) {
      const b = new THREE.Mesh(bGeo, bMat);
      const initX = -25 + Math.random() * 50;
      b.position.set(initX, Math.random() * 25, (Math.random() - 0.5) * 20);
      scene.add(b);
      bubbles.push({
        mesh: b,
        speed: 1.5 + Math.random() * 2.5,
        x0: initX,
        wFreq: 1 + Math.random() * 2,
      });
    }

    const startTime = performance.now();
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      // Wave undulation
      waveGroup.position.y = Math.sin(elapsed * 4) * 0.6;
      waveGroup.position.x = Math.sin(elapsed * 2) * 1.5;

      // Dolphin leaping arc
      const leap = (elapsed * 1.2) % 1;
      dolphin.position.y = 7.5 + Math.sin(leap * Math.PI) * 4.0;
      dolphin.position.x = -6 + leap * 12;
      dolphin.rotation.x = 0.4 - leap * 0.85;

      // Droplets physics
      splashDroplets.forEach((d) => {
        d.age += 0.016;
        if (d.age > d.life) d.age = 0;
        const t = d.age;
        d.mesh.position.y = 4 + d.vy * t - 0.5 * 24 * t * t;
      });

      // Bubbles rising
      bubbles.forEach((b) => {
        b.mesh.position.y += b.speed * 0.016;
        b.mesh.position.x = b.x0 + Math.sin(elapsed * b.wFreq) * 1.2;
        if (b.mesh.position.y > 25) b.mesh.position.y = -4;
      });

      renderer.render(scene, camera);
      animFrame = requestAnimationFrame(animate);
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
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none pointer-events-none">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full" />

      {/* Tropical Water Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0284C7]/50 via-[#38BDF8]/30 to-[#0369A1]/65 -z-10" />

      {/* Action Banner */}
      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: -6, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#0EA5E9] border-3 border-white text-white font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-pulse">🌊</span>
          <span>WATER WORLD TSUNAMI WAVES!</span>
          <span className="text-2xl animate-bounce">🐬</span>
        </div>
        <motion.span
          className="mt-2 text-xs sm:text-sm font-heading font-black text-sky-100 uppercase tracking-widest drop-shadow-md bg-black/40 px-4 py-1 rounded-full border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Bangladesh&apos;s Largest Ocean Wave Pool & Surf Kingdom
        </motion.span>
      </motion.div>
    </div>
  );
}
