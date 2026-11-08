<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->name,
            'issuer' => $this->issuer,
            'date' => $this->issued_at,
            'credential_url' => $this->credential_url,
            'badge_image' => $this->badge_image_url,
        ];
    }
}
