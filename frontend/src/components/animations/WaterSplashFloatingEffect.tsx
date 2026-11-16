"use client";

import { useEffect } from "react";

interface Props {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

/**
 * WaterSplashFloatingEffect
 * 3D effect completely removed from Water World as per user request.
 */
export function WaterSplashFloatingEffect({ onComplete }: Props) {
  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  return null;
}
