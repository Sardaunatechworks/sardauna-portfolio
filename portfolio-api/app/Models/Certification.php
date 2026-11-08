<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Certification extends Model
{
    protected $fillable = [
        'name',
        'issuer',
        'credential_id',
        'credential_url',
        'issued_at',
        'expires_at',
        'badge_image_url',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'expires_at' => 'date',
    ];

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)->orderBy('sort_order', 'asc');
    }
}
