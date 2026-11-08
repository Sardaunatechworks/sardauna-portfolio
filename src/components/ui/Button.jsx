import { Link } from 'react-router-dom';

export default function Button({
    children,
    to,
    href,
    variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'text'
    size = 'md',        // 'sm' | 'md' | 'lg'
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    target,
    rel,
    ...props
}) {
    const baseClass = `btn btn--${variant} btn--${size} ${className}`.trim();

    if (to) {
        return (
            <Link to={to} className={baseClass} {...props}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a
                href={href}
                className={baseClass}
                target={target || (href.startsWith('http') ? '_blank' : undefined)}
                rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={baseClass}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
