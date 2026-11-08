import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectGrid from '../components/projects/ProjectGrid';
import { usePortfolio } from '../hooks/usePortfolio';
import { useSEO } from '../hooks/useSEO';

export default function ProjectsPage() {
    useSEO({
        title: 'Projects & Products Portfolio | Muhammad Auwal Abubakar',
        description: 'Explore web applications, SaaS tools, AI platforms, and community systems architected and built by Muhammad Auwal Abubakar.'
    });

    const { projects } = usePortfolio();
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Extract categories
    const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <div className="projects-page">
            <header className="page-header bg-surface-alt">
                <div className="container">
                    <span className="eyebrow text-gold" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                        WORK &amp; ARCHITECTURE
                    </span>
                    <h1 className="h1 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                        Selected Projects &amp; Platforms
                    </h1>
                    <p className="body-lg text-secondary" style={{ maxWidth: '720px' }}>
                        An index of digital platforms, enterprise tools, and applications created to solve business operations, event workflows, and customer support challenges.
                    </p>
                </div>
            </header>

            <div className="container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-24)' }}>
                {/* Category Filters */}
                {categories.length > 1 && (
                    <div className="category-filters" role="tablist" aria-label="Project categories">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={selectedCategory === cat}
                                className={`filter-btn ${selectedCategory === cat ? 'filter-btn--active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Project Grid */}
                <ProjectGrid projects={filteredProjects} columns={3} />
            </div>

            <style>{`
                .category-filters {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-2);
                    margin-bottom: var(--space-12);
                    padding-bottom: var(--space-4);
                    border-bottom: 1px solid var(--color-border-light);
                }
                .filter-btn {
                    padding: var(--space-2) var(--space-4);
                    font-size: var(--text-sm);
                    font-family: var(--font-sans);
                    font-weight: var(--weight-medium);
                    color: var(--color-secondary);
                    background-color: transparent;
                    border: 1px solid transparent;
                    border-radius: var(--radius-full);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                .filter-btn:hover {
                    color: var(--color-ink);
                    background-color: var(--color-surface-alt);
                }
                .filter-btn--active {
                    color: var(--color-ink);
                    background-color: var(--color-surface);
                    border-color: var(--color-border);
                    box-shadow: var(--shadow-sm);
                }
            `}</style>
        </div>
    );
}
