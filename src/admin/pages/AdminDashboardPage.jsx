import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { authApi, adminApi } from '../../lib/api';
import { usePortfolio } from '../../hooks/usePortfolio';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import {
    DEFAULT_PERSONAL_INFO,
    DEFAULT_EXPERIENCE,
    DEFAULT_PROJECTS,
    DEFAULT_SKILLS,
    DEFAULT_CERTIFICATIONS,
    ROLES_ARRAY
} from '../../data/defaults';
import {
    User, Briefcase, FolderGit2, Award, Wrench,
    LogOut, Plus, Trash2, Edit2, Upload, Database, CheckCircle, AlertCircle, RefreshCw
} from 'lucide-react';

export default function AdminDashboardPage() {
    const {
        personalInfo, setPersonalInfo,
        experience, setExperience,
        projects, setProjects,
        skills, setSkills,
        certifications, setCertifications,
        user, setUser,
        dbIsEmpty, setDbIsEmpty
    } = usePortfolio();

    const [activeTab, setActiveTab] = useState('general'); // 'general' | 'experience' | 'projects' | 'skills' | 'certifications'
    const [status, setStatus] = useState({ message: '', type: '' });

    // General Form State
    const [genForm, setGenForm] = useState({
        name: personalInfo.name || '',
        location: personalInfo.location || '',
        email: personalInfo.email || '',
        phone1: personalInfo.phone1 || '',
        phone2: personalInfo.phone2 || '',
        github: personalInfo.github || '',
        portfolio: personalInfo.portfolio || '',
        about: personalInfo.about || '',
        roles: (personalInfo.roles || []).join(', '),
        profile_pic: personalInfo.profile_pic || ''
    });
    const [isProfilePicUploading, setIsProfilePicUploading] = useState(false);

    // Experience Form State
    const [expForm, setExpForm] = useState(null); // null or { id, role, company, date, descPoints }

    // Project Form State
    const [projForm, setProjForm] = useState(null); // null or { id, title, desc, tech, github, demo, img, isUploading }

    // Skills State
    const [newSkill, setNewSkill] = useState('');

    // Certifications Form State
    const [certForm, setCertForm] = useState(null); // null or { id, title, issuer, date }

    const setFeedback = (message, type = 'info') => {
        setStatus({ message, type });
        if (type === 'success') {
            setTimeout(() => setStatus({ message: '', type: '' }), 4000);
        }
    };

    const handleLogout = async () => {
        try {
            await authApi.logout();
        } catch {
            // ignore
        }
        if (isSupabaseConfigured()) {
            try {
                await supabase.auth.signOut();
            } catch {
                // ignore
            }
        }
        setUser(null);
    };

    // ── 0. Initialize Database ──────────────────────────────────────
    const handleInitializeDatabase = async () => {
        if (!isSupabaseConfigured()) return;
        setFeedback('Initializing database with baseline seed...', 'info');

        try {
            // 1. Personal info
            const { data: infoData } = await supabase.from('personal_info').select('id').limit(1).maybeSingle();
            if (!infoData) {
                await supabase.from('personal_info').insert({
                    name: DEFAULT_PERSONAL_INFO.name,
                    location: DEFAULT_PERSONAL_INFO.location,
                    email: DEFAULT_PERSONAL_INFO.email,
                    phone1: DEFAULT_PERSONAL_INFO.phone1,
                    phone2: DEFAULT_PERSONAL_INFO.phone2,
                    github: DEFAULT_PERSONAL_INFO.github,
                    portfolio: DEFAULT_PERSONAL_INFO.portfolio,
                    about: DEFAULT_PERSONAL_INFO.about,
                    profile_pic: DEFAULT_PERSONAL_INFO.profile_pic,
                    roles: DEFAULT_PERSONAL_INFO.roles || ROLES_ARRAY
                });
            }

            // 2. Experience
            const { data: expData } = await supabase.from('experience').select('id').limit(1);
            if (!expData || expData.length === 0) {
                const expPayload = DEFAULT_EXPERIENCE.map((e, idx) => ({
                    role: e.role,
                    company: e.company,
                    date: e.date,
                    desc_points: e.desc,
                    sort_order: idx
                }));
                await supabase.from('experience').insert(expPayload);
            }

            // 3. Projects
            const { data: projData } = await supabase.from('projects').select('id').limit(1);
            if (!projData || projData.length === 0) {
                const projPayload = DEFAULT_PROJECTS.map((p, idx) => ({
                    title: p.title,
                    desc_text: p.desc,
                    tech: p.tech,
                    github: p.github,
                    demo: p.demo,
                    img: p.img,
                    sort_order: idx
                }));
                await supabase.from('projects').insert(projPayload);
            }

            // 4. Skills
            const { data: skillsData } = await supabase.from('skills').select('id').limit(1);
            if (!skillsData || skillsData.length === 0) {
                const skillsPayload = DEFAULT_SKILLS.map((name, idx) => ({
                    name,
                    sort_order: idx
                }));
                await supabase.from('skills').insert(skillsPayload);
            }

            // 5. Certifications
            const { data: certData } = await supabase.from('certifications').select('id').limit(1);
            if (!certData || certData.length === 0) {
                const certPayload = DEFAULT_CERTIFICATIONS.map((c, idx) => ({
                    title: c.title,
                    issuer: c.issuer,
                    date: c.date,
                    sort_order: idx
                }));
                await supabase.from('certifications').insert(certPayload);
            }

            setDbIsEmpty(false);
            setFeedback('Database initialized successfully! Refreshing...', 'success');
            setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
            console.error('Initialization error:', err);
            setFeedback('Failed to initialize database: ' + err.message, 'error');
        }
    };

    // ── 1. General Info Handlers ────────────────────────────────────
    const handleSaveGeneral = async (e) => {
        e.preventDefault();
        setFeedback('Saving general settings...', 'info');

        try {
            const rolesList = genForm.roles.split(',').map(r => r.trim()).filter(Boolean);
            const payload = {
                name: genForm.name,
                location: genForm.location,
                email: genForm.email,
                phone1: genForm.phone1,
                phone2: genForm.phone2,
                github: genForm.github,
                portfolio: genForm.portfolio,
                about: genForm.about,
                roles: rolesList,
                profile_pic: genForm.profile_pic
            };

            const { data: existing } = await supabase.from('personal_info').select('id').limit(1).maybeSingle();
            let err;
            if (existing) {
                const { error } = await supabase.from('personal_info').update(payload).eq('id', existing.id);
                err = error;
            } else {
                const { error } = await supabase.from('personal_info').insert(payload);
                err = error;
            }

            if (err) throw err;
            setPersonalInfo(prev => ({ ...prev, ...payload }));
            setFeedback('General settings saved successfully!', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Failed to save general settings: ' + err.message, 'error');
        }
    };

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsProfilePicUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `profile-${Date.now()}.${fileExt}`;
            const filePath = `profile-images/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-uploads')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-uploads')
                .getPublicUrl(filePath);

            setGenForm(prev => ({ ...prev, profile_pic: publicUrl }));
            setFeedback('Profile photograph uploaded successfully. Remember to click "Save Settings".', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Profile picture upload failed. Ensure bucket "portfolio-uploads" exists and is public.', 'error');
        } finally {
            setIsProfilePicUploading(false);
        }
    };

    // ── 2. Experience Handlers ──────────────────────────────────────
    const handleSaveExperience = async (e) => {
        e.preventDefault();
        setFeedback('Saving experience...', 'info');

        try {
            const points = expForm.descPoints.split('\n').map(l => l.trim()).filter(Boolean);
            const payload = {
                role: expForm.role,
                company: expForm.company,
                date: expForm.date,
                desc_points: points
            };

            let err;
            if (expForm.id) {
                const { error } = await supabase.from('experience').update(payload).eq('id', expForm.id);
                err = error;
                if (!err) {
                    setExperience(prev => prev.map(item => item.id === expForm.id ? { ...item, ...payload, desc: points } : item));
                }
            } else {
                const sort_order = experience.length;
                const { data, error } = await supabase.from('experience').insert({ ...payload, sort_order }).select().single();
                err = error;
                if (!err && data) {
                    setExperience(prev => [...prev, { ...data, desc: points }]);
                }
            }

            if (err) throw err;
            setExpForm(null);
            setFeedback('Experience item saved successfully!', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Failed to save experience: ' + err.message, 'error');
        }
    };

    const handleDeleteExperience = async (id) => {
        if (!id) {
            alert('This item only exists locally.');
            return;
        }
        if (!window.confirm('Are you sure you want to delete this experience entry?')) return;

        setFeedback('Deleting experience...', 'info');
        try {
            const { error } = await supabase.from('experience').delete().eq('id', id);
            if (error) throw error;
            setExperience(prev => prev.filter(item => item.id !== id));
            setFeedback('Experience deleted successfully!', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Failed to delete experience: ' + err.message, 'error');
        }
    };

    // ── 3. Projects Handlers ────────────────────────────────────────
    const handleSaveProject = async (e) => {
        e.preventDefault();
        setFeedback('Saving project...', 'info');

        try {
            const techList = projForm.tech.split(',').map(t => t.trim()).filter(Boolean);
            const payload = {
                title: projForm.title,
                desc_text: projForm.desc,
                tech: techList,
                github: projForm.github,
                demo: projForm.demo,
                img: projForm.img
            };

            let err;
            if (projForm.id) {
                const { error } = await supabase.from('projects').update(payload).eq('id', projForm.id);
                err = error;
                if (!err) {
                    setProjects(prev => prev.map(item => item.id === projForm.id ? { ...item, ...payload, desc: projForm.desc } : item));
                }
            } else {
                const sort_order = projects.length;
                const { data, error } = await supabase.from('projects').insert({ ...payload, sort_order }).select().single();
                err = error;
                if (!err && data) {
                    setProjects(prev => [...prev, {
                        ...data,
                        desc: data.desc_text,
                        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    }]);
                }
            }

            if (err) throw err;
            setProjForm(null);
            setFeedback('Project saved successfully!', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Failed to save project: ' + err.message, 'error');
        }
    };

    const handleProjectImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setProjForm(prev => ({ ...prev, isUploading: true }));

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `project-images/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-uploads')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-uploads')
                .getPublicUrl(filePath);

            setProjForm(prev => ({ ...prev, img: publicUrl, isUploading: false }));
        } catch (err) {
            console.error(err);
            alert('Image upload failed: ' + err.message);
            setProjForm(prev => ({ ...prev, isUploading: false }));
        }
    };

    const handleDeleteProject = async (id) => {
        if (!id) {
            alert('This item only exists locally.');
            return;
        }
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        setFeedback('Deleting project...', 'info');
        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            setProjects(prev => prev.filter(item => item.id !== id));
            setFeedback('Project deleted successfully!', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Failed to delete project: ' + err.message, 'error');
        }
    };

    // ── 4. Skills Handlers ──────────────────────────────────────────
    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.trim()) return;

        setFeedback('Adding skill...', 'info');
        try {
            const sort_order = skills.length;
            const { error } = await supabase.from('skills').insert({ name: newSkill.trim(), sort_order });
            if (error) throw error;

            setSkills(prev => [...prev, newSkill.trim()]);
            setNewSkill('');
            setFeedback('Skill added successfully!', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Failed to add skill: ' + err.message, 'error');
        }
    };

    const handleDeleteSkill = async (skillName) => {
        if (!window.confirm(`Delete skill "${skillName}"?`)) return;

        setFeedback('Deleting skill...', 'info');
        try {
            const { error } = await supabase.from('skills').delete().eq('name', skillName);
            if (error) throw error;

            setSkills(prev => prev.filter(s => s !== skillName));
            setFeedback('Skill removed successfully!', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Failed to remove skill: ' + err.message, 'error');
        }
    };

    // ── 5. Certifications Handlers ──────────────────────────────────
    const handleSaveCert = async (e) => {
        e.preventDefault();
        setFeedback('Saving certification...', 'info');

        try {
            const payload = {
                title: certForm.title,
                issuer: certForm.issuer,
                date: certForm.date
            };

            let err;
            if (certForm.id) {
                const { error } = await supabase.from('certifications').update(payload).eq('id', certForm.id);
                err = error;
                if (!err) {
                    setCertifications(prev => prev.map(item => item.id === certForm.id ? { ...item, ...payload } : item));
                }
            } else {
                const sort_order = certifications.length;
                const { data, error } = await supabase.from('certifications').insert({ ...payload, sort_order }).select().single();
                err = error;
                if (!err && data) {
                    setCertifications(prev => [...prev, data]);
                }
            }

            if (err) throw err;
            setCertForm(null);
            setFeedback('Certification saved successfully!', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Failed to save certification: ' + err.message, 'error');
        }
    };

    const handleDeleteCert = async (id) => {
        if (!id) {
            alert('This item only exists locally.');
            return;
        }
        if (!window.confirm('Delete this certification record?')) return;

        setFeedback('Deleting certification...', 'info');
        try {
            const { error } = await supabase.from('certifications').delete().eq('id', id);
            if (error) throw error;
            setCertifications(prev => prev.filter(item => item.id !== id));
            setFeedback('Certification deleted successfully!', 'success');
        } catch (err) {
            console.error(err);
            setFeedback('Failed to delete certification: ' + err.message, 'error');
        }
    };

    return (
        <div className="admin-dashboard-page">
            <header className="admin-dashboard-header">
                <div className="container">
                    <div className="admin-dash-top">
                        <div>
                            <span className="eyebrow text-gold">CMS PORTAL</span>
                            <h1 className="h2 font-serif" style={{ margin: 'var(--space-1) 0' }}>
                                Content Management System
                            </h1>
                            <p className="caption text-secondary">
                                Logged in as: <strong>{user?.email || 'Administrator'}</strong>
                            </p>
                        </div>

                        <div className="admin-dash-actions">
                            {dbIsEmpty && (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleInitializeDatabase}
                                    title="Seed empty Supabase tables with initial portfolio content"
                                >
                                    <Database size={14} aria-hidden="true" />
                                    <span>Seed Defaults</span>
                                </Button>
                            )}

                            <Button variant="ghost" size="sm" onClick={handleLogout}>
                                <LogOut size={14} aria-hidden="true" />
                                <span>Sign Out</span>
                            </Button>
                        </div>
                    </div>

                    {status.message && (
                        <div className={`status-banner status-banner--${status.type}`} role="status">
                            {status.type === 'success' ? (
                                <CheckCircle size={18} aria-hidden="true" />
                            ) : (
                                <AlertCircle size={18} aria-hidden="true" />
                            )}
                            <span>{status.message}</span>
                        </div>
                    )}

                    {/* Navigation Tabs */}
                    <nav className="admin-tabs" aria-label="CMS Sections">
                        <button
                            className={`admin-tab ${activeTab === 'general' ? 'admin-tab--active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            <User size={16} aria-hidden="true" />
                            <span>General Profile</span>
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'experience' ? 'admin-tab--active' : ''}`}
                            onClick={() => setActiveTab('experience')}
                        >
                            <Briefcase size={16} aria-hidden="true" />
                            <span>Experience ({experience.length})</span>
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'projects' ? 'admin-tab--active' : ''}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <FolderGit2 size={16} aria-hidden="true" />
                            <span>Projects ({projects.length})</span>
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'skills' ? 'admin-tab--active' : ''}`}
                            onClick={() => setActiveTab('skills')}
                        >
                            <Wrench size={16} aria-hidden="true" />
                            <span>Skills ({skills.length})</span>
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'certifications' ? 'admin-tab--active' : ''}`}
                            onClick={() => setActiveTab('certifications')}
                        >
                            <Award size={16} aria-hidden="true" />
                            <span>Certifications ({certifications.length})</span>
                        </button>
                    </nav>
                </div>
            </header>

            <main className="container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-24)' }}>
                {/* ── TAB 1: GENERAL PROFILE ── */}
                {activeTab === 'general' && (
                    <Card padded className="admin-panel">
                        <h2 className="h3 font-serif" style={{ marginBottom: 'var(--space-6)' }}>
                            Personal Information &amp; Bio Settings
                        </h2>

                        <form onSubmit={handleSaveGeneral}>
                            <div className="admin-form-grid">
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={genForm.name}
                                        onChange={e => setGenForm({ ...genForm, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={genForm.location}
                                        onChange={e => setGenForm({ ...genForm, location: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={genForm.email}
                                        onChange={e => setGenForm({ ...genForm, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Phone 1</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={genForm.phone1}
                                        onChange={e => setGenForm({ ...genForm, phone1: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Phone 2</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={genForm.phone2}
                                        onChange={e => setGenForm({ ...genForm, phone2: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">GitHub URL</label>
                                    <input
                                        type="url"
                                        className="form-input"
                                        value={genForm.github}
                                        onChange={e => setGenForm({ ...genForm, github: e.target.value })}
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Roles (comma separated)</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={genForm.roles}
                                        onChange={e => setGenForm({ ...genForm, roles: e.target.value })}
                                        placeholder="Software Developer, Technology Entrepreneur, Project Leader"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">About Bio</label>
                                    <textarea
                                        rows={5}
                                        className="form-textarea"
                                        value={genForm.about}
                                        onChange={e => setGenForm({ ...genForm, about: e.target.value })}
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Profile Photograph</label>
                                    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                                        {genForm.profile_pic ? (
                                            <img
                                                src={genForm.profile_pic}
                                                alt="Profile Preview"
                                                style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-alt)', border: '1px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={24} className="text-tertiary" />
                                            </div>
                                        )}
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="profile-pic-input"
                                                style={{ display: 'none' }}
                                                onChange={handleProfilePicUpload}
                                                disabled={isProfilePicUploading}
                                            />
                                            <label htmlFor="profile-pic-input" className="btn btn--secondary btn--sm" style={{ cursor: 'pointer' }}>
                                                <Upload size={14} aria-hidden="true" />
                                                <span>{isProfilePicUploading ? 'Uploading...' : 'Upload Authentic Photo'}</span>
                                            </label>
                                            <p className="caption text-tertiary" style={{ marginTop: 'var(--space-1)' }}>
                                                Supplied photographs are uploaded directly to the portfolio storage bucket.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: 'var(--space-8)' }}>
                                <Button type="submit" variant="primary" size="lg">
                                    Save Profile Settings
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                {/* ── TAB 2: EXPERIENCE ── */}
                {activeTab === 'experience' && (
                    <div className="admin-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                            <h2 className="h3 font-serif">Manage Professional Experience</h2>
                            {!expForm && (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setExpForm({ role: '', company: '', date: '', descPoints: '' })}
                                >
                                    <Plus size={16} aria-hidden="true" />
                                    <span>Add Experience</span>
                                </Button>
                            )}
                        </div>

                        {expForm && (
                            <Card padded className="admin-form-box" style={{ marginBottom: 'var(--space-8)' }}>
                                <h3 className="h4 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                                    {expForm.id ? 'Edit Experience' : 'New Experience Item'}
                                </h3>
                                <form onSubmit={handleSaveExperience}>
                                    <div className="admin-form-grid">
                                        <div className="form-group">
                                            <label className="form-label">Role / Title</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                required
                                                value={expForm.role}
                                                onChange={e => setExpForm({ ...expForm, role: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Company / Organization</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                required
                                                value={expForm.company}
                                                onChange={e => setExpForm({ ...expForm, company: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label className="form-label">Date Range</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g. 2025 – Present"
                                                required
                                                value={expForm.date}
                                                onChange={e => setExpForm({ ...expForm, date: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label className="form-label">Description Points (one per line)</label>
                                            <textarea
                                                rows={4}
                                                className="form-textarea"
                                                value={expForm.descPoints}
                                                onChange={e => setExpForm({ ...expForm, descPoints: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                                        <Button type="submit" variant="primary" size="md">Save Entry</Button>
                                        <Button variant="ghost" size="md" onClick={() => setExpForm(null)}>Cancel</Button>
                                    </div>
                                </form>
                            </Card>
                        )}

                        <div className="admin-item-list">
                            {experience.map((item) => (
                                <Card key={item.id || item.role} padded className="admin-item-row">
                                    <div style={{ flexGrow: 1 }}>
                                        <h4 className="body-base font-medium text-ink" style={{ margin: 0 }}>
                                            {item.role} · <span className="text-gold font-serif">{item.company}</span>
                                        </h4>
                                        <span className="caption font-mono text-tertiary">{item.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                        <button
                                            className="icon-btn"
                                            onClick={() => setExpForm({
                                                id: item.id,
                                                role: item.role,
                                                company: item.company,
                                                date: item.date,
                                                descPoints: (Array.isArray(item.desc) ? item.desc : []).join('\n')
                                            })}
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            className="icon-btn icon-btn--danger"
                                            onClick={() => handleDeleteExperience(item.id)}
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── TAB 3: PROJECTS ── */}
                {activeTab === 'projects' && (
                    <div className="admin-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                            <h2 className="h3 font-serif">Manage Projects &amp; Products</h2>
                            {!projForm && (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setProjForm({ title: '', desc: '', tech: '', github: '', demo: '', img: '', isUploading: false })}
                                >
                                    <Plus size={16} aria-hidden="true" />
                                    <span>Add Project</span>
                                </Button>
                            )}
                        </div>

                        {projForm && (
                            <Card padded className="admin-form-box" style={{ marginBottom: 'var(--space-8)' }}>
                                <h3 className="h4 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                                    {projForm.id ? 'Edit Project' : 'New Project'}
                                </h3>
                                <form onSubmit={handleSaveProject}>
                                    <div className="admin-form-grid">
                                        <div className="form-group">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                required
                                                value={projForm.title}
                                                onChange={e => setProjForm({ ...projForm, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Technologies (comma separated)</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="React, Next.js, Supabase"
                                                value={projForm.tech}
                                                onChange={e => setProjForm({ ...projForm, tech: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">GitHub URL</label>
                                            <input
                                                type="url"
                                                className="form-input"
                                                value={projForm.github}
                                                onChange={e => setProjForm({ ...projForm, github: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Live Demo URL</label>
                                            <input
                                                type="url"
                                                className="form-input"
                                                value={projForm.demo}
                                                onChange={e => setProjForm({ ...projForm, demo: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                rows={4}
                                                className="form-textarea"
                                                value={projForm.desc}
                                                onChange={e => setProjForm({ ...projForm, desc: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label className="form-label">Screenshot / Interface Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleProjectImageUpload}
                                                disabled={projForm.isUploading}
                                            />
                                            {projForm.img && (
                                                <div style={{ marginTop: 'var(--space-2)' }}>
                                                    <img
                                                        src={projForm.img}
                                                        alt="Project preview"
                                                        style={{ width: '120px', height: '68px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                                        <Button type="submit" variant="primary" size="md">Save Project</Button>
                                        <Button variant="ghost" size="md" onClick={() => setProjForm(null)}>Cancel</Button>
                                    </div>
                                </form>
                            </Card>
                        )}

                        <div className="admin-item-list">
                            {projects.map((p) => (
                                <Card key={p.id || p.title} padded className="admin-item-row">
                                    <div style={{ flexGrow: 1 }}>
                                        <h4 className="body-base font-medium text-ink" style={{ margin: 0 }}>
                                            {p.title}
                                        </h4>
                                        <p className="caption text-secondary" style={{ margin: 'var(--space-1) 0' }}>
                                            {p.desc}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                        <button
                                            className="icon-btn"
                                            onClick={() => setProjForm({
                                                id: p.id,
                                                title: p.title,
                                                desc: p.desc,
                                                tech: (p.tech || []).join(', '),
                                                github: p.github || '',
                                                demo: p.demo || '',
                                                img: p.img || '',
                                                isUploading: false
                                            })}
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            className="icon-btn icon-btn--danger"
                                            onClick={() => handleDeleteProject(p.id)}
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── TAB 4: SKILLS ── */}
                {activeTab === 'skills' && (
                    <Card padded className="admin-panel">
                        <h2 className="h3 font-serif" style={{ marginBottom: 'var(--space-6)' }}>
                            Manage Technical Skills
                        </h2>

                        <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter skill name (e.g. Next.js, Docker, UI Design)"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                style={{ maxWidth: '400px' }}
                            />
                            <Button type="submit" variant="primary" size="md">
                                <Plus size={16} aria-hidden="true" />
                                <span>Add Skill</span>
                            </Button>
                        </form>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                            {skills.map((skill, idx) => (
                                <span key={idx} className="skill-admin-tag">
                                    <span>{skill}</span>
                                    <button
                                        type="button"
                                        className="skill-remove-btn"
                                        onClick={() => handleDeleteSkill(skill)}
                                        title={`Remove ${skill}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </Card>
                )}

                {/* ── TAB 5: CERTIFICATIONS ── */}
                {activeTab === 'certifications' && (
                    <div className="admin-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                            <h2 className="h3 font-serif">Manage Certifications</h2>
                            {!certForm && (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setCertForm({ title: '', issuer: '', date: '' })}
                                >
                                    <Plus size={16} aria-hidden="true" />
                                    <span>Add Certification</span>
                                </Button>
                            )}
                        </div>

                        {certForm && (
                            <Card padded className="admin-form-box" style={{ marginBottom: 'var(--space-8)' }}>
                                <h3 className="h4 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                                    {certForm.id ? 'Edit Certification' : 'New Certification'}
                                </h3>
                                <form onSubmit={handleSaveCert}>
                                    <div className="admin-form-grid">
                                        <div className="form-group full-width">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                required
                                                value={certForm.title}
                                                onChange={e => setCertForm({ ...certForm, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Issuer</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                required
                                                value={certForm.issuer}
                                                onChange={e => setCertForm({ ...certForm, issuer: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Year / Date</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                required
                                                value={certForm.date}
                                                onChange={e => setCertForm({ ...certForm, date: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                                        <Button type="submit" variant="primary" size="md">Save Certification</Button>
                                        <Button variant="ghost" size="md" onClick={() => setCertForm(null)}>Cancel</Button>
                                    </div>
                                </form>
                            </Card>
                        )}

                        <div className="admin-item-list">
                            {certifications.map((c) => (
                                <Card key={c.id || c.title} padded className="admin-item-row">
                                    <div style={{ flexGrow: 1 }}>
                                        <h4 className="body-base font-medium text-ink" style={{ margin: 0 }}>
                                            {c.title}
                                        </h4>
                                        <span className="caption text-secondary">
                                            {c.issuer} · <span className="font-mono text-tertiary">{c.date}</span>
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                        <button
                                            className="icon-btn"
                                            onClick={() => setCertForm({
                                                id: c.id,
                                                title: c.title,
                                                issuer: c.issuer,
                                                date: c.date
                                            })}
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            className="icon-btn icon-btn--danger"
                                            onClick={() => handleDeleteCert(c.id)}
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <style>{`
                .admin-dashboard-header {
                    background-color: var(--color-surface);
                    border-bottom: 1px solid var(--color-border-light);
                    padding-top: var(--space-8);
                }
                .admin-dash-top {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-bottom: var(--space-6);
                    gap: var(--space-4);
                }
                @media (min-width: 640px) {
                    .admin-dash-top {
                        flex-direction: row;
                        align-items: flex-start;
                    }
                }
                .admin-dash-actions {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                }
                .status-banner {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    padding: var(--space-3) var(--space-4);
                    border-radius: var(--radius-sm);
                    margin-bottom: var(--space-6);
                    font-size: var(--text-sm);
                }
                .status-banner--success {
                    background-color: rgba(39, 174, 96, 0.1);
                    color: var(--color-success);
                    border: 1px solid rgba(39, 174, 96, 0.2);
                }
                .status-banner--error {
                    background-color: rgba(192, 57, 43, 0.1);
                    color: var(--color-error);
                    border: 1px solid rgba(192, 57, 43, 0.2);
                }
                .status-banner--info {
                    background-color: var(--color-surface-alt);
                    color: var(--color-ink);
                    border: 1px solid var(--color-border);
                }
                .admin-tabs {
                    display: flex;
                    gap: var(--space-2);
                    overflow-x: auto;
                    border-bottom: 1px solid var(--color-border-light);
                }
                .admin-tab {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--space-2);
                    padding: var(--space-3) var(--space-4);
                    font-size: var(--text-sm);
                    font-weight: var(--weight-medium);
                    color: var(--color-secondary);
                    background: none;
                    border: none;
                    border-bottom: 2px solid transparent;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all var(--transition-fast);
                }
                .admin-tab:hover {
                    color: var(--color-ink);
                }
                .admin-tab--active {
                    color: var(--color-ink);
                    border-bottom-color: var(--color-gold);
                }
                .admin-form-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-4);
                }
                @media (min-width: 640px) {
                    .admin-form-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                .full-width {
                    grid-column: 1 / -1;
                }
                .admin-item-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-3);
                }
                .admin-item-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: var(--space-4);
                }
                .icon-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 34px;
                    height: 34px;
                    border-radius: var(--radius-sm);
                    background-color: var(--color-surface-alt);
                    border: 1px solid var(--color-border-light);
                    color: var(--color-secondary);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                .icon-btn:hover {
                    color: var(--color-ink);
                    border-color: var(--color-border);
                }
                .icon-btn--danger:hover {
                    color: var(--color-error);
                    border-color: var(--color-error);
                    background-color: rgba(192, 57, 43, 0.05);
                }
                .skill-admin-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--space-2);
                    padding: 0.25rem 0.625rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-full);
                    font-size: var(--text-sm);
                    color: var(--color-ink);
                }
                .skill-remove-btn {
                    border: none;
                    background: none;
                    cursor: pointer;
                    font-size: 1rem;
                    line-height: 1;
                    color: var(--color-tertiary);
                    padding: 0;
                }
                .skill-remove-btn:hover {
                    color: var(--color-error);
                }
            `}</style>
        </div>
    );
}
