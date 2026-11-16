"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
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

    // --- THREE.JS SCENE SETUP (100% Transparent Overlay) ---
    const scene = new THREE.Scene();

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(46, initW / initH, 0.1, 1000);
    camera.position.set(0, 3.5, 38);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0); // 100% transparent
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- CINEMATIC LIGHTS (Sunlight, Ambient & Jungle Rim) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfef08a, 2.5);
    sunLight.position.set(20, 35, 25);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const emeraldRim = new THREE.DirectionalLight(0x22c55e, 1.8);
    emeraldRim.position.set(-25, 18, -15);
    scene.add(emeraldRim);

    const warmGroundBounce = new THREE.PointLight(0xf59e0b, 2.2, 45);
    warmGroundBounce.position.set(0, 3, 12);
    scene.add(warmGroundBounce);

    // Group holding the single animated 3D dinosaur
    const dinoGroup = new THREE.Group();
    scene.add(dinoGroup);

    // --- CARTOON GROUND DUST PARTICLES ---
    interface DustParticle {
      mesh: THREE.Mesh;
      active: boolean;
      spawnTime: number;
      life: number;
      vx: number;
      vy: number;
      vz: number;
    }

    const dustPool: DustParticle[] = [];
    const dustSphereGeo = new THREE.DodecahedronGeometry(0.5, 1);
    const dustMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.65,
    });

    for (let i = 0; i < 28; i++) {
      const dMesh = new THREE.Mesh(dustSphereGeo, dustMat.clone());
      dMesh.visible = false;
      scene.add(dMesh);
      dustPool.push({
        mesh: dMesh,
        active: false,
        spawnTime: 0,
        life: 0.65,
        vx: 0,
        vy: 0,
        vz: 0,
      });
    }

    let dustPoolIdx = 0;
    const triggerDustPuff = (x: number, y: number, z: number) => {
      const p = dustPool[dustPoolIdx % dustPool.length];
      p.active = true;
      p.spawnTime = performance.now();
      p.life = 0.6 + Math.random() * 0.3;
      p.mesh.position.set(x - 2.5, y + 0.3, z + (Math.random() - 0.5) * 1.5);
      p.mesh.scale.setScalar(0.7 + Math.random() * 0.5);
      p.mesh.visible = true;
      p.vx = -1.2 - Math.random() * 1.8;
      p.vy = 0.8 + Math.random() * 1.2;
      p.vz = (Math.random() - 0.5) * 0.8;
      dustPoolIdx++;
    };

    // --- GLTF 3D DINOSAUR LOADER WITH SKELETAL ANIMATION MIXER ---
    let mixer: THREE.AnimationMixer | null = null;
    let dinosaurModel: THREE.Group | null = null;
    const clock = new THREE.Clock();
    const loader = new GLTFLoader();

    // Load the 3D animated Dinosaur model
    loader.load(
      "/models/dinosaur.glb",
      (gltf) => {
        const dinosaur = gltf.scene;
        dinosaurModel = dinosaur;

        // Auto-scale and orient to face running direction (towards +X with slight camera cant)
        dinosaur.scale.setScalar(0.48);
        dinosaur.position.set(0, -3.8, 3.5);
        dinosaur.rotation.y = Math.PI / 2 - 0.2; // Face forward-right into screen

        // Enable shadows and transparency support for smooth fade-out
        dinosaur.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const mat = (child as THREE.Mesh).material;
            if (Array.isArray(mat)) {
              mat.forEach((m) => {
                m.transparent = true;
                m.opacity = 1.0;
              });
            } else if (mat) {
              mat.transparent = true;
              mat.opacity = 1.0;
            }
          }
        });

        dinoGroup.add(dinosaur);

        // Check for skeletal animations in the GLTF file
        const animations = gltf.animations;
        if (animations && animations.length > 0) {
          mixer = new THREE.AnimationMixer(dinosaur);

          // Find running or walking animation clip
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

    // --- ANIMATION TIMELINE & RUNNING TRAVERSAL (LEFT TO RIGHT) ---
    const startTime = performance.now();
    const duration = 4.4; // 4.4s traversal across screen
    let animFrame: number;
    let lastDustTime = 0;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);
      const delta = clock.getDelta();

      // Update skeletal animation mixer
      if (mixer) {
        mixer.update(delta);
      }

      // Single dinosaur travels horizontally across screen from Left to Right (X: -36 to +36)
      const currentX = -36 + progress * 72;
      dinoGroup.position.x = currentX;

      // Foot stomp dust emission at regular intervals during run
      if (now - lastDustTime > 260) {
        triggerDustPuff(currentX, -3.8, 3.5);
        lastDustTime = now;
      }

      // Update dust particle physics
      dustPool.forEach((p) => {
        if (!p.active) return;
        const dElapsed = (now - p.spawnTime) / 1000;
        if (dElapsed > p.life) {
          p.active = false;
          p.mesh.visible = false;
          return;
        }
        const lifeFrac = dElapsed / p.life;
        p.mesh.position.x += p.vx * 0.016;
        p.mesh.position.y += p.vy * 0.016;
        p.mesh.position.z += p.vz * 0.016;
        p.mesh.scale.multiplyScalar(1.02);
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.65 * (1 - lifeFrac);
      });

      // Smooth global fade-out past 70% progress
      if (progress > 0.70 && dinosaurModel) {
        const overallOpacity = Math.max(0, 1 - (progress - 0.70) / 0.30);
        dinosaurModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mat = (child as THREE.Mesh).material;
            if (Array.isArray(mat)) {
              mat.forEach((m) => {
                m.opacity = overallOpacity;
              });
            } else if (mat) {
              mat.opacity = overallOpacity;
            }
          }
        });
      }

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
      if (mixer) {
        mixer.stopAllAction();
      }
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
      data-purpose="floating-dino-layer"
    >
      {/* 3D WebGL Canvas for Single Animated GLTF Dinosaur */}
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
          <span>Dino World • 3D Jurassic T-Rex</span>
          <span className="text-base">🦖</span>
        </div>
      </motion.div>
    </div>
  );
}
