import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Community', path: '/community' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact', path: '/contact' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
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

    // Prevent body scroll when mobile menu is open
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
            className={`header ${isScrolled ? 'header--scrolled' : ''}`}
        >
            <a href="#main-content" className="sr-only">
                Skip to main content
            </a>

            <div className="header__inner container">
                {/* Wordmark */}
                <Link to="/" className="header__wordmark" aria-label="Muhammad Auwal Abubakar — Home">
                    <span className="header__monogram font-serif">MA.</span>
                    <span className="header__brand-sub font-mono">portfolio</span>
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
                            {location.pathname === item.path && (
                                <span className="header__active-indicator" aria-hidden="true" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="header__actions">
                    <Link to="/contact" className="btn btn--primary btn--sm header__cta-btn">
                        Get in Touch
                    </Link>
                </div>

                {/* Animated Hamburger Toggle Button */}
                <button
                    className={`header__menu-btn ${isMenuOpen ? 'header__menu-btn--open' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                    <span className="header__hamburger-box">
                        <span className="header__hamburger-line line-1" />
                        <span className="header__hamburger-line line-2" />
                        <span className="header__hamburger-line line-3" />
                    </span>
                </button>
            </div>

            {/* Mobile Drawer Menu with Staggered Entrance Animations */}
            <div
                className={`header__mobile-overlay ${isMenuOpen ? 'header__mobile-overlay--open' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                aria-hidden={!isMenuOpen}
            >
                <nav
                    ref={menuRef}
                    id="mobile-menu"
                    className={`header__mobile-drawer ${isMenuOpen ? 'header__mobile-drawer--open' : ''}`}
                    aria-label="Mobile navigation"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="header__mobile-top">
                        <span className="eyebrow text-gold">NAVIGATION</span>
                        <span className="caption text-tertiary">Select destination</span>
                    </div>

                    <div className="header__mobile-links">
                        {NAV_ITEMS.map((item, idx) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{ '--item-idx': idx }}
                                className={`header__mobile-link ${location.pathname === item.path ? 'header__mobile-link--active' : ''}`}
                            >
                                <span className="header__mobile-link-text">{item.label}</span>
                                <span className="header__mobile-arrow font-serif">→</span>
                            </Link>
                        ))}
                    </div>

                    <div className="header__mobile-footer">
                        <Link
                            to="/contact"
                            className="btn btn--primary header__mobile-cta"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Initiate a Conversation
                        </Link>
                    </div>
                </nav>
            </div>

            <style>{`
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    background-color: rgba(245, 243, 238, 0.85);
                    border-bottom: 1px solid transparent;
                    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
                }
                .header--scrolled {
                    background-color: rgba(245, 243, 238, 0.95);
                    border-bottom: 1px solid var(--color-border-light);
                    box-shadow: 0 4px 20px rgba(23, 32, 51, 0.04);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }
                .header__inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 72px;
                }
                .header__wordmark {
                    display: flex;
                    align-items: baseline;
                    gap: var(--space-2);
                    text-decoration: none;
                    flex-shrink: 0;
                }
                .header__monogram {
                    font-size: var(--text-2xl);
                    font-weight: var(--weight-bold);
                    color: var(--color-ink);
                    letter-spacing: -0.03em;
                    transition: color var(--transition-fast);
                }
                .header__wordmark:hover .header__monogram {
                    color: var(--color-gold);
                }
                .header__brand-sub {
                    font-size: var(--text-xs);
                    color: var(--color-tertiary);
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .header__nav {
                    display: none;
                    align-items: center;
                    gap: var(--space-1);
                }
                .header__nav-link {
                    position: relative;
                    padding: var(--space-2) var(--space-3);
                    font-size: var(--text-sm);
                    font-weight: var(--weight-medium);
                    color: var(--color-secondary);
                    text-decoration: none;
                    border-radius: var(--radius-sm);
                    transition: color var(--transition-fast), background-color var(--transition-fast);
                }
                .header__nav-link:hover {
                    color: var(--color-ink);
                    background-color: rgba(182, 154, 100, 0.08);
                }
                .header__nav-link--active {
                    color: var(--color-ink);
                    font-weight: var(--weight-semibold);
                }
                .header__active-indicator {
                    position: absolute;
                    bottom: 2px;
                    left: var(--space-3);
                    right: var(--space-3);
                    height: 2px;
                    background-color: var(--color-gold);
                    border-radius: var(--radius-full);
                    animation: fadeIn 0.3s ease;
                }
                .header__actions {
                    display: none;
                    align-items: center;
                }
                .header__cta-btn {
                    box-shadow: 0 2px 8px rgba(182, 154, 100, 0.2);
                    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
                }
                .header__cta-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 14px rgba(182, 154, 100, 0.35);
                }

                /* ── Animated Hamburger Toggle ────────────────────── */
                .header__menu-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    border-radius: var(--radius-full);
                    background: transparent;
                    border: 1px solid transparent;
                    cursor: pointer;
                    padding: 0;
                    transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
                }
                .header__menu-btn:hover {
                    background-color: var(--color-gold-subtle);
                    border-color: rgba(182, 154, 100, 0.2);
                    transform: scale(1.05);
                }
                .header__menu-btn:active {
                    transform: scale(0.95);
                }
                .header__hamburger-box {
                    position: relative;
                    width: 22px;
                    height: 16px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .header__hamburger-line {
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-color: var(--color-ink);
                    border-radius: 2px;
                    transform-origin: center;
                    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                                opacity 0.25s ease,
                                background-color 0.3s ease;
                }
                /* Morph lines into 'X' */
                .header__menu-btn--open .line-1 {
                    transform: translateY(7px) rotate(45deg);
                    background-color: var(--color-gold);
                }
                .header__menu-btn--open .line-2 {
                    opacity: 0;
                    transform: scaleX(0);
                }
                .header__menu-btn--open .line-3 {
                    transform: translateY(-7px) rotate(-45deg);
                    background-color: var(--color-gold);
                }

                /* ── Animated Mobile Overlay & Drawer ────────────── */
                .header__mobile-overlay {
                    position: fixed;
                    inset: 0;
                    top: 72px;
                    background-color: rgba(23, 32, 51, 0.45);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    z-index: 99;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                                visibility 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .header__mobile-overlay--open {
                    opacity: 1;
                    visibility: visible;
                }
                .header__mobile-drawer {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid var(--color-border);
                    box-shadow: 0 16px 40px rgba(23, 32, 51, 0.12);
                    padding: var(--space-6);
                    max-height: calc(100vh - 72px);
                    overflow-y: auto;
                    transform: translateY(-20px);
                    opacity: 0;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                                opacity 0.3s ease;
                }
                .header__mobile-drawer--open {
                    transform: translateY(0);
                    opacity: 1;
                }
                .header__mobile-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: var(--space-3);
                    border-bottom: 1px solid var(--color-border-light);
                    margin-bottom: var(--space-4);
                }
                .header__mobile-links {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-2);
                }
                .header__mobile-link {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: var(--space-3) var(--space-4);
                    font-size: var(--text-lg);
                    font-weight: var(--weight-medium);
                    color: var(--color-ink);
                    text-decoration: none;
                    border-radius: var(--radius-md);
                    border: 1px solid transparent;
                    background-color: var(--color-surface-alt);
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                }
                /* Staggered link animation when drawer opens */
                .header__mobile-drawer--open .header__mobile-link {
                    animation: mobileLinkSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
                    animation-delay: calc(var(--item-idx, 0) * 0.05s + 0.1s);
                }
                @keyframes mobileLinkSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .header__mobile-link:hover,
                .header__mobile-link--active {
                    background-color: var(--color-white);
                    border-color: var(--color-border);
                    color: var(--color-gold);
                    transform: translateX(4px);
                    box-shadow: var(--shadow-sm);
                }
                .header__mobile-arrow {
                    color: var(--color-tertiary);
                    font-size: 1.1rem;
                    transition: transform var(--transition-fast), color var(--transition-fast);
                }
                .header__mobile-link:hover .header__mobile-arrow,
                .header__mobile-link--active .header__mobile-arrow {
                    color: var(--color-gold);
                    transform: translateX(4px);
                }
                .header__mobile-footer {
                    margin-top: var(--space-6);
                    padding-top: var(--space-4);
                    border-top: 1px solid var(--color-border-light);
                }
                .header__mobile-cta {
                    width: 100%;
                    justify-content: center;
                    padding: var(--space-3) var(--space-4);
                }

                @media (min-width: 860px) {
                    .header__nav { display: flex; }
                    .header__actions { display: flex; }
                    .header__menu-btn { display: none; }
                }
            `}</style>
        </header>
    );
}
