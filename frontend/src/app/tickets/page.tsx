"use client";

import React from "react";
import Link from "next/link";
import { Ticket, Star, Check, ShieldAlert, MessageCircle, HelpCircle, Utensils, Lock, Camera, Sparkles } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { BOOKING_CONFIG } from "@/config/booking";
import { buildWhatsAppLink } from "@/config/business";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

export default function TicketsPage() {
  const { t, isBangla } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#172554] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-widest mb-4 border border-sky-200">
            <Ticket className="w-3.5 h-3.5 text-sky-600" />
            <span>{t("tickets.badge")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading uppercase">
            {t("tickets.title")}
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {t("tickets.subtitle")}
          </p>

          {/* Pricing Notice */}
          <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs flex items-center justify-center gap-2.5 max-w-2xl mx-auto text-left sm:text-center shadow-sm">
            <ShieldAlert className="w-5 h-5 text-sky-600 shrink-0" />
            <span>{t("tickets.placeholderBanner")}</span>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {BOOKING_CONFIG.availablePackages.map((pkg) => {
            const isFeatured = pkg.isPopular;
            const waLink = buildWhatsAppLink({
              packageTitle: isBangla ? pkg.title.bn : pkg.title.en,
              locale: isBangla ? "bn" : "en",
            });

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  isFeatured
                    ? "bg-white border-2 border-sky-600 shadow-xl"
                    : "bg-white border border-slate-200 shadow-md"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF7A24] text-white font-bold text-[11px] uppercase tracking-wider shadow flex items-center gap-1.5 whitespace-nowrap">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>{isBangla ? pkg.badge?.bn : pkg.badge?.en}</span>
                  </div>
                )}

                <div className="p-6">
                  <div className="min-h-[60px]">
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      {isBangla ? pkg.title.bn : pkg.title.en}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {isBangla ? pkg.subtitle.bn : pkg.subtitle.en}
                    </p>
                  </div>

                  <div className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-600 font-medium">{t("tickets.adult")}:</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-900 font-heading">
                          ৳{pkg.pricing.adultPriceBDT.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-500">/{t("tickets.perPerson")}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between pt-1 border-t border-slate-200">
                      <span className="text-xs text-slate-600 font-medium">{t("tickets.child")}:</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-sky-700 font-heading">
                          ৳{pkg.pricing.childPriceBDT.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-500">/{t("tickets.perPerson")}</span>
                      </div>
                    </div>

                    <div className="pt-1 text-center">
                      <PlaceholderBadge
                        label={isBangla ? "খসড়া মূল্যতালিকা" : "Preview Tariff"}
                        size="sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                      {t("tickets.whatsIncluded")}
                    </p>
                    <ul className="space-y-2 text-slate-600">
                      {(isBangla ? pkg.perks.bn : pkg.perks.en).map((perk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5 font-bold" />
                          <span className="leading-tight">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2.5">
                  <Link
                    href={`/booking?package=${pkg.id}`}
                    className="w-full gradient-orange-cta py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-center"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>{t("tickets.bookOnlineBtn")}</span>
                  </Link>

                  {waLink.isConfigured && (
                    <a
                      href={waLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl border border-sky-300 text-sky-700 bg-white hover:bg-sky-50 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t("tickets.whatsappBtn")}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-On Services Section */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {isBangla ? "অতিরিক্ত প্রিমিয়াম সেবা ও সুবিধাসমূহ" : "Optional Add-On Services & Amenities"}
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              {isBangla ? "অনলাইন বুকিংয়ের সময় আপনার টিকেটের সাথে সহজে যুক্ত করুন" : "Add these comfort perks to your online reservation during checkout"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOOKING_CONFIG.addOns.map((addon) => {
              const icons = {
                facility: Lock,
                food: Utensils,
                vip: Sparkles,
                activity: Camera,
              };
              const Icon = icons[addon.category] || Sparkles;

              return (
                <div
                  key={addon.id}
                  className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between space-y-4 shadow-sm hover:-translate-y-1 transition-all"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">
                        {isBangla ? addon.name.bn : addon.name.en}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {isBangla ? addon.description.bn : addon.description.en}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <span className="text-base font-black text-slate-900 font-heading">
                      ৳{addon.priceBDT}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {addon.perPerson ? (isBangla ? "জনপ্রতি" : "per person") : (isBangla ? "প্রতি আইটেম" : "per item")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
