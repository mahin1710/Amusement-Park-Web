"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Waves, Footprints, FerrisWheel, MapPin, ArrowRight, MessageCircle, PhoneCall, ExternalLink } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig, buildWhatsAppLink } from "@/config/business";

export default function AboutPage() {
  const { isBangla } = useTranslation();

  const waLink = buildWhatsAppLink({
    packageTitle: isBangla ? "ম্যাজিক আইল্যান্ড তথ্য" : "Magic Island Information",
    locale: isBangla ? "bn" : "en",
  });

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;
  const hotlineHref = `tel:${businessConfig.contact.hotline.callable}`;
  const facebookHref = "https://www.facebook.com/ac.magicisland/";

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
              ? "আনোয়ার সিটি ম্যাজিক আইল্যান্ড একটি পরিপূর্ণ অল-ইন-ওয়ান বিনোদন গন্তব্য। আমাদের ওয়াটার পার্কে আপনি পাবেন বাংলাদেশের সর্ববৃহৎ কৃত্রিম ওয়েভ পুল। ডাইনো ওয়ার্ল্ডে রয়েছে সবচেয়ে বৈচিত্র্যময় ও জীবন্ত রোবোটিক ডাইনোসর। আর থ্রিল ওয়ার্ল্ডে রয়েছে বিস্ময়কর ও তীব্র রোমাঞ্চকর রাইডস।"
              : "Anowar City Magic Island is an all-in-one entertainment destination. Discover the largest Wave pool in Bangladesh at Water World, life-sized roaring animatronics at Dino World, and high-velocity coasters at Thrill World."}
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
              className="btn-park-primary px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-transform shrink-0"
            >
              <span>{isBangla ? "সকল আকর্ষণ এক্সপ্লোর করুন" : "Explore All Attractions"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Core Realms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border-2 border-amber-200/70 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-black shadow-inner">
              <Waves className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#172554] font-heading">
              {isBangla ? "১. ওয়াটার ওয়ার্ল্ড" : "1. Water World"}
            </h3>
            <p className="text-sm text-[#172554]/80 leading-relaxed font-medium">
              {isBangla
                ? "বাংলাদেশের সর্ববৃহৎ কৃত্রিম ওয়েভ পুল, আঁকাবাঁকা ১২+ হাই-স্পিড ওয়াটার স্লাইডার, রেইন ড্যান্স ও পরিবারের জলকেলির রাজ্য।"
                : "Home to Bangladesh's largest artificial ocean wave pool, 12+ high-velocity water slides, rain dance, and family splash lagoons."}
            </p>
            <div className="pt-2">
              <Link href="/water-park" className="text-xs font-black text-[#0284C7] uppercase tracking-wider flex items-center gap-1 hover:underline">
                <span>{isBangla ? "ওয়াটার ওয়ার্ল্ড রিয়েলম" : "Explore Water World"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border-2 border-amber-200/70 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] text-[#059669] flex items-center justify-center font-black shadow-inner">
              <Footprints className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#172554] font-heading">
              {isBangla ? "২. ডাইনো ওয়ার্ল্ড" : "2. Dino World"}
            </h3>
            <p className="text-sm text-[#172554]/80 leading-relaxed font-medium">
              {isBangla
                ? "২৫টিরও বেশি জীবন্ত সেন্সর রোবোটিক ডাইনোসর, ৪৫ ফুটের গর্জনরত টি-রেক্স এবং শিক্ষার্থীদের জন্য শিক্ষণীয় জুরাসিক ফসিল ল্যাব।"
                : "The largest variety of dinosaurs in Bangladesh with 25+ roaring animatronics, 45ft T-Rex, and hands-on fossil discovery labs."}
            </p>
            <div className="pt-2">
              <Link href="/dino-zone" className="text-xs font-black text-[#059669] uppercase tracking-wider flex items-center gap-1 hover:underline">
                <span>{isBangla ? "ডাইনো ওয়ার্ল্ড রিয়েলম" : "Explore Dino World"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border-2 border-amber-200/70 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFEDD5] text-[#FF6B35] flex items-center justify-center font-black shadow-inner">
              <FerrisWheel className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#172554] font-heading">
              {isBangla ? "৩. থ্রিল ওয়ার্ল্ড" : "3. Thrill World"}
            </h3>
            <p className="text-sm text-[#172554]/80 leading-relaxed font-medium">
              {isBangla
                ? "লুপার রোলারকোস্টার, ১৫০ ফুটের নিয়ন স্কাই হুইল, ইলেকট্রিক বাম্পার কার এবং রঙিন কার্নিভাল রাইডসের অপূর্ব উৎসব।"
                : "Looping coasters, panoramic observation wheel, electric bumper arena, and nostalgic family carnival rides."}
            </p>
            <div className="pt-2">
              <Link href="/amusement-park" className="text-xs font-black text-[#FF6B35] uppercase tracking-wider flex items-center gap-1 hover:underline">
                <span>{isBangla ? "থ্রিল ওয়ার্ল্ড রিয়েলম" : "Explore Thrill World"}</span>
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

        {/* Official Social Contact Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white border-2 border-[#FED7AA] hover:border-[#25D366] hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#15803D] flex items-center justify-center text-2xl mb-3 group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-xs">
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <div className="text-[11px] font-heading font-black uppercase tracking-wider text-[#15803D] mb-0.5">
              {isBangla ? "হোয়াটসঅ্যাপ" : "WhatsApp"}
            </div>
            <div className="text-sm font-bold font-heading text-[#172554] mb-3">
              {businessConfig.hotlines.whatsapp}
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#15803D] border border-emerald-200 text-xs font-heading font-semibold group-hover:bg-[#25D366] group-hover:text-white transition-colors mt-auto">
              <span>{isBangla ? "চ্যাট করুন" : "Chat Now"}</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </span>
          </a>

          <a
            href={hotlineHref}
            className="group p-5 rounded-2xl bg-white border-2 border-[#FED7AA] hover:border-[#FF6B35] hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:bg-[#FF6B35] group-hover:text-white transition-all shadow-xs">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div className="text-[11px] font-heading font-black uppercase tracking-wider text-[#FF6B35] mb-0.5">
              {isBangla ? "হটলাইন" : "Hotline"}
            </div>
            <div className="text-sm font-bold font-heading text-[#172554] mb-3">
              {businessConfig.contact.hotline.display}
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#C2410C] border border-orange-200 text-xs font-heading font-semibold group-hover:bg-[#FF6B35] group-hover:text-white transition-colors mt-auto">
              <PhoneCall className="w-3 h-3" />
              <span>{isBangla ? "কল দিন" : "Call Now"}</span>
            </span>
          </a>

          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white border-2 border-[#FED7AA] hover:border-[#1877F2] hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:bg-[#1877F2] group-hover:text-white transition-all shadow-xs">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <div className="text-[11px] font-heading font-black uppercase tracking-wider text-[#1877F2] mb-0.5">
              {isBangla ? "ফেসবুক" : "Facebook"}
            </div>
            <div className="text-sm font-bold font-heading text-[#172554] mb-3">
              @ac.magicisland
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1877F2] border border-blue-200 text-xs font-heading font-semibold group-hover:bg-[#1877F2] group-hover:text-white transition-colors mt-auto">
              <span>{isBangla ? "পেজ দেখুন" : "Visit Page"}</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

