<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Profile;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    public function show(): JsonResponse
    {
        $profile = Profile::firstOrCreate(
            ['id' => 1],
            ['full_name' => 'Muhammad Auwal Abubakar', 'email' => 'contact.sardaunatech@gmail.com']
        );

        return response()->json([
            'success' => true,
            'data' => new ProfileResource($profile),
        ]);
    }

    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $profile = Profile::firstOrCreate(['id' => 1]);
        $profile->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully.',
            'data' => new ProfileResource($profile),
        ]);
    }
}
