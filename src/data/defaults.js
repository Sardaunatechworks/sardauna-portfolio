/* ============================================================
   Default data — used as fallback when Supabase is unavailable
   ============================================================ */

export const DEFAULT_PERSONAL_INFO = {
    name: "Muhammad Auwal Abubakar",
    location: "Dutse, Jigawa State, Nigeria",
    email: "contact.sardaunatech@gmail.com",
    phone1: "+234 701 967 2820",
    phone2: "+234 906 027 6333",
    github: "https://github.com/Sardaunatechworks",
    portfolio: "https://sardauna-portfolio.vercel.app",
    profile_pic: "", // Owner's real photo to be supplied
    about: "I'm a technology professional, entrepreneur, and project leader focused on building practical digital solutions and empowering people through technology. As Founder and CEO of Sardauna Tech Lab Ltd, I lead the development of modern digital platforms and business automation tools. I also serve in project management and operations leadership roles across technology education and community development initiatives.",
    roles: ["Technology Entrepreneur", "Software Developer", "Project Leader", "Community Builder"]
};

export const ROLES_ARRAY = [
    "Technology Entrepreneur",
    "Software Developer",
    "Project Leader",
    "Community Builder"
];

export const DEFAULT_EXPERIENCE = [
    {
        role: "Founder & CEO",
        company: "Sardauna Tech Lab Ltd",
        date: "2023 – Present",
        type: "Employment",
        desc: [
            "Founded and lead a technology solutions company focused on digital products and business automation tools.",
            "Lead product strategy, development planning, and deployment of web-based platforms.",
            "Manage the product lifecycle including design, development, testing, and release."
        ]
    },
    {
        role: "Project Manager & Head of Operations",
        company: "Startup Jigawa",
        date: "2025 – Present",
        type: "Employment",
        desc: [
            "Manage project operations and coordinate technology-driven initiatives.",
            "Oversee operational workflows, team coordination, and programme delivery."
        ]
    },
    {
        role: "Director of Projects and Programs",
        company: "Techfort Community",
        date: "2025 – Present",
        type: "Leadership Appointment",
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
        type: "Project-based",
        desc: [
            "Managed programme coordination for the DeepTech Ready Fellows Programme.",
            "Monitored engagement and learning progress of fellows.",
            "Acted as liaison between learners and programme coordinators."
        ]
    },
    {
        role: "Teaching Staff – Coding & Digital Technology",
        company: "Coding Technology Digital Learning School",
        date: "2026 – Present",
        type: "Employment",
        desc: [
            "Teach web development and programming fundamentals to students.",
            "Deliver practical lessons using HTML, CSS, JavaScript, PHP, and Firebase."
        ]
    }
];

export const DEFAULT_PROJECTS = [
    {
        title: "TraderERP",
        slug: "tradererp",
        desc: "Enterprise resource planning platform designed for traders and small businesses to manage their operations digitally.",
        category: "Business Technology",
        tech: ["React", "Next.js", "TypeScript", "Supabase"],
        github: "",
        demo: "",
        img: "",
        status: "In Development",
        role: "Founder & Lead Developer"
    },
    {
        title: "SmartSupport.tech",
        slug: "smartsupport",
        desc: "AI-powered omnichannel customer support automation platform for businesses.",
        category: "AI & Automation",
        tech: ["React", "TailwindCSS", "Firebase", "AI APIs"],
        github: "https://github.com/Sardaunatechworks/smartsupport-ai",
        demo: "",
        img: "/smartsupport.png",
        status: "In Development",
        role: "Founder & Lead Developer"
    },
    {
        title: "MyEventPass",
        slug: "myeventpass",
        desc: "Digital event ticketing and management platform for event organisers and attendees.",
        category: "Events & Community",
        tech: ["React", "Supabase"],
        github: "",
        demo: "",
        img: "",
        status: "In Development",
        role: "Founder & Developer"
    },
    {
        title: "Learnyxa",
        slug: "learnyxa",
        desc: "Online learning platform designed to make technology education accessible.",
        category: "Education Technology",
        tech: ["React", "TailwindCSS"],
        github: "",
        demo: "",
        img: "",
        status: "In Development",
        role: "Founder & Developer"
    },
    {
        title: "Inventory Tracker",
        slug: "inventory-tracker",
        desc: "Vendor and reseller inventory management system with real-time synchronisation.",
        category: "Business Technology",
        tech: ["React", "Firebase", "TailwindCSS"],
        github: "https://github.com/Sardaunatechworks/inventory-tracker",
        demo: "",
        img: "/inventory.png",
        status: "In Development",
        role: "Developer"
    },
    {
        title: "Sardauna Tech Hub",
        slug: "sardauna-tech-hub",
        desc: "Multi-language platform providing curated technology learning resources.",
        category: "Education Technology",
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Sardaunatechworks/Sardaunatechub.web",
        demo: "https://sardaunatechworks.github.io/Sardaunatechub.web/",
        img: "/hub.png",
        status: "Live",
        role: "Creator"
    }
];

