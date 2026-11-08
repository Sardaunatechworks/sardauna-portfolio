<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Http\Resources\SkillResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SkillController extends Controller
{
    public function index(): JsonResponse
    {
        $skills = Skill::orderBy('sort_order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => SkillResource::collection($skills),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'category' => ['nullable', 'string', 'max:100'],
        ]);

        $sortOrder = Skill::count();
        $skill = Skill::create([
            'name' => trim($validated['name']),
            'category' => $validated['category'] ?? 'Engineering',
            'sort_order' => $sortOrder,
            'is_published' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Skill added successfully.',
            'data' => new SkillResource($skill),
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();

        return response()->json([
            'success' => true,
            'message' => 'Skill deleted successfully.',
        ]);
    }
}
