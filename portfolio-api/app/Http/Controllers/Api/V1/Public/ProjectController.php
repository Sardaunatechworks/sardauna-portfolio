<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Project::published()->with('technologies');

        if ($category = $request->query('category')) {
            if ($category !== 'All') {
                $query->where('category', $category);
            }
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $projects = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Projects retrieved successfully.',
            'data' => ProjectResource::collection($projects),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $project = Project::published()
            ->with('technologies')
            ->where('slug', $slug)
            ->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => "Project with slug '{$slug}' was not found.",
                'data' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Project retrieved successfully.',
            'data' => new ProjectResource($project),
        ]);
    }
}
