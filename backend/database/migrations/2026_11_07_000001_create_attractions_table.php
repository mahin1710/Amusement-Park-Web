<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attractions', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('zone')->index(); // water-park, dino-zone, amusement-park
            $table->string('category')->default('thrill');
            $table->string('thrill_level')->default('Moderate');
            $table->string('thrill_level_bn')->default('মাঝারি');
            $table->string('height_requirement')->nullable();
            $table->string('height_requirement_bn')->nullable();
            $table->string('name_en');
            $table->string('name_bn');
            $table->string('tagline_en')->nullable();
            $table->string('tagline_bn')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_bn')->nullable();
            $table->json('features_en')->nullable();
            $table->json('features_bn')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_signature')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attractions');
    }
};

