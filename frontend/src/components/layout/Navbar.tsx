"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function Navbar() {
  const { locale, setLocale, isBangla } = useTranslation();
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const maxScroll = window.innerWidth < 768 ? 90 : 120;
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      if (headerRef.current) {
        headerRef.current.style.setProperty("--scroll-p", progress.toFixed(4));
      }
      setScrollProgress(progress);
      ticking = false;
    };

    updateScroll();

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // On Homepage, the navigation pill buttons are integrated directly into the Hero Section (first viewport)
  if (pathname === "/") {
    return null;
  }

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "bn" : "en");
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 bg-[#FFF9ED]/85 backdrop-blur-md border-b-2 border-[#FED7AA]/60 transition-shadow duration-200 [--scroll-p:0] [--nav-logo-max:48px] [--nav-logo-min:40px] sm:[--nav-logo-max:56px] sm:[--nav-logo-min:44px] lg:[--nav-logo-max:64px] lg:[--nav-logo-min:48px]"
      style={{
        paddingTop: `calc(clamp(8px, 1rem - 0.5rem * var(--scroll-p, ${scrollProgress}), 1rem))`,
        paddingBottom: `calc(clamp(8px, 1rem - 0.5rem * var(--scroll-p, ${scrollProgress}), 1rem))`,
        boxShadow: `0 4px 12px -2px rgba(67, 20, 7, calc(0.04 + 0.04 * var(--scroll-p, ${scrollProgress})))`,
      }}
      data-purpose="internal-page-navigation"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo & Identity with Smooth Scaling Logo Element */}
        <Link
          href="/"
          aria-label="Anowar City Magic Island Home"
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          <div
            className="shrink-0 flex items-center justify-center bg-white border-2 border-[#FFD93D] overflow-hidden group-hover:scale-105"
            style={{
              height: `calc(var(--nav-logo-max) - (var(--nav-logo-max) - var(--nav-logo-min)) * var(--scroll-p, ${scrollProgress}))`,
              padding: `calc(clamp(4px, 6px - 2px * var(--scroll-p, ${scrollProgress}), 6px))`,
              borderRadius: `calc(clamp(12px, 16px - 4px * var(--scroll-p, ${scrollProgress}), 16px))`,
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
              className="font-bold uppercase font-heading leading-none text-[#FF6B35]"
              style={{
                fontSize: `calc(clamp(9px, 11px - 2px * var(--scroll-p, ${scrollProgress}), 11px))`,
                letterSpacing: `calc(0.22em - 0.02em * var(--scroll-p, ${scrollProgress}))`,
                marginBottom: `calc(clamp(2px, 4px - 2px * var(--scroll-p, ${scrollProgress}), 4px))`,
              }}
            >
              {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
            </span>
            <span
              className="font-black tracking-tight text-[#172554] font-heading leading-none"
              style={{
                fontSize: `calc(clamp(1rem, 1.5rem - 0.25rem * var(--scroll-p, ${scrollProgress}), 1.5rem))`,
              }}
            >
              MAGIC ISLAND
            </span>
          </div>
        </Link>

        {/* Quick Actions (Bilingual Switcher EN / বাংলা - Untouched) */}
        <div className="flex items-center shrink-0">
          <button
            onClick={toggleLanguage}
            type="button"
            title="Switch Language"
            className="nav-pill-btn cursor-pointer"
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
                  <span className="font-bangla text-[#172554]/60">বাংলা</span>
                </>
              ) : (
                <>
                  <span className="text-[#172554]/60">EN</span> |{" "}
                  <strong className="font-bangla text-[#FF6B35]">বাংলা</strong>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
