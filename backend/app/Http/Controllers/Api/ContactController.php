<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateContactMessageRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function store(CreateContactMessageRequest $request): JsonResponse
    {
        $message = ContactMessage::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Thank you for contacting Magic Island. We will respond shortly.',
            'id' => $message->id,
        ], 201);
    }
}

