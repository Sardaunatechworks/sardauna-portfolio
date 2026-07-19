import React, { useState, useEffect } from 'react';
import {
    Sun, Moon, Github, ExternalLink, Mail, Phone, MapPin,
    Download, Briefcase, Code, User, Send, ChevronRight, Menu, X, Award,
    Plus, Trash2, Edit3, LogOut, Globe, FileText, Check, Lock, AlertCircle, Upload, Eye
} from 'lucide-react';
import './index.css';
import { supabase, isSupabaseConfigured } from './supabaseClient';


// --- CUSTOM HOOKS ---
const useTypingEffect = (roles, typingSpeedNormal = 150, typingSpeedFast = 50, pauseEnd = 2000, pauseStart = 500) => {
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = typingSpeedNormal;
        let timeoutId;

        const type = () => {
            if (!roles || roles.length === 0) return;
            const currentRole = roles[currentRoleIndex];

            if (isDeleting) {
                setTypedText(currentRole.substring(0, currentCharIndex - 1));
                currentCharIndex--;
                typingSpeed = typingSpeedFast;
            } else {
                setTypedText(currentRole.substring(0, currentCharIndex + 1));
                currentCharIndex++;
                typingSpeed = typingSpeedNormal;
            }

            if (!isDeleting && currentCharIndex === currentRole.length) {
                typingSpeed = pauseEnd; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typingSpeed = pauseStart; // Pause before typing new word
            }

            timeoutId = setTimeout(type, typingSpeed);
        };

        timeoutId = setTimeout(type, typingSpeed);
        return () => clearTimeout(timeoutId);
    }, [roles, typingSpeedNormal, typingSpeedFast, pauseEnd, pauseStart]);

    return typedText;
};

// --- DATA ---
const DEFAULT_PERSONAL_INFO = {
    name: "Muhammad Auwal Abubakar",
    location: "Dutse, Jigawa State, Nigeria",
    email: "contact.sardaunatech@gmail.com",
    phone1: "+234 701 967 2820",
    phone2: "+234 906 027 6333",
    github: "https://github.com/Sardaunatechworks",
    portfolio: "https://sardauna-portfolio.vercel.app",
    profile_pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    about: `Innovative IT Specialist, Frontend Developer, and Technical Project Manager with hands-on experience building digital products, managing development teams, and delivering scalable technology solutions.
Founder of Sardauna Tech Labs Ltd, where I lead the development of modern digital platforms and business automation tools. Currently serving as Project Manager at Techfort Foundation, driving initiatives focused on technology education and digital empowerment.
Strong background in frontend engineering, product development, AI integration, and cloud-based applications. Passionate about building impactful systems that improve user experience, automate workflows, and enable communities to thrive through technology.
`
};

const DEFAULT_EXPERIENCE = [
    {
        role: "Founder & Product Manager",
        company: "Sardauna Tech Labs Ltd",
        date: "2023 – Present",
        desc: [
            "Founded and manage a technology solutions company focused on digital products and business automation tools.",
            "Lead product strategy, development planning, and deployment of web-based platforms.",
            "Manage the product lifecycle including design, development, testing, and release."
        ]
    },
    {
        role: "Project Manager",
        company: "Techfort Foundation",
        date: "2025 – Present",
        desc: [
            "Lead technology-driven initiatives focused on digital literacy and tech empowerment.",
            "Coordinate teams across frontend, backend, and UI/UX development.",
            "Manage project timelines, resource allocation, and workflow processes."
        ]
    },
    {
        role: "Project Manager – DeepTech Ready Fellows",
        company: "NorthDemy Limited",
        date: "2025 – Present",
        desc: [
            "Managed program coordination for the DeepTech Ready Fellows Program.",
            "Monitored engagement and learning progress of fellows.",
            "Acted as liaison between learners and program coordinators."
        ]
    },
    {
        role: "Teaching Staff – Coding & Digital Tech",
        company: "Coding Technology Digital School",
        date: "2026 – Present",
        desc: [
            "Teach web development and programming fundamentals to students.",
            "Deliver practical lessons using HTML, CSS, JavaScript, PHP, and Firebase."
        ]
    },
    {
        role: "Personal Relationship Manager (PRM)",
        company: "Moniepoint Microfinance Bank",
        date: "Apr 2025 – Oct 2025",
        desc: [
            "Managed customer onboarding and ATM card issuance within assigned cluster.",
            "Recruited and trained marketing personnel to expand service adoption."
        ]
    }
];

const DEFAULT_PROJECTS = [
    {
        title: "SmartSupport AI",
        desc: "AI-powered omnichannel customer support automation platform.",
        tech: ["React", "TailwindCSS", "Firebase", "AI APIs", "UNDERDEVELOPMENT"],
        github: "https://github.com/Sardaunatechworks/smartsupport-ai",
        demo: "https://smartsupport-ai.comingsoon",
        img: "/smartsupport.png"
    },
    {
        title: "Inventory Tracker",
        desc: "Vendor and reseller inventory management system with real-time synchronization.",
        tech: ["React", "Firebase", "TailwindCSS", "UNDERDEVELOPMENT"],
        github: "https://github.com/Sardaunatechworks/inventory-tracker",
        demo: "https://inventory-tracker.comingsoon",
        img: "/inventory.png"
    },
    {
        title: "Tech Resource Hub",
        desc: "Multi-language platform providing curated technology learning resources.",
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Sardaunatechworks/Sardaunatechub.web",
        demo: "https://sardaunatechworks.github.io/Sardaunatechub.web/",
        img: "/hub.png"
    },
    {
        title: "Crime Watch",
        desc: "Cloud-based platform for reporting and monitoring crime incidents.",
        tech: ["Typescript", "HTML", "Supabase"],
        github: "https://github.com/Sardaunatechworks/crime-watch",
        demo: "https://crime-watch-2ac7.vercel.app",
        img: "/crimewatch.png"
    },
    {
        title: "FUD Alumni Network",
        desc: "Platform connecting Federal University Dutse students with alumni mentors.",
        tech: ["Typescript", "PLpgSQL", "Supabase",],
        github: "https://github.com/Sardaunatechworks/fud-alumni-network",
        demo: "https://fud-alumni-network.vercel.app",
        img: "/fudalumni.png"
    },
    {
        title: "Community Traders Platform",
        desc: "Digital system for local traders to manage inventory and business operations.",
        tech: ["React", "TailwindCSS", "Firebase", "UNDERDEVELOPMENT"],
        github: "https://github.com/Sardaunatechworks/community-traders",
        demo: "https://community-traders.comingsoon",
        img: "/community.png"
    }
];

