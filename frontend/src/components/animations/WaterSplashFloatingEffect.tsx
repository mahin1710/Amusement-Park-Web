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

    const camera = new THREE.PerspectiveCamera(46, initW / initH, 0.1, 1000);
    camera.position.set(0, 4, 38);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- CINEMATIC LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.7);
    sunLight.position.set(22, 38, 25);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const aquaPoint = new THREE.PointLight(0x38bdf8, 3.8, 65);
    aquaPoint.position.set(0, 8, 14);
    scene.add(aquaPoint);

    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 2.0);
    cyanRim.position.set(-28, 14, -14);
    scene.add(cyanRim);

    // Master group holding the entire water slide ride system
    const waterRideGroup = new THREE.Group();
    scene.add(waterRideGroup);

    // Track all materials for smooth fade-out
    const allMaterials: THREE.Material[] = [];
    const registerMat = <T extends THREE.Material>(mat: T): T => {
      allMaterials.push(mat);
      return mat;
    };

    // --- PBR TRANSLUCENT FIBERGLASS & WATER MATERIALS ---
    const flumeFiberglassMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4, // Electric Tropical Cyan Fiberglass
        roughness: 0.12,
        metalness: 0.15,
        transmission: 0.65, // Translucent fiberglass flume
        ior: 1.45,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide,
      })
    );

    const flumeTrimYellowMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xffd93d, // High-visibility Safety Yellow Rim
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.95,
      })
    );

    const rushingWaterMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x0284c7, // Flowing Azure Water Stream
        roughness: 0.04,
        metalness: 0.08,
        transmission: 0.85,
        ior: 1.333,
        reflectivity: 0.94,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.92,
      })
    );

    const foamCrestMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xf0fdfa, // Frothy White Water & Spray
        roughness: 0.25,
        metalness: 0.05,
        transparent: true,
        opacity: 0.9,
      })
    );

    const raftVinylYellowMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xffd93d, // Glossy Inflatable Raft Yellow
        roughness: 0.22,
        metalness: 0.08,
        transparent: true,
        opacity: 0.98,
      })
    );

    const raftStripeRedMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xef4444, // Raft Racing Red Stripe
        roughness: 0.22,
        transparent: true,
        opacity: 0.98,
      })
    );

    const riderSkinMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfed7aa,
        roughness: 0.35,
        transparent: true,
        opacity: 0.98,
      })
    );

    const riderShirtMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.98,
      })
    );

    const goggleMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x09090b,
        roughness: 0.1,
        metalness: 0.5,
        transparent: true,
        opacity: 0.98,
      })
    );

    const dropletMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xbae6fd,
        roughness: 0.04,
        metalness: 0.1,
        transmission: 0.88,
        ior: 1.333,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.94,
      })
    );

    const bubbleMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xe0f2fe,
        roughness: 0.04,
        metalness: 0.35,
        transmission: 0.92,
        ior: 1.333,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.65,
      })
    );

    const speedLineMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.75,
      })
    );

    // =============================================================
    // 1. 3D WATER SLIDE FLUME CHUTE & WATER STREAM
    // =============================================================
    // Dynamic water slide spline: High entry -> steep chute drop -> banked S-curve -> plunge into splash pool
    const slidePoints = [
      new THREE.Vector3(-38, 14, -5),
      new THREE.Vector3(-24, 11, -2),
      new THREE.Vector3(-12, 4.2, 3),   // First steep chute drop
      new THREE.Vector3(-1, 7.8, 2),    // Banked crest
      new THREE.Vector3(9, 1.4, 5),     // Steep final plunge
      new THREE.Vector3(18, -1.8, 4),   // Splashdown impact pool!
      new THREE.Vector3(28, -2.0, 1),   // Pool runout basin
      new THREE.Vector3(38, -2.2, -3),  // Exit
    ];
    const slideCurve = new THREE.CatmullRomCurve3(slidePoints);

    // Outer Translucent Fiberglass Slide Chute
    const flumeGeo = new THREE.TubeGeometry(slideCurve, 100, 2.3, 20, false);
    const flumeMesh = new THREE.Mesh(flumeGeo, flumeFiberglassMat);
    waterRideGroup.add(flumeMesh);

    // Dual Yellow Safety Rim Flanges along the upper edge of the slide
    const leftRimGeo = new THREE.TubeGeometry(slideCurve, 100, 0.22, 10, false);
    const leftRimMesh = new THREE.Mesh(leftRimGeo, flumeTrimYellowMat);
    leftRimMesh.position.set(-0.95, 1.35, 0);
    waterRideGroup.add(leftRimMesh);

    const rightRimMesh = new THREE.Mesh(leftRimGeo, flumeTrimYellowMat);
    rightRimMesh.position.set(0.95, 1.35, 0);
    waterRideGroup.add(rightRimMesh);

    // Inner Rushing Water Stream flowing down the slide chute
    const waterGeo = new THREE.TubeGeometry(slideCurve, 100, 1.7, 16, false);
    const waterMesh = new THREE.Mesh(waterGeo, rushingWaterMat);
    waterMesh.position.y -= 0.2;
    waterRideGroup.add(waterMesh);

    // Frothy White Water Flow Crest inside the flume
    const waterCrestGeo = new THREE.TubeGeometry(slideCurve, 100, 0.7, 10, false);
    const waterCrestMesh = new THREE.Mesh(waterCrestGeo, foamCrestMat);
    waterCrestMesh.position.y += 0.85;
    waterRideGroup.add(waterCrestMesh);

    // Splashdown Pool Basin Water Plane at Slide Exit (at x ~ 18, y ~ -2.0)
    const splashPoolGeo = new THREE.CylinderGeometry(8.5, 9.5, 0.6, 28);
    const splashPoolMesh = new THREE.Mesh(splashPoolGeo, rushingWaterMat);
    splashPoolMesh.position.set(18, -2.2, 4);
    waterRideGroup.add(splashPoolMesh);

    // Expanding Splashdown Wave Rings
    const splashRingGeo = new THREE.RingGeometry(1.0, 2.2, 28);
    splashRingGeo.rotateX(-Math.PI / 2);
    const splashRingMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      })
    );
    const splashRing1 = new THREE.Mesh(splashRingGeo, splashRingMat);
    splashRing1.position.set(18, -1.85, 4);
    waterRideGroup.add(splashRing1);

    const splashRing2 = new THREE.Mesh(splashRingGeo, splashRingMat);
    splashRing2.position.set(18, -1.85, 4);
    waterRideGroup.add(splashRing2);

    // =============================================================
    // 2. RIDER & INFLATABLE RIDE VEHICLE (Swim Ring Raft)
    // =============================================================
    const riderGroup = new THREE.Group();
    waterRideGroup.add(riderGroup);

    // Inflatable Torus Ring Raft
    const raftGeo = new THREE.TorusGeometry(1.7, 0.65, 18, 32);
    raftGeo.rotateX(Math.PI / 2);
    const raftMesh = new THREE.Mesh(raftGeo, raftVinylYellowMat);
    riderGroup.add(raftMesh);

    // Red Center Racing Stripes on Raft
    const stripeGeo = new THREE.TorusGeometry(1.72, 0.24, 18, 32);
    stripeGeo.rotateX(Math.PI / 2);
    const raftStripe = new THREE.Mesh(stripeGeo, raftStripeRedMat);
    riderGroup.add(raftStripe);

    // Raft Safety Grab Handles
    const handleGeo = new THREE.TorusGeometry(0.35, 0.08, 8, 16, Math.PI);
    handleGeo.rotateX(Math.PI / 2);
    const handleL = new THREE.Mesh(handleGeo, goggleMat);
    handleL.position.set(-1.6, 0.45, 0);
    riderGroup.add(handleL);

    const handleR = new THREE.Mesh(handleGeo, goggleMat);
    handleR.position.set(1.6, 0.45, 0);
    riderGroup.add(handleR);

    // Happy Cartoon Rider Character
    const characterRoot = new THREE.Group();
    characterRoot.position.set(0, 0.9, -0.1);

    // Torso in Blue Swim Rashguard
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.42, 1.3, 12), riderShirtMat);
    torso.position.y = 0.55;
    characterRoot.add(torso);

    // Head with Swimming Goggles & Laughing Mouth
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.58, 16, 16), riderSkinMat);
    head.position.set(0, 1.55, 0);
    characterRoot.add(head);

    // Swimming Goggles
    const goggleFrame = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.26, 0.35), goggleMat);
    goggleFrame.position.set(0, 1.6, 0.45);
    characterRoot.add(goggleFrame);

    const lensL = new THREE.Mesh(
      new THREE.CircleGeometry(0.2, 12),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    lensL.position.set(-0.25, 1.6, 0.64);
    characterRoot.add(lensL);

    const lensR = lensL.clone();
    lensR.position.set(0.25, 1.6, 0.64);
    characterRoot.add(lensR);

    // Smiling / Shouting Mouth
    const mouth = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.18, 0.15),
      new THREE.MeshBasicMaterial({ color: 0x1e1b4b })
    );
    mouth.position.set(0, 1.32, 0.52);
    characterRoot.add(mouth);

    // Joyful Arms Raised High in the Air
    const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 8);
    const armL = new THREE.Mesh(armGeo, riderSkinMat);
    armL.position.set(-0.75, 1.15, 0);
    armL.rotation.z = 0.75;
    characterRoot.add(armL);

    const armR = new THREE.Mesh(armGeo, riderSkinMat);
    armR.position.set(0.75, 1.15, 0);
    armR.rotation.z = -0.75;
    characterRoot.add(armR);

    riderGroup.add(characterRoot);

    // =============================================================
    // 3. PARABOLIC WATER SPLASH DROPLETS & MIST CANNON
    // =============================================================
    interface SplashDroplet {
      mesh: THREE.Mesh;
      originX: number;
      originY: number;
      originZ: number;
      vx: number;
      vy: number;
      vz: number;
      gravity: number;
      age: number;
      lifespan: number;
    }

    const dropletPool: SplashDroplet[] = [];
    const dropletGeo = new THREE.DodecahedronGeometry(0.44, 1);

    for (let i = 0; i < 75; i++) {
      const dMesh = new THREE.Mesh(dropletGeo, dropletMat);
      const origX = 14 + Math.random() * 8;
      const origY = -1.2 + Math.random() * 2.0;
      const origZ = 2.5 + Math.random() * 3.5;
      dMesh.position.set(origX, origY, origZ);
      const sc = 0.35 + Math.random() * 0.75;
      dMesh.scale.set(sc, sc, sc);
      waterRideGroup.add(dMesh);

      dropletPool.push({
        mesh: dMesh,
        originX: origX,
        originY: origY,
        originZ: origZ,
        vx: (Math.random() - 0.3) * 12,
        vy: 8 + Math.random() * 14,
        vz: (Math.random() - 0.5) * 8,
        gravity: 26 + Math.random() * 6,
        age: Math.random() * 0.8,
        lifespan: 0.95 + Math.random() * 0.45,
      });
    }

    // Shimmering Floating Bubbles
    const bubbles: { mesh: THREE.Mesh; wobblePhase: number; riseSpeed: number }[] = [];
    const bubbleGeo = new THREE.SphereGeometry(0.45, 12, 12);

    for (let i = 0; i < 35; i++) {
      const bMesh = new THREE.Mesh(bubbleGeo, bubbleMat);
      bMesh.position.set(
        -20 + Math.random() * 45,
        -1 + Math.random() * 10,
        -3 + Math.random() * 12
      );
      const sc = 0.35 + Math.random() * 0.8;
      bMesh.scale.set(sc, sc, sc);
      waterRideGroup.add(bMesh);
      bubbles.push({
        mesh: bMesh,
        wobblePhase: Math.random() * Math.PI * 2,
        riseSpeed: 0.8 + Math.random() * 1.6,
      });
    }

    // Water Spray Speed Lines
    const sprayLines: THREE.Mesh[] = [];
    const lineGeo = new THREE.CylinderGeometry(0.04, 0.04, 5.0, 6);
    lineGeo.rotateZ(Math.PI / 2);

    for (let i = 0; i < 16; i++) {
      const sMesh = new THREE.Mesh(lineGeo, speedLineMat);
      sMesh.position.set(
        -15 + Math.random() * 30,
        1.5 + Math.random() * 8,
        -2 + Math.random() * 8
      );
      waterRideGroup.add(sMesh);
      sprayLines.push(sMesh);
    }

    // =============================================================
    // 4. ANIMATION TIMELINE & FLUID RIDE KINEMATICS
    // =============================================================
    const startTime = performance.now();
    const duration = 4.4; // 4.4s traversal across screen
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Traversal across screen from Left to Right (X: -36 to +36)
      const currentX = -36 + progress * 72;
      waterRideGroup.position.x = currentX;

      // Realistic slide gravity acceleration curve:
      // Crest entry -> rapid acceleration down chute -> plunge into splash pool
      let s = progress;
      if (s < 0.25) {
        s = s * 0.95;
      } else if (s < 0.70) {
        const tChute = (s - 0.25) / 0.45;
        s = 0.2375 + Math.pow(tChute, 1.35) * 0.50;
      } else {
        const tPool = (s - 0.70) / 0.30;
        s = 0.7375 + tPool * 0.2625;
      }

      const clampedS = Math.min(1, Math.max(0, s));
      const pt = slideCurve.getPointAt(clampedS);
      const tang = slideCurve.getTangentAt(clampedS).normalize();

      // Position Rider atop the slide flume bed
      riderGroup.position.copy(pt);
      riderGroup.position.y += 0.95;

      // Orient Rider along slide velocity with joyful banking into turns
      riderGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang);
      riderGroup.rotation.z += Math.sin(elapsed * 8) * 0.25;

      // Waving arms excitement
      armL.rotation.x = Math.sin(elapsed * 18) * 0.4;
      armR.rotation.x = -Math.sin(elapsed * 18) * 0.4;

      // Flowing water wave undulation
      waterCrestMesh.position.y = 0.85 + Math.sin(elapsed * 6) * 0.15;

      // Expanding Splash Rings at Splashdown Pool
      const ringScale1 = 1 + (elapsed * 6) % 5;
      splashRing1.scale.set(ringScale1, ringScale1, 1);
      (splashRing1.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.85 - (ringScale1 / 5) * 0.85);

      const ringScale2 = 1 + ((elapsed + 0.4) * 6) % 5;
      splashRing2.scale.set(ringScale2, ringScale2, 1);
      (splashRing2.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.85 - (ringScale2 / 5) * 0.85);

      // Parabolic Droplets Physics (Splashing active around splashdown plunge)
      dropletPool.forEach((d) => {
        d.age += 0.016;
        if (d.age >= d.lifespan) {
          d.age = 0;
        }
        const t = d.age;
        d.mesh.position.x = d.originX + d.vx * t;
        d.mesh.position.y = d.originY + d.vy * t - 0.5 * d.gravity * t * t;
        d.mesh.position.z = d.originZ + d.vz * t;
      });

      // Shimmering Bubbles Rising
      bubbles.forEach((b) => {
        b.mesh.position.y += b.riseSpeed * 0.016;
        b.mesh.position.x += Math.sin(elapsed * 2 + b.wobblePhase) * 0.02;
        if (b.mesh.position.y > 14) {
          b.mesh.position.y = -2;
        }
      });

      // Speed Spray Lines
      sprayLines.forEach((s) => {
        s.position.x -= 0.5;
        if (s.position.x < -20) {
          s.position.x = 22 + Math.random() * 8;
        }
      });

      // Smooth Global Fade-Out Past 70% Progress
      let overallOpacity = 1.0;
      if (progress > 0.70) {
        overallOpacity = Math.max(0, 1 - (progress - 0.70) / 0.30);
      }

      allMaterials.forEach((mat) => {
        if ("opacity" in mat) {
          (mat as THREE.Material & { opacity: number }).opacity = 0.94 * overallOpacity;
        }
      });

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
      data-purpose="floating-water-slide-layer"
    >
      {/* 3D WebGL Canvas for Floating Water Slide Ride */}
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
          <span>Water World • Aqua Slide & Splashdown</span>
          <span className="text-base">🏄‍♂️</span>
        </div>
      </motion.div>
    </div>
  );
}
