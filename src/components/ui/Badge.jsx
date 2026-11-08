export default function Badge({
    children,
    variant = 'neutral', // 'neutral' | 'accent' | 'success' | 'warning'
    size = 'sm',
    className = ''
}) {
    return (
        <span className={`badge badge--${variant} badge--${size} ${className}`}>
            {children}
            <style>{`
                .badge {
                    display: inline-flex;
                    align-items: center;
                    font-family: var(--font-sans);
                    font-weight: var(--weight-medium);
                    border-radius: var(--radius-full);
                    line-height: 1;
                    white-space: nowrap;
                    transition: var(--transition-fast);
                }
                .badge--sm {
                    padding: 0.25rem 0.625rem;
                    font-size: var(--text-xs);
                    letter-spacing: 0.02em;
                }
                .badge--neutral {
                    background-color: var(--color-surface-alt);
                    color: var(--color-secondary);
                    border: 1px solid var(--color-border-light);
                }
                .badge--accent {
                    background-color: var(--color-gold-subtle);
                    color: var(--color-gold);
                    border: 1px solid rgba(182, 154, 100, 0.25);
                }
                .badge--success {
                    background-color: rgba(39, 174, 96, 0.1);
                    color: var(--color-success);
                    border: 1px solid rgba(39, 174, 96, 0.2);
                }
                .badge--warning {
                    background-color: rgba(230, 126, 34, 0.1);
                    color: #d35400;
                    border: 1px solid rgba(230, 126, 34, 0.25);
                }
            `}</style>
        </span>
    );
}
