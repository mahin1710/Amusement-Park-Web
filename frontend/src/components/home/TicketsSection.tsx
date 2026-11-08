"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function TicketsSection() {
  const { isBangla } = useTranslation();
  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section
      className="py-24 bg-white relative border-y border-slate-100"
      data-purpose="pricing-packages"
      id="tickets"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#FF7A24] text-xs uppercase tracking-widest font-bold mb-3 shadow-sm">
            {isBangla ? "সাশ্রয়ী পারিবারিক বিনোদন প্যাকেজ" : "Affordable Family Entertainment"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight font-heading">
            {isBangla ? "প্রবেশ টিকেট ও" : "ADMISSION"}{" "}
            <span className="gradient-orange-text">
              {isBangla ? "প্যাকেজ পাস" : "PACKAGES & PASSES"}
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mt-3 font-medium">
            {isBangla
              ? "পছন্দমতো পাস বেছে নিন। স্বচ্ছ ও পরিবর্তনযোগ্য প্লেসহোল্ডার রেট—পারিবারিক ও গ্রুপ বুকিংয়ে বিশেষ ছাড়ের সুবিধা।"
              : "Choose your pass. Transparent pricing with clear placeholder rates ready for seasonal booking and family group savings."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Package 1: Water Park Wave Pass */}
          <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-md flex flex-col justify-between hover:border-sky-400 hover:shadow-xl transition-all duration-300">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
                {isBangla ? "শুধুমাত্র ওয়াটার পার্ক" : "Water Realm Only"}
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-heading mb-4">
                {isBangla ? "ওয়াটার পার্ক ওয়েভ পাস" : "Water Park Wave Pass"}
              </h3>
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-3xl font-extrabold text-slate-900 font-heading">
                  ৳ {isBangla ? "[মূল্য প্লেসহোল্ডার]" : "[Rate Placeholder]"}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {isBangla ? "জনপ্রতি • সারাদিন প্রবেশাধিকার" : "Per Person • Full Day Access"}
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-700 mb-8">
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-sky-600"></i>
                  <span>{isBangla ? "মেগাওয়েভ বে-তে আনলিমিটেড অ্যাক্সেস" : "Unlimited access to Megawave Bay"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-sky-600"></i>
                  <span>{isBangla ? "লেজি রিভার ও রেইনবো ব্রিজ এলাকা" : "Lazy River canal & rainbow bridge areas"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-sky-600"></i>
                  <span>{isBangla ? "মাল্টি-লেন স্পিড ও স্পাইরাল স্লাইডস" : "Multi-lane speed & spiral slide flumes"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-sky-600"></i>
                  <span>{isBangla ? "বিনামূল্যে লাইফ জ্যাকেট ও চেঞ্জিং রুম" : "Free life jacket usage & changing rooms"}</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <i className="fa-solid fa-circle-xmark"></i>
                  <span>{isBangla ? "ডাইনো জোন এন্ট্রি অন্তর্ভুক্ত নয়" : "Dino Zone admission excluded"}</span>
                </li>
              </ul>
            </div>
            <Link
              className="w-full py-3.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white font-heading text-xs font-bold uppercase tracking-wider text-center border border-sky-200 transition-colors"
              href="/booking?package=water-park"
            >
              {isBangla ? "ওয়াটার পাস বুক করুন" : "Book Water Pass"}
            </Link>
          </div>

          {/* Package 2: All-Inclusive Adventure Mega Pass (MOST POPULAR) */}
          <div className="rounded-3xl p-8 bg-gradient-to-b from-orange-50/50 via-white to-white border-2 border-[#FF7A24] flex flex-col justify-between relative shadow-xl shadow-orange-500/10 md:-translate-y-4">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-orange-cta px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow">
              ★ {isBangla ? "সর্বাধিক জনপ্রিয় পছন্দ" : "MOST POPULAR CHOICE"}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A24] mb-2">
                {isBangla ? "সম্পূর্ণ রিসোর্ট অ্যাক্সেস" : "Total Resort Access"}
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-heading mb-4">
                {isBangla ? "অল-ইনক্লুসিভ মেগা পাস" : "All-Inclusive Mega Pass"}
              </h3>
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-3xl font-extrabold text-slate-900 font-heading">
                  ৳ {isBangla ? "[প্যাকেজ রেট প্লেসহোল্ডার]" : "[Package Rate Placeholder]"}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {isBangla ? "জনপ্রতি • তিনটি জোনেই আনলিমিটেড প্রবেশ" : "Per Person • Unlimited All 3 Realms"}
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-800 mb-8">
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-[#FF7A24]"></i>
                  <span className="font-bold text-slate-900">
                    {isBangla ? "সম্পূর্ণ ওয়াটার পার্ক (ওয়েভ পুল + স্লাইডস)" : "Full Water Park (Wave Pool + Slides)"}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-[#FF7A24]"></i>
                  <span className="font-bold text-slate-900">
                    {isBangla ? "সম্পূর্ণ ডাইনো জোন সাফারি ও ৫ডি সিনেমা" : "Full Dino Zone Safari & 5D Cinema"}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-[#FF7A24]"></i>
                  <span className="font-bold text-slate-900">
                    {isBangla ? "অ্যামিউজমেন্ট পার্কে সকল রাইড আনলিমিটেড" : "Unlimited Rides at Amusement Park"}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-[#FF7A24]"></i>
                  <span>{isBangla ? "বিনামূল্যে লাইফ জ্যাকেট ও লকার টোকেন" : "Free life jacket usage & locker token"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-[#FF7A24]"></i>
                  <span>{isBangla ? "দ্রুতগতির এক্সপ্রেস রি-এন্ট্রি সুবিধা" : "Skip-the-line express park re-entry"}</span>
                </li>
              </ul>
            </div>
            <Link
              className="w-full py-4 rounded-xl gradient-orange-cta text-white font-heading text-xs font-bold uppercase tracking-wider text-center hover:scale-105 transition-transform shadow-lg"
              href="/booking?package=all-inclusive"
            >
              {isBangla ? "অল-ইনক্লুসিভ পাস নিন" : "Get All-Inclusive Pass"}
            </Link>
          </div>

          {/* Package 3: Family Adventure Combo */}
          <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-md flex flex-col justify-between hover:border-purple-400 hover:shadow-xl transition-all duration-300">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
                {isBangla ? "ফ্যামিলি গ্রুপ সেভার" : "Family Group Saver"}
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-heading mb-4">
                {isBangla ? "ফ্যামিলি অ্যাডভেঞ্চার কম্বো" : "Family Adventure Combo"}
              </h3>
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-3xl font-extrabold text-slate-900 font-heading">
                  ৳ {isBangla ? "[মূল্য প্লেসহোল্ডার]" : "[Rate Placeholder]"}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {isBangla ? "২ প্রাপ্তবয়স্ক + ২ শিশু • সারাদিন" : "2 Adults + 2 Children • All Day"}
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-700 mb-8">
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-purple-600"></i>
                  <span>{isBangla ? "৪ জন অতিথির টিকিট (২ প্রাপ্তবয়স্ক + ২ শিশু)" : "Admission for 4 guests (2 Adults + 2 Kids)"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-purple-600"></i>
                  <span>{isBangla ? "ওয়াটার পার্ক + ডাইনো জোনে সম্পূর্ণ প্রবেশাধিকার" : "Full access to Water Park + Dino Zone"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-purple-600"></i>
                  <span>{isBangla ? "অ্যামিউজমেন্ট পার্কে পারিবারিক রাইডস পাস" : "Amusement Park family carousel passes"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-purple-600"></i>
                  <span>{isBangla ? "সবার জন্য বিনামূল্যে লাইফ জ্যাকেট" : "Free life jackets for children & adults"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-check text-purple-600"></i>
                  <span>{isBangla ? "কমপ্লিমেন্টারি ফ্যামিলি লকার অ্যাক্সেস" : "Complimentary family locker access"}</span>
                </li>
              </ul>
            </div>
            <Link
              className="w-full py-3.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white font-heading text-xs font-bold uppercase tracking-wider text-center border border-purple-200 transition-colors"
              href="/booking?package=family-combo"
            >
              {isBangla ? "ফ্যামিলি কম্বো বুক করুন" : "Book Family Combo"}
            </Link>
          </div>
        </div>

        {/* Concession Disclaimer Notice */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            <i className="fa-solid fa-circle-info text-sky-600 mr-1"></i>
            <strong>{isBangla ? "বিজ্ঞপ্তি:" : "Notice:"}</strong>{" "}
            {isBangla
              ? "উপরে প্রদর্শিত রেটসমূহ পরিবর্তনযোগ্য প্লেসহোল্ডার। ৩ ফুটের নিচের শিশুদের প্রবেশ সম্পূর্ণ ফ্রি। স্কুল পিকনিক, কর্পোরেট রিট্রিট বা গ্রুপ কনসেশন (২০+ জন) এর জন্য অনুগ্রহ করে হোয়াটসঅ্যাপে যোগাযোগ করুন।"
              : "Rates displayed above are customizable placeholders. Children below 3 feet enter free. For school excursions, corporate retreats, and group concessions (20+ persons), please contact our ticketing desk directly via WhatsApp."}
          </p>
          <div className="mt-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span>{isBangla ? "গ্রুপ বা স্কুল পিকনিকের জন্য হোয়াটসঅ্যাপ করুন" : "Inquire for Group or School Concessions on WhatsApp"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
