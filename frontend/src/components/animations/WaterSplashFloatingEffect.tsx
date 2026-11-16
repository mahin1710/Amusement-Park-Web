"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function WaterSplashFloatingEffect({ onComplete, isReducedMotion = false }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isReducedMotion) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }

    const container = mountRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP (100% Transparent) ---
    const scene = new THREE.Scene();

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(46, initW / initH, 0.1, 1000);
    camera.position.set(0, 4, 34);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0); // Completely transparent
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.0);
    sunLight.position.set(15, 30, 25);
    scene.add(sunLight);

    const aquaPoint = new THREE.PointLight(0x38bdf8, 3, 50);
    aquaPoint.position.set(0, 10, 15);
    scene.add(aquaPoint);

    // --- MAIN WATER SURGE HIERARCHY ---
    const waterSystemGroup = new THREE.Group();
    scene.add(waterSystemGroup);

    // 1. Curving Water Wave Tube
    const wavePoints = [
      new THREE.Vector3(-14, -6, -4),
      new THREE.Vector3(-8, -2, -2),
      new THREE.Vector3(-2, 2.5, 0),
      new THREE.Vector3(3, 4.0, 2),
      new THREE.Vector3(8, 1.5, 1),
      new THREE.Vector3(14, -4, -3),
    ];
    const waveCurve = new THREE.CatmullRomCurve3(wavePoints);
    const waveGeo = new THREE.TubeGeometry(waveCurve, 60, 2.4, 16, false);
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.25,
      transparent: true,
      opacity: 0.82,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waterSystemGroup.add(waveMesh);

    // Frothy White Wave Crest
    const crestGeo = new THREE.TubeGeometry(waveCurve, 60, 1.2, 12, false);
    const crestMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.75,
    });
    const crestMesh = new THREE.Mesh(crestGeo, crestMat);
    crestMesh.position.y += 0.8;
    waterSystemGroup.add(crestMesh);

    // 2. Cartoon Character Surfing on Inflatable Ring
    const riderGroup = new THREE.Group();
    riderGroup.position.set(2, 4.8, 2);

    // Inflatable Torus Ring
    const tubeGeo = new THREE.TorusGeometry(1.4, 0.55, 14, 24);
    const tubeMat = new THREE.MeshToonMaterial({ color: 0xffd93d, transparent: true, opacity: 0.95 });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    tubeMesh.rotation.x = Math.PI / 2;
    riderGroup.add(tubeMesh);

    // Cartoon Character Head
    const headGeo = new THREE.SphereGeometry(0.9, 18, 18);
    const skinMat = new THREE.MeshToonMaterial({ color: 0xfed7aa, transparent: true, opacity: 0.95 });
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.set(0, 1.1, 0);
    riderGroup.add(headMesh);

    // Blue Swimming Goggles
    const goggleMat = new THREE.MeshToonMaterial({ color: 0x0284c7, transparent: true, opacity: 0.95 });
    const goggle1 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 10, 18), goggleMat);
    goggle1.position.set(-0.35, 1.2, 0.85);
    riderGroup.add(goggle1);

    const goggle2 = goggle1.clone();
    goggle2.position.set(0.35, 1.2, 0.85);
    riderGroup.add(goggle2);

    // Raised Waving Arms
    const armGeo = new THREE.CylinderGeometry(0.18, 0.18, 1.2, 8);
    const leftArm = new THREE.Mesh(armGeo, skinMat);
    leftArm.position.set(-1.2, 1.6, 0);
    leftArm.rotation.z = 0.7;
    riderGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, skinMat);
    rightArm.position.set(1.2, 1.6, 0);
    rightArm.rotation.z = -0.7;
    riderGroup.add(rightArm);

    waterSystemGroup.add(riderGroup);

    // 3. Flying 3D Water Droplets
    const dropletCount = 130;
    const dropletGeo = new THREE.DodecahedronGeometry(0.32, 1);
    const dropletMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });

    const droplets: {
      mesh: THREE.Mesh;
      vel: THREE.Vector3;
      originX: number;
      originY: number;
      originZ: number;
      gravity: number;
      lifetime: number;
      age: number;
    }[] = [];

    for (let i = 0; i < dropletCount; i++) {
      const dMesh = new THREE.Mesh(dropletGeo, dropletMat.clone());
      const origX = (Math.random() - 0.5) * 12;
      const origY = Math.random() * 3 + 1;
      const origZ = (Math.random() - 0.5) * 6;
      dMesh.position.set(origX, origY, origZ);
      waterSystemGroup.add(dMesh);

      droplets.push({
        mesh: dMesh,
        vel: new THREE.Vector3(
          (Math.random() - 0.3) * 8,
          Math.random() * 8 + 4,
          (Math.random() - 0.5) * 6
        ),
        originX: origX,
        originY: origY,
        originZ: origZ,
        gravity: 0.25,
        lifetime: Math.random() * 1.5 + 1.0,
        age: Math.random() * 1.5,
      });
    }

    // 4. Subtle Floating Bubbles
    const bubbleCount = 35;
    const bubbleGeo = new THREE.SphereGeometry(0.42, 14, 14);
    const bubbleMat = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.6,
    });
    const bubbleMeshes: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      wobbleSpeed: number;
      speedY: number;
    }[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      const bMesh = new THREE.Mesh(bubbleGeo, bubbleMat.clone());
      const bx = (Math.random() - 0.5) * 18;
      const by = Math.random() * 8 - 2;
      const bz = (Math.random() - 0.5) * 10;
      bMesh.position.set(bx, by, bz);
      waterSystemGroup.add(bMesh);

      bubbleMeshes.push({
        mesh: bMesh,
        baseX: bx,
        baseY: by,
        wobbleSpeed: Math.random() * 3 + 1,
        speedY: Math.random() * 2 + 1,
      });
    }

    // --- ANIMATION TIMELINE (Traversing across screen from Left to Right) ---
    const startTime = performance.now();
    const duration = 4.0; // 4.0 seconds total traversal
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Horizontal travel: x goes from -34 (left offscreen) to +34 (right offscreen)
      const currentX = -34 + progress * 68;
      // Gentle wavy path vertically
      const currentY = Math.sin(progress * Math.PI * 3) * 1.5;
      waterSystemGroup.position.set(currentX, currentY, 0);

      // Rider gentle banking
      riderGroup.rotation.z = Math.sin(elapsed * 8) * 0.25;
      leftArm.rotation.x = Math.sin(elapsed * 12) * 0.4;
      rightArm.rotation.x = -Math.sin(elapsed * 12) * 0.4;

      // Update 3D droplets physics
      droplets.forEach((d) => {
        d.age += 0.016;
        if (d.age > d.lifetime) {
          d.age = 0;
          d.mesh.position.set(d.originX, d.originY, d.originZ);
          d.vel.set(
            (Math.random() - 0.3) * 8,
            Math.random() * 8 + 4,
            (Math.random() - 0.5) * 6
          );
        } else {
          d.mesh.position.x += d.vel.x * 0.016;
          d.mesh.position.y += d.vel.y * 0.016;
          d.mesh.position.z += d.vel.z * 0.016;
          d.vel.y -= d.gravity;
        }
      });

      // Update floating bubbles
      bubbleMeshes.forEach((b) => {
        b.mesh.position.y += b.speedY * 0.016;
        b.mesh.position.x = b.baseX + Math.sin(elapsed * b.wobbleSpeed) * 0.8;
        if (b.mesh.position.y > 8) {
          b.mesh.position.y = -3;
        }
      });

      // Smooth Fade-out as it approaches the right edge (after 68% progress)
      let overallOpacity = 1;
      if (progress > 0.68) {
        overallOpacity = Math.max(0, 1 - (progress - 0.68) / 0.32);
      }

      waveMat.opacity = 0.82 * overallOpacity;
      crestMat.opacity = 0.75 * overallOpacity;
      tubeMat.opacity = 0.95 * overallOpacity;
      skinMat.opacity = 0.95 * overallOpacity;
      dropletMat.opacity = 0.85 * overallOpacity;
      bubbleMat.opacity = 0.6 * overallOpacity;

      renderer.render(scene, camera);

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        // Complete & Clean up
        setIsVisible(false);
        onComplete?.();
      }
    };

    animFrame = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
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
  }, [onComplete, isReducedMotion]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      data-purpose="floating-water-splash-layer"
    >
      {/* 3D WebGL Canvas for Floating Water Splash */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Realm Announcement Pill (Top-Center, non-blocking) */}
      <motion.div
        className="absolute top-20 sm:top-24 inset-x-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: -15, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-15, 0, 0, -10], scale: [0.9, 1, 1, 0.95] }}
        transition={{ duration: 3.8, times: [0, 0.15, 0.8, 1], ease: "easeInOut" }}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 text-[#0284C7] border-2 border-[#38BDF8]/50 shadow-xl backdrop-blur-md font-heading font-black text-xs sm:text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#0EA5E9] animate-spin" />
          <span>Water World • Aqua Splash Stream</span>
          <span className="text-base">🌊</span>
        </div>
      </motion.div>
    </div>
  );
}
