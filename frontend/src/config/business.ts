/**
 * Centralized Editable Business Configuration
 * 
 * IMPORTANT:
 * - As per confirmed business requirements, the exact park location and official contact numbers
 *   are currently pending final administrative confirmation.
 * - Do NOT hardcode invented addresses, coordinates, or phone numbers.
 * - To update the park location or phone numbers in the future, simply update the values below
 *   or provide corresponding environment variables. Every component across the entire app
 *   consumes this single source of truth.
 */

export interface ParkHours {
  regular: {
    en: string;
    bn: string;
  };
  weekend: {
    en: string;
    bn: string;
  };
  holidays: {
    en: string;
    bn: string;
  };
  isConfirmed: boolean;
}

export interface BusinessConfig {
  hotlines: {
    primary: string;
    secondary: string;
    whatsapp: string;
  };
  email: string;
  name: {
    en: string;
    bn: string;
  };
  legalEntity: {
    en: string;
    bn: string;
  };
  tagline: {
    en: string;
    bn: string;
  };
  location: {
    address?: string;
    isConfirmed: boolean;
    areaName: {
      en: string;
      bn: string;
    };
    fullAddress: {
      en: string;
      bn: string;
    };
    coordinates: {
      latitude: number | null;
      longitude: number | null;
      label: string;
    };
    googleMapsEmbedUrl: string | null;
    landmarksHint: {
      en: string;
      bn: string;
    };
  };
  operatingHours: ParkHours;
  contact: {
    phone: {
      display: string;
      callable: string;
      isConfirmed: boolean;
    };
    hotline: {
      display: string;
      callable: string;
      isConfirmed: boolean;
    };
    whatsapp: {
      rawNumber: string; // e.g. "8801700000000" or placeholder "8801XXXXXXXXX"
      display: string;
      isConfirmed: boolean;
    };
    email: {
      general: string;
      corporate: string;
      isConfirmed: boolean;
    };
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
}

const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801XXXXXXXXX";
const isWhatsappPlaceholder = !rawWhatsapp || rawWhatsapp.includes("X") || rawWhatsapp === "8801XXXXXXXXX";

const rawAddressEn = process.env.NEXT_PUBLIC_PARK_ADDRESS || "[Park Physical Address - Currently Under Development / Official Location Announcement Pending]";
const isLocationSet = Boolean(process.env.NEXT_PUBLIC_PARK_ADDRESS && !process.env.NEXT_PUBLIC_PARK_ADDRESS.includes("["));

export const businessConfig: BusinessConfig = {
  hotlines: {
    primary: "+880 1966-602745",
    secondary: "+880 1966-602740",
    whatsapp: "+880 1966-602745",
  },
  email: "ac.magicisland@gmail.com",
  name: {
    en: "MAGIC ISLAND Theme & Water Park",
    bn: "ম্যাজিক আইল্যান্ড থিম ও ওয়াটার পার্ক",
  },
  legalEntity: {
    en: "Anowar City Magic Island Ltd.",
    bn: "আনোয়ার সিটি ম্যাজিক আইল্যান্ড লিমিটেড",
  },
  tagline: {
    en: "Dhaka's Grand Wonder Kingdom of Water Slides, Dinosaurs & Thrill Rides",
    bn: "ঢাকার কেরানীগঞ্জে ওয়াটার স্লাইড, জীবন্ত ডাইনোসর ও রোমাঞ্চকর রাইডসের আনন্দরাজ্য",
  },
  location: {
    address: "Keraniganj Highway, Konakhola, Dhaka 1310, Bangladesh",
    isConfirmed: true,
    areaName: {
      en: "Konakhola, Keraniganj, Dhaka",
      bn: "কোনাখোলা, কেরানীগঞ্জ, ঢাকা",
    },
    fullAddress: {
      en: "Keraniganj Highway, Konakhola (Near Fire Service Station), Dhaka 1310, Bangladesh",
      bn: "কেরানীগঞ্জ হাইওয়ে, কোনাখোলা (ফায়ার সার্ভিস স্টেশনের নিকটে), ঢাকা ১৩১০, বাংলাদেশ",
    },
    coordinates: {
      latitude: 23.6845,
      longitude: 90.3421,
      label: "Magic Island, Keraniganj",
    },
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Magic+Island+Keraniganj+Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed",
    landmarksHint: {
      en: "Conveniently located 20 minutes from Babubazar 2nd Buriganga Bridge along the scenic Keraniganj Highway, right beside Konakhola Fire Service.",
      bn: "বাবুবাজার দ্বিতীয় বুড়িগঙ্গা সেতু থেকে কেরানীগঞ্জ হাইওয়ে ধরে মাত্র ২০ মিনিটে কোনাখোলা ফায়ার সার্ভিস স্টেশনের ঠিক পাশেই অবস্থিত।",
    },
  },
  operatingHours: {
    isConfirmed: true,
    regular: {
      en: "10:00 AM - 07:00 PM (Open Every Day)",
      bn: "সকাল ১০:০০ - সন্ধ্যা ০৭:০০ (সপ্তাহে প্রতিদিন খোলা)",
    },
    weekend: {
      en: "10:00 AM - 07:30 PM (Friday, Saturday & Holidays)",
      bn: "সকাল ১০:০০ - সন্ধ্যা ০৭:৩০ (শুক্র, শনি ও সরকারি ছুটির দিন)",
    },
    holidays: {
      en: "Special Wave Pool Carnival & Evening Illuminations",
      bn: "ছুটির দিনে বিশেষ ওয়েভ পুল কার্নিভাল ও মনোমুগ্ধকর আলোকসজ্জা",
    },
  },
  contact: {
    phone: {
      display: "+880 1966-602745",
      callable: "+8801966602745",
      isConfirmed: true,
    },
    hotline: {
      display: "+880 1966-602740",
      callable: "+8801966602740",
      isConfirmed: true,
    },
    whatsapp: {
      rawNumber: "8801966602745",
      display: "+880 1966-602745",
      isConfirmed: true,
    },
    email: {
      general: "ac.magicisland@gmail.com",
      corporate: "ac.magicisland@gmail.com",
      isConfirmed: true,
    },
  },
  socialLinks: {
    facebook: "https://www.facebook.com/ac.magicisland/",
    instagram: "https://www.facebook.com/ac.magicisland/",
    youtube: "https://www.youtube.com/results?search_query=Anowar+City+Magic+Island",
    tiktok: "https://www.facebook.com/ac.magicisland/",
  },
};

/**
 * Utility helper to build WhatsApp click-to-chat URL with pre-populated message
 */
export function buildWhatsAppLink(params: {
  packageTitle?: string;
  date?: string;
  adults?: number;
  children?: number;
  customerName?: string;
  notes?: string;
  locale?: "en" | "bn";
}): { url: string; isConfigured: boolean } {
  if (!businessConfig.contact.whatsapp.isConfirmed || !businessConfig.contact.whatsapp.rawNumber) {
    return {
      url: "#",
      isConfigured: false,
    };
  }

  const { packageTitle, date, adults, children, customerName, notes, locale = "en" } = params;

  let message = "";
  if (locale === "bn") {
    message = `নমস্কার / আসসালামু আলাইকুম! আমি ম্যাজিক আইল্যান্ড টিকেট সম্পর্কে জানতে আগ্রহী:\n`;
    if (packageTitle) message += `• প্যাকেজ: ${packageTitle}\n`;
    if (date) message += `• পরিদর্শনের সম্ভাব্য তারিখ: ${date}\n`;
    if (adults !== undefined) message += `• প্রাপ্তবয়স্ক: ${adults} জন\n`;
    if (children !== undefined) message += `• শিশু: ${children} জন\n`;
    if (customerName) message += `• নাম: ${customerName}\n`;
    if (notes) message += `• বিশেষ নোট: ${notes}\n`;
    message += `অনুগ্রহ করে বুকিং প্রাপ্যতা ও নিশ্চিতকরণ তথ্য জানিয়ে সাহায্য করবেন। ধন্যবাদ!`;
  } else {
    message = `Hello Magic Island Team! I would like to inquire about booking tickets:\n`;
    if (packageTitle) message += `• Package: ${packageTitle}\n`;
    if (date) message += `• Preferred Visit Date: ${date}\n`;
    if (adults !== undefined) message += `• Adults: ${adults}\n`;
    if (children !== undefined) message += `• Children: ${children}\n`;
    if (customerName) message += `• Guest Name: ${customerName}\n`;
    if (notes) message += `• Message/Requests: ${notes}\n`;
    message += `Please advise on availability and booking confirmation steps. Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  const cleanNumber = businessConfig.contact.whatsapp.rawNumber.replace(/\D/g, "");

  return {
    url: `https://wa.me/${cleanNumber}?text=${encodedMessage}`,
    isConfigured: true,
  };
}

