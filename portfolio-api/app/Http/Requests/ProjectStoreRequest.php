<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $projectId = $this->route('id') ?? $this->route('project');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('projects', 'slug')->ignore($projectId)],
            'tagline' => ['nullable', 'string', 'max:500'],
            'overview' => ['required', 'string'],
            'problem_statement' => ['nullable', 'string'],
            'solution' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'role' => ['nullable', 'string', 'max:150'],
            'project_status' => ['nullable', 'string', 'max:50'],
            'live_url' => ['nullable', 'string'],
            'repository_url' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
            'tech_list' => ['nullable', 'array'],
            'is_featured' => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ];
    }
}
