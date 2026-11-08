<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttractionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->slug,
            'name' => [
                'en' => $this->name_en,
                'bn' => $this->name_bn,
            ],
            'zone' => $this->zone,
            'category' => $this->category,
            'thrillLevel' => $this->thrill_level,
            'thrillLevelBn' => $this->thrill_level_bn,
            'heightRequirement' => $this->height_requirement,
            'heightRequirementBn' => $this->height_requirement_bn,
            'tagline' => [
                'en' => $this->tagline_en,
                'bn' => $this->tagline_bn,
            ],
            'description' => [
                'en' => $this->description_en,
                'bn' => $this->description_bn,
            ],
            'features' => [
                'en' => $this->features_en ?? [],
                'bn' => $this->features_bn ?? [],
            ],
            'imageUrl' => $this->image_url,
            'isSignature' => $this->is_signature,
        ];
    }
}

