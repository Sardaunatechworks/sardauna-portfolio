<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'service' => 'Muhammad Auwal Abubakar Portfolio REST API',
        'version' => '1.0.0',
        'framework' => 'Laravel 13 / PHP 8.3+',
        'status' => 'healthy',
        'documentation' => '/api/v1/projects',
    ]);
});

Route::get('/up', function () {
    return response()->json(['status' => 'up']);
});

// Fallback to serve public storage files even if php artisan storage:link was not executed
Route::get('/storage/{path}', function ($path) {
    if (\Illuminate\Support\Facades\Storage::disk('public')->exists($path)) {
        return \Illuminate\Support\Facades\Storage::disk('public')->response($path);
    }
    abort(404);
})->where('path', '.*');
