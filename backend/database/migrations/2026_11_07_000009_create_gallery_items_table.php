<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('category')->index(); // water, dino, amusement, night
            $table->string('title_en');
            $table->string('title_bn');
            $table->text('caption_en')->nullable();
            $table->text('caption_bn')->nullable();
            $table->string('image_url');
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_items');
    }
};

