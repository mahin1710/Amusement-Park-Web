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
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- GPU RESOURCE REGISTRIES ---
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
    scene.add(sunLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanRim.position.set(-18, 14, -10);
    scene.add(cyanRim);

    const sunGlint = new THREE.DirectionalLight(0xfef08a, 1.1);
    sunGlint.position.set(22, 22, 12);
    scene.add(sunGlint);

    // FIXED STATIONARY POSITION ON THE LEFT SIDE
    const sceneGroup = new THREE.Group();
    const updateGroupPosition = (width: number) => {
      if (width < 768) {
        sceneGroup.position.set(-10.5, -2.0, -3);
        sceneGroup.scale.set(0.60, 0.60, 0.60);
      } else if (width < 1200) {
        sceneGroup.position.set(-15.0, -2.2, -1);
        sceneGroup.scale.set(0.72, 0.72, 0.72);
      } else {
        sceneGroup.position.set(-18.5, -2.4, 0);
        sceneGroup.scale.set(0.80, 0.80, 0.80);
      }
    };
    updateGroupPosition(initW);
    scene.add(sceneGroup);

    // =============================================================
    // MATERIALS
    // =============================================================
    const yellowSlideMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        roughness: 0.22,
        metalness: 0.12,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      })
    );

    const blueSlideMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x1d70b8,
        roughness: 0.22,
        metalness: 0.12,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      })
    );

    const redStructureMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        roughness: 0.35,
        metalness: 0.2,
        transparent: true,
        opacity: 0.0,
      })
    );

    const redRoofMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x991b1b,
        roughness: 0.45,
        transparent: true,
        opacity: 0.0,
      })
    );

    const deckMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xb45309,
        roughness: 0.5,
        transparent: true,
        opacity: 0.0,
      })
    );

    const collarMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        metalness: 0.4,
        roughness: 0.25,
        transparent: true,
        opacity: 0.0,
      })
    );

    const poolWallMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.0,
      })
    );

    const poolWaterMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.15,
        metalness: 0.18,
        transparent: true,
        opacity: 0.0,
      })
    );

    const splashWaterMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xbaf1fc,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      })
    );

    const dropletMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xe0f8fe,
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

    const skinMat = registerMat(new THREE.MeshStandardMaterial({ color: 0xfdba74, roughness: 0.4, transparent: true, opacity: 0.0 }));
    const vestMat = registerMat(new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.3, transparent: true, opacity: 0.0 }));
    const capMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.2, transparent: true, opacity: 0.0 }));
    const shortsMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3, transparent: true, opacity: 0.0 }));
    const eyeWhiteMat = registerMat(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, transparent: true, opacity: 0.0 }));
    const pupilMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, transparent: true, opacity: 0.0 }));

    const structureMaterials = [yellowSlideMat, blueSlideMat, redStructureMat, redRoofMat, deckMat, collarMat, poolWallMat];
    const riderMaterials = [skinMat, vestMat, capMat, shortsMat, eyeWhiteMat, pupilMat];

    // =============================================================
    // 1. TOWER PLATFORM & HUT
    // =============================================================
    const towerGroup = new THREE.Group();
    towerGroup.position.set(-4.5, 0, -2.5);
    sceneGroup.add(towerGroup);

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
      towerGroup.add(leg);
    });

    const deckGeo = registerGeo(new THREE.BoxGeometry(4.2, 0.4, 4.2));
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, 10.5, 0);
    towerGroup.add(deck);

    const hut = new THREE.Mesh(registerGeo(new THREE.BoxGeometry(3.6, 3.2, 3.6)), redRoofMat);
    hut.position.set(0, 12.3, 0);
    towerGroup.add(hut);

    const roofGeo = registerGeo(new THREE.ConeGeometry(3.2, 2.2, 4));
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, redRoofMat);
    roof.position.set(0, 15.0, 0);
    towerGroup.add(roof);

    const tubeEntryGeo = registerGeo(new THREE.CylinderGeometry(1.2, 1.2, 1.6, 16, 1, true));
    tubeEntryGeo.rotateZ(Math.PI / 2);
    const tubeEntry = new THREE.Mesh(tubeEntryGeo, yellowSlideMat);
    tubeEntry.position.set(2.4, 11.2, 0.8);
    towerGroup.add(tubeEntry);

    // =============================================================
    // 2. STRAIGHT CHUTE SLIDE
    // =============================================================
    const chutePts = [
      new THREE.Vector3(-4.5, 10.5, 1.5),
      new THREE.Vector3(-8.5, 7.0, 3.5),
      new THREE.Vector3(-12.5, 3.5, 5.5),
      new THREE.Vector3(-15.5, 0.4, 7.0),
    ];
    const chuteCurve = new THREE.CatmullRomCurve3(chutePts);
    const straightChute = new THREE.Mesh(registerGeo(new THREE.TubeGeometry(chuteCurve, 40, 0.9, 10, false)), blueSlideMat);
    sceneGroup.add(straightChute);

    // =============================================================
    // 3. THE SPIRAL WATER SLIDE
    // =============================================================
    const spiralPoints = [
      new THREE.Vector3(-2.2, 11.0, -1.2),
      new THREE.Vector3(-0.5, 10.6, 0.8),
      new THREE.Vector3(2.5, 9.8, 2.2),
      new THREE.Vector3(5.5, 8.6, 0.4),
      new THREE.Vector3(4.5, 7.2, -3.2),
      new THREE.Vector3(1.2, 5.8, -4.2),
      new THREE.Vector3(-2.2, 4.8, -2.4),
      new THREE.Vector3(-3.0, 3.8, 1.2),
      new THREE.Vector3(0.2, 2.9, 4.2),
      new THREE.Vector3(4.2, 2.1, 3.4),
      new THREE.Vector3(7.2, 1.4, 0.5),
      new THREE.Vector3(9.8, 0.8, -1.8),
      new THREE.Vector3(12.5, 0.35, -3.4),
      new THREE.Vector3(14.5, 0.1, -4.4),
    ];
    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);

    const worldUp = new THREE.Vector3(0, 1, 0);
    function buildFlumeSegmentGeo(curve: THREE.CatmullRomCurve3, uStart: number, uEnd: number, lenSteps = 24, crossSteps = 10) {
      const geo = new THREE.BufferGeometry();
      const positions: number[] = [];
      const indices: number[] = [];
      const uvs: number[] = [];
      const R = 1.05;

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

          positions.push(
            pt.x + lat.x * sOffset + vert.x * vOffset,
            pt.y + lat.y * sOffset + vert.y * vOffset,
            pt.z + lat.z * sOffset + vert.z * vOffset
          );
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

    const numSegments = 6;
    for (let s = 0; s < numSegments; s++) {
      const u0 = s / numSegments;
      const u1 = (s + 1) / numSegments;
      const segGeo = buildFlumeSegmentGeo(spiralCurve, u0, u1);
      const isYellow = s % 2 === 0;
      const segMesh = new THREE.Mesh(segGeo, isYellow ? yellowSlideMat : blueSlideMat);
      sceneGroup.add(segMesh);

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

    // Central Mast & Brackets
    const centerMast = new THREE.Mesh(registerGeo(new THREE.CylinderGeometry(0.38, 0.38, 11.2, 14)), redStructureMat);
    centerMast.position.set(1.5, 5.6, -0.6);
    sceneGroup.add(centerMast);

    // =============================================================
    // 4. SPLASHDOWN POOL
    // =============================================================
    const poolGroup = new THREE.Group();
    poolGroup.position.set(13.8, -0.1, -4.2);
    sceneGroup.add(poolGroup);

    const poolBorder = new THREE.Mesh(registerGeo(new THREE.BoxGeometry(9.5, 0.7, 8.5)), poolWallMat);
    poolBorder.position.set(0, -0.25, 0);
    poolGroup.add(poolBorder);

    const poolWaterGeo = registerGeo(new THREE.PlaneGeometry(8.5, 7.5, 40, 40));
    poolWaterGeo.rotateX(-Math.PI / 2);
    const poolWaterMesh = new THREE.Mesh(poolWaterGeo, poolWaterMat);
    poolWaterMesh.position.set(0, 0.05, 0);
    poolGroup.add(poolWaterMesh);

    const poolPosAttr = poolWaterGeo.attributes.position;
    const poolOrigPos = poolPosAttr.array.slice();

    // =============================================================
    // 5. 3D CARTOON RIDER
    // =============================================================
    const riderGroup = new THREE.Group();
    sceneGroup.add(riderGroup);

    const head = new THREE.Mesh(registerGeo(new THREE.SphereGeometry(0.48, 16, 16)), skinMat);
    head.position.set(0, 0.95, 0);
    riderGroup.add(head);

    const cap = new THREE.Mesh(registerGeo(new THREE.SphereGeometry(0.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.9)), capMat);
    cap.position.set(0, 0.97, 0);
    riderGroup.add(cap);

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

    const torso = new THREE.Mesh(registerGeo(new THREE.CylinderGeometry(0.4, 0.36, 0.85, 12)), vestMat);
    torso.position.set(0, 0.38, 0);
    riderGroup.add(torso);

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

    const legGeoL = registerGeo(new THREE.CylinderGeometry(0.14, 0.12, 0.75, 8));
    legGeoL.rotateX(Math.PI / 2.3);
    const legL = new THREE.Mesh(legGeoL, shortsMat);
    legL.position.set(-0.22, 0.05, 0.38);
    const legR = new THREE.Mesh(legGeoL, shortsMat);
    legR.position.set(0.22, 0.05, 0.38);
    riderGroup.add(legL);
    riderGroup.add(legR);

    // Initial position
    const startPt = spiralCurve.getPointAt(0.001);
    riderGroup.position.set(startPt.x, startPt.y + 0.35, startPt.z);

    // =============================================================
    // 6. SPLASHDOWN EFFECTS
    // =============================================================
    const splashCrown = new THREE.Mesh(registerGeo(new THREE.CylinderGeometry(0.3, 2.6, 2.8, 18, 1, true)), splashWaterMat);
    splashCrown.position.set(13.8, 1.2, -4.2);
    splashCrown.scale.set(0.001, 0.001, 0.001);
    sceneGroup.add(splashCrown);

    const spoutGeo = registerGeo(new THREE.ConeGeometry(1.2, 3.2, 12, 1, true));
    const spoutMesh = new THREE.Mesh(spoutGeo, splashWaterMat);
    spoutMesh.position.set(13.8, 1.5, -4.2);
    spoutMesh.scale.set(0.001, 0.001, 0.001);
    sceneGroup.add(spoutMesh);

    const dropletMeshGeo = registerGeo(new THREE.DodecahedronGeometry(0.22, 1));
    const splashDroplets: { mesh: THREE.Mesh; vx: number; vy: number; vz: number; startX: number; startY: number; startZ: number; active: boolean }[] = [];
    for (let i = 0; i < 70; i++) {
      const drop = new THREE.Mesh(dropletMeshGeo, dropletMat);
      drop.visible = false;
      sceneGroup.add(drop);
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.0;
      splashDroplets.push({
        mesh: drop,
        vx: Math.cos(angle) * speed,
        vy: 6.5 + Math.random() * 9.0,
        vz: Math.sin(angle) * speed,
        startX: 13.8 + (Math.random() - 0.5) * 1.2,
        startY: 0.2,
        startZ: -4.2 + (Math.random() - 0.5) * 1.2,
        active: false,
      });
    }

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

    const foamGeo = registerGeo(new THREE.CircleGeometry(1.6, 24));
    foamGeo.rotateX(-Math.PI / 2);
    const foamMesh = new THREE.Mesh(foamGeo, foamMat);
    foamMesh.position.set(13.8, 0.09, -4.2);
    foamMesh.scale.set(0.001, 0.001, 0.001);
    sceneGroup.add(foamMesh);

    // =============================================================
    // 7. TIMELINE & KINEMATICS (STATIONARY ON LEFT SIDE)
    // =============================================================
    const clock = new THREE.Clock();
    const startTime = performance.now();
    const duration = 5.8;
    let animFrame: number;

    const splashTriggerU = 0.82;
    let splashInitiated = false;
    let splashStartTime = 0;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const time = clock.getElapsedTime();

      // Pool Waves
      for (let i = 0; i < poolPosAttr.count; i++) {
        const x = poolOrigPos[i * 3];
        const z = poolOrigPos[i * 3 + 2];
        poolPosAttr.setY(i, Math.sin(x * 0.4 + time * 2.0) * 0.14 + Math.cos(z * 0.4 + time * 1.6) * 0.12);
      }
      poolPosAttr.needsUpdate = true;
      poolWaterGeo.computeVertexNormals();

      // Rider Kinematics
      const slideStart = 0.85;
      const slideEnd = 3.1;
      let slideProg = 0;
      if (elapsed > slideStart) {
        const p = Math.min(1, (elapsed - slideStart) / (slideEnd - slideStart));
        slideProg = Math.pow(p, 1.3) * splashTriggerU;
      }

      if (slideProg < splashTriggerU) {
        const u = Math.max(0.001, Math.min(0.999, slideProg));
        const pt = spiralCurve.getPointAt(u);
        const tang = spiralCurve.getTangentAt(u).normalize();
        let lat = new THREE.Vector3().crossVectors(tang, worldUp).normalize();
        if (lat.lengthSq() < 0.001) lat.set(1, 0, 0);
        const vert = new THREE.Vector3().crossVectors(lat, tang).normalize();

        riderGroup.position.set(pt.x + vert.x * 0.35, pt.y + vert.y * 0.35, pt.z + vert.z * 0.35);
        riderGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tang);
        riderGroup.rotateZ(Math.sin(u * Math.PI * 4) * 0.35);

        armL.rotation.z = 0.85 + Math.sin(time * 12) * 0.3;
        armR.rotation.z = -0.85 - Math.sin(time * 12 + 0.4) * 0.3;
      } else {
        if (!splashInitiated) {
          splashInitiated = true;
          splashStartTime = elapsed;
          splashDroplets.forEach((d) => {
            d.active = true;
            d.mesh.visible = true;
            d.mesh.position.set(d.startX, d.startY, d.startZ);
          });
        }

        const splashElapsed = elapsed - splashStartTime;
        riderGroup.position.set(13.8 + Math.min(splashElapsed * 0.6, 1.0), 0.30 + Math.sin(time * 4) * 0.07, -4.2);
        riderGroup.quaternion.identity();
        riderGroup.rotation.y = -Math.PI / 6;
        armL.rotation.z = 1.2 + Math.sin(time * 8) * 0.2;
        armR.rotation.z = -1.2 - Math.sin(time * 8) * 0.2;
      }

      // Splash Effects
      if (splashInitiated) {
        const dt = elapsed - splashStartTime;
        if (dt < 1.3) {
          const crownScale = Math.min(1.4, dt * 3.5);
          splashCrown.scale.set(crownScale, crownScale * 1.2, crownScale);
          spoutMesh.scale.set(crownScale * 0.7, crownScale * 1.5, crownScale * 0.7);
          splashWaterMat.opacity = 0.85 * Math.max(0, 1 - dt / 1.3);
        } else {
          splashCrown.scale.set(0.001, 0.001, 0.001);
          spoutMesh.scale.set(0.001, 0.001, 0.001);
        }

        splashDroplets.forEach((d) => {
          if (!d.active) return;
          const newY = d.startY + d.vy * dt - 0.5 * 20 * dt * dt;
          if (newY >= 0.05) {
            d.mesh.position.x = d.startX + d.vx * dt;
            d.mesh.position.y = newY;
            d.mesh.position.z = d.startZ + d.vz * dt;
          } else {
            d.active = false;
            d.mesh.visible = false;
          }
        });

        ripples.forEach((rip) => {
          const ripAge = dt - rip.delay;
          if (ripAge > 0 && ripAge < 1.8) {
            rip.mesh.visible = true;
            const rScale = 0.4 + ripAge * 4.2;
            rip.mesh.scale.set(rScale, rScale, 1);
            (rip.mesh.material as THREE.MeshBasicMaterial).opacity = 0.8 * Math.max(0, 1 - ripAge / 1.8);
          } else {
            rip.mesh.visible = false;
          }
        });

        if (dt < 2.0) {
          const fScale = 0.3 + Math.min(1.0, dt * 1.8);
          foamMesh.scale.set(fScale, fScale, fScale);
          foamMat.opacity = 0.85 * Math.max(0, 1 - dt / 2.0);
        }
      }

      // STAGED VANISHING
      const fadeIn = Math.min(1, elapsed / 0.85);

      const riderFade = elapsed >= 3.6 ? Math.max(0, 1 - (elapsed - 3.6) / 0.8) : 1;
      const currentRiderOpacity = fadeIn * riderFade;
      riderMaterials.forEach((m) => {
        m.opacity = 0.98 * currentRiderOpacity;
      });

      const slideFade = elapsed >= 4.2 ? Math.max(0, 1 - (elapsed - 4.2) / 1.6) : 1;
      const currentSlideOpacity = fadeIn * slideFade;
      structureMaterials.forEach((m) => {
        m.opacity = 0.98 * currentSlideOpacity;
      });

      const waterFade = elapsed >= 4.4 ? Math.max(0, 1 - (elapsed - 4.4) / 1.4) : 1;
      const currentWaterOpacity = fadeIn * waterFade;
      poolWaterMat.opacity = 0.90 * currentWaterOpacity;
      dropletMat.opacity = 0.92 * currentWaterOpacity;

      renderer.render(scene, camera);

      if (elapsed < duration) {
        animFrame = requestAnimationFrame(animate);
      } else {
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
  }, [onComplete]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none pointer-events-none">
      <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0284C7]/50 via-[#38BDF8]/30 to-[#0369A1]/65 -z-10" />

      <motion.div
        className="absolute z-40 top-16 sm:top-20 left-6 sm:left-12 flex items-center pointer-events-none"
        initial={{ scale: 0, rotate: -6, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#0EA5E9] border-2 border-white text-white font-heading font-black text-sm sm:text-base tracking-wider shadow-2xl flex items-center gap-2.5">
          <span className="text-xl animate-pulse">🏄‍♂️</span>
          <span>WATER WORLD 3D WATER SLIDER RIDE!</span>
          <span className="text-xl">💦</span>
        </div>
      </motion.div>
    </div>
  );
}
