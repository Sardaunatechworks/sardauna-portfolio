import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider, usePortfolio } from './hooks/usePortfolio';
import Layout from './components/layout/Layout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CommunityPage from './pages/CommunityPage';
import InsightsPage from './pages/InsightsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';

function AdminRoute() {
    const { user, authLoading, setUser } = usePortfolio();

    if (authLoading) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="caption text-secondary">Checking credentials...</span>
            </div>
        );
    }

    if (!user) {
        return <AdminLoginPage onLoginSuccess={(u) => setUser(u)} />;
    }

    return <AdminDashboardPage />;
}

export default function App() {
    return (
        <PortfolioProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    {/* Public Layout */}
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/experience" element={<ExperiencePage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/insights" element={<InsightsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/admin" element={<AdminRoute />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </PortfolioProvider>
    );
}
