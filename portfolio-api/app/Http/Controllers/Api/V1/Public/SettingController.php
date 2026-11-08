<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $publicSettings = SiteSetting::where('is_public', true)
            ->pluck('setting_value', 'setting_key');

        return response()->json([
            'success' => true,
            'message' => 'Settings retrieved successfully.',
            'data' => $publicSettings,
        ]);
    }
}
