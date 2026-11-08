import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../navigation/Header';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';

export default function Layout() {
    const location = useLocation();

    // Smooth scroll handling for route changes and hash navigation
    useEffect(() => {
        if (location.hash) {
            const targetId = location.hash.replace('#', '');
            const targetElem = document.getElementById(targetId);
            if (targetElem) {
                setTimeout(() => {
                    targetElem.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                return;
            }
        }
        // If route changes without hash, scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname, location.hash]);

    return (
        <>
            <Header />
            <main id="main-content" style={{ paddingTop: '72px' }}>
                <Outlet />
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
