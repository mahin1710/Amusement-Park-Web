<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketAddonResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->addon_key,
            'name' => [
                'en' => $this->name_en,
                'bn' => $this->name_bn,
            ],
            'description' => [
                'en' => $this->description_en,
                'bn' => $this->description_bn,
            ],
            'priceBDT' => $this->price_bdt,
            'isPlaceholder' => true,
            'perPerson' => $this->per_person,
            'category' => $this->category,
        ];
    }
}

