"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function WaterWorldSplashAnimation({ onComplete, isReducedMotion = false }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0284c7, 0.015);

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(50, initW / initH, 0.1, 1000);
    camera.position.set(0, 15, 45);
    camera.lookAt(0, 4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- FLOATING BACKGROUND BUBBLES ---
    const bubbleCount = 40;
    const bubbleGeo = new THREE.SphereGeometry(0.5, 14, 14);
    const bubbleMat = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.55,
    });
    const bubbleMeshes: {
      mesh: THREE.Mesh;
      speed: number;
      wobbleSpeed: number;
      wobbleDist: number;
      initialX: number;
    }[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      const bMesh = new THREE.Mesh(bubbleGeo, bubbleMat);
      const initX = (Math.random() - 0.5) * 60;
      const initY = Math.random() * 35 - 5;
      const initZ = (Math.random() - 0.5) * 35 - 5;
      const sc = Math.random() * 0.7 + 0.35;
      bMesh.scale.set(sc, sc, sc);
      bMesh.position.set(initX, initY, initZ);
      scene.add(bMesh);
      bubbleMeshes.push({
        mesh: bMesh,
        speed: Math.random() * 3 + 2,
        wobbleSpeed: Math.random() * 3 + 1,
        wobbleDist: Math.random() * 1.5 + 0.5,
        initialX: initX,
      });
    }

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.0);
    sunLight.position.set(20, 40, 25);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const aquaLight = new THREE.PointLight(0x38bdf8, 3, 50);
    aquaLight.position.set(-5, 5, 5);
    scene.add(aquaLight);

    // --- 3D WATER SLIDE TUBE (Smooth Catmull-Rom 3D Spline) ---
    const slidePoints = [
      new THREE.Vector3(25, 28, -20),
      new THREE.Vector3(18, 22, -10),
      new THREE.Vector3(8, 16, 2),
      new THREE.Vector3(-4, 12, 10),
      new THREE.Vector3(-12, 8, 4),
      new THREE.Vector3(-6, 4, -4),
      new THREE.Vector3(2, 2, 2),
      new THREE.Vector3(0, 0.2, 12),
    ];
    const slideCurve = new THREE.CatmullRomCurve3(slidePoints);

    // Outer Slide Flume
    const slideGeometry = new THREE.TubeGeometry(slideCurve, 100, 2.2, 20, false);
    const slideMaterial = new THREE.MeshToonMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    });
    const slideMesh = new THREE.Mesh(slideGeometry, slideMaterial);
    scene.add(slideMesh);

    // Inner Water Stream
    const waterGeometry = new THREE.TubeGeometry(slideCurve, 100, 1.7, 16, false);
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.3,
      transparent: true,
      opacity: 0.92,
    });
    const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
    scene.add(waterMesh);

    // Splash Pool Base Water Plane
    const poolGeo = new THREE.CylinderGeometry(14, 14, 1.2, 32);
    const poolMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.05,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const poolMesh = new THREE.Mesh(poolGeo, poolMat);
    poolMesh.position.set(0, -0.6, 12);
    scene.add(poolMesh);

    // --- 3D CARTOON CHARACTER ON SWIM TUBE ---
    const characterGroup = new THREE.Group();

    // Yellow / Orange Inflatable Swim Ring (Torus)
    const tubeGeo = new THREE.TorusGeometry(1.5, 0.65, 16, 32);
    const tubeMat = new THREE.MeshToonMaterial({ color: 0xffd93d });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    tubeMesh.rotation.x = Math.PI / 2;
    characterGroup.add(tubeMesh);

    // Cartoon Character Head
    const headGeo = new THREE.SphereGeometry(1.0, 24, 24);
    const skinMat = new THREE.MeshToonMaterial({ color: 0xfed7aa });
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.set(0, 1.2, 0);
    characterGroup.add(headMesh);

    // Swimming Goggles
    const goggleFrameGeo = new THREE.TorusGeometry(0.35, 0.12, 12, 24);
    const goggleMat = new THREE.MeshToonMaterial({ color: 0x0284c7 });
    const goggle1 = new THREE.Mesh(goggleFrameGeo, goggleMat);
    goggle1.position.set(-0.4, 1.35, 0.95);
    characterGroup.add(goggle1);

    const goggle2 = goggle1.clone();
    goggle2.position.set(0.4, 1.35, 0.95);
    characterGroup.add(goggle2);

    // Waving Cartoon Arms
    const armGeo = new THREE.CylinderGeometry(0.22, 0.22, 1.4, 12);
    const armMat = new THREE.MeshToonMaterial({ color: 0xfed7aa });
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-1.4, 1.8, 0);
    leftArm.rotation.z = 0.8;
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(1.4, 1.8, 0);
    rightArm.rotation.z = -0.8;
    characterGroup.add(rightArm);

    scene.add(characterGroup);

    // --- 3D WATER SPLASH PARTICLES & FOUNTAINS ---
    const splashParticlesCount = 180;
    const splashGeo = new THREE.DodecahedronGeometry(0.35, 1);
    const splashMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95,
    });

    const splashGroup = new THREE.Group();
    const dropletData: {
      mesh: THREE.Mesh;
      vel: THREE.Vector3;
      gravity: number;
      active: boolean;
    }[] = [];

    for (let i = 0; i < splashParticlesCount; i++) {
      const mesh = new THREE.Mesh(splashGeo, splashMat);
      mesh.visible = false;
      splashGroup.add(mesh);
      dropletData.push({
        mesh,
        vel: new THREE.Vector3(),
        gravity: 0.45,
        active: false,
      });
    }
    scene.add(splashGroup);

    // Expanding 3D Wave Rings on Water Surface
    const ringGeo = new THREE.RingGeometry(0.5, 1.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const waveRing1 = new THREE.Mesh(ringGeo, ringMat);
    waveRing1.rotation.x = -Math.PI / 2;
    waveRing1.position.set(0, 0.05, 12);
    waveRing1.visible = false;
    scene.add(waveRing1);

    const waveRing2 = waveRing1.clone();
    waveRing2.visible = false;
    scene.add(waveRing2);

    let progress = 0;
    let hasSplashed = false;
    let splashStartTime = 0;
    const animDuration = 2.4; // 2.4s to slide down completely
    const startTime = performance.now();

    // Trigger splash explosion function
    const explodeSplash = () => {
      hasSplashed = true;
      splashStartTime = performance.now();
      waveRing1.visible = true;
      waveRing2.visible = true;

      dropletData.forEach((d) => {
        d.mesh.visible = true;
        d.mesh.position.set(
          (Math.random() - 0.5) * 3,
          0.5,
          12 + (Math.random() - 0.5) * 3
        );
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * (Math.PI / 2.5);
        const speed = Math.random() * 16 + 8;
        d.vel.set(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.cos(phi) * speed + 5,
          Math.sin(phi) * Math.sin(theta) * speed
        );
        d.active = true;
      });
    };

    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      // Animate character along 3D water slide curve
      progress = Math.min(1, elapsed / animDuration);
      if (progress < 1) {
        const point = slideCurve.getPointAt(progress);
        const tangent = slideCurve.getTangentAt(progress).normalize();

        characterGroup.position.copy(point);
        // Elevate character slightly above the tube bed
        characterGroup.position.y += 1.0;

        // Orient character along slide velocity with joyful banking
        characterGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
        characterGroup.rotation.z += Math.sin(elapsed * 12) * 0.25;

        // Waving arms animation
        leftArm.rotation.x = Math.sin(elapsed * 15) * 0.5;
        rightArm.rotation.x = -Math.sin(elapsed * 15) * 0.5;
      } else if (!hasSplashed) {
        explodeSplash();
      }

      // Update 3D splash droplets physics
      if (hasSplashed) {
        const splashElapsed = (now - splashStartTime) / 1000;
        const dt = 0.016;

        dropletData.forEach((d) => {
          if (!d.active) return;
          d.mesh.position.addScaledVector(d.vel, dt);
          d.vel.y -= d.gravity;
          d.mesh.rotation.x += 0.05;

          if (d.mesh.position.y < -1) {
            d.mesh.visible = false;
            d.active = false;
          }
        });

        // Expanding 3D wave rings
        if (waveRing1.visible) {
          const s1 = 1 + splashElapsed * 10;
          waveRing1.scale.set(s1, s1, 1);
          (waveRing1.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - splashElapsed * 0.8);
        }
        if (waveRing2.visible && splashElapsed > 0.25) {
          const s2 = 1 + (splashElapsed - 0.25) * 12;
          waveRing2.scale.set(s2, s2, 1);
          (waveRing2.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (splashElapsed - 0.25) * 0.8);
        }

        // Auto complete when splash settles
        if (splashElapsed > 2.6) {
          onComplete?.();
        }
      }

      // Animate floating background bubbles
      bubbleMeshes.forEach((b) => {
        b.mesh.position.y += b.speed * 0.016;
        b.mesh.position.x = b.initialX + Math.sin(elapsed * b.wobbleSpeed) * b.wobbleDist;
        if (b.mesh.position.y > 35) {
          b.mesh.position.y = -5;
        }
      });

      // Subtle dynamic camera drift
      camera.position.x = Math.sin(elapsed * 0.6) * 3;
      camera.lookAt(0, 4, 6);

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

      {/* Tropical Water Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0284C7]/50 via-[#38BDF8]/30 to-[#0369A1]/65 -z-10" />

      {/* Comic Action Sticker Banner */}
      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: -12, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], rotate: [-12, 3, 0], opacity: [0, 1, 1] }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 280 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#0EA5E9] border-3 border-white text-white font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-spin">🌊</span>
          <span>WATER WORLD 3D SPLASH SURGE!</span>
          <span className="text-2xl animate-bounce">💦</span>
        </div>
        <motion.span
          className="mt-2 text-xs sm:text-sm font-heading font-black text-sky-100 uppercase tracking-widest drop-shadow-md bg-black/40 px-4 py-1 rounded-full border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Bangladesh&apos;s Largest Wave Pool & Speed Slides
        </motion.span>
      </motion.div>
    </div>
  );
}
