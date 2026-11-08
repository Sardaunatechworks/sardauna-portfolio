import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import SelectedWork from '../components/sections/SelectedWork';
import ExperienceTimeline from '../components/sections/ExperienceTimeline';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { usePortfolio } from '../hooks/usePortfolio';
import { useSEO } from '../hooks/useSEO';
import { ArrowRight, Users, Award, BookOpen } from 'lucide-react';

export default function HomePage() {
    useSEO({
        title: 'Muhammad Auwal Abubakar | Technology Entrepreneur & Software Developer',
        description: 'Founder & CEO of Sardauna Tech Lab Ltd and Project Manager at Startup Jigawa. Building practical digital solutions and empowering communities through technology.'
    });

    const { experience, community, certifications } = usePortfolio();
    const recentExperience = experience.slice(0, 3);

    return (
        <div className="home-page">
            <HeroSection />

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

            {/* Bottom Invitation */}
            <section className="section bg-ivory" aria-label="Collaboration Inquiry">
                <div className="container container--sm text-center">
                    <SectionHeading
                        align="center"
                        kicker="COLLABORATION"
                        title="Have a Project or Initiative in Mind?"
                        subtitle="Available for consulting, technical leadership, keynote speaking, and strategic partnership discussions."
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                        <Button to="/contact" variant="primary" size="lg">
                            Get in Touch
                            <ArrowRight size={16} aria-hidden="true" />
                        </Button>
                        <Button to="/about" variant="secondary" size="lg">
                            More About Muhammad
                        </Button>
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
            `}</style>
        </div>
    );
}
