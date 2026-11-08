<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->full_name,
            'title' => $this->professional_title,
            'headline' => $this->headline,
            'about' => $this->short_bio ?: $this->medium_bio,
            'short_bio' => $this->short_bio,
            'medium_bio' => $this->medium_bio,
            'extended_bio' => $this->extended_bio,
            'location' => $this->location,
            'email' => $this->email,
            'phone1' => $this->phone1,
            'phone2' => $this->phone2,
            'github' => $this->github_url,
            'portfolio' => $this->portfolio_url,
            'profile_pic' => $this->profile_image_url,
            'roles' => $this->roles ?: [],
            'availability' => $this->availability_status,
        ];
    }
}
