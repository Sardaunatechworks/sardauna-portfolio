<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:jpeg,png,jpg,webp,svg,gif,pdf', 'max:10240'], // 10MB limit
            'alt_text' => ['nullable', 'string', 'max:255'],
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $fileName = Str::random(24) . '.' . $extension;

        // Store file on public disk
        $path = $file->storeAs('uploads', $fileName, 'public');
        $publicUrl = asset('storage/' . $path);

        $media = Media::create([
            'original_name' => $originalName,
            'file_name' => $fileName,
            'disk' => 'public',
            'path' => $path,
            'url' => $publicUrl,
            'mime_type' => $file->getClientMimeType(),
            'file_size' => $file->getSize(),
            'alt_text' => $request->input('alt_text'),
            'uploaded_by' => $request->user()?->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Media file uploaded successfully.',
            'url' => $publicUrl,
            'data' => $media,
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $media = Media::findOrFail($id);

        if (Storage::disk($media->disk)->exists($media->path)) {
            Storage::disk($media->disk)->delete($media->path);
        }

        $media->delete();

        return response()->json([
            'success' => true,
            'message' => 'Media file removed.',
        ]);
    }
}
