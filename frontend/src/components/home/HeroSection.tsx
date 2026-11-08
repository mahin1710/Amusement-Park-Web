"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Sparkles,
  Waves,
  Footprints,
  FerrisWheel,
  ArrowRight,
  Globe,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function HeroSection() {
  const { locale, setLocale, isBangla } = useTranslation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <section
      className="relative min-h-[100vh] flex flex-col justify-between overflow-hidden bg-[#FFF9ED]"
      data-purpose="amusement-park-entrance-hero"
      id="hero"
    >
      {/* Real Park Aerial Photograph with Warm Amusement Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Aerial view of Anowar City Magic Island showcasing massive turquoise wave pool, winding lazy river, rainbow bridges, and thrill slides"
          className="w-full h-full object-cover object-center filter brightness-105 contrast-100"
          src="/images/magic-island-waterpark-aerial.jpg"
        />
        {/* Warm Ambient Vignette & Park Horizon Gradient */}
        <div className="absolute inset-0 hero-park-vignette"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9ED] via-[#FFF9ED]/45 to-white/70"></div>
      </div>

      {/* 1. NON-STICKY INTEGRATED HERO NAVIGATION */}
      <header className="relative z-30 w-full pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Identity */}
          <Link
            href="/"
            aria-label="Anowar City Magic Island Home"
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="h-12 sm:h-14 w-auto shrink-0 flex items-center justify-center p-1.5 rounded-2xl bg-white/95 border-2 border-[#FFD93D] shadow-md overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/magic-island-logo.jpg"
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

          {/* Desktop Navigation Pill Buttons */}
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

          {/* Quick Actions (Bilingual Toggle & Hotline Pill) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
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
              className="nav-pill-btn h-10 !px-3.5 !text-xs"
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

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-10 w-10 rounded-full border-2 border-[#FED7AA] bg-white text-[#172554] hover:text-[#FF6B35] flex items-center justify-center transition-transform active:scale-95 shadow-sm"
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

      {/* 2. MAIN ENTRANCE CONTENT (Centered & Balanced Layout) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center py-12 sm:py-16">
        {/* Entrance Welcome Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-5 py-2 rounded-full bg-white/95 border-2 border-[#FFD93D] text-[#172554] font-heading font-bold text-xs uppercase tracking-wider mb-5 shadow-sm hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-[#FF6B35]" />
          <span className="text-[#FF6B35] font-black tracking-widest">
            {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
          </span>
          <span className="text-[#FED7AA]">•</span>
          <span className="font-extrabold text-[#172554]">
            {isBangla ? "ম্যাজিক আইল্যান্ড" : "MAGIC ISLAND"}
          </span>
          <span className="text-[#FED7AA] hidden sm:inline">•</span>
          <span className="text-[#38BDF8] font-bold hidden sm:inline">
            {isBangla ? "আপনার অ্যাডভেঞ্চার গন্তব্য" : "YOUR ADVENTURE DESTINATION"}
          </span>
        </div>

        {/* HERO HEADING TYPOGRAPHY & HIERARCHY (Exact User Requirement) */}
        <div className="space-y-1 sm:space-y-2 mb-6 text-center">
          <p className="text-lg sm:text-2xl md:text-3xl font-heading font-bold text-[#172554]/85 tracking-wide uppercase">
            {isBangla ? "আনোয়ার সিটিতে স্বাগতম" : "Welcome to Anowar City"}
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading tracking-tight leading-none text-[#FF6B35] drop-shadow-[0_4px_16px_rgba(255,107,53,0.22)]">
            {isBangla ? "ম্যাজিক আইল্যান্ড" : "MAGIC ISLAND"}
          </h1>
        </div>

        {/* Supporting Tagline */}
        <p className="text-base sm:text-xl md:text-2xl text-[#3B4B75] font-heading font-medium max-w-2xl leading-relaxed mb-8 sm:mb-10">
          {isBangla
            ? "যেখানে প্রতিটি মুহূর্ত রূপ নেয় জাদুকরী রোমাঞ্চ আর অপার আনন্দে।"
            : "Where Every Moment Becomes a Magical Adventure."}
        </p>

        {/* Primary Interactive CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <a
            href="#virtual-journey"
            className="btn-park-primary text-base sm:text-lg px-8 py-3.5 sm:py-4 shadow-xl flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <Compass className="w-5 h-5 text-[#FFD93D]" />
            <span>{isBangla ? "আইল্যান্ড ঘুরে দেখুন" : "Explore the Island"}</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <Link
            href="/attractions"
            className="btn-park-secondary text-base sm:text-lg px-8 py-3.5 sm:py-4 shadow-md flex items-center gap-2.5 hover:scale-105 transition-transform"
          >
            <FerrisWheel className="w-5 h-5 text-[#FF6B35]" />
            <span>{isBangla ? "সকল আকর্ষণ ও রাইডস" : "Discover All Attractions"}</span>
          </Link>
        </div>
      </div>

      {/* Bottom Subtle Spacer */}
      <div className="h-6 w-full"></div>
    </section>
  );
}
