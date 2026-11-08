# Magic Island — Next.js Frontend Application

This directory contains the decoupled, production-grade Next.js frontend for **MAGIC ISLAND**, Bangladesh's premier international amusement & water park.

---

## 🚀 Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Internationalization**: Bilingual (English & বাংলা) with native Unicode font `Hind Siliguri`

---

## 📂 Directory Layout
```
frontend/
  src/
    app/                     # Next.js App Router presentation pages
      amusement-park/        # Galaxy Thrills zone
      attractions/           # 35+ rides directory & filter
      booking/               # 5-step checkout & sandbox gateway
        confirmation/[ref]/  # Digital e-ticket receipt & print view
        lookup/              # Reference / phone booking search
        sandbox-gateway/     # Payment gateway verification simulator
      dino-zone/             # Jurassic Realm zone
      events/                # Group celebrations & quotation engine
      gallery/               # HD photo gallery with lightbox modal
      location/              # Park radar mockup, hours, contact form
      tickets/               # Passes, add-ons, ticketing FAQs
      water-park/            # Aqua Oasis wave pool & slides
      layout.tsx             # Root layout with fonts, header, footer, WhatsApp
      page.tsx               # Cinematic homepage
    components/              # Reusable UI components
      home/                  # Hero, Zones, Adventure Quiz, Tickets, Location
      layout/                # Navbar, Footer
      ui/                    # Floating WhatsApp, PlaceholderBadge
    context/                 # LanguageProvider & useTranslation hook
    data/                    # Attraction catalog specifications
    hooks/                   # useParkData custom hook
    i18n/                    # Bilingual configuration
    lib/types/               # Typed TypeScript interfaces
    services/                # api.ts (communicates with Laravel REST API)
  public/                    # Static public assets
  package.json
  .env.example
  .env.local
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Verify `NEXT_PUBLIC_API_URL` points to your running Laravel backend (default: `http://localhost:8000/api`).

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

