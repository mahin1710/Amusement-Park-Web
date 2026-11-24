/**
 * Centralized Magic Island Ride Experience & Estimated Ticket Price Configuration
 * 
 * IMPORTANT:
 * - All ride ticket prices listed here are approximate indicative estimates for visitor 
 *   planning and adventure budgeting.
 * - They are NOT officially confirmed ticket prices and can easily be updated here at any time.
 * - No fictional rides or outside attractions are included; all data reflects genuine Magic Island assets.
 */

export type RideCategory = "all" | "water-park" | "thrill-world" | "dino-zone";

export interface RideExperienceItem {
  id: string;
  name: {
    en: string;
    bn: string;
  };
  category: "water-park" | "thrill-world" | "dino-zone";
  categoryLabel: {
    en: string;
    bn: string;
  };
  tagline: {
    en: string;
    bn: string;
  };
  shortDescription: {
    en: string;
    bn: string;
  };
  estimatedPriceBDT: number;
  imageUrl: string;
  thrillLevel: {
    en: string;
    bn: string;
  };
  isSignature?: boolean;
}

export const RIDE_CATEGORIES: { id: RideCategory; labelEn: string; labelBn: string; color: string }[] = [
  { id: "all", labelEn: "All Attractions", labelBn: "সকল আকর্ষণ", color: "from-[#FF914D] to-[#E87E3A]" },
  { id: "water-park", labelEn: "Water World", labelBn: "ওয়াটার ওয়ার্ল্ড", color: "from-[#35C6C8] to-[#087E8B]" },
  { id: "thrill-world", labelEn: "Thrill World", labelBn: "থ্রিল ওয়ার্ল্ড", color: "from-[#845EC2] to-[#D65DB1]" },
  { id: "dino-zone", labelEn: "Dino World", labelBn: "ডাইনো ওয়ার্ল্ড", color: "from-[#00C9A7] to-[#173B42]" },
];

