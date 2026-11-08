import { PaymentMethod, PaymentStatus } from "@/config/payment";
import { ZoneType } from "@/config/booking";

export type BookingStatus = "CONFIRMED" | "RESERVED_PENDING_PAYMENT" | "CANCELLED" | "EXPIRED" | "CHECKED_IN";

export interface BookingCustomer {
  fullName: string;
  phone: string;
  email: string;
  specialRequests?: string;
}

export interface BookingPricingSnapshot {
  currency: string;
  packagePriceAdult: number;
  packagePriceChild: number;
  adultCount: number;
  childCount: number;
  baseAdultTotal: number;
  baseChildTotal: number;
  packageSubtotal: number;
  addOnsTotal: number;
  appliedPromoCode: string | null;
  discountAmount: number;
  vatAmount: number;
  finalPayableBDT: number;
  isPlaceholderRate: boolean;
}

export interface BookingRecord {
  id: string;
  bookingReference: string; // e.g. "MI-202611-7392"
  packageId: string;
  packageTitleEn: string;
  packageTitleBn: string;
  includedZones: ZoneType[];
  visitDate: string; // "YYYY-MM-DD"
  customer: BookingCustomer;
  selectedAddOns: {
    id: string;
    nameEn: string;
    nameBn: string;
    priceBDT: number;
  }[];
  pricing: BookingPricingSnapshot;
  payment: {
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
    gatewayTransactionRef?: string;
    paymentUrl?: string;
    paidAt?: string;
  };
  bookingStatus: BookingStatus;
  ticketQrPayload: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  packageId: string;
  visitDate: string;
  adults: number;
  children: number;
  selectedAddOnIds: string[];
  promoCode?: string;
  customer: BookingCustomer;
  paymentMethod: PaymentMethod;
}

