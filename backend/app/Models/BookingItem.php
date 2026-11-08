<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'ticket_addon_id',
        'item_type',
        'name_en',
        'name_bn',
        'quantity',
        'unit_price_bdt',
        'total_price_bdt',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'unit_price_bdt' => 'float',
            'total_price_bdt' => 'float',
        ];
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function addon(): BelongsTo
    {
        return $this->belongsTo(TicketAddon::class, 'ticket_addon_id');
    }
}

