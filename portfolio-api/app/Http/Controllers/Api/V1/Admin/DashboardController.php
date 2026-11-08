<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Certification;
use App\Models\ContactMessage;
use App\Models\Article;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'counts' => [
                    'projects' => Project::count(),
                    'experiences' => Experience::count(),
                    'skills' => Skill::count(),
                    'certifications' => Certification::count(),
                    'articles' => Article::count(),
                    'unread_messages' => ContactMessage::where('status', 'unread')->count(),
                    'total_messages' => ContactMessage::count(),
                ],
                'recent_messages' => ContactMessage::latest()->take(5)->get(),
            ],
        ]);
    }
}
