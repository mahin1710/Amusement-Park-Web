<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InitiatePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('bookingReference') && !$this->has('booking_reference')) {
            $this->merge(['booking_reference' => $this->input('bookingReference')]);
        }
        if ($this->has('paymentMethod') && !$this->has('payment_method')) {
            $this->merge(['payment_method' => $this->input('paymentMethod')]);
        }
    }

    public function rules(): array
    {
        return [
            'booking_reference' => 'required|string',
            'payment_method' => 'required|string|in:sslcommerz,bkash,nagad,pay_at_gate',
        ];
    }
}

