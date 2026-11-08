<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'body' => $this->body,
            'category' => $this->category ? $this->category->name : 'Technology',
            'readTime' => $this->read_time,
            'date' => $this->published_at ? $this->published_at->format('F Y') : '',
            'topics' => $this->topics ?: [],
            'cover_image' => $this->cover_image_url,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
        ];
    }
}
