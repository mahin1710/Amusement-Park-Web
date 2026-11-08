/**
 * Centralized Ticket, Package and Pricing Configuration
 * 
 * IMPORTANT:
 * - Real commercial pricing and promotional discount rates are subject to final
 *   corporate board verification before commercial opening.
 * - All monetary values below are explicitly labeled as preview/placeholder structures
 *   to establish full booking pipeline functionality without inventing business facts.
 * - Park management can update rates, add-ons, or availability in this single file.
 */

export type ZoneType = "water-park" | "dino-zone" | "amusement-park";

export interface TicketPackage {
  id: string;
  slug: string;
  title: {
    en: string;
    bn: string;
  };
  subtitle: {
    en: string;
    bn: string;
  };
  description: {
    en: string;
    bn: string;
  };
  badge?: {
    en: string;
    bn: string;
  };
  isPopular?: boolean;
  includedZones: ZoneType[];
  pricing: {
    isPlaceholder: boolean;
    adultPriceBDT: number;
    childPriceBDT: number;
    currencySymbol: string;
    note: {
      en: string;
      bn: string;
    };
  };
  perks: {
    en: string[];
    bn: string[];
  };
  validity: {
    en: string;
    bn: string;
  };
  availabilityStatus: "AVAILABLE" | "LIMITED" | "PRE_REGISTRATION";
  minGuests: number;
  maxGuests: number;
}

export interface TicketAddOn {
  id: string;
  name: {
    en: string;
    bn: string;
  };
  description: {
    en: string;
    bn: string;
  };
  priceBDT: number;
  isPlaceholder: boolean;
  perPerson: boolean;
  category: "facility" | "food" | "vip" | "activity";
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  maxDiscountBDT: number;
  description: {
    en: string;
    bn: string;
  };
  validUntil: string;
  isActive: boolean;
}

