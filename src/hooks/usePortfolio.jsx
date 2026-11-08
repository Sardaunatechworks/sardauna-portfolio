import { useState, useEffect, createContext, useContext } from 'react';
import { portfolioApi, authApi } from '../lib/api';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
    DEFAULT_PERSONAL_INFO,
    DEFAULT_EXPERIENCE,
    DEFAULT_PROJECTS,
    DEFAULT_SKILLS,
    DEFAULT_CERTIFICATIONS,
    DEFAULT_COMMUNITY,
    ROLES_ARRAY
} from '../data/defaults';

/* ── Portfolio Data Context ────────────────────────────────── */
const PortfolioContext = createContext(null);

export function usePortfolio() {
    const ctx = useContext(PortfolioContext);
    if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
    return ctx;
}

export function PortfolioProvider({ children }) {
    const [personalInfo, setPersonalInfo] = useState(DEFAULT_PERSONAL_INFO);
    const [experience, setExperience] = useState(DEFAULT_EXPERIENCE);
    const [projects, setProjects] = useState(DEFAULT_PROJECTS);
    const [skills, setSkills] = useState(DEFAULT_SKILLS);
    const [certifications, setCertifications] = useState(DEFAULT_CERTIFICATIONS);
    const [community, setCommunity] = useState(DEFAULT_COMMUNITY);
    const [loading, setLoading] = useState(true);
    const [backendType, setBackendType] = useState('offline'); // 'laravel' | 'supabase' | 'offline'
    const [supabaseConnected, setSupabaseConnected] = useState(false);
    const [dbIsEmpty, setDbIsEmpty] = useState(false);

    // Auth state
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // ── Check Authentication (Laravel Sanctum first, Supabase fallback) ──
    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            // 1. Try Laravel Sanctum session if token exists
            if (authApi.hasStoredToken()) {
                try {
                    const meData = await authApi.getMe();
                    if (isMounted && meData) {
                        setUser(meData);
                        setAuthLoading(false);
                        return;
                    }
                } catch {
                    // Token expired or invalid
                    authApi.logout().catch(() => {});
                }
            }

            // 2. Fallback to Supabase auth if configured
            if (isSupabaseConfigured()) {
                try {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (isMounted) {
                        setUser(session?.user ?? null);
                    }
                } catch {
                    if (isMounted) setUser(null);
                } finally {
                    if (isMounted) setAuthLoading(false);
                }
                return;
            }

            if (isMounted) setAuthLoading(false);
        };

        checkAuth();

        // Supabase auth subscription fallback
        let subscription = null;
        if (isSupabaseConfigured()) {
            const authSub = supabase.auth.onAuthStateChange((_event, session) => {
                if (isMounted && !authApi.hasStoredToken()) {
                    setUser(session?.user ?? null);
                    setAuthLoading(false);
                }
            });
            subscription = authSub.data?.subscription;
        }

        return () => {
            isMounted = false;
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    // ── Fetch Portfolio Data (Laravel API first, Supabase fallback, defaults safeguard) ──
    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setLoading(true);

            // Strategy 1: Attempt to load from Laravel 13 REST API
            try {
                const landing = await portfolioApi.fetchLandingData();
                const hasLaravelData = Boolean(
                    landing.profile ||
                    (landing.experiences && landing.experiences.length > 0) ||
                    (landing.projects && landing.projects.length > 0)
                );

                if (hasLaravelData && isMounted) {
                    setBackendType('laravel');
                    setSupabaseConnected(false);
                    setDbIsEmpty(false);

                    if (landing.profile) {
                        setPersonalInfo(prev => ({ ...prev, ...landing.profile }));
                    }

                    if (landing.experiences && landing.experiences.length > 0) {
                        setExperience(landing.experiences.map(e => ({
                            id: e.id,
                            role: e.role,
                            company: e.company,
                            date: e.date,
                            desc: Array.isArray(e.desc) ? e.desc : [e.desc].filter(Boolean)
                        })));
                    }

                    if (landing.projects && landing.projects.length > 0) {
                        setProjects(landing.projects.map(p => ({
                            id: p.id,
                            title: p.title,
                            slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                            desc: p.desc || p.overview || '',
                            tech: Array.isArray(p.tech) ? p.tech : [],
                            github: p.github || '',
                            demo: p.demo || '',
                            img: p.img || '',
                            status: p.status || 'Live',
                            role: p.role || 'Software Engineer',
                            category: p.category || 'Technology'
                        })));
                    }

                    if (landing.skills && landing.skills.length > 0) {
                        setSkills(landing.skills.map(s => (typeof s === 'string' ? s : s.name)));
                    }

                    if (landing.certifications && landing.certifications.length > 0) {
                        setCertifications(landing.certifications.map(c => ({
                            id: c.id,
                            title: c.title || c.name,
                            issuer: c.issuer,
                            date: c.date
                        })));
                    }

                    if (landing.community) {
                        setCommunity(landing.community);
                    }

                    setLoading(false);
                    return;
                }
            } catch (laravelErr) {
                // Laravel backend is currently unreachable (e.g. offline dev or unmounted route)
                console.info('Laravel API not reachable, attempting secondary provider...', laravelErr?.message);
            }

            // Strategy 2: Attempt Supabase if configured
            if (isSupabaseConfigured()) {
                try {
                    const [infoRes, expRes, projRes, skillsRes, certRes] = await Promise.all([
                        supabase.from('personal_info').select('*').limit(1).maybeSingle(),
                        supabase.from('experience').select('*').order('sort_order', { ascending: true }),
                        supabase.from('projects').select('*').order('sort_order', { ascending: true }),
                        supabase.from('skills').select('*').order('sort_order', { ascending: true }),
                        supabase.from('certifications').select('*').order('sort_order', { ascending: true })
                    ]);

                    const isDbEmpty = !infoRes.data &&
                        (!expRes.data || expRes.data.length === 0) &&
                        (!projRes.data || projRes.data.length === 0);

                    if (isMounted) {
                        setBackendType('supabase');
                        setSupabaseConnected(true);
                        setDbIsEmpty(isDbEmpty);

                        if (infoRes.data) setPersonalInfo(infoRes.data);
                        if (expRes.data && expRes.data.length > 0) {
                            setExperience(expRes.data.map(e => ({
                                id: e.id,
                                role: e.role,
                                company: e.company,
                                date: e.date,
                                desc: e.desc_points || []
                            })));
                        }
                        if (projRes.data && projRes.data.length > 0) {
                            setProjects(projRes.data.map(p => ({
                                id: p.id,
                                title: p.title,
                                slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                                desc: p.desc_text,
                                tech: p.tech || [],
                                github: p.github || '',
                                demo: p.demo || '',
                                img: p.img || '',
                                status: (p.tech || []).includes('UNDERDEVELOPMENT') ? 'In Development' : 'Live',
                                role: 'Developer',
                                category: 'Technology'
                            })));
                        }
                        if (skillsRes.data && skillsRes.data.length > 0) {
                            setSkills(skillsRes.data.map(s => s.name));
                        }
                        if (certRes.data && certRes.data.length > 0) {
                            setCertifications(certRes.data.map(c => ({
                                id: c.id,
                                title: c.title,
                                issuer: c.issuer,
                                date: c.date
                            })));
                        }
                    }
                } catch (supabaseErr) {
                    console.error('Error loading portfolio from Supabase:', supabaseErr);
                    if (isMounted) {
                        setBackendType('offline');
                    }
                } finally {
                    if (isMounted) setLoading(false);
                }
                return;
            }

            // Strategy 3: Pure offline mode using editorial defaults
            if (isMounted) {
                setBackendType('offline');
                setLoading(false);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    const value = {
        personalInfo, setPersonalInfo,
        experience, setExperience,
        projects, setProjects,
        skills, setSkills,
        certifications, setCertifications,
        community,
        loading, authLoading,
        user, setUser,
        backendType,
        supabaseConnected,
        dbIsEmpty, setDbIsEmpty
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
}

export default usePortfolio;
