<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BookingItem;
use App\Models\Customer;
use App\Models\TicketPackage;
use App\Models\PaymentTransaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookingService
{
    public function __construct(
        protected PricingService $pricingService
    ) {}

    public function generateReference(): string
    {
        $yearMonth = now()->format('Ym');
        $random = strtoupper(Str::random(4));
        return "MI-{$yearMonth}-{$random}";
    }

    public function createBooking(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            // Find package by ID or Key
            $package = TicketPackage::where('id', $data['package_id'])
                ->orWhere('package_key', $data['package_id'])
                ->firstOrFail();

            // Calculate authoritative pricing
            $pricing = $this->pricingService->calculate(
                $package,
                (int) ($data['adults'] ?? 1),
                (int) ($data['children'] ?? 0),
                $data['addon_ids'] ?? [],
                $data['promo_code'] ?? null
            );

            // Find or create customer
            $customer = Customer::firstOrCreate(
                ['phone' => trim($data['customer']['phone'])],
                [
                    'full_name' => trim($data['customer']['full_name']),
                    'email' => trim($data['customer']['email']),
                    'address' => $data['customer']['address'] ?? null,
                ]
            );

            // Generate unique reference
            $bookingReference = $this->generateReference();
            $paymentMethod = $data['payment_method'] ?? 'sslcommerz';
            $isPayAtGate = $paymentMethod === 'pay_at_gate';

            $booking = Booking::create([
                'booking_reference' => $bookingReference,
                'customer_id' => $customer->id,
                'ticket_package_id' => $package->id,
                'visit_date' => $data['visit_date'],
                'adult_count' => $pricing['adult_count'],
                'child_count' => $pricing['child_count'],
                'package_price_adult' => $pricing['package_price_adult'],
                'package_price_child' => $pricing['package_price_child'],
                'package_subtotal' => $pricing['package_subtotal'],
                'addons_total' => $pricing['addons_total'],
                'applied_promo_code' => $pricing['applied_promo_code'],
                'discount_amount' => $pricing['discount_amount'],
                'vat_percentage' => $pricing['vat_percentage'],
                'vat_amount' => $pricing['vat_amount'],
                'final_payable_bdt' => $pricing['final_payable_bdt'],
                'booking_status' => 'RESERVED_PENDING_PAYMENT',
                'payment_method' => $paymentMethod,
                'payment_status' => $isPayAtGate ? 'PENDING' : 'INITIATED',
                'ticket_qr_payload' => json_encode([
                    'ref' => $bookingReference,
                    'pkg' => $package->slug,
                    'date' => $data['visit_date'],
                    'adults' => $pricing['adult_count'],
                    'children' => $pricing['child_count'],
                    'name' => $customer->full_name,
                ]),
                'special_requests' => $data['customer']['special_requests'] ?? null,
            ]);

            // Create Adult line item
            BookingItem::create([
                'booking_id' => $booking->id,
                'item_type' => 'package_adult',
                'name_en' => "{$package->title_en} (Adult)",
                'name_bn' => "{$package->title_bn} (প্রাপ্তবয়স্ক)",
                'quantity' => $pricing['adult_count'],
                'unit_price_bdt' => $pricing['package_price_adult'],
                'total_price_bdt' => $pricing['base_adult_total'],
            ]);

            // Create Child line item if applicable
            if ($pricing['child_count'] > 0) {
                BookingItem::create([
                    'booking_id' => $booking->id,
                    'item_type' => 'package_child',
                    'name_en' => "{$package->title_en} (Child)",
                    'name_bn' => "{$package->title_bn} (শিশু)",
                    'quantity' => $pricing['child_count'],
                    'unit_price_bdt' => $pricing['package_price_child'],
                    'total_price_bdt' => $pricing['base_child_total'],
                ]);
            }

            // Create Addon line items
            foreach ($pricing['resolved_addons'] as $resAddon) {
                BookingItem::create([
                    'booking_id' => $booking->id,
                    'ticket_addon_id' => $resAddon['addon']->id,
                    'item_type' => 'addon',
                    'name_en' => $resAddon['addon']->name_en,
                    'name_bn' => $resAddon['addon']->name_bn,
                    'quantity' => $resAddon['quantity'],
                    'unit_price_bdt' => $resAddon['unit_price'],
                    'total_price_bdt' => $resAddon['total_price'],
                ]);
            }

            // Create initial transaction record
            PaymentTransaction::create([
                'booking_id' => $booking->id,
                'transaction_reference' => "TXN_" . strtoupper(Str::random(10)),
                'gateway' => $paymentMethod,
                'status' => $isPayAtGate ? 'PENDING' : 'INITIATED',
                'amount_bdt' => $booking->final_payable_bdt,
                'currency' => 'BDT',
            ]);

            return $booking->load(['customer', 'package', 'items', 'transactions']);
        });
    }

    public function findByReference(string $reference): ?Booking
    {
        return Booking::with(['customer', 'package', 'items', 'transactions'])
            ->where('booking_reference', strtoupper(trim($reference)))
            ->first();
    }

    public function search(string $query)
    {
        $q = trim($query);
        return Booking::with(['customer', 'package', 'items', 'transactions'])
            ->where('booking_reference', 'LIKE', "%{$q}%")
            ->orWhereHas('customer', function ($cq) use ($q) {
                $cq->where('phone', 'LIKE', "%{$q}%")
                   ->orWhere('email', 'LIKE', "%{$q}%")
                   ->orWhere('full_name', 'LIKE', "%{$q}%");
            })
            ->latest()
            ->take(20)
            ->get();
    }
}

