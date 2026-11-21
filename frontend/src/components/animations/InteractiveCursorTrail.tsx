"use client";

import React, { useEffect, useRef } from "react";

interface Sparkle {
  active: boolean;
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
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    // High-DPI Canvas scaling for razor-sharp particles
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
    const colors = ["#FFD93D", "#FF6B35", "#38BDF8", "#55C98B", "#F472B6"];

    // Object Pool of 85 particles (Zero GC allocation pauses during animation)
    const MAX_SPARKLES = 85;
    const sparkles: Sparkle[] = [];
    for (let i = 0; i < MAX_SPARKLES; i++) {
      sparkles.push({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0,
        alpha: 0,
        color: colors[0],
        rotation: 0,
        vRot: 0,
      });
    }

    let poolIndex = 0;
    let lastX = -9999;
    let lastY = -9999;
    let currentX = 0;
    let currentY = 0;
    let isHolding = false;
    let activePointerId: number | null = null;
    let lastHoldEmission = 0;
    let lastDownTimestamp = 0;

    // Spawn sparkle directly on the cursor coordinate with negligible jitter (<1.5px)
    // Low initial drift so sparkles hug the exact cursor trajectory
    const spawnSparkle = (
      x: number,
      y: number,
      speedMultiplier = 1.0,
      jitter = 1.2,
      sizeBoost = 1.0
    ) => {
      const s = sparkles[poolIndex];
      poolIndex = (poolIndex + 1) % MAX_SPARKLES;

      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.55 + 0.25) * speedMultiplier;

