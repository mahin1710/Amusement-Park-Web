<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketPackageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->package_key,
            'slug' => $this->slug,
            'title' => [
                'en' => $this->title_en,
                'bn' => $this->title_bn,
            ],
            'subtitle' => [
                'en' => $this->subtitle_en,
                'bn' => $this->subtitle_bn,
            ],
            'description' => [
                'en' => $this->description_en,
                'bn' => $this->description_bn,
            ],
            'badge' => $this->badge_en ? [
                'en' => $this->badge_en,
                'bn' => $this->badge_bn,
            ] : null,
            'isPopular' => $this->is_popular,
            'includedZones' => $this->included_zones ?? [],
            'pricing' => [
                'isPlaceholder' => $this->is_placeholder_pricing,
                'adultPriceBDT' => $this->adult_price_bdt,
                'childPriceBDT' => $this->child_price_bdt,
                'currencySymbol' => '৳',
                'note' => [
                    'en' => '[Placeholder Tariff - Subject to Final Approval]',
                    'bn' => '[খসড়া মূল্যতালিকা - চূড়ান্ত ঘোষণার সাপেক্ষ]',
                ],
            ],
            'perks' => [
                'en' => $this->perks_en ?? [],
                'bn' => $this->perks_bn ?? [],
            ],
            'validity' => [
                'en' => $this->validity_en,
                'bn' => $this->validity_bn,
            ],
            'availabilityStatus' => $this->availability_status,
            'minGuests' => $this->min_guests,
            'maxGuests' => $this->max_guests,
        ];
    }
}