export const BOOKING_CONFIG = {
  currency: "BDT",
  currencySymbol: "৳",
  vatPercentage: 5, // 5% entertainment VAT
  pricingDisclaimer: {
    en: "Preview Pricing Notice: Rates shown are preliminary architectural placeholders. Final verified tariff cards and early-bird rates will be formally published prior to commercial park inauguration.",
    bn: "মূল্য সংক্রান্ত বিজ্ঞপ্তি: প্রদর্শিত টিকেটের মূল্য ডেমো/খসড়া কাঠামোভিত্তিক। পার্ক উদ্বোধনের পূর্বে চূড়ান্ত অফিসিয়াল মূল্যতালিকা ও আর্লি-বার্ড অফার যথানিয়মে প্রকাশ করা হবে।",
  },
  childAgeCriteria: {
    en: "Children below 3 feet height / under 3 years enjoy complimentary entry when accompanied by a ticketed adult.",
    bn: "৩ ফুটের কম উচ্চতা অথবা ৩ বছরের কম বয়সী শিশুরা অভিভাবকের সাথে বিনামূল্যে প্রবেশ করতে পারবে।",
  },
  availablePackages: [
    {
      id: "pkg_super_all_access",
      slug: "super-all-access",
      title: {
        en: "Super All-Access Kingdom Pass",
        bn: "সুপার অল-অ্যাক্সেস কিংডম পাস",
      },
      subtitle: {
        en: "Unlimited Thrills Across All 3 Epic Zones",
        bn: "এক টিকেটে তিনটি জাদুকরী জোনের সম্পূর্ণ প্রবেশাধিকার",
      },
      description: {
        en: "Our flagship ultimate passport providing full-day unlimited access to Water Park, Dino Zone, and Amusement Park rides.",
        bn: "ওয়াটার পার্ক, ডাইনো জোন এবং অ্যামিউজমেন্ট পার্কের সকল সাধারণ রাইড সারাদিন সীমাহীন উপভোগ করার প্রিমিয়াম অল-ইন-ওয়ান পাস।",
      },
      badge: {
        en: "Best Value • Ultimate Fun",
        bn: "সেরা পছন্দ • সর্বাপেক্ষা জনপ্রিয়",
      },
      isPopular: true,
      includedZones: ["water-park", "dino-zone", "amusement-park"],
      pricing: {
        isPlaceholder: true,
        adultPriceBDT: 1850,
        childPriceBDT: 1250,
        currencySymbol: "৳",
        note: {
          en: "[Placeholder Tariff - Subject to Final Approval]",
          bn: "[খসড়া মূল্যতালিকা - চূড়ান্ত ঘোষণার সাপেক্ষ]",
        },
      },
      perks: {
        en: [
          "Full-day unlimited access to all Water Park slides & Wave Pool",
          "Complete Jurassic Dino Zone trail & animatronic exhibits",
          "Unlimited turns on classic Amusement Park thrill rides",
          "Complimentary secure changing room & locker pass access voucher",
          "Free entry to evening laser light show & musical fountain",
        ],
        bn: [
          "ওয়াটার পার্কের সব স্লাইড ও বিশাল ওয়েভ পুলে সারাদিন সীমাহীন আনন্দ",
          "জুরাসিক ডাইনো জোনের জীবন্ত গর্জনরত ডাইনোসরদের রোমাঞ্চকর ট্রেইল",
          "অ্যামিউজমেন্ট পার্কের থ্রিল রোলারকোস্টার ও রাইড আনলিমিটেড উপভোগ",
          "লকার এবং চেঞ্জিং রুমের বিশেষ অগ্রাধিকার ভাউচার",
          "সান্ধ্যকালীন চোখ ধাঁধানো লেজার ও মিউজিক্যাল ফাউন্টেন শো",
        ],
      },
      validity: {
        en: "Valid for one single full-day entry during operating hours",
        bn: "পার্কের নির্ধারিত কার্যসময়ে পুরো একদিনের জন্য কার্যকর",
      },
      availabilityStatus: "AVAILABLE",
      minGuests: 1,
      maxGuests: 20,
    },
    {
      id: "pkg_water_park_splash",
      slug: "water-park-splash",
      title: {
        en: "Aqua Oasis Water Park Pass",
        bn: "অ্যাকোয়া ওয়েসিস ওয়াটার পার্ক পাস",
      },
      subtitle: {
        en: "The Ultimate Tropical Water Paradise",
        bn: "গ্রীষ্মের দাবদাহে উত্তাল জলকেলির স্বর্গরাজ্য",
      },
      description: {
        en: "Dedicated full-day access to massive wave pool, high-speed multi-lane slides, lazy river tube cruise, and pirate splash fortress.",
        bn: "বিশাল সুনামি ওয়েভ পুল, হাই-স্পিড স্প্ল্যাশ স্লাইড, লেজি রিভার টিউব ক্রুজ এবং শিশুদের পাইরেট ওয়াটার ক্যাসেলের বিশেষ পাস।",
      },
      badge: {
        en: "Water Lovers Choice",
        bn: "ওয়াটার লাভার্স স্পেশাল",
      },
      isPopular: false,
      includedZones: ["water-park"],
      pricing: {
        isPlaceholder: true,
        adultPriceBDT: 1200,
        childPriceBDT: 850,
        currencySymbol: "৳",
        note: {
          en: "[Placeholder Tariff - Subject to Final Approval]",
          bn: "[খসড়া মূল্যতালিকা - চূড়ান্ত ঘোষণার সাপেক্ষ]",
        },
      },
      perks: {
        en: [
          "Full access to 12+ signature water slides & drop flumes",
          "Ocean-scale artificial wave pool sessions every 45 minutes",
          "Gentle 400m Lazy River tropical tube safari",
          "Kids Pirate Splash lagoon with interactive water cannons",
          "Complimentary shower & changing amenities",
        ],
        bn: [
          "১২+ সিগনেচার ওয়াটার স্লাইড এবং এক্সট্রিম ড্রপ স্লিপ",
          "প্রতি ৪৫ মিনিট অন্তর সমুদ্রের মতো কৃত্রিম ঢেউয়ের পুল সেশন",
          "৪০০ মিটার শান্ত লেজি রিভার ট্রপিক্যাল ফ্লোট সাফারি",
          "শিশুদের বিশেষ ইন্টারঅ্যাক্টিভ ওয়াটার কামান ও স্প্ল্যাশ লাগুন",
          "শাওয়ার ও ফ্রেশ হওয়ার সুব্যবস্থা",
        ],
      },
      validity: {
        en: "Valid for single full-day entry to Water Park zone",
        bn: "শুধুমাত্র ওয়াটার পার্ক জোনের জন্য একদিন কার্যকর",
      },
      availabilityStatus: "AVAILABLE",
      minGuests: 1,
      maxGuests: 20,
    },
    {
      id: "pkg_dino_amusement_combo",
      slug: "dino-amusement-combo",
      title: {
        en: "Jurassic Thrills & Rides Pass",
        bn: "জুরাসিক থ্রিলস ও রাইডস কম্বো",
      },
      subtitle: {
        en: "Dino Zone + Amusement Park Land Adventure",
        bn: "ডাইনোসর ও আধুনিক রোলারকোস্টারের যুগল রোমাঞ্চ",
      },
      description: {
        en: "Perfect for guests seeking pure land-based excitement: explore roaring prehistoric beasts and thrill-filled dry rides.",
        bn: "যারা শুষ্ক জমিনের আনন্দ ও রোমাঞ্চ চান: বিশালাকার প্রাগৈতিহাসিক ডাইনোসর ও আধুনিক মেগা রাইডসের দারুণ কম্বো।",
      },
      badge: {
        en: "Dry Land Adventure",
        bn: "ল্যান্ড অ্যাডভেঞ্চার",
      },
      isPopular: false,
      includedZones: ["dino-zone", "amusement-park"],
      pricing: {
        isPlaceholder: true,
        adultPriceBDT: 1350,
        childPriceBDT: 950,
        currencySymbol: "৳",
        note: {
          en: "[Placeholder Tariff - Subject to Final Approval]",
          bn: "[খসড়া মূল্যতালিকা - চূড়ান্ত ঘোষণার সাপেক্ষ]",
        },
      },
      perks: {
        en: [
          "Full entry to prehistoric animatronic Jurassic Dino Trail",
          "Unlimited rides on Galaxy Cyclone Coaster & Sky Ferris Wheel",
          "Dino Fossil Excavation sand lab experience for children",
          "Bumper cars, carousel & carnival family rides",
          "4D Prehistoric Encounter motion cinema entry ticket",
        ],
        bn: [
          "প্রাগৈতিহাসিক অ্যানিমেট্রনিক জুরাসিক ডাইনো ট্রেইলে প্রবেশ",
          "গ্যালাক্সি সাইক্লোন কোস্টার ও সুবিশাল স্কাই হুইল সীমাহীন চড়া",
          "শিশুদের জন্য ডাইনো ফসিল খনন ল্যাব ও বিশেষ অ্যাক্টিভিটি",
          "বাম্পার কার, ক্যারোজেল এবং পারিবারিক আনন্দদায়ক রাইডসমূহ",
          "৪-ডি প্রাগৈতিহাসিক মোশন সিনেমা হলের বিশেষ টিকেট",
        ],
      },
      validity: {
        en: "Valid for single full-day entry to Dino Zone and Amusement Park",
        bn: "ডাইনো জোন ও অ্যামিউজমেন্ট পার্ক জোনের জন্য সারাদিন কার্যকর",
      },
      availabilityStatus: "AVAILABLE",
      minGuests: 1,
      maxGuests: 20,
    },
    {
      id: "pkg_vip_express",
      slug: "vip-express",
      title: {
        en: "VIP Royal Fast-Track Pass",
        bn: "ভিআইপি রয়েল ফাস্ট-ট্র্যাক পাস",
      },
      subtitle: {
        en: "Zero Queues • Priority Access • VIP Lounge",
        bn: "লাইনবিহীন এক্সপ্রেস প্রবেশ • ভিআইপি লাউঞ্জ সুবিধা",
      },
      description: {
        en: "The ultimate luxury amusement park experience. Skip the queues with dedicated fast-track lane entry across all major rides.",
        bn: "সেরা আভিজাত্যময় অভিজ্ঞতা — কোনো লাইনে দাঁড়ানো ছাড়াই দ্রুত রাইডে ওঠা, এয়ার-কন্ডিশন্ড ভিআইপি লাউঞ্জ ও প্রিমিয়াম হসপিটালিটি।",
      },
      badge: {
        en: "VIP Exclusive • Zero Queue",
        bn: "ভিআইপি প্রিমিয়াম • নো-ওয়েটিং",
      },
      isPopular: false,
      includedZones: ["water-park", "dino-zone", "amusement-park"],
      pricing: {
        isPlaceholder: true,
        adultPriceBDT: 3200,
        childPriceBDT: 2400,
        currencySymbol: "৳",
        note: {
          en: "[Placeholder Tariff - Subject to Final Approval]",
          bn: "[খসড়া মূল্যতালিকা - চূড়ান্ত ঘোষণার সাপেক্ষ]",
        },
      },
      perks: {
        en: [
          "Unlimited Fast-Track lane access on all rides (Zero waiting)",
          "Access to air-conditioned Royal VIP Lounge with refreshments",
          "Dedicated personal park host/concierge assistance",
          "Reserved premium seating for all stunt shows & spectacles",
          "Complimentary secure private cabana locker and beach towel kit",
        ],
        bn: [
          "সব রাইডে আনলিমিটেড ফাস্ট-ট্র্যাক এক্সপ্রেস লেইন (লাইনের ঝামেলাহীন)",
          "শীতাতপ নিয়ন্ত্রিত রয়েল ভিআইপি লাউঞ্জে প্রবেশ ও ফ্রি স্ন্যাকস",
          "ব্যক্তিগত গাইড ও কনসিয়ার্জ সহায়তা",
          "স্টান্ট শো ও স্টেজ পারফরম্যান্সে সংরক্ষিত ফ্রন্ট-রো আসন",
          "প্রিমিয়াম প্রাইভেট ক্যাবানা, লকার ও টাওয়েল কমপ্লিমেন্টারি কিট",
        ],
      },
      validity: {
        en: "Valid for single full-day VIP all-zone entry",
        bn: "সারাদিনের সকল জোনের ভিআইপি ফাস্ট-ট্র্যাক প্রবেশাধিকার",
      },
      availabilityStatus: "LIMITED",
      minGuests: 1,
      maxGuests: 10,
    },
  ] as TicketPackage[],

  addOns: [
    {
      id: "addon_locker",
      name: {
        en: "Digital Smart Locker (Full Day)",
        bn: "ডিজিটাল স্মার্ট লকার (সারাদিন)",
      },
      description: {
        en: "RFID wristband accessible secure waterproof locker in Water Park area.",
        bn: "আরএফআইডি রিস্টব্যান্ড চালিত সুরক্ষিত ওয়াটারপ্রুফ ব্যক্তিগত লকার।",
      },
      priceBDT: 150,
      isPlaceholder: true,
      perPerson: false,
      category: "facility",
    },
    {
      id: "addon_buffet_lunch",
      name: {
        en: "Island Oasis Grand Lunch Buffet",
        bn: "আইল্যান্ড ওয়েসিস গ্র্যান্ড লাঞ্চ বুফে",
      },
      description: {
        en: "Unlimited 45+ item chef's special buffet with soft beverages at Lagoon Restaurant.",
        bn: "লাগুন রেস্তোরাঁয় ৪৫+ পদের মনমাতানো সুস্বাদু শেফস বুফে লাঞ্চ ও বেভারেজ।",
      },
      priceBDT: 650,
      isPlaceholder: true,
      perPerson: true,
      category: "food",
    },
    {
      id: "addon_dino_safari_photo",
      name: {
        en: "Prehistoric Dino Encounter Photo Pass",
        bn: "জুরাসিক ডাইনো ফ্যামিলি ফটো সেশন",
      },
      description: {
        en: "Professional high-definition photo print + instant digital download with T-Rex.",
        bn: "টি-রেক্সের সাথে প্রফেশনাল এইচডি প্রিন্ট ছবি ও ইনস্ট্যান্ট ডিজিটাল ডাউনলোড কপি।",
      },
      priceBDT: 250,
      isPlaceholder: true,
      perPerson: false,
      category: "activity",
    },
    {
      id: "addon_tube_rental",
      name: {
        en: "Twin Rider Wave Pool Float Tube",
        bn: "টুইন ওয়েভ পুল ফ্লোট টিউব",
      },
      description: {
        en: "Dual-handle durable floatation ring for supreme comfort in the giant wave pool.",
        bn: "বিশাল ওয়েভ পুলে ভেসে থাকার প্রিমিয়াম আরামদায়ক ডাবল ফ্লোট টিউব।",
      },
      priceBDT: 100,
      isPlaceholder: true,
      perPerson: false,
      category: "facility",
    },
  ] as TicketAddOn[],

  promoCodes: [
    {
      code: "MAGICOPEN",
      discountPercentage: 10,
      maxDiscountBDT: 500,
      description: {
        en: "Special 10% Welcome Preview Discount",
        bn: "বিশেষ ১০% প্রিভিউ স্বাগতম ছাড়",
      },
      validUntil: "2026-12-31",
      isActive: true,
    },
    {
      code: "FAMILYFUN",
      discountPercentage: 15,
      maxDiscountBDT: 1000,
      description: {
        en: "15% Family & Group Celebrations Discount (Min 4 guests)",
        bn: "১৫% ফ্যামিলি ও গ্রুপ সেলিব্রেশন ছাড় (ন্যূনতম ৪ জন)",
      },
      validUntil: "2026-12-31",
      isActive: true,
    },
  ] as PromoCode[],
};

