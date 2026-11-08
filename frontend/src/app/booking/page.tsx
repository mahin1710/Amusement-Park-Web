"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Ticket,
  Calendar,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { BOOKING_CONFIG, calculateBookingPrice } from "@/config/booking";
import { PAYMENT_CONFIG, PaymentMethod } from "@/config/payment";
import { buildWhatsAppLink } from "@/config/business";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { api } from "@/services/api";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, isBangla } = useTranslation();

  // Form States
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    searchParams.get("package") || BOOKING_CONFIG.availablePackages[0].id
  );

  // Default to tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split("T")[0];

  const [visitDate, setVisitDate] = useState<string>(minDateStr);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [promoCodeInput, setPromoCodeInput] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Customer Contact Fields
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("sslcommerz");

  // Form Validation & Submission States
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Selected package reference
  const selectedPkg =
    BOOKING_CONFIG.availablePackages.find((p) => p.id === selectedPackageId) ||
    BOOKING_CONFIG.availablePackages[0];

  // Dynamic pricing calculation
  const pricing = calculateBookingPrice({
    packageId: selectedPackageId,
    adults,
    children,
    selectedAddOnIds: selectedAddOns,
    promoCode: appliedPromo || undefined,
  });

  // Handle promo code application
  const handleApplyPromo = () => {
    if (!promoCodeInput.trim()) return;
    const clean = promoCodeInput.trim().toUpperCase();
    const matched = BOOKING_CONFIG.promoCodes.find((p) => p.code === clean && p.isActive);

    if (matched) {
      setAppliedPromo(matched.code);
      setPromoMessage({
        text: isBangla ? `${matched.code} সফলভাবে প্রয়োগ করা হয়েছে!` : `Promo code ${matched.code} applied successfully!`,
        isError: false,
      });
    } else {
      setAppliedPromo(null);
      setPromoMessage({
        text: isBangla ? "প্রদত্ত কোডটি সঠিক নয় অথবা মেয়াদোত্তীর্ণ।" : "Invalid or expired promo code.",
        isError: true,
      });
    }
  };

  // Toggle AddOn
  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) {
      errors.name = isBangla ? "অনুগ্রহ করে আপনার পুরো নাম লিখুন।" : "Please enter your full name.";
    }
    if (!customerPhone.trim()) {
      errors.phone = isBangla ? "একটি বৈধ ফোন নম্বর আবশ্যক।" : "A valid phone number is required.";
    } else if (!/^(\+?88)?01[3-9]\d{8}$/.test(customerPhone.trim().replace(/[-\s]/g, ""))) {
      errors.phone = isBangla
        ? "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমনঃ 017XXXXXXXX)।"
        : "Enter a valid Bangladeshi mobile number (e.g. 017XXXXXXXX).";
    }
    if (!customerEmail.trim()) {
      errors.email = isBangla ? "অনুগ্রহ করে আপনার ইমেইল ঠিকানা দিন।" : "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      errors.email = isBangla ? "সঠিক ইমেইল ফরম্যাট দিন।" : "Enter a valid email address.";
    }
    if (!visitDate) {
      errors.date = isBangla ? "ভ্রমণের তারিখ নির্ধারণ করুন।" : "Please select a visit date.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Booking Submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.createBooking({
        packageId: selectedPackageId,
        visitDate,
        adults,
        children,
        selectedAddOnIds: selectedAddOns,
        promoCode: appliedPromo || undefined,
        customer: {
          fullName: customerName,
          phone: customerPhone,
          email: customerEmail,
          specialRequests: specialNotes || undefined,
        },
        paymentMethod,
      });

      if (!response.success || !response.booking) {
        throw new Error((response as any).message || "Failed to create booking.");
      }

      const bookingRef = response.booking.bookingReference;

      if (paymentMethod === "pay_at_gate") {
        router.push(`/booking/confirmation/${bookingRef}?status=reserved`);
      } else {
        router.push(
          `/booking/sandbox-gateway?ref=${bookingRef}&method=${paymentMethod}&amount=${pricing.finalPayableBDT}`
        );
      }
    } catch (err: any) {
      console.error(err);
      setServerError(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  // WhatsApp Inquiry Link pre-populated with current state
  const waInquiry = buildWhatsAppLink({
    packageTitle: isBangla ? selectedPkg.title.bn : selectedPkg.title.en,
    date: visitDate,
    adults,
    children,
    customerName: customerName || undefined,
    notes: specialNotes || undefined,
    locale: isBangla ? "bn" : "en",
  });

  return (
    <div className="min-h-screen bg-[#F6F5FB] text-[#3B3966] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
          <div className="h-20 w-auto p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center mb-3">
            <img
              src="/images/magic-island-logo.jpg"
              alt="Anowar City Magic Island Official Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <span className="text-[11px] font-black tracking-[0.25em] text-[#006194] uppercase mb-1">
            {isBangla ? "আনোয়ার সিটি" : "ANOWAR CITY"}
          </span>
          <div className="inline-flex items-center gap-2 chip-lilac mb-3">
            <Ticket className="w-3.5 h-3.5" />
            <span className="eyebrow text-xs">{t("booking.title")}</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isBangla ? "টিকেট রিজার্ভেশন ও চেকআউট" : "Online Ticket Checkout"}
          </h1>
          <p className="mt-3 text-[#3B3966] text-sm sm:text-base max-w-2xl mx-auto">
            {t("booking.subtitle")}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B9B2F0]/20 border border-[#B9B2F0]/40 text-[#2E2A7A] text-xs font-semibold">
            <Info className="w-3.5 h-3.5 text-[#2E2A7A]" />
            <span>{isBangla ? "অফিসিয়াল প্রিভিউ রেটস: খসড়া মূল্যতালিকা কাঠামো সক্রিয় আছে" : "Preview rates: Architectural demonstration pricing active"}</span>
          </div>
        </div>

        {/* Global Server Error Alert */}
        {serverError && (
          <div className="mb-8 p-4 rounded-[16px] bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3 max-w-4xl mx-auto">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{isBangla ? "বুকিং প্রসেসিং সমস্যা:" : "Booking Error:"}</p>
              <p className="mt-0.5">{serverError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleBookingSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Form Steps */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Select Package */}
              <div className="card-twilight p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[#B9B2F0]/20 pb-4">
                  <h3 className="text-base font-bold text-[#2E2A7A] flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#2E2A7A] text-[#FFC93C] text-xs flex items-center justify-center font-bold">1</span>
                    <span>{t("booking.step1")}</span>
                  </h3>
                  <PlaceholderBadge size="sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {BOOKING_CONFIG.availablePackages.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`cursor-pointer rounded-[14px] p-4.5 border-2 transition-all ${
                          isSelected
                            ? "bg-white border-[#2E2A7A] shadow-md shadow-[#2E2A7A]/10 scale-[1.01]"
                            : "bg-[#F6F5FB] border-[#B9B2F0]/40 hover:border-[#2E2A7A]/60"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-bold text-[#2E2A7A]">
                            {isBangla ? pkg.title.bn : pkg.title.en}
                          </h4>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#2E2A7A] shrink-0" />
                          )}
                        </div>
                        <p className="text-[12px] text-[#3B3966] mt-1 line-clamp-2">
                          {isBangla ? pkg.subtitle.bn : pkg.subtitle.en}
                        </p>
                        <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-[#B9B2F0]/20">
                          <span className="text-[11px] text-[#3B3966] font-medium">{t("tickets.adult")}:</span>
                          <span className="text-sm font-extrabold text-[#2E2A7A]">
                            ৳{pkg.pricing.adultPriceBDT.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Guest Counts */}
              <div className="card-twilight p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[#B9B2F0]/20 pb-4">
                  <h3 className="text-base font-bold text-[#2E2A7A] flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#2E2A7A] text-[#FFC93C] text-xs flex items-center justify-center font-bold">2</span>
                    <span>{t("booking.step2")}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  {/* Visit Date */}
                  <div className="space-y-1.5 sm:col-span-3">
                    <label className="text-xs font-semibold text-[#2E2A7A] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#2E2A7A]" />
                      <span>{t("booking.selectDate")}</span>
                    </label>
                    <input
                      type="date"
                      min={minDateStr}
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-xs sm:text-sm text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A] focus:ring-1 focus:ring-[#2E2A7A]"
                    />
                    {fieldErrors.date && (
                      <p className="text-[11px] text-rose-600">{fieldErrors.date}</p>
                    )}
                  </div>

                  {/* Adults Counter */}
                  <div className="p-4 rounded-[14px] bg-[#F6F5FB] border border-[#B9B2F0]/40 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#2E2A7A]">{t("booking.adults")}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                        className="w-8 h-8 rounded-[8px] bg-[#2E2A7A] text-[#FFC93C] font-bold hover:bg-[#1C1A4A] transition-colors"
                      >
                        -
                      </button>
                      <span className="text-lg font-black text-[#2E2A7A]">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults((prev) => Math.min(20, prev + 1))}
                        className="w-8 h-8 rounded-[8px] bg-[#2E2A7A] text-[#FFC93C] font-bold hover:bg-[#1C1A4A] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="p-4 rounded-[14px] bg-[#F6F5FB] border border-[#B9B2F0]/40 space-y-2 sm:col-span-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#2E2A7A]">{t("booking.children")}</span>
                      <span className="text-[10px] text-[#2E2A7A] bg-[#B9B2F0]/30 px-2 py-0.5 rounded-full font-bold">
                        {isBangla ? "৩ ফুটের নিচে ফ্রি" : "Under 3ft Free"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                        className="w-8 h-8 rounded-[8px] bg-[#2E2A7A] text-[#FFC93C] font-bold hover:bg-[#1C1A4A] transition-colors"
                      >
                        -
                      </button>
                      <span className="text-lg font-black text-[#2E2A7A]">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren((prev) => Math.min(10, prev + 1))}
                        className="w-8 h-8 rounded-[8px] bg-[#2E2A7A] text-[#FFC93C] font-bold hover:bg-[#1C1A4A] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Add-Ons */}
              <div className="card-twilight p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[#B9B2F0]/20 pb-4">
                  <h3 className="text-base font-bold text-[#2E2A7A] flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#2E2A7A] text-[#FFC93C] text-xs flex items-center justify-center font-bold">3</span>
                    <span>{t("booking.step3")}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {BOOKING_CONFIG.addOns.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`cursor-pointer rounded-[14px] p-4 border-2 transition-all flex items-start gap-3 ${
                          isSelected
                            ? "bg-white border-[#2E2A7A] shadow-sm"
                            : "bg-[#F6F5FB] border-[#B9B2F0]/40 hover:border-[#2E2A7A]/60"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="mt-1 w-4 h-4 rounded text-[#2E2A7A] focus:ring-0 accent-[#2E2A7A] pointer-events-none"
                        />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-[#2E2A7A]">
                            {isBangla ? addon.name.bn : addon.name.en}
                          </h4>
                          <p className="text-[11px] text-[#3B3966] mt-0.5 line-clamp-1">
                            {isBangla ? addon.description.bn : addon.description.en}
                          </p>
                          <span className="text-xs font-bold text-[#2E2A7A] mt-2 block">
                            +৳{addon.priceBDT} {addon.perPerson ? (isBangla ? "/জন" : "/person") : ""}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact Details */}
              <div className="card-twilight p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[#B9B2F0]/20 pb-4">
                  <h3 className="text-base font-bold text-[#2E2A7A] flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#2E2A7A] text-[#FFC93C] text-xs flex items-center justify-center font-bold">4</span>
                    <span>{t("booking.step4")}</span>
                  </h3>
                </div>
                <p className="text-xs text-[#3B3966]">{t("booking.guestDetailsDesc")}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Full Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#2E2A7A]">
                      {t("booking.fullName")} *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t("booking.fullNamePlaceholder")}
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-xs sm:text-sm text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-rose-600">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2E2A7A]">
                      {t("booking.phone")} *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={t("booking.phonePlaceholder")}
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-xs sm:text-sm text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                    />
                    {fieldErrors.phone && (
                      <p className="text-[11px] text-rose-600">{fieldErrors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2E2A7A]">
                      {t("booking.email")} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder={t("booking.emailPlaceholder")}
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-xs sm:text-sm text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-600">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Special Notes */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#2E2A7A]">
                      {t("booking.specialNotes")}
                    </label>
                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder={t("booking.specialNotesPlaceholder")}
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-xs sm:text-sm text-[#1C1A4A] focus:outline-none focus:border-[#2E2A7A]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Dynamic Order Summary & Gateway Checkout */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {/* Summary Card */}
              <div className="card-twilight p-6 sm:p-7 space-y-5 border-2 border-[#2E2A7A]/20 shadow-xl">
                <h3 className="text-base font-bold text-[#2E2A7A] flex items-center justify-between border-b border-[#B9B2F0]/30 pb-3">
                  <span>{t("booking.summaryTitle")}</span>
                  <span className="text-xs font-semibold text-[#2E2A7A] bg-[#B9B2F0]/30 px-2.5 py-1 rounded-full">
                    {visitDate}
                  </span>
                </h3>

                {/* Selected Package Snapshot */}
                <div className="p-3.5 rounded-[14px] bg-[#F6F5FB] border border-[#B9B2F0]/30 space-y-1">
                  <span className="eyebrow text-[10px] text-[#3B3966] block">
                    {t("booking.packageChosen")}:
                  </span>
                  <div className="text-sm font-bold text-[#2E2A7A]">
                    {isBangla ? selectedPkg.title.bn : selectedPkg.title.en}
                  </div>
                  <div className="text-xs text-[#3B3966] font-semibold">
                    {adults} {t("booking.adults")} {children > 0 ? `+ ${children} ${t("booking.children")}` : ""}
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="space-y-2 pt-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder={t("booking.promoPlaceholder")}
                      className="flex-1 px-3 py-2 rounded-[10px] bg-[#F6F5FB] border border-[#B9B2F0]/50 text-xs text-[#1C1A4A] uppercase placeholder-slate-400 focus:outline-none focus:border-[#2E2A7A]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-[10px] bg-[#2E2A7A] hover:bg-[#1C1A4A] text-xs font-bold text-[#FFC93C] transition-colors"
                    >
                      {t("booking.applyPromo")}
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] font-semibold ${promoMessage.isError ? "text-rose-600" : "text-emerald-700"}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Live Breakdown Table */}
                <div className="space-y-2.5 text-xs pt-2 border-t border-[#B9B2F0]/30 text-[#3B3966]">
                  <div className="flex justify-between">
                    <span>{t("booking.adultTickets")} ({pricing.adultCount} × ৳{pricing.packagePriceAdult}):</span>
                    <span className="font-bold text-[#1C1A4A]">৳{pricing.baseAdultTotal.toLocaleString()}</span>
                  </div>

                  {pricing.childCount > 0 && (
                    <div className="flex justify-between">
                      <span>{t("booking.childTickets")} ({pricing.childCount} × ৳{pricing.packagePriceChild}):</span>
                      <span className="font-bold text-[#1C1A4A]">৳{pricing.baseChildTotal.toLocaleString()}</span>
                    </div>
                  )}

                  {pricing.addOnsTotal > 0 && (
                    <div className="flex justify-between">
                      <span>{t("booking.addOnsSubtotal")}:</span>
                      <span className="font-bold text-[#1C1A4A]">+৳{pricing.addOnsTotal.toLocaleString()}</span>
                    </div>
                  )}

                  {pricing.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>{t("booking.discount")} ({pricing.appliedPromoCode}):</span>
                      <span>-৳{pricing.discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#3B3966]/80">
                    <span>{t("booking.vat")}:</span>
                    <span>৳{pricing.vatAmount.toLocaleString()}</span>
                  </div>

                  {/* Final Total */}
                  <div className="pt-3 border-t border-[#B9B2F0]/30 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-[#2E2A7A]">{t("booking.totalPayable")}:</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#2E2A7A]">
                        ৳{pricing.finalPayableBDT.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#3B3966] block">{t("common.placeholderTag")}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Channel Selection */}
                <div className="pt-3 space-y-2.5">
                  <span className="text-xs font-semibold text-[#2E2A7A] block">
                    {t("payment.selectMethod")}:
                  </span>

                  <div className="space-y-2">
                    {PAYMENT_CONFIG.supportedMethods.map((method) => {
                      const isSelected = paymentMethod === method.id;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-start gap-3 p-3 rounded-[12px] border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "bg-white border-[#2E2A7A] shadow-sm text-[#2E2A7A]"
                              : "bg-[#F6F5FB] border-[#B9B2F0]/30 text-[#3B3966] hover:border-[#2E2A7A]/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={isSelected}
                            onChange={() => setPaymentMethod(method.id)}
                            className="mt-0.5 text-[#2E2A7A] focus:ring-0 accent-[#2E2A7A]"
                          />
                          <div className="flex-1">
                            <div className="text-xs font-bold text-[#2E2A7A]">
                              {isBangla ? method.name.bn : method.name.en}
                            </div>
                            <p className="text-[11px] text-[#3B3966] mt-0.5 leading-tight">
                              {isBangla ? method.description.bn : method.description.en}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? t("payment.processing")
                      : paymentMethod === "pay_at_gate"
                      ? isBangla
                        ? "রিজার্ভেশন কনফার্ম করুন"
                        : "Confirm Gate Reservation"
                      : t("payment.confirmAndPay")}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#3B3966]">
                  <ShieldCheck className="w-4 h-4 text-[#2E2A7A]" />
                  <span>{t("payment.secureShield")}</span>
                </div>

                {/* Alternative WhatsApp Direct Inquiry CTA */}
                <div className="pt-4 border-t border-[#B9B2F0]/30 text-center space-y-2">
                  <p className="text-[11px] text-[#3B3966]">
                    {t("booking.whatsappInquiryDesc")}
                  </p>
                  {waInquiry.isConfigured ? (
                    <a
                      href={waInquiry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t("booking.whatsappInquireBtn")}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2.5 px-3 rounded-[10px] border border-[#B9B2F0]/40 text-[#3B3966]/60 text-[11px] font-medium cursor-not-allowed bg-[#F6F5FB]"
                    >
                      {isBangla ? "হোয়াটসঅ্যাপ বুকিং (উদ্বোধনে চালু হবে)" : "WhatsApp Booking (Pending Official Number)"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F5FB] flex items-center justify-center text-[#2E2A7A] font-bold">
          Loading Booking System...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
