"use client";

import React, { useState } from "react";
import { Clock, MapPin, Shirt, PhoneCall, ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function VisitorInfoSection() {
  const { isBangla } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      qEn: "What is the schedule for waves in the Wave Pool?",
      qBn: "ওয়েভ পুলে ঢেউয়ের সময়সূচি কী?",
      aEn: "Waves operate in 45-minute continuous sessions four times daily: at 11:30 AM, 01:15 PM, 03:00 PM, and 04:45 PM. A warning horn signals 5 minutes prior to every swell activation.",
      aBn: "প্রতিদিন চারবার ৪৫ মিনিট করে মেগা-ওয়েভ পরিচালিত হয়: সকাল ১১:৩০, দুপুর ০১:১৫, বিকাল ০৩:০০ এবং বিকাল ০৪:৪৫ মিনিটে। প্রতিটি ঢেউ শুরু হওয়ার ৫ মিনিট আগে সংকেত সাইরেন বাজানো হয়।",
    },
    {
      qEn: "Can we bring outside food and beverages?",
      qBn: "বাইরে থেকে খাবার ও পানীয় আনা যাবে কি?",
      aEn: "To maintain hygiene across pool water and grounds, outside cooked food is not permitted. Baby formula, essential medical snacks, and water bottles are fully allowed. Magic Island features extensive Halal dining within the park.",
      aBn: "পানির বিশুদ্ধতা ও পরিবেশের সর্বোচ্চ স্বাস্থ্যবিধি নিশ্চিত করার লক্ষ্যে বাইরে থেকে রান্না করা খাবার আনা নিষিদ্ধ। তবে শিশুদের দুধ, প্রয়োজনীয় ঔষধ ও সিলযুক্ত পানির বোতল সম্পূর্ণ অনুমোদিত। পার্কের ভেতরে স্বাস্থ্যসম্মত হালাল খাবার রেস্তোরাঁ রয়েছে।",
    },
    {
      qEn: "Are locker rooms and life jackets provided free of charge?",
      qBn: "লকার রুম ও লাইফ জ্যাকেট কি বিনামূল্যে দেওয়া হয়?",
      aEn: "Life jackets are 100% complimentary for all visitors throughout the day. Digital RFID security lockers are available at a nominal token fee with a refundable deposit.",
      aBn: "সার্টিফাইড লাইফ জ্যাকেট সকল দর্শনার্থীদের জন্য সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য। আপনার মূল্যবান সামগ্রী সংরক্ষণের জন্য ডিজিটাল আরএফআইডি লকার নামমাত্র ফি এবং ফেরতযোগ্য জামানতে উপলব্ধ।",
    },
  ];

  return (
    <section
      className="py-24 bg-[#FFF9ED] relative"
      data-purpose="visitor-information"
      id="info"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FFD93D] text-[#172554] text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
            <span>{isBangla ? "আপনার সফরের প্রস্তুতি নিন" : "Plan Your Park Visit"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#172554] font-heading tracking-tight">
            {isBangla ? "দর্শনার্থী তথ্য ও" : "VISITOR INFORMATION &"}{" "}
            <span className="text-gradient-park">
              {isBangla ? "পার্ক গাইডলাইন" : "PARK GUIDELINES"}
            </span>
          </h2>
          <p className="text-[#3B4B75] text-sm sm:text-base max-w-xl mt-3 font-sans leading-relaxed">
            {isBangla
              ? "ম্যাজিক আইল্যান্ডে একটি নিরাপদ, স্বাচ্ছন্দ্যময় ও আনন্দপূর্ণ দিন কাটানোর প্রয়োজনীয় তথ্য।"
              : "Everything you need for a comfortable, thrilling, and safe family adventure at Anowar City Magic Island."}
          </p>
        </div>

        {/* 4 Key Essentials Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-white border-2 border-[#BAE6FD] shadow-xs hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-xl mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-heading font-bold text-[#172554] mb-1">
              {isBangla ? "কার্যক্রমের সময়" : "Operating Hours"}
            </h3>
            <div className="text-xs text-[#0284C7] font-heading font-bold mb-2">
              {isBangla ? "১০:০০ AM – ০৭:০০ PM (প্রতিদিন)" : "10:00 AM – 07:00 PM (Daily)"}
            </div>
            <p className="text-xs text-[#3B4B75] leading-relaxed font-sans">
              {isBangla
                ? "সরকারি ছুটির দিনসহ সপ্তাহে ৭ দিন খোলা। ওয়াটার পার্ক সেশন সন্ধ্যা ০৬:৩০ এ সমাপ্ত হয়।"
                : "Open 7 days a week, including public holidays. Water Park wave sessions cease at 6:30 PM."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-[#BBF7D0] shadow-xs hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center text-xl mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-heading font-bold text-[#172554] mb-1">
              {isBangla ? "পার্কের অবস্থান" : "Park Location"}
            </h3>
            <div className="text-xs text-[#15803D] font-heading font-bold mb-2">
              {isBangla ? "কোনাখোলা, কেরানীগঞ্জ, ঢাকা" : "Konakhola, Keraniganj, Dhaka"}
            </div>
            <p className="text-xs text-[#3B4B75] leading-relaxed font-sans">
              {isBangla
                ? "ঢাকা-কেরানীগঞ্জ মহাসড়কের সুবিধাজনক সংযোগ, সুনির্দিষ্ট সাইনবোর্ড ও পার্কিং।"
                : "Convenient highway access with prominent signage, dedicated bus stops, and VIP parking."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-[#FED7AA] shadow-xs hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center text-xl mb-4">
              <Shirt className="w-6 h-6" />
            </div>
            <h3 className="text-base font-heading font-bold text-[#172554] mb-1">
              {isBangla ? "সাঁতারের পোশাক বিধি" : "Swimwear Policy"}
            </h3>
            <div className="text-xs text-[#C2410C] font-heading font-bold mb-2">
              {isBangla ? "নাইলন বা লাইক্রা ফ্যাব্রিক" : "Nylon or Lycra Fabric"}
            </div>
            <p className="text-xs text-[#3B4B75] leading-relaxed font-sans">
              {isBangla
                ? "ওয়াটার স্লাইডার ও পুলের স্বাস্থ্যবিধি রক্ষায় কটন ব্যতিরেকে সিন্থেটিক সাঁতারের পোশাক আবশ্যক।"
                : "Proper synthetic swim attire required for all water flumes to protect filtration systems."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-[#DDD6FE] shadow-xs hover:scale-102 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center text-xl mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-base font-heading font-bold text-[#172554] mb-1">
              {isBangla ? "হেল্পলাইন ও তথ্য" : "Direct Helpline"}
            </h3>
            <div className="text-xs text-[#7C3AED] font-heading font-bold mb-2">
              {businessConfig.hotlines.whatsapp}
            </div>
            <p className="text-xs text-[#3B4B75] leading-relaxed font-sans">
              {isBangla
                ? "গ্রুপ ভিজিট, পিকনিক এবং রিসোর্ট থাকার তথ্যের জন্য সার্বক্ষণিক হোয়াটসঅ্যাপ হেল্পডেস্ক।"
                : "Direct WhatsApp communication for group outings, resort day-rooms, and general inquiries."}
            </p>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-heading text-[#172554]">
              {isBangla ? "সাধারণ জিজ্ঞাসিত প্রশ্নাবলী" : "Frequently Asked Questions"}
            </h3>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden bg-white border-2 border-[#FED7AA] shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left font-heading font-bold text-[#172554] text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{isBangla ? faq.qBn : faq.qEn}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FF6B35] transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#3B4B75] leading-relaxed border-t border-[#FED7AA]/40 pt-3 font-sans">
                    {isBangla ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