export interface PricingCalculationResult {
  adultCount: number;
  childCount: number;
  packagePriceAdult: number;
  packagePriceChild: number;
  baseAdultTotal: number;
  baseChildTotal: number;
  packageSubtotal: number;
  addOnsTotal: number;
  grossTotal: number;
  discountAmount: number;
  appliedPromoCode: string | null;
  vatAmount: number;
  finalPayableBDT: number;
  isPlaceholder: boolean;
}

/**
 * Robust pricing calculator separating business rules from UI
 */
export function calculateBookingPrice(params: {
  packageId: string;
  adults: number;
  children: number;
  selectedAddOnIds: string[];
  promoCode?: string;
}): PricingCalculationResult {
  const { packageId, adults, children, selectedAddOnIds, promoCode } = params;

  const pkg = BOOKING_CONFIG.availablePackages.find((p) => p.id === packageId) || BOOKING_CONFIG.availablePackages[0];

  const safeAdults = Math.max(1, adults || 1);
  const safeChildren = Math.max(0, children || 0);

  const baseAdultTotal = safeAdults * pkg.pricing.adultPriceBDT;
  const baseChildTotal = safeChildren * pkg.pricing.childPriceBDT;
  const packageSubtotal = baseAdultTotal + baseChildTotal;

  // Calculate Add-ons
  let addOnsTotal = 0;
  for (const addonId of selectedAddOnIds) {
    const addon = BOOKING_CONFIG.addOns.find((a) => a.id === addonId);
    if (addon) {
      if (addon.perPerson) {
        addOnsTotal += addon.priceBDT * (safeAdults + safeChildren);
      } else {
        addOnsTotal += addon.priceBDT;
      }
    }
  }

  const grossTotal = packageSubtotal + addOnsTotal;

  // Promo Code Validation
  let discountAmount = 0;
  let appliedPromoCode: string | null = null;
  if (promoCode) {
    const cleanCode = promoCode.trim().toUpperCase();
    const matched = BOOKING_CONFIG.promoCodes.find((p) => p.code === cleanCode && p.isActive);
    if (matched) {
      appliedPromoCode = matched.code;
      const rawDiscount = (grossTotal * matched.discountPercentage) / 100;
      discountAmount = Math.min(rawDiscount, matched.maxDiscountBDT);
    }
  }

  const netAfterDiscount = Math.max(0, grossTotal - discountAmount);
  const vatAmount = Math.round((netAfterDiscount * BOOKING_CONFIG.vatPercentage) / 100);
  const finalPayableBDT = netAfterDiscount + vatAmount;

  return {
    adultCount: safeAdults,
    childCount: safeChildren,
    packagePriceAdult: pkg.pricing.adultPriceBDT,
    packagePriceChild: pkg.pricing.childPriceBDT,
    baseAdultTotal,
    baseChildTotal,
    packageSubtotal,
    addOnsTotal,
    grossTotal,
    discountAmount,
    appliedPromoCode,
    vatAmount,
    finalPayableBDT,
    isPlaceholder: true,
  };
}

