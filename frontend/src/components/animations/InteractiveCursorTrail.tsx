"use client";

import React, { useEffect, useRef } from "react";

interface Sparkle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  initialSize: number;
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

    // High-DPI Canvas scaling for razor-sharp particles with zero coordinate drift
    const setupCanvasResolution = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupCanvasResolution();
    window.addEventListener("resize", setupCanvasResolution);

    // Authentic Magic Island Amusement Park Palette
    const colors = ["#FFD93D", "#FF6B35", "#38BDF8", "#55C98B", "#F472B6"];

    // Pre-allocated Object Pool (Zero Garbage Collection allocation during animation)
    const MAX_SPARKLES = 120;
    const sparkles: Sparkle[] = [];
    for (let i = 0; i < MAX_SPARKLES; i++) {
      sparkles.push({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0,
        initialSize: 0,
        alpha: 0,
        color: colors[0],
        rotation: 0,
        vRot: 0,
      });
    }

    let poolIndex = 0;
    let lastX = -9999;
    let lastY = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let isHolding = false;
    let activePointerId: number | null = null;
    let lastHoldEmission = 0;
    let lastDownTimestamp = 0;

    // Spawns a sparkle EXACTLY at the cursor's pinpoint (zero offset)
    const spawnSparkle = (
      x: number,
      y: number,
      vx = 0,
      vy = 0,
      sizeBoost = 1.0
    ) => {
      const s = sparkles[poolIndex];
      poolIndex = (poolIndex + 1) % MAX_SPARKLES;

      // Beautiful, prominent diamond stars (noticeably larger & radiant)
      const baseSize = (Math.random() * 5.0 + 8.0) * sizeBoost;

      s.active = true;
      s.x = x; // Pinpoint accurate: exactly at the cursor coordinate
      s.y = y;
      s.vx = vx;
      s.vy = vy;
      s.size = baseSize;
      s.initialSize = baseSize;
      s.alpha = 1.0;
      s.color = colors[Math.floor(Math.random() * colors.length)];
      s.rotation = Math.random() * Math.PI;
      s.vRot = (Math.random() - 0.5) * 0.12;
    };

    // Burst at pinpoint on click down / touch tap
    const triggerBurst = (x: number, y: number, count = 4) => {
      // First sparkle sits exactly on the pinpoint
      spawnSparkle(x, y, 0, 0, 1.25);
      for (let i = 1; i < count; i++) {
        const angle = (i * (Math.PI * 2)) / (count - 1);
        const speed = Math.random() * 0.6 + 0.25;
        spawnSparkle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, 1.1);
      }
    };

    // Spawns sparkles along the line between consecutive pointer points
    const emitAlongPath = (startX: number, startY: number, endX: number, endY: number) => {
      const dist = Math.hypot(endX - startX, endY - startY);
      if (dist === 0) return;

      // Density: evenly spaced so larger stars look clean and stunning
      const step = isHolding ? 11 : 15;
      const count = Math.min(6, Math.max(1, Math.floor(dist / step)));

      for (let i = 1; i <= count; i++) {
        const t = i / count;
        const px = startX + (endX - startX) * t;
        const py = startY + (endY - startY) * t;
        // Motion trail sparkles stay pinned where the cursor traveled (no drift)
        spawnSparkle(px, py, 0, 0, isHolding ? 1.15 : 1.0);
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

      triggerBurst(e.clientX, e.clientY, 4);
    };

    // =============================================================
    // 2. POINTER MOVE (PINPOINT COALESCED EVENT TRACKING)
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

      if (lastX === -9999) {
        lastX = e.clientX;
        lastY = e.clientY;
        spawnSparkle(e.clientX, e.clientY, 0, 0, 1.1);
        return;
      }

      // Process coalesced events for highest tracking fidelity
      const events: (PointerEvent | { clientX: number; clientY: number })[] =
        typeof e.getCoalescedEvents === "function" && e.getCoalescedEvents().length > 0
          ? e.getCoalescedEvents()
          : [e];

      for (let i = 0; i < events.length; i++) {
        const ev = events[i];
        const dist = Math.hypot(ev.clientX - lastX, ev.clientY - lastY);
        if (dist >= 2.5) {
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
        triggerBurst(touch.clientX, touch.clientY, 4);
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
        spawnSparkle(touch.clientX, touch.clientY, 0, 0, 1.1);
        return;
      }

      const dist = Math.hypot(touch.clientX - lastX, touch.clientY - lastY);
      if (dist >= 2.5) {
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

    // =============================================================
    // 5. AUTHENTIC 4-POINT STAR (Pinpoint Centered at 0, 0)
    // =============================================================
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
        const xTip = cx + Math.cos(rot) * outerRadius;
        const yTip = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(xTip, yTip);
        rot += step;

        const xNotch = cx + Math.cos(rot) * innerRadius;
        const yNotch = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(xNotch, yNotch);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    // 60-120 FPS High Performance Render Loop
    const render = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      const now = performance.now();

      // Continuous Hold Stream directly at current pointer location
      if (isHolding && currentX !== -9999) {
        if (now - lastHoldEmission > 32) {
          lastHoldEmission = now;
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 0.5 + 0.2;
          spawnSparkle(currentX, currentY, Math.cos(angle) * speed, Math.sin(angle) * speed, 1.2);
        }
      }

      // Render Active Sparkles from Pool
      for (let i = 0; i < MAX_SPARKLES; i++) {
        const s = sparkles[i];
        if (!s.active) continue;

        // Draw BEFORE moving so the initial frame renders exactly at the pinpoint (cx, cy)
        const currentAlpha = Math.max(0, s.alpha);
        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.fillStyle = s.color;
        drawStar(0, 0, 4, s.size, s.size * 0.44);
        ctx.fill();
        ctx.restore();

        // Update physics for next frame
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vRot;
        s.alpha -= 0.022; // Smooth ~0.75s lifetime

        if (s.alpha <= 0) {
          s.active = false;
        }
      }

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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
