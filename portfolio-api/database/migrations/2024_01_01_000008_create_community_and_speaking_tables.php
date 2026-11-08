<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('community_activities', function (Blueprint $table) {
            $table->id();
            $table->string('organization');
            $table->string('role_title');
            $table->string('activity_type')->default('Community Leadership');
            $table->string('title')->nullable();
            $table->text('description');
            $table->json('highlights')->nullable();
            $table->string('period')->nullable();
            $table->boolean('is_current')->default(true);
            $table->string('external_url')->nullable();
            $table->string('cover_image_url')->nullable();
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
        });

        Schema::create('speaking_engagements', function (Blueprint $table) {
            $table->id();
            $table->string('event_name');
            $table->string('session_title');
            $table->string('event_date')->nullable();
            $table->string('event_location')->nullable();
            $table->string('session_format')->default('Keynote');
            $table->text('description')->nullable();
            $table->string('event_url')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('speaking_engagements');
        Schema::dropIfExists('community_activities');
    }
};
