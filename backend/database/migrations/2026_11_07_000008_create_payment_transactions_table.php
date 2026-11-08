<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->cascadeOnDelete();
            $table->string('transaction_reference')->unique()->index();
            $table->string('gateway'); // sslcommerz, bkash, nagad, pay_at_gate
            $table->string('status')->default('INITIATED')->index(); // INITIATED, SUCCESS, FAILED, CANCELLED
            $table->decimal('amount_bdt', 10, 2);
            $table->string('currency', 3)->default('BDT');
            $table->string('gateway_transaction_ref')->nullable()->index();
            $table->json('gateway_payload')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_transactions');
    }
};

