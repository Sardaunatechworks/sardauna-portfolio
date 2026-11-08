<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'email' => ['required', 'string', 'email:rfc,filter', 'max:200'],
            'subject' => ['nullable', 'string', 'max:250'],
            'message' => ['required', 'string', 'min:5', 'max:5000'],
            'honeypot' => ['nullable', 'string', 'max:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please provide your full name.',
            'email.required' => 'A valid email address is required so I can reply.',
            'email.email' => 'Please check the formatting of your email address.',
            'message.required' => 'Please enter your message or project context.',
            'honeypot.max' => 'Spam verification failed.',
        ];
    }
}
