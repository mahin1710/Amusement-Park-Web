"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  Printer,
  Copy,
  Check,
  Calendar,
  Users,
  Clock,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  AlertCircle,
  QrCode,
  Ticket,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useTranslation } from "@/context/LanguageContext";
import { BookingRecord } from "@/lib/types/booking";
import { buildWhatsAppLink } from "@/config/business";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { api } from "@/services/api";

export default function ConfirmationPage() {
  const params = useParams();
  const ref = params?.ref as string;
  const { t, isBangla } = useTranslation();

  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ref) return;

    api.getBooking(ref)
      .then((data) => {
        if (data.success && data.booking) {
          setBooking(data.booking);
          // Trigger celebration confetti
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch (e) {
            // Safe fallback
          }
        } else {
          setError("Booking not found");
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch booking details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ref]);

  const copyRefToClipboard = () => {
    if (booking?.bookingReference) {
      navigator.clipboard.writeText(booking.bookingReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F5FB] text-[#2E2A7A] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#2E2A7A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-[#3B3966] font-semibold">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#F6F5FB] text-[#3B3966] flex items-center justify-center p-4">
        <div className="max-w-md w-full card-twilight p-8 text-center space-y-4 border-2 border-rose-200">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-[#2E2A7A]">
            {isBangla ? "বুকিং তথ্য পাওয়া যায়নি" : "Booking Not Found"}
          </h2>
          <p className="text-xs text-[#3B3966]">
            {isBangla ? "প্রদত্ত রেফারেন্স নম্বরের সাথে কোনো রেকর্ড মেলেনি।" : error}
          </p>
          <Link
            href="/booking/lookup"
            className="btn-primary py-2.5 px-5 text-xs inline-block"
          >
            {isBangla ? "বুকিং অনুসন্ধান পেজে যান" : "Go to Booking Lookup"}
          </Link>
        </div>
      </div>
    );
  }

  const isConfirmed = booking.payment.status === "SUCCESS";
  const isPayAtGate = booking.payment.method === "pay_at_gate";

  const waHelp = buildWhatsAppLink({
    packageTitle: isBangla ? booking.packageTitleBn : booking.packageTitleEn,
    date: booking.visitDate,
    customerName: booking.customer.fullName,
    notes: `Booking Reference: ${booking.bookingReference}`,
    locale: isBangla ? "bn" : "en",
  });

  return (
    <div className="min-h-screen bg-[#F6F5FB] text-[#3B3966] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-full bg-[#2E2A7A] text-[#FFC93C] flex items-center justify-center mx-auto mb-2 shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl sm:text-4xl text-[#2E2A7A]">
            {isConfirmed
              ? t("confirmation.successTitle")
              : isPayAtGate
              ? t("confirmation.reservedTitle")
              : isBangla
              ? "রিজার্ভেশন সম্পন্ন হয়েছে!"
              : "Reservation Registered!"}
          </h1>
          <p className="text-xs sm:text-sm text-[#3B3966] max-w-lg mx-auto">
            {isConfirmed
              ? isBangla
                ? "আপনার ডিজিটাল ই-টিকেট সফলভাবে ইস্যু করা হয়েছে। পার্কে প্রবেশের সময় রেফারেন্স কোড বা ই-টিকেট প্রদর্শন করুন।"
                : "Your digital e-ticket pass has been issued. Show this pass or booking reference at the VIP turnstiles upon arrival."
              : isBangla
                ? "আপনার টিকেট স্লট সংরক্ষিত হয়েছে। পার্কের কাউন্টারে এসে রেফারেন্স কোড দেখিয়ে পেমেন্ট সম্পন্ন করুন।"
                : "Your ticket slot has been reserved. Please present your booking reference at the entrance VIP counter to finalize."}
          </p>
        </div>

        {/* Printable Pass Container */}
        <div className="card-twilight overflow-hidden shadow-2xl border-2 border-[#2E2A7A]/30 relative">
          {/* Top Notch Header: night #1C1A4A background per brand guidelines */}
          <div className="bg-[#1C1A4A] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3.5">
              <div className="h-14 w-auto rounded-xl bg-white p-1 shrink-0 shadow-md">
                <img
                  src="/images/magic-island-logo.jpg"
                  alt="Anowar City Magic Island Official Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <span className="eyebrow text-[10px] text-[#B9B2F0] tracking-[0.26em] block">
                  ANOWAR CITY MAGIC ISLAND • OFFICIAL E-TICKET
                </span>
                <h2 className="font-display text-xl sm:text-2xl text-[#FFC93C] mt-1">
                  {isBangla ? booking.packageTitleBn : booking.packageTitleEn}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#2E2A7A] px-3.5 py-1.5 rounded-full border border-[#B9B2F0]/40">
              <span className="text-xs text-white font-mono font-bold">
                {booking.bookingReference}
              </span>
              <button
                onClick={copyRefToClipboard}
                className="text-[#FFC93C] hover:text-white p-1 rounded"
                title="Copy Reference"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Pass Details Body */}
          <div className="p-6 sm:p-8 space-y-6 bg-white">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#B9B2F0]/20 text-xs">
              <div>
                <span className="text-[#3B3966]/70 block">{t("confirmation.dateLabel")}:</span>
                <span className="font-bold text-[#2E2A7A] text-sm mt-0.5 block">{booking.visitDate}</span>
              </div>
              <div>
                <span className="text-[#3B3966]/70 block">{t("confirmation.guestCountLabel")}:</span>
                <span className="font-bold text-[#2E2A7A] text-sm mt-0.5 block">
                  {booking.pricing.adultCount} {t("booking.adults")}
                  {booking.pricing.childCount > 0 ? ` + ${booking.pricing.childCount} ${t("booking.children")}` : ""}
                </span>
              </div>
              <div>
                <span className="text-[#3B3966]/70 block">{t("confirmation.amountPaidLabel")}:</span>
                <span className="font-bold text-[#2E2A7A] text-sm mt-0.5 block">
                  ৳{booking.pricing.finalPayableBDT.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[#3B3966]/70 block">{t("confirmation.paymentStatusLabel")}:</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mt-1 uppercase ${
                  isConfirmed ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}>
                  {booking.payment.status}
                </span>
              </div>
            </div>

            {/* Guest & Payment Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <span className="font-bold text-[#2E2A7A] uppercase tracking-wider text-[11px]">
                  {isBangla ? "অতিথির বিবরণ:" : "Guest Details:"}
                </span>
                <div className="p-4 rounded-[14px] bg-[#F6F5FB] border border-[#B9B2F0]/30 space-y-1">
                  <div className="font-bold text-[#1C1A4A] text-sm">{booking.customer.fullName}</div>
                  <div className="text-[#3B3966]">{booking.customer.phone}</div>
                  <div className="text-[#3B3966]">{booking.customer.email}</div>
                  {booking.customer.specialRequests && (
                    <div className="text-[#3B3966]/70 italic pt-1">
                      Note: {booking.customer.specialRequests}
                    </div>
                  )}
                </div>
              </div>

              {/* QR / Barcode Representation */}
              <div className="flex flex-col items-center justify-center p-4 rounded-[14px] bg-[#F6F5FB] border border-[#B9B2F0]/30 text-center">
                <div className="w-24 h-24 rounded-xl bg-white p-2 flex items-center justify-center shadow-md border border-[#B9B2F0]/40">
                  <QrCode className="w-full h-full text-[#1C1A4A]" />
                </div>
                <span className="text-[11px] text-[#2E2A7A] mt-2 font-mono font-bold tracking-wider">
                  {booking.bookingReference}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                  ✓ Verified QR Pass Payload
                </span>
              </div>
            </div>

            {/* Selected Addons */}
            {booking.selectedAddOns && booking.selectedAddOns.length > 0 && (
              <div className="pt-2 border-t border-[#B9B2F0]/20 text-xs space-y-2">
                <span className="font-semibold text-[#2E2A7A]">
                  {isBangla ? "যুক্ত করা সুবিধাসমূহ:" : "Included Add-On Amenities:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {booking.selectedAddOns.map((addon) => (
                    <span
                      key={addon.id}
                      className="chip-lilac"
                    >
                      ✓ {isBangla ? addon.nameBn : addon.nameEn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons: Print, WhatsApp, Home */}
            <div className="pt-6 border-t border-[#B9B2F0]/20 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="btn-primary py-2.5 px-4 text-xs font-bold gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t("confirmation.printTicketBtn")}</span>
                </button>

                {waHelp.isConfigured && (
                  <a
                    href={waHelp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary py-2.5 px-4 text-xs font-bold gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t("confirmation.sendWhatsAppBtn")}</span>
                  </a>
                )}
              </div>

              <Link
                href="/"
                className="text-xs text-[#2E2A7A] hover:underline font-bold flex items-center gap-1"
              >
                <span>{t("confirmation.backHomeBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
