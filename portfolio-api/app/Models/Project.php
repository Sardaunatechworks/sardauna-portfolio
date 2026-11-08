<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'tagline',
        'category',
        'overview',
        'problem_statement',
        'solution',
        'role',
        'project_status',
        'project_type',
        'cover_image',
        'live_url',
        'repository_url',
        'tech_list',
        'is_featured',
        'is_published',
        'sort_order',
        'published_at',
    ];

    protected $casts = [
        'tech_list' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)->orderBy('sort_order', 'asc');
    }

    public function scopeFeatured(Builder $query): void
    {
        $query->where('is_published', true)->where('is_featured', true)->orderBy('sort_order', 'asc');
    }
}
