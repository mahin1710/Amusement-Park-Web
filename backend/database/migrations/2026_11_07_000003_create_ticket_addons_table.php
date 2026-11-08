<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ticket_addons', function (Blueprint $table) {
            $table->id();
            $table->string('addon_key')->unique(); // e.g. addon_locker
            $table->string('name_en');
            $table->string('name_bn');
            $table->text('description_en')->nullable();
            $table->text('description_bn')->nullable();
            $table->decimal('price_bdt', 10, 2);
            $table->boolean('per_person')->default(false);
            $table->string('category')->default('facility'); // facility, food, vip, activity
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticket_addons');
    }
};

