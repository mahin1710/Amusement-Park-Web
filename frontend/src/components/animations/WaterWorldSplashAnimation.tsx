"use client";

import { useEffect } from "react";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

/**
 * WaterWorldSplashAnimation
 * 3D effect completely removed from Water World as per user request.
 */
export function WaterWorldSplashAnimation({ onComplete }: Props) {
  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  return null;
}
