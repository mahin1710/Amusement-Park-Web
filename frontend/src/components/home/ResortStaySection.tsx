"use client";

import React from "react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function ResortStaySection() {
  const { isBangla } = useTranslation();
  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    isBangla
      ? "হ্যালো ম্যাজিক আইল্যান্ড, আমি রিসোর্ট রুম বুকিং / ডে-স্টে সম্পর্কে জানতে চাই। অনুগ্রহ করে রুমের ধরন ও ভাড়ার তালিকা জানান।"
      : "Hello Magic Island, I want to inquire about room booking / stay at Magic Island Resort. Please share available room categories and rates."
  )}`;

  const rooms = [
    {
      id: "deluxe-pool",
      titleEn: "Deluxe Pool-View Room",
      titleBn: "ডিলাক্স পুল-ভিউ রুম",
      badgeEn: "King Bed • Poolside Balcony",
      badgeBn: "কিং বেড • পুলসাইড ব্যালকনি",
      categoryEn: "Couples & Small Families",
      categoryBn: "কাপল ও ছোট পরিবারের জন্য",
      descEn:
        "Spacious air-conditioned room featuring private balcony overlooking the turquoise wave pool, luxury plush bedding, smart entertainment, and modern bathroom amenities.",
      descBn:
        "বিশাল শীতাতপ নিয়ন্ত্রিত রুম, যেখান থেকে সরাসরি দেখা যায় নীল ওয়েভ পুলের দৃশ্য। সাথে আরামদায়ক কিং বেড, স্মার্ট টিভি, হাই-স্পিড ওয়াইফাই ও আধুনিক বাথরুম সুবিধা।",
      featuresEn: [
        "1 King Bed (2 Adults + 1 Child)",
        "Private Balcony with Wave Pool View",
        "Complimentary Breakfast for 2",
        "Air Conditioned & 24/7 Generator",
        "High-Speed Wi-Fi & Smart TV",
      ],
      featuresBn: [
        "১টি কিং বেড (২ প্রাপ্তবয়স্ক + ১ শিশু)",
        "ওয়েভ পুল ভিউ সহ নিজস্ব ব্যালকনি",
        "২ জনের জন্য কমপ্লিমেন্টারি ব্রেকফাস্ট",
        "শীতাতপ নিয়ন্ত্রিত ও ২৪/৭ জেনারেটর ব্যাকআপ",
        "হাই-স্পিড ওয়াই-ফাই ও স্মার্ট টিভি",
      ],
      rateEn: "৳ [Rate Placeholder] / Night",
      rateBn: "৳ [ভাড়ার প্লেসহোল্ডার] / রাত",
    },
    {
      id: "executive-suite",
      titleEn: "Executive Family Suite",
      titleBn: "এক্সিকিউটিভ ফ্যামিলি স্যুট",
      badgeEn: "★ MOST POPULAR • 2 Queen Beds",
      badgeBn: "★ সর্বাধিক জনপ্রিয় • ২টি কুইন বেড",
      categoryEn: "Large Family & Friends Group",
      categoryBn: "বড় পরিবার ও বন্ধু মহলের জন্য",
      descEn:
        "Two interconnected spacious rooms with cozy living lounge, mini-refrigerator, panoramic park horizons, and express VIP access to the water attractions.",
      descBn:
        "পরিবারের সবার একসাথে থাকার জন্য ২টি ইন্টারকানেক্টেড রুম ও ড্রয়িং লাউঞ্জ। সাথে মিনি ফ্রিজ, মনোরম পার্ক ভিউ এবং পার্ক রাইডসে ভিআইপি অগ্রাধিকার সুবিধা।",
      featuresEn: [
        "2 Queen Beds (Up to 4-5 Guests)",
        "Separate Living Area & Sofa Setup",
        "Complimentary Breakfast for 4",
        "Priority VIP Water Park Access",
        "24/7 Room Service & Security",
      ],
      featuresBn: [
        "২টি কুইন বেড (৪-৫ জনের থাকার সুব্যবস্থা)",
        "পৃথক বসার লাউঞ্জ ও সোফা কর্নার",
        "৪ জনের জন্য ফ্রি সুস্বাদু বুফে নাস্তা",
        "ওয়াটার পার্কে ভিআইপি অগ্রাধিকার প্রবেশ",
        "২৪/৭ রুম সার্ভিস ও সার্বক্ষণিক নিরাপত্তা",
      ],
      rateEn: "৳ [Rate Placeholder] / Night",
      rateBn: "৳ [ভাড়ার প্লেসহোল্ডার] / রাত",
    },
    {
      id: "presidential-villa",
      titleEn: "VIP Presidential Resort Villa",
      titleBn: "ভিআইপি প্রেসিডেন্সিয়াল রিসোর্ট ভিলা",
      badgeEn: "Ultra Luxury • Private Terrace",
      badgeBn: "আল্ট্রা লাক্সারি • নিজস্ব রুফটপ টেরেস",
      categoryEn: "VIP Getaways & Special Occasions",
      categoryBn: "ভিআইপি গেটঅ্যাওয়ে ও বিশেষ উৎসব",
      descEn:
        "Our finest master retreat boasting private open-air sun terrace, premium jacuzzi soaking tub, dedicated butler service, and complimentary all-inclusive park passes.",
      descBn:
        "আমাদের সর্বশ্রেষ্ঠ লাক্সারি ভিলা। এতে রয়েছে নিজস্ব উন্মুক্ত সান টেরেস, প্রিমিয়াম জাকুজি বাথটাব, সার্বক্ষণিক পার্সোনাল বাটলার সেবা এবং সম্পূর্ণ ফ্রি পার্ক পাস।",
      featuresEn: [
        "Master Bedroom + Guest Bedroom",
        "Private Open-Air Sunset Terrace",
        "Jacuzzi Tub & Luxury Toiletries",
        "Complimentary Unlimited Park Passes",
        "Dedicated Attendant & Fast Check-In",
      ],
      featuresBn: [
        "মাস্টার বেডরুম + পৃথক গেস্ট বেডরুম",
        "সূর্যাস্ত উপভোগের নিজস্ব রুফটপ টেরেস",
        "জাকুজি বাথটাব ও লাক্সারি প্রসাধন",
        "সব জোনের জন্য আনলিমিটেড ফ্রি পার্ক পাস",
        "ডেডিকেটেড অ্যাটেনডেন্ট ও ফাস্ট চেক-ইন",
      ],
      rateEn: "৳ [Rate Placeholder] / Night",
      rateBn: "৳ [ভাড়ার প্লেসহোল্ডার] / রাত",
    },
  ];

  return (
    <section
      className="py-12 sm:py-16 bg-[#FFF9ED] relative"
      data-purpose="resort-stay-rooms"
      id="resort-stay"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FFD93D] text-[#172554] text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <span className="text-base">🏨</span>
            <span>{isBangla ? "রিসোর্ট স্টে ও থাকার সুব্যবস্থা" : "Overnight & Day-Stay Resort Accommodation"}</span>
          </div>
          <h2 className="section-heading-main text-[#172554] tracking-tight">
            {isBangla ? "লাক্সারি রিসোর্ট রুম ও" : "LUXURY ROOMS & RESORT"}{" "}
            <span className="text-gradient-park">
              {isBangla ? "থাকার ব্যবস্থা" : "STAY AVAILABLE"}
            </span>
          </h2>
          <p className="text-[#3B4B75] text-sm sm:text-base max-w-2xl mt-3 font-sans leading-relaxed">
            {isBangla
              ? "সারাদিনের পানির উচ্ছ্বাস ও রাইডস উপভোগ শেষে বিশ্রাম নিতে আনোয়ার সিটি ম্যাজিক আইল্যান্ডেই রয়েছে শীতাতপ নিয়ন্ত্রিত আধুনিক রুম ও স্যুটে থাকার রাজকীয় সুবিধা।"
              : "Extend your excitement into a relaxing staycation. Choose from air-conditioned deluxe pool-view rooms, family suites, and private sunset terraces."}
          </p>
        </div>

        {/* Room Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="park-card overflow-hidden flex flex-col justify-between group"
            >
              {/* Picture Placeholder Box - Specifically Designed with Clear Notice & Upload Space */}
              <div className="relative h-64 bg-[#FFFDF7] border-b-2 border-dashed border-[#FED7AA] flex flex-col items-center justify-center p-6 text-center group-hover:bg-[#FFF7ED] transition-colors">
                {/* Decorative Camera / Image Frame */}
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-dashed border-[#FFD93D] text-[#FF6B35] flex items-center justify-center text-2xl mb-3 shadow-xs group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-camera"></i>
                </div>
                <div className="text-xs font-heading font-bold text-[#172554] uppercase tracking-wider">
                  {isBangla ? "রুমের ছবি যুক্ত করার স্থান" : "Room Photo Placement Area"}
                </div>
                <div className="text-[11px] text-[#3B4B75] font-sans mt-1">
                  {isBangla ? "(ছবি যুক্ত করতে প্রস্তুত • ১২০০ x ৮০০ px)" : "(Ready for Official Photography • 1200x800px)"}
                </div>
                <span className="mt-2 text-[10px] font-heading font-bold text-[#C2410C] bg-[#FFF7ED] px-3 py-1 rounded-full border border-[#FED7AA]">
                  {isBangla ? room.badgeBn : room.badgeEn}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#FF6B35] mb-1">
                    {isBangla ? room.categoryBn : room.categoryEn}
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-[#172554] mb-3">
                    {isBangla ? room.titleBn : room.titleEn}
                  </h3>
                  <p className="text-xs text-[#3B4B75] leading-relaxed mb-6 font-sans">
                    {isBangla ? room.descBn : room.descEn}
                  </p>

                  {/* Room Amenities Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#FED7AA]/40 text-xs text-[#172554] font-sans">
                    {(isBangla ? room.featuresBn : room.featuresEn).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="fa-solid fa-circle-check text-[#55C98B] text-[12px]"></i>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rate & Booking Button */}
                <div className="pt-4 border-t border-[#FED7AA]/40">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-lg font-bold font-heading text-[#172554]">
                      {isBangla ? room.rateBn : room.rateEn}
                    </span>
                    <span className="text-[10px] text-[#3B4B75] uppercase font-heading font-semibold">
                      {isBangla ? "ডে-স্টে / নাইট-স্টে" : "Day / Night Stay"}
                    </span>
                  </div>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-park-primary text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md"
                  >
                    <i className="fa-brands fa-whatsapp text-sm"></i>
                    <span>{isBangla ? "রুম বুকিং অনুসন্ধান করুন" : "Inquire Room Reservation"}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resort Stay Guest Amenities Banner */}
        <div className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#FED7AA] shadow-md">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h4 className="text-xl font-bold font-heading text-[#172554]">
              {isBangla ? "রিসোর্টে অবস্থানকারী অতিথিদের বিশেষ সুবিধাসমূহ" : "Complimentary Resort Guest Privileges"}
            </h4>
            <p className="text-xs text-[#3B4B75] mt-1 font-sans">
              {isBangla
                ? "আমাদের রুমে অবস্থান করলেই পাচ্ছেন পার্ক ও থাকার ক্ষেত্রে সর্বোচ্চ সেবা"
                : "Included with every overnight and day room reservation"}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-[#FED7AA]">
              <i className="fa-solid fa-wifi text-[#38BDF8] text-xl mb-1.5"></i>
              <div className="text-xs font-heading font-bold text-[#172554]">
                {isBangla ? "ফ্রি হাই-স্পিড ওয়াইফাই" : "Free Fast Wi-Fi"}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-[#FED7AA]">
              <i className="fa-solid fa-person-swimming text-[#38BDF8] text-xl mb-1.5"></i>
              <div className="text-xs font-heading font-bold text-[#172554]">
                {isBangla ? "পুলসাইড অ্যাক্সেস" : "Poolside Access"}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-[#FED7AA]">
              <i className="fa-solid fa-utensils text-[#FF6B35] text-xl mb-1.5"></i>
              <div className="text-xs font-heading font-bold text-[#172554]">
                {isBangla ? "কমপ্লিমেন্টারি ব্রেকফাস্ট" : "Free Breakfast"}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-[#FED7AA]">
              <i className="fa-solid fa-shield-halved text-[#55C98B] text-xl mb-1.5"></i>
              <div className="text-xs font-heading font-bold text-[#172554]">
                {isBangla ? "২৪/৭ নিরাপত্তা পাহারা" : "24/7 Security"}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-[#FED7AA]">
              <i className="fa-solid fa-square-parking text-[#8B5CF6] text-xl mb-1.5"></i>
              <div className="text-xs font-heading font-bold text-[#172554]">
                {isBangla ? "সুরক্ষিত ফ্রি পার্কিং" : "Free VIP Parking"}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-[#FED7AA]">
              <i className="fa-solid fa-bell-concierge text-[#FFD93D] text-xl mb-1.5"></i>
              <div className="text-xs font-heading font-bold text-[#172554]">
                {isBangla ? "রুম সার্ভিস ও হেল্পলাইন" : "Room Service"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
