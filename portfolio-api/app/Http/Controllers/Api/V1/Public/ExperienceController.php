<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Http\Resources\ExperienceResource;
use Illuminate\Http\JsonResponse;

class ExperienceController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $experiences = Experience::published()->get();

        return response()->json([
            'success' => true,
            'message' => 'Experiences retrieved successfully.',
            'data' => ExperienceResource::collection($experiences),
        ]);
    }
}
