import { CreateBookingRequest, BookingRecord } from "@/lib/types/booking";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(options.headers || {}),
    };

    try {
      const res = await fetch(url, { ...options, headers });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || `API error ${res.status}`);
      }

      return data;
    } catch (err: any) {
      console.warn(`[API] Request to ${endpoint} failed:`, err.message);
      throw err;
    }
  }

  // Attractions
  async getAttractions(params: { zone?: string; thrill?: string; search?: string } = {}) {
    const q = new URLSearchParams();
    if (params.zone && params.zone !== "all") q.append("zone", params.zone);
    if (params.thrill && params.thrill !== "all") q.append("thrill", params.thrill);
    if (params.search) q.append("search", params.search);
    const qs = q.toString() ? `?${q.toString()}` : "";
    return this.request<{ success: boolean; data: any[] }>(`/attractions${qs}`);
  }

  // Packages & Addons
  async getPackages() {
    return this.request<{ success: boolean; packages: any[]; addons: any[]; disclaimer: any }>(`/packages`);
  }

  async calculatePricing(payload: {
    package_id: string;
    adults: number;
    children: number;
    addon_ids: string[];
    promo_code?: string;
  }) {
    return this.request<{ success: boolean; pricing: any }>(`/packages/calculate`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  // Bookings
  async createBooking(payload: any) {
    const packageId = payload.packageId || payload.package_id;
    const visitDate = payload.visitDate || payload.visit_date;
    const adults = payload.adults;
    const children = payload.children;
    const addOnIds = payload.selectedAddOnIds || payload.add_ons || [];
    const promoCode = payload.promoCode || payload.promo_code;
    const customer = payload.customer || {
      full_name: payload.customer_name,
      phone: payload.customer_phone,
      email: payload.customer_email,
      special_requests: payload.special_requests,
    };
    const paymentMethod = payload.paymentMethod || payload.payment_method;

    return this.request<{
      success: boolean;
      message?: string;
      bookingReference: string;
      booking: BookingRecord;
    }>(`/bookings`, {
      method: "POST",
      body: JSON.stringify({
        package_id: packageId,
        visit_date: visitDate,
        adults,
        children,
        addon_ids: addOnIds,
        promo_code: promoCode,
        customer,
        payment_method: paymentMethod,
      }),
    });
  }

  async getBooking(reference: string) {
    return this.request<{ success: boolean; booking: BookingRecord }>(`/bookings/${encodeURIComponent(reference)}`);
  }

  async searchBookings(query: string) {
    return this.request<{ success: boolean; results: BookingRecord[] }>(`/bookings/search?q=${encodeURIComponent(query)}`);
  }

  // Payment
  async initiatePayment(payload: { booking_reference: string; payment_method: string }) {
    return this.request<{
      success: boolean;
      gateway: string;
      isSandbox: boolean;
      redirectUrl: string;
    }>(`/payment/initiate`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async handlePaymentCallback(payload: {
    booking_reference: string;
    status: string;
    transaction_id?: string;
  }) {
    return this.request<{ success: boolean; booking: BookingRecord }>(`/payment/callback`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  // Public Content
  async getGallery(category?: string) {
    const q = category && category !== "all" ? `?category=${encodeURIComponent(category)}` : "";
    return this.request<{ success: boolean; data: any[] }>(`/gallery${q}`);
  }

  async getFaqs(category?: string) {
    const q = category ? `?category=${encodeURIComponent(category)}` : "";
    return this.request<{ success: boolean; data: any[] }>(`/faqs${q}`);
  }

  async submitEventInquiry(payload: {
    event_type: string;
    organization_name: string;
    contact_person: string;
    phone: string;
    email?: string;
    estimated_guests?: number;
    target_date?: string;
    requirements?: string;
  }) {
    return this.request<{ success: boolean; message: string; id: number }>(`/events/inquiry`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async submitContactMessage(payload: {
    full_name: string;
    email: string;
    phone?: string;
    message: string;
  }) {
    return this.request<{ success: boolean; message: string; id: number }>(`/contact`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  // Admin & Staff Operations
  async login(credentials: { email: string; password: string }) {
    return this.request<{
      success: boolean;
      token: string;
      user: { id: number; name: string; email: string; role: string };
      message?: string;
    }>(`/auth/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async adminLogin(email: string, password: string) {
    return this.login({ email, password });
  }

  async getAdminStats(token: string) {
    return this.request<{
      success: boolean;
      stats: {
        totalBookings: number;
        confirmedBookings: number;
        totalRevenueBDT: number;
        totalGuests: number;
        pendingInquiries: number;
        unreadMessages: number;
      };
    }>(`/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getAdminBookings(token: string, filters: { status?: string; date?: string } = {}) {
    const q = new URLSearchParams();
    if (filters.status && filters.status !== "all") q.append("status", filters.status);
    if (filters.date) q.append("date", filters.date);
    const qs = q.toString() ? `?${q.toString()}` : "";

    return this.request<{
      success: boolean;
      data: BookingRecord[];
      pagination: { total: number; perPage: number; currentPage: number; lastPage: number };
    }>(`/admin/bookings${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateBookingStatus(token: string, bookingId: number, status: string) {
    return this.request<{ success: boolean; message: string; booking: BookingRecord }>(
      `/admin/bookings/${bookingId}/status`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ booking_status: status }),
      }
    );
  }

  async getAdminInquiries(token: string) {
    return this.request<{
      success: boolean;
      data: any[];
      pagination: { total: number; perPage: number; currentPage: number; lastPage: number };
    }>(`/admin/inquiries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getAdminContacts(token: string) {
    return this.request<{
      success: boolean;
      data: any[];
      pagination: { total: number; perPage: number; currentPage: number; lastPage: number };
    }>(`/admin/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const api = new ApiClient();
