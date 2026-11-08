"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Waves, Footprints, FerrisWheel, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig, buildWhatsAppLink } from "@/config/business";

export default function AboutPage() {
  const { isBangla } = useTranslation();

  const waLink = buildWhatsAppLink({
    packageTitle: isBangla ? "ম্যাজিক আইল্যান্ড তথ্য" : "Magic Island Information",
    locale: isBangla ? "bn" : "en",
  });

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header with Official Logo */}
        <div className="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center">
          <div className="h-28 sm:h-32 w-auto p-3 bg-white rounded-3xl border-2 border-amber-200/80 shadow-md flex items-center justify-center mb-2 hover:scale-105 transition-transform">
            <img
              src="/images/magic-island-logo.jpg"
              alt="Anowar City Magic Island Official Logo"
              className="h-full w-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-100/80 text-[#FF6B35] text-xs font-black uppercase tracking-widest border border-amber-200">
            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
            <span>{isBangla ? "আমাদের সম্পর্কে" : "About Magic Island"}</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-black tracking-[0.28em] text-[#0284C7] uppercase block">
              {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#172554] tracking-tight font-heading leading-tight">
              MAGIC ISLAND <br />
              <span className="text-[#FF6B35]">
                {isBangla ? "আপনার রোমাঞ্চের জাদুকরী গন্তব্য" : "YOUR ADVENTURE DESTINATION"}
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#172554]/80 leading-relaxed font-medium">
            {isBangla
              ? "আনোয়ার সিটি ম্যাজিক আইল্যান্ড একটি পরিপূর্ণ অল-ইন-ওয়ান বিনোদন গন্তব্য। আমাদের ওয়াটার পার্কে আপনি পাবেন বাংলাদেশের সর্ববৃহৎ কৃত্রিম ওয়েভ পুল। ডাইনো জোনে রয়েছে সবচেয়ে বৈচিত্র্যময় ও জীবন্ত রোবোটিক ডাইনোসর। আর অ্যামিউজমেন্ট পার্কে রয়েছে বিস্ময়কর ও তীব্র রোমাঞ্চকর রাইডস।"
              : "Anowar City Magic Island is an all-in-one entertainment destination. You'll find the largest Wave pool in Bangladesh at our Water park. The largest variety of dinosaurs is in the Dino Zone. Amazing and Thrilling Rides at our Amusement Park."}
          </p>
        </div>

        {/* Real Aerial Visual Feature */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-amber-200/80 shadow-xl bg-white group">
          <img
            src="/images/magic-island-waterpark-aerial.jpg"
            alt="Magic Island Aerial Overview"
            className="w-full h-[400px] sm:h-[550px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/80 via-transparent to-black/20"></div>

          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 border border-amber-200 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <span className="text-xs font-black uppercase text-[#0284C7] block tracking-wider">
                {isBangla ? "আসল ড্রোন ভিউ • বাংলাদেশ" : "Authentic Drone Snapshot • Bangladesh"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#172554] font-heading">
                {isBangla ? "ম্যাজিক আইল্যান্ড মেগা ওয়াটার পার্ক প্রাঙ্গণ" : "Magic Island Water Park Master Complex"}
              </h3>
            </div>
            <Link
              href="/attractions"
              className="btn-park-primary px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isBangla ? "সব রাইডস দেখুন" : "Explore Attractions"}</span>
            </Link>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border-2 border-amber-200/70 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-black shadow-inner">
              <Waves className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#172554] font-heading">
              {isBangla ? "১. ওয়াটার পার্ক" : "1. Water Park"}
            </h3>
            <p className="text-sm text-[#172554]/80 leading-relaxed font-medium">
              {isBangla
                ? "বাংলাদেশের সর্ববৃহৎ সামুদ্রিক ঢেউয়ের ওয়েভ পুল, আঁকাবাঁকা মাল্টি-লেন স্পিড স্লাইডার, রেইনবো ব্রিজের নিচে লেজি রিভার ও মাশরুম ঝরনা।"
                : "Home to Bangladesh's largest artificial wave pool, twisting racing flumes, scenic bridges, and family splash lagoons."}
            </p>
            <div className="pt-2">
              <Link href="/water-park" className="text-xs font-black text-[#0284C7] uppercase tracking-wider flex items-center gap-1 hover:underline">
                <span>{isBangla ? "ওয়াটার পার্ক পরিদর্শন" : "Explore Water Park"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border-2 border-amber-200/70 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] text-[#059669] flex items-center justify-center font-black shadow-inner">
              <Footprints className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#172554] font-heading">
              {isBangla ? "২. ডাইনো জোন" : "2. Dino Zone"}
            </h3>
            <p className="text-sm text-[#172554]/80 leading-relaxed font-medium">
              {isBangla
                ? "৫০+ মোশন সেন্সর বিশিষ্ট পূর্ণাকৃতির গর্জনরত রোবোটিক ডাইনোসর, ৪৫ ফুটের টি-রেক্স এবং শিশুদের শিক্ষণীয় জুরাসিক ফসিল ল্যাব।"
                : "The largest variety of dinosaurs in Bangladesh with 50+ roaring animatronics, 45ft T-Rex, and hands-on fossil discovery labs."}
            </p>
            <div className="pt-2">
              <Link href="/dino-zone" className="text-xs font-black text-[#059669] uppercase tracking-wider flex items-center gap-1 hover:underline">
                <span>{isBangla ? "ডাইনো জোন পরিদর্শন" : "Explore Dino Zone"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border-2 border-amber-200/70 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFEDD5] text-[#FF6B35] flex items-center justify-center font-black shadow-inner">
              <FerrisWheel className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#172554] font-heading">
              {isBangla ? "৩. অ্যামিউজমেন্ট পার্ক" : "3. Amusement Park"}
            </h3>
            <p className="text-sm text-[#172554]/80 leading-relaxed font-medium">
              {isBangla
                ? "লুপার রোলারকোস্টার, ১৫০ ফুটের নিয়ন স্কাই হুইল, ইলেকট্রিক বাম্পার কার এবং রঙিন কার্নিভাল রাইডসের অপূর্ব উৎসব।"
                : "Looping coasters, panoramic observation wheel, electric bumper arena, and nostalgic family rides."}
            </p>
            <div className="pt-2">
              <Link href="/amusement-park" className="text-xs font-black text-[#FF6B35] uppercase tracking-wider flex items-center gap-1 hover:underline">
                <span>{isBangla ? "অ্যামিউজমেন্ট রাইডস" : "Explore Amusement"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Location & Hospitality Assurance */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-amber-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-black text-[#0284C7] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#0284C7]" />
              <span>{businessConfig.location.areaName[isBangla ? "bn" : "en"]}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#172554] font-heading">
              {isBangla ? "ঢাকা-কেরানীগঞ্জ মহাসড়কের সন্নিকটে মনোরম প্রাঙ্গণ" : "Scenic Park on Keraniganj Highway"}
            </h2>
            <p className="text-sm text-[#172554]/80 max-w-xl leading-relaxed font-medium">
              {isBangla
                ? "বাবুবাজার দ্বিতীয় বুড়িগঙ্গা সেতু থেকে মাত্র ২০ মিনিটে নির্বিঘ্ন যাতায়াত। সুপরিসর গাড়ি পার্কিং, সার্বক্ষণিক নিরাপত্তা এবং পরিবার নিয়ে কাটানোর সম্পূর্ণ আন্তর্জাতিক পরিবেশ।"
                : "Conveniently located 20 minutes from Babubazar 2nd Buriganga Bridge along Keraniganj Highway. Equipped with spacious parking and full security."}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3.5">
            <Link
              href="/location"
              className="py-3 px-6 rounded-full border-2 border-amber-300 text-[#172554] bg-white hover:bg-amber-50 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
            >
              <MapPin className="w-4 h-4 text-[#FF6B35]" />
              <span>{isBangla ? "দিকনির্দেশনা দেখুন" : "View Map & Directions"}</span>
            </Link>
            {waLink.isConfigured && (
              <a
                href={waLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-park-primary py-3 px-6 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBangla ? "হোয়াটসঅ্যাপে যোগাযোগ" : "WhatsApp Help"}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
