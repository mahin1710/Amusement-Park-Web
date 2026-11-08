<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_reference')->unique()->index(); // e.g. MI-202611-XXXX
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->foreignId('ticket_package_id')->constrained('ticket_packages')->cascadeOnDelete();
            $table->date('visit_date')->index();
            $table->integer('adult_count')->default(1);
            $table->integer('child_count')->default(0);
            
            // Financials
            $table->decimal('package_price_adult', 10, 2);
            $table->decimal('package_price_child', 10, 2);
            $table->decimal('package_subtotal', 10, 2);
            $table->decimal('addons_total', 10, 2)->default(0);
            $table->string('applied_promo_code')->nullable();
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->decimal('vat_percentage', 5, 2)->default(5.00);
            $table->decimal('vat_amount', 10, 2)->default(0);
            $table->decimal('final_payable_bdt', 10, 2);
            
            // Status
            $table->string('booking_status')->default('RESERVED_PENDING_PAYMENT')->index(); // CONFIRMED, RESERVED_PENDING_PAYMENT, CANCELLED, EXPIRED, CHECKED_IN
            $table->string('payment_method')->default('sslcommerz'); // sslcommerz, bkash, nagad, pay_at_gate
            $table->string('payment_status')->default('PENDING')->index(); // PENDING, INITIATED, SUCCESS, FAILED, CANCELLED
            
            $table->text('ticket_qr_payload')->nullable();
            $table->text('special_requests')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};

