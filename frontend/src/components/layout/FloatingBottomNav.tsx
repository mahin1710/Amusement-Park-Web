"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/context/LanguageContext";

export function FloatingBottomNav() {
  const { isBangla } = useTranslation();
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/",
      labelEn: "Home",
      labelBn: "হোম",
      isActive: (path: string) => path === "/",
    },
    {
      href: "/attractions",
      labelEn: "Explore Attractions",
      labelBn: "সকল আকর্ষণ",
      isActive: (path: string) =>
        path.startsWith("/attractions") ||
        path === "/amusement-park" ||
        path === "/water-park" ||
        path === "/dino-zone",
    },
    {
      href: "/gallery",
      labelEn: "Gallery",
      labelBn: "গ্যালারি",
      isActive: (path: string) => path.startsWith("/gallery"),
    },
    {
      href: "/location",
      labelEn: "Contact",
      labelBn: "যোগাযোগ",
      isActive: (path: string) => path.startsWith("/location"),
    },
  ];

  return (
    <div
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[calc(100vw-1.5rem)] sm:max-w-none"
      data-purpose="floating-bottom-navigation"
    >
      <nav
        aria-label="Floating Navigation Dock"
        className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#FF914D]/25 shadow-[0_10px_30px_rgba(255,145,77,0.16)] transition-all duration-300"
      >
        {navLinks.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 font-heading text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                active
                  ? "bg-[#FF914D] text-white border-2 border-[#FF914D] shadow-md shadow-[#FF914D]/35 scale-102"
                  : "text-[#173B42] border-2 border-transparent hover:text-[#FF914D] hover:bg-[#FFFDF5] hover:border-[#FF914D]/20"
              }`}
            >
              <span>{isBangla ? item.labelBn : item.labelEn}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
