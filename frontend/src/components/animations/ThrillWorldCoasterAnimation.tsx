"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function ThrillWorldCoasterAnimation({ onComplete, isReducedMotion = false }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1e1b4b, 0.012);

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(52, initW / initH, 0.1, 1000);
    camera.position.set(0, 16, 46);
    camera.lookAt(0, 8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfed7aa, 2.2);
    sunLight.position.set(20, 35, 25);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const neonPoint = new THREE.PointLight(0xff6b35, 3.5, 60);
    neonPoint.position.set(0, 15, 5);
    scene.add(neonPoint);

    // --- 3D ROLLER COASTER TRACK SPLINE (Incline -> Steep Drop -> Vertical Loop -> Banked Turn) ---
    const trackPoints = [
      new THREE.Vector3(-35, 4, -10),
      new THREE.Vector3(-24, 14, -6),
      new THREE.Vector3(-12, 24, 0), // Crest peak
      new THREE.Vector3(-2, 6, 8),   // Steep drop bottom
      new THREE.Vector3(4, 18, 10),   // Loop top
      new THREE.Vector3(12, 5, 8),   // Loop bottom exit
      new THREE.Vector3(22, 12, 0),  // Banked turn
      new THREE.Vector3(38, 8, -12),  // Outrun
    ];
    const trackCurve = new THREE.CatmullRomCurve3(trackPoints);

    // Dual Tubular Steel Rails
    const railMat = new THREE.MeshToonMaterial({ color: 0xff6b35 });
    const spineMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.3 });

    // Center Spine Tube
    const spineGeo = new THREE.TubeGeometry(trackCurve, 120, 0.9, 12, false);
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    scene.add(spineMesh);

    // Left & Right Running Rails (Created by offsetting spline)
    const railGeo = new THREE.TubeGeometry(trackCurve, 120, 0.35, 8, false);
    const leftRail = new THREE.Mesh(railGeo, railMat);
    leftRail.position.set(-0.8, 0.5, 0);
    scene.add(leftRail);

    const rightRail = new THREE.Mesh(railGeo, railMat);
    rightRail.position.set(0.8, 0.5, 0);
    scene.add(rightRail);

    // Track Support Steel Trestles
    const trestleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.4 });
    const trestlePositions = [
      new THREE.Vector3(-24, 7, -6),
      new THREE.Vector3(-12, 12, 0),
      new THREE.Vector3(4, 9, 10),
      new THREE.Vector3(22, 6, 0),
    ];
    trestlePositions.forEach((pos) => {
      const h = pos.y * 2;
      const tMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.7, h, 8), trestleMat);
      tMesh.position.set(pos.x, pos.y, pos.z);
      scene.add(tMesh);
    });

    // --- 3D ROLLER COASTER TRAIN (3 Colorful Cars with Cartoon Passengers) ---
    const trainGroup = new THREE.Group();

    // Helper to create a single coaster car with cartoon passengers
    const createCar = (colorHex: number, isEngine = false) => {
      const carGroup = new THREE.Group();

      // Car Chassis / Tub
      const carMat = new THREE.MeshToonMaterial({ color: colorHex });
      const tubGeo = new THREE.BoxGeometry(2.2, 1.4, 3.2);
      const tub = new THREE.Mesh(tubGeo, carMat);
      tub.position.y = 0.9;
      carGroup.add(tub);

      // Rocket/Dragon nose on front engine car
      if (isEngine) {
        const noseGeo = new THREE.ConeGeometry(1.0, 1.8, 16);
        const nose = new THREE.Mesh(noseGeo, new THREE.MeshToonMaterial({ color: 0xffd93d }));
        nose.rotation.x = Math.PI / 2;
        nose.position.set(0, 0.9, 2.3);
        carGroup.add(nose);

        // Headlight
        const lightGeo = new THREE.SphereGeometry(0.3, 12, 12);
        const lightMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
        const hl = new THREE.Mesh(lightGeo, lightMat);
        hl.position.set(0, 1.2, 2.7);
        carGroup.add(hl);
      }

      // Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 12);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
      const w1 = new THREE.Mesh(wheelGeo, wheelMat);
      w1.rotation.z = Math.PI / 2;
      w1.position.set(-1.2, 0.35, 1.0);
      carGroup.add(w1);

      const w2 = w1.clone();
      w2.position.set(1.2, 0.35, 1.0);
      carGroup.add(w2);

      const w3 = w1.clone();
      w3.position.set(-1.2, 0.35, -1.0);
      carGroup.add(w3);

      const w4 = w1.clone();
      w4.position.set(1.2, 0.35, -1.0);
      carGroup.add(w4);

      // Cartoon Passenger with raised hands
      const passGroup = new THREE.Group();
      passGroup.position.set(0, 1.8, 0.2);

      // Head with smile & hair
      const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), new THREE.MeshToonMaterial({ color: 0xfed7aa }));
      passGroup.add(pHead);

      // Raised Arms Waving
      const armMat = new THREE.MeshToonMaterial({ color: 0xfed7aa });
      const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.1, 8);

      const lArm = new THREE.Mesh(armGeo, armMat);
      lArm.position.set(-0.75, 0.6, 0);
      lArm.rotation.z = 0.5;
      passGroup.add(lArm);

      const rArm = new THREE.Mesh(armGeo, armMat);
      rArm.position.set(0.75, 0.6, 0);
      rArm.rotation.z = -0.5;
      passGroup.add(rArm);

      carGroup.add(passGroup);

      return carGroup;
    };

    const car1 = createCar(0xef4444, true);  // Front engine car (Red & Gold)
    const car2 = createCar(0xf59e0b, false); // Middle car (Orange)
    const car3 = createCar(0x38bdf8, false); // Back car (Aqua)

    trainGroup.add(car1);
    trainGroup.add(car2);
    trainGroup.add(car3);
    scene.add(trainGroup);

    // --- 3D CELEBRATION SPARKLES & SPEED PARTICLES ---
    const particlesCount = 70;
    const pGeo = new THREE.TetrahedronGeometry(0.3, 0);
    const pColors = [0xffd93d, 0xff6b35, 0x38bdf8, 0xec4899, 0xa855f7];
    const particleMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const pMat = new THREE.MeshBasicMaterial({
        color: pColors[i % pColors.length],
        transparent: true,
        opacity: 0.85,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.set(
        (Math.random() - 0.5) * 50,
        Math.random() * 25 + 2,
        (Math.random() - 0.5) * 30
      );
      scene.add(pMesh);
      particleMeshes.push(pMesh);
    }

    // --- 3D CARTOON SPEED WIND LINES ---
    const speedLinesGroup = new THREE.Group();
    const lineGeo = new THREE.CylinderGeometry(0.05, 0.05, 8, 6);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });
    const speedLines: THREE.Mesh[] = [];

    for (let i = 0; i < 24; i++) {
      const lineMesh = new THREE.Mesh(lineGeo, lineMat);
      lineMesh.rotation.z = Math.PI / 2;
      lineMesh.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 20 + 4,
        (Math.random() - 0.5) * 20
      );
      speedLinesGroup.add(lineMesh);
      speedLines.push(lineMesh);
    }
    scene.add(speedLinesGroup);

    const startTime = performance.now();
    const animDuration = 3.6; // 3.6s loop
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      // Calculate progress along track with dynamic acceleration curve (slow uphill, supersonic downhill/loop)
      const rawProgress = (elapsed % animDuration) / animDuration;
      // Ease function to simulate gravity acceleration
      const t1 = rawProgress;
      const t2 = Math.max(0, rawProgress - 0.04);
      const t3 = Math.max(0, rawProgress - 0.08);

      // Position Car 1
      const p1 = trackCurve.getPointAt(t1);
      const tang1 = trackCurve.getTangentAt(t1).normalize();
      car1.position.copy(p1);
      car1.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang1);

      // Position Car 2
      const p2 = trackCurve.getPointAt(t2);
      const tang2 = trackCurve.getTangentAt(t2).normalize();
      car2.position.copy(p2);
      car2.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang2);

      // Position Car 3
      const p3 = trackCurve.getPointAt(t3);
      const tang3 = trackCurve.getTangentAt(t3).normalize();
      car3.position.copy(p3);
      car3.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang3);

      // Dynamic Camera Tracking following the Coaster Drop & Loop
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, p1.x * 0.4, 0.08);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 14 + p1.y * 0.3, 0.08);
      camera.lookAt(p1.x, p1.y, p1.z);

      // Rotate sparkles
      particleMeshes.forEach((pm, idx) => {
        pm.rotation.x += 0.04;
        pm.rotation.y += 0.06;
        pm.position.y += Math.sin(elapsed * 4 + idx) * 0.05;
      });

      // Animate high-velocity speed wind lines rushing past
      speedLines.forEach((line) => {
        line.position.x -= 2.2;
        if (line.position.x < -40) {
          line.position.x = 40;
          line.position.y = Math.random() * 24 + 4;
          line.position.z = (Math.random() - 0.5) * 22;
        }
      });

      // Auto complete when coaster finishes exhilarating lap
      if (elapsed > 4.6) {
        onComplete?.();
      }

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

      {/* Twilight Amusement Park Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B4B]/60 via-[#4C1D95]/40 to-[#FF6B35]/40 -z-10" />

      {/* Comic Action Sticker Banner */}
      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: -10, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], rotate: [-10, 3, 0], opacity: [0, 1, 1] }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 280 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FFD93D] to-[#EF4444] border-3 border-white text-[#172554] font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-spin">⚡</span>
          <span>THRILL WORLD 3D MEGA COASTER RUSH!</span>
          <span className="text-2xl animate-bounce">🎢</span>
        </div>
        <motion.span
          className="mt-2 text-xs sm:text-sm font-heading font-black text-amber-100 uppercase tracking-widest drop-shadow-md bg-black/40 px-4 py-1 rounded-full border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          High-Velocity Steel Coasters & Sky-High Adventures
        </motion.span>
      </motion.div>
    </div>
  );
}
