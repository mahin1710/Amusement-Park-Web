"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function DinoWorldStampedeAnimation({ onComplete, isReducedMotion = false }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [screenRumble, setScreenRumble] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x14532d, 0.012);

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(48, initW / initH, 0.1, 1000);
    camera.position.set(0, 8, 38);
    camera.lookAt(0, 4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfef08a, 2.2);
    sunLight.position.set(30, 45, 20);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const jungleRim = new THREE.DirectionalLight(0x22c55e, 1.2);
    jungleRim.position.set(-25, 20, -20);
    scene.add(jungleRim);

    // --- JURASSIC TERRAIN ---
    const groundGeo = new THREE.PlaneGeometry(140, 60, 32, 32);
    const groundMat = new THREE.MeshToonMaterial({ color: 0x166534 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.5;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // --- 1. 3D CARTOON T-REX (Green & Yellow) ---
    const trexGroup = new THREE.Group();

    // Body (chubby capsule/sphere)
    const trexBodyGeo = new THREE.SphereGeometry(2.8, 20, 20);
    const trexGreenMat = new THREE.MeshToonMaterial({ color: 0x22c55e });
    const trexBody = new THREE.Mesh(trexBodyGeo, trexGreenMat);
    trexBody.scale.set(1.1, 1.3, 1.5);
    trexBody.position.set(0, 5, 0);
    trexGroup.add(trexBody);

    // Tummy (yellow)
    const trexBellyGeo = new THREE.SphereGeometry(2.2, 16, 16);
    const trexYellowMat = new THREE.MeshToonMaterial({ color: 0xfef08a });
    const trexBelly = new THREE.Mesh(trexBellyGeo, trexYellowMat);
    trexBelly.scale.set(0.9, 1.2, 1.2);
    trexBelly.position.set(0, 4.6, 0.9);
    trexGroup.add(trexBelly);

    // Head with open roaring mouth
    const trexHeadGroup = new THREE.Group();
    trexHeadGroup.position.set(0, 7.8, 2.4);

    const headUpperGeo = new THREE.BoxGeometry(2.4, 2.0, 3.2);
    const headUpper = new THREE.Mesh(headUpperGeo, trexGreenMat);
    headUpper.position.set(0, 0.5, 0);
    trexHeadGroup.add(headUpper);

    // Big friendly cartoon eyes
    const eyeGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x14532d });

    const leftEye = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    leftEye.position.set(-1.25, 0.9, 0.5);
    const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), eyePupilMat);
    leftPupil.position.set(-0.25, 0, 0.35);
    leftEye.add(leftPupil);
    trexHeadGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    rightEye.position.set(1.25, 0.9, 0.5);
    const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), eyePupilMat);
    rightPupil.position.set(0.25, 0, 0.35);
    rightEye.add(rightPupil);
    trexHeadGroup.add(rightEye);

    // Teeth & Mouth
    const jawLowerGeo = new THREE.BoxGeometry(2.0, 0.8, 2.6);
    const jawLower = new THREE.Mesh(jawLowerGeo, trexGreenMat);
    jawLower.position.set(0, -0.6, 0.2);
    jawLower.rotation.x = 0.25;
    trexHeadGroup.add(jawLower);

    trexGroup.add(trexHeadGroup);

    // Tail (segmented cones)
    const tailGeo = new THREE.ConeGeometry(1.4, 6.0, 16);
    const tailMesh = new THREE.Mesh(tailGeo, trexGreenMat);
    tailMesh.rotation.x = -Math.PI / 2.3;
    tailMesh.position.set(0, 4.2, -4.2);
    trexGroup.add(tailMesh);

    // Tiny cartoon waving arms
    const armGeo = new THREE.CylinderGeometry(0.25, 0.2, 1.4, 12);
    const leftTrexArm = new THREE.Mesh(armGeo, trexGreenMat);
    leftTrexArm.position.set(-1.5, 5.2, 1.8);
    leftTrexArm.rotation.x = -0.7;
    trexGroup.add(leftTrexArm);

    const rightTrexArm = new THREE.Mesh(armGeo, trexGreenMat);
    rightTrexArm.position.set(1.5, 5.2, 1.8);
    rightTrexArm.rotation.x = -0.7;
    trexGroup.add(rightTrexArm);

    // Stomping Big Legs
    const legGeo = new THREE.CylinderGeometry(0.7, 0.8, 3.8, 12);
    const footGeo = new THREE.BoxGeometry(1.6, 0.7, 2.4);

    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-1.8, 3.2, 0);
    const leftLegMesh = new THREE.Mesh(legGeo, trexGreenMat);
    leftLegMesh.position.y = -1.6;
    leftLegGroup.add(leftLegMesh);
    const leftFootMesh = new THREE.Mesh(footGeo, trexGreenMat);
    leftFootMesh.position.set(0, -3.2, 0.5);
    leftLegGroup.add(leftFootMesh);
    trexGroup.add(leftLegGroup);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(1.8, 3.2, 0);
    const rightLegMesh = new THREE.Mesh(legGeo, trexGreenMat);
    rightLegMesh.position.y = -1.6;
    rightLegGroup.add(rightLegMesh);
    const rightFootMesh = new THREE.Mesh(footGeo, trexGreenMat);
    rightFootMesh.position.set(0, -3.2, 0.5);
    rightLegGroup.add(rightFootMesh);
    trexGroup.add(rightLegGroup);

    trexGroup.position.set(-35, 0, 4);
    trexGroup.rotation.y = Math.PI / 2;
    scene.add(trexGroup);

    // --- 2. 3D CARTOON TRICERATOPS (Coral Pink with 3 Horns) ---
    const triceratopsGroup = new THREE.Group();
    const triPinkMat = new THREE.MeshToonMaterial({ color: 0xfb7185 });
    const hornMat = new THREE.MeshToonMaterial({ color: 0xfffbeb });

    const triBody = new THREE.Mesh(new THREE.SphereGeometry(2.4, 18, 18), triPinkMat);
    triBody.scale.set(1.1, 1.1, 1.6);
    triBody.position.set(0, 3.0, 0);
    triceratopsGroup.add(triBody);

    // Frill Shield
    const frillGeo = new THREE.CylinderGeometry(2.6, 2.6, 0.4, 16);
    const frillMesh = new THREE.Mesh(frillGeo, triPinkMat);
    frillMesh.rotation.x = Math.PI / 3;
    frillMesh.position.set(0, 4.4, 1.8);
    triceratopsGroup.add(frillMesh);

    // 3 Horns
    const hornGeo = new THREE.ConeGeometry(0.3, 1.8, 12);
    const h1 = new THREE.Mesh(hornGeo, hornMat);
    h1.position.set(-1.0, 5.0, 2.6);
    h1.rotation.x = -0.5;
    triceratopsGroup.add(h1);

    const h2 = new THREE.Mesh(hornGeo, hornMat);
    h2.position.set(1.0, 5.0, 2.6);
    h2.rotation.x = -0.5;
    triceratopsGroup.add(h2);

    const hNose = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.2, 12), hornMat);
    hNose.position.set(0, 3.2, 4.0);
    hNose.rotation.x = 0.7;
    triceratopsGroup.add(hNose);

    // Legs
    const triLegGeo = new THREE.CylinderGeometry(0.5, 0.6, 2.2, 12);
    const triLeg1 = new THREE.Mesh(triLegGeo, triPinkMat);
    triLeg1.position.set(-1.4, 1.1, 1.5);
    triceratopsGroup.add(triLeg1);

    const triLeg2 = new THREE.Mesh(triLegGeo, triPinkMat);
    triLeg2.position.set(1.4, 1.1, 1.5);
    triceratopsGroup.add(triLeg2);

    const triLeg3 = new THREE.Mesh(triLegGeo, triPinkMat);
    triLeg3.position.set(-1.4, 1.1, -1.5);
    triceratopsGroup.add(triLeg3);

    const triLeg4 = new THREE.Mesh(triLegGeo, triPinkMat);
    triLeg4.position.set(1.4, 1.1, -1.5);
    triceratopsGroup.add(triLeg4);

    triceratopsGroup.position.set(-45, 0, 8);
    triceratopsGroup.rotation.y = Math.PI / 2;
    scene.add(triceratopsGroup);

    // --- 3. 3D CARTOON BRACHIOSAURUS (Sky-Blue Background Giant) ---
    const brachioGroup = new THREE.Group();
    const brachioMat = new THREE.MeshToonMaterial({ color: 0x38bdf8 });

    const brachioBody = new THREE.Mesh(new THREE.SphereGeometry(3.5, 18, 18), brachioMat);
    brachioBody.scale.set(1.2, 1.2, 1.8);
    brachioBody.position.set(0, 5.5, 0);
    brachioGroup.add(brachioBody);

    // Long Curved Neck
    const neckPoints = [
      new THREE.Vector3(0, 5.5, 2.5),
      new THREE.Vector3(0, 11, 4.0),
      new THREE.Vector3(0, 16, 4.5),
      new THREE.Vector3(0, 18, 5.5),
    ];
    const neckCurve = new THREE.CatmullRomCurve3(neckPoints);
    const neckGeo = new THREE.TubeGeometry(neckCurve, 20, 1.1, 12, false);
    const neckMesh = new THREE.Mesh(neckGeo, brachioMat);
    brachioGroup.add(neckMesh);

    const brachioHead = new THREE.Mesh(new THREE.SphereGeometry(1.2, 14, 14), brachioMat);
    brachioHead.position.set(0, 18.2, 6.2);
    brachioGroup.add(brachioHead);

    // Long Legs
    const brachLegGeo = new THREE.CylinderGeometry(0.7, 0.8, 5.0, 12);
    const bLeg1 = new THREE.Mesh(brachLegGeo, brachioMat);
    bLeg1.position.set(-1.8, 2.5, 1.8);
    brachioGroup.add(bLeg1);

    const bLeg2 = new THREE.Mesh(brachLegGeo, brachioMat);
    bLeg2.position.set(1.8, 2.5, 1.8);
    brachioGroup.add(bLeg2);

    const bLeg3 = new THREE.Mesh(brachLegGeo, brachioMat);
    bLeg3.position.set(-1.8, 2.5, -1.8);
    brachioGroup.add(bLeg3);

    const bLeg4 = new THREE.Mesh(brachLegGeo, brachioMat);
    bLeg4.position.set(1.8, 2.5, -1.8);
    brachioGroup.add(bLeg4);

    brachioGroup.position.set(-50, 0, -10);
    brachioGroup.rotation.y = Math.PI / 2;
    scene.add(brachioGroup);

    // --- 4. 3D CARTOON VELOCIRAPTOR (Turquoise Speedster in foreground) ---
    const raptorGroup = new THREE.Group();
    const raptorMat = new THREE.MeshToonMaterial({ color: 0x06b6d4 });

    const raptorBody = new THREE.Mesh(new THREE.ConeGeometry(1.1, 4.0, 14), raptorMat);
    raptorBody.rotation.x = Math.PI / 2.3;
    raptorBody.position.set(0, 2.2, 0);
    raptorGroup.add(raptorBody);

    const raptorHead = new THREE.Mesh(new THREE.ConeGeometry(0.7, 2.0, 12), raptorMat);
    raptorHead.rotation.x = -Math.PI / 2.4;
    raptorHead.position.set(0, 2.8, 2.2);
    raptorGroup.add(raptorHead);

    raptorGroup.position.set(-30, 0, 14);
    raptorGroup.rotation.y = Math.PI / 2;
    scene.add(raptorGroup);

    // --- 5. 3D CARTOON STEGOSAURUS (Amber/Orange with Dorsal Plates & Spiked Tail) ---
    const stegoGroup = new THREE.Group();
    const stegoMat = new THREE.MeshToonMaterial({ color: 0xf59e0b });
    const plateMat = new THREE.MeshToonMaterial({ color: 0xd97706 });
    const spikeMat = new THREE.MeshToonMaterial({ color: 0xffedd5 });

    // Stego Body
    const stegoBody = new THREE.Mesh(new THREE.SphereGeometry(2.3, 16, 16), stegoMat);
    stegoBody.scale.set(1.0, 1.2, 1.7);
    stegoBody.position.set(0, 3.2, 0);
    stegoGroup.add(stegoBody);

    // Stego Head
    const stegoHead = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.8, 12), stegoMat);
    stegoHead.rotation.x = Math.PI / 2.3;
    stegoHead.position.set(0, 2.4, 3.2);
    stegoGroup.add(stegoHead);

    // Stego Back Plates (Double alternating row)
    const plateGeo = new THREE.ConeGeometry(0.75, 1.4, 4);
    for (let i = 0; i < 6; i++) {
      const zOffset = -2.2 + i * 0.9;
      const p1 = new THREE.Mesh(plateGeo, plateMat);
      p1.position.set(-0.4, 4.8 + Math.sin(i * 0.6) * 0.4, zOffset);
      p1.rotation.y = Math.PI / 4;
      stegoGroup.add(p1);

      const p2 = new THREE.Mesh(plateGeo, plateMat);
      p2.position.set(0.4, 4.8 + Math.sin(i * 0.6) * 0.4, zOffset + 0.4);
      p2.rotation.y = Math.PI / 4;
      stegoGroup.add(p2);
    }

    // Stego Spiked Tail (Thagomizer)
    const stegoTailGroup = new THREE.Group();
    stegoTailGroup.position.set(0, 3.0, -2.6);
    const stegoTailMesh = new THREE.Mesh(new THREE.ConeGeometry(0.8, 4.2, 12), stegoMat);
    stegoTailMesh.rotation.x = -Math.PI / 2.1;
    stegoTailMesh.position.set(0, 0, -2.0);
    stegoTailGroup.add(stegoTailMesh);

    const sp1 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.2, 8), spikeMat);
    sp1.position.set(-0.7, 0.4, -3.6);
    sp1.rotation.z = 1.1;
    stegoTailGroup.add(sp1);

    const sp2 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.2, 8), spikeMat);
    sp2.position.set(0.7, 0.4, -3.6);
    sp2.rotation.z = -1.1;
    stegoTailGroup.add(sp2);

    const sp3 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.1, 8), spikeMat);
    sp3.position.set(-0.6, 0.6, -3.0);
    sp3.rotation.z = 1.0;
    stegoTailGroup.add(sp3);

    const sp4 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.1, 8), spikeMat);
    sp4.position.set(0.6, 0.6, -3.0);
    sp4.rotation.z = -1.0;
    stegoTailGroup.add(sp4);

    stegoGroup.add(stegoTailGroup);

    // Stego 4 Legs
    const stegoLegGeo = new THREE.CylinderGeometry(0.45, 0.55, 2.0, 10);
    const sLeg1 = new THREE.Mesh(stegoLegGeo, stegoMat);
    sLeg1.position.set(-1.2, 1.0, 1.2);
    stegoGroup.add(sLeg1);

    const sLeg2 = new THREE.Mesh(stegoLegGeo, stegoMat);
    sLeg2.position.set(1.2, 1.0, 1.2);
    stegoGroup.add(sLeg2);

    const sLeg3 = new THREE.Mesh(stegoLegGeo, stegoMat);
    sLeg3.position.set(-1.2, 1.0, -1.2);
    stegoGroup.add(sLeg3);

    const sLeg4 = new THREE.Mesh(stegoLegGeo, stegoMat);
    sLeg4.position.set(1.2, 1.0, -1.2);
    stegoGroup.add(sLeg4);

    stegoGroup.position.set(-42, 0, -2);
    stegoGroup.rotation.y = Math.PI / 2;
    scene.add(stegoGroup);

    // --- 3D DUST CLOUD PARTICLES ---
    const dustParticles: THREE.Mesh[] = [];
    const dustGeo = new THREE.DodecahedronGeometry(0.45, 1);
    const dustMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.6 });

    for (let i = 0; i < 40; i++) {
      const p = new THREE.Mesh(dustGeo, dustMat);
      p.visible = false;
      scene.add(p);
      dustParticles.push(p);
    }

    let dustIdx = 0;
    const spawnDust = (pos: THREE.Vector3) => {
      const p = dustParticles[dustIdx % dustParticles.length];
      p.visible = true;
      p.position.set(pos.x - 2, 0.4, pos.z + (Math.random() - 0.5) * 1.5);
      p.scale.setScalar(Math.random() * 0.8 + 0.4);
      dustIdx++;
    };

    const startTime = performance.now();
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      // Velociraptor sprints fastest
      raptorGroup.position.x = -35 + elapsed * 24;
      raptorGroup.position.y = Math.abs(Math.sin(elapsed * 20)) * 0.4;

      // T-Rex runs majestically with heavy stomps
      trexGroup.position.x = -40 + elapsed * 14;
      const tStep = Math.sin(elapsed * 10);
      trexGroup.position.y = Math.abs(tStep) * 0.6;
      leftLegGroup.rotation.x = tStep * 0.8;
      rightLegGroup.rotation.x = -tStep * 0.8;
      tailMesh.rotation.y = Math.sin(elapsed * 10) * 0.35;
      trexHeadGroup.rotation.z = Math.sin(elapsed * 10) * 0.15;
      leftTrexArm.rotation.x = -0.7 + Math.sin(elapsed * 15) * 0.4;
      rightTrexArm.rotation.x = -0.7 - Math.sin(elapsed * 15) * 0.4;

      // Trigger dust & ground rumble on T-Rex footsteps
      if (Math.abs(tStep) > 0.85 && trexGroup.position.x > -15 && trexGroup.position.x < 15) {
        spawnDust(trexGroup.position);
        setScreenRumble(true);
      } else {
        setScreenRumble(false);
      }

      // Triceratops runs in midground
      triceratopsGroup.position.x = -48 + elapsed * 12;
      const triStep = Math.sin(elapsed * 8);
      triLeg1.rotation.x = triStep * 0.5;
      triLeg2.rotation.x = -triStep * 0.5;
      triLeg3.rotation.x = -triStep * 0.5;
      triLeg4.rotation.x = triStep * 0.5;

      // Brachiosaurus walks steadily in background
      brachioGroup.position.x = -55 + elapsed * 7.5;
      bLeg1.rotation.x = Math.sin(elapsed * 4) * 0.3;
      bLeg2.rotation.x = -Math.sin(elapsed * 4) * 0.3;
      brachioHead.position.y = 18.2 + Math.sin(elapsed * 4) * 0.6;

      // Stegosaurus trots in midground with swinging spiked tail
      stegoGroup.position.x = -45 + elapsed * 15;
      const stegoStep = Math.sin(elapsed * 10);
      sLeg1.rotation.x = stegoStep * 0.6;
      sLeg2.rotation.x = -stegoStep * 0.6;
      sLeg3.rotation.x = -stegoStep * 0.6;
      sLeg4.rotation.x = stegoStep * 0.6;
      stegoTailGroup.rotation.y = Math.sin(elapsed * 12) * 0.45;

      // Auto complete when dinosaurs finish stampede
      if (elapsed > 4.5) {
        onComplete?.();
      }

      // Dynamic camera tracking
      camera.position.x = Math.sin(elapsed * 0.5) * 2;
      camera.lookAt(0, 4, 0);

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
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center select-none pointer-events-none transition-transform duration-75 ${
        screenRumble && !isReducedMotion ? "translate-y-1 -translate-x-0.5" : ""
      }`}
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full" />

      {/* Jurassic Sunset Jungle Atmosphere Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#14532D]/55 via-[#15803D]/35 to-[#78350F]/65 -z-10" />

      {/* Comic Action Sticker Banner */}
      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: 8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#15803D] via-[#22C55E] to-[#16A34A] border-3 border-white text-white font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-bounce">🦖</span>
          <span>DINO WORLD 3D JURASSIC STAMPEDE!</span>
          <span className="text-2xl animate-spin">🌴</span>
        </div>
        <motion.span
          className="mt-2 text-xs sm:text-sm font-heading font-black text-emerald-100 uppercase tracking-widest drop-shadow-md bg-black/40 px-4 py-1 rounded-full border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          50+ Life-Sized Roaring Animatronics & Prehistoric Safari
        </motion.span>
      </motion.div>
    </div>
  );
}
