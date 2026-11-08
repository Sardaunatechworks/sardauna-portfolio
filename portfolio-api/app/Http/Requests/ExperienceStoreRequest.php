<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'organization' => ['required', 'string', 'max:255'],
            'role_title' => ['required', 'string', 'max:255'],
            'engagement_type' => ['nullable', 'string', 'max:100'],
            'location' => ['nullable', 'string', 'max:200'],
            'description' => ['nullable', 'string'],
            'desc_points' => ['nullable', 'array'],
            'date_display' => ['nullable', 'string', 'max:100'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
            'is_current' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
            'is_published' => ['nullable', 'boolean'],
        ];
    }
}