export const DEFAULT_SKILLS = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React",
    "Tailwind CSS", "PHP", "Git", "GitHub", "Firebase",
    "Supabase", "REST APIs", "Agile/Scrum", "UI/UX Design",
    "Project Management"
];

export const DEFAULT_CERTIFICATIONS = [
    {
        title: "Microsoft AI Developers Program",
        issuer: "Digital Skills Nigeria",
        date: "2025"
    },
    {
        title: "Google Cloud Innovator Program",
        issuer: "Google Developer Groups",
        date: "2025"
    },
    {
        title: "UI/UX Design Bootcamp Certificate",
        issuer: "Northern Creative Designers",
        date: "2025"
    },
    {
        title: "UI/UX Design",
        issuer: "TrybeX Bootcamp",
        date: "2024"
    },
    {
        title: "Introduction to Cybersecurity & Digital Forensics",
        issuer: "Bread of Hope",
        date: "2025"
    },
    {
        title: "Build with AI 2025",
        issuer: "Google Developers Group",
        date: "2025"
    }
];

export const DEFAULT_COMMUNITY = [
    {
        title: "GDG Dutse",
        role: "Community Member & Contributor",
        type: "Community Membership",
        desc: "Active participant in Google Developer Groups Dutse, contributing to developer ecosystem activities and community events.",
        period: "2024 – Present"
    },
    {
        title: "DevFest",
        role: "Volunteer & Participant",
        type: "Volunteering",
        desc: "Volunteered in organising and supporting DevFest events, contributing to the success of developer community gatherings.",
        period: "2024 – Present"
    },
    {
        title: "Techfort Community",
        role: "Director of Projects and Programs",
        type: "Community Leadership",
        desc: "Leading technology education initiatives, workshops, and capacity-building programmes focused on youth development and digital literacy.",
        period: "2025 – Present"
    }
];

/* Biography drafts — owner to review and approve */
export const BIOGRAPHIES = {
    short: "I'm Muhammad Auwal Abubakar — a technology entrepreneur, software developer, and project leader based in Nigeria. I build digital products, lead technology initiatives, and work to make technology more accessible through community programmes and education.",
    
    medium: "I'm Muhammad Auwal Abubakar, a technology professional based in Dutse, Jigawa State, Nigeria. As Founder and CEO of Sardauna Tech Lab Ltd, I build digital products and business tools that solve real problems. I also serve as Project Manager and Head of Operations at Startup Jigawa, and direct projects and programmes at Techfort Community. My work spans software development, project leadership, technology education, and community building. I care about creating practical solutions and empowering people — particularly young people in underserved communities — through technology.",
    
    extended: "I'm Muhammad Auwal Abubakar, a technology professional, entrepreneur, and project leader based in Dutse, Jigawa State, Nigeria. I work at the intersection of software development, technology entrepreneurship, and community empowerment.\n\nAs Founder and CEO of Sardauna Tech Lab Ltd, I lead the development of digital products and business automation tools — building platforms like TraderERP, SmartSupport.tech, and MyEventPass that address real needs for traders, businesses, and event organisers.\n\nBeyond building software, I serve as Project Manager and Head of Operations at Startup Jigawa, where I coordinate technology-driven initiatives. I also direct projects and programmes at Techfort Community, leading workshops, capacity-building programmes, and technology education initiatives.\n\nI'm an active member of the developer community, contributing to Google Developer Groups (GDG) Dutse and participating in DevFest events. I teach web development at Coding Technology Digital Learning School, because I believe technology skills should be accessible to everyone.\n\nMy approach combines technical skill with an understanding of the communities I serve. I'm interested in practical solutions, honest collaboration, and meaningful impact."
};
