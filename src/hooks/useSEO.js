import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Updates document title and meta description per route.
 * Adds basic Open Graph tags for social sharing.
 */
export function useSEO({ title, description }) {
    const location = useLocation();
    const siteName = 'Muhammad Auwal Abubakar';
    const siteUrl = 'https://sardauna-portfolio.vercel.app';

    useEffect(() => {
        // Title
        document.title = title ? `${title} — ${siteName}` : `${siteName} — Technology Entrepreneur · Software Developer · Project Leader`;

        // Meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description || `Portfolio of ${siteName}, technology professional, entrepreneur, and project leader.`);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = `${siteUrl}${location.pathname}`;

        // Open Graph
        const ogTags = {
            'og:title': title || siteName,
            'og:description': description || `Portfolio of ${siteName}`,
            'og:url': `${siteUrl}${location.pathname}`,
            'og:type': 'website',
            'og:site_name': siteName
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        });

        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [title, description, location.pathname]);
}
