"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function FeaturedWaterParkSection() {
  const { isBangla } = useTranslation();
  const [activePin, setActivePin] = useState<number | null>(null);

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section
      className="py-24 bg-white relative overflow-hidden border-y border-slate-200"
      data-purpose="featured-water-park-showcase"
      id="water-park"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs uppercase tracking-widest font-bold mb-3 border border-sky-200">
              <i className="fa-solid fa-water text-sky-600"></i>{" "}
              {isBangla ? "স্বাক্ষরিত প্রধান আকর্ষণ" : "Signature Attraction"}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase font-heading tracking-tight">
              {isBangla ? "বাংলাদেশের সর্ববৃহৎ" : "BANGLADESH'S LARGEST"}{" "}
              <span className="gradient-aqua-text">
                {isBangla ? "ওয়েভ পুল" : "WAVE POOL"}
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-medium leading-relaxed">
              {isBangla
                ? "আমাদের আসল পার্কের ড্রোন ফটোগ্রাফি: হৃদয়াকৃতির সাগরসদৃশ ওয়েভ বেসিন, ট্রপিক্যাল লেজি রিভার, রেইনবো ব্রিজ এবং বহু লেনের স্পিড স্লাইড।"
                : "Captured directly from our actual resort aerial photography: explore our gigantic ocean bay, winding lazy river, rainbow bridges, and multi-lane speed flumes."}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-sky-800 font-bold bg-sky-50 px-3.5 py-2 rounded-xl border border-sky-200 shadow-sm">
              <i className="fa-solid fa-expand mr-1.5 text-sky-600"></i>{" "}
              {isBangla ? "১০,০০০+ বর্গফুট ওয়াটার বেসিন" : "10,000+ SQ FT WATER BASIN"}
            </span>
          </div>
        </div>

        {/* Centerpiece Interactive Real Aerial Photo Showcase */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl mb-12 group">
          <img
            alt="Real aerial photo of Magic Island wave pool, lazy river, rainbow bridges, and water slides"
            className="w-full h-[520px] md:h-[620px] object-cover object-center"
            src="/images/magic-island-waterpark-aerial.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10"></div>

          {/* Hotspot Callout 1: Megawave Bay */}
          <div className="absolute top-[38%] left-[42%] -translate-x-1/2 -translate-y-1/2">
            <div
              className="relative group/pin cursor-pointer"
              onClick={() => setActivePin(activePin === 1 ? null : 1)}
            >
              <span className="flex h-8 w-8 relative items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-600 text-white text-xs font-bold items-center justify-center shadow-lg border-2 border-white">
                  1
                </span>
              </span>
              {/* Tooltip Card */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xl text-left transition-opacity duration-200 ${
                  activePin === 1
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-90 group-hover/pin:opacity-100 pointer-events-none"
                }`}
              >
                <div className="text-[11px] font-bold text-sky-700 uppercase">
                  {isBangla ? "জোন ০১: মেগাওয়েভ বে" : "Zone 01: Megawave Bay"}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">
                  {isBangla ? "সাগর-গ্রেড ঢেউ ও মৃদু সৈকত" : "Ocean-Grade Swells"}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 leading-normal">
                  {isBangla
                    ? "নরম বালুকাময় সাদা সৈকত স্লোপ এবং ৪ ফুট পর্যন্ত কৃত্রিম ঢেউ।"
                    : "Soft gradual sandy-white beach entry & up to 4ft waves."}
                </div>
              </div>
            </div>
          </div>

          {/* Hotspot Callout 2: Twisting High-Speed Flumes */}
          <div className="absolute top-[28%] right-[16%]">
            <div
              className="relative group/pin cursor-pointer"
              onClick={() => setActivePin(activePin === 2 ? null : 2)}
            >
              <span className="flex h-8 w-8 relative items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A24] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-[#FF7A24] text-white text-xs font-bold items-center justify-center shadow-lg border-2 border-white">
                  2
                </span>
              </span>
              {/* Tooltip Card */}
              <div
                className={`absolute bottom-full right-0 mb-3 w-56 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xl text-left transition-opacity duration-200 ${
                  activePin === 2
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-90 group-hover/pin:opacity-100 pointer-events-none"
                }`}
              >
                <div className="text-[11px] font-bold text-[#FF7A24] uppercase">
                  {isBangla ? "জোন ০২: স্পিড স্লাইডার টাওয়ার" : "Zone 02: High-Speed Flumes"}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">
                  {isBangla ? "বহু রঙের রোমাঞ্চকর স্লাইড" : "Twisting Rainbow Slides"}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 leading-normal">
                  {isBangla
                    ? "৪৫ ফুট উঁচু টাওয়ার থেকে শুরু হওয়া আঁকাবাঁকা ও দ্রুতগতির ৪টি আলাদা স্লাইডার।"
                    : "4 parallel racing flumes with high-G banked turns."}
                </div>
              </div>
            </div>
          </div>

          {/* Hotspot Callout 3: Tropical Lazy River & Rainbow Bridges */}
          <div className="absolute bottom-[24%] left-[28%]">
            <div
              className="relative group/pin cursor-pointer"
              onClick={() => setActivePin(activePin === 3 ? null : 3)}
            >
              <span className="flex h-8 w-8 relative items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-600 text-white text-xs font-bold items-center justify-center shadow-lg border-2 border-white">
                  3
                </span>
              </span>
              {/* Tooltip Card */}
              <div
                className={`absolute bottom-full left-0 mb-3 w-56 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xl text-left transition-opacity duration-200 ${
                  activePin === 3
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-90 group-hover/pin:opacity-100 pointer-events-none"
                }`}
              >
                <div className="text-[11px] font-bold text-emerald-700 uppercase">
                  {isBangla ? "জোন ০৩: লেজি রিভার ক্যানাল" : "Zone 03: Lazy River Canal"}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">
                  {isBangla ? "শান্ত স্রোত ও রেইনবো ব্রিজ" : "Rainbow Bridge Waterway"}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 leading-normal">
                  {isBangla
                    ? "টিউবে ভেসে ভেসে পুরো পার্ক প্রদক্ষিণ করার নিরিবিলি ট্রপিক্যাল ক্যানাল।"
                    : "Float on tubes under vibrant rainbow footbridges."}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Photo Caption Bar */}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-800 text-xs shadow-md">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-drone"></i>
              </span>
              <div>
                <span className="font-bold text-slate-900 block">
                  {isBangla ? "অফিসিয়াল এরিয়াল ড্রোন ফটোগ্রাফি" : "Official Aerial Drone Snapshot"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isBangla
                    ? "ম্যাজিক আইল্যান্ড ওয়াটার পার্কের বাস্তব দৃশ্যপট • কেরানীগঞ্জ, ঢাকা"
                    : "Real Magic Island Water Park Grounds • Keraniganj, Dhaka"}
                </span>
              </div>
            </div>
            <Link
              href="/gallery"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>{isBangla ? "পূর্ণ গ্যালারি দেখুন" : "View Full Gallery"}</span>
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
          </div>
        </div>

        {/* 4 Feature Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#faf8ff] border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-water"></i>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {isBangla ? "১০,০০০+ বর্গফুট আয়তন" : "10,000+ Sq Ft Basin"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBangla
                ? "একসাথে কয়েক হাজার দর্শনার্থী নিরাপদে কৃত্রিম সাগরের উত্তাল ঢেউ উপভোগ করতে পারেন।"
                : "Spacious enough for thousands to comfortably enjoy computerized ocean swells."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf8ff] border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FF7A24]/10 text-[#FF7A24] flex items-center justify-center text-lg">
              <i className="fa-solid fa-sliders"></i>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {isBangla ? "৪৫ ফুট উঁচু স্পিড স্লাইডার" : "45ft High Speed Slides"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBangla
                ? "চার লেনের ওপেন ও ক্লোজড স্পিড স্লাইডার দিয়ে চোখের পলকে পানিতে ঝাঁপিয়ে পড়ার রোমাঞ্চ।"
                : "Multi-lane thrill flumes with spiraling loops and high-velocity splash exits."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf8ff] border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-life-ring"></i>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {isBangla ? "৬০০ মিটার ট্রপিক্যাল লেজি রিভার" : "600m Lazy River"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBangla
                ? "নরম পানির স্রোতে টিউব ভাসিয়ে রেইনবো ব্রিজের নিচ দিয়ে ঘুরে বেড়ানোর অপূর্ব অনুভূতি।"
                : "Gentle tropical current meandering under scenic footbridges and palm canopies."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf8ff] border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {isBangla ? "আন্তর্জাতিক লাইফগার্ড ও ফিল্ট্রেশন" : "Certified Lifeguards"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBangla
                ? "২৪ ঘণ্টা স্বয়ংক্রিয় অতিবেগুনী ওয়াটার ফিল্ট্রেশন এবং সার্বক্ষণিক লাইফগার্ড নিরাপত্তা।"
                : "Continuous UV multi-layer water purification and certified lifeguard safety."}
            </p>
          </div>
        </div>

        {/* Bottom Feature CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#55C98B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-heading font-semibold mb-2">
              <i className="fa-solid fa-water text-[#FFD93D]"></i>
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
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-white text-[#0284C7] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#FFF9ED] shadow-md text-center transition-all flex items-center justify-center gap-2"
            >
              <span>{isBangla ? "আকর্ষণ পেজ দেখুন" : "View Attraction Page"}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-3.5 rounded-full bg-[#172554]/50 hover:bg-[#172554]/70 text-white font-heading font-semibold text-xs flex items-center justify-center gap-2 border border-white/30 transition-all"
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
