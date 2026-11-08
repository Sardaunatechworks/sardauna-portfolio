<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Http\Resources\CertificationResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CertificationController extends Controller
{
    public function index(): JsonResponse
    {
        $certifications = Certification::orderBy('sort_order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => CertificationResource::collection($certifications),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'issuer' => ['required', 'string', 'max:255'],
            'date' => ['nullable', 'string', 'max:50'],
            'credential_url' => ['nullable', 'string', 'url'],
        ]);

        $sortOrder = Certification::count();
        $certification = Certification::create([
            'name' => $validated['title'],
            'issuer' => $validated['issuer'],
            'issued_at' => $validated['date'] ?? null,
            'credential_url' => $validated['credential_url'] ?? null,
            'sort_order' => $sortOrder,
            'is_published' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Certification added successfully.',
            'data' => new CertificationResource($certification),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $certification = Certification::findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'issuer' => ['required', 'string', 'max:255'],
            'date' => ['nullable', 'string', 'max:50'],
            'credential_url' => ['nullable', 'string', 'url'],
        ]);

        $certification->update([
            'name' => $validated['title'],
            'issuer' => $validated['issuer'],
            'issued_at' => $validated['date'] ?? null,
            'credential_url' => $validated['credential_url'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Certification updated successfully.',
            'data' => new CertificationResource($certification),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $certification = Certification::findOrFail($id);
        $certification->delete();

        return response()->json([
            'success' => true,
            'message' => 'Certification deleted successfully.',
        ]);
    }
}
