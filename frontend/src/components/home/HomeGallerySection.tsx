"use client";

import React, { useState } from "react";
import { Sparkles, Camera, X, Maximize2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function HomeGallerySection() {
  const { isBangla } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filters = [
    { id: "all", labelEn: "All Moments", labelBn: "সকল দৃশ্য" },
    { id: "water", labelEn: "Water Oasis (Real)", labelBn: "ওয়াটার পার্ক (আসল ড্রোন)" },
    { id: "dino", labelEn: "Dino Kingdom", labelBn: "ডাইনো সাফারি" },
    { id: "thrill", labelEn: "Thrill Galaxy", labelBn: "থ্রিল রাইডস" },
  ];

  const items = [
    {
      id: "aerial",
      category: "water",
      titleEn: "Wave Pool & Lazy River Canal",
      titleBn: "ওয়েভ পুল ও লেজি রিভার ক্যানেল",
      descEn: "Heart of Anowar City Magic Island Water Park",
      descBn: "ম্যাজিক আইল্যান্ড ওয়াটার পার্কের কেন্দ্রস্থল",
      src: "/images/Water%20World/Water%20Cover%20Pic.png",
      tagEn: "★ Authentic Water World Photo",
      tagBn: "★ আসল ওয়াটার ওয়ার্ল্ড ফটো",
      span: "md:col-span-7",
      height: "h-[420px]",
    },
    {
      id: "water-slides",
      category: "water",
      titleEn: "Towering High-Speed Water Slides",
      titleBn: "বিশাল স্পিড ওয়াটার স্লাইডার টাওয়ার",
      descEn: "High-adrenaline racing flumes plunging into crystal splash lagoons",
      descBn: "তীব্র গতিতে স্লাইড করে ওয়াটার পুলে ঝাঁপিয়ে পড়ার রোমাঞ্চ",
      src: "/images/Water%20World/Water-4.png",
      tagEn: "Speed Slides",
      tagBn: "স্পিড স্লাইডার",
      span: "md:col-span-5",
      height: "h-[420px]",
    },
    {
      id: "dino",
      category: "dino",
      titleEn: "Prehistoric Rainforest Canopy",
      titleBn: "প্রাগৈতিহাসিক রেইনফরেস্ট ক্যানোপি",
      descEn: "Elevated boardwalk & roaring animatronics",
      descBn: "উঁচু কাঠের ফুটব্রিজ ও জীবন্ত ডাইনোসর",
      src: "/images/Dino%20World/Dino%20Cover%20PIC.webp",
      tagEn: "Dino Zone",
      tagBn: "ডাইনো জোন",
      span: "md:col-span-6",
      height: "h-[380px]",
    },
    {
      id: "dino-rex",
      category: "dino",
      titleEn: "Colossal Apex T-Rex Animatronic",
      titleBn: "পূর্ণাকৃতির জীবন্ত টি-রেক্স রোবোটিক্স",
      descEn: "Face-to-face with the life-sized pneumatic roaring predator",
      descBn: "৪৫ ফুট উঁচু জীবন্ত গর্জনরত রোবোটিক টি-রেক্সের মুখোমুখি",
      src: "/images/Dino%20World/Dino_1.webp",
      tagEn: "T-Rex Encounter",
      tagBn: "টি-রেক্স সাফারি",
      span: "md:col-span-6",
      height: "h-[380px]",
    },
    {
      id: "water-river",
      category: "water",
      titleEn: "Tropical Lazy River & Water Basin",
      titleBn: "ট্রপিক্যাল লেজি রিভার ও ওয়াটার বেসিন",
      descEn: "Gentle currents meandering through scenic bridges & palm canopies",
      descBn: "শান্ত জলের স্রোতধারায় টিউব ভাসিয়ে ঘুরে বেড়ানোর অপূর্ব অভিজ্ঞতা",
      src: "/images/Water%20World/Water-2.png",
      tagEn: "Lazy River",
      tagBn: "লেজি রিভার",
      span: "md:col-span-6",
      height: "h-[380px]",
    },
    {
      id: "thrill",
      category: "thrill",
      titleEn: "Magic Island Thrill World & Rides",
      titleBn: "ম্যাজিক আইল্যান্ড থ্রিল ওয়ার্ল্ড ও রাইডস",
      descEn: "Authentic mechanical rides, carnival energy, and skyline views",
      descBn: "আনোয়ার সিটি ম্যাজিক আইল্যান্ডের আকর্ষণীয় মেকানিক্যাল রাইডস ও কার্নিভাল আনন্দ",
      src: "/images/Thrill%20World/Thrill%20Cover%20Pic.png",
      tagEn: "★ Authentic Thrill World Cover",
      tagBn: "★ আসল থ্রিল ওয়ার্ল্ড কভার",
      span: "md:col-span-6",
      height: "h-[360px]",
    },
    {
      id: "thrill-ride-2",
      category: "thrill",
      titleEn: "Sky High Panoramic Thrill",
      titleBn: "আকাশছোঁয়া প্যানোরামিক থ্রিল",
      descEn: "Family swings, spinning excitement, and panoramic park views",
      descBn: "উঁচু ঘূর্ণায়মান দোলনা ও পরিবারের নির্মল আনন্দের মুহূর্ত",
      src: "/images/Thrill%20World/Thrill-1.webp",
      tagEn: "Thrill Ride",
      tagBn: "থ্রিল রাইড",
      span: "md:col-span-6",
      height: "h-[360px]",
    },
  ];

  const visibleItems = items.filter(
    (item) => selectedFilter === "all" || item.category === selectedFilter
  );

  return (
    <section
      className="py-12 sm:py-16 bg-[#FFFDF5] relative"
      data-purpose="experience-gallery"
      id="gallery"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FFC857] text-[#173B42] text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Camera className="w-4 h-4 text-[#087E8B]" />
            <span>{isBangla ? "আসল মুহূর্ত ও ভিজ্যুয়ালস" : "Memorable Park Moments"}</span>
          </div>

          <h2 className="section-heading-main text-[#173B42] tracking-tight">
            {isBangla ? "স্মরণীয় মুহূর্ত ও" : "EXPERIENCE"}{" "}
            <span className="text-gradient-park">
              {isBangla ? "গ্যালারি ঝলক" : "MAGIC ISLAND MOMENTS"}
            </span>
          </h2>

          <p className="text-[#173B42]/80 text-sm sm:text-base max-w-xl mt-2 font-sans leading-relaxed">
            {isBangla
              ? "আমাদের ফটকের ভেতরে প্রবেশ করার আগেই দেখে নিন বিশাল ওয়েভ লেগুন, ডাইনোসর সাফারি এবং অ্যামিউজমেন্ট পার্কের জীবন্ত দৃশ্য।"
              : "Glimpse the joy awaiting you inside our gates across our aquatic wave lagoon, prehistoric dinosaur jungle, and thrill attractions."}
          </p>

          {/* Gallery Filter Tabs */}
          <div
            className="flex flex-wrap gap-2 mt-6 p-1.5 rounded-full bg-white border-2 border-[#087E8B]/20 shadow-sm"
            data-purpose="gallery-filters"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? "bg-[#087E8B] text-white shadow-md shadow-[#087E8B]/20"
                    : "text-[#173B42] hover:bg-[#FFFDF5]"
                }`}
              >
                {isBangla ? f.labelBn : f.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item.src)}
              className={`${item.span} relative rounded-3xl overflow-hidden border-2 border-[#087E8B]/20 shadow-md group cursor-pointer ${item.height}`}
            >
              <img
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                src={item.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173B42]/85 via-[#173B42]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>

              <div className="absolute top-4 left-4 bg-[#087E8B] text-white text-[11px] font-heading font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                {isBangla ? item.tagBn : item.tagEn}
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold font-heading mb-1 text-white">
                    {isBangla ? item.titleBn : item.titleEn}
                  </h4>
                  <p className="text-xs text-yellow-100 font-sans">
                    {isBangla ? item.descBn : item.descEn}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#FFC857] group-hover:text-[#173B42] transition-colors shadow">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              alt="Anowar City Magic Island Enlarge"
              className="max-w-full max-h-[85vh] rounded-3xl object-contain shadow-2xl border-2 border-white/20"
              src={lightboxImage}
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#FFC857] p-2 cursor-pointer transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
