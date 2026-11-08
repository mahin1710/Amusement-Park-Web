"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Camera, ExternalLink, Sparkles, Waves, Footprints, FerrisWheel, Heart, MessageSquare } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

interface PhotoCard {
  id: string;
  category: "water" | "dino" | "amusement" | "family";
  titleEn: string;
  titleBn: string;
  rideNameEn: string;
  rideNameBn: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

export function RealPhotoFeed() {
  const { isBangla } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<"all" | "water" | "dino" | "amusement" | "family">("all");

  const photos: PhotoCard[] = [
    {
      id: "p1",
      category: "water",
      titleEn: "Massive computerized wave pool surging with happy swimmers and families under bright sunshine.",
      titleBn: "রৌদ্রোজ্জ্বল দিনে সুবিশাল ওয়েভ পুলে হাজারো দর্শনার্থীদের অনাবিল আনন্দ ও জলকেলি।",
      rideNameEn: "Computerized Wave Pool (ঢেউ পুল)",
      rideNameBn: "বিশাল সামুদ্রিক ওয়েভ পুল",
      imageUrl: "/images/Water%20World/Water%20Cover%20Pic.png",
      likes: 1420,
      comments: 112,
    },
    {
      id: "p2",
      category: "dino",
      titleEn: "Life-size sensor-controlled animatronic Tyrannosaurus Rex roaring along the Jurassic jungle walkway.",
      titleBn: "জুরাসিক ফরেস্টে ৪৫ ফুটের সেন্সর নিয়ন্ত্রিত গর্জনরত জীবন্ত রোবোটিক টি-রেক্স ডাইনোসর।",
      rideNameEn: "Animatronic T-Rex (রোবোটিক ডাইনো)",
      rideNameBn: "গর্জনরত টি-রেক্স ডাইনোসর",
      imageUrl: "/images/Dino%20World/Dino%20Cover%20PIC.webp",
      likes: 2180,
      comments: 195,
    },
    {
      id: "p3",
      category: "amusement",
      titleEn: "High-speed steel looping roller coaster racing through clear skies with screaming adventure lovers.",
      titleBn: "তীব্র গতিতে ছুটে চলা স্টিল রোলার কোস্টার — তরুণ ও পরিবারদের চরম রোমাঞ্চের প্রিয় রাইড।",
      rideNameEn: "Steel Roller Coaster (রোলার কোস্টার)",
      rideNameBn: "হাই-স্পিড রোলার কোস্টার",
      imageUrl: "/images/Thrill%20World/Thrill%20Cover%20Pic.png",
      likes: 1850,
      comments: 148,
    },
    {
      id: "p4",
      category: "amusement",
      titleEn: "Vibrant neon-lit electric bumper cars colliding with laughter and smiling kids at the dry park arena.",
      titleBn: "রঙিন ইলেকট্রিক বাম্পার কার এরিনায় বন্ধুদের সাথে ধাক্কাধাক্কি ও হাসিখুশির খেলা।",
      rideNameEn: "Neon Bumper Cars (বাম্পার কার)",
      rideNameBn: "রঙিন ইলেকট্রিক বাম্পার কার",
      imageUrl: "/images/Thrill%20World/Thrill-3.webp",
      likes: 980,
      comments: 84,
    },
    {
      id: "p5",
      category: "water",
      titleEn: "Multi-lane high speed racing flume water slides dropping straight into sparkling splash pools.",
      titleBn: "মাল্টি-লেন স্পিড ওয়াটার স্লাইডার দিয়ে তীব্র গতিতে পানিতে ঝাঁপিয়ে পড়ার অনাবিল সুখ।",
      rideNameEn: "Multi-Lane Speed Slides (স্পিড স্লাইডার)",
      rideNameBn: "মাল্টি-লেন ওয়াটার স্লাইডার",
      imageUrl: "/images/Water%20World/Water-4.png",
      likes: 1640,
      comments: 130,
    },
    {
      id: "p6",
      category: "amusement",
      titleEn: "Giant illuminated Ferris Wheel offering breathtaking 360-degree aerial views of Keraniganj & Dhaka.",
      titleBn: "আকাশচুম্বী বিশাল নাগরদোলা (স্কাই হুইল) থেকে কেরানীগঞ্জ ও বুড়িগঙ্গার দিগন্তজোড়া অপরূপ দৃশ্য।",
      rideNameEn: "Giant Ferris Wheel (নাগরদোলা)",
      rideNameBn: "বিশাল স্কাই হুইল নাগরদোলা",
      imageUrl: "/images/Thrill%20World/Thrill-2.webp",
      likes: 2340,
      comments: 210,
    },
    {
      id: "p7",
      category: "family",
      titleEn: "Children and parents enjoying the high-flying chair swings (Fly Dolna) soaring through the air.",
      titleBn: "উড়ন্ত দোলনা (ফ্লাই দোলনা) রাইডে বাতাসের মাঝে মুক্ত পাখির মতো ডানা মেলে ওড়ার অনুভূতি।",
      rideNameEn: "Flying Chair Swings (ফ্লাই দোলনা)",
      rideNameBn: "উড়ন্ত চেয়ার দোলনা (ফ্লাই দোলনা)",
      imageUrl: "/images/Thrill%20World/Thrill-4.webp",
      likes: 1290,
      comments: 98,
    },
    {
      id: "p8",
      category: "family",
      titleEn: "Classic fairy tale carousel horses with sparkling golden lights delighting young adventurers.",
      titleBn: "পরীদের দেশের মতো সোনালী আলোয় সাজানো ক্লাসিক ঘোড়ার চড়কি — শিশুদের প্রিয় আনন্দ রাইড।",
      rideNameEn: "Classic Carousel (ঘোড়ার চড়কি)",
      rideNameBn: "ক্লাসিক চিলড্রেন ক্যারোজেল",
      imageUrl: "/images/Thrill%20World/Thrill-6.webp",
      likes: 1110,
      comments: 76,
    },
  ];

  const filtered = activeCategory === "all" ? photos : photos.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-slate-900/60 relative overflow-hidden border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Facebook Page Link */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
            <Camera className="w-4 h-4 text-blue-400" />
            <span>{isBangla ? "বাস্তব রাইডস ও ছবি গ্যালারি" : "Real Rides & Visual Highlights"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            <span>{isBangla ? "ম্যাজিক আইল্যান্ডের " : "Real Moments from "}</span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
              {isBangla ? "বাস্তব আনন্দ মুহূর্ত" : "Magic Island"}
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBangla
              ? "আমাদের অফিশিয়াল ফেসবুক পেজ (facebook.com/ac.magicisland) ও দর্শনার্থীদের শেয়ার করা ওয়েভ পুল, রোলারকোস্টার ও ডাইনোসর পার্কের আসল ছবি।"
              : "Authentic photos of water slides, wave pool surges, animatronic dinos and roller coasters from our official Facebook community."}
          </p>

          {/* Facebook Link Banner */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-blue-950/80 border border-blue-500/50 shadow-xl">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center">
              f
            </span>
            <div className="text-left">
              <span className="text-xs font-bold text-white block">
                Facebook: /ac.magicisland
              </span>
              <span className="text-[11px] text-blue-300">
                {isBangla ? "৫০,০০০+ ফ্যান • প্রতিদিনের লাইভ ভিডিও ও ছবি" : "50,000+ Fans • Daily Live Videos & Check-ins"}
              </span>
            </div>
            <a
              href="https://www.facebook.com/ac.magicisland/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>{isBangla ? "পেজ দেখুন" : "Visit Page"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === "all"
                ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {isBangla ? "সব ছবি (All)" : "All Rides"}
          </button>
          <button
            onClick={() => setActiveCategory("water")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === "water"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            🌊 {isBangla ? "ওয়েভ পুল ও ওয়াটার" : "Wave Pool & Water"}
          </button>
          <button
            onClick={() => setActiveCategory("dino")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === "dino"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            🦖 {isBangla ? "ডাইনোসর পার্ক" : "Dino World"}
          </button>
          <button
            onClick={() => setActiveCategory("amusement")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === "amusement"
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            🎡 {isBangla ? "রোলারকোস্টার ও বাম্পার কার" : "Coasters & Rides"}
          </button>
          <button
            onClick={() => setActiveCategory("family")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === "family"
                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            👨‍👩‍👧 {isBangla ? "ফ্যামিলি ও চিলড্রেন" : "Family & Kids"}
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-950/30 flex flex-col justify-between"
            >
              {/* Photo Image */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.rideNameEn}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-115"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Ride Name Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-black text-slate-950 bg-amber-400/95 px-3 py-1 rounded-full shadow-lg">
                    {isBangla ? photo.rideNameBn : photo.rideNameEn}
                  </span>
                </div>

                {/* Social engagement */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 text-[11px] font-bold text-white bg-slate-950/80 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                  <span className="flex items-center gap-1 text-rose-400">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    {photo.likes}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {isBangla ? photo.titleBn : photo.titleEn}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {isBangla ? "আসল রাইড ছবি" : "Authentic Ride Photo"}
                  </span>
                  <Link
                    href="/gallery"
                    className="text-slate-400 hover:text-white font-semibold transition-colors"
                  >
                    {isBangla ? "আরও ছবি →" : "View More →"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

