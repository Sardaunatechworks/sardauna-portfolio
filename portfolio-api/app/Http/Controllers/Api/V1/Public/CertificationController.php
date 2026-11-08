<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Http\Resources\CertificationResource;
use Illuminate\Http\JsonResponse;

class CertificationController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $certifications = Certification::published()->get();

        return response()->json([
            'success' => true,
            'message' => 'Certifications retrieved successfully.',
            'data' => CertificationResource::collection($certifications),
        ]);
    }
}
