<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ticket_packages', function (Blueprint $table) {
            $table->id();
            $table->string('package_key')->unique(); // e.g. pkg_super_all_access
            $table->string('slug')->unique();
            $table->string('title_en');
            $table->string('title_bn');
            $table->string('subtitle_en')->nullable();
            $table->string('subtitle_bn')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_bn')->nullable();
            $table->string('badge_en')->nullable();
            $table->string('badge_bn')->nullable();
            $table->boolean('is_popular')->default(false);
            $table->json('included_zones');
            $table->decimal('adult_price_bdt', 10, 2);
            $table->decimal('child_price_bdt', 10, 2);
            $table->boolean('is_placeholder_pricing')->default(true);
            $table->json('perks_en')->nullable();
            $table->json('perks_bn')->nullable();
            $table->string('validity_en')->nullable();
            $table->string('validity_bn')->nullable();
            $table->string('availability_status')->default('AVAILABLE'); // AVAILABLE, LIMITED, PRE_REGISTRATION
            $table->integer('min_guests')->default(1);
            $table->integer('max_guests')->default(20);
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticket_packages');
    }
};

