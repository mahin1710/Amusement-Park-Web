"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Waves, Sparkles } from "lucide-react";

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

    // --- TROPICAL OCEAN LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.5);
    sunLight.position.set(20, 35, 25);
    scene.add(sunLight);

    const aquaPoint = new THREE.PointLight(0x38bdf8, 3.5, 60);
    aquaPoint.position.set(0, 8, 15);
    scene.add(aquaPoint);

    const deepCyanRim = new THREE.DirectionalLight(0x0284c7, 2.0);
    deepCyanRim.position.set(-25, 12, -12);
    scene.add(deepCyanRim);

    // Master group holding the entire rolling wave system
    const waveSystemGroup = new THREE.Group();
    scene.add(waveSystemGroup);

    // Array to manage global opacity fade-out
    const allMaterials: THREE.Material[] = [];
    const registerMat = <T extends THREE.Material>(mat: T): T => {
      allMaterials.push(mat);
      return mat;
    };

    // --- REALISTIC PHYSICAL WATER & SEAFOAM MATERIALS ---
    const deepWaterMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x0284c7, // Deep Caribbean Azure
        roughness: 0.08,
        metalness: 0.1,
        transmission: 0.76,
        ior: 1.333, // True water refractive index
        reflectivity: 0.92,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        transparent: true,
        opacity: 0.92,
      })
    );

    const waveBarrelMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4, // Glowing Turquoise Wave Barrel
        roughness: 0.06,
        metalness: 0.12,
        transmission: 0.8,
        ior: 1.333,
        reflectivity: 0.94,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.9,
      })
    );

    const foamCrestMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xf0fdfa, // Pure White Churning Sea Foam
        roughness: 0.22,
        metalness: 0.1,
        transparent: true,
        opacity: 0.88,
      })
    );

    const secondarySwellMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        roughness: 0.12,
        transmission: 0.65,
        ior: 1.333,
        transparent: true,
        opacity: 0.8,
      })
    );

    const dolphinBlueMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0369a1,
        roughness: 0.25,
        metalness: 0.15,
        transparent: true,
        opacity: 0.98,
      })
    );

    const dolphinBellyMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        transparent: true,
        opacity: 0.98,
      })
    );

    const surfboardMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xffd93d, // Vibrant Sunny Yellow
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.98,
      })
    );

    const surfboardStripeMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xef4444, // Racing Coral Red Stripe
        roughness: 0.2,
        transparent: true,
        opacity: 0.98,
      })
    );

    const dropletMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.82,
        ior: 1.333,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.92,
      })
    );

    const bubbleMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xbae6fd,
        roughness: 0.05,
        metalness: 0.3,
        transmission: 0.9,
        ior: 1.333,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.6,
      })
    );

    const sprayMistMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.7,
      })
    );

    // =============================================================
    // 1. THE GREAT ROLLING 3D OCEAN WAVE (Curling Surf Barrel)
    // =============================================================
    const mainWaveGroup = new THREE.Group();
    waveSystemGroup.add(mainWaveGroup);

    // Wave Path: Rolling swell with a towering breaking crest
    const wavePoints = [
      new THREE.Vector3(-36, -3.5, -3),
      new THREE.Vector3(-24, -2.0, -1),
      new THREE.Vector3(-12, 1.5, 2),
      new THREE.Vector3(-2, 6.8, 4),   // The Crest Peak
      new THREE.Vector3(4, 3.2, 5.5),  // Breaking barrel lip
      new THREE.Vector3(14, -0.5, 3),  // Splash trough
      new THREE.Vector3(26, 1.5, -1),  // Secondary wave swell
      new THREE.Vector3(38, -1.0, -4), // Trailing ocean swell
    ];
    const waveSpline = new THREE.CatmullRomCurve3(wavePoints);

    // Massive Wave Body Tube
    const waveBodyGeo = new THREE.TubeGeometry(waveSpline, 90, 3.2, 20, false);
    const waveBodyMesh = new THREE.Mesh(waveBodyGeo, deepWaterMat);
    mainWaveGroup.add(waveBodyMesh);

    // Curling Wave Barrel Tube (Glowing turquoise core of the wave)
    const barrelCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-16, 2.0, 1.5),
      new THREE.Vector3(-6, 5.8, 3.5),
      new THREE.Vector3(0, 7.2, 4.5),
      new THREE.Vector3(6, 4.5, 5.8),
      new THREE.Vector3(12, 0.8, 4.0),
    ]);
    const barrelGeo = new THREE.TubeGeometry(barrelCurve, 50, 1.9, 16, false);
    const barrelMesh = new THREE.Mesh(barrelGeo, waveBarrelMat);
    mainWaveGroup.add(barrelMesh);

    // Frothy White Crest Lip (Crashing White-Water on top)
    const crestCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-20, 0.2, 0.5),
      new THREE.Vector3(-10, 4.0, 2.8),
      new THREE.Vector3(-2, 7.6, 4.2),
      new THREE.Vector3(3, 7.4, 5.4),
      new THREE.Vector3(8, 4.0, 5.6),
      new THREE.Vector3(15, 0.5, 3.8),
    ]);
    const crestGeo = new THREE.TubeGeometry(crestCurve, 60, 0.95, 12, false);
    const crestMesh = new THREE.Mesh(crestGeo, foamCrestMat);
    crestMesh.position.y += 0.4;
    mainWaveGroup.add(crestMesh);

    // Secondary Rolling Sea Swells (Multi-Plane Ocean Depth)
    const frontSwellPoints = [
      new THREE.Vector3(-36, -5.0, 7),
      new THREE.Vector3(-18, -3.8, 8),
      new THREE.Vector3(0, -2.5, 9),
      new THREE.Vector3(18, -3.5, 7.5),
      new THREE.Vector3(36, -5.0, 6),
    ];
    const frontSwellCurve = new THREE.CatmullRomCurve3(frontSwellPoints);
    const frontSwellGeo = new THREE.TubeGeometry(frontSwellCurve, 50, 1.4, 10, false);
    const frontSwellMesh = new THREE.Mesh(frontSwellGeo, secondarySwellMat);
    waveSystemGroup.add(frontSwellMesh);

    const backSwellPoints = [
      new THREE.Vector3(-36, -1.0, -8),
      new THREE.Vector3(-16, 2.5, -7),
      new THREE.Vector3(4, 1.2, -6),
      new THREE.Vector3(24, -0.5, -7),
      new THREE.Vector3(38, -2.0, -8),
    ];
    const backSwellCurve = new THREE.CatmullRomCurve3(backSwellPoints);
    const backSwellGeo = new THREE.TubeGeometry(backSwellCurve, 50, 1.6, 10, false);
    const backSwellMesh = new THREE.Mesh(backSwellGeo, secondarySwellMat);
    waveSystemGroup.add(backSwellMesh);

    // =============================================================
    // 2. LEAPING PLAYFUL CARTOON DOLPHIN (Jumping over Wave Crest)
    // =============================================================
    const dolphinGroup = new THREE.Group();
    dolphinGroup.position.set(-1, 8.5, 4.2);
    waveSystemGroup.add(dolphinGroup);

    // Dolphin Body (Curved Torpedo)
    const dolphinBodyGeo = new THREE.SphereGeometry(1.6, 18, 18);
    dolphinBodyGeo.scale(0.8, 0.75, 2.4);
    const dolphinBody = new THREE.Mesh(dolphinBodyGeo, dolphinBlueMat);
    dolphinGroup.add(dolphinBody);

    // White Dolphin Underbelly
    const dolphinBellyGeo = new THREE.SphereGeometry(1.3, 14, 14);
    dolphinBellyGeo.scale(0.7, 0.5, 2.1);
    const dolphinBelly = new THREE.Mesh(dolphinBellyGeo, dolphinBellyMat);
    dolphinBelly.position.set(0, -0.3, 0);
    dolphinGroup.add(dolphinBelly);

    // Dolphin Snout / Beak
    const beakGeo = new THREE.ConeGeometry(0.35, 1.2, 10);
    beakGeo.rotateX(Math.PI / 2);
    const beakMesh = new THREE.Mesh(beakGeo, dolphinBlueMat);
    beakMesh.position.set(0, -0.1, 2.8);
    dolphinGroup.add(beakMesh);

    // Dorsal Fin
    const finGeo = new THREE.ConeGeometry(0.35, 1.1, 4);
    finGeo.rotateX(-0.5);
    const dorsalFin = new THREE.Mesh(finGeo, dolphinBlueMat);
    dorsalFin.position.set(0, 0.9, -0.3);
    dolphinGroup.add(dorsalFin);

    // Pectoral Flippers
    const flipperGeo = new THREE.BoxGeometry(1.4, 0.12, 0.6);
    const flipperL = new THREE.Mesh(flipperGeo, dolphinBlueMat);
    flipperL.position.set(-1.1, -0.3, 0.6);
    flipperL.rotation.z = -0.4;
    dolphinGroup.add(flipperL);

    const flipperR = new THREE.Mesh(flipperGeo, dolphinBlueMat);
    flipperR.position.set(1.1, -0.3, 0.6);
    flipperR.rotation.z = 0.4;
    dolphinGroup.add(flipperR);

    // Tail Fluke
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0, -2.6);

    const flukeGeo = new THREE.BoxGeometry(1.8, 0.1, 0.6);
    const flukeMesh = new THREE.Mesh(flukeGeo, dolphinBlueMat);
    flukeMesh.rotation.y = 0.1;
    tailGroup.add(flukeMesh);
    dolphinGroup.add(tailGroup);

    // Playful Eye
    const dEyeGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const dEyeMat = registerMat(new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.98 }));
    const dEyeL = new THREE.Mesh(dEyeGeo, dEyeMat);
    dEyeL.position.set(-0.5, 0.25, 1.8);
    dolphinGroup.add(dEyeL);

    const dEyeR = new THREE.Mesh(dEyeGeo, dEyeMat);
    dEyeR.position.set(0.5, 0.25, 1.8);
    dolphinGroup.add(dEyeR);

    // =============================================================
    // 3. SURFER MASCOT CARVING THE WAVE FACE (On Colorful Surfboard)
    // =============================================================
    const surferGroup = new THREE.Group();
    surferGroup.position.set(5.5, 3.2, 5.8);
    surferGroup.rotation.y = -Math.PI / 3;
    surferGroup.rotation.z = 0.35; // Leaning into the surf turn!
    waveSystemGroup.add(surferGroup);

    // Sleek Surfboard
    const boardGeo = new THREE.BoxGeometry(1.4, 0.16, 4.2);
    const surfboard = new THREE.Mesh(boardGeo, surfboardMat);
    surfboard.position.set(0, 0, 0);
    surferGroup.add(surfboard);

    // Red Center Racing Stripe
    const stripeGeo = new THREE.BoxGeometry(0.28, 0.18, 4.22);
    const boardStripe = new THREE.Mesh(stripeGeo, surfboardStripeMat);
    surferGroup.add(boardStripe);

    // Surfer Mascot Figure (Joyful Pose)
    const mascotSkinMat = registerMat(new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.3, transparent: true, opacity: 0.98 }));
    const mascotShirtMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35, transparent: true, opacity: 0.98 }));

    // Torso
    const mTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.4, 1.2, 10), mascotShirtMat);
    mTorso.position.set(0, 1.1, -0.2);
    surferGroup.add(mTorso);

    // Head with Aqua Swimming Goggles
    const mHead = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 14), mascotSkinMat);
    mHead.position.set(0, 1.95, -0.1);
    surferGroup.add(mHead);

    const goggleFrame = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.24, 0.3), surfboardStripeMat);
    goggleFrame.position.set(0, 1.98, 0.4);
    surferGroup.add(goggleFrame);

    // Balancing Arms
    const mArmGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.1, 8);
    const mArmL = new THREE.Mesh(mArmGeo, mascotSkinMat);
    mArmL.position.set(-0.7, 1.3, -0.2);
    mArmL.rotation.z = 0.9;
    surferGroup.add(mArmL);

    const mArmR = new THREE.Mesh(mArmGeo, mascotSkinMat);
    mArmR.position.set(0.7, 1.3, -0.2);
    mArmR.rotation.z = -0.9;
    surferGroup.add(mArmR);

    // =============================================================
    // 4. PARABOLIC WAVE SPLASH DROPLET PARTICLES (Heavy Cannon)
    // =============================================================
    interface WaveDroplet {
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

    const dropletPool: WaveDroplet[] = [];
    const dropletGeo = new THREE.DodecahedronGeometry(0.48, 1);

    for (let i = 0; i < 55; i++) {
      const dMesh = new THREE.Mesh(dropletGeo, dropletMat);
      const origX = -10 + Math.random() * 22;
      const origY = 4 + Math.random() * 4;
      const origZ = 3 + Math.random() * 4;
      dMesh.position.set(origX, origY, origZ);
      const sc = 0.4 + Math.random() * 0.7;
      dMesh.scale.set(sc, sc, sc);
      waveSystemGroup.add(dMesh);

      dropletPool.push({
        mesh: dMesh,
        originX: origX,
        originY: origY,
        originZ: origZ,
        vx: 3 + Math.random() * 8,
        vy: 6 + Math.random() * 12,
        vz: (Math.random() - 0.4) * 6,
        gravity: 24 + Math.random() * 8,
        age: Math.random() * 0.8,
        lifespan: 0.9 + Math.random() * 0.5,
      });
    }

    // =============================================================
    // 5. WIND SPRAY SPEED LINES & FLOATING SHIMMERING BUBBLES
    // =============================================================
    const sprayLines: THREE.Mesh[] = [];
    const sprayLineGeo = new THREE.CylinderGeometry(0.04, 0.04, 4.5, 6);
    sprayLineGeo.rotateZ(Math.PI / 2);

    for (let i = 0; i < 18; i++) {
      const sMesh = new THREE.Mesh(sprayLineGeo, sprayMistMat);
      sMesh.position.set(
        -15 + Math.random() * 30,
        2 + Math.random() * 7,
        1 + Math.random() * 6
      );
      waveSystemGroup.add(sMesh);
      sprayLines.push(sMesh);
    }

    // Shimmering Floating Bubbles
    const bubbles: { mesh: THREE.Mesh; wobblePhase: number; riseSpeed: number }[] = [];
    const bubbleGeo = new THREE.SphereGeometry(0.45, 12, 12);

    for (let i = 0; i < 40; i++) {
      const bMesh = new THREE.Mesh(bubbleGeo, bubbleMat);
      bMesh.position.set(
        -25 + Math.random() * 50,
        -1 + Math.random() * 10,
        -4 + Math.random() * 14
      );
      const sc = 0.4 + Math.random() * 0.8;
      bMesh.scale.set(sc, sc, sc);
      waveSystemGroup.add(bMesh);
      bubbles.push({
        mesh: bMesh,
        wobblePhase: Math.random() * Math.PI * 2,
        riseSpeed: 0.8 + Math.random() * 1.6,
      });
    }

    // =============================================================
    // 6. ANIMATION TIMELINE & WAVE DYNAMICS
    // =============================================================
    const startTime = performance.now();
    const duration = 4.3; // 4.3s traversal across screen
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Traversal across screen from Left to Right (X: -38 to +38)
      const currentX = -38 + progress * 76;
      waveSystemGroup.position.x = currentX;

      // Dynamic Wave Swell Undulation (Rolling Ocean Physics)
      mainWaveGroup.position.y = Math.sin(elapsed * 4.5) * 0.55;
      mainWaveGroup.rotation.z = Math.sin(elapsed * 3.5) * 0.04;
      crestMesh.position.y = 0.4 + Math.sin(elapsed * 7) * 0.2;

      // Secondary swells undulating in counter-phase
      frontSwellMesh.position.y = Math.sin(elapsed * 5 + 1.2) * 0.4;
      backSwellMesh.position.y = Math.sin(elapsed * 4 + 2.4) * 0.5;

      // Dolphin Leaping Dynamics (Graceful parabolic leap arc)
      const leapProgress = (elapsed * 1.4) % 1;
      const leapY = Math.sin(leapProgress * Math.PI) * 3.5;
      dolphinGroup.position.y = 7.0 + leapY;
      dolphinGroup.rotation.x = 0.4 - leapProgress * 0.9; // Head points up on rise, down on dive!
      tailGroup.rotation.x = Math.sin(elapsed * 12) * 0.45; // Fluke kick

      // Surfer Mascot carving the wave face
      surferGroup.position.y = 3.2 + Math.sin(elapsed * 6) * 0.4;
      surferGroup.rotation.z = 0.35 + Math.sin(elapsed * 5) * 0.12;

      // Parabolic Water Droplet Physics
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

      // Spray Lines horizontal rushing motion
      sprayLines.forEach((s) => {
        s.position.x += 0.45;
        if (s.position.x > 25) {
          s.position.x = -20 - Math.random() * 10;
        }
      });

      // Shimmering bubbles drifting and rising
      bubbles.forEach((b) => {
        b.mesh.position.y += b.riseSpeed * 0.016;
        b.mesh.position.x += Math.sin(elapsed * 2 + b.wobblePhase) * 0.02;
        if (b.mesh.position.y > 14) {
          b.mesh.position.y = -2;
        }
      });

      // Smooth Global Fade-Out past 70% of traversal
      let overallOpacity = 1.0;
      if (progress > 0.70) {
        overallOpacity = Math.max(0, 1 - (progress - 0.70) / 0.30);
      }

      allMaterials.forEach((mat) => {
        if ("opacity" in mat) {
          (mat as THREE.Material & { opacity: number }).opacity = 0.92 * overallOpacity;
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
      data-purpose="floating-water-wave-layer"
    >
      {/* 3D WebGL Canvas for Floating Ocean Wave Surge */}
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
          <span>Water World • Tsunami Ocean Waves</span>
          <span className="text-base">🌊</span>
        </div>
      </motion.div>
    </div>
  );
}
