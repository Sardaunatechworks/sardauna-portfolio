import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { authApi, isApiConfigured } from '../../lib/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Lock, Mail, ArrowLeft, AlertCircle, Loader2, Info, CheckCircle } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Attempt Laravel Sanctum login if API is configured
            let laravelSucceeded = false;
            if (isApiConfigured()) {
                try {
                    const res = await authApi.login(email, password);
                    if (res?.user || res?.token) {
                        laravelSucceeded = true;
                        if (onLoginSuccess) {
                            onLoginSuccess(res.user);
                        }
                        navigate('/admin');
                        return;
                    }
                } catch (laravelErr) {
                    // If Supabase is not configured, rethrow the Laravel error
                    if (!isSupabaseConfigured()) {
                        throw laravelErr;
                    }
                }
            }

            // 2. Fallback to Supabase if configured
            if (!laravelSucceeded && isSupabaseConfigured()) {
                const { data, error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (signInError) throw signInError;

                if (onLoginSuccess) {
                    onLoginSuccess(data.user);
                }
                navigate('/admin');
                return;
            }

            // 3. Offline Preview Mode (when neither live backend is configured in .env)
            if (!isApiConfigured() && !isSupabaseConfigured()) {
                const previewUser = {
                    id: 'offline-preview-admin',
                    email: email.trim() || 'admin@sardaunatech.com',
                    name: 'Muhammad Auwal Abubakar',
                    role: 'Administrator (Offline Preview)',
                    is_preview: true
                };
                if (onLoginSuccess) {
                    onLoginSuccess(previewUser);
                }
                navigate('/admin');
                return;
            }

            throw new Error('Authentication failed. Please verify your credentials.');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Authentication failed. Please verify your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="container container--sm">
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <Link to="/" className="inline-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <ArrowLeft size={16} aria-hidden="true" />
                        <span>Return to Website</span>
                    </Link>
                </div>

                <Card padded className="admin-login-card">
                    <div className="admin-login-header text-center">
                        <div className="admin-lock-icon text-gold">
                            <Lock size={28} aria-hidden="true" />
                        </div>
                        <h1 className="h2 font-serif" style={{ margin: 'var(--space-3) 0 var(--space-2)' }}>
                            Content Management System
                        </h1>
                        <p className="caption text-secondary">
                            Authorized personnel only · Secure Authentication
                        </p>
                    </div>

                    {isApiConfigured() ? (
                        <div className="admin-alert admin-alert--info" role="status" style={{ margin: 'var(--space-4) 0' }}>
                            <CheckCircle size={18} className="text-success flex-shrink-0" aria-hidden="true" />
                            <span>Connected to Laravel 13 REST API backend.</span>
                        </div>
                    ) : isSupabaseConfigured() ? (
                        <div className="admin-alert admin-alert--info" role="status" style={{ margin: 'var(--space-4) 0' }}>
                            <CheckCircle size={18} className="text-success flex-shrink-0" aria-hidden="true" />
                            <span>Connected to Supabase authentication.</span>
                        </div>
                    ) : (
                        <div className="admin-alert admin-alert--warning" role="status" style={{ margin: 'var(--space-4) 0' }}>
                            <Info size={18} className="flex-shrink-0" aria-hidden="true" />
                            <span>
                                <strong>Offline Preview Mode:</strong> Backend credentials are not set in <code>.env</code>. You can sign in with any email &amp; password to explore and test the dashboard. To connect to production, configure <code>VITE_API_BASE_URL</code>.
                            </span>
                        </div>
                    )}

                    {error && (
                        <div className="admin-alert admin-alert--error" role="alert" style={{ margin: 'var(--space-4) 0' }}>
                            <AlertCircle size={18} aria-hidden="true" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="admin-login-form" onSubmit={handleSubmit} style={{ marginTop: 'var(--space-6)' }}>
                        <div className="form-group">
                            <label htmlFor="admin-email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="admin-email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                                placeholder="admin@sardaunatech.com"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                            <label htmlFor="admin-password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="admin-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                placeholder="••••••••••••"
                                disabled={loading}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={loading}
                            style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-6)' }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <span>Sign In to Dashboard</span>
                            )}
                        </Button>
                    </form>
                </Card>
            </div>

            <style>{`
                .admin-login-page {
                    min-height: calc(100vh - 140px);
                    display: flex;
                    align-items: center;
                    padding: var(--space-12) var(--space-4);
                }
                .admin-login-card {
                    max-width: 480px;
                    margin: 0 auto;
                }
                .admin-lock-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: var(--radius-full);
                    background-color: var(--color-gold-subtle);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                }
                .admin-alert {
                    display: flex;
                    align-items: flex-start;
                    gap: var(--space-3);
                    padding: var(--space-3) var(--space-4);
                    border-radius: var(--radius-sm);
                    font-size: var(--text-sm);
                .admin-alert--info {
                    background-color: rgba(41, 128, 185, 0.08);
                    color: #2980b9;
                    border: 1px solid rgba(41, 128, 185, 0.25);
                }
                .admin-alert--warning {
                    background-color: rgba(230, 126, 34, 0.1);
                    color: #d35400;
                    border: 1px solid rgba(230, 126, 34, 0.25);
                }
                .admin-alert--error {
                    background-color: rgba(192, 57, 43, 0.1);
                    color: var(--color-error);
                    border: 1px solid rgba(192, 57, 43, 0.25);
                }
            `}</style>
        </div>
    );
}
