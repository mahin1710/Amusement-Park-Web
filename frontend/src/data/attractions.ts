import { ZoneType } from "@/config/booking";

export interface Attraction {
  id: string;
  name: {
    en: string;
    bn: string;
  };
  zone: ZoneType;
  category: "thrill" | "family" | "kids" | "water" | "spectacle";
  thrillLevel: "Extreme" | "Moderate" | "Mild";
  thrillLevelBn: "চরম রোমাঞ্চকর" | "মাঝারি" | "সহজ ও মনোরম";
  heightRequirement: string;
  heightRequirementBn: string;
  tagline: {
    en: string;
    bn: string;
  };
  description: {
    en: string;
    bn: string;
  };
  features: {
    en: string[];
    bn: string[];
  };
  imageUrl: string;
  isSignature?: boolean;
}

export const ATTRACTIONS_DATA: Attraction[] = [
  // WATER PARK
  {
    id: "tsunami-wave-pool",
    name: {
      en: "Tsunami Bay Giant Wave Pool",
      bn: "সুনামি বে বিশাল ওয়েভ পুল",
    },
    zone: "water-park",
    category: "water",
    thrillLevel: "Moderate",
    thrillLevelBn: "মাঝারি",
    heightRequirement: "All heights (Lifejackets required under 4ft)",
    heightRequirementBn: "সকল উচ্চতার জন্য (৪ ফুটের নিচে লাইফজ্যাকেট বাধ্যতামূলক)",
    tagline: {
      en: "Experience ocean-scale rolling surf in the heart of the park",
      bn: "পার্কের কেন্দ্রবিন্দুতে সমুদ্রের মতো বিশাল উত্তাল ঢেউয়ের আনন্দ",
    },
    description: {
      en: "Spanning over 25,000 square feet with computerized pneumatic wave generators creating 6 distinct wave patterns up to 6 feet high every 45 minutes.",
      bn: "২৫,০০০ বর্গফুটের সুবিশাল এলাকা জুড়ে অত্যাধুনিক নিউমেটিক প্রযুক্তি দ্বারা প্রতি ৪৫ মিনিট পরপর তৈরি হয় ৬ ফুট পর্যন্ত উচ্চতার জীবন্ত সামুদ্রিক ঢেউ।",
    },
    features: {
      en: ["6 distinct ocean wave modes", "Gradual beach-style shallow entry", "White sand lounger deck", "Certified lifeguard surveillance"],
      bn: ["৬ ধরনের ভিন্ন ঢেউয়ের প্যাটার্ন", "সৈকতের মতো ধীরে ধীরে ঢালু অগভীর অংশ", "হোয়াইট স্যান্ড লাউঞ্জার ডেক", "সার্বক্ষণিক লাইফগার্ড নিরাপত্তা"],
    },
    imageUrl: "/images/magic-island-waterpark-aerial.jpg",
    isSignature: true,
  },
  {
    id: "vortex-tornado-slide",
    name: {
      en: "The Mega Cyclone Vortex",
      bn: "মেগা সাইক্লোন ভর্টেক্স স্লাইড",
    },
    zone: "water-park",
    category: "water",
    thrillLevel: "Extreme",
    thrillLevelBn: "চরম রোমাঞ্চকর",
    heightRequirement: "Minimum 48 inches (122 cm)",
    heightRequirementBn: "ন্যূনতম ৪৮ ইঞ্চি (১২২ সেমি)",
    tagline: {
      en: "A 6-story drop into a zero-gravity funnel tube",
      bn: "৬ তলা উচ্চতা থেকে শূন্য-মাধ্যাকর্ষণ ঘূর্ণি ফানেলে তীব্র পতন",
    },
    description: {
      en: "Riders in 4-person cloverleaf rafts rocket through a 160-foot enclosed tunnel before dropping into a massive 60-foot diameter funnel oscillating back and forth at 45 km/h.",
      bn: "চারজনের স্পেশাল র‍্যাফটে ১৬০ ফুটের অন্ধকার পাইপ দিয়ে তীব্র গতিতে নেমে আসুন বিশালাকার ৬০ ফুটের ফানেলে, যেখানে মাধ্যাকর্ষণহীন অনুভূতি সৃষ্টি হয়।",
    },
    features: {
      en: ["4-person cloverleaf tube", "Zero-gravity oscillation", "High speed 45 km/h entry", "Water curtain splashdown"],
      bn: ["৪ জনের ফ্যামিলি টিউব", "শূন্য-মাধ্যাকর্ষণ দোলনা অনুভূতি", "ঘন্টায় ৪৫ কিমি গতি", "ওয়াটার কার্টেন স্প্ল্যাশডাউন"],
    },
    imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop",
    isSignature: true,
  },
  {
    id: "tropical-lazy-river",
    name: {
      en: "Amazonian Tropical Lazy River",
      bn: "আমাজনিয়ান ট্রপিক্যাল লেজি রিভার",
    },
    zone: "water-park",
    category: "family",
    thrillLevel: "Mild",
    thrillLevelBn: "সহজ ও মনোরম",
    heightRequirement: "All ages welcome",
    heightRequirementBn: "সকল বয়সী অতিথিদের জন্য উন্মুক্ত",
    tagline: {
      en: "Gentle floating cruise through mist caves and tropical palm groves",
      bn: "কুয়াশাচ্ছন্ন গুহা ও পামবনের ভেতর দিয়ে শান্ত জলপ্রবাহে টিউব ভ্রমণ",
    },
    description: {
      en: "A continuous 450-meter scenic loop meandering under waterfalls, through a glowing crystal cave, and past dinosaur viewing bluffs.",
      bn: "৪৫০ মিটার দীর্ঘ শান্ত জলের স্রোতধারা, যা ঝর্ণার নিচে ও গহিন গুহার মধ্য দিয়ে ধীরেসুস্থে বয়ে যায়। পুরো পরিবারের জন্য সেরা রিল্যাক্সিং অভিজ্ঞতা।",
    },
    features: {
      en: ["450m crystal clear stream", "Single and double plush tubes", "Mist cooling stations", "Gentle 3 km/h current"],
      bn: ["৪৫০ মিটার স্বচ্ছ জলধারা", "সিঙ্গেল ও ডাবল আরামদায়ক টিউব", "কুলিং মিস্ট স্টেশন", "ধীর ও নিরাপদ স্রোত"],
    },
    imageUrl: "https://images.unsplash.com/photo-1583344682029-7c87515ecce0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "pirate-fortress-splash",
    name: {
      en: "Pirates' Cove Kid Fortress",
      bn: "পাইরেটস কোভ কিডস স্প্ল্যাশ ফোর্ট্রেস",
    },
    zone: "water-park",
    category: "kids",
    thrillLevel: "Mild",
    thrillLevelBn: "সহজ ও মনোরম",
    heightRequirement: "Under 48 inches (Designed for toddlers & kids)",
    heightRequirementBn: "৪৮ ইঞ্চির নিচে (শিশু ও বাচ্চাদের জন্য বিশেষায়িত)",
    tagline: {
      en: "Multi-level pirate ship with water cannons and 1,000-liter dumping bucket",
      bn: "ওয়াটার কামান ও ১,০০০ লিটার জলের বিশালাকার ড্রপ বাকেটসহ জলদুর্গ",
    },
    description: {
      en: "Features 7 junior slides, 40 interactive water spray nozzles, tipping bells, and the park-favorite 1,000-liter mega bucket that soaks everyone every 5 minutes.",
      bn: "৭টি কিডস স্লাইড, ৪০টি স্প্রে নজল ও প্রতি ৫ মিনিট পরপর পুরো এলাকায় ছড়িয়ে পড়া ১,০০০ লিটারের সুবিশাল টিপিং ওয়াটার বাকেট।",
    },
    features: {
      en: ["1,000L tipping bucket", "Padded slip-resistant surfacing", "Junior body slides", "Interactive wheels & valves"],
      bn: ["১,০০০ লিটার ডাম্পিং বাকেট", "পিচ্ছিলরোধী নিরাপদ মেঝ", "শিশুদের জন্য বিশেষ স্লাইড", "ইন্টারঅ্যাক্টিভ স্প্রে কন্ট্রোল"],
    },
    imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1000&auto=format&fit=crop",
  },

  // DINO ZONE
  {
    id: "jurassic-t-rex-encounter",
    name: {
      en: "Apex Predator: The Colossal T-Rex",
      bn: "টি-রেক্স জুরাসিক অ্যানিমেট্রনিক এনকাউন্টার",
    },
    zone: "dino-zone",
    category: "spectacle",
    thrillLevel: "Moderate",
    thrillLevelBn: "মাঝারি",
    heightRequirement: "All ages welcome",
    heightRequirementBn: "সকল বয়সী দর্শনার্থীদের জন্য উন্মুক্ত",
    tagline: {
      en: "Face-to-face with a 45-foot roaring Tyrannosaurus Rex",
      bn: "৪৫ ফুট লম্বা জীবন্ত গর্জনরত টিরানোসরাস রেক্সের মুখোমুখি",
    },
    description: {
      en: "Engineered with Japanese pneumatic robotics and hyper-realistic silicone skin. Our life-sized T-Rex turns its head, dilates its pupils, and unleashes a bone-vibrating roar heard across the park.",
      bn: "জাপানি রোবোটিক্স ও রিয়েলিস্টিক সিলিকন ত্বকে তৈরি ৪৫ ফুটের পূর্ণাকৃতির টি-রেক্স। এর চোখের দৃষ্টি, শ্বাসপ্রশ্বাস ও বুক কাঁপানো গর্জন আপনাকে নিয়ে যাবে প্রাগৈতিহাসিক যুগে।",
    },
    features: {
      en: ["45ft life-size scale", "Computerized audio-animatronics", "Subwoofer acoustic roaring", "Authentic Jurassic jungle habitat"],
      bn: ["৪৫ ফুট পূর্ণাকৃতি বিশালাকার ডাইনোসর", "কম্পিউটারাইজড নিখুঁত অঙ্গভঙ্গি", "বুক কাঁপানো হাই-ফাই গর্জন", "বাস্তবধর্মী ট্রপিক্যাল বন"],
    },
    imageUrl: "https://images.unsplash.com/photo-1525877442103-5ddb2089e2bb?q=80&w=1000&auto=format&fit=crop",
    isSignature: true,
  },
  {
    id: "raptor-coaster-chase",
    name: {
      en: "Velociraptor Jungle Sprint Coaster",
      bn: "ভেলোসিরাপটর জঙ্গল স্প্রিন্ট কোস্টার",
    },
    zone: "dino-zone",
    category: "thrill",
    thrillLevel: "Extreme",
    thrillLevelBn: "চরম রোমাঞ্চকর",
    heightRequirement: "Minimum 52 inches (132 cm)",
    heightRequirementBn: "ন্যূনতম ৫২ ইঞ্চি (১৩২ সেমি)",
    tagline: {
      en: "High-speed magnetic launch coaster weaving through raptor nests",
      bn: "ম্যাগনেটিক হাই-স্পিড লঞ্চ কোস্টারে ক্ষিপ্র গতিতে ডাইনোসরের আস্তানায় ছুটে চলা",
    },
    description: {
      en: "Launches from 0 to 75 km/h in 2.8 seconds, banking through dense Jurassic foliage, heart-stopping near-miss caves, and an inverted zero-G corkscrew.",
      bn: "মাত্র ২.৮ সেকেন্ডে ০ থেকে ৭৫ কিমি গতিবেগ তুলে ছুটে যায় ঘন বনাঞ্চল ও খাঁড়া গুহার ভেতর দিয়ে। রয়েছে শূন্য-মাধ্যাকর্ষণ টুইস্ট লুপ।",
    },
    features: {
      en: ["0-75 km/h in 2.8s launch", "850m dynamic track", "Zero-G corkscrew inversion", "Onboard synchronized soundtrack"],
      bn: ["২.৮ সেকেন্ডে ৭৫ কিমি গতি", "৮৫০ মিটার রোমাঞ্চকর ট্র্যাক", "জিরো-জি কর্কস্ক্রু লুপ", "অনবোর্ড সিনেমাটিক সাউন্ডট্র্যাক"],
    },
    imageUrl: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1000&auto=format&fit=crop",
    isSignature: true,
  },
  {
    id: "fossil-dig-lab",
    name: {
      en: "Prehistoric Fossil Excavation Lab",
      bn: "প্রাগৈতিহাসিক ফসিল খনন ল্যাব",
    },
    zone: "dino-zone",
    category: "kids",
    thrillLevel: "Mild",
    thrillLevelBn: "সহজ ও মনোরম",
    heightRequirement: "All ages (Recommended for 4-14)",
    heightRequirementBn: "সকল বয়স (৪-১৪ বছর বয়সীদের জন্য চমৎকার)",
    tagline: {
      en: "Become a paleontologist and unearth giant dinosaur skeletons",
      bn: "খুদে প্রত্নতত্ত্ববিদ হয়ে বালুর নিচ থেকে বিশালাকার ডাইনোসরের কঙ্কাল আবিষ্কার করুন",
    },
    description: {
      en: "Equipped with authentic paleontologist brushes, chisels, and goggles, kids excavate embedded Velociraptor and Triceratops skeletons in an air-shaded sand quarry.",
      bn: "শিশুদের জন্য ব্রাশ ও বিশেষ কিট নিয়ে বালির নিচ থেকে ডাইনোসরের বিশালাকার ফসিল খুঁজে বের করার শিক্ষণীয় ও দারুণ আনন্দদায়ক অভিজ্ঞতা।",
    },
    features: {
      en: ["Life-size buried Triceratops cast", "Authentic excavation tools", "Junior Paleontologist badge", "Air-shaded comfortable arena"],
      bn: ["পূর্ণাকৃতির ট্রাইসেরাটপস ফসিল", "খনন সরঞ্জাম কিট", "জুনিয়র প্যালিয়ন্টোলজিস্ট ব্যাজ", "ছায়াযুক্ত আরামদায়ক স্থান"],
    },
    imageUrl: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?q=80&w=1000&auto=format&fit=crop",
  },

  // AMUSEMENT PARK
  {
    id: "galaxy-cyclone-rollercoaster",
    name: {
      en: "The Galaxy Cyclone Mega Coaster",
      bn: "গ্যালাক্সি সাইক্লোন মেগা রোলারকোস্টার",
    },
    zone: "amusement-park",
    category: "thrill",
    thrillLevel: "Extreme",
    thrillLevelBn: "চরম রোমাঞ্চকর",
    heightRequirement: "Minimum 54 inches (137 cm)",
    heightRequirementBn: "ন্যূনতম ৫৪ ইঞ্চি (১৩৭ সেমি)",
    tagline: {
      en: "Bangladesh's premier steel hypercoaster with a 130ft vertical drop",
      bn: "১৩০ ফুট খাঁড়া পতন ও ৪টি রোমাঞ্চকর লুপসহ মেগা স্টিল কোস্টার",
    },
    description: {
      en: "The crown jewel of Magic Island. Towering 140 feet above the park, boasting 4 inversions, an 85-degree first drop, and speeds reaching 90 km/h with breathtaking skyline views.",
      bn: "ম্যাজিক আইল্যান্ডের প্রধান আকর্ষণ। ১৪০ ফুট উঁচু শীর্ষ থেকে ৮৫ ডিগ্রি কোণে খাড়া পতন, ৪টি ইনভার্সন এবং ঘন্টায় ৯০ কিমি গতির রোমাঞ্চকর অভিজ্ঞতা।",
    },
    features: {
      en: ["140ft apex summit", "85-degree sheer first drop", "4 breathtaking inversions", "Magnetic regenerative braking"],
      bn: ["১৪০ ফুট আকাশছোঁয়া উচ্চতা", "৮৫ ডিগ্রি খাঁড়া ড্রপ", "৪টি পূর্ণাকার ইনভার্সন", "সর্বাধুনিক ম্যাগনেটিক ব্রেকিং"],
    },
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop",
    isSignature: true,
  },
  {
    id: "grand-skylight-ferris-wheel",
    name: {
      en: "Grand Panoramic Sky Wheel",
      bn: "গ্র্যান্ড প্যানোরামিক স্কাই হুইল",
    },
    zone: "amusement-park",
    category: "family",
    thrillLevel: "Mild",
    thrillLevelBn: "সহজ ও মনোরম",
    heightRequirement: "All heights welcome",
    heightRequirementBn: "সকল উচ্চতার জন্য উন্মুক্ত",
    tagline: {
      en: "150-foot giant observation wheel with fully air-conditioned VIP gondolas",
      bn: "এয়ার-কন্ডিশন্ড ভিআইপি গন্ডোলাসহ ১৫০ ফুট উঁচু প্যানোরামিক স্কাই হুইল",
    },
    description: {
      en: "Rising 150 feet high, 36 enclosed glass capsules offer 360-degree vistas across all 3 theme park zones, lush green river plains, and spectacular sunset horizons.",
      bn: "১৫০ ফুট উঁচু থেকে ৩৬টি শীতাতপ নিয়ন্ত্রিত কাঁচের ক্যাবিনে বসে পুরো পার্কের ৩টি জোন ও প্রকৃতির দিগন্তজোড়া অপরূপ সূর্যাস্তের ৩৬০ ডিগ্রি দৃশ্য উপভোগ করুন।",
    },
    features: {
      en: ["150ft panoramic height", "Fully air-conditioned luxury capsules", "15-minute scenic rotation", "Spectacular LED light choreography"],
      bn: ["১৫০ ফুট উচ্চতার প্যানোরামা", "এসি গ্লাস কেবিন", "১৫ মিনিটের রিল্যাক্সিং রাইড", "রাতের চোখ ধাঁধানো এলইডি লাইটিং"],
    },
    imageUrl: "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?q=80&w=1000&auto=format&fit=crop",
    isSignature: true,
  },
  {
    id: "turbo-bumper-grand-prix",
    name: {
      en: "Turbo Bumper Grand Prix",
      bn: "টার্বো বাম্পার গ্র্যান্ড প্রিক্স",
    },
    zone: "amusement-park",
    category: "family",
    thrillLevel: "Moderate",
    thrillLevelBn: "মাঝারি",
    heightRequirement: "Minimum 42 inches (107 cm)",
    heightRequirementBn: "ন্যূনতম ৪২ ইঞ্চি (১০৭ সেমি)",
    tagline: {
      en: "High-energy electrified dodging cars with surround audio and neon floors",
      bn: "নিওন লাইটিং ও মিউজিকসহ আধুনিক ইলেকট্রিক ডজিং কারের আনন্দ লড়াই",
    },
    description: {
      en: "Step into ultra-responsive dual-steering electric karts on a mirror-smooth metallic floor featuring dynamic underglow lighting and custom sound effects on collision.",
      bn: "বন্ধুবান্ধব ও পরিবারের সাথে ডজিং কারে ধাক্কাধাক্কির অনাবিল আনন্দ। নিওন গ্রাউন্ড ও ইলেকট্রিক ব্যাকগ্রাউন্ড মিউজিক এক দারুণ কার্নিভাল আবহ তৈরি করে।",
    },
    features: {
      en: ["24 simultaneous electric karts", "Shock-absorbent rubber bumpers", "Interactive neon track lighting", "Great for teens and families"],
      bn: ["২৪টি আধুনিক ইলেকট্রিক কার", "উন্নত শক-অ্যাবজরবেন্ট বাম্পার", "ইন্টারেক্টিভ নিওন ট্র্যাক", "পরিবার ও বন্ধুদের জন্য উপযোগী"],
    },
    imageUrl: "https://images.unsplash.com/photo-1542317854-f95842883f3e?q=80&w=1000&auto=format&fit=crop",
  },
];

