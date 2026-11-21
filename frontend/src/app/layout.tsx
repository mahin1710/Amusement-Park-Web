import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Nunito_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AnimationProvider } from "@/context/AnimationContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { FloatingBottomNav } from "@/components/layout/FloatingBottomNav";
import { InteractiveCursorTrail } from "@/components/animations/InteractiveCursorTrail";
import { siteConfig } from "@/config/site";

// A. Waltograph: Decorative Branding & Selected Magical Accents
const waltograph = localFont({
  src: [
    {
      path: "./fonts/waltograph.regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/waltograph.ui-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-waltograph",
  display: "swap",
});

// B. Poppins: Primary Heading, Navigation, Button & Label Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// C. Nunito Sans: Readable Body & Supporting Content Font
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

// Bengali Typography Fallback: Hind Siliguri
const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-bangla",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anowar City Magic Island | Premium Amusement & Theme Park",
    template: "%s | Anowar City Magic Island",
  },
  description: "Welcome to Anowar City Magic Island! Bangladesh's premier entertainment destination featuring the nation's largest wave pool, prehistoric Dino Zone, thrill coasters, and luxury resort stays.",
  keywords: [
    "Anowar City Magic Island",
    "Magic Island",
    "Anowar City",
    "amusement park bangladesh",
    "theme park dhaka",
    "water park dhaka",
    "largest wave pool bangladesh",
    "dino zone",
    "rollercoaster",
    "family entertainment",
  ],
  authors: [{ name: "Anowar City Magic Island Ltd." }],
  icons: {
    icon: "/images/magic-island-logo.jpg",
    apple: "/images/magic-island-logo.jpg",
  },
  openGraph: {
    title: "Anowar City Magic Island | Where Every Moment Becomes a Magical Adventure",
    description: "Discover Bangladesh's ultimate amusement and water park wonderland at Anowar City Magic Island.",
    url: siteConfig.url,
    siteName: "Anowar City Magic Island",
    images: [
      {
        url: "/images/magic-island-waterpark-aerial.jpg",
        width: 1200,
        height: 630,
        alt: "Anowar City Magic Island Aerial Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${waltograph.variable} ${poppins.variable} ${nunitoSans.variable} ${hindSiliguri.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700&family=Hind+Siliguri:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FFFDF5] text-[#173B42] antialiased flex flex-col font-sans selection:bg-[#FFC857] selection:text-[#173B42]">
        <LanguageProvider>
          <AnimationProvider>
            <InteractiveCursorTrail />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingBottomNav />
            <FloatingWhatsApp />
          </AnimationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
