<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('event_type'); // corporate, school, birthday, buyout
            $table->string('organization_name');
            $table->string('contact_person');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->integer('estimated_guests')->default(50);
            $table->date('target_date')->nullable();
            $table->text('requirements')->nullable();
            $table->string('status')->default('PENDING')->index(); // PENDING, CONTACTED, QUOTED, CLOSED
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_inquiries');
    }
};

