# Repository & Hosting Audit Report
## Muhammad Auwal Abubakar Personal Portfolio 2.0

**Target Backend:** Laravel 13 (PHP 8.3+) + MySQL 8.0+  
**Target Hosting:** WhoGoHost Shared Hosting (cPanel) + Vercel (React Frontend)  
**Production Domains:**  
- Frontend: `https://muhammad.sardaunatechlabs.com.ng`  
- Backend API: `https://api.muhammad.sardaunatechlabs.com.ng`  
**Status:** Completed Audit & Feasibility Verification  
**Date:** 9 November 2026  

---

## 1. Existing Supabase Tables & Schema Inventory

Based on repository inspection of `supabase_seed.sql`, `src/hooks/usePortfolio.jsx`, and `src/admin/pages/AdminDashboardPage.jsx`:

| Supabase Table | Columns & Types | PostgreSQL Nuances | Target MySQL Schema |
|---|---|---|---|
| `personal_info` | `id` (bigint PK), `name` (text), `location` (text), `email` (text), `phone1` (text), `phone2` (text), `github` (text), `portfolio` (text), `about` (text), `roles` (text[]), `profile_pic` (text) | Uses PostgreSQL `TEXT[]` array for roles | Normalized into `profiles` table; `roles` stored as JSON array |
| `experience` | `id` (bigint PK), `role` (text), `company` (text), `date` (text), `desc_points` (text[]), `sort_order` (int) | Uses PostgreSQL `TEXT[]` array for `desc_points` and string `date` ("2022 – Present") | Normalized into `experiences` table with `role_title`, `organization`, `date_display`, `is_current`, `desc_points` (JSON) |
| `projects` | `id` (bigint PK), `title` (text), `desc_text` (text), `tech` (text[]), `github` (text), `demo` (text), `img` (text), `sort_order` (int) | Uses PostgreSQL `TEXT[]` array for tech; contains pseudo-status `'UNDERDEVELOPMENT'` | Normalized into `projects` table with unique `slug`, `overview`, `cover_image`, `project_status`, plus relational `technologies` & pivot |
| `skills` | `id` (bigint PK), `name` (text), `sort_order` (int) | Flat list without categories | Normalized into `skills` table with `name`, `category`, and `sort_order` |
| `certifications` | `id` (bigint PK), `title` (text), `issuer` (text), `date` (text), `sort_order` (int) | Flat text year string | Normalized into `certifications` table with `name`, `issuer`, `credential_url`, `issued_at` |

---

## 2. Frontend Supabase Integrations Audit

The frontend files actively coupled to `@supabase/supabase-js` were:
1. `src/lib/supabase.js`: Instantiates `createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)`
2. `src/hooks/usePortfolio.jsx`: Data loading and auth listeners
3. `src/admin/pages/AdminLoginPage.jsx`: `supabase.auth.signInWithPassword`
4. `src/admin/pages/AdminDashboardPage.jsx`: Supabase storage uploads and table mutations

**Replacement Strategy:**
All Supabase client calls have been abstracted into modular services inside `src/lib/api/` (`client.js`, `auth.js`, `portfolio.js`, `contact.js`, `admin.js`). Supabase is preserved strictly as an unselected fallback until live cutover approval.

---

## 3. Storage & Media Audit

* **Supabase Bucket:** `portfolio-uploads` (public bucket)
  * `project-images/`
  * `profile-images/`
* **Static Assets:** Static project preview images stored in `public/`
* **Laravel Replacement:** Laravel Filesystem using the `public` disk (`storage/app/public`), symlinked to `public/storage`. Media upload endpoint `POST /api/v1/admin/media/upload` stores files and generates public asset URLs.

---

## 4. WhoGoHost Shared Hosting Compatibility Audit

| Requirement | WhoGoHost Capability | Implementation Decision |
| :--- | :--- | :--- |
| **PHP Version** | CloudLinux PHP Selector supports PHP 8.2 and PHP 8.3 | Select PHP 8.3 in cPanel |
| **Apache Rewrite** | FastCGI / mod_rewrite enabled | Custom `.htaccess` forwarding `HTTP:Authorization` |
| **Document Root** | Can be customized per subdomain | Set `api.muhammad.sardaunatechlabs.com.ng` document root to `portfolio-api/public/` |
| **Zero-Exposure** | Full user home folder access (`/home/username`) | Keep `portfolio-api/` outside `public_html/` |
| **Database** | MySQL 8.0+ / MariaDB 10.5+ | Provision via cPanel MySQL Databases |
| **SSL** | cPanel AutoSSL (Sectigo / Let's Encrypt) | Free automatic HTTPS certificate |

---

## 5. Domain Topology & Security Verification

* **Sibling Subdomains:**
  * Frontend: `muhammad.sardaunatechlabs.com.ng`
  * API: `api.muhammad.sardaunatechlabs.com.ng`
  * Shared Apex: `sardaunatechlabs.com.ng`
* **CORS & Cookies:** Sibling subdomains permit cookie sharing via `SESSION_DOMAIN=.sardaunatechlabs.com.ng`. In addition, Sanctum Bearer tokens are supported as a resilient transport mechanism.
