<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->cascadeOnDelete();
            $table->foreignId('ticket_addon_id')->nullable()->constrained('ticket_addons')->nullOnDelete();
            $table->string('item_type'); // package_adult, package_child, addon
            $table->string('name_en');
            $table->string('name_bn');
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price_bdt', 10, 2);
            $table->decimal('total_price_bdt', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_items');
    }
};

