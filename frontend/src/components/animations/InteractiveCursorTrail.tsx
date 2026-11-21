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

    // Retina & High-DPI Support for Ultra-Crisp Sparkles
    const setupCanvasResolution = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr); // Scale for high-DPI
    };

    setupCanvasResolution();
    window.addEventListener("resize", setupCanvasResolution);

    // Authentic Magic Island Amusement Park Palette
    const sparkles: Sparkle[] = [];
    const colors = ["#FFD93D", "#FF6B35", "#38BDF8", "#55C98B", "#F472B6"];

    let lastX = 0;
    let lastY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHolding = false;
    let activePointerId: number | null = null;
    let lastMoveThrottle = 0;
    let lastHoldEmission = 0;
    let lastDownTimestamp = 0;

    // Helper: Spawn authentic 4-point star sparkle with physics
    const spawnSparkle = (
      x: number,
      y: number,
      speedMultiplier = 1.0,
      jitter = 8,
      sizeBoost = 1.0
    ) => {
      if (sparkles.length > 70) sparkles.shift();
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 1.9 + 0.5) * speedMultiplier;
      sparkles.push({
        x: x + (Math.random() - 0.5) * jitter,
        y: y + (Math.random() - 0.5) * jitter,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.28,
        size: (Math.random() * 4.2 + 2.8) * sizeBoost,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.16,
      });
    };

    // Trigger an immediate rich burst (used for single tap or click start)
    const triggerBurst = (x: number, y: number, count = 4) => {
      for (let i = 0; i < count; i++) {
        spawnSparkle(x, y, 1.45, 14, 1.15);
      }
    };

    // =============================================================
    // 1. POINTER & MOUSE DOWN (CLICK & HOLD / TOUCH & HOLD)
    // =============================================================
    const onPointerDown = (e: PointerEvent) => {
      // For mouse input, ensure it is the primary (left) button
      if (e.pointerType === "mouse" && e.button !== 0) return;

      const now = performance.now();
      lastDownTimestamp = now;
      isHolding = true;
      activePointerId = e.pointerId;
      currentX = e.clientX;
      currentY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;

      triggerBurst(currentX, currentY, 4);
    };

    // =============================================================
    // 2. POINTER & MOUSE MOVE (TRAIL & DRAG FOLLOWING)
    // =============================================================
    const onPointerMove = (e: PointerEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;

      // Real-time mouse buttons validation (if mouse is down and moving)
      if (e.pointerType === "mouse") {
        if (e.buttons & 1) {
          isHolding = true;
        } else if (e.buttons === 0 && isHolding) {
          isHolding = false;
        }
      }

      const now = performance.now();
      if (now - lastMoveThrottle < 16) return; // ~60fps throttle
      lastMoveThrottle = now;

      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < 4) return;
      lastX = e.clientX;
      lastY = e.clientY;

      // Spawn movement sparkles
      const count = Math.min(isHolding ? 3 : 2, Math.floor(dist / 14) + 1);
      for (let i = 0; i < count; i++) {
        spawnSparkle(e.clientX, e.clientY, isHolding ? 1.3 : 1.0, 8);
      }
    };

    // =============================================================
    // 3. POINTER UP & CANCEL (RELEASE)
    // =============================================================
    const onPointerUp = (e: PointerEvent) => {
      if (activePointerId === null || e.pointerId === activePointerId || e.pointerType === "mouse") {
        isHolding = false;
        activePointerId = null;
      }
    };

    const onPointerCancel = (e: PointerEvent) => {
      // Don't kill touch hold if finger is still physically on screen
      if (e.pointerType === "mouse" || activePointerId === e.pointerId) {
        isHolding = false;
        activePointerId = null;
      }
    };

    // =============================================================
    // 4. DEDICATED TOUCHSCREEN EVENT LISTENERS (MOBILE / TABLET)
    // =============================================================
    // Ensures mobile browsers that intercept pointer events for scrolling
    // continue to support touch tap, touch-and-hold, and dragging smoothly.
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const now = performance.now();

      // Avoid duplicate burst if pointerdown already fired in this instant
      const isDuplicate = now - lastDownTimestamp < 35;
      lastDownTimestamp = now;

      isHolding = true;
      currentX = touch.clientX;
      currentY = touch.clientY;
      lastX = touch.clientX;
      lastY = touch.clientY;

      if (!isDuplicate) {
        triggerBurst(currentX, currentY, 4);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      currentX = touch.clientX;
      currentY = touch.clientY;
      isHolding = true;

      const now = performance.now();
      if (now - lastMoveThrottle < 16) return;
      lastMoveThrottle = now;

      const dist = Math.hypot(touch.clientX - lastX, touch.clientY - lastY);
      if (dist < 4) return;
      lastX = touch.clientX;
      lastY = touch.clientY;

      const count = Math.min(3, Math.floor(dist / 14) + 1);
      for (let i = 0; i < count; i++) {
        spawnSparkle(touch.clientX, touch.clientY, 1.25, 8);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) {
        isHolding = false;
        activePointerId = null;
      }
    };

    const onTouchCancel = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) {
        isHolding = false;
        activePointerId = null;
      }
    };

    // Safety fallback when window loses focus or pointer exits document
    const onWindowBlur = () => {
      isHolding = false;
      activePointerId = null;
    };

    // Use capturing phase ({ capture: true, passive: true }) so buttons & child
    // elements never stop or swallow cursor events!
    const listenerOpts: AddEventListenerOptions = { capture: true, passive: true };

    window.addEventListener("pointerdown", onPointerDown, listenerOpts);
    window.addEventListener("pointermove", onPointerMove, listenerOpts);
    window.addEventListener("pointerup", onPointerUp, listenerOpts);
    window.addEventListener("pointercancel", onPointerCancel, listenerOpts);

    // Native Touch Events for guaranteed mobile/tablet support
    window.addEventListener("touchstart", onTouchStart, listenerOpts);
    window.addEventListener("touchmove", onTouchMove, listenerOpts);
    window.addEventListener("touchend", onTouchEnd, listenerOpts);
    window.addEventListener("touchcancel", onTouchCancel, listenerOpts);

    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("mouseleave", onWindowBlur);

    // 4-Point Star Drawing Logic (Authentic Theme Park Diamond Star)
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

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      const now = performance.now();

      // CONTINUOUS HOLD-TO-ACTIVATE GENERATION:
      // While mouse button or finger is held down, stream continuous sparkles
      if (isHolding) {
        if (now - lastHoldEmission > 32) {
          lastHoldEmission = now;
          spawnSparkle(currentX, currentY, 1.2, 12, 1.05);
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

      window.removeEventListener("touchstart", onTouchStart, listenerOpts);
      window.removeEventListener("touchmove", onTouchMove, listenerOpts);
      window.removeEventListener("touchend", onTouchEnd, listenerOpts);
      window.removeEventListener("touchcancel", onTouchCancel, listenerOpts);

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
