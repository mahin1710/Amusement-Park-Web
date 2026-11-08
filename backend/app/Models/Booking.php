<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_reference',
        'customer_id',
        'ticket_package_id',
        'visit_date',
        'adult_count',
        'child_count',
        'package_price_adult',
        'package_price_child',
        'package_subtotal',
        'addons_total',
        'applied_promo_code',
        'discount_amount',
        'vat_percentage',
        'vat_amount',
        'final_payable_bdt',
        'booking_status',
        'payment_method',
        'payment_status',
        'ticket_qr_payload',
        'special_requests',
    ];

    protected function casts(): array
    {
        return [
            'visit_date' => 'date',
            'adult_count' => 'integer',
            'child_count' => 'integer',
            'package_price_adult' => 'float',
            'package_price_child' => 'float',
            'package_subtotal' => 'float',
            'addons_total' => 'float',
            'discount_amount' => 'float',
            'vat_percentage' => 'float',
            'vat_amount' => 'float',
            'final_payable_bdt' => 'float',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(TicketPackage::class, 'ticket_package_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(BookingItem::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(PaymentTransaction::class);
    }
}

