<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'tagline' => $this->tagline,
            'desc' => $this->overview,
            'overview' => $this->overview,
            'problem' => $this->problem_statement,
            'solution' => $this->solution,
            'category' => $this->category,
            'role' => $this->role,
            'status' => $this->project_status,
            'tech' => $this->tech_list ?: $this->technologies->pluck('name')->all(),
            'github' => $this->repository_url ?: '',
            'demo' => $this->live_url ?: '',
            'img' => $this->cover_image ?: '',
            'is_featured' => (bool) $this->is_featured,
        ];
    }
}
