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

    // Respect reduced motion accessibility setting
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const sparkles: Sparkle[] = [];
    const colors = ["#FFD93D", "#FF6B35", "#38BDF8", "#55C98B", "#F472B6"];

    let lastX = 0;
    let lastY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHolding = false;
    let activePointerId: number | null = null;
    let moveThrottleTimer = 0;
    let lastHoldSpawn = 0;

    // Helper to spawn a single authentic amusement park star sparkle
    const spawnSparkle = (x: number, y: number, speedMultiplier = 1.0, jitterRadius = 8) => {
      if (sparkles.length > 55) sparkles.shift();
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 1.8 + 0.4) * speedMultiplier;
      sparkles.push({
        x: x + (Math.random() - 0.5) * jitterRadius,
        y: y + (Math.random() - 0.5) * jitterRadius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.3,
        size: Math.random() * 4.5 + 2.5,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.15,
      });
    };

    // 1. POINTER DOWN (Mouse Click & Hold OR Touch & Hold)
    const handlePointerDown = (e: PointerEvent) => {
      // For mouse, only trigger on primary left click
      if (e.pointerType === "mouse" && e.button !== 0) return;

      isHolding = true;
      activePointerId = e.pointerId;
      currentX = e.clientX;
      currentY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;

      // Immediate burst of 2-3 sparkles on press
      for (let i = 0; i < 3; i++) {
        spawnSparkle(currentX, currentY, 1.4, 12);
      }
    };

    // 2. POINTER MOVE (Mouse Movement Trail OR Dragging while Holding)
    const handlePointerMove = (e: PointerEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;

      const now = performance.now();
      if (now - moveThrottleTimer < 16) return; // ~60fps throttle
      moveThrottleTimer = now;

      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < 4) return;
      lastX = e.clientX;
      lastY = e.clientY;

      // Spawn trail sparkles along movement path
      const count = Math.min(isHolding ? 3 : 2, Math.floor(dist / 14) + 1);
      for (let i = 0; i < count; i++) {
        spawnSparkle(e.clientX, e.clientY, isHolding ? 1.3 : 1.0, 8);
      }
    };

    // 3. POINTER UP & CANCEL (Release Mouse / Lift Finger)
    const handlePointerUp = (e: PointerEvent) => {
      if (activePointerId === null || e.pointerId === activePointerId) {
        isHolding = false;
        activePointerId = null;
      }
    };

    const handlePointerCancel = (e: PointerEvent) => {
      if (activePointerId === null || e.pointerId === activePointerId) {
        isHolding = false;
        activePointerId = null;
      }
    };

    // Safety fallback when window loses focus or pointer exits viewport
    const handleWindowBlur = () => {
      isHolding = false;
      activePointerId = null;
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerCancel, { passive: true });
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("mouseleave", handleWindowBlur);

    // 4-Point Star Drawing Logic (Existing Authentic Amusement Park Shape)
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

    // Render Loop with Continuous Hold-to-Activate Magic Generation
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();

      // CONTINUOUS HOLD-TO-ACTIVATE EMISSION:
      // While mouse button or touchscreen is held down, continuously emit new sparkles
      if (isHolding) {
        if (now - lastHoldSpawn > 32) { // ~30 fps continuous sparkle stream
          lastHoldSpawn = now;
          spawnSparkle(currentX, currentY, 1.2, 10);
        }
      }

      // Update and Draw Existing Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vRot;
        s.alpha -= 0.024;

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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("mouseleave", handleWindowBlur);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[80] overflow-hidden"
      aria-hidden="true"
    />
  );
}
