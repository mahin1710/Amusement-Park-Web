"use client";

import React, { useState } from "react";
import { MessageCircle, X, ExternalLink, AlertCircle } from "lucide-react";
import { businessConfig, buildWhatsAppLink } from "@/config/business";
import { useTranslation } from "@/context/LanguageContext";

export function FloatingWhatsApp() {
  const { isBangla } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const { url, isConfigured } = buildWhatsAppLink({
    locale: isBangla ? "bn" : "en",
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl bg-white border border-slate-200 p-4 shadow-2xl text-slate-800 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 p-0.5 shrink-0 flex items-center justify-center overflow-hidden shadow-xs">
                <img
                  src="/images/magic-island-logo.jpg"
                  alt="Anowar City Magic Island"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-[9px] font-black tracking-widest text-[#006194] uppercase block leading-none mb-0.5">
                  {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
                </span>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {isBangla ? "ম্যাজিক আইল্যান্ড হেল্পডেস্ক" : "Magic Island Helpdesk"}
                </h4>
                <p className="text-[10px] text-emerald-600 font-semibold leading-none mt-0.5">
                  {isConfigured
                    ? isBangla
                      ? "অনলাইন প্রতিনিধি সক্রিয়"
                      : "Online Assistance Active"
                    : isBangla
                    ? "নম্বর যাচাইকরণ প্রক্রিয়াধীন"
                    : "Official Helpline Available"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              aria-label="Close WhatsApp popover"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-600 space-y-2">
            <p>
              {isBangla
                ? "আমাদের টিকেট, গ্রুপ পাস ও রিসোর্ট রুম বুকিং টিমের সাথে সরাসরি হোয়াটসঅ্যাপে কথা বলতে ক্লিক করুন।"
                : "Chat directly with our team on WhatsApp for tickets, resort rooms, group passes, and cabanas."}
            </p>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isBangla ? "হোয়াটসঅ্যাপ চ্যাট শুরু করুন" : "Start WhatsApp Chat"}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-75" />
          </a>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/30 transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
        aria-label="WhatsApp Booking Support"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 text-white" />
      </button>
    </div>
  );
}
