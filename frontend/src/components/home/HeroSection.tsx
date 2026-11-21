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

  // Synchronize Header, Logo & Navigation transformation directly with scroll position
  // Direct 1:1 interpolation with requestAnimationFrame for 60/120fps hardware rendering
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // Range: from 0px (top) to 180px (full compact) on desktop, 140px on mobile
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

  // Ensure autoplay starts reliably across browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled gracefully
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
      {/* 4. INTEGRATED HERO NAVIGATION (Transparent at Top with Prominent Logo, Smoothly Shrinking on Scroll) */}
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 [--scroll-p:0] [--logo-max:56px] [--logo-min:40px] [--title-max:20px] [--title-min:16px] [--sub-max:10px] [--sub-min:9px] sm:[--logo-max:64px] sm:[--logo-min:44px] sm:[--title-max:24px] sm:[--title-min:18px] sm:[--sub-max:11px] sm:[--sub-min:9.5px] lg:[--logo-max:80px] lg:[--logo-min:48px] lg:[--title-max:30px] lg:[--title-min:20px] lg:[--sub-max:12px] lg:[--sub-min:10px]"
        style={{
          paddingTop: `calc(clamp(8px, 1.25rem - 0.625rem * var(--scroll-p, ${scrollProgress}), 1.25rem))`,
          paddingBottom: `calc(clamp(8px, 0.75rem - 0.125rem * var(--scroll-p, ${scrollProgress}), 0.75rem))`,
        }}
        data-purpose="hero-navigation-header"
      >
        {/* Transparent Backdrop at Top (No solid bar initially), smoothly fades in blurred glass on scroll */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none transition-all duration-200"
          style={{
            backgroundColor: mobileMenuOpen
              ? "rgba(255, 249, 237, 0.95)"
              : `rgba(255, 249, 237, calc(0.85 * var(--scroll-p, ${scrollProgress})))`,
            borderBottom: `2px solid rgba(254, 215, 170, calc(0.60 * var(--scroll-p, ${scrollProgress})))`,
            boxShadow: `0 2px 8px -1px rgba(67, 20, 7, calc(0.08 * var(--scroll-p, ${scrollProgress})))`,
            backdropFilter: mobileMenuOpen || scrollProgress > 0.05 ? "blur(12px)" : "none",
            WebkitBackdropFilter: mobileMenuOpen || scrollProgress > 0.05 ? "blur(12px)" : "none",
          }}
        />

        <div
          className="max-w-[1400px] mx-auto flex items-center justify-between"
          style={{
            gap: `calc(clamp(0.625rem, 1.5rem - 0.5rem * var(--scroll-p, ${scrollProgress}), 1.5rem))`,
          }}
        >
          {/* Brand Logo & Identity: Smoothly and Proportionally Scaling with Scroll Progress */}
          <Link
            href="/"
            aria-label="Anowar City Magic Island Home"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <div
              className="shrink-0 flex items-center justify-center bg-white border-2 border-[#FFD93D] overflow-hidden group-hover:scale-105"
              style={{
                height: `calc(var(--logo-max) - (var(--logo-max) - var(--logo-min)) * var(--scroll-p, ${scrollProgress}))`,
                padding: `calc(clamp(4px, 6px - 2px * var(--scroll-p, ${scrollProgress}), 6px))`,
                borderRadius: `calc(clamp(12px, 16px - 4px * var(--scroll-p, ${scrollProgress}), 16px))`,
                boxShadow: `0 4px 12px -2px rgba(255, 107, 53, calc(0.20 - 0.12 * var(--scroll-p, ${scrollProgress})))`,
              }}
            >
              <img
                src="/images/Magic%20Island%20Logo.jpg"
                alt="Anowar City Magic Island Official Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col justify-center drop-shadow-sm">
              <span
                className="font-bold uppercase font-heading leading-none text-[#FF6B35]"
                style={{
                  fontSize: `calc(var(--sub-max) - (var(--sub-max) - var(--sub-min)) * var(--scroll-p, ${scrollProgress}))`,
                  letterSpacing: `calc(0.24em - 0.04em * var(--scroll-p, ${scrollProgress}))`,
                  marginBottom: `calc(clamp(2px, 4px - 2px * var(--scroll-p, ${scrollProgress}), 4px))`,
                }}
              >
                {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
              </span>
              <span
                className="font-black tracking-tight text-[#172554] font-heading leading-none"
                style={{
                  fontSize: `calc(var(--title-max) - (var(--title-max) - var(--title-min)) * var(--scroll-p, ${scrollProgress}))`,
                }}
              >
                MAGIC ISLAND
              </span>
            </div>
          </Link>

          {/* Category Navigation Buttons: Proportionally Shrinking and Aligning with Scroll */}
          <nav
            aria-label="Hero Navigation"
            className="hidden lg:flex items-center gap-2 xl:gap-2.5 flex-wrap justify-center"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-pill-btn ${isActive ? "active" : ""}`}
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

          {/* Quick Actions (Bilingual Toggle & Helpline) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* WhatsApp Quick Pill */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Helpline"
              className="hidden sm:inline-flex items-center gap-2 font-heading font-semibold rounded-full bg-[#55C98B] hover:bg-[#43B878] text-white shadow-md shadow-emerald-500/20 transition-transform hover:scale-105 duration-200 whitespace-nowrap cursor-pointer"
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
              className="lg:hidden rounded-full border-2 border-[#FED7AA] bg-white text-[#172554] hover:text-[#FF6B35] flex items-center justify-center transition-transform active:scale-95 shadow-sm cursor-pointer"
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

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-[#FED7AA] shadow-2xl animate-in fade-in slide-in-from-top-3 max-h-[calc(100vh-90px)] overflow-y-auto">
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

      {/* 1. HERO VIDEO & AMUSEMENT PARK ENTRANCE */}
      <section
        className="relative h-[72vh] sm:h-[76vh] lg:h-[82vh] min-h-[520px] sm:min-h-[580px] max-h-[800px] flex flex-col justify-between overflow-hidden bg-[#FFF9ED]"
        data-purpose="amusement-park-entrance-hero"
        id="hero"
      >
        {/* FULL-WIDTH CONTINUOUS LANDSCAPE HERO VIDEO */}
        <div className="absolute inset-0 z-0 overflow-hidden w-full bg-[#172554]">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/Water%20World/Water%20Cover%20Pic.png"
            className="w-full h-full object-cover object-center pointer-events-none"
            aria-label="Anowar City Magic Island Official Theme Park Video"
          >
            <source src="/images/Home%20PG%20Video/Video-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Subtle Top Protection Vignette for Navigation Visibility (Gently fades away as compact header blurred background takes over) */}
          <div
            className="absolute inset-x-0 top-0 h-32 sm:h-36 bg-gradient-to-b from-black/40 via-black/15 to-transparent pointer-events-none z-10 transition-opacity duration-300"
            style={{
              opacity: `calc(1 - var(--scroll-p, ${scrollProgress}))`,
            }}
          />

          {/* Seamless Bottom-Edge Blend into #FFF9ED Page Background */}
          <div className="absolute inset-x-0 -bottom-[2px] h-12 sm:h-16 bg-gradient-to-t from-[#FFF9ED] via-[#FFF9ED]/60 to-transparent pointer-events-none z-20" />
        </div>

        {/* Top Breathing Space Spacer (Preserves layout balance when header is fixed) */}
        <div className="h-20 sm:h-24 lg:h-28 w-full pointer-events-none" aria-hidden="true" />
      </section>
    </>
  );
}
