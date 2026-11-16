"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function RollerCoasterFloatingEffect({ onComplete, isReducedMotion = false }: Props) {
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

    // --- CINEMATIC LIGHTING (Sunlight, Chrome Speculars & Neon Ambience) ---
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.6);
    sunLight.position.set(22, 38, 25);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const thrillOrangeNeon = new THREE.PointLight(0xff6b35, 3.5, 60);
    thrillOrangeNeon.position.set(0, 8, 12);
    scene.add(thrillOrangeNeon);

    const rimCyanLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimCyanLight.position.set(-25, 15, -15);
    scene.add(rimCyanLight);

    // Master group for the roller coaster system
    const coasterSystemGroup = new THREE.Group();
    scene.add(coasterSystemGroup);

    // Track all materials for smooth fade-out
    const allMaterials: THREE.Material[] = [];
    const registerMat = <T extends THREE.Material>(mat: T): T => {
      allMaterials.push(mat);
      return mat;
    };

    // --- PREMIUM PBR & METALLIC MATERIALS ---
    const railSteelMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xff6b35, // High-gloss Thrill Coaster Orange
        metalness: 0.85,
        roughness: 0.2,
        transparent: true,
        opacity: 0.95,
      })
    );

    const spineSteelMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x334155, // Heavy Tubular Spine Steel
        metalness: 0.75,
        roughness: 0.28,
        transparent: true,
        opacity: 0.95,
      })
    );

    const crossTieMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x475569, // Structural Rail Cross-Tie Brackets
        metalness: 0.8,
        roughness: 0.25,
        transparent: true,
        opacity: 0.95,
      })
    );

    const pylonMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.7,
        roughness: 0.35,
        transparent: true,
        opacity: 0.85,
      })
    );

    // Candy-Coat Car Body Finishes
    const leadCarRedMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xef4444, // Candy Ferrari Red
        metalness: 0.65,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 0.98,
      })
    );

    const midCarOrangeMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b, // Amber Gold
        metalness: 0.65,
        roughness: 0.15,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.98,
      })
    );

    const rearCarCyanMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4, // Electric Turquoise
        metalness: 0.65,
        roughness: 0.15,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.98,
      })
    );

    const chromeTrimMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.95,
        roughness: 0.08,
        transparent: true,
        opacity: 0.98,
      })
    );

    const wheelHubMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.98,
      })
    );

    const wheelPolyMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xd97706, // Urethane Roller Coaster Wheels
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.98,
      })
    );

    const headlightGlowMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        transparent: true,
        opacity: 0.98,
      })
    );

    const passengerSkinMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfed7aa,
        roughness: 0.35,
        transparent: true,
        opacity: 0.98,
      })
    );

    const passengerHairMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x451a03,
        roughness: 0.5,
        transparent: true,
        opacity: 0.98,
      })
    );

    const passengerCapMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        roughness: 0.3,
        transparent: true,
        opacity: 0.98,
      })
    );

    const speedLineMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.75,
      })
    );

    const sparkMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffd93d,
        transparent: true,
        opacity: 0.95,
      })
    );

    // =============================================================
    // 1. AUTHENTIC 3D STEEL ROLLER COASTER TRACK
    // =============================================================
    // Dynamic roller coaster spline: High crest -> steep drop -> valley -> secondary hill -> spiral exit
    const trackPoints = [
      new THREE.Vector3(-38, 12, -4),
      new THREE.Vector3(-24, 11, -2),
      new THREE.Vector3(-10, -1.2, 3),  // Bottom of steep drop
      new THREE.Vector3(2, 7.8, 1),     // Crest 1
      new THREE.Vector3(14, 0.2, 2.5),  // Second dip
      new THREE.Vector3(25, 4.2, -1),   // High speed turn
      new THREE.Vector3(38, 6.5, -4),   // Exit
    ];
    const trackCurve = new THREE.CatmullRomCurve3(trackPoints);

    // Center Heavy Tubular Spine
    const spineGeo = new THREE.TubeGeometry(trackCurve, 90, 0.65, 12, false);
    const spineMesh = new THREE.Mesh(spineGeo, spineSteelMat);
    coasterSystemGroup.add(spineMesh);

    // Dual Tubular Running Rails (Offset by ±0.75 horizontally, +0.38 vertically)
    // We compute exact parallel curves along the track tangent and normal
    const railSampleCount = 90;
    const leftRailPoints: THREE.Vector3[] = [];
    const rightRailPoints: THREE.Vector3[] = [];

    for (let i = 0; i <= railSampleCount; i++) {
      const u = i / railSampleCount;
      const pt = trackCurve.getPointAt(u);
      const tang = trackCurve.getTangentAt(u).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tang, up).normalize();

      leftRailPoints.push(
        new THREE.Vector3(
          pt.x - normal.x * 0.75,
          pt.y + 0.38,
          pt.z - normal.z * 0.75
        )
      );
      rightRailPoints.push(
        new THREE.Vector3(
          pt.x + normal.x * 0.75,
          pt.y + 0.38,
          pt.z + normal.z * 0.75
        )
      );
    }

    const leftRailCurve = new THREE.CatmullRomCurve3(leftRailPoints);
    const rightRailCurve = new THREE.CatmullRomCurve3(rightRailPoints);

    const railGeoLeft = new THREE.TubeGeometry(leftRailCurve, 90, 0.24, 10, false);
    const railGeoRight = new THREE.TubeGeometry(rightRailCurve, 90, 0.24, 10, false);

    const leftRailMesh = new THREE.Mesh(railGeoLeft, railSteelMat);
    const rightRailMesh = new THREE.Mesh(railGeoRight, railSteelMat);
    coasterSystemGroup.add(leftRailMesh);
    coasterSystemGroup.add(rightRailMesh);

    // Structural Rail Cross-Ties (Connecting rails to spine every few feet)
    const crossTieCount = 42;
    const tieCylinderGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.55, 8);
    tieCylinderGeo.rotateZ(Math.PI / 2);

    for (let i = 1; i < crossTieCount; i++) {
      const u = i / crossTieCount;
      const pt = trackCurve.getPointAt(u);
      const tang = trackCurve.getTangentAt(u).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tang, up).normalize();

      const tie = new THREE.Mesh(tieCylinderGeo, crossTieMat);
      tie.position.set(pt.x, pt.y + 0.38, pt.z);
      tie.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), normal);
      coasterSystemGroup.add(tie);
    }

    // Clean floating roller coaster without vertical ground pillars

    // =============================================================
    // 2. DETAILED 3D ROLLER COASTER TRAIN (Lead Car + 2 Trailing Cars)
    // =============================================================
    const trainGroup = new THREE.Group();
    coasterSystemGroup.add(trainGroup);

    interface AnimatedCar {
      carRoot: THREE.Group;
      lArm: THREE.Mesh;
      rArm: THREE.Mesh;
      wheels: THREE.Mesh[];
      sparksEmitter: THREE.Vector3;
    }

    const createDetailedCoasterCar = (
      carMat: THREE.Material,
      isLeadCar = false
    ): AnimatedCar => {
      const carRoot = new THREE.Group();

      // Lower Steel Chassis
      const chassis = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.25, 2.8),
        chromeTrimMat
      );
      chassis.position.y = 0.28;
      carRoot.add(chassis);

      // Molded Fiberglass Aerodynamic Tub
      const tub = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.95, 2.6), carMat);
      tub.position.y = 0.85;
      carRoot.add(tub);

      // High-Gloss Front Nose Fairing (Aerodynamic Bullet Hood)
      if (isLeadCar) {
        const noseGeo = new THREE.ConeGeometry(0.85, 1.6, 16);
        noseGeo.rotateX(Math.PI / 2);
        const nose = new THREE.Mesh(noseGeo, carMat);
        nose.position.set(0, 0.85, 1.85);
        carRoot.add(nose);

        // Chrome Front Grille & Hood Scoop
        const grille = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.35, 0.3),
          chromeTrimMat
        );
        grille.position.set(0, 0.75, 2.45);
        carRoot.add(grille);

        // Glowing Dual Headlights
        const hlL = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), headlightGlowMat);
        hlL.position.set(-0.55, 1.0, 2.3);
        carRoot.add(hlL);

        const hlR = hlL.clone();
        hlR.position.set(0.55, 1.0, 2.3);
        carRoot.add(hlR);

        // Star Emblem
        const star = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), chromeTrimMat);
        star.position.set(0, 1.15, 2.2);
        carRoot.add(star);
      }

      // Chrome Safety Lap Bars & Roll Cage Handle
      const lapBarGeo = new THREE.TorusGeometry(0.7, 0.08, 8, 16, Math.PI);
      const lapBar = new THREE.Mesh(lapBarGeo, chromeTrimMat);
      lapBar.rotation.x = Math.PI / 2;
      lapBar.position.set(0, 1.35, 0.4);
      carRoot.add(lapBar);

      // High-Speed Multi-Wheel Bogies (Top Runner, Side Friction, Upstop Wheels)
      const wheels: THREE.Mesh[] = [];
      const createWheelBogie = (xSide: number, zPos: number) => {
        const bogieGroup = new THREE.Group();
        bogieGroup.position.set(xSide, 0.38, zPos);

        // Top load wheel (runs on top of rail)
        const topWheelGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.16, 12);
        topWheelGeo.rotateZ(Math.PI / 2);
        const topWheel = new THREE.Mesh(topWheelGeo, wheelPolyMat);
        bogieGroup.add(topWheel);
        wheels.push(topWheel);

        // Hub center
        const hub = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 0.18, 8),
          wheelHubMat
        );
        hub.rotation.z = Math.PI / 2;
        bogieGroup.add(hub);

        // Side guide friction wheel
        const sideWheelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 10);
        const sideWheel = new THREE.Mesh(sideWheelGeo, wheelPolyMat);
        sideWheel.position.set(xSide > 0 ? 0.22 : -0.22, -0.15, 0);
        bogieGroup.add(sideWheel);
        wheels.push(sideWheel);

        carRoot.add(bogieGroup);
      };

      createWheelBogie(-0.95, 0.85);
      createWheelBogie(0.95, 0.85);
      createWheelBogie(-0.95, -0.85);
      createWheelBogie(0.95, -0.85);

      // Detailed Animated Passenger (Expressive Face & Waving Arms)
      const passGroup = new THREE.Group();
      passGroup.position.set(0, 1.45, -0.1);

      // Head with Wind-blown Cap & Expression
      const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.52, 16, 16), passengerSkinMat);
      passGroup.add(pHead);

      const pCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.55, 14, 14, 0, Math.PI * 2, 0, Math.PI / 2),
        passengerCapMat
      );
      pCap.position.y = 0.1;
      passGroup.add(pCap);

      const capBrim = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.08, 0.5),
        passengerCapMat
      );
      capBrim.position.set(0, 0.32, 0.45);
      passGroup.add(capBrim);

      // Screaming / Laughing Mouth
      const mouth = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.2, 0.15),
        new THREE.MeshBasicMaterial({ color: 0x1e1b4b })
      );
      mouth.position.set(0, -0.12, 0.48);
      passGroup.add(mouth);

      // Excited Arms Raised High in the Air
      const armGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.0, 8);
      const lArm = new THREE.Mesh(armGeo, passengerSkinMat);
      lArm.position.set(-0.68, 0.65, 0);
      lArm.rotation.z = 0.65;
      passGroup.add(lArm);

      const rArm = new THREE.Mesh(armGeo, passengerSkinMat);
      rArm.position.set(0.68, 0.65, 0);
      rArm.rotation.z = -0.65;
      passGroup.add(rArm);

      carRoot.add(passGroup);

      return {
        carRoot,
        lArm,
        rArm,
        wheels,
        sparksEmitter: new THREE.Vector3(0, 0, 0),
      };
    };

    const car1 = createDetailedCoasterCar(leadCarRedMat, true);
    const car2 = createDetailedCoasterCar(midCarOrangeMat, false);
    const car3 = createDetailedCoasterCar(rearCarCyanMat, false);

    trainGroup.add(car1.carRoot);
    trainGroup.add(car2.carRoot);
    trainGroup.add(car3.carRoot);

    // =============================================================
    // 3. FRICTION SPARKS & AERODYNAMIC WIND STREAKS
    // =============================================================
    // Sparks emitting from rails during high-speed drop
    const sparkCount = 28;
    const sparkGeo = new THREE.DodecahedronGeometry(0.15, 1);
    const sparks: { mesh: THREE.Mesh; vx: number; vy: number; vz: number; life: number; age: number }[] = [];

    for (let i = 0; i < sparkCount; i++) {
      const spk = new THREE.Mesh(sparkGeo, sparkMat);
      spk.visible = false;
      coasterSystemGroup.add(spk);
      sparks.push({
        mesh: spk,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0.35,
        age: 0,
      });
    }

    let sparkIdx = 0;
    const triggerSparks = (pos: THREE.Vector3) => {
      const sp = sparks[sparkIdx % sparks.length];
      sp.mesh.visible = true;
      sp.mesh.position.copy(pos);
      sp.vx = (Math.random() - 0.7) * 8;
      sp.vy = Math.random() * 6 + 2;
      sp.vz = (Math.random() - 0.5) * 5;
      sp.age = 0;
      sparkIdx++;
    };

    // Aerodynamic Wind Speed Lines
    const speedLinesGroup = new THREE.Group();
    coasterSystemGroup.add(speedLinesGroup);

    const lineGeo = new THREE.CylinderGeometry(0.04, 0.04, 6.5, 6);
    lineGeo.rotateZ(Math.PI / 2);
    const speedLines: THREE.Mesh[] = [];

    for (let i = 0; i < 24; i++) {
      const lineMesh = new THREE.Mesh(lineGeo, speedLineMat);
      lineMesh.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 16 - 2,
        (Math.random() - 0.5) * 14
      );
      speedLinesGroup.add(lineMesh);
      speedLines.push(lineMesh);
    }

    // =============================================================
    // 4. PHYSICS-BASED TRAIN MOTION & ANIMATION LOOP
    // =============================================================
    const startTime = performance.now();
    const duration = 4.3; // 4.3s traversal
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Realistic Coaster Gravity Speed Curve:
      // Suspenseful crest approach -> rapid acceleration down drop -> banking speed
      let s = progress;
      if (s < 0.28) {
        // Approach crest with suspense
        s = s * 0.9;
      } else if (s < 0.65) {
        // Accelerating down steep drop
        const tDrop = (s - 0.28) / 0.37;
        s = 0.252 + Math.pow(tDrop, 1.4) * 0.42;
      } else {
        // High momentum rocket out
        const tExit = (s - 0.65) / 0.35;
        s = 0.672 + tExit * 0.328;
      }

      const t1 = Math.min(1, Math.max(0, s));
      const t2 = Math.min(1, Math.max(0, s - 0.045));
      const t3 = Math.min(1, Math.max(0, s - 0.09));

      // Car 1 (Lead Car) Tracking along Spline
      const p1 = trackCurve.getPointAt(t1);
      const tang1 = trackCurve.getTangentAt(t1).normalize();
      car1.carRoot.position.copy(p1);
      car1.carRoot.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang1);

      // Car 2 Tracking
      const p2 = trackCurve.getPointAt(t2);
      const tang2 = trackCurve.getTangentAt(t2).normalize();
      car2.carRoot.position.copy(p2);
      car2.carRoot.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang2);

      // Car 3 Tracking
      const p3 = trackCurve.getPointAt(t3);
      const tang3 = trackCurve.getTangentAt(t3).normalize();
      car3.carRoot.position.copy(p3);
      car3.carRoot.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang3);

      // Friction sparks at bottom of steep drop (t1 between 0.38 and 0.55)
      if (t1 > 0.38 && t1 < 0.55 && Math.random() > 0.35) {
        triggerSparks(p1);
      }

      // Passenger Arms High-Speed Vibration & Wind Reaction
      const armVibe = Math.sin(elapsed * 24);
      car1.lArm.rotation.x = armVibe * 0.35;
      car1.rArm.rotation.x = -armVibe * 0.35;
      car2.lArm.rotation.x = Math.sin(elapsed * 24 + 1) * 0.35;
      car2.rArm.rotation.x = -Math.sin(elapsed * 24 + 1) * 0.35;
      car3.lArm.rotation.x = Math.sin(elapsed * 24 + 2) * 0.35;
      car3.rArm.rotation.x = -Math.sin(elapsed * 24 + 2) * 0.35;

      // Wheel Rotation along track
      [car1, car2, car3].forEach((c) => {
        c.wheels.forEach((w) => {
          w.rotation.x += 0.45;
        });
      });

      // Update Sparks Physics
      sparks.forEach((sp) => {
        if (!sp.mesh.visible) return;
        sp.age += 0.016;
        if (sp.age > sp.life) {
          sp.mesh.visible = false;
          return;
        }
        sp.mesh.position.x += sp.vx * 0.016;
        sp.mesh.position.y += sp.vy * 0.016;
        sp.vy -= 18 * 0.016; // Gravity drop
      });

      // Speed Wind Lines
      speedLines.forEach((line) => {
        line.position.x -= 2.2;
        if (line.position.x < -38) {
          line.position.x = 38;
          line.position.y = Math.random() * 16 - 2;
          line.position.z = (Math.random() - 0.5) * 14;
        }
      });

      // Smooth Fade-out as train reaches right edge (past 70% progress)
      let overallOpacity = 1.0;
      if (progress > 0.70) {
        overallOpacity = Math.max(0, 1 - (progress - 0.70) / 0.30);
      }

      allMaterials.forEach((mat) => {
        if ("opacity" in mat) {
          (mat as THREE.Material & { opacity: number }).opacity = 0.95 * overallOpacity;
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
      data-purpose="floating-roller-coaster-layer"
    >
      {/* 3D WebGL Canvas for Floating Roller Coaster */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Realm Announcement Pill (Top-Center, non-blocking) */}
      <motion.div
        className="absolute top-20 sm:top-24 inset-x-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: -15, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-15, 0, 0, -10], scale: [0.9, 1, 1, 0.95] }}
        transition={{ duration: 3.8, times: [0, 0.15, 0.8, 1], ease: "easeInOut" }}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 text-[#C2410C] border-2 border-[#FF6B35]/50 shadow-xl backdrop-blur-md font-heading font-black text-xs sm:text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#FF6B35] animate-spin" />
          <span>Thrill World • High-Speed Coaster Rush</span>
          <span className="text-base">🎢</span>
        </div>
      </motion.div>
    </div>
  );
}
