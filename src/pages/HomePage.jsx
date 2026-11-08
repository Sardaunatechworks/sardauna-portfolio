import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import SkillsMarquee from '../components/sections/SkillsMarquee';
import SelectedWork from '../components/sections/SelectedWork';
import ExperienceTimeline from '../components/sections/ExperienceTimeline';
import ContactForm from '../components/sections/ContactForm';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { usePortfolio } from '../hooks/usePortfolio';
import { useSEO } from '../hooks/useSEO';
import { ArrowRight, Users, Award, BookOpen, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function HomePage() {
    useSEO({
        title: 'Muhammad Auwal Abubakar | Technology Entrepreneur & Software Developer',
        description: 'Founder & CEO of Sardauna Tech Lab Ltd and Project Manager at Startup Jigawa. Building practical digital solutions and empowering communities through technology.'
    });

    const { personalInfo, experience } = usePortfolio();
    const recentExperience = experience.slice(0, 3);

    return (
        <div className="home-page">
            <HeroSection />

            {/* Continuous Animated Scrolling Skills & Tech Marquee */}
            <SkillsMarquee />

            {/* Editorial Statement */}
            <section className="section bg-surface-alt" aria-label="Editorial Statement">
                <div className="container container--sm text-center">
                    <span className="eyebrow text-gold" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>
                        MISSION &amp; PHILOSOPHY
                    </span>
                    <blockquote className="editorial-quote font-serif">
                        &ldquo;True innovation is measured not merely by algorithmic complexity, but by its tangible capacity to solve pressing problems and expand human opportunity.&rdquo;
                    </blockquote>
                    <p className="caption text-secondary" style={{ marginTop: 'var(--space-4)' }}>
                        — Muhammad Auwal Abubakar · Dutse, Nigeria
                    </p>
                </div>
            </section>

            {/* Selected Work */}
            <SelectedWork />

            {/* Experience Overview */}
            <section className="section bg-surface-alt" aria-label="Leadership & Experience">
                <div className="container">
                    <div className="home-exp-header">
                        <SectionHeading
                            kicker="CAREER &amp; LEADERSHIP"
                            title="Professional Trajectory"
                            subtitle="Executive leadership, project management, and software architecture across technology companies and educational initiatives."
                        />
                        <Button to="/experience" variant="secondary" size="md">
                            View Full History
                            <ArrowRight size={14} aria-hidden="true" />
                        </Button>
                    </div>

                    <div className="home-exp-content">
                        <ExperienceTimeline items={recentExperience} />
                    </div>
                </div>
            </section>

            {/* Community & Impact Highlights */}
            <section className="section" aria-label="Community Engagement">
                <div className="container">
                    <SectionHeading
                        kicker="COMMUNITY &amp; ECOSYSTEM"
                        title="Grassroots Impact &amp; Mentorship"
                        subtitle="Active involvement in Google Developer Groups, digital capacity building, and open knowledge sharing."
                    />

                    <div className="community-cards-grid">
                        <Card hoverable className="community-mini-card">
                            <div className="community-mini-card__icon text-gold">
                                <Users size={24} aria-hidden="true" />
                            </div>
                            <h3 className="h3" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                                Developer Communities
                            </h3>
                            <p className="body-sm text-secondary" style={{ marginBottom: 'var(--space-4)' }}>
                                Active member of Google Developer Groups (GDG) Dutse and contributor to regional tech meetups and DevFest conferences.
                            </p>
                            <Link to="/community" className="inline-link caption font-medium">
                                Community activities →
                            </Link>
                        </Card>

                        <Card hoverable className="community-mini-card">
                            <div className="community-mini-card__icon text-gold">
                                <BookOpen size={24} aria-hidden="true" />
                            </div>
                            <h3 className="h3" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                                Tech Education
                            </h3>
                            <p className="body-sm text-secondary" style={{ marginBottom: 'var(--space-4)' }}>
                                Instructing practical web development at Coding Technology Digital Learning School to train the next generation of engineers.
                            </p>
                            <Link to="/experience" className="inline-link caption font-medium">
                                Teaching background →
                            </Link>
                        </Card>

                        <Card hoverable className="community-mini-card">
                            <div className="community-mini-card__icon text-gold">
                                <Award size={24} aria-hidden="true" />
                            </div>
                            <h3 className="h3" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                                Continuous Learning
                            </h3>
                            <p className="body-sm text-secondary" style={{ marginBottom: 'var(--space-4)' }}>
                                Certified across Microsoft AI Developer Program, Google Cloud Innovator Program, and UI/UX engineering specializations.
                            </p>
                            <Link to="/about" className="inline-link caption font-medium">
                                Certifications &amp; training →
                            </Link>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Direct Contact & Inquiry Section */}
            <section id="contact" className="section bg-ivory" aria-label="Direct Contact Section" style={{ scrollMarginTop: '80px' }}>
                <div className="container">
                    <div className="home-contact-grid">
                        <div className="home-contact-form-pane">
                            <SectionHeading
                                kicker="GET IN TOUCH"
                                title="Send a Direct Message"
                                subtitle="Whether discussing a venture opportunity, requesting architectural consulting, or speaking at a conference, your note goes directly to my private inbox."
                            />
                            <ContactForm />
                        </div>

                        <aside className="home-contact-info-pane">
                            <Card padded className="home-contact-card">
                                <span className="eyebrow text-gold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                                    COMMUNICATION CHANNELS
                                </span>
                                <h3 className="h3 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                                    Direct Touchpoints
                                </h3>

                                <div className="contact-points-list">
                                    <div className="contact-point">
                                        <div className="contact-point-icon text-gold">
                                            <Mail size={16} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <span className="caption text-tertiary">Direct Email</span>
                                            <p className="body-sm font-medium">
                                                <a href={`mailto:${personalInfo.email || 'contact.sardaunatech@gmail.com'}`} className="inline-link">
                                                    {personalInfo.email || 'contact.sardaunatech@gmail.com'}
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {personalInfo.phone1 && (
                                        <div className="contact-point">
                                            <div className="contact-point-icon text-gold">
                                                <Phone size={16} aria-hidden="true" />
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

                                    <div className="contact-point">
                                        <div className="contact-point-icon text-gold">
                                            <MapPin size={16} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <span className="caption text-tertiary">Primary Base</span>
                                            <p className="body-sm font-medium text-ink">
                                                {personalInfo.location || 'Dutse, Jigawa State, Nigeria'}
                                            </p>
                                            <span className="caption text-tertiary">WAT / UTC+1</span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="divider" style={{ margin: 'var(--space-5) 0' }} />

                                <div className="sla-banner">
                                    <Clock size={16} className="text-gold flex-shrink-0" aria-hidden="true" />
                                    <p className="caption text-secondary" style={{ margin: 0, lineHeight: 1.5 }}>
                                        Verified professional inquiries typically receive a direct response within 24–48 business hours.
                                    </p>
                                </div>
                            </Card>
                        </aside>
                    </div>
                </div>
            </section>

            <style>{`
                .home-exp-header {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: var(--space-8);
                }
                @media (min-width: 768px) {
                    .home-exp-header {
                        flex-direction: row;
                        align-items: flex-end;
                    }
                }
                .home-exp-content {
                    max-width: 800px;
                }
                .editorial-quote {
                    font-size: clamp(1.25rem, 2.5vw, 1.875rem);
                    line-height: var(--leading-snug);
                    color: var(--color-ink);
                    font-style: italic;
                    margin: 0;
                    padding: 0 var(--space-4);
                }
                .community-cards-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-6);
                }
                @media (min-width: 768px) {
                    .community-cards-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                .community-mini-card__icon {
                    margin-bottom: var(--space-4);
                }
                .home-contact-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-12);
                }
                @media (min-width: 992px) {
                    .home-contact-grid {
                        grid-template-columns: 1.15fr 0.85fr;
                        gap: var(--space-16);
                        align-items: start;
                    }
                }
                .contact-points-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-4);
                }
                .contact-point {
                    display: flex;
                    align-items: flex-start;
                    gap: var(--space-3);
                }
                .contact-point-icon {
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
                .sla-banner {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    padding: var(--space-3);
                    background-color: var(--color-surface-alt);
                    border-radius: var(--radius-sm);
                    border: 1px solid var(--color-border-light);
                }
            `}</style>
        </div>
    );
}
