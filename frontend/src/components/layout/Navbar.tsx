"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Sparkles, MessageCircle, Globe, Menu, X } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function Navbar() {
  const { locale, setLocale, isBangla } = useTranslation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "bn" : "en");
  };

  // Simple, focused 5-item navigation per amusement park design direction
  const navLinks = [
    { href: "/", labelEn: "Home", labelBn: "হোম" },
    { href: "/attractions", labelEn: "Explore Attractions", labelBn: "সকল আকর্ষণ" },
    { href: "/about", labelEn: "About Magic Island", labelBn: "আমাদের সম্পর্কে" },
    { href: "/gallery", labelEn: "Gallery", labelBn: "গ্যালারি" },
    { href: "/location", labelEn: "Contact & Visit", labelBn: "যোগাযোগ ও তথ্য" },
  ];

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav h-20"
      data-purpose="site-navigation"
      id="main-navigation"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Brand Logo & Identity */}
        <Link
          href="/"
          aria-label="Anowar City Magic Island Home"
          className="flex items-center gap-3 group shrink-0"
        >
          {/* Official Logo Frame */}
          <div className="h-12 w-auto shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white border-2 border-[#FFD93D] shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <img
              src="/images/magic-island-logo.jpg"
              alt="Anowar City Magic Island Official Logo"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Brand Typography */}
          <div className="flex flex-col justify-center">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#FF6B35] uppercase font-heading leading-none mb-1">
              {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
            </span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#172554] font-heading leading-none flex items-center gap-1.5">
              MAGIC ISLAND
              <span className="inline-block w-2 h-2 rounded-full bg-[#FFD93D] animate-ping"></span>
            </span>
            <span className="text-[9px] font-semibold tracking-wider text-[#38BDF8] uppercase font-sans leading-none mt-1 hidden sm:block">
              {isBangla ? "আপনার রোমাঞ্চের জাদুকরী গন্তব্য" : "YOUR ADVENTURE DESTINATION"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1.5 xl:gap-2 h-full"
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

        {/* Quick Actions (WhatsApp & Bilingual Switcher) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* WhatsApp Direct Helpdesk */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            title="Inquire via WhatsApp"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4 text-xs font-heading font-semibold rounded-full bg-[#55C98B] hover:bg-[#43B878] text-white shadow-md shadow-emerald-500/20 transition-all duration-200 whitespace-nowrap"
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
            className="h-10 px-3.5 text-xs font-heading font-semibold rounded-full border-2 border-[#FED7AA] bg-white text-[#172554] hover:border-[#FF6B35] transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>
              {locale === "en" ? (
                <>
                  <span className="font-bold text-[#FF6B35]">EN</span> |{" "}
                  <span className="font-bangla text-slate-500">বাংলা</span>
                </>
              ) : (
                <>
                  <span className="text-slate-500">EN</span> |{" "}
                  <span className="font-bangla font-bold text-[#FF6B35]">বাংলা</span>
                </>
              )}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 rounded-full border-2 border-[#FED7AA] bg-white text-[#172554] hover:text-[#FF6B35] flex items-center justify-center transition-colors shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF9ED] border-b-2 border-[#FED7AA] px-4 py-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl font-heading text-sm font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/20"
                      : "text-[#172554] hover:bg-white"
                  }`}
                >
                  <span>{isBangla ? item.labelBn : item.labelEn}</span>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-[#FED7AA]/60 flex flex-col gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#55C98B] text-white font-heading font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>WhatsApp Helpline: {businessConfig.hotlines.whatsapp}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
