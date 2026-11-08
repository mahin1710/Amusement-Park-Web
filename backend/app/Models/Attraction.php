<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attraction extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'zone',
        'category',
        'thrill_level',
        'thrill_level_bn',
        'height_requirement',
        'height_requirement_bn',
        'name_en',
        'name_bn',
        'tagline_en',
        'tagline_bn',
        'description_en',
        'description_bn',
        'features_en',
        'features_bn',
        'image_url',
        'is_signature',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'features_en' => 'array',
            'features_bn' => 'array',
            'is_signature' => 'boolean',
            'is_active' => 'boolean',
        ];
    }
}

