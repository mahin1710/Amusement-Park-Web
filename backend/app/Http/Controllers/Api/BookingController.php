<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBookingRequest;
use App\Http\Resources\BookingResource;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct(
        protected BookingService $bookingService
    ) {}

    public function store(CreateBookingRequest $request): JsonResponse
    {
        try {
            $booking = $this->bookingService->createBooking($request->validated());

            return response()->json([
                'success' => true,
                'bookingReference' => $booking->booking_reference,
                'booking' => new BookingResource($booking),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage() ?: 'Booking creation failed.',
            ], 500);
        }
    }

    public function show(string $reference): JsonResponse
    {
        $booking = $this->bookingService->findByReference($reference);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'error' => 'Booking reference not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'booking' => new BookingResource($booking),
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $query = $request->query('q', '');

        if (empty(trim($query))) {
            return response()->json([
                'success' => false,
                'error' => "Search query parameter 'q' is required.",
            ], 400);
        }

        $bookings = $this->bookingService->search($query);

        return response()->json([
            'success' => true,
            'results' => BookingResource::collection($bookings),
        ]);
    }
}

