"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Waves, Footprints, FerrisWheel, ArrowRight, Compass, Sparkles } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { ATTRACTIONS_DATA } from "@/data/attractions";

export default function AttractionsPage() {
  const { isBangla } = useTranslation();
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedThrill, setSelectedThrill] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredAttractions = ATTRACTIONS_DATA.filter((a) => {
    const matchesZone = selectedZone === "all" || a.zone === selectedZone;
    const matchesThrill = selectedThrill === "all" || a.thrillLevel.toLowerCase() === selectedThrill.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      a.name.en.toLowerCase().includes(query) ||
      a.name.bn.toLowerCase().includes(query) ||
      a.description.en.toLowerCase().includes(query) ||
      a.description.bn.toLowerCase().includes(query);

    return matchesZone && matchesThrill && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554] py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FFD93D] shadow-sm mb-4">
            <Compass className="w-4 h-4 text-[#FF6B35]" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#172554]">
              {isBangla ? "সকল রাইডস ও আকর্ষণসমূহ" : "Explore All Attractions"}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-[#172554] tracking-tight leading-tight">
            {isBangla ? (
              <>
                রোমাঞ্চ ও আনন্দের <br />
                <span className="text-gradient-park">অফুরন্ত আকর্ষণীয় জগৎ</span>
              </>
            ) : (
              <>
                Discover Every Wonder at <br />
                <span className="text-gradient-park">Anowar City Magic Island</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-[#3B4B75] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            {isBangla
              ? "বাংলাদেশের সর্ববৃহৎ কৃত্রিম ওয়েভ পুল, জীবন্ত ডাইনোসর সাফারি এবং আকাশছোঁয়া রোলারকোস্টার — প্রতিটি আকর্ষণের বিস্তারিত জানতে কার্ডে ক্লিক করুন।"
              : "From Bangladesh's largest ocean wave pool to life-sized animatronic dinosaurs and high-velocity coasters. Click any attraction to explore its dedicated page."}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-6 mb-12 rounded-3xl bg-white border-2 border-[#FED7AA] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6B35]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBangla ? "রাইডের নাম লিখে খুঁজুন..." : "Search attractions by name..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FFF9ED] border-2 border-[#FED7AA] text-xs sm:text-sm text-[#172554] placeholder-slate-400 focus:outline-none focus:border-[#FF6B35] font-sans"
              />
            </div>

            {/* Zone Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: isBangla ? "সব জোন" : "All Realms", icon: null },
                { id: "water-park", label: isBangla ? "ওয়াটার পার্ক" : "Water Oasis", icon: Waves },
                { id: "dino-zone", label: isBangla ? "ডাইনো জোন" : "Dino Kingdom", icon: Footprints },
                { id: "amusement-park", label: isBangla ? "অ্যামিউজমেন্ট" : "Thrill Galaxy", icon: FerrisWheel },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedZone === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedZone(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-heading font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/20"
                        : "bg-[#FFF9ED] border-2 border-[#FED7AA] text-[#172554] hover:border-[#FF6B35]"
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Thrill Level Filter */}
            <div className="flex items-center gap-1.5 self-start md:self-auto">
              <Filter className="w-4 h-4 text-[#FF6B35] shrink-0" />
              <select
                value={selectedThrill}
                onChange={(e) => setSelectedThrill(e.target.value)}
                className="bg-[#FFF9ED] border-2 border-[#FED7AA] text-xs rounded-full px-4 py-2 text-[#172554] focus:outline-none focus:border-[#FF6B35] font-heading font-bold cursor-pointer"
              >
                <option value="all">{isBangla ? "সকল রোমাঞ্চ মাত্রা" : "All Thrill Levels"}</option>
                <option value="extreme">{isBangla ? "চরম রোমাঞ্চ (Extreme)" : "Extreme Thrill"}</option>
                <option value="moderate">{isBangla ? "মাঝারি (Moderate)" : "Moderate"}</option>
                <option value="mild">{isBangla ? "সহজ ও পারিবারিক (Mild)" : "Mild / Family"}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Attractions Grid */}
        {filteredAttractions.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-white border-2 border-[#FED7AA]">
            <p className="text-[#3B4B75] text-sm font-heading">
              {isBangla ? "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো রাইড পাওয়া যায়নি।" : "No attractions found matching your search criteria."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((ride) => (
              <Link
                key={ride.id}
                href={`/attractions/${ride.id}`}
                className="park-card overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={ride.imageUrl}
                    alt={ride.name.en}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/80 via-transparent to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-[#172554] text-xs font-heading font-bold shadow-md">
                      {isBangla ? ride.thrillLevelBn : ride.thrillLevel}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FFD93D] text-[#172554] text-xs font-heading font-bold uppercase shadow-md">
                      {ride.zone.replace("-", " ")}
                    </span>
                  </div>

                  {/* Dedicated Page Indicator Badge in Bottom Right */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#FF6B35] font-heading font-bold text-[11px] shadow flex items-center gap-1 group-hover:bg-[#FF6B35] group-hover:text-white transition-colors">
                    <span>{isBangla ? "সম্পূর্ণ পেজ দেখুন" : "View Page"}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#172554] group-hover:text-[#FF6B35] transition-colors leading-tight">
                      {isBangla ? ride.name.bn : ride.name.en}
                    </h3>
                    <p className="text-xs font-heading font-semibold text-[#FF6B35] mt-1 line-clamp-1">
                      {isBangla ? ride.tagline.bn : ride.tagline.en}
                    </p>
                    <p className="mt-2.5 text-xs text-[#3B4B75] leading-relaxed line-clamp-3 font-sans">
                      {isBangla ? ride.description.bn : ride.description.en}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#FED7AA]/40 flex items-center justify-between text-xs">
                    <span className="text-[#3B4B75] text-[11px] font-sans">
                      {isBangla ? ride.heightRequirementBn : ride.heightRequirement}
                    </span>
                    <span className="font-heading font-bold text-[#FF6B35] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{isBangla ? "বিস্তারিত" : "Explore"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
