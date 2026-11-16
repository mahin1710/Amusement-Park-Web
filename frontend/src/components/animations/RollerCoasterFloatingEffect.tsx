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

    // --- THREE.JS SCENE SETUP (100% Transparent) ---
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
    renderer.setClearColor(0x000000, 0); // 100% transparent overlay
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfef08a, 2.2);
    sunLight.position.set(20, 35, 25);
    scene.add(sunLight);

    const orangeNeon = new THREE.PointLight(0xff6b35, 3.0, 50);
    orangeNeon.position.set(0, 8, 10);
    scene.add(orangeNeon);

    // --- 3D ROLLER COASTER TRACK SPLINE ---
    // Enters from left off-screen, drops steeply, banks up into a crest, exits right off-screen
    const trackPoints = [
      new THREE.Vector3(-36, 12, -4),
      new THREE.Vector3(-22, 11, -2),
      new THREE.Vector3(-10, -1, 3), // Bottom of steep drop
      new THREE.Vector3(2, 8, 1),    // Crest
      new THREE.Vector3(14, 0, 2),   // Second dip
      new THREE.Vector3(25, 4, -1),
      new THREE.Vector3(36, 6, -4),  // Exit right
    ];
    const trackCurve = new THREE.CatmullRomCurve3(trackPoints);

    // Materials for track & cars with global opacity control
    const railMat = new THREE.MeshToonMaterial({ color: 0xff6b35, transparent: true, opacity: 0.88 });
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0.88,
    });
    const redCarMat = new THREE.MeshToonMaterial({ color: 0xef4444, transparent: true, opacity: 0.95 });
    const orangeCarMat = new THREE.MeshToonMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.95 });
    const cyanCarMat = new THREE.MeshToonMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.95 });
    const goldMat = new THREE.MeshToonMaterial({ color: 0xffd93d, transparent: true, opacity: 0.95 });
    const skinMat = new THREE.MeshToonMaterial({ color: 0xfed7aa, transparent: true, opacity: 0.95 });
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, transparent: true, opacity: 0.95 });
    const speedLineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });

    // Center Spine Tube
    const spineGeo = new THREE.TubeGeometry(trackCurve, 80, 0.65, 10, false);
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    scene.add(spineMesh);

    // Dual Running Rails (offset)
    const railGeo = new THREE.TubeGeometry(trackCurve, 80, 0.28, 8, false);
    const leftRail = new THREE.Mesh(railGeo, railMat);
    leftRail.position.set(-0.6, 0.4, 0);
    scene.add(leftRail);

    const rightRail = new THREE.Mesh(railGeo, railMat);
    rightRail.position.set(0.6, 0.4, 0);
    scene.add(rightRail);

    // --- 3D ROLLER COASTER TRAIN (3 Colorful Cars with Cartoon Passengers) ---
    const trainGroup = new THREE.Group();
    scene.add(trainGroup);

    const createCar = (carMat: THREE.Material, isLead = false) => {
      const car = new THREE.Group();

      // Car body / tub
      const tub = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.1, 2.5), carMat);
      tub.position.y = 0.75;
      car.add(tub);

      if (isLead) {
        // Rocket engine cone nose
        const nose = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.4, 12), goldMat);
        nose.rotation.x = Math.PI / 2;
        nose.position.set(0, 0.75, 1.8);
        car.add(nose);

        // Headlight
        const hl = new THREE.Mesh(
          new THREE.SphereGeometry(0.24, 10, 10),
          new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.95 })
        );
        hl.position.set(0, 1.0, 2.2);
        car.add(hl);
      }

      // Wheels
      const wGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.2, 10);
      const w1 = new THREE.Mesh(wGeo, wheelMat);
      w1.rotation.z = Math.PI / 2;
      w1.position.set(-1.0, 0.3, 0.8);
      car.add(w1);

      const w2 = w1.clone();
      w2.position.set(1.0, 0.3, 0.8);
      car.add(w2);

      const w3 = w1.clone();
      w3.position.set(-1.0, 0.3, -0.8);
      car.add(w3);

      const w4 = w1.clone();
      w4.position.set(1.0, 0.3, -0.8);
      car.add(w4);

      // Cartoon Passenger with Hands in the Air
      const pass = new THREE.Group();
      pass.position.set(0, 1.4, 0.1);

      const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 14), skinMat);
      pass.add(pHead);

      const armGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.9, 8);
      const lArm = new THREE.Mesh(armGeo, skinMat);
      lArm.position.set(-0.65, 0.5, 0);
      lArm.rotation.z = 0.6;
      pass.add(lArm);

      const rArm = new THREE.Mesh(armGeo, skinMat);
      rArm.position.set(0.65, 0.5, 0);
      rArm.rotation.z = -0.6;
      pass.add(rArm);

      car.add(pass);

      return { car, lArm, rArm, w1, w2, w3, w4 };
    };

    const c1 = createCar(redCarMat, true);
    const c2 = createCar(orangeCarMat, false);
    const c3 = createCar(cyanCarMat, false);

    trainGroup.add(c1.car);
    trainGroup.add(c2.car);
    trainGroup.add(c3.car);

    // --- 3D SPEED WIND LINES ---
    const speedLinesGroup = new THREE.Group();
    scene.add(speedLinesGroup);

    const lineGeo = new THREE.CylinderGeometry(0.04, 0.04, 6.0, 6);
    const speedLines: THREE.Mesh[] = [];

    for (let i = 0; i < 20; i++) {
      const lineMesh = new THREE.Mesh(lineGeo, speedLineMat);
      lineMesh.rotation.z = Math.PI / 2;
      lineMesh.position.set(
        (Math.random() - 0.5) * 36,
        Math.random() * 16 - 2,
        (Math.random() - 0.5) * 14
      );
      speedLinesGroup.add(lineMesh);
      speedLines.push(lineMesh);
    }

    // --- ANIMATION TIMELINE ---
    const startTime = performance.now();
    const duration = 4.0; // 4.0 seconds traversal
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Realistic gravity acceleration curve:
      // Starts medium, accelerates down drop, climbs crest, zooms out
      const easedProgress = Math.pow(progress, 0.95);

      const t1 = Math.min(1, Math.max(0, easedProgress));
      const t2 = Math.min(1, Math.max(0, easedProgress - 0.045));
      const t3 = Math.min(1, Math.max(0, easedProgress - 0.09));

      // Car 1 Position & Rotation
      const p1 = trackCurve.getPointAt(t1);
      const tang1 = trackCurve.getTangentAt(t1).normalize();
      c1.car.position.copy(p1);
      c1.car.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang1);

      // Car 2 Position & Rotation
      const p2 = trackCurve.getPointAt(t2);
      const tang2 = trackCurve.getTangentAt(t2).normalize();
      c2.car.position.copy(p2);
      c2.car.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang2);

      // Car 3 Position & Rotation
      const p3 = trackCurve.getPointAt(t3);
      const tang3 = trackCurve.getTangentAt(t3).normalize();
      c3.car.position.copy(p3);
      c3.car.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang3);

      // Rotate passenger arms with speed vibration
      c1.lArm.rotation.x = Math.sin(elapsed * 20) * 0.3;
      c1.rArm.rotation.x = -Math.sin(elapsed * 20) * 0.3;
      c2.lArm.rotation.x = Math.sin(elapsed * 20 + 1) * 0.3;
      c2.rArm.rotation.x = -Math.sin(elapsed * 20 + 1) * 0.3;
      c3.lArm.rotation.x = Math.sin(elapsed * 20 + 2) * 0.3;
      c3.rArm.rotation.x = -Math.sin(elapsed * 20 + 2) * 0.3;

      // Animate speed wind lines rushing past
      speedLines.forEach((line) => {
        line.position.x -= 2.0;
        if (line.position.x < -36) {
          line.position.x = 36;
          line.position.y = Math.random() * 16 - 2;
          line.position.z = (Math.random() - 0.5) * 14;
        }
      });

      // Smooth Fade-out as it approaches the right edge (past 68% progress)
      let overallOpacity = 1;
      if (progress > 0.68) {
        overallOpacity = Math.max(0, 1 - (progress - 0.68) / 0.32);
      }

      railMat.opacity = 0.88 * overallOpacity;
      spineMat.opacity = 0.88 * overallOpacity;
      redCarMat.opacity = 0.95 * overallOpacity;
      orangeCarMat.opacity = 0.95 * overallOpacity;
      cyanCarMat.opacity = 0.95 * overallOpacity;
      goldMat.opacity = 0.95 * overallOpacity;
      skinMat.opacity = 0.95 * overallOpacity;
      wheelMat.opacity = 0.95 * overallOpacity;
      speedLineMat.opacity = 0.75 * overallOpacity;

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
