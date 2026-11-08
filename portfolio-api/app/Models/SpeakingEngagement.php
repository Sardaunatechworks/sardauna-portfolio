<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class SpeakingEngagement extends Model
{
    protected $fillable = [
        'event_name',
        'session_title',
        'event_date',
        'event_location',
        'session_format',
        'description',
        'event_url',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)->orderBy('created_at', 'desc');
    }
}
