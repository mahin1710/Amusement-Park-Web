# Magic Island — REST API Documentation

Base URL: `http://localhost:8000/api` (or `http://localhost:8000/api/v1`)

---

## 1. System Health & Public Information

### `GET /health`
Returns system heartbeat and timestamp.
```json
{
  "status": "healthy",
  "service": "Magic Island API",
  "version": "1.0.0",
  "timestamp": "2026-11-07T07:15:00.000000Z"
}
```

### `GET /packages`
Retrieves all active ticket packages, available add-ons, and pricing disclaimers.

### `POST /packages/calculate`
Authoritatively verifies financial subtotals before checkout.
**Request Body**:
```json
{
  "package_id": "pkg_super_all_access",
  "adults": 2,
  "children": 1,
  "addon_ids": ["addon_locker", "addon_buffet_lunch"],
  "promo_code": "MAGICOPEN"
}
```
**Response**:
```json
{
  "success": true,
  "pricing": {
    "adult_count": 2,
    "child_count": 1,
    "package_price_adult": 1850,
    "package_price_child": 1250,
    "package_subtotal": 4950,
    "addons_total": 2100,
    "applied_promo_code": "MAGICOPEN",
    "discount_amount": 500,
    "vat_percentage": 5,
    "vat_amount": 328,
    "final_payable_bdt": 6878
  }
}
```

---

## 2. Attractions & Media

### `GET /attractions`
Query Parameters:
- `zone`: Optional (`water-park`, `dino-zone`, `amusement-park`, `all`)
- `thrill`: Optional (`Extreme`, `Moderate`, `Mild`)
- `search`: Keyword string

### `GET /gallery`
Query Parameters:
- `category`: Optional (`water`, `dino`, `amusement`, `night`)

### `GET /faqs`
Query Parameters:
- `category`: Optional (`ticketing`, `safety`, `general`)

---

## 3. Booking & Reservation Pipeline

### `POST /bookings`
Creates a new booking record inside an atomic database transaction.
**Request Body**:
```json
{
  "package_id": "pkg_super_all_access",
  "visit_date": "2026-12-25",
  "adults": 2,
  "children": 1,
  "addon_ids": ["addon_locker"],
  "promo_code": "MAGICOPEN",
  "customer": {
    "full_name": "Tanvir Ahmed",
    "phone": "01712345678",
    "email": "tanvir@example.com",
    "special_requests": "Window table for buffet"
  },
  "payment_method": "sslcommerz"
}
```
**Response**: `201 Created`
```json
{
  "success": true,
  "bookingReference": "MI-202611-9Q8Z",
  "booking": {
    "id": 2,
    "bookingReference": "MI-202611-9Q8Z",
    "packageTitleEn": "Super All-Access Kingdom Pass",
    "visitDate": "2026-12-25",
    "bookingStatus": "RESERVED_PENDING_PAYMENT",
    "finalPayableBDT": 4830
  }
}
```

### `GET /bookings/{reference}`
Retrieves complete booking details and digital pass data by booking reference.

### `GET /bookings/search?q={query}`
Finds reservations by booking reference, customer phone number, or customer email.

---

## 4. Payment Gateway Lifecycle

### `POST /payment/initiate`
Dispatches transaction authorization request to payment provider or Sandbox Simulator.
**Request Body**:
```json
{
  "booking_reference": "MI-202611-9Q8Z",
  "payment_method": "sslcommerz"
}
```
**Response**:
```json
{
  "success": true,
  "gateway": "sslcommerz",
  "isSandbox": true,
  "redirectUrl": "/booking/sandbox-gateway?ref=MI-202611-9Q8Z&method=sslcommerz&amount=4830"
}
```

### `POST /payment/callback`
Server-to-server callback / IPN signature verification endpoint.
**Request Body**:
```json
{
  "booking_reference": "MI-202611-9Q8Z",
  "status": "SUCCESS",
  "transaction_id": "TXN_SSL_778899"
}
```
**Response**:
```json
{
  "success": true,
  "booking": {
    "bookingReference": "MI-202611-9Q8Z",
    "bookingStatus": "CONFIRMED",
    "payment": {
      "status": "SUCCESS",
      "transactionId": "TXN_SSL_778899"
    }
  }
}
```

---

## 5. Contact & Group Inquiries

### `POST /events/inquiry`
Submits request for corporate picnics, school excursions, or birthday packages.

### `POST /contact`
Submits general park inquiries.

---

## 6. Authentication & Admin (Protected)

### `POST /auth/login`
Authenticates administrative staff and returns a Sanctum API bearer token.
**Request Body**:
```json
{
  "email": "admin@magicisland.com.bd",
  "password": "password123"
}
```

### `GET /admin/stats` (Header: `Authorization: Bearer <token>`)
Returns real-time management metrics: total bookings, confirmed revenue, guest count, and pending inquiries.

### `GET /admin/bookings` (Header: `Authorization: Bearer <token>`)
Lists all customer reservations with optional status and date filters, paginated.

### `PATCH /admin/bookings/{id}/status` (Header: `Authorization: Bearer <token>`)
Updates booking operational status (e.g. to `CHECKED_IN`, `CONFIRMED`, `CANCELLED`).

### `GET /admin/inquiries` (Header: `Authorization: Bearer <token>`)
Retrieves corporate and group event booking inquiries.

### `GET /admin/contacts` (Header: `Authorization: Bearer <token>`)
Retrieves visitor contact messages and general inquiries.

