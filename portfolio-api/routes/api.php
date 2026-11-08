<?php

use Illuminate\Support\Facades\Route;

// Public API Endpoints
use App\Http\Controllers\Api\V1\Public\ProfileController as PublicProfileController;
use App\Http\Controllers\Api\V1\Public\ExperienceController as PublicExperienceController;
use App\Http\Controllers\Api\V1\Public\ProjectController as PublicProjectController;
use App\Http\Controllers\Api\V1\Public\SkillController as PublicSkillController;
use App\Http\Controllers\Api\V1\Public\CertificationController as PublicCertificationController;
use App\Http\Controllers\Api\V1\Public\CommunityController as PublicCommunityController;
use App\Http\Controllers\Api\V1\Public\ArticleController as PublicArticleController;
use App\Http\Controllers\Api\V1\Public\ContactController as PublicContactController;
use App\Http\Controllers\Api\V1\Public\SettingController as PublicSettingController;

// Admin API Endpoints
use App\Http\Controllers\Api\V1\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\V1\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\V1\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Api\V1\Admin\ExperienceController as AdminExperienceController;
use App\Http\Controllers\Api\V1\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\V1\Admin\SkillController as AdminSkillController;
use App\Http\Controllers\Api\V1\Admin\CertificationController as AdminCertificationController;
use App\Http\Controllers\Api\V1\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Api\V1\Admin\MediaController as AdminMediaController;

/*
|--------------------------------------------------------------------------
| Public Routes (Mounted under /api/v1/)
|--------------------------------------------------------------------------
*/
Route::get('/profile', PublicProfileController::class);
Route::get('/experiences', PublicExperienceController::class);
Route::get('/projects', [PublicProjectController::class, 'index']);
Route::get('/projects/{slug}', [PublicProjectController::class, 'show']);
Route::get('/skills', PublicSkillController::class);
Route::get('/certifications', PublicCertificationController::class);
Route::get('/community', PublicCommunityController::class);
Route::get('/articles', [PublicArticleController::class, 'index']);
Route::get('/articles/{slug}', [PublicArticleController::class, 'show']);
Route::get('/settings/public', PublicSettingController::class);

// Contact message endpoint with rate limiting
Route::post('/contact', PublicContactController::class)->middleware('throttle:10,1');

/*
|--------------------------------------------------------------------------
| Admin Authentication Routes (Rate-limited)
|--------------------------------------------------------------------------
*/
Route::post('/admin/login', [AdminAuthController::class, 'login'])->middleware('throttle:5,1');

/*
|--------------------------------------------------------------------------
| Protected Admin Routes (Sanctum Authenticated)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    // Current user session & logout
    Route::get('/me', [AdminAuthController::class, 'me']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);

    // Dashboard metrics
    Route::get('/dashboard', AdminDashboardController::class);

    // Profile settings
    Route::get('/profile', [AdminProfileController::class, 'show']);
    Route::put('/profile', [AdminProfileController::class, 'update']);

    // Experiences CRUD
    Route::apiResource('/experiences', AdminExperienceController::class);

    // Projects CRUD
    Route::apiResource('/projects', AdminProjectController::class);

    // Skills CRUD
    Route::get('/skills', [AdminSkillController::class, 'index']);
    Route::post('/skills', [AdminSkillController::class, 'store']);
    Route::delete('/skills/{id}', [AdminSkillController::class, 'destroy']);

    // Certifications CRUD
    Route::apiResource('/certifications', AdminCertificationController::class);

    // Contact messages inbox
    Route::get('/messages', [AdminMessageController::class, 'index']);
    Route::get('/messages/{id}', [AdminMessageController::class, 'show']);
    Route::patch('/messages/{id}/status', [AdminMessageController::class, 'updateStatus']);
    Route::delete('/messages/{id}', [AdminMessageController::class, 'destroy']);

    // Media asset uploads
    Route::post('/media/upload', [AdminMediaController::class, 'upload']);
    Route::delete('/media/{id}', [AdminMediaController::class, 'destroy']);
});
