import SectionHeading from '../components/ui/SectionHeading';
import ExperienceTimeline from '../components/sections/ExperienceTimeline';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { usePortfolio } from '../hooks/usePortfolio';
import { useSEO } from '../hooks/useSEO';
import { Award, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';

export default function ExperiencePage() {
    useSEO({
        title: 'Experience & Career Trajectory | Muhammad Auwal Abubakar',
        description: 'Chronological career history, founder responsibilities, leadership appointments, and educational roles of Muhammad Auwal Abubakar.'
    });

    const { experience, certifications } = usePortfolio();

    return (
        <div className="experience-page">
            <header className="page-header bg-surface-alt">
                <div className="container">
                    <span className="eyebrow text-gold" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                        CAREER &amp; TRACK RECORD
                    </span>
                    <h1 className="h1 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                        Professional Experience
                    </h1>
                    <p className="body-lg text-secondary" style={{ maxWidth: '720px' }}>
                        A verified record of executive leadership, project operations management, digital product engineering, and youth technology instruction.
                    </p>
                </div>
            </header>

            <div className="container" style={{ padding: 'var(--space-16) var(--space-4)' }}>
                <div className="experience__layout">
                    {/* Main Timeline Column */}
                    <main className="experience__main">
                        <SectionHeading
                            kicker="CHRONOLOGY"
                            title="Work History &amp; Key Appointments"
                            subtitle="Detailed scope of responsibilities, operational outcomes, and deliverables."
                        />

                        <ExperienceTimeline items={experience} />

                        {/* Leadership Focus Callout */}
                        <div className="experience__leadership-box" style={{ marginTop: 'var(--space-12)' }}>
                            <Card padded>
                                <span className="eyebrow text-gold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                                    EXECUTIVE PERSPECTIVE
                                </span>
                                <h3 className="h3 font-serif" style={{ marginBottom: 'var(--space-3)' }}>
                                    How I Approach Project Leadership
                                </h3>
                                <p className="body-base text-secondary" style={{ lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)' }}>
                                    Whether managing operations at Startup Jigawa, coordinating fellow cohorts for NorthDemy, or running product roadmaps at Sardauna Tech Lab, I prioritize clarity over complexity. Reliable communication, explicit ownership boundaries, and empathetic team leadership consistently result in timely deliveries and higher team morale.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <CheckCircle size={16} className="text-gold" aria-hidden="true" />
                                        <span className="body-sm font-medium">Clear Milestones &amp; SLAs</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <CheckCircle size={16} className="text-gold" aria-hidden="true" />
                                        <span className="body-sm font-medium">Cross-Functional Sync</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <CheckCircle size={16} className="text-gold" aria-hidden="true" />
                                        <span className="body-sm font-medium">Agile Problem Deconstruction</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </main>

                    {/* Sidebar: Certifications & Teaching */}
                    <aside className="experience__sidebar">
                        <div className="sidebar-sticky">
                            <Card padded className="sidebar-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                                    <GraduationCap size={20} className="text-gold" aria-hidden="true" />
                                    <h3 className="h3 font-serif" style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
                                        Education &amp; Instruction
                                    </h3>
                                </div>
                                <div style={{ marginBottom: 'var(--space-6)' }}>
                                    <span className="caption text-tertiary">Teaching Position</span>
                                    <h4 className="body-sm font-medium text-ink" style={{ margin: 'var(--space-1) 0' }}>
                                        Coding Technology Digital Learning School
                                    </h4>
                                    <p className="caption text-secondary">
                                        Instructing students in HTML5, CSS3, JavaScript, PHP, and relational databases.
                                    </p>
                                </div>
                            </Card>

                            <Card padded className="sidebar-card" style={{ marginTop: 'var(--space-6)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                                    <Award size={20} className="text-gold" aria-hidden="true" />
                                    <h3 className="h3 font-serif" style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
                                        Accreditations
                                    </h3>
                                </div>
                                <div className="cert-stack">
                                    {certifications.map((c, i) => (
                                        <div key={i} className="cert-stack-item">
                                            <p className="body-sm font-medium text-ink" style={{ margin: 0 }}>
                                                {c.title}
                                            </p>
                                            <span className="caption text-tertiary">
                                                {c.issuer} · {c.date}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <div style={{ marginTop: 'var(--space-6)' }}>
                                <Button to="/contact" variant="primary" size="md" style={{ width: '100%', justifyContent: 'center' }}>
                                    Discuss an Opportunity
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style>{`
                .experience__layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-12);
                }
                @media (min-width: 992px) {
                    .experience__layout {
                        grid-template-columns: 1fr 340px;
                        gap: var(--space-16);
                    }
                }
                .sidebar-sticky {
                    position: sticky;
                    top: 100px;
                }
                .cert-stack {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-3);
                }
                .cert-stack-item {
                    padding-bottom: var(--space-3);
                    border-bottom: 1px solid var(--color-border-light);
                }
                .cert-stack-item:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }
            `}</style>
        </div>
    );
}
