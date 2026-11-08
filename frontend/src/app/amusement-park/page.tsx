"use client";

import React from "react";
import Link from "next/link";
import { FerrisWheel, Check, Sparkles, MessageCircle, ArrowRight, Zap } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { ATTRACTIONS_DATA } from "@/data/attractions";
import { buildWhatsAppLink } from "@/config/business";

export default function AmusementParkPage() {
  const { isBangla } = useTranslation();
  const amusementRides = ATTRACTIONS_DATA.filter((a) => a.zone === "amusement-park");

  const waLink = buildWhatsAppLink({
    packageTitle: isBangla ? "অ্যামিউজমেন্ট পার্ক তথ্য" : "Amusement Park Info",
    locale: isBangla ? "bn" : "en",
  });

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554]">
      {/* Hero Banner with Authentic Amusement Park Photography */}
      <section className="relative h-[72vh] min-h-[540px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/magic-island-thrill.jpg"
          alt="Amusement Park Rollercoaster"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-105 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9ED] via-[#FFF9ED]/30 to-[#172554]/40"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 text-[#FF6B35] text-xs sm:text-sm font-black uppercase tracking-wider mb-5 shadow-lg border border-[#FF6B35]/40 backdrop-blur-md">
            <FerrisWheel className="w-4 h-4 text-[#FF6B35]" />
            <span>{isBangla ? "গ্যালাক্সি থ্রিলস অ্যামিউজমেন্ট পার্ক" : "Galaxy Thrills Amusement Park"}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] font-heading leading-tight tracking-tight">
            {isBangla ? "উচ্চগতির রোমাঞ্চ ও" : "HIGH-VELOCITY THRILLS &"} <br />
            <span className="text-[#FFD93D] drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
              {isBangla ? "আকাশছোঁয়া রোলারকোস্টার" : "SKYLINE MEGA COASTERS"}
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] max-w-2xl mx-auto leading-relaxed">
            {isBangla
              ? "১৪০ ফুট উচ্চতা থেকে খাড়া ড্রপ ও ইনভার্সনযুক্ত মেগা কোস্টার, ১৫০ ফুটের প্যানোরামিক স্কাই হুইল এবং আধুনিক ইলেকট্রিক বাম্পার কারের আনন্দ।"
              : "Defy gravity on our signature hypercoaster, soak in 360-degree vistas from the 150-foot VIP Observation Wheel, and race electric bumper karts."}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#rides"
              className="btn-park-primary px-7 py-3.5 rounded-full text-sm font-black uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isBangla ? "রাইডস এক্সপ্লোর করুন" : "Explore Rides"}</span>
            </Link>

            {waLink.isConfigured && (
              <a
                href={waLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-white text-[#172554] font-black text-sm uppercase tracking-wider flex items-center gap-2 border-2 border-[#55C98B] hover:bg-[#55C98B]/10 shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#55C98B]" />
                <span>{isBangla ? "হোয়াটসঅ্যাপে যোগাযোগ" : "WhatsApp Inquiry"}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section id="rides" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFEDD5] text-[#FF6B35] text-xs uppercase tracking-widest font-black mb-3 border border-[#FF6B35]/40">
            <FerrisWheel className="w-4 h-4" />
            <span>{isBangla ? "মেকানিক্যাল রাইডস" : "Signature Thrill Rides"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#172554] font-heading tracking-tight">
            {isBangla ? "অ্যামিউজমেন্ট পার্কের সেরা রাইডস" : "SIGNATURE AMUSEMENT RIDES"}
          </h2>
          <p className="mt-3 text-[#172554]/75 text-sm sm:text-base leading-relaxed font-medium">
            {isBangla
              ? "আন্তর্জাতিক নিরাপত্তা প্রত্যয়ন ও কম্পিউটারাইজড ম্যাগনেটিক সিকিউরিটি সিস্টেমে নির্মিত আধুনিক রাইডস।"
              : "Manufactured to rigorous international amusement engineering standards with magnetic fail-safe locks."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amusementRides.map((ride) => (
            <div
              key={ride.id}
              className="park-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={ride.imageUrl}
                  alt={ride.name.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/70 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 text-[#FF6B35] text-xs font-black shadow-md border border-amber-200">
                  {isBangla ? ride.thrillLevelBn : ride.thrillLevel}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#172554] font-heading">
                    {isBangla ? ride.name.bn : ride.name.en}
                  </h3>
                  <p className="text-xs font-black text-[#FF6B35] mt-1 uppercase tracking-wide">
                    {isBangla ? ride.tagline.bn : ride.tagline.en}
                  </p>
                  <p className="mt-3 text-sm text-[#172554]/80 leading-relaxed font-medium">
                    {isBangla ? ride.description.bn : ride.description.en}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-100 space-y-2 text-xs text-[#172554]/80">
                  <p className="font-black text-[#172554]">
                    {isBangla ? "রাইডের বৈশিষ্ট্য:" : "Ride Specs & Highlights:"}
                  </p>
                  {(isBangla ? ride.features.bn : ride.features.en).slice(0, 2).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FF6B35] shrink-0 font-bold" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-amber-100 flex justify-end">
                  <Link
                    href={`/attractions/${ride.id}`}
                    className="btn-park-primary w-full py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>{isBangla ? "বিস্তারিত দেখুন" : "View Details"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Night Spectacular & Illumination Section */}
      <section className="py-16 bg-white border-y border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="park-card rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#FFF9ED]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#FF6B35] uppercase tracking-wider">
                <Zap className="w-4 h-4 text-[#FF6B35]" />
                <span>{isBangla ? "সান্ধ্যকালীন মিউজিক্যাল শো" : "Evening Illumination & Stunts"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#172554] font-heading">
                {isBangla ? "সূর্যাস্তের পর রঙিন আলোর জাদুকরী রূপ" : "Nightfall Spectacles & Stunt Shows"}
              </h3>
              <p className="text-xs sm:text-sm text-[#172554]/80 max-w-xl leading-relaxed font-medium">
                {isBangla
                  ? "সন্ধ্যা নামলেই স্কাই হুইল এবং রোলারকোস্টার জুড়ে জ্বলে ওঠে লক্ষাধিক রঙিন এলইডি বাতি। সাথে উপভোগ করুন সেন্ট্রাল লেকে লেজার ও মিউজিক্যাল ফোয়ারা শো।"
                  : "As darkness falls, Magic Island transforms into a glowing wonderland with 200,000+ synchronized LED fixtures and lakeside laser shows."}
              </p>
            </div>

            <div className="shrink-0">
              {waLink.isConfigured && (
                <a
                  href={waLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-park-primary px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isBangla ? "হোয়াটসঅ্যাপে যোগাযোগ" : "WhatsApp Inquiry"}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
