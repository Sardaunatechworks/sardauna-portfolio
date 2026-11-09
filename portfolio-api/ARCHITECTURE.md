# System Architecture & Technical Design
## Muhammad Auwal Abubakar Personal Portfolio 2.0

### 1. Architectural Overview

The application utilizes a **modern decoupled architecture** designed for high performance, reliability, and security across a split-deployment topology:

* **Presentation Layer (Frontend):** React 18 + Vite SPA deployed globally on **Vercel Edge Network**, served under `https://muhammad.sardaunatechlabs.com.ng`.
* **Application & API Layer (Backend):** Laravel 13 / PHP 8.3+ deployed on **WhoGoHost Shared Hosting (cPanel)**, served under `https://api.muhammad.sardaunatechlabs.com.ng`.
* **Persistence Layer (Database):** MySQL 8.0+ managed via Laravel Eloquent ORM.
* **Storage Layer (Media):** Laravel Filesystem public disk (`storage/app/public/`), symlinked into web root.
* **Mail & Notifications:** Laravel Mailable over SMTP with HTML email templating.

```
+-------------------------------------------------------------+
|                     Client Web Browser                       |
+-------------------------------------------------------------+
               |                               |
    (HTML/JS Assets)                (REST API / Cookies / Token)
               v                               v
+-----------------------------+   +-----------------------------+
|           Vercel            |   |     WhoGoHost (cPanel)      |
|  muhammad.                  |   |  api.muhammad.              |
|  sardaunatechlabs.com.ng    |   |  sardaunatechlabs.com.ng    |
|                             |   |                             |
|  - React 18 SPA             |   |  - Apache FastCGI (.htaccess)|
|  - Vite Bundler             |   |  - Laravel 13 / PHP 8.3+    |
|  - Client-Side Router       |   |  - Sanctum Stateful Auth    |
|  - Offline Fallback Engine  |   |  - Throttle & Honeypot      |
+-----------------------------+   +-----------------------------+
                                                 |
                                  +--------------+--------------+
                                  |                             |
                                  v                             v
                   +----------------------------+  +----------------------------+
                   |       MySQL Database       |  |      Local Disk Storage    |
                   |  (Profiles, Projects,      |  |  (portfolio-uploads/,      |
                   |   Experiences, Skills)     |  |   symlinked to public/)    |
                   +----------------------------+  +----------------------------+
```

---

### 2. Sibling Subdomain Topology & Security

Because both frontend and backend reside under the same registrable apex domain (`.sardaunatechlabs.com.ng`):
1. **Sanctum Stateful Authentication:**
   * Cookies can be scoped across subdomains by configuring `SESSION_DOMAIN=.sardaunatechlabs.com.ng`.
   * When an administrator logs into `https://muhammad.sardaunatechlabs.com.ng/admin`, the session cookie is valid for requests dispatched to `https://api.muhammad.sardaunatechlabs.com.ng`.
2. **Dual-Mode Bearer Token Fallback:**
   * `AuthController` also generates and returns a Sanctum `PlainTextToken`.
   * The React frontend API client stores this token in `localStorage` and transmits it in the `Authorization: Bearer <token>` header on every request.
   * This guarantees authentication never breaks even if third-party cookie restrictions or cross-site privacy policies block cookie transfer.
3. **CORS Policy:**
   * Handled by Laravel CORS middleware via `config/cors.php`.
   * Explicitly allows `https://muhammad.sardaunatechlabs.com.ng`, `https://*.vercel.app`, and `http://localhost:5173`.
   * Sets `supports_credentials => true` with `max_age => 86400`.

---

### 3. File System Zero-Exposure Standard

To protect server integrity on shared hosting:
* **Application Root (`/home/whogohostuser/portfolio-api`):** Completely outside `public_html`. Source code, `.env`, SQLite fallbacks, migration files, and artisan CLI cannot be reached by web visitors.
* **Web Root (`/home/whogohostuser/public_html/api` or subdomain root):** Contains only `index.php`, `.htaccess`, and the `storage` symlink.
* **Apache Rewrite Rules:** `.htaccess` passes the `Authorization` header to FastCGI/PHP-FPM to avoid token stripping.

---

### 4. Database Entity Relationship Model

1. **`users`**: Administrator accounts with hashed passwords, Sanctum tokens, and remember tokens.
2. **`profiles`**: Single primary profile record (name, professional title, headline, short/medium/extended bio, contacts, social links, availability).
3. **`experiences`**: Chronological work history with engagement types, date ranges, and structured description bullets.
4. **`projects`**: Featured and catalogued portfolio projects (slug, title, overview, problem, solution, repository URL, demo URL, cover image, status).
5. **`technologies` & `project_technology`**: Normalized many-to-many relationship linking tech stack tags to projects.
6. **`skills`**: Technical skill taxonomy with categorization and display ordering.
7. **`certifications`**: Professional credentials, issuing organizations, dates, and credential links.
8. **`community_activities` & `speaking_engagements`**: Community leadership, workshops, and conference appearances.
9. **`articles` & `categories`**: Editorial technical articles and thought leadership posts.
10. **`contact_messages`**: Inbound visitor inquiries with IP SHA-256 hash, read/unread status, and timestamps.
11. **`media`**: Uploaded media assets tracking original filenames, MIME types, dimensions, and disk paths.
12. **`site_settings`**: Key-value pairs for public flags, social handles, and metadata.

---

### 5. Resilient Frontend Fallback Architecture

The React application implements a three-tier data resolution strategy:
1. **Tier 1 (Laravel 13 REST API):** When `VITE_API_BASE_URL` is configured and online, all content is fetched from the MySQL database.
2. **Tier 2 (Supabase Fallback):** If Laravel is not configured, the app checks for active Supabase environment variables for seamless backward compatibility.
3. **Tier 3 (Editorial Baseline Defaults):** If both backends are offline, the frontend falls back immediately to verified local defaults without crashing or polluting the browser console.
