"use client";

import React, { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  vRot: number;
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
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    // Retina & High-DPI Support for Pixel-Perfect Sparkle Coordinates
    const setupCanvasResolution = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupCanvasResolution();
    window.addEventListener("resize", setupCanvasResolution);

    // Authentic Magic Island Amusement Park Palette
    const sparkles: Sparkle[] = [];
    const colors = ["#FFD93D", "#FF6B35", "#38BDF8", "#55C98B", "#F472B6"];

    let lastX = -100;
    let lastY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHolding = false;
    let activePointerId: number | null = null;
    let lastHoldEmission = 0;

    // Spawn 4-point diamond star sparkle originating EXACTLY at cursor position (0 jitter)
    const spawnSparkle = (
      x: number,
      y: number,
      speedMultiplier = 1.0,
      sizeBoost = 1.0
    ) => {
      if (sparkles.length > 70) sparkles.shift();
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.9 + 0.3) * speedMultiplier;
      sparkles.push({
        x, // Exact pointer coordinate, no offset
        y, // Exact pointer coordinate, no offset
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.15,
        size: (Math.random() * 3.8 + 2.6) * sizeBoost,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.14,
      });
    };

    // Immediate rich burst at exact click / tap down
    const triggerBurst = (x: number, y: number, count = 4) => {
      for (let i = 0; i < count; i++) {
        spawnSparkle(x, y, 1.3, 1.15);
      }
    };

    // =============================================================
    // 1. POINTER DOWN (CLICK & HOLD / TOUCH & HOLD)
    // =============================================================
    const onPointerDown = (e: PointerEvent) => {
      // For mouse input, ensure it is the primary (left) button
      if (e.pointerType === "mouse" && e.button !== 0) return;

      isHolding = true;
      activePointerId = e.pointerId;
      currentX = e.clientX;
      currentY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;

      // Spawn burst originating directly at the cursor tip
      triggerBurst(currentX, currentY, 4);
    };

    // =============================================================
    // 2. POINTER MOVE (IMMEDIATE 1:1 ZERO-DELAY TRACKING)
    // =============================================================
    const onPointerMove = (e: PointerEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;

      // Real-time mouse buttons validation
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
      if (dist >= 4) {
        // Fast movement interpolation: connect gap along the exact vector
        if (dist > 18) {
          const steps = Math.min(3, Math.floor(dist / 14));
          for (let i = 1; i <= steps; i++) {
            const frac = i / (steps + 1);
            spawnSparkle(
              lastX + (currentX - lastX) * frac,
              lastY + (currentY - lastY) * frac,
              isHolding ? 1.1 : 0.85
            );
          }
        }

        // Direct spawn at current pointer coordinates
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

    // Safety fallback when window loses focus
    const onWindowBlur = () => {
      isHolding = false;
      activePointerId = null;
    };

    const listenerOpts: AddEventListenerOptions = { capture: true, passive: true };

    window.addEventListener("pointerdown", onPointerDown, listenerOpts);
    window.addEventListener("pointermove", onPointerMove, listenerOpts);
    window.addEventListener("pointerup", onPointerUp, listenerOpts);
    window.addEventListener("pointercancel", onPointerCancel, listenerOpts);

    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("mouseleave", onWindowBlur);

    // 4-Point Diamond Star Drawing
    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    // 60 FPS Render Loop
    const render = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
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
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vRot;
        s.alpha -= 0.024; // Smooth ~0.7s lifetime

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.fillStyle = s.color;
        drawStar(0, 0, 4, s.size, s.size * 0.45);
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
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
