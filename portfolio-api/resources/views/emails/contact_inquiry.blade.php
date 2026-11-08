<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Inquiry from Portfolio</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f3ee; margin: 0; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d8d5ce; border-radius: 8px; padding: 32px;">
        <h2 style="color: #172033; margin-top: 0; font-family: Georgia, serif;">New Message from Portfolio Website</h2>
        <p style="color: #68665f; font-size: 14px;">A visitor submitted an inquiry through your portfolio contact form:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
            <tr>
                <td style="padding: 8px 0; color: #908e87; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #172033;">{{ $contactMessage->name }}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #908e87;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #172033;"><a href="mailto:{{ $contactMessage->email }}" style="color: #b69a64;">{{ $contactMessage->email }}</a></td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #908e87;"><strong>Subject:</strong></td>
                <td style="padding: 8px 0; color: #172033;">{{ $contactMessage->subject ?: 'General Inquiry' }}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #908e87;"><strong>Received At:</strong></td>
                <td style="padding: 8px 0; color: #172033;">{{ $contactMessage->created_at->format('F j, Y · H:i T') }}</td>
            </tr>
        </table>

        <div style="background-color: #faf9f6; padding: 20px; border-radius: 6px; border-left: 3px solid #b69a64;">
            <p style="color: #172033; margin: 0; line-height: 1.6; white-space: pre-line;">{{ $contactMessage->message }}</p>
        </div>

        <p style="color: #908e87; font-size: 12px; margin-top: 28px; text-align: center; border-top: 1px solid #efece5; padding-top: 16px;">
            Sent securely via Muhammad Auwal Abubakar Portfolio API · Replying directly will respond to {{ $contactMessage->email }}
        </p>
    </div>
</body>
</html>
