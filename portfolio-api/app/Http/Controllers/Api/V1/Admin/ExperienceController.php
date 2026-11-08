<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExperienceStoreRequest;
use App\Models\Experience;
use App\Http\Resources\ExperienceResource;
use Illuminate\Http\JsonResponse;

class ExperienceController extends Controller
{
    public function index(): JsonResponse
    {
        $experiences = Experience::orderBy('sort_order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => ExperienceResource::collection($experiences),
        ]);
    }

    public function store(ExperienceStoreRequest $request): JsonResponse
    {
        $validated = $request->validated();
        if (!isset($validated['sort_order'])) {
            $validated['sort_order'] = Experience::count();
        }

        $experience = Experience::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Experience record created successfully.',
            'data' => new ExperienceResource($experience),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $experience = Experience::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new ExperienceResource($experience),
        ]);
    }

    public function update(ExperienceStoreRequest $request, int $id): JsonResponse
    {
        $experience = Experience::findOrFail($id);
        $experience->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Experience record updated successfully.',
            'data' => new ExperienceResource($experience),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();

        return response()->json([
            'success' => true,
            'message' => 'Experience record deleted successfully.',
        ]);
    }
}
