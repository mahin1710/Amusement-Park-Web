"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function ThrillWorldCoasterAnimation({ isReducedMotion = false }: Props) {
  const [speedBoost, setSpeedBoost] = useState(false);

  useEffect(() => {
    // Speed lines & excitement particles trigger during the big downhill drop & loop
    const boostTimer = setTimeout(() => {
      setSpeedBoost(true);
    }, 1200);

    return () => clearTimeout(boostTimer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none pointer-events-none">
      {/* Twilight Amusement Park Sky & Carnival Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B4B]/60 via-[#4C1D95]/40 to-[#FF6B35]/35 backdrop-blur-xs" />

      {/* Amusement Park Skyline & Glowing Ferris Wheel Silhouette */}
      <svg
        className="absolute bottom-0 inset-x-0 w-full h-72 z-5 opacity-40 overflow-visible"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        {/* Ferris Wheel Silhouette in Distance */}
        <g transform="translate(180, 140)">
          <circle cx="0" cy="0" r="85" stroke="#FDE047" strokeWidth="3" fill="none" />
          <circle cx="0" cy="0" r="12" fill="#FDE047" />
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos((i * Math.PI) / 4) * 85}
              y2={Math.sin((i * Math.PI) / 4) * 85}
              stroke="#FDE047"
              strokeWidth="2"
            />
          ))}
          <line x1="0" y1="0" x2="-40" y2="150" stroke="#FDE047" strokeWidth="4" />
          <line x1="0" y1="0" x2="40" y2="150" stroke="#FDE047" strokeWidth="4" />
        </g>
        {/* Distant Coaster Tower Frame */}
        <g transform="translate(980, 160)">
          <path d="M-60,140 L0,10 L60,140 M-40,100 L40,100 M-20,50 L20,50" stroke="#FB7185" strokeWidth="3" fill="none" />
        </g>
      </svg>

      {/* Floating Amusement Park Sparkles & Confetti */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              backgroundColor: ["#FFD93D", "#FF6B35", "#38BDF8", "#EC4899", "#A855F7"][i % 5],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 180, 360],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3D-Shaded Roller Coaster Track with Massive Loop-the-Loop */}
      <svg
        className="absolute inset-0 w-full h-full z-15 overflow-visible"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="railGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="40%" stopColor="#FFD93D" />
            <stop offset="70%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
          <filter id="trackShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="6" dy="16" stdDeviation="10" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Coaster Support Steel Trestles */}
        <path d="M 180,480 L 180,720" stroke="#64748B" strokeWidth="12" />
        <path d="M 380,260 L 380,720" stroke="#64748B" strokeWidth="14" />
        <path d="M 580,360 L 580,720" stroke="#64748B" strokeWidth="12" />
        <path d="M 760,280 L 760,720" stroke="#64748B" strokeWidth="12" />
        <path d="M 960,420 L 960,720" stroke="#64748B" strokeWidth="12" />

        {/* Dynamic Track Path: Incline Climb -> Steep Drop -> Giant Loop -> Outrun */}
        {/* Rail 1: Base Rail */}
        <motion.path
          d="M -50,560 C 120,520 240,360 380,240 C 440,190 490,460 550,560 C 620,680 720,240 680,220 C 620,190 560,480 720,520 C 860,560 980,360 1250,300"
          fill="none"
          stroke="#475569"
          strokeWidth="32"
          strokeLinecap="round"
          filter="url(#trackShadow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />

        {/* Cross-Ties (Track Sleepers) */}
        <motion.path
          d="M -50,560 C 120,520 240,360 380,240 C 440,190 490,460 550,560 C 620,680 720,240 680,220 C 620,190 560,480 720,520 C 860,560 980,360 1250,300"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="28"
          strokeDasharray="6 20"
          strokeLinecap="butt"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.1 }}
        />

        {/* Dual Steel Tubular Rails */}
        <motion.path
          d="M -50,560 C 120,520 240,360 380,240 C 440,190 490,460 550,560 C 620,680 720,240 680,220 C 620,190 560,480 720,520 C 860,560 980,360 1250,300"
          fill="none"
          stroke="url(#railGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
        />
      </svg>

      {/* Dynamic Animated Roller Coaster Train with Cheerful Passengers */}
      <motion.div
        className="absolute z-25 pointer-events-none"
        initial={{
          x: "-45vw",
          y: "14vh",
          rotate: -20,
          scale: 0.8,
        }}
        animate={{
          x: ["-45vw", "-16vw", "2vw", "16vw", "30vw", "125vw"],
          y: ["14vh", "-16vh", "12vh", "-10vh", "8vh", "-12vh"],
          rotate: [-20, -35, 45, -70, 30, -10],
          scale: [0.85, 1, 1.25, 1.3, 1.1, 0.95],
        }}
        transition={{
          duration: 3.4,
          times: [0, 0.28, 0.52, 0.68, 0.82, 1],
          ease: "easeInOut",
        }}
      >
        <div className="relative flex items-center">
          {/* Multi-Car Coaster Train */}
          {/* Car 3: Back Car */}
          <div className="relative w-28 h-20 bg-gradient-to-r from-[#FF6B35] to-[#EA580C] rounded-2xl border-3 border-white shadow-xl flex items-center justify-center mr-[-12px]">
            {/* Passenger 3 */}
            <div className="absolute -top-7 flex flex-col items-center">
              {/* Hands Up! */}
              <div className="flex gap-4">
                <span className="text-sm animate-bounce">🙌</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#FDE047] border-2 border-white flex items-center justify-center shadow-xs">
                <span className="text-xs">🤩</span>
              </div>
            </div>
            {/* Wheel bogie */}
            <div className="absolute -bottom-3 inset-x-2 flex justify-between">
              <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-300" />
              <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-300" />
            </div>
          </div>

          {/* Car 2: Middle Car */}
          <div className="relative w-28 h-20 bg-gradient-to-r from-[#FACC15] to-[#EAB308] rounded-2xl border-3 border-white shadow-xl flex items-center justify-center mr-[-12px] z-1">
            {/* Passenger 2 with Windblown Hair */}
            <div className="absolute -top-7 flex flex-col items-center">
              <div className="flex gap-4">
                <span className="text-sm animate-bounce">🙋‍♀️</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#FED7AA] border-2 border-white flex items-center justify-center shadow-xs">
                <span className="text-xs">😆</span>
              </div>
            </div>
            {/* Wheel bogie */}
            <div className="absolute -bottom-3 inset-x-2 flex justify-between">
              <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-300" />
              <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-300" />
            </div>
          </div>

          {/* Car 1: Locomotive Front Car (Dragon Head / Speed Bullet) */}
          <div className="relative w-34 h-22 bg-gradient-to-r from-[#EF4444] via-[#FF6B35] to-[#FFD93D] rounded-2xl border-3 border-white shadow-2xl flex items-center justify-between px-3 z-2">
            {/* Front Headlight Glowing */}
            <div className="w-4 h-4 rounded-full bg-[#FEF08A] shadow-[0_0_15px_#FDE047] border border-white" />

            {/* Front Pilot Passenger */}
            <div className="absolute -top-8 left-12 flex flex-col items-center">
              <div className="flex gap-5">
                <motion.span
                  className="text-base"
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  🙌
                </motion.span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#FECDD3] border-2 border-white flex items-center justify-center shadow-sm">
                <span className="text-sm">🥳</span>
              </div>
            </div>

            {/* Magic Island Coaster Decal */}
            <span className="text-[10px] font-heading font-black text-white uppercase tracking-wider drop-shadow">
              MAGIC THRILL
            </span>

            {/* Wheel bogie */}
            <div className="absolute -bottom-3 inset-x-3 flex justify-between">
              <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-300" />
              <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-300" />
            </div>
          </div>

          {/* Dynamic Speed Wind Streaks Behind Train */}
          <div className="absolute -left-16 flex flex-col gap-2 pointer-events-none">
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent to-white rounded-full"
              style={{ width: speedBoost ? 90 : 35 }}
              animate={{ opacity: [0.3, 1, 0.3], x: [-10, -25] }}
              transition={{ duration: 0.25, repeat: Infinity }}
            />
            <motion.div
              className="h-1.5 bg-gradient-to-r from-transparent to-[#FDE047] rounded-full"
              style={{ width: speedBoost ? 120 : 50 }}
              animate={{ opacity: [0.5, 1, 0.5], x: [-5, -35] }}
              transition={{ duration: 0.2, repeat: Infinity, delay: 0.05 }}
            />
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent to-[#FF6B35] rounded-full"
              style={{ width: speedBoost ? 80 : 30 }}
              animate={{ opacity: [0.4, 0.9, 0.4], x: [-15, -30] }}
              transition={{ duration: 0.22, repeat: Infinity, delay: 0.1 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Comic Action Sticker Banner */}
      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: -10, opacity: 0 }}
        animate={{ scale: [0, 1.25, 1], rotate: [-10, 4, 0], opacity: [0, 1, 1] }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 260 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FFD93D] to-[#EF4444] border-3 border-white text-[#172554] font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-spin">⚡</span>
          <span>THRILL WORLD MEGA COASTER RUSH!</span>
          <span className="text-2xl animate-bounce">🎢</span>
        </div>
        <motion.span
          className="mt-2 text-xs sm:text-sm font-heading font-black text-amber-100 uppercase tracking-widest drop-shadow-md bg-black/40 px-4 py-1 rounded-full border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          High-Velocity Steel Coasters & Sky-High Adventures
        </motion.span>
      </motion.div>
    </div>
  );
}
