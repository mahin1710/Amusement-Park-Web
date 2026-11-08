"use client";

import React from "react";
import Link from "next/link";
import { Waves, Sparkles, ShieldCheck, MessageCircle, ArrowRight, Sun, LifeBuoy } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { ATTRACTIONS_DATA } from "@/data/attractions";
import { buildWhatsAppLink } from "@/config/business";

export default function WaterParkPage() {
  const { t, isBangla } = useTranslation();
  const waterRides = ATTRACTIONS_DATA.filter((a) => a.zone === "water-park");

  const waLink = buildWhatsAppLink({
    packageTitle: isBangla ? "অ্যাকোয়া ওয়েসিস ওয়াটার পার্ক তথ্য" : "Aqua Oasis Water Park Info",
    locale: isBangla ? "bn" : "en",
  });

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554]">
      {/* Hero Banner with Authentic Water World Photograph */}
      <section className="relative h-[72vh] min-h-[540px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/Water%20World/Water%20Cover%20Pic.png"
          alt="Magic Island Aerial Wave Pool and Mega Water Slides"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-105 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9ED] via-[#FFF9ED]/30 to-[#172554]/40"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 text-[#0284C7] text-xs sm:text-sm font-black uppercase tracking-wider mb-5 shadow-lg border border-[#38BDF8]/40 backdrop-blur-md">
            <Waves className="w-4 h-4 text-[#0284C7]" />
            <span>{isBangla ? "ম্যাজিক আইল্যান্ড ওয়াটার পার্ক • আসল ড্রোন ভিউ" : "Magic Island Water Park • Authentic Drone View"}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] font-heading leading-tight tracking-tight">
            {isBangla ? "বাংলাদেশের সর্ববৃহৎ" : "BANGLADESH'S LARGEST"} <br />
            <span className="text-[#FFD93D] drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
              {isBangla ? "ওয়েভ পুল ও ওয়াটার কিংডম" : "WAVE POOL & WATER OASIS"}
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] max-w-2xl mx-auto leading-relaxed">
            {isBangla
              ? "সরাসরি ড্রোন ভিউতে দেখুন আমাদের বিশাল কৃত্রিম সামুদ্রিক ঢেউয়ের পুল, চার লেনের স্পিড স্লাইডার এবং রেইনবো ব্রিজের নিচে লেজি রিভার।"
              : "Experience the real wonder: expansive computerized ocean wave pool, towering multi-lane speed slides, lazy river, and family splash lagoons."}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#rides"
              className="btn-park-primary px-7 py-3.5 rounded-full text-sm font-black uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isBangla ? "ওয়াটার রাইডস দেখুন" : "Explore Water Rides"}</span>
            </Link>

            {waLink.isConfigured && (
              <a
                href={waLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-white text-[#172554] font-black text-sm uppercase tracking-wider flex items-center gap-2 border-2 border-[#55C98B] hover:bg-[#55C98B]/10 shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#55C98B]" />
                <span>{isBangla ? "হোয়াটসঅ্যাপে যোগাযোগ" : "WhatsApp Inquiry"}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section id="rides" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs uppercase tracking-widest font-black mb-3 border border-[#38BDF8]/40">
            <Waves className="w-4 h-4" />
            <span>{isBangla ? "সিগনেচার রাইডস" : "Signature Water Attractions"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#172554] font-heading tracking-tight">
            {isBangla ? "ওয়াটার রাইডস ও আকর্ষণসমূহ" : "WATER RIDES & ATTRACTIONS"}
          </h2>
          <p className="mt-3 text-[#172554]/75 text-sm sm:text-base leading-relaxed font-medium">
            {isBangla
              ? "আন্তর্জাতিক লাইফগার্ড দল ও সার্বক্ষণিক বিশুদ্ধ ওয়াটার ফিল্ট্রেশন প্রযুক্তিতে নিশ্চিত সর্বোচ্চ আনন্দ ও নিরাপত্তা।"
              : "Equipped with advanced multi-stage water filtration systems and certified lifeguard oversight at every pool."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {waterRides.map((ride) => (
            <div
              key={ride.id}
              className="park-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={ride.imageUrl}
                  alt={ride.name.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/70 via-transparent to-black/10"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#172554] font-black text-xs shadow-md border border-amber-200">
                    {isBangla ? ride.thrillLevelBn : ride.thrillLevel}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-[#172554] font-heading">
                    {isBangla ? ride.name.bn : ride.name.en}
                  </h3>
                  <p className="text-xs font-bold text-[#0284C7] mt-1">
                    {isBangla ? ride.tagline.bn : ride.tagline.en}
                  </p>
                  <p className="mt-3 text-sm text-[#172554]/80 leading-relaxed font-medium">
                    {isBangla ? ride.description.bn : ride.description.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-100 flex items-center justify-between text-xs">
                  <span className="text-[#172554]/70 font-medium">
                    {isBangla ? "উচ্চতা:" : "Height:"}{" "}
                    <strong className="text-[#172554] font-bold">
                      {isBangla ? ride.heightRequirementBn : ride.heightRequirement}
                    </strong>
                  </span>
                  <Link
                    href={`/attractions/${ride.id}`}
                    className="btn-park-primary px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>{isBangla ? "রাইড দেখুন" : "View Ride"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real Water World Photo Showcase Gallery */}
      <section className="py-16 bg-[#FFF9ED] border-t border-[#FED7AA]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0284C7] text-xs uppercase tracking-widest font-heading font-bold mb-3 border-2 border-[#BAE6FD] shadow-xs">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>{isBangla ? "আসল ওয়াটার পার্ক গ্যালারি" : "Authentic Water Park Gallery"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#172554] font-heading tracking-tight">
              {isBangla ? "ওয়াটার ওয়ার্ল্ডের আসল মুহূর্ত" : "REAL MOMENTS AT WATER WORLD"}
            </h2>
            <p className="mt-2 text-[#172554]/75 text-xs sm:text-sm font-sans">
              {isBangla
                ? "আমাদের ম্যাজিক আইল্যান্ড ওয়াটার পার্কের আসল দৃশ্যপট ও দর্শনার্থীদের রোমাঞ্চকর সব স্মৃতি।"
                : "Real snapshot highlights capturing the thrills, family fun, and ocean waves at Magic Island."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { src: "/images/Water%20World/Water%20Cover%20Pic.png", labelEn: "Aerial Wave Pool Panorama", labelBn: "ওয়েভ পুল এরিয়াল ভিউ" },
              { src: "/images/Water%20World/Water-2.png", labelEn: "Lazy River Canal & Wave Basin", labelBn: "লেজি রিভার ও ওয়াটার বেসিন" },
              { src: "/images/Water%20World/Water-4.png", labelEn: "Mega Speed Slide Tower", labelBn: "স্পিড স্লাইডার টাওয়ার" },
              { src: "/images/Water%20World/Water-7.png", labelEn: "Kids Splash & Water Fortress", labelBn: "কিডস স্প্ল্যাশ ফোর্ট্রেস" },
              { src: "/images/Water%20World/Water-3.webp", labelEn: "Rain Dance & Mist Zone", labelBn: "রেইন ড্যান্স ও মিস্ট জোন" },
              { src: "/images/Water%20World/Water-5.webp", labelEn: "Multi-Lane Racing Flumes", labelBn: "মাল্টি-লেন রেসিং স্লাইড" },
              { src: "/images/Water%20World/Water-6.webp", labelEn: "Sun Deck & Poolside Lounge", labelBn: "পুলসাইড সান ডেক লাউঞ্জ" },
              { src: "/images/Water%20World/Water-1.jpg", labelEn: "Splash Lagoon Entrance", labelBn: "স্প্ল্যাশ লেগুন এন্ট্রান্স" },
            ].map((pic, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border-2 border-[#FED7AA] shadow-sm hover:shadow-lg transition-all duration-300 aspect-4/3 bg-white"
              >
                <img
                  src={pic.src}
                  alt={pic.labelEn}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-heading font-bold drop-shadow-sm">
                    {isBangla ? pic.labelBn : pic.labelEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Amenities Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-[#FFF9ED] border-2 border-amber-200/80 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#38BDF8] text-white flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-[#172554] text-base font-heading">{isBangla ? "১০০% সার্টিফাইড লাইফগার্ড" : "100% Certified Lifeguards"}</h4>
                <p className="text-xs text-[#172554]/75 mt-1.5 leading-relaxed font-medium">
                  {isBangla ? "প্রতিটি পুল এবং স্লাইডারে প্রশিক্ষণপ্রাপ্ত রেসকিউ টিম সার্বক্ষণিক সদা জাগ্রত।" : "Continuous surveillance by licensed water rescue personnel across all pools."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFF9ED] border-2 border-amber-200/80 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shrink-0 shadow-md">
                <LifeBuoy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-[#172554] text-base font-heading">{isBangla ? "ফ্রি লাইফ জ্যাকেট" : "Free Life Jackets"}</h4>
                <p className="text-xs text-[#172554]/75 mt-1.5 leading-relaxed font-medium">
                  {isBangla ? "শিশু ও বয়স্ক সবার জন্য বিভিন্ন সাইজের লাইফ জ্যাকেট সম্পূর্ণ ফ্রি।" : "All vest sizes provided complimentary throughout the day for visitors."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFF9ED] border-2 border-amber-200/80 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#55C98B] text-white flex items-center justify-center shrink-0 shadow-md">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-[#172554] text-base font-heading">{isBangla ? "ইউভি ফিল্টারড ওয়াটার" : "UV Filtered Water"}</h4>
                <p className="text-xs text-[#172554]/75 mt-1.5 leading-relaxed font-medium">
                  {isBangla ? "অত্যাধুনিক অতিবেগুনী ফিল্ট্রেশন যা ত্বকের সুরক্ষা শতভাগ নিশ্চিত করে।" : "Hospital-grade multi-cycle UV sterilization for gentle, crystal-pure water."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
