<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactMessageRequest;
use App\Models\ContactMessage;
use App\Mail\ContactInquiryMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function __invoke(ContactMessageRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // Bot honeypot protection: return silent success without DB or Mail dispatch
        if (!empty($validated['honeypot'])) {
            return response()->json([
                'success' => true,
                'message' => 'Thank you. Your message has been received.',
            ]);
        }

        // Store message in MySQL database
        $contactMessage = ContactMessage::create([
            'name' => strip_tags(trim($validated['name'])),
            'email' => strtolower(trim($validated['email'])),
            'subject' => !empty($validated['subject']) ? strip_tags(trim($validated['subject'])) : null,
            'message' => strip_tags(trim($validated['message'])),
            'status' => 'unread',
            'ip_hash' => hash('sha256', (string) $request->ip()),
        ]);

        // Attempt email dispatch via SMTP
        $receiverEmail = env('RECEIVER_EMAIL', env('MAIL_FROM_ADDRESS', 'contact.sardaunatech@gmail.com'));
        try {
            if (config('mail.mailers.smtp.username') && config('mail.mailers.smtp.password')) {
                Mail::to($receiverEmail)->send(new ContactInquiryMail($contactMessage));
            }
        } catch (\Throwable $e) {
            Log::error('Contact form email delivery failed: ' . $e->getMessage(), [
                'message_id' => $contactMessage->id,
            ]);
            // Do not fail HTTP response since message is safely stored in database
        }

        return response()->json([
            'success' => true,
            'message' => 'Thank you. Your message has been received successfully. I will get back to you shortly.',
            'data' => [
                'id' => $contactMessage->id,
            ],
        ]);
    }
}
