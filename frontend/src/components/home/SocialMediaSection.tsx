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
      className="py-10 sm:py-14 bg-[#FFFDF5] relative"
      data-purpose="official-social-hub"
      id="social-hub"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-[#FF914D]/25 text-[#173B42] text-xs font-heading font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FF914D]" />
            <span>
              {isBangla ? "অফিসিয়াল সোশ্যাল ও যোগাযোগ হাব" : "Official Social & Contact Hub"}
            </span>
          </div>

          <h2 className="section-heading-main text-[#173B42] tracking-tight">
            {isBangla ? "ম্যাজিক আইল্যান্ডের সাথে" : "CONNECT WITH"}{" "}
            <span className="text-[#FF914D]">
              {isBangla ? "যুক্ত থাকুন" : "MAGIC ISLAND"}
            </span>
          </h2>

          <p className="text-[#173B42]/80 text-xs sm:text-sm max-w-xl mt-2 font-sans leading-relaxed">
            {isBangla
              ? "যেকোনো তথ্য, টিকিট ও সহযোগিতার জন্য হোয়াটসঅ্যাপ, হটলাইন বা ফেসবুক পেজে যুক্ত থাকুন।"
              : "Reach our official channels directly on WhatsApp, phone hotline, or our official Facebook page."}
          </p>
        </div>

        {/* 3 Compact Social Contact Cards: WhatsApp, Hotline, Facebook (Proportioned to Resort Privileges) */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white border-2 border-[#26865D]/30 hover:border-[#25D366] hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#15803D] flex items-center justify-center text-2xl mb-3 group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-xs">
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#15803D] mb-0.5">
              {isBangla ? "হোয়াটসঅ্যাপ" : "WhatsApp"}
            </div>
            <div className="text-sm sm:text-base font-bold font-heading text-[#173B42] mb-3">
              {businessConfig.hotlines.whatsapp}
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-[#15803D] border border-emerald-200 text-xs font-heading font-semibold group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] transition-colors mt-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] group-hover:bg-white animate-ping"></span>
              <span>{isBangla ? "চ্যাট করুন" : "Chat on WhatsApp"}</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </span>
          </a>

          {/* Card 2: Hotline */}
          <a
            href={hotlineHref}
            className="group p-5 rounded-2xl bg-white border-2 border-[#FF914D]/30 hover:border-[#FF914D] hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FF914D]/15 text-[#FF914D] flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:bg-[#FF795C] group-hover:text-white transition-all shadow-xs">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#FF914D] mb-0.5">
              {isBangla ? "হটলাইন" : "Hotline"}
            </div>
            <div className="text-sm sm:text-base font-bold font-heading text-[#173B42] mb-3">
              {businessConfig.contact.hotline.display}
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-[#FF914D] border border-orange-200 text-xs font-heading font-semibold group-hover:bg-[#FF914D] group-hover:text-white group-hover:border-[#FF914D] transition-colors mt-auto">
              <PhoneCall className="w-3 h-3 text-[#FF914D] group-hover:text-white" />
              <span>{isBangla ? "কল দিন" : "Call Hotline"}</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </span>
          </a>

          {/* Card 3: Facebook */}
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white border-2 border-[#087E8B]/20 hover:border-[#1877F2] hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:bg-[#1877F2] group-hover:text-white transition-all shadow-xs">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#1877F2] mb-0.5">
              {isBangla ? "ফেসবুক" : "Facebook"}
            </div>
            <div className="text-sm sm:text-base font-bold font-heading text-[#173B42] mb-3">
              @ac.magicisland
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-[#1877F2] border border-blue-200 text-xs font-heading font-semibold group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2] transition-colors mt-auto">
              <i className="fa-brands fa-facebook text-xs"></i>
              <span>{isBangla ? "পেজে যান" : "Visit Facebook"}</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
