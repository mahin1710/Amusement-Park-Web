"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { motion } from "framer-motion";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function DinoWorldStampedeAnimation({ onComplete, isReducedMotion = false }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x14532d, 0.012);

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(48, initW / initH, 0.1, 1000);
    camera.position.set(0, 4, 32);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfef08a, 2.5);
    sunLight.position.set(30, 45, 20);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const jungleRim = new THREE.DirectionalLight(0x22c55e, 1.8);
    jungleRim.position.set(-25, 20, -20);
    scene.add(jungleRim);

    // Ground Plane
    const groundGeo = new THREE.PlaneGeometry(120, 50);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.8 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -3.8;
    scene.add(ground);

    // --- GLTF DINOSAUR WITH ANIMATION MIXER ---
    let mixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();
    const loader = new GLTFLoader();

    const dinoGroup = new THREE.Group();
    scene.add(dinoGroup);

    loader.load(
      "/models/dinosaur.glb",
      (gltf) => {
        const dinosaur = gltf.scene;
        dinosaur.scale.setScalar(0.5);
        dinosaur.position.set(0, -3.8, 0);
        dinosaur.rotation.y = Math.PI / 2 - 0.2;

        dinosaur.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        dinoGroup.add(dinosaur);

        const animations = gltf.animations;
        if (animations && animations.length > 0) {
          mixer = new THREE.AnimationMixer(dinosaur);
          const runClip =
            animations.find((a) => a.name.toLowerCase().includes("run")) ||
            animations.find((a) => a.name.toLowerCase().includes("walk")) ||
            animations[0];

          const action = mixer.clipAction(runClip);
          action.play();
        }
      },
      undefined,
      (error) => {
        console.error("Error loading dinosaur.glb model:", error);
      }
    );

    const startTime = performance.now();
    const duration = 5.0;
    let animFrame: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      // Runs across screen from left to right
      const progress = Math.min(1, elapsed / duration);
      dinoGroup.position.x = -32 + progress * 64;

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
      if (mixer) mixer.stopAllAction();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none pointer-events-none">
      <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14532D]/50 via-[#15803D]/30 to-[#052E16]/65 -z-10" />

      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: -6, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#15803D] via-[#22C55E] to-[#16A34A] border-3 border-white text-white font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-pulse">🦖</span>
          <span>DINO WORLD 3D JURASSIC T-REX!</span>
          <span className="text-2xl">🌿</span>
        </div>
      </motion.div>
    </div>
  );
}
