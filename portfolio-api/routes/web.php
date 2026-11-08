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
