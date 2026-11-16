"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function DinoStampedeFloatingEffect({ onComplete, isReducedMotion = false }: Props) {
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
    camera.lookAt(0, 1.5, 0);

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

    const rimLight = new THREE.DirectionalLight(0x22c55e, 1.0);
    rimLight.position.set(-15, 15, -15);
    scene.add(rimLight);

    // Group holding the entire running stampede
    const stampedeGroup = new THREE.Group();
    scene.add(stampedeGroup);

    // Shared Materials for easy global opacity fade
    const trexGreenMat = new THREE.MeshToonMaterial({ color: 0x22c55e, transparent: true, opacity: 0.95 });
    const trexYellowMat = new THREE.MeshToonMaterial({ color: 0xfef08a, transparent: true, opacity: 0.95 });
    const triPinkMat = new THREE.MeshToonMaterial({ color: 0xfb7185, transparent: true, opacity: 0.95 });
    const hornMat = new THREE.MeshToonMaterial({ color: 0xfffbeb, transparent: true, opacity: 0.95 });
    const stegoMat = new THREE.MeshToonMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.95 });
    const plateMat = new THREE.MeshToonMaterial({ color: 0xd97706, transparent: true, opacity: 0.95 });
    const raptorMat = new THREE.MeshToonMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.95 });
    const brachioMat = new THREE.MeshToonMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.95 });
    const pteroMat = new THREE.MeshToonMaterial({ color: 0xa855f7, transparent: true, opacity: 0.95 });

    // -------------------------------------------------------------
    // 1. T-REX (Centerpiece, Friendly Green & Yellow Cartoon)
    // -------------------------------------------------------------
    const trexGroup = new THREE.Group();
    trexGroup.position.set(0, -3.5, 2);
    trexGroup.rotation.y = Math.PI / 2;

    // Body
    const trexBody = new THREE.Mesh(new THREE.SphereGeometry(2.6, 18, 18), trexGreenMat);
    trexBody.scale.set(1.1, 1.3, 1.5);
    trexBody.position.set(0, 4.5, 0);
    trexGroup.add(trexBody);

    // Yellow Belly
    const trexBelly = new THREE.Mesh(new THREE.SphereGeometry(2.1, 14, 14), trexYellowMat);
    trexBelly.scale.set(0.9, 1.2, 1.2);
    trexBelly.position.set(0, 4.2, 0.9);
    trexGroup.add(trexBelly);

    // Head
    const trexHead = new THREE.Group();
    trexHead.position.set(0, 7.2, 2.2);

    const headUpper = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.8, 3.0), trexGreenMat);
    headUpper.position.set(0, 0.4, 0);
    trexHead.add(headUpper);

    // Friendly Eyes
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x14532d, transparent: true, opacity: 0.95 });

    const lEye = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), eyeWhiteMat);
    lEye.position.set(-1.15, 0.8, 0.5);
    const lPup = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), eyePupilMat);
    lPup.position.set(-0.25, 0, 0.35);
    lEye.add(lPup);
    trexHead.add(lEye);

    const rEye = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), eyeWhiteMat);
    rEye.position.set(1.15, 0.8, 0.5);
    const rPup = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), eyePupilMat);
    rPup.position.set(0.25, 0, 0.35);
    rEye.add(rPup);
    trexHead.add(rEye);

    // Jaw
    const jawLower = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.7, 2.4), trexGreenMat);
    jawLower.position.set(0, -0.5, 0.2);
    jawLower.rotation.x = 0.25;
    trexHead.add(jawLower);
    trexGroup.add(trexHead);

    // Tail
    const tailMesh = new THREE.Mesh(new THREE.ConeGeometry(1.3, 5.5, 14), trexGreenMat);
    tailMesh.rotation.x = -Math.PI / 2.3;
    tailMesh.position.set(0, 3.8, -3.8);
    trexGroup.add(tailMesh);

    // Tiny Waving Arms
    const armGeo = new THREE.CylinderGeometry(0.22, 0.18, 1.3, 8);
    const lArm = new THREE.Mesh(armGeo, trexGreenMat);
    lArm.position.set(-1.4, 4.8, 1.6);
    lArm.rotation.x = -0.7;
    trexGroup.add(lArm);

    const rArm = new THREE.Mesh(armGeo, trexGreenMat);
    rArm.position.set(1.4, 4.8, 1.6);
    rArm.rotation.x = -0.7;
    trexGroup.add(rArm);

    // Big Stomping Legs
    const legGeo = new THREE.CylinderGeometry(0.65, 0.75, 3.5, 10);
    const footGeo = new THREE.BoxGeometry(1.5, 0.65, 2.2);

    const lLeg = new THREE.Group();
    lLeg.position.set(-1.6, 2.8, 0);
    const lLegMesh = new THREE.Mesh(legGeo, trexGreenMat);
    lLegMesh.position.y = -1.5;
    lLeg.add(lLegMesh);
    const lFoot = new THREE.Mesh(footGeo, trexGreenMat);
    lFoot.position.set(0, -3.0, 0.4);
    lLeg.add(lFoot);
    trexGroup.add(lLeg);

    const rLeg = new THREE.Group();
    rLeg.position.set(1.6, 2.8, 0);
    const rLegMesh = new THREE.Mesh(legGeo, trexGreenMat);
    rLegMesh.position.y = -1.5;
    rLeg.add(rLegMesh);
    const rFoot = new THREE.Mesh(footGeo, trexGreenMat);
    rFoot.position.set(0, -3.0, 0.4);
    rLeg.add(rFoot);
    trexGroup.add(rLeg);

    stampedeGroup.add(trexGroup);

    // -------------------------------------------------------------
    // 2. VELOCIRAPTOR (Sprinting at front, Turquoise)
    // -------------------------------------------------------------
    const raptorGroup = new THREE.Group();
    raptorGroup.position.set(7, -3.8, 6);
    raptorGroup.rotation.y = Math.PI / 2;

    const raptorBody = new THREE.Mesh(new THREE.ConeGeometry(0.9, 3.6, 12), raptorMat);
    raptorBody.rotation.x = Math.PI / 2.3;
    raptorBody.position.set(0, 1.8, 0);
    raptorGroup.add(raptorBody);

    const raptorHead = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.8, 10), raptorMat);
    raptorHead.rotation.x = -Math.PI / 2.4;
    raptorHead.position.set(0, 2.4, 2.0);
    raptorGroup.add(raptorHead);

    stampedeGroup.add(raptorGroup);

    // -------------------------------------------------------------
    // 3. TRICERATOPS (Coral-Pink with 3 Horns)
    // -------------------------------------------------------------
    const triGroup = new THREE.Group();
    triGroup.position.set(-6, -3.5, 4);
    triGroup.rotation.y = Math.PI / 2;

    const triBody = new THREE.Mesh(new THREE.SphereGeometry(2.1, 16, 16), triPinkMat);
    triBody.scale.set(1.1, 1.1, 1.5);
    triBody.position.set(0, 2.6, 0);
    triGroup.add(triBody);

    const frill = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.35, 14), triPinkMat);
    frill.rotation.x = Math.PI / 3;
    frill.position.set(0, 3.8, 1.6);
    triGroup.add(frill);

    const hGeo = new THREE.ConeGeometry(0.28, 1.6, 10);
    const h1 = new THREE.Mesh(hGeo, hornMat);
    h1.position.set(-0.85, 4.3, 2.2);
    h1.rotation.x = -0.5;
    triGroup.add(h1);

    const h2 = new THREE.Mesh(hGeo, hornMat);
    h2.position.set(0.85, 4.3, 2.2);
    h2.rotation.x = -0.5;
    triGroup.add(h2);

    const triLegGeo = new THREE.CylinderGeometry(0.45, 0.55, 1.8, 10);
    const tLeg1 = new THREE.Mesh(triLegGeo, triPinkMat);
    tLeg1.position.set(-1.2, 0.9, 1.3);
    triGroup.add(tLeg1);
    const tLeg2 = new THREE.Mesh(triLegGeo, triPinkMat);
    tLeg2.position.set(1.2, 0.9, 1.3);
    triGroup.add(tLeg2);
    const tLeg3 = new THREE.Mesh(triLegGeo, triPinkMat);
    tLeg3.position.set(-1.2, 0.9, -1.3);
    triGroup.add(tLeg3);
    const tLeg4 = new THREE.Mesh(triLegGeo, triPinkMat);
    tLeg4.position.set(1.2, 0.9, -1.3);
    triGroup.add(tLeg4);

    stampedeGroup.add(triGroup);

    // -------------------------------------------------------------
    // 4. STEGOSAURUS (Amber-Orange with Back Plates & Spiked Tail)
    // -------------------------------------------------------------
    const stegoGroup = new THREE.Group();
    stegoGroup.position.set(-11, -3.5, 0);
    stegoGroup.rotation.y = Math.PI / 2;

    const stegoBody = new THREE.Mesh(new THREE.SphereGeometry(2.0, 16, 16), stegoMat);
    stegoBody.scale.set(1.0, 1.15, 1.6);
    stegoBody.position.set(0, 2.7, 0);
    stegoGroup.add(stegoBody);

    const sHead = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.6, 10), stegoMat);
    sHead.rotation.x = Math.PI / 2.3;
    sHead.position.set(0, 2.1, 2.8);
    stegoGroup.add(sHead);

    // Back Plates
    const plateGeo = new THREE.ConeGeometry(0.65, 1.2, 4);
    for (let i = 0; i < 5; i++) {
      const zOff = -1.8 + i * 0.8;
      const p1 = new THREE.Mesh(plateGeo, plateMat);
      p1.position.set(-0.35, 4.0 + Math.sin(i * 0.6) * 0.3, zOff);
      p1.rotation.y = Math.PI / 4;
      stegoGroup.add(p1);

      const p2 = new THREE.Mesh(plateGeo, plateMat);
      p2.position.set(0.35, 4.0 + Math.sin(i * 0.6) * 0.3, zOff + 0.35);
      p2.rotation.y = Math.PI / 4;
      stegoGroup.add(p2);
    }

    // Spiked Tail
    const stegoTail = new THREE.Group();
    stegoTail.position.set(0, 2.5, -2.2);
    const tailCone = new THREE.Mesh(new THREE.ConeGeometry(0.7, 3.6, 10), stegoMat);
    tailCone.rotation.x = -Math.PI / 2.1;
    tailCone.position.set(0, 0, -1.6);
    stegoTail.add(tailCone);

    const sp1 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.0, 8), hornMat);
    sp1.position.set(-0.6, 0.3, -3.0);
    sp1.rotation.z = 1.1;
    stegoTail.add(sp1);
    const sp2 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.0, 8), hornMat);
    sp2.position.set(0.6, 0.3, -3.0);
    sp2.rotation.z = -1.1;
    stegoTail.add(sp2);
    stegoGroup.add(stegoTail);

    stampedeGroup.add(stegoGroup);

    // -------------------------------------------------------------
    // 5. BRACHIOSAURUS (Background Giant, Sky-Blue)
    // -------------------------------------------------------------
    const brachioGroup = new THREE.Group();
    brachioGroup.position.set(-17, -2.5, -8);
    brachioGroup.rotation.y = Math.PI / 2;

    const bBody = new THREE.Mesh(new THREE.SphereGeometry(3.0, 16, 16), brachioMat);
    bBody.scale.set(1.2, 1.2, 1.7);
    bBody.position.set(0, 5.0, 0);
    brachioGroup.add(bBody);

    const neckCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 5.0, 2.0),
      new THREE.Vector3(0, 10.0, 3.5),
      new THREE.Vector3(0, 14.5, 4.0),
      new THREE.Vector3(0, 16.5, 4.8),
    ]);
    const neckMesh = new THREE.Mesh(new THREE.TubeGeometry(neckCurve, 16, 0.95, 10, false), brachioMat);
    brachioGroup.add(neckMesh);

    const bHead = new THREE.Mesh(new THREE.SphereGeometry(1.0, 12, 12), brachioMat);
    bHead.position.set(0, 16.6, 5.4);
    brachioGroup.add(bHead);

    stampedeGroup.add(brachioGroup);

    // -------------------------------------------------------------
    // 6. PTERODACTYL (Flying Overhead, Purple)
    // -------------------------------------------------------------
    const pteroGroup = new THREE.Group();
    pteroGroup.position.set(3, 8.5, 4);
    pteroGroup.rotation.y = Math.PI / 2;

    const pteroBody = new THREE.Mesh(new THREE.ConeGeometry(0.4, 2.0, 8), pteroMat);
    pteroBody.rotation.x = Math.PI / 2.2;
    pteroGroup.add(pteroBody);

    const wingGeo = new THREE.BoxGeometry(3.0, 0.1, 1.2);
    const lWing = new THREE.Mesh(wingGeo, pteroMat);
    lWing.position.set(-1.8, 0.2, 0);
    pteroGroup.add(lWing);

    const rWing = new THREE.Mesh(wingGeo, pteroMat);
    rWing.position.set(1.8, 0.2, 0);
    pteroGroup.add(rWing);

    stampedeGroup.add(pteroGroup);

    // -------------------------------------------------------------
    // DUST PUFF PARTICLES
    // -------------------------------------------------------------
    const dustParticles: THREE.Mesh[] = [];
    const dustGeo = new THREE.DodecahedronGeometry(0.38, 1);
    const dustMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.55 });

    for (let i = 0; i < 30; i++) {
      const p = new THREE.Mesh(dustGeo, dustMat.clone());
      p.visible = false;
      stampedeGroup.add(p);
      dustParticles.push(p);
    }

    let dustIdx = 0;
    const spawnDust = (x: number, y: number, z: number) => {
      const p = dustParticles[dustIdx % dustParticles.length];
      p.visible = true;
      p.position.set(x - 1.5, y, z + (Math.random() - 0.5) * 1.5);
      p.scale.setScalar(Math.random() * 0.7 + 0.4);
      dustIdx++;
    };

    // --- ANIMATION TIMELINE (Traversing across screen from Left to Right) ---
    const startTime = performance.now();
    const duration = 4.2; // 4.2 seconds traversal
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Entire stampede travels horizontally from -36 to +36
      const currentX = -36 + progress * 72;
      stampedeGroup.position.x = currentX;

      // Velociraptor sprints fast
      raptorGroup.position.y = -3.8 + Math.abs(Math.sin(elapsed * 22)) * 0.35;

      // T-Rex stomping run cycle
      const tStep = Math.sin(elapsed * 11);
      trexGroup.position.y = -3.5 + Math.abs(tStep) * 0.5;
      lLeg.rotation.x = tStep * 0.75;
      rLeg.rotation.x = -tStep * 0.75;
      tailMesh.rotation.y = Math.sin(elapsed * 11) * 0.35;
      trexHead.rotation.z = Math.sin(elapsed * 11) * 0.12;
      lArm.rotation.x = -0.7 + Math.sin(elapsed * 16) * 0.4;
      rArm.rotation.x = -0.7 - Math.sin(elapsed * 16) * 0.4;

      if (Math.abs(tStep) > 0.88) {
        spawnDust(trexGroup.position.x, -3.2, trexGroup.position.z);
      }

      // Triceratops trot
      const triStep = Math.sin(elapsed * 9);
      tLeg1.rotation.x = triStep * 0.45;
      tLeg2.rotation.x = -triStep * 0.45;
      tLeg3.rotation.x = -triStep * 0.45;
      tLeg4.rotation.x = triStep * 0.45;

      // Stegosaurus tail swing & trot
      stegoTail.rotation.y = Math.sin(elapsed * 12) * 0.45;

      // Brachiosaurus slow stride
      bHead.position.y = 16.6 + Math.sin(elapsed * 4) * 0.5;

      // Pterodactyl wing flap
      const flap = Math.sin(elapsed * 18) * 0.4;
      lWing.rotation.z = flap;
      rWing.rotation.z = -flap;

      // Smooth Fade-out as they reach the right side (past 68% progress)
      let overallOpacity = 1;
      if (progress > 0.68) {
        overallOpacity = Math.max(0, 1 - (progress - 0.68) / 0.32);
      }

      trexGreenMat.opacity = 0.95 * overallOpacity;
      trexYellowMat.opacity = 0.95 * overallOpacity;
      triPinkMat.opacity = 0.95 * overallOpacity;
      hornMat.opacity = 0.95 * overallOpacity;
      stegoMat.opacity = 0.95 * overallOpacity;
      plateMat.opacity = 0.95 * overallOpacity;
      raptorMat.opacity = 0.95 * overallOpacity;
      brachioMat.opacity = 0.95 * overallOpacity;
      pteroMat.opacity = 0.95 * overallOpacity;
      eyeWhiteMat.opacity = 0.95 * overallOpacity;
      eyePupilMat.opacity = 0.95 * overallOpacity;

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
      data-purpose="floating-dino-stampede-layer"
    >
      {/* 3D WebGL Canvas for Floating Dino Stampede */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Realm Announcement Pill (Top-Center, non-blocking) */}
      <motion.div
        className="absolute top-20 sm:top-24 inset-x-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: -15, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-15, 0, 0, -10], scale: [0.9, 1, 1, 0.95] }}
        transition={{ duration: 4.0, times: [0, 0.15, 0.8, 1], ease: "easeInOut" }}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 text-[#15803D] border-2 border-[#22C55E]/50 shadow-xl backdrop-blur-md font-heading font-black text-xs sm:text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#16A34A] animate-spin" />
          <span>Dino World • Jurassic Safari Stampede</span>
          <span className="text-base">🦖</span>
        </div>
      </motion.div>
    </div>
  );
}
