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
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- PROCEDURAL REPTILIAN SKIN & SCALE TEXTURE GENERATOR ---
    const createDinoScaleTexture = (baseHex: string, scaleHex: string, wrinkleHex: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // Base skin tint
      ctx.fillStyle = baseHex;
      ctx.fillRect(0, 0, 256, 256);

      // Cobblestone reptilian scales pattern
      ctx.fillStyle = scaleHex;
      ctx.strokeStyle = wrinkleHex;
      ctx.lineWidth = 1.5;

      const gridSize = 16;
      for (let y = 0; y < 256; y += gridSize) {
        for (let x = 0; x < 256; x += gridSize) {
          const offsetX = (y / gridSize) % 2 === 0 ? 0 : gridSize / 2;
          const px = (x + offsetX) % 256;
          const py = y;
          const r = gridSize * 0.42;

          ctx.beginPath();
          ctx.ellipse(px + gridSize / 2, py + gridSize / 2, r, r * 0.85, 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }

      // Skin folds / horizontal stretch wrinkles
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const wy = 30 + i * 28;
        ctx.beginPath();
        ctx.moveTo(0, wy);
        ctx.bezierCurveTo(80, wy + 8, 160, wy - 8, 256, wy + 4);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      return tex;
    };

    const trexSkinTex = createDinoScaleTexture("#15803d", "#22c55e", "#14532d");
    const raptorSkinTex = createDinoScaleTexture("#0891b2", "#06b6d4", "#155e75");
    const triSkinTex = createDinoScaleTexture("#e11d48", "#fb7185", "#9f1239");
    const stegoSkinTex = createDinoScaleTexture("#d97706", "#f59e0b", "#92400e");

    // --- LIGHTING WITH RICH SPECULAR GLINTS & RIM HIGHLIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfef08a, 2.5);
    sunLight.position.set(22, 38, 26);
    scene.add(sunLight);

    const emeraldRim = new THREE.DirectionalLight(0x22c55e, 2.0);
    emeraldRim.position.set(-26, 20, -16);
    scene.add(emeraldRim);

    const amberBounce = new THREE.PointLight(0xf59e0b, 2.8, 50);
    amberBounce.position.set(0, 4, 14);
    scene.add(amberBounce);

    const skyCyanLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    skyCyanLight.position.set(6, 26, 12);
    scene.add(skyCyanLight);

    // Master stampede group
    const stampedeGroup = new THREE.Group();
    scene.add(stampedeGroup);

    // All materials tracking for global opacity fade-out
    const allMaterials: THREE.Material[] = [];
    const registerMat = <T extends THREE.Material>(mat: T): T => {
      allMaterials.push(mat);
      return mat;
    };

    // --- MATERIALS WITH HIGH-DETAIL BUMP & SPECULAR REFLECTIONS ---
    const trexGreenMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x16a34a,
        roughness: 0.35,
        metalness: 0.12,
        bumpMap: trexSkinTex || undefined,
        bumpScale: 0.05,
        transparent: true,
        opacity: 0.98,
      })
    );
    const trexBellyMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        roughness: 0.38,
        metalness: 0.08,
        bumpMap: trexSkinTex || undefined,
        bumpScale: 0.03,
        transparent: true,
        opacity: 0.98,
      })
    );
    const mouthPinkMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xf87171,
        roughness: 0.25,
        transparent: true,
        opacity: 0.98,
      })
    );
    const teethMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.98,
      })
    );
    const clawMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.2,
        metalness: 0.25,
        transparent: true,
        opacity: 0.98,
      })
    );
    const eyeIrisMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.98,
      })
    );
    const eyePupilMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x09090b,
        roughness: 0.05,
        metalness: 0.4,
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
        roughness: 0.26,
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
        bumpMap: raptorSkinTex || undefined,
        bumpScale: 0.04,
        transparent: true,
        opacity: 0.98,
      })
    );
    const raptorStripeMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0369a1,
        roughness: 0.32,
        transparent: true,
        opacity: 0.98,
      })
    );
    const triPinkMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xfb7185,
        roughness: 0.38,
        metalness: 0.08,
        bumpMap: triSkinTex || undefined,
        bumpScale: 0.04,
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
        bumpMap: stegoSkinTex || undefined,
        bumpScale: 0.05,
        transparent: true,
        opacity: 0.98,
      })
    );
    const plateRedMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        roughness: 0.22,
        metalness: 0.15,
        transparent: true,
        opacity: 0.98,
      })
    );
    const brachioBlueMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.42,
        metalness: 0.08,
        transparent: true,
        opacity: 0.96,
      })
    );
    const pteroPurpleMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        roughness: 0.32,
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
    // 1. T-REX — REALISTIC CARTOON ANATOMY & KINEMATICS
    // =============================================================
    const trexGroup = new THREE.Group();
    trexGroup.position.set(2.0, -3.2, 5.5);
    trexGroup.rotation.y = Math.PI / 2;

    // Muscular Thoracic Body
    const trexBody = new THREE.Mesh(new THREE.SphereGeometry(2.7, 24, 24), trexGreenMat);
    trexBody.scale.set(1.15, 1.35, 1.55);
    trexBody.position.set(0, 4.6, 0);
    trexGroup.add(trexBody);

    // Cream Belly with Muscular Contours
    const trexBelly = new THREE.Mesh(new THREE.SphereGeometry(2.2, 18, 18), trexBellyMat);
    trexBelly.scale.set(0.95, 1.25, 1.2);
    trexBelly.position.set(0, 4.2, 1.05);
    trexGroup.add(trexBelly);

    // S-Curved Neck
    const tNeck = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.55, 2.5, 16), trexGreenMat);
    tNeck.position.set(0, 6.4, 1.3);
    tNeck.rotation.x = -0.4;
    trexGroup.add(tNeck);

    // Articulated Predatory Skull with Brow Ridges
    const trexHead = new THREE.Group();
    trexHead.position.set(0, 7.6, 2.5);

    // Upper Cranium & Snout
    const cranium = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.95, 3.4), trexGreenMat);
    cranium.position.set(0, 0.5, 0.4);
    trexHead.add(cranium);

    // Brow Horn Ridges
    const ridgeGeo = new THREE.BoxGeometry(0.65, 0.32, 1.6);
    const lRidge = new THREE.Mesh(ridgeGeo, trexGreenMat);
    lRidge.position.set(-1.22, 1.25, 0.6);
    lRidge.rotation.z = -0.22;
    trexHead.add(lRidge);

    const rRidge = new THREE.Mesh(ridgeGeo, trexGreenMat);
    rRidge.position.set(1.22, 1.25, 0.6);
    rRidge.rotation.z = 0.22;
    trexHead.add(rRidge);

    // Realistic Theropod Eyes with Slit Pupil & Specular Glint
    const createReptileEye = (isLeft: boolean) => {
      const eye = new THREE.Group();
      const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.52, 16, 16), eyeIrisMat);
      eye.add(sclera);

      // Slit Pupil
      const pupilGeo = new THREE.BoxGeometry(0.12, 0.48, 0.2);
      const pupil = new THREE.Mesh(pupilGeo, eyePupilMat);
      pupil.position.set(isLeft ? -0.2 : 0.2, 0.02, 0.42);
      eye.add(pupil);

      // Bright Specular Highlight Glint
      const glint = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), eyeGlintMat);
      glint.position.set(isLeft ? -0.15 : 0.15, 0.15, 0.48);
      eye.add(glint);

      return eye;
    };

    const lEye = createReptileEye(true);
    lEye.position.set(-1.24, 0.82, 0.9);
    trexHead.add(lEye);

    const rEye = createReptileEye(false);
    rEye.position.set(1.24, 0.82, 0.9);
    trexHead.add(rEye);

    // Dagger-Sharp Teeth along Maxilla
    const toothGeo = new THREE.ConeGeometry(0.12, 0.42, 6);
    toothGeo.rotateX(Math.PI);
    for (let i = 0; i < 7; i++) {
      const t1 = new THREE.Mesh(toothGeo, teethMat);
      t1.position.set(-0.95 + i * 0.31, -0.48, 1.8 - (i % 2) * 0.15);
      trexHead.add(t1);
    }

    // Articulated Lower Jaw with Tongue & Dentary Teeth
    const trexJaw = new THREE.Group();
    trexJaw.position.set(0, -0.3, 0.6);

    const jawBase = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.75, 2.8), trexGreenMat);
    jawBase.position.set(0, 0, 0.7);
    trexJaw.add(jawBase);

    const tongue = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 12), mouthPinkMat);
    tongue.scale.set(1.3, 0.35, 1.6);
    tongue.position.set(0, 0.4, 0.95);
    trexJaw.add(tongue);

    const bottomToothGeo = new THREE.ConeGeometry(0.1, 0.35, 6);
    for (let i = 0; i < 6; i++) {
      const bt = new THREE.Mesh(bottomToothGeo, teethMat);
      bt.position.set(-0.8 + i * 0.32, 0.42, 1.8 - (i % 2) * 0.15);
      trexJaw.add(bt);
    }
    trexHead.add(trexJaw);
    trexGroup.add(trexHead);

    // Tiny 2-Clawed Forelimbs
    const createTrexArm = (isLeft: boolean) => {
      const arm = new THREE.Group();
      arm.position.set(isLeft ? -1.5 : 1.5, 4.9, 1.8);

      const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 1.0, 10), trexGreenMat);
      upperArm.position.set(0, -0.4, 0);
      arm.add(upperArm);

      const claw1 = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.32, 6), clawMat);
      claw1.rotation.x = Math.PI / 2;
      claw1.position.set(-0.1, -0.9, 0.2);
      arm.add(claw1);

      const claw2 = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.32, 6), clawMat);
      claw2.rotation.x = Math.PI / 2;
      claw2.position.set(0.1, -0.9, 0.2);
      arm.add(claw2);

      return arm;
    };
    const tArmL = createTrexArm(true);
    const tArmR = createTrexArm(false);
    trexGroup.add(tArmL);
    trexGroup.add(tArmR);

    // 4-Segment Multi-Link Serpentine Whipping Tail
    const tailSeg1 = new THREE.Group();
    tailSeg1.position.set(0, 4.0, -2.1);
    const mTail1 = new THREE.Mesh(new THREE.ConeGeometry(1.4, 2.6, 16), trexGreenMat);
    mTail1.rotation.x = -Math.PI / 2.3;
    mTail1.position.set(0, 0.2, -1.2);
    tailSeg1.add(mTail1);

    const tailSeg2 = new THREE.Group();
    tailSeg2.position.set(0, 0.4, -2.4);
    const mTail2 = new THREE.Mesh(new THREE.ConeGeometry(1.0, 2.4, 14), trexGreenMat);
    mTail2.rotation.x = -Math.PI / 2.2;
    mTail2.position.set(0, 0.3, -1.1);
    tailSeg2.add(mTail2);
    tailSeg1.add(tailSeg2);

    const tailSeg3 = new THREE.Group();
    tailSeg3.position.set(0, 0.4, -2.2);
    const mTail3 = new THREE.Mesh(new THREE.ConeGeometry(0.65, 2.2, 12), trexGreenMat);
    mTail3.rotation.x = -Math.PI / 2.15;
    mTail3.position.set(0, 0.3, -1.0);
    tailSeg3.add(mTail3);
    tailSeg2.add(tailSeg3);

    trexGroup.add(tailSeg1);

    // Anatomical 3-Segment Articulated Legs (Thigh -> Shin -> Hock/Foot with Claws)
    const createAnatomicalLeg = (isLeft: boolean) => {
      const legRoot = new THREE.Group();
      legRoot.position.set(isLeft ? -1.8 : 1.8, 3.2, 0.2);

      // Muscular Femur / Thigh
      const thigh = new THREE.Mesh(new THREE.SphereGeometry(1.25, 16, 16), trexGreenMat);
      thigh.scale.set(0.9, 1.35, 1.15);
      thigh.position.set(0, -0.4, 0);
      legRoot.add(thigh);

      // Tibia / Shin
      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 2.6, 12), trexGreenMat);
      shin.position.set(0, -1.9, 0.1);
      legRoot.add(shin);

      // Foot with 3 Splayed Forward Claws + Rear Spur
      const foot = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.65, 2.3), trexGreenMat);
      foot.position.set(0, -3.2, 0.5);
      legRoot.add(foot);

      for (let c = 0; c < 3; c++) {
        const claw = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.55, 6), clawMat);
        claw.rotation.x = Math.PI / 2.2;
        claw.position.set(-0.45 + c * 0.45, -3.2, 1.7);
        legRoot.add(claw);
      }

      // Rear dewclaw
      const dewclaw = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.35, 6), clawMat);
      dewclaw.rotation.x = -Math.PI / 2.2;
      dewclaw.position.set(0, -3.0, -0.7);
      legRoot.add(dewclaw);

      return legRoot;
    };
    const tLegL = createAnatomicalLeg(true);
    const tLegR = createAnatomicalLeg(false);
    trexGroup.add(tLegL);
    trexGroup.add(tLegR);

    stampedeGroup.add(trexGroup);

    // =============================================================
    // 2. VELOCIRAPTOR — AGILE AERO SPRINTER (Turquoise with Stripes)
    // =============================================================
    const raptorGroup = new THREE.Group();
    raptorGroup.position.set(9.5, -3.6, 7.5);
    raptorGroup.rotation.y = Math.PI / 2;

    const rBody = new THREE.Mesh(new THREE.ConeGeometry(0.85, 3.4, 14), raptorCyanMat);
    rBody.rotation.x = Math.PI / 2.2;
    rBody.position.set(0, 1.9, 0);
    raptorGroup.add(rBody);

    const rStripe = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 3.2), raptorStripeMat);
    rStripe.position.set(0, 2.4, 0);
    rStripe.rotation.x = 0.3;
    raptorGroup.add(rStripe);

    const rHead = new THREE.Group();
    rHead.position.set(0, 2.6, 2.2);

    const rSkull = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.0, 12), raptorCyanMat);
    rSkull.rotation.x = -Math.PI / 2.3;
    rSkull.position.set(0, 0, 0.6);
    rHead.add(rSkull);

    // Raptor Eye
    const rEyeGeo = new THREE.SphereGeometry(0.22, 10, 10);
    const rEyeL = new THREE.Mesh(rEyeGeo, eyeIrisMat);
    rEyeL.position.set(-0.45, 0.25, 0.5);
    const rPupL = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), eyePupilMat);
    rPupL.position.set(-0.12, 0, 0.14);
    rEyeL.add(rPupL);
    rHead.add(rEyeL);

    const rEyeR = new THREE.Mesh(rEyeGeo, eyeIrisMat);
    rEyeR.position.set(0.45, 0.25, 0.5);
    const rPupR = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), eyePupilMat);
    rPupR.position.set(0.12, 0, 0.14);
    rEyeR.add(rPupR);
    rHead.add(rEyeR);
    raptorGroup.add(rHead);

    // Stiff Rod Balancing Tail with Feather Fan
    const rTail = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.42, 4.4, 10), raptorCyanMat);
    rTail.rotation.x = -Math.PI / 2.1;
    rTail.position.set(0, 2.1, -2.4);
    raptorGroup.add(rTail);

    const rFeatherFan = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 1.4), raptorStripeMat);
    rFeatherFan.position.set(0, 2.1, -4.5);
    raptorGroup.add(rFeatherFan);

    // Raptor Legs with Raised Sickle Claw
    const createRaptorLeg = (isLeft: boolean) => {
      const leg = new THREE.Group();
      leg.position.set(isLeft ? -0.85 : 0.85, 1.6, 0);

      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 1.9, 8), raptorCyanMat);
      shin.position.set(0, -0.9, 0);
      leg.add(shin);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.25, 1.2), raptorCyanMat);
      foot.position.set(0, -1.8, 0.3);
      leg.add(foot);

      // Raised Curved Sickle Claw
      const sickle = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 6), clawMat);
      sickle.rotation.x = -Math.PI / 2.8;
      sickle.position.set(isLeft ? 0.2 : -0.2, -1.55, 0.75);
      leg.add(sickle);

      return leg;
    };
    const rLegL = createRaptorLeg(true);
    const rLegR = createRaptorLeg(false);
    raptorGroup.add(rLegL);
    raptorGroup.add(rLegR);

    stampedeGroup.add(raptorGroup);

    // =============================================================
    // 3. TRICERATOPS (Midground, Coral-Terracotta with Scalloped Frill)
    // =============================================================
    const triGroup = new THREE.Group();
    triGroup.position.set(-4.5, -3.4, 2.5);
    triGroup.rotation.y = Math.PI / 2;

    const triBody = new THREE.Mesh(new THREE.SphereGeometry(2.3, 20, 20), triPinkMat);
    triBody.scale.set(1.15, 1.15, 1.65);
    triBody.position.set(0, 2.9, 0);
    triGroup.add(triBody);

    const triBelly = new THREE.Mesh(new THREE.SphereGeometry(1.8, 14, 14), triBellyMat);
    triBelly.scale.set(1.0, 0.9, 1.4);
    triBelly.position.set(0, 2.3, 0.3);
    triGroup.add(triBelly);

    // Head with Scalloped Parietal Frill
    const triHead = new THREE.Group();
    triHead.position.set(0, 3.4, 2.2);

    const frillMesh = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 0.38, 18), triPinkMat);
    frillMesh.rotation.x = Math.PI / 3.2;
    frillMesh.position.set(0, 0.7, -0.4);
    triHead.add(frillMesh);

    // Scalloped epoccipital horn bumps along frill rim
    for (let f = 0; f < 7; f++) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), hornBoneMat);
      const angle = -Math.PI * 0.45 + (f * Math.PI * 0.9) / 6;
      dot.position.set(Math.sin(angle) * 2.25, 0.7 + Math.cos(angle) * 1.55, -0.4);
      triHead.add(dot);
    }

    // Beak Snout
    const snout = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.8, 14), triPinkMat);
    snout.rotation.x = -Math.PI / 2.3;
    snout.position.set(0, -0.2, 1.2);
    triHead.add(snout);

    // 3 Curved Ivory Horns
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
    // 4. STEGOSAURUS (Midground, Amber with Vascular Red Plates)
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

    // Alternating Dual Rows of Vascular Dorsal Plates
    const plateGeo = new THREE.ConeGeometry(0.72, 1.55, 4);
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

    const neckPoints = [
      new THREE.Vector3(0, 5.5, 2.2),
      new THREE.Vector3(0, 11.0, 3.8),
      new THREE.Vector3(0, 16.5, 4.4),
      new THREE.Vector3(0, 19.5, 5.4),
    ];
    const neckCurve = new THREE.CatmullRomCurve3(neckPoints);
    const neckMesh = new THREE.Mesh(new THREE.TubeGeometry(neckCurve, 20, 1.1, 12, false), brachioBlueMat);
    brachioGroup.add(neckMesh);

    const bHead = new THREE.Mesh(new THREE.SphereGeometry(1.2, 14, 14), brachioBlueMat);
    bHead.position.set(0, 19.6, 6.0);
    brachioGroup.add(bHead);

    stampedeGroup.add(brachioGroup);

    // =============================================================
    // 6. PTERODACTYL (Soaring Sky Plane, Flapping Wing Membrane)
    // =============================================================
    const pteroGroup = new THREE.Group();
    pteroGroup.position.set(4.0, 9.8, 4.0);
    pteroGroup.rotation.y = Math.PI / 2;
    pteroGroup.rotation.z = -0.15; // Banking angle

    const ptBody = new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.4, 10), pteroPurpleMat);
    ptBody.rotation.x = Math.PI / 2.2;
    pteroGroup.add(ptBody);

    const ptBeak = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.8, 8), hornBoneMat);
    ptBeak.rotation.x = -Math.PI / 2.3;
    ptBeak.position.set(0, 0.2, 1.8);
    pteroGroup.add(ptBeak);

    // Articulated Wings with Flapping Motion
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
    // 8. ANIMATION LOOP & RUNNING KINEMATICS
    // =============================================================
    const startTime = performance.now();
    const duration = 4.3; // 4.3s traversal across screen
    let animFrame: number;
    let prevTRexStepSign = 1;

    const animate = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Traversal across screen from Left to Right (X: -38 to +38)
      const currentX = -38 + progress * 76;
      stampedeGroup.position.x = currentX;

      // --- T-REX REALISTIC KINEMATICS ---
      const tStep = Math.sin(elapsed * 11);
      const tBounce = Math.abs(tStep) * 0.45;
      trexGroup.position.y = -3.2 + tBounce;

      // Subtle breathing expansion
      trexBody.scale.x = 1.15 + Math.sin(elapsed * 3) * 0.03;

      // Leg stride alternation with shock absorption
      tLegL.rotation.x = tStep * 0.72;
      tLegR.rotation.x = -tStep * 0.72;

      // Multi-segment serpentine whipping tail motion
      tailSeg1.rotation.y = -Math.sin(elapsed * 11) * 0.32;
      tailSeg2.rotation.y = -Math.sin(elapsed * 11 - 0.4) * 0.42;
      tailSeg3.rotation.y = -Math.sin(elapsed * 11 - 0.8) * 0.52;

      // Head bobbing & roaring jaw
      trexHead.rotation.x = Math.sin(elapsed * 11) * 0.12;
      trexHead.rotation.z = Math.sin(elapsed * 5.5) * 0.08;
      trexJaw.rotation.x = 0.2 + Math.abs(Math.sin(elapsed * 6)) * 0.35; // Roaring jaw opening

      // Arm pumping
      tArmL.rotation.x = -0.7 + Math.sin(elapsed * 14) * 0.55;
      tArmR.rotation.x = -0.7 - Math.sin(elapsed * 14) * 0.55;

      // Foot contact dust detection
      const currentTRexSign = Math.sign(tStep);
      if (currentTRexSign !== prevTRexStepSign && Math.abs(tStep) < 0.2) {
        triggerDustPuff(trexGroup.position.x, -3.2, trexGroup.position.z, 1.2);
        prevTRexStepSign = currentTRexSign;
      }

      // --- VELOCIRAPTOR FAST SPRINT ---
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
      stegoTail.rotation.y = Math.sin(elapsed * 10) * 0.55;

      // --- BRACHIOSAURUS MAJESTIC SWAY ---
      bHead.position.y = 19.6 + Math.sin(elapsed * 3.5) * 0.6;
      bHead.rotation.z = Math.sin(elapsed * 2.5) * 0.1;

      // --- PTERODACTYL OVERHEAD FLIGHT ---
      const wingFlap = Math.sin(elapsed * 18) * 0.45;
      ptWingL.rotation.z = wingFlap;
      ptWingR.rotation.z = -wingFlap;
      pteroGroup.position.y = 9.8 + Math.sin(elapsed * 4.5) * 0.6;

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
        p.mesh.scale.multiplyScalar(1.02);
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.65 * (1 - lifeFrac);
      });

      // --- SPEED LINES ---
      speedLines.forEach((sl) => {
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

      // --- SMOOTH GLOBAL FADE-OUT PAST 70% PROGRESS ---
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
