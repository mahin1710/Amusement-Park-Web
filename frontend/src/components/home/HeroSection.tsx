"use client";

import React from "react";
import Link from "next/link";
import { Compass, Sparkles, Waves, Footprints, FerrisWheel, ArrowRight, MapPin, Heart } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function HeroSection() {
  const { isBangla } = useTranslation();
  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center pt-28 sm:pt-36 pb-20 overflow-hidden bg-[#FFF9ED]"
      data-purpose="amusement-park-entrance-hero"
      id="hero"
    >
      {/* Real Park Aerial Photograph with Warm Amusement Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Aerial view of Anowar City Magic Island showcasing massive turquoise wave pool, winding lazy river, rainbow bridges, and thrill slides"
          className="w-full h-full object-cover object-center scale-105 filter brightness-105 contrast-100"
          src="/images/magic-island-waterpark-aerial.jpg"
        />
        {/* Warm Ambient Vignette & Park Horizon Gradient */}
        <div className="absolute inset-0 hero-park-vignette"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9ED] via-[#FFF9ED]/50 to-white/60"></div>
      </div>

      {/* Floating Amusement Park Decorative Elements */}
      <div className="absolute top-24 left-8 sm:left-16 z-10 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border-2 border-[#FFD93D] shadow-lg animate-float-slow">
        <span className="text-xl">🌊</span>
        <span className="text-xs font-heading font-bold text-[#172554]">
          {isBangla ? "দেশের বৃহত্তম ওয়েভ পুল" : "Largest Wave Pool in BD"}
        </span>
      </div>

      <div className="absolute top-36 right-8 sm:right-16 z-10 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border-2 border-[#8B5CF6] shadow-lg animate-float-reverse">
        <span className="text-xl">🦖</span>
        <span className="text-xs font-heading font-bold text-[#172554]">
          {isBangla ? "৫০+ গর্জনরত ডাইনোসর" : "50+ Roaring Dinosaurs"}
        </span>
      </div>

      <div className="absolute bottom-28 left-12 sm:left-24 z-10 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border-2 border-[#FF6B35] shadow-lg animate-float-reverse">
        <span className="text-xl">🎢</span>
        <span className="text-xs font-heading font-bold text-[#172554]">
          {isBangla ? "রোমাঞ্চকর মেগা কোস্টার" : "Skyline Mega Coasters"}
        </span>
      </div>

      <div className="absolute bottom-32 right-12 sm:right-24 z-10 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border-2 border-[#55C98B] shadow-lg animate-float-slow">
        <span className="text-xl">🌴</span>
        <span className="text-xs font-heading font-bold text-[#172554]">
          {isBangla ? "লাক্সারি রিসোর্ট স্টে" : "Day & Night Resort Stay"}
        </span>
      </div>

      {/* Main Entrance Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Entrance Welcome Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-5 py-2.5 rounded-full bg-white/95 border-2 border-[#FFD93D] text-[#172554] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider mb-6 shadow-md hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-[#FF6B35] animate-spin-slow" />
          <span className="text-[#FF6B35] font-black tracking-widest">
            {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
          </span>
          <span className="text-[#FED7AA]">•</span>
          <span className="font-extrabold text-[#172554]">
            {isBangla ? "ম্যাজিক আইল্যান্ড" : "MAGIC ISLAND"}
          </span>
          <span className="text-[#FED7AA] hidden sm:inline">•</span>
          <span className="text-[#38BDF8] font-bold hidden sm:inline">
            {isBangla ? "আপনার অ্যাডভেঞ্চার গন্তব্য" : "YOUR ADVENTURE DESTINATION"}
          </span>
        </div>

        {/* Playful Grand Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#172554] font-heading tracking-tight max-w-4xl leading-[1.08] mb-6">
          {isBangla ? (
            <>
              আনোয়ার সিটি <br />
              <span className="text-gradient-park">ম্যাজিক আইল্যান্ডে</span> স্বাগতম!
            </>
          ) : (
            <>
              Welcome to <br />
              <span className="text-gradient-park">Anowar City Magic Island!</span>
            </>
          )}
        </h1>

        {/* Supporting Tagline */}
        <p className="text-lg sm:text-2xl text-[#3B4B75] font-heading font-medium max-w-2xl leading-relaxed mb-10">
          {isBangla
            ? "যেখানে প্রতিটি মুহূর্ত রূপ নেয় জাদুকরী রোমাঞ্চ আর অপার আনন্দে।"
            : "Where Every Moment Becomes a Magical Adventure."}
        </p>

        {/* Primary Interactive CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-14">
          <a
            href="#virtual-journey"
            className="btn-park-primary text-base sm:text-lg px-8 py-4 shadow-xl flex items-center gap-3"
          >
            <Compass className="w-5 h-5 text-[#FFD93D]" />
            <span>{isBangla ? "আইল্যান্ড ঘুরে দেখুন" : "Explore the Island"}</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <Link
            href="/attractions"
            className="btn-park-secondary text-base sm:text-lg px-8 py-4 shadow-md flex items-center gap-2.5"
          >
            <FerrisWheel className="w-5 h-5 text-[#FF6B35]" />
            <span>{isBangla ? "সকল আকর্ষণ ও রাইডস" : "Discover All Attractions"}</span>
          </Link>
        </div>

        {/* 3 Real Kingdom Highlights (Playful Rounded Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="p-4 rounded-2xl bg-white/95 border-2 border-[#BAE6FD] shadow-md flex items-center gap-3.5 text-left group hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-2xl shrink-0 group-hover:rotate-6 transition-transform">
              🌊
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-[#172554]">
                {isBangla ? "মেগা ওয়াটার পার্ক" : "Mega Water Park"}
              </h4>
              <p className="text-xs text-[#3B4B75]">
                {isBangla ? "দেশের সর্ববৃহৎ ওয়েভ পুল ও স্পিড স্লাইডার" : "Bangladesh's Largest Wave Pool"}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/95 border-2 border-[#DDD6FE] shadow-md flex items-center gap-3.5 text-left group hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center text-2xl shrink-0 group-hover:rotate-6 transition-transform">
              🦖
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-[#172554]">
                {isBangla ? "জুরাসিক ডাইনো জোন" : "Jurassic Dino Zone"}
              </h4>
              <p className="text-xs text-[#3B4B75]">
                {isBangla ? "৫০+ গর্জনরত বাস্তব রোবোটিক ডাইনোসর" : "50+ Life-Sized Animatronics"}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/95 border-2 border-[#FED7AA] shadow-md flex items-center gap-3.5 text-left group hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center text-2xl shrink-0 group-hover:rotate-6 transition-transform">
              🎡
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-[#172554]">
                {isBangla ? "অ্যামিউজমেন্ট পার্ক" : "Thrill Amusement Park"}
              </h4>
              <p className="text-xs text-[#3B4B75]">
                {isBangla ? "স্কাইলাইন কোস্টার ও ১৫০ ফুটের স্কাই হুইল" : "Skyline Coasters & Giant Wheel"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
