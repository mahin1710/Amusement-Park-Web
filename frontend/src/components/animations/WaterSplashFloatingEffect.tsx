"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";

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

    // --- THREE.JS SCENE SETUP (100% Transparent Overlay) ---
    const scene = new THREE.Scene();

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(54, initW / initH, 0.1, 1000);
    camera.position.set(0, 14, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0); // 100% transparent overlay
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x335577, 1.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(10, 25, 12);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.5);
    cyanRim.position.set(-20, 15, -12);
    scene.add(cyanRim);

    const sunGlint = new THREE.DirectionalLight(0xfef08a, 1.2);
    sunGlint.position.set(25, 30, 20);
    scene.add(sunGlint);

    // Group for horizontal traversal across screen
    const waveGroup = new THREE.Group();
    scene.add(waveGroup);

    // --- 3D WATER PLANE GEOMETRY & MATERIAL ---
    const size = 54;
    const segments = 128;
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    geometry.rotateX(-Math.PI / 2.35); // Slanted towards camera for deep 3D perspective

    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e88e5, // True oceanic blue
      roughness: 0.18,
      metalness: 0.12,
      wireframe: false,
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide,
    });

    const water = new THREE.Mesh(geometry, waterMaterial);
    water.position.set(0, -1.0, 0);
    waveGroup.add(water);

    const posAttr = geometry.attributes.position;
    const originalPositions = posAttr.array.slice();

    // --- SECONDARY FOAM CREST & SPRAY DROPLETS ---
    const dropletMat = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.9,
    });

    const dropletGeo = new THREE.DodecahedronGeometry(0.35, 1);
    const droplets: { mesh: THREE.Mesh; vx: number; vy: number; vz: number; life: number; age: number }[] = [];

    for (let i = 0; i < 45; i++) {
      const drop = new THREE.Mesh(dropletGeo, dropletMat);
      drop.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 4 + 1,
        (Math.random() - 0.5) * 30
      );
      waveGroup.add(drop);
      droplets.push({
        mesh: drop,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 6 + 3,
        vz: (Math.random() - 0.5) * 4,
        life: 0.8 + Math.random() * 0.4,
        age: Math.random() * 0.8,
      });
    }

    // Shimmering Floating Bubbles
    const bubbleGeo = new THREE.SphereGeometry(0.4, 12, 12);
    const bubbleMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.05,
      metalness: 0.3,
      transparent: true,
      opacity: 0.65,
    });
    const bubbles: { mesh: THREE.Mesh; riseSpeed: number; wobblePhase: number }[] = [];

    for (let i = 0; i < 30; i++) {
      const bMesh = new THREE.Mesh(bubbleGeo, bubbleMat);
      bMesh.position.set(
        (Math.random() - 0.5) * 46,
        Math.random() * 8,
        (Math.random() - 0.5) * 30
      );
      waveGroup.add(bMesh);
      bubbles.push({
        mesh: bMesh,
        riseSpeed: 0.8 + Math.random() * 1.5,
        wobblePhase: Math.random() * Math.PI * 2,
      });
    }

    // --- ANIMATION TIMELINE & VERTEX WAVE DYNAMICS ---
    const clock = new THREE.Clock();
    const startTime = performance.now();
    const duration = 4.4; // 4.4s traversal across screen
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);
      const time = clock.getElapsedTime();

      // Traversal across screen from Left to Right (X: -36 to +36)
      const currentX = -36 + progress * 72;
      waveGroup.position.x = currentX;

      // Animate Vertices with sum of sine waves for natural water movement
      for (let i = 0; i < posAttr.count; i++) {
        const x = originalPositions[i * 3];
        const z = originalPositions[i * 3 + 2];

        // Sum of sine waves for natural water movement
        const wave1 = Math.sin(x * 0.3 + time * 1.6) * 0.65;
        const wave2 = Math.cos(z * 0.2 + time * 1.1) * 0.5;
        const wave3 = Math.sin((x + z) * 0.15 + time * 2.1) * 0.38;

        posAttr.setY(i, wave1 + wave2 + wave3);
      }

      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      // Update spray droplets physics
      droplets.forEach((d) => {
        d.age += 0.016;
        if (d.age > d.life) {
          d.age = 0;
        }
        const t = d.age;
        d.mesh.position.y = 1 + d.vy * t - 0.5 * 18 * t * t;
      });

      // Update bubbles rising
      bubbles.forEach((b) => {
        b.mesh.position.y += b.riseSpeed * 0.016;
        b.mesh.position.x += Math.sin(time * 2 + b.wobblePhase) * 0.02;
        if (b.mesh.position.y > 12) {
          b.mesh.position.y = -1;
        }
      });

      // Smooth Global Fade-Out Past 70% Progress
      let overallOpacity = 1.0;
      if (progress > 0.70) {
        overallOpacity = Math.max(0, 1 - (progress - 0.70) / 0.30);
      }

      waterMaterial.opacity = 0.94 * overallOpacity;
      dropletMat.opacity = 0.9 * overallOpacity;
      bubbleMat.opacity = 0.65 * overallOpacity;

      renderer.render(scene, camera);

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
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
      geometry.dispose();
      waterMaterial.dispose();
      renderer.dispose();
    };
  }, [onComplete, isReducedMotion]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      data-purpose="floating-water-wave-layer"
    >
      {/* 3D WebGL Canvas for Water Wave Simulation */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Realm Announcement Pill (Top-Center, non-blocking) */}
      <motion.div
        className="absolute top-20 sm:top-24 inset-x-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: -15, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-15, 0, 0, -10], scale: [0.9, 1, 1, 0.95] }}
        transition={{ duration: 3.8, times: [0, 0.15, 0.8, 1], ease: "easeInOut" }}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 text-[#0284C7] border-2 border-[#38BDF8]/50 shadow-xl backdrop-blur-md font-heading font-black text-xs sm:text-sm uppercase tracking-wider">
          <Waves className="w-4 h-4 text-[#0284C7] animate-pulse" />
          <span>Water World • 3D Water Wave Simulation</span>
          <span className="text-base">🌊</span>
        </div>
      </motion.div>
    </div>
  );
}
