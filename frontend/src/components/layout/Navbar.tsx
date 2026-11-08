"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function Navbar() {
  const { locale, setLocale, isBangla } = useTranslation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { href: "/about", labelEn: "About Us", labelBn: "আমাদের সম্পর্কে" },
    { href: "/gallery", labelEn: "Gallery", labelBn: "গ্যালারি" },
    { href: "/location", labelEn: "Contact", labelBn: "যোগাযোগ" },
  ];

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <header
      className="relative z-30 w-full py-4 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] border-b-2 border-[#FED7AA]/70 shadow-xs"
      data-purpose="internal-page-navigation"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Identity */}
        <Link
          href="/"
          aria-label="Anowar City Magic Island Home"
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="h-12 sm:h-14 w-auto shrink-0 flex items-center justify-center p-1.5 rounded-2xl bg-white border-2 border-[#FFD93D] shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <img
              src="/images/magic-island-logo.jpg"
              alt="Anowar City Magic Island Official Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#FF6B35] uppercase font-heading leading-none mb-1">
              {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#172554] font-heading leading-none">
              MAGIC ISLAND
            </span>
          </div>
        </Link>

        {/* Desktop Rounded Navigation Pill Buttons */}
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
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4 text-xs font-heading font-semibold rounded-full bg-[#55C98B] hover:bg-[#43B878] text-white shadow-md shadow-emerald-500/20 transition-all hover:scale-105 duration-200 whitespace-nowrap cursor-pointer"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 rounded-full border-2 border-[#FED7AA] bg-white text-[#172554] hover:text-[#FF6B35] flex items-center justify-center transition-transform active:scale-95 shadow-sm"
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
                <span>WhatsApp: {businessConfig.hotlines.whatsapp}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
