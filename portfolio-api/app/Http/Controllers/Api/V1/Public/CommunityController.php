<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\CommunityActivity;
use App\Http\Resources\CommunityActivityResource;
use Illuminate\Http\JsonResponse;

class CommunityController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $activities = CommunityActivity::published()->get();

        return response()->json([
            'success' => true,
            'message' => 'Community activities retrieved successfully.',
            'data' => CommunityActivityResource::collection($activities),
        ]);
    }
}
