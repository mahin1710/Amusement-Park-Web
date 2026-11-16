"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type AttractionRealm = "water-world" | "dino-world" | "thrill-world";

interface AnimationContextType {
  activeAnimation: AttractionRealm | null;
  playAnimation: (realm: AttractionRealm) => void;
  closeAnimation: () => void;
  isReducedMotion: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  activeAnimation: null,
  playAnimation: () => {},
  closeAnimation: () => {},
  isReducedMotion: false,
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [activeAnimation, setActiveAnimation] = useState<AttractionRealm | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const playAnimation = useCallback((realm: AttractionRealm) => {
    setActiveAnimation(realm);
  }, []);

  const closeAnimation = useCallback(() => {
    setActiveAnimation(null);
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        activeAnimation,
        playAnimation,
        closeAnimation,
        isReducedMotion,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAttractionAnimation() {
  return useContext(AnimationContext);
}
