<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InitiatePaymentRequest;
use App\Http\Requests\PaymentCallbackRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    public function __construct(
        protected PaymentService $paymentService
    ) {}

    public function initiate(InitiatePaymentRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $booking = Booking::where('booking_reference', strtoupper(trim($validated['booking_reference'])))
            ->first();

        if (!$booking) {
            return response()->json([
                'success' => false,
                'error' => 'Booking reference not found.',
            ], 404);
        }

        try {
            $result = $this->paymentService->initiatePayment($booking, $validated['payment_method']);

            return response()->json([
                'success' => true,
                'gateway' => $result['gateway'],
                'isSandbox' => $result['is_sandbox'] ?? false,
                'redirectUrl' => $result['redirect_url'],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function callback(PaymentCallbackRequest $request): JsonResponse
    {
        $validated = $request->validated();

        try {
            $booking = $this->paymentService->handleCallback(
                $validated['booking_reference'],
                $validated['status'],
                $validated['transaction_id'] ?? null,
                $request->all()
            );

            return response()->json([
                'success' => true,
                'booking' => new BookingResource($booking),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

