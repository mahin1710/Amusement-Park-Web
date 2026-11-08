"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function Footer() {
  const { isBangla } = useTranslation();
  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <footer
      className="bg-[#172554] pt-16 pb-12 text-slate-300"
      data-purpose="site-footer"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-14 sm:h-16 w-auto shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white border-2 border-[#FFD93D] shadow-md overflow-hidden">
                <img
                  src="/images/magic-island-logo.jpg"
                  alt="Anowar City Magic Island Official Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#FFD93D] uppercase font-heading leading-tight">
                  {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
                </span>
                <span className="text-xl font-bold tracking-tight text-white font-heading leading-tight flex items-center gap-1.5">
                  MAGIC ISLAND
                  <span className="inline-block w-2 h-2 rounded-full bg-[#FF6B35] animate-ping"></span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#38BDF8] uppercase font-sans leading-tight">
                  {isBangla ? "আপনার রোমাঞ্চের জাদুকরী গন্তব্য" : "YOUR ADVENTURE DESTINATION"}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-yellow-50/90 leading-relaxed max-w-sm font-sans">
              {isBangla
                ? "বাংলাদেশের শীর্ষস্থানীয় মেগা-বিনোদন পার্ক — দেশের বৃহত্তম ওয়েভ পুল, সুবিশাল প্রাগৈতিহাসিক ডাইনো জোন এবং রোমাঞ্চকর অ্যামিউজমেন্ট রাইডস এর অনন্য ঠিকানা।"
                : "Bangladesh’s ultimate mega-entertainment park home to the nation’s largest wave pool, prehistoric Dino Zone, and high-adrenaline thrill amusement rides."}
            </p>
            <div className="text-xs text-[#FFD93D] font-heading font-semibold">
              {isBangla ? "আনোয়ার সিটি ম্যাজিক আইল্যান্ড – আপনার পারিবারিক অ্যাডভেঞ্চার ঠিকানা।" : "Anowar City Magic Island – Where Every Moment Becomes a Magical Adventure."}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1877F2] border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105"
                href="https://www.facebook.com/ac.magicisland/"
                rel="noopener noreferrer"
                target="_blank"
                title="Facebook"
              >
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#55C98B] border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105"
                href={whatsappHref}
                rel="noopener noreferrer"
                target="_blank"
                title="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-[#FFD93D] mb-4">
              {isBangla ? "অ্যাডভেঞ্চার জোনসমূহ" : "Adventure Realms"}
            </h4>
            <ul className="space-y-2.5 text-xs font-heading">
              <li>
                <Link className="hover:text-[#FFD93D] transition-colors" href="/attractions">
                  {isBangla ? "সকল আকর্ষণ ও রাইডস" : "Explore All Attractions"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFD93D] transition-colors" href="/water-park">
                  {isBangla ? "ওয়াটার পার্ক (বৃহত্তম ওয়েভ পুল)" : "Water Oasis (Wave Pool)"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFD93D] transition-colors" href="/dino-zone">
                  {isBangla ? "ডাইনো জোন সাফারি" : "Dino Kingdom Safari"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFD93D] transition-colors" href="/amusement-park">
                  {isBangla ? "অ্যামিউজমেন্ট রাইডস" : "Thrill & Family Rides"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFD93D] transition-colors" href="/#resort-stay">
                  {isBangla ? "রিসোর্ট রুম ও থাকার ব্যবস্থা" : "Resort Stay & Rooms"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Visitor Support */}
          <div>
            <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-[#FFD93D] mb-4">
              {isBangla ? "দর্শনার্থী গাইড" : "Visitor Guide"}
            </h4>
            <ul className="space-y-2.5 text-xs font-heading">
              <li>
                <Link className="hover:text-[#FFD93D] transition-colors" href="/about">
                  {isBangla ? "পার্ক সম্পর্কে" : "About Magic Island"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFD93D] transition-colors" href="/gallery">
                  {isBangla ? "ছবি ও ভিডিও গ্যালারি" : "Photo & Video Gallery"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFD93D] transition-colors" href="/location">
                  {isBangla ? "পার্কের অবস্থান ও সময়সূচি" : "Directions & Hours"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-[#FFD93D] mb-4">
              {isBangla ? "যোগাযোগ" : "Get In Touch"}
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              <li className="flex items-start gap-2.5">
                <i className="fa-solid fa-location-dot text-[#38BDF8] mt-1"></i>
                <span>
                  {isBangla
                    ? "কোনাখোলা, কেরানীগঞ্জ হাইওয়ে, ঢাকা-১৩১০, বাংলাদেশ"
                    : "Konakhola, Keraniganj Highway, Dhaka-1310, Bangladesh"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-phone text-[#38BDF8]"></i>
                <a className="hover:text-white" href="tel:+8801966602745">
                  01966-602745
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-brands fa-whatsapp text-[#55C98B]"></i>
                <a className="hover:text-white" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {businessConfig.hotlines.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-clock text-[#FFD93D]"></i>
                <span>
                  {isBangla
                    ? "প্রতিদিন সকাল ১০:০০ – সন্ধ্যা ০৭:০০"
                    : "Daily 10:00 AM – 07:00 PM"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Terms */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-yellow-100/70 font-sans">
          <div>
            © {new Date().getFullYear()} Anowar City Magic Island. All rights reserved. MMH_MAHIN
          </div>
          <div className="flex items-center gap-4">
            <Link className="hover:text-white transition-colors" href="/about">
              {isBangla ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </Link>
            <span>•</span>
            <Link className="hover:text-white transition-colors" href="/about">
              {isBangla ? "ব্যবহারের শর্তাবলী" : "Terms & Conditions"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
