"use client";

import React from "react";
import Link from "next/link";
import { Compass, Waves, Footprints, FerrisWheel, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function ChooseAdventureSection() {
  const { isBangla } = useTranslation();

  return (
    <section
      className="py-24 bg-[#FFF9ED] relative"
      data-purpose="virtual-island-journey-realms"
      id="virtual-journey"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FFD93D] text-[#172554] text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
            <span>{isBangla ? "একটি গন্তব্যে ৩টি রোমাঞ্চকর অ্যাডভেঞ্চার জগৎ" : "Three Wonder Realms In One Destination"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#172554] font-heading tracking-tight">
            {isBangla ? "বেছে নিন আপনার" : "CHOOSE YOUR"}{" "}
            <span className="text-gradient-park">
              {isBangla ? "রোমাঞ্চকর জগত" : "ADVENTURE REALM"}
            </span>
          </h2>
        </div>

        {/* 3 Signature Experience Realms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Realm 1: WATER OASIS (Using Real Park Aerial Photo) */}
          <div className="park-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-68 overflow-hidden bg-slate-100">
              <img
                alt="Magic Island Water World featuring the largest wave pool and winding lazy river in Bangladesh"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                src="/images/Water%20World/Water%20Cover%20Pic.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/75 via-transparent to-black/10"></div>
              <div className="absolute top-4 left-4 bg-[#38BDF8] text-[#172554] text-xs font-heading font-bold uppercase px-3.5 py-1 rounded-full tracking-wider shadow">
                {isBangla ? "বাংলাদেশের সর্ববৃহৎ ওয়েভ পুল" : "Largest Wave Pool in BD"}
              </div>
              <div className="absolute bottom-3 right-4 text-xs text-white font-heading font-semibold flex items-center gap-1.5 backdrop-blur-md bg-black/50 px-3 py-1 rounded-full border border-white/20">
                <i className="fa-solid fa-camera text-[#38BDF8]"></i> {isBangla ? "আসল ড্রোন ভিউ" : "Authentic Aerial Photo"}
              </div>
            </div>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-heading font-bold text-[#0284C7] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Waves className="w-4 h-4" />
                  <span>{isBangla ? "জলরাজ্যের রোমাঞ্চ" : "Aquatic Paradise"}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#172554] font-heading uppercase mb-2">
                  {isBangla ? "ওয়াটার ওয়ার্ল্ড" : "Water World"}
                </h3>
                <p className="text-xs sm:text-sm text-[#3B4B75] leading-relaxed mb-6 font-sans">
                  {isBangla
                    ? "সাগরের মতো বিশাল ঢেউ, রোমাঞ্চকর মাল্টি-লেন স্পিড স্লাইড এবং রেইনবো ব্রিজের নিচে ট্রপিক্যাল লেজি রিভারের শীতল পানিতে গা ভাসিয়ে দিন।"
                    : "Plunge into colossal computerized rolling ocean surf, conquer towering multi-lane flumes, and float through tropical lazy river canals under rainbow bridges."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-[#E0F2FE] text-[#0369A1] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "ওয়েভ লেগুন" : "Megawave Bay"}
                  </span>
                  <span className="bg-[#E0F2FE] text-[#0369A1] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "লেজি রিভার" : "Lazy River"}
                  </span>
                  <span className="bg-[#E0F2FE] text-[#0369A1] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "স্পিড ফ্লামস" : "Speed Flumes"}
                  </span>
                </div>
              </div>

              <Link
                className="btn-park-primary w-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
                href="/water-park"
              >
                <span>{isBangla ? "ওয়াটার পার্ক ঘুরে দেখুন" : "Explore Water World"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Realm 2: DINO KINGDOM */}
          <div className="park-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-68 overflow-hidden bg-slate-100">
              <img
                alt="Magic Island Dino Zone featuring prehistoric animatronic dinosaurs and elevated wooden jungle boardwalks"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                src="/images/Dino%20World/Dino%20Cover%20PIC.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/75 via-transparent to-black/10"></div>
              <div className="absolute top-4 left-4 bg-[#8B5CF6] text-white text-xs font-heading font-bold uppercase px-3.5 py-1 rounded-full tracking-wider shadow">
                {isBangla ? "দেশের বৃহত্তম ডাইনোসর সংগ্রহ" : "Largest Dino Variety in BD"}
              </div>
            </div>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-heading font-bold text-[#7C3AED] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Footprints className="w-4 h-4" />
                  <span>{isBangla ? "প্রাগৈতিহাসিক অভিযান" : "Prehistoric Safari"}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#172554] font-heading uppercase mb-2">
                  {isBangla ? "ডাইনো ওয়ার্ল্ড" : "Dino World"}
                </h3>
                <p className="text-xs sm:text-sm text-[#3B4B75] leading-relaxed mb-6 font-sans">
                  {isBangla
                    ? "৫০টিরও বেশি পূর্ণাকৃতির জীবন্ত গর্জনরত অ্যানিমেট্রনিক ডাইনোসর এবং প্রাগৈতিহাসিক রেইনফরেস্ট ট্রেইলে হারিয়ে যান জুরাসিক যুগে।"
                    : "Journey 65 million years into the past with 50+ life-sized animatronic dinosaurs, interactive walking trails, and fossil excavation labs."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-[#F3E8FF] text-[#6D28D9] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "টি-রেক্স এনকাউন্টার" : "T-Rex Valley"}
                  </span>
                  <span className="bg-[#F3E8FF] text-[#6D28D9] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "ফসিল ল্যাব" : "Fossil Dig Lab"}
                  </span>
                  <span className="bg-[#F3E8FF] text-[#6D28D9] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "জুরাসিক ট্রেইল" : "Jungle Boardwalk"}
                  </span>
                </div>
              </div>

              <Link
                className="btn-park-secondary w-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
                href="/dino-zone"
              >
                <span>{isBangla ? "ডাইনো জোন ঘুরে দেখুন" : "Explore Dino World"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Realm 3: THRILL GALAXY */}
          <div className="park-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-68 overflow-hidden bg-slate-100">
              <img
                alt="Magic Island Amusement Park thrill rides including roller coasters, spinning pendulum, and family attractions"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                src="/images/Thrill%20World/Thrill%20Cover%20Pic.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/75 via-transparent to-black/10"></div>
              <div className="absolute top-4 left-4 bg-[#FF6B35] text-white text-xs font-heading font-bold uppercase px-3.5 py-1 rounded-full tracking-wider shadow">
                {isBangla ? "রোমাঞ্চকর অ্যামিউজমেন্ট রাইডস" : "Amazing Thrill Rides"}
              </div>
            </div>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-heading font-bold text-[#C2410C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <FerrisWheel className="w-4 h-4" />
                  <span>{isBangla ? "আকাশছোঁয়া রোমাঞ্চ" : "Skyline Sensation"}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#172554] font-heading uppercase mb-2">
                  {isBangla ? "থ্রিল ওয়ার্ল্ড" : "Thrill World"}
                </h3>
                <p className="text-xs sm:text-sm text-[#3B4B75] leading-relaxed mb-6 font-sans">
                  {isBangla
                    ? "উচ্চগতির রোলারকোস্টার, ১৫০ ফুটের প্যানোরামিক স্কাই হুইল এবং পুরো পরিবারের জন্য ২৫টিরও বেশি আন্তর্জাতিক মানের রাইডস।"
                    : "Soar on gravity-defying steel coasters, marvel from 150-foot panoramic VIP observation wheel capsules, and race neon bumper karts."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-[#FFEDD5] text-[#9A3412] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "মেগা কোস্টার" : "Mega Coaster"}
                  </span>
                  <span className="bg-[#FFEDD5] text-[#9A3412] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "স্কাই হুইল" : "150ft Sky Wheel"}
                  </span>
                  <span className="bg-[#FFEDD5] text-[#9A3412] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "টার্বো বাম্পার" : "Bumper Arena"}
                  </span>
                </div>
              </div>

              <Link
                className="btn-park-primary w-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
                href="/amusement-park"
              >
                <span>{isBangla ? "অ্যামিউজমেন্ট রাইডস দেখুন" : "Explore Thrill World"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Supporting description positioned below the 3 realm options */}
        <div className="text-center max-w-3xl mx-auto mt-12">
          <p className="text-[#3B4B75] text-sm sm:text-base leading-relaxed font-sans">
            {isBangla
              ? "বিশাল ওয়েভ পুলের পানিতে শীতল হওয়া, প্রাচীন ডাইনোসরদের মুখোমুখি হওয়া কিংবা রোমহর্ষক রোলারকোস্টারের রোমাঞ্চ উপভোগ করা—ম্যাজিক আইল্যান্ডে সব সম্ভব!"
              : "Whether cooling off in massive computerized ocean waves, facing roaring prehistoric giants, or defying gravity on coasters, Magic Island delivers nonstop family joy."}
          </p>
        </div>
      </div>
    </section>
  );
}
