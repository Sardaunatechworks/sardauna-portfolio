export default function Card({
    children,
    className = '',
    hoverable = false,
    padded = true,
    as: Component = 'div',
    ...props
}) {
    return (
        <Component
            className={`card ${hoverable ? 'card--hoverable' : ''} ${padded ? 'card--padded' : ''} ${className}`}
            {...props}
        >
            {children}
            <style>{`
                .card {
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-md);
                    transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
                }
                .card--padded {
                    padding: var(--space-6);
                }
                @media (min-width: 768px) {
                    .card--padded {
                        padding: var(--space-8);
                    }
                }
                .card--hoverable:hover {
                    transform: translateY(-2px);
                    border-color: var(--color-border);
                    box-shadow: var(--shadow-md);
                }
            `}</style>
        </Component>
    );
}
