"use client";

import React from "react";
import Link from "next/link";
import { Footprints, Check, Sparkles, MessageCircle, ArrowRight, Bone } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { ATTRACTIONS_DATA } from "@/data/attractions";
import { buildWhatsAppLink } from "@/config/business";

export default function DinoZonePage() {
  const { t, isBangla } = useTranslation();
  const dinoAttractions = ATTRACTIONS_DATA.filter((a) => a.zone === "dino-zone");

  const waLink = buildWhatsAppLink({
    packageTitle: isBangla ? "জুরাসিক ডাইনো জোন তথ্য" : "Jurassic Dino Zone Information",
    locale: isBangla ? "bn" : "en",
  });

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554]">
      {/* Hero Banner with Authentic Dino Zone Photography */}
      <section className="relative h-[72vh] min-h-[540px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/magic-island-dino.jpg"
          alt="Dino Zone Jurassic Jungle"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-105 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9ED] via-[#FFF9ED]/30 to-[#172554]/40"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 text-[#059669] text-xs sm:text-sm font-black uppercase tracking-wider mb-5 shadow-lg border border-[#55C98B]/40 backdrop-blur-md">
            <Footprints className="w-4 h-4 text-[#059669]" />
            <span>{isBangla ? "জুরাসিক কিংডম ডাইনো জোন" : "Jurassic Kingdom Dino Zone"}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] font-heading leading-tight tracking-tight">
            {isBangla ? "প্রাগৈতিহাসিক দানবদের" : "WHERE PREHISTORIC GIANTS"} <br />
            <span className="text-[#FFD93D] drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
              {isBangla ? "জীবন্ত গর্জন ও রাজত্ব" : "ROAR AND WALK AGAIN"}
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] max-w-2xl mx-auto leading-relaxed">
            {isBangla
              ? "৫০টিরও বেশি পূর্ণাকৃতির বাস্তবসম্মত রোবোটিক ডাইনোসরের জঙ্গল ট্রেইল, জীবন্ত গর্জন এবং খুদে বিজ্ঞানীদের জন্য ফসিল খনন ল্যাব।"
              : "Step into an ancient mist-shrouded jungle home to 50+ life-sized animatronic dinosaurs, interactive walking trails, and fossil discovery labs."}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#attractions"
              className="btn-park-primary px-7 py-3.5 rounded-full text-sm font-black uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isBangla ? "ডাইনো আকর্ষণসমূহ দেখুন" : "Explore Dino Attractions"}</span>
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

      {/* Attractions Grid */}
      <section id="attractions" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#DCFCE7] text-[#059669] text-xs uppercase tracking-widest font-black mb-3 border border-[#55C98B]/40">
            <Footprints className="w-4 h-4" />
            <span>{isBangla ? "জুরাসিক সাফারি" : "Prehistoric Safari"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#172554] font-heading tracking-tight">
            {isBangla ? "ডাইনো জোনের আকর্ষণসমূহ" : "DINO ZONE ATTRACTIONS"}
          </h2>
          <p className="mt-3 text-[#172554]/75 text-sm sm:text-base leading-relaxed font-medium">
            {isBangla
              ? "উন্নত রোবোটিক্স ও সিনেমাটিক সাউন্ড ইফেক্টসে নির্মিত দক্ষিণ এশিয়ার অন্যতম আধুনিক জুরাসিক এক্সপেরিয়েন্স।"
              : "Engineered with advanced animatronics, realistic roaring motion, and prehistoric safari atmospheres."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dinoAttractions.map((ride) => (
            <div
              key={ride.id}
              className="park-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={ride.imageUrl}
                  alt={ride.name.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/70 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 text-[#059669] text-xs font-black shadow-md border border-emerald-200">
                  {isBangla ? ride.thrillLevelBn : ride.thrillLevel}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#172554] font-heading">
                    {isBangla ? ride.name.bn : ride.name.en}
                  </h3>
                  <p className="text-xs font-black text-[#059669] mt-1 uppercase tracking-wide">
                    {isBangla ? ride.tagline.bn : ride.tagline.en}
                  </p>
                  <p className="mt-3 text-sm text-[#172554]/80 leading-relaxed font-medium">
                    {isBangla ? ride.description.bn : ride.description.en}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-100 space-y-2 text-xs text-[#172554]/80">
                  <p className="font-black text-[#172554]">
                    {isBangla ? "আকর্ষণের বিবরণ:" : "Key Features:"}
                  </p>
                  {(isBangla ? ride.features.bn : ride.features.en).slice(0, 2).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 font-bold" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-amber-100 flex justify-end">
                  <Link
                    href={`/attractions/${ride.id}`}
                    className="btn-park-primary w-full py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>{isBangla ? "বিস্তারিত দেখুন" : "View Details"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Educational & School Program Banner */}
      <section className="py-16 bg-white border-y border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="park-card rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#FFF9ED]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#059669] uppercase tracking-wider">
                <Bone className="w-4 h-4 text-[#059669]" />
                <span>{isBangla ? "স্কুল ও শিক্ষামূলক ট্রিপ" : "Educational School Expeditions"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#172554] font-heading">
                {isBangla ? "শিক্ষার্থীদের জন্য জুরাসিক সায়েন্স ট্রেইল" : "Inspire Future Paleontologists"}
              </h3>
              <p className="text-xs sm:text-sm text-[#172554]/80 max-w-xl leading-relaxed font-medium">
                {isBangla
                  ? "স্কুল শিক্ষার্থীদের জন্য বিশেষজ্ঞ গাইডের নেতৃত্বে প্রাগৈতিহাসিক জীববৈচিত্র্য, ডাইনোসরের বিলুপ্তি ও ফসিল গবেষণার ইন্টারঅ্যাক্টিভ হ্যান্ডস-অন সেশন।"
                  : "Guided field trips exploring dinosaur evolution, fossil preservation, and biology. Special educational packages available."}
              </p>
            </div>

            <div className="shrink-0">
              {waLink.isConfigured && (
                <a
                  href={waLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-park-primary px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isBangla ? "গ্রুপ ট্রিপ আলোচনা করুন" : "Inquire School Trip"}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
