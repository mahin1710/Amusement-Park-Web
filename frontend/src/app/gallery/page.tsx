"use client";

import React, { useState } from "react";
import { Camera, X, Maximize2, Waves, Footprints, FerrisWheel, Sparkles } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

interface GalleryItem {
  id: string;
  category: "water" | "dino" | "amusement" | "night";
  titleEn: string;
  titleBn: string;
  captionEn: string;
  captionBn: string;
  imageUrl: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    category: "water",
    titleEn: "Tsunami Bay Surge Session",
    titleBn: "সুনামি বে ঢেউয়ের উচ্ছ্বাস",
    captionEn: "Guests riding rolling ocean waves at the computerized wave pool at Magic Island.",
    captionBn: "ম্যাজিক আইল্যান্ডের সুবিশাল ওয়েভ পুলে দর্শনার্থীদের অনাবিল আনন্দের মুহূর্ত।",
    imageUrl: "/images/magic-island-waterpark-aerial.jpg",
  },
  {
    id: "g2",
    category: "dino",
    titleEn: "The Roaring Jurassic Dinosaur Trail",
    titleBn: "গর্জনরত জুরাসিক ডাইনোসর ট্রেইল",
    captionEn: "Encountering robotic apex dinosaurs deep within the prehistoric Dino Zone.",
    captionBn: "জুরাসিক ট্রেইলের গহিনে জীবন্ত গর্জনরত প্রাগৈতিহাসিক রোবোটিক ডাইনোসর।",
    imageUrl: "/images/magic-island-dino.jpg",
  },
  {
    id: "g3",
    category: "amusement",
    titleEn: "High-Speed Thrill Rides & Coaster",
    titleBn: "উত্তেজনাকর অ্যামিউজমেন্ট থ্রিল রাইড",
    captionEn: "Adrenaline-pumping thrill rides and family entertainment across the theme park.",
    captionBn: "অ্যামিউজমেন্ট পার্কে রোমাঞ্চকর রাইড এবং পারিবারিক বিনোদন।",
    imageUrl: "/images/magic-island-thrill.jpg",
  },
  {
    id: "g4",
    category: "water",
    titleEn: "Mega Vortex Funnel Splash",
    titleBn: "মেগা ভর্টেক্স ফানেল স্প্ল্যাশ",
    captionEn: "Four-person family rafts dropping from the 6-story enclosed tower.",
    captionBn: "৬ তলা উচ্চতার অন্ধকার পাইপ থেকে ফানেলে দ্রুতগতির ওয়াটার ড্রপ।",
    imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g5",
    category: "amusement",
    titleEn: "150ft Sky Wheel Sunset Vista",
    titleBn: "১৫০ ফুট স্কাই হুইল সূর্যাস্ত প্যানোরামা",
    captionEn: "360-degree panoramic skyline views from the VIP air-conditioned gondolas.",
    captionBn: "শীতাতপ নিয়ন্ত্রিত গ্লাস কেবিন থেকে সূর্যাস্তের দিগন্তজোড়া অপরূপ দৃশ্য।",
    imageUrl: "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g6",
    category: "night",
    titleEn: "Grand Lakeside Laser & Fountain Spectacle",
    titleBn: "লেকের পানিতে লেজার ও মিউজিক্যাল ফোয়ারা",
    captionEn: "Synchronized aquatic illumination and fireworks lighting up the evening sky.",
    captionBn: "সন্ধ্যায় চোখ ধাঁধানো রঙিন লাইটিং, ফোয়ারা নৃত্য ও সঙ্গীতের মোহনীয় আবহ।",
    imageUrl: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g7",
    category: "dino",
    titleEn: "Junior Paleontologist Sand Lab",
    titleBn: "খুদে প্রত্নতত্ত্ববিদ খনন কার্যক্রম",
    captionEn: "Children discovering hidden prehistoric fossils with excavation brushes.",
    captionBn: "বালির নিচ থেকে ডাইনোসরের প্রাচীন ফসিল আবিষ্কারের শিক্ষণীয় আনন্দ।",
    imageUrl: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g8",
    category: "water",
    titleEn: "Tropical Lazy River Cruise",
    titleBn: "ট্রপিক্যাল লেজি রিভার ক্রুজ",
    captionEn: "Float through misty waterfall caverns on plush dual-rider tubes.",
    captionBn: "ঝর্ণা ও গুহার মধ্য দিয়ে শান্ত জলের স্রোতে টিউব নিয়ে ভেসে চলা।",
    imageUrl: "https://images.unsplash.com/photo-1583344682029-7c87515ecce0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g9",
    category: "amusement",
    titleEn: "Neon Electric Bumper Cars Arena",
    titleBn: "রঙিন ইলেকট্রিক বাম্পার কার এরিনা",
    captionEn: "Action-packed bumper car collisions filled with smiles and family excitement.",
    captionBn: "বন্ধুদের সাথে ধাক্কাধাক্কি ও হাসিখুশির ইলেকট্রিক বাম্পার কার প্রতিযোগিতা।",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g10",
    category: "amusement",
    titleEn: "Flying Chair Swings (Fly Dolna)",
    titleBn: "উড়ন্ত চেয়ার দোলনা (ফ্লাই দোলনা)",
    captionEn: "Gliding through the clouds with panoramic breeze and spinning thrills.",
    captionBn: "বাতাসে মুক্ত ডানায় ভেসে বেড়ানোর আনন্দদায়ক ফ্লাই দোলনা রাইড।",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g11",
    category: "water",
    titleEn: "Kids Mushroom Splash & Rain Dance",
    titleBn: "শিশুদের মাশরুম ঝরনা ও বৃষ্টি নাচ",
    captionEn: "Joyful shallow splash zones with giant dumping buckets and mushroom fountains.",
    captionBn: "শিশুদের জন্য অগভীর নিরাপদ মাশরুম ঝরনা ও ওয়াটার বাকেট স্প্ল্যাশ।",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function GalleryPage() {
  const { t, isBangla } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filtered = GALLERY_DATA.filter((item) => activeTab === "all" || item.category === activeTab);

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-100/90 text-[#FF6B35] text-xs font-black uppercase tracking-widest mb-4 border border-amber-200">
            <Camera className="w-4 h-4 text-[#FF6B35]" />
            <span>{isBangla ? "মেমোরিজ অ্যান্ড গ্যালারি" : "Photo Gallery"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#172554] font-heading tracking-tight">
            {isBangla ? "ম্যাজিক আইল্যান্ডের জাদুকরী মুহূর্ত" : "MOMENTS AT MAGIC ISLAND"}
          </h1>
          <p className="mt-4 text-[#172554]/75 text-sm sm:text-base leading-relaxed font-medium">
            {isBangla
              ? "দর্শনার্থীদের উচ্ছ্বাস, রোমাঞ্চকর রাইড এবং অনাবিল পারিবারিক আনন্দের আসল চিত্র।"
              : "Discover real smiles, exhilarating splashes, roaring prehistoric encounters, and magical island moments."}
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border-2 border-amber-200 text-xs text-[#172554] shadow-sm">
            <span className="w-6 h-6 rounded-full bg-[#1877F2] text-white font-bold text-xs flex items-center justify-center">
              f
            </span>
            <span className="font-semibold">
              {isBangla ? "অফিশিয়াল ফেসবুক পেজ:" : "Official Facebook Community:"}
            </span>
            <a
              href="https://www.facebook.com/ac.magicisland/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-[#FF6B35] hover:underline"
            >
              fb.com/ac.magicisland
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: "all", label: isBangla ? "সব ছবি" : "All Photos", icon: null },
            { id: "water", label: isBangla ? "ওয়াটার পার্ক" : "Water Park", icon: Waves },
            { id: "dino", label: isBangla ? "ডাইনো জোন" : "Dino Zone", icon: Footprints },
            { id: "amusement", label: isBangla ? "অ্যামিউজমেন্ট" : "Amusement Park", icon: FerrisWheel },
            { id: "night", label: isBangla ? "সান্ধ্যকালীন রূপ" : "Nightfall", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FF6B35] text-white shadow-lg scale-105"
                    : "bg-white border-2 border-amber-200 text-[#172554] hover:bg-amber-50"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer bg-white border-2 border-amber-200/80 shadow-md hover:border-[#FF6B35] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/85 via-[#172554]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-[#172554]/80 text-[#FFD93D] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] uppercase font-black text-[#FFD93D] tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-sm font-black text-white group-hover:text-[#FFD93D] transition-colors font-heading">
                  {isBangla ? item.titleBn : item.titleEn}
                </h3>
                <p className="text-[11px] text-white/80 line-clamp-1 font-medium">
                  {isBangla ? item.captionBn : item.captionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#172554]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-white border-2 border-amber-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#172554]/80 text-white hover:text-[#FFD93D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[65vh] w-full overflow-hidden bg-[#172554] flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.titleEn}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-white border-t border-amber-100 space-y-1">
              <span className="text-xs uppercase font-black text-[#FF6B35]">
                {selectedPhoto.category.toUpperCase()}
              </span>
              <h3 className="text-xl font-black text-[#172554] font-heading">
                {isBangla ? selectedPhoto.titleBn : selectedPhoto.titleEn}
              </h3>
              <p className="text-sm text-[#172554]/80 font-medium">
                {isBangla ? selectedPhoto.captionBn : selectedPhoto.captionEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
