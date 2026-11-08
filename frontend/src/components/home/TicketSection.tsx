"use client";

import React from "react";
import Link from "next/link";
import { Ticket, MessageCircle, Check, Star, ShieldAlert, Sparkles } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { BOOKING_CONFIG, TicketPackage } from "@/config/booking";
import { buildWhatsAppLink } from "@/config/business";
import { PlaceholderBadge } from "../ui/PlaceholderBadge";

export function TicketSection() {
  const { t, isBangla } = useTranslation();

  return (
    <section id="tickets-section" className="py-20 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Ticket className="w-3.5 h-3.5" />
            <span>{t("tickets.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t("tickets.title")}
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t("tickets.subtitle")}
          </p>

          {/* Preliminary Pricing Notice Banner */}
          <div className="mt-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-center gap-2 max-w-2xl mx-auto text-left sm:text-center">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t("tickets.placeholderBanner")}</span>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOOKING_CONFIG.availablePackages.map((pkg: TicketPackage) => {
            const isFeatured = pkg.isPopular;
            const waLink = buildWhatsAppLink({
              packageTitle: isBangla ? pkg.title.bn : pkg.title.en,
              locale: isBangla ? "bn" : "en",
            });

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  isFeatured
                    ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-amber-400/80 shadow-2xl shadow-amber-500/10"
                    : "bg-slate-900/60 border border-white/10 hover:border-white/20 shadow-xl"
                }`}
              >
                {/* Popular Ribbon */}
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isBangla ? pkg.badge?.bn : pkg.badge?.en}</span>
                  </div>
                )}

                <div className="p-6">
                  {/* Title & Subtitle */}
                  <div className="min-h-[60px]">
                    <h3 className="text-lg font-bold text-white">
                      {isBangla ? pkg.title.bn : pkg.title.en}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {isBangla ? pkg.subtitle.bn : pkg.subtitle.en}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="my-5 p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">{t("tickets.adult")}:</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">
                          ৳{pkg.pricing.adultPriceBDT.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-400">/{t("tickets.perPerson")}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between pt-1 border-t border-white/5">
                      <span className="text-xs text-slate-400">{t("tickets.child")}:</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-amber-300">
                          ৳{pkg.pricing.childPriceBDT.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">/{t("tickets.perPerson")}</span>
                      </div>
                    </div>

                    {/* Placeholder Badge */}
                    <div className="pt-1 text-center">
                      <PlaceholderBadge
                        label={isBangla ? "খসড়া মূল্যতালিকা" : "Preview Tariff"}
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Perks List */}
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                      {t("tickets.whatsIncluded")}
                    </p>
                    <ul className="space-y-2 text-slate-400">
                      {(isBangla ? pkg.perks.bn : pkg.perks.en).map((perk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="p-6 pt-0 space-y-2.5">
                  <Link
                    href={`/booking?package=${pkg.id}`}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 ${
                      isFeatured
                        ? "btn-fantasy-gold"
                        : "btn-fantasy-cyan"
                    }`}
                  >
                    <Ticket className="w-4 h-4" />
                    <span>{t("tickets.bookOnlineBtn")}</span>
                  </Link>

                  {/* WhatsApp Pre-populated CTA */}
                  {waLink.isConfigured ? (
                    <a
                      href={waLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t("tickets.whatsappBtn")}</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      title="Official WhatsApp will activate upon launch"
                      className="w-full py-2 px-3 rounded-xl border border-slate-800 text-slate-500 text-[11px] font-medium cursor-not-allowed bg-slate-900/40"
                    >
                      {isBangla ? "হোয়াটসঅ্যাপ (উদ্বোধনে চালু হবে)" : "WhatsApp (Pending Launch)"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Child Hint */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>{t("tickets.childFreeHint")}</p>
        </div>
      </div>
    </section>
  );
}

