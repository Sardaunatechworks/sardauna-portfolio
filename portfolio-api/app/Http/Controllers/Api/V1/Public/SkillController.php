<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Http\Resources\SkillResource;
use Illuminate\Http\JsonResponse;

class SkillController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $skills = Skill::published()->get();

        return response()->json([
            'success' => true,
            'message' => 'Skills retrieved successfully.',
            'data' => SkillResource::collection($skills),
            'list' => $skills->pluck('name')->all(),
        ]);
    }
}
