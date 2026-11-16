"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";

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
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- PROCEDURAL CAUSTIC & SEAFOAM CANVAS TEXTURES ---
    const createCausticTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // Base deep ocean gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, "#0284c7");
      grad.addColorStop(0.45, "#06b6d4");
      grad.addColorStop(1, "#0369a1");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Shimmering refractive caustic light ribbons
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 3.5;
      for (let i = 0; i < 50; i++) {
        const cx = (i * 73) % 512;
        const cy = (i * 97) % 512;
        const r = 24 + (i % 6) * 14;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.6, i * 0.35, 0, Math.PI * 2);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 2);
      return tex;
    };

    const createFoamTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 256, 256);

      // Bubbly seafoam clusters
      ctx.fillStyle = "rgba(224, 242, 254, 0.8)";
      for (let i = 0; i < 75; i++) {
        const x = (i * 43) % 256;
        const y = (i * 67) % 256;
        const r = 3 + (i % 5) * 4;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 1);
      return tex;
    };

    const causticTex = createCausticTexture();
    const foamTex = createFoamTexture();

    // --- RICH SUNLIGHT & TROPICAL WATER LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.35);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.7);
    sunLight.position.set(22, 38, 25);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const aquaPoint = new THREE.PointLight(0x38bdf8, 3.8, 65);
    aquaPoint.position.set(0, 8, 14);
    scene.add(aquaPoint);

    const deepCyanRim = new THREE.DirectionalLight(0x0284c7, 2.2);
    deepCyanRim.position.set(-28, 14, -14);
    scene.add(deepCyanRim);

    // Master group for wave system
    const waveSystemGroup = new THREE.Group();
    scene.add(waveSystemGroup);

    // Track all materials for smooth fade-out
    const allMaterials: THREE.Material[] = [];
    const registerMat = <T extends THREE.Material>(mat: T): T => {
      allMaterials.push(mat);
      return mat;
    };

    // --- PBR PHYSICAL WATER & FOAM MATERIALS ---
    const oceanWaterMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        roughness: 0.05,
        metalness: 0.08,
        transmission: 0.8,
        ior: 1.333,
        reflectivity: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        transparent: true,
        opacity: 0.94,
        map: causticTex || undefined,
        side: THREE.DoubleSide,
      })
    );

    const barrelWaterMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        roughness: 0.04,
        metalness: 0.1,
        transmission: 0.86,
        ior: 1.333,
        reflectivity: 0.96,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.92,
      })
    );

    const foamCrestMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.26,
        metalness: 0.05,
        transparent: true,
        opacity: 0.92,
        map: foamTex || undefined,
        side: THREE.DoubleSide,
      })
    );

    const secondarySwellMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        roughness: 0.08,
        transmission: 0.72,
        ior: 1.333,
        clearcoat: 0.85,
        transparent: true,
        opacity: 0.84,
        side: THREE.DoubleSide,
      })
    );

    const dropletMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xbae6fd,
        roughness: 0.04,
        metalness: 0.1,
        transmission: 0.88,
        ior: 1.333,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.95,
      })
    );

    const bubbleMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xe0f2fe,
        roughness: 0.04,
        metalness: 0.35,
        transmission: 0.92,
        ior: 1.333,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.65,
      })
    );

    const sprayMistMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.75,
      })
    );

    // =============================================================
    // 1. SUBDIVIDED 3D OCEAN WAVE SURFACE (Harmonic Gerstner Waves)
    // =============================================================
    const waveWidth = 68;
    const waveDepth = 24;
    const waveSegmentsW = 68;
    const waveSegmentsD = 30;

    const waveSurfaceGeo = new THREE.PlaneGeometry(waveWidth, waveDepth, waveSegmentsW, waveSegmentsD);
    waveSurfaceGeo.rotateX(-Math.PI / 2.3);
    const waveSurfaceMesh = new THREE.Mesh(waveSurfaceGeo, oceanWaterMat);
    waveSurfaceMesh.position.set(0, -1.0, 0);
    waveSystemGroup.add(waveSurfaceMesh);

    const posAttr = waveSurfaceGeo.attributes.position;
    const origPositions = new Float32Array(posAttr.array.length);
    origPositions.set(posAttr.array);

    // =============================================================
    // 2. CURLING WAVE BARREL & CRASHING WHITE-WATER LIP
    // =============================================================
    const barrelGroup = new THREE.Group();
    waveSystemGroup.add(barrelGroup);

    const barrelCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-24, -1.5, 0),
      new THREE.Vector3(-11, 2.8, 2.5),
      new THREE.Vector3(0, 7.6, 4.5),   // Peak crest
      new THREE.Vector3(7, 4.8, 6.2),   // Overhanging barrel lip
      new THREE.Vector3(14, 0.5, 4.0),  // Crash impact trough
      new THREE.Vector3(25, 1.2, 0.5),  // Rebound swell
    ]);
    const barrelGeo = new THREE.TubeGeometry(barrelCurve, 65, 2.4, 18, false);
    const barrelMesh = new THREE.Mesh(barrelGeo, barrelWaterMat);
    barrelGroup.add(barrelMesh);

    // White-Water Foam Lip
    const crestCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-20, 0.5, 1.2),
      new THREE.Vector3(-9, 4.5, 3.2),
      new THREE.Vector3(0, 8.3, 4.8),
      new THREE.Vector3(6, 6.8, 6.5),
      new THREE.Vector3(12, 2.5, 5.2),
      new THREE.Vector3(21, 0.8, 2.5),
    ]);
    const crestGeo = new THREE.TubeGeometry(crestCurve, 65, 1.1, 14, false);
    const crestMesh = new THREE.Mesh(crestGeo, foamCrestMat);
    crestMesh.position.y += 0.3;
    barrelGroup.add(crestMesh);

    // Secondary Rolling Swells (Multi-Plane Depth)
    const frontSwellCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-34, -4.5, 7.5),
      new THREE.Vector3(-16, -3.2, 8.5),
      new THREE.Vector3(2, -2.2, 9.0),
      new THREE.Vector3(20, -3.4, 8.0),
      new THREE.Vector3(34, -4.6, 7.0),
    ]);
    const frontSwellMesh = new THREE.Mesh(
      new THREE.TubeGeometry(frontSwellCurve, 50, 1.4, 12, false),
      secondarySwellMat
    );
    waveSystemGroup.add(frontSwellMesh);

    const backSwellCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-34, -0.5, -8.0),
      new THREE.Vector3(-14, 3.2, -7.0),
      new THREE.Vector3(6, 1.8, -6.5),
      new THREE.Vector3(24, -0.2, -7.5),
      new THREE.Vector3(34, -1.8, -8.0),
    ]);
    const backSwellMesh = new THREE.Mesh(
      new THREE.TubeGeometry(backSwellCurve, 50, 1.6, 12, false),
      secondarySwellMat
    );
    waveSystemGroup.add(backSwellMesh);

    // =============================================================
    // 3. LEAPING PLAYFUL DOLPHIN (Wet Clearcoat Specular Sheen)
    // =============================================================
    const dolphinGroup = new THREE.Group();
    dolphinGroup.position.set(-2, 8.5, 4.2);
    waveSystemGroup.add(dolphinGroup);

    const dolphinSkinMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        roughness: 0.15,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 0.98,
      })
    );
    const dolphinBellyMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.18,
        clearcoat: 0.9,
        transparent: true,
        opacity: 0.98,
      })
    );

    const dBodyGeo = new THREE.SphereGeometry(1.5, 20, 20);
    dBodyGeo.scale(0.8, 0.75, 2.5);
    const dolphinBody = new THREE.Mesh(dBodyGeo, dolphinSkinMat);
    dolphinGroup.add(dolphinBody);

    const dBellyGeo = new THREE.SphereGeometry(1.25, 16, 16);
    dBellyGeo.scale(0.7, 0.52, 2.2);
    const dolphinBelly = new THREE.Mesh(dBellyGeo, dolphinBellyMat);
    dolphinBelly.position.set(0, -0.28, 0);
    dolphinGroup.add(dolphinBelly);

    const beakGeo = new THREE.ConeGeometry(0.35, 1.2, 12);
    beakGeo.rotateX(Math.PI / 2);
    const beak = new THREE.Mesh(beakGeo, dolphinSkinMat);
    beak.position.set(0, -0.08, 2.9);
    dolphinGroup.add(beak);

    const dFinGeo = new THREE.ConeGeometry(0.32, 1.15, 6);
    dFinGeo.rotateX(-0.5);
    const dorsalFin = new THREE.Mesh(dFinGeo, dolphinSkinMat);
    dorsalFin.position.set(0, 0.95, -0.2);
    dolphinGroup.add(dorsalFin);

    const flipperGeo = new THREE.BoxGeometry(1.3, 0.1, 0.55);
    const flipperL = new THREE.Mesh(flipperGeo, dolphinSkinMat);
    flipperL.position.set(-1.05, -0.25, 0.6);
    flipperL.rotation.z = -0.4;
    dolphinGroup.add(flipperL);

    const flipperR = new THREE.Mesh(flipperGeo, dolphinSkinMat);
    flipperR.position.set(1.05, -0.25, 0.6);
    flipperR.rotation.z = 0.4;
    dolphinGroup.add(flipperR);

    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0, -2.7);
    const flukeGeo = new THREE.BoxGeometry(1.7, 0.08, 0.65);
    const flukeMesh = new THREE.Mesh(flukeGeo, dolphinSkinMat);
    tailGroup.add(flukeMesh);
    dolphinGroup.add(tailGroup);

    // =============================================================
    // 4. SURFER MASCOT CARVING THE BARREL (On Colorful Surfboard)
    // =============================================================
    const surferGroup = new THREE.Group();
    surferGroup.position.set(6.0, 3.5, 6.0);
    surferGroup.rotation.y = -Math.PI / 3;
    surferGroup.rotation.z = 0.38;
    waveSystemGroup.add(surferGroup);

    const boardMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xffd93d,
        roughness: 0.18,
        metalness: 0.1,
        transparent: true,
        opacity: 0.98,
      })
    );
    const boardStripeMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.2,
        transparent: true,
        opacity: 0.98,
      })
    );

    const boardMesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.15, 4.4), boardMat);
    surferGroup.add(boardMesh);

    const boardStripe = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.17, 4.42), boardStripeMat);
    surferGroup.add(boardStripe);

    const skinMat = registerMat(new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.28, transparent: true, opacity: 0.98 }));
    const shirtMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35, transparent: true, opacity: 0.98 }));

    const mTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.38, 1.2, 10), shirtMat);
    mTorso.position.set(0, 1.05, -0.2);
    surferGroup.add(mTorso);

    const mHead = new THREE.Mesh(new THREE.SphereGeometry(0.52, 14, 14), skinMat);
    mHead.position.set(0, 1.9, -0.1);
    surferGroup.add(mHead);

    const goggleFrame = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.22, 0.3), boardStripeMat);
    goggleFrame.position.set(0, 1.92, 0.38);
    surferGroup.add(goggleFrame);

    const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.1, 8);
    const armL = new THREE.Mesh(armGeo, skinMat);
    armL.position.set(-0.68, 1.25, -0.2);
    armL.rotation.z = 0.9;
    surferGroup.add(armL);

    const armR = new THREE.Mesh(armGeo, skinMat);
    armR.position.set(0.68, 1.25, -0.2);
    armR.rotation.z = -0.9;
    surferGroup.add(armR);

    // =============================================================
    // 5. PARABOLIC WATER DROPLETS & SEA SPRAY CANNON
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
    const dropletGeo = new THREE.DodecahedronGeometry(0.44, 1);

    for (let i = 0; i < 75; i++) {
      const dMesh = new THREE.Mesh(dropletGeo, dropletMat);
      const origX = -12 + Math.random() * 24;
      const origY = 3.5 + Math.random() * 4.5;
      const origZ = 2.5 + Math.random() * 4.5;
      dMesh.position.set(origX, origY, origZ);
      const sc = 0.35 + Math.random() * 0.75;
      dMesh.scale.set(sc, sc, sc);
      waveSystemGroup.add(dMesh);

      dropletPool.push({
        mesh: dMesh,
        originX: origX,
        originY: origY,
        originZ: origZ,
        vx: 3 + Math.random() * 8,
        vy: 7 + Math.random() * 12,
        vz: (Math.random() - 0.4) * 6,
        gravity: 24 + Math.random() * 8,
        age: Math.random() * 0.8,
        lifespan: 0.9 + Math.random() * 0.5,
      });
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
      const sc = 0.35 + Math.random() * 0.8;
      bMesh.scale.set(sc, sc, sc);
      waveSystemGroup.add(bMesh);
      bubbles.push({
        mesh: bMesh,
        wobblePhase: Math.random() * Math.PI * 2,
        riseSpeed: 0.8 + Math.random() * 1.6,
      });
    }

    // Horizontal Sea Mist Speed Lines
    const sprayLines: THREE.Mesh[] = [];
    const lineGeo = new THREE.CylinderGeometry(0.04, 0.04, 4.5, 6);
    lineGeo.rotateZ(Math.PI / 2);

    for (let i = 0; i < 18; i++) {
      const sMesh = new THREE.Mesh(lineGeo, sprayMistMat);
      sMesh.position.set(
        -14 + Math.random() * 28,
        2.5 + Math.random() * 6.5,
        1.5 + Math.random() * 6
      );
      waveSystemGroup.add(sMesh);
      sprayLines.push(sMesh);
    }

    // =============================================================
    // 6. ANIMATION TIMELINE & FLUID SURFACE SIMULATION
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

      // 1. Organic Fluid Vertex Displacement on Ocean Surface Mesh
      const positions = waveSurfaceGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const ox = origPositions[i];
        const oy = origPositions[i + 1];
        const oz = origPositions[i + 2];

        // Gerstner rolling wave harmonic synthesis
        const wave1 = Math.sin(ox * 0.18 + elapsed * 5.2) * 1.4;
        const wave2 = Math.cos(oz * 0.25 + elapsed * 3.8) * 0.8;
        const wave3 = Math.sin((ox + oz) * 0.12 + elapsed * 4.5) * 0.5;

        // Swell crest envelope peaking near center
        const swellDist = Math.abs(ox);
        const swellFactor = Math.max(0, 1 - swellDist / 32);

        positions[i + 1] = oy + (wave1 + wave2 + wave3) * (0.6 + swellFactor * 1.2);
      }
      waveSurfaceGeo.attributes.position.needsUpdate = true;
      waveSurfaceGeo.computeVertexNormals();

      // 2. Rolling Wave Barrel Dynamics
      barrelGroup.position.y = Math.sin(elapsed * 4.5) * 0.45;
      barrelGroup.rotation.z = Math.sin(elapsed * 3.5) * 0.03;
      crestMesh.position.y = 0.3 + Math.sin(elapsed * 6.5) * 0.18;

      // 3. Multi-Plane Secondary Swells
      frontSwellMesh.position.y = Math.sin(elapsed * 5.0 + 1.2) * 0.35;
      backSwellMesh.position.y = Math.sin(elapsed * 4.2 + 2.4) * 0.45;

      // 4. Leaping Dolphin Arc Dynamics
      const leapProgress = (elapsed * 1.35) % 1;
      const leapY = Math.sin(leapProgress * Math.PI) * 3.8;
      dolphinGroup.position.y = 7.0 + leapY;
      dolphinGroup.rotation.x = 0.38 - leapProgress * 0.85;
      tailGroup.rotation.x = Math.sin(elapsed * 12) * 0.45;

      // 5. Surfer Mascot Carving Turn
      surferGroup.position.y = 3.5 + Math.sin(elapsed * 5.8) * 0.35;
      surferGroup.rotation.z = 0.38 + Math.sin(elapsed * 4.8) * 0.12;

      // 6. Parabolic Droplet Trajectories
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

      // 7. Shimmering Bubbles Rising
      bubbles.forEach((b) => {
        b.mesh.position.y += b.riseSpeed * 0.016;
        b.mesh.position.x += Math.sin(elapsed * 2 + b.wobblePhase) * 0.02;
        if (b.mesh.position.y > 14) {
          b.mesh.position.y = -2;
        }
      });

      // 8. Spray Mist Lines Speed
      sprayLines.forEach((s) => {
        s.position.x += 0.45;
        if (s.position.x > 25) {
          s.position.x = -20 - Math.random() * 8;
        }
      });

      // 9. Smooth Global Fade-Out Past 70% Progress
      let overallOpacity = 1.0;
      if (progress > 0.70) {
        overallOpacity = Math.max(0, 1 - (progress - 0.70) / 0.30);
      }

      allMaterials.forEach((mat) => {
        if ("opacity" in mat) {
          (mat as THREE.Material & { opacity: number }).opacity = 0.94 * overallOpacity;
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
