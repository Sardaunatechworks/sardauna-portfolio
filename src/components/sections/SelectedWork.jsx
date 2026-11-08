import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import ProjectGrid from '../projects/ProjectGrid';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function SelectedWork() {
    const { projects } = usePortfolio();
    // Show top 3 or 4 selected projects on home
    const featuredProjects = projects.slice(0, 3);

    return (
        <section className="section" aria-label="Selected Projects">
            <div className="container">
                <div className="selected-work__header">
                    <SectionHeading
                        kicker="PORTFOLIO"
                        title="Selected Work &amp; Products"
                        subtitle="From enterprise resource planning to AI-assisted customer communication — digital tools engineered for real-world impact."
                    />
                    <div className="selected-work__header-cta">
                        <Button to="/projects" variant="secondary" size="md">
                            All Projects
                            <ArrowRight size={14} aria-hidden="true" />
                        </Button>
                    </div>
                </div>

                <ProjectGrid projects={featuredProjects} columns={3} />

                <div className="selected-work__footer text-center">
                    <p className="body-sm text-secondary" style={{ marginBottom: 'var(--space-4)' }}>
                        Interested in code architecture, deployment setups, or product roadmaps?
                    </p>
                    <Link to="/projects" className="inline-link font-medium">
                        Explore all projects and read deep-dive case studies →
                    </Link>
                </div>
            </div>

            <style>{`
                .selected-work__header {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: var(--space-8);
                }
                @media (min-width: 768px) {
                    .selected-work__header {
                        flex-direction: row;
                        align-items: flex-end;
                    }
                }
                .selected-work__header-cta {
                    margin-bottom: var(--space-12);
                }
                .selected-work__footer {
                    margin-top: var(--space-12);
                    padding: var(--space-8);
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-md);
                }
            `}</style>
        </section>
    );
}
