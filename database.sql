-- =============================================================================
-- Muhammad Auwal Abubakar Portfolio 2.0 - Complete MySQL Database Export
-- Target Engine: MySQL 8.0+ / MariaDB 10.4+
-- Collation: utf8mb4_unicode_ci
-- Generated for cPanel / phpMyAdmin 1-Click Import
-- =============================================================================

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- -----------------------------------------------------------------------------
-- Table: users
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: password_reset_tokens
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: sessions
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: personal_access_tokens
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: profiles
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `professional_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `headline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_bio` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medium_bio` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extended_bio` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `portfolio_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roles` json DEFAULT NULL,
  `availability_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Available for Strategic Collaborations & Speaking',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: experiences
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `experiences`;
CREATE TABLE `experiences` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `organization` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `engagement_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Employment',
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc_points` json DEFAULT NULL,
  `date_display` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `experiences_is_published_sort_order_index` (`is_published`,`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: technologies
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `technologies`;
CREATE TABLE `technologies` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `technologies_name_unique` (`name`),
  UNIQUE KEY `technologies_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: projects
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Business Technology',
  `overview` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `problem_statement` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solution` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Founder & Lead Developer',
  `project_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'In Development',
  `project_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `repository_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tech_list` json DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_slug_unique` (`slug`),
  KEY `projects_is_published_sort_order_index` (`is_published`,`sort_order`),
  KEY `projects_slug_index` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: project_technology
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `project_technology`;
CREATE TABLE `project_technology` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `technology_id` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_technology_project_id_technology_id_unique` (`project_id`,`technology_id`),
  KEY `project_technology_technology_id_foreign` (`technology_id`),
  CONSTRAINT `project_technology_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_technology_technology_id_foreign` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: skills
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Engineering',
  `proficiency_label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `skills_is_published_sort_order_index` (`is_published`,`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: certifications
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `certifications`;
CREATE TABLE `certifications` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credential_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `credential_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issued_at` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires_at` date DEFAULT NULL,
  `badge_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `certifications_is_published_sort_order_index` (`is_published`,`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: community_activities
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `community_activities`;
CREATE TABLE `community_activities` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `organization` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Community Leadership',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `highlights` json DEFAULT NULL,
  `period` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT 1,
  `external_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `community_activities_is_published_sort_order_index` (`is_published`,`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: speaking_engagements
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `speaking_engagements`;
CREATE TABLE `speaking_engagements` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_format` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Keynote',
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: categories
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: articles
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_time` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '5 min read',
  `cover_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `published_at` timestamp NULL DEFAULT NULL,
  `topics` json DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_slug_unique` (`slug`),
  KEY `articles_status_published_at_index` (`status`,`published_at`),
  KEY `articles_slug_index` (`slug`),
  KEY `articles_category_id_foreign` (`category_id`),
  CONSTRAINT `articles_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: contact_messages
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unread',
  `ip_hash` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responded_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_messages_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: media
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `original_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'public',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` bigint(20) UNSIGNED NOT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploaded_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `media_uploaded_by_foreign` (`uploaded_by`),
  CONSTRAINT `media_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: site_settings
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_setting_key_unique` (`setting_key`),
  KEY `site_settings_setting_key_is_public_index` (`setting_key`,`is_public`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- SEED DATA INSERTION
-- =============================================================================

-- 1. Admin User (Password: SardaunaTech@2026!)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad Auwal Abubakar', 'contact.sardaunatech@gmail.com', '$2y$12$6gbfKcwbCUIx7vhd1yK9/.pyKa7fCJoa9giAzKrgP7qYxb/FOHNBW', NOW(), NOW(), NOW());

-- 2. Profile
INSERT INTO `profiles` (`id`, `full_name`, `professional_title`, `headline`, `short_bio`, `medium_bio`, `extended_bio`, `location`, `email`, `phone1`, `phone2`, `github_url`, `portfolio_url`, `profile_image_url`, `roles`, `availability_status`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad Auwal Abubakar', 'Technology Entrepreneur & Software Developer', 'Founder & CEO of Sardauna Tech Lab Ltd · Project Manager & Head of Operations at Startup Jigawa', 
'I\'m a technology professional, entrepreneur, and project leader focused on building practical digital solutions and empowering people through technology. As Founder and CEO of Sardauna Tech Lab Ltd, I lead the development of modern digital platforms and business automation tools.',
'I\'m Muhammad Auwal Abubakar, a technology professional based in Dutse, Jigawa State, Nigeria. As Founder and CEO of Sardauna Tech Lab Ltd, I build digital products and business tools that solve real problems. I also serve as Project Manager and Head of Operations at Startup Jigawa, and direct projects and programmes at Techfort Community. My work spans software development, project leadership, technology education, and community building.',
'I\'m Muhammad Auwal Abubakar, a technology professional, entrepreneur, and project leader based in Dutse, Jigawa State, Nigeria. I work at the intersection of software development, technology entrepreneurship, and community empowerment.\n\nAs Founder and CEO of Sardauna Tech Lab Ltd, I lead the development of digital products and business automation tools — building platforms like TraderERP, SmartSupport.tech, and MyEventPass that address real needs for traders, businesses, and event organisers.\n\nBeyond building software, I serve as Project Manager and Head of Operations at Startup Jigawa, where I coordinate technology-driven initiatives. I also direct projects and programmes at Techfort Community, leading workshops, capacity-building programmes, and technology education initiatives.\n\nI\'m an active member of the developer community, contributing to Google Developer Groups (GDG) Dutse and participating in DevFest events. I teach web development at Coding Technology Digital Learning School, because I believe technology skills should be accessible to everyone.',
'Dutse, Jigawa State, Nigeria', 'contact.sardaunatech@gmail.com', '+234 701 967 2820', '+234 906 027 6333', 'https://github.com/Sardaunatechworks', 'https://sardauna-portfolio.vercel.app', NULL, '["Technology Entrepreneur", "Software Developer", "Project Leader", "Community Builder"]', 'Available for Strategic Collaborations & Speaking', NOW(), NOW());

-- 3. Experiences
INSERT INTO `experiences` (`id`, `organization`, `role_title`, `engagement_type`, `date_display`, `is_current`, `sort_order`, `desc_points`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 'Sardauna Tech Lab Ltd', 'Founder & CEO', 'Employment', '2023 – Present', 1, 0, '["Founded and lead a technology solutions company focused on digital products and business automation tools.", "Lead product strategy, development planning, and deployment of web-based platforms.", "Manage the product lifecycle including design, development, testing, and release."]', 1, NOW(), NOW()),
(2, 'Startup Jigawa', 'Project Manager & Head of Operations', 'Employment', '2025 – Present', 1, 1, '["Manage project operations and coordinate technology-driven initiatives.", "Oversee operational workflows, team coordination, and programme delivery."]', 1, NOW(), NOW()),
(3, 'Techfort Community', 'Director of Projects and Programs', 'Leadership Appointment', '2025 – Present', 1, 2, '["Lead technology-driven initiatives focused on digital literacy and tech empowerment.", "Coordinate teams across frontend, backend, and UI/UX development.", "Manage project timelines, resource allocation, and workflow processes."]', 1, NOW(), NOW()),
(4, 'NorthDemy Limited', 'Project Manager – DeepTech Ready Fellows', 'Project-based', '2025 – Present', 1, 3, '["Managed programme coordination for the DeepTech Ready Fellows Programme.", "Monitored engagement and learning progress of fellows.", "Acted as liaison between learners and programme coordinators."]', 1, NOW(), NOW()),
(5, 'Coding Technology Digital Learning School', 'Teaching Staff – Coding & Digital Technology', 'Employment', '2026 – Present', 1, 4, '["Teach web development and programming fundamentals to students.", "Deliver practical lessons using HTML, CSS, JavaScript, PHP, and Firebase."]', 1, NOW(), NOW());

-- 4. Technologies
INSERT INTO `technologies` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'React', 'react', NOW(), NOW()),
(2, 'Next.js', 'nextjs', NOW(), NOW()),
(3, 'TypeScript', 'typescript', NOW(), NOW()),
(4, 'JavaScript', 'javascript', NOW(), NOW()),
(5, 'HTML5', 'html5', NOW(), NOW()),
(6, 'CSS3', 'css3', NOW(), NOW()),
(7, 'PHP', 'php', NOW(), NOW()),
(8, 'Laravel', 'laravel', NOW(), NOW()),
(9, 'MySQL', 'mysql', NOW(), NOW()),
(10, 'Supabase', 'supabase', NOW(), NOW()),
(11, 'Firebase', 'firebase', NOW(), NOW()),
(12, 'Tailwind CSS', 'tailwind-css', NOW(), NOW()),
(13, 'REST APIs', 'rest-apis', NOW(), NOW()),
(14, 'AI APIs', 'ai-apis', NOW(), NOW()),
(15, 'Git', 'git', NOW(), NOW());

-- 5. Projects
INSERT INTO `projects` (`id`, `title`, `slug`, `tagline`, `overview`, `problem_statement`, `solution`, `category`, `role`, `project_status`, `live_url`, `repository_url`, `cover_image`, `is_featured`, `sort_order`, `tech_list`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 'TraderERP', 'tradererp', 'Enterprise resource planning platform for merchants', 
'Enterprise resource planning platform designed for traders and small businesses to manage their inventory, customer balances, and operations digitally.', 
'Informal and small retailers in emerging markets face high friction managing multi-location stock, customer credit books, and invoices on fragmented paper records.', 
'A clean, responsive web application combining real-time inventory balances, invoicing, and sales tracking tailored for low-bandwidth connections.', 
'Business Technology', 'Founder & Lead Developer', 'In Development', '', '', '', 1, 0, '["React", "Next.js", "TypeScript", "MySQL"]', 1, NOW(), NOW()),

(2, 'SmartSupport.tech', 'smartsupport', 'AI-powered omnichannel customer support automation', 
'AI-powered omnichannel customer support automation platform designed to help modern businesses resolve client inquiries 24/7.', 
'Customer service bottlenecks cost small businesses leads due to delayed response times outside regular operating hours.', 
'Automated conversational AI workflows integrated into webchat and messaging channels with seamless human handoff.', 
'AI & Automation', 'Founder & Lead Developer', 'In Development', '', 'https://github.com/Sardaunatechworks/smartsupport-ai', '/smartsupport.png', 1, 1, '["React", "Tailwind CSS", "Firebase", "AI APIs"]', 1, NOW(), NOW()),

(3, 'MyEventPass', 'myeventpass', 'Digital event ticketing and access control', 
'Digital event ticketing and management platform for event organisers and attendees across Nigeria.', 
'Event planners encounter counterfeit physical tickets and complex reconciliation for ticket sales.', 
'QR-code driven digital ticketing with instantaneous gate validation and organizer revenue dashboards.', 
'Events & Community', 'Founder & Developer', 'In Development', '', '', '', 0, 2, '["React", "TypeScript", "MySQL"]', 1, NOW(), NOW()),

(4, 'Learnyxa', 'learnyxa', 'Accessible technology education platform', 
'Online learning platform designed to make technology education and hands-on developer training accessible.', 
'Beginner coders in non-metropolitan hubs often lack structured, bite-sized curriculum tracks in practical development.', 
'Interactive project-based learning modules with mentor review integration.', 
'Education Technology', 'Founder & Developer', 'In Development', '', '', '', 0, 3, '["React", "Tailwind CSS", "PHP"]', 1, NOW(), NOW()),

(5, 'Inventory Tracker', 'inventory-tracker', 'Vendor and reseller inventory synchronizer', 
'Vendor and reseller inventory management system with real-time synchronisation and stock alerts.', 
'Resellers often oversell products when vendor inventories are updated asynchronously.', 
'A lightweight catalog synchronization engine notifying distributors of threshold stock level drops.', 
'Business Technology', 'Developer', 'In Development', '', 'https://github.com/Sardaunatechworks/inventory-tracker', '/inventory.png', 0, 4, '["React", "Firebase", "Tailwind CSS"]', 1, NOW(), NOW()),

(6, 'Sardauna Tech Hub', 'sardauna-tech-hub', 'Curated technology resource directory', 
'Multi-language platform providing curated technology learning resources and developer guides.', 
'Curated learning paths for Hausa and English speaking self-taught engineers are scattered across disparate forums.', 
'A centralized, blazing-fast static portal categorizing documentation, roadmaps, and community links.', 
'Education Technology', 'Creator', 'Live', 'https://sardaunatechworks.github.io/Sardaunatechub.web/', 'https://github.com/Sardaunatechworks/Sardaunatechub.web', '/hub.png', 1, 5, '["HTML5", "CSS3", "JavaScript"]', 1, NOW(), NOW());

-- 6. Project Technology Pivots
INSERT INTO `project_technology` (`project_id`, `technology_id`) VALUES
(1, 1), (1, 2), (1, 3), (1, 9),
(2, 1), (2, 12), (2, 11), (2, 14),
(3, 1), (3, 3), (3, 9),
(4, 1), (4, 12), (4, 7),
(5, 1), (5, 11), (5, 12),
(6, 5), (6, 6), (6, 4);

-- 7. Skills
INSERT INTO `skills` (`id`, `name`, `category`, `sort_order`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 'HTML5', 'Frontend', 0, 1, NOW(), NOW()),
(2, 'CSS3', 'Frontend', 1, 1, NOW(), NOW()),
(3, 'JavaScript (ES6+)', 'Frontend', 2, 1, NOW(), NOW()),
(4, 'TypeScript', 'Frontend', 3, 1, NOW(), NOW()),
(5, 'React', 'Frontend', 4, 1, NOW(), NOW()),
(6, 'Tailwind CSS', 'Frontend', 5, 1, NOW(), NOW()),
(7, 'PHP', 'Backend & Cloud', 6, 1, NOW(), NOW()),
(8, 'Laravel', 'Backend & Cloud', 7, 1, NOW(), NOW()),
(9, 'MySQL / PostgreSQL', 'Backend & Cloud', 8, 1, NOW(), NOW()),
(10, 'REST APIs', 'Backend & Cloud', 9, 1, NOW(), NOW()),
(11, 'Git & GitHub', 'Developer Tools', 10, 1, NOW(), NOW()),
(12, 'Agile / Scrum', 'Architecture & Leadership', 11, 1, NOW(), NOW()),
(13, 'UI/UX Design', 'Architecture & Leadership', 12, 1, NOW(), NOW()),
(14, 'Project Management', 'Architecture & Leadership', 13, 1, NOW(), NOW());

-- 8. Certifications
INSERT INTO `certifications` (`id`, `name`, `issuer`, `issued_at`, `sort_order`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 'Microsoft AI Developers Program', 'Digital Skills Nigeria', '2025', 0, 1, NOW(), NOW()),
(2, 'Google Cloud Innovator Program', 'Google Developer Groups', '2025', 1, 1, NOW(), NOW()),
(3, 'UI/UX Design Bootcamp Certificate', 'Northern Creative Designers', '2025', 2, 1, NOW(), NOW()),
(4, 'UI/UX Design', 'TrybeX Bootcamp', '2024', 3, 1, NOW(), NOW()),
(5, 'Introduction to Cybersecurity & Digital Forensics', 'Bread of Hope', '2025', 4, 1, NOW(), NOW()),
(6, 'Build with AI 2025', 'Google Developers Group', '2025', 5, 1, NOW(), NOW());

-- 9. Community Activities
INSERT INTO `community_activities` (`id`, `organization`, `role_title`, `activity_type`, `title`, `description`, `highlights`, `period`, `is_current`, `sort_order`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 'Techfort Community', 'Director of Projects and Programs', 'Community Leadership', 'Techfort Digital Capacity Building', 
'Directing technology education initiatives, workshops, and youth capacity-building programmes focused on digital literacy and software skills across Northern Nigeria.', 
'["Coordinated regional technical bootcamps for student cohorts", "Built hands-on mentor feedback channels for engineering learners", "Guided curriculum roadmaps for frontend and UI design tracks"]', '2025 – Present', 1, 0, 1, NOW(), NOW()),
(2, 'Google Developer Groups (GDG) Dutse', 'Active Member & Contributor', 'Developer Community', 'GDG Dutse Ecosystem Engagement', 
'Active participant in Google Developer Groups Dutse, contributing to developer ecosystem meetups, technical exchanges, and community events.', 
'["Contributed to modern web engineering workshops", "Assisted in onboarding student developers into open-source habits", "Participated in regional technical knowledge panels"]', '2024 – Present', 1, 1, 1, NOW(), NOW()),
(3, 'DevFest', 'Volunteer & Community Supporter', 'Conference Volunteering', 'DevFest Annual Gatherings', 
'Volunteered in organising and supporting DevFest gatherings, facilitating developer sessions and logistics.', 
'["Supported track logistics and attendee engagement", "Connected with tech builders and ecosystem founders across the nation", "Advocated for inclusive technical opportunities"]', '2024 – Present', 1, 2, 1, NOW(), NOW());

-- 10. Categories & Articles
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Product & Architecture', 'product-architecture', 'Software engineering and system architecture', NOW(), NOW()),
(2, 'Community & Education', 'community-education', 'Tech education and mentorship', NOW(), NOW());

INSERT INTO `articles` (`id`, `category_id`, `title`, `slug`, `excerpt`, `body`, `read_time`, `status`, `published_at`, `topics`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Architecting Software for Local Realities: Lessons from Building TraderERP', 'architecting-software-local-realities', 
'How designing business management tools for traders and small retailers requires fundamentally rethinking connectivity resilience, mobile-first data tables, and minimal cognitive load.', 
'When building business management platforms in non-metropolitan hubs and emerging commercial clusters across Nigeria, software architects must challenge standard Silicon Valley assumptions.\n\nConnectivity is variable, screen real estate on mobile devices is constrained, and merchants prioritize rapid balance reconciliation over complex analytical dashboards. In building TraderERP, we stripped out unnecessary abstraction layers to focus on transactional speed, local data caching, and straightforward exportable summaries.\n\nBy designing for the merchant\'s physical environment, digital adoption becomes seamless rather than intimidating.', 
'5 min read', 'published', NOW() - INTERVAL 20 DAY, '["Enterprise Systems", "UX Architecture", "Emerging Markets"]', 'Architecting Software for Local Realities | Muhammad Auwal Abubakar', 'Lessons learned while building TraderERP for merchants and regional business owners.', NOW(), NOW()),

(2, 2, 'The Missing Link in Regional Tech Ecosystems: Sustained Mentorship', 'missing-link-regional-tech-ecosystems', 
'One-off bootcamps generate excitement, but durable technical careers require ongoing apprenticeships and practical project critiques. Insights from our work at Techfort and coding academies.', 
'Thousands of eager young students graduate from weekend hackathons and one-week digital literacy workshops with enthusiastic aspirations, yet find themselves stranded when attempting to build production software.\n\nThe missing ingredient in regional tech ecosystems is not raw ambition; it is structured, sustained apprenticeship. Through our programmatic initiatives at Techfort Community and instructional sessions at Coding Technology Digital Learning School, we pair foundational theory with rigorous project code reviews.\n\nTrue mastery is formed during the long middle miles of debugging and refactoring.', 
'4 min read', 'published', NOW() - INTERVAL 45 DAY, '["Education", "Youth Empowerment", "Tech Community"]', 'The Missing Link in Regional Tech Ecosystems | Muhammad Auwal Abubakar', 'Why sustained mentorship and code reviews are the catalyst for developer careers.', NOW(), NOW());

-- 11. Site Settings
INSERT INTO `site_settings` (`id`, `setting_key`, `setting_value`, `is_public`, `created_at`, `updated_at`) VALUES
(1, 'site_title', 'Muhammad Auwal Abubakar | Technology Entrepreneur & Software Developer', 1, NOW(), NOW()),
(2, 'contact_email', 'contact.sardaunatech@gmail.com', 1, NOW(), NOW()),
(3, 'contact_phone', '+234 701 967 2820', 1, NOW(), NOW());

SET FOREIGN_KEY_CHECKS=1;
COMMIT;