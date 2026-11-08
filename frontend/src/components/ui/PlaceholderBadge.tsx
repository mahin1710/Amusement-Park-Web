"use client";

import React from "react";
import { Info } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

interface PlaceholderBadgeProps {
  label?: string;
  tooltipText?: string;
  className?: string;
  size?: "sm" | "md";
}

export function PlaceholderBadge({
  label,
  tooltipText,
  className = "",
  size = "sm",
}: PlaceholderBadgeProps) {
  const { t, isBangla } = useTranslation();

  const defaultLabel = label || (isBangla ? "ঘোষণা বাকি" : "Preview Placeholder");
  const defaultTooltip =
    tooltipText ||
    (isBangla
      ? "এই তথ্যটি উদ্বোধনের পূর্বে খসড়া হিসেবে রাখা হয়েছে। পার্কের অফিসিয়াল ঘোষণার সাথে আপডেট করা হবে।"
      : "This detail is a preliminary demonstration placeholder pending official administrative confirmation.");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide uppercase border border-amber-500/40 bg-amber-500/10 text-amber-300 ${
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-xs"
      } ${className}`}
      title={defaultTooltip}
    >
      <Info className="w-3 h-3 text-amber-400 shrink-0" />
      <span>{defaultLabel}</span>
    </span>
  );
}

