<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\PaymentTransaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentService
{
    /**
     * Initiate payment session based on configured provider
     */
    public function initiatePayment(Booking $booking, string $gateway): array
    {
        // 1. Pay at Gate option
        if ($gateway === 'pay_at_gate') {
            $booking->update([
                'payment_method' => 'pay_at_gate',
                'payment_status' => 'PENDING',
                'booking_status' => 'RESERVED_PENDING_PAYMENT',
            ]);

            return [
                'success' => true,
                'gateway' => 'pay_at_gate',
                'is_sandbox' => false,
                'redirect_url' => "/booking/confirmation/{$booking->booking_reference}?method=pay_at_gate",
            ];
        }

        // 2. Check Sandbox / Demo mode
        $mode = config('services.payment.mode', env('PAYMENT_GATEWAY_MODE', 'sandbox'));
        if ($mode === 'sandbox') {
            $sandboxUrl = "/booking/sandbox-gateway?ref=" . urlencode($booking->booking_reference) .
                "&method=" . urlencode($gateway) .
                "&amount=" . $booking->final_payable_bdt;

            return [
                'success' => true,
                'gateway' => $gateway,
                'is_sandbox' => true,
                'redirect_url' => $sandboxUrl,
            ];
        }

        // 3. Production Gateway Architecture (SSLCommerz / bKash)
        if ($gateway === 'sslcommerz') {
            $storeId = env('SSLCOMMERZ_STORE_ID');
            $storePassword = env('SSLCOMMERZ_STORE_PASSWORD');

            if (!$storeId || !$storePassword || str_contains($storeId, 'placeholder')) {
                throw new \RuntimeException("Payment Gateway Credentials Pending: Production SSLCommerz merchant ID is not yet configured in environment variables.");
            }

            // Real server-to-server SSLCommerz initialization would proceed here
        }

        throw new \RuntimeException("Requested payment provider [{$gateway}] is awaiting live verification.");
    }

    /**
     * Handle payment notification callback / IPN verification
     */
    public function handleCallback(string $bookingReference, string $status, ?string $transactionId = null, ?array $payload = null): Booking
    {
        return DB::transaction(function () use ($bookingReference, $status, $transactionId, $payload) {
            $booking = Booking::where('booking_reference', strtoupper(trim($bookingReference)))
                ->firstOrFail();

            $cleanStatus = strtoupper($status);
            $txnId = $transactionId ?: ('TXN_' . strtoupper(Str::random(10)));

            if ($cleanStatus === 'SUCCESS') {
                $booking->update([
                    'payment_status' => 'SUCCESS',
                    'booking_status' => 'CONFIRMED',
                ]);

                PaymentTransaction::create([
                    'booking_id' => $booking->id,
                    'transaction_reference' => $txnId,
                    'gateway' => $booking->payment_method,
                    'status' => 'SUCCESS',
                    'amount_bdt' => $booking->final_payable_bdt,
                    'currency' => 'BDT',
                    'gateway_transaction_ref' => $payload['val_id'] ?? ('VAL_' . Str::random(8)),
                    'gateway_payload' => $payload,
                    'paid_at' => now(),
                ]);
            } elseif ($cleanStatus === 'FAILED') {
                $booking->update([
                    'payment_status' => 'FAILED',
                    'booking_status' => 'CANCELLED',
                ]);

                PaymentTransaction::create([
                    'booking_id' => $booking->id,
                    'transaction_reference' => $txnId,
                    'gateway' => $booking->payment_method,
                    'status' => 'FAILED',
                    'amount_bdt' => $booking->final_payable_bdt,
                    'currency' => 'BDT',
                    'gateway_payload' => $payload,
                ]);
            } else {
                $booking->update([
                    'payment_status' => 'CANCELLED',
                ]);
            }

            return $booking->fresh(['customer', 'package', 'items', 'transactions']);
        });
    }
}

