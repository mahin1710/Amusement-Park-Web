"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Ticket, AlertCircle, ArrowRight, CheckCircle2, Calendar, Users, Eye } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { BookingRecord } from "@/lib/types/booking";
import { api } from "@/services/api";

export default function BookingLookupPage() {
  const { t, isBangla } = useTranslation();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BookingRecord[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const data = await api.searchBookings(query.trim());
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5FB] text-[#3B3966] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center">
          <div className="h-16 w-auto p-1 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center mb-2">
            <img
              src="/images/magic-island-logo.jpg"
              alt="Anowar City Magic Island Official Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <span className="text-[10px] font-black tracking-[0.25em] text-[#006194] uppercase mb-1">
            {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
          </span>
          <div className="inline-flex items-center gap-2 chip-lilac mb-4">
            <Search className="w-3.5 h-3.5 text-[#2E2A7A]" />
            <span className="eyebrow text-xs">{t("lookup.title")}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#2E2A7A]">
            {t("lookup.title")}
          </h1>
          <p className="mt-3 text-[#3B3966] text-sm leading-relaxed">
            {t("lookup.subtitle")}
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="card-twilight p-2.5 flex flex-col sm:flex-row gap-2 shadow-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3B3966]/60" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("lookup.inputPlaceholder")}
                className="w-full pl-10 pr-4 py-3 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-xs sm:text-sm text-[#1C1A4A] placeholder-slate-400 focus:outline-none focus:border-[#2E2A7A]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary py-3 px-6 text-xs uppercase tracking-wider disabled:opacity-50"
            >
              {loading ? t("common.loading") : t("lookup.searchBtn")}
            </button>
          </div>

          <div className="mt-3 text-center">
            <span className="text-[12px] text-[#3B3966]">
              {isBangla ? "টেস্ট করুন ডেমো কোড দিয়ে:" : "Try testing with sample reference:"}{" "}
              <button
                type="button"
                onClick={() => setQuery("MI-DEMO-2026")}
                className="text-[#2E2A7A] font-bold underline font-mono ml-1 hover:text-[#1C1A4A]"
              >
                MI-DEMO-2026
              </button>
            </span>
          </div>
        </form>

        {/* Results */}
        {searched && (
          <div className="space-y-4">
            {results && results.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#2E2A7A] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E2A7A]" />
                  <span>{t("lookup.foundHeader")} ({results.length})</span>
                </h3>

                {results.map((b) => (
                  <div
                    key={b.id}
                    className="card-twilight p-6 border-2 border-[#2E2A7A]/20 transition-all hover:border-[#2E2A7A]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#B9B2F0]/20">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B3966] block">
                          {isBangla ? "রেফারেন্স নম্বর" : "Reference ID"}
                        </span>
                        <span className="font-mono font-black text-lg text-[#2E2A7A]">
                          {b.bookingReference}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            b.payment?.status === "SUCCESS"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : b.payment?.status === "PENDING" || b.bookingStatus === "RESERVED_PENDING_PAYMENT"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : "bg-slate-200 text-slate-800"
                          }`}
                        >
                          {b.bookingStatus || b.payment?.status}
                        </span>
                        <Link
                          href={`/booking/confirmation/${b.bookingReference}`}
                          className="btn-primary py-2 px-3 text-xs gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t("lookup.viewPass")}</span>
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                      <div>
                        <span className="text-[#3B3966]/70 block">{isBangla ? "অতিথির নাম:" : "Guest Name:"}</span>
                        <span className="font-bold text-[#1C1A4A]">{b.customer?.fullName}</span>
                      </div>
                      <div>
                        <span className="text-[#3B3966]/70 block">{isBangla ? "ভ্রমণের তারিখ:" : "Visit Date:"}</span>
                        <span className="font-bold text-[#1C1A4A] flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#2E2A7A]" />
                          <span>{b.visitDate}</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-[#3B3966]/70 block">{isBangla ? "মোট অতিথি:" : "Total Guests:"}</span>
                        <span className="font-bold text-[#1C1A4A] flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#2E2A7A]" />
                          <span>{b.pricing?.adultCount ?? 2} Adults {(b.pricing?.childCount ?? 0) > 0 ? `+ ${b.pricing?.childCount} Children` : ""}</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-[#3B3966]/70 block">{isBangla ? "প্রদেয় মোট:" : "Total Paid:"}</span>
                        <span className="font-bold text-[#2E2A7A] text-sm">৳{(b.pricing?.finalPayableBDT ?? 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-twilight p-12 text-center space-y-4 max-w-lg mx-auto">
                <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
                <h4 className="font-bold text-[#2E2A7A] text-base">
                  {t("lookup.noRecords")}
                </h4>
                <p className="text-xs text-[#3B3966] leading-relaxed">
                  {t("lookup.noRecordsDesc")}
                </p>
                <div className="pt-2">
                  <Link
                    href="/booking"
                    className="btn-primary py-2.5 px-4 text-xs font-bold inline-flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>{t("lookup.bookNewTickets")}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
