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
    imageUrl: "/images/Water%20World/Water%20Cover%20Pic.png",
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
    imageUrl: "/images/Water%20World/Water-4.png",
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
    imageUrl: "/images/Water%20World/Water-2.png",
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
    imageUrl: "/images/Water%20World/Water-7.png",
  },
  {
    id: "aqua-speed-racing-flumes",
    name: {
      en: "Multi-Lane Speed Racing Slides",
      bn: "মাল্টি-লেন স্পিড রেসিং স্লাইডার",
    },
    zone: "water-park",
    category: "thrill",
    thrillLevel: "Extreme",
    thrillLevelBn: "চরম রোমাঞ্চকর",
    heightRequirement: "Minimum 42 inches (107 cm)",
    heightRequirementBn: "ন্যূনতম ৪২ ইঞ্চি (১০৭ সেমি)",
    tagline: {
      en: "Side-by-side high velocity plunge with steep drops",
      bn: "বন্ধুদের সাথে পাল্লা দিয়ে খাড়া ঢাল বেয়ে তীব্র গতির ওয়াটার রেসিং",
    },
    description: {
      en: "Race your friends on multi-lane racing slides with sudden elevation dips, rushing water curtains, and exciting splash-down runouts.",
      bn: "পাশাপাশি বহু লেনের স্পিড স্লাইডারে দ্রুত গতিতে নামার প্রতিযোগিতা আর শীতল পানির স্রোতে চোখ ধাঁধানো স্প্ল্যাশ ফিনিশ।",
    },
    features: {
      en: ["Parallel racing lanes", "High velocity splashout", "Lifeguard monitored arrival", "Timer display"],
      bn: ["প্যারালাল রেসিং লেন", "উচ্চগতির স্প্ল্যাশ সমাপ্তি", "সার্বক্ষণিক লাইফগার্ড তদারকি", "নিরাপদ ল্যান্ডিং বেসিন"],
    },
    imageUrl: "/images/Water%20World/Water-5.webp",
  },
  {
    id: "rain-dance-tropical-lagoon",
    name: {
      en: "Rain Dance & Splash Lagoon",
      bn: "রেইন ড্যান্স ও স্প্ল্যাশ লেগুন",
    },
    zone: "water-park",
    category: "water",
    thrillLevel: "Mild",
    thrillLevelBn: "সহজ ও মনোরম",
    heightRequirement: "All ages welcome",
    heightRequirementBn: "সকল বয়সী দর্শনার্থীদের জন্য উন্মুক্ত",
    tagline: {
      en: "Rhythmic showers with dance music and refreshing mist",
      bn: "ছন্দময় মিউজিকের সাথে কৃত্রিম বৃষ্টির পানির নিচে নাচ ও আনন্দ",
    },
    description: {
      en: "Feel the beats with top DJ sound, computerized rain showers, cooling mist arrays, and energetic dance floor in the water park.",
      bn: "অত্যাধুনিক সাউন্ড সিস্টেমের সাথে কৃত্রিম ঝরনার বৃষ্টিতে ভিজে পুরো পরিবার ও বন্ধুদের সাথে অনাবিল আনন্দ উপভোগ করুন।",
    },
    features: {
      en: ["Surround DJ sound", "High-volume rain nozzles", "Cooling mist fans", "Non-slip aquatic flooring"],
      bn: ["সারাউন্ড ডিজে মিউজিক", "উচ্চগতির রেইন নজল", "কুলিং মিস্ট ফ্যান", "পিচ্ছিলহীন ওয়াটার ডেক"],
    },
    imageUrl: "/images/Water%20World/Water-3.webp",
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
    imageUrl: "/images/Dino%20World/Dino_1.webp",
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
    imageUrl: "/images/Dino%20World/Dino_2.webp",
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
    imageUrl: "/images/Dino%20World/Dino_3.webp",
  },
  {
    id: "brachiosaurus-canopy-trail",
    name: {
      en: "Colossal Herbivore Boardwalk Trail",
      bn: "বিশাল তৃণভোজী ডাইনোসর ক্যানোপি ট্রেইল",
    },
    zone: "dino-zone",
    category: "spectacle",
    thrillLevel: "Mild",
    thrillLevelBn: "সহজ ও মনোরম",
    heightRequirement: "All ages welcome",
    heightRequirementBn: "সকল বয়সী দর্শনার্থীদের জন্য উন্মুক্ত",
    tagline: {
      en: "Towering 60ft gentle giants towering above the rainforest treetops",
      bn: "৬০ ফুট উঁচু বিশালাকার নিরীহ ব্র্যাকিওসরাসের সাথে ট্রপিক্যাল বনের ক্যানোপি দর্শন",
    },
    description: {
      en: "Walk along an elevated wooden canopy trail that brings you eye-to-eye with colossal long-neck animatronic giants munching on prehistoric fronds.",
      bn: "গাছের ডালপালার ওপর দিয়ে নির্মিত কাঠের তৈরি ঝুলন্ত ফুটব্রিজে হেঁটে বিশাল লম্বা গলার ব্র্যাকিওসরাসের কাছাকাছি যাওয়ার অনুপম অভিজ্ঞতা।",
    },
    features: {
      en: ["60ft animatronic neck movements", "Elevated wooden boardwalk", "Misty cooling stations", "Panoramic jungle overview"],
      bn: ["৬০ ফুটের জীবন্ত অ্যানিমেট্রনিক ডাইনোসর", "উঁচু কাঠের ফুটব্রিজ", "শীতল কুয়াশা স্টেশন", "বনাঞ্চলের মনোরম দৃশ্য"],
    },
    imageUrl: "/images/Dino%20World/Dino_4.webp",
  },
  {
    id: "spinosaurus-swamp-bluff",
    name: {
      en: "Spinosaurus Riverbank Safari",
      bn: "স্পিনোসরাস রিভারব্যাংক সাফারি",
    },
    zone: "dino-zone",
    category: "spectacle",
    thrillLevel: "Moderate",
    thrillLevelBn: "মাঝারি",
    heightRequirement: "All ages welcome",
    heightRequirementBn: "সকল বয়সী দর্শনার্থীদের জন্য উন্মুক্ত",
    tagline: {
      en: "Encounter the formidable sail-backed predator guarding ancient streams",
      bn: "পিঠে বিশাল ডানাযুক্ত হিংস্র স্পিনোসরাসের প্রাগৈতিহাসিক জলাভূমি অভিযান",
    },
    description: {
      en: "Watch as the legendary semi-aquatic predator rises from the jungle waterways with snapping jaws, motion-activated roars, and hyper-realistic skin textures.",
      bn: "পানির কিনারা থেকে বিশালাকার ধারালো দাঁতওয়ালা স্পিনোসরাসের গর্জন ও শিকার ধরার জীবন্ত শারীরিক নড়াচড়ার রোমাঞ্চকর দৃশ্য।",
    },
    features: {
      en: ["Water-edge motion robotics", "Fierce jaw-snapping motions", "Jurassic water sounds", "Interactive photo deck"],
      bn: ["জলাভূমির কিনারে রোবোটিক মুভমেন্ট", "ভীতিকর মুখ হাঁ করা ভঙ্গি", "জুরাসিক সাউন্ড এফেক্টস", "ছবি তোলার নিরাপদ ডেক"],
    },
    imageUrl: "/images/Dino%20World/Dino_5.webp",
  },
  {
    id: "triceratops-family-habitat",
    name: {
      en: "Triceratops Nesting Family Sanctuary",
      bn: "ট্রাইসেরাটপস ফ্যামিলি সাফারি জোন",
    },
    zone: "dino-zone",
    category: "family",
    thrillLevel: "Mild",
    thrillLevelBn: "সহজ ও মনোরম",
    heightRequirement: "All ages welcome",
    heightRequirementBn: "সকল বয়সী দর্শনার্থীদের জন্য উন্মুক্ত",
    tagline: {
      en: "Three-horned protective mothers and playful hatchling dinosaurs",
      bn: "তিন শিংওয়ালা মা ডাইনোসর ও ডিম ফুটে বের হওয়া ফুটফুটে ছানাদের সাফারি",
    },
    description: {
      en: "A family-favorite interactive zone showcasing horned Triceratops families guarding giant cracked eggs where children can touch and take memorable photos.",
      bn: "পরিবার ও শিশুদের জন্য বিশেষ আনন্দদায়ক অংশ, যেখানে বিশাল ডিমের ভেতর ঢুকে ট্রাইসেরাটপস ছানাদের সাথে ছবি তোলা যায়।",
    },
    features: {
      en: ["Interactive cracked egg photo props", "Life-size horned mother", "Gentle breathing soundscapes", "Shaded rest pavilions"],
      bn: ["ডিম্বাকৃতি ইন্টারঅ্যাক্টিভ ফটো প্রপস", "পূর্ণাকৃতির মা ট্রাইসেরাটপস", "প্রাকৃতিক শ্বাসপ্রশ্বাসের শব্দ", "ছায়াযুক্ত বিশ্রাম প্যাভিলিয়ন"],
    },
    imageUrl: "/images/Dino%20World/Dino_6.webp",
  },
  {
    id: "pterodactyl-sky-aviary",
    name: {
      en: "Pterodactyl Sky Aviary Lookout",
      bn: "উড়ন্ত টেরোডাক্টাইল স্কাই এভিয়ারি ভিউপয়েন্ট",
    },
    zone: "dino-zone",
    category: "spectacle",
    thrillLevel: "Moderate",
    thrillLevelBn: "মাঝারি",
    heightRequirement: "All ages welcome",
    heightRequirementBn: "সকল বয়সী দর্শনার্থীদের জন্য উন্মুক্ত",
    tagline: {
      en: "Soaring winged reptiles perched along elevated cliff overlooks",
      bn: "পাহাড়ি পাথুরে খাঁড়া ঢালে ডানা মেলা উড়ন্ত প্রাগৈতিহাসিক পাখিদের জগৎ",
    },
    description: {
      en: "Gaze upward as wide-winged Pterodactyls flap their wings with realistic screeching cries perched high above the jungle canopy.",
      bn: "গাছের চূড়ায় ও কৃত্রিম পাথুরে পাহাড়ে ডানা ঝাপটানো বিশাল টেরোডাক্টাইলের ডাক এবং প্রাচীন আকাশের রোমাঞ্চ উপভোগ করুন।",
    },
    features: {
      en: ["Wing-flapping animatronics", "Cliff-side high lookouts", "High-fidelity screech acoustics", "Binocular viewing stations"],
      bn: ["ডানা ঝাপটানোর জীবন্ত রোবোটিক্স", "পাহাড়ি ভিউপয়েন্ট ডেক", "উচ্চমাত্রার অ্যাকোস্টিক সাউন্ড", "দূরবীক্ষণ ভিউয়ার স্ট্যান্ড"],
    },
    imageUrl: "/images/Dino%20World/Dino_7.webp",
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
    imageUrl: "/images/Thrill%20World/Thrill-1.webp",
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
    imageUrl: "/images/Thrill%20World/Thrill-2.webp",
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
    imageUrl: "/images/Thrill%20World/Thrill-3.webp",
  },
  {
    id: "flying-chair-swings",
    name: {
      en: "Sky High Flying Swings (Fly Dolna)",
      bn: "উড়ন্ত চেয়ার দোলনা (ফ্লাই দোলনা)",
    },
    zone: "amusement-park",
    category: "thrill",
    thrillLevel: "Moderate",
    thrillLevelBn: "মাঝারি",
    heightRequirement: "Minimum 40 inches (102 cm)",
    heightRequirementBn: "ন্যূনতম ৪০ ইঞ্চি (১০২ সেমি)",
    tagline: {
      en: "Soar high into the sky on rotating breeze swings overlooking the entire park",
      bn: "আকাশের মুক্ত বাতাসে ঘূর্ণায়মান ফ্লাইং চেয়ারে বসে রোমাঞ্চকর দোলার অনুভূতি",
    },
    description: {
      en: "Feel the wind whip past as suspended double-seats lift high into the open sky, tilting at dynamic angles with panoramic horizons across Magic Island.",
      bn: "বাতাসে ডানা মেলার মতো অনুভূতির এই ফ্লাইং সুইং রাইড আপনাকে নিয়ে যাবে শূন্যের উচ্চতায়, যেখান থেকে পাখির চোখে উপভোগ করা যায় পুরো পার্কের সৌন্দর্য।",
    },
    features: {
      en: ["High-altitude tilting rotation", "Comfortable dual harness seating", "Panoramic park canopy views", "Smooth hydraulic ascent"],
      bn: ["উঁচুতে কৌণিক ঘূর্ণন", "নিরাপদ ডাবল হারনেস সিট", "পার্কের ওপর প্যানোরামিক ভিউ", "মসৃণ হাইড্রোলিক লিফট"],
    },
    imageUrl: "/images/Thrill%20World/Thrill-4.webp",
  },
  {
    id: "pirate-ship-voyager",
    name: {
      en: "Pirate Ocean Voyager Pendulum",
      bn: "পাইরেট ওশান ভয়েজার পেন্ডুলাম",
    },
    zone: "amusement-park",
    category: "thrill",
    thrillLevel: "Extreme",
    thrillLevelBn: "চরম রোমাঞ্চকর",
    heightRequirement: "Minimum 48 inches (122 cm)",
    heightRequirementBn: "ন্যূনতম ৪৮ ইঞ্চি (১২২ সেমি)",
    tagline: {
      en: "Giant swinging pirate galleon rocking 75 degrees into weightless freefall",
      bn: "শূন্যে ৭৫ ডিগ্রি কোণে তীব্র গতিতে দোলা পাইরেট জাহাজের চরম রোমাঞ্চ",
    },
    description: {
      en: "Climb aboard the massive wooden-styled pirate vessel as it swings higher and higher in massive arcs, creating zero-G stomach drop sensations at each apex.",
      bn: "বিশাল আকৃতির পাইরেট জাহাজে চড়ে যখন বাতাসে দুলবেন, প্রতিটি শীর্ষে পৌঁছালে মাধ্যাকর্ষণহীন শূন্যতার চমকপ্রদ অনুভূতি তৈরি হয়।",
    },
    features: {
      en: ["75-degree high amplitude swing", "True zero-gravity sensation", "Heavy-duty magnetic braking", "Capacity for 40 brave voyagers"],
      bn: ["৭৫ ডিগ্রি উচ্চমাত্রার সুইং", "জিরো-জি ওয়েটলেস ফিলিং", "ম্যাগনেটিক ফেইল-সেফ ব্রেক", "৪০ জন আরোহীর ধারণক্ষমতা"],
    },
    imageUrl: "/images/Thrill%20World/Thrill-5.png",
  },
  {
    id: "carnival-carousel-twister",
    name: {
      en: "Grand Carnival Carousel",
      bn: "গ্র্যান্ড কার্নিভাল ক্যারোসেল",
    },
    zone: "amusement-park",
    category: "family",
    thrillLevel: "Mild",
    thrillLevelBn: "সহজ ও মনোরম",
    heightRequirement: "All ages welcome",
    heightRequirementBn: "সকল বয়সী দর্শনার্থীদের জন্য উন্মুক্ত",
    tagline: {
      en: "Handcrafted magical steeds spinning under thousands of twinkling warm bulbs",
      bn: "হাজারো রঙিন আলোর নিচে পরিবারের সাথে ঘোড়ার পিঠে চড়ে মিষ্টি ঘূর্ণন",
    },
    description: {
      en: "A fairytale carousel featuring ornate sculpted horses, royal chariots, and classic calliope organ music that charms children and parents alike.",
      bn: "ছোট-বড় সবার প্রিয় ক্লাসিক্যাল ক্যারোসেল রাইড। সুন্দর কারুকার্যময় ঘোড়া ও রাজকীয় রথে চড়ে পরিবারের সাথে স্মৃতিময় আনন্দ উপভোগ করুন।",
    },
    features: {
      en: ["Ornate hand-painted animals", "Romantic night illumination", "Gentle soothing motion", "Perfect for children and families"],
      bn: ["সুন্দর নকশাদার ঘোড়া ও রথ", "মনোরম রাতের আলো", "শান্ত ও আনন্দময় ঘূর্ণন", "ছোট শিশু ও পরিবারের জন্য আদর্শ"],
    },
    imageUrl: "/images/Thrill%20World/Thrill-6.webp",
  },
  {
    id: "speed-spin-gravity-wave",
    name: {
      en: "Midway Speed Twister",
      bn: "মিডওয়ে স্পিড টুইস্টার",
    },
    zone: "amusement-park",
    category: "thrill",
    thrillLevel: "Moderate",
    thrillLevelBn: "মাঝারি",
    heightRequirement: "Minimum 42 inches (107 cm)",
    heightRequirementBn: "ন্যূনতম ৪২ ইঞ্চি (১০৭ সেমি)",
    tagline: {
      en: "High-RPM spinning pods weaving through banked track dips and speed bursts",
      bn: "দ্রুতগতির ঘূর্ণন ও রোমাঞ্চকর স্পিড কার্ভসহ মজার টুইস্টার রাইড",
    },
    description: {
      en: "Hold on tight as your cockpit spins independently while revolving around the giant central axis on a undulating roller track.",
      bn: "কেন্দ্রীয় অক্ষের চারপাশে তীব্র গতিতে ঘুরতে ঘুরতে নিজের পডও স্বাধীনভাবে চক্কর দেয়—একসাথে দ্বৈত ঘূর্ণনের দারুণ চমক।",
    },
    features: {
      en: ["Dual-axis centrifugal rotation", "Dynamic speed acceleration", "Interactive pilot steering", "High thrill soundtrack"],
      bn: ["দ্বৈত অক্ষের সেন্ট্রিফিউগাল স্পিন", "গতিশীল ত্বরণ", "ইন্টারেক্টিভ পাইলট কন্ট্রোল", "উত্তেজনাপূর্ণ মিউজিক"],
    },
    imageUrl: "/images/Thrill%20World/Thrill-7.webp",
  },
];

