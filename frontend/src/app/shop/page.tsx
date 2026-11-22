"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Tag,
  Sparkles,
  Check,
  Phone,
  ShieldCheck,
  Truck,
  RefreshCw,
  HelpCircle,
  MapPin,
  Eye,
  ExternalLink,
  X,
  ChevronRight,
  Heart,
  MessageCircle,
  Clock,
  CreditCard,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { businessConfig } from "@/config/business";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

interface Product {
  id: string;
  category: "apparel" | "dino" | "water" | "souvenir";
  titleEn: string;
  titleBn: string;
  badgeEn?: string;
  badgeBn?: string;
  priceBDT: number;
  originalPriceBDT?: number;
  imageUrl: string;
  descEn: string;
  descBn: string;
  featuresEn: string[];
  featuresBn: string[];
  inStock: boolean;
  counterLocationEn: string;
  counterLocationBn: string;
}

const PRODUCTS: Product[] = [
  {
    id: "magic-tee",
    category: "apparel",
    titleEn: "Magic Island Signature Adventure T-Shirt",
    titleBn: "ম্যাজিক আইল্যান্ড সিগনেচার অ্যাডভেঞ্চার টি-শার্ট",
    badgeEn: "Bestseller",
    badgeBn: "বেস্টসেলার",
    priceBDT: 650,
    originalPriceBDT: 750,
    imageUrl: "/images/Thrill%20World/Thrill-2.webp",
    descEn:
      "100% premium combed cotton t-shirt featuring high-definition Magic Island coaster and wave park graphic prints. Breathable, sweat-resistant, and comfortable for all-day adventures.",
    descBn:
      "১০০% প্রিমিয়াম সুতি কাপড়ে তৈরি ম্যাজিক আইল্যান্ড থিমযুক্ত টি-শার্ট। পার্কে দিনব্যাপী রোমাঞ্চের জন্য আরামদায়ক ও টেকসই।",
    featuresEn: ["100% Combed Cotton", "Available in S, M, L, XL, XXL", "Fade-proof Eco Print"],
    featuresBn: ["১০০% খাঁটি কটন ফেব্রিক", "S, M, L, XL, XXL সাইজে উপলব্ধ", "রং টেকসই প্রিমিয়াম প্রিন্ট"],
    inStock: true,
    counterLocationEn: "Grand Welcome Store & Tsunami Bay Gift Counter",
    counterLocationBn: "প্রধান গেট স্যুভেনির শপ ও সুনামি বে গিফট কাউন্টার",
  },
  {
    id: "dino-hoodie",
    category: "apparel",
    titleEn: "Dino Kingdom Roar Zip Hoodie",
    titleBn: "ডাইনো কিংডম রোর জিপ হুডি",
    badgeEn: "Park Exclusive",
    badgeBn: "পার্ক এক্সক্লুসিভ",
    priceBDT: 1450,
    originalPriceBDT: 1650,
    imageUrl: "/images/Dino%20World/Dino Cover PIC.webp",
    descEn:
      "Heavyweight winter fleece zip hoodie featuring an embossed prehistoric T-Rex emblem on chest and bold 'Magic Island Dino Safari' sleeve print.",
    descBn:
      "উষ্ণ ও আরামদায়ক হেভিওয়েট ফ্লিস জিপ হুডি। বুকে গর্জনরত টি-রেক্সের এমব্রয়ডারি করা লোগো ও স্লিভে ডাইনো সাফারি প্রিন্ট।",
    featuresEn: ["Heavyweight 320 GSM Fleece", "YKK Smooth Zipper", "Drawstring Hood"],
    featuresBn: ["৩২০ জিএসএম প্রিমিয়াম ফ্লিস", "ওয়াইকেকে মেটাল জিপার", "ড্রস্ট্রিং ডাবল হুড"],
    inStock: true,
    counterLocationEn: "Dino Kingdom Outpost (Near T-Rex Entrance)",
    counterLocationBn: "ডাইনো কিংডম আউটপোস্ট (টি-রেক্স গেটের পাশে)",
  },
  {
    id: "park-cap",
    category: "apparel",
    titleEn: "Magic Island Classic 3D Embroidered Cap",
    titleBn: "ম্যাজিক আইল্যান্ড ক্লাসিক ৩ডি এমব্রয়ডার্ড ক্যাপ",
    badgeEn: "Top Rated",
    badgeBn: "জনপ্রিয়",
    priceBDT: 380,
    originalPriceBDT: 450,
    imageUrl: "/images/Thrill%20World/Thrill Cover Pic.png",
    descEn:
      "UV-protective baseball cap with premium 3D raised Magic Island embroidered branding. Built-in moisture-wicking sweatband and adjustable buckle.",
    descBn:
      "রোদে সুরক্ষার জন্য বিশেষ সান-ক্যাপ। ম্যাজিক আইল্যান্ডের আকর্ষণীয় থ্রি-ডি এমব্রয়ডারি এবং সাইজ অ্যাডজাস্টেবল মেটাল বাকল।",
    featuresEn: ["UV Sun Protection", "Adjustable Brass Buckle", "Breathable Eyelets"],
    featuresBn: ["সূর্যের ক্ষতিকর রশ্মি থেকে সুরক্ষা", "অ্যাডজাস্টেবল মেটাল বাকল", "বাতাস চলাচলের বিশেষ ডিজাইন"],
    inStock: true,
    counterLocationEn: "All Park Gift Counters",
    counterLocationBn: "পার্কের সকল গিফট কাউন্টারে",
  },
  {
    id: "trex-toy",
    category: "dino",
    titleEn: "Roaring Apex T-Rex Interactive Action Figure",
    titleBn: "রোয়ারিং এপেক্স টি-রেক্স ইন্টারঅ্যাক্টিভ অ্যাকশন ফিগার",
    badgeEn: "Kids Favorite",
    badgeBn: "বাচ্চাদের প্রিয়",
    priceBDT: 850,
    originalPriceBDT: 990,
    imageUrl: "/images/Dino%20World/Dino_1.webp",
    descEn:
      "Motion-activated articulated dinosaur action figure with authentic cinematic roaring sound effects and glowing red eyes. Safe non-toxic materials.",
    descBn:
      "বাচ্চাদের আকর্ষণীয় মুভিং ডাইনোসর খেলনা। আসল গর্জন শব্দ এবং চোখে লাল এলইডি লাইট ইফেক্ট। ১০০% শিশু-বান্ধব ও নিরাপদ মেটেরিয়াল।",
    featuresEn: ["Authentic Roaring Audio", "Movable Jaw & Arms", "Batteries Included"],
    featuresBn: ["বাস্তবধর্মী গর্জন সাউন্ড", "নড়াচড়াক্ষম চোয়াল ও হাত-পা", "ব্যাটারি অন্তর্ভুক্ত"],
    inStock: true,
    counterLocationEn: "Dino Kingdom Outpost (Near T-Rex Entrance)",
    counterLocationBn: "ডাইনো কিংডম আউটপোস্ট (টি-রেক্স গেটের পাশে)",
  },
  {
    id: "dino-plush",
    category: "dino",
    titleEn: "Prehistoric Baby Raptor Plushie (35cm)",
    titleBn: "প্রাগৈতিহাসিক বেবি র‍্যাপ্টর প্লাশ টয় (৩৫ সেমি)",
    badgeEn: "Super Soft",
    badgeBn: "সুপার সফট",
    priceBDT: 750,
    imageUrl: "/images/Dino%20World/Dino_3.webp",
    descEn:
      "Ultra-soft hypoallergenic plush companion inspired by the Magic Island Dino Zone safari. Child-safe embroidered eyes and huggable stuffing.",
    descBn:
      "ম্যাজিক আইল্যান্ড ডাইনো সাফারি দ্বারা অনুপ্রাণিত তুলতুলে নরম প্লাশ পুতুল। অ্যালার্জি-মুক্ত ও শিশুদের জন্য সম্পূর্ণ নিরাপদ।",
    featuresEn: ["Hypoallergenic Fabric", "Child-safe Stitched Eyes", "Washable Exterior"],
    featuresBn: ["অ্যালার্জি-মুক্ত নরম ফেব্রিক", "নিরাপদ এমব্রয়ডারি চোখ", "সহজে ধোয়াযোগ্য"],
    inStock: true,
    counterLocationEn: "Dino Kingdom Outpost",
    counterLocationBn: "ডাইনো কিংডম আউটপোস্ট কাউন্টার",
  },
  {
    id: "tsunami-towel",
    category: "water",
    titleEn: "Tsunami Bay Sand-Free Microfiber Beach Towel",
    titleBn: "সুনামি বে স্যান্ড-ফ্রি মাইক্রোফাইবার বিচ টাওয়েল",
    badgeEn: "Water Park Hit",
    badgeBn: "ওয়াটার পার্ক হিট",
    priceBDT: 450,
    imageUrl: "/images/Water%20World/Water Cover Pic.png",
    descEn:
      "Ultra-absorbent, fast-drying oversized microfiber beach towel featuring vibrant Tsunami Bay ocean wave artwork. Repels sand and folds compact.",
    descBn:
      "উচ্চ পানি শোষণক্ষম ও দ্রুত শুকিয়ে যাওয়া বড় সাইজের মাইক্রোফাইবার তোয়ালে। বালু আটকে থাকে না, সহজে ব্যাগে বহনযোগ্য।",
    featuresEn: ["Instant Fast Dry", "Sand-repellent Fabric", "Compact Travel Pouch Included"],
    featuresBn: ["দ্রুত শুকিয়ে যায়", "বালুকা মুক্ত বিশেষ ফেব্রিক", "বহনযোগ্য পাউচ অন্তর্ভুক্ত"],
    inStock: true,
    counterLocationEn: "Tsunami Bay Surf & Swim Counter",
    counterLocationBn: "সুনামি বে সার্ফ ও সুইম কাউন্টার",
  },
  {
    id: "waterproof-pouch",
    category: "water",
    titleEn: "IPX8 Floating Touchscreen Waterproof Phone Pouch",
    titleBn: "আইপিএক্স৮ ফ্লোটিং ওয়াটারপ্রুফ টাচস্ক্রিন ফোন পাউচ",
    badgeEn: "Park Essential",
    badgeBn: "পার্ক এসেনশিয়াল",
    priceBDT: 180,
    originalPriceBDT: 250,
    imageUrl: "/images/Water%20World/Water-2.png",
    descEn:
      "100% waterproof certified phone case with built-in air cushion that floats on water. Crystal-clear front for underwater photography and touch navigation.",
    descBn:
      "১০০% পানিরোধী এয়ার-কুশন যুক্ত ফোন পাউচ যা পানিতে ভাসে। পানির নিচেও স্বচ্ছ ছবি তোলা ও টাচস্ক্রিন ব্যবহার করা যায়।",
    featuresEn: ["IPX8 Certified (30m Deep)", "Floats on Wave Pool", "HD Clear Touch Window"],
    featuresBn: ["আইপিএক্স৮ সার্টিফাইড", "ওয়েভ পুলে ভাসে", "এইচডি ক্লিয়ার টাচ উইন্ডো"],
    inStock: true,
    counterLocationEn: "Water World Entrance & Wave Pool Locker Desk",
    counterLocationBn: "ওয়াটার পার্ক প্রবেশদ্বার ও ওয়েভ পুল লকার ডেস্ক",
  },
  {
    id: "insulated-bottle",
    category: "souvenir",
    titleEn: "Magic Island 750ml Insulated Thermal Bottle",
    titleBn: "ম্যাজিক আইল্যান্ড ৭৫০ মিলি থার্মাল ওয়াটার বোতল",
    badgeEn: "Eco Friendly",
    badgeBn: "ইকো ফ্রেন্ডলি",
    priceBDT: 580,
    imageUrl: "/images/Water%20World/Water-4.png",
    descEn:
      "Double-walled vacuum insulated food-grade 304 stainless steel sports bottle. Keeps water icy cold for 24 hours under the warm tropical sun.",
    descBn:
      "ডাবল-লেয়ার ভ্যাকিউম ইনসুলেটেড স্টেইনলেস স্টিল বোতল। ২৪ ঘণ্টা পানি ঠাণ্ডা এবং ১২ ঘণ্টা গরম রাখে। লিক-প্রুফ স্পোর্টস ক্যাপ।",
    featuresEn: ["24h Cold / 12h Hot", "BPA Free Food Grade 304", "Leak-proof Carabiner Cap"],
    featuresBn: ["২৪ ঘণ্টা ঠাণ্ডা রাখে", "বিপিএ-মুক্ত খাদ্যমান স্টিল", "লিক-প্রুফ স্পোর্টস ঢাকনা"],
    inStock: true,
    counterLocationEn: "All Park Gift Counters",
    counterLocationBn: "পার্কের সকল গিফট কাউন্টারে",
  },
  {
    id: "golden-keychain",
    category: "souvenir",
    titleEn: "Commemorative Golden Keychain & Token",
    titleBn: "ম্যাজিক আইল্যান্ড গোল্ডেন মেটালিক কি-চেইন",
    badgeEn: "Souvenir",
    badgeBn: "স্মারক",
    priceBDT: 220,
    imageUrl: "/images/Magic Island Logo.jpg",
    descEn:
      "Heavyweight antique gold finish die-cast metal souvenir keychain featuring the official Magic Island emblem, presented in a gift box.",
    descBn:
      "ম্যাজিক আইল্যান্ডের অফিসিয়াল লোগো সম্বলিত ভারী মেটালিক অ্যান্টিক গোল্ড কি-চেইন। প্রিমিয়াম গিফট বক্সে পরিবেশিত।",
    featuresEn: ["Solid Die-cast Metal", "Scratch-resistant Finish", "Velvet Gift Box"],
    featuresBn: ["সলিড মেটালিক তৈরি", "স্ক্র্যাচ-প্রুফ গোল্ডেন ফিনিশ", "ভেলভেট গিফট বক্স"],
    inStock: true,
    counterLocationEn: "Grand Welcome Emporium",
    counterLocationBn: "প্রধান গেট স্যুভেনির শপ",
  },
  {
    id: "explorer-backpack",
    category: "souvenir",
    titleEn: "Magic Island Explorer Adventure Backpack (20L)",
    titleBn: "ম্যাজিক আইল্যান্ড এক্সপ্লোরার অ্যাডভেঞ্চার ব্যাকপ্যাক (২০ লিটার)",
    badgeEn: "Premium Gear",
    badgeBn: "প্রিমিয়াম গিয়ার",
    priceBDT: 1250,
    originalPriceBDT: 1450,
    imageUrl: "/images/Thrill%20World/Thrill-5.png",
    descEn:
      "Water-resistant lightweight daypack with breathable ergonomic padded shoulder straps, dual water bottle mesh pockets, and dedicated electronics pouch.",
    descBn:
      "ওয়াটার-রেজিস্ট্যান্ট মজবুত ডেপ্যাক। আরামদায়ক প্যাডেড শোল্ডার স্ট্র্যাপ, বোতল রাখার পকেট ও গ্যাজেট কম্পার্টমেন্ট সহ তৈরি।",
    featuresEn: ["Water Resistant 600D Fabric", "Ergonomic Airflow Backing", "Dual Mesh Bottle Pockets"],
    featuresBn: ["পানি প্রতিরোধী ৬০০ডি ফেব্রিক", "আরামদায়ক এয়ারফ্লো ব্যাক", "ডাবল মেশ বোতল পকেট"],
    inStock: true,
    counterLocationEn: "Grand Welcome Emporium",
    counterLocationBn: "প্রধান গেট স্যুভেনির শপ",
  },
];

