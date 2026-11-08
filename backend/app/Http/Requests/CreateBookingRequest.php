<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'package_id' => 'required',
            'visit_date' => 'required|date|after_or_equal:today',
            'adults' => 'required|integer|min:1|max:20',
            'children' => 'nullable|integer|min:0|max:10',
            'addon_ids' => 'nullable|array',
            'addon_ids.*' => 'string',
            'promo_code' => 'nullable|string|max:50',
            'customer' => 'required|array',
            'customer.full_name' => 'required|string|min:2|max:100',
            'customer.phone' => 'required|string|min:10|max:20',
            'customer.email' => 'required|email|max:150',
            'customer.special_requests' => 'nullable|string|max:500',
            'payment_method' => 'required|string|in:sslcommerz,bkash,nagad,pay_at_gate',
        ];
    }
}

