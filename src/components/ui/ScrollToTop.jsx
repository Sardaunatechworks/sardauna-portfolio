import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 350) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            type="button"
            className={`scroll-to-top-btn ${isVisible ? 'scroll-to-top-btn--visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            title="Back to top"
        >
            <ArrowUp size={18} aria-hidden="true" />
            <style>{`
                .scroll-to-top-btn {
                    position: fixed;
                    bottom: var(--space-8);
                    right: var(--space-8);
                    z-index: 90;
                    width: 44px;
                    height: 44px;
                    border-radius: var(--radius-full);
                    background-color: var(--color-ink);
                    color: var(--color-ivory);
                    border: 1px solid var(--color-border);
                    box-shadow: var(--shadow-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.9);
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .scroll-to-top-btn--visible {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                .scroll-to-top-btn:hover {
                    background-color: var(--color-gold);
                    color: var(--color-ink);
                    transform: translateY(-4px) scale(1.05);
                    box-shadow: 0 10px 25px rgba(182, 154, 100, 0.35);
                }
                .scroll-to-top-btn:active {
                    transform: translateY(0) scale(0.95);
                }
                @media (max-width: 640px) {
                    .scroll-to-top-btn {
                        bottom: var(--space-6);
                        right: var(--space-6);
                        width: 40px;
                        height: 40px;
                    }
                }
            `}</style>
        </button>
    );
}
