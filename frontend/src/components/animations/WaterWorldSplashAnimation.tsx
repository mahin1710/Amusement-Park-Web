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

    // --- 3D WATER SLIDE FLUME CHUTE ---
    const slidePoints = [
      new THREE.Vector3(-36, 16, -6),
      new THREE.Vector3(-22, 12, -2),
      new THREE.Vector3(-10, 4, 3),
      new THREE.Vector3(0, 8, 2),
      new THREE.Vector3(12, 1.5, 4),
      new THREE.Vector3(22, -1.8, 3),
      new THREE.Vector3(36, -2.0, -2),
    ];
    const slideCurve = new THREE.CatmullRomCurve3(slidePoints);

    const flumeMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      roughness: 0.1,
      metalness: 0.15,
      transmission: 0.65,
      ior: 1.45,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.9,
    });

    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.04,
      metalness: 0.08,
      transmission: 0.85,
      ior: 1.333,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.92,
    });

    const flumeGeo = new THREE.TubeGeometry(slideCurve, 80, 2.2, 18, false);
    const flumeMesh = new THREE.Mesh(flumeGeo, flumeMat);
    scene.add(flumeMesh);

    const waterStreamGeo = new THREE.TubeGeometry(slideCurve, 80, 1.6, 14, false);
    const waterStream = new THREE.Mesh(waterStreamGeo, waterMat);
    waterStream.position.y -= 0.2;
    scene.add(waterStream);

    // --- RIDER ON RAFT ---
    const riderGroup = new THREE.Group();
    scene.add(riderGroup);

    const raftMat = new THREE.MeshStandardMaterial({ color: 0xffd93d, roughness: 0.2 });
    const raftStripeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.35 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });

    const raft = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.6, 16, 28), raftMat);
    raft.rotation.x = Math.PI / 2;
    riderGroup.add(raft);

    const raftStripe = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.22, 16, 28), raftStripeMat);
    raftStripe.rotation.x = Math.PI / 2;
    riderGroup.add(raftStripe);

    const riderTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.4, 1.2, 10), shirtMat);
    riderTorso.position.y = 1.0;
    riderGroup.add(riderTorso);

    const riderHead = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 14), skinMat);
    riderHead.position.set(0, 1.9, 0);
    riderGroup.add(riderHead);

    const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.1, 8);
    const armL = new THREE.Mesh(armGeo, skinMat);
    armL.position.set(-0.7, 1.4, 0);
    armL.rotation.z = 0.7;
    riderGroup.add(armL);

    const armR = new THREE.Mesh(armGeo, skinMat);
    armR.position.set(0.7, 1.4, 0);
    armR.rotation.z = -0.7;
    riderGroup.add(armR);

    // Splash Particles
    const splashDroplets: { mesh: THREE.Mesh; vx: number; vy: number; vz: number; life: number; age: number }[] = [];
    const dropGeo = new THREE.DodecahedronGeometry(0.4, 1);
    const dropMat = new THREE.MeshPhysicalMaterial({ color: 0xbae6fd, transmission: 0.85, roughness: 0.05, clearcoat: 1.0 });

    for (let i = 0; i < 50; i++) {
      const drop = new THREE.Mesh(dropGeo, dropMat);
      drop.position.set(16 + (Math.random() - 0.5) * 8, -1 + Math.random() * 2, 3 + (Math.random() - 0.5) * 4);
      scene.add(drop);
      splashDroplets.push({
        mesh: drop,
        vx: (Math.random() - 0.4) * 10,
        vy: 6 + Math.random() * 12,
        vz: (Math.random() - 0.5) * 6,
        life: 0.9 + Math.random() * 0.4,
        age: Math.random() * 0.8,
      });
    }

    const startTime = performance.now();
    const duration = 4.5;
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Traversal along slide curve
      const pt = slideCurve.getPointAt(progress);
      const tang = slideCurve.getTangentAt(progress).normalize();
      riderGroup.position.copy(pt);
      riderGroup.position.y += 0.9;
      riderGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang);
      riderGroup.rotation.z += Math.sin(elapsed * 10) * 0.2;

      armL.rotation.x = Math.sin(elapsed * 16) * 0.4;
      armR.rotation.x = -Math.sin(elapsed * 16) * 0.4;

      // Update splash droplets
      splashDroplets.forEach((d) => {
        d.age += 0.016;
        if (d.age > d.life) d.age = 0;
        const t = d.age;
        d.mesh.position.y = -1.2 + d.vy * t - 0.5 * 24 * t * t;
      });

      renderer.render(scene, camera);

      if (progress < 1) {
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
          <span>WATER WORLD 3D WATER SLIDE RIDE!</span>
          <span className="text-2xl">🏄‍♂️</span>
        </div>
      </motion.div>
    </div>
  );
}
