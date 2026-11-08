import { usePortfolio } from '../../hooks/usePortfolio';

export default function SkillsMarquee() {
    const { skills } = usePortfolio();
    const displaySkills = skills && skills.length > 0 ? skills : [
        "React", "TypeScript", "JavaScript", "Supabase", "Next.js",
        "Tailwind CSS", "PHP", "REST APIs", "UI/UX Design", "Project Management",
        "Firebase", "Git & GitHub", "Agile Leadership"
    ];

    // Repeat skills to create infinite seamless loop
    const tripleSkills = [...displaySkills, ...displaySkills, ...displaySkills];

    return (
        <section className="marquee-wrapper" aria-label="Technical Proficiencies and Skills">
            <div className="marquee-fade marquee-fade--left" aria-hidden="true" />
            
            <div className="marquee-track">
                <div className="marquee-content">
                    {tripleSkills.map((skill, index) => (
                        <div key={index} className="marquee-item">
                            <span className="marquee-bullet font-serif">✦</span>
                            <span className="marquee-text font-mono">{skill}</span>
                        </div>
                    ))}
                </div>
                {/* Duplicate track for seamless infinite CSS animation */}
                <div className="marquee-content" aria-hidden="true">
                    {tripleSkills.map((skill, index) => (
                        <div key={`dup-${index}`} className="marquee-item">
                            <span className="marquee-bullet font-serif">✦</span>
                            <span className="marquee-text font-mono">{skill}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="marquee-fade marquee-fade--right" aria-hidden="true" />

            <style>{`
                .marquee-wrapper {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    background: linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-alt) 100%);
                    border-top: 1px solid var(--color-border-light);
                    border-bottom: 1px solid var(--color-border-light);
                    padding: var(--space-5) 0;
                }
                .marquee-track {
                    display: flex;
                    width: max-content;
                    user-select: none;
                }
                .marquee-track:hover .marquee-content {
                    animation-play-state: paused;
                }
                .marquee-content {
                    display: flex;
                    align-items: center;
                    gap: var(--space-8);
                    animation: marqueeScroll 35s linear infinite;
                    will-change: transform;
                    padding-right: var(--space-8);
                }
                @keyframes marqueeScroll {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-100%, 0, 0);
                    }
                }
                .marquee-item {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--space-3);
                    padding: 0.4rem 1rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-full);
                    box-shadow: var(--shadow-sm);
                    white-space: nowrap;
                    transition: transform var(--transition-fast), border-color var(--transition-fast), background-color var(--transition-fast);
                }
                .marquee-item:hover {
                    transform: translateY(-2px);
                    border-color: var(--color-gold);
                    background-color: var(--color-white);
                }
                .marquee-bullet {
                    color: var(--color-gold);
                    font-size: 0.85rem;
                }
                .marquee-text {
                    font-size: var(--text-sm);
                    font-weight: var(--weight-medium);
                    color: var(--color-ink);
                    letter-spacing: 0.02em;
                }
                .marquee-fade {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 80px;
                    z-index: 2;
                    pointer-events: none;
                }
                @media (min-width: 768px) {
                    .marquee-fade {
                        width: 140px;
                    }
                }
                .marquee-fade--left {
                    left: 0;
                    background: linear-gradient(to right, var(--color-surface) 10%, rgba(255, 255, 255, 0) 100%);
                }
                .marquee-fade--right {
                    right: 0;
                    background: linear-gradient(to left, var(--color-surface) 10%, rgba(255, 255, 255, 0) 100%);
                }
                @media (prefers-reduced-motion: reduce) {
                    .marquee-content {
                        animation: none;
                    }
                    .marquee-track {
                        overflow-x: auto;
                    }
                }
            `}</style>
        </section>
    );
}
