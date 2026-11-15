"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function Navbar() {
  const { locale, setLocale, isBangla } = useTranslation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 bg-[#FFF9ED]/95 backdrop-blur-md border-b-2 border-[#FED7AA]/70 transition-all duration-300 ease-in-out ${
        isScrolled ? "py-2 sm:py-2.5 shadow-md shadow-orange-950/5" : "py-3 sm:py-4 shadow-xs"
      }`}
      data-purpose="internal-page-navigation"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo & Identity with Smooth Scaling Logo Element */}
        <Link
          href="/"
          aria-label="Anowar City Magic Island Home"
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 transition-transform duration-200"
        >
          <div
            className={`shrink-0 flex items-center justify-center bg-white border-2 border-[#FFD93D] overflow-hidden group-hover:scale-105 transition-all duration-300 ease-in-out ${
              isScrolled
                ? "h-10 sm:h-11 lg:h-12 w-auto p-1 rounded-xl shadow-xs"
                : "h-12 sm:h-14 lg:h-16 w-auto p-1.5 rounded-2xl shadow-sm"
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
                  : "text-[10px] sm:text-[11px] tracking-[0.22em] mb-1"
              }`}
            >
              {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
            </span>
            <span
              className={`font-black tracking-tight text-[#172554] font-heading leading-none transition-all duration-300 ease-in-out ${
                isScrolled
                  ? "text-base sm:text-lg lg:text-xl"
                  : "text-xl sm:text-2xl"
              }`}
            >
              MAGIC ISLAND
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Modern Rounded Orange Hover */}
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
            className="hidden sm:inline-flex items-center gap-2 h-9 sm:h-10 px-3.5 sm:px-4 text-xs font-heading font-semibold rounded-full bg-[#55C98B] hover:bg-[#43B878] text-white shadow-md shadow-emerald-500/20 transition-all hover:scale-105 duration-200 whitespace-nowrap cursor-pointer"
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
            className="nav-pill-btn !h-9 sm:!h-10 !px-3 sm:!px-3.5 !text-xs cursor-pointer"
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
            className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-[#FED7AA] bg-white text-[#172554] hover:text-[#FF6B35] flex items-center justify-center transition-transform active:scale-95 shadow-sm cursor-pointer"
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
