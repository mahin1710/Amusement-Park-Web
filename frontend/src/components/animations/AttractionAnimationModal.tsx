"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useAttractionAnimation } from "@/context/AnimationContext";
import { WaterWorldSplashAnimation } from "./WaterWorldSplashAnimation";
import { DinoWorldStampedeAnimation } from "./DinoWorldStampedeAnimation";
import { ThrillWorldCoasterAnimation } from "./ThrillWorldCoasterAnimation";

export function AttractionAnimationModal() {
  const { activeAnimation, closeAnimation, isReducedMotion } = useAttractionAnimation();

  useEffect(() => {
    if (!activeAnimation) return;

    // Auto-close animation gracefully after 5.2 seconds
    const autoCloseTimer = setTimeout(() => {
      closeAnimation();
    }, 5200);

    // Escape key listener to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAnimation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(autoCloseTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeAnimation, closeAnimation]);

  return (
    <AnimatePresence>
      {activeAnimation && (
        <motion.div
          key="attraction-cinematic-stage"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeAnimation}
        >
          {/* Main Stage Canvas Area */}
          <div
            className="relative w-full h-full flex items-center justify-center cursor-pointer"
            title="Click anywhere to skip animation"
          >
            {activeAnimation === "water-world" && (
              <WaterWorldSplashAnimation
                onComplete={closeAnimation}
                isReducedMotion={isReducedMotion}
              />
            )}
            {activeAnimation === "dino-world" && (
              <DinoWorldStampedeAnimation
                onComplete={closeAnimation}
                isReducedMotion={isReducedMotion}
              />
            )}
            {activeAnimation === "thrill-world" && (
              <ThrillWorldCoasterAnimation
                onComplete={closeAnimation}
                isReducedMotion={isReducedMotion}
              />
            )}

            {/* Skip & Close Button */}
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeAnimation();
              }}
              className="absolute top-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#172554] hover:text-[#FF6B35] font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl border-2 border-white transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span>Skip Animation</span>
              <X className="w-4 h-4" />
            </motion.button>

            {/* Bottom Interaction Pill Prompt */}
            <motion.div
              className="absolute bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 text-xs font-heading font-semibold shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] animate-spin" />
                <span>Click anywhere to continue exploring</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
