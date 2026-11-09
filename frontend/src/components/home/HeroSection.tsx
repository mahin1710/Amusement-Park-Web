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

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "bn" : "en");
  };

  const navLinks = [
    { href: "/", labelEn: "Home", labelBn: "হোম" },
    { href: "/attractions", labelEn: "Explore Attractions", labelBn: "সকল আকর্ষণ" },
    { href: "/gallery", labelEn: "Gallery", labelBn: "গ্যালারি" },
    { href: "/about", labelEn: "About Us", labelBn: "আমাদের সম্পর্কে" },
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
    <section
      className="relative h-[66vh] sm:h-[70vh] lg:h-[73vh] min-h-[490px] sm:min-h-[530px] max-h-[670px] flex flex-col justify-between overflow-hidden bg-[#FFF9ED]"
      data-purpose="amusement-park-entrance-hero"
      id="hero"
    >
      {/* 1. AUTOMATIC SHUFFLE FULL-WIDTH PHOTOGRAPHY SLIDESHOW (100% Edge-to-Edge) */}
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

      {/* 4. INTEGRATED HERO NAVIGATION (Positioned neatly with small breathing space at top, shifted slightly higher) */}
      <header className="relative z-30 w-full pt-5 sm:pt-6 pb-2.5 sm:pb-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 sm:gap-6">
          {/* Brand Logo & Identity with New Official Website Logo */}
          <Link
            href="/"
            aria-label="Anowar City Magic Island Home"
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="h-12 sm:h-14 w-auto shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white border-2 border-[#FFD93D] shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <img
                src="/images/Magic%20Island%20Logo.jpg"
                alt="Anowar City Magic Island Official Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-[#FF6B35] uppercase font-heading leading-none mb-1">
                {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#172554] font-heading leading-none">
                MAGIC ISLAND
              </span>
            </div>
          </Link>

          {/* Restored Simple, Elegant Navigation Buttons */}
          <nav
            aria-label="Hero Navigation"
            className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 flex-wrap justify-center"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full font-heading text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/20"
                      : "text-[#172554] hover:bg-[#FFF2B2] hover:text-[#172554]"
                  }`}
                >
                  <span>{isBangla ? item.labelBn : item.labelEn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions (Bilingual Toggle & Helpline) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* WhatsApp Quick Pill */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Helpline"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 text-xs font-heading font-semibold rounded-full bg-[#55C98B] hover:bg-[#43B878] text-white shadow-md shadow-emerald-500/20 transition-all hover:scale-105 duration-200 whitespace-nowrap cursor-pointer"
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
              className="h-10 px-3.5 text-xs font-heading font-semibold rounded-full border-2 border-[#FED7AA] bg-white text-[#172554] hover:border-[#FF6B35] transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap cursor-pointer"
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
              className="lg:hidden h-10 w-10 rounded-full border-2 border-[#FED7AA] bg-white text-[#172554] hover:text-[#FF6B35] flex items-center justify-center transition-transform active:scale-95 shadow-sm cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-[#FED7AA] shadow-2xl animate-in fade-in slide-in-from-top-3">
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl font-heading text-sm font-bold flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-[#FF6B35] text-white shadow-md"
                        : "text-[#172554] hover:bg-[#FFF2B2]"
                    }`}
                  >
                    <span>{isBangla ? item.labelBn : item.labelEn}</span>
                    <ArrowRight className="w-4 h-4 opacity-60" />
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

      {/* 4. SUBTLE MINIMAL SLIDESHOW INDICATOR DOTS */}
      <div className="relative z-30 pb-2.5 sm:pb-3 flex items-center justify-center pointer-events-auto">
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
  );
}
