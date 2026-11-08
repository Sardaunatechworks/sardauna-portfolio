import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, columns = 3 }) {
    if (!projects || projects.length === 0) {
        return (
            <div className="empty-state text-center">
                <p className="body-base text-secondary">No projects to display.</p>
            </div>
        );
    }

    return (
        <div className={`project-grid project-grid--cols-${columns}`}>
            {projects.map((project, idx) => (
                <ProjectCard key={project.id || project.slug || idx} project={project} />
            ))}
            <style>{`
                .project-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-8);
                }
                @media (min-width: 640px) {
                    .project-grid--cols-2,
                    .project-grid--cols-3 {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 1024px) {
                    .project-grid--cols-3 {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                .empty-state {
                    padding: var(--space-16) 0;
                }
            `}</style>
        </div>
    );
}
