"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function DinoWorldStampedeAnimation({ isReducedMotion = false }: Props) {
  const [groundShake, setGroundShake] = useState(false);

  useEffect(() => {
    // Screen rumble triggers as the heavy T-Rex stomps across (between 1.2s and 3.2s)
    const rumbleInterval = setInterval(() => {
      setGroundShake(true);
      setTimeout(() => setGroundShake(false), 140);
    }, 450);

    const stopRumble = setTimeout(() => {
      clearInterval(rumbleInterval);
      setGroundShake(false);
    }, 3800);

    return () => {
      clearInterval(rumbleInterval);
      clearTimeout(stopRumble);
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center select-none pointer-events-none transition-transform duration-75 ${
        groundShake && !isReducedMotion ? "translate-y-1.5 -translate-x-0.5 rotate-[0.2deg]" : ""
      }`}
    >
      {/* Jurassic Sunset Jungle Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#14532D]/40 via-[#15803D]/25 to-[#78350F]/50 backdrop-blur-xs" />

      {/* Floating Jungle Spores & Fireflies */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FACC15] shadow-xs"
            style={{
              width: Math.random() * 6 + 3,
              height: Math.random() * 6 + 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (Math.random() - 0.5) * 40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Prehistoric Jungle Floor & Giant Fern Silhouettes */}
      <svg
        className="absolute bottom-0 inset-x-0 w-full h-44 z-10 overflow-visible"
        viewBox="0 0 1200 180"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="35%" stopColor="#166534" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>
        </defs>
        {/* Rolling Jungle Ground */}
        <path d="M0,80 Q300,50 600,75 T1200,60 L1200,180 L0,180 Z" fill="url(#groundGrad)" />
        {/* Decorative Prehistoric Palm Ferns */}
        <path d="M 60,80 Q 80,10 130,20 Q 95,35 60,80 Z" fill="#22C55E" opacity="0.75" />
        <path d="M 1120,60 Q 1150,-10 1190,10 Q 1155,25 1120,60 Z" fill="#22C55E" opacity="0.75" />
        <path d="M 450,75 Q 470,25 510,35 Q 480,45 450,75 Z" fill="#16A34A" opacity="0.6" />
      </svg>

      {/* 1. BRACHIOSAURUS — Majestic background giant crossing gracefully */}
      <motion.div
        className="absolute z-12 bottom-[24%] pointer-events-none"
        initial={{ x: "-40vw", scale: 0.85, opacity: 0 }}
        animate={{ x: "120vw", scale: 0.85, opacity: 1 }}
        transition={{ duration: 5.5, ease: "linear" }}
      >
        <svg width="280" height="260" viewBox="0 0 280 260" fill="none">
          {/* Brachiosaurus Body (Sky Blue) */}
          <path
            d="M 60,200 C 60,150 100,140 150,150 C 180,140 210,180 200,210 C 170,225 90,225 60,200 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="3"
          />
          {/* Long Elegant Neck with Head */}
          <motion.path
            d="M 150,150 C 170,110 190,50 185,25 C 195,15 220,18 215,35 C 205,50 180,110 170,150 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="3"
            animate={{ d: [
              "M 150,150 C 170,110 190,50 185,25 C 195,15 220,18 215,35 C 205,50 180,110 170,150 Z",
              "M 150,150 C 170,105 185,45 180,20 C 190,10 215,14 210,30 C 200,45 180,105 170,150 Z",
              "M 150,150 C 170,110 190,50 185,25 C 195,15 220,18 215,35 C 205,50 180,110 170,150 Z"
            ]}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Friendly Eye & Cheerful Leaf */}
          <circle cx="202" cy="26" r="3.5" fill="#0C4A6E" />
          <circle cx="203" cy="25" r="1.2" fill="#FFFFFF" />
          <path d="M 215,30 Q 230,22 235,32 Q 225,35 215,30 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
          {/* Long Tapering Tail */}
          <path d="M 60,190 C 30,195 5,175 0,165 C 15,185 45,210 60,205 Z" fill="#38BDF8" />
          {/* Sturdy Walking Legs */}
          <rect x="75" y="210" width="18" height="42" rx="9" fill="#0284C7" />
          <rect x="110" y="212" width="18" height="40" rx="9" fill="#38BDF8" />
          <rect x="155" y="210" width="18" height="42" rx="9" fill="#0284C7" />
          <rect x="185" y="212" width="18" height="40" rx="9" fill="#38BDF8" />
        </svg>
      </motion.div>

      {/* 2. STEGOSAURUS — Rainbow-plated friendly dinosaur trotting midground */}
      <motion.div
        className="absolute z-14 bottom-[18%] pointer-events-none"
        initial={{ x: "-30vw", scale: 0.95 }}
        animate={{ x: "115vw" }}
        transition={{ duration: 4.8, delay: 0.6, ease: "linear" }}
      >
        <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
          {/* Vibrant Rainbow Back Plates */}
          <path d="M 45,75 L 55,45 L 68,75 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <path d="M 75,65 L 90,30 L 105,65 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <path d="M 115,62 L 135,25 L 150,62 Z" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
          <path d="M 158,68 L 172,38 L 185,68 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
          {/* Stego Body (Amber-Orange) */}
          <path
            d="M 40,110 C 50,70 180,65 195,105 C 205,115 230,120 225,130 C 215,138 190,135 180,140 C 130,150 60,145 40,110 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="3"
          />
          {/* Friendly Head with Cute Smile */}
          <circle cx="218" cy="122" r="3.5" fill="#78350F" />
          <circle cx="219" cy="121" r="1.2" fill="#FFFFFF" />
          <path d="M 218,128 Q 223,132 227,129" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          {/* Spiked Thagomizer Tail */}
          <path d="M 40,110 Q 15,100 5,90" stroke="#FBBF24" strokeWidth="12" strokeLinecap="round" />
          <path d="M 12,98 L 2,88 M 18,92 L 10,80" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          {/* Trotting Feet */}
          <rect x="65" y="135" width="16" height="30" rx="8" fill="#D97706" />
          <rect x="95" y="137" width="16" height="28" rx="8" fill="#FBBF24" />
          <rect x="145" y="135" width="16" height="30" rx="8" fill="#D97706" />
          <rect x="175" y="137" width="16" height="28" rx="8" fill="#FBBF24" />
        </svg>
      </motion.div>

      {/* 3. TRICERATOPS — Chubby, joyful triceratops running */}
      <motion.div
        className="absolute z-16 bottom-[14%] pointer-events-none"
        initial={{ x: "-35vw", scale: 1.05 }}
        animate={{ x: "115vw" }}
        transition={{ duration: 4.2, delay: 1.1, ease: "linear" }}
      >
        <svg width="260" height="200" viewBox="0 0 260 200" fill="none">
          {/* Chubby Coral-Magenta Body */}
          <path
            d="M 40,120 C 50,70 170,75 190,115 C 180,165 70,165 40,120 Z"
            fill="#FB7185"
            stroke="#E11D48"
            strokeWidth="3.5"
          />
          {/* Frill Shield with Polka Dots */}
          <path
            d="M 175,70 C 190,45 225,50 220,110 C 205,120 185,115 175,70 Z"
            fill="#FDA4AF"
            stroke="#E11D48"
            strokeWidth="3"
          />
          <circle cx="195" cy="65" r="4" fill="#F43F5E" />
          <circle cx="208" cy="80" r="4.5" fill="#F43F5E" />
          <circle cx="205" cy="98" r="4" fill="#F43F5E" />
          {/* 3 Cute Creamy Horns */}
          <path d="M 195,65 L 218,40 L 205,70 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
          <path d="M 215,85 L 245,75 L 220,95 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
          <path d="M 245,125 L 258,115 L 248,132 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
          {/* Big Cartoon Eye */}
          <circle cx="210" cy="100" r="5" fill="#881337" />
          <circle cx="212" cy="98" r="1.8" fill="#FFFFFF" />
          {/* Stomping Feet */}
          <rect x="70" y="145" width="20" height="34" rx="9" fill="#E11D48" />
          <rect x="105" y="148" width="20" height="32" rx="9" fill="#FB7185" />
          <rect x="145" y="145" width="20" height="34" rx="9" fill="#E11D48" />
          <rect x="175" y="148" width="20" height="32" rx="9" fill="#FB7185" />
        </svg>
      </motion.div>

      {/* 4. T-REX — The Star! Roaring, friendly green T-Rex with tiny swinging arms */}
      <motion.div
        className="absolute z-20 bottom-[12%] pointer-events-none"
        initial={{ x: "-45vw", scale: 1.25 }}
        animate={{ x: "115vw" }}
        transition={{ duration: 3.8, delay: 0.4, ease: "linear" }}
      >
        <div className="relative">
          <svg width="320" height="280" viewBox="0 0 320 280" fill="none">
            {/* Powerful Wiggling Tail */}
            <motion.path
              d="M 90,170 C 40,160 10,130 0,110 C 25,150 60,195 90,190 Z"
              fill="#22C55E"
              stroke="#15803D"
              strokeWidth="4"
              animate={{ d: [
                "M 90,170 C 40,160 10,130 0,110 C 25,150 60,195 90,190 Z",
                "M 90,170 C 40,175 10,150 0,135 C 25,160 60,205 90,190 Z",
                "M 90,170 C 40,160 10,130 0,110 C 25,150 60,195 90,190 Z"
              ]}}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* T-Rex Chunky Body with Warm Yellow Tummy */}
            <ellipse cx="140" cy="165" rx="65" ry="55" fill="#22C55E" stroke="#15803D" strokeWidth="4" />
            <ellipse cx="152" cy="170" rx="42" ry="40" fill="#FEF08A" />
            {/* Playful T-Rex Head with Big Friendly Smile & Soft Teeth */}
            <motion.g
              animate={{ rotate: [-4, 6, -4], y: [-3, 3, -3] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M 160,135 C 165,70 230,65 260,85 C 275,95 280,120 260,135 C 240,140 230,155 190,155 Z"
                fill="#22C55E"
                stroke="#15803D"
                strokeWidth="4"
              />
              {/* Friendly Big Eye */}
              <circle cx="215" cy="95" r="9" fill="#FFFFFF" stroke="#15803D" strokeWidth="2.5" />
              <circle cx="217" cy="95" r="5" fill="#14532D" />
              <circle cx="219" cy="93" r="2" fill="#FFFFFF" />
              {/* Joyful Open Mouth with Cute Teeth */}
              <path d="M 230,125 Q 265,120 270,135 Q 245,145 220,138 Z" fill="#991B1B" />
              <polygon points="235,125 240,132 245,125" fill="#FFFFFF" />
              <polygon points="248,124 253,132 258,124" fill="#FFFFFF" />
              <polygon points="260,124 265,131 270,125" fill="#FFFFFF" />
            </motion.g>
            {/* Tiny Cartoon Arms Waving Excitingly */}
            <motion.path
              d="M 185,155 Q 205,150 215,160"
              stroke="#22C55E"
              strokeWidth="10"
              strokeLinecap="round"
              animate={{ rotate: [-15, 20, -15] }}
              transition={{ duration: 0.25, repeat: Infinity }}
            />
            {/* Stomping Heavy Legs */}
            <motion.rect
              x="115"
              y="200"
              width="26"
              height="55"
              rx="12"
              fill="#16A34A"
              stroke="#15803D"
              strokeWidth="3.5"
              animate={{ y: [200, 185, 200] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.rect
              x="160"
              y="200"
              width="26"
              height="55"
              rx="12"
              fill="#22C55E"
              stroke="#15803D"
              strokeWidth="3.5"
              animate={{ y: [185, 200, 185] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>

          {/* Cartoon Dust Puffs Under T-Rex Stomp */}
          <motion.div
            className="absolute bottom-2 left-16 text-2xl"
            animate={{ scale: [0.5, 1.4, 0], opacity: [1, 0.8, 0], x: [-10, -40] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            💨
          </motion.div>
        </div>
      </motion.div>

      {/* 5. VELOCIRAPTOR — Ultra-fast turquoise speedster zipping in front! */}
      <motion.div
        className="absolute z-25 bottom-[6%] pointer-events-none"
        initial={{ x: "-30vw", scale: 0.9 }}
        animate={{ x: "125vw" }}
        transition={{ duration: 1.8, delay: 0.2, ease: "easeIn" }}
      >
        <div className="relative flex items-center">
          <svg width="200" height="130" viewBox="0 0 200 130" fill="none">
            {/* Streamlined Speedster Body */}
            <path
              d="M 20,60 C 40,50 140,40 160,55 C 180,65 195,50 190,65 C 175,80 140,80 110,85 C 70,90 40,80 20,60 Z"
              fill="#06B6D4"
              stroke="#0891B2"
              strokeWidth="3"
            />
            <circle cx="178" cy="60" r="3.5" fill="#164E63" />
            <circle cx="179" cy="59" r="1.2" fill="#FFFFFF" />
            {/* Speed Stripes */}
            <path d="M 80,55 L 75,75 M 100,52 L 95,74 M 120,50 L 115,72" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
            {/* Blurred Running Legs */}
            <line x1="90" y1="80" x2="60" y2="120" stroke="#0891B2" strokeWidth="6" strokeLinecap="round" />
            <line x1="125" y1="80" x2="155" y2="120" stroke="#0891B2" strokeWidth="6" strokeLinecap="round" />
          </svg>
          {/* Turbo Speed Trail Particles */}
          <div className="absolute -left-12 flex flex-col gap-1 text-xl">
            <span className="animate-ping">💨</span>
            <span className="animate-pulse">⚡</span>
          </div>
        </div>
      </motion.div>

      {/* Comic Action Sticker Banner */}
      <motion.div
        className="absolute z-40 top-16 sm:top-20 flex flex-col items-center pointer-events-none"
        initial={{ scale: 0, rotate: 12, opacity: 0 }}
        animate={{ scale: [0, 1.25, 1], rotate: [12, -3, 0], opacity: [0, 1, 1] }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 260 }}
      >
        <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#15803D] via-[#22C55E] to-[#16A34A] border-3 border-white text-white font-heading font-black text-lg sm:text-2xl tracking-wider shadow-2xl flex items-center gap-3">
          <span className="text-2xl animate-bounce">🦖</span>
          <span>DINO WORLD JURASSIC STAMPEDE!</span>
          <span className="text-2xl animate-spin">🌴</span>
        </div>
        <motion.span
          className="mt-2 text-xs sm:text-sm font-heading font-black text-emerald-100 uppercase tracking-widest drop-shadow-md bg-black/40 px-4 py-1 rounded-full border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          50+ Life-Sized Roaring Animatronics & Prehistoric Safari
        </motion.span>
      </motion.div>
    </div>
  );
}
