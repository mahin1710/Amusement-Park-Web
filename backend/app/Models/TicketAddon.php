<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketAddon extends Model
{
    use HasFactory;

    protected $fillable = [
        'addon_key',
        'name_en',
        'name_bn',
        'description_en',
        'description_bn',
        'price_bdt',
        'per_person',
        'category',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'per_person' => 'boolean',
            'is_active' => 'boolean',
            'price_bdt' => 'float',
        ];
    }
}

