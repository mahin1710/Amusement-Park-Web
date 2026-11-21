"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function HeroSection() {
  const { locale, setLocale, isBangla } = useTranslation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Synchronize Logo & Navigation scaling directly with scroll position
  // Direct 1:1 hardware-accelerated interpolation with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // Range: from 0px (top) to 180px (compact) on desktop, 140px on mobile
      const maxScroll = window.innerWidth < 768 ? 140 : 180;
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      if (headerRef.current) {
        headerRef.current.style.setProperty("--scroll-p", progress.toFixed(4));
      }

      setScrollProgress(progress);
      ticking = false;
    };

    updateScrollProgress();

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Ensure video plays continuously across all browsers (including iOS low-power mode)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback: re-ensure muted and play on interaction if needed
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "bn" : "en");
  };

  return (
    <>
      {/* 1. FLOATING HERO NAVIGATION (Transparent, Floating Over Video, No Header Bar) */}
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none transition-colors duration-200 [--scroll-p:0] [--logo-max:64px] [--logo-min:42px] [--title-max:22px] [--title-min:16px] [--sub-max:11px] [--sub-min:9px] sm:[--logo-max:76px] sm:[--logo-min:46px] sm:[--title-max:26px] sm:[--title-min:18px] sm:[--sub-max:12px] sm:[--sub-min:9.5px] lg:[--logo-max:92px] lg:[--logo-min:50px] lg:[--title-max:32px] lg:[--title-min:20px] lg:[--sub-max:13px] lg:[--sub-min:10px]"
        style={{
          paddingTop: `calc(clamp(8px, 1.5rem - 0.75rem * var(--scroll-p, ${scrollProgress}), 1.5rem))`,
          paddingBottom: `calc(clamp(8px, 0.75rem - 0.25rem * var(--scroll-p, ${scrollProgress}), 0.75rem))`,
        }}
        data-purpose="hero-navigation-header"
      >
        <div
          className="max-w-[1400px] mx-auto flex items-center justify-between"
          style={{
            gap: `calc(clamp(0.625rem, 1.5rem - 0.5rem * var(--scroll-p, ${scrollProgress}), 1.5rem))`,
          }}
        >
          {/* Brand Logo & Identity: Naturally Floating Over Video, Smoothly Scaling with Scroll Progress */}
          <Link
            href="/"
            aria-label="Anowar City Magic Island Home"
            className="flex items-center gap-3 group shrink-0 pointer-events-auto transition-transform hover:scale-102"
          >
            <div
              className="shrink-0 flex items-center justify-center bg-white/95 backdrop-blur-md border-2 border-[#FFC857] overflow-hidden group-hover:scale-105 transition-transform"
              style={{
                height: `calc(var(--logo-max) - (var(--logo-max) - var(--logo-min)) * var(--scroll-p, ${scrollProgress}))`,
                padding: `calc(clamp(4px, 7px - 3px * var(--scroll-p, ${scrollProgress}), 7px))`,
                borderRadius: `calc(clamp(12px, 18px - 6px * var(--scroll-p, ${scrollProgress}), 18px))`,
                boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.35)",
              }}
            >
              <img
                src="/images/Magic%20Island%20Logo.jpg"
                alt="Anowar City Magic Island Official Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span
                className="font-bold uppercase font-heading leading-none text-[#FF795C]"
                style={{
                  fontSize: `calc(var(--sub-max) - (var(--sub-max) - var(--sub-min)) * var(--scroll-p, ${scrollProgress}))`,
                  letterSpacing: `calc(0.24em - 0.04em * var(--scroll-p, ${scrollProgress}))`,
                  marginBottom: `calc(clamp(2px, 4px - 2px * var(--scroll-p, ${scrollProgress}), 4px))`,
                  filter: scrollProgress > 0.4 ? "none" : "drop-shadow(0 2px 6px rgba(0,0,0,0.95))",
                  transition: "filter 0.25s ease",
                }}
              >
                {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
              </span>
              <span
                className="font-bold tracking-wide font-magical leading-none"
                style={{
                  fontSize: `calc(var(--title-max) - (var(--title-max) - var(--title-min)) * var(--scroll-p, ${scrollProgress}))`,
                  color: scrollProgress > 0.4 ? "#173B42" : "#FFFFFF",
                  filter: scrollProgress > 0.4 ? "none" : "drop-shadow(0 2px 10px rgba(0,0,0,0.95))",
                  transition: "color 0.25s ease, filter 0.25s ease",
                }}
              >
                MAGIC ISLAND
              </span>
            </div>
          </Link>

          {/* Language Switcher Pill (Untouched) */}
          <div className="flex items-center shrink-0 pointer-events-auto">
            <button
              onClick={toggleLanguage}
              type="button"
              title="Switch Language"
              className="nav-pill-btn !bg-white/95 !backdrop-blur-md !border-2 !border-[#087E8B]/25 !shadow-lg cursor-pointer"
              style={{
                height: `calc(clamp(36px, 40px - 4px * var(--scroll-p, ${scrollProgress}), 40px))`,
                paddingLeft: `calc(clamp(12px, 14px - 2px * var(--scroll-p, ${scrollProgress}), 14px))`,
                paddingRight: `calc(clamp(12px, 14px - 2px * var(--scroll-p, ${scrollProgress}), 14px))`,
                fontSize: `calc(clamp(11px, 12px - 1px * var(--scroll-p, ${scrollProgress}), 12px))`,
              }}
            >
              <Globe className="w-3.5 h-3.5 text-[#35C6C8]" />
              <span>
                {locale === "en" ? (
                  <>
                    <strong className="text-[#087E8B]">EN</strong> |{" "}
                    <span className="font-bangla text-[#173B42]/70">বাংলা</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#173B42]/70">EN</span> |{" "}
                    <strong className="font-bangla text-[#087E8B]">বাংলা</strong>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION WITH LANDSCAPE VIDEO BACKGROUND (Replaces Image Slideshow) */}
      <section
        className="relative h-[72vh] sm:h-[78vh] lg:h-[84vh] min-h-[540px] sm:min-h-[600px] max-h-[860px] flex flex-col justify-between overflow-hidden bg-[#12304A]"
        data-purpose="amusement-park-entrance-hero"
        id="hero"
      >
        {/* LANDSCAPE VIDEO BACKGROUND (Exact Home PG video/video-1 file) */}
        <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
          <video
            ref={videoRef}
            src="/images/Home%20PG%20video/Video-1.mp4"
            poster="/images/magic-island-waterpark-aerial.jpg"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-100"
            onEnded={(e) => {
              // Safety fallback ensuring loop playback never stalls
              e.currentTarget.play().catch(() => {});
            }}
          />

          {/* Cinematic Contrast Vignette for Text & Logo Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12304A]/75 via-transparent to-black/30 pointer-events-none z-10" />

          {/* Seamless Bottom-Edge Blend into Preceding Section (#FFFDF5) */}
          <div className="absolute inset-x-0 -bottom-[1px] h-16 sm:h-24 bg-gradient-to-t from-[#FFFDF5] via-[#FFFDF5]/60 to-transparent pointer-events-none z-20" />
        </div>

        {/* Top Breathing Space Spacer for Floating Header Balance */}
        <div className="h-24 sm:h-28 lg:h-32 w-full pointer-events-none" aria-hidden="true" />

        {/* Minimal Bottom Ambience Spacer */}
        <div className="relative z-30 pb-4 sm:pb-6 pointer-events-none" aria-hidden="true" />
      </section>
    </>
  );
}
