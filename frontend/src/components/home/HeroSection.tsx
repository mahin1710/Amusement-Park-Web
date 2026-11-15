"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { heroSlides } from "@/config/heroSlides";

export function HeroSection() {
  const { locale, setLocale, isBangla } = useTranslation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Delayed Logo Shrink & Scroll-Responsive Header (Adventure World Inspired)
  // Triggers only after visitor scrolls ~250-300px (or ~200px on mobile), preserving large logo during initial scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const threshold = window.innerWidth < 768 ? 200 : 260;
      setIsScrolled(scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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

  // Preload all slideshow images into browser memory to eliminate flashes/jumps
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.src;
    });
  }, []);

  // Shuffle next slide continuously every 5 seconds, avoiding consecutive repeats
  const advanceToNextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (heroSlides.length <= 1) return 0;
      let next: number;
      do {
        next = Math.floor(Math.random() * heroSlides.length);
      } while (next === prev);
      return next;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      advanceToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [advanceToNextSlide]);

  return (
    <>
      {/* 4. INTEGRATED HERO NAVIGATION (Fixed Header with Localized Transparent Blur & Delayed Logo Shrink) */}
      <header
        className={`fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "py-2 sm:py-2.5"
            : "pt-4 sm:pt-5 pb-2.5 sm:pb-3"
        }`}
        data-purpose="hero-navigation-header"
      >
        {/* Localized Transparent Backdrop Blur (Preserves subtle glass blur in both expanded & compact states) */}
        <div
          className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-300 ease-in-out backdrop-blur-md ${
            isScrolled || mobileMenuOpen
              ? "bg-[#FFF9ED]/80 border-b-2 border-[#FED7AA]/60 shadow-sm shadow-orange-950/5"
              : "bg-[#FFF9ED]/40 border-b border-transparent"
          }`}
        />

        <div className={`max-w-[1400px] mx-auto flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolled ? "gap-2.5 sm:gap-4" : "gap-3 sm:gap-6"
        }`}>
          {/* Brand Logo & Identity: Single Element Smoothly Shrinking & Repositioning on Scroll */}
          <Link
            href="/"
            aria-label="Anowar City Magic Island Home"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 transition-transform duration-200"
          >
            <div
              className={`shrink-0 flex items-center justify-center bg-white border-2 border-[#FFD93D] overflow-hidden group-hover:scale-105 transition-all duration-300 ease-in-out ${
                isScrolled
                  ? "h-10 sm:h-11 lg:h-12 w-auto p-1 rounded-xl shadow-xs"
                  : "h-14 sm:h-16 lg:h-20 w-auto p-1.5 rounded-2xl shadow-md"
              }`}
            >
              <img
                src="/images/Magic%20Island%20Logo.jpg"
                alt="Anowar City Magic Island Official Logo"
                className="h-full w-auto object-contain transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="flex flex-col justify-center transition-all duration-300 ease-in-out">
              <span
                className={`font-bold uppercase font-heading leading-none text-[#FF6B35] transition-all duration-300 ease-in-out ${
                  isScrolled
                    ? "text-[9px] sm:text-[10px] tracking-[0.20em] mb-0.5"
                    : "text-[10px] sm:text-[11px] lg:text-[12px] tracking-[0.24em] mb-1"
                }`}
              >
                {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
              </span>
              <span
                className={`font-black tracking-tight text-[#172554] font-heading leading-none transition-all duration-300 ease-in-out ${
                  isScrolled
                    ? "text-base sm:text-lg lg:text-xl"
                    : "text-xl sm:text-2xl lg:text-3xl"
                }`}
              >
                MAGIC ISLAND
              </span>
            </div>
          </Link>

          {/* Compact Modern Rounded Pill Navigation Buttons with Orange Hover */}
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
              className="hidden sm:inline-flex items-center gap-2 h-9 sm:h-10 px-3.5 sm:px-4 text-xs font-heading font-semibold rounded-full bg-[#55C98B] hover:bg-[#43B878] text-white shadow-md shadow-emerald-500/20 transition-all hover:scale-105 duration-200 whitespace-nowrap cursor-pointer"
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
              className="nav-pill-btn !h-9 sm:!h-10 !px-3 sm:!px-3.5 !text-xs cursor-pointer"
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
              className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-[#FED7AA] bg-white text-[#172554] hover:text-[#FF6B35] flex items-center justify-center transition-transform active:scale-95 shadow-sm cursor-pointer"
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

      {/* 1. HERO SLIDESHOW & AMUSEMENT PARK SECTION */}
      <section
        className="relative h-[72vh] sm:h-[76vh] lg:h-[80vh] min-h-[520px] sm:min-h-[580px] max-h-[760px] flex flex-col justify-between overflow-hidden bg-[#FFF9ED]"
        data-purpose="amusement-park-entrance-hero"
        id="hero"
      >
        {/* AUTOMATIC SHUFFLE FULL-WIDTH PHOTOGRAPHY SLIDESHOW (100% Edge-to-Edge) */}
        <div className="absolute inset-0 z-0 overflow-hidden w-full">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            );
          })}

          {/* 2. SUBTLE TOP BLUR & SEAMLESS GRADIENT BLEND (Soft transparent backdrop-blur behind navigation area) */}
          <div
            className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-[#FFF9ED]/85 via-[#FFF9ED]/30 to-transparent backdrop-blur-[3px] pointer-events-none z-10"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%)",
            }}
          ></div>

          {/* 3. SUBTLE, MINIMAL BOTTOM-EDGE BLEND (Short ~36px fade into #FFF9ED) */}
          <div className="absolute inset-x-0 bottom-0 h-8 sm:h-10 bg-gradient-to-t from-[#FFF9ED] via-[#FFF9ED]/30 to-transparent pointer-events-none z-20"></div>
        </div>

        {/* Top Breathing Space Spacer (Preserves layout balance when header is fixed) */}
        <div className="h-20 sm:h-24 lg:h-28 w-full pointer-events-none" aria-hidden="true" />

        {/* 5. SUBTLE MINIMAL SLIDESHOW INDICATOR DOTS */}
        <div className="relative z-30 pb-2.5 sm:pb-3 flex items-center justify-center mt-auto pointer-events-auto">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 shadow-sm"
            role="tablist"
            aria-label="Slideshow Indicators"
          >
            {heroSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${slide.alt}`}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
                    isActive
                      ? "w-6 h-2 bg-[#FFD93D] shadow-sm"
                      : "w-2 h-2 bg-white/60 hover:bg-white"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
