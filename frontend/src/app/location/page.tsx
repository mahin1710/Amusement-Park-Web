"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Compass,
  Car,
  Bus,
  ShieldCheck,
  Phone,
  Mail,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig, buildWhatsAppLink } from "@/config/business";

export default function LocationPage() {
  const { t, isBangla } = useTranslation();

  const waLink = buildWhatsAppLink({
    packageTitle: isBangla ? "লোকেশন ও ভিজিট তথ্য" : "Location & Visit Info",
    locale: isBangla ? "bn" : "en",
  });

  const whatsappHref = `https://wa.me/${businessConfig.hotlines.whatsapp.replace(/[^0-9]/g, "")}`;
  const hotlineHref = `tel:${businessConfig.contact.hotline.callable}`;
  const facebookHref = "https://www.facebook.com/ac.magicisland/";

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-100/90 text-[#FF6B35] text-xs font-black uppercase tracking-widest mb-4 border border-amber-200">
            <Compass className="w-4 h-4 text-[#FF6B35]" />
            <span>{isBangla ? "লোকেশন ও যোগাযোগের ঠিকানা" : "Location & Contact Guide"}</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[#172554] tracking-tight">
            {isBangla ? "ম্যাজিক আইল্যান্ডে কীভাবে আসবেন" : "VISIT ANOWAR CITY MAGIC ISLAND"}
          </h1>
          <p className="mt-4 text-[#172554]/75 text-sm sm:text-base leading-relaxed font-medium">
            {isBangla
              ? "ঢাকা কেরানীগঞ্জ মহাসড়কে মাত্র ২০ মিনিটে বাবুবাজার দ্বিতীয় বুড়িগঙ্গা সেতু থেকে পৌঁছানোর চমৎকার সুযোগ।"
              : "Conveniently located just 20 minutes from Babubazar 2nd Buriganga Bridge along Keraniganj Highway, Dhaka."}
          </p>
        </div>

        {/* 2-Column Main Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Visual Map */}
          <div className="lg:col-span-7 park-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-amber-100 pb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF6B35]" />
                <h3 className="text-lg font-black text-[#172554] font-heading">
                  {isBangla ? "ভৌগোলিক অবস্থান ও গুগল ম্যাপ" : "Geographic Map & Directions"}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#059669] text-xs font-black">
                {isBangla ? "সরাসরি খোলা" : "Open Today"}
              </span>
            </div>

            {/* Real Interactive Google Maps Embed */}
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border-2 border-amber-200/80 bg-white shadow-inner">
              <iframe
                title="Magic Island Keraniganj Google Map"
                src="https://maps.google.com/maps?q=Magic+Island+Keraniganj+Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-200 text-xs font-black text-[#172554] flex items-center gap-2 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Magic Island, Keraniganj, Dhaka</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-[#172554] font-heading">
                  {isBangla ? businessConfig.location.areaName.bn : businessConfig.location.areaName.en}
                </h4>
                <a
                  href={facebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#1877F2] hover:underline font-bold flex items-center gap-1"
                >
                  <span>Facebook @ac.magicisland</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-xs text-[#172554]/80 leading-relaxed font-medium">
                {isBangla ? businessConfig.location.fullAddress.bn : businessConfig.location.fullAddress.en}
              </p>
            </div>

            <p className="text-xs text-[#172554]/70 leading-relaxed italic font-medium">
              {isBangla ? businessConfig.location.landmarksHint.bn : businessConfig.location.landmarksHint.en}
            </p>
          </div>

          {/* Right Column: Operating Hours & Contact */}
          <div className="lg:col-span-5 space-y-6">
            {/* Operating Hours Card */}
            <div className="park-card rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <h3 className="text-base font-black text-[#172554] font-heading flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF6B35]" />
                  <span>{isBangla ? "খোলা থাকার সময়সূচি" : "Operating Hours"}</span>
                </h3>
              </div>

              <div className="space-y-3 text-xs font-medium">
                <div className="flex justify-between py-2 border-b border-amber-100">
                  <span className="text-[#172554]/75">{isBangla ? "রবিবার - বৃহস্পতিবার:" : "Sunday - Thursday:"}</span>
                  <span className="font-black text-[#172554]">
                    {isBangla ? businessConfig.operatingHours.regular.bn : businessConfig.operatingHours.regular.en}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-amber-100">
                  <span className="text-[#172554]/75">{isBangla ? "শুক্রবার - শনিবার (সাপ্তাহিক ছুটি):" : "Friday - Saturday (Weekends):"}</span>
                  <span className="font-black text-[#FF6B35]">
                    {isBangla ? businessConfig.operatingHours.weekend.bn : businessConfig.operatingHours.weekend.en}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-[#172554]/75">{isBangla ? "সরকারি ছুটির দিন:" : "Public Holidays:"}</span>
                  <span className="font-black text-[#059669]">
                    {isBangla ? businessConfig.operatingHours.holidays.bn : businessConfig.operatingHours.holidays.en}
                  </span>
                </div>
              </div>
            </div>

            {/* Helpline Directory */}
            <div className="park-card rounded-3xl p-6 sm:p-7 space-y-4">
              <h3 className="text-base font-black text-[#172554] font-heading flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6B35]" />
                <span>{isBangla ? "যোগাযোগ ও হেল্পডেস্ক" : "Contact & Helpline"}</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <Phone className="w-4 h-4 text-[#FF6B35] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-black text-[#172554] block">
                      {isBangla ? "অফিশিয়াল হেল্পলাইন:" : "Official Hotline:"}
                    </span>
                    <a
                      href={hotlineHref}
                      className="text-[#172554] font-black hover:text-[#FF6B35] transition-colors"
                    >
                      {businessConfig.contact.hotline.display}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <Mail className="w-4 h-4 text-[#0284C7] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-black text-[#172554] block">
                      {isBangla ? "ইমেইল যোগাযোগ:" : "General Inquiry Email:"}
                    </span>
                    <a
                      href={`mailto:${businessConfig.contact.email.general}`}
                      className="text-[#172554] font-black hover:text-[#0284C7] transition-colors"
                    >
                      {businessConfig.contact.email.general}
                    </a>
                  </div>
                </div>

                {waLink.isConfigured && (
                  <a
                    href={waLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3.5 rounded-full bg-[#55C98B] hover:bg-[#47b278] text-white font-black text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-all w-full"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isBangla ? "সরাসরি হোয়াটসঅ্যাপে চ্যাট" : "Live WhatsApp Chat"}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Transit Amenities */}
        <div className="park-card rounded-3xl p-8 sm:p-10 mb-16 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#172554]">
              {isBangla ? "যাতায়াত ও আগমন সুবিধা" : "Travel Tips & Parking Facilities"}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#172554]/75 font-medium">
              {isBangla ? "দর্শনার্থীদের নির্বিঘ্ন যাতায়াতের জন্য প্রস্তুত পরিবহন অবকাঠামো" : "Planned transportation infrastructure for seamless family arrival"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center shadow-md">
                <Bus className="w-5 h-5" />
              </div>
              <h4 className="font-black text-[#172554] text-sm font-heading">{t("location.tip1Title")}</h4>
              <p className="text-[#172554]/80 leading-relaxed font-medium">{t("location.tip1Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shadow-md">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="font-black text-[#172554] text-sm font-heading">{t("location.tip2Title")}</h4>
              <p className="text-[#172554]/80 leading-relaxed font-medium">{t("location.tip2Desc")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#059669] text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-black text-[#172554] text-sm font-heading">{t("location.tip3Title")}</h4>
              <p className="text-[#172554]/80 leading-relaxed font-medium">{t("location.tip3Desc")}</p>
            </div>
          </div>
        </div>

        {/* Official Social & Contact Hub (Replacing Form with Modern Social Hub Cards) */}
        <div className="park-card rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#FED7AA] text-[#172554] text-xs font-heading font-bold uppercase tracking-wider mb-2.5 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>{isBangla ? "অফিসিয়াল যোগাযোগ ও সোশ্যাল হাব" : "Official Social & Contact Hub"}</span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-4xl text-[#172554]">
              {isBangla ? "সরাসরি আমাদের সাথে যুক্ত হোন" : "Connect Directly With Us"}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#172554]/75 font-medium">
              {isBangla
                ? "টিকিট, ইভেন্ট বা যেকোনো তথ্যের জন্য আমাদের অফিসিয়াল চ্যানেলে সরাসরি যোগাযোগ করুন।"
                : "Reach our team directly on WhatsApp, phone hotline, or our official Facebook page."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* WhatsApp Card */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-[#FFF9ED] border-2 border-[#FED7AA] hover:border-[#25D366] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 text-[#15803D] flex items-center justify-center text-2xl mb-3 group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-xs">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="text-xs font-heading font-black uppercase tracking-wider text-[#15803D] mb-1">
                {isBangla ? "হোয়াটসঅ্যাপ" : "WhatsApp"}
              </div>
              <div className="text-base font-black font-heading text-[#172554] mb-4">
                {businessConfig.hotlines.whatsapp}
              </div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-[#15803D] border border-emerald-200 text-xs font-heading font-bold group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] transition-colors mt-auto">
                <span className="w-2 h-2 rounded-full bg-[#25D366] group-hover:bg-white animate-ping"></span>
                <span>{isBangla ? "চ্যাট করুন" : "Chat on WhatsApp"}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </span>
            </a>

            {/* Hotline Card */}
            <a
              href={hotlineHref}
              className="group p-6 rounded-2xl bg-[#FFF9ED] border-2 border-[#FED7AA] hover:border-[#FF6B35] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:bg-[#FF6B35] group-hover:text-white transition-all shadow-xs">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="text-xs font-heading font-black uppercase tracking-wider text-[#FF6B35] mb-1">
                {isBangla ? "হটলাইন" : "Hotline"}
              </div>
              <div className="text-base font-black font-heading text-[#172554] mb-4">
                {businessConfig.contact.hotline.display}
              </div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-50 text-[#C2410C] border border-orange-200 text-xs font-heading font-bold group-hover:bg-[#FF6B35] group-hover:text-white group-hover:border-[#FF6B35] transition-colors mt-auto">
                <PhoneCall className="w-3.5 h-3.5 text-[#FF6B35] group-hover:text-white" />
                <span>{isBangla ? "কল দিন" : "Call Hotline"}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </a>

            {/* Facebook Card */}
            <a
              href={facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-[#FFF9ED] border-2 border-[#FED7AA] hover:border-[#1877F2] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:bg-[#1877F2] group-hover:text-white transition-all shadow-xs">
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <div className="text-xs font-heading font-black uppercase tracking-wider text-[#1877F2] mb-1">
                {isBangla ? "ফেসবুক" : "Facebook"}
              </div>
              <div className="text-base font-black font-heading text-[#172554] mb-4">
                @ac.magicisland
              </div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-[#1877F2] border border-blue-200 text-xs font-heading font-bold group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2] transition-colors mt-auto">
                <span>{isBangla ? "পেজ দেখুন" : "Visit Page"}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
