"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function HeroSection() {
  const { locale, setLocale, isBangla } = useTranslation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { href: "/", labelEn: "Home", labelBn: "হোম" },
    { href: "/attractions", labelEn: "Explore Attractions", labelBn: "সকল আকর্ষণ" },
    { href: "/gallery", labelEn: "Gallery", labelBn: "গ্যালারি" },
    { href: "/location", labelEn: "Contact", labelBn: "যোগাযোগ" },
  ];

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

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
              className="shrink-0 flex items-center justify-center bg-white/95 backdrop-blur-md border-2 border-[#FFD93D] overflow-hidden group-hover:scale-105 transition-transform"
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
                className="font-bold uppercase font-heading leading-none text-[#FFD93D] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
                style={{
                  fontSize: `calc(var(--sub-max) - (var(--sub-max) - var(--sub-min)) * var(--scroll-p, ${scrollProgress}))`,
                  letterSpacing: `calc(0.24em - 0.04em * var(--scroll-p, ${scrollProgress}))`,
                  marginBottom: `calc(clamp(2px, 4px - 2px * var(--scroll-p, ${scrollProgress}), 4px))`,
                }}
              >
                {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
              </span>
              <span
                className="font-black tracking-tight font-heading leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
                style={{
                  fontSize: `calc(var(--title-max) - (var(--title-max) - var(--title-min)) * var(--scroll-p, ${scrollProgress}))`,
                  color: scrollProgress > 0.65 ? "#172554" : "#FFFFFF",
                  transition: "color 0.25s ease",
                }}
              >
                MAGIC ISLAND
              </span>
            </div>
          </Link>

          {/* Floating Navigation Pill Buttons Directly Over Video (No Header Bar) */}
          <nav
            aria-label="Hero Navigation"
            className="hidden lg:flex items-center gap-2 xl:gap-2.5 flex-wrap justify-center pointer-events-auto"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-pill-btn !bg-white/95 !backdrop-blur-md !border-2 !border-[#FED7AA]/90 !shadow-lg ${isActive ? "active" : ""}`}
                  style={{
                    paddingTop: `calc(clamp(6px, 8px - 2px * var(--scroll-p, ${scrollProgress}), 8px))`,
                    paddingBottom: `calc(clamp(6px, 8px - 2px * var(--scroll-p, ${scrollProgress}), 8px))`,
                    paddingLeft: `calc(clamp(14px, 18px - 4px * var(--scroll-p, ${scrollProgress}), 18px))`,
                    paddingRight: `calc(clamp(14px, 18px - 4px * var(--scroll-p, ${scrollProgress}), 18px))`,
                    fontSize: `calc(clamp(0.75rem, 0.8125rem - 0.0625rem * var(--scroll-p, ${scrollProgress}), 0.8125rem))`,
                  }}
                >
                  <span>{isBangla ? item.labelBn : item.labelEn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Floating Quick Action Pills */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 pointer-events-auto">
            {/* WhatsApp Quick Pill */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Helpline"
              className="hidden sm:inline-flex items-center gap-2 font-heading font-semibold rounded-full bg-[#55C98B] hover:bg-[#43B878] text-white shadow-xl shadow-emerald-950/20 transition-transform hover:scale-105 duration-200 whitespace-nowrap cursor-pointer border border-emerald-400/40"
              style={{
                height: `calc(clamp(36px, 40px - 4px * var(--scroll-p, ${scrollProgress}), 40px))`,
                paddingLeft: `calc(clamp(12px, 16px - 4px * var(--scroll-p, ${scrollProgress}), 16px))`,
                paddingRight: `calc(clamp(12px, 16px - 4px * var(--scroll-p, ${scrollProgress}), 16px))`,
                fontSize: `calc(clamp(11px, 12px - 1px * var(--scroll-p, ${scrollProgress}), 12px))`,
              }}
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span className="hidden xl:inline">{businessConfig.hotlines.whatsapp}</span>
              <span className="xl:hidden">WhatsApp</span>
            </a>

            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              type="button"
              title="Switch Language"
              className="nav-pill-btn !bg-white/95 !backdrop-blur-md !border-2 !border-[#FED7AA]/90 !shadow-lg cursor-pointer"
              style={{
                height: `calc(clamp(36px, 40px - 4px * var(--scroll-p, ${scrollProgress}), 40px))`,
                paddingLeft: `calc(clamp(12px, 14px - 2px * var(--scroll-p, ${scrollProgress}), 14px))`,
                paddingRight: `calc(clamp(12px, 14px - 2px * var(--scroll-p, ${scrollProgress}), 14px))`,
                fontSize: `calc(clamp(11px, 12px - 1px * var(--scroll-p, ${scrollProgress}), 12px))`,
              }}
            >
              <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>
                {locale === "en" ? (
                  <>
                    <strong className="text-[#FF6B35]">EN</strong> |{" "}
                    <span className="font-bangla text-[#172554]/70">বাংলা</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#172554]/70">EN</span> |{" "}
                    <strong className="font-bangla text-[#FF6B35]">বাংলা</strong>
                  </>
                )}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-full border-2 border-[#FED7AA] bg-white/95 backdrop-blur-md text-[#172554] hover:text-[#FF6B35] flex items-center justify-center transition-transform active:scale-95 shadow-lg cursor-pointer"
              style={{
                height: `calc(clamp(36px, 40px - 4px * var(--scroll-p, ${scrollProgress}), 40px))`,
                width: `calc(clamp(36px, 40px - 4px * var(--scroll-p, ${scrollProgress}), 40px))`,
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay (When toggled open) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-[#FED7AA] shadow-2xl animate-in fade-in slide-in-from-top-3 max-h-[calc(100vh-90px)] overflow-y-auto pointer-events-auto">
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-full font-heading text-sm font-bold flex items-center justify-between transition-all duration-200 border-2 ${
                      isActive
                        ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-md"
                        : "bg-white text-[#172554] border-[#FED7AA]/60 hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] active:bg-[#FF6B35] active:text-white"
                    }`}
                  >
                    <span>{isBangla ? item.labelBn : item.labelEn}</span>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-amber-100 mt-1">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-[#55C98B] text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <i className="fa-brands fa-whatsapp text-sm"></i>
                  <span>WhatsApp Helpline: {businessConfig.hotlines.whatsapp}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION WITH LANDSCAPE VIDEO BACKGROUND (Replaces Image Slideshow) */}
      <section
        className="relative h-[72vh] sm:h-[78vh] lg:h-[84vh] min-h-[540px] sm:min-h-[600px] max-h-[860px] flex flex-col justify-between overflow-hidden bg-[#172554]"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/75 via-transparent to-black/30 pointer-events-none z-10" />

          {/* Seamless Bottom-Edge Blend into Preceding Section (#FFF9ED) */}
          <div className="absolute inset-x-0 -bottom-[1px] h-16 sm:h-24 bg-gradient-to-t from-[#FFF9ED] via-[#FFF9ED]/60 to-transparent pointer-events-none z-20" />
        </div>

        {/* Top Breathing Space Spacer for Floating Header Balance */}
        <div className="h-24 sm:h-28 lg:h-32 w-full pointer-events-none" aria-hidden="true" />

        {/* Minimal Bottom Ambience Spacer */}
        <div className="relative z-30 pb-4 sm:pb-6 pointer-events-none" aria-hidden="true" />
      </section>
    </>
  );
}
