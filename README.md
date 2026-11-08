# MAGIC ISLAND — Premium Amusement & Water Park Platform

Welcome to the decoupled enterprise repository for **MAGIC ISLAND**, Bangladesh's premier world-class theme, water, and dinosaur adventure kingdom.

---

## 🏛️ System Architecture

This repository is structured as an enterprise-grade decoupled system:
- **`frontend/`**: Modern Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, and native bilingual (English + বাংলা) localization.
- **`backend/`**: Robust Laravel 11 REST API, PHP 8.3, PostgreSQL Eloquent ORM, Laravel Sanctum token security, service-oriented business logic, database transactions, and queue jobs.
- **`docs/`**: Comprehensive system specifications:
  - [`docs/architecture.md`](docs/architecture.md): System diagrams, data flows, and security policies.
  - [`docs/api-documentation.md`](docs/api-documentation.md): Complete REST endpoint catalog and request/response payloads.
  - [`docs/migration-report.md`](docs/migration-report.md): Audit findings, inventory of migrated modules, and cleanup report.
  - [`docs/setup-guide.md`](docs/setup-guide.md): Local development and production deployment instructions.

---

## 📂 Project Organization

```
magic-island/
  frontend/                  # Next.js Presentation Application
    src/
      app/                   # App Router pages (/, /water-park, /booking...)
      components/            # UI components (Hero, Zones, WhatsApp, Navbar...)
      hooks/                 # Custom React hooks (useParkData...)
      services/              # Typed REST API service (api.ts)
      lib/                   # Utilities & types
      types/                 # TypeScript interfaces
      i18n/                  # Bilingual localization
    public/                  # Static assets
    package.json
    .env.example

  backend/                   # Laravel REST API Application
    app/
      Http/
        Controllers/Api/     # REST controllers (Booking, Payment, Attraction...)
        Requests/            # Form validation requests
        Resources/           # JSON API Resource transformers
      Models/                # Eloquent models (Booking, Customer, Attraction...)
      Services/              # Core business services (Booking, Pricing, Payment)
      Jobs/                  # Queue jobs (SendBookingConfirmationJob)
      Policies/              # Authorization policies (BookingPolicy)
    database/
      migrations/            # PostgreSQL-compatible migration files
      seeders/               # DatabaseSeeder with catalog & demo data
    routes/
      api.php                # API route definitions
    .env.example
    composer.json

  docs/                      # Complete Architecture & Setup Documentation
    architecture.md
    migration-report.md
    api-documentation.md
    setup-guide.md

  README.md
```

---

## 🚀 Quick Start Guide

### 1. Start the Backend API (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve --port=8000
```
API runs at `http://localhost:8000/api`.

### 2. Start the Frontend (Next.js)
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌟 World-Class Visual Identity & Creative Redesign

Inspired by premier entertainment parks like **Fantasy Kingdom** while developing an original, colorful, and modern design identity for **MAGIC ISLAND – Your Adventure Destination**:

- **Real Drone Aerial Photography Asset**: Incorporates authentic high-resolution aerial photography of Magic Island (`magic-island-waterpark-aerial.jpg`), capturing Bangladesh's largest heart-shaped wave pool, the multi-lane racing speed slides, dual enclosed spiral tube slides, encircling lazy river with rainbow bridges, and yellow-float splashdown lagoon.
- **13 Complete Homepage Sections**:
  1. Sticky Topbar & Glassmorphic Navigation
  2. Cinematic Hero Section ("YOUR ADVENTURE STARTS HERE" with Quick Planner)
  3. Official Introduction ("ONE DESTINATION. ENDLESS ADVENTURES." + 4 core statements)
  4. Choose Your Adventure (3 distinct cards: Water World, Dino World, Thrill World)
  5. Dedicated Water Park Feature Showcase with interactive attraction hotspots
  6. Dino Zone Showcase (25+ animatronic dinosaurs, 45ft T-Rex, prehistoric safari)
  7. Amusement Park Showcase (Roller Coaster, Bumper Cars, Ferris Wheel, Fly Dolna)
  8. Masonry Photo & Video Gallery with interactive full-screen Lightbox
  9. Data-Driven Tickets & Combo Packages with instant online checkout & WhatsApp CTA
  10. Visitor Essentials, interactive Google Maps embed, and categorized FAQ accordions
  11. Official Social Community Section integrated with [Facebook Page](https://www.facebook.com/ac.magicisland/)
  12. Final High-Impact Call to Action ("YOUR NEXT GREAT ADVENTURE IS WAITING.")
  13. Comprehensive Amusement Park Footer with verified contacts & sitemap
- **Complete Sub-Page Suite**:
  - `/about`: Brand story, park statistics, and drone overview
  - `/water-park`: Dedicated water attractions showcase featuring real park assets
  - `/dino-zone`: Animatronic safari and prehistoric educational tours
  - `/amusement-park`: High-thrill, family, and kids rides
  - `/tickets`: Detailed ticket comparison matrix
  - `/booking`: Complete 3-step dynamic booking engine
  - `/gallery`: Categorized media gallery with lightbox modal
  - `/events`: School excursions, corporate outings, and celebration packages
  - `/location`: Interactive Google Maps embed and Keraniganj highway driving directions
  - `/faq`: Searchable accordion FAQ
  - `/admin`: Operational booking and revenue dashboard
- **Bilingual Experience**: Full English and বাংলা switching with authentic Unicode typography (**Hind Siliguri**).
- **Dual Booking Methods**:
  - Full online booking pipeline with unique references (`MI-YYYYMM-XXXX`), dynamic cost breakdown, 5% entertainment VAT, digital pass QR code, and booking lookup.
  - Contextual WhatsApp quick booking button pre-populating package, date, and guest information.
- **Centralized Location Architecture**: Physical location and GPS coordinates isolated in single-source configuration (`config/business.ts` and environment variables): Konakhola, Keraniganj Highway, Dhaka.
- **Server-Side Payment Security**: Gateway sessions and IPN callbacks verified on the server. Includes Sandbox Simulator for end-to-end authorization testing.

---

## 📜 License
© 2026 Magic Island Leisure & Hospitality Ltd. All rights reserved.
