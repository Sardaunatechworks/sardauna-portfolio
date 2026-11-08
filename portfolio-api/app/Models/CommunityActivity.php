<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class CommunityActivity extends Model
{
    protected $fillable = [
        'organization',
        'role_title',
        'activity_type',
        'title',
        'description',
        'highlights',
        'period',
        'is_current',
        'external_url',
        'cover_image_url',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'highlights' => 'array',
        'is_current' => 'boolean',
        'is_published' => 'boolean',
    ];

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)->orderBy('sort_order', 'asc');
    }
}
