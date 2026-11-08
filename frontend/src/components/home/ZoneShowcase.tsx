"use client";

import React from "react";
import Link from "next/link";
import { Waves, Footprints, FerrisWheel, ArrowRight, Sparkles, Check, Ticket } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function ZoneShowcase() {
  const { t, isBangla } = useTranslation();

  const zones = [
    {
      id: "water-park",
      title: isBangla ? "ওয়াটার কিংডম ও ওয়েভ পুল" : "Water Kingdom & Wave Pool",
      subtitle: isBangla ? "ঢাকার কেরানীগঞ্জের সবচেয়ে বড় জলকেলির মেগা রাজ্য" : "Dhaka's Grand Wave Pool & Mega Slide Empire",
      desc: isBangla
        ? "বিশাল কম্পিউটারাইজড সামুদ্রিক ঢেউয়ের ওয়েভ পুল, আঁকাবাঁকা মাল্টি-লেন স্পিড স্লাইডার, শিশুদের মাশরুম ঝরনা ও রেইন ড্যান্সের আনন্দময় উৎসব।"
        : "Expansive computerized ocean wave pool, multi-lane racing flumes, twisting funnel slides, and cheerful kids mushroom splash zones.",
      href: "/water-park",
      bookingPackage: "pkg_water_splash",
      priceLabel: isBangla ? "৳৬০০ থেকে" : "From ৳600",
      accent: "from-cyan-500 to-blue-600",
      accentBorder: "border-cyan-500/50",
      accentGlow: "shadow-cyan-500/20",
      accentText: "text-cyan-400",
      btnClass: "btn-fantasy-cyan",
      icon: Waves,
      tag: isBangla ? "🌊 ওয়েভ পুল ও স্লাইডস" : "🌊 Waves & Flumes",
      imageUrl: "/images/Water%20World/Water%20Cover%20Pic.png",
      stats: isBangla ? "বিশাল ওয়েভ পুল ও ১২+ স্লাইডার" : "Mega Wave Pool & 12+ Slides",
      highlights: isBangla
        ? ["৬ ফুট সামুদ্রিক ঢেউয়ের ওয়েভ পুল", "মাল্টি-লেন স্পিড স্লাইডার", "বৃষ্টি নাচ ও ফ্যামিলি স্প্ল্যাশ", "১০০% ফিল্টার্ড নিরাপদ পানি"]
        : ["6ft Ocean Surge Wave Pool", "Multi-Lane Racing Slides", "Rain Dance & Mushroom Fountain", "Certified Clean Water Filtration"],
    },
    {
      id: "dino-zone",
      title: isBangla ? "ডাইনো ওয়ার্ল্ড জুরাসিক জোন" : "Dino World Jurassic Kingdom",
      subtitle: isBangla ? "২৫+ সেন্সর নিয়ন্ত্রিত জীবন্ত গর্জনরত রোবোটিক ডাইনোসর" : "25+ Roaring Animatronic Sensors & Safari",
      desc: isBangla
        ? "বিশালাকার ৪৫ ফুটের জীবন্ত গর্জনরত টি-রেক্স, স্পিনোসরাস এবং প্রাগৈতিহাসিক জুরাসিক জঙ্গল ট্রেইলে পরিবার ও শিশুদের সাথে রোমাঞ্চকর ভ্রমণ।"
        : "Walk among lifesize 45-foot animatronic roaring Tyrannosaurus Rex, Spinosaurus, and prehistoric fossils along the jungle safari trail.",
      href: "/dino-zone",
      bookingPackage: "pkg_dino_explorer",
      priceLabel: isBangla ? "৳২০০ থেকে" : "From ৳200",
      accent: "from-emerald-500 to-lime-600",
      accentBorder: "border-emerald-500/50",
      accentGlow: "shadow-emerald-500/20",
      accentText: "text-emerald-400",
      btnClass: "btn-fantasy-gold",
      icon: Footprints,
      tag: isBangla ? "🦖 জীবন্ত ডাইনোসর" : "🦖 Roaring Dinosaurs",
      imageUrl: "/images/Dino%20World/Dino%20Cover%20PIC.webp",
      stats: isBangla ? "২৫+ সেন্সর রোবোটিক ডাইনো" : "25+ Sensor Animatronics",
      highlights: isBangla
        ? ["৪৫ ফুট গর্জনরত রোবোটিক টি-রেক্স", "জুরাসিক ফরেস্ট ওয়াকওয়ে", "সেলফি ফটো স্পট ও ডাইনো এগ", "খুদে প্রত্নতাত্ত্বিক ফসিল ল্যাব"]
        : ["45ft Roaring Animatronic T-Rex", "Jurassic Jungle Walkway", "Selfie Spots & Hatching Eggs", "Junior Paleontologist Fossil Lab"],
    },
    {
      id: "amusement-park",
      title: isBangla ? "অ্যামিউজমেন্ট ড্রাই পার্ক" : "Amusement & Thrill Kingdom",
      subtitle: isBangla ? "হাই-স্পিড রোলারকোস্টার, নাগরদোলা ও বাম্পার কার" : "Roller Coaster, Giant Ferris Wheel & Bumper Cars",
      desc: isBangla
        ? "রোমাঞ্চকর রোলারকোস্টার, রঙিন বাম্পার কার ড্রাইভ, বিশাল নাগরদোলা থেকে ঢাকার মনোরম ভিউ, উড়ন্ত দোলনা এবং ক্লাসিক্যাল ঘোড়ার চড়কি।"
        : "Feel the adrenaline rush on the looping steel roller coaster, high-voltage bumper cars, giant Ferris wheel, fly dolna, and classic carousel.",
      href: "/amusement-park",
      bookingPackage: "pkg_amusement_thrill",
      priceLabel: isBangla ? "৳২০০ থেকে" : "From ৳200",
      accent: "from-amber-500 to-rose-600",
      accentBorder: "border-amber-500/50",
      accentGlow: "shadow-amber-500/20",
      accentText: "text-amber-400",
      btnClass: "btn-fantasy-coral",
      icon: FerrisWheel,
      tag: isBangla ? "🎡 রোলারকোস্টার ও রাইডস" : "🎡 Coasters & Rides",
      imageUrl: "/images/Thrill%20World/Thrill%20Cover%20Pic.png",
      stats: isBangla ? "১৫+ ফ্যামিলি ও থ্রিল রাইডস" : "15+ Family & Thrill Rides",
      highlights: isBangla
        ? ["হাই-স্পিড স্টিল রোলার কোস্টার", "রঙিন ইলেকট্রিক বাম্পার কার", "বিশাল নাগরদোলা (স্কাই হুইল)", "উড়ন্ত দোলনা (ফ্লাই দোলনা) ও চড়কি"]
        : ["High-Speed Steel Roller Coaster", "Neon Electric Bumper Cars", "Panoramic Giant Ferris Wheel", "Fly Dolna Swings & Carousel"],
    },
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-900/10 via-cyan-900/15 to-purple-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-950/40">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: "10s" }} />
            <span>{isBangla ? "পার্কের প্রধান আকর্ষণসমূহ" : "Signature Park Experiences"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            <span>{isBangla ? "তিনটি অবিস্মরণীয় " : "Explore Our 3 Wonder "}</span>
            <span className="bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              {isBangla ? "রোমাঞ্চকর জোন" : "Kingdom Zones"}
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBangla
              ? "ঢাকার কেরানীগঞ্জে একই প্রাঙ্গণে উপভোগ করুন পানির ঢেউয়ের উচ্ছ্বাস, জুরাসিক ডাইনোসরের গর্জন এবং মেগা রোলারকোস্টারের তীব্র উন্মাদনা।"
              : "Discover the ultimate trilogy of adventure in Keraniganj, Dhaka — from wave pools to animatronic dinosaurs and thrilling dry park coasters."}
          </p>
        </div>

        {/* 3 Zone Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {zones.map((zone) => {
            const Icon = zone.icon;
            return (
              <div
                key={zone.id}
                className={`group relative rounded-3xl overflow-hidden bg-slate-900/90 border-2 ${zone.accentBorder} transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl ${zone.accentGlow}`}
              >
                {/* Image Top Half with Zoom */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={zone.imageUrl}
                    alt={zone.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 border border-white/20 backdrop-blur-md text-xs font-bold text-white shadow-lg">
                    <Icon className={`w-4 h-4 ${zone.accentText}`} />
                    <span>{zone.tag}</span>
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-black text-slate-950 bg-amber-400 px-3 py-1 rounded-full shadow-lg">
                      {zone.priceLabel}
                    </span>
                  </div>

                  {/* Stats Tag */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-bold text-white bg-slate-950/80 border border-white/10 backdrop-blur-md px-3.5 py-1 rounded-full inline-block">
                      {zone.stats}
                    </span>
                  </div>
                </div>

                {/* Content Lower Half */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                      {zone.title}
                    </h3>
                    <p className={`text-xs font-bold ${zone.accentText} mt-1`}>
                      {zone.subtitle}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {zone.desc}
                    </p>

                    {/* Features list */}
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      {zone.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className={`w-3.5 h-3.5 ${zone.accentText} shrink-0`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dual CTA buttons */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <Link
                      href={`/booking?package=${zone.bookingPackage}`}
                      className="flex-1 py-3 px-4 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-center flex items-center justify-center gap-1.5 shadow-lg shadow-amber-950/40 transition-transform active:scale-95"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>{isBangla ? "টিকেট বুকিং" : "Book Pass"}</span>
                    </Link>

                    <Link
                      href={zone.href}
                      className="py-3 px-4 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>{isBangla ? "বিস্তারিত" : "Details"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
