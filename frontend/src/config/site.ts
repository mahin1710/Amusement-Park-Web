export interface NavItem {
  id: string;
  href: string;
  labelKey: string;
  badgeKey?: string;
  children?: {
    href: string;
    labelKey: string;
    descriptionKey: string;
    icon?: string;
  }[];
}

export const siteConfig = {
  name: "Magic Island",
  banglaName: "ম্যাজিক আইল্যান্ড",
  tagline: "The Ultimate Wonder, Splash & Prehistoric Adventure",
  taglineBangla: "রোমাঞ্চ, জলকেলি ও প্রাগৈতিহাসিক রোমাঞ্চের জাদুকরী ভুবন",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://magicisland.com.bd",
  ogImage: "/images/magic-island-waterpark-aerial.jpg",
  description: {
    en: "Experience Bangladesh's premier world-class theme park featuring high-speed rollercoasters, massive wave pools in Water Park, and life-size roaring animatronic dinos in Dino Zone.",
    bn: "বাংলাদেশের সর্বাধুনিক বিশ্বমানের বিনোদন পার্ক — রোমাঞ্চকর রোলারকোস্টার, ওয়াটার পার্কের উত্তাল ওয়েভ পুল এবং ডাইনো জোনের জীবন্ত গর্জনরত ডাইনোসরদের নিয়ে এক অবিশ্বাস্য অভিজ্ঞতা।",
  },
  navItems: [
    { id: "home", href: "/", labelKey: "nav.home" },
    {
      id: "attractions",
      href: "/attractions",
      labelKey: "nav.attractions",
      children: [
        {
          href: "/water-park",
          labelKey: "nav.waterPark",
          descriptionKey: "attractions.waterParkShortDesc",
          icon: "Waves",
        },
        {
          href: "/dino-zone",
          labelKey: "nav.dinoZone",
          descriptionKey: "attractions.dinoZoneShortDesc",
          icon: "Footprints",
        },
        {
          href: "/amusement-park",
          labelKey: "nav.amusementPark",
          descriptionKey: "attractions.amusementParkShortDesc",
          icon: "FerrisWheel",
        },
      ],
    },
    { id: "tickets", href: "/tickets", labelKey: "nav.tickets", badgeKey: "nav.bookingOpen" },
    { id: "gallery", href: "/gallery", labelKey: "nav.gallery" },
    { id: "events", href: "/events", labelKey: "nav.events" },
    { id: "location", href: "/location", labelKey: "nav.location" },
    { id: "lookup", href: "/booking/lookup", labelKey: "nav.myBooking" },
  ] as NavItem[],
};

