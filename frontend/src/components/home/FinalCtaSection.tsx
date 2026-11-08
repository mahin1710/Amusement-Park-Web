"use client";

import React from "react";
import Link from "next/link";
import { Compass, Sparkles, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function FinalCtaSection() {
  const { isBangla } = useTranslation();
  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section
      className="relative py-28 overflow-hidden bg-[#172554] text-white"
      data-purpose="final-visit-invitation"
    >
      {/* Background Aerial Drone Image with Ambient Theme Park Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Anowar City Magic Island Aerial Overview"
          className="w-full h-full object-cover object-center filter brightness-60 contrast-105"
          src="/images/magic-island-waterpark-aerial.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172554] via-[#172554]/85 to-[#0284C7]/75"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Floating Sparkle Crown */}
        <div className="w-16 h-16 rounded-3xl bg-[#FF6B35] text-white flex items-center justify-center text-3xl mb-6 shadow-xl border-2 border-[#FFD93D] animate-float-slow">
          🎡
        </div>

        {/* Playful Headline per Master Prompt */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight mb-6 max-w-4xl leading-tight">
          {isBangla ? (
            <>
              আপনার পরবর্তী অবিস্মরণীয় অ্যাডভেঞ্চার <br />
              <span className="text-[#FFD93D]">শুরু হোক এখানেই!</span>
            </>
          ) : (
            <>
              Your Next Unforgettable Adventure <br />
              <span className="text-[#FFD93D]">Starts Right Here!</span>
            </>
          )}
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-xl text-yellow-50 font-sans max-w-2xl mb-10 leading-relaxed font-normal">
          {isBangla
            ? "পরিবার, প্রিয়জন ও বন্ধুদের সাথে নিয়ে আসুন আনোয়ার সিটি ম্যাজিক আইল্যান্ডে। দেশের সর্ববৃহৎ ওয়েভ পুল, ডাইনোসর সাফারি ও রোমাঞ্চকর রাইডসের আনন্দ উপভোগ করুন সরাসরি।"
            : "Bring your family, friends, and loved ones to Anowar City Magic Island for a world of colossal ocean waves, prehistoric dinosaur safaris, and high-velocity thrill rides."}
        </p>

        {/* Simple Visit CTAs (No Booking Feature) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/attractions"
            className="btn-park-primary text-base sm:text-lg px-9 py-4 shadow-2xl flex items-center gap-3"
          >
            <Compass className="w-5 h-5 text-[#FFD93D]" />
            <span>{isBangla ? "ম্যাজিক আইল্যান্ড ঘুরে দেখুন" : "Explore Magic Island"}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-white/15 backdrop-blur-md font-heading text-base font-bold text-white border-2 border-white/30 hover:border-white hover:bg-white/25 transition-all duration-200 flex items-center gap-2.5 shadow-md"
          >
            <i className="fa-brands fa-whatsapp text-emerald-400 text-lg"></i>
            <span>{isBangla ? "হোয়াটসঅ্যাপে প্রশ্ন করুন" : "WhatsApp Inquiry"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
