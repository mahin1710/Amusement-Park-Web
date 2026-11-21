"use client";

import React from "react";
import Link from "next/link";
import { Compass, Waves, Footprints, FerrisWheel, ArrowRight, Sparkles, Play } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function ChooseAdventureSection() {
  const { isBangla } = useTranslation();

  return (
    <section
      className="pt-6 sm:pt-8 pb-12 sm:pb-16 bg-[#FFFDF5] relative"
      data-purpose="virtual-island-journey-realms"
      id="virtual-journey"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-[#FFC857] text-[#173B42] text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#087E8B]" />
            <span>{isBangla ? "একটি গন্তব্যে ৩টি রোমাঞ্চকর অ্যাডভেঞ্চার জগৎ" : "Three Wonder Realms In One Destination"}</span>
          </div>

          <h2 className="section-heading-main text-[#173B42] tracking-tight leading-tight">
            {isBangla ? "বেছে নিন আপনার" : "CHOOSE YOUR"}{" "}
            <span className="text-gradient-park">
              {isBangla ? "রোমাঞ্চকর জগত" : "ADVENTURE REALM"}
            </span>
          </h2>
        </div>

        {/* 3 Signature Experience Realms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Realm 1: WATER OASIS (Using Real Park Aerial Photo) */}
          <div className="park-card overflow-hidden flex flex-col justify-between group">
            <Link
              href="/water-park"
              className="relative h-68 overflow-hidden bg-slate-100 cursor-pointer block"
              title="Explore Water World & Experience 3D Floating Splash"
            >
              <img
                alt="Magic Island Water World featuring the largest wave pool and winding lazy river in Bangladesh"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                src="/images/Water%20World/Water%20Cover%20Pic.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173B42]/75 via-transparent to-black/10"></div>
              <div className="absolute top-4 left-4 bg-[#35C6C8] text-[#173B42] text-xs font-heading font-bold uppercase px-3.5 py-1 rounded-full tracking-wider shadow">
                {isBangla ? "বাংলাদেশের সর্ববৃহৎ ওয়েভ পুল" : "Largest Wave Pool in BD"}
              </div>

              {/* 3D Floating Animation Badge */}
              <div
                className="absolute bottom-3 left-4 text-xs text-[#173B42] font-heading font-black flex items-center gap-1.5 backdrop-blur-md bg-[#FFC857]/95 group-hover:bg-[#FFC857] px-3.5 py-1.5 rounded-full border-2 border-white shadow-lg group-hover:scale-105 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#087E8B] animate-spin" />
                <span>{isBangla ? "৩ডি ওয়াটার স্প্ল্যাশ" : "3D Floating Splash"}</span>
              </div>

              <div className="absolute bottom-3 right-4 text-xs text-white font-heading font-semibold flex items-center gap-1.5 backdrop-blur-md bg-black/50 px-3 py-1 rounded-full border border-white/20">
                <i className="fa-solid fa-camera text-[#35C6C8]"></i> {isBangla ? "আসল ড্রোন ভিউ" : "Authentic Aerial Photo"}
              </div>
            </Link>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-heading font-bold text-[#087E8B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Waves className="w-4 h-4" />
                  <span>{isBangla ? "জলরাজ্যের রোমাঞ্চ" : "Aquatic Paradise"}</span>
                </div>
                <Link
                  href="/water-park"
                  className="text-2xl sm:text-3xl font-black text-[#173B42] hover:text-[#087E8B] transition-colors cursor-pointer font-heading uppercase mb-2 flex items-center gap-2 group/title"
                  title="Explore Water World"
                >
                  <span>{isBangla ? "ওয়াটার ওয়ার্ল্ড" : "Water World"}</span>
                  <ArrowRight className="w-4 h-4 text-[#35C6C8] opacity-60 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all" />
                </Link>
                <p className="text-xs sm:text-sm text-[#173B42]/80 leading-relaxed mb-6 font-sans">
                  {isBangla
                    ? "সাগরের মতো বিশাল ঢেউ, রোমাঞ্চকর মাল্টি-লেন স্পিড স্লাইড এবং রেইনবো ব্রিজের নিচে ট্রপিক্যাল লেজি রিভারের শীতল পানিতে গা ভাসিয়ে দিন।"
                    : "Plunge into colossal computerized rolling ocean surf, conquer towering multi-lane flumes, and float through tropical lazy river canals under rainbow bridges."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-[#35C6C8]/15 text-[#087E8B] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "ওয়েভ লেগুন" : "Megawave Bay"}
                  </span>
                  <span className="bg-[#35C6C8]/15 text-[#087E8B] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "লেজি রিভার" : "Lazy River"}
                  </span>
                  <span className="bg-[#35C6C8]/15 text-[#087E8B] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "স্পিড ফ্লামস" : "Speed Flumes"}
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <Link
                  className="btn-park-primary w-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 py-3"
                  href="/water-park"
                >
                  <span>{isBangla ? "ওয়াটার পার্ক দেখুন" : "Explore Water World"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Realm 2: DINO KINGDOM */}
          <div className="park-card overflow-hidden flex flex-col justify-between group">
            <Link
              href="/dino-zone"
              className="relative h-68 overflow-hidden bg-slate-100 cursor-pointer block"
              title="Explore Dino World & Experience 3D Floating Stampede"
            >
              <img
                alt="Magic Island Dino Zone featuring prehistoric animatronic dinosaurs and elevated wooden jungle boardwalks"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                src="/images/Dino%20World/Dino%20Cover%20PIC.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173B42]/75 via-transparent to-black/10"></div>
              <div className="absolute top-4 left-4 bg-[#26865D] text-white text-xs font-heading font-bold uppercase px-3.5 py-1 rounded-full tracking-wider shadow">
                {isBangla ? "দেশের বৃহত্তম ডাইনোসর সংগ্রহ" : "Largest Dino Variety in BD"}
              </div>

              {/* 3D Floating Animation Badge */}
              <div
                className="absolute bottom-3 left-4 text-xs text-[#173B42] font-heading font-black flex items-center gap-1.5 backdrop-blur-md bg-[#FFC857]/95 group-hover:bg-[#FFC857] px-3.5 py-1.5 rounded-full border-2 border-white shadow-lg group-hover:scale-105 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#26865D] animate-spin" />
                <span>{isBangla ? "৩ডি ডাইনোসর" : "3D Dino Stampede"}</span>
              </div>
            </Link>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-heading font-bold text-[#26865D] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Footprints className="w-4 h-4" />
                  <span>{isBangla ? "প্রাগৈতিহাসিক অভিযান" : "Prehistoric Safari"}</span>
                </div>
                <Link
                  href="/dino-zone"
                  className="text-2xl sm:text-3xl font-black text-[#173B42] hover:text-[#26865D] transition-colors cursor-pointer font-heading uppercase mb-2 flex items-center gap-2 group/title"
                  title="Explore Dino World"
                >
                  <span>{isBangla ? "ডাইনো ওয়ার্ল্ড" : "Dino World"}</span>
                  <ArrowRight className="w-4 h-4 text-[#26865D] opacity-60 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all" />
                </Link>
                <p className="text-xs sm:text-sm text-[#173B42]/80 leading-relaxed mb-6 font-sans">
                  {isBangla
                    ? "৫০টিরও বেশি পূর্ণাকৃতির জীবন্ত গর্জনরত অ্যানিমেট্রনিক ডাইনোসর এবং প্রাগৈতিহাসিক রেইনফরেস্ট ট্রেইলে হারিয়ে যান জুরাসিক যুগে।"
                    : "Journey 65 million years into the past with 50+ life-sized animatronic dinosaurs, interactive walking trails, and fossil excavation labs."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-[#26865D]/15 text-[#26865D] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "টি-রেক্স এনকাউন্টার" : "T-Rex Valley"}
                  </span>
                  <span className="bg-[#26865D]/15 text-[#26865D] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "ফসিল ল্যাব" : "Fossil Dig Lab"}
                  </span>
                  <span className="bg-[#26865D]/15 text-[#26865D] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "জুরাসিক ট্রেইল" : "Jungle Boardwalk"}
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <Link
                  className="btn-park-secondary w-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 py-3"
                  href="/dino-zone"
                >
                  <span>{isBangla ? "ডাইনো জোন দেখুন" : "Explore Dino World"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Realm 3: THRILL GALAXY */}
          <div className="park-card overflow-hidden flex flex-col justify-between group">
            <Link
              href="/amusement-park"
              className="relative h-68 overflow-hidden bg-slate-100 cursor-pointer block"
              title="Explore Thrill World & Experience 3D Floating Roller Coaster"
            >
              <img
                alt="Magic Island Amusement Park thrill rides including roller coasters, spinning pendulum, and family attractions"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                src="/images/Thrill%20World/Thrill%20Cover%20Pic.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173B42]/75 via-transparent to-black/10"></div>
              <div className="absolute top-4 left-4 bg-[#FF795C] text-white text-xs font-heading font-bold uppercase px-3.5 py-1 rounded-full tracking-wider shadow">
                {isBangla ? "রোমাঞ্চকর অ্যামিউজমেন্ট রাইডস" : "Amazing Thrill Rides"}
              </div>

              {/* 3D Floating Animation Badge */}
              <div
                className="absolute bottom-3 left-4 text-xs text-[#173B42] font-heading font-black flex items-center gap-1.5 backdrop-blur-md bg-[#FFC857]/95 group-hover:bg-[#FFC857] px-3.5 py-1.5 rounded-full border-2 border-white shadow-lg group-hover:scale-105 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF795C] animate-spin" />
                <span>{isBangla ? "৩ডি কোস্টার" : "3D Coaster Rush"}</span>
              </div>
            </Link>

            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-heading font-bold text-[#FF795C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <FerrisWheel className="w-4 h-4" />
                  <span>{isBangla ? "আকাশছোঁয়া রোমাঞ্চ" : "Skyline Sensation"}</span>
                </div>
                <Link
                  href="/amusement-park"
                  className="text-2xl sm:text-3xl font-black text-[#173B42] hover:text-[#FF795C] transition-colors cursor-pointer font-heading uppercase mb-2 flex items-center gap-2 group/title"
                  title="Explore Thrill World"
                >
                  <span>{isBangla ? "থ্রিল ওয়ার্ল্ড" : "Thrill World"}</span>
                  <ArrowRight className="w-4 h-4 text-[#FF795C] opacity-60 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all" />
                </Link>
                <p className="text-xs sm:text-sm text-[#173B42]/80 leading-relaxed mb-6 font-sans">
                  {isBangla
                    ? "উচ্চগতির রোলারকোস্টার, ১৫০ ফুটের প্যানোরামিক স্কাই হুইল এবং পুরো পরিবারের জন্য ২৫টিরও বেশি আন্তর্জাতিক মানের রাইডস।"
                    : "Soar on gravity-defying steel coasters, marvel from 150-foot panoramic VIP observation wheel capsules, and race neon bumper karts."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-[#FF795C]/15 text-[#FF795C] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "মেগা কোস্টার" : "Mega Coaster"}
                  </span>
                  <span className="bg-[#FF795C]/15 text-[#FF795C] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "স্কাই হুইল" : "150ft Sky Wheel"}
                  </span>
                  <span className="bg-[#FF795C]/15 text-[#FF795C] text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    {isBangla ? "টার্বো বাম্পার" : "Bumper Arena"}
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <Link
                  className="btn-park-primary w-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 py-3"
                  href="/amusement-park"
                >
                  <span>{isBangla ? "অ্যামিউজমেন্ট রাইডস দেখুন" : "Explore Thrill World"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting description positioned below the 3 realm options */}
        <div className="text-center max-w-3xl mx-auto mt-8 sm:mt-10">
          <p className="text-[#173B42]/80 text-sm sm:text-base leading-relaxed font-sans">
            {isBangla
              ? "বিশাল ওয়েভ পুলের পানিতে শীতল হওয়া, প্রাচীন ডাইনোসরদের মুখোমুখি হওয়া কিংবা রোমহর্ষক রোলারকোস্টারের রোমাঞ্চ উপভোগ করা—ম্যাজিক আইল্যান্ডে সব সম্ভব!"
              : "Whether cooling off in massive computerized ocean waves, facing roaring prehistoric giants, or defying gravity on coasters, Magic Island delivers nonstop family joy."}
          </p>
        </div>
      </div>
    </section>
  );
}
