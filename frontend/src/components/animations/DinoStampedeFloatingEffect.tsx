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
    renderer.setClearColor(0x000000, 0); // 100% transparent background
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- RICH JURASSIC LIGHTING (Specular Depth & Rim Lighting) ---
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfef08a, 2.4);
    sunLight.position.set(20, 35, 25);
    scene.add(sunLight);

    const emeraldRim = new THREE.DirectionalLight(0x22c55e, 1.8);
    emeraldRim.position.set(-25, 18, -15);
    scene.add(emeraldRim);

    const amberBounce = new THREE.PointLight(0xf59e0b, 2.5, 45);
    amberBounce.position.set(0, 3, 12);
    scene.add(amberBounce);

    const skyCyanLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    skyCyanLight.position.set(5, 25, 10);
    scene.add(skyCyanLight);

    // Master group holding the entire running stampede
    const stampedeGroup = new THREE.Group();
    scene.add(stampedeGroup);

    // Track all materials for smooth fade-out at end of sequence
    const allMaterials: THREE.Material[] = [];
    const registerMat = <T extends THREE.Material>(mat: T): T => {
      allMaterials.push(mat);
      return mat;
    };

    // --- PREMIUM SHADED MATERIALS ---
    const trexGreenMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x16a34a,
        roughness: 0.32,
        metalness: 0.12,
        transparent: true,
        opacity: 0.98,
      })
    );
    const trexBellyMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        roughness: 0.35,
        metalness: 0.08,
        transparent: true,
        opacity: 0.98,
      })
    );
    const mouthPinkMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xf87171,
        roughness: 0.4,
        transparent: true,
        opacity: 0.98,
      })
    );
    const teethMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.98,
      })
    );
    const eyeWhiteMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.15,
        transparent: true,
        opacity: 0.98,
      })
    );
    const eyePupilMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.98,
      })
    );
    const eyeGlintMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.98,
      })
    );
    const hornBoneMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfffbeb,
        roughness: 0.28,
        metalness: 0.1,
        transparent: true,
        opacity: 0.98,
      })
    );
    const raptorCyanMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.3,
        metalness: 0.15,
        transparent: true,
        opacity: 0.98,
      })
    );
    const raptorIndigoMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.32,
        metalness: 0.15,
        transparent: true,
        opacity: 0.98,
      })
    );
    const triPinkMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfb7185,
        roughness: 0.38,
        metalness: 0.08,
        transparent: true,
        opacity: 0.98,
      })
    );
    const triBellyMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfecdd3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.98,
      })
    );
    const stegoAmberMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.36,
        metalness: 0.1,
        transparent: true,
        opacity: 0.98,
      })
    );
    const plateRedMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        roughness: 0.25,
        metalness: 0.15,
        transparent: true,
        opacity: 0.98,
      })
    );
    const brachioBlueMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.42,
        metalness: 0.1,
        transparent: true,
        opacity: 0.96,
      })
    );
    const pteroPurpleMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        roughness: 0.35,
        metalness: 0.15,
        transparent: true,
        opacity: 0.98,
      })
    );
    const dustMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        transparent: true,
        opacity: 0.65,
      })
    );
    const speedLineMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.75,
      })
    );
    const jungleLeafMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x4ade80,
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      })
    );

    // =============================================================
    // 1. T-REX — THE STAR (Center Foreground, Detailed Cartoon)
    // =============================================================
    const trexGroup = new THREE.Group();
    trexGroup.position.set(2.0, -3.2, 5.5);
    trexGroup.rotation.y = Math.PI / 2; // Facing right (towards traversal)

    // Body Torso
    const trexBody = new THREE.Mesh(new THREE.SphereGeometry(2.7, 24, 24), trexGreenMat);
    trexBody.scale.set(1.15, 1.35, 1.55);
    trexBody.position.set(0, 4.6, 0);
    trexGroup.add(trexBody);

    // Cream Cartoon Belly
    const trexBelly = new THREE.Mesh(new THREE.SphereGeometry(2.2, 18, 18), trexBellyMat);
    trexBelly.scale.set(0.95, 1.25, 1.2);
    trexBelly.position.set(0, 4.2, 1.05);
    trexGroup.add(trexBelly);

    // Curved Neck
    const tNeck = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.6, 2.4, 16), trexGreenMat);
    tNeck.position.set(0, 6.4, 1.3);
    tNeck.rotation.x = -0.4;
    trexGroup.add(tNeck);

    // Articulated Head Group (for bobbing & roaring)
    const trexHead = new THREE.Group();
    trexHead.position.set(0, 7.6, 2.5);

    // Cranium / Upper Snout
    const cranium = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 3.4), trexGreenMat);
    cranium.position.set(0, 0.5, 0.4);
    trexHead.add(cranium);

    // Eyebrow Ridges
    const ridgeGeo = new THREE.BoxGeometry(0.7, 0.35, 1.6);
    const lRidge = new THREE.Mesh(ridgeGeo, trexGreenMat);
    lRidge.position.set(-1.25, 1.3, 0.6);
    lRidge.rotation.z = -0.2;
    trexHead.add(lRidge);

    const rRidge = new THREE.Mesh(ridgeGeo, trexGreenMat);
    rRidge.position.set(1.25, 1.3, 0.6);
    rRidge.rotation.z = 0.2;
    trexHead.add(rRidge);

    // Big Cartoon Eyes with Glossy Highlights
    const createCartoonEye = (isLeft: boolean) => {
      const eye = new THREE.Group();
      const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), eyeWhiteMat);
      eye.add(sclera);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), eyePupilMat);
      pupil.position.set(isLeft ? -0.22 : 0.22, 0.05, 0.42);
      eye.add(pupil);

      const glint = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), eyeGlintMat);
      glint.position.set(isLeft ? -0.16 : 0.16, 0.16, 0.52);
      eye.add(glint);

      return eye;
    };

    const lEye = createCartoonEye(true);
    lEye.position.set(-1.25, 0.85, 0.9);
    trexHead.add(lEye);

    const rEye = createCartoonEye(false);
    rEye.position.set(1.25, 0.85, 0.9);
    trexHead.add(rEye);

    // Upper Teeth Row
    const toothGeo = new THREE.ConeGeometry(0.12, 0.35, 6);
    toothGeo.rotateX(Math.PI);
    for (let i = 0; i < 6; i++) {
      const t1 = new THREE.Mesh(toothGeo, teethMat);
      t1.position.set(-0.9 + i * 0.36, -0.48, 1.8);
      trexHead.add(t1);
    }

    // Articulated Lower Jaw with Teeth & Tongue
    const trexJaw = new THREE.Group();
    trexJaw.position.set(0, -0.3, 0.6);

    const jawBase = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.75, 2.8), trexGreenMat);
    jawBase.position.set(0, 0, 0.7);
    trexJaw.add(jawBase);

    const tongue = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 12), mouthPinkMat);
    tongue.scale.set(1.4, 0.4, 1.6);
    tongue.position.set(0, 0.4, 1.0);
    trexJaw.add(tongue);

    const bottomToothGeo = new THREE.ConeGeometry(0.11, 0.32, 6);
    for (let i = 0; i < 5; i++) {
      const bt = new THREE.Mesh(bottomToothGeo, teethMat);
      bt.position.set(-0.75 + i * 0.375, 0.42, 1.8);
      trexJaw.add(bt);
    }
    trexHead.add(trexJaw);
    trexGroup.add(trexHead);

    // Tiny Waving Cartoon Arms with Claws
    const createArm = (isLeft: boolean) => {
      const arm = new THREE.Group();
      arm.position.set(isLeft ? -1.5 : 1.5, 5.0, 1.8);

      const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 1.0, 10), trexGreenMat);
      upperArm.position.set(0, -0.4, 0);
      arm.add(upperArm);

      const claw1 = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 6), teethMat);
      claw1.rotation.x = Math.PI / 2;
      claw1.position.set(-0.1, -0.9, 0.2);
      arm.add(claw1);

      const claw2 = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 6), teethMat);
      claw2.rotation.x = Math.PI / 2;
      claw2.position.set(0.1, -0.9, 0.2);
      arm.add(claw2);

      return arm;
    };
    const tArmL = createArm(true);
    const tArmR = createArm(false);
    trexGroup.add(tArmL);
    trexGroup.add(tArmR);

    // Dynamic Multi-Segment Tail
    const trexTail = new THREE.Group();
    trexTail.position.set(0, 4.0, -2.2);

    const tTailSeg1 = new THREE.Mesh(new THREE.ConeGeometry(1.4, 3.2, 16), trexGreenMat);
    tTailSeg1.rotation.x = -Math.PI / 2.3;
    tTailSeg1.position.set(0, 0.3, -1.5);
    trexTail.add(tTailSeg1);

    const tTailSeg2 = new THREE.Mesh(new THREE.ConeGeometry(0.9, 3.0, 14), trexGreenMat);
    tTailSeg2.rotation.x = -Math.PI / 2.15;
    tTailSeg2.position.set(0, 1.0, -4.0);
    trexTail.add(tTailSeg2);
    trexGroup.add(trexTail);

    // Muscular Stomping Legs with Thighs & Claws
    const createTrexLeg = (isLeft: boolean) => {
      const legRoot = new THREE.Group();
      legRoot.position.set(isLeft ? -1.8 : 1.8, 3.2, 0.2);

      // Chunky Thigh
      const thigh = new THREE.Mesh(new THREE.SphereGeometry(1.2, 14, 14), trexGreenMat);
      thigh.scale.set(0.9, 1.3, 1.1);
      thigh.position.set(0, -0.4, 0);
      legRoot.add(thigh);

      // Lower Shin
      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.72, 2.6, 12), trexGreenMat);
      shin.position.set(0, -1.9, 0.1);
      legRoot.add(shin);

      // Foot with 3 Claws
      const foot = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.65, 2.3), trexGreenMat);
      foot.position.set(0, -3.2, 0.5);
      legRoot.add(foot);

      for (let c = 0; c < 3; c++) {
        const claw = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.5, 6), teethMat);
        claw.rotation.x = Math.PI / 2.2;
        claw.position.set(-0.45 + c * 0.45, -3.2, 1.7);
        legRoot.add(claw);
      }

      return legRoot;
    };
    const tLegL = createTrexLeg(true);
    const tLegR = createTrexLeg(false);
    trexGroup.add(tLegL);
    trexGroup.add(tLegR);

    stampedeGroup.add(trexGroup);

    // =============================================================
    // 2. VELOCIRAPTOR — THE SPRINTER (Far Front Right, Fast & Lean)
    // =============================================================
    const raptorGroup = new THREE.Group();
    raptorGroup.position.set(9.5, -3.6, 7.5);
    raptorGroup.rotation.y = Math.PI / 2;

    // Lean Body tilted forward
    const rBody = new THREE.Mesh(new THREE.ConeGeometry(0.85, 3.4, 14), raptorCyanMat);
    rBody.rotation.x = Math.PI / 2.2;
    rBody.position.set(0, 1.9, 0);
    raptorGroup.add(rBody);

    // Indigo Dorsal Stripe
    const rStripe = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 3.2), raptorIndigoMat);
    rStripe.position.set(0, 2.4, 0);
    rStripe.rotation.x = 0.3;
    raptorGroup.add(rStripe);

    // Sharp Head & Snout
    const rHead = new THREE.Group();
    rHead.position.set(0, 2.6, 2.2);

    const rSkull = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.0, 12), raptorCyanMat);
    rSkull.rotation.x = -Math.PI / 2.3;
    rSkull.position.set(0, 0, 0.6);
    rHead.add(rSkull);

    // Fierce/Playful Raptor Eye
    const rEyeGeo = new THREE.SphereGeometry(0.22, 10, 10);
    const rEyeMat = registerMat(new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.98 }));
    const rPupilMat = registerMat(new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.98 }));

    const rEyeL = new THREE.Mesh(rEyeGeo, rEyeMat);
    rEyeL.position.set(-0.45, 0.25, 0.5);
    const rPupL = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), rPupilMat);
    rPupL.position.set(-0.12, 0, 0.14);
    rEyeL.add(rPupL);
    rHead.add(rEyeL);

    const rEyeR = new THREE.Mesh(rEyeGeo, rEyeMat);
    rEyeR.position.set(0.45, 0.25, 0.5);
    const rPupR = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), rPupilMat);
    rPupR.position.set(0.12, 0, 0.14);
    rEyeR.add(rPupR);
    rHead.add(rEyeR);
    raptorGroup.add(rHead);

    // Balancing Stiff Tail
    const rTail = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.45, 4.2, 10), raptorCyanMat);
    rTail.rotation.x = -Math.PI / 2.1;
    rTail.position.set(0, 2.1, -2.4);
    raptorGroup.add(rTail);

    // High Cadence Running Legs
    const createRaptorLeg = (isLeft: boolean) => {
      const leg = new THREE.Group();
      leg.position.set(isLeft ? -0.85 : 0.85, 1.6, 0);

      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 1.9, 8), raptorCyanMat);
      shin.position.set(0, -0.9, 0);
      leg.add(shin);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.25, 1.2), raptorCyanMat);
      foot.position.set(0, -1.8, 0.3);
      leg.add(foot);

      // Curved Sickle Claw
      const sickle = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 6), teethMat);
      sickle.rotation.x = -Math.PI / 3;
      sickle.position.set(isLeft ? 0.2 : -0.2, -1.6, 0.7);
      leg.add(sickle);

      return leg;
    };
    const rLegL = createRaptorLeg(true);
    const rLegR = createRaptorLeg(false);
    raptorGroup.add(rLegL);
    raptorGroup.add(rLegR);

    stampedeGroup.add(raptorGroup);

    // =============================================================
    // 3. TRICERATOPS (Mid-Foreground, Coral Pink with 3 Horns & Frill)
    // =============================================================
    const triGroup = new THREE.Group();
    triGroup.position.set(-4.5, -3.4, 2.5);
    triGroup.rotation.y = Math.PI / 2;

    // Chunky Barrel Body
    const triBody = new THREE.Mesh(new THREE.SphereGeometry(2.3, 20, 20), triPinkMat);
    triBody.scale.set(1.15, 1.15, 1.65);
    triBody.position.set(0, 2.9, 0);
    triGroup.add(triBody);

    const triBelly = new THREE.Mesh(new THREE.SphereGeometry(1.8, 14, 14), triBellyMat);
    triBelly.scale.set(1.0, 0.9, 1.4);
    triBelly.position.set(0, 2.3, 0.3);
    triGroup.add(triBelly);

    // Head with Scalloped Frill
    const triHead = new THREE.Group();
    triHead.position.set(0, 3.4, 2.2);

    const frillGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.38, 18);
    const frillMesh = new THREE.Mesh(frillGeo, triPinkMat);
    frillMesh.rotation.x = Math.PI / 3.2;
    frillMesh.position.set(0, 0.7, -0.4);
    triHead.add(frillMesh);

    // Golden dots along frill rim
    for (let f = 0; f < 7; f++) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), trexBellyMat);
      const angle = -Math.PI * 0.45 + (f * Math.PI * 0.9) / 6;
      dot.position.set(Math.sin(angle) * 2.2, 0.7 + Math.cos(angle) * 1.5, -0.4);
      triHead.add(dot);
    }

    const snout = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.8, 14), triPinkMat);
    snout.rotation.x = -Math.PI / 2.3;
    snout.position.set(0, -0.2, 1.2);
    triHead.add(snout);

    // 3 Curved Horns
    const browHornGeo = new THREE.ConeGeometry(0.28, 1.9, 10);
    const hornL = new THREE.Mesh(browHornGeo, hornBoneMat);
    hornL.position.set(-0.95, 1.3, 0.6);
    hornL.rotation.x = -0.55;
    hornL.rotation.z = -0.2;
    triHead.add(hornL);

    const hornR = new THREE.Mesh(browHornGeo, hornBoneMat);
    hornR.position.set(0.95, 1.3, 0.6);
    hornR.rotation.x = -0.55;
    hornR.rotation.z = 0.2;
    triHead.add(hornR);

    const noseHorn = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.1, 8), hornBoneMat);
    noseHorn.position.set(0, 0.4, 2.0);
    noseHorn.rotation.x = -0.3;
    triHead.add(noseHorn);

    triGroup.add(triHead);

    // 4 Sturdy Trotting Legs
    const triLegGeo = new THREE.CylinderGeometry(0.5, 0.6, 2.0, 10);
    const triLegFL = new THREE.Mesh(triLegGeo, triPinkMat);
    triLegFL.position.set(-1.3, 1.0, 1.4);
    triGroup.add(triLegFL);

    const triLegFR = new THREE.Mesh(triLegGeo, triPinkMat);
    triLegFR.position.set(1.3, 1.0, 1.4);
    triGroup.add(triLegFR);

    const triLegBL = new THREE.Mesh(triLegGeo, triPinkMat);
    triLegBL.position.set(-1.3, 1.0, -1.4);
    triGroup.add(triLegBL);

    const triLegBR = new THREE.Mesh(triLegGeo, triPinkMat);
    triLegBR.position.set(1.3, 1.0, -1.4);
    triGroup.add(triLegBR);

    stampedeGroup.add(triGroup);

    // =============================================================
    // 4. STEGOSAURUS (Midground, Amber with Ruby Dorsal Plates & Spikes)
    // =============================================================
    const stegoGroup = new THREE.Group();
    stegoGroup.position.set(-10.0, -3.3, -2.5);
    stegoGroup.rotation.y = Math.PI / 2;

    const sBody = new THREE.Mesh(new THREE.SphereGeometry(2.2, 18, 18), stegoAmberMat);
    sBody.scale.set(1.05, 1.25, 1.75);
    sBody.position.set(0, 2.9, 0);
    stegoGroup.add(sBody);

    const sHead = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.8, 10), stegoAmberMat);
    sHead.rotation.x = Math.PI / 2.3;
    sHead.position.set(0, 2.2, 3.0);
    stegoGroup.add(sHead);

    // Alternating Dual Rows of Diamond Back Plates (Ruby Red)
    const plateGeo = new THREE.ConeGeometry(0.7, 1.5, 4);
    for (let i = 0; i < 6; i++) {
      const zOff = -2.2 + i * 0.85;
      const p1 = new THREE.Mesh(plateGeo, plateRedMat);
      p1.position.set(-0.4, 4.4 + Math.sin(i * 0.55) * 0.35, zOff);
      p1.rotation.y = Math.PI / 4;
      stegoGroup.add(p1);

      const p2 = new THREE.Mesh(plateGeo, plateRedMat);
      p2.position.set(0.4, 4.4 + Math.sin(i * 0.55) * 0.35, zOff + 0.4);
      p2.rotation.y = Math.PI / 4;
      stegoGroup.add(p2);
    }

    // Swinging Spiked Thagomizer Tail
    const stegoTail = new THREE.Group();
    stegoTail.position.set(0, 2.7, -2.6);

    const tailCone = new THREE.Mesh(new THREE.ConeGeometry(0.75, 4.0, 12), stegoAmberMat);
    tailCone.rotation.x = -Math.PI / 2.15;
    tailCone.position.set(0, 0, -1.8);
    stegoTail.add(tailCone);

    // 4 Bone Spikes at tail tip
    const spikeGeo = new THREE.ConeGeometry(0.2, 1.3, 8);
    const spk1 = new THREE.Mesh(spikeGeo, hornBoneMat);
    spk1.position.set(-0.7, 0.4, -3.4);
    spk1.rotation.z = 1.2;
    stegoTail.add(spk1);

    const spk2 = new THREE.Mesh(spikeGeo, hornBoneMat);
    spk2.position.set(0.7, 0.4, -3.4);
    spk2.rotation.z = -1.2;
    stegoTail.add(spk2);

    const spk3 = new THREE.Mesh(spikeGeo, hornBoneMat);
    spk3.position.set(-0.7, 0.4, -2.6);
    spk3.rotation.z = 1.2;
    stegoTail.add(spk3);

    const spk4 = new THREE.Mesh(spikeGeo, hornBoneMat);
    spk4.position.set(0.7, 0.4, -2.6);
    spk4.rotation.z = -1.2;
    stegoTail.add(spk4);

    stegoGroup.add(stegoTail);

    stampedeGroup.add(stegoGroup);

    // =============================================================
    // 5. BRACHIOSAURUS (Deep Background Giant, Majestic Blue)
    // =============================================================
    const brachioGroup = new THREE.Group();
    brachioGroup.position.set(-15.0, -2.0, -12.0);
    brachioGroup.rotation.y = Math.PI / 2;

    const bBody = new THREE.Mesh(new THREE.SphereGeometry(3.4, 20, 20), brachioBlueMat);
    bBody.scale.set(1.3, 1.3, 1.8);
    bBody.position.set(0, 5.5, 0);
    brachioGroup.add(bBody);

    // Towering S-Curved Neck
    const neckPoints = [
      new THREE.Vector3(0, 5.5, 2.2),
      new THREE.Vector3(0, 11.0, 3.8),
      new THREE.Vector3(0, 16.5, 4.4),
      new THREE.Vector3(0, 19.5, 5.4),
    ];
    const neckCurve = new THREE.CatmullRomCurve3(neckPoints);
    const neckGeo = new THREE.TubeGeometry(neckCurve, 20, 1.1, 12, false);
    const neckMesh = new THREE.Mesh(neckGeo, brachioBlueMat);
    brachioGroup.add(neckMesh);

    const bHead = new THREE.Mesh(new THREE.SphereGeometry(1.2, 14, 14), brachioBlueMat);
    bHead.position.set(0, 19.6, 6.0);
    brachioGroup.add(bHead);

    stampedeGroup.add(brachioGroup);

    // =============================================================
    // 6. PTERODACTYL (Soaring Sky Plane, Flapping Purple Wings)
    // =============================================================
    const pteroGroup = new THREE.Group();
    pteroGroup.position.set(4.0, 9.5, 4.0);
    pteroGroup.rotation.y = Math.PI / 2;
    pteroGroup.rotation.z = -0.15; // Banking angle

    const ptBody = new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.4, 10), pteroPurpleMat);
    ptBody.rotation.x = Math.PI / 2.2;
    pteroGroup.add(ptBody);

    // Crest & Beak
    const ptBeak = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.8, 8), hornBoneMat);
    ptBeak.rotation.x = -Math.PI / 2.3;
    ptBeak.position.set(0, 0.2, 1.8);
    pteroGroup.add(ptBeak);

    // Flapping Cartoon Wings
    const wingGeo = new THREE.BoxGeometry(3.4, 0.12, 1.4);
    const ptWingL = new THREE.Mesh(wingGeo, pteroPurpleMat);
    ptWingL.position.set(-2.0, 0.2, 0);
    pteroGroup.add(ptWingL);

    const ptWingR = new THREE.Mesh(wingGeo, pteroPurpleMat);
    ptWingR.position.set(2.0, 0.2, 0);
    pteroGroup.add(ptWingR);

    stampedeGroup.add(pteroGroup);

    // =============================================================
    // 7. CARTOON GROUND DUST PUFF PARTICLES (Foot Contact Bursts)
    // =============================================================
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

    for (let i = 0; i < 35; i++) {
      const dMesh = new THREE.Mesh(dustSphereGeo, dustMat.clone());
      dMesh.visible = false;
      stampedeGroup.add(dMesh);
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
    const triggerDustPuff = (x: number, y: number, z: number, scale = 1.0) => {
      const p = dustPool[dustPoolIdx % dustPool.length];
      p.active = true;
      p.spawnTime = performance.now();
      p.life = 0.6 + Math.random() * 0.3;
      p.mesh.position.set(x - 1.2, y + 0.3, z + (Math.random() - 0.5) * 1.5);
      p.mesh.scale.setScalar(scale * 0.6);
      p.mesh.visible = true;
      p.vx = -1.2 - Math.random() * 1.8;
      p.vy = 0.8 + Math.random() * 1.2;
      p.vz = (Math.random() - 0.5) * 0.8;
      dustPoolIdx++;
    };

    // =============================================================
    // 8. SPEED STREAKS & FLOATING JUNGLE LEAVES
    // =============================================================
    // Speed lines trailing fast runners
    const speedLines: THREE.Mesh[] = [];
    const lineGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 6);
    lineGeo.rotateZ(Math.PI / 2);

    for (let i = 0; i < 12; i++) {
      const sl = new THREE.Mesh(lineGeo, speedLineMat);
      sl.position.set(
        -2 + Math.random() * 8,
        -1.5 + Math.random() * 4,
        2 + Math.random() * 7
      );
      stampedeGroup.add(sl);
      speedLines.push(sl);
    }

    // Swirling jungle leaves
    const leaves: { mesh: THREE.Mesh; rotSpeed: number; swayPhase: number }[] = [];
    const leafGeo = new THREE.CircleGeometry(0.4, 5);
    for (let i = 0; i < 18; i++) {
      const leaf = new THREE.Mesh(leafGeo, jungleLeafMat);
      leaf.position.set(
        -12 + Math.random() * 24,
        -1 + Math.random() * 8,
        -4 + Math.random() * 14
      );
      stampedeGroup.add(leaf);
      leaves.push({
        mesh: leaf,
        rotSpeed: 2 + Math.random() * 4,
        swayPhase: Math.random() * Math.PI * 2,
      });
    }

    // =============================================================
    // 9. ANIMATION LOOP & RUNNING PHYSICS
    // =============================================================
    const startTime = performance.now();
    const duration = 4.3; // 4.3 seconds smooth traversal
    let animFrame: number;
    let prevTRexStepSign = 1;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Traversal across screen from Left to Right (X: -38 to +38)
      const currentX = -38 + progress * 76;
      stampedeGroup.position.x = currentX;

      // --- T-REX PHYSICS ---
      // Running cadence (11 rad/s)
      const tStep = Math.sin(elapsed * 11);
      const tBounce = Math.abs(tStep) * 0.45;
      trexGroup.position.y = -3.2 + tBounce;

      // Leg stride alternation
      tLegL.rotation.x = tStep * 0.72;
      tLegR.rotation.x = -tStep * 0.72;

      // Counter-phase tail swing
      trexTail.rotation.y = -Math.sin(elapsed * 11) * 0.42;
      trexTail.rotation.z = Math.cos(elapsed * 11) * 0.15;

      // Head bobbing & roaring jaw
      trexHead.rotation.x = Math.sin(elapsed * 11) * 0.12;
      trexHead.rotation.z = Math.sin(elapsed * 5.5) * 0.08;
      trexJaw.rotation.x = 0.2 + Math.abs(Math.sin(elapsed * 6)) * 0.35; // Roaring mouth!

      // Cute arm pumping
      tArmL.rotation.x = -0.7 + Math.sin(elapsed * 14) * 0.55;
      tArmR.rotation.x = -0.7 - Math.sin(elapsed * 14) * 0.55;

      // Foot stomp dust detection
      const currentTRexSign = Math.sign(tStep);
      if (currentTRexSign !== prevTRexStepSign && Math.abs(tStep) < 0.2) {
        triggerDustPuff(trexGroup.position.x, -3.2, trexGroup.position.z, 1.2);
        prevTRexStepSign = currentTRexSign;
      }

      // --- VELOCIRAPTOR FAST SPRINT ---
      // Rapid sprint cycle (22 rad/s)
      const rStep = Math.sin(elapsed * 22);
      raptorGroup.position.y = -3.6 + Math.abs(rStep) * 0.38;
      rLegL.rotation.x = rStep * 0.95;
      rLegR.rotation.x = -rStep * 0.95;
      rTail.rotation.y = -Math.sin(elapsed * 22) * 0.28;
      rHead.rotation.x = 0.15 + Math.sin(elapsed * 22) * 0.1;

      // --- TRICERATOPS TROT ---
      const triStep = Math.sin(elapsed * 9);
      triGroup.position.y = -3.4 + Math.abs(triStep) * 0.25;
      triLegFL.rotation.x = triStep * 0.45;
      triLegBR.rotation.x = triStep * 0.45;
      triLegFR.rotation.x = -triStep * 0.45;
      triLegBL.rotation.x = -triStep * 0.45;
      triHead.rotation.z = Math.sin(elapsed * 9) * 0.15;

      // --- STEGOSAURUS HEAVY STRIDE ---
      const sStep = Math.sin(elapsed * 7.5);
      stegoGroup.position.y = -3.3 + Math.abs(sStep) * 0.2;
      stegoTail.rotation.y = Math.sin(elapsed * 10) * 0.55; // Spiked tail swing!

      // --- BRACHIOSAURUS MAJESTIC SWAY ---
      bHead.position.y = 19.6 + Math.sin(elapsed * 3.5) * 0.6;
      bHead.rotation.z = Math.sin(elapsed * 2.5) * 0.1;

      // --- PTERODACTYL OVERHEAD FLIGHT ---
      const wingFlap = Math.sin(elapsed * 18) * 0.45;
      ptWingL.rotation.z = wingFlap;
      ptWingR.rotation.z = -wingFlap;
      pteroGroup.position.y = 9.5 + Math.sin(elapsed * 4.5) * 0.6;

      // --- DUST PARTICLES PHYSICS ---
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
        p.mesh.scale.multiplyScalar(1.02); // expands
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.65 * (1 - lifeFrac);
      });

      // --- SPEED LINES ANIMATION ---
      speedLines.forEach((sl, idx) => {
        sl.position.x -= 0.6;
        if (sl.position.x < -18) {
          sl.position.x = 12 + Math.random() * 6;
          sl.position.y = -2 + Math.random() * 5;
        }
      });

      // --- JUNGLE LEAVES SWIRL ---
      leaves.forEach((l) => {
        l.mesh.rotation.x += l.rotSpeed * 0.01;
        l.mesh.rotation.y += l.rotSpeed * 0.015;
        l.mesh.position.y += Math.sin(elapsed * 3 + l.swayPhase) * 0.02;
      });

      // --- SMOOTH GLOBAL FADE-OUT (PAST 70% PROGRESS) ---
      let overallOpacity = 1.0;
      if (progress > 0.70) {
        overallOpacity = Math.max(0, 1 - (progress - 0.70) / 0.30);
      }

      allMaterials.forEach((mat) => {
        if ("opacity" in mat) {
          (mat as THREE.Material & { opacity: number }).opacity = 0.98 * overallOpacity;
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
