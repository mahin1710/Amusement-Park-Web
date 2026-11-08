"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, XCircle, ArrowLeft, RefreshCw, Lock } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { api } from "@/services/api";

function SandboxGatewayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isBangla } = useTranslation();

  const ref = searchParams.get("ref") || "DEMO-REF";
  const method = searchParams.get("method") || "sslcommerz";
  const amount = searchParams.get("amount") || "0";

  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSimulateStatus = async (status: "SUCCESS" | "FAILED" | "CANCELLED") => {
    setLoadingAction(status);
    setErrorMsg(null);

    try {
      const data = await api.handlePaymentCallback({
        booking_reference: ref,
        status,
        transaction_id: status === "SUCCESS" ? `TXN_SANDBOX_${Date.now()}` : undefined,
      });

      if (!data.success) {
        throw new Error("Failed to process payment callback");
      }

      if (status === "SUCCESS") {
        router.push(`/booking/confirmation/${ref}?status=success`);
      } else if (status === "FAILED") {
        router.push(`/booking/lookup?error=payment_failed&ref=${ref}`);
      } else {
        router.push(`/booking?package=pkg_super_all_access&cancelled=1`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Callback error");
      setLoadingAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5FB] text-[#3B3966] flex items-center justify-center p-4">
      <div className="max-w-lg w-full card-twilight border-2 border-[#2E2A7A]/20 p-6 sm:p-8 space-y-6">
        {/* Sandbox Notice Banner */}
        <div className="p-4 rounded-[14px] bg-[#B9B2F0]/20 border border-[#B9B2F0]/40 text-[#2E2A7A] text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#2E2A7A] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold uppercase tracking-wider block text-[#2E2A7A]">
              {isBangla ? "স্যান্ডবক্স গেটওয়ে সিমুলেটর" : "Sandbox Gateway Simulator"}
            </span>
            <p className="mt-1 text-[11px] text-[#3B3966] leading-relaxed">
              {isBangla
                ? "এটি একটি নিরাপদ টেস্ট সিমুলেটর। এখানে সার্ভার-সাইড পেমেন্ট ভেরিফিকেশন ফ্লো পরীক্ষা করা যায়। কোনো ব্যাংক অ্যাকাউন্ট বা কার্ড থেকে টাকা কাটা হবে না।"
                : "This environment demonstrates the verified server-side payment lifecycle without charging live financial cards. Test any transaction outcome below."}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="rounded-[14px] bg-[#F6F5FB] border border-[#B9B2F0]/30 p-4 space-y-2 text-xs">
          <div className="flex justify-between text-[#3B3966]">
            <span>{isBangla ? "বুকিং রেফারেন্স:" : "Booking Reference:"}</span>
            <span className="font-mono font-bold text-[#2E2A7A] text-sm">{ref}</span>
          </div>
          <div className="flex justify-between text-[#3B3966]">
            <span>{isBangla ? "নির্বাচিত পেমেন্ট চ্যানেল:" : "Payment Channel:"}</span>
            <span className="font-bold text-[#2E2A7A] uppercase">{method}</span>
          </div>
          <div className="flex justify-between text-[#3B3966] pt-1 border-t border-[#B9B2F0]/30">
            <span>{isBangla ? "প্রদেয় মোট অংক:" : "Total Payable:"}</span>
            <span className="font-bold text-[#2E2A7A] text-base">৳{Number(amount).toLocaleString()}</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-[10px] bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Simulation Actions */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#3B3966] block text-center">
            {isBangla ? "লেনদেনের ফলাফল সিমুলেট করুন:" : "Simulate Gateway Outcome:"}
          </span>

          <button
            onClick={() => handleSimulateStatus("SUCCESS")}
            disabled={loadingAction !== null}
            className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            {loadingAction === "SUCCESS" ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span>{isBangla ? "পেমেন্ট সফল সিমুলেট করুন (Success)" : "Simulate Successful Payment"}</span>
          </button>

          <button
            onClick={() => handleSimulateStatus("FAILED")}
            disabled={loadingAction !== null}
            className="btn-secondary w-full py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            {loadingAction === "FAILED" ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            <span>{isBangla ? "পেমেন্ট ব্যর্থ সিমুলেট করুন (Fail)" : "Simulate Failed Payment"}</span>
          </button>

          <button
            onClick={() => handleSimulateStatus("CANCELLED")}
            disabled={loadingAction !== null}
            className="w-full py-2.5 rounded-[10px] text-xs font-semibold text-[#3B3966] hover:bg-slate-200/60 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBangla ? "বাতিল করে ফিরে যান (Cancel)" : "Cancel & Return to Booking"}</span>
          </button>
        </div>

        <div className="text-center pt-2 border-t border-[#B9B2F0]/30 text-[11px] text-[#3B3966]/70 flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#2E2A7A]" />
          <span>SSLCommerz, bKash & Nagad verified webhook emulator</span>
        </div>
      </div>
    </div>
  );
}

export default function SandboxGatewayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F5FB] flex items-center justify-center text-[#2E2A7A] font-bold">
          Loading Gateway Emulator...
        </div>
      }
    >
      <SandboxGatewayContent />
    </Suspense>
  );
}
