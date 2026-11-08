<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'role' => $this->role_title,
            'company' => $this->organization,
            'type' => $this->engagement_type,
            'location' => $this->location,
            'date' => $this->date_display ?: ($this->is_current ? 'Present' : ''),
            'desc' => $this->desc_points ?: (array_filter([$this->description])),
            'is_current' => (bool) $this->is_current,
            'sort_order' => $this->sort_order,
        ];
    }
}
