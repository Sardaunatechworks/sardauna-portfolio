<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Http\Resources\ArticleResource;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $articles = Article::published()->with('category')->get();

        return response()->json([
            'success' => true,
            'message' => 'Articles retrieved successfully.',
            'data' => ArticleResource::collection($articles),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $article = Article::published()->with('category')->where('slug', $slug)->first();

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => "Article with slug '{$slug}' was not found.",
                'data' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Article retrieved successfully.',
            'data' => new ArticleResource($article),
        ]);
    }
}
