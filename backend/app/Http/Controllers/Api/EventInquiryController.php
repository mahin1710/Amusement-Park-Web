<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateEventInquiryRequest;
use App\Models\EventInquiry;
use Illuminate\Http\JsonResponse;

class EventInquiryController extends Controller
{
    public function store(CreateEventInquiryRequest $request): JsonResponse
    {
        $inquiry = EventInquiry::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Your group inquiry has been recorded. Our team will contact you within 24 hours.',
            'id' => $inquiry->id,
        ], 201);
    }
}

