"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, Search, MessageCircle, Phone } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { buildWhatsAppLink } from "@/config/business";

export default function FaqPage() {
  const { isBangla } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qEn: "Where is Magic Island located and how can I get there?",
      qBn: "ম্যাজিক আইল্যান্ড কোথায় অবস্থিত এবং কিভাবে পৌঁছানো যাবে?",
      aEn: "Magic Island is located on Keraniganj Highway, Konakhola (near Fire Service Station), Dhaka. It is just 20 minutes from Babubazar 2nd Buriganga Bridge by car, bike, or public bus from Gulistan/Sadarghat.",
      aBn: "ম্যাজিক আইল্যান্ড ঢাকার বাবুবাজার ২য় বুড়িগঙ্গা সেতু পার হয়ে মাত্র ২০ মিনিটের দূরত্বে কেরানীগঞ্জ হাইওয়ে, কোনাখোলা (ফায়ার সার্ভিস স্টেশনের ঠিক পাশে) অবস্থিত।",
    },
    {
      qEn: "What are the daily park operating hours?",
      qBn: "পার্ক প্রতিদিন কোন সময়ে খোলা থাকে?",
      aEn: "We are open 7 days a week from 10:00 AM to 7:00 PM. On Fridays, Saturdays, and public holidays, evening wave pool sessions and illuminations extend to 7:30 PM.",
      aBn: "পার্ক সপ্তাহে ৭ দিনই সকাল ১০:০০ টা থেকে সন্ধ্যা ০৭:০০ টা পর্যন্ত খোলা থাকে। শুক্র, শনি ও সরকারি ছুটির দিনে সন্ধ্যা ০৭:৩০ পর্যন্ত চালু থাকে।",
    },
    {
      qEn: "Do infants and young children require an admission ticket?",
      qBn: "শিশুদের জন্য কি আলাদা টিকেটের প্রয়োজন আছে?",
      aEn: "Children under 3 feet in height (or under 3 years of age) enjoy free complimentary entry when accompanied by an adult.",
      aBn: "৩ ফুটের কম উচ্চতা অথবা ৩ বছরের কম বয়সী শিশুরা অভিভাবকের সাথে সম্পূর্ণ বিনামূল্যে পার্কে প্রবেশ করতে পারবে।",
    },
    {
      qEn: "What is the dress code for the Water Park and Wave Pool?",
      qBn: "ওয়াটার পার্ক ও ওয়েভ পুলের জন্য পোশাকের নিয়মাবলী কী?",
      aEn: "Appropriate synthetic swimwear (nylon or spandex) is recommended for water slides and the wave pool to ensure filter hygiene and guest safety.",
      aBn: "ওয়াটার স্লাইড এবং ওয়েভ পুলের স্বাস্থ্যবিধি ও সুরক্ষার জন্য উপযুক্ত নাইলন বা পলিয়েস্টার সাঁতারের পোশাক পরা পরামর্শযোগ্য।",
    },
    {
      qEn: "Are resort rooms & overnight stay facilities available?",
      qBn: "রিসোর্ট রুম এবং রাত্রিযাপনের সুযোগ সুবিধা আছে কি?",
      aEn: "Yes! Magic Island features comfortable luxury resort suites, family villas, and cottages overlooking the scenic lake and park.",
      aBn: "হ্যাঁ! ম্যাজিক আইল্যান্ডে রয়েছে মনোরম লেক ভিউসহ লাক্সারি কাপল স্যুইট, ফ্যামিলি ভিলা এবং কটেজে চমৎকার রাত্রিযাপনের সুযোগ।",
    },
    {
      qEn: "Are corporate picnics and group packages available?",
      qBn: "কর্পোরেট পিকনিক ও বড় দলের জন্য বিশেষ সুযোগ আছে কি?",
      aEn: "Yes, we host corporate picnics, school excursions, and family reunions with custom catering, reserved pavilions, and group facilities.",
      aBn: "হ্যাঁ! স্কুল-কলেজ, কর্পোরেট টিম ও বড় পারিবারিক পিকনিকের জন্য বিশেষ সুযোগ ও লাঞ্চ ক্যাটারিং সুবিধা রয়েছে।",
    },
  ];

  const filtered = faqs.filter(
    (f) =>
      f.qEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.qBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.aEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.aBn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const waLink = buildWhatsAppLink({
    notes: "General FAQ inquiry",
    locale: isBangla ? "bn" : "en",
  });

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-100/90 text-[#FF6B35] text-xs font-black uppercase tracking-widest border border-amber-200">
            <HelpCircle className="w-4 h-4 text-[#FF6B35]" />
            <span>{isBangla ? "সহায়তা ও সাধারণ প্রশ্নোত্তর" : "Helpdesk & FAQs"}</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#172554] tracking-tight">
            {isBangla ? "আপনার প্রশ্নের উত্তর এখানে জানুন" : "FREQUENTLY ASKED QUESTIONS"}
          </h1>

          <p className="text-sm sm:text-base text-[#172554]/75 leading-relaxed max-w-xl mx-auto font-medium">
            {isBangla
              ? "ম্যাজিক আইল্যান্ডে ভ্রমণের প্রস্তুতি ও পার্কের সুবিধাদি সম্পর্কে সর্বাধিক জিজ্ঞাসিত প্রশ্নের সহজ সমাধান।"
              : "Find answers regarding park entry, operating hours, water attire, and planning your visit."}
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-[#172554]/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isBangla ? "প্রশ্ন বা বিষয় খুঁজুন..." : "Search questions or topics..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border-2 border-amber-200 text-[#172554] placeholder-[#172554]/50 text-sm focus:outline-none focus:border-[#FF6B35] shadow-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-[#172554]/60 py-12 font-medium">
              {isBangla ? "কোনো ফলাফল পাওয়া যায়নি।" : "No matching questions found."}
            </p>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="park-card rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left text-sm sm:text-base font-black text-[#172554] font-heading flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{isBangla ? item.qBn : item.qEn}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FF6B35] shrink-0 transition-transform ${
                      openIdx === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIdx === idx && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-[#172554]/80 leading-relaxed border-t border-amber-100 pt-3 font-medium">
                    {isBangla ? item.aBn : item.aEn}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still Need Assistance Box */}
        <div className="p-8 park-card rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border-2 border-amber-300">
          <div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-[#172554]">
              {isBangla ? "আরও কোনো তথ্য জানতে চান?" : "Still have questions?"}
            </h3>
            <p className="text-xs sm:text-sm text-[#172554]/75 mt-1 font-medium">
              {isBangla ? "আমাদের সাপোর্ট টিম সরাসরি আপনাকে সাহায্য করতে প্রস্তুত।" : "Our guest support team is standing by to help."}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:+8801966602745"
              className="py-3 px-6 rounded-full border-2 border-amber-300 text-[#172554] bg-white hover:bg-amber-50 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all flex-1 sm:flex-none"
            >
              <Phone className="w-4 h-4 text-[#FF6B35]" />
              <span>01966-602745</span>
            </a>

            {waLink.isConfigured ? (
              <a
                href={waLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-park-primary flex-1 sm:flex-none py-3 px-6 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
