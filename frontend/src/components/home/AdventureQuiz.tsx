"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, Users, Flame, ArrowRight, CheckCircle2, Ticket } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { BOOKING_CONFIG } from "@/config/booking";

type GroupType = "family" | "friends" | "couple" | "group";
type VibeType = "thrill" | "water" | "dino" | "chill";

interface Recommendation {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  matchingPackageId: string;
  highlightsEn: string[];
  highlightsBn: string[];
}

export function AdventureQuiz() {
  const { t, isBangla } = useTranslation();
  const [selectedGroup, setSelectedGroup] = useState<GroupType>("family");
  const [selectedVibe, setSelectedVibe] = useState<VibeType>("water");

  // Dynamic itinerary logic
  const getRecommendation = (): Recommendation => {
    if (selectedVibe === "water") {
      return {
        titleEn: "Aqua Splashes & Waves Expedition",
        titleBn: "উত্তাল জলকেলি ও ওয়েভ সাফারি প্ল্যান",
        descEn: "Start your morning catching gigantic surf at Tsunami Bay, conquer the Tornado funnel slide, and spend the afternoon lounging on the tropical lazy river.",
        descBn: "সকালে সুনামি বে-র বিশাল ঢেউয়ে গা ভাসানো দিয়ে শুরু করুন, দুপুরে সাইক্লোন স্লাইডের চ্যালেঞ্জ নিন এবং বিকেলে শান্ত লেজি রিভারে ভেসে বেড়ান।",
        matchingPackageId: "pkg_water_park_splash",
        highlightsEn: ["Tsunami Wave Pool", "Mega Tornado Funnel", "Pirates Kid Fortress", "Lazy River Float"],
        highlightsBn: ["সুনামি ওয়েভ পুল", "মেগা টর্নেডো ফানেল", "পাইরেটস স্প্ল্যাশ ক্যাসেল", "লেজি রিভার টিউব ক্রুজ"],
      };
    }
    if (selectedVibe === "dino") {
      return {
        titleEn: "Prehistoric Jurassic Explorer Odyssey",
        titleBn: "প্রাগৈতিহাসিক জুরাসিক অ্যাডভেঞ্চার প্ল্যান",
        descEn: "Encounter life-sized roaring animatronic dinos, ride the high-speed Raptor launch coaster, and unearth ancient fossils with the kids.",
        descBn: "জীবন্ত গর্জনরত ডাইনোসরদের ট্রেইল ভ্রমণ, ক্ষিপ্র গতির ভেলোসিরাপটর কোস্টারে চড়া এবং শিশুদের নিয়ে ফসিল খনন গবেষণাগারে দারুণ অভিযান।",
        matchingPackageId: "pkg_dino_amusement_combo",
        highlightsEn: ["Apex T-Rex Encounter", "Velociraptor Coaster", "Fossil Dig Sand Lab", "4D Dino Cinema"],
        highlightsBn: ["বিশাল টি-রেক্স সাক্ষাৎ", "ভেলোসিরাপটর স্প্রিন্ট", "ফসিল খনন স্যান্ড ল্যাব", "৪-ডি ডাইনো সিনেমা"],
      };
    }
    if (selectedVibe === "thrill") {
      return {
        titleEn: "Ultimate Adrenaline Kingdom Circuit",
        titleBn: "চরম রোমাঞ্চ ও হাই-স্পিড কিংডম প্ল্যান",
        descEn: "Maximize heart rates with the Galaxy Cyclone vertical drop coaster, the Mega Tornado water flume, and the Raptor magnetic launch coaster.",
        descBn: "গ্যালাক্সি সাইক্লোনের ১৪০ ফুট খাড়া ড্রপ, মেগা টর্নেডোর শূন্য-মাধ্যাকর্ষণ এবং ভেলোসিরাপটর স্প্রিন্টের সমন্বয়ে সেরা অ্যাড্রেনালিন সার্কিট।",
        matchingPackageId: "pkg_super_all_access",
        highlightsEn: ["Galaxy Cyclone Coaster", "Mega Tornado Water Slide", "Raptor Launch Coaster", "Turbo Bumper Arena"],
        highlightsBn: ["গ্যালাক্সি সাইক্লোন কোস্টার", "মেগা টর্নেডো স্লাইড", "র‍্যাপটর হাই-স্পিড লঞ্চ", "টার্বো বাম্পার গ্র্যান্ড প্রিক্স"],
      };
    }
    // chill / romantic
    return {
      titleEn: "Scenic Panorama & Wonder Promenade",
      titleBn: "প্যানোরামিক স্কাইলাইন ও মনোরম রিফ্রেশিং প্ল্যান",
      descEn: "Take in 360-degree sunset panoramas from the air-conditioned 150-ft Sky Wheel, cruise the lazy river, and watch the grand evening musical fountain.",
      descBn: "১৫০ ফুট উঁচু এসি স্কাই হুইল থেকে চারপাশের অপরূপ সূর্যাস্ত দেখা, শান্ত লেজি রিভারে গা ভাসানো এবং সন্ধ্যায় চোখ ধাঁধানো ফোয়ারা শো উপভোগ।",
      matchingPackageId: "pkg_super_all_access",
      highlightsEn: ["150ft Sky Observation Wheel", "Tropical Lazy River Cruise", "Dino Botanical Trail", "Musical Laser Fountain"],
      highlightsBn: ["১৫০ ফুট স্কাই হুইল ভিউ", "ট্রপিক্যাল লেজি রিভার", "ডাইনো বোটানিক্যাল ট্রেইল", "মিউজিক্যাল লেজার ফোয়ারা শো"],
    };
  };

  const recommendation = getRecommendation();
  const matchedPkg = BOOKING_CONFIG.availablePackages.find((p) => p.id === recommendation.matchingPackageId) || BOOKING_CONFIG.availablePackages[0];

  return (
    <section className="py-20 relative bg-slate-950 overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{t("adventureQuiz.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t("adventureQuiz.title")}
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t("adventureQuiz.subtitle")}
          </p>
        </div>

        {/* Interactive Selector Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="space-y-8">
            {/* Step 1: Group Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>{t("adventureQuiz.groupLabel")}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "family" as GroupType, label: t("adventureQuiz.groupFamily"), icon: "👨‍👩‍👧‍👦" },
                  { id: "friends" as GroupType, label: t("adventureQuiz.groupFriends"), icon: "🏄‍♂️" },
                  { id: "couple" as GroupType, label: t("adventureQuiz.groupCouple"), icon: "✨" },
                  { id: "group" as GroupType, label: t("adventureQuiz.groupCorporate"), icon: "🚌" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGroup(item.id)}
                    className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all ${
                      selectedGroup === item.id
                        ? "bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-950/50 scale-[1.02]"
                        : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-white"
                    }`}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-center">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Vibe Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>{t("adventureQuiz.vibeLabel")}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: "thrill" as VibeType, label: t("adventureQuiz.vibeThrill"), badge: "Extreme" },
                  { id: "water" as VibeType, label: t("adventureQuiz.vibeWater"), badge: "Splash" },
                  { id: "dino" as VibeType, label: t("adventureQuiz.vibeDino"), badge: "Jurassic" },
                  { id: "chill" as VibeType, label: t("adventureQuiz.vibeChill"), badge: "Scenic" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedVibe(item.id)}
                    className={`text-left p-3.5 rounded-2xl border transition-all ${
                      selectedVibe === item.id
                        ? "bg-gradient-to-br from-amber-500/20 to-rose-500/20 border-amber-400 text-white shadow-lg shadow-amber-950/50 scale-[1.02]"
                        : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-white"
                    }`}
                  >
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-amber-300 mb-2">
                      {item.badge}
                    </span>
                    <div className="text-xs sm:text-sm font-semibold">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Result Showcase Banner */}
            <div className="pt-4 border-t border-white/10">
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950 border border-cyan-500/30 p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {t("adventureQuiz.recommendedPlan")}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {isBangla ? recommendation.titleBn : recommendation.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                      {isBangla ? recommendation.descBn : recommendation.descEn}
                    </p>

                    {/* Highlights chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {(isBangla ? recommendation.highlightsBn : recommendation.highlightsEn).map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation Action Column */}
                  <div className="lg:w-72 shrink-0 p-5 rounded-2xl bg-slate-950/70 border border-white/10 text-center space-y-4">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {isBangla ? "প্রস্তাবিত টিকেট পাস" : "Recommended Pass"}
                      </span>
                      <h4 className="text-sm font-bold text-amber-300 mt-0.5">
                        {isBangla ? matchedPkg.title.bn : matchedPkg.title.en}
                      </h4>
                      <div className="mt-1 flex items-baseline justify-center gap-1">
                        <span className="text-2xl font-black text-white">
                          ৳{matchedPkg.pricing.adultPriceBDT.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">
                          {isBangla ? "/ জন" : "/ adult"}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/booking?package=${matchedPkg.id}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-cyan-950/50 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>{t("adventureQuiz.viewPass")}</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

