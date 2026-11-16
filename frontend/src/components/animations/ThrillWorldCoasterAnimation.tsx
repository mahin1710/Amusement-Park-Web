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

    const camera = new THREE.PerspectiveCamera(50, initW / initH, 0.1, 1000);
    camera.position.set(0, 14, 44);
    camera.lookAt(0, 6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- CINEMATIC LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.5);
    sunLight.position.set(22, 38, 25);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const orangeNeon = new THREE.PointLight(0xff6b35, 3.5, 60);
    orangeNeon.position.set(0, 12, 10);
    scene.add(orangeNeon);

    // --- 3D ROLLER COASTER TRACK SPLINE ---
    const trackPoints = [
      new THREE.Vector3(-36, 12, -4),
      new THREE.Vector3(-24, 11, -2),
      new THREE.Vector3(-10, -1.2, 3),  // Bottom of steep drop
      new THREE.Vector3(2, 7.8, 1),     // Crest 1
      new THREE.Vector3(14, 0.2, 2.5),  // Second dip
      new THREE.Vector3(25, 4.2, -1),   // Turn
      new THREE.Vector3(38, 6.5, -4),   // Exit
    ];
    const trackCurve = new THREE.CatmullRomCurve3(trackPoints);

    // Materials
    const railMat = new THREE.MeshStandardMaterial({ color: 0xff6b35, metalness: 0.85, roughness: 0.2 });
    const spineMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.75, roughness: 0.3 });
    const tieMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.25 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.1 });
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.2 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.35 });

    // Center Spine Tube
    const spineGeo = new THREE.TubeGeometry(trackCurve, 80, 0.65, 12, false);
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    scene.add(spineMesh);

    // Dual Running Rails
    const railGeo = new THREE.TubeGeometry(trackCurve, 80, 0.25, 10, false);
    const leftRail = new THREE.Mesh(railGeo, railMat);
    leftRail.position.set(-0.7, 0.4, 0);
    scene.add(leftRail);

    const rightRail = new THREE.Mesh(railGeo, railMat);
    rightRail.position.set(0.7, 0.4, 0);
    scene.add(rightRail);

    // Structural Rail Cross-Ties
    const tieGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.5, 8);
    tieGeo.rotateZ(Math.PI / 2);
    for (let i = 1; i < 35; i++) {
      const u = i / 35;
      const pt = trackCurve.getPointAt(u);
      const tie = new THREE.Mesh(tieGeo, tieMat);
      tie.position.set(pt.x, pt.y + 0.4, pt.z);
      scene.add(tie);
    }

    // --- 3D TRAIN CARS ---
    const trainGroup = new THREE.Group();
    scene.add(trainGroup);

    const createCar = (colorHex: number, isEngine = false) => {
      const car = new THREE.Group();
      const carMat = new THREE.MeshPhysicalMaterial({
        color: colorHex,
        metalness: 0.65,
        roughness: 0.15,
        clearcoat: 1.0,
      });

      // Car Tub
      const tub = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.95, 2.6), carMat);
      tub.position.y = 0.85;
      car.add(tub);

      if (isEngine) {
        const noseGeo = new THREE.ConeGeometry(0.85, 1.6, 16);
        noseGeo.rotateX(Math.PI / 2);
        const nose = new THREE.Mesh(noseGeo, carMat);
        nose.position.set(0, 0.85, 1.85);
        car.add(nose);

        const hl = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
        hl.position.set(0, 1.05, 2.3);
        car.add(hl);
      }

      // Chrome Lap Bar
      const lapBar = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.08, 8, 16, Math.PI), chromeMat);
      lapBar.rotation.x = Math.PI / 2;
      lapBar.position.set(0, 1.35, 0.3);
      car.add(lapBar);

      // Wheels
      const wGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.16, 12);
      wGeo.rotateZ(Math.PI / 2);
      [-0.95, 0.95].forEach((x) => {
        [-0.8, 0.8].forEach((z) => {
          const w = new THREE.Mesh(wGeo, wheelMat);
          w.position.set(x, 0.38, z);
          car.add(w);
        });
      });

      // Passenger
      const pass = new THREE.Group();
      pass.position.set(0, 1.45, 0);

      const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 14), skinMat);
      pass.add(pHead);

      const armGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.9, 8);
      const lArm = new THREE.Mesh(armGeo, skinMat);
      lArm.position.set(-0.65, 0.6, 0);
      lArm.rotation.z = 0.6;
      pass.add(lArm);

      const rArm = new THREE.Mesh(armGeo, skinMat);
      rArm.position.set(0.65, 0.6, 0);
      rArm.rotation.z = -0.6;
      pass.add(rArm);

      car.add(pass);

      return { car, lArm, rArm };
    };

    const c1 = createCar(0xef4444, true);
    const c2 = createCar(0xf59e0b, false);
    const c3 = createCar(0x06b6d4, false);

    trainGroup.add(c1.car);
    trainGroup.add(c2.car);
    trainGroup.add(c3.car);

    // Speed Particles
    const sparkGeo = new THREE.TetrahedronGeometry(0.2, 0);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffd93d });
    const sparks: THREE.Mesh[] = [];

    for (let i = 0; i < 30; i++) {
      const sp = new THREE.Mesh(sparkGeo, sparkMat);
      sp.position.set((Math.random() - 0.5) * 40, Math.random() * 20, (Math.random() - 0.5) * 20);
      scene.add(sp);
      sparks.push(sp);
    }

    const startTime = performance.now();
    const duration = 4.5;
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      const s = Math.pow(progress, 0.95);
      const t1 = Math.min(1, Math.max(0, s));
      const t2 = Math.min(1, Math.max(0, s - 0.045));
      const t3 = Math.min(1, Math.max(0, s - 0.09));

      const p1 = trackCurve.getPointAt(t1);
      const tang1 = trackCurve.getTangentAt(t1).normalize();
      c1.car.position.copy(p1);
      c1.car.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang1);

      const p2 = trackCurve.getPointAt(t2);
      const tang2 = trackCurve.getTangentAt(t2).normalize();
      c2.car.position.copy(p2);
      c2.car.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang2);

      const p3 = trackCurve.getPointAt(t3);
      const tang3 = trackCurve.getTangentAt(t3).normalize();
      c3.car.position.copy(p3);
      c3.car.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang3);

      c1.lArm.rotation.x = Math.sin(elapsed * 22) * 0.35;
      c1.rArm.rotation.x = -Math.sin(elapsed * 22) * 0.35;

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#431407]/50 via-[#7C2D12]/30 to-[#18181B]/65 -z-10" />

      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: -6, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#FB923C] border-3 border-white text-white font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-spin">🎢</span>
          <span>THRILL WORLD SPEED COASTER!</span>
          <span className="text-2xl">⚡</span>
        </div>
      </motion.div>
    </div>
  );
}
