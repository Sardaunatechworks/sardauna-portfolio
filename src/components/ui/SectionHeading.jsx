export default function SectionHeading({
    kicker,
    title,
    subtitle,
    align = 'left', // 'left' | 'center'
    className = ''
}) {
    return (
        <div className={`section-heading ${align === 'center' ? 'section-heading--center text-center' : ''} ${className}`}>
            {kicker && <div className="eyebrow section-heading__kicker">{kicker}</div>}
            <h2 className="section-heading__title h2">{title}</h2>
            {subtitle && <p className="section-heading__subtitle body-lg text-secondary">{subtitle}</p>}
            <style>{`
                .section-heading {
                    margin-bottom: var(--space-12);
                }
                .section-heading__kicker {
                    margin-bottom: var(--space-3);
                }
                .section-heading__title {
                    margin-bottom: var(--space-3);
                    letter-spacing: var(--tracking-tight);
                }
                .section-heading__subtitle {
                    max-width: 640px;
                    line-height: var(--leading-relaxed);
                }
                .section-heading--center .section-heading__subtitle {
                    margin-left: auto;
                    margin-right: auto;
                }
            `}</style>
        </div>
    );
}
