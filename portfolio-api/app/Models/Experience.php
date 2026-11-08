<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Experience extends Model
{
    protected $fillable = [
        'organization',
        'role_title',
        'engagement_type',
        'location',
        'description',
        'desc_points',
        'date_display',
        'start_date',
        'end_date',
        'is_current',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'desc_points' => 'array',
        'is_current' => 'boolean',
        'is_published' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)->orderBy('sort_order', 'asc');
    }
}
