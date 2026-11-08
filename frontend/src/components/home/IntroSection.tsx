"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function IntroSection() {
  const { isBangla } = useTranslation();

  return (
    <section
      className="py-20 sm:py-24 bg-[#FFF9ED] relative"
      data-purpose="park-intro-section"
      id="overview"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Badge & Title */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FED7AA] text-[#172554] text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
            <span>
              {isBangla
                ? "আনোয়ার সিটি • বাংলাদেশের শীর্ষস্থানীয় ওয়ান্ডারল্যান্ড"
                : "ANOWAR CITY • Premier Adventure Destination"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#172554] font-heading tracking-tight">
            {isBangla ? "একটি গন্তব্য," : "ONE DESTINATION,"}{" "}
            <span className="text-[#FF6B35]">
              {isBangla ? "অফুরন্ত অ্যাডভেঞ্চার।" : "ENDLESS ADVENTURE."}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Official Brand Statement & Stats */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-[#FED7AA] relative overflow-hidden shadow-md">
              <div className="flex items-center gap-3 text-[#FF6B35] mb-4">
                <i className="fa-solid fa-quote-left text-3xl text-[#FFD93D]"></i>
                <span className="text-xs font-heading uppercase font-bold tracking-widest text-[#FF6B35]">
                  {isBangla ? "অফিসিয়াল পার্ক চার্টার" : "Official Park Charter"}
                </span>
              </div>
              <blockquote className="text-lg sm:text-xl font-heading font-semibold text-[#172554] leading-relaxed italic mb-6">
                {isBangla ? (
                  <>
                    “ম্যাজিক আইল্যান্ড একটি পূর্ণাঙ্গ অল-ইন-ওয়ান বিনোদন কেন্দ্র। আমাদের ওয়াটার পার্কে রয়েছে{" "}
                    <strong className="text-[#0284C7] font-bold">
                      বাংলাদেশের বৃহত্তম ওয়েভ পুল
                    </strong>
                    । ডাইনো জোনে রয়েছে{" "}
                    <strong className="text-[#55C98B] font-bold">
                      সবচেয়ে বৈচিত্র্যময় ডাইনোসর সংগ্রহ
                    </strong>
                    । আর আমাদের অ্যামিউজমেন্ট পার্কে রয়েছে{" "}
                    <strong className="text-[#FF6B35] font-bold">
                      উত্তেজনাপূর্ণ রোমাঞ্চকর সব রাইডস
                    </strong>
                    ।”
                  </>
                ) : (
                  <>
                    “Magic Island is an all-in-one entertainment destination. You'll find the{" "}
                    <strong className="text-[#0284C7] font-bold">
                      largest Wave pool in Bangladesh
                    </strong>{" "}
                    at our Water park. The{" "}
                    <strong className="text-[#55C98B] font-bold">
                      largest variety of dinosaurs
                    </strong>{" "}
                    is in the Dino Zone. Amazing and Thrilling Rides at our Amusement Park.”
                  </>
                )}
              </blockquote>

              <div className="pt-6 border-t border-[#FED7AA]/40 flex items-center justify-between">
                <div>
                  <div className="text-sm font-heading font-bold text-[#172554]">
                    {isBangla ? "আনোয়ার সিটি ম্যাজিক আইল্যান্ড" : "Anowar City Magic Island"}
                  </div>
                  <div className="text-xs text-[#FF6B35] font-sans font-medium">
                    {isBangla ? "আপনার অ্যাডভেঞ্চার গন্তব্য" : "Your Adventure Destination"}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9ED] border-2 border-[#FED7AA] p-1 flex items-center justify-center">
                  <img
                    src="/images/magic-island-logo.jpg"
                    alt="Logo"
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Stat Counters Grid (Fully Bilingual Numbers & Text) */}
            <div className="grid grid-cols-3 gap-3.5 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#BAE6FD] text-center shadow-xs">
                <div className="text-2xl sm:text-3xl font-black font-heading text-[#0284C7]">
                  {isBangla ? "১০,০০০+" : "10,000+"}
                </div>
                <div className="text-[11px] font-heading font-semibold text-[#172554] mt-0.5">
                  {isBangla ? "বর্গফুট ওয়েভ বেসিন" : "Sq Ft Wave Basin"}
                </div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#DDD6FE] text-center shadow-xs">
                <div className="text-2xl sm:text-3xl font-black font-heading text-[#8B5CF6]">
                  {isBangla ? "৫০+" : "50+"}
                </div>
                <div className="text-[11px] font-heading font-semibold text-[#172554] mt-0.5">
                  {isBangla ? "অ্যানিমেট্রনিক ডাইনো" : "Robotic Dinosaurs"}
                </div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#FED7AA] text-center shadow-xs">
                <div className="text-2xl sm:text-3xl font-black font-heading text-[#FF6B35]">
                  {isBangla ? "২৫+" : "25+"}
                </div>
                <div className="text-[11px] font-heading font-semibold text-[#172554] mt-0.5">
                  {isBangla ? "থ্রিল ও ফ্যামিলি রাইড" : "Thrill & Family Rides"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Split Feature */}
          <div className="lg:col-span-6 space-y-4">
            <div className="park-card overflow-hidden p-3 bg-white shadow-xl">
              <div className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[400px]">
                <img
                  alt="Anowar City Magic Island park aerial view"
                  className="w-full h-full object-cover"
                  src="/images/magic-island-waterpark-aerial.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/75 via-transparent to-black/10"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#FED7AA] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#FF6B35] block">
                      {isBangla ? "আন্তর্জাতিক বিনোদন গন্তব্য" : "Premier Theme Park Destination"}
                    </span>
                    <h4 className="text-sm sm:text-base font-heading font-bold text-[#172554]">
                      {isBangla ? "ঢাকা-কেরানীগঞ্জ মহাসড়ক প্রাঙ্গণ" : "Keraniganj Highway, Dhaka"}
                    </h4>
                  </div>
                  <Link
                    href="/attractions"
                    className="btn-park-secondary text-xs px-4 py-2 hover:scale-105 transition-transform"
                  >
                    <span>{isBangla ? "আকর্ষণসমূহ দেখুন" : "Explore Attractions"}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
