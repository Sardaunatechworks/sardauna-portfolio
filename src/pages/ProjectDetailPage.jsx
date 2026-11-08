import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';
import { useSEO } from '../hooks/useSEO';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Layers, Cpu, Compass } from 'lucide-react';

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { projects } = usePortfolio();

    const project = projects.find(p => {
        const pSlug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return pSlug === slug;
    });

    useSEO({
        title: project ? `${project.title} — Case Study | Muhammad Auwal Abubakar` : 'Project Not Found',
        description: project ? project.desc : 'Detailed case study and architecture breakdown.'
    });

    if (!project) {
        return (
            <div className="container" style={{ padding: 'var(--space-24) var(--space-4)', textAlign: 'center' }}>
                <h1 className="h2 font-serif" style={{ marginBottom: 'var(--space-4)' }}>Project Not Found</h1>
                <p className="body-base text-secondary" style={{ marginBottom: 'var(--space-6)' }}>
                    The project you are looking for does not exist or may have been renamed.
                </p>
                <Button to="/projects" variant="primary" size="md">
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to All Projects
                </Button>
            </div>
        );
    }

    const isLive = project.status === 'Live' || (!project.status && project.demo);

    return (
        <article className="project-detail-page">
            {/* Header */}
            <header className="page-header bg-surface-alt">
                <div className="container">
                    <div style={{ marginBottom: 'var(--space-6)' }}>
                        <Link to="/projects" className="back-link">
                            <ArrowLeft size={14} aria-hidden="true" />
                            <span>Back to Projects</span>
                        </Link>
                    </div>

                    <div className="project-detail__header-meta">
                        <span className="eyebrow text-gold">{project.category || 'Software Platform'}</span>
                        <Badge variant={isLive ? 'success' : 'warning'}>
                            {project.status || (isLive ? 'Live' : 'In Development')}
                        </Badge>
                    </div>

                    <h1 className="h1 font-serif" style={{ margin: 'var(--space-3) 0 var(--space-4)' }}>
                        {project.title}
                    </h1>

                    <p className="body-lg text-secondary" style={{ maxWidth: '800px', lineHeight: 'var(--leading-relaxed)' }}>
                        {project.desc}
                    </p>

                    <div className="project-detail__actions">
                        {project.demo && (
                            <Button href={project.demo} variant="primary" size="md">
                                <span>Visit Live Platform</span>
                                <ExternalLink size={16} aria-hidden="true" />
                            </Button>
                        )}
                        {project.github && (
                            <Button href={project.github} variant="secondary" size="md">
                                <Github size={16} aria-hidden="true" />
                                <span>View GitHub Source</span>
                            </Button>
                        )}
                        <Button to="/contact" variant="ghost" size="md">
                            Inquire About Architecture
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container" style={{ padding: 'var(--space-16) var(--space-4)' }}>
                <div className="project-detail__grid">
                    {/* Main Content Column */}
                    <div className="project-detail__body">
                        {project.img && (
                            <div className="project-detail__featured-img-box">
                                <img
                                    src={project.img}
                                    alt={`Platform preview of ${project.title}`}
                                    className="project-detail__featured-img"
                                />
                                <span className="caption text-tertiary" style={{ display: 'block', marginTop: 'var(--space-2)', textAlign: 'center' }}>
                                    Interface preview of {project.title}
                                </span>
                            </div>
                        )}

                        <section className="case-study-section">
                            <h2 className="h2 font-serif">1. Executive Overview</h2>
                            <p className="body-base text-secondary" style={{ lineHeight: 'var(--leading-relaxed)' }}>
                                {project.title} was conceived and architected to deliver modern, robust, and accessible technology tooling. Serving in the role of <strong>{project.role || 'Founder & Lead Developer'}</strong>, I led the core requirements gathering, database modeling, user journey formulation, and full-stack implementation.
                            </p>
                        </section>

                        <section className="case-study-section">
                            <h2 className="h2 font-serif">2. The Problem It Addresses</h2>
                            <p className="body-base text-secondary" style={{ lineHeight: 'var(--leading-relaxed)' }}>
                                Organizations and individuals frequently struggle with fragmented software tooling that requires extensive configuration or lacks localization for regional internet connectivity speeds and workflows. {project.title} eliminates friction by streamlining core operations into an intuitive, lightweight web environment that performs reliably across devices.
                            </p>
                        </section>

                        <section className="case-study-section">
                            <h2 className="h2 font-serif">3. Architecture &amp; Technical Choices</h2>
                            <p className="body-base text-secondary" style={{ lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)' }}>
                                The system is built using modern web standards prioritizing responsiveness, low bundle size, and maintainability:
                            </p>

                            <div className="tech-breakdown-list">
                                {project.tech && project.tech.map((techItem, idx) => (
                                    <div key={idx} className="tech-item-row">
                                        <Layers size={16} className="text-gold" aria-hidden="true" />
                                        <span className="body-sm font-medium text-ink">{techItem}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="case-study-section">
                            <h2 className="h2 font-serif">4. Operational Status &amp; Roadmap</h2>
                            <p className="body-base text-secondary" style={{ lineHeight: 'var(--leading-relaxed)' }}>
                                Status: <strong>{project.status || (isLive ? 'Live' : 'Active Development')}</strong>. Continuous testing and user feedback iterations are actively managed under Sardauna Tech Lab Ltd.
                            </p>
                        </section>

                        <hr className="divider" style={{ margin: 'var(--space-12) 0' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button to="/projects" variant="secondary" size="md">
                                <ArrowLeft size={16} aria-hidden="true" />
                                <span>All Projects</span>
                            </Button>
                            <Button to="/contact" variant="primary" size="md">
                                <span>Discuss This Project</span>
                            </Button>
                        </div>
                    </div>

                    {/* Meta Sidebar */}
                    <aside className="project-detail__sidebar">
                        <Card padded className="project-meta-card">
                            <h3 className="caption text-gold" style={{ marginBottom: 'var(--space-4)' }}>
                                SPECIFICATION SUMMARY
                            </h3>

                            <div className="meta-spec-row">
                                <span className="caption text-tertiary">Role</span>
                                <p className="body-sm font-medium">{project.role || 'Lead Developer'}</p>
                            </div>

                            <div className="meta-spec-row">
                                <span className="caption text-tertiary">Category</span>
                                <p className="body-sm font-medium">{project.category || 'Software Tool'}</p>
                            </div>

                            <div className="meta-spec-row">
                                <span className="caption text-tertiary">Current State</span>
                                <p className="body-sm font-medium">{project.status || (isLive ? 'Live' : 'In Development')}</p>
                            </div>

                            <div className="meta-spec-row">
                                <span className="caption text-tertiary">Technologies</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginTop: 'var(--space-1)' }}>
                                    {(project.tech || []).map((t, idx) => (
                                        <Badge key={idx} variant="neutral">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>

            <style>{`
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--space-2);
                    font-size: var(--text-sm);
                    color: var(--color-secondary);
                    text-decoration: none;
                    transition: color var(--transition-fast);
                }
                .back-link:hover {
                    color: var(--color-ink);
                }
                .project-detail__header-meta {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                }
                .project-detail__actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-3);
                    margin-top: var(--space-8);
                }
                .project-detail__grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-12);
                }
                @media (min-width: 992px) {
                    .project-detail__grid {
                        grid-template-columns: 1fr 320px;
                        gap: var(--space-16);
                    }
                }
                .project-detail__featured-img-box {
                    margin-bottom: var(--space-10);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    background-color: var(--color-surface);
                    padding: var(--space-2);
                }
                .project-detail__featured-img {
                    width: 100%;
                    height: auto;
                    border-radius: var(--radius-sm);
                }
                .case-study-section {
                    margin-bottom: var(--space-10);
                }
                .case-study-section h2 {
                    margin-bottom: var(--space-3);
                    font-size: var(--text-2xl);
                }
                .tech-breakdown-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: var(--space-3);
                }
                .tech-item-row {
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                    padding: var(--space-3);
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-sm);
                }
                .meta-spec-row {
                    margin-bottom: var(--space-4);
                    padding-bottom: var(--space-3);
                    border-bottom: 1px solid var(--color-border-light);
                }
                .meta-spec-row:last-child {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }
            `}</style>
        </article>
    );
}