export const RIDE_EXPERIENCE_ITEMS: RideExperienceItem[] = [
  // WATER WORLD (1 Selected Attraction)
  {
    id: "aqua-speed-racing-flumes",
    name: {
      en: "Multi-Lane Speed Racing Slides",
      bn: "মাল্টি-লেন স্পিড রেসিং স্লাইডার",
    },
    category: "water-park",
    categoryLabel: {
      en: "Water World",
      bn: "ওয়াটার ওয়ার্ল্ড",
    },
    tagline: {
      en: "High-Velocity Side-by-Side Drops",
      bn: "বন্ধুদের সাথে তীব্র গতির ওয়াটার রেসিং",
    },
    shortDescription: {
      en: "Plunge side-by-side with friends through sudden steep elevation dips ending in high-speed splashdown pools.",
      bn: "পাশাপাশি বহু লেনের স্পিড স্লাইডারে দ্রুত গতিতে নামার প্রতিযোগিতা আর শীতল পানির স্রোতে চোখ ধাঁধানো স্প্ল্যাশ।",
    },
    estimatedPriceBDT: 150,
    imageUrl: "/images/Water%20World/Water-5.webp",
    thrillLevel: {
      en: "Extreme",
      bn: "চরম রোমাঞ্চকর",
    },
  },

  // THRILL WORLD (4 Selected Attractions)
  {
    id: "grand-skylight-ferris-wheel",
    name: {
      en: "Grand Panoramic Sky Wheel",
      bn: "গ্র্যান্ড প্যানোরামিক স্কাই হুইল",
    },
    category: "thrill-world",
    categoryLabel: {
      en: "Thrill World",
      bn: "থ্রিল ওয়ার্ল্ড",
    },
    tagline: {
      en: "150ft Giant VIP Air-Conditioned Gondolas",
      bn: "১৫০ ফুট উঁচু এয়ার-কন্ডিশন্ড ভিআইপি স্কাই হুইল",
    },
    shortDescription: {
      en: "36 luxury glass capsules offering 360-degree breathtaking vistas across all theme zones and scenic sunset horizons.",
      bn: "১৫০ ফুট উঁচু থেকে শীতাতপ নিয়ন্ত্রিত গ্লাস কেবিনে বসে পুরো পার্কের ৩টি জোন ও প্রকৃতির অপরূপ সূর্যাস্তের প্যানোরামিক ভিউ।",
    },
    estimatedPriceBDT: 150,
    imageUrl: "/images/Thrill%20World/Thrill-2.webp",
    thrillLevel: {
      en: "Mild",
      bn: "সহজ ও মনোরম",
    },
    isSignature: true,
  },
  {
    id: "turbo-bumper-grand-prix",
    name: {
      en: "Turbo Bumper Grand Prix",
      bn: "টার্বো বাম্পার গ্র্যান্ড প্রিক্স",
    },
    category: "thrill-world",
    categoryLabel: {
      en: "Thrill World",
      bn: "থ্রিল ওয়ার্ল্ড",
    },
    tagline: {
      en: "Electrified Dodging Arena & Neon Tracks",
      bn: "নিওন লাইটিং ও মিউজিকসহ ইলেকট্রিক ডজিং কার",
    },
    shortDescription: {
      en: "Dual-steering electric karts on a mirror-smooth neon arena floor with shock-absorbent rubber bumpers.",
      bn: "বন্ধুবান্ধব ও পরিবারের সাথে ডজিং কারে ধাক্কাধাক্কির অনাবিল আনন্দ ও হাসিখুশির ইলেকট্রিক কার লড়াই।",
    },
    estimatedPriceBDT: 120,
    imageUrl: "/images/Thrill%20World/Thrill-3.webp",
    thrillLevel: {
      en: "Moderate",
      bn: "মাঝারি",
    },
  },
  {
    id: "flying-chair-swings",
    name: {
      en: "Sky High Flying Swings (Fly Dolna)",
      bn: "উড়ন্ত চেয়ার দোলনা (ফ্লাই দোলনা)",
    },
    category: "thrill-world",
    categoryLabel: {
      en: "Thrill World",
      bn: "থ্রিল ওয়ার্ল্ড",
    },
    tagline: {
      en: "Soaring High-Altitude Tilting Swings",
      bn: "বাতাসে মুক্ত ডানায় ভেসে বেড়ানোর ফ্লাইং দোলনা",
    },
    shortDescription: {
      en: "Suspended double-seats lift high into the open sky, tilting at dynamic angles with breezes and skyline views.",
      bn: "বাতাসে মুক্ত ডানায় ভেসে বেড়ানোর আনন্দদায়ক ফ্লাইং সুইং রাইড, যা আপনাকে নিয়ে যাবে শূন্যের উচ্চতায়।",
    },
    estimatedPriceBDT: 100,
    imageUrl: "/images/Thrill%20World/Thrill-4.webp",
    thrillLevel: {
      en: "Moderate",
      bn: "মাঝারি",
    },
  },
  {
    id: "pirate-ship-voyager",
    name: {
      en: "Pirate Ocean Voyager Pendulum",
      bn: "পাইরেট ওশান ভয়েজার পেন্ডুলাম",
    },
    category: "thrill-world",
    categoryLabel: {
      en: "Thrill World",
      bn: "থ্রিল ওয়ার্ল্ড",
    },
    tagline: {
      en: "75-Degree Swinging Weightless Galleon",
      bn: "বাতাসে ৭৫ ডিগ্রি কোণে তীব্র গতিতে দোলা পাইরেট জাহাজ",
    },
    shortDescription: {
      en: "Colossal wooden-styled galleon swinging in massive arcs up to 75 degrees, creating zero-G sensations at each peak.",
      bn: "বিশাল আকৃতির পাইরেট জাহাজে চড়ে বাতাসে তীব্র গতিতে দোলা এবং প্রতিটি শীর্ষে শূন্য মাধ্যাকর্ষণের চমকপ্রদ অনুভূতি।",
    },
    estimatedPriceBDT: 120,
    imageUrl: "/images/Thrill%20World/Thrill-5.png",
    thrillLevel: {
      en: "Extreme",
      bn: "চরম রোমাঞ্চকর",
    },
  },
];

/**
 * Calculates total price of selected rides
 */
export function calculateRidesTotal(selectedIds: string[]): number {
  return selectedIds.reduce((total, id) => {
    const item = RIDE_EXPERIENCE_ITEMS.find((r) => r.id === id);
    return total + (item ? item.estimatedPriceBDT : 0);
  }, 0);
}

/**
 * Formats price in BDT standard display
 */
export function formatRidePrice(amount: number): string {
  return `${amount}/= TK`;
}
