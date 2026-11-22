"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function Navbar() {
  const { locale, setLocale, isBangla } = useTranslation();
  const pathname = usePathname();
  const isShop = pathname === "/shop" || pathname === "/shop/";

  console.log('[Navbar Component] pathname:', pathname, 'isShop:', isShop);

  // Regular Navbar scroll progress (for non-shop pages)
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Shop Page Logo & Header scroll state
  const [shopShrinkProgress, setShopShrinkProgress] = useState(0);
  const [shopExitProgress, setShopExitProgress] = useState(0);
  const shopHeaderRef = useRef<HTMLElement>(null);

  // Synchronize non-shop pages scaling directly with scroll position
  // Direct 1:1 hardware-accelerated interpolation with requestAnimationFrame (matching Homepage)
  useEffect(() => {
    if (isShop) return;

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
  }, [isShop]);

  // Dedicated Shop Page Logo Scroll Animation (Shrink -> Exit Upward -> Return on Scroll-Up)
  useEffect(() => {
    if (!isShop) return;

    let ticking = false;

    const updateShopScroll = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      console.log('[updateShopScroll] scrollY:', scrollY, 'shopHeaderRef.current:', !!shopHeaderRef.current);

      // 1. Initial Scroll Phase (0px to 100px):
      // Logo smoothly shrinks from large to compact size
      const shrinkLimit = 100;
      const shrinkP = Math.min(1, Math.max(0, scrollY / shrinkLimit));

      // 2. Further Scroll Phase (100px to 220px):
      // Compact logo smoothly moves upward and disappears above the viewport
      const exitLimit = 120;
      const exitP =
        scrollY > shrinkLimit
          ? Math.min(1, Math.max(0, (scrollY - shrinkLimit) / exitLimit))
          : 0;

      if (shopHeaderRef.current) {
        shopHeaderRef.current.style.setProperty("--shop-shrink", shrinkP.toFixed(4));
        shopHeaderRef.current.style.setProperty("--shop-exit", exitP.toFixed(4));

        // When exitP > 0, translate upward out of viewport (-140px)
        const translateY = exitP * -140;
        const opacity = Math.max(0, 1 - exitP);

        shopHeaderRef.current.style.setProperty(
          "--shop-translate-y",
          `${translateY.toFixed(2)}px`
        );
        shopHeaderRef.current.style.setProperty(
          "--shop-opacity",
          opacity.toFixed(4)
        );
      }

      setShopShrinkProgress(shrinkP);
      setShopExitProgress(exitP);
      ticking = false;
    };

    updateShopScroll();

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateShopScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isShop]);

  // On Homepage, the hero header is rendered directly in HeroSection
  if (pathname === "/") {
    return null;
  }

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "bn" : "en");
  };

  // Dedicated Shop Page Layout: Logo in extreme top-left with shrink + exit-upward animation
  if (isShop) {
    const isCompletelyExited = shopExitProgress >= 1;

    return (
      <>
        {/* SHOP PAGE FLOATING HEADER */}
        <header
          ref={shopHeaderRef}
          className={`fixed top-0 inset-x-0 z-50 pointer-events-none transition-none [--shop-shrink:0] [--shop-exit:0] [--shop-translate-y:0px] [--shop-opacity:1] [--logo-large:64px] sm:[--logo-large:80px] lg:[--logo-large:96px] [--logo-compact:38px] sm:[--logo-compact:44px] lg:[--logo-compact:48px] [--title-large:20px] sm:[--title-large:24px] lg:[--title-large:28px] [--title-compact:15px] sm:[--title-compact:16px] lg:[--title-compact:18px] ${
            isCompletelyExited ? "invisible" : "visible"
          }`}
          style={{
            transform: `translate3d(0, var(--shop-translate-y, 0px), 0)`,
            opacity: `var(--shop-opacity, 1)`,
            willChange: "transform, opacity",
          }}
          data-purpose="shop-page-header"
        >
          {/* Extreme Top-Left Corner Logo */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-6 lg:left-8 pointer-events-auto">
            <Link
              href="/"
              aria-label="Magic Island Home"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 transition-transform hover:scale-102"
            >
              {/* Logo Card with Border & Shadow */}
              <div
                className="shrink-0 flex items-center justify-center bg-white/95 backdrop-blur-md border-2 border-[#FF914D] overflow-hidden group-hover:scale-105 transition-all origin-top-left"
                style={{
                  height: `calc(var(--logo-large) - (var(--logo-large) - var(--logo-compact)) * var(--shop-shrink, ${shopShrinkProgress}))`,
                  padding: `calc(clamp(4px, 7px - 3px * var(--shop-shrink, ${shopShrinkProgress}), 7px))`,
                  borderRadius: `calc(clamp(10px, 18px - 8px * var(--shop-shrink, ${shopShrinkProgress}), 18px))`,
                  boxShadow: "0 10px 25px -4px rgba(255, 145, 77, 0.28)",
                }}
              >
                <img
                  src="/images/Magic%20Island%20Logo.jpg"
                  alt="Anowar City Magic Island Official Logo"
                  className="h-full w-auto object-contain"
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col justify-center select-none">
                <span
                  className="font-bold uppercase font-heading leading-none text-[#FF914D]"
                  style={{
                    fontSize: `calc(clamp(9px, 11px - 2px * var(--shop-shrink, ${shopShrinkProgress}), 11px))`,
                    letterSpacing: `calc(0.24em - 0.04em * var(--shop-shrink, ${shopShrinkProgress}))`,
                    marginBottom: `calc(clamp(2px, 4px - 2px * var(--shop-shrink, ${shopShrinkProgress}), 4px))`,
                  }}
                >
                  {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
                </span>
                <span
                  className="font-bold tracking-wide text-[#173B42] font-magical leading-none"
                  style={{
                    fontSize: `calc(var(--title-large) - (var(--title-large) - var(--title-compact)) * var(--shop-shrink, ${shopShrinkProgress}))`,
                  }}
                >
                  MAGIC ISLAND
                </span>
              </div>
            </Link>
          </div>

          {/* Extreme Top-Right Language & Park Home Action Controls */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-6 lg:right-8 flex items-center gap-2 pointer-events-auto">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#FF914D]/30 text-xs font-bold font-heading text-[#173B42] hover:text-[#FF914D] hover:border-[#FF914D] shadow-md transition-all hover:scale-102"
              title="Return to Park Home"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FF914D]" />
              <span>{isBangla ? "পার্ক হোম" : "Park Home"}</span>
            </Link>

            <button
              onClick={toggleLanguage}
              type="button"
              title="Switch Language"
              className="nav-pill-btn !bg-white/95 !backdrop-blur-md !border-2 !border-[#FF914D]/30 !shadow-lg cursor-pointer h-10 px-3.5 text-xs font-heading"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF914D]" />
              <span>
                {locale === "en" ? (
                  <>
                    <strong className="text-[#FF914D]">EN</strong> |{" "}
                    <span className="font-bangla text-[#173B42]/70">বাংলা</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#173B42]/70">EN</span> |{" "}
                    <strong className="font-bangla text-[#FF914D]">বাংলা</strong>
                  </>
                )}
              </span>
            </button>
          </div>
        </header>

        {/* Breathing Space for Shop Page */}
        <div className="h-28 sm:h-32 lg:h-36 w-full pointer-events-none shrink-0" aria-hidden="true" />
      </>
    );
  }

  return (
    <>
      {/* FLOATING HEADER (Transparent, Floating, Exactly Matching Homepage) */}
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none transition-colors duration-200 [--scroll-p:0] [--logo-max:64px] [--logo-min:42px] [--title-max:22px] [--title-min:16px] [--sub-max:11px] [--sub-min:9px] sm:[--logo-max:76px] sm:[--logo-min:46px] sm:[--title-max:26px] sm:[--title-min:18px] sm:[--sub-max:12px] sm:[--sub-min:9.5px] lg:[--logo-max:92px] lg:[--logo-min:50px] lg:[--title-max:32px] lg:[--title-min:20px] lg:[--sub-max:13px] lg:[--sub-min:10px]"
        style={{
          paddingTop: `calc(clamp(8px, 1.5rem - 0.75rem * var(--scroll-p, ${scrollProgress}), 1.5rem))`,
          paddingBottom: `calc(clamp(8px, 0.75rem - 0.25rem * var(--scroll-p, ${scrollProgress}), 0.75rem))`,
        }}
        data-purpose="page-navigation-header"
      >
        <div
          className="max-w-[1400px] mx-auto flex items-center justify-between"
          style={{
            gap: `calc(clamp(0.625rem, 1.5rem - 0.5rem * var(--scroll-p, ${scrollProgress}), 1.5rem))`,
          }}
        >
          {/* Brand Logo & Identity: Smoothly Scaling with Scroll Progress (Matching Homepage) */}
          <Link
            href="/"
            aria-label="Anowar City Magic Island Home"
            className="flex items-center gap-3 group shrink-0 pointer-events-auto transition-transform hover:scale-102"
          >
            <div
              className="shrink-0 flex items-center justify-center bg-white/95 backdrop-blur-md border-2 border-[#FF914D] overflow-hidden group-hover:scale-105 transition-transform"
              style={{
                height: `calc(var(--logo-max) - (var(--logo-max) - var(--logo-min)) * var(--scroll-p, ${scrollProgress}))`,
                padding: `calc(clamp(4px, 7px - 3px * var(--scroll-p, ${scrollProgress}), 7px))`,
                borderRadius: `calc(clamp(12px, 18px - 6px * var(--scroll-p, ${scrollProgress}), 18px))`,
                boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.25)",
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
                className="font-bold uppercase font-heading leading-none text-[#FF914D]"
                style={{
                  fontSize: `calc(var(--sub-max) - (var(--sub-max) - var(--sub-min)) * var(--scroll-p, ${scrollProgress}))`,
                  letterSpacing: `calc(0.24em - 0.04em * var(--scroll-p, ${scrollProgress}))`,
                  marginBottom: `calc(clamp(2px, 4px - 2px * var(--scroll-p, ${scrollProgress}), 4px))`,
                }}
              >
                {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
              </span>
              <span
                className="font-bold tracking-wide text-[#173B42] font-magical leading-none"
                style={{
                  fontSize: `calc(var(--title-max) - (var(--title-max) - var(--title-min)) * var(--scroll-p, ${scrollProgress}))`,
                }}
              >
                MAGIC ISLAND
              </span>
            </div>
          </Link>

          {/* Language Switcher Pill (Matching Homepage) */}
          <div className="flex items-center shrink-0 pointer-events-auto">
            <button
              onClick={toggleLanguage}
              type="button"
              title="Switch Language"
              className="nav-pill-btn !bg-white/95 !backdrop-blur-md !border-2 !border-[#FF914D]/25 !shadow-lg cursor-pointer"
              style={{
                height: `calc(clamp(36px, 40px - 4px * var(--scroll-p, ${scrollProgress}), 40px))`,
                paddingLeft: `calc(clamp(12px, 14px - 2px * var(--scroll-p, ${scrollProgress}), 14px))`,
                paddingRight: `calc(clamp(12px, 14px - 2px * var(--scroll-p, ${scrollProgress}), 14px))`,
                fontSize: `calc(clamp(11px, 12px - 1px * var(--scroll-p, ${scrollProgress}), 12px))`,
              }}
            >
              <Globe className="w-3.5 h-3.5 text-[#FF914D]" />
              <span>
                {locale === "en" ? (
                  <>
                    <strong className="text-[#FF914D]">EN</strong> |{" "}
                    <span className="font-bangla text-[#173B42]/70">বাংলা</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#173B42]/70">EN</span> |{" "}
                    <strong className="font-bangla text-[#FF914D]">বাংলা</strong>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Top Breathing Space Spacer so Page Titles & Badges Start Below the Large Initial Floating Header */}
      <div className="h-24 sm:h-28 lg:h-32 w-full pointer-events-none shrink-0" aria-hidden="true" />
    </>
  );
}
