import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Community', path: '/community' },
    { label: 'Insights', path: '/insights' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Close menu on click outside
    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isMenuOpen]);

    // Trap focus inside mobile menu
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    return (
        <header
            className="header"
            style={{
                borderBottom: isScrolled ? '1px solid var(--color-border-light)' : '1px solid transparent',
                backgroundColor: isScrolled ? 'rgba(245, 243, 238, 0.95)' : 'rgba(245, 243, 238, 0.8)',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            }}
        >
            <a href="#main-content" className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>
                Skip to main content
            </a>

            <div className="header__inner container">
                {/* Wordmark */}
                <Link to="/" className="header__wordmark" aria-label="Muhammad Auwal Abubakar — Home">
                    <span className="header__monogram">MA.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="header__nav" aria-label="Main navigation">
                    {NAV_ITEMS.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`header__nav-link ${location.pathname === item.path ? 'header__nav-link--active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="header__actions">
                    <Link to="/contact" className="btn btn--primary btn--sm">
                        Contact
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="header__menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    <span className={`header__hamburger ${isMenuOpen ? 'header__hamburger--open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="header__mobile-overlay" onClick={() => setIsMenuOpen(false)}>
                    <nav
                        ref={menuRef}
                        id="mobile-menu"
                        className="header__mobile-menu"
                        aria-label="Mobile navigation"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {NAV_ITEMS.map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`header__mobile-link ${location.pathname === item.path ? 'header__mobile-link--active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <hr className="divider" style={{ margin: 'var(--space-4) 0' }} />
                        <Link to="/contact" className="btn btn--primary" style={{ width: '100%' }}>
                            Contact
                        </Link>
                    </nav>
                </div>
            )}

            <style>{`
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: var(--z-fixed);
                    transition: background-color var(--duration-normal) var(--ease-out),
                                border-color var(--duration-normal) var(--ease-out);
                }

                .header__inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 72px;
                }

                .header__wordmark {
                    text-decoration: none;
                    flex-shrink: 0;
                }

                .header__monogram {
                    font-family: var(--font-serif);
                    font-size: var(--text-2xl);
                    font-weight: var(--weight-bold);
                    color: var(--color-ink);
                    letter-spacing: var(--tracking-tight);
                }

                .header__nav {
                    display: none;
                    align-items: center;
                    gap: var(--space-8);
                }

                .header__nav-link {
                    font-size: var(--text-sm);
                    font-weight: var(--weight-medium);
                    color: var(--color-secondary);
                    text-decoration: none;
                    letter-spacing: var(--tracking-wide);
                    transition: color var(--duration-fast) var(--ease-out);
                    position: relative;
                }

                .header__nav-link:hover,
                .header__nav-link--active {
                    color: var(--color-ink);
                }

                .header__nav-link--active::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    right: 0;
                    height: 1.5px;
                    background-color: var(--color-gold);
                }

                .header__actions {
                    display: none;
                    align-items: center;
                    gap: var(--space-4);
                }

                .btn--sm {
                    padding: var(--space-2) var(--space-5);
                    font-size: var(--text-sm);
                }

                .header__menu-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                }

                .header__hamburger {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    width: 22px;
                }

                .header__hamburger span {
                    display: block;
                    height: 1.5px;
                    background-color: var(--color-ink);
                    border-radius: 1px;
                    transition: transform var(--duration-normal) var(--ease-out),
                                opacity var(--duration-fast) var(--ease-out);
                }

                .header__hamburger--open span:nth-child(1) {
                    transform: translateY(6.5px) rotate(45deg);
                }
                .header__hamburger--open span:nth-child(2) {
                    opacity: 0;
                }
                .header__hamburger--open span:nth-child(3) {
                    transform: translateY(-6.5px) rotate(-45deg);
                }

                .header__mobile-overlay {
                    position: fixed;
                    inset: 0;
                    top: 72px;
                    background-color: rgba(23, 32, 51, 0.3);
                    z-index: var(--z-overlay);
                    animation: fadeIn var(--duration-fast) var(--ease-out);
                }

                .header__mobile-menu {
                    background-color: var(--color-white);
                    border-bottom: 1px solid var(--color-border-light);
                    padding: var(--space-6);
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-1);
                    animation: fadeInUp var(--duration-normal) var(--ease-out);
                }

                .header__mobile-link {
                    display: block;
                    padding: var(--space-3) var(--space-4);
                    font-size: var(--text-lg);
                    font-weight: var(--weight-medium);
                    color: var(--color-secondary);
                    text-decoration: none;
                    border-radius: var(--radius-md);
                    transition: background-color var(--duration-fast) var(--ease-out),
                                color var(--duration-fast) var(--ease-out);
                }

                .header__mobile-link:hover,
                .header__mobile-link--active {
                    background-color: var(--color-surface-alt);
                    color: var(--color-ink);
                }

                @media (min-width: 768px) {
                    .header__nav { display: flex; }
                    .header__actions { display: flex; }
                    .header__menu-btn { display: none; }
                }
            `}</style>
        </header>
    );
}
