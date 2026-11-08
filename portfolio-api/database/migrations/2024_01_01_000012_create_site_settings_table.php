<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('setting_key')->unique();
            $table->longText('setting_value')->nullable();
            $table->boolean('is_public')->default(false);
            $table->timestamps();

            $table->index(['setting_key', 'is_public']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
