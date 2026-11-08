# Magic Island — System Architecture Documentation

## 1. High-Level Architecture Overview

Magic Island is architected as a decoupled, multi-tier amusement park management and visitor platform:

```mermaid
flowchart TD
    subgraph ClientLayer["Frontend Layer (Next.js 16 + React 19 + TypeScript)"]
        UI["Visual UI Components & Pages\n(Tailwind CSS, Framer Motion)"]
        I18N["Bilingual Runtime (English + বাংলা)\n(Hind Siliguri Font)"]
        Services["API Client Services\n(frontend/src/services/api.ts)"]
    end

    subgraph APILayer["Backend Layer (Laravel 11 REST API)"]
        Routing["API Routing & Middleware\n(routes/api.php, Laravel Sanctum)"]
        Controllers["API Controllers\n(Bookings, Packages, Attractions, Payments)"]
        ServiceLayer["Business Logic Services\n(BookingService, PricingService, PaymentService)"]
        Models["Eloquent Models\n(PostgreSQL ORM)"]
    end

    subgraph DataLayer["Persistence & Gateway Layer"]
        DB[(PostgreSQL / SQLite Database)]
        PGW["Payment Gateways (SSLCommerz, bKash)\n+ Sandbox Verification Simulator"]
        WA["Configurable WhatsApp Bridge\n(wa.me Pre-populated Queries)"]
    end

    UI --> Services
    I18N --> UI
    Services -->|HTTP / JSON REST API| Routing
    Routing --> Controllers
    Controllers --> ServiceLayer
    ServiceLayer --> Models
    Models --> DB
    ServiceLayer --> PGW
    UI -.-> WA
```

---

## 2. Component Layer Responsibilities

### A. Frontend Layer (`frontend/`)
- **Framework**: Next.js 16 (App Router) with React 19, TypeScript, and Tailwind CSS.
- **Client Presentation**: All visitor-facing pages (`/`, `/water-park`, `/dino-zone`, `/amusement-park`, `/attractions`, `/tickets`, `/booking`, `/gallery`, `/events`, `/location`).
- **State & Localization**: Persistent bilingual context (`useTranslation` with `localStorage` and `NEXT_LOCALE` cookie), custom Google Font injection (`Hind_Siliguri` for Bangla and `Plus_Jakarta_Sans` for English).
- **Service Decoupling**: Frontend never executes database queries or computes authoritative financial transactions. All data operations communicate through typed service methods in `src/services/api.ts`.
- **Defensive UI**: Loading skeletons, error notifications, and verified feedback states for all forms and queries.

### B. Backend Layer (`backend/`)
- **Framework**: Laravel 11.x on PHP 8.3.
- **API Security**: Stateless REST API secured by Laravel Sanctum API tokens and CORS middleware.
- **Form Validation**: Strict Laravel `FormRequest` classes (`CreateBookingRequest`, `InitiatePaymentRequest`, `PaymentCallbackRequest`) ensuring zero malformed payloads reach controllers.
- **Service-Oriented Architecture**:
  - `PricingService`: Authoritative mathematical engine calculating ticket packages, child age exemptions, add-on costs, promo code discounts, and 5% entertainment VAT.
  - `BookingService`: Reference generation (`MI-YYYYMM-XXXX`), customer identity resolution, and database transaction consistency.
  - `PaymentService`: Payment gateway dispatch and IPN signature callback processing.
- **Database Engine**: PostgreSQL with full Eloquent model relationships, foreign key constraints, indexes on booking references and customer contact details.

---

## 3. Core Data Workflows

### 3.1 Booking & Reservation Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Guest as Visitor
    participant NextJS as Frontend (Next.js)
    participant Laravel as Backend (Laravel API)
    participant DB as PostgreSQL
    participant Gateway as Payment Gateway / Sandbox

    Guest->>NextJS: Selects package, date, guests, addons & enters contact
    NextJS->>Laravel: POST /api/bookings (CreateBookingRequest)
    Note over Laravel: Validates fields & recalculates exact server-side pricing
    Laravel->>DB: DB::transaction (Customer, Booking, BookingItems, Transaction)
    DB-->>Laravel: Booking persisted with reference MI-YYYYMM-XXXX
    Laravel-->>NextJS: 201 Created (BookingResource)
    
    NextJS->>Laravel: POST /api/payment/initiate
    alt Sandbox Mode
        Laravel-->>NextJS: Returns sandbox gateway redirect URL
        NextJS->>Gateway: Navigates to /booking/sandbox-gateway
        Guest->>Gateway: Selects outcome (Authorize / Decline / Cancel)
        Gateway->>Laravel: POST /api/payment/callback (Signature & Status)
    else Pay at Gate
        Laravel->>DB: Updates status to RESERVED_PENDING_PAYMENT
        Laravel-->>NextJS: Returns direct confirmation URL
    end
    
    Laravel->>DB: Updates booking_status to CONFIRMED and payment to SUCCESS
    Laravel-->>NextJS: Confirmation verified
    NextJS->>Guest: Displays Digital E-Ticket Pass with QR & Print View
```

---

## 4. Security Principles
1. **Zero Client Trust**: Frontend pricing is never accepted by the server. All subtotals, discounts, and taxes are recalculated from the database during booking creation.
2. **Environment Secret Isolation**: Merchant IDs, store passwords, and database credentials remain exclusively on the server in `backend/.env`.
3. **No Simulated Success in Production**: In production mode, transactions are only marked as confirmed upon verified server-to-server gateway callback.

