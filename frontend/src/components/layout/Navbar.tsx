"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function Navbar() {
  const { locale, setLocale, isBangla } = useTranslation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { href: "/", labelEn: "Home", labelBn: "হোম" },
    { href: "/attractions", labelEn: "Explore Attractions", labelBn: "সকল আকর্ষণ" },
    { href: "/gallery", labelEn: "Gallery", labelBn: "গ্যালারি" },
    { href: "/location", labelEn: "Contact", labelBn: "যোগাযোগ" },
  ];

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

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

        {/* Desktop Navigation Links with Smooth Proportional Sizing */}
        <nav
          aria-label="Site Navigation"
          className="hidden lg:flex items-center gap-2 xl:gap-2.5 flex-wrap justify-center"
        >
          {navLinks.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
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

        {/* Quick Actions (Bilingual Switcher & WhatsApp Pill) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* WhatsApp Direct Helpdesk */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            title="Inquire via WhatsApp"
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

          {/* Bilingual Switcher EN / বাংলা */}
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 rounded-3xl bg-white border-2 border-[#FED7AA] shadow-xl animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
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
                <span>WhatsApp: {businessConfig.hotlines.whatsapp}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
