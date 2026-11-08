"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  Check,
  ShieldCheck,
  Clock,
  Gauge,
  Users,
  Waves,
  Footprints,
  FerrisWheel,
  Share2,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { ATTRACTIONS_DATA, Attraction } from "@/data/attractions";
import { businessConfig } from "@/config/business";

export default function AttractionDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { isBangla } = useTranslation();

  const attraction = ATTRACTIONS_DATA.find((a) => a.id === id);

  if (!attraction) {
    // If not found in data
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#FFF9ED]">
        <div className="w-16 h-16 rounded-full bg-[#FFD93D] flex items-center justify-center text-3xl mb-4">
          🎡
        </div>
        <h1 className="text-3xl font-heading font-bold text-[#172554] mb-2">
          {isBangla ? "আকর্ষণটি খুঁজে পাওয়া যায়নি" : "Attraction Not Found"}
        </h1>
        <p className="text-[#3B4B75] mb-6">
          {isBangla
            ? "অনুগ্রহ করে আমাদের আকর্ষণ তালিকা থেকে অন্য একটি রাইড বেছে নিন।"
            : "Please choose from our complete list of rides and experiences."}
        </p>
        <Link href="/attractions" className="btn-park-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>{isBangla ? "সকল আকর্ষণে ফিরে যান" : "Back to Attractions"}</span>
        </Link>
      </div>
    );
  }

  // Related attractions in the same or complementary zones
  const relatedAttractions = ATTRACTIONS_DATA.filter((a) => a.id !== attraction.id).slice(0, 3);

  // Demo preview state (Simulated interactive preview)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const zoneColorMap = {
    "water-park": {
      nameEn: "Water Oasis",
      nameBn: "ওয়াটার পার্ক",
      pillClass: "park-pill-sky",
      icon: Waves,
    },
    "dino-zone": {
      nameEn: "Dino Kingdom",
      nameBn: "ডাইনো জোন",
      pillClass: "park-pill-purple",
      icon: Footprints,
    },
    "amusement-park": {
      nameEn: "Thrill Galaxy",
      nameBn: "অ্যামিউজমেন্ট পার্ক",
      pillClass: "park-pill-orange",
      icon: FerrisWheel,
    },
  };

  const zoneMeta = zoneColorMap[attraction.zone] || zoneColorMap["amusement-park"];
  const ZoneIcon = zoneMeta.icon;

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    isBangla
      ? `হ্যালো ম্যাজিক আইল্যান্ড, আমি "${attraction.name.bn}" রাইড এবং পার্ক ভিজিট সম্পর্কে জানতে চাই।`
      : `Hello Magic Island, I want to inquire about visiting "${attraction.name.en}".`
  )}`;

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554]">
      {/* 1. ATTRACTION HERO SECTION */}
      <section className="relative min-h-[65vh] flex items-end justify-center pb-16 pt-32 overflow-hidden bg-[#172554]">
        {/* Large Background Photograph */}
        <img
          src={attraction.imageUrl}
          alt={attraction.name.en}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-105 contrast-100"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#172554] via-[#172554]/60 to-black/30"></div>

        {/* Back Link Floating in Top Left */}
        <div className="absolute top-24 left-4 sm:left-8 z-20">
          <Link
            href="/attractions"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-[#172554] font-heading font-bold text-xs shadow-md transition-transform hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF6B35]" />
            <span>{isBangla ? "সকল আকর্ষণে ফিরুন" : "Back to Attractions"}</span>
          </Link>
        </div>

        {/* Hero Content Banner */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
          {/* Zone Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-[#FFD93D] text-[#172554] font-heading font-bold text-xs uppercase tracking-wider mb-4 shadow-md">
            <ZoneIcon className="w-4 h-4 text-[#FF6B35]" />
            <span>{isBangla ? zoneMeta.nameBn : zoneMeta.nameEn}</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#0284C7]">{isBangla ? attraction.thrillLevelBn : attraction.thrillLevel}</span>
          </div>

          {/* Attraction Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight max-w-3xl leading-tight mb-4 drop-shadow-md">
            {isBangla ? attraction.name.bn : attraction.name.en}
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-xl text-yellow-100 font-heading font-medium max-w-2xl leading-relaxed mb-6">
            {isBangla ? attraction.tagline.bn : attraction.tagline.en}
          </p>

          {/* Quick Stat Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-heading font-semibold">
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>{isBangla ? attraction.heightRequirementBn : attraction.heightRequirement}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{isBangla ? "সারাদিন খোলা" : "Continuous Operations"}</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. MAIN EXPERIENCE & DETAILS BODY */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Introduction & Features (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Introduction Card */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#FED7AA] shadow-md space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#FF6B35] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#FFD93D]" />
                <span>{isBangla ? "আকর্ষণ পরিচিতি" : "About This Attraction"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#172554]">
                {isBangla ? "অবিস্মরণীয় রোমাঞ্চ ও আনন্দের অভিজ্ঞতা" : "Experience the Thrill Firsthand"}
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                {isBangla ? attraction.description.bn : attraction.description.en}
              </p>
            </div>

            {/* Key Features & Highlights */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#FED7AA] shadow-md space-y-6">
              <h3 className="text-xl font-bold font-heading text-[#172554] flex items-center gap-2">
                <span>🎯</span>
                <span>{isBangla ? "বিশেষ বৈশিষ্ট্য ও সুবিধাসমূহ" : "Key Highlights & Experience Specs"}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(isBangla ? attraction.features.bn : attraction.features.en).map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#FFF9ED] border border-[#FED7AA] flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#55C98B] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#172554] leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety & Guest Guidelines */}
            <div className="p-6 rounded-3xl bg-[#FFF7ED] border-2 border-[#FED7AA] flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shrink-0 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-heading font-bold text-[#172554]">
                  {isBangla ? "নিরাপত্তা ও রাইডার গাইডলাইন" : "Safety & Guest Guidelines"}
                </h4>
                <p className="text-xs text-[#3B4B75] leading-relaxed">
                  {isBangla
                    ? "সকল রাইডে প্রবেশের পূর্বে অপারেটরের দেওয়া নির্দেশনা মেনে চলুন। প্রয়োজনীয় নিরাপত্তা বেল্ট বা লাইফজ্যাকেট পরিধান করা বাধ্যতামূলক।"
                    : "Please listen closely to certified ride attendants. Follow all height, harness, and water safety instructions."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Demo Preview & Action Widget (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Visual Demo / Preview Section */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#FED7AA] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-heading font-bold text-[#172554] flex items-center gap-2">
                  <span>🎬</span>
                  <span>{isBangla ? "ভিজ্যুয়াল প্রিভিউ ও ঝলক" : "Visual Preview & Sensation"}</span>
                </h3>
                <span className="text-[10px] font-heading font-bold px-2.5 py-1 rounded-full bg-[#FFD93D] text-[#172554]">
                  {isBangla ? "ইন্টারেক্টিভ" : "Interactive"}
                </span>
              </div>

              {/* Demo Player Frame (Secondary & Respects No-Autoplay) */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#FED7AA] bg-[#172554] group">
                <img
                  src={attraction.imageUrl}
                  alt={`${attraction.name.en} preview`}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isPlaying ? "scale-110 blur-[1px]" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>

                {/* Simulated Ambient Motion / Player Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-[#FF6B35] hover:bg-[#FFD93D] hover:text-[#172554] text-white flex items-center justify-center shadow-xl transition-all duration-300 transform group-hover:scale-110 cursor-pointer mb-2"
                    aria-label={isPlaying ? "Pause Preview" : "Play Preview"}
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </button>

                  <p className="text-xs font-heading font-semibold text-white/90">
                    {isPlaying
                      ? isBangla
                        ? "সরাসরি রাইড আবহ চালু আছে"
                        : "Preview Ambient Mode Active"
                      : isBangla
                      ? "রাইডের ঝলক দেখতে প্লে করুন"
                      : "Click to Experience Ride Motion"}
                  </p>
                </div>

                {/* Bottom Sound Pill */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 text-xs transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-[#3B4B75] text-center italic">
                {isBangla
                  ? "আনোয়ার সিটি ম্যাজিক আইল্যান্ডের আকর্ষণসমূহের আসল আবহ ও অনুভূতি।"
                  : "Authentic atmosphere of Anowar City Magic Island attractions."}
              </p>
            </div>

            {/* Visit Inquiry Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF7ED] to-[#FFF9ED] border-2 border-[#FFD93D] shadow-md space-y-4">
              <h4 className="text-lg font-heading font-bold text-[#172554]">
                {isBangla ? "এই আকর্ষণটি উপভোগ করতে চান?" : "Want to Experience This Attraction?"}
              </h4>
              <p className="text-xs text-[#3B4B75] leading-relaxed">
                {isBangla
                  ? "পারিবারিক ভ্রমণ বা বন্ধুদের সাথে আসার জন্য আমাদের অফিসিয়াল হোয়াটসঅ্যাপে সরাসরি মেসেজ দিয়ে সময়সূচী ও বিস্তারিত জেনে নিন।"
                  : "Planning your trip with family or friends? Contact our park team directly via WhatsApp for opening hours and tips."}
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-park-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <i className="fa-brands fa-whatsapp text-base"></i>
                <span>{isBangla ? "হোয়াটসঅ্যাপে বিস্তারিত জানুন" : "Inquire via WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPLORE MORE ATTRACTIONS */}
      <section className="py-16 bg-white border-t-2 border-[#FED7AA]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF2B2] text-[#172554] text-xs font-heading font-bold mb-2">
                <Compass className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>{isBangla ? "আইল্যান্ডের আরও রোমাঞ্চ" : "Continue Your Adventure"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#172554]">
                {isBangla ? "অন্যান্য সেরা আকর্ষণসমূহ" : "Explore More Attractions"}
              </h2>
            </div>
            <Link
              href="/attractions"
              className="btn-park-outline text-xs inline-flex items-center gap-2 self-start sm:self-auto"
            >
              <span>{isBangla ? "সকল ৩৫+ রাইডস দেখুন" : "View All 35+ Rides"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedAttractions.map((item) => (
              <Link
                key={item.id}
                href={`/attractions/${item.id}`}
                className="park-card overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#172554] text-[11px] font-heading font-bold shadow">
                    {isBangla ? item.thrillLevelBn : item.thrillLevel}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-[#172554] group-hover:text-[#FF6B35] transition-colors">
                      {isBangla ? item.name.bn : item.name.en}
                    </h3>
                    <p className="text-xs text-[#3B4B75] mt-1 line-clamp-2 leading-relaxed">
                      {isBangla ? item.description.bn : item.description.en}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#FED7AA]/40 flex items-center justify-between text-xs font-heading font-bold text-[#FF6B35]">
                    <span>{isBangla ? "বিস্তারিত দেখুন" : "Explore Ride"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
