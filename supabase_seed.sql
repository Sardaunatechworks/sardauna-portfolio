-- Ensure the profile_pic column exists
ALTER TABLE personal_info ADD COLUMN IF NOT EXISTS profile_pic TEXT;

-- Clean up any existing data in all tables
TRUNCATE TABLE personal_info, experience, projects, skills, certifications RESTART IDENTITY CASCADE;


-- 1. Seed Personal Information
INSERT INTO personal_info (name, location, email, phone1, phone2, github, portfolio, about, roles, profile_pic)
VALUES (
    'Muhammad Auwal Abubakar',
    'Dutse, Jigawa State, Nigeria',
    'contact.sardaunatech@gmail.com',
    '+234 701 967 2820',
    '+234 906 027 6333',
    'https://github.com/Sardaunatechworks',
    'https://sardauna-portfolio.vercel.app',
    'Innovative IT Specialist, Frontend Developer, and Technical Project Manager with hands-on experience building digital products, managing development teams, and delivering scalable technology solutions. Founder of Sardauna Tech Labs Ltd, where I lead the development of modern digital platforms and business automation tools. Currently serving as Project Manager at Techfort Foundation, driving initiatives focused on technology education and digital empowerment. Strong background in frontend engineering, product development, AI integration, and cloud-based applications. Passionate about building impactful systems that improve user experience, automate workflows, and enable communities to thrive through technology.',
    ARRAY['Frontend Developer.', 'Project Manager.', 'Founder.', 'IT Specialist.'],
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
);

-- 2. Seed Experience Timeline
INSERT INTO experience (role, company, date, desc_points, sort_order)
VALUES 
(
    'Founder & Product Manager',
    'Sardauna Tech Labs Ltd',
    '2023 – Present',
    ARRAY[
        'Founded and manage a technology solutions company focused on digital products and business automation tools.',
        'Lead product strategy, development planning, and deployment of web-based platforms.',
        'Manage the product lifecycle including design, development, testing, and release.'
    ],
    0
),
(
    'Project Manager',
    'Techfort Foundation',
    '2025 – Present',
    ARRAY[
        'Lead technology-driven initiatives focused on digital literacy and tech empowerment.',
        'Coordinate teams across frontend, backend, and UI/UX development.',
        'Manage project timelines, resource allocation, and workflow processes.'
    ],
    1
),
(
    'Project Manager – DeepTech Ready Fellows',
    'NorthDemy Limited',
    '2025 – Present',
    ARRAY[
        'Managed program coordination for the DeepTech Ready Fellows Program.',
        'Monitored engagement and learning progress of fellows.',
        'Acted as liaison between learners and program coordinators.'
    ],
    2
),
(
    'Teaching Staff – Coding & Digital Tech',
    'Coding Technology Digital School',
    '2026 – Present',
    ARRAY[
        'Teach web development and programming fundamentals to students.',
        'Deliver practical lessons using HTML, CSS, JavaScript, PHP, and Firebase.'
    ],
    3
),
(
    'Personal Relationship Manager (PRM)',
    'Moniepoint Microfinance Bank',
    'Apr 2025 – Oct 2025',
    ARRAY[
        'Managed customer onboarding and ATM card issuance within assigned cluster.',
        'Recruited and trained marketing personnel to expand service adoption.'
    ],
    4
);

-- 3. Seed Projects
INSERT INTO projects (title, desc_text, tech, github, demo, img, sort_order)
VALUES
(
    'SmartSupport AI',
    'AI-powered omnichannel customer support automation platform.',
    ARRAY['React', 'TailwindCSS', 'Firebase', 'AI APIs', 'UNDERDEVELOPMENT'],
    'https://github.com/Sardaunatechworks/smartsupport-ai',
    'https://smartsupport-ai.comingsoon',
    '/smartsupport.png',
    0
),
(
    'Inventory Tracker',
    'Vendor and reseller inventory management system with real-time synchronization.',
    ARRAY['React', 'Firebase', 'TailwindCSS', 'UNDERDEVELOPMENT'],
    'https://github.com/Sardaunatechworks/inventory-tracker',
    'https://inventory-tracker.comingsoon',
    '/inventory.png',
    1
),
(
    'Tech Resource Hub',
    'Multi-language platform providing curated technology learning resources.',
    ARRAY['HTML', 'CSS', 'JavaScript'],
    'https://github.com/Sardaunatechworks/Sardaunatechub.web',
    'https://sardaunatechworks.github.io/Sardaunatechub.web/',
    '/hub.png',
    2
),
(
    'Crime Watch',
    'Cloud-based platform for reporting and monitoring crime incidents.',
    ARRAY['Typescript', 'HTML', 'Supabase'],
    'https://github.com/Sardaunatechworks/crime-watch',
    'https://crime-watch-2ac7.vercel.app',
    '/crimewatch.png',
    3
),
(
    'FUD Alumni Network',
    'Platform connecting Federal University Dutse students with alumni mentors.',
    ARRAY['Typescript', 'PLpgSQL', 'Supabase'],
    'https://github.com/Sardaunatechworks/fud-alumni-network',
    'https://fud-alumni-network.vercel.app',
    '/fudalumni.png',
    4
),
(
    'Community Traders Platform',
    'Digital system for local traders to manage inventory and business operations.',
    ARRAY['React', 'TailwindCSS', 'Firebase', 'UNDERDEVELOPMENT'],
    'https://github.com/Sardaunatechworks/community-traders',
    'https://community-traders.comingsoon',
    '/community.png',
    5
);

-- 4. Seed Skills
INSERT INTO skills (name, sort_order)
VALUES
('HTML5', 0),
('CSS3', 1),
('JavaScript', 2),
('TypeScript', 3),
('React', 4),
('Tailwind CSS', 5),
('PHP', 6),
('Git', 7),
('GitHub', 8),
('Firebase', 9),
('REST APIs', 10),
('Agile/Scrum', 11),
('UI/UX Design', 12);

-- 5. Seed Certifications
INSERT INTO certifications (title, issuer, date, sort_order)
VALUES
('Microsoft AI Developers Program ', 'Digital Skills Nigeria', '2025', 0),
('Google Cloud Innovator Program ', 'Google Developer Groups', '2025', 1),
('UI/UX Design Bootcamp Certificate ', 'Nothern Creative Designers', '2025', 2),
('UI/UX Design', 'TrybeX Bootcamp', '2024', 3),
('Introduction to Cybersecurity & Digital Forensics', 'Bread of Hope', '2025', 4),
('Build with AI 2025 ', 'Google Developers Group', '2025', 5);