      s.active = true;
      s.x = x + (Math.random() - 0.5) * jitter;
      s.y = y + (Math.random() - 0.5) * jitter;
      s.vx = Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed + 0.08; // very gentle downward drift
      s.size = (Math.random() * 3.6 + 2.4) * sizeBoost;
      s.alpha = 1.0;
      s.color = colors[Math.floor(Math.random() * colors.length)];
      s.rotation = Math.random() * Math.PI;
      s.vRot = (Math.random() - 0.5) * 0.12;
    };

    // Immediate rich burst on click down / touch tap
    const triggerBurst = (x: number, y: number, count = 4) => {
      for (let i = 0; i < count; i++) {
        spawnSparkle(x, y, 1.25, 2.0, 1.1);
      }
    };

    // Interpolates particles along the movement line to eliminate gaps during fast motion
    const emitAlongPath = (startX: number, startY: number, endX: number, endY: number) => {
      const dist = Math.hypot(endX - startX, endY - startY);
      if (dist === 0) return;

      // Spawn every 10-14px along the path so the trail stays tightly connected
      const step = isHolding ? 9 : 12;
      const count = Math.min(6, Math.max(1, Math.floor(dist / step)));

      for (let i = 1; i <= count; i++) {
        const t = i / count;
        const px = startX + (endX - startX) * t;
        const py = startY + (endY - startY) * t;
        spawnSparkle(px, py, isHolding ? 1.15 : 0.9, 1.2);
      }
    };

    // =============================================================
    // 1. POINTER DOWN (CLICK & HOLD / TOUCH & HOLD)
    // =============================================================
    const onPointerDown = (e: PointerEvent) => {
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
    // 2. POINTER MOVE (ZERO-LATENCY COALESCED TRACKING)
    // =============================================================
    const onPointerMove = (e: PointerEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;

      if (e.pointerType === "mouse") {
        if (e.buttons & 1) {
          isHolding = true;
        } else if (e.buttons === 0 && isHolding) {
          isHolding = false;
        }
      }

      // If initial pointer position not set yet
      if (lastX === -9999) {
        lastX = e.clientX;
        lastY = e.clientY;
        spawnSparkle(e.clientX, e.clientY, 1.0, 1.0);
        return;
      }

      // Process sub-frame coalesced events for ultra-smooth high-refresh rate tracking
      const events: (PointerEvent | { clientX: number; clientY: number })[] =
        typeof e.getCoalescedEvents === "function" && e.getCoalescedEvents().length > 0
          ? e.getCoalescedEvents()
          : [e];

      for (let i = 0; i < events.length; i++) {
        const ev = events[i];
        const dist = Math.hypot(ev.clientX - lastX, ev.clientY - lastY);
        if (dist >= 3) {
          emitAlongPath(lastX, lastY, ev.clientX, ev.clientY);
          lastX = ev.clientX;
          lastY = ev.clientY;
        }
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

    // =============================================================
    // 4. TOUCH EVENT LISTENERS (MOBILE / TABLET INTERFACE)
    // =============================================================
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const now = performance.now();

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

      if (lastX === -9999) {
        lastX = touch.clientX;
        lastY = touch.clientY;
        spawnSparkle(touch.clientX, touch.clientY, 1.0, 1.0);
        return;
      }

      const dist = Math.hypot(touch.clientX - lastX, touch.clientY - lastY);
      if (dist >= 3) {
        emitAlongPath(lastX, lastY, touch.clientX, touch.clientY);
        lastX = touch.clientX;
        lastY = touch.clientY;
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

    const onWindowBlur = () => {
      isHolding = false;
      activePointerId = null;
      lastX = -9999;
      lastY = -9999;
    };

    const listenerOpts: AddEventListenerOptions = { capture: true, passive: true };

    window.addEventListener("pointerdown", onPointerDown, listenerOpts);
    window.addEventListener("pointermove", onPointerMove, listenerOpts);
    window.addEventListener("pointerup", onPointerUp, listenerOpts);
    window.addEventListener("pointercancel", onPointerCancel, listenerOpts);

    window.addEventListener("touchstart", onTouchStart, listenerOpts);
    window.addEventListener("touchmove", onTouchMove, listenerOpts);
    window.addEventListener("touchend", onTouchEnd, listenerOpts);
    window.addEventListener("touchcancel", onTouchCancel, listenerOpts);

    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("mouseleave", onWindowBlur);

    // Optimized 4-Point Star Path Drawer
    const drawStar = (
      cx: number,
      cy: number,
      outerRadius: number,
      innerRadius: number,
      rotation: number
    ) => {
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);
      const cosRHalf = Math.cos(rotation + Math.PI / 4);
      const sinRHalf = Math.sin(rotation + Math.PI / 4);

      ctx.beginPath();
      // Tip 0 (Top)
      ctx.moveTo(cx - sinR * outerRadius, cy - cosR * outerRadius);
      // Notch 1
      ctx.lineTo(cx + cosRHalf * innerRadius, cy + sinRHalf * innerRadius);
      // Tip 2 (Right)
      ctx.lineTo(cx + cosR * outerRadius, cy - sinR * outerRadius);
      // Notch 3
      ctx.lineTo(cx - sinRHalf * innerRadius, cy + cosRHalf * innerRadius);
      // Tip 4 (Bottom)
      ctx.lineTo(cx + sinR * outerRadius, cy + cosR * outerRadius);
      // Notch 5
      ctx.lineTo(cx - cosRHalf * innerRadius, cy - sinRHalf * innerRadius);
      // Tip 6 (Left)
      ctx.lineTo(cx - cosR * outerRadius, cy + sinR * outerRadius);
      // Notch 7
      ctx.lineTo(cx + sinRHalf * innerRadius, cy - cosRHalf * innerRadius);
      ctx.closePath();
    };

    // 60-120 FPS High Performance Render Loop
    const render = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      const now = performance.now();

      // Continuous Hold Stream directly at current pointer location
      if (isHolding) {
        if (now - lastHoldEmission > 30) {
          lastHoldEmission = now;
          spawnSparkle(currentX, currentY, 1.1, 2.0, 1.0);
        }
      }

      // Render Active Sparkles from Pool
      for (let i = 0; i < MAX_SPARKLES; i++) {
        const s = sparkles[i];
        if (!s.active) continue;

        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vRot;
        s.alpha -= 0.025; // Crisp ~0.65s fade-out

        if (s.alpha <= 0) {
          s.active = false;
          continue;
        }

        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        drawStar(s.x, s.y, s.size, s.size * 0.42, s.rotation);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

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
