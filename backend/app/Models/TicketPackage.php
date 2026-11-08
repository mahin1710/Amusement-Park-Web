<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TicketPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_key',
        'slug',
        'title_en',
        'title_bn',
        'subtitle_en',
        'subtitle_bn',
        'description_en',
        'description_bn',
        'badge_en',
        'badge_bn',
        'is_popular',
        'included_zones',
        'adult_price_bdt',
        'child_price_bdt',
        'is_placeholder_pricing',
        'perks_en',
        'perks_bn',
        'validity_en',
        'validity_bn',
        'availability_status',
        'min_guests',
        'max_guests',
        'is_active',
        'display_order',
    ];

    protected function casts(): array
    {
        return [
            'included_zones' => 'array',
            'perks_en' => 'array',
            'perks_bn' => 'array',
            'is_popular' => 'boolean',
            'is_placeholder_pricing' => 'boolean',
            'is_active' => 'boolean',
            'adult_price_bdt' => 'float',
            'child_price_bdt' => 'float',
        ];
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}

