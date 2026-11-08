<?php

namespace App\Services;

use App\Models\TicketPackage;
use App\Models\TicketAddon;
use App\Models\PromoCode;

class PricingService
{
    public const VAT_PERCENTAGE = 5.00;

    /**
     * Compute authoritative server-side pricing breakdown
     */
    public function calculate(
        TicketPackage $package,
        int $adults,
        int $children,
        array $addonIds = [],
        ?string $promoCode = null
    ): array {
        $safeAdults = max(1, $adults);
        $safeChildren = max(0, $children);

        $baseAdultTotal = $safeAdults * $package->adult_price_bdt;
        $baseChildTotal = $safeChildren * $package->child_price_bdt;
        $packageSubtotal = $baseAdultTotal + $baseChildTotal;

        // Addons
        $addonsTotal = 0;
        $resolvedAddons = [];
        if (!empty($addonIds)) {
            $addons = TicketAddon::whereIn('id', $addonIds)
                ->orWhereIn('addon_key', $addonIds)
                ->where('is_active', true)
                ->get();

            foreach ($addons as $addon) {
                $qty = $addon->per_person ? ($safeAdults + $safeChildren) : 1;
                $cost = $qty * $addon->price_bdt;
                $addonsTotal += $cost;

                $resolvedAddons[] = [
                    'addon' => $addon,
                    'quantity' => $qty,
                    'unit_price' => $addon->price_bdt,
                    'total_price' => $cost,
                ];
            }
        }

        $grossTotal = $packageSubtotal + $addonsTotal;

        // Promo Discount
        $discountAmount = 0;
        $appliedCode = null;
        if (!empty($promoCode)) {
            $cleanCode = strtoupper(trim($promoCode));
            $promo = PromoCode::where('code', $cleanCode)
                ->where('is_active', true)
                ->where(function ($q) {
                    $q->whereNull('valid_until')
                      ->orWhere('valid_until', '>=', now()->toDateString());
                })
                ->first();

            if ($promo) {
                $appliedCode = $promo->code;
                $rawDiscount = ($grossTotal * $promo->discount_percentage) / 100;
                $discountAmount = min($rawDiscount, $promo->max_discount_bdt);
            }
        }

        $netAfterDiscount = max(0, $grossTotal - $discountAmount);
        $vatAmount = round(($netAfterDiscount * self::VAT_PERCENTAGE) / 100, 2);
        $finalPayableBDT = round($netAfterDiscount + $vatAmount, 2);

        return [
            'adult_count' => $safeAdults,
            'child_count' => $safeChildren,
            'package_price_adult' => $package->adult_price_bdt,
            'package_price_child' => $package->child_price_bdt,
            'base_adult_total' => $baseAdultTotal,
            'base_child_total' => $baseChildTotal,
            'package_subtotal' => $packageSubtotal,
            'addons_total' => $addonsTotal,
            'resolved_addons' => $resolvedAddons,
            'gross_total' => $grossTotal,
            'applied_promo_code' => $appliedCode,
            'discount_amount' => $discountAmount,
            'vat_percentage' => self::VAT_PERCENTAGE,
            'vat_amount' => $vatAmount,
            'final_payable_bdt' => $finalPayableBDT,
        ];
    }
}

