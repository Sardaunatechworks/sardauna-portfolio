<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectStoreRequest;
use App\Models\Project;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::orderBy('sort_order', 'asc')->with('technologies')->get();

        return response()->json([
            'success' => true,
            'data' => ProjectResource::collection($projects),
        ]);
    }

    public function store(ProjectStoreRequest $request): JsonResponse
    {
        $validated = $request->validated();
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        if (!isset($validated['sort_order'])) {
            $validated['sort_order'] = Project::count();
        }

        $project = Project::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully.',
            'data' => new ProjectResource($project),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $project = Project::with('technologies')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new ProjectResource($project),
        ]);
    }

    public function update(ProjectStoreRequest $request, int $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $validated = $request->validated();

        if (empty($validated['slug']) && $project->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $project->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully.',
            'data' => new ProjectResource($project),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully.',
        ]);
    }
}
