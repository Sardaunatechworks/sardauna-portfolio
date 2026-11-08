import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useSEO } from '../hooks/useSEO';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';

export default function InsightsPage() {
    useSEO({
        title: 'Insights & Perspectives | Muhammad Auwal Abubakar',
        description: 'Reflections and articles on technology entrepreneurship, digital systems architecture, and community empowerment in Africa.'
    });

    const articles = [
        {
            title: "Architecting Software for Local Realities: Lessons from Building TraderERP",
            slug: "architecting-software-local-realities",
            date: "October 2026",
            readTime: "5 min read",
            category: "Product & Architecture",
            excerpt: "How designing business management tools for traders and small retailers requires fundamentally rethinking connectivity resilience, mobile-first data tables, and minimal cognitive load.",
            topics: ["Enterprise Systems", "UX Architecture", "Emerging Markets"]
        },
        {
            title: "The Missing Link in Regional Tech Ecosystems: Sustained Mentorship",
            slug: "missing-link-regional-tech-ecosystems",
            date: "September 2026",
            readTime: "4 min read",
            category: "Community & Education",
            excerpt: "One-off bootcamps generate excitement, but durable technical careers require ongoing apprenticeships and practical project critiques. Insights from our work at Techfort and coding academies.",
            topics: ["Education", "Youth Empowerment", "Tech Community"]
        },
        {
            title: "Pragmatic Full-Stack Architecture: Why Simplicity Wins Over Hype",
            slug: "pragmatic-fullstack-architecture",
            date: "August 2026",
            readTime: "6 min read",
            category: "Engineering",
            excerpt: "A deep look into why combining standard relational Postgres, modular component boundaries, and lean static frontends offers far higher developer velocity and lower server maintenance.",
            topics: ["Web Engineering", "PostgreSQL", "React"]
        }
    ];

    return (
        <div className="insights-page">
            <header className="page-header bg-surface-alt">
                <div className="container">
                    <span className="eyebrow text-gold" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                        THOUGHTS &amp; PERSPECTIVES
                    </span>
                    <h1 className="h1 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                        Essays &amp; Technical Insights
                    </h1>
                    <p className="body-lg text-secondary" style={{ maxWidth: '720px' }}>
                        Reflections on product engineering, operational leadership, technology policy in Northern Nigeria, and cultivating developer communities.
                    </p>
                </div>
            </header>

            <div className="container" style={{ padding: 'var(--space-16) var(--space-4)' }}>
                <div className="articles-list">
                    {articles.map((article, idx) => (
                        <article key={idx} className="article-entry">
                            <Card padded hoverable>
                                <div className="article-entry__meta">
                                    <Badge variant="accent">{article.category}</Badge>
                                    <div className="article-entry__time-info caption text-tertiary">
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <Calendar size={12} aria-hidden="true" />
                                            {article.date}
                                        </span>
                                        <span>·</span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={12} aria-hidden="true" />
                                            {article.readTime}
                                        </span>
                                    </div>
                                </div>

                                <h2 className="article-entry__title h2 font-serif">
                                    {article.title}
                                </h2>

                                <p className="body-base text-secondary article-entry__excerpt">
                                    {article.excerpt}
                                </p>

                                <div className="article-entry__footer">
                                    <div className="article-entry__tags">
                                        {article.topics.map((t, tIdx) => (
                                            <span key={tIdx} className="caption font-mono text-tertiary">
                                                #{t.toLowerCase().replace(/\s+/g, '-')}
                                            </span>
                                        ))}
                                    </div>

                                    <Button to="/contact" variant="ghost" size="sm">
                                        <span>Discuss This Topic</span>
                                        <ArrowRight size={14} aria-hidden="true" />
                                    </Button>
                                </div>
                            </Card>
                        </article>
                    ))}
                </div>

                <div className="newsletter-card" style={{ marginTop: 'var(--space-16)' }}>
                    <Card padded className="bg-surface-alt text-center">
                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <BookOpen size={28} className="text-gold" style={{ marginBottom: 'var(--space-3)' }} aria-hidden="true" />
                            <h3 className="h3 font-serif" style={{ marginBottom: 'var(--space-2)' }}>
                                Looking for Technical Writing or Panel Contributions?
                            </h3>
                            <p className="body-sm text-secondary" style={{ marginBottom: 'var(--space-6)' }}>
                                Muhammad contributes perspectives on digital adoption, tech startups in Northern Nigeria, and software development methodologies.
                            </p>
                            <Button to="/contact" variant="primary" size="md">
                                Inquire for Guest Commentary
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            <style>{`
                .articles-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-8);
                    max-width: 860px;
                    margin: 0 auto;
                }
                .article-entry__meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-3);
                    flex-wrap: wrap;
                    gap: var(--space-2);
                }
                .article-entry__time-info {
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                }
                .article-entry__title {
                    font-size: var(--text-2xl);
                    margin-bottom: var(--space-3);
                    color: var(--color-ink);
                    line-height: var(--leading-snug);
                }
                .article-entry__excerpt {
                    margin-bottom: var(--space-6);
                    line-height: var(--leading-relaxed);
                }
                .article-entry__footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: var(--space-4);
                    padding-top: var(--space-4);
                    border-top: 1px solid var(--color-border-light);
                }
                .article-entry__tags {
                    display: flex;
                    gap: var(--space-3);
                }
            `}</style>
        </div>
    );
}
