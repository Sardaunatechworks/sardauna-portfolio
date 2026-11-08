import Badge from '../ui/Badge';
import { Briefcase, Calendar } from 'lucide-react';

export default function ExperienceTimeline({ items }) {
    if (!items || items.length === 0) {
        return <p className="body-base text-secondary">No professional experience records found.</p>;
    }

    return (
        <div className="timeline" role="list">
            {items.map((item, idx) => (
                <article key={item.id || idx} className="timeline-item" role="listitem">
                    <div className="timeline-item__rail">
                        <div className="timeline-item__dot">
                            <Briefcase size={14} className="timeline-item__icon" aria-hidden="true" />
                        </div>
                        {idx < items.length - 1 && <div className="timeline-item__line" />}
                    </div>

                    <div className="timeline-item__content">
                        <div className="timeline-item__header">
                            <div>
                                <h3 className="timeline-item__role h3">{item.role}</h3>
                                <p className="timeline-item__company font-serif text-gold">
                                    {item.company}
                                </p>
                            </div>
                            <div className="timeline-item__badge-group">
                                {item.type && <Badge variant="neutral">{item.type}</Badge>}
                                <span className="timeline-item__date caption">
                                    <Calendar size={12} aria-hidden="true" />
                                    {item.date}
                                </span>
                            </div>
                        </div>

                        {item.desc && (
                            <ul className="timeline-item__bullets">
                                {(Array.isArray(item.desc) ? item.desc : [item.desc]).map((bullet, bIdx) => (
                                    <li key={bIdx} className="timeline-item__bullet body-sm text-secondary">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </article>
            ))}

            <style>{`
                .timeline {
                    display: flex;
                    flex-direction: column;
                }
                .timeline-item {
                    display: flex;
                    gap: var(--space-6);
                    position: relative;
                }
                .timeline-item__rail {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 32px;
                    flex-shrink: 0;
                }
                .timeline-item__dot {
                    width: 32px;
                    height: 32px;
                    border-radius: var(--radius-full);
                    background-color: var(--color-surface);
                    border: 2px solid var(--color-gold);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-gold);
                    z-index: 1;
                }
                .timeline-item__line {
                    width: 2px;
                    flex-grow: 1;
                    background-color: var(--color-border);
                    margin: var(--space-2) 0;
                }
                .timeline-item__content {
                    flex-grow: 1;
                    padding-bottom: var(--space-10);
                }
                .timeline-item__header {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-bottom: var(--space-3);
                    gap: var(--space-2);
                }
                @media (min-width: 640px) {
                    .timeline-item__header {
                        flex-direction: row;
                        align-items: flex-start;
                    }
                }
                .timeline-item__role {
                    font-size: var(--text-xl);
                    margin-bottom: var(--space-1);
                    color: var(--color-ink);
                }
                .timeline-item__company {
                    font-size: var(--text-base);
                    font-weight: var(--weight-medium);
                }
                .timeline-item__badge-group {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    flex-wrap: wrap;
                }
                .timeline-item__date {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--space-1);
                    color: var(--color-tertiary);
                    font-family: var(--font-mono);
                }
                .timeline-item__bullets {
                    list-style: none;
                    padding-left: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-2);
                }
                .timeline-item__bullet {
                    position: relative;
                    padding-left: var(--space-5);
                    line-height: var(--leading-normal);
                }
                .timeline-item__bullet::before {
                    content: "—";
                    position: absolute;
                    left: 0;
                    color: var(--color-gold);
                }
            `}</style>
        </div>
    );
}
