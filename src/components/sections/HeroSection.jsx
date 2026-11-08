import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function HeroSection() {
    const { personalInfo } = usePortfolio();

    return (
        <section className="hero-section" aria-label="Introduction">
            <div className="container">
                <div className="hero__grid">
                    <div className="hero__content">
                        <div className="hero__eyebrow-wrapper">
                            <span className="eyebrow hero__eyebrow">
                                Software Developer · Entrepreneur · Project Leader
                            </span>
                        </div>

                        <h1 className="hero__headline font-serif">
                            Building practical technology platforms and leading community-driven innovation.
                        </h1>

                        <p className="hero__lead body-lg text-secondary">
                            I am <strong className="text-ink">{personalInfo.name || 'Muhammad Auwal Abubakar'}</strong>, Founder &amp; CEO of <span className="text-ink">Sardauna Tech Lab Ltd</span> and Project Manager &amp; Head of Operations at <span className="text-ink">Startup Jigawa</span>. I design, architect, and deliver digital tools that empower businesses, learners, and communities.
                        </p>

                        <div className="hero__meta">
                            <div className="hero__meta-item">
                                <MapPin size={16} className="text-gold" aria-hidden="true" />
                                <span className="body-sm">{personalInfo.location || 'Dutse, Jigawa State, Nigeria'}</span>
                            </div>
                            <div className="hero__meta-item">
                                <Briefcase size={16} className="text-gold" aria-hidden="true" />
                                <span className="body-sm">Available for Strategic Collaborations &amp; Speaking</span>
                            </div>
                        </div>

                        <div className="hero__actions">
                            <Button to="/projects" variant="primary" size="lg">
                                View Selected Work
                                <ArrowRight size={16} aria-hidden="true" />
                            </Button>
                            <Button to="/about" variant="secondary" size="lg">
                                Read Biography
                            </Button>
                        </div>
                    </div>

                    <div className="hero__visual">
                        <div className="hero__portrait-frame">
                            {personalInfo.profile_pic ? (
                                <img
                                    src={personalInfo.profile_pic}
                                    alt={personalInfo.name || 'Muhammad Auwal Abubakar'}
                                    className="hero__portrait-img"
                                />
                            ) : (
                                <div className="hero__portrait-monogram">
                                    <span className="hero__monogram-letters font-serif">MA</span>
                                    <span className="caption text-secondary">Muhammad Auwal Abubakar</span>
                                    <span className="caption text-tertiary" style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                                        Dutse, Nigeria
                                    </span>
                                </div>
                            )}
                            <div className="hero__portrait-caption">
                                <span className="caption">
                                    Founder &amp; CEO, Sardauna Tech Lab Ltd
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Roles Ticker / Highlights */}
                <div className="hero__highlights">
                    <div className="highlight-card">
                        <span className="caption text-gold">CURRENT VENTURE</span>
                        <h4 className="highlight-card__title">Sardauna Tech Lab</h4>
                        <p className="caption text-secondary">Founder &amp; CEO · Digital Products &amp; Automation</p>
                    </div>
                    <div className="highlight-card">
                        <span className="caption text-gold">OPERATIONS LEAD</span>
                        <h4 className="highlight-card__title">Startup Jigawa</h4>
                        <p className="caption text-secondary">Project Manager &amp; Head of Operations</p>
                    </div>
                    <div className="highlight-card">
                        <span className="caption text-gold">COMMUNITY</span>
                        <h4 className="highlight-card__title">Techfort &amp; GDG</h4>
                        <p className="caption text-secondary">Director of Projects &amp; GDG Contributor</p>
                    </div>
                </div>
            </div>

            <style>{`
                .hero-section {
                    padding: var(--space-16) 0 var(--space-20);
                    border-bottom: 1px solid var(--color-border-light);
                    background: linear-gradient(180deg, var(--color-ivory) 0%, var(--color-surface) 100%);
                }
                .hero__grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-12);
                    align-items: center;
                }
                @media (min-width: 992px) {
                    .hero__grid {
                        grid-template-columns: 1.25fr 0.75fr;
                        gap: var(--space-16);
                    }
                }
                .hero__eyebrow-wrapper {
                    margin-bottom: var(--space-4);
                }
                .hero__headline {
                    font-size: var(--text-display-sm);
                    line-height: var(--leading-tight);
                    color: var(--color-ink);
                    margin-bottom: var(--space-6);
                    letter-spacing: var(--tracking-tight);
                }
                @media (min-width: 768px) {
                    .hero__headline {
                        font-size: var(--text-display);
                    }
                }
                .hero__lead {
                    margin-bottom: var(--space-8);
                    max-width: 680px;
                    line-height: var(--leading-relaxed);
                }
                .hero__meta {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-2);
                    margin-bottom: var(--space-8);
                    padding-left: var(--space-4);
                    border-left: 2px solid var(--color-gold);
                }
                @media (min-width: 640px) {
                    .hero__meta {
                        flex-direction: row;
                        gap: var(--space-6);
                    }
                }
                .hero__meta-item {
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                }
                .hero__actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-4);
                }
                .hero__visual {
                    display: flex;
                    justify-content: center;
                }
                .hero__portrait-frame {
                    width: 100%;
                    max-width: 360px;
                    border: 1px solid var(--color-border);
                    background-color: var(--color-surface);
                    padding: var(--space-4);
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-lg);
                }
                .hero__portrait-img {
                    width: 100%;
                    aspect-ratio: 4 / 5;
                    object-fit: cover;
                    border-radius: var(--radius-sm);
                    margin-bottom: var(--space-3);
                }
                .hero__portrait-monogram {
                    width: 100%;
                    aspect-ratio: 4 / 5;
                    background: linear-gradient(145deg, var(--color-surface-alt) 0%, var(--color-ivory-warm) 100%);
                    border-radius: var(--radius-sm);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: var(--space-3);
                    border: 1px dashed var(--color-border);
                }
                .hero__monogram-letters {
                    font-size: 4.5rem;
                    color: var(--color-gold);
                    line-height: 1;
                    margin-bottom: var(--space-2);
                    font-weight: var(--weight-bold);
                }
                .hero__portrait-caption {
                    text-align: center;
                    border-top: 1px solid var(--color-border-light);
                    padding-top: var(--space-3);
                }
                .hero__highlights {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-4);
                    margin-top: var(--space-16);
                    padding-top: var(--space-12);
                    border-top: 1px solid var(--color-border-light);
                }
                @media (min-width: 768px) {
                    .hero__highlights {
                        grid-template-columns: repeat(3, 1fr);
                        gap: var(--space-6);
                    }
                }
                .highlight-card {
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-md);
                    padding: var(--space-6);
                }
                .highlight-card__title {
                    font-family: var(--font-serif);
                    font-size: var(--text-lg);
                    margin: var(--space-1) 0 var(--space-2);
                    color: var(--color-ink);
                }
            `}</style>
        </section>
    );
}
