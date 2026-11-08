import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project, featured = false }) {
    const slug = project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const isLive = project.status === 'Live' || (!project.status && project.demo);
    const hasImage = Boolean(project.img);

    return (
        <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
            {hasImage && (
                <div className="project-card__media">
                    <img
                        src={project.img}
                        alt={`Screenshot of ${project.title}`}
                        loading="lazy"
                        className="project-card__img"
                    />
                    <div className="project-card__media-badge">
                        <Badge variant={isLive ? 'success' : 'warning'}>
                            {project.status || (isLive ? 'Live' : 'In Development')}
                        </Badge>
                    </div>
                </div>
            )}

            <div className="project-card__body">
                <div className="project-card__meta">
                    <span className="caption text-secondary">{project.category || 'Software Platform'}</span>
                    {!hasImage && (
                        <Badge variant={isLive ? 'success' : 'warning'}>
                            {project.status || (isLive ? 'Live' : 'In Development')}
                        </Badge>
                    )}
                </div>

                <h3 className="project-card__title h3">
                    <Link to={`/projects/${slug}`} className="project-card__title-link">
                        {project.title}
                    </Link>
                </h3>

                {project.role && (
                    <p className="project-card__role caption text-gold">
                        Role: {project.role}
                    </p>
                )}

                <p className="project-card__desc body-sm text-secondary">
                    {project.desc}
                </p>

                {project.tech && project.tech.length > 0 && (
                    <div className="project-card__tech" aria-label="Technologies used">
                        {project.tech.map((t, idx) => (
                            <span key={idx} className="project-card__tech-tag">
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                <div className="project-card__actions">
                    <Link to={`/projects/${slug}`} className="project-card__view-btn">
                        <span>Read Case Study</span>
                        <ArrowRight size={14} aria-hidden="true" />
                    </Link>

                    <div className="project-card__external-links">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="project-card__icon-link"
                                aria-label={`GitHub repository for ${project.title}`}
                                title="View source on GitHub"
                            >
                                <Github size={16} aria-hidden="true" />
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="project-card__icon-link"
                                aria-label={`Live site for ${project.title}`}
                                title="Open live preview"
                            >
                                <ExternalLink size={16} aria-hidden="true" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .project-card {
                    display: flex;
                    flex-direction: column;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
                    height: 100%;
                }
                .project-card:hover {
                    transform: translateY(-3px);
                    border-color: var(--color-border);
                    box-shadow: var(--shadow-md);
                }
                .project-card__media {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    background-color: var(--color-surface-alt);
                    overflow: hidden;
                    border-bottom: 1px solid var(--color-border-light);
                }
                .project-card__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform var(--transition-normal);
                }
                .project-card:hover .project-card__img {
                    transform: scale(1.02);
                }
                .project-card__media-badge {
                    position: absolute;
                    top: var(--space-3);
                    right: var(--space-3);
                }
                .project-card__body {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    padding: var(--space-6);
                }
                .project-card__meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-2);
                }
                .project-card__title {
                    margin-bottom: var(--space-2);
                    font-size: var(--text-xl);
                }
                .project-card__title-link {
                    color: var(--color-ink);
                    text-decoration: none;
                    transition: color var(--transition-fast);
                }
                .project-card__title-link:hover {
                    color: var(--color-gold);
                }
                .project-card__role {
                    font-weight: var(--weight-medium);
                    margin-bottom: var(--space-3);
                }
                .project-card__desc {
                    margin-bottom: var(--space-4);
                    flex-grow: 1;
                    line-height: var(--leading-normal);
                }
                .project-card__tech {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-2);
                    margin-bottom: var(--space-6);
                }
                .project-card__tech-tag {
                    font-size: var(--text-xs);
                    font-family: var(--font-mono);
                    color: var(--color-secondary);
                    background-color: var(--color-surface-alt);
                    padding: 0.15rem 0.5rem;
                    border-radius: var(--radius-sm);
                    border: 1px solid var(--color-border-light);
                }
                .project-card__actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: var(--space-4);
                    border-top: 1px solid var(--color-border-light);
                    margin-top: auto;
                }
                .project-card__view-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--space-2);
                    font-size: var(--text-sm);
                    font-weight: var(--weight-medium);
                    color: var(--color-ink);
                    text-decoration: none;
                    transition: color var(--transition-fast), transform var(--transition-fast);
                }
                .project-card__view-btn:hover {
                    color: var(--color-gold);
                }
                .project-card__view-btn:hover svg {
                    transform: translateX(3px);
                }
                .project-card__external-links {
                    display: flex;
                    gap: var(--space-2);
                }
                .project-card__icon-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: var(--radius-sm);
                    color: var(--color-secondary);
                    border: 1px solid var(--color-border-light);
                    transition: all var(--transition-fast);
                }
                .project-card__icon-link:hover {
                    color: var(--color-ink);
                    border-color: var(--color-border);
                    background-color: var(--color-surface-alt);
                }
            `}</style>
        </article>
    );
}
