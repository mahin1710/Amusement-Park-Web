"use client";

import React from "react";
import Link from "next/link";
import { Footprints, Sparkles, ArrowRight, Bone, Camera, Film, Compass } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function DinoZoneSection() {
  const { isBangla } = useTranslation();

  return (
    <section
      className="py-24 bg-[#FFF9ED] relative"
      data-purpose="dino-zone-safari"
      id="dino-zone"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="park-card overflow-hidden p-3 bg-white shadow-xl group">
              <div className="relative rounded-2xl overflow-hidden h-[450px] sm:h-[520px]">
                <img
                  alt="Jurassic Dino Zone at Anowar City Magic Island with animatronic T-Rex and Brachiosaurus on elevated boardwalk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="/images/Dino%20World/Dino%20Cover%20PIC.webp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/75 via-transparent to-black/10"></div>
                <div className="absolute top-4 left-4 bg-[#8B5CF6] text-white font-heading font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  {isBangla ? "প্রাগৈতিহাসিক সাফারি অভিজ্ঞতা" : "Prehistoric Safari Experience"}
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#FED7AA] shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-heading font-bold text-[#8B5CF6]">
                      {isBangla ? "৫০টিরও বেশি অ্যানিমেট্রনিক ডাইনোসর" : "Over 50 Animatronic Dinosaurs"}
                    </div>
                    <div className="text-sm sm:text-base font-heading font-bold text-[#172554] mt-0.5">
                      {isBangla ? "গর্জনকারী সাউন্ড ও মোশন সেন্সর" : "Roaring Soundscapes & Motion Sensors"}
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center text-xl shrink-0">
                    🦖
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E8FF] text-[#6D28D9] text-xs font-heading font-bold uppercase tracking-wider border-2 border-[#DDD6FE]">
              <Footprints className="w-4 h-4 text-[#8B5CF6]" />
              <span>{isBangla ? "প্রাগৈতিহাসিক রোমাঞ্চকর অভিযান" : "Prehistoric Dino Kingdom"}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#172554] font-heading tracking-tight">
              {isBangla ? "ডাইনো জোন:" : "DINO ZONE:"} <br />
              <span className="text-gradient-purple">
                {isBangla ? "প্রাগৈতিহাসিক সাফারি" : "PREHISTORIC SAFARI"}
              </span>
            </h2>

            <p className="text-[#3B4B75] text-sm sm:text-base leading-relaxed font-sans">
              {isBangla
                ? "কুয়াশাচ্ছন্ন প্রাগৈতিহাসিক ট্রপিক্যাল রেইনফরেস্টে হারিয়ে যান, যেখানে জীবন্ত হয়ে ওঠে বিশালাকার দানবরা। আনোয়ার সিটি ম্যাজিক আইল্যান্ডে রয়েছে বাংলাদেশের সর্ববৃহৎ ও সবচেয়ে নিখুঁত রোবোটিক অ্যানিমেট্রনিক ডাইনোসর সংগ্রহ।"
                : "Step into an ancient mist-shrouded jungle home to 50+ life-sized animatronic dinosaurs, elevated boardwalk canopy walks, and hands-on fossil discovery labs designed for all ages."}
            </p>

            {/* 4 Safari Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border-2 border-[#DDD6FE] shadow-xs">
                <div className="text-[#172554] font-heading font-bold text-sm mb-1 flex items-center gap-2">
                  <span className="text-base">🌿</span>
                  <span>{isBangla ? "জাঙ্গল ক্যানোপি ওয়াকওয়ে" : "Misty Jungle Boardwalk"}</span>
                </div>
                <p className="text-xs text-[#3B4B75] leading-normal font-sans">
                  {isBangla
                    ? "ট্রপিক্যাল বৃক্ষরাজির ওপর কাঠের তৈরি উঁচু সুরক্ষিত ফুটব্রিজ।"
                    : "Elevated wooden canopy walk hovering above lush tropical greenery."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-[#DDD6FE] shadow-xs">
                <div className="text-[#172554] font-heading font-bold text-sm mb-1 flex items-center gap-2">
                  <span className="text-base">🦴</span>
                  <span>{isBangla ? "কিডস ফসিল ডিগ পিট" : "Kids Fossil Dig Pit"}</span>
                </div>
                <p className="text-xs text-[#3B4B75] leading-normal font-sans">
                  {isBangla
                    ? "শিশুদের জন্য প্রাচীন ডাইনোসর ফসিল খনন ও গবেষণার অভিজ্ঞতা।"
                    : "Hands-on paleontological sand excavation for young explorers."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-[#DDD6FE] shadow-xs">
                <div className="text-[#172554] font-heading font-bold text-sm mb-1 flex items-center gap-2">
                  <span className="text-base">🎬</span>
                  <span>{isBangla ? "৫ডি জুরাসিক সিনেমা" : "5D Prehistoric Cinema"}</span>
                </div>
                <p className="text-xs text-[#3B4B75] leading-normal font-sans">
                  {isBangla
                    ? "বাতাস, কুয়াশা ও মোশন চেয়ারে বসে টি-রেক্সের তাড়া খাওয়ার অনুভূতি।"
                    : "Sensory motion seats fleeing a roaring apex predator chase."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-[#DDD6FE] shadow-xs">
                <div className="text-[#172554] font-heading font-bold text-sm mb-1 flex items-center gap-2">
                  <span className="text-base">📸</span>
                  <span>{isBangla ? "জুরাসিক ফটো পয়েন্ট" : "Jurassic Photo Points"}</span>
                </div>
                <p className="text-xs text-[#3B4B75] leading-normal font-sans">
                  {isBangla
                    ? "বিশাল ডাইনোসরের ডিমের ভেতরে ঢুকে পরিবারের স্মারক ছবি তোলার স্পট।"
                    : "Interactive life-sized cracked dinosaur egg photo booths."}
                </p>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                className="btn-park-secondary text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
                href="/dino-zone"
              >
                <span>{isBangla ? "সম্পূর্ণ ডাইনো জোন এক্সপ্লোর করুন" : "Explore Dino Kingdom"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                className="btn-park-outline text-xs uppercase tracking-wider inline-flex items-center gap-2"
                href="/attractions/jurassic-t-rex-encounter"
              >
                <span>{isBangla ? "টি-রেক্স পেজ দেখুন" : "View T-Rex Page"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Real Dino World Snapshot Strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { src: "/images/Dino%20World/Dino_1.webp", titleEn: "Colossal T-Rex Animatronic", titleBn: "পূর্ণাকৃতির টি-রেক্স" },
            { src: "/images/Dino%20World/Dino_2.webp", titleEn: "Velociraptor Pack", titleBn: "ভেলোসিরাপটর আস্তানা" },
            { src: "/images/Dino%20World/Dino_4.webp", titleEn: "Brachiosaurus Canopy", titleBn: "ব্র্যাকিওসরাস ক্যানোপি" },
            { src: "/images/Dino%20World/Dino_6.webp", titleEn: "Triceratops Sanctuary", titleBn: "ট্রাইসেরাটপস জোন" },
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
      </div>
    </section>
  );
}