export default function ShopPage() {
  const { isBangla } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // WhatsApp hotline for order inquiries
  const whatsappNumber =
    businessConfig.hotlines?.whatsapp?.replace(/[^0-9]/g, "") || "8801700000000";

  const categories = [
    { id: "all", labelEn: "All Merchandise", labelBn: "সকল সামগ্রী" },
    { id: "apparel", labelEn: "Official Apparel", labelBn: "পোশাক ও ক্যাপ" },
    { id: "dino", labelEn: "Dino World Toys", labelBn: "ডাইনোসর খেলনা" },
    { id: "water", labelEn: "Water Park Gear", labelBn: "ওয়াটার পার্ক গিয়ার" },
    { id: "souvenir", labelEn: "Souvenirs & Gifts", labelBn: "স্মারক ও গিফটস" },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        product.titleEn.toLowerCase().includes(q) ||
        product.titleBn.toLowerCase().includes(q) ||
        product.descEn.toLowerCase().includes(q) ||
        product.descBn.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getWhatsAppProductLink = (product: Product) => {
    const text = isBangla
      ? `নমস্কার! আমি ম্যাজিক আইল্যান্ড অফিসিয়াল স্যুভেনির শপ থেকে "${product.titleBn}" (মূল্য: ৳${product.priceBDT}) সম্পর্কে জানতে চাচ্ছি। এটি কি পার্কের স্যুভেনির কাউন্টারে উপলব্ধ আছে?`
      : `Hello Magic Island Team! I am interested in inquiring about the "${product.titleEn}" (Price: ৳${product.priceBDT}) from your Official Souvenir Shop. Is it currently available at the park souvenir counters?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#173B42] pb-24">
      {/* SHOP PAGE HERO HEADER */}
      <section className="relative pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#FF914D]/15 bg-gradient-to-b from-white to-[#FFFDF5]">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF914D]/15 text-[#FF914D] text-xs font-bold uppercase tracking-widest mb-4 border border-[#FF914D]/25">
            <ShoppingBag className="w-4 h-4 text-[#FF914D]" />
            <span>
              {isBangla ? "ম্যাজিক আইল্যান্ড অফিসিয়াল শপ" : "Official Park Merchandise & Gifts"}
            </span>
          </div>

          {/* Waltograph Decorative Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-magical text-[#173B42] tracking-wide mb-3">
            {isBangla
              ? "ম্যাজিক আইল্যান্ড স্যুভেনির ও গিফট শপ"
              : "Magic Island Souvenir & Gift Shop"}
          </h1>

          {/* Subtitle in Nunito Sans */}
          <p className="mt-3 text-[#173B42]/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            {isBangla
              ? "আপনার রোমাঞ্চকর ভ্রমণের স্মৃতি ধরে রাখুন! এক্সক্লুসিভ পার্ক টি-শার্ট, জুরাসিক ডাইনো খেলনা, ওয়াটার গিয়ার এবং প্রিমিয়াম মেমেন্টো সংগ্রহ।"
              : "Take the magic home! Explore our exclusive range of park apparel, Jurassic dinosaur toys, water park accessories, and official commemorative souvenirs."}
          </p>

          {/* Counter Pickup Guarantee Note */}
          <div className="mt-5 inline-flex items-center gap-2 text-xs font-heading font-medium text-[#FF914D] bg-[#FF914D]/10 px-4 py-2 rounded-xl border border-[#FF914D]/20">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>
              {isBangla
                ? "পার্কের প্রধান গেট, ডাইনো জোন ও সুনামি বে কাউন্টারে সরাসরি উপলব্ধ"
                : "Available directly at Main Gate, Dino Zone & Tsunami Bay gift counters"}
            </span>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold font-heading transition-all whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? "bg-[#FF914D] text-white border-2 border-[#FF914D] shadow-md shadow-[#FF914D]/30 scale-102"
                      : "bg-white text-[#173B42] border-2 border-[#FF914D]/20 hover:border-[#FF914D] hover:bg-[#FFFDF5]"
                  }`}
                >
                  {isBangla ? cat.labelBn : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-[#173B42]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isBangla ? "পণ্য বা স্যুভেনির খুঁজুন..." : "Search merchandise..."
              }
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border-2 border-[#FF914D]/20 focus:border-[#FF914D] focus:outline-none text-xs sm:text-sm text-[#173B42] font-sans placeholder:text-[#173B42]/40 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#173B42]/50 hover:text-[#173B42]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#FF914D]/20 p-8">
            <ShoppingBag className="w-12 h-12 text-[#FF914D]/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-heading text-[#173B42]">
              {isBangla ? "কোনো পণ্য খুঁজে পাওয়া যায়নি" : "No merchandise found"}
            </h3>
            <p className="text-xs text-[#173B42]/70 mt-1 max-w-sm mx-auto font-sans">
              {isBangla
                ? "অনুগ্রহ করে অন্য কিওয়ার্ড দিয়ে খুঁজুন অথবা অন্য ক্যাটাগরি নির্বাচন করুন।"
                : "Try clearing your search query or switching to another category."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#FF914D] text-white text-xs font-bold font-heading"
            >
              {isBangla ? "সকল পণ্য দেখুন" : "View All Items"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl bg-white border-2 border-[#FF914D]/20 hover:border-[#FF914D] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative h-52 sm:h-56 w-full bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => setActiveModalProduct(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt={isBangla ? product.titleBn : product.titleEn}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                    <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-[#FF914D]" />
                      <span>{isBangla ? "বিস্তারিত দেখুন" : "Quick View"}</span>
                    </span>
                  </div>

                  {/* Badge */}
                  {(product.badgeEn || product.badgeBn) && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FF914D] text-white text-[10px] font-bold font-heading uppercase tracking-wider shadow">
                      {isBangla ? product.badgeBn : product.badgeEn}
                    </div>
                  )}

                  {/* Stock Tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-bold font-heading text-[#26865D] border border-[#26865D]/30 flex items-center gap-1">
                    <Check className="w-2.5 h-2.5" />
                    <span>{isBangla ? "উপলব্ধ" : "In Stock"}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setActiveModalProduct(product)}
                      className="text-base font-bold font-heading text-[#173B42] hover:text-[#FF914D] transition-colors cursor-pointer line-clamp-1"
                    >
                      {isBangla ? product.titleBn : product.titleEn}
                    </h3>
                    <p className="text-xs text-[#173B42]/70 mt-1 line-clamp-2 font-sans leading-relaxed">
                      {isBangla ? product.descBn : product.descEn}
                    </p>

                    {/* Counter Desk Tag */}
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#173B42]/60 font-sans">
                      <MapPin className="w-3 h-3 text-[#FF914D] shrink-0" />
                      <span className="line-clamp-1">
                        {isBangla ? product.counterLocationBn : product.counterLocationEn}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-5 pt-3 border-t border-[#FF914D]/15 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black font-heading text-[#173B42]">
                          ৳{product.priceBDT.toLocaleString()}
                        </span>
                        {product.originalPriceBDT && (
                          <span className="text-xs text-[#173B42]/40 line-through">
                            ৳{product.originalPriceBDT.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-[#173B42]/60 uppercase tracking-wider font-heading">
                        {isBangla ? "কাউন্টার মূল্য" : "Park Counter Price"}
                      </span>
                    </div>

                    <a
                      href={getWhatsAppProductLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FF914D] text-white text-xs font-bold font-heading hover:bg-[#e07d3c] transition-all shadow-md shadow-[#FF914D]/25 hover:scale-102"
                      title="Inquire via WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{isBangla ? "ইনকোয়ারি" : "Inquire"}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SOUVENIR COUNTERS INFO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl bg-white border-2 border-[#FF914D]/25 p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-magical text-[#173B42]">
              {isBangla
                ? "পার্কের অফিসিয়াল স্যুভেনির কাউন্টারসমূহ"
                : "Magic Island Gift Counter Locations"}
            </h2>
            <p className="text-xs sm:text-sm text-[#173B42]/75 mt-2 font-sans">
              {isBangla
                ? "পার্ক ভ্রমণের সময় যেকোনো স্যুভেনির কাউন্টারে এসে পণ্য সরাসরি ক্রয় করতে পারবেন।"
                : "Pick up your favorite park souvenirs in person during your visit at any of our official store counters."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-[#FF914D]/20">
              <div className="w-10 h-10 rounded-full bg-[#FF914D]/15 text-[#FF914D] flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-[#173B42]">
                {isBangla ? "প্রধান প্রবেশদ্বার শপ" : "Main Gate Grand Emporium"}
              </h3>
              <p className="text-xs text-[#173B42]/70 mt-1 font-sans">
                {isBangla
                  ? "টিকিট প্লাজা ও পার্ক এন্ট্রান্সের ঠিক পাশেই অবস্থিত। সব ধরণের টি-শার্ট ও স্যুভেনির পাওয়া যায়।"
                  : "Located beside the main ticketing plaza. Complete collection of apparel, backpacks & badges."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-[#FF914D]/20">
              <div className="w-10 h-10 rounded-full bg-[#26865D]/15 text-[#26865D] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-[#173B42]">
                {isBangla ? "ডাইনো কিংডম আউটপোস্ট" : "Dino Kingdom Outpost"}
              </h3>
              <p className="text-xs text-[#173B42]/70 mt-1 font-sans">
                {isBangla
                  ? "জুরাসিক ডাইনো ট্রেইলের এক্সিটে অবস্থিত। শিশুদের প্রিয় রোবোটিক খেলনা ও নরম পুতুল সংগ্রহ।"
                  : "Located at the prehistoric safari exit. Interactive dinosaurs, fossils, and baby raptor plushies."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-[#FF914D]/20">
              <div className="w-10 h-10 rounded-full bg-[#35C6C8]/20 text-[#087E8B] flex items-center justify-center mb-3">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-heading text-[#173B42]">
                {isBangla ? "সুনামি বে সার্ফ ডেস্ক" : "Tsunami Bay Surf Desk"}
              </h3>
              <p className="text-xs text-[#173B42]/70 mt-1 font-sans">
                {isBangla
                  ? "ওয়েভ পুল প্লাজার কাছে অবস্থিত। ওয়াটারপ্রুফ পাউচ, বিচ তোয়ালে ও সান প্রটেকশন ক্যাপ।"
                  : "Located right by the wave pool plaza. Waterproof pouches, quick-dry towels, and swim gear."}
              </p>
            </div>
          </div>

          {/* Payment & Security Perks */}
          <div className="mt-8 pt-6 border-t border-[#FF914D]/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-[#FF914D] mb-1.5" />
              <span className="text-xs font-bold font-heading text-[#173B42]">
                {isBangla ? "১০০% খাঁটি পণ্য" : "100% Official Quality"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="w-6 h-6 text-[#FF914D] mb-1.5" />
              <span className="text-xs font-bold font-heading text-[#173B42]">
                {isBangla ? "ক্যাশ, বিকাশ ও কার্ড" : "Cash, bKash & Card"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-[#FF914D] mb-1.5" />
              <span className="text-xs font-bold font-heading text-[#173B42]">
                {isBangla ? "পার্ক খোলার পুরো সময়" : "Open Park Hours"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-6 h-6 text-[#FF914D] mb-1.5" />
              <span className="text-xs font-bold font-heading text-[#173B42]">
                {isBangla ? "হোয়াটসঅ্যাপ সাপোর্ট" : "WhatsApp Inquiry"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-[#FF914D] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#173B42] transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 border border-[#FF914D]/20">
                <img
                  src={activeModalProduct.imageUrl}
                  alt={isBangla ? activeModalProduct.titleBn : activeModalProduct.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                {(activeModalProduct.badgeEn || activeModalProduct.badgeBn) && (
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FF914D]/15 text-[#FF914D] text-[10px] font-bold font-heading uppercase tracking-wider mb-2">
                    {isBangla ? activeModalProduct.badgeBn : activeModalProduct.badgeEn}
                  </span>
                )}
                <h3 className="text-xl font-bold font-heading text-[#173B42]">
                  {isBangla ? activeModalProduct.titleBn : activeModalProduct.titleEn}
                </h3>
                <p className="text-xs text-[#173B42]/75 mt-2 font-sans leading-relaxed">
                  {isBangla ? activeModalProduct.descBn : activeModalProduct.descEn}
                </p>

                {/* Features */}
                <div className="mt-4 space-y-1.5">
                  {(isBangla
                    ? activeModalProduct.featuresBn
                    : activeModalProduct.featuresEn
                  ).map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#173B42]">
                      <Check className="w-3.5 h-3.5 text-[#26865D] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Counter Location */}
                <div className="mt-4 p-3 rounded-xl bg-[#FFFDF5] border border-[#FF914D]/20 text-[11px] text-[#173B42]/80 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#FF914D] shrink-0 mt-0.5" />
                  <span>
                    {isBangla
                      ? activeModalProduct.counterLocationBn
                      : activeModalProduct.counterLocationEn}
                  </span>
                </div>

                {/* Price & WhatsApp Button */}
                <div className="mt-6 pt-4 border-t border-[#FF914D]/15 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-2xl font-black font-heading text-[#173B42]">
                      ৳{activeModalProduct.priceBDT.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-[#173B42]/60 uppercase font-heading">
                      {isBangla ? "কাউন্টার মূল্য" : "Counter Price"}
                    </span>
                  </div>

                  <a
                    href={getWhatsAppProductLink(activeModalProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF914D] text-white text-xs font-bold font-heading hover:bg-[#e07d3c] transition-all shadow-md shadow-[#FF914D]/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isBangla ? "হোয়াটসঅ্যাপে ইনকোয়ারি" : "Inquire via WhatsApp"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
