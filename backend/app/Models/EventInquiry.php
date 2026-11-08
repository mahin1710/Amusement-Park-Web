<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventInquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_type',
        'organization_name',
        'contact_person',
        'phone',
        'email',
        'estimated_guests',
        'target_date',
        'requirements',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'estimated_guests' => 'integer',
            'target_date' => 'date',
        ];
    }
}

