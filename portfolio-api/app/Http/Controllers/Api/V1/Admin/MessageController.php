<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Http\Resources\ContactMessageResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ContactMessage::latest();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $messages = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => ContactMessageResource::collection($messages),
            'meta' => [
                'current_page' => $messages->currentPage(),
                'last_page' => $messages->lastPage(),
                'total' => $messages->total(),
            ],
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $message = ContactMessage::findOrFail($id);

        // Auto mark as read upon viewing
        if ($message->status === 'unread') {
            $message->update(['status' => 'read']);
        }

        return response()->json([
            'success' => true,
            'data' => new ContactMessageResource($message),
        ]);
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:unread,read,replied,archived,spam'],
        ]);

        $message = ContactMessage::findOrFail($id);
        $message->update(['status' => $validated['status']]);

        return response()->json([
            'success' => true,
            'message' => "Message status updated to '{$validated['status']}'.",
            'data' => new ContactMessageResource($message),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contact message removed.',
        ]);
    }
}
