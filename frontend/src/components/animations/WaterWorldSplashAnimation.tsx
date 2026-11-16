"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  gravity: number;
  decay: number;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  time: number;
  alpha: number;
}

export function WaterWorldSplashAnimation({ onComplete, isReducedMotion = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const bubbles: Bubble[] = [];

    // Background floating bubbles
    for (let i = 0; i < 40; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 12 + 6,
        speed: Math.random() * 1.5 + 0.8,
        wobbleSpeed: Math.random() * 0.04 + 0.02,
        wobbleAmp: Math.random() * 15 + 5,
        time: Math.random() * 100,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    // Function to trigger massive cartoon water splash
    const triggerSplash = (splashX: number, splashY: number) => {
      const colors = ["#E0F2FE", "#BAE6FD", "#38BDF8", "#0284C7", "#FFFFFF", "#7DD3FC"];
      // Large primary fountain droplets
      for (let i = 0; i < 90; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
        const speed = Math.random() * 18 + 8;
        particles.push({
          x: splashX + (Math.random() - 0.5) * 40,
          y: splashY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 9 + 4,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          gravity: 0.45,
          decay: Math.random() * 0.015 + 0.012,
        });
      }

      // Secondary fine mist particles
      for (let i = 0; i < 60; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
        const speed = Math.random() * 14 + 4;
        particles.push({
          x: splashX,
          y: splashY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          alpha: 0.9,
          color: "#FFFFFF",
          gravity: 0.3,
          decay: Math.random() * 0.02 + 0.02,
        });
      }
    };

    // Splash triggers at 1.8s when cartoon character hits the bottom pool
    const splashTimer = setTimeout(() => {
      triggerSplash(width * 0.42, height * 0.72);
      // Secondary shockwave splash
      setTimeout(() => {
        triggerSplash(width * 0.45, height * 0.74);
      }, 150);
    }, 1800);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update floating bubbles
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.time += b.wobbleSpeed;
        b.y -= b.speed;
        const currentX = b.x + Math.sin(b.time) * b.wobbleAmp;

        if (b.y < -30) {
          b.y = height + 30;
          b.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${b.alpha * 0.35})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.alpha * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bubble highlight reflection
        ctx.beginPath();
        ctx.arc(currentX - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fill();
        ctx.restore();
      }

      // Draw and update splash particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(splashTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none pointer-events-none">
      {/* Background Tropical Water Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0284C7]/40 via-[#38BDF8]/25 to-[#0EA5E9]/60 backdrop-blur-xs" />

      {/* Physics Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full pointer-events-none" />

      {/* 3D-Styled Cartoon Water Slide (SVG Graphic Path) */}
      <svg
        className="absolute inset-0 w-full h-full z-15 overflow-visible"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="slideGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="30%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
          <linearGradient id="slideInside" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0369A1" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
          <linearGradient id="waterFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
          </linearGradient>
          <filter id="slideShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="4" dy="12" stdDeviation="12" floodColor="#0C4A6E" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Support Steel Stilt Towers */}
        <path d="M980,180 L980,680" stroke="#CBD5E1" strokeWidth="14" strokeLinecap="round" />
        <path d="M720,290 L720,680" stroke="#CBD5E1" strokeWidth="14" strokeLinecap="round" />
        <path d="M520,440 L520,680" stroke="#CBD5E1" strokeWidth="12" strokeLinecap="round" />

        {/* Slide Flume Outer Bed */}
        <motion.path
          d="M 1150,-40 C 950,80 920,260 780,310 C 640,360 620,490 480,570 C 400,615 360,650 320,660"
          fill="none"
          stroke="url(#slideGradient)"
          strokeWidth="74"
          strokeLinecap="round"
          filter="url(#slideShadow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />

        {/* Slide Flume Inner Channel */}
        <motion.path
          d="M 1150,-40 C 950,80 920,260 780,310 C 640,360 620,490 480,570 C 400,615 360,650 320,660"
          fill="none"
          stroke="url(#slideInside)"
          strokeWidth="50"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.05 }}
        />

        {/* Water Stream Highlights Inside Slide */}
        <motion.path
          d="M 1150,-40 C 950,80 920,260 780,310 C 640,360 620,490 480,570 C 400,615 360,650 320,660"
          fill="none"
          stroke="url(#waterFlow)"
          strokeWidth="20"
          strokeDasharray="30 20"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: -500 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Splash Pool Basin at Slide Exit */}
        <ellipse cx="340" cy="670" rx="180" ry="45" fill="#0284C7" opacity="0.8" />
        <ellipse cx="340" cy="668" rx="150" ry="34" fill="#38BDF8" opacity="0.9" />
        <ellipse cx="340" cy="665" rx="120" ry="24" fill="#E0F2FE" opacity="0.95" />

        {/* Concentric Animated Wave Ripples */}
        <motion.ellipse
          cx="340"
          cy="668"
          rx="50"
          ry="15"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          initial={{ rx: 30, ry: 10, opacity: 0 }}
          animate={{ rx: [30, 220], ry: [10, 55], opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 1.8, ease: "easeOut" }}
        />
        <motion.ellipse
          cx="340"
          cy="668"
          rx="50"
          ry="15"
          fill="none"
          stroke="#7DD3FC"
          strokeWidth="3"
          initial={{ rx: 30, ry: 10, opacity: 0 }}
          animate={{ rx: [30, 260], ry: [10, 65], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 2.1, ease: "easeOut" }}
        />
      </svg>

      {/* Joyful Cartoon Character Sliding Down */}
      <motion.div
        className="absolute z-25 pointer-events-none"
        initial={{
          x: "48vw",
          y: "-30vh",
          scale: 0.55,
          rotate: -20,
          opacity: 0,
        }}
        animate={{
          x: ["48vw", "28vw", "10vw", "-6vw"],
          y: ["-25vh", "-4vh", "12vh", "24vh"],
          scale: [0.65, 0.95, 1.15, 1.35],
          rotate: [-25, 15, -18, 5],
          opacity: [0, 1, 1, 1],
        }}
        transition={{
          duration: 1.85,
          times: [0, 0.35, 0.72, 1],
          ease: "easeInOut",
        }}
      >
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          {/* Yellow Swim Ring / Float Tube */}
          <div className="absolute inset-x-2 bottom-3 h-20 sm:h-24 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#F59E0B] to-[#FF6B35] border-4 border-white shadow-xl flex items-center justify-center transform rotate-6">
            <span className="text-white/80 font-black text-[10px] tracking-widest uppercase">
              MAGIC SPLASH
            </span>
          </div>

          {/* Character Body & Cartoon Head */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Joyful Character Head with Sunhat & Swim Goggles */}
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#FED7AA] border-3 border-[#EA580C]/40 relative shadow-md flex items-center justify-center overflow-hidden">
              {/* Rosy Cheeks */}
              <div className="absolute left-1.5 top-11 w-4 h-2.5 rounded-full bg-[#FB7185]/70" />
              <div className="absolute right-1.5 top-11 w-4 h-2.5 rounded-full bg-[#FB7185]/70" />

              {/* Swimming Goggles with Glossy Reflections */}
              <div className="absolute top-4 inset-x-2.5 h-7 bg-[#0284C7] rounded-full border-2 border-white flex items-center justify-around px-1 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-sky-200 border border-sky-400 relative overflow-hidden flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-900" />
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <div className="w-5 h-5 rounded-full bg-sky-200 border border-sky-400 relative overflow-hidden flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-900" />
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>

              {/* Huge Joyful Open-Mouth Smile */}
              <div className="w-7 h-5 mt-7 rounded-b-full bg-[#991B1B] border-2 border-[#EA580C] relative overflow-hidden flex items-end justify-center">
                <div className="w-4 h-2 rounded-t-full bg-[#FB7185]" />
              </div>
            </div>

            {/* Waving Cartoon Arms */}
            <motion.div
              className="absolute -top-3 -left-4 w-9 h-11 bg-[#FED7AA] rounded-full border-2 border-[#EA580C]/40 origin-bottom-right rotate-[-45deg]"
              animate={{ rotate: [-45, -75, -45] }}
              transition={{ duration: 0.35, repeat: Infinity }}
            />
            <motion.div
              className="absolute -top-3 -right-4 w-9 h-11 bg-[#FED7AA] rounded-full border-2 border-[#EA580C]/40 origin-bottom-left rotate-[45deg]"
              animate={{ rotate: [45, 75, 45] }}
              transition={{ duration: 0.35, repeat: Infinity, delay: 0.15 }}
            />
          </div>

          {/* Water Droplet Spray Behind Slider */}
          <div className="absolute -top-4 -right-6 flex gap-1">
            <span className="text-xl animate-bounce">💧</span>
            <span className="text-lg animate-pulse">💦</span>
          </div>
        </div>
      </motion.div>

      {/* Layered Cartoon Splash Crown Eruption at Bottom (Plays after character hits pool) */}
      <motion.div
        className="absolute z-30 bottom-[16%] left-[28%] sm:left-[34%] pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 1.1, 0], opacity: [0, 1, 0.9, 0] }}
        transition={{ delay: 1.8, duration: 1.6, ease: "easeOut" }}
      >
        <svg width="320" height="260" viewBox="0 0 320 260" fill="none">
          {/* Big Cartoon Water Crown */}
          <path
            d="M 20,240 C 40,160 50,60 70,80 C 90,100 110,170 140,50 C 160,180 180,40 210,70 C 230,90 250,170 280,100 C 300,160 310,240 160,250 Z"
            fill="url(#splashGrad)"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
          {/* Inner Foam Layer */}
          <path
            d="M 50,240 C 70,180 80,120 100,130 C 120,140 140,190 160,110 C 180,190 200,110 220,130 C 240,150 260,200 270,240 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="splashGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#7DD3FC" />
              <stop offset="85%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Comic Action Sticker Banner */}
      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: -15, opacity: 0 }}
        animate={{ scale: [0, 1.25, 1], rotate: [-15, 4, 0], opacity: [0, 1, 1] }}
        transition={{ duration: 0.6, delay: 0.25, type: "spring", stiffness: 260 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#0EA5E9] border-3 border-white text-white font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-spin">🌊</span>
          <span>WATER WORLD SPLASH SURGE!</span>
          <span className="text-2xl animate-bounce">💦</span>
        </div>
        <motion.span
          className="mt-2 text-xs sm:text-sm font-heading font-black text-sky-100 uppercase tracking-widest drop-shadow-md bg-black/40 px-4 py-1 rounded-full border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Bangladesh&apos;s Largest Wave Pool & Speed Slides
        </motion.span>
      </motion.div>
    </div>
  );
}
