import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to handle JSON and Cross-Origin requests
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        // Setup Nodemailer transporter
        // NOTE: For Gmail, you should use an App Password instead of your real password
        // You can generate one in your Google Account settings -> Security -> App Passwords
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.RECEIVER_EMAIL, // the email address that will receive the messages
            subject: `Portfolio Contact Form: New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New message from your portfolio</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
