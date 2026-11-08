import { useState, useEffect, useCallback, createContext, useContext } from 'react';
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
    const [community] = useState(DEFAULT_COMMUNITY);
    const [loading, setLoading] = useState(isSupabaseConfigured());
    const [supabaseConnected, setSupabaseConnected] = useState(false);
    const [dbIsEmpty, setDbIsEmpty] = useState(false);

    // Auth state
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(isSupabaseConfigured());

    // Listen to auth
    useEffect(() => {
        if (!isSupabaseConfigured()) {
            setAuthLoading(false);
            return;
        }

        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setAuthLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setAuthLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Fetch all data from Supabase
    useEffect(() => {
        if (!isSupabaseConfigured()) {
            setLoading(false);
            return;
        }

        const fetchAllData = async () => {
            try {
                setSupabaseConnected(true);
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
            } catch (err) {
                console.error("Error loading portfolio from Supabase:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
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
        supabaseConnected,
        dbIsEmpty, setDbIsEmpty
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
}
