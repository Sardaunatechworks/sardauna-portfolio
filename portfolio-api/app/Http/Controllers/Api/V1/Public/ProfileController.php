<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $profile = Profile::first();

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile information not found.',
                'data' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Profile retrieved successfully.',
            'data' => new ProfileResource($profile),
        ]);
    }
}
