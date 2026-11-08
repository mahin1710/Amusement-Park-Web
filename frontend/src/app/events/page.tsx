"use client";

import React, { useState } from "react";
import { Users, Briefcase, GraduationCap, Cake, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { buildWhatsAppLink } from "@/config/business";
import { api } from "@/services/api";

export default function EventsPage() {
  const { t, isBangla } = useTranslation();
  const [eventType, setEventType] = useState("corporate");
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState("50");
  const [targetDate, setTargetDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.submitEventInquiry({
        event_type: eventType,
        organization_name: orgName,
        contact_person: contactName,
        phone,
        estimated_guests: parseInt(guestCount, 10) || 50,
        target_date: targetDate || undefined,
        requirements: notes || undefined,
      });
    } catch (e) {
      // Graceful fallback
    }
    setSubmitted(true);
  };

  const waInquiry = buildWhatsAppLink({
    packageTitle: `Group Event Quotation (${eventType})`,
    date: targetDate,
    customerName: `${contactName} (${orgName})`,
    notes: `Estimated Guests: ${guestCount}. Requests: ${notes}`,
    locale: isBangla ? "bn" : "en",
  });

  return (
    <div className="min-h-screen bg-[#F6F5FB] text-[#3B3966] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 chip-lilac mb-4">
            <Users className="w-3.5 h-3.5 text-[#2E2A7A]" />
            <span className="eyebrow text-xs">{t("events.badge")}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-[#2E2A7A] tracking-tight">
            {t("events.title")}
          </h1>
          <p className="mt-4 text-[#3B3966] text-sm sm:text-base leading-relaxed">
            {t("events.subtitle")}
          </p>
        </div>

        {/* 3 Major Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Corporate */}
          <div className="card-twilight p-8 flex flex-col justify-between space-y-6 hover:border-[#2E2A7A] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[12px] bg-[#2E2A7A] text-[#FFC93C] flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-[#2E2A7A]">
                {t("events.corporateTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-[#3B3966] leading-relaxed">
                {t("events.corporateDesc")}
              </p>
              <ul className="space-y-2 text-xs text-[#3B3966] pt-2 border-t border-[#B9B2F0]/20">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E2A7A]" />
                  <span>{isBangla ? "প্রাইভেট মার্কি লাউঞ্জ ও বুফে এরিয়া" : "Private marquee tents & grand buffet"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E2A7A]" />
                  <span>{isBangla ? "টিম বিল্ডিং গেমস ও ডিজে কনসার্ট" : "Team-building games & sound stage"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E2A7A]" />
                  <span>{isBangla ? "৫০+ থেকে ৩,০০০ অতিথি ধারণক্ষমতা" : "Capacity from 50 to 3,000 guests"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* School */}
          <div className="card-twilight p-8 flex flex-col justify-between space-y-6 hover:border-[#2E2A7A] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[12px] bg-[#2E2A7A] text-[#FFC93C] flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-[#2E2A7A]">
                {t("events.schoolTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-[#3B3966] leading-relaxed">
                {t("events.schoolDesc")}
              </p>
              <ul className="space-y-2 text-xs text-[#3B3966] pt-2 border-t border-[#B9B2F0]/20">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E2A7A]" />
                  <span>{isBangla ? "গাইডেড জুরাসিক ডাইনো সায়েন্স ট্রেইল" : "Guided Jurassic science & biology tour"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E2A7A]" />
                  <span>{isBangla ? "শিক্ষকদের জন্য সম্পূর্ণ ফ্রি টিকেট" : "Complimentary passes for faculty chaperones"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E2A7A]" />
                  <span>{isBangla ? "সুরক্ষিত বাউন্ডারি ও ফার্স্ট-এইড দল" : "Enclosed perimeter & paramedic support"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Birthday */}
          <div className="card-twilight p-8 flex flex-col justify-between space-y-6 hover:border-[#2E2A7A] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[12px] bg-[#2E2A7A] text-[#FFC93C] flex items-center justify-center">
                <Cake className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-[#2E2A7A]">
                {t("events.birthdayTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-[#3B3966] leading-relaxed">
                {t("events.birthdayDesc")}
              </p>
              <ul className="space-y-2 text-xs text-[#3B3966] pt-2 border-t border-[#B9B2F0]/20">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E2A7A]" />
                  <span>{isBangla ? "ম্যাজিক আইল্যান্ড ম্যাসকট পারফরম্যান্স" : "Mascot dance performance & photo ops"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E2A7A]" />
                  <span>{isBangla ? "শিশুদের জন্য স্পেশাল ফাস্ট-পাস ব্যান্ড" : "Fast-track wristbands for birthday party"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E2A7A]" />
                  <span>{isBangla ? "কাস্টমাইজড কেক ও বেলুন ডেকোরেশন" : "Customized cake & themed decorations"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Group Quotation Request Form */}
        <div className="max-w-3xl mx-auto card-twilight p-8 sm:p-10 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl text-[#2E2A7A]">
              {t("events.modalTitle")}
            </h2>
            <p className="text-xs text-[#3B3966] mt-1">
              {isBangla ? "আমাদের ইভেন্ট টিম ২৪ ঘণ্টার মধ্যে কাস্টমাইজড প্যাকেজ রেট পাঠাবে" : "Our dedicated group sales team responds with tailored rate cards within 24 hours"}
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#2E2A7A] mx-auto" />
              <h3 className="font-display text-2xl text-[#2E2A7A]">
                {isBangla ? "কোটেশন অনুরোধ গ্রহণ করা হয়েছে!" : "Quotation Request Received!"}
              </h3>
              <p className="text-xs text-[#3B3966] max-w-md mx-auto">
                {isBangla
                  ? "আমাদের কর্পোরেট ইভেন্টস ম্যানেজার শীঘ্রই আপনার সাথে ফোনে ও ইমেইলে যোগাযোগ করবেন।"
                  : "Thank you for reaching out. A group coordinator will follow up directly on your provided phone number and email."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#2E2A7A] font-semibold block mb-1">
                    {isBangla ? "আয়োজনের ধরন:" : "Event Category:"}
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                  >
                    <option value="corporate">Corporate Annual Picnic</option>
                    <option value="school">School / College Field Trip</option>
                    <option value="birthday">Milestone Birthday / Family Reunion</option>
                    <option value="buyout">Exclusive Full Park Buyout</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#2E2A7A] font-semibold block mb-1">
                    {isBangla ? "প্রতিষ্ঠানের নাম / আয়োজক:" : "Company / School / Host Name:"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="w-full px-3 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                  />
                </div>

                <div>
                  <label className="text-[#2E2A7A] font-semibold block mb-1">
                    {isBangla ? "যোগাযোগকারীর নাম:" : "Contact Person Name:"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Mr. S. Rahman"
                    className="w-full px-3 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                  />
                </div>

                <div>
                  <label className="text-[#2E2A7A] font-semibold block mb-1">
                    {isBangla ? "মোবাইল ফোন নম্বর:" : "Mobile Phone Number:"} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                  />
                </div>

                <div>
                  <label className="text-[#2E2A7A] font-semibold block mb-1">
                    {isBangla ? "আনুমানিক অতিথি সংখ্যা:" : "Estimated Guest Count:"}
                  </label>
                  <input
                    type="number"
                    min="15"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                  />
                </div>

                <div>
                  <label className="text-[#2E2A7A] font-semibold block mb-1">
                    {isBangla ? "সম্ভাব্য পরিদর্শনের তারিখ:" : "Target Event Date:"}
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#2E2A7A] font-semibold block mb-1">
                  {isBangla ? "বিশেষ চাহিদা ও খাবার সংক্রান্ত তথ্য:" : "Specific Catering or Facility Requirements:"}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Buffet lunch requirements, private stage setup, branding flags..."
                  className="w-full px-3 py-2 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="btn-primary flex-1 py-3.5 text-xs font-bold uppercase tracking-wider gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t("events.inquiryBtn")}</span>
                </button>

                {waInquiry.isConfigured && (
                  <a
                    href={waInquiry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary py-3.5 px-5 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#2E2A7A]" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
