"use client";

import React from "react";
import { MessageCircle, PhoneCall, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function SocialMediaSection() {
  const { isBangla } = useTranslation();

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;
  const hotlineHref = `tel:${businessConfig.contact.hotline.callable}`;
  const facebookHref = "https://www.facebook.com/ac.magicisland/";

  return (
    <section
      className="py-20 sm:py-24 bg-[#FFF9ED] relative border-y-2 border-[#FED7AA]/70"
      data-purpose="official-social-hub"
      id="social-hub"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FFD93D] text-[#172554] text-xs font-heading font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
            <span>
              {isBangla ? "অফিসিয়াল সোশ্যাল ও যোগাযোগ হাব" : "Official Social & Contact Hub"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#172554] font-heading tracking-tight">
            {isBangla ? "ম্যাজিক আইল্যান্ডের সাথে" : "CONNECT WITH"}{" "}
            <span className="text-[#FF6B35]">
              {isBangla ? "যুক্ত থাকুন" : "MAGIC ISLAND"}
            </span>
          </h2>

          <p className="text-[#3B4B75] text-sm sm:text-base max-w-2xl mt-3 font-sans leading-relaxed">
            {isBangla
              ? "যেকোনো প্রশ্ন, তথ্য, সময়সূচি কিংবা সহযোগিতার জন্য সরাসরি হোয়াটসঅ্যাপে চ্যাট করুন, হটলাইনে কল দিন অথবা অফিশিয়াল ফেসবুক পেজে যুক্ত থাকুন।"
              : "Reach our official channels directly on WhatsApp, call our dedicated phone hotline, or follow our active Facebook community for live park updates."}
          </p>
        </div>

        {/* 3 Modern Social Contact Cards: WhatsApp, Hotline, Facebook */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: WhatsApp */}
          <div className="park-card p-7 sm:p-8 flex flex-col justify-between group hover:border-[#55C98B] transition-all duration-300 bg-white">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-3xl bg-[#25D366] text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#15803D] font-heading font-bold text-xs uppercase tracking-wider border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
                  {isBangla ? "অনলাইন চ্যাট" : "Live Chat"}
                </span>
              </div>

              <div className="text-xs font-heading font-bold uppercase tracking-wider text-[#15803D] mb-1">
                {isBangla ? "হোয়াটসঅ্যাপ" : "WhatsApp"}
              </div>
              <h3 className="text-2xl font-black font-heading text-[#172554] mb-2">
                {businessConfig.hotlines.whatsapp}
              </h3>
              <p className="text-xs sm:text-sm text-[#3B4B75] leading-relaxed font-sans mb-6">
                {isBangla
                  ? "টিকেট, রাইডস, রিসোর্ট রুম বুকিং ও পিকনিক প্যাকেজের তথ্যে সরাসরি হোয়াটসঅ্যাপে চ্যাট করুন।"
                  : "Instant messaging support for park attractions, resort rooms, group picnics, and visitor queries."}
              </p>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 hover:scale-103 transition-transform cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-base"></i>
              <span>{isBangla ? "হোয়াটসঅ্যাপে চ্যাট করুন" : "Chat on WhatsApp"}</span>
              <ExternalLink className="w-4 h-4 ml-0.5 opacity-80" />
            </a>
          </div>

          {/* Card 2: Hotline */}
          <div className="park-card p-7 sm:p-8 flex flex-col justify-between group hover:border-[#FF6B35] transition-all duration-300 bg-white">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-3xl bg-[#FF6B35] text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#C2410C] font-heading font-bold text-xs uppercase tracking-wider border border-orange-200">
                  <PhoneCall className="w-3.5 h-3.5 text-[#FF6B35]" />
                  {isBangla ? "সরাসরি কল" : "Direct Call"}
                </span>
              </div>

              <div className="text-xs font-heading font-bold uppercase tracking-wider text-[#FF6B35] mb-1">
                {isBangla ? "হটলাইন" : "Hotline"}
              </div>
              <h3 className="text-2xl font-black font-heading text-[#172554] mb-2">
                {businessConfig.contact.hotline.display}
              </h3>
              <p className="text-xs sm:text-sm text-[#3B4B75] leading-relaxed font-sans mb-6">
                {isBangla
                  ? "আমাদের কাস্টমার কেয়ার প্রতিনিধির সাথে সরাসরি কথা বলুন। মোবাইলে সরাসরি ডায়াল করুন।"
                  : "Speak directly with our park guest services team. Tap the button to open mobile phone dialer."}
              </p>
            </div>

            <a
              href={hotlineHref}
              className="w-full py-3.5 px-6 rounded-full bg-[#FF6B35] hover:bg-[#e85924] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 hover:scale-103 transition-transform cursor-pointer"
            >
              <i className="fa-solid fa-phone text-sm"></i>
              <span>{isBangla ? "হটলাইনে কল দিন" : "Call Hotline Now"}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>
          </div>

          {/* Card 3: Facebook */}
          <div className="park-card p-7 sm:p-8 flex flex-col justify-between group hover:border-[#1877F2] transition-all duration-300 bg-white">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-3xl bg-[#1877F2] text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <i className="fa-brands fa-facebook-f"></i>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1877F2] font-heading font-bold text-xs uppercase tracking-wider border border-blue-200">
                  <i className="fa-solid fa-users text-xs"></i>
                  {isBangla ? "কমিউনিটি পেজ" : "Community"}
                </span>
              </div>

              <div className="text-xs font-heading font-bold uppercase tracking-wider text-[#1877F2] mb-1">
                {isBangla ? "ফেসবুক" : "Facebook"}
              </div>
              <h3 className="text-2xl font-black font-heading text-[#172554] mb-2">
                @ac.magicisland
              </h3>
              <p className="text-xs sm:text-sm text-[#3B4B75] leading-relaxed font-sans mb-6">
                {isBangla
                  ? "প্রতিদিনের আসল ছবি, ভিডিও, কনসার্ট ও বিশেষ ছুটির অফারের সর্বশেষ আপডেটের অফিসিয়াল পেজ।"
                  : "Follow our verified official page for daily park photos, guest moments, videos, and festive announcements."}
              </p>
            </div>

            <a
              href={facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 hover:scale-103 transition-transform cursor-pointer"
            >
              <i className="fa-brands fa-facebook text-base"></i>
              <span>{isBangla ? "ফেসবুক পেজে যান" : "Visit Facebook Page"}</span>
              <ExternalLink className="w-4 h-4 ml-0.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
