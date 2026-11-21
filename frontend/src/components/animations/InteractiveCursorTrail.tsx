"use client";

import React, { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  rotation: number;
  vRot: number;
  isInitial?: boolean;
}

export function InteractiveCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user's reduced-motion preference
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    // Setup Canvas Resolution with exact getBoundingClientRect() to eliminate any scrollbar or DPI distortion
    const setupCanvasResolution = () => {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasResolution();
    window.addEventListener("resize", setupCanvasResolution);

    // Authentic Magic Island Theme Park Palette
    const sparkles: Sparkle[] = [];
    const colors = ["#FFD93D", "#FF6B35", "#38BDF8", "#55C98B", "#F472B6"];

    let lastX = -100;
    let lastY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHolding = false;
    let isPointerInside = false;
    let activePointerId: number | null = null;
    let lastHoldEmission = 0;
    let lastMoveTime = 0;

    // Helper: Spawn 4-point diamond star sparkle originating EXACTLY at cursor pin point
    const spawnSparkle = (
      x: number,
      y: number,
      speedMultiplier = 1.0,
      sizeBoost = 1.0
    ) => {
      if (sparkles.length > 70) sparkles.shift();
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.7 + 0.25) * speedMultiplier;
      sparkles.push({
        x, // 100% exact pointer coordinate
        y, // 100% exact pointer coordinate
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.1,
        size: (Math.random() * 3.6 + 2.4) * sizeBoost,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.018, // ~0.7s lifetime
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.12,
        isInitial: true, // Render initial frame at exact (x, y) without velocity shift
      });
    };

    // Burst at exact click / tap down
    const triggerBurst = (x: number, y: number, count = 5) => {
      for (let i = 0; i < count; i++) {
        spawnSparkle(x, y, 1.25, 1.15);
      }
    };

    // =============================================================
    // 1. POINTER DOWN (CLICK & HOLD / TOUCH & HOLD)
    // =============================================================
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;

      const rect = canvas.getBoundingClientRect();
      currentX = e.clientX - rect.left;
      currentY = e.clientY - rect.top;
      lastX = currentX;
      lastY = currentY;
      isHolding = true;
      isPointerInside = true;
      activePointerId = e.pointerId;
      lastMoveTime = performance.now();

      triggerBurst(currentX, currentY, 5);
    };

    // =============================================================
    // 2. POINTER MOVE (IMMEDIATE 1:1 ZERO-DELAY TRACKING)
    // =============================================================
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      currentX = e.clientX - rect.left;
      currentY = e.clientY - rect.top;
      isPointerInside = true;
      lastMoveTime = performance.now();

      if (e.pointerType === "mouse") {
        if (e.buttons & 1) {
          isHolding = true;
        } else if (e.buttons === 0 && isHolding) {
          isHolding = false;
        }
      }

      if (lastX < 0) {
        lastX = currentX;
        lastY = currentY;
      }

      const dist = Math.hypot(currentX - lastX, currentY - lastY);
      if (dist >= 3) {
        // Fast movement interpolation: connect gap along the exact vector
        if (dist > 16) {
          const steps = Math.min(3, Math.floor(dist / 12));
          for (let i = 1; i <= steps; i++) {
            const frac = i / (steps + 1);
            spawnSparkle(
              lastX + (currentX - lastX) * frac,
              lastY + (currentY - lastY) * frac,
              isHolding ? 1.1 : 0.85
            );
          }
        }

        // Direct spawn at exact current pointer coordinates
        spawnSparkle(currentX, currentY, isHolding ? 1.2 : 1.0);
        lastX = currentX;
        lastY = currentY;
      }
    };

    // =============================================================
    // 3. POINTER UP & CANCEL
    // =============================================================
    const onPointerUp = (e: PointerEvent) => {
      if (activePointerId === null || e.pointerId === activePointerId || e.pointerType === "mouse") {
        isHolding = false;
        activePointerId = null;
      }
    };

    const onPointerCancel = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || activePointerId === e.pointerId) {
        isHolding = false;
        activePointerId = null;
      }
    };

    const onWindowBlur = () => {
      isHolding = false;
      isPointerInside = false;
      activePointerId = null;
    };

    const listenerOpts: AddEventListenerOptions = { capture: true, passive: true };

    window.addEventListener("pointerdown", onPointerDown, listenerOpts);
    window.addEventListener("pointermove", onPointerMove, listenerOpts);
    window.addEventListener("pointerup", onPointerUp, listenerOpts);
    window.addEventListener("pointercancel", onPointerCancel, listenerOpts);

    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("mouseleave", onWindowBlur);

    // 4-Point Diamond Star Drawing with Centered Coordinates
    const drawStar = (
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    // 60 FPS Render Loop
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const now = performance.now();

      // CONTINUOUS HOLD-TO-ACTIVATE:
      // While mouse button or touch is held down, stream sparkles from exact pointer position
      if (isHolding && currentX >= 0 && currentY >= 0) {
        if (now - lastHoldEmission > 32) {
          lastHoldEmission = now;
          spawnSparkle(currentX, currentY, 1.15, 1.05);
        }
      }

      // Update and Render Existing Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];

        // In the initial frame, do not apply velocity so the star center matches the cursor pinpoint
        if (s.isInitial) {
          s.isInitial = false;
        } else {
          s.x += s.vx;
          s.y += s.vy;
          s.rotation += s.vRot;
        }

        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);

        // Star Body
        ctx.fillStyle = s.color;
        drawStar(0, 0, 4, s.size, s.size * 0.38);
        ctx.fill();

        // Luminous White Center Pinpoint (Visually guarantees pinpoint alignment)
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0.7, s.size * 0.22), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // ACTIVE CURSOR PINPOINT SPARK:
      // When cursor is active on screen, render a crisp diamond spark directly centered at the cursor tip
      if (isPointerInside && currentX >= 0 && currentY >= 0 && now - lastMoveTime < 900) {
        const pulse = 0.85 + 0.15 * Math.sin(now * 0.008);
        const tipAlpha = Math.min(1, Math.max(0, 1 - (now - lastMoveTime - 500) / 400));

        ctx.save();
        ctx.globalAlpha = tipAlpha * 0.9;
        ctx.translate(currentX, currentY);
        ctx.rotate(now * 0.003);

        ctx.fillStyle = "#FFD93D";
        drawStar(0, 0, 4, 4.2 * pulse, 1.7 * pulse);
        ctx.fill();

        // Exact white pinpoint center
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(0, 0, 1.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setupCanvasResolution);

      window.removeEventListener("pointerdown", onPointerDown, listenerOpts);
      window.removeEventListener("pointermove", onPointerMove, listenerOpts);
      window.removeEventListener("pointerup", onPointerUp, listenerOpts);
      window.removeEventListener("pointercancel", onPointerCancel, listenerOpts);

      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("mouseleave", onWindowBlur);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 99999,
      }}
      aria-hidden="true"
    />
  );
}
