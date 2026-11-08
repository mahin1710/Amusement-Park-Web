"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Compass,
  Car,
  Bus,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Phone,
  Navigation,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";

export function LocationSection() {
  const { t, isBangla } = useTranslation();

  return (
    <section className="py-24 relative bg-slate-950 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-950/40">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>{isBangla ? "পার্কের অবস্থান ও দিকনির্দেশনা" : "Park Location & Directions"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            <span>{isBangla ? "সহজেই চলে আসুন " : "Easy to Reach "}</span>
            <span className="bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              {isBangla ? "ম্যাজিক আইল্যান্ডে" : "Magic Island Park"}
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBangla
              ? "ঢাকার খুব কাছেই কেরানীগঞ্জ হাইওয়ে, কোনাখোলা (ফায়ার সার্ভিস স্টেশনের ঠিক পাশে) — বাবুবাজার ২য় বুড়িগঙ্গা সেতু থেকে মাত্র ২০ মিনিট।"
              : "Konakhola, Keraniganj Highway, Dhaka (Right beside Fire Service Station) — just 20 minutes from Babubazar 2nd Buriganga Bridge."}
          </p>

          {/* Confirmed Location Badge Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-cyan-500/40 text-cyan-200 text-xs sm:text-sm flex items-center justify-center gap-2.5 max-w-2xl mx-auto shadow-xl">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="font-bold">
              {isBangla
                ? "অফিশিয়াল ঠিকানা: কেরানীগঞ্জ হাইওয়ে, কোনাখোলা (ফায়ার সার্ভিস মোড়), ঢাকা ১৩১০"
                : "Official Address: Keraniganj Highway, Konakhola (Near Fire Station), Dhaka 1310"}
            </span>
          </div>
        </div>

        {/* Two-Column Grid: Left Card (Interactive Visual Google Map) & Right Card (Transit Guidance & Hours) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/90 border border-white/10 p-5 sm:p-7 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden shadow-2xl">
            {/* Google Maps Embed iframe */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
              <iframe
                title="Magic Island Keraniganj Google Map"
                src="https://maps.google.com/maps?q=Magic+Island+Keraniganj+Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
                allowFullScreen
              ></iframe>

              <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white flex items-center gap-2 shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Magic Island, Keraniganj</span>
              </div>
            </div>

            {/* Hint Box below map */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">
                  {isBangla ? "গুগল ম্যাপে সরাসরি নেভিগেশন:" : "Direct Navigation on Google Maps:"}
                </span>
                <span className="text-white font-bold">
                  {isBangla ? "কোনাখোলা ফায়ার সার্ভিস, কেরানীগঞ্জ হাইওয়ে" : "Konakhola Fire Service, Keraniganj"}
                </span>
              </div>
              <a
                href="https://maps.google.com/maps?q=Magic+Island+Keraniganj+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold transition-colors shadow-lg shadow-cyan-500/20"
              >
                <Navigation className="w-4 h-4" />
                <span>{isBangla ? "গুগল ম্যাপে ওপেন করুন" : "Open in Google Maps"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Transit Guidance & Operating Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Transit Guidance Card */}
            <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-7 backdrop-blur-xl space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Car className="w-5 h-5 text-cyan-400" />
                <span>{isBangla ? "কিভাবে আসবেন (যাতায়াত নির্দেশিকা)" : "How to Get Here (Directions)"}</span>
              </h3>

              <div className="space-y-4 text-xs">
                {/* Route 1 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {isBangla ? "ব্যক্তিগত গাড়ি, সিএনজি বা বাইকে" : "By Car, Bike or CNG"}
                    </h4>
                    <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                      {isBangla
                        ? "গুলিস্তান বা বাবুবাজার ২য় বুড়িগঙ্গা সেতু পার হয়ে কদমতলী মোড় দিয়ে সরাসরি কেরানীগঞ্জ হাইওয়ে হয়ে কোনাখোলা ফায়ার সার্ভিস মোড়ে মাত্র ১৫-২০ মিনিট।"
                        : "From Gulistan/Babubazar 2nd Buriganga Bridge, take the Keraniganj highway towards Konakhola Fire Station (15-20 mins)."}
                    </p>
                  </div>
                </div>

                {/* Route 2 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {isBangla ? "পাবলিক বাস ও লোকাল পরিবহনে" : "By Public Bus"}
                    </h4>
                    <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                      {isBangla
                        ? "গুলিস্তান, যাত্রাবাড়ী বা সদরঘাট থেকে রোহিতপুর/কেরানীগঞ্জগামী যে কোনো বাসে উঠে কোনাখোলা ফায়ার সার্ভিস স্টপেজে নামলেই পার্কের মূল প্রবেশদ্বার।"
                        : "Take any Rohitpur or Keraniganj bound bus from Gulistan or Sadarghat and drop off directly at Konakhola Fire Service."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-7 backdrop-blur-xl space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>{isBangla ? "পার্ক খোলার সময়সূচি" : "Park Operating Hours"}</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">{isBangla ? "প্রতিদিন (শনিবার - বৃহস্পতিবার):" : "Regular Days (Sat - Thu):"}</span>
                  <span className="font-bold text-white">10:00 AM - 07:00 PM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">{isBangla ? "শুক্রবার ও সরকারি ছুটির দিন:" : "Friday & Public Holidays:"}</span>
                  <span className="font-bold text-amber-400">10:00 AM - 07:30 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">{isBangla ? "ওয়েভ পুল সেশন:" : "Wave Pool Sessions:"}</span>
                  <span className="font-bold text-cyan-400">{isBangla ? "প্রতি ৪৫ মিনিট পরপর" : "Every 45 mins"}</span>
                </div>
              </div>

              {/* Hotlines */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">{isBangla ? "হটলাইন:" : "Helplines:"}</span>
                <div className="space-x-3 font-bold text-emerald-400">
                  <a href="tel:+8801966602745" className="hover:underline">+880 1966-602745</a>
                  <span>•</span>
                  <a href="tel:+8801966602740" className="hover:underline">+880 1966-602740</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
