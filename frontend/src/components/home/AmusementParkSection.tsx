"use client";

import React from "react";
import Link from "next/link";
import { FerrisWheel, Zap, ArrowRight, Sparkles, Camera } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function AmusementParkSection() {
  const { isBangla } = useTranslation();

  const rides = [
    {
      id: "galaxy-cyclone-rollercoaster",
      nameEn: "Cyclone Mega Coaster",
      nameBn: "সাইক্লোন মেগা কোস্টার",
      thrillEn: "Extreme Thrill • 90 km/h",
      thrillBn: "চরম রোমাঞ্চ • ৯০ কিমি/ঘণ্টা",
      descEn:
        "High-altitude loops and stomach-dropping freefalls designed for maximum adrenaline seekers.",
      descBn:
        "আকাশচুম্বী ড্রপ এবং লুপের মধ্য দিয়ে তীব্রগতির রোমাঞ্চকর রোলারকোস্টার অভিজ্ঞতা।",
      emoji: "🎢",
      accent: "border-[#FF6B35]",
      badgeBg: "bg-[#FFF7ED] text-[#C2410C]",
    },
    {
      id: "grand-skylight-ferris-wheel",
      nameEn: "150ft Panoramic Sky Wheel",
      nameBn: "১৫০ ফুট প্যানোরামিক স্কাই হুইল",
      thrillEn: "Family Panoramic • VIP AC",
      thrillBn: "পারিবারিক আনন্দ • ভিআইপি এসি গন্ডোলা",
      descEn:
        "36 enclosed air-conditioned luxury glass capsules soaring 150ft for 360-degree vistas.",
      descBn:
        "১৫০ ফুট উঁচুতে ৩৬টি শীতাতপ নিয়ন্ত্রিত গ্লাস ক্যাপসুল থেকে উপভোগ করুন পুরো পার্কের অপূর্ব দৃশ্য।",
      emoji: "🎡",
      accent: "border-[#38BDF8]",
      badgeBg: "bg-[#F0F9FF] text-[#0369A1]",
    },
    {
      id: "turbo-bumper-grand-prix",
      nameEn: "Turbo Bumper Grand Prix",
      nameBn: "টার্বো বাম্পার গ্র্যান্ড প্রিক্স",
      thrillEn: "Interactive • Neon Floors",
      thrillBn: "ইন্টারেক্টিভ • নিওন ডজিং কার",
      descEn:
        "High-energy electric floor track bumper cars featuring glowing neon LED underglow.",
      descBn:
        "রঙিন নিয়ন লাইটে সজ্জিত ফ্লোরে বন্ধুদের সাথে ধাক্কাধাক্কির অনাবিল মজার বাম্পার কার।",
      emoji: "🚗",
      accent: "border-[#55C98B]",
      badgeBg: "bg-[#F0FDF4] text-[#15803D]",
    },
    {
      id: "pirate-ship-voyager",
      nameEn: "Pirate Swing Ship",
      nameBn: "পাইরেট সুইং শিপ",
      thrillEn: "High Thrill • Weightless Swing",
      thrillBn: "রোমাঞ্চকর দোলনা • ওয়েটলেস সুইং",
      descEn:
        "Swinging 75 degrees in the air creating thrilling zero-gravity stomach butterflies.",
      descBn:
        "শূন্যে ৭৫ ডিগ্রি কোণে তীব্র গতিতে দোলা পাইরেট জাহাজে চড়ে উপভোগ করুন রোমাঞ্চ।",
      emoji: "⚓",
      accent: "border-[#8B5CF6]",
      badgeBg: "bg-[#FAF5FF] text-[#6D28D9]",
    },
  ];

  return (
    <section
      className="py-12 sm:py-16 bg-[#FFF9ED] relative"
      data-purpose="amusement-park-showcase"
      id="amusement-park"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#C2410C] text-xs font-heading font-bold uppercase tracking-wider mb-3 border-2 border-[#FED7AA] shadow-xs">
              <FerrisWheel className="w-4 h-4 text-[#FF6B35]" />
              <span>{isBangla ? "আন্তর্জাতিক মানের রোমাঞ্চকর রাইডস" : "World-Class Amusement Rides"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#172554] font-heading tracking-tight">
              {isBangla ? "অ্যামিউজমেন্ট পার্ক:" : "AMUSEMENT PARK:"}{" "}
              <span className="text-[#FF6B35]">
                {isBangla ? "থ্রিল ও ফ্যামিলি রাইডস" : "THRILL & FAMILY RIDES"}
              </span>
            </h2>
            <p className="text-[#3B4B75] text-sm sm:text-base mt-2 max-w-2xl font-sans leading-relaxed">
              {isBangla
                ? "হৃৎস্পন্দন বাড়িয়ে দেওয়া উচ্চগতির রোলারকোস্টার থেকে শুরু করে পুরো পরিবারের একসাথে আনন্দ উপভোগের ২৫টিরও বেশি আন্তর্জাতিক মানের রাইডস।"
                : "From gravity-defying steel coasters and giant observation wheels to electric bumper karts, discover non-stop entertainment crafted for every age."}
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/attractions"
              className="btn-park-primary text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <span>{isBangla ? "সকল রাইডস দেখুন (২৫+)" : "View All 25+ Rides"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Featured Ride Cards with dedicated attraction links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rides.map((ride, idx) => (
            <Link
              key={idx}
              href={`/attractions/${ride.id}`}
              className="park-card p-6 flex flex-col justify-between group cursor-pointer h-full"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF9ED] border-2 border-[#FED7AA] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs">
                  {ride.emoji}
                </div>
                <div className={`inline-block text-[11px] font-heading font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 ${ride.badgeBg}`}>
                  {isBangla ? ride.thrillBn : ride.thrillEn}
                </div>
                <h3 className="text-xl font-bold font-heading text-[#172554] group-hover:text-[#FF6B35] transition-colors mb-2 leading-tight">
                  {isBangla ? ride.nameBn : ride.nameEn}
                </h3>
                <p className="text-xs text-[#3B4B75] leading-relaxed font-sans">
                  {isBangla ? ride.descBn : ride.descEn}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#FED7AA]/50 flex items-center justify-between text-xs font-heading font-bold text-[#FF6B35]">
                <span>{isBangla ? "রাইডের বিস্তারিত দেখুন" : "View Dedicated Page"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Real Photo Snapshot Strip */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#FED7AA] shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-[#FFEDD5] text-[#FF6B35] flex items-center justify-center font-bold shadow-xs">
                <Camera className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-heading font-black text-lg text-[#172554]">
                  {isBangla ? "থ্রিল ওয়ার্ল্ডের আসল দৃশ্যপট" : "Authentic Thrill World Snapshots"}
                </h4>
                <p className="text-xs text-[#3B4B75]">
                  {isBangla
                    ? "আনোয়ার সিটি ম্যাজিক আইল্যান্ডের আকর্ষণীয় মেকানিক্যাল রাইডস ও দর্শনার্থীদের মুহূর্ত"
                    : "Real rides & carnival atmosphere at Anowar City Magic Island"}
                </p>
              </div>
            </div>
            <Link
              href="/amusement-park"
              className="px-5 py-2.5 rounded-full bg-[#FFF9ED] hover:bg-[#FFEDD5] text-[#172554] font-heading font-bold text-xs flex items-center gap-2 transition-colors border border-[#FED7AA]"
            >
              <span>{isBangla ? "থ্রিল পার্ক পেজে যান" : "Explore Thrill Park"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF6B35]" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                src: "/images/Thrill%20World/Thrill%20Cover%20Pic.png",
                titleEn: "Thrill World Panorama",
                titleBn: "থ্রিল ওয়ার্ল্ড প্যানোরামা",
              },
              {
                src: "/images/Thrill%20World/Thrill-1.webp",
                titleEn: "Sky High Coaster",
                titleBn: "আকাশছোঁয়া রোলারকোস্টার",
              },
              {
                src: "/images/Thrill%20World/Thrill-4.webp",
                titleEn: "Flying Chair Swings",
                titleBn: "ফ্লাইং চেয়ার সুইং",
              },
              {
                src: "/images/Thrill%20World/Thrill-5.png",
                titleEn: "Pirate Ocean Voyager",
                titleBn: "পাইরেট ওশান ভয়েজার",
              },
            ].map((pic, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-[#FED7AA] aspect-4/3 bg-slate-100"
              >
                <img
                  src={pic.src}
                  alt={pic.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-heading font-bold">
                    {isBangla ? pic.titleBn : pic.titleEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
