import SectionHeading from '../components/ui/SectionHeading';
import ContactForm from '../components/sections/ContactForm';
import Card from '../components/ui/Card';
import { usePortfolio } from '../hooks/usePortfolio';
import { useSEO } from '../hooks/useSEO';
import { Mail, Phone, MapPin, Github, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    useSEO({
        title: 'Contact & Collaboration Inquiries | Muhammad Auwal Abubakar',
        description: 'Get in touch with Muhammad Auwal Abubakar for venture discussions, technical leadership, keynote speaking, or community partnerships.'
    });

    const { personalInfo } = usePortfolio();

    return (
        <div className="contact-page">
            <header className="page-header bg-surface-alt">
                <div className="container">
                    <span className="eyebrow text-gold" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                        CONNECT &amp; ENGAGE
                    </span>
                    <h1 className="h1 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                        Initiate a Conversation
                    </h1>
                    <p className="body-lg text-secondary" style={{ maxWidth: '720px' }}>
                        Whether you represent an international technology organization, an investor, a community group, or a fellow builder — I welcome thoughtful inquiries and strategic discussions.
                    </p>
                </div>
            </header>

            <div className="container" style={{ padding: 'var(--space-16) var(--space-4)' }}>
                <div className="contact__layout">
                    {/* Left Column: Form */}
                    <div className="contact__form-col">
                        <SectionHeading
                            kicker="DIRECT INQUIRY"
                            title="Send a Direct Message"
                            subtitle="Fill in the secure form below. All messages are transmitted directly to my private inbox."
                        />
                        <ContactForm />
                    </div>

                    {/* Right Column: Information & Office Details */}
                    <aside className="contact__info-col">
                        <Card padded className="contact-info-card">
                            <h3 className="h3 font-serif" style={{ marginBottom: 'var(--space-6)' }}>
                                Contact Details
                            </h3>

                            <div className="contact-channel-list">
                                <div className="channel-item">
                                    <div className="channel-item__icon text-gold">
                                        <Mail size={18} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <span className="caption text-tertiary">Email Address</span>
                                        <p className="body-sm font-medium">
                                            <a href={`mailto:${personalInfo.email || 'contact.sardaunatech@gmail.com'}`} className="inline-link">
                                                {personalInfo.email || 'contact.sardaunatech@gmail.com'}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                {personalInfo.phone1 && (
                                    <div className="channel-item">
                                        <div className="channel-item__icon text-gold">
                                            <Phone size={18} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <span className="caption text-tertiary">Direct Phone (Nigeria)</span>
                                            <p className="body-sm font-medium">
                                                <a href={`tel:${personalInfo.phone1.replace(/\s+/g, '')}`} className="inline-link">
                                                    {personalInfo.phone1}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="channel-item">
                                    <div className="channel-item__icon text-gold">
                                        <MapPin size={18} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <span className="caption text-tertiary">Location</span>
                                        <p className="body-sm font-medium text-ink">
                                            {personalInfo.location || 'Dutse, Jigawa State, Nigeria'}
                                        </p>
                                        <span className="caption text-tertiary">West Africa Time (WAT / UTC+1)</span>
                                    </div>
                                </div>

                                {personalInfo.github && (
                                    <div className="channel-item">
                                        <div className="channel-item__icon text-gold">
                                            <Github size={18} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <span className="caption text-tertiary">GitHub Profile</span>
                                            <p className="body-sm font-medium">
                                                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="inline-link">
                                                    github.com/Sardaunatechworks ↗
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <hr className="divider" style={{ margin: 'var(--space-6) 0' }} />

                            <div className="sla-block">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                                    <Clock size={16} className="text-gold" aria-hidden="true" />
                                    <h4 className="body-sm font-medium text-ink" style={{ margin: 0 }}>
                                        Response Cadence
                                    </h4>
                                </div>
                                <p className="caption text-secondary" style={{ lineHeight: 'var(--leading-normal)' }}>
                                    I generally review and reply to verified professional inquiries within 24–48 business hours. For urgent business partnership matters, telephone contact is welcomed.
                                </p>
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>

            <style>{`
                .contact__layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-12);
                }
                @media (min-width: 992px) {
                    .contact__layout {
                        grid-template-columns: 1fr 380px;
                        gap: var(--space-16);
                    }
                }
                .contact-channel-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-5);
                }
                .channel-item {
                    display: flex;
                    align-items: flex-start;
                    gap: var(--space-3);
                }
                .channel-item__icon {
                    width: 32px;
                    height: 32px;
                    border-radius: var(--radius-sm);
                    background-color: var(--color-surface-alt);
                    border: 1px solid var(--color-border-light);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
            `}</style>
        </div>
    );
}
