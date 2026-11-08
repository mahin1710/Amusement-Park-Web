<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'bookingReference' => $this->booking_reference,
            'packageId' => $this->package ? $this->package->package_key : null,
            'packageTitleEn' => $this->package ? $this->package->title_en : null,
            'packageTitleBn' => $this->package ? $this->package->title_bn : null,
            'includedZones' => $this->package ? $this->package->included_zones : [],
            'visitDate' => $this->visit_date ? $this->visit_date->format('Y-m-d') : null,
            'customer' => [
                'fullName' => $this->customer ? $this->customer->full_name : null,
                'phone' => $this->customer ? $this->customer->phone : null,
                'email' => $this->customer ? $this->customer->email : null,
                'specialRequests' => $this->special_requests,
            ],
            'selectedAddOns' => $this->items->where('item_type', 'addon')->map(function ($item) {
                return [
                    'id' => $item->addon ? $item->addon->addon_key : (string) $item->ticket_addon_id,
                    'nameEn' => $item->name_en,
                    'nameBn' => $item->name_bn,
                    'priceBDT' => $item->unit_price_bdt,
                    'quantity' => $item->quantity,
                    'totalPriceBDT' => $item->total_price_bdt,
                ];
            })->values(),
            'pricing' => [
                'currency' => 'BDT',
                'packagePriceAdult' => $this->package_price_adult,
                'packagePriceChild' => $this->package_price_child,
                'adultCount' => $this->adult_count,
                'childCount' => $this->child_count,
                'baseAdultTotal' => $this->adult_count * $this->package_price_adult,
                'baseChildTotal' => $this->child_count * $this->package_price_child,
                'packageSubtotal' => $this->package_subtotal,
                'addOnsTotal' => $this->addons_total,
                'appliedPromoCode' => $this->applied_promo_code,
                'discountAmount' => $this->discount_amount,
                'vatPercentage' => $this->vat_percentage,
                'vatAmount' => $this->vat_amount,
                'finalPayableBDT' => $this->final_payable_bdt,
                'isPlaceholderRate' => true,
            ],
            'payment' => [
                'method' => $this->payment_method,
                'status' => $this->payment_status,
                'transactionId' => $this->transactions->first()?->transaction_reference,
                'gatewayTransactionRef' => $this->transactions->first()?->gateway_transaction_ref,
                'paidAt' => $this->transactions->first()?->paid_at?->toISOString(),
            ],
            'bookingStatus' => $this->booking_status,
            'ticketQrPayload' => $this->ticket_qr_payload,
            'createdAt' => $this->created_at?->toISOString(),
            'updatedAt' => $this->updated_at?->toISOString(),
        ];
    }
}

