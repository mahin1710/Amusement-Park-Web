<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEventInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'event_type' => 'required|string',
            'organization_name' => 'required|string|max:150',
            'contact_person' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:150',
            'estimated_guests' => 'nullable|integer|min:1',
            'target_date' => 'nullable|date',
            'requirements' => 'nullable|string|max:1000',
        ];
    }
}

