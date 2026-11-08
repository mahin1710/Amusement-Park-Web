<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'discount_percentage',
        'max_discount_bdt',
        'description_en',
        'description_bn',
        'valid_until',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'discount_percentage' => 'float',
            'max_discount_bdt' => 'float',
            'is_active' => 'boolean',
            'valid_until' => 'date',
        ];
    }
}

