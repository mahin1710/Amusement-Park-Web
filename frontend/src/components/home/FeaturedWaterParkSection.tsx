"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Waves, Sparkles, ArrowRight, Camera } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function FeaturedWaterParkSection() {
  const { isBangla } = useTranslation();
  const [activePin, setActivePin] = useState<number | null>(null);

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section
      className="py-20 sm:py-24 bg-[#FFF9ED] relative overflow-hidden border-y-2 border-[#FED7AA]/70"
      data-purpose="featured-water-park-showcase"
      id="water-park"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0284C7] text-xs uppercase tracking-widest font-heading font-bold mb-3 border-2 border-[#BAE6FD] shadow-xs">
              <Waves className="w-4 h-4 text-[#0284C7]" />
              <span>{isBangla ? "স্বাক্ষরিত প্রধান আকর্ষণ" : "Signature Attraction"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#172554] font-heading tracking-tight">
              {isBangla ? "বাংলাদেশের সর্ববৃহৎ" : "BANGLADESH'S LARGEST"}{" "}
              <span className="text-[#0284C7]">
                {isBangla ? "ওয়েভ পুল" : "WAVE POOL"}
              </span>
            </h2>
            <p className="text-[#3B4B75] text-sm sm:text-base mt-2 max-w-2xl font-sans leading-relaxed">
              {isBangla
                ? "আমাদের আসল পার্কের ড্রোন ফটোগ্রাফি: সাগরসদৃশ বিশাল ওয়েভ বেসিন, ট্রপিক্যাল লেজি রিভার, রেইনবো ব্রিজ এবং বহু লেনের স্পিড স্লাইড।"
                : "Captured directly from our actual resort aerial photography: explore our gigantic ocean bay, winding lazy river, rainbow bridges, and multi-lane speed flumes."}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs text-[#0284C7] font-heading font-bold bg-white px-4 py-2.5 rounded-full border-2 border-[#BAE6FD] shadow-sm">
              <i className="fa-solid fa-expand mr-1.5"></i>{" "}
              {isBangla ? "১০,০০০+ বর্গফুট ওয়াটার বেসিন" : "10,000+ SQ FT WATER BASIN"}
            </span>
          </div>
        </div>

        {/* Centerpiece Interactive Real Aerial Photo Showcase */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#FED7AA] shadow-2xl mb-12 group bg-white">
          <img
            alt="Real photo of Magic Island wave pool, lazy river, rainbow bridges, and water slides"
            className="w-full h-[450px] sm:h-[540px] md:h-[620px] object-cover object-center"
            src="/images/Water%20World/Water%20Cover%20Pic.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/80 via-transparent to-black/10 pointer-events-none"></div>

          {/* Hotspot Callout 1: Megawave Bay */}
          <div className="absolute top-[38%] left-[42%] -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className="relative group/pin cursor-pointer"
              onClick={() => setActivePin(activePin === 1 ? null : 1)}
            >
              <span className="flex h-9 w-9 relative items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-7 w-7 bg-[#0284C7] text-white text-xs font-bold items-center justify-center shadow-lg border-2 border-white">
                  1
                </span>
              </span>
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 rounded-2xl bg-white/95 border-2 border-[#BAE6FD] shadow-xl text-left transition-opacity duration-200 ${activePin === 1
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 group-hover/pin:opacity-100 pointer-events-none"
                  }`}
              >
                <div className="text-[11px] font-heading font-bold text-[#0284C7] uppercase">
                  {isBangla ? "জোন ০১: মেগাওয়েভ বে" : "Zone 01: Megawave Bay"}
                </div>
                <div className="text-xs font-heading font-bold text-[#172554] mt-0.5">
                  {isBangla ? "সাগর-গ্রেড ঢেউ ও মৃদু সৈকত" : "Ocean-Grade Swells"}
                </div>
                <div className="text-[11px] text-[#3B4B75] mt-1 leading-normal font-sans">
                  {isBangla
                    ? "নরম বালুকাময় সাদা সৈকত স্লোপ এবং ৪ ফুট পর্যন্ত কৃত্রিম ঢেউ।"
                    : "Soft gradual sandy-white beach entry & up to 4ft waves."}
                </div>
              </div>
            </div>
          </div>

          {/* Hotspot Callout 2: Twisting High-Speed Flumes */}
          <div className="absolute top-[28%] right-[16%] z-10">
            <div
              className="relative group/pin cursor-pointer"
              onClick={() => setActivePin(activePin === 2 ? null : 2)}
            >
              <span className="flex h-9 w-9 relative items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-7 w-7 bg-[#FF6B35] text-white text-xs font-bold items-center justify-center shadow-lg border-2 border-white">
                  2
                </span>
              </span>
              <div
                className={`absolute bottom-full right-0 mb-3 w-56 p-4 rounded-2xl bg-white/95 border-2 border-[#FED7AA] shadow-xl text-left transition-opacity duration-200 ${activePin === 2
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 group-hover/pin:opacity-100 pointer-events-none"
                  }`}
              >
                <div className="text-[11px] font-heading font-bold text-[#FF6B35] uppercase">
                  {isBangla ? "জোন ০২: স্পিড স্লাইডার টাওয়ার" : "Zone 02: High-Speed Flumes"}
                </div>
                <div className="text-xs font-heading font-bold text-[#172554] mt-0.5">
                  {isBangla ? "বহু রঙের রোমাঞ্চকর স্লাইড" : "Twisting Rainbow Slides"}
                </div>
                <div className="text-[11px] text-[#3B4B75] mt-1 leading-normal font-sans">
                  {isBangla
                    ? "৪৫ ফুট উঁচু টাওয়ার থেকে শুরু হওয়া ৪টি আলাদা স্পিড স্লাইডার।"
                    : "4 parallel racing flumes with high-G banked turns."}
                </div>
              </div>
            </div>
          </div>

          {/* Hotspot Callout 3: Tropical Lazy River */}
          <div className="absolute bottom-[50%] left-[64%] z-10">
            <div
              className="relative group/pin cursor-pointer"
              onClick={() => setActivePin(activePin === 3 ? null : 3)}
            >
              <span className="flex h-9 w-9 relative items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55C98B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-7 w-7 bg-[#059669] text-white text-xs font-bold items-center justify-center shadow-lg border-2 border-white">
                  3
                </span>
              </span>
              <div
                className={`absolute bottom-full left-0 mb-3 w-56 p-4 rounded-2xl bg-white/95 border-2 border-emerald-200 shadow-xl text-left transition-opacity duration-200 ${activePin === 3
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 group-hover/pin:opacity-100 pointer-events-none"
                  }`}
              >
                <div className="text-[11px] font-heading font-bold text-[#059669] uppercase">
                  {isBangla ? "জোন ০৩: লেজি রিভার ক্যানাল" : "Zone 03: Lazy River Canal"}
                </div>
                <div className="text-xs font-heading font-bold text-[#172554] mt-0.5">
                  {isBangla ? "শান্ত স্রোত ও রেইনবো ব্রিজ" : "Rainbow Bridge Waterway"}
                </div>
                <div className="text-[11px] text-[#3B4B75] mt-1 leading-normal font-sans">
                  {isBangla
                    ? "টিউবে ভেসে ভেসে পুরো পার্ক প্রদক্ষিণ করার নিরিবিলি ক্যানাল।"
                    : "Float on tubes under vibrant rainbow footbridges."}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Photo Caption Bar */}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#FED7AA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#172554] text-xs shadow-md">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-sm font-bold shadow-xs">
                <Camera className="w-4 h-4" />
              </span>
              <div>
                <span className="font-heading font-bold text-[#172554] block">
                  {isBangla ? "অফিসিয়াল এরিয়াল ড্রোন ফটোগ্রাফি" : "Official Aerial Drone Snapshot"}
                </span>
                <span className="text-[11px] text-[#3B4B75]">
                  {isBangla
                    ? "ম্যাজিক আইল্যান্ড ওয়াটার পার্কের বাস্তব দৃশ্যপট • কেরানীগঞ্জ, ঢাকা"
                    : "Real Magic Island Water Park Grounds • Keraniganj, Dhaka"}
                </span>
              </div>
            </div>
            <Link
              href="/gallery"
              className="px-4 py-2 rounded-full bg-[#FFF9ED] hover:bg-[#FFF2B2] text-[#172554] font-heading font-bold text-xs flex items-center gap-1.5 transition-colors border border-[#FED7AA]"
            >
              <span>{isBangla ? "পূর্ণ গ্যালারি দেখুন" : "View Full Gallery"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Real Water World Photo Snapshot Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { src: "/images/Water%20World/Water-2.png", titleEn: "Lazy River Canal & Wave Basin", titleBn: "লেজি রিভার ও ওয়াটার বেসিন" },
            { src: "/images/Water%20World/Water-4.png", titleEn: "Mega Speed Slide Tower", titleBn: "স্পিড স্লাইডার টাওয়ার" },
            { src: "/images/Water%20World/Water-7.png", titleEn: "Kids Splash Fortress", titleBn: "কিডস স্প্ল্যাশ ফোর্ট্রেস" },
            { src: "/images/Water%20World/Water-5.webp", titleEn: "Multi-Lane Racing Flumes", titleBn: "মাল্টি-লেন রেসিং স্লাইড" },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden border-2 border-[#FED7AA] shadow-sm hover:shadow-md transition-all duration-300 h-36 sm:h-44 bg-white"
            >
              <img
                src={item.src}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-heading font-bold drop-shadow-sm">
                  {isBangla ? item.titleBn : item.titleEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Feature Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white border-2 border-[#FED7AA] space-y-2.5 shadow-sm hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-2xl shadow-xs">
              🌊
            </div>
            <h4 className="text-base font-heading font-bold text-[#172554]">
              {isBangla ? "১০,০০০+ বর্গফুট আয়তন" : "10,000+ Sq Ft Basin"}
            </h4>
            <p className="text-xs text-[#3B4B75] leading-relaxed font-sans">
              {isBangla
                ? "একসাথে কয়েক হাজার দর্শনার্থী নিরাপদে কৃত্রিম সাগরের উত্তাল ঢেউ উপভোগ করতে পারেন।"
                : "Spacious enough for thousands to comfortably enjoy computerized ocean swells."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-[#FED7AA] space-y-2.5 shadow-sm hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center text-2xl shadow-xs">
              🏄
            </div>
            <h4 className="text-base font-heading font-bold text-[#172554]">
              {isBangla ? "৪৫ ফুট উঁচু স্পিড স্লাইডার" : "45ft High Speed Slides"}
            </h4>
            <p className="text-xs text-[#3B4B75] leading-relaxed font-sans">
              {isBangla
                ? "চার লেনের ওপেন ও ক্লোজড স্পিড স্লাইডার দিয়ে চোখের পলকে পানিতে ঝাঁপিয়ে পড়ার রোমাঞ্চ।"
                : "Multi-lane thrill flumes with spiraling loops and high-velocity splash exits."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-[#FED7AA] space-y-2.5 shadow-sm hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#059669] flex items-center justify-center text-2xl shadow-xs">
              🌴
            </div>
            <h4 className="text-base font-heading font-bold text-[#172554]">
              {isBangla ? "৬০০ মিটার ট্রপিক্যাল লেজি রিভার" : "600m Lazy River"}
            </h4>
            <p className="text-xs text-[#3B4B75] leading-relaxed font-sans">
              {isBangla
                ? "নরম পানির স্রোতে টিউব ভাসিয়ে রেইনবো ব্রিজের নিচ দিয়ে ঘুরে বেড়ানোর অপূর্ব অনুভূতি।"
                : "Gentle tropical current meandering under scenic footbridges and palm canopies."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-[#FED7AA] space-y-2.5 shadow-sm hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center text-2xl shadow-xs">
              🛡️
            </div>
            <h4 className="text-base font-heading font-bold text-[#172554]">
              {isBangla ? "আন্তর্জাতিক লাইফগার্ড ও ফিল্ট্রেশন" : "Certified Lifeguards"}
            </h4>
            <p className="text-xs text-[#3B4B75] leading-relaxed font-sans">
              {isBangla
                ? "২৪ ঘণ্টা স্বয়ংক্রিয় অতিবেগুনী ওয়াটার ফিল্ট্রেশন এবং সার্বক্ষণিক লাইফগার্ড নিরাপত্তা।"
                : "Continuous UV multi-layer water purification and certified lifeguard safety."}
            </p>
          </div>
        </div>

        {/* Bottom Feature CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#55C98B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-heading font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>{isBangla ? "প্রধান জলরাজ্য" : "Signature Aquatic Oasis"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              {isBangla ? "ওয়াটার পার্কের ঢেউয়ে মেতে উঠতে চান?" : "Ready to Splash in the Mega Wave Pool?"}
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl font-sans">
              {isBangla
                ? "দেশের সর্ববৃহৎ ওয়েভ পুল ও স্পিড স্লাইডারের আকর্ষণীয় পেজ বিস্তারিত দেখুন অথবা যেকোনো তথ্যে হোয়াটসঅ্যাপে কথা বলুন।"
                : "Explore complete photos, ride specifications, and safety guidelines on its dedicated attraction page."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/attractions/tsunami-wave-pool"
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-white text-[#0284C7] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#FFF9ED] shadow-md text-center transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>{isBangla ? "আকর্ষণ পেজ দেখুন" : "View Attraction Page"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-3.5 rounded-full bg-[#172554]/60 hover:bg-[#172554]/80 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 border border-white/30 transition-transform hover:scale-105"
            >
              <i className="fa-brands fa-whatsapp text-sm text-[#FFD93D]"></i>
              <span>{isBangla ? "হোয়াটসঅ্যাপে প্রশ্ন করুন" : "WhatsApp Inquiry"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
