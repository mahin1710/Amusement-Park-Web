"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  RotateCcw,
  MessageCircle,
  Bed,
  Check,
  Plus,
  Minus,
  Sparkles,
  Info,
  ShieldCheck,
  Building,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import {
  STAY_CONFIG,
  calculateStayDuration,
  calculateRoomCosts,
  toBnDigits,
  formatCurrency,
} from "@/config/roomPricing";
import { businessConfig } from "@/config/business";

function getTodayAndTomorrow(): { today: string; tomorrow: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const today = `${y}-${m}-${d}`;

  const next = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const ny = next.getFullYear();
  const nm = String(next.getMonth() + 1).padStart(2, "0");
  const nd = String(next.getDate()).padStart(2, "0");
  const tomorrow = `${ny}-${nm}-${nd}`;

  return { today, tomorrow };
}

export function StayPriceCalculator() {
  const { isBangla } = useTranslation();
  const initialDates = useMemo(() => getTodayAndTomorrow(), []);

  // Form State: Starts empty so user can freely choose their preferred date & time
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [checkOutTime, setCheckOutTime] = useState<string>("");

  // Default: 1 Deluxe Room selected so user immediately sees live pricing
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "deluxe-pool": 1,
    "executive-suite": 0,
    "presidential-villa": 0,
  });

  // Calculate Stay Duration and Chargeable Days
  const stay = useMemo(() => {
    return calculateStayDuration(checkInDate, checkInTime, checkOutDate, checkOutTime);
  }, [checkInDate, checkInTime, checkOutDate, checkOutTime]);

  // Calculate Costs based on Chargeable Days (defaults to 1-day base rate when dates are pending)
  const costs = useMemo(() => {
    const days = stay.isValid ? stay.chargeableDays : 1;
    return calculateRoomCosts(quantities, days);
  }, [quantities, stay]);

  // Quantity Handlers
  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(10, current + delta));
      return { ...prev, [id]: next };
    });
  };

  // Reset to Defaults (inputs cleared)
  const handleReset = () => {
    setCheckInDate("");
    setCheckInTime("");
    setCheckOutDate("");
    setCheckOutTime("");
    setQuantities({
      "deluxe-pool": 1,
      "executive-suite": 0,
      "presidential-villa": 0,
    });
  };

  // Build WhatsApp Message with exact calculation details
  const whatsappBookingHref = useMemo(() => {
    if (!stay.isValid) {
      const selectedRoomsSummary = costs.categoryTotals
        .filter((c) => c.quantity > 0)
        .map(
          (c) =>
            `• ${isBangla ? c.titleBn : c.titleEn}: ${
              isBangla ? toBnDigits(c.quantity) : c.quantity
            } ${isBangla ? "টি রুম" : "room(s)"} × ${formatCurrency(c.pricePerDayBDT, isBangla)}`
        )
        .join("\n");

      const message = isBangla
        ? `হ্যালো ম্যাজিক আইল্যান্ড, আমি রিসোর্ট রুম বুকিং অনুসন্ধান করতে চাই।\n\n` +
          `নির্বাচিত রুম:\n${selectedRoomsSummary || "রুম তথ্য"}\n\n` +
          `অনুগ্রহ করে রুমের প্রাপ্যতা ও বুকিং প্রক্রিয়া জানান।`
        : `Hello Magic Island, I want to inquire about resort room booking.\n\n` +
          `Selected Rooms:\n${selectedRoomsSummary || "No room selected"}\n\n` +
          `Please share room availability and booking details.`;

      return `https://wa.me/${businessConfig.hotlines.whatsapp.replace(
        /[^0-9]/g,
        ""
      )}?text=${encodeURIComponent(message)}`;
    }

    const selectedRoomsSummary = costs.categoryTotals
      .filter((c) => c.quantity > 0)
      .map(
        (c) =>
          `• ${isBangla ? c.titleBn : c.titleEn}: ${
            isBangla ? toBnDigits(c.quantity) : c.quantity
          } ${
            isBangla ? "টি রুম" : "room(s)"
          } × ${formatCurrency(c.pricePerDayBDT, isBangla)} = ${formatCurrency(c.subtotalBDT, isBangla)}`
      )
      .join("\n");

    const message = isBangla
      ? `হ্যালো ম্যাজিক আইল্যান্ড, আমি রিসোর্ট রুম বুকিং অনুসন্ধান করতে চাই।\n\n` +
        `📅 চেক-ইন: ${stay.checkInFormattedBn}\n` +
        `📅 চেক-আউট: ${stay.checkOutFormattedBn}\n` +
        `⏱️ মোট সময়: ${stay.formattedDurationBn}\n` +
        `🏨 বিলিং দিন (Chargeable): ${toBnDigits(stay.chargeableDays)} দিন\n` +
        `🌙 ক্যালেন্ডার রাত: ${toBnDigits(stay.calendarNights)} রাত\n\n` +
        `নির্বাচিত রুম:\n${selectedRoomsSummary || "কনো রুম নির্বাচন করা হয়নি"}\n\n` +
        `💰 সর্বমোট প্রাক্কলিত ভাড়া: ${formatCurrency(costs.grandTotalBDT, isBangla)}\n\n` +
        `অনুগ্রহ করে প্রাপ্যতা ও নিশ্চিতকরণ প্রক্রিয়া জানান।`
      : `Hello Magic Island, I want to inquire about resort room booking with this estimate:\n\n` +
        `📅 Check-in: ${stay.checkInFormattedEn}\n` +
        `📅 Check-out: ${stay.checkOutFormattedEn}\n` +
        `⏱️ Total Stay: ${stay.formattedDurationEn}\n` +
        `🏨 Chargeable Days: ${stay.chargeableDays} Day(s)\n` +
        `🌙 Calendar Nights: ${stay.calendarNights} Night(s)\n\n` +
        `Selected Rooms:\n${selectedRoomsSummary || "No room selected"}\n\n` +
        `💰 Grand Total: ${formatCurrency(costs.grandTotalBDT, isBangla)}\n\n` +
        `Please confirm availability and booking procedure.`;

    return `https://wa.me/${businessConfig.hotlines.whatsapp.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
  }, [stay, costs, isBangla]);

  return (
    <div
      className="mt-12 sm:mt-16 park-card p-6 sm:p-10 bg-white border-2 border-[#FED7AA] rounded-3xl shadow-xl transition-all"
      data-purpose="stay-price-calculator"
      id="stay-calculator"
    >
      {/* Calculator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FED7AA]/50 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#FF6B35] text-xs font-heading font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>
              {isBangla
                ? "স্বয়ংক্রিয় দিন/রাত ও রুম ভাড়া ক্যালকুলেটর"
                : "Automatic Stay & Room Price Calculator"}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#172554] tracking-tight">
            {isBangla ? "আপনার রিসোর্ট স্টে হিসাব করুন" : "Calculate Your Resort Stay & Costs"}
          </h3>
          <p className="text-xs sm:text-sm text-[#3B4B75] mt-1 font-sans">
            {isBangla
              ? "চেক-ইন ও চেক-আউট তারিখ/সময় নির্বাচন করুন এবং স্বয়ংক্রিয়ভাবে চার্জেবল দিন ও মোট ভাড়া দেখুন।"
              : "Select your check-in & check-out dates/times, choose multiple room categories, and see exact chargeable days."}
          </p>
          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FFF9ED] border border-[#FFD93D] text-xs font-heading font-bold text-[#172554] shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>
              {isBangla
                ? "১ স্টে আওয়ার্স: ১০:০০ AM - ০৯:০০ PM"
                : "1 Stay Hours: 10:00 AM - 09:00 PM"}
            </span>
          </div>
        </div>

        <button
          onClick={handleReset}
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-xs font-heading font-semibold text-slate-600 hover:text-[#FF6B35] hover:border-[#FF6B35] hover:bg-[#FFF7ED] transition-all cursor-pointer self-start sm:self-auto shrink-0"
          title="Reset to default dates & rooms"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isBangla ? "রিসেট করুন" : "Reset Calculator"}</span>
        </button>
      </div>

      {/* 1. Date & Time Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Check-in Selector Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9ED] border-2 border-[#FED7AA]/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4 text-[#172554]">
            <div className="w-8 h-8 rounded-full bg-[#FFD93D] flex items-center justify-center text-[#172554] font-bold text-sm">
              {isBangla ? "১" : "1"}
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-[#172554] leading-tight">
                {isBangla ? "চেক-ইন তারিখ ও সময়" : "Check-in Date & Time"}
              </h4>
              <span className="text-[11px] text-[#3B4B75]">
                {isBangla ? "আপনার পছন্দমতো চেক-ইন সময়" : "Select your preferred arrival time"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-heading font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>{isBangla ? "চেক-ইন তারিখ" : "Check-in Date"}</span>
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#FED7AA] bg-white text-xs sm:text-sm font-heading font-medium text-[#172554] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent cursor-pointer shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>{isBangla ? "চেক-ইন সময়" : "Check-in Time"}</span>
              </label>
              <input
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#FED7AA] bg-white text-xs sm:text-sm font-heading font-medium text-[#172554] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent cursor-pointer shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Check-out Selector Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9ED] border-2 border-[#FED7AA]/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4 text-[#172554]">
            <div className="w-8 h-8 rounded-full bg-[#FFD93D] flex items-center justify-center text-[#172554] font-bold text-sm">
              {isBangla ? "২" : "2"}
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-[#172554] leading-tight">
                {isBangla ? "চেক-আউট তারিখ ও সময়" : "Check-out Date & Time"}
              </h4>
              <span className="text-[11px] text-[#3B4B75]">
                {isBangla ? "আপনার সুবিধাজনক চেক-আউট সময়" : "Select your preferred departure time"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-heading font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{isBangla ? "চেক-আউট তারিখ" : "Check-out Date"}</span>
              </label>
              <input
                type="date"
                min={checkInDate}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#FED7AA] bg-white text-xs sm:text-sm font-heading font-medium text-[#172554] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent cursor-pointer shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-[#172554] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{isBangla ? "চেক-আউট সময়" : "Check-out Time"}</span>
              </label>
              <input
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#FED7AA] bg-white text-xs sm:text-sm font-heading font-medium text-[#172554] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent cursor-pointer shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Friendly Guide Note when inputs are empty */}
      {stay.isIncomplete && (
        <div className="p-4 rounded-2xl bg-[#FFF7ED] border-2 border-[#FED7AA] text-[#B45309] flex items-center gap-3 mb-8">
          <Info className="w-5 h-5 text-[#FF6B35] shrink-0" />
          <p className="text-xs sm:text-sm font-heading font-medium">
            {isBangla
              ? "আপনার সুবিধাজনক চেক-ইন ও চেক-আউট তারিখ এবং সময় নির্বাচন করুন।"
              : "Select your preferred check-in and check-out dates and times above."}
          </p>
        </div>
      )}

      {/* Validation Error Banner (When check-out <= check-in) */}
      {stay.isInvalidRange && (
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-800 flex items-center gap-3 mb-8 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <p className="text-xs sm:text-sm font-heading font-semibold">
            {isBangla ? stay.errorMessageBn : stay.errorMessageEn}
          </p>
        </div>
      )}

      {/* 2. Visual Stay Duration Breakdown (Prominently Highlighted!) */}
      {stay.isValid && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#172554] to-[#1e3a8a] text-white shadow-lg mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            {/* Chargeable Days (Visual Hero Metric) */}
            <div className="sm:border-r sm:border-white/15 sm:pr-4 flex flex-col justify-center items-center sm:items-start">
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#FFD93D] mb-1">
                {isBangla ? "চার্জেবল দিন (ভাড়া হিসাব)" : "Chargeable Accommodation"}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black font-heading text-white">
                  {isBangla ? toBnDigits(stay.chargeableDays) : stay.chargeableDays}
                </span>
                <span className="text-xl font-bold font-heading text-[#FFD93D]">
                  {isBangla ? "দিন" : stay.chargeableDays > 1 ? "Days" : "Day"}
                </span>
              </div>
              <span className="text-[11px] text-white/70 mt-1">
                {isBangla
                  ? `মোট অবস্থানের সময় অনুযায়ী হিসাব`
                  : `Calculated from total stay duration`}
              </span>
            </div>

            {/* Total Stay Duration */}
            <div className="sm:border-r sm:border-white/15 sm:px-4 flex flex-col justify-center items-center sm:items-start">
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#38BDF8] mb-1">
                {isBangla ? "মোট অবস্থানের সময়" : "Total Stay Duration"}
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-heading text-white">
                {isBangla ? stay.formattedDurationBn : stay.formattedDurationEn}
              </div>
              <span className="text-[11px] text-white/70 mt-1">
                {isBangla
                  ? `মোট ${toBnDigits(stay.durationHours.toFixed(1))} ঘণ্টা`
                  : `Exact ${stay.durationHours.toFixed(1)} hours in resort`}
              </span>
            </div>

            {/* Calendar Nights */}
            <div className="sm:pl-4 flex flex-col justify-center items-center sm:items-start">
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#55C98B] mb-1">
                {isBangla ? "ক্যালেন্ডার রাত" : "Calendar Nights"}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  {isBangla ? toBnDigits(stay.calendarNights) : stay.calendarNights}
                </span>
                <span className="text-base font-semibold text-white/80">
                  {isBangla ? "রাত" : stay.calendarNights > 1 ? "Nights" : "Night"}
                </span>
              </div>
              <span className="text-[11px] text-white/70 mt-1">
                {stay.calendarNights === 0
                  ? isBangla
                    ? "ডে-ইউজ / ডে-স্টে"
                    : "Day-use / Day-stay"
                  : isBangla
                  ? "ওভারনাইট রাত্রিযাপন"
                  : "Overnight sleepover"}
              </span>
            </div>
          </div>

          {/* Formatted Date Range Summary Footnote */}
          <div className="mt-4 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs text-white/80 font-sans">
            <div>
              <span className="text-white/60">{isBangla ? "চেক-ইন:" : "Check-in:"}</span>{" "}
              <strong className="text-white">
                {isBangla ? stay.checkInFormattedBn : stay.checkInFormattedEn}
              </strong>
            </div>
            <div>
              <span className="text-white/60">{isBangla ? "চেক-আউট:" : "Check-out:"}</span>{" "}
              <strong className="text-white">
                {isBangla ? stay.checkOutFormattedBn : stay.checkOutFormattedEn}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* 3. Room Selection with Steppers */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading font-bold text-lg text-[#172554] flex items-center gap-2">
            <Bed className="w-5 h-5 text-[#FF6B35]" />
            <span>{isBangla ? "রুমের ধরন ও সংখ্যা নির্বাচন করুন" : "Select Room Categories & Quantities"}</span>
          </h4>
          <span className="text-xs text-[#3B4B75] hidden sm:inline">
            {isBangla
              ? "একাধিক রুম ক্যাটাগরি একসাথে নির্বাচন করতে পারবেন"
              : "Multiple categories can be selected simultaneously"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STAY_CONFIG.rooms.map((room) => {
            const qty = quantities[room.id] || 0;
            const subtotal = room.pricePerDayBDT * qty * (stay.isValid ? stay.chargeableDays : 0);
            const isSelected = qty > 0;

            return (
              <div
                key={room.id}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#FFF9ED] border-[#FF6B35] shadow-md ring-2 ring-[#FF6B35]/20"
                    : "bg-white border-slate-200 hover:border-[#FED7AA]"
                }`}
              >
                <div>
                  {/* Room Thumbnail & Badge */}
                  <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-slate-100">
                    <img
                      src={room.image}
                      alt={room.alt}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-[#FF6B35] text-white text-[10px] font-heading font-bold uppercase px-2.5 py-0.5 rounded-full shadow">
                      {isBangla ? room.badgeBn : room.badgeEn}
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <h5 className="font-heading font-bold text-base text-[#172554] mb-1">
                    {isBangla ? room.titleBn : room.titleEn}
                  </h5>
                  <div className="text-xs text-[#FF6B35] font-heading font-bold mb-3">
                    {formatCurrency(room.pricePerDayBDT, isBangla)}{" "}
                    <span className="text-[11px] font-normal text-slate-500">
                      / {isBangla ? "দিন (প্রতি রুম)" : "day (per room)"}
                    </span>
                  </div>
                </div>

                {/* Quantity Stepper & Category Subtotal */}
                <div className="pt-3 border-t border-slate-200/60 mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-heading font-semibold text-slate-600">
                      {isBangla ? "রুম সংখ্যা:" : "Rooms:"}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(room.id, -1)}
                        disabled={qty === 0}
                        type="button"
                        className="w-8 h-8 rounded-lg border border-slate-300 bg-white text-[#172554] hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-heading font-black text-sm text-[#172554]">
                        {isBangla ? toBnDigits(qty) : qty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(room.id, 1)}
                        disabled={qty >= 10}
                        type="button"
                        className="w-8 h-8 rounded-lg bg-[#FFD93D] hover:bg-[#FEE05E] text-[#172554] flex items-center justify-center transition-all cursor-pointer font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal preview for this category */}
                  <div className="flex items-baseline justify-between text-xs pt-2 border-t border-dashed border-slate-200">
                    <span className="text-slate-500">{isBangla ? "সাবটোটাল:" : "Subtotal:"}</span>
                    <strong className="font-heading font-bold text-[#172554]">
                      {formatCurrency(subtotal, isBangla)}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Live Price Summary & Breakdown Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFF9ED] border-2 border-[#FFD93D] shadow-md">
        <h4 className="font-heading font-bold text-lg text-[#172554] mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-[#FF6B35]" />
          <span>{isBangla ? "ভাড়ার চূড়ান্ত বিবরণী" : "Estimated Cost Breakdown & Summary"}</span>
        </h4>

        {/* Selected Items Line-by-Line Breakdown */}
        <div className="space-y-2.5 pb-4 border-b border-[#FED7AA]">
          {costs.categoryTotals.filter((c) => c.quantity > 0).length === 0 ? (
            <p className="text-xs sm:text-sm text-slate-500 italic py-2">
              {isBangla
                ? "অনুগ্রহ করে অন্তত ১টি রুম নির্বাচন করুন।"
                : "Please select at least 1 room category above to view costs."}
            </p>
          ) : (
            costs.categoryTotals
              .filter((c) => c.quantity > 0)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-1"
                >
                  <div className="flex items-center gap-2 text-[#172554]">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
                    <span className="font-semibold">{isBangla ? item.titleBn : item.titleEn}</span>
                    <span className="text-slate-500">
                      ({isBangla ? toBnDigits(item.quantity) : item.quantity}{" "}
                      {isBangla ? "টি রুম" : "room"} × {formatCurrency(item.pricePerDayBDT, isBangla)}
                      {stay.isValid ? (
                        <>
                          {" "}× {isBangla ? toBnDigits(stay.chargeableDays) : stay.chargeableDays}{" "}
                          {isBangla ? "দিন" : "days"}
                        </>
                      ) : (
                        <>
                          {" "}× {isBangla ? "১ দিন" : "1 day"}
                        </>
                      )})
                    </span>
                  </div>
                  <strong className="font-heading font-bold text-[#172554] self-end sm:self-auto">
                    {formatCurrency(item.subtotalBDT, isBangla)}
                  </strong>
                </div>
              ))
          )}
        </div>

        {/* Stay Parameters Quick Reference */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-[#FED7AA] text-xs">
          <div>
            <span className="text-slate-500 block">{isBangla ? "মোট রুম:" : "Total Rooms:"}</span>
            <strong className="font-heading text-sm text-[#172554]">
              {isBangla ? toBnDigits(costs.totalRoomsSelected) : costs.totalRoomsSelected}{" "}
              {isBangla ? "টি" : "Room(s)"}
            </strong>
          </div>
          <div>
            <span className="text-slate-500 block">
              {isBangla ? "চার্জেবল দিন:" : "Chargeable Days:"}
            </span>
            <strong className="font-heading text-sm text-[#FF6B35]">
              {stay.isValid ? (
                <>
                  {isBangla ? toBnDigits(stay.chargeableDays) : stay.chargeableDays}{" "}
                  {isBangla ? "দিন" : "Days"}
                </>
              ) : (
                <span className="text-slate-400 font-normal">--</span>
              )}
            </strong>
          </div>
          <div>
            <span className="text-slate-500 block">
              {isBangla ? "ক্যালেন্ডার রাত:" : "Calendar Nights:"}
            </span>
            <strong className="font-heading text-sm text-[#172554]">
              {stay.isValid ? (
                <>
                  {isBangla ? toBnDigits(stay.calendarNights) : stay.calendarNights}{" "}
                  {isBangla ? "রাত" : "Nights"}
                </>
              ) : (
                <span className="text-slate-400 font-normal">--</span>
              )}
            </strong>
          </div>
          <div>
            <span className="text-slate-500 block">{isBangla ? "মোট সময়:" : "Duration:"}</span>
            <strong className="font-heading text-sm text-[#172554]">
              {stay.isValid ? (
                isBangla ? stay.formattedDurationBn : stay.formattedDurationEn
              ) : (
                <span className="text-slate-400 font-normal">--</span>
              )}
            </strong>
          </div>
        </div>

        {/* Grand Total Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#3B4B75] uppercase font-heading font-bold block">
              {isBangla ? "সর্বমোট প্রাক্কলিত ভাড়া" : "Grand Total Estimated Cost"}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-heading text-[#FF6B35] leading-tight">
              {formatCurrency(costs.grandTotalBDT, isBangla)}
            </div>
            <span className="text-[11px] text-slate-500">
              {stay.isValid
                ? (isBangla
                    ? "ব্রেকফাস্ট ও ফ্রি পুলসাইড প্রিভিলেজ অন্তর্ভুক্ত"
                    : "Includes breakfast & complimentary park/pool privileges")
                : (isBangla
                    ? "১ দিনের বেস প্রাক্কলন (নির্দিষ্ট ভাড়া জানতে উপরে তারিখ ও সময় দিন)"
                    : "Base 1-day estimate (select dates & times above to calculate total stay)")}
            </span>
          </div>

          <a
            href={whatsappBookingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-park-primary text-sm font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2.5 px-8 py-3.5 shadow-xl hover:scale-103 transition-transform cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>
              {isBangla ? "এই হিসাবে বুকিং অনুসন্ধান করুন" : "Inquire via WhatsApp with Estimate"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
