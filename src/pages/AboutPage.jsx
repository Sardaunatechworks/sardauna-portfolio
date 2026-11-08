import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { usePortfolio } from '../hooks/usePortfolio';
import { useSEO } from '../hooks/useSEO';
import { BIOGRAPHIES } from '../data/defaults';
import { Download, Mail, Award, CheckCircle2, MapPin, Terminal, Compass } from 'lucide-react';

export default function AboutPage() {
    useSEO({
        title: 'About Muhammad Auwal Abubakar | Biography, Skills & Background',
        description: 'Read the professional biography, technical skills, leadership background, and engineering philosophy of Muhammad Auwal Abubakar.'
    });

    const { personalInfo, skills, certifications } = usePortfolio();

    const skillCategories = [
        {
            title: 'Core Development & Web',
            skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Tailwind CSS', 'PHP']
        },
        {
            title: 'Cloud, Database & Backend',
            skills: ['Supabase', 'Firebase', 'PostgreSQL', 'REST APIs', 'Node.js', 'Vercel Deployment']
        },
        {
            title: 'Architecture & Project Leadership',
            skills: ['Agile / Scrum', 'Product Lifecycle', 'UI/UX Design', 'Team Mentorship', 'Operations Management']
        },
        {
            title: 'Developer Tooling & Workflows',
            skills: ['Git', 'GitHub', 'CI/CD Basics', 'Postman', 'Figma', 'Linux Environment']
        }
    ];

    return (
        <div className="about-page">
            <header className="page-header bg-surface-alt">
                <div className="container">
                    <span className="eyebrow text-gold" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                        BIOGRAPHY &amp; PROFILE
                    </span>
                    <h1 className="h1 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                        About Muhammad Auwal Abubakar
                    </h1>
                    <p className="body-lg text-secondary" style={{ maxWidth: '720px' }}>
                        Technology entrepreneur, software engineer, and project director dedicated to building functional digital tools and expanding tech empowerment across Northern Nigeria and globally.
                    </p>
                </div>
            </header>

            <div className="container" style={{ padding: 'var(--space-16) var(--space-4)' }}>
                <div className="about__grid">
                    {/* Main Narrative Column */}
                    <div className="about__narrative">
                        <article className="prose">
                            <h2 className="h2 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                                The Narrative
                            </h2>
                            <p className="body-lg" style={{ lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                                {BIOGRAPHIES.medium}
                            </p>

                            <h3 className="h3 font-serif" style={{ margin: 'var(--space-8) 0 var(--space-3)' }}>
                                Purpose-Driven Technology
                            </h3>
                            <p className="body-base text-secondary" style={{ lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                                In regional markets and emerging tech ecosystems, building software cannot occur in an abstract ivory tower. My work with Sardauna Tech Lab Ltd is built on practical observation: small businesses, vendors, event organizers, and learners frequently encounter high barriers to robust digital tools. By architecting focused, accessible platforms like TraderERP and SmartSupport, we make complex digital workflows intuitive and dependable.
                            </p>

                            <h3 className="h3 font-serif" style={{ margin: 'var(--space-8) 0 var(--space-3)' }}>
                                Community &amp; Ecosystem Leadership
                            </h3>
                            <p className="body-base text-secondary" style={{ lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                                Beyond writing code, I believe deeply in cultivating people. Through my leadership appointments at Techfort Community and Startup Jigawa, I have had the privilege to design curricula, coordinate regional hackathons and workshops, and guide aspiring developers through the fundamentals of modern web engineering. Sustainable technology ecosystems depend on continuous knowledge transfer.
                            </p>

                            <div className="about__quote-callout">
                                <blockquote className="body-lg font-serif italic text-ink">
                                    &ldquo;When you train an engineer, you empower a creator. When you build a practical system for a merchant, you strengthen a community.&rdquo;
                                </blockquote>
                            </div>
                        </article>

                        {/* Technical Competencies Matrix */}
                        <section style={{ marginTop: 'var(--space-16)' }}>
                            <SectionHeading
                                kicker="CAPABILITIES"
                                title="Technical &amp; Leadership Competencies"
                                subtitle="A curated breakdown of software engineering tools, architecture patterns, and executive capabilities."
                            />

                            <div className="skills-category-grid">
                                {skillCategories.map((cat, idx) => (
                                    <Card key={idx} padded>
                                        <h4 className="caption text-gold" style={{ marginBottom: 'var(--space-3)' }}>
                                            {cat.title}
                                        </h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                                            {cat.skills.map((skill, sIdx) => (
                                                <Badge key={sIdx} variant="neutral">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Certifications and Formal Recognition */}
                        <section style={{ marginTop: 'var(--space-16)' }}>
                            <SectionHeading
                                kicker="ACCREDITATION"
                                title="Certifications &amp; Programs"
                                subtitle="Verified credentials and technical training completions."
                            />

                            <div className="cert-list">
                                {certifications.map((cert, cIdx) => (
                                    <div key={cert.id || cIdx} className="cert-row">
                                        <div className="cert-row__icon text-gold">
                                            <Award size={18} aria-hidden="true" />
                                        </div>
                                        <div className="cert-row__info">
                                            <h4 className="body-base font-medium text-ink" style={{ margin: 0 }}>
                                                {cert.title}
                                            </h4>
                                            <span className="caption text-secondary">
                                                Issued by {cert.issuer}
                                            </span>
                                        </div>
                                        <span className="caption text-tertiary font-mono">
                                            {cert.date}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <aside className="about__sidebar">
                        <div className="about__sidebar-card">
                            <div className="about__avatar-container">
                                {personalInfo.profile_pic ? (
                                    <img
                                        src={personalInfo.profile_pic}
                                        alt={personalInfo.name}
                                        className="about__avatar-img"
                                    />
                                ) : (
                                    <div className="about__avatar-placeholder font-serif">
                                        MA
                                    </div>
                                )}
                            </div>

                            <h3 className="h3 font-serif" style={{ textAlign: 'center', marginBottom: 'var(--space-1)' }}>
                                {personalInfo.name || 'Muhammad Auwal Abubakar'}
                            </h3>
                            <p className="caption text-secondary text-center" style={{ marginBottom: 'var(--space-4)' }}>
                                Dutse, Jigawa State, Nigeria
                            </p>

                            <hr className="divider" style={{ margin: 'var(--space-4) 0' }} />

                            <div className="about__quick-details">
                                <div className="quick-detail">
                                    <span className="caption text-tertiary">Current Primary Role</span>
                                    <p className="body-sm font-medium">Founder &amp; CEO, Sardauna Tech Lab Ltd</p>
                                </div>
                                <div className="quick-detail">
                                    <span className="caption text-tertiary">Operations Leadership</span>
                                    <p className="body-sm font-medium">Project Manager, Startup Jigawa</p>
                                </div>
                                <div className="quick-detail">
                                    <span className="caption text-tertiary">Community Appointment</span>
                                    <p className="body-sm font-medium">Director of Projects, Techfort Community</p>
                                </div>
                                <div className="quick-detail">
                                    <span className="caption text-tertiary">Contact Email</span>
                                    <p className="body-sm font-medium">
                                        <a href={`mailto:${personalInfo.email}`} className="inline-link">
                                            {personalInfo.email}
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <hr className="divider" style={{ margin: 'var(--space-4) 0' }} />

                            <div className="about__sidebar-actions">
                                <Button to="/contact" variant="primary" size="md" style={{ width: '100%', justifyContent: 'center' }}>
                                    <Mail size={16} aria-hidden="true" />
                                    <span>Send an Inquiry</span>
                                </Button>
                                <Button to="/experience" variant="secondary" size="md" style={{ width: '100%', justifyContent: 'center' }}>
                                    <span>View Experience Timeline</span>
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style>{`
                .about__grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-12);
                }
                @media (min-width: 992px) {
                    .about__grid {
                        grid-template-columns: 1fr 340px;
                        gap: var(--space-16);
                    }
                }
                .about__quote-callout {
                    border-left: 3px solid var(--color-gold);
                    padding: var(--space-4) var(--space-6);
                    background-color: var(--color-surface-alt);
                    margin: var(--space-8) 0;
                    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
                }
                .skills-category-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-4);
                }
                @media (min-width: 640px) {
                    .skills-category-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                .cert-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-3);
                }
                .cert-row {
                    display: flex;
                    align-items: center;
                    gap: var(--space-4);
                    padding: var(--space-4);
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-sm);
                }
                .cert-row__info {
                    flex-grow: 1;
                }
                .about__sidebar-card {
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-md);
                    padding: var(--space-6);
                    position: sticky;
                    top: 100px;
                }
                .about__avatar-container {
                    display: flex;
                    justify-content: center;
                    margin-bottom: var(--space-4);
                }
                .about__avatar-img {
                    width: 120px;
                    height: 120px;
                    border-radius: var(--radius-full);
                    object-fit: cover;
                    border: 2px solid var(--color-gold);
                }
                .about__avatar-placeholder {
                    width: 100px;
                    height: 100px;
                    border-radius: var(--radius-full);
                    background: linear-gradient(135deg, var(--color-ivory-warm) 0%, var(--color-surface-alt) 100%);
                    color: var(--color-gold);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.25rem;
                    font-weight: var(--weight-bold);
                    border: 2px solid var(--color-gold);
                }
                .about__quick-details {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-3);
                }
                .about__sidebar-actions {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-3);
                }
            `}</style>
        </div>
    );
}