const DEFAULT_SKILLS = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React",
    "Tailwind CSS", "PHP", "Git", "GitHub", "Firebase",
    "REST APIs", "Agile/Scrum", "UI/UX Design"
];

const DEFAULT_CERTIFICATIONS = [
    {
        title: "Microsoft AI Developers Program ",
        issuer: "Digital Skills Nigeria",
        date: "2025",
        icon: Award
    },
    {
        title: "Google Cloud Innovator Program ",
        issuer: "Google Developer Groups",
        date: "2025",
        icon: Award
    },
    {
        title: "UI/UX Design Bootcamp Certificate ",
        issuer: "Nothern Creative Designers",
        date: "2025",
        icon: Award
    },
    {
        title: "UI/UX Design",
        issuer: "TrybeX Bootcamp",
        date: "2024",
        icon: Award
    },
    {
        title: "Introduction to Cybersecurity & Digital Forensics",
        issuer: "Bread of Hope",
        date: "2025",
        icon: Award
    },
    {
        title: "Build with AI 2025 ",
        issuer: "Google Developers Group",
        date: "2025",
        icon: Award
    }
];

// --- COMPONENTS ---

const GlassCard = ({ children, className = "" }) => (
    <div className={`backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/50 shadow-xl rounded-2xl ${className}`}>
        {children}
    </div>
);

const SectionHeading = ({ title, subtitle, icon: Icon }) => (
    <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Icon size={28} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
    </div>
);

const ROLES_ARRAY = ["Frontend Developer.", "Project Manager.", "Founder.", "IT Specialist."];

