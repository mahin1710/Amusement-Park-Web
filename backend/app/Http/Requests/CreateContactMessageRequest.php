<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateContactMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:2000',
        ];
    }
}

