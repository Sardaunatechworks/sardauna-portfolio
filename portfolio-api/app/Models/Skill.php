<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'proficiency_label',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)->orderBy('sort_order', 'asc');
    }
}
