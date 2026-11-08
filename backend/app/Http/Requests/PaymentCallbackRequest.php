<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentCallbackRequest extends FormRequest
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
        if ($this->has('transactionId') && !$this->has('transaction_id')) {
            $this->merge(['transaction_id' => $this->input('transactionId')]);
        }
    }

    public function rules(): array
    {
        return [
            'booking_reference' => 'required|string',
            'status' => 'required|string|in:SUCCESS,FAILED,CANCELLED,success,failed,cancelled',
            'transaction_id' => 'nullable|string',
        ];
    }
}

