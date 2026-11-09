export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  category?: "aerial" | "water" | "dino" | "thrill";
  tagEn?: string;
  tagBn?: string;
}

/**
 * Authentic Anowar City Magic Island photographs used for the homepage hero slideshow.
 * To add, remove, or update photos, edit this centralized configuration.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "waterpark-aerial",
    src: "/images/magic-island-waterpark-aerial.jpg",
    alt: "Aerial view of Anowar City Magic Island wave pool and water park",
    category: "aerial",
    tagEn: "Aerial Overview & Wave Lagoon",
    tagBn: "আকাশছোঁয়া ড্রোন ভিউ ও বিশাল ওয়েভ লেগুন",
  },
  {
    id: "water-cover",
    src: "/images/Water%20World/Water%20Cover%20Pic.png",
    alt: "Water World massive wave pool and family aquatic zone",
    category: "water",
    tagEn: "Water World Wave Pool",
    tagBn: "ওয়াটার ওয়ার্ল্ড ওয়েভ পুল",
  },
  {
    id: "thrill-cover",
    src: "/images/Thrill%20World/Thrill%20Cover%20Pic.png",
    alt: "Thrill World rides and panoramic amusement park skyline",
    category: "thrill",
    tagEn: "Amusement Skyline & Mechanical Rides",
    tagBn: "অ্যামিউজমেন্ট পার্ক ও রোমাঞ্চকর রাইডস",
  },
  {
    id: "dino-cover",
    src: "/images/Dino%20World/Dino%20Cover%20PIC.webp",
    alt: "Dino World prehistoric rainforest canopy and animatronic dinosaurs",
    category: "dino",
    tagEn: "Prehistoric Dino Safari & Rainforest",
    tagBn: "প্রাগৈতিহাসিক ডাইনোসর সাফারি",
  },
  {
    id: "water-slides",
    src: "/images/Water%20World/Water-4.png",
    alt: "High-speed water slide tower and splash lagoon",
    category: "water",
    tagEn: "Towering High-Speed Water Slides",
    tagBn: "বিশাল স্পিড ওয়াটার স্লাইডার টাওয়ার",
  },
  {
    id: "dino-rex",
    src: "/images/Dino%20World/Dino_1.webp",
    alt: "Life-sized animatronic T-Rex dinosaur in lush tropical greenery",
    category: "dino",
    tagEn: "Colossal Life-Sized T-Rex",
    tagBn: "পূর্ণাকৃতির জীবন্ত গর্জনরত টি-রেক্স",
  },
  {
    id: "water-river",
    src: "/images/Water%20World/Water-2.png",
    alt: "Tropical lazy river, swimming bridges and scenic palm garden",
    category: "water",
    tagEn: "Scenic Lazy River & Bridges",
    tagBn: "শান্ত জলের ট্রপিক্যাল লেজি রিভার",
  },
  {
    id: "thrill-rides",
    src: "/images/Thrill%20World/Thrill-5.png",
    alt: "Coaster and mechanical thrill attractions at Magic Island",
    category: "thrill",
    tagEn: "High-Adrenaline Coasters & Spinners",
    tagBn: "উচ্চগতির কোস্টার ও থ্রিল রাইড",
  },
];

