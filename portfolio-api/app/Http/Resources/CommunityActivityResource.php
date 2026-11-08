<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommunityActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->organization,
            'role' => $this->role_title,
            'type' => $this->activity_type,
            'category' => $this->activity_type,
            'desc' => $this->description,
            'description' => $this->description,
            'highlights' => $this->highlights ?: [],
            'period' => $this->period,
            'is_current' => (bool) $this->is_current,
            'external_url' => $this->external_url,
            'cover_image' => $this->cover_image_url,
        ];
    }
}
