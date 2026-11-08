<?php

namespace App\Jobs;

use App\Models\Booking;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendBookingConfirmationJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Booking $booking
    ) {}

    public function handle(): void
    {
        Log::info("Sending digital ticket confirmation for Booking [{$this->booking->booking_reference}] to Customer [{$this->booking->customer->email}]");
        
        // Asynchronous notification delivery (email / SMS gateway dispatch) occurs here
    }
}

