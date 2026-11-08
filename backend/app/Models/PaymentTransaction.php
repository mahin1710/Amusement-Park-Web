<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'transaction_reference',
        'gateway',
        'status',
        'amount_bdt',
        'currency',
        'gateway_transaction_ref',
        'gateway_payload',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'amount_bdt' => 'float',
            'gateway_payload' => 'array',
            'paid_at' => 'datetime',
        ];
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}

