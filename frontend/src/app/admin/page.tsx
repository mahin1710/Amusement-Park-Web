"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  Calendar, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ArrowRight,
  LogOut,
  RefreshCw,
  Search,
  Building,
  Check
} from "lucide-react";
import { api } from "@/services/api";
import { BookingRecord } from "@/lib/types/booking";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  // Login form state
  const [email, setEmail] = useState("admin@magicisland.com.bd");
  const [password, setPassword] = useState("password123");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard states
  const [activeTab, setActiveTab] = useState<"bookings" | "inquiries" | "contacts">("bookings");
  const [stats, setStats] = useState<any>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("magic_island_token");
    const savedUser = localStorage.getItem("magic_island_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser({ name: "Admin Staff", email: "admin@magicisland.com.bd", role: "Administrator" });
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token, statusFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const data = await api.adminLogin(email, password);
      if (data.success && data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("magic_island_token", data.token);
        localStorage.setItem("magic_island_user", JSON.stringify(data.user));
      } else {
        setLoginError(data.message || "Invalid credentials.");
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("magic_island_token");
    localStorage.removeItem("magic_island_user");
  };

  const loadDashboardData = async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      const [statsRes, bookingsRes, inquiriesRes, contactsRes] = await Promise.allSettled([
        api.getAdminStats(token),
        api.getAdminBookings(token, { status: statusFilter }),
        api.getAdminInquiries(token),
        api.getAdminContacts(token),
      ]);

      if (statsRes.status === "fulfilled" && statsRes.value.success) {
        setStats(statsRes.value.stats);
      }
      if (bookingsRes.status === "fulfilled" && bookingsRes.value.success) {
        setBookings(bookingsRes.value.data);
      }
      if (inquiriesRes.status === "fulfilled" && inquiriesRes.value.success) {
        setInquiries(inquiriesRes.value.data);
      }
      if (contactsRes.status === "fulfilled" && contactsRes.value.success) {
        setContacts(contactsRes.value.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateStatus = async (bookingId: any, newStatus: string) => {
    if (!token) return;
    setUpdatingId(bookingId);
    try {
      const res = await api.updateBookingStatus(token, bookingId, newStatus);
      if (res.success) {
        setSuccessMsg(`Booking status updated to ${newStatus}`);
        setTimeout(() => setSuccessMsg(""), 3000);
        loadDashboardData();
      }
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Login Form Screen: Twilight Kingdom style
  if (!token) {
    return (
      <div className="min-h-screen bg-[#1C1A4A] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#2E2A7A]/60 border-2 border-[#B9B2F0]/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <span className="eyebrow text-xs text-[#B9B2F0] tracking-[0.3em] block mb-1">
              ANOWAR CITY
            </span>
            <h1 className="font-display text-3xl text-[#FFC93C]">
              MAGIC ISLAND
            </h1>
            <span className="eyebrow text-[11px] text-[#B9B2F0] tracking-[0.24em] block mt-1">
              STAFF & ADMIN PORTAL
            </span>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
              <XCircle className="w-5 h-5 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B9B2F0] mb-1.5">
                Staff Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] bg-[#1C1A4A] border border-[#B9B2F0]/30 text-white placeholder-slate-400 focus:outline-none focus:border-[#FFC93C] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B9B2F0] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] bg-[#1C1A4A] border border-[#B9B2F0]/30 text-white placeholder-slate-400 focus:outline-none focus:border-[#FFC93C] text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-primary-dark w-full py-3.5 text-xs font-bold uppercase tracking-wider mt-2 disabled:opacity-50"
            >
              {loginLoading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#B9B2F0]/20 text-center">
            <p className="text-xs text-[#B9B2F0] mb-2">Default demo administrator:</p>
            <code className="text-xs text-[#FFC93C] bg-[#1C1A4A] px-2 py-1 rounded border border-[#B9B2F0]/20 font-mono">
              admin@magicisland.com.bd / password123
            </code>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="min-h-screen bg-[#1C1A4A] text-white">
      {/* Top Bar */}
      <header className="border-b border-[#2E2A7A] bg-[#1C1A4A]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E2A7A] border border-[#FFC93C] text-[#FFC93C] flex items-center justify-center font-black">
              MI
            </div>
            <div>
              <h2 className="font-display text-[#FFC93C] text-lg leading-tight">Magic Island Admin</h2>
              <span className="eyebrow text-[10px] text-[#B9B2F0]">{user?.role || "Staff"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="p-2 rounded-lg bg-[#2E2A7A] hover:bg-[#2E2A7A]/80 text-[#FFC93C] transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/"
              className="text-xs text-[#B9B2F0] hover:text-white px-3 py-1.5 rounded-[8px] border border-[#B9B2F0]/30 transition-colors"
            >
              View Public Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-white px-3 py-1.5 rounded-[8px] border border-rose-500/40 hover:bg-rose-900/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Success toast */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#2E2A7A]/40 border border-[#B9B2F0]/20 rounded-2xl p-5">
            <div className="flex items-center justify-between text-[#B9B2F0] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-[#FFC93C]" />
            </div>
            <div className="text-2xl font-black text-white">
              ৳{(stats?.totalRevenueBDT || 0).toLocaleString()}
            </div>
            <p className="text-xs text-[#B9B2F0] mt-1">Confirmed payments</p>
          </div>

          <div className="bg-[#2E2A7A]/40 border border-[#B9B2F0]/20 rounded-2xl p-5">
            <div className="flex items-center justify-between text-[#B9B2F0] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Confirmed Bookings</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {stats?.confirmedBookings || 0} / {stats?.totalBookings || 0}
            </div>
            <p className="text-xs text-[#B9B2F0] mt-1">Active paid reservations</p>
          </div>

          <div className="bg-[#2E2A7A]/40 border border-[#B9B2F0]/20 rounded-2xl p-5">
            <div className="flex items-center justify-between text-[#B9B2F0] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Guests</span>
              <Users className="w-5 h-5 text-[#B9B2F0]" />
            </div>
            <div className="text-2xl font-black text-white">
              {stats?.totalGuests || 0}
            </div>
            <p className="text-xs text-[#B9B2F0] mt-1">Adults & children</p>
          </div>

          <div className="bg-[#2E2A7A]/40 border border-[#B9B2F0]/20 rounded-2xl p-5">
            <div className="flex items-center justify-between text-[#B9B2F0] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Inquiries & Msgs</span>
              <Mail className="w-5 h-5 text-[#FFC93C]" />
            </div>
            <div className="text-2xl font-black text-white">
              {(stats?.pendingInquiries || 0) + (stats?.unreadMessages || 0)}
            </div>
            <p className="text-xs text-[#B9B2F0] mt-1">Awaiting staff review</p>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="border-b border-[#2E2A7A] flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "bookings"
                  ? "border-[#FFC93C] text-[#FFC93C]"
                  : "border-transparent text-[#B9B2F0] hover:text-white"
              }`}
            >
              Ticket Reservations ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "inquiries"
                  ? "border-[#FFC93C] text-[#FFC93C]"
                  : "border-transparent text-[#B9B2F0] hover:text-white"
              }`}
            >
              Group & Corporate ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "contacts"
                  ? "border-[#FFC93C] text-[#FFC93C]"
                  : "border-transparent text-[#B9B2F0] hover:text-white"
              }`}
            >
              Contact Messages ({contacts.length})
            </button>
          </div>

          {activeTab === "bookings" && (
            <div className="flex items-center gap-2 pb-2">
              <span className="text-xs text-[#B9B2F0]">Filter:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#2E2A7A] border border-[#B9B2F0]/30 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-[#FFC93C]"
              >
                <option value="all">All Statuses</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="RESERVED_PENDING_PAYMENT">PENDING PAYMENT</option>
                <option value="CHECKED_IN">CHECKED IN</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === "bookings" && (
          <div className="bg-[#2E2A7A]/30 border border-[#B9B2F0]/20 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-200">
                <thead className="bg-[#1C1A4A] text-xs font-semibold uppercase text-[#B9B2F0] tracking-wider border-b border-[#2E2A7A]">
                  <tr>
                    <th className="py-4 px-6">Reference</th>
                    <th className="py-4 px-6">Guest / Customer</th>
                    <th className="py-4 px-6">Package</th>
                    <th className="py-4 px-6">Visit Date</th>
                    <th className="py-4 px-6">Guests</th>
                    <th className="py-4 px-6">Amount (BDT)</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2E2A7A]/50 font-mono text-xs">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-[#B9B2F0] font-sans">
                        No bookings matching the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#2E2A7A]/40 transition-colors">
                        <td className="py-4 px-6 font-bold text-[#FFC93C]">
                          {b.bookingReference}
                        </td>
                        <td className="py-4 px-6 font-sans">
                          <div className="font-semibold text-white">{b.customer?.fullName}</div>
                          <div className="text-xs text-[#B9B2F0]">{b.customer?.phone}</div>
                        </td>
                        <td className="py-4 px-6 font-sans text-slate-300">
                          {b.packageTitleEn}
                        </td>
                        <td className="py-4 px-6 text-slate-300">
                          {b.visitDate}
                        </td>
                        <td className="py-4 px-6 font-sans text-slate-300">
                          {b.pricing.adultCount}A + {b.pricing.childCount}C
                        </td>
                        <td className="py-4 px-6 font-bold text-[#FFC93C]">
                          ৳{b.pricing.finalPayableBDT.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 font-sans">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                              b.bookingStatus === "CONFIRMED"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : b.bookingStatus === "CHECKED_IN"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                                : b.bookingStatus === "CANCELLED"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                : "bg-amber-500/20 text-[#FFC93C] border border-amber-500/40"
                            }`}
                          >
                            {b.bookingStatus}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-sans space-x-1">
                          {b.bookingStatus === "CONFIRMED" && (
                            <button
                              disabled={updatingId === b.id}
                              onClick={() => handleUpdateStatus(b.id, "CHECKED_IN")}
                              className="px-2.5 py-1 rounded bg-[#2E2A7A] hover:bg-[#1C1A4A] text-[#FFC93C] border border-[#FFC93C]/40 text-xs font-semibold transition-colors disabled:opacity-50"
                              title="Turnstile check-in"
                            >
                              Check In
                            </button>
                          )}
                          {b.bookingStatus === "RESERVED_PENDING_PAYMENT" && (
                            <button
                              disabled={updatingId === b.id}
                              onClick={() => handleUpdateStatus(b.id, "CONFIRMED")}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                            >
                              Confirm Paid
                            </button>
                          )}
                          <Link
                            href={`/booking/confirmation/${b.bookingReference}`}
                            target="_blank"
                            className="px-2.5 py-1 rounded bg-[#1C1A4A] hover:bg-[#2E2A7A] text-[#B9B2F0] hover:text-white text-xs font-semibold transition-colors inline-block border border-[#B9B2F0]/20"
                          >
                            Pass
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Group & Corporate Inquiries */}
        {activeTab === "inquiries" && (
          <div className="bg-[#2E2A7A]/30 border border-[#B9B2F0]/20 rounded-2xl overflow-hidden shadow-xl p-6">
            {inquiries.length === 0 ? (
              <p className="text-center text-[#B9B2F0] py-8">No group inquiries recorded yet.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {inquiries.map((inq: any) => (
                  <div key={inq.id} className="p-5 rounded-xl bg-[#1C1A4A] border border-[#2E2A7A] space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#FFC93C] uppercase tracking-wider">
                          {inq.event_type}
                        </span>
                        <h3 className="text-lg font-bold text-white">{inq.organization_name}</h3>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2E2A7A] text-[#B9B2F0] border border-[#B9B2F0]/20">
                        {inq.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <div>
                        <span className="text-[#B9B2F0] block">Contact:</span>
                        <span className="text-white font-medium">{inq.contact_person}</span>
                      </div>
                      <div>
                        <span className="text-[#B9B2F0] block">Phone:</span>
                        <span className="text-white font-medium">{inq.phone}</span>
                      </div>
                      <div>
                        <span className="text-[#B9B2F0] block">Guests:</span>
                        <span className="text-white font-medium">{inq.estimated_guests || "TBD"}</span>
                      </div>
                      <div>
                        <span className="text-[#B9B2F0] block">Target Date:</span>
                        <span className="text-white font-medium">{inq.target_date || "Flexible"}</span>
                      </div>
                    </div>

                    {inq.requirements && (
                      <div className="pt-2 border-t border-[#2E2A7A] text-xs text-slate-300">
                        <span className="text-[#B9B2F0] block">Notes & Requirements:</span>
                        {inq.requirements}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Contact Messages */}
        {activeTab === "contacts" && (
          <div className="bg-[#2E2A7A]/30 border border-[#B9B2F0]/20 rounded-2xl overflow-hidden shadow-xl p-6">
            {contacts.length === 0 ? (
              <p className="text-center text-[#B9B2F0] py-8">No visitor inquiries recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((msg: any) => (
                  <div key={msg.id} className="p-5 rounded-xl bg-[#1C1A4A] border border-[#2E2A7A] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-sm">{msg.full_name}</div>
                      <span className="text-xs text-[#B9B2F0]">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-4">
                      <span>Email: {msg.email}</span>
                      {msg.phone && <span>Phone: {msg.phone}</span>}
                    </div>
                    <p className="text-sm text-slate-200 pt-2 border-t border-[#2E2A7A]">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
