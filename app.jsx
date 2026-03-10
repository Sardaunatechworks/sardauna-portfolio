import React, { useState, useEffect } from 'react';
import {
    Sun, Moon, Github, ExternalLink, Mail, Phone, MapPin,
    Download, Briefcase, Code, User, Send, ChevronRight, Menu, X
} from 'lucide-react';
import './index.css';

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
const personalInfo = {
    name: "Muhammad Auwal Abubakar",
    location: "Dutse, Jigawa State, Nigeria",
    email: "contact.sardaunatech@gmail.com",
    phone1: "+234 701 967 2820",
    phone2: "+234 906 027 6333",
    github: "https://github.com/Sardaunatechworks",
    portfolio: "https://sardaunatechworks.github.io",
    about: "Frontend Developer, IT Specialist, and Project Manager with experience designing and deploying digital platforms, managing cross-functional teams, and building technology solutions that solve real-world problems. Founder of Sardauna Tech Labs Ltd and Project Manager at Techfort Foundation, leading initiatives that promote digital innovation, technical education, and community empowerment."
};

const experience = [
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

const projects = [
    {
        title: "SmartSupport AI",
        desc: "AI-powered omnichannel customer support automation platform.",
        tech: ["React", "TailwindCSS", "Firebase", "AI APIs"],
        github: "https://github.com/Sardaunatechworks/smartsupport-ai",
        demo: "https://smartsupport-ai.vercel.app",
        img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Inventory Tracker",
        desc: "Vendor and reseller inventory management system with real-time synchronization.",
        tech: ["React", "Firebase", "TailwindCSS"],
        github: "https://github.com/Sardaunatechworks/inventory-tracker",
        demo: "https://inventory-tracker.vercel.app",
        img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c824c9?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Tech Resource Hub",
        desc: "Multi-language platform providing curated technology learning resources.",
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Sardaunatechworks/tech-resource-hub",
        demo: "https://tech-resource-hub.vercel.app",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Crime Watch",
        desc: "Cloud-based platform for reporting and monitoring crime incidents.",
        tech: ["React", "Firebase"],
        github: "https://github.com/Sardaunatechworks/crime-watch",
        demo: "https://crime-watch.vercel.app",
        img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "FUD Alumni Network",
        desc: "Platform connecting Federal University Dutse students with alumni mentors.",
        tech: ["React", "Firebase"],
        github: "https://github.com/Sardaunatechworks/fud-alumni-network",
        demo: "https://fud-alumni.vercel.app",
        img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Community Traders Platform",
        desc: "Digital system for local traders to manage inventory and business operations.",
        tech: ["React", "TailwindCSS", "Firebase"],
        github: "https://github.com/Sardaunatechworks/community-traders",
        demo: "https://community-traders.vercel.app",
        img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
    }
];

const skills = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React",
    "Tailwind CSS", "PHP", "Git", "GitHub", "Firebase",
    "REST APIs", "Agile/Scrum", "UI/UX Design"
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
    const [darkMode, setDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const typedText = useTypingEffect(ROLES_ARRAY);
    const [formStatus, setFormStatus] = useState("");

    // SEO & Dark Mode setup
    useEffect(() => {
        // Dynamic SEO Tags
        document.title = "Muhammad Auwal Abubakar | Portfolio";
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", "Portfolio of Muhammad Auwal Abubakar, Frontend Developer & Founder of Sardauna Tech Labs.");

        // Toggle Dark Mode
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);



    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("Sending...");

        try {
            const formData = new FormData(e.target);
            // NOTE: Add Web3Forms generic access key. 
            // Replace 'YOUR_ACCESS_KEY_HERE' with your real key from web3forms.com
            formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
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
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

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
                                Auwal Abubakar
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
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
                            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
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
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm mb-8 animate-fade-in-up">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium">Available for new opportunities</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Auwal</span> <br />
                            <span className="typing-cursor text-4xl md:text-6xl text-slate-700 dark:text-slate-300 font-bold h-[1.2em] inline-block mt-2">
                                {typedText}
                            </span>
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {personalInfo.about}
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button onClick={() => scrollToSection('projects')} className="px-8 py-4 w-full sm:w-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                View My Work <ChevronRight size={20} />
                            </button>
                            <a href="#contact" className="px-8 py-4 w-full sm:w-auto rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                <Download size={20} /> Download CV
                            </a>
                        </div>

                        <div className="mt-12 flex justify-center gap-6">
                            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <Github size={28} />
                            </a>
                            <a href={`mailto:${personalInfo.email}`} className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <Mail size={28} />
                            </a>
                        </div>
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