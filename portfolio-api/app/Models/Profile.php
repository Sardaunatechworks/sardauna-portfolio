<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'full_name',
        'professional_title',
        'headline',
        'short_bio',
        'medium_bio',
        'extended_bio',
        'location',
        'email',
        'phone1',
        'phone2',
        'github_url',
        'portfolio_url',
        'profile_image_url',
        'roles',
        'availability_status',
    ];

    protected $casts = [
        'roles' => 'array',
    ];
}
