<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('professional_title')->nullable();
            $table->string('headline')->nullable();
            $table->text('short_bio')->nullable();
            $table->longText('medium_bio')->nullable();
            $table->longText('extended_bio')->nullable();
            $table->string('location')->nullable();
            $table->string('email')->nullable();
            $table->string('phone1')->nullable();
            $table->string('phone2')->nullable();
            $table->string('github_url')->nullable();
            $table->string('portfolio_url')->nullable();
            $table->string('profile_image_url')->nullable();
            $table->json('roles')->nullable();
            $table->string('availability_status')->default('Available for Strategic Collaborations');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
