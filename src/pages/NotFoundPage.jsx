import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
    useSEO({
        title: '404: Page Not Found | Muhammad Auwal Abubakar',
        description: 'The requested page could not be located on this portfolio.'
    });

    return (
        <div className="not-found-page">
            <div className="container container--sm text-center">
                <span className="caption font-mono text-gold" style={{ fontSize: '1rem', display: 'block', marginBottom: 'var(--space-2)' }}>
                    HTTP 404
                </span>
                <h1 className="h1 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                    Page Not Found
                </h1>
                <p className="body-lg text-secondary" style={{ marginBottom: 'var(--space-8)', lineHeight: 'var(--leading-relaxed)' }}>
                    The page you are attempting to visit does not exist, has been relocated, or is temporarily unavailable.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <Button to="/" variant="primary" size="md">
                        <Home size={16} aria-hidden="true" />
                        <span>Return to Homepage</span>
                    </Button>
                    <Button to="/projects" variant="secondary" size="md">
                        <span>Browse Projects</span>
                    </Button>
                </div>
            </div>

            <style>{`
                .not-found-page {
                    min-height: 60vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--space-20) var(--space-4);
                }
            `}</style>
        </div>
    );
}
