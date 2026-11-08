import { useState } from 'react';
import Button from '../ui/Button';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
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
            setStatusMessage('Please fill in all required fields (Name, Email, Message).');
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
                setStatusMessage('Thank you. Your message has been sent successfully. I will get back to you shortly.');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error(result.error || 'Failed to send message.');
            }
        } catch (err) {
            console.error('Contact form submission error:', err);
            setStatus('error');
            setStatusMessage(
                `Unable to send message via web server. You can write directly to ${personalInfo.email || 'contact.sardaunatech@gmail.com'}.`
            );
        }
    };

    return (
        <div className="contact-form-wrapper">
            {status === 'success' ? (
                <div className="contact-form__success" role="alert">
                    <CheckCircle size={32} className="text-success" aria-hidden="true" />
                    <h3 className="h3">Message Received</h3>
                    <p className="body-base text-secondary">{statusMessage}</p>
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={() => setStatus('idle')}
                        style={{ marginTop: 'var(--space-4)' }}
                    >
                        Send Another Note
                    </Button>
                </div>
            ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    {status === 'error' && (
                        <div className="contact-form__alert contact-form__alert--error" role="alert">
                            <AlertCircle size={20} aria-hidden="true" />
                            <span>{statusMessage}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="contact-name" className="form-label">
                            Full Name <span className="text-error" aria-hidden="true">*</span>
                        </label>
                        <input
                            type="text"
                            id="contact-name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g. Dr. Amina Bello or Alex Vance"
                            disabled={status === 'loading'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-email" className="form-label">
                            Email Address <span className="text-error" aria-hidden="true">*</span>
                        </label>
                        <input
                            type="email"
                            id="contact-email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="amina@example.com"
                            disabled={status === 'loading'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-subject" className="form-label">
                            Subject / Topic
                        </label>
                        <input
                            type="text"
                            id="contact-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Consultation, speaking opportunity, or venture collaboration"
                            disabled={status === 'loading'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-message" className="form-label">
                            Message <span className="text-error" aria-hidden="true">*</span>
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows={5}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="form-textarea"
                            placeholder="Share context on your project, timeline, or request..."
                            disabled={status === 'loading'}
                        />
                    </div>

                    <div className="contact-form__submit-row">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={16} aria-hidden="true" />
                                </>
                            )}
                        </Button>

                        <span className="caption text-tertiary">
                            Direct email: <a href={`mailto:${personalInfo.email || 'contact.sardaunatech@gmail.com'}`} className="inline-link">{personalInfo.email || 'contact.sardaunatech@gmail.com'}</a>
                        </span>
                    </div>
                </form>
            )}

            <style>{`
                .contact-form-wrapper {
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-md);
                    padding: var(--space-6);
                }
                @media (min-width: 768px) {
                    .contact-form-wrapper {
                        padding: var(--space-8);
                    }
                }
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-5);
                }
                .contact-form__success {
                    text-align: center;
                    padding: var(--space-12) var(--space-4);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--space-3);
                }
                .contact-form__alert {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    padding: var(--space-3) var(--space-4);
                    border-radius: var(--radius-sm);
                    font-size: var(--text-sm);
                }
                .contact-form__alert--error {
                    background-color: rgba(192, 57, 43, 0.08);
                    color: var(--color-error);
                    border: 1px solid rgba(192, 57, 43, 0.2);
                }
                .contact-form__submit-row {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-4);
                    align-items: flex-start;
                    padding-top: var(--space-2);
                }
                @media (min-width: 640px) {
                    .contact-form__submit-row {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                    }
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
