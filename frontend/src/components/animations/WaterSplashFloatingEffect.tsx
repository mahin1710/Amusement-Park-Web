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

    // --- THREE.JS SCENE SETUP (100% Transparent Non-Blocking Overlay) ---
    const scene = new THREE.Scene();

    const initW = container.clientWidth || window.innerWidth || 1200;
    const initH = container.clientHeight || window.innerHeight || 800;

    const camera = new THREE.PerspectiveCamera(46, initW / initH, 0.1, 1000);
    camera.position.set(0, 13.0, 30);
    camera.lookAt(0, 4.5, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0); // 100% transparent overlay
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- GPU RESOURCE REGISTRIES FOR CLEAN DISPOSAL ---
    const materialsToDispose: THREE.Material[] = [];
    const geometriesToDispose: THREE.BufferGeometry[] = [];

    const registerMat = <T extends THREE.Material>(m: T): T => {
      materialsToDispose.push(m);
      return m;
    };
    const registerGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      geometriesToDispose.push(g);
      return g;
    };

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    sunLight.position.set(16, 28, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanRim.position.set(-18, 14, -10);
    scene.add(cyanRim);

    const sunGlint = new THREE.DirectionalLight(0xfef08a, 1.1);
    sunGlint.position.set(22, 22, 12);
    scene.add(sunGlint);

    // FIXED STATIONARY POSITION ON THE LEFT SIDE OF THE SCREEN
    // (Shifted 0.25 inch right: desktop -20.6)
    const sceneGroup = new THREE.Group();
    const updateGroupPosition = (width: number) => {
      if (width < 768) {
        // Mobile view: compact scale, shifted left & lower
        sceneGroup.position.set(-11.6, -2.0, -3);
        sceneGroup.scale.set(0.60, 0.60, 0.60);
      } else if (width < 1200) {
        // Tablet / Medium screen
        sceneGroup.position.set(-16.7, -2.2, -1);
        sceneGroup.scale.set(0.72, 0.72, 0.72);
      } else {
        // Desktop view: shifted 0.25 inch right to -20.6, lower down (-2.4), 0.80 scale
        sceneGroup.position.set(-20.6, -2.4, 0);
        sceneGroup.scale.set(0.80, 0.80, 0.80);
      }
    };
    updateGroupPosition(initW);
    scene.add(sceneGroup);

    // =============================================================
    // MATERIALS (Authentic to Sketchfab "Water Slider" reference)
    // =============================================================
    const yellowSlideMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfacc15, // Sunburst Playground Yellow
        roughness: 0.22,
        metalness: 0.12,
        transparent: true,
        opacity: 0.0, // starts at 0, smoothly fades in
        side: THREE.DoubleSide,
      })
    );

    const blueSlideMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x1d70b8, // Royal Water Park Blue
        roughness: 0.22,
        metalness: 0.12,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      })
    );

    const redStructureMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xdc2626, // Red Support Columns & Rails
        roughness: 0.35,
        metalness: 0.2,
        transparent: true,
        opacity: 0.0,
      })
    );

    const redRoofMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x991b1b, // Burgundy Gabled Timber Roof
        roughness: 0.45,
        transparent: true,
        opacity: 0.0,
      })
    );

    const deckMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xb45309, // Platform Deck Timber
        roughness: 0.5,
        transparent: true,
        opacity: 0.0,
      })
    );

    const collarMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0284c7, // Flange Joint Collar Rings
        metalness: 0.4,
        roughness: 0.25,
        transparent: true,
        opacity: 0.0,
      })
    );

    // Pool & Water Materials
    const poolWallMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xf1f5f9, // Crisp White/Cyan Coping Border
        roughness: 0.2,
        transparent: true,
        opacity: 0.0,
      })
    );

    const poolWaterMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0284c7, // Vibrant Aqua Ocean Water
        roughness: 0.15,
        metalness: 0.18,
        transparent: true,
        opacity: 0.0,
      })
    );

    const splashWaterMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xbaf1fc, // Translucent Foaming Splash Curtain
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      })
    );

    const dropletMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xe0f8fe, // Sparkling Water Droplet Beads
        roughness: 0.08,
        metalness: 0.3,
        transparent: true,
        opacity: 0.0,
      })
    );

    const rippleMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0x7dd3fc,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      })
    );

    const foamMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      })
    );

    // Rider Character Materials
    const skinMat = registerMat(new THREE.MeshStandardMaterial({ color: 0xfdba74, roughness: 0.4, transparent: true, opacity: 0.0 }));
    const vestMat = registerMat(new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.3, transparent: true, opacity: 0.0 }));
    const capMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.2, transparent: true, opacity: 0.0 }));
    const shortsMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3, transparent: true, opacity: 0.0 }));
    const eyeWhiteMat = registerMat(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, transparent: true, opacity: 0.0 }));
    const pupilMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, transparent: true, opacity: 0.0 }));

    // Material Groups for Clean Staged Fading
    const structureMaterials = [yellowSlideMat, blueSlideMat, redStructureMat, redRoofMat, deckMat, collarMat, poolWallMat];
    const riderMaterials = [skinMat, vestMat, capMat, shortsMat, eyeWhiteMat, pupilMat];

    // =============================================================
    // 1. TOWER PLATFORM & HUT (Reference: Sketchfab Water Slider)
    // =============================================================
    const towerGroup = new THREE.Group();
    towerGroup.position.set(-4.5, 0, -2.5);
    sceneGroup.add(towerGroup);

    // 4 Red Support Legs from Ground (Y=0) to Platform (Y=10.5)
    const legGeo = registerGeo(new THREE.CylinderGeometry(0.26, 0.26, 10.5, 12));
    const legPositions = [
      [-1.8, 5.25, -1.8],
      [1.8, 5.25, -1.8],
      [-1.8, 5.25, 1.8],
      [1.8, 5.25, 1.8],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, redStructureMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      towerGroup.add(leg);
    });

    // Cross-Bracing Struts
    const braceGeo = registerGeo(new THREE.CylinderGeometry(0.12, 0.12, 3.6, 8));
    braceGeo.rotateZ(Math.PI / 2);
    const brace1 = new THREE.Mesh(braceGeo, redStructureMat);
    brace1.position.set(0, 5.5, -1.8);
    towerGroup.add(brace1);

    // Platform Deck (Y=10.5)
    const deckGeo = registerGeo(new THREE.BoxGeometry(4.2, 0.4, 4.2));
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, 10.5, 0);
    deck.receiveShadow = true;
    towerGroup.add(deck);

    // Tower Hut Cabin Walls
    const hutWallGeo = registerGeo(new THREE.BoxGeometry(3.6, 3.2, 3.6));
    const hut = new THREE.Mesh(hutWallGeo, redRoofMat);
    hut.position.set(0, 12.3, 0);
    hut.castShadow = true;
    towerGroup.add(hut);

    // Gabled Roof
    const roofGeo = registerGeo(new THREE.ConeGeometry(3.2, 2.2, 4));
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, redRoofMat);
    roof.position.set(0, 15.0, 0);
    roof.castShadow = true;
    towerGroup.add(roof);

    // Access Ladder at the rear
    const ladderStileGeo = registerGeo(new THREE.CylinderGeometry(0.1, 0.1, 10.8, 8));
    const ladderL = new THREE.Mesh(ladderStileGeo, redStructureMat);
    ladderL.position.set(-0.8, 5.3, -2.1);
    const ladderR = new THREE.Mesh(ladderStileGeo, redStructureMat);
    ladderR.position.set(0.8, 5.3, -2.1);
    towerGroup.add(ladderL);
    towerGroup.add(ladderR);

    const rungGeo = registerGeo(new THREE.CylinderGeometry(0.06, 0.06, 1.6, 8));
    rungGeo.rotateZ(Math.PI / 2);
    for (let i = 1; i <= 9; i++) {
      const rung = new THREE.Mesh(rungGeo, blueSlideMat);
      rung.position.set(0, i * 1.05, -2.1);
      towerGroup.add(rung);
    }

    // Yellow Starting Entry Tube Collar
    const tubeEntryGeo = registerGeo(new THREE.CylinderGeometry(1.2, 1.2, 1.6, 16, 1, true));
    tubeEntryGeo.rotateZ(Math.PI / 2);
    const tubeEntry = new THREE.Mesh(tubeEntryGeo, yellowSlideMat);
    tubeEntry.position.set(2.4, 11.2, 0.8);
    towerGroup.add(tubeEntry);

    // =============================================================
    // 2. THE SPIRAL WATER SLIDE (Right Side of Tower)
    // =============================================================
    const spiralPoints = [
      new THREE.Vector3(-2.2, 11.0, -1.2), // Entry
      new THREE.Vector3(-0.5, 10.6, 0.8),
      new THREE.Vector3(2.5, 9.8, 2.2),   // 1st Turn (Upper helix)
      new THREE.Vector3(5.5, 8.6, 0.4),
      new THREE.Vector3(4.5, 7.2, -3.2),
      new THREE.Vector3(1.2, 5.8, -4.2),  // Back sweep
      new THREE.Vector3(-2.2, 4.8, -2.4),
      new THREE.Vector3(-3.0, 3.8, 1.2),  // 2nd Turn (Lower helix)
      new THREE.Vector3(0.2, 2.9, 4.2),
      new THREE.Vector3(4.2, 2.1, 3.4),
      new THREE.Vector3(7.2, 1.4, 0.5),   // Exit ramp transition
      new THREE.Vector3(9.8, 0.8, -1.8),  // Launch ramp
      new THREE.Vector3(12.5, 0.35, -3.4), // Plunge into splash pool
      new THREE.Vector3(14.5, 0.1, -4.4),  // Pool run-out
    ];
    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);

    // Build authentic U-channel Flume Segments with parallel transport frame
    const worldUp = new THREE.Vector3(0, 1, 0);
    function buildFlumeSegmentGeo(curve: THREE.CatmullRomCurve3, uStart: number, uEnd: number, lenSteps = 24, crossSteps = 10) {
      const geo = new THREE.BufferGeometry();
      const positions: number[] = [];
      const indices: number[] = [];
      const uvs: number[] = [];
      const R = 1.05; // radius of water trough

      for (let i = 0; i <= lenSteps; i++) {
        const u = uStart + (i / lenSteps) * (uEnd - uStart);
        const pt = curve.getPointAt(u);
        const tang = curve.getTangentAt(u).normalize();
        let lat = new THREE.Vector3().crossVectors(tang, worldUp).normalize();
        if (lat.lengthSq() < 0.001) lat.set(1, 0, 0);
        const vert = new THREE.Vector3().crossVectors(lat, tang).normalize();

        for (let j = 0; j <= crossSteps; j++) {
          const frac = j / crossSteps;
          const angle = (-115 + frac * 230) * (Math.PI / 180);
          const sOffset = Math.sin(angle) * R;
          const vOffset = (1 - Math.cos(angle)) * R;

          const posX = pt.x + lat.x * sOffset + vert.x * vOffset;
          const posY = pt.y + lat.y * sOffset + vert.y * vOffset;
          const posZ = pt.z + lat.z * sOffset + vert.z * vOffset;
          positions.push(posX, posY, posZ);
          uvs.push(frac, i / lenSteps);
        }
      }

      for (let i = 0; i < lenSteps; i++) {
        for (let j = 0; j < crossSteps; j++) {
          const a = i * (crossSteps + 1) + j;
          const b = (i + 1) * (crossSteps + 1) + j;
          const c = (i + 1) * (crossSteps + 1) + (j + 1);
          const d = i * (crossSteps + 1) + (j + 1);

          indices.push(a, b, d);
          indices.push(b, c, d);
          indices.push(a, d, b);
          indices.push(b, d, c);
        }
      }

      geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
      geo.setIndex(indices);
      geo.computeVertexNormals();
      return registerGeo(geo);
    }

    // 6 Alternating Segments: Yellow -> Blue -> Yellow -> Blue -> Yellow -> Blue
    const numSegments = 6;
    for (let s = 0; s < numSegments; s++) {
      const u0 = s / numSegments;
      const u1 = (s + 1) / numSegments;
      const segGeo = buildFlumeSegmentGeo(spiralCurve, u0, u1);
      const isYellow = s % 2 === 0;
      const segMesh = new THREE.Mesh(segGeo, isYellow ? yellowSlideMat : blueSlideMat);
      segMesh.castShadow = true;
      segMesh.receiveShadow = true;
      sceneGroup.add(segMesh);

      // Flange Joint Ring between segments
      if (s > 0) {
        const jointPt = spiralCurve.getPointAt(u0);
        const jointTang = spiralCurve.getTangentAt(u0).normalize();
        const collarGeo = registerGeo(new THREE.TorusGeometry(1.12, 0.1, 8, 20));
        const collarMesh = new THREE.Mesh(collarGeo, collarMat);
        collarMesh.position.copy(jointPt);
        collarMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), jointTang);
        sceneGroup.add(collarMesh);
      }
    }

    // Central Red Mast & Cantilever Brackets for Spiral Slide
    const centerMastGeo = registerGeo(new THREE.CylinderGeometry(0.38, 0.38, 11.2, 14));
    const centerMast = new THREE.Mesh(centerMastGeo, redStructureMat);
    centerMast.position.set(1.5, 5.6, -0.6);
    centerMast.castShadow = true;
    sceneGroup.add(centerMast);

    // Cantilever Support Arms branching out to hold slide tiers
    const bracketArmGeo = registerGeo(new THREE.CylinderGeometry(0.14, 0.14, 3.8, 8));
    bracketArmGeo.rotateZ(Math.PI / 2);

    const arm1 = new THREE.Mesh(bracketArmGeo, redStructureMat);
    arm1.position.set(3.2, 8.5, 0.5);
    sceneGroup.add(arm1);

    const arm2 = new THREE.Mesh(bracketArmGeo, redStructureMat);
    arm2.position.set(0.0, 5.7, -3.0);
    arm2.rotation.y = Math.PI / 2.2;
    sceneGroup.add(arm2);

    const arm3 = new THREE.Mesh(bracketArmGeo, redStructureMat);
    arm3.position.set(2.8, 2.2, 2.4);
    sceneGroup.add(arm3);

    // Exit Ground Column
    const exitCol = new THREE.Mesh(registerGeo(new THREE.CylinderGeometry(0.2, 0.2, 1.4, 8)), redStructureMat);
    exitCol.position.set(9.8, 0.7, -1.8);
    sceneGroup.add(exitCol);

    // =============================================================
    // 4. SPLASHDOWN POOL AT SLIDE TERMINUS
    // =============================================================
    const poolGroup = new THREE.Group();
    poolGroup.position.set(13.8, -0.1, -4.2);
    sceneGroup.add(poolGroup);

    // Compact Pool Basin Wall / Border
    const poolBorderGeo = registerGeo(new THREE.BoxGeometry(9.5, 0.7, 8.5));
    const poolBorder = new THREE.Mesh(poolBorderGeo, poolWallMat);
    poolBorder.position.set(0, -0.25, 0);
    poolGroup.add(poolBorder);

    // Water Surface Plane with Harmonic Wave Vertex Displacement
    const poolWaterGeo = registerGeo(new THREE.PlaneGeometry(8.5, 7.5, 40, 40));
    poolWaterGeo.rotateX(-Math.PI / 2);
    const poolWaterMesh = new THREE.Mesh(poolWaterGeo, poolWaterMat);
    poolWaterMesh.position.set(0, 0.05, 0);
    poolGroup.add(poolWaterMesh);

    const poolPosAttr = poolWaterGeo.attributes.position;
    const poolOrigPos = poolPosAttr.array.slice();

    // =============================================================
    // 5. THE 3D CARTOON RIDER CHARACTER
    // =============================================================
    const riderGroup = new THREE.Group();
    sceneGroup.add(riderGroup);

    // Head
    const headGeo = registerGeo(new THREE.SphereGeometry(0.48, 16, 16));
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 0.95, 0);
    riderGroup.add(head);

    // Cyan Swim Cap
    const capGeo = registerGeo(new THREE.SphereGeometry(0.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.9));
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(0, 0.97, 0);
    riderGroup.add(cap);

    // Goggles Band & Lenses
    const goggleBandGeo = registerGeo(new THREE.TorusGeometry(0.5, 0.04, 6, 18));
    goggleBandGeo.rotateX(Math.PI / 2);
    const goggleBand = new THREE.Mesh(goggleBandGeo, shortsMat);
    goggleBand.position.set(0, 1.05, 0);
    riderGroup.add(goggleBand);

    const eyeGeo = registerGeo(new THREE.SphereGeometry(0.1, 10, 10));
    const eyeL = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    eyeL.position.set(-0.16, 0.98, 0.42);
    const eyeR = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    eyeR.position.set(0.16, 0.98, 0.42);
    riderGroup.add(eyeL);
    riderGroup.add(eyeR);

    const pupilGeo = registerGeo(new THREE.SphereGeometry(0.05, 8, 8));
    const pupilL = new THREE.Mesh(pupilGeo, pupilMat);
    pupilL.position.set(-0.16, 0.98, 0.5);
    const pupilR = new THREE.Mesh(pupilGeo, pupilMat);
    pupilR.position.set(0.16, 0.98, 0.5);
    riderGroup.add(pupilL);
    riderGroup.add(pupilR);

    // Torso with High-Vis Orange Life Vest
    const torsoGeo = registerGeo(new THREE.CylinderGeometry(0.4, 0.36, 0.85, 12));
    const torso = new THREE.Mesh(torsoGeo, vestMat);
    torso.position.set(0, 0.38, 0);
    riderGroup.add(torso);

    // Left & Right Arms (Raised in Excitement / Celebration)
    const riderArmGeo = registerGeo(new THREE.CylinderGeometry(0.1, 0.08, 0.65, 8));
    riderArmGeo.rotateZ(Math.PI / 2);

    const armL = new THREE.Mesh(riderArmGeo, skinMat);
    armL.position.set(-0.55, 0.7, 0.05);
    armL.rotation.z = 0.85;
    const armR = new THREE.Mesh(riderArmGeo, skinMat);
    armR.position.set(0.55, 0.7, 0.05);
    armR.rotation.z = -0.85;
    riderGroup.add(armL);
    riderGroup.add(armR);

    // Shorts & Legs (Seated water-slide posture, legs extended forward)
    const legGeoL = registerGeo(new THREE.CylinderGeometry(0.14, 0.12, 0.75, 8));
    legGeoL.rotateX(Math.PI / 2.3);
    const legL = new THREE.Mesh(legGeoL, shortsMat);
    legL.position.set(-0.22, 0.05, 0.38);
    const legR = new THREE.Mesh(legGeoL, shortsMat);
    legR.position.set(0.22, 0.05, 0.38);
    riderGroup.add(legL);
    riderGroup.add(legR);

    // Initial position of rider at top entrance of slide
    const startPt = spiralCurve.getPointAt(0.001);
    riderGroup.position.set(startPt.x, startPt.y + 0.35, startPt.z);

    // =============================================================
    // 6. SPLASHDOWN EFFECTS: CROWN CONE, DROPLETS, RIPPLES & FOAM
    // =============================================================
    // Translucent Upward Splash Crown
    const splashCrownGeo = registerGeo(new THREE.CylinderGeometry(0.3, 2.6, 2.8, 18, 1, true));
    const splashCrown = new THREE.Mesh(splashCrownGeo, splashWaterMat);
    splashCrown.position.set(13.8, 1.2, -4.2);
    splashCrown.scale.set(0.001, 0.001, 0.001);
    sceneGroup.add(splashCrown);

    // Secondary Inner Water Spout
    const spoutGeo = registerGeo(new THREE.ConeGeometry(1.2, 3.2, 12, 1, true));
    const spoutMesh = new THREE.Mesh(spoutGeo, splashWaterMat);
    spoutMesh.position.set(13.8, 1.5, -4.2);
    spoutMesh.scale.set(0.001, 0.001, 0.001);
    sceneGroup.add(spoutMesh);

    // 70 Dynamic Ballistic Water Droplets
    const dropletMeshGeo = registerGeo(new THREE.DodecahedronGeometry(0.22, 1));
    const splashDroplets: {
      mesh: THREE.Mesh;
      vx: number;
      vy: number;
      vz: number;
      startX: number;
      startY: number;
      startZ: number;
      active: boolean;
    }[] = [];

    for (let i = 0; i < 70; i++) {
      const drop = new THREE.Mesh(dropletMeshGeo, dropletMat);
      drop.visible = false;
      sceneGroup.add(drop);

      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.0;
      splashDroplets.push({
        mesh: drop,
        vx: Math.cos(angle) * speed,
        vy: 6.5 + Math.random() * 9.0, // Upward leap
        vz: Math.sin(angle) * speed,
        startX: 13.8 + (Math.random() - 0.5) * 1.2,
        startY: 0.2,
        startZ: -4.2 + (Math.random() - 0.5) * 1.2,
        active: false,
      });
    }

    // 4 Expanding Concentric Ripple Rings
    const rippleGeo = registerGeo(new THREE.RingGeometry(0.3, 0.5, 32));
    rippleGeo.rotateX(-Math.PI / 2);
    const ripples: { mesh: THREE.Mesh; delay: number }[] = [];
    for (let i = 0; i < 4; i++) {
      const rip = new THREE.Mesh(rippleGeo, rippleMat.clone());
      materialsToDispose.push(rip.material);
      rip.position.set(13.8, 0.08, -4.2);
      rip.scale.set(0.001, 0.001, 0.001);
      rip.visible = false;
      sceneGroup.add(rip);
      ripples.push({ mesh: rip, delay: i * 0.22 });
    }

    // White Churned Foam Impact Patch
    const foamGeo = registerGeo(new THREE.CircleGeometry(1.6, 24));
    foamGeo.rotateX(-Math.PI / 2);
    const foamMesh = new THREE.Mesh(foamGeo, foamMat);
    foamMesh.position.set(13.8, 0.09, -4.2);
    foamMesh.scale.set(0.001, 0.001, 0.001);
    sceneGroup.add(foamMesh);

    // =============================================================
    // 7. ANIMATION TIMELINE & KINEMATICS (STATIONARY ON LEFT SIDE)
    // =============================================================
    // Timeline Structure:
    // 0.0 - 0.85s : Water slide smoothly fades in on the left (stationary)
    // 0.85 - 3.1s : Rider accelerates and slides down the spiral flume
    // 3.1 - 4.2s  : Rider lands in pool -> Water splash, droplets, ripples explode
    // 3.6 - 4.4s  : Rider smoothly sinks & vanishes into the splash foam
    // 4.2 - 5.8s  : Water slide, pool, and remaining water smoothly fade away
    const clock = new THREE.Clock();
    const startTime = performance.now();
    const duration = 5.8; // 5.8s total smooth stationary animation
    let animFrame: number;

    const splashTriggerU = 0.82; // Rider reaches pool at u = 0.82 (~3.1s)
    let splashInitiated = false;
    let splashStartTime = 0;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const time = clock.getElapsedTime();

      // Notice: NO HORIZONTAL MOVEMENT. sceneGroup stays fixed on the left side!

      // Pool Water Surface Wave Dynamics
      for (let i = 0; i < poolPosAttr.count; i++) {
        const x = poolOrigPos[i * 3];
        const z = poolOrigPos[i * 3 + 2];
        const w1 = Math.sin(x * 0.4 + time * 2.0) * 0.14;
        const w2 = Math.cos(z * 0.4 + time * 1.6) * 0.12;
        poolPosAttr.setY(i, w1 + w2);
      }
      poolPosAttr.needsUpdate = true;
      poolWaterGeo.computeVertexNormals();

      // Rider Kinematics along Spiral Curve
      const slideStart = 0.85;
      const slideEnd = 3.1;
      let slideProg = 0;

      if (elapsed > slideStart) {
        const p = Math.min(1, (elapsed - slideStart) / (slideEnd - slideStart));
        // Natural gravity acceleration down the slide (quadratic easeIn)
        slideProg = Math.pow(p, 1.3) * splashTriggerU;
      }

      if (slideProg < splashTriggerU) {
        // Rider actively sliding down the spiral flume
        const u = Math.max(0.001, Math.min(0.999, slideProg));
        const pt = spiralCurve.getPointAt(u);
        const tang = spiralCurve.getTangentAt(u).normalize();
        let lat = new THREE.Vector3().crossVectors(tang, worldUp).normalize();
        if (lat.lengthSq() < 0.001) lat.set(1, 0, 0);
        const vert = new THREE.Vector3().crossVectors(lat, tang).normalize();

        // Position rider inside the trough with slight offset above floor
        riderGroup.position.set(
          pt.x + vert.x * 0.35,
          pt.y + vert.y * 0.35,
          pt.z + vert.z * 0.35
        );

        // Orient rider to face tangent direction with dynamic centrifugal banking
        riderGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang);
        const bankAngle = Math.sin(u * Math.PI * 4) * 0.35;
        riderGroup.rotateZ(bankAngle);

        // Excited arm waving animation during slide
        armL.rotation.z = 0.85 + Math.sin(time * 12) * 0.3;
        armR.rotation.z = -0.85 - Math.sin(time * 12 + 0.4) * 0.3;
      } else {
        // Rider has landed in the splash pool
        if (!splashInitiated) {
          splashInitiated = true;
          splashStartTime = elapsed;
          // Activate splash droplets
          splashDroplets.forEach((d) => {
            d.active = true;
            d.mesh.visible = true;
            d.mesh.position.set(d.startX, d.startY, d.startZ);
          });
        }

        // Rider floats and gently bobs in the pool water at landing spot
        const splashElapsed = elapsed - splashStartTime;
        riderGroup.position.set(
          13.8 + Math.min(splashElapsed * 0.6, 1.0),
          0.30 + Math.sin(time * 4) * 0.07,
          -4.2
        );
        riderGroup.quaternion.identity();
        riderGroup.rotation.y = -Math.PI / 6;
        armL.rotation.z = 1.2 + Math.sin(time * 8) * 0.2;
        armR.rotation.z = -1.2 - Math.sin(time * 8) * 0.2;
      }

      // Splash Effects Animation (after impact)
      if (splashInitiated) {
        const dt = elapsed - splashStartTime;

        // 1. Splash Crown Expansion & Dissipation
        if (dt < 1.3) {
          const crownScale = Math.min(1.4, dt * 3.5);
          splashCrown.scale.set(crownScale, crownScale * 1.2, crownScale);
          spoutMesh.scale.set(crownScale * 0.7, crownScale * 1.5, crownScale * 0.7);
          const crownFade = Math.max(0, 1 - dt / 1.3);
          splashWaterMat.opacity = 0.85 * crownFade;
        } else {
          splashCrown.scale.set(0.001, 0.001, 0.001);
          spoutMesh.scale.set(0.001, 0.001, 0.001);
        }

        // 2. Ballistic Splash Droplets Physics
        splashDroplets.forEach((d) => {
          if (!d.active) return;
          const tDrop = dt;
          const newY = d.startY + d.vy * tDrop - 0.5 * 20 * tDrop * tDrop;
          if (newY >= 0.05) {
            d.mesh.position.x = d.startX + d.vx * tDrop;
            d.mesh.position.y = newY;
            d.mesh.position.z = d.startZ + d.vz * tDrop;
          } else {
            d.active = false;
            d.mesh.visible = false;
          }
        });

        // 3. Concentric Ripple Rings Expansion
        ripples.forEach((rip) => {
          const ripAge = dt - rip.delay;
          if (ripAge > 0 && ripAge < 1.8) {
            rip.mesh.visible = true;
            const rScale = 0.4 + ripAge * 4.2;
            rip.mesh.scale.set(rScale, rScale, 1);
            const ripFade = Math.max(0, 1 - ripAge / 1.8);
            (rip.mesh.material as THREE.MeshBasicMaterial).opacity = 0.8 * ripFade;
          } else {
            rip.mesh.visible = false;
          }
        });

        // 4. Foam Impact Patch Dispersal
        if (dt < 2.0) {
          const fScale = 0.3 + Math.min(1.0, dt * 1.8);
          foamMesh.scale.set(fScale, fScale, fScale);
          foamMat.opacity = 0.85 * Math.max(0, 1 - dt / 2.0);
        }
      }

      // =============================================================
      // STAGED ELEGANT VANISHING WITHOUT HORIZONTAL MOVEMENT
      // =============================================================
      // 1. Initial Fade-In (0.0s - 0.85s)
      const fadeIn = Math.min(1, elapsed / 0.85);

      // 2. Rider Vanishes into the Water Effect (3.6s - 4.4s)
      const riderFade = elapsed >= 3.6 ? Math.max(0, 1 - (elapsed - 3.6) / 0.8) : 1;
      const currentRiderOpacity = fadeIn * riderFade;
      riderMaterials.forEach((m) => {
        m.opacity = 0.98 * currentRiderOpacity;
      });

      // 3. Water Slide Slowly Fades Away (4.2s - 5.8s)
      const slideFade = elapsed >= 4.2 ? Math.max(0, 1 - (elapsed - 4.2) / 1.6) : 1;
      const currentSlideOpacity = fadeIn * slideFade;
      structureMaterials.forEach((m) => {
        m.opacity = 0.98 * currentSlideOpacity;
      });

      // 4. Pool Water & Ripples Fade with the Slide (4.4s - 5.8s)
      const waterFade = elapsed >= 4.4 ? Math.max(0, 1 - (elapsed - 4.4) / 1.4) : 1;
      const currentWaterOpacity = fadeIn * waterFade;
      poolWaterMat.opacity = 0.90 * currentWaterOpacity;
      dropletMat.opacity = 0.92 * currentWaterOpacity;

      renderer.render(scene, camera);

      if (elapsed < duration) {
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
      updateGroupPosition(w);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [onComplete, isReducedMotion]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      data-purpose="floating-water-slider-layer"
    >
      {/* 3D WebGL Canvas for Stationary Water Slider on Left Side */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Announcement Pill (Anchored Left, raised 0.5 inch higher) */}
      <motion.div
        className="absolute top-12 sm:top-14 left-6 sm:left-12 flex items-center pointer-events-none"
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0], x: [-20, 0, 0, -10], scale: [0.9, 1, 1, 0.95] }}
        transition={{ duration: 4.5, times: [0, 0.15, 0.82, 1], ease: "easeInOut" }}
      >
        <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/95 text-[#0284C7] border-2 border-[#38BDF8]/60 shadow-2xl backdrop-blur-md font-heading font-black text-xs sm:text-sm uppercase tracking-wider">
          <Waves className="w-4 h-4 text-[#0284C7] animate-pulse" />
          <span>Water World • 3D Water Slider Ride</span>
          <span className="text-base">🏄‍♂️💦</span>
        </div>
      </motion.div>

      {/* Subtle Sketchfab Model Inspiration Badge (Bottom-Left, unobtrusive) */}
      <div className="absolute bottom-4 left-6 text-[10px] sm:text-xs text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
        Inspired by 3D Water Slider by ostrich (Sketchfab)
      </div>
    </div>
  );
}
