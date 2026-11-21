"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Waves, Footprints, FerrisWheel, ArrowRight, Compass, Sparkles, Play } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { ATTRACTIONS_DATA } from "@/data/attractions";
import { DinoStampedeFloatingEffect } from "@/components/animations/DinoStampedeFloatingEffect";
import { RollerCoasterFloatingEffect } from "@/components/animations/RollerCoasterFloatingEffect";

type CategoryKey = "water-world" | "dino-world" | "thrill-world";

interface CategoryMeta {
  id: CategoryKey;
  zone: "water-park" | "dino-zone" | "amusement-park";
  nameEn: string;
  nameBn: string;
  taglineEn: string;
  taglineBn: string;
  descriptionEn: string;
  descriptionBn: string;
  icon: React.ComponentType<{ className?: string }>;
  themeColor: string;
  activeBorder: string;
  activeBg: string;
  badgeBg: string;
  realmHref: string;
  realmLabelEn: string;
  realmLabelBn: string;
}

export default function AttractionsPage() {
  const { isBangla } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("water-world");
  const [activeFloatingEffect, setActiveFloatingEffect] = useState<CategoryKey | null>(null);

  const categories: (CategoryMeta & { animationTagEn: string; animationTagBn: string })[] = [
    {
      id: "water-world",
      zone: "water-park",
      nameEn: "Water World",
      nameBn: "ওয়াটার ওয়ার্ল্ড",
      taglineEn: "Bangladesh's Largest Wave Pool & Tsunami Bay",
      taglineBn: "বাংলাদেশের সর্ববৃহৎ কৃত্রিম ওয়েভ পুল ও সুনামি বে",
      descriptionEn: "Experience massive ocean surges, computerized tidal surf waves, and joyful shallow family splash lagoons.",
      descriptionBn: "বিশাল সামুদ্রিক উত্তাল ঢেউয়ের পুল, সুনামি বে এবং পুরো পরিবারের অনাবিল জলকেলির স্বর্গরাজ্য।",
      icon: Waves,
      themeColor: "text-[#087E8B]",
      activeBorder: "border-[#35C6C8] ring-4 ring-[#35C6C8]/25 shadow-lg",
      activeBg: "bg-[#35C6C8]/10",
      badgeBg: "bg-[#087E8B] text-white",
      realmHref: "/water-park",
      realmLabelEn: "Explore Water World Realm",
      realmLabelBn: "ওয়াটার ওয়ার্ল্ড রিয়েলম দেখুন",
      animationTagEn: "",
      animationTagBn: "",
    },
    {
      id: "dino-world",
      zone: "dino-zone",
      nameEn: "Dino World",
      nameBn: "ডাইনো ওয়ার্ল্ড",
      taglineEn: "Lifesize Roaring Animatronics & Jurassic Safari",
      taglineBn: "২৫+ জীবন্ত গর্জনরত অ্যানিমেট্রনিক ডাইনোসর ও জুরাসিক সাফারি",
      descriptionEn: "Encounter 45-foot animatronic predators, elevated canopy trails, interactive fossil digs, and prehistoric wonders.",
      descriptionBn: "৪৫ ফুট উঁচু জীবন্ত গর্জনরত টি-রেক্স, ঝুলন্ত ফুটব্রিজ ট্রেইল ও খুদে প্রত্নতাত্ত্বিকদের ফসিল ল্যাব।",
      icon: Footprints,
      themeColor: "text-[#00C9A7]",
      activeBorder: "border-[#00C9A7] ring-4 ring-[#00C9A7]/25 shadow-lg",
      activeBg: "bg-[#C4FCEF]/30",
      badgeBg: "bg-[#00C9A7] text-[#173B42]",
      realmHref: "/dino-zone",
      realmLabelEn: "Explore Dino World Realm",
      realmLabelBn: "ডাইনো ওয়ার্ল্ড রিয়েলম দেখুন",
      animationTagEn: "🦖 3D Animated T-Rex Dinosaur",
      animationTagBn: "🦖 ৩ডি অ্যানিমেটেড টি-রেক্স ডাইনোসর",
    },
    {
      id: "thrill-world",
      zone: "amusement-park",
      nameEn: "Thrill World",
      nameBn: "থ্রিল ওয়ার্ল্ড",
      taglineEn: "High-Velocity Coasters, Sky Wheel & Family Rides",
      taglineBn: "আকাশছোঁয়া রোলারকোস্টার, ১৫০ ফুটের স্কাই হুইল ও কার্নিভাল রাইডস",
      descriptionEn: "Defy gravity on steel looping coasters, panoramic 360-degree observation wheels, neon dodging karts, and pirate pendulums.",
      descriptionBn: "উচ্চগতির রোলারকোস্টার, ১৫০ ফুট প্যানোরামিক স্কাই হুইল, নিওন বাম্পার কার ও রোমাঞ্চকর পাইরেট সুইং।",
      icon: FerrisWheel,
      themeColor: "text-[#845EC2]",
      activeBorder: "border-[#845EC2] ring-4 ring-[#845EC2]/25 shadow-lg",
      activeBg: "bg-[#D65DB1]/10",
      badgeBg: "bg-[#845EC2] text-white",
      realmHref: "/amusement-park",
      realmLabelEn: "Explore Thrill World Realm",
      realmLabelBn: "থ্রিল ওয়ার্ল্ড রিয়েলম দেখুন",
      animationTagEn: "🎢 3D Coaster Loop Rush",
      animationTagBn: "🎢 ৩ডি রোলারকোস্টার লুপ",
    },
  ];

  const handleCategorySelect = (catId: CategoryKey) => {
    setSelectedCategory(catId);
    if (catId !== "water-world") {
      setActiveFloatingEffect(catId);
    } else {
      setActiveFloatingEffect(null);
    }
  };

  const currentCategoryMeta = categories.find((c) => c.id === selectedCategory) || categories[0];
  const currentAttractions = ATTRACTIONS_DATA.filter((a) => a.zone === currentCategoryMeta.zone);

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#173B42] py-16 relative">
      {/* 100% Transparent Floating Animation Across the Screen */}
      {activeFloatingEffect === "dino-world" && (
        <DinoStampedeFloatingEffect onComplete={() => setActiveFloatingEffect(null)} />
      )}
      {activeFloatingEffect === "thrill-world" && (
        <RollerCoasterFloatingEffect onComplete={() => setActiveFloatingEffect(null)} />
      )}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FFC857] shadow-sm mb-4">
            <Compass className="w-4 h-4 text-[#FF795C]" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#173B42]">
              {isBangla ? "সকল রাইডস ও আকর্ষণসমূহ" : "Explore All Attractions"}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-[#173B42] tracking-tight leading-tight">
            {isBangla ? (
              <>
                রোমাঞ্চ ও আনন্দের <br />
                <span className="text-gradient-park">অফুরন্ত আকর্ষণীয় জগৎ</span>
              </>
            ) : (
              <>
                Discover Every Wonder at <br />
                <span className="text-gradient-park">Anowar City Magic Island</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-[#173B42]/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            {isBangla
              ? "নিচের ৩টি প্রধান ক্যাটাগরি থেকে ঘুরে দেখুন বাংলাদেশের সর্ববৃহৎ কৃত্রিম ওয়েভ পুল, জীবন্ত ডাইনোসর সাফারি এবং আকাশছোঁয়া রোলারকোস্টার।"
              : "Explore our premier attractions organized across three core realms: Water World, Dino World, and Thrill World. Click any ride to view its full details."}
          </p>
        </div>

        {/* 3 Main Categories Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = ATTRACTIONS_DATA.filter((a) => a.zone === cat.zone).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`text-left p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? `${cat.activeBorder} ${cat.activeBg} bg-white shadow-xl scale-[1.02]`
                    : "border-[#087E8B]/20 bg-white hover:border-[#FFC857] hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* 3D Animated Feature Badge (Only for zones with 3D animation) */}
                {cat.animationTagEn ? (
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-heading font-black bg-amber-100/80 text-amber-900 border border-amber-300/60 shadow-2xs group-hover:bg-[#FFC857] group-hover:text-[#173B42] transition-colors">
                      <Sparkles className="w-3 h-3 text-[#FF795C]" />
                      <span>{isBangla ? cat.animationTagBn : cat.animationTagEn}</span>
                    </span>
                  </div>
                ) : (
                  <div className="mb-3 h-6" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                        isSelected ? cat.badgeBg : "bg-[#FFFDF5] border-2 border-[#087E8B]/20"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? "text-white" : cat.themeColor}`} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-heading font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFFDF5] border border-[#087E8B]/20 text-[#173B42]">
                        {idx + 1}. {isBangla ? `${count}টি আকর্ষণ` : `${count} Rides`}
                      </span>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#26865D] animate-pulse"></span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#173B42] tracking-tight group-hover:text-[#087E8B] transition-colors">
                    {isBangla ? cat.nameBn : cat.nameEn}
                  </h3>

                  <p className="text-xs font-heading font-bold text-[#FF795C] mt-1 line-clamp-1">
                    {isBangla ? cat.taglineBn : cat.taglineEn}
                  </p>

                  <p className="mt-2.5 text-xs text-[#173B42]/75 leading-relaxed line-clamp-2 font-sans">
                    {isBangla ? cat.descriptionBn : cat.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-[#087E8B]/15 flex items-center justify-between text-xs font-heading font-black">
                  <span className={isSelected ? cat.themeColor : "text-[#173B42]/75"}>
                    {isSelected
                      ? (isBangla ? "অ্যানিমেশন চলছে / প্রদর্শিত হচ্ছে" : "Click to Replay Cartoon")
                      : (isBangla ? "দেখতে ক্লিক করুন" : "Click to View")}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF795C] opacity-0 group-hover:opacity-100 transition-opacity">
                      ▶ Play 3D
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? `${cat.themeColor} translate-x-1` : "text-[#173B42]/50 group-hover:translate-x-1"
                      }`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Header Banner with 3D Cartoon Player */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#087E8B]/20 shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${currentCategoryMeta.badgeBg}`}>
              {React.createElement(currentCategoryMeta.icon, { className: "w-7 h-7 text-white" })}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-heading font-black uppercase tracking-wider text-[#FF795C] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isBangla ? "নির্বাচিত ক্যাটাগরি" : "Selected Category"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#173B42]">
                {isBangla ? currentCategoryMeta.nameBn : currentCategoryMeta.nameEn}
              </h2>
              <p className="text-xs sm:text-sm text-[#173B42]/75 mt-1 font-sans">
                {isBangla ? currentCategoryMeta.taglineBn : currentCategoryMeta.taglineEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Play 3D Cartoon Animation Button */}
            <button
              type="button"
              onClick={() => setActiveFloatingEffect(currentCategoryMeta.id)}
              className="px-5 py-2.5 rounded-full bg-[#FF914D] hover:bg-[#FF914D]/90 text-white font-heading font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer border-2 border-white"
              title="Watch floating 3D cartoon animation across page"
            >
              <Play className="w-4 h-4 fill-current text-white" />
              <span>{isBangla ? "৩ডি কার্টুন দেখুন" : "Play 3D Cartoon"}</span>
            </button>

            <Link
              href={currentCategoryMeta.realmHref}
              className="btn-park-primary text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
            >
              <span>{isBangla ? currentCategoryMeta.realmLabelBn : currentCategoryMeta.realmLabelEn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Attractions Grid for the Selected Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentAttractions.map((ride) => (
            <Link
              key={ride.id}
              href={`/attractions/${ride.id}`}
              className="park-card overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative h-64 w-full overflow-hidden bg-[#FFFDF5]">
                <img
                  src={ride.imageUrl}
                  alt={ride.name.en}
                  className="w-full h-[calc(100%+2px)] -top-[1px] object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12304A]/80 via-transparent to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 text-[#173B42] text-xs font-heading font-bold shadow-md">
                    {isBangla ? ride.thrillLevelBn : ride.thrillLevel}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-heading font-black uppercase shadow-md ${currentCategoryMeta.badgeBg}`}>
                    {isBangla ? currentCategoryMeta.nameBn : currentCategoryMeta.nameEn}
                  </span>
                </div>

                {/* Dedicated Page Indicator Badge in Bottom Right */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#087E8B] font-heading font-bold text-[11px] shadow flex items-center gap-1 group-hover:bg-[#087E8B] group-hover:text-white transition-colors">
                  <span>{isBangla ? "সম্পূর্ণ পেজ দেখুন" : "View Page"}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#173B42] group-hover:text-[#087E8B] transition-colors leading-tight">
                    {isBangla ? ride.name.bn : ride.name.en}
                  </h3>
                  <p className="text-xs font-heading font-semibold text-[#FF795C] mt-1 line-clamp-1">
                    {isBangla ? ride.tagline.bn : ride.tagline.en}
                  </p>
                  <p className="mt-2.5 text-xs text-[#173B42]/75 leading-relaxed line-clamp-3 font-sans">
                    {isBangla ? ride.description.bn : ride.description.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#087E8B]/15 flex items-center justify-between text-xs">
                  <span className="text-[#173B42]/70 text-[11px] font-sans">
                    {isBangla ? ride.heightRequirementBn : ride.heightRequirement}
                  </span>
                  <span className="font-heading font-bold text-[#087E8B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{isBangla ? "বিস্তারিত" : "Explore"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
