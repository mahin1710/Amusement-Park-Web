import { HeroSection } from "@/components/home/HeroSection";
import { ChooseAdventureSection } from "@/components/home/ChooseAdventureSection";
import { FeaturedWaterParkSection } from "@/components/home/FeaturedWaterParkSection";
import { DinoZoneSection } from "@/components/home/DinoZoneSection";
import { AmusementParkSection } from "@/components/home/AmusementParkSection";
import { ResortStaySection } from "@/components/home/ResortStaySection";
import { HomeGallerySection } from "@/components/home/HomeGallerySection";
import { VisitorInfoSection } from "@/components/home/VisitorInfoSection";
import { SocialMediaSection } from "@/components/home/SocialMediaSection";
import { IntroSection } from "@/components/home/IntroSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Hero Section with separate Adult & Child selectors */}
      <HeroSection />

      {/* 2. Choose Your Adventure (3 distinct realms) */}
      <ChooseAdventureSection />

      {/* 3. Featured Water Park (Signature Attraction with interactive drone photo hotspots) */}
      <FeaturedWaterParkSection />

      {/* 4. Dino Zone Safari */}
      <DinoZoneSection />

      {/* 5. Thrill Amusement Park */}
      <AmusementParkSection />

      {/* 6. Resort Stay & Luxury Rooms Available (with Picture Placeholders) */}
      <ResortStaySection />

      {/* 7. Experience Magic Island Gallery (with filter tabs & lightbox) */}
      <HomeGallerySection />

      {/* 8. Visitor Information & Park Essentials */}
      <VisitorInfoSection />

      {/* 9. One Destination, Endless Adventure (IntroSection) */}
      <IntroSection />

      {/* 10. Connect with Magic Island (SocialMediaSection - Official Contact & Social Hub) */}
      <SocialMediaSection />

      {/* 11. Final Call to Action */}
      <FinalCtaSection />
    </div>
  );
}
