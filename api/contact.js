import nodemailer from 'nodemailer';

// Simple HTML escaper to protect against email body HTML injection
function escapeHtml(str) {
    if (!str || typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
    // Only accept POST
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
    }

    try {
        const { name, email, subject, message, honeypot } = req.body || {};

        // Bot protection: reject if hidden honeypot is filled
        if (honeypot) {
            return res.status(200).json({ success: true, message: 'Message processed.' });
        }

        // Validate required fields
        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({ success: false, error: 'Name is required.' });
        }
        if (!email || typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({ success: false, error: 'Email address is required.' });
        }
        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({ success: false, error: 'Message content is required.' });
        }

        // Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ success: false, error: 'Invalid email address format.' });
        }

        // Length boundaries
        if (name.length > 150) {
            return res.status(400).json({ success: false, error: 'Name exceeds maximum length of 150 characters.' });
        }
        if (email.length > 200) {
            return res.status(400).json({ success: false, error: 'Email exceeds maximum length of 200 characters.' });
        }
        if (message.length > 5000) {
            return res.status(400).json({ success: false, error: 'Message exceeds maximum length of 5,000 characters.' });
        }

        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        const receiverEmail = process.env.RECEIVER_EMAIL || 'contact.sardaunatech@gmail.com';

        if (!emailUser || !emailPass) {
            console.warn('EMAIL_USER or EMAIL_PASS environment variables are not configured on server.');
            // Return informative response without leaking secrets
            return res.status(503).json({
                success: false,
                error: 'Email delivery service is currently being configured. Please email directly at contact.sardaunatech@gmail.com'
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        const safeName = escapeHtml(name.trim());
        const safeEmail = escapeHtml(email.trim());
        const safeSubject = escapeHtml(subject ? subject.trim() : 'Portfolio Inquiry');
        const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>');

        const mailOptions = {
            from: `"${safeName}" <${emailUser}>`,
            replyTo: email.trim(),
            to: receiverEmail,
            subject: `[Portfolio Inquiry] ${safeSubject} from ${safeName}`,
            text: `Sender: ${name.trim()} <${email.trim()}>\nSubject: ${subject || 'General Inquiry'}\n\nMessage:\n${message.trim()}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #172033; margin-top: 0;">New Inquiry from Portfolio Website</h2>
                    <p style="color: #68665f; font-size: 14px;">A visitor submitted a message via your portfolio contact form:</p>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="padding: 8px 0; color: #908e87; width: 100px;"><strong>Name:</strong></td>
                            <td style="padding: 8px 0; color: #172033;">${safeName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #908e87;"><strong>Email:</strong></td>
                            <td style="padding: 8px 0; color: #172033;"><a href="mailto:${safeEmail}" style="color: #b69a64;">${safeEmail}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #908e87;"><strong>Subject:</strong></td>
                            <td style="padding: 8px 0; color: #172033;">${safeSubject}</td>
                        </tr>
                    </table>
                    <div style="background-color: #faf9f6; padding: 16px; border-radius: 6px; border-left: 3px solid #b69a64;">
                        <p style="color: #172033; margin: 0; line-height: 1.6;">${safeMessage}</p>
                    </div>
                    <p style="color: #908e87; font-size: 12px; margin-top: 24px; text-align: center;">
                        Sent securely from Muhammad Auwal Abubakar Portfolio · Replying directly to this email will respond to ${safeEmail}
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: 'Your message has been received successfully.'
        });
    } catch (err) {
        console.error('Contact endpoint error:', err);
        return res.status(500).json({
            success: false,
            error: 'Failed to dispatch email notification. Please try writing directly.'
        });
    }
}