export default function App() {
    // --- STATE MANAGEMENT ---
    const [personalInfo, setPersonalInfo] = useState(DEFAULT_PERSONAL_INFO);
    const [experience, setExperience] = useState(DEFAULT_EXPERIENCE);
    const [projects, setProjects] = useState(DEFAULT_PROJECTS);
    const [skills, setSkills] = useState(DEFAULT_SKILLS);
    const [certifications, setCertifications] = useState(DEFAULT_CERTIFICATIONS);

    const [loading, setLoading] = useState(isSupabaseConfigured());
    const [supabaseConnected, setSupabaseConnected] = useState(false);
    const [dbIsEmpty, setDbIsEmpty] = useState(false);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(isSupabaseConfigured());
    
    // Theme & Navigation
    const [darkMode, setDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const typedText = useTypingEffect(personalInfo.roles || ROLES_ARRAY);
    const [formStatus, setFormStatus] = useState("");
    const [activeTab, setActiveTab] = useState('general');
    
    // Auth Form State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginSubmitting, setLoginSubmitting] = useState(false);

    // Editor Status (alerts)
    const [editorStatus, setEditorStatus] = useState(null); // { message, type: 'success' | 'error' | 'info' }
    
    // General Info Editor State
    const [genName, setGenName] = useState(personalInfo.name);
    const [genLocation, setGenLocation] = useState(personalInfo.location);
    const [genEmail, setGenEmail] = useState(personalInfo.email);
    const [genPhone1, setGenPhone1] = useState(personalInfo.phone1 || '');
    const [genPhone2, setGenPhone2] = useState(personalInfo.phone2 || '');
    const [genGithub, setGenGithub] = useState(personalInfo.github || '');
    const [genPortfolio, setGenPortfolio] = useState(personalInfo.portfolio || '');
    const [genAbout, setGenAbout] = useState(personalInfo.about || '');
    const [genRoles, setGenRoles] = useState(personalInfo.roles ? personalInfo.roles.join(', ') : '');
    const [genProfilePic, setGenProfilePic] = useState(personalInfo.profile_pic || '');
    const [isProfilePicUploading, setIsProfilePicUploading] = useState(false);

    // CRUD subform states
    const [expForm, setExpForm] = useState(null); // null or { id, role, company, date, descPoints }
    const [projForm, setProjForm] = useState(null); // null or { id, title, desc, tech, github, demo, img }
    const [newSkill, setNewSkill] = useState('');
    const [certForm, setCertForm] = useState(null); // null or { id, title, issuer, date }

    // Sync editor fields when loaded personalInfo changes
    useEffect(() => {
        setGenName(personalInfo.name);
        setGenLocation(personalInfo.location);
        setGenEmail(personalInfo.email);
        setGenPhone1(personalInfo.phone1 || '');
        setGenPhone2(personalInfo.phone2 || '');
        setGenGithub(personalInfo.github || '');
        setGenPortfolio(personalInfo.portfolio || '');
        setGenAbout(personalInfo.about || '');
        setGenRoles(personalInfo.roles ? personalInfo.roles.join(', ') : '');
        setGenProfilePic(personalInfo.profile_pic || '');
    }, [personalInfo]);

    // Client-side Navigation Router
    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);
    };

    // Listen to Supabase Auth state changes
    useEffect(() => {
        if (isSupabaseConfigured()) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setUser(session?.user ?? null);
                setAuthLoading(false);
            });

            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setUser(session?.user ?? null);
                setAuthLoading(false);
            });

            return () => subscription.unsubscribe();
        } else {
            setAuthLoading(false);
        }
    }, []);

    // Load data from Supabase DB tables
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

                // Determine if database is empty of custom user settings
                const isDbEmpty = !infoRes.data && 
                                  (!expRes.data || expRes.data.length === 0) &&
                                  (!projRes.data || projRes.data.length === 0);
                setDbIsEmpty(isDbEmpty);

                if (infoRes.data) {
                    setPersonalInfo(infoRes.data);
                }
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
                        desc: p.desc_text,
                        tech: p.tech || [],
                        github: p.github || '',
                        demo: p.demo || '',
                        img: p.img || ''
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
                        date: c.date,
                        icon: Award
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

    // SEO & Dark Mode setup
    useEffect(() => {
        document.title = personalInfo.name + " | Portfolio";
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", "Portfolio of " + personalInfo.name + ", Developer.");

        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode, personalInfo]);

    // Handle Contact Form Submit (Uses local fallback node server if desired, or we can handle it via supabase)
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("Sending...");
        try {
            const formData = new FormData(e.target);
            const contactData = {
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message")
            };
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData)
            });
            const data = await response.json();
            if (data.success) {
                setFormStatus("Message sent successfully!");
                e.target.reset();
            } else {
                setFormStatus("Error sending message. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setFormStatus("Error sending message. Please try again.");
        } finally {
            setTimeout(() => setFormStatus(""), 3000);
        }
    };

    const scrollToSection = (id) => {
        if (currentPath !== '/') {
            navigate('/');
            // Wait slightly for DOM to render then scroll
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    // CMS Auth Handlers
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!isSupabaseConfigured()) {
            setLoginError("Supabase connection is not configured in .env");
            return;
        }
        setLoginSubmitting(true);
        setLoginError("");
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: loginEmail,
                password: loginPassword
            });
            if (error) {
                setLoginError(error.message);
            }
        } catch (err) {
            setLoginError(err.message);
        } finally {
            setLoginSubmitting(false);
        }
    };

    const handleLogout = async () => {
        if (isSupabaseConfigured()) {
            await supabase.auth.signOut();
        }
    };

    // CMS Operations
    const initializeDatabaseWithDefaults = async () => {
        if (!isSupabaseConfigured()) return;
        setEditorStatus({ message: "Initializing database with default data...", type: "info" });
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

            setEditorStatus({ message: "Database initialized successfully! Reloading...", type: "success" });
            setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to initialize database: " + err.message, type: "error" });
        }
    };

    const handleSaveGeneral = async (e) => {
        e.preventDefault();
        setEditorStatus({ message: "Saving General Settings...", type: "info" });
        try {
            const rolesList = genRoles.split(',').map(r => r.trim()).filter(r => r !== '');
            const payload = {
                name: genName,
                location: genLocation,
                email: genEmail,
                phone1: genPhone1,
                phone2: genPhone2,
                github: genGithub,
                portfolio: genPortfolio,
                about: genAbout,
                roles: rolesList,
                profile_pic: genProfilePic
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
            setEditorStatus({ message: "General settings saved successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to save: " + err.message, type: "error" });
        }
    };

    const handleSaveExperience = async (e) => {
        e.preventDefault();
        setEditorStatus({ message: "Saving experience item...", type: "info" });
        try {
            const points = expForm.descPoints.split('\n').map(l => l.trim()).filter(l => l !== '');
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
            setEditorStatus({ message: "Experience saved successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to save: " + err.message, type: "error" });
        }
    };

    const handleDeleteExperience = async (id) => {
        if (!id) {
            alert("This item only exists locally. Push default data to database first to delete it.");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this experience?")) return;
        setEditorStatus({ message: "Deleting experience...", type: "info" });
        try {
            const { error } = await supabase.from('experience').delete().eq('id', id);
            if (error) throw error;
            setExperience(prev => prev.filter(item => item.id !== id));
            setEditorStatus({ message: "Experience deleted successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to delete: " + err.message, type: "error" });
        }
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        setEditorStatus({ message: "Saving project item...", type: "info" });
        try {
            const techList = projForm.tech.split(',').map(t => t.trim()).filter(t => t !== '');
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
                    setProjects(prev => [...prev, { ...data, desc: data.desc_text }]);
                }
            }
            if (err) throw err;
            setProjForm(null);
            setEditorStatus({ message: "Project saved successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to save project: " + err.message, type: "error" });
        }
    };

    const handleProjFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setProjForm(prev => ({ ...prev, isUploading: true }));
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
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
            alert("File upload failed. Make sure you have created a public bucket named 'portfolio-uploads' in your Supabase project settings.");
            setProjForm(prev => ({ ...prev, isUploading: false }));
        }
    };

    const handleProfilePicFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsProfilePicUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `profile-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `profile-images/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-uploads')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-uploads')
                .getPublicUrl(filePath);

            setGenProfilePic(publicUrl);
        } catch (err) {
            console.error(err);
            alert("File upload failed: " + err.message);
        } finally {
            setIsProfilePicUploading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        if (!id) {
            alert("This item only exists locally. Push default data to database first to delete it.");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        setEditorStatus({ message: "Deleting project...", type: "info" });
        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            setProjects(prev => prev.filter(item => item.id !== id));
            setEditorStatus({ message: "Project deleted successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to delete project: " + err.message, type: "error" });
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.trim()) return;
        setEditorStatus({ message: "Adding skill...", type: "info" });
        try {
            const sort_order = skills.length;
            const { error } = await supabase.from('skills').insert({ name: newSkill.trim(), sort_order });
            if (error) throw error;
            setSkills(prev => [...prev, newSkill.trim()]);
            setNewSkill("");
            setEditorStatus({ message: "Skill added successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to add skill: " + err.message, type: "error" });
        }
    };

    const handleDeleteSkill = async (skillName) => {
        if (!window.confirm(`Are you sure you want to delete "${skillName}"?`)) return;
        setEditorStatus({ message: "Deleting skill...", type: "info" });
        try {
            const { error } = await supabase.from('skills').delete().eq('name', skillName);
            if (error) throw error;
            setSkills(prev => prev.filter(s => s !== skillName));
            setEditorStatus({ message: "Skill deleted successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to delete skill: " + err.message, type: "error" });
        }
    };

    const handleSaveCert = async (e) => {
        e.preventDefault();
        setEditorStatus({ message: "Saving certification...", type: "info" });
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
                    setCertifications(prev => [...prev, { ...data, icon: Award }]);
                }
            }
            if (err) throw err;
            setCertForm(null);
            setEditorStatus({ message: "Certification saved successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to save: " + err.message, type: "error" });
        }
    };

    const handleDeleteCert = async (id) => {
        if (!id) {
            alert("This item only exists locally. Push default data to database first to delete it.");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this certification?")) return;
        setEditorStatus({ message: "Deleting certification...", type: "info" });
        try {
            const { error } = await supabase.from('certifications').delete().eq('id', id);
            if (error) throw error;
            setCertifications(prev => prev.filter(item => item.id !== id));
            setEditorStatus({ message: "Certification deleted successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setEditorStatus({ message: "Failed to delete: " + err.message, type: "error" });
        }
    };

    // Loading overlay
    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-slate-955 dark:bg-slate-950 flex items-center justify-center text-slate-400">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-semibold tracking-wider animate-pulse">Loading database contents...</p>
                </div>
            </div>
        );
    }

    // --- RENDERING ROUTE: /admin (CMS VIEW) ---
    if (currentPath === '/admin') {
        return (
            <div className={`min-h-screen transition-colors duration-500 font-sans relative ${darkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
                {/* Background blobbies */}
                <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                {/* Header */}
                <header className="relative z-10 backdrop-blur-md bg-white/60 dark:bg-slate-955/60 border-b border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                CMS
                            </div>
                            <span className="font-bold text-xl tracking-tight hidden sm:block">Portfolio Admin Panel</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            >
                                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="px-4 py-2 rounded-full border border-slate-350 dark:border-slate-700 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm"
                            >
                                <Eye size={16} /> View Website
                            </button>
                            {user && (
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors flex items-center gap-2 shadow-md shadow-red-500/20"
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* IF NOT LOGGED IN, RENDER LOGIN VIEW */}
                    {!user ? (
                        <div className="max-w-md mx-auto mt-16">
                            <GlassCard className="p-8 border border-white/20 dark:border-slate-800/80">
                                <div className="text-center mb-8">
                                    <div className="inline-flex p-3 rounded-full bg-blue-500/10 text-blue-500 mb-3">
                                        <Lock size={32} />
                                    </div>
                                    <h2 className="text-2xl font-bold">Admin Portal</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Log in to update your live website contents</p>
                                </div>

                                {loginError && (
                                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex gap-2 items-center">
                                        <AlertCircle size={18} />
                                        <span>{loginError}</span>
                                    </div>
                                )}

                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Admin Email</label>
                                        <input
                                            type="email"
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                            required
                                            placeholder="admin@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none text-slate-900 dark:text-white transition-all placeholder-slate-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Password</label>
                                        <input
                                            type="password"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            required
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none text-slate-900 dark:text-white transition-all placeholder-slate-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loginSubmitting}
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {loginSubmitting ? 'Logging in...' : 'Sign In'}
                                    </button>
                                </form>

                                <div className="mt-8 border-t border-slate-200 dark:border-slate-850 pt-6">
                                    {!isSupabaseConfigured() && (
                                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-sm flex gap-3 items-start">
                                            <AlertCircle className="shrink-0 mt-0.5" size={18} />
                                            <div>
                                                <p className="font-semibold">Supabase is not configured yet.</p>
                                                <p className="mt-1 text-xs opacity-90">Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file, then run the SQL scripts in your Supabase console to enable CMS features.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        </div>
                    ) : (
                        /* LOGGED IN VIEW */
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Dashboard Sidebar */}
                            <div className="lg:col-span-1">
                                <GlassCard className="p-6 space-y-2 border border-white/20 dark:border-slate-800/80">
                                    <div className="pb-4 mb-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center font-bold">
                                            A
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Auwal Abubakar</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">{user.email}</p>
                                        </div>
                                    </div>
                                    
                                    {[
                                        { key: 'general', label: 'General Info', icon: User },
                                        { key: 'experience', label: 'Experiences', icon: Briefcase },
                                        { key: 'projects', label: 'Projects', icon: Code },
                                        { key: 'skills', label: 'Skills', icon: Award },
                                        { key: 'certifications', label: 'Certifications', icon: Award }
                                    ].map(tab => {
                                        const IconComponent = tab.icon;
                                        return (
                                            <button
                                                key={tab.key}
                                                onClick={() => { setActiveTab(tab.key); setEditorStatus(null); setExpForm(null); setProjForm(null); setCertForm(null); }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                                    activeTab === tab.key
                                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                                        : 'hover:bg-slate-100 dark:hover:bg-slate-900/60'
                                                }`}
                                            >
                                                <IconComponent size={18} />
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </GlassCard>
                            </div>

                            {/* Dashboard Editor Area */}
                            <div className="lg:col-span-3 space-y-6">
                                {/* Success/Error Banners */}
                                {editorStatus && (
                                    <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                                        editorStatus.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400' :
                                        editorStatus.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-555' :
                                        'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                                    }`}>
                                        <AlertCircle className="shrink-0 mt-0.5" size={18} />
                                        <span className="text-sm font-medium">{editorStatus.message}</span>
                                        <button onClick={() => setEditorStatus(null)} className="ml-auto hover:opacity-75 font-bold">×</button>
                                    </div>
                                )}

                                {/* Onboarding Seed Database Banner */}
                                {dbIsEmpty && (
                                    <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg">Empty Database Detected</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                                                Your Supabase database is connected but empty. Initialize the tables with the default portfolio contents (the current static text) to get started immediately.
                                            </p>
                                        </div>
                                        <button
                                            onClick={initializeDatabaseWithDefaults}
                                            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 transition-colors whitespace-nowrap"
                                        >
                                            Initialize Data
                                        </button>
                                    </div>
                                )}

                                <GlassCard className="p-8 border border-white/20 dark:border-slate-800/80">
                                    {/* --- TAB 1: GENERAL INFO --- */}
                                    {activeTab === 'general' && (
                                        <div>
                                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                                                <User size={22} className="text-blue-500" />
                                                Edit General Information
                                            </h3>
                                            <form onSubmit={handleSaveGeneral} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Name</label>
                                                        <input
                                                            type="text"
                                                            value={genName}
                                                            onChange={e => setGenName(e.target.value)}
                                                            required
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Location</label>
                                                        <input
                                                            type="text"
                                                            value={genLocation}
                                                            onChange={e => setGenLocation(e.target.value)}
                                                            required
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Contact Email</label>
                                                        <input
                                                            type="email"
                                                            value={genEmail}
                                                            onChange={e => setGenEmail(e.target.value)}
                                                            required
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Phone 1</label>
                                                        <input
                                                            type="text"
                                                            value={genPhone1}
                                                            onChange={e => setGenPhone1(e.target.value)}
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Phone 2</label>
                                                        <input
                                                            type="text"
                                                            value={genPhone2}
                                                            onChange={e => setGenPhone2(e.target.value)}
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">GitHub URL</label>
                                                        <input
                                                            type="url"
                                                            value={genGithub}
                                                            onChange={e => setGenGithub(e.target.value)}
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Portfolio Website URL</label>
                                                        <input
                                                            type="url"
                                                            value={genPortfolio}
                                                            onChange={e => setGenPortfolio(e.target.value)}
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Profile Picture (Upload Local File OR Paste URL)</label>
                                                    <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                                                        <input
                                                            type="text"
                                                            value={genProfilePic}
                                                            onChange={e => setGenProfilePic(e.target.value)}
                                                            placeholder="https://example.com/profile.png"
                                                            className="flex-grow w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 text-sm"
                                                        />
                                                        <div className="flex gap-2 items-center shrink-0 w-full md:w-auto">
                                                            <label className="cursor-pointer px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:opacity-85 text-xs font-bold rounded-xl flex items-center gap-2 border border-slate-300 dark:border-slate-700 w-full justify-center md:w-auto">
                                                                <Upload size={14} />
                                                                <span>{isProfilePicUploading ? "Uploading..." : "Upload Photo"}</span>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={handleProfilePicFileChange}
                                                                    disabled={isProfilePicUploading}
                                                                    className="hidden"
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {genProfilePic && (
                                                        <div className="mt-2 mb-4 border border-slate-200 dark:border-slate-800 rounded-full overflow-hidden w-20 h-20 shadow-lg">
                                                            <img src={genProfilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Animated Roles (Comma separated list)</label>
                                                    <input
                                                        type="text"
                                                        value={genRoles}
                                                        onChange={e => setGenRoles(e.target.value)}
                                                        placeholder="Frontend Developer., Founder., Project Manager."
                                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-2">About Description</label>
                                                    <textarea
                                                        value={genAbout}
                                                        onChange={e => setGenAbout(e.target.value)}
                                                        rows={6}
                                                        required
                                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
                                                >
                                                    Save General Settings
                                                </button>
                                            </form>
                                        </div>
                                    )}

                                    {/* --- TAB 2: EXPERIENCE CRUD --- */}
                                    {activeTab === 'experience' && (
                                        <div>
                                            <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                                                <h3 className="text-xl font-bold flex items-center gap-2">
                                                    <Briefcase size={22} className="text-blue-500" />
                                                    Manage Experiences
                                                </h3>
                                                {!expForm && (
                                                    <button
                                                        onClick={() => setExpForm({ role: '', company: '', date: '', descPoints: '' })}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 flex items-center gap-2"
                                                    >
                                                        <Plus size={16} /> Add New
                                                    </button>
                                                )}
                                            </div>

                                            {expForm ? (
                                                /* Add/Edit Form */
                                                <form onSubmit={handleSaveExperience} className="space-y-6">
                                                    <h4 className="font-bold text-lg text-blue-500">{expForm.id ? "Edit Experience" : "Add New Experience"}</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">Role/Title</label>
                                                            <input
                                                                type="text"
                                                                value={expForm.role}
                                                                onChange={e => setExpForm(prev => ({ ...prev, role: e.target.value }))}
                                                                required
                                                                placeholder="e.g. Project Manager"
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">Company</label>
                                                            <input
                                                                type="text"
                                                                value={expForm.company}
                                                                onChange={e => setExpForm(prev => ({ ...prev, company: e.target.value }))}
                                                                required
                                                                placeholder="e.g. Sardauna Tech Labs"
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">Duration/Dates</label>
                                                            <input
                                                                type="text"
                                                                value={expForm.date}
                                                                onChange={e => setExpForm(prev => ({ ...prev, date: e.target.value }))}
                                                                required
                                                                placeholder="e.g. 2023 - Present"
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Bullet Points Description (One point per line)</label>
                                                        <textarea
                                                            value={expForm.descPoints}
                                                            onChange={e => setExpForm(prev => ({ ...prev, descPoints: e.target.value }))}
                                                            rows={6}
                                                            required
                                                            placeholder="Founded and managed a tech company...&#10;Led product planning and strategies..."
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                        />
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <button
                                                            type="submit"
                                                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20"
                                                        >
                                                            {expForm.id ? "Save Changes" : "Create Item"}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setExpForm(null)}
                                                            className="px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:opacity-80 rounded-xl font-bold text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                /* List View */
                                                <div className="space-y-4">
                                                    {experience.map(exp => (
                                                        <div key={exp.id || Math.random()} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white/20 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-850 gap-4">
                                                            <div>
                                                                <h4 className="font-bold text-lg">{exp.role}</h4>
                                                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{exp.company} • {exp.date}</p>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => setExpForm({
                                                                        id: exp.id,
                                                                        role: exp.role,
                                                                        company: exp.company,
                                                                        date: exp.date,
                                                                        descPoints: exp.desc.join('\n')
                                                                    })}
                                                                    className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-colors border border-blue-500/20"
                                                                >
                                                                    <Edit3 size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteExperience(exp.id)}
                                                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors border border-red-500/20"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* --- TAB 3: PROJECTS CRUD --- */}
                                    {activeTab === 'projects' && (
                                        <div>
                                            <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                                                <h3 className="text-xl font-bold flex items-center gap-2">
                                                    <Code size={22} className="text-blue-500" />
                                                    Manage Projects
                                                </h3>
                                                {!projForm && (
                                                    <button
                                                        onClick={() => setProjForm({ title: '', desc: '', tech: '', github: '', demo: '', img: '' })}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 flex items-center gap-2"
                                                    >
                                                        <Plus size={16} /> Add New
                                                    </button>
                                                )}
                                            </div>

                                            {projForm ? (
                                                /* Add/Edit Form */
                                                <form onSubmit={handleSaveProject} className="space-y-6">
                                                    <h4 className="font-bold text-lg text-blue-500">{projForm.id ? "Edit Project" : "Add New Project"}</h4>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">Project Title</label>
                                                            <input
                                                                type="text"
                                                                value={projForm.title}
                                                                onChange={e => setProjForm(prev => ({ ...prev, title: e.target.value }))}
                                                                required
                                                                placeholder="e.g. SmartSupport AI"
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">Tech Stack Tags (Comma separated)</label>
                                                            <input
                                                                type="text"
                                                                value={projForm.tech}
                                                                onChange={e => setProjForm(prev => ({ ...prev, tech: e.target.value }))}
                                                                required
                                                                placeholder="React, TailwindCSS, Firebase"
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">GitHub Repository URL</label>
                                                            <input
                                                                type="url"
                                                                value={projForm.github}
                                                                onChange={e => setProjForm(prev => ({ ...prev, github: e.target.value }))}
                                                                placeholder="https://github.com/..."
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">Live Demo URL</label>
                                                            <input
                                                                type="url"
                                                                value={projForm.demo}
                                                                onChange={e => setProjForm(prev => ({ ...prev, demo: e.target.value }))}
                                                                placeholder="https://example.com"
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Project Image (Upload Local File OR Paste URL)</label>
                                                        <div className="flex flex-col md:flex-row gap-4 items-center">
                                                            <input
                                                                type="text"
                                                                value={projForm.img}
                                                                onChange={e => setProjForm(prev => ({ ...prev, img: e.target.value }))}
                                                                placeholder="/smartsupport.png or https://example.com/image.png"
                                                                className="flex-grow w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                            <div className="flex gap-2 items-center shrink-0 w-full md:w-auto">
                                                                <label className="cursor-pointer px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:opacity-85 text-xs font-bold rounded-xl flex items-center gap-2 border border-slate-300 dark:border-slate-700 w-full justify-center md:w-auto">
                                                                    <Upload size={14} />
                                                                    <span>{projForm.isUploading ? "Uploading..." : "Upload Image"}</span>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={handleProjFileChange}
                                                                        disabled={projForm.isUploading}
                                                                        className="hidden"
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {projForm.img && (
                                                            <div className="mt-4 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-w-[200px]">
                                                                <img src={projForm.img} alt="Preview" className="w-full h-auto object-contain" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Project Description</label>
                                                        <textarea
                                                            value={projForm.desc}
                                                            onChange={e => setProjForm(prev => ({ ...prev, desc: e.target.value }))}
                                                            rows={4}
                                                            required
                                                            placeholder="Describe the application, what problems it solves..."
                                                            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                        />
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <button
                                                            type="submit"
                                                            disabled={projForm.isUploading}
                                                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20 disabled:opacity-50"
                                                        >
                                                            {projForm.id ? "Save Changes" : "Create Project"}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setProjForm(null)}
                                                            className="px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:opacity-80 rounded-xl font-bold text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                /* List View */
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {projects.map(proj => (
                                                        <div key={proj.id || Math.random()} className="flex items-start gap-4 p-5 rounded-2xl bg-white/20 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-850">
                                                            {proj.img && (
                                                                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                                                                    <img src={proj.img} alt={proj.title} className="w-full h-full object-cover" />
                                                                </div>
                                                            )}
                                                            <div className="flex-grow">
                                                                <h4 className="font-bold">{proj.title}</h4>
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{proj.desc}</p>
                                                            </div>
                                                            <div className="flex gap-1 shrink-0">
                                                                <button
                                                                    onClick={() => setProjForm({
                                                                        id: proj.id,
                                                                        title: proj.title,
                                                                        desc: proj.desc,
                                                                        tech: proj.tech.join(', '),
                                                                        github: proj.github,
                                                                        demo: proj.demo,
                                                                        img: proj.img
                                                                    })}
                                                                    className="p-1.5 text-blue-500 hover:bg-blue-500/10 rounded-lg border border-blue-500/10"
                                                                >
                                                                    <Edit3 size={15} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteProject(proj.id)}
                                                                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg border border-red-500/10"
                                                                >
                                                                    <Trash2 size={15} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* --- TAB 4: SKILLS EDITOR --- */}
                                    {activeTab === 'skills' && (
                                        <div>
                                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                                                <Award size={22} className="text-blue-500" />
                                                Manage Skills List
                                            </h3>

                                            <form onSubmit={handleAddSkill} className="mb-8 flex gap-4 max-w-md">
                                                <input
                                                    type="text"
                                                    value={newSkill}
                                                    onChange={e => setNewSkill(e.target.value)}
                                                    placeholder="Add new skill (e.g. Docker)"
                                                    required
                                                    className="flex-grow px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 text-sm"
                                                />
                                                <button
                                                    type="submit"
                                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 flex items-center gap-2"
                                                >
                                                    <Plus size={16} /> Add
                                                </button>
                                            </form>

                                            <div className="flex flex-wrap gap-3">
                                                {skills.map((skill, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm font-medium"
                                                    >
                                                        <span>{skill}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteSkill(skill)}
                                                            className="text-red-500 hover:opacity-75 font-semibold text-base shrink-0 select-none pl-1"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* --- TAB 5: CERTIFICATIONS CRUD --- */}
                                    {activeTab === 'certifications' && (
                                        <div>
                                            <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                                                <h3 className="text-xl font-bold flex items-center gap-2">
                                                    <Award size={22} className="text-blue-500" />
                                                    Manage Certifications
                                                </h3>
                                                {!certForm && (
                                                    <button
                                                        onClick={() => setCertForm({ title: '', issuer: '', date: '' })}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 flex items-center gap-2"
                                                    >
                                                        <Plus size={16} /> Add New
                                                    </button>
                                                )}
                                            </div>

                                            {certForm ? (
                                                /* Add/Edit Form */
                                                <form onSubmit={handleSaveCert} className="space-y-6">
                                                    <h4 className="font-bold text-lg text-blue-500">{certForm.id ? "Edit Certification" : "Add New Certification"}</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">Certificate Title</label>
                                                            <input
                                                                type="text"
                                                                value={certForm.title}
                                                                onChange={e => setCertForm(prev => ({ ...prev, title: e.target.value }))}
                                                                required
                                                                placeholder="e.g. Build with AI Certificate"
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">Issuer</label>
                                                            <input
                                                                type="text"
                                                                value={certForm.issuer}
                                                                onChange={e => setCertForm(prev => ({ ...prev, issuer: e.target.value }))}
                                                                required
                                                                placeholder="e.g. Google Developers Group"
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">Year Issued</label>
                                                            <input
                                                                type="text"
                                                                value={certForm.date}
                                                                onChange={e => setCertForm(prev => ({ ...prev, date: e.target.value }))}
                                                                required
                                                                placeholder="e.g. 2025"
                                                                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <button
                                                            type="submit"
                                                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20"
                                                        >
                                                            {certForm.id ? "Save Changes" : "Create Item"}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setCertForm(null)}
                                                            className="px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:opacity-80 rounded-xl font-bold text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                /* List View */
                                                <div className="space-y-4">
                                                    {certifications.map(cert => (
                                                        <div key={cert.id || Math.random()} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white/20 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-850 gap-4">
                                                            <div>
                                                                <h4 className="font-bold text-lg">{cert.title}</h4>
                                                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{cert.issuer} • {cert.date}</p>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => setCertForm({
                                                                        id: cert.id,
                                                                        title: cert.title,
                                                                        issuer: cert.issuer,
                                                                        date: cert.date
                                                                    })}
                                                                    className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-colors border border-blue-500/20"
                                                                >
                                                                    <Edit3 size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteCert(cert.id)}
                                                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors border border-red-500/20"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </GlassCard>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        );
    }



    return (
        <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-x-hidden font-sans">

            {/* --- CSS Animations are now imported from index.css --- */}

            {/* --- BACKGROUND BLOBS (Glassmorphism effect) --- */}
            <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-400 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* --- NAVBAR --- */}
            <nav className="fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-md bg-white/60 dark:bg-slate-950/60 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                M
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden sm:block">
                                Muhammad Auwal Abubakar
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['About', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
                                >
                                    {item}
                                </button>
                            ))}

                            <div className="flex items-center gap-4 pl-4 border-l border-slate-300 dark:border-slate-700">
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                    aria-label="Toggle Dark Mode"
                                >
                                    {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
                                </button>
                                <a
                                    href="#contact"
                                    onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                                    className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md flex items-center gap-2"
                                >
                                    <Download size={16} /> Resume
                                </a>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center gap-4">
                            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
                                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
                            </button>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 dark:text-slate-300">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden glass backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/50 dark:border-slate-800/50 absolute w-full">
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {['About', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className="block w-full text-left px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 pt-20">

                {/* HERO SECTION */}
                <section id="about" className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                    <div className={`max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 w-full ${!personalInfo.profile_pic ? 'text-center' : ''}`}>
                        
                        {/* Text Content */}
                        <div className={`flex-grow lg:flex-1 ${personalInfo.profile_pic ? 'text-center lg:text-left' : 'text-center'}`}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm mb-8 animate-fade-in-up">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-medium">Available for new opportunities</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{personalInfo.name}</span> <br />
                                <span className="typing-cursor text-4xl md:text-6xl text-slate-700 dark:text-slate-300 font-bold h-[1.2em] inline-block mt-2">
                                    {typedText}
                                </span>
                            </h1>

                            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                                {personalInfo.about}
                            </p>

                            <div className={`mt-10 flex flex-col sm:flex-row gap-4 ${personalInfo.profile_pic ? 'justify-center lg:justify-start' : 'justify-center'} items-center`}>
                                <button onClick={() => scrollToSection('projects')} className="px-8 py-4 w-full sm:w-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                    View My Work <ChevronRight size={20} />
                                </button>
                                <a href="#contact" className="px-8 py-4 w-full sm:w-auto rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                    <Download size={20} /> Download CV
                                </a>
                            </div>

                            <div className={`mt-12 flex ${personalInfo.profile_pic ? 'justify-center lg:justify-start' : 'justify-center'} gap-6`}>
                                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    <Github size={28} />
                                </a>
                                <a href={`mailto:${personalInfo.email}`} className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    <Mail size={28} />
                                </a>
                            </div>
                        </div>

                        {/* Profile Photo */}
                        {personalInfo.profile_pic && (
                            <div className="flex-shrink-0 relative group lg:ml-8">
                                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl">
                                    <img 
                                        src={personalInfo.profile_pic} 
                                        alt={personalInfo.name} 
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                </section>

                {/* SKILLS MARQUEE */}
                <div className="py-10 border-y border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm overflow-hidden flex">
                    <div className="animate-scroll flex gap-8 items-center px-4">
                        {/* Double the array to create seamless loop */}
                        {[...skills, ...skills, ...skills].map((skill, index) => (
                            <div key={index} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 whitespace-nowrap shadow-sm">
                                <span className="font-semibold text-slate-700 dark:text-slate-300">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* EXPERIENCE TIMELINE */}
                <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <SectionHeading title="Professional Journey" subtitle="My track record of leading projects and building scalable solutions." icon={Briefcase} />

                    <div className="relative mt-16">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent transform md:-translate-x-1/2"></div>

                        <div className="space-y-12">
                            {experience.map((exp, index) => (
                                <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Timeline Node */}
                                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform -translate-x-1/2 mt-6 md:mt-0 z-10 border-4 border-slate-50 dark:border-slate-950"></div>

                                    {/* Content Box */}
                                    <div className="w-full md:w-1/2 pl-12 md:pl-0">
                                        <div className={`md:w-11/12 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                            <GlassCard className="p-6 md:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                                                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                    {exp.date}
                                                </span>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {exp.role}
                                                </h3>
                                                <h4 className="text-md font-medium text-slate-600 dark:text-slate-400 mb-4">
                                                    {exp.company}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {exp.desc.map((point, i) => (
                                                        <li key={i} className="text-slate-600 dark:text-slate-300 text-sm flex items-start gap-2">
                                                            <span className="text-blue-500 mt-1">•</span>
                                                            <span className="leading-relaxed">{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </GlassCard>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <SectionHeading title="Featured Projects" subtitle="A selection of my recent work in frontend development, AI integration, and full-stack solutions." icon={Code} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {projects.map((project, index) => (
                            <GlassCard key={index} className="flex flex-col overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                                {/* Image Placeholder */}
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img src={project.img} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                                        {project.desc}
                                    </p>

                                    {/* Tech Stack Badges */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                        <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex-grow">
                                            <ExternalLink size={16} /> Live Demo
                                        </a>
                                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors">
                                            <Github size={16} /> Code
                                        </a>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </section>

                {/* CERTIFICATIONS SECTION */}
                <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl mb-16 border border-slate-200/50 dark:border-slate-800/50">
                    <SectionHeading title="Certifications & Trainings" subtitle="Continuous learning and professional development." icon={Award} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        {certifications.map((cert, index) => (
                            <GlassCard key={index} className="p-6 flex items-start gap-5 hover:shadow-lg hover:border-blue-500/30 transition-all duration-300">
                                <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">
                                    <cert.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight">{cert.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">{cert.issuer}</p>
                                    <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                        {cert.date}
                                    </span>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
                    <SectionHeading title="Get In Touch" subtitle="Have a project in mind or want to explore collaboration? Let's talk." icon={User} />

                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12">

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <GlassCard className="p-8">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 text-slate-600 dark:text-slate-300">
                                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Email</p>
                                            <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-500 transition-colors break-all">{personalInfo.email}</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 text-slate-600 dark:text-slate-300">
                                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Phone</p>
                                            <p>{personalInfo.phone1}</p>
                                            <p>{personalInfo.phone2}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 text-slate-600 dark:text-slate-300">
                                        <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Location</p>
                                            <p>{personalInfo.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <GlassCard className="p-8">
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows="5"
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all resize-none"
                                            placeholder="How can I help you?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        disabled={formStatus === "Sending..."}
                                    >
                                        {formStatus === "Sending..." ? "Sending..." : <><Send size={18} /> Send Message</>}
                                    </button>

                                    {formStatus && formStatus !== "Sending..." && (
                                        <p className="text-green-600 dark:text-green-400 font-medium text-sm mt-4 animate-fade-in-up">
                                            {formStatus}
                                        </p>
                                    )}
                                </form>
                            </GlassCard>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-lg mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium text-center md:text-left">
                        © {new Date().getFullYear()} Muhammad Auwal Abubakar. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                        <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}