"use client";

import React from "react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function SocialMediaSection() {
  const { isBangla } = useTranslation();
  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section
      className="py-20 bg-white border-y-2 border-[#FED7AA]/60"
      data-purpose="social-community-feed"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFF9ED] border-2 border-[#FED7AA] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#1877F2] flex items-center justify-center text-3xl sm:text-4xl text-white shadow-md shrink-0">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <div>
              <div className="inline-block px-3.5 py-1 rounded-full bg-blue-100 text-[#1877F2] text-xs font-heading font-bold uppercase tracking-wider mb-2">
                {isBangla ? "অফিসিয়াল সোশ্যাল হাব" : "Official Social Hub"}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#172554] font-heading">
                Follow @ac.magicisland on Facebook
              </h3>
              <p className="text-xs sm:text-sm text-[#3B4B75] mt-1 max-w-xl font-sans leading-relaxed">
                {isBangla
                  ? "লাইভ ওয়েভ পুলের সময়সূচি, বিশেষ কনসার্ট, উৎসবের অফার ও অতিথিদের আনন্দের মুহূর্তের আপডেট পেতে ফেসবুকে আমাদের সাথে যুক্ত থাকুন।"
                  : "Stay connected with real park photos, event celebrations, wave timings, and special holiday surprises on our official Facebook page."}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              className="px-7 py-3.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all hover:scale-105"
              href="https://www.facebook.com/ac.magicisland/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fa-brands fa-facebook text-base"></i>
              <span>{isBangla ? "অফিসিয়াল ফেসবুক পেজ" : "Visit Official Facebook"}</span>
            </a>
            <a
              className="px-7 py-3.5 rounded-full bg-white border-2 border-[#55C98B] text-[#15803D] hover:bg-[#F0FDF4] text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all hover:scale-105"
              href={whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fa-brands fa-whatsapp text-[#55C98B] text-base"></i>
              <span>{isBangla ? "হোয়াটসঅ্যাপ হেল্পলাইন" : "WhatsApp Helpline"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
