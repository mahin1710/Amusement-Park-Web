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
  // WATER WORLD (6 Attractions)
  {
    id: "tsunami-wave-pool",
    name: {
      en: "Tsunami Bay Giant Wave Pool",
      bn: "সুনামি বে বিশাল ওয়েভ পুল",
    },
    category: "water-park",
    categoryLabel: {
      en: "Water World",
      bn: "ওয়াটার ওয়ার্ল্ড",
    },
    tagline: {
      en: "Bangladesh's Largest 6ft Ocean Waves",
      bn: "বাংলাদেশের বৃহত্তম ৬ ফুট সামুদ্রিক ঢেউ",
    },
    shortDescription: {
      en: "Experience ocean-scale rolling surf with computerized pneumatic wave generator creating 6 distinct waves.",
      bn: "অত্যাধুনিক নিউমেটিক প্রযুক্তিতে প্রতি ৪৫ মিনিট পরপর তৈরি হওয়া ৬ ফুট উচ্চতার জীবন্ত সামুদ্রিক ঢেউয়ের পুল।",
    },
    estimatedPriceBDT: 200,
    imageUrl: "/images/Water%20World/Water%20Cover%20Pic.png",
    thrillLevel: {
      en: "Moderate",
      bn: "মাঝারি",
    },
    isSignature: true,
  },
  {
    id: "vortex-tornado-slide",
    name: {
      en: "The Mega Cyclone Vortex",
      bn: "মেগা সাইক্লোন ভর্টেক্স স্লাইড",
    },
    category: "water-park",
    categoryLabel: {
      en: "Water World",
      bn: "ওয়াটার ওয়ার্ল্ড",
    },
    tagline: {
      en: "6-Story Plunge into Zero-G Funnel",
      bn: "৬ তলা উচ্চতা থেকে শূন্য-মাধ্যাকর্ষণ ফানেল",
    },
    shortDescription: {
      en: "4-person cloverleaf tube plunging through an enclosed tunnel into a massive 60ft oscillating gravity funnel.",
      bn: "চারজনের স্পেশাল র‍্যাফটে ১৬০ ফুটের অন্ধকার পাইপ বেয়ে ৬০ ফুট বিশালাকার ঘূর্ণি ফানেলে তীব্র ওয়াটার ড্রপ।",
    },
    estimatedPriceBDT: 180,
    imageUrl: "/images/Water%20World/Water-4.png",
    thrillLevel: {
      en: "Extreme",
      bn: "চরম রোমাঞ্চকর",
    },
    isSignature: true,
  },
  {
    id: "tropical-lazy-river",
    name: {
      en: "Amazonian Tropical Lazy River",
      bn: "আমাজনিয়ান ট্রপিক্যাল লেজি রিভার",
    },
    category: "water-park",
    categoryLabel: {
      en: "Water World",
      bn: "ওয়াটার ওয়ার্ল্ড",
    },
    tagline: {
      en: "Scenic 450m Relaxing River Loop",
      bn: "৪৫০ মিটার দীর্ঘ শান্ত জলপ্রবাহে টিউব ভ্রমণ",
    },
    shortDescription: {
      en: "Meandering cruise under crystal waterfalls, mist caverns, and dinosaur viewing cliffs on single & dual tubes.",
      bn: "ঝর্ণার নিচে ও গুহার মধ্য দিয়ে শান্ত জলের স্রোতে টিউব নিয়ে ভেসে চলার রিল্যাক্সিং ফ্যামিলি অভিজ্ঞতা।",
    },
    estimatedPriceBDT: 120,
    imageUrl: "/images/Water%20World/Water-2.png",
    thrillLevel: {
      en: "Mild",
      bn: "সহজ ও মনোরম",
    },
  },
  {
    id: "pirate-fortress-splash",
    name: {
      en: "Pirates' Cove Kid Fortress",
      bn: "পাইরেটস কোভ কিডস স্প্ল্যাশ ফোর্ট্রেস",
    },
    category: "water-park",
    categoryLabel: {
      en: "Water World",
      bn: "ওয়াটার ওয়ার্ল্ড",
    },
    tagline: {
      en: "1,000L Dumping Bucket & 7 Junior Slides",
      bn: "১,০০০ লিটার ডাম্পিং বাকেট ও ৭টি কিডস স্লাইড",
    },
    shortDescription: {
      en: "Family aquatic wonderland with interactive water cannons, spray nozzles, and massive tumbling water bucket.",
      bn: "শিশুদের অগভীর নিরাপদ জলদুর্গ, যাতে রয়েছে ওয়াটার কামান ও প্রতি ৫ মিনিট পরপর ১০০০ লিটারের বিশালাকার বাকেট স্প্ল্যাশ।",
    },
    estimatedPriceBDT: 100,
    imageUrl: "/images/Water%20World/Water-7.png",
    thrillLevel: {
      en: "Mild",
      bn: "সহজ ও মনোরম",
    },
  },
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
  {
    id: "rain-dance-tropical-lagoon",
    name: {
      en: "Rain Dance & Splash Lagoon",
      bn: "রেইন ড্যান্স ও স্প্ল্যাশ লেগুন",
    },
    category: "water-park",
    categoryLabel: {
      en: "Water World",
      bn: "ওয়াটার ওয়ার্ল্ড",
    },
    tagline: {
      en: "Rhythmic DJ Beats & Mist Showers",
      bn: "ডিজে মিউজিক ও কৃত্রিম বৃষ্টির জলকেলি",
    },
    shortDescription: {
      en: "Pumping sound system synchronized with high-volume overhead rain showers and refreshing cooling mist arrays.",
      bn: "অত্যাধুনিক সারাউন্ড সাউন্ড সিস্টেমের সাথে কৃত্রিম ঝরনার বৃষ্টিতে ভিজে পুরো পরিবার ও বন্ধুদের সাথে আনন্দ নৃত্য।",
    },
    estimatedPriceBDT: 100,
    imageUrl: "/images/Water%20World/Water-3.webp",
    thrillLevel: {
      en: "Mild",
      bn: "সহজ ও মনোরম",
    },
  },

  // DINO WORLD (7 Attractions)
  {
    id: "jurassic-t-rex-encounter",
    name: {
      en: "Apex Predator: The Colossal T-Rex",
      bn: "টি-রেক্স জুরাসিক অ্যানিমেট্রনিক এনকাউন্টার",
    },
    category: "dino-zone",
    categoryLabel: {
      en: "Dino World",
      bn: "ডাইনো ওয়ার্ল্ড",
    },
    tagline: {
      en: "45-Foot Roaring Tyrannosaurus Rex",
      bn: "৪৫ ফুট লম্বা জীবন্ত গর্জনরত টি-রেক্স",
    },
    shortDescription: {
      en: "Built with Japanese pneumatic robotics, realistic silicone skin, and bone-vibrating authentic Jurassic roars.",
      bn: "জাপানি রোবোটিক্স ও রিয়েলিস্টিক সিলিকন ত্বকে তৈরি ৪৫ ফুটের পূর্ণাকৃতির টি-রেক্সের জীবন্ত নড়াচড়া ও বুক কাঁপানো গর্জন।",
    },
    estimatedPriceBDT: 150,
    imageUrl: "/images/Dino%20World/Dino_1.webp",
    thrillLevel: {
      en: "Moderate",
      bn: "মাঝারি",
    },
    isSignature: true,
  },
  {
    id: "raptor-coaster-chase",
    name: {
      en: "Velociraptor Jungle Sprint Coaster",
      bn: "ভেলোসিরাপটর জঙ্গল স্প্রিন্ট কোস্টার",
    },
    category: "dino-zone",
    categoryLabel: {
      en: "Dino World",
      bn: "ডাইনো ওয়ার্ল্ড",
    },
    tagline: {
      en: "0-75 km/h Launch in 2.8 Seconds",
      bn: "২.৮ সেকেন্ডে ৭৫ কিমি গতির ডাইনো কোস্টার",
    },
    shortDescription: {
      en: "High-speed magnetic launch coaster weaving through prehistoric foliage, raptor nests, and inverted zero-G twists.",
      bn: "ক্ষিপ্র গতিতে ডাইনোসরের আস্তানায় ছুটে চলা ম্যাগনেটিক লঞ্চ কোস্টার, যাতে রয়েছে ৮৫০ মিটার রোমাঞ্চকর ট্র্যাক।",
    },
    estimatedPriceBDT: 180,
    imageUrl: "/images/Dino%20World/Dino_2.webp",
    thrillLevel: {
      en: "Extreme",
      bn: "চরম রোমাঞ্চকর",
    },
    isSignature: true,
  },
  {
    id: "fossil-dig-lab",
    name: {
      en: "Prehistoric Fossil Excavation Lab",
      bn: "প্রাগৈতিহাসিক ফসিল খনন ল্যাব",
    },
    category: "dino-zone",
    categoryLabel: {
      en: "Dino World",
      bn: "ডাইনো ওয়ার্ল্ড",
    },
    tagline: {
      en: "Junior Paleontologist Fossil Quarry",
      bn: "খুদে বিজ্ঞানীদের ফসিল খনন ও গবেষণা",
    },
    shortDescription: {
      en: "Hands-on sand arena where kids unearth giant dinosaur skeletons with authentic paleontologist brushes and tools.",
      bn: "বিশেষ কিট ও ব্রাশ নিয়ে বালির নিচ থেকে ডাইনোসরের বিশালাকার ফসিল খুঁজে বের করার চমৎকার শিক্ষণীয় অভিজ্ঞতা।",
    },
    estimatedPriceBDT: 80,
    imageUrl: "/images/Dino%20World/Dino_3.webp",
    thrillLevel: {
      en: "Mild",
      bn: "সহজ ও মনোরম",
    },
  },
  {
    id: "brachiosaurus-canopy-trail",
    name: {
      en: "Colossal Herbivore Boardwalk Trail",
      bn: "বিশাল তৃণভোজী ডাইনোসর ক্যানোপি ট্রেইল",
    },
    category: "dino-zone",
    categoryLabel: {
      en: "Dino World",
      bn: "ডাইনো ওয়ার্ল্ড",
    },
    tagline: {
      en: "60ft Tall Gentle Long-Neck Giants",
      bn: "৬০ ফুট উঁচু বিশালাকার নিরীহ ব্র্যাকিওসরাস",
    },
    shortDescription: {
      en: "Elevated wooden boardwalk bringing visitors eye-to-eye with towering long-necked animatronic herbivores.",
      bn: "গাছের ডালপালার ওপর দিয়ে নির্মিত কাঠের ঝুলন্ত ফুটব্রিজে হেঁটে বিশাল লম্বা গলার ব্র্যাকিওসরাসের কাছাকাছি যাওয়ার অভিজ্ঞতা।",
    },
    estimatedPriceBDT: 100,
    imageUrl: "/images/Dino%20World/Dino_4.webp",
    thrillLevel: {
      en: "Mild",
      bn: "সহজ ও মনোরম",
    },
  },
  {
    id: "spinosaurus-swamp-bluff",
    name: {
      en: "Spinosaurus Riverbank Safari",
      bn: "স্পিনোসরাস রিভারব্যাংক সাফারি",
    },
    category: "dino-zone",
    categoryLabel: {
      en: "Dino World",
      bn: "ডাইনো ওয়ার্ল্ড",
    },
    tagline: {
      en: "Sail-Backed Semi-Aquatic Predator",
      bn: "জলাভূমি থেকে উঠে আসা বিশালাকার স্পিনোসরাস",
    },
    shortDescription: {
      en: "Witness the fierce semi-aquatic predator emerge from misty jungle waterways with snapping jaws and roars.",
      bn: "পানির কিনারা থেকে বিশালাকার ধারালো দাঁতওয়ালা স্পিনোসরাসের গর্জন ও শিকার ধরার জীবন্ত শারীরিক নড়াচড়ার দৃশ্য।",
    },
    estimatedPriceBDT: 120,
    imageUrl: "/images/Dino%20World/Dino_5.webp",
    thrillLevel: {
      en: "Moderate",
      bn: "মাঝারি",
    },
  },
  {
    id: "triceratops-family-habitat",
    name: {
      en: "Triceratops Nesting Family Sanctuary",
      bn: "ট্রাইসেরাটপস ফ্যামিলি সাফারি জোন",
    },
    category: "dino-zone",
    categoryLabel: {
      en: "Dino World",
      bn: "ডাইনো ওয়ার্ল্ড",
    },
    tagline: {
      en: "Three-Horned Mother & Giant Hatchling Eggs",
      bn: "তিন শিংওয়ালা মা ডাইনোসর ও বিশালাকার ডিম",
    },
    shortDescription: {
      en: "Interactive photo sanctuary featuring life-sized horned mothers protecting giant cracked dinosaur eggs.",
      bn: "পরিবার ও শিশুদের ফটো স্পট, যেখানে বিশালাকার ডিমের ভেতর ঢুকে ট্রাইসেরাটপস ছানাদের সাথে ছবি তোলা যায়।",
    },
    estimatedPriceBDT: 80,
    imageUrl: "/images/Dino%20World/Dino_6.webp",
    thrillLevel: {
      en: "Mild",
      bn: "সহজ ও মনোরম",
    },
  },
  {
    id: "pterodactyl-sky-aviary",
    name: {
      en: "Pterodactyl Sky Aviary Lookout",
      bn: "উড়ন্ত টেরোডাক্টাইল স্কাই এভিয়ারি ভিউপয়েন্ট",
    },
    category: "dino-zone",
    categoryLabel: {
      en: "Dino World",
      bn: "ডাইনো ওয়ার্ল্ড",
    },
    tagline: {
      en: "Wing-Flapping Prehistoric Sky Reptiles",
      bn: "উঁচু পাহাড়ে ডানা মেলা উড়ন্ত প্রাগৈতিহাসিক ডাইনোসর",
    },
    shortDescription: {
      en: "Look upward along elevated cliff lookouts to watch wide-winged reptiles perched high above the jungle canopy.",
      bn: "গাছের চূড়ায় ও কৃত্রিম পাথুরে পাহাড়ে ডানা ঝাপটানো বিশাল টেরোডাক্টাইলের ডাক এবং প্রাচীন আকাশের রোমাঞ্চ।",
    },
    estimatedPriceBDT: 100,
    imageUrl: "/images/Dino%20World/Dino_7.webp",
    thrillLevel: {
      en: "Moderate",
      bn: "মাঝারি",
    },
  },

  // THRILL WORLD (7 Attractions)
  {
    id: "galaxy-cyclone-rollercoaster",
    name: {
      en: "The Galaxy Cyclone Mega Coaster",
      bn: "গ্যালাক্সি সাইক্লোন মেগা রোলারকোস্টার",
    },
    category: "thrill-world",
    categoryLabel: {
      en: "Thrill World",
      bn: "থ্রিল ওয়ার্ল্ড",
    },
    tagline: {
      en: "140ft Summit, 4 Inversions, 90 km/h",
      bn: "১৪০ ফুট খাঁড়া ড্রপ ও ৪টি পূর্ণাঙ্গ লুপ",
    },
    shortDescription: {
      en: "The crown jewel steel hypercoaster boasting an 85-degree first drop, 4 inversions, and skyline panoramic thrills.",
      bn: "ম্যাজিক আইল্যান্ডের সিগনেচার মেগা কোস্টার। ১৪০ ফুট শীর্ষ থেকে ৮৫ ডিগ্রি কোণে খাড়া পতন এবং ঘন্টায় ৯০ কিমি গতির অনুভূতি।",
    },
    estimatedPriceBDT: 250,
    imageUrl: "/images/Thrill%20World/Thrill-1.webp",
    thrillLevel: {
      en: "Extreme",
      bn: "চরম রোমাঞ্চকর",
    },
    isSignature: true,
  },
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
  {
    id: "carnival-carousel-twister",
    name: {
      en: "Grand Carnival Carousel",
      bn: "গ্র্যান্ড কার্নিভাল ক্যারোসেল",
    },
    category: "thrill-world",
    categoryLabel: {
      en: "Thrill World",
      bn: "থ্রিল ওয়ার্ল্ড",
    },
    tagline: {
      en: "Fairytale Magical Steeds & Warm Illumination",
      bn: "হাজারো রঙিন আলোর নিচে মিষ্টি কার্নিভাল ঘূর্ণন",
    },
    shortDescription: {
      en: "Ornate sculpted horses, royal chariots, and classic organ music enchanting young children and parents alike.",
      bn: "ছোট-বড় সবার প্রিয় ক্লাসিক্যাল কার্নিভাল ক্যারোসেল। সুন্দর নকশাদার ঘোড়া ও রথে চড়ে পরিবারের সাথে মিষ্টি আনন্দ।",
    },
    estimatedPriceBDT: 80,
    imageUrl: "/images/Thrill%20World/Thrill-6.webp",
    thrillLevel: {
      en: "Mild",
      bn: "সহজ ও মনোরম",
    },
  },
  {
    id: "speed-spin-gravity-wave",
    name: {
      en: "Midway Speed Twister",
      bn: "মিডওয়ে স্পিড টুইস্টার",
    },
    category: "thrill-world",
    categoryLabel: {
      en: "Thrill World",
      bn: "থ্রিল ওয়ার্ল্ড",
    },
    tagline: {
      en: "Dual-Axis Centrifugal Spinning Pods",
      bn: "গতিশীল দ্বৈত অক্ষের সেন্ট্রিফিউগাল স্পিন",
    },
    shortDescription: {
      en: "Independent spinning cockpits revolving around a giant central axis on undulating tracks with speed bursts.",
      bn: "কেন্দ্রীয় অক্ষের চারপাশে তীব্র গতিতে ঘুরতে ঘুরতে নিজের পডও স্বাধীনভাবে চক্কর দেয়—একসাথে দ্বৈত ঘূর্ণনের দারুণ চমক।",
    },
    estimatedPriceBDT: 120,
    imageUrl: "/images/Thrill%20World/Thrill-7.webp",
    thrillLevel: {
      en: "Moderate",
      bn: "মাঝারি",
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
