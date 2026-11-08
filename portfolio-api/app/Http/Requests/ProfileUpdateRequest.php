<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:200'],
            'professional_title' => ['nullable', 'string', 'max:200'],
            'headline' => ['nullable', 'string', 'max:500'],
            'short_bio' => ['nullable', 'string'],
            'medium_bio' => ['nullable', 'string'],
            'extended_bio' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:200'],
            'email' => ['required', 'string', 'email', 'max:200'],
            'phone1' => ['nullable', 'string', 'max:50'],
            'phone2' => ['nullable', 'string', 'max:50'],
            'github_url' => ['nullable', 'string', 'max:500'],
            'portfolio_url' => ['nullable', 'string', 'max:500'],
            'profile_image_url' => ['nullable', 'string'],
            'roles' => ['nullable', 'array'],
            'availability_status' => ['nullable', 'string', 'max:200'],
        ];
    }
}
