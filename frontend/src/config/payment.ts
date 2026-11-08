/**
 * Payment Gateway Configuration & Provider Types
 * 
 * Production Security Rules:
 * - Secret keys and merchant passwords NEVER leave server-side runtime.
 * - Frontend communicates solely through `/api/payment/initiate` and `/api/payment/callback`.
 * - In "production" mode, payments must be verified against gateway session/IPN signatures.
 * - In "sandbox" mode, a clear sandbox simulator or SSLCommerz test store is used.
 */

export type PaymentMethod = "bkash" | "nagad" | "cards" | "sslcommerz" | "pay_at_gate";

export type PaymentStatus = "PENDING" | "INITIATED" | "SUCCESS" | "FAILED" | "CANCELLED";

export interface PaymentGatewayConfig {
  mode: "sandbox" | "production";
  defaultProvider: "sslcommerz" | "bkash" | "mock";
  currency: string;
  currencySymbol: string;
  supportedMethods: {
    id: PaymentMethod;
    name: {
      en: string;
      bn: string;
    };
    description: {
      en: string;
      bn: string;
    };
    icon: string;
    isAvailable: boolean;
    isSandboxOnly?: boolean;
  }[];
  urls: {
    successUrl: string;
    failUrl: string;
    cancelUrl: string;
    ipnUrl: string;
  };
}

export const PAYMENT_CONFIG: PaymentGatewayConfig = {
  mode: (process.env.PAYMENT_GATEWAY_MODE as "sandbox" | "production") || "sandbox",
  defaultProvider: (process.env.PAYMENT_GATEWAY_PROVIDER as "sslcommerz" | "bkash" | "mock") || "mock",
  currency: "BDT",
  currencySymbol: "৳",
  supportedMethods: [
    {
      id: "sslcommerz",
      name: {
        en: "SSLCommerz (Visa, Mastercard, Amex, MFS)",
        bn: "এসএসএলকমার্স (ভিসা, মাস্টারকার্ড, বিকাশ, নগদ)",
      },
      description: {
        en: "Official Bangladesh Central Bank licensed payment aggregator supporting all cards and mobile wallets.",
        bn: "বাংলাদেশ ব্যাংকের অনুমোদিত দেশের সবচেয়ে বড় ডিজিটাল পেমেন্ট গেটওয়ে।",
      },
      icon: "ShieldCheck",
      isAvailable: true,
    },
    {
      id: "bkash",
      name: {
        en: "bKash Direct Gateway",
        bn: "বিকাশ পেমেন্ট গেটওয়ে",
      },
      description: {
        en: "Pay seamlessly with instant OTP & PIN through your bKash mobile wallet.",
        bn: "বিকাশ অ্যাপ বা ওটিপির মাধ্যমে সহজ ও নিরাপদ তাৎক্ষণিক পেমেন্ট।",
      },
      icon: "Smartphone",
      isAvailable: true,
    },
    {
      id: "nagad",
      name: {
        en: "Nagad Digital Payment",
        bn: "নগদ পেমেন্ট",
      },
      description: {
        en: "Instant checkout with postal department's Nagad digital wallet.",
        bn: "ডাক বিভাগের ডিজিটাল ফাইন্যান্সিয়াল সার্ভিস নগদের মাধ্যমে পেমেন্ট।",
      },
      icon: "Zap",
      isAvailable: true,
    },
    {
      id: "pay_at_gate",
      name: {
        en: "Reserve Online & Pay at Ticket Gate",
        bn: "অনলাইনে রিজার্ভেশন ও পার্কে এসে মূল্য পরিশোধ",
      },
      description: {
        en: "Reserve your slot online and finalize payment at Magic Island VIP Entrance Counter.",
        bn: "অনলাইনে টিকেট স্লট বুক করে পার্কের ভিআইপি কাউন্টারে এসে পেমেন্ট পরিশোধের সুবিধা।",
      },
      icon: "Ticket",
      isAvailable: true,
    },
  ],
  urls: {
    successUrl: "/booking/confirmation",
    failUrl: "/booking/payment-status?status=failed",
    cancelUrl: "/booking/payment-status?status=cancelled",
    ipnUrl: "/api/payment/callback",
  },
};

