import { useState } from 'react';
import Button from '../ui/Button';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function ContactForm() {
    const { personalInfo } = usePortfolio();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus('error');
            setStatusMessage('Please complete all required fields (Full Name, Email Address, and Message).');
            return;
        }

        // Basic email syntax validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setStatus('error');
            setStatusMessage('Please provide a valid email address so I can reply back to you.');
            return;
        }

        setStatus('loading');
        setStatusMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus('success');
                setStatusMessage('Thank you. Your message has been dispatched successfully. I will review and reply within 24–48 hours.');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error(result.error || 'Failed to dispatch message.');
            }
        } catch (err) {
            console.error('Contact form submission error:', err);
            setStatus('error');
            setStatusMessage(
                `Direct server dispatch unavailable right now. Please write directly to ${personalInfo.email || 'contact.sardaunatech@gmail.com'}.`
            );
        }
    };

    return (
        <div className="contact-form-container">
            {status === 'success' ? (
                <div className="contact-form__success-box" role="alert">
                    <div className="success-icon-badge">
                        <CheckCircle size={36} className="text-success" aria-hidden="true" />
                    </div>
                    <h3 className="h3 font-serif" style={{ margin: 'var(--space-2) 0' }}>
                        Message Dispatched Successfully
                    </h3>
                    <p className="body-base text-secondary" style={{ maxWidth: '440px', lineHeight: 'var(--leading-relaxed)' }}>
                        {statusMessage}
                    </p>
                    <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)' }}>
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={() => setStatus('idle')}
                        >
                            Send Another Message
                        </Button>
                        <Button
                            href={`mailto:${personalInfo.email || 'contact.sardaunatech@gmail.com'}`}
                            variant="ghost"
                            size="md"
                        >
                            Email Directly
                        </Button>
                    </div>
                </div>
            ) : (
                <form className="contact-form-element" onSubmit={handleSubmit} noValidate>
                    {status === 'error' && (
                        <div className="contact-form__alert-banner" role="alert">
                            <AlertCircle size={20} className="text-error flex-shrink-0" aria-hidden="true" />
                            <span className="body-sm">{statusMessage}</span>
                        </div>
                    )}

                    <div className="form-row-2">
                        <div className="form-field-group">
                            <label htmlFor="contact-name" className="form-field-label">
                                <span>Full Name</span>
                                <span className="field-required-marker" aria-hidden="true">*</span>
                            </label>
                            <input
                                type="text"
                                id="contact-name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="form-field-input"
                                placeholder="e.g. Dr. Amina Bello or Alex Vance"
                                disabled={status === 'loading'}
                                autoComplete="name"
                            />
                        </div>

                        <div className="form-field-group">
                            <label htmlFor="contact-email" className="form-field-label">
                                <span>Email Address</span>
                                <span className="field-required-marker" aria-hidden="true">*</span>
                            </label>
                            <input
                                type="email"
                                id="contact-email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="form-field-input"
                                placeholder="name@organization.com"
                                disabled={status === 'loading'}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="form-field-group">
                        <label htmlFor="contact-subject" className="form-field-label">
                            <span>Subject / Engagement Topic</span>
                            <span className="caption text-tertiary">Optional</span>
                        </label>
                        <input
                            type="text"
                            id="contact-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="form-field-input"
                            placeholder="Consulting, venture partnership, speaking engagement..."
                            disabled={status === 'loading'}
                        />
                    </div>

                    <div className="form-field-group">
                        <div className="form-field-label-row">
                            <label htmlFor="contact-message" className="form-field-label">
                                <span>Your Message</span>
                                <span className="field-required-marker" aria-hidden="true">*</span>
                            </label>
                            <span className="caption text-tertiary font-mono">
                                {formData.message.length} / 5000
                            </span>
                        </div>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows={6}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="form-field-textarea"
                            placeholder="Describe your project, context, timeline, or inquiry in detail..."
                            disabled={status === 'loading'}
                            maxLength={5000}
                        />
                    </div>

                    <div className="contact-form-footer">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={status === 'loading'}
                            className="contact-submit-btn"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                                    <span>Transmitting Message...</span>
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={16} aria-hidden="true" />
                                </>
                            )}
                        </Button>

                        <div className="contact-security-badge">
                            <ShieldCheck size={16} className="text-gold" aria-hidden="true" />
                            <span className="caption text-secondary">
                                Encrypted transmission · Private communication
                            </span>
                        </div>
                    </div>
                </form>
            )}

            <style>{`
                .contact-form-container {
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    padding: var(--space-6);
                    box-shadow: 0 4px 20px rgba(23, 32, 51, 0.04);
                    transition: box-shadow var(--transition-normal);
                }
                @media (min-width: 768px) {
                    .contact-form-container {
                        padding: var(--space-8);
                    }
                }
                .contact-form-element {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-5);
                }
                .form-row-2 {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-5);
                }
                @media (min-width: 640px) {
                    .form-row-2 {
                        grid-template-columns: 1fr 1fr;
                    }
                }
                .form-field-group {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-2);
                    width: 100%;
                }
                .form-field-label {
                    display: flex;
                    align-items: center;
                    gap: var(--space-1);
                    font-size: var(--text-sm);
                    font-weight: var(--weight-medium);
                    color: var(--color-ink);
                }
                .form-field-label-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .field-required-marker {
                    color: var(--color-error);
                    font-weight: var(--weight-bold);
                }
                .form-field-input {
                    width: 100%;
                    padding: 0.85rem 1.1rem;
                    font-family: var(--font-sans);
                    font-size: var(--text-base);
                    line-height: var(--leading-normal);
                    color: var(--color-ink);
                    background-color: var(--color-white);
                    border: 1.5px solid var(--color-border);
                    border-radius: var(--radius-md);
                    box-shadow: 0 1px 2px rgba(23, 32, 51, 0.03);
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .form-field-textarea {
                    width: 100%;
                    padding: 0.95rem 1.1rem;
                    font-family: var(--font-sans);
                    font-size: var(--text-base);
                    line-height: var(--leading-relaxed);
                    color: var(--color-ink);
                    background-color: var(--color-white);
                    border: 1.5px solid var(--color-border);
                    border-radius: var(--radius-md);
                    resize: vertical;
                    min-height: 150px;
                    box-shadow: 0 1px 2px rgba(23, 32, 51, 0.03);
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .form-field-input::placeholder,
                .form-field-textarea::placeholder {
                    color: var(--color-tertiary);
                    font-weight: var(--weight-normal);
                }
                .form-field-input:focus,
                .form-field-textarea:focus {
                    outline: none;
                    border-color: var(--color-gold);
                    background-color: var(--color-white);
                    box-shadow: 0 0 0 4px var(--color-gold-subtle);
                }
                .form-field-input:disabled,
                .form-field-textarea:disabled {
                    background-color: var(--color-surface-alt);
                    color: var(--color-tertiary);
                    cursor: not-allowed;
                }
                .contact-form__alert-banner {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    padding: var(--space-3) var(--space-4);
                    background-color: rgba(192, 57, 43, 0.08);
                    color: var(--color-error);
                    border: 1px solid rgba(192, 57, 43, 0.25);
                    border-radius: var(--radius-md);
                    animation: shake 0.4s ease;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .contact-form-footer {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-4);
                    align-items: flex-start;
                    padding-top: var(--space-3);
                    border-top: 1px solid var(--color-border-light);
                }
                @media (min-width: 640px) {
                    .contact-form-footer {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                    }
                }
                .contact-submit-btn {
                    min-width: 170px;
                    box-shadow: 0 4px 14px rgba(182, 154, 100, 0.25);
                }
                .contact-submit-btn:hover {
                    box-shadow: 0 6px 20px rgba(182, 154, 100, 0.4);
                }
                .contact-security-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--space-2);
                }
                .contact-form__success-box {
                    text-align: center;
                    padding: var(--space-12) var(--space-6);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    animation: fadeIn 0.4s ease;
                }
                .success-icon-badge {
                    width: 64px;
                    height: 64px;
                    border-radius: var(--radius-full);
                    background-color: rgba(39, 174, 96, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: var(--space-3);
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
