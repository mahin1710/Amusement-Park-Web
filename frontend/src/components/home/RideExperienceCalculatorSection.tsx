"use client";

import React, { useState, useMemo } from "react";
import {
  Compass,
  Waves,
  Footprints,
  FerrisWheel,
  Sparkles,
  Plus,
  Check,
  X,
  Trash2,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import {
  RIDE_EXPERIENCE_ITEMS,
  RIDE_CATEGORIES,
  RideCategory,
  RideExperienceItem,
  formatRidePrice,
} from "@/config/ridePricing";
import { businessConfig } from "@/config/business";

export function RideExperienceCalculatorSection() {
  const { isBangla } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<RideCategory>("all");
  const [selectedRideIds, setSelectedRideIds] = useState<string[]>([]);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Filter rides based on category
  const filteredRides = useMemo(() => {
    if (selectedCategory === "all") return RIDE_EXPERIENCE_ITEMS;
    return RIDE_EXPERIENCE_ITEMS.filter((ride) => ride.category === selectedCategory);
  }, [selectedCategory]);

  // Selected rides list
  const selectedRides = useMemo(() => {
    return RIDE_EXPERIENCE_ITEMS.filter((ride) => selectedRideIds.includes(ride.id));
  }, [selectedRideIds]);

  // Total estimated price
  const totalEstimatedCost = useMemo(() => {
    return selectedRides.reduce((sum, ride) => sum + ride.estimatedPriceBDT, 0);
  }, [selectedRides]);

  // Toggle selection
  const toggleRideSelection = (id: string) => {
    setSelectedRideIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedRideIds([]);
    setIsMobileSummaryOpen(false);
  };

  // WhatsApp inquiry link with selected rides
  const whatsappInquiryUrl = useMemo(() => {
    const phone = businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "");
    if (selectedRides.length === 0) {
      const defaultText = isBangla
        ? "হ্যালো ম্যাজিক আইল্যান্ড, আমি রাইডস ও টিকিট মূল্য সম্পর্কে জানতে চাই।"
        : "Hello Magic Island, I want to inquire about rides and ticket prices.";
      return `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;
    }

    const rideList = selectedRides
      .map((r) => `- ${isBangla ? r.name.bn : r.name.en} (৳${r.estimatedPriceBDT})`)
      .join("\n");

    const message = isBangla
      ? `হ্যালো ম্যাজিক আইল্যান্ড! আমি ওয়েবসাইটের রাইড ক্যালকুলেটর থেকে নিচের ${selectedRides.length}টি রাইড পছন্দ করেছি:\n\n${rideList}\n\nমোট আনুমানিক বাজেট: ৳${totalEstimatedCost}/= TK\n\nএই রাইডগুলোর টিকেট ও পার্ক ভিজিট সম্পর্কে বিস্তারিত জানতে চাই।`
      : `Hello Magic Island! I selected the following ${selectedRides.length} rides from your Ride Calculator:\n\n${rideList}\n\nTotal Estimated Cost: ৳${totalEstimatedCost}/= TK\n\nI would like to inquire about ticket availability and group discounts.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [selectedRides, totalEstimatedCost, isBangla]);

  const getCategoryIcon = (catId: RideCategory) => {
    switch (catId) {
      case "water-park":
        return <Waves className="w-4 h-4" />;
      case "thrill-world":
        return <FerrisWheel className="w-4 h-4" />;
      case "dino-zone":
        return <Footprints className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  const getRealmPillStyle = (category: string) => {
    switch (category) {
      case "water-park":
        return "bg-[#35C6C8] text-white border-[#35C6C8]";
      case "dino-zone":
        return "bg-[#00C9A7] text-[#173B42] border-[#00C9A7]";
      case "thrill-world":
        return "bg-[#845EC2] text-white border-[#845EC2]";
      default:
        return "bg-[#FF914D] text-white border-[#FF914D]";
    }
  };

  return (
    <section
      id="ride-calculator"
      className="py-14 sm:py-20 bg-[#FFFDF5] relative overflow-hidden"
      data-purpose="ride-experience-calculator"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#FF914D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FF914D]/30 text-[#173B42] text-xs font-heading font-black uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FF914D]" />
            <span>
              {isBangla ? "রাইড এক্সপেরিয়েন্স ও বাজেট ক্যালকুলেটর" : "Ride Experience & Ticket Calculator"}
            </span>
          </div>

          <h2 className="section-heading-main text-[#173B42] tracking-tight">
            {isBangla ? "আপনার পছন্দের" : "CHOOSE YOUR"}{" "}
            <span className="text-gradient-park">
              {isBangla ? "ম্যাজিক আইল্যান্ড অভিজ্ঞতা" : "MAGIC ISLAND EXPERIENCE"}
            </span>
          </h2>

          <p className="text-[#173B42]/80 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-sans leading-relaxed">
            {isBangla
              ? "আপনার প্রিয় আকর্ষণগুলো ঘুরে দেখুন, পছন্দের রাইডগুলো সিলেক্ট করুন এবং আপনার নিখুঁত অ্যাডভেঞ্চারের আনুমানিক বাজেট হিসাব করুন।"
              : "Explore your favorite attractions, select the rides you love, and calculate your perfect adventure."}
          </p>

          {/* Pricing Estimation Disclaimer Banner */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs font-medium text-left max-w-2xl mx-auto shadow-2xs">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="leading-snug">
              {isBangla
                ? "বিজ্ঞপ্তি: প্রদর্শিত রাইড মূল্য আনুমানিক খসড়া বা নির্দেশক ট্যারিফ, যা দর্শনার্থীদের হিসাব ও ভ্রমণের সুবিধার্থে দেওয়া হয়েছে। পার্কের টিকিট কাউন্টারে অফিশিয়াল প্যাকেজে মূল্যে পরিবর্তন হতে পারে।"
                : "Note: Displayed ticket prices are estimated indicative tariffs for budget planning. Actual park gate offers and seasonal combo packages may vary."}
            </span>
          </div>
        </div>

        {/* Category Navigation Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-12">
          {RIDE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? RIDE_EXPERIENCE_ITEMS.length
                : RIDE_EXPERIENCE_ITEMS.filter((r) => r.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                type="button"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-black tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#FF914D] text-white shadow-lg shadow-[#FF914D]/25 scale-105 border-2 border-[#FF914D]"
                    : "bg-white text-[#173B42] border-2 border-[#FF914D]/20 hover:border-[#FF914D] hover:bg-[#FF914D]/10"
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{isBangla ? cat.labelBn : cat.labelEn}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-[#FFFDF5] text-[#173B42]/70 border border-[#173B42]/10"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Experience Grid + Live Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ride Experience Cards Grid (8 cols) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRides.map((ride) => {
                const isSelected = selectedRideIds.includes(ride.id);

                return (
                  <div
                    key={ride.id}
                    onClick={() => toggleRideSelection(ride.id)}
                    className={`park-card rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-300 relative bg-white ${
                      isSelected
                        ? "border-2 border-[#00C9A7] ring-4 ring-[#00C9A7]/20 shadow-xl scale-[1.01]"
                        : "border-2 border-[#FF914D]/20 hover:border-[#FF914D] hover:shadow-xl"
                    }`}
                    style={{ isolation: "isolate" }}
                  >
                    {/* Top Image Banner */}
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#FFFDF5] border-b-2 border-[#FF914D]/15">
                      <img
                        src={ride.imageUrl}
                        alt={ride.name.en}
                        className="w-full h-[calc(100%+2px)] -top-[1px] object-cover group-hover:scale-106 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

                      {/* Top Badges: Category & Thrill */}
                      <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-heading font-black uppercase tracking-wider shadow-sm border ${getRealmPillStyle(
                            ride.category
                          )}`}
                        >
                          {isBangla ? ride.categoryLabel.bn : ride.categoryLabel.en}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#173B42] text-[11px] font-heading font-bold shadow-sm">
                          {isBangla ? ride.thrillLevel.bn : ride.thrillLevel.en}
                        </span>
                      </div>

                      {/* Prominent Selection Indicator in Top Right */}
                      <div className="absolute top-3.5 right-3.5">
                        {isSelected ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C9A7] text-white text-xs font-heading font-black shadow-lg animate-pulse border-2 border-white">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>{isBangla ? "নির্বাচিত" : "Selected"}</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#173B42] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-white">
                            <Plus className="w-4 h-4 text-[#FF914D]" />
                          </div>
                        )}
                      </div>

                      {/* Bottom Image Overlay Tagline */}
                      <div className="absolute bottom-3 left-4 right-4">
                        <p className="text-white text-xs font-heading font-bold drop-shadow-md line-clamp-1">
                          {isBangla ? ride.tagline.bn : ride.tagline.en}
                        </p>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-heading font-black text-[#173B42] group-hover:text-[#FF914D] transition-colors leading-snug">
                          {isBangla ? ride.name.bn : ride.name.en}
                        </h3>

                        <p className="mt-2 text-xs text-[#173B42]/75 font-sans leading-relaxed line-clamp-2">
                          {isBangla ? ride.shortDescription.bn : ride.shortDescription.en}
                        </p>
                      </div>

                      {/* Price and Action Button */}
                      <div className="pt-4 border-t border-[#FF914D]/15 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#173B42]/60 block font-heading">
                            {isBangla ? "আনুমানিক টিকিট" : "Estimated Ticket"}
                          </span>
                          <span className="text-lg font-heading font-black text-[#FF914D]">
                            {formatRidePrice(ride.estimatedPriceBDT)}
                          </span>
                        </div>

                        {/* Interactive Select Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRideSelection(ride.id);
                          }}
                          className={`px-4 py-2 rounded-full text-xs font-heading font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                            isSelected
                              ? "bg-[#00C9A7] hover:bg-emerald-600 text-white shadow-md scale-102"
                              : "bg-white hover:bg-[#FF914D] text-[#173B42] hover:text-white border-2 border-[#FF914D]/40 hover:border-[#FF914D]"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>{isBangla ? "সিলেক্টেড" : "Selected"}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{isBangla ? "রাইড যোগ করুন" : "Select Ride"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Price Calculator & Selected Summary (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="park-card rounded-3xl p-6 sm:p-7 bg-white border-2 border-[#FF914D]/30 shadow-xl space-y-6">
              {/* Summary Header */}
              <div className="flex items-center justify-between border-b border-[#FF914D]/15 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-heading font-black text-[#FF914D] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isBangla ? "লাইভ ক্যালকুলেটর" : "Live Calculator"}</span>
                  </div>
                  <h3 className="text-xl font-heading font-black text-[#173B42] mt-0.5">
                    {isBangla ? "নির্বাচিত আকর্ষণসমূহ" : "Selected Attractions"}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#FF914D]/15 text-[#FF914D] text-xs font-heading font-black">
                  {selectedRides.length} {isBangla ? "টি রাইড" : "Rides"}
                </span>
              </div>

              {/* Selected Rides Scrollable List */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {selectedRides.length === 0 ? (
                  <div className="text-center py-10 px-4 rounded-2xl bg-[#FFFDF5] border border-dashed border-[#FF914D]/30 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#FF914D]/15 text-[#FF914D] flex items-center justify-center mx-auto text-xl">
                      🎢
                    </div>
                    <h4 className="text-sm font-heading font-bold text-[#173B42]">
                      {isBangla ? "কোনো রাইড সিলেক্ট করা নেই" : "No Rides Selected Yet"}
                    </h4>
                    <p className="text-xs text-[#173B42]/70 leading-relaxed font-sans">
                      {isBangla
                        ? "বামপাশের যেকোনো আকর্ষণ কার্ডের 'রাইড যোগ করুন' বাটনে ক্লিক করে আপনার তালিকা তৈরি করুন।"
                        : "Click 'Select Ride' on any attraction card to add it to your adventure budget."}
                    </p>
                  </div>
                ) : (
                  selectedRides.map((ride, index) => (
                    <div
                      key={ride.id}
                      className="p-3 rounded-2xl bg-[#FFFDF5] border border-[#FF914D]/20 flex items-center justify-between gap-3 group hover:border-[#FF914D]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs font-heading font-black text-[#173B42]/40 w-4 text-center shrink-0">
                          {index + 1}
                        </span>
                        <img
                          src={ride.imageUrl}
                          alt={ride.name.en}
                          className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#FF914D]/20"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-heading font-bold text-[#173B42] truncate">
                            {isBangla ? ride.name.bn : ride.name.en}
                          </h4>
                          <span className="text-[10px] text-[#173B42]/60 uppercase font-heading font-semibold block">
                            {isBangla ? ride.categoryLabel.bn : ride.categoryLabel.en}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-heading font-black text-[#FF914D]">
                          ৳{ride.estimatedPriceBDT}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleRideSelection(ride.id)}
                          className="w-7 h-7 rounded-full bg-white text-[#173B42]/50 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors border border-gray-200"
                          title={isBangla ? "রাইড বাদ দিন" : "Remove ride"}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total Calculation & Summary Breakdown */}
              <div className="pt-4 border-t border-[#FF914D]/15 space-y-3">
                <div className="flex items-baseline justify-between text-xs text-[#173B42]/75 font-heading">
                  <span>{isBangla ? "নির্বাচিত রাইডের সংখ্যা:" : "Selected Attractions:"}</span>
                  <span className="font-bold text-[#173B42]">
                    {selectedRides.length} {isBangla ? "টি" : "items"}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#FF914D]/25 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-heading font-black text-[#173B42] uppercase tracking-wider block">
                      {isBangla ? "মোট আনুমানিক খরচ" : "Total Estimated Cost"}
                    </span>
                    <span className="text-[10px] text-[#173B42]/60 font-sans">
                      {isBangla ? "(খসড়া নির্দেশক বাজেট)" : "(Indicative adventure total)"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-heading font-black text-[#FF914D]">
                      {formatRidePrice(totalEstimatedCost)}
                    </span>
                  </div>
                </div>

                {/* Clear All & WhatsApp Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  {selectedRides.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllSelections}
                      className="w-full py-2 text-xs font-heading font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isBangla ? "সকল রাইড বাতিল করুন" : "Clear All Selections"}</span>
                    </button>
                  )}

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-park-primary w-full py-3.5 rounded-2xl text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-transform text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>
                      {selectedRides.length > 0
                        ? isBangla
                          ? "হোয়াটসঅ্যাপে রাইড প্যাকেজ আলোচনা"
                          : "Inquire Rides on WhatsApp"
                        : isBangla
                        ? "হোয়াটসঅ্যাপে সাধারণ অনুসন্ধান"
                        : "General WhatsApp Inquiry"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Floating Bottom Summary Bar (Active only when items selected) */}
      {selectedRides.length > 0 && (
        <div className="lg:hidden fixed bottom-20 inset-x-4 z-40 animate-fade-in-up">
          <div className="bg-[#173B42] text-white p-3.5 rounded-2xl shadow-2xl border-2 border-[#FF914D] flex items-center justify-between gap-3 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-ping" />
                <span className="text-xs font-heading font-bold text-[#FFC75F]">
                  {selectedRides.length} {isBangla ? "টি রাইড নির্বাচিত" : "Rides Selected"}
                </span>
              </div>
              <div className="text-lg font-heading font-black text-white">
                {formatRidePrice(totalEstimatedCost)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileSummaryOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-heading font-bold"
              >
                {isBangla ? "বিস্তারিত" : "Summary"}
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-park-primary px-4 py-2 rounded-xl text-xs font-heading font-black flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isBangla ? "বুকিং তথ্য" : "Inquire"}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Modal Drawer for Summary Breakdown */}
      {isMobileSummaryOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setIsMobileSummaryOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-slide-up shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FF914D]/20 pb-3">
              <div>
                <h3 className="text-lg font-heading font-black text-[#173B42]">
                  {isBangla ? "নির্বাচিত রাইডের তালিকা" : "Selected Rides Breakdown"}
                </h3>
                <span className="text-xs text-[#173B42]/70 font-sans">
                  {selectedRides.length} {isBangla ? "টি আকর্ষণ অন্তর্ভুক্ত" : "Attractions Selected"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSummaryOpen(false)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#173B42]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="space-y-2.5 max-h-[45vh] overflow-y-auto">
              {selectedRides.map((ride, idx) => (
                <div
                  key={ride.id}
                  className="p-3 rounded-2xl bg-[#FFFDF5] border border-[#FF914D]/20 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-bold text-[#173B42]/50 w-4">{idx + 1}</span>
                    <img
                      src={ride.imageUrl}
                      alt={ride.name.en}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-heading font-bold text-[#173B42] truncate">
                        {isBangla ? ride.name.bn : ride.name.en}
                      </h4>
                      <span className="text-[10px] text-[#173B42]/60">
                        {isBangla ? ride.categoryLabel.bn : ride.categoryLabel.en}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-heading font-black text-[#FF914D]">
                      ৳{ride.estimatedPriceBDT}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleRideSelection(ride.id)}
                      className="p-1 rounded-full text-red-500 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total in Drawer */}
            <div className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#FF914D]/25 flex items-baseline justify-between">
              <span className="text-xs font-heading font-black text-[#173B42] uppercase">
                {isBangla ? "সর্বমোট আনুমানিক খরচ" : "Total Combined Estimate"}
              </span>
              <span className="text-2xl font-heading font-black text-[#FF914D]">
                {formatRidePrice(totalEstimatedCost)}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={clearAllSelections}
                className="w-full py-2 text-xs font-heading font-bold text-red-600 hover:bg-red-50 rounded-xl"
              >
                {isBangla ? "সব বাতিল করুন" : "Clear All"}
              </button>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-park-primary w-full py-3 rounded-2xl text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBangla ? "হোয়াটসঅ্যাপে অনুসন্ধান" : "Inquire via WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
