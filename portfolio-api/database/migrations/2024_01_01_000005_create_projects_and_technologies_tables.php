<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('tagline')->nullable();
            $table->string('category')->default('Business Technology');
            $table->longText('overview');
            $table->longText('problem_statement')->nullable();
            $table->longText('solution')->nullable();
            $table->string('role')->default('Founder & Lead Developer');
            $table->string('project_status')->default('In Development'); // 'Live' | 'In Development'
            $table->string('project_type')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('live_url')->nullable();
            $table->string('repository_url')->nullable();
            $table->json('tech_list')->nullable(); // Denormalized list for high-speed client responses
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['is_published', 'sort_order']);
            $table->index('slug');
        });

        Schema::create('project_technology', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('technology_id')->constrained()->cascadeOnDelete();
            $table->unique(['project_id', 'technology_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_technology');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('technologies');
    }
};
