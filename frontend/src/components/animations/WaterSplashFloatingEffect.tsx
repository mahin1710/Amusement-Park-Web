"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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

    const camera = new THREE.PerspectiveCamera(46, initW / initH, 0.1, 1000);
    camera.position.set(0, 4, 38);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0); // 100% transparent
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- LIGHTS (Sunlight, Aqua Point Lights, Ambient) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    sunLight.position.set(20, 35, 25);
    scene.add(sunLight);

    const aquaPoint = new THREE.PointLight(0x38bdf8, 3.5, 60);
    aquaPoint.position.set(0, 10, 15);
    scene.add(aquaPoint);

    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 1.8);
    cyanRim.position.set(-20, 10, -10);
    scene.add(cyanRim);

    // Group holding the entire water system
    const waterSystemGroup = new THREE.Group();
    scene.add(waterSystemGroup);

    // --- 1. CONTINUOUS 3D FLUID WATER FLUME & WAVE SPLINE ---
    // Smooth Catmull-Rom spline wave path spanning across the screen
    const wavePoints = [
      new THREE.Vector3(-36, -2, -4),
      new THREE.Vector3(-22, 3, -1),
      new THREE.Vector3(-10, 8, 3),   // Crest peak
      new THREE.Vector3(2, 2, 4),     // Splash impact valley
      new THREE.Vector3(14, 7, 1),    // Secondary swell
      new THREE.Vector3(25, 3, -2),
      new THREE.Vector3(36, 0, -4),   // Exit
    ];
    const waveCurve = new THREE.CatmullRomCurve3(wavePoints);

    // Materials with Physical Glass/Water Properties
    const waterBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.72,
      ior: 1.333,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88,
    });

    const foamCrestMat = new THREE.MeshStandardMaterial({
      color: 0xf0fdfa,
      roughness: 0.25,
      metalness: 0.15,
      transparent: true,
      opacity: 0.82,
    });

    // Outer Main Wave Tube
    const mainWaveGeo = new THREE.TubeGeometry(waveCurve, 80, 2.2, 16, false);
    const mainWaveMesh = new THREE.Mesh(mainWaveGeo, waterBodyMat);
    waterSystemGroup.add(mainWaveMesh);

    // Inner Luminous Core Tube
    const coreWaveGeo = new THREE.TubeGeometry(waveCurve, 80, 1.3, 12, false);
    const coreWaveMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.65,
    });
    const coreWaveMesh = new THREE.Mesh(coreWaveGeo, coreWaveMat);
    waterSystemGroup.add(coreWaveMesh);

    // Frothy White Crest Tube on upper edge
    const crestGeo = new THREE.TubeGeometry(waveCurve, 80, 0.7, 10, false);
    const crestMesh = new THREE.Mesh(crestGeo, foamCrestMat);
    crestMesh.position.y += 1.3;
    waterSystemGroup.add(crestMesh);

    // --- 2. SURFING CARTOON MASCOT ON INFLATABLE RING ---
    const surferGroup = new THREE.Group();
    waterSystemGroup.add(surferGroup);

    // Inflatable Torus Ring (Yellow & Orange)
    const tubeGeo = new THREE.TorusGeometry(1.6, 0.65, 16, 28);
    const tubeMat = new THREE.MeshToonMaterial({ color: 0xffd93d, transparent: true, opacity: 0.95 });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    tubeMesh.rotation.x = Math.PI / 2;
    surferGroup.add(tubeMesh);

    // Inner accent stripe
    const stripeGeo = new THREE.TorusGeometry(1.62, 0.25, 16, 28);
    const stripeMat = new THREE.MeshToonMaterial({ color: 0xff6b35, transparent: true, opacity: 0.95 });
    const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
    stripeMesh.rotation.x = Math.PI / 2;
    surferGroup.add(stripeMesh);

    // Cartoon Character Head & Face
    const headGeo = new THREE.SphereGeometry(1.0, 18, 18);
    const skinMat = new THREE.MeshToonMaterial({ color: 0xfed7aa, transparent: true, opacity: 0.95 });
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.set(0, 1.25, 0);
    surferGroup.add(headMesh);

    // Swimming Goggles (Aqua frame with glossy dark lenses)
    const goggleMat = new THREE.MeshToonMaterial({ color: 0x0284c7, transparent: true, opacity: 0.95 });
    const lensMat = new THREE.MeshStandardMaterial({ color: 0x172554, roughness: 0.1, metalness: 0.4, transparent: true, opacity: 0.95 });

    const goggleL = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.11, 10, 18), goggleMat);
    goggleL.position.set(-0.4, 1.35, 0.95);
    const lensL = new THREE.Mesh(new THREE.CircleGeometry(0.28, 16), lensMat);
    lensL.position.set(-0.4, 1.35, 0.96);
    surferGroup.add(goggleL);
    surferGroup.add(lensL);

    const goggleR = goggleL.clone();
    goggleR.position.set(0.4, 1.35, 0.95);
    const lensR = lensL.clone();
    lensR.position.set(0.4, 1.35, 0.96);
    surferGroup.add(goggleR);
    surferGroup.add(lensR);

    // Waving Cartoon Arms (Raised high shouting with excitement!)
    const armGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.3, 8);
    const leftArm = new THREE.Mesh(armGeo, skinMat);
    leftArm.position.set(-1.3, 1.8, 0);
    leftArm.rotation.z = 0.75;
    surferGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, skinMat);
    rightArm.position.set(1.3, 1.8, 0);
    rightArm.rotation.z = -0.75;
    surferGroup.add(rightArm);

    // --- 3. MULTI-SCALE 3D WATER SPLASH PARTICLES ---
    // Tier 1: Heavy Cannon Splash Droplets (Large Dodecahedrons)
    const heavyDropletMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.8,
      ior: 1.333,
      reflectivity: 0.9,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.9,
    });
    const heavyGeo = new THREE.DodecahedronGeometry(0.55, 1);
    const heavyDroplets: {
      mesh: THREE.Mesh;
      vel: THREE.Vector3;
      origin: THREE.Vector3;
      gravity: number;
      lifetime: number;
      age: number;
    }[] = [];

    for (let i = 0; i < 40; i++) {
      const mesh = new THREE.Mesh(heavyGeo, heavyDropletMat.clone());
      const orig = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        Math.random() * 2 + 1,
        (Math.random() - 0.5) * 5
      );
      mesh.position.copy(orig);
      surferGroup.add(mesh);

      heavyDroplets.push({
        mesh,
        origin: orig,
        vel: new THREE.Vector3(
          (Math.random() - 0.3) * 10,
          Math.random() * 10 + 6,
          (Math.random() - 0.5) * 8
        ),
        gravity: 0.32,
        lifetime: Math.random() * 1.4 + 0.8,
        age: Math.random() * 1.4,
      });
    }

    // Tier 2: Medium Spray Droplets
    const medGeo = new THREE.DodecahedronGeometry(0.3, 1);
    const medDroplets: {
      mesh: THREE.Mesh;
      vel: THREE.Vector3;
      origin: THREE.Vector3;
      gravity: number;
      lifetime: number;
      age: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      const mesh = new THREE.Mesh(medGeo, heavyDropletMat.clone());
      const orig = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        Math.random() * 3,
        (Math.random() - 0.5) * 6
      );
      mesh.position.copy(orig);
      surferGroup.add(mesh);

      medDroplets.push({
        mesh,
        origin: orig,
        vel: new THREE.Vector3(
          (Math.random() - 0.3) * 8,
          Math.random() * 8 + 4,
          (Math.random() - 0.5) * 6
        ),
        gravity: 0.24,
        lifetime: Math.random() * 1.2 + 0.6,
        age: Math.random() * 1.2,
      });
    }

    // --- 4. 3D WATER JET STREAM LINES (Matching Coaster Wind Lines!) ---
    const jetLinesGroup = new THREE.Group();
    scene.add(jetLinesGroup);

    const jetLineGeo = new THREE.CylinderGeometry(0.06, 0.06, 7.0, 6);
    const jetLineMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.75 });
    const jetLines: THREE.Mesh[] = [];

    for (let i = 0; i < 24; i++) {
      const lineMesh = new THREE.Mesh(jetLineGeo, jetLineMat);
      lineMesh.rotation.z = Math.PI / 2;
      lineMesh.position.set(
        (Math.random() - 0.5) * 36,
        Math.random() * 14 - 1,
        (Math.random() - 0.5) * 12
      );
      jetLinesGroup.add(lineMesh);
      jetLines.push(lineMesh);
    }

    // --- 5. FLOATING IRIDESCENT BUBBLES ---
    const bubbleCount = 40;
    const bubbleGeo = new THREE.SphereGeometry(0.48, 14, 14);
    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: 0xbae6fd,
      roughness: 0.04,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.1,
      reflectivity: 0.95,
      clearcoat: 1.0,
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
      const bx = (Math.random() - 0.5) * 30;
      const by = Math.random() * 12 - 2;
      const bz = (Math.random() - 0.5) * 12;
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

    // Expanding 3D Ripple Rings on water entry
    const rippleGeo = new THREE.RingGeometry(0.6, 1.4, 28);
    const rippleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const rippleRing = new THREE.Mesh(rippleGeo, rippleMat);
    rippleRing.rotation.x = -Math.PI / 2;
    surferGroup.add(rippleRing);

    // --- ANIMATION TIMELINE & FLUID PHYSICS ---
    const startTime = performance.now();
    const duration = 4.0; // 4.0s traversal across screen
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Traversal progress with fluid acceleration curve
      const easedProgress = Math.pow(progress, 0.96);

      // Position surfer dynamically along the wave spline
      const currentPoint = waveCurve.getPointAt(easedProgress);
      const tangent = waveCurve.getTangentAt(easedProgress).normalize();

      surferGroup.position.copy(currentPoint);
      surferGroup.position.y += 1.4; // ride atop the wave
      surferGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
      surferGroup.rotation.z += Math.sin(elapsed * 10) * 0.2; // banking

      // Animate mascot waving arms with excitement
      leftArm.rotation.x = Math.sin(elapsed * 16) * 0.45;
      rightArm.rotation.x = -Math.sin(elapsed * 16) * 0.45;

      // Animate ripple ring expansion
      const rScale = 1 + (elapsed % 0.8) * 4;
      rippleRing.scale.set(rScale, rScale, 1);
      (rippleRing.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (elapsed % 0.8) * 1.2);

      // Update Heavy & Medium Splash Droplets Physics
      heavyDroplets.forEach((d) => {
        d.age += 0.016;
        if (d.age > d.lifetime) {
          d.age = 0;
          d.mesh.position.copy(d.origin);
          d.vel.set(
            (Math.random() - 0.3) * 10,
            Math.random() * 10 + 6,
            (Math.random() - 0.5) * 8
          );
        } else {
          d.mesh.position.x += d.vel.x * 0.016;
          d.mesh.position.y += d.vel.y * 0.016;
          d.mesh.position.z += d.vel.z * 0.016;
          d.vel.y -= d.gravity;
          d.mesh.rotation.x += 0.04;
        }
      });

      medDroplets.forEach((d) => {
        d.age += 0.016;
        if (d.age > d.lifetime) {
          d.age = 0;
          d.mesh.position.copy(d.origin);
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

      // Animate water jet stream lines rushing past (high velocity flow)
      jetLines.forEach((line) => {
        line.position.x -= 2.0;
        if (line.position.x < -36) {
          line.position.x = 36;
          line.position.y = Math.random() * 14 - 1;
          line.position.z = (Math.random() - 0.5) * 12;
        }
      });

      // Animate floating bubbles
      bubbleMeshes.forEach((b) => {
        b.mesh.position.y += b.speedY * 0.016;
        b.mesh.position.x = b.baseX + Math.sin(elapsed * b.wobbleSpeed) * 0.8;
        if (b.mesh.position.y > 10) {
          b.mesh.position.y = -2;
        }
      });

      // Smooth Fade-out as it approaches the right edge (past 68% progress)
      let overallOpacity = 1;
      if (progress > 0.68) {
        overallOpacity = Math.max(0, 1 - (progress - 0.68) / 0.32);
      }

      waterBodyMat.opacity = 0.88 * overallOpacity;
      foamCrestMat.opacity = 0.82 * overallOpacity;
      coreWaveMat.opacity = 0.65 * overallOpacity;
      tubeMat.opacity = 0.95 * overallOpacity;
      stripeMat.opacity = 0.95 * overallOpacity;
      skinMat.opacity = 0.95 * overallOpacity;
      heavyDropletMat.opacity = 0.9 * overallOpacity;
      jetLineMat.opacity = 0.75 * overallOpacity;
      bubbleMat.opacity = 0.6 * overallOpacity;
      rippleMat.opacity = 0.8 * overallOpacity;

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
