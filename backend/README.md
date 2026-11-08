# Magic Island — Laravel REST API Backend

This directory houses the robust, enterprise-grade Laravel 11 REST API backend powering **MAGIC ISLAND**.

---

## 🚀 Technology Stack
- **Framework**: Laravel 11.x
- **Language**: PHP 8.3
- **Database**: PostgreSQL (with SQLite zero-config fallback)
- **Authentication**: Laravel Sanctum API Tokens
- **Architecture**: Service Layer, Form Requests, API Resources, Queue Jobs, Policies

---

## 📂 Directory Layout
```
backend/
  app/
    Http/
      Controllers/Api/       # REST API Controllers (Booking, Payment, Attraction, Admin...)
      Requests/              # Strict validation FormRequest classes
      Resources/             # JSON API Resource transformers
    Models/                  # Eloquent ORM models
    Services/                # Core business logic (BookingService, PricingService, PaymentService)
    Jobs/                    # Queue jobs (SendBookingConfirmationJob)
    Policies/                # Authorization policies (BookingPolicy)
  database/
    migrations/              # PostgreSQL-compatible database schemas
    seeders/                 # DatabaseSeeder (attractions, packages, addons, promos, demo booking)
  routes/
    api.php                  # REST API route declarations (/v1 and root)
  .env.example
  composer.json
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
composer install
```

### 2. Configure Environment
```bash
cp .env.example .env
php artisan key:generate
```
Edit `.env` to configure your PostgreSQL credentials:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=magic_island
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

### 3. Run Migrations & Seeders
```bash
php artisan migrate:fresh --seed
```

### 4. Start the Laravel Server
```bash
php artisan serve --port=8000
```
API endpoints will be live at `http://localhost:8000/api`.

---

## 🔐 Default Administrative Accounts
- **Admin**: `admin@magicisland.com.bd` / `password123`
- **Staff**: `staff@magicisland.com.bd` / `password123`
- **Sample Seeded Booking**: `MI-DEMO-2026`
