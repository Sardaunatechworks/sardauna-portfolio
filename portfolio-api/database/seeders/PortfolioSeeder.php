<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Technology;
use App\Models\Skill;
use App\Models\Certification;
use App\Models\CommunityActivity;
use App\Models\Category;
use App\Models\Article;
use App\Models\SiteSetting;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Profile
        Profile::updateOrCreate(
            ['id' => 1],
            [
                'full_name' => 'Muhammad Auwal Abubakar',
                'professional_title' => 'Technology Entrepreneur & Software Developer',
                'headline' => 'Founder & CEO of Sardauna Tech Lab Ltd · Project Manager & Head of Operations at Startup Jigawa',
                'short_bio' => "I'm a technology professional, entrepreneur, and project leader focused on building practical digital solutions and empowering people through technology. As Founder and CEO of Sardauna Tech Lab Ltd, I lead the development of modern digital platforms and business automation tools.",
                'medium_bio' => "I'm Muhammad Auwal Abubakar, a technology professional based in Dutse, Jigawa State, Nigeria. As Founder and CEO of Sardauna Tech Lab Ltd, I build digital products and business tools that solve real problems. I also serve as Project Manager and Head of Operations at Startup Jigawa, and direct projects and programmes at Techfort Community. My work spans software development, project leadership, technology education, and community building.",
                'extended_bio' => "I'm Muhammad Auwal Abubakar, a technology professional, entrepreneur, and project leader based in Dutse, Jigawa State, Nigeria. I work at the intersection of software development, technology entrepreneurship, and community empowerment.\n\nAs Founder and CEO of Sardauna Tech Lab Ltd, I lead the development of digital products and business automation tools — building platforms like TraderERP, SmartSupport.tech, and MyEventPass that address real needs for traders, businesses, and event organisers.\n\nBeyond building software, I serve as Project Manager and Head of Operations at Startup Jigawa, where I coordinate technology-driven initiatives. I also direct projects and programmes at Techfort Community, leading workshops, capacity-building programmes, and technology education initiatives.\n\nI'm an active member of the developer community, contributing to Google Developer Groups (GDG) Dutse and participating in DevFest events. I teach web development at Coding Technology Digital Learning School, because I believe technology skills should be accessible to everyone.",
                'location' => 'Dutse, Jigawa State, Nigeria',
                'email' => 'contact.sardaunatech@gmail.com',
                'phone1' => '+234 701 967 2820',
                'phone2' => '+234 906 027 6333',
                'github_url' => 'https://github.com/Sardaunatechworks',
                'portfolio_url' => 'https://sardauna-portfolio.vercel.app',
                'profile_image_url' => null,
                'roles' => [
                    'Technology Entrepreneur',
                    'Software Developer',
                    'Project Leader',
                    'Community Builder'
                ],
                'availability_status' => 'Available for Strategic Collaborations & Speaking',
            ]
        );

        // 2. Experiences
        $experiences = [
            [
                'organization' => 'Sardauna Tech Lab Ltd',
                'role_title' => 'Founder & CEO',
                'engagement_type' => 'Employment',
                'date_display' => '2023 – Present',
                'is_current' => true,
                'sort_order' => 0,
                'desc_points' => [
                    'Founded and lead a technology solutions company focused on digital products and business automation tools.',
                    'Lead product strategy, development planning, and deployment of web-based platforms.',
                    'Manage the product lifecycle including design, development, testing, and release.'
                ],
            ],
            [
                'organization' => 'Startup Jigawa',
                'role_title' => 'Project Manager & Head of Operations',
                'engagement_type' => 'Employment',
                'date_display' => '2025 – Present',
                'is_current' => true,
                'sort_order' => 1,
                'desc_points' => [
                    'Manage project operations and coordinate technology-driven initiatives.',
                    'Oversee operational workflows, team coordination, and programme delivery.'
                ],
            ],
            [
                'organization' => 'Techfort Community',
                'role_title' => 'Director of Projects and Programs',
                'engagement_type' => 'Leadership Appointment',
                'date_display' => '2025 – Present',
                'is_current' => true,
                'sort_order' => 2,
                'desc_points' => [
                    'Lead technology-driven initiatives focused on digital literacy and tech empowerment.',
                    'Coordinate teams across frontend, backend, and UI/UX development.',
                    'Manage project timelines, resource allocation, and workflow processes.'
                ],
            ],
            [
                'organization' => 'NorthDemy Limited',
                'role_title' => 'Project Manager – DeepTech Ready Fellows',
                'engagement_type' => 'Project-based',
                'date_display' => '2025 – Present',
                'is_current' => true,
                'sort_order' => 3,
                'desc_points' => [
                    'Managed programme coordination for the DeepTech Ready Fellows Programme.',
                    'Monitored engagement and learning progress of fellows.',
                    'Acted as liaison between learners and programme coordinators.'
                ],
            ],
            [
                'organization' => 'Coding Technology Digital Learning School',
                'role_title' => 'Teaching Staff – Coding & Digital Technology',
                'engagement_type' => 'Employment',
                'date_display' => '2026 – Present',
                'is_current' => true,
                'sort_order' => 4,
                'desc_points' => [
                    'Teach web development and programming fundamentals to students.',
                    'Deliver practical lessons using HTML, CSS, JavaScript, PHP, and Firebase.'
                ],
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::updateOrCreate(
                ['organization' => $exp['organization'], 'role_title' => $exp['role_title']],
                $exp
            );
        }

        // 3. Technologies
        $techNames = [
            'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'PHP', 'Laravel',
            'MySQL', 'Supabase', 'Firebase', 'Tailwind CSS', 'REST APIs', 'AI APIs', 'Git'
        ];
        $techModels = [];
        foreach ($techNames as $t) {
            $techModels[$t] = Technology::firstOrCreate(['slug' => Str::slug($t)], ['name' => $t]);
        }

        // 4. Projects
        $projects = [
            [
                'title' => 'TraderERP',
                'slug' => 'tradererp',
                'tagline' => 'Enterprise resource planning platform for merchants',
                'overview' => 'Enterprise resource planning platform designed for traders and small businesses to manage their inventory, customer balances, and operations digitally.',
                'problem_statement' => 'Informal and small retailers in emerging markets face high friction managing multi-location stock, customer credit books, and invoices on fragmented paper records.',
                'solution' => 'A clean, responsive web application combining real-time inventory balances, invoicing, and sales tracking tailored for low-bandwidth connections.',
                'category' => 'Business Technology',
                'role' => 'Founder & Lead Developer',
                'project_status' => 'In Development',
                'live_url' => '',
                'repository_url' => '',
                'cover_image' => '',
                'is_featured' => true,
                'sort_order' => 0,
                'tech_list' => ['React', 'Next.js', 'TypeScript', 'MySQL'],
            ],
            [
                'title' => 'SmartSupport.tech',
                'slug' => 'smartsupport',
                'tagline' => 'AI-powered omnichannel customer support automation',
                'overview' => 'AI-powered omnichannel customer support automation platform designed to help modern businesses resolve client inquiries 24/7.',
                'problem_statement' => 'Customer service bottlenecks cost small businesses leads due to delayed response times outside regular operating hours.',
                'solution' => 'Automated conversational AI workflows integrated into webchat and messaging channels with seamless human handoff.',
                'category' => 'AI & Automation',
                'role' => 'Founder & Lead Developer',
                'project_status' => 'In Development',
                'live_url' => '',
                'repository_url' => 'https://github.com/Sardaunatechworks/smartsupport-ai',
                'cover_image' => '/smartsupport.png',
                'is_featured' => true,
                'sort_order' => 1,
                'tech_list' => ['React', 'Tailwind CSS', 'Firebase', 'AI APIs'],
            ],
            [
                'title' => 'MyEventPass',
                'slug' => 'myeventpass',
                'tagline' => 'Digital event ticketing and access control',
                'overview' => 'Digital event ticketing and management platform for event organisers and attendees across Nigeria.',
                'problem_statement' => 'Event planners encounter counterfeit physical tickets and complex reconciliation for ticket sales.',
                'solution' => 'QR-code driven digital ticketing with instantaneous gate validation and organizer revenue dashboards.',
                'category' => 'Events & Community',
                'role' => 'Founder & Developer',
                'project_status' => 'In Development',
                'live_url' => '',
                'repository_url' => '',
                'cover_image' => '',
                'is_featured' => false,
                'sort_order' => 2,
                'tech_list' => ['React', 'TypeScript', 'MySQL'],
            ],
            [
                'title' => 'Learnyxa',
                'slug' => 'learnyxa',
                'tagline' => 'Accessible technology education platform',
                'overview' => 'Online learning platform designed to make technology education and hands-on developer training accessible.',
                'problem_statement' => 'Beginner coders in non-metropolitan hubs often lack structured, bite-sized curriculum tracks in practical development.',
                'solution' => 'Interactive project-based learning modules with mentor review integration.',
                'category' => 'Education Technology',
                'role' => 'Founder & Developer',
                'project_status' => 'In Development',
                'live_url' => '',
                'repository_url' => '',
                'cover_image' => '',
                'is_featured' => false,
                'sort_order' => 3,
                'tech_list' => ['React', 'Tailwind CSS', 'PHP'],
            ],
            [
                'title' => 'Inventory Tracker',
                'slug' => 'inventory-tracker',
                'tagline' => 'Vendor and reseller inventory synchronizer',
                'overview' => 'Vendor and reseller inventory management system with real-time synchronisation and stock alerts.',
                'problem_statement' => 'Resellers often oversell products when vendor inventories are updated asynchronously.',
                'solution' => 'A lightweight catalog synchronization engine notifying distributors of threshold stock level drops.',
                'category' => 'Business Technology',
                'role' => 'Developer',
                'project_status' => 'In Development',
                'live_url' => '',
                'repository_url' => 'https://github.com/Sardaunatechworks/inventory-tracker',
                'cover_image' => '/inventory.png',
                'is_featured' => false,
                'sort_order' => 4,
                'tech_list' => ['React', 'Firebase', 'Tailwind CSS'],
            ],
            [
                'title' => 'Sardauna Tech Hub',
                'slug' => 'sardauna-tech-hub',
                'tagline' => 'Curated technology resource directory',
                'overview' => 'Multi-language platform providing curated technology learning resources and developer guides.',
                'problem_statement' => 'Curated learning paths for Hausa and English speaking self-taught engineers are scattered across disparate forums.',
                'solution' => 'A centralized, blazing-fast static portal categorizing documentation, roadmaps, and community links.',
                'category' => 'Education Technology',
                'role' => 'Creator',
                'project_status' => 'Live',
                'live_url' => 'https://sardaunatechworks.github.io/Sardaunatechub.web/',
                'repository_url' => 'https://github.com/Sardaunatechworks/Sardaunatechub.web',
                'cover_image' => '/hub.png',
                'is_featured' => true,
                'sort_order' => 5,
                'tech_list' => ['HTML5', 'CSS3', 'JavaScript'],
            ],
        ];

        foreach ($projects as $proj) {
            $createdProj = Project::updateOrCreate(
                ['slug' => $proj['slug']],
                $proj
            );

            // Attach pivot technologies
            $syncIds = [];
            foreach ($proj['tech_list'] as $techName) {
                if (isset($techModels[$techName])) {
                    $syncIds[] = $techModels[$techName]->id;
                }
            }
            $createdProj->technologies()->sync($syncIds);
        }

        // 5. Skills
        $skills = [
            ['name' => 'HTML5', 'category' => 'Frontend', 'sort_order' => 0],
            ['name' => 'CSS3', 'category' => 'Frontend', 'sort_order' => 1],
            ['name' => 'JavaScript (ES6+)', 'category' => 'Frontend', 'sort_order' => 2],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'sort_order' => 3],
            ['name' => 'React', 'category' => 'Frontend', 'sort_order' => 4],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'sort_order' => 5],
            ['name' => 'PHP', 'category' => 'Backend & Cloud', 'sort_order' => 6],
            ['name' => 'Laravel', 'category' => 'Backend & Cloud', 'sort_order' => 7],
            ['name' => 'MySQL / PostgreSQL', 'category' => 'Backend & Cloud', 'sort_order' => 8],
            ['name' => 'REST APIs', 'category' => 'Backend & Cloud', 'sort_order' => 9],
            ['name' => 'Git & GitHub', 'category' => 'Developer Tools', 'sort_order' => 10],
            ['name' => 'Agile / Scrum', 'category' => 'Architecture & Leadership', 'sort_order' => 11],
            ['name' => 'UI/UX Design', 'category' => 'Architecture & Leadership', 'sort_order' => 12],
            ['name' => 'Project Management', 'category' => 'Architecture & Leadership', 'sort_order' => 13],
        ];

        foreach ($skills as $s) {
            Skill::updateOrCreate(['name' => $s['name']], $s);
        }

        // 6. Certifications
        $certifications = [
            ['name' => 'Microsoft AI Developers Program', 'issuer' => 'Digital Skills Nigeria', 'issued_at' => '2025', 'sort_order' => 0],
            ['name' => 'Google Cloud Innovator Program', 'issuer' => 'Google Developer Groups', 'issued_at' => '2025', 'sort_order' => 1],
            ['name' => 'UI/UX Design Bootcamp Certificate', 'issuer' => 'Northern Creative Designers', 'issued_at' => '2025', 'sort_order' => 2],
            ['name' => 'UI/UX Design', 'issuer' => 'TrybeX Bootcamp', 'issued_at' => '2024', 'sort_order' => 3],
            ['name' => 'Introduction to Cybersecurity & Digital Forensics', 'issuer' => 'Bread of Hope', 'issued_at' => '2025', 'sort_order' => 4],
            ['name' => 'Build with AI 2025', 'issuer' => 'Google Developers Group', 'issued_at' => '2025', 'sort_order' => 5],
        ];

        foreach ($certifications as $c) {
            Certification::updateOrCreate(['name' => $c['name']], $c);
        }

        // 7. Community
        $community = [
            [
                'organization' => 'Techfort Community',
                'role_title' => 'Director of Projects and Programs',
                'activity_type' => 'Community Leadership',
                'title' => 'Techfort Digital Capacity Building',
                'description' => 'Directing technology education initiatives, workshops, and youth capacity-building programmes focused on digital literacy and software skills across Northern Nigeria.',
                'highlights' => [
                    'Coordinated regional technical bootcamps for student cohorts',
                    'Built hands-on mentor feedback channels for engineering learners',
                    'Guided curriculum roadmaps for frontend and UI design tracks'
                ],
                'period' => '2025 – Present',
                'sort_order' => 0,
            ],
            [
                'organization' => 'Google Developer Groups (GDG) Dutse',
                'role_title' => 'Active Member & Contributor',
                'activity_type' => 'Developer Community',
                'title' => 'GDG Dutse Ecosystem Engagement',
                'description' => 'Active participant in Google Developer Groups Dutse, contributing to developer ecosystem meetups, technical exchanges, and community events.',
                'highlights' => [
                    'Contributed to modern web engineering workshops',
                    'Assisted in onboarding student developers into open-source habits',
                    'Participated in regional technical knowledge panels'
                ],
                'period' => '2024 – Present',
                'sort_order' => 1,
            ],
            [
                'organization' => 'DevFest',
                'role_title' => 'Volunteer & Community Supporter',
                'activity_type' => 'Conference Volunteering',
                'title' => 'DevFest Annual Gatherings',
                'description' => 'Volunteered in organising and supporting DevFest gatherings, facilitating developer sessions and logistics.',
                'highlights' => [
                    'Supported track logistics and attendee engagement',
                    'Connected with tech builders and ecosystem founders across the nation',
                    'Advocated for inclusive technical opportunities'
                ],
                'period' => '2024 – Present',
                'sort_order' => 2,
            ],
        ];

        foreach ($community as $comm) {
            CommunityActivity::updateOrCreate(['organization' => $comm['organization']], $comm);
        }

        // 8. Categories & Articles
        $catEng = Category::firstOrCreate(['slug' => 'product-architecture'], ['name' => 'Product & Architecture', 'description' => 'Software engineering and system architecture']);
        $catEdu = Category::firstOrCreate(['slug' => 'community-education'], ['name' => 'Community & Education', 'description' => 'Tech education and mentorship']);

        Article::updateOrCreate(
            ['slug' => 'architecting-software-local-realities'],
            [
                'category_id' => $catEng->id,
                'title' => 'Architecting Software for Local Realities: Lessons from Building TraderERP',
                'excerpt' => 'How designing business management tools for traders and small retailers requires fundamentally rethinking connectivity resilience, mobile-first data tables, and minimal cognitive load.',
                'body' => "When building business management platforms in non-metropolitan hubs and emerging commercial clusters across Nigeria, software architects must challenge standard Silicon Valley assumptions.\n\nConnectivity is variable, screen real estate on mobile devices is constrained, and merchants prioritize rapid balance reconciliation over complex analytical dashboards. In building TraderERP, we stripped out unnecessary abstraction layers to focus on transactional speed, local data caching, and straightforward exportable summaries.\n\nBy designing for the merchant's physical environment, digital adoption becomes seamless rather than intimidating.",
                'read_time' => '5 min read',
                'status' => 'published',
                'published_at' => now()->subDays(20),
                'topics' => ['Enterprise Systems', 'UX Architecture', 'Emerging Markets'],
                'meta_title' => 'Architecting Software for Local Realities | Muhammad Auwal Abubakar',
                'meta_description' => 'Lessons learned while building TraderERP for merchants and regional business owners.',
            ]
        );

        Article::updateOrCreate(
            ['slug' => 'missing-link-regional-tech-ecosystems'],
            [
                'category_id' => $catEdu->id,
                'title' => 'The Missing Link in Regional Tech Ecosystems: Sustained Mentorship',
                'excerpt' => 'One-off bootcamps generate excitement, but durable technical careers require ongoing apprenticeships and practical project critiques. Insights from our work at Techfort and coding academies.',
                'body' => "Thousands of eager young students graduate from weekend hackathons and one-week digital literacy workshops with enthusiastic aspirations, yet find themselves stranded when attempting to build production software.\n\nThe missing ingredient in regional tech ecosystems is not raw ambition; it is structured, sustained apprenticeship. Through our programmatic initiatives at Techfort Community and instructional sessions at Coding Technology Digital Learning School, we pair foundational theory with rigorous project code reviews.\n\nTrue mastery is formed during the long middle miles of debugging and refactoring.",
                'read_time' => '4 min read',
                'status' => 'published',
                'published_at' => now()->subDays(45),
                'topics' => ['Education', 'Youth Empowerment', 'Tech Community'],
                'meta_title' => 'The Missing Link in Regional Tech Ecosystems | Muhammad Auwal Abubakar',
                'meta_description' => 'Why sustained mentorship and code reviews are the catalyst for developer careers.',
            ]
        );

        // 9. Site Settings
        SiteSetting::updateOrCreate(
            ['setting_key' => 'site_title'],
            ['setting_value' => 'Muhammad Auwal Abubakar | Technology Entrepreneur & Software Developer', 'is_public' => true]
        );
        SiteSetting::updateOrCreate(
            ['setting_key' => 'contact_email'],
            ['setting_value' => 'contact.sardaunatech@gmail.com', 'is_public' => true]
        );
        SiteSetting::updateOrCreate(
            ['setting_key' => 'contact_phone'],
            ['setting_value' => '+234 701 967 2820', 'is_public' => true]
        );
    }
}
