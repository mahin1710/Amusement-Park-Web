# Magic Island — Local Development & Deployment Setup Guide

This guide details running and deploying the decoupled Next.js frontend and Laravel backend.

---

## 1. Prerequisites
- **PHP**: 8.2 or 8.3 with `pdo_pgsql` (or `pdo_sqlite`), `curl`, `mbstring`, `openssl`, `zip`, `intl` extensions enabled.
- **Composer**: 2.x
- **Node.js**: 18.17+ or 20+ (Node 24 supported)
- **Database**: PostgreSQL 14+ (or SQLite for zero-configuration local evaluation)

---

## 2. Backend Setup (Laravel)

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies (if not already installed)
composer install

# 3. Configure environment
cp .env.example .env
php artisan key:generate

# 4. Configure database in .env:
# For PostgreSQL:
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=magic_island
# DB_USERNAME=postgres
# DB_PASSWORD=your_password

# 5. Run migrations & database seeders
php artisan migrate:fresh --seed

# 6. Start the Laravel development server
php artisan serve --port=8000
```
Backend API will be running at `http://localhost:8000/api`.

---

## 3. Frontend Setup (Next.js)

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local

# 4. Start Next.js development server
npm run dev
# Note for Windows PowerShell: If scripts are disabled, run `npm.cmd run dev`
# Or enable script execution once:
# Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# 5. Or build for production
npm run build
npm run start
```
Frontend will be running at `http://localhost:3000`.

---

## 4. Default Seeded Credentials
- **Admin Email**: `admin@magicisland.com.bd`
- **Admin Password**: `password123`
- **Staff Email**: `staff@magicisland.com.bd`
- **Staff Password**: `password123`
- **Sample Booking**: Reference `MI-DEMO-2026`

