# Production Deployment & Cutover Checklist
## Muhammad Auwal Abubakar Personal Portfolio 2.0

Follow this sequential checklist when executing the live deployment to **Vercel** and **WhoGoHost Shared Hosting**.

---

### Phase 1: Pre-Deployment Provisioning (WhoGoHost cPanel)

- [ ] **1.1 Confirm PHP Version:** Open cPanel **Select PHP Version**; ensure **PHP 8.3** is active with `pdo_mysql`, `fileinfo`, `openssl`, `mbstring`, `curl`, and `zip`.
- [ ] **1.2 Create MySQL Database:** Create database (e.g. `cpaneluser_portfolio`) and dedicated database user with a 24+ character password.
- [ ] **1.3 Add Sibling Subdomain:**
  * Subdomain: `api.muhammad.sardaunatechlabs.com.ng`
  * Document Root: `/home/cpaneluser/portfolio-api/public` (outside `public_html`).
- [ ] **1.4 Configure DNS:**
  * CNAME: `muhammad.sardaunatechlabs.com.ng` -> `cname.vercel-dns.com.`
  * A Record: `api.muhammad.sardaunatechlabs.com.ng` -> `[WhoGoHost Server IP]`
- [ ] **1.5 Issue SSL:** In cPanel **SSL/TLS Status**, trigger **AutoSSL** for the API subdomain.

---

### Phase 2: Application Upload & Configuration

- [ ] **2.1 Upload Application:** Upload `portfolio-api` files into `/home/cpaneluser/portfolio-api/`.
- [ ] **2.2 Configure Production `.env`:** Copy `.env.example` to `.env` inside `/home/cpaneluser/portfolio-api/` with production DB and SMTP values.
- [ ] **2.3 Run Database Migrations & Initial Seeding:**
  ```bash
  cd ~/portfolio-api
  php artisan key:generate --force
  php artisan migrate --seed --force
  php artisan storage:link
  ```
- [ ] **2.4 Cache Laravel Configurations:**
  ```bash
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  ```
- [ ] **2.5 Set UNIX File Permissions:**
  ```bash
  find ~/portfolio-api -type f -exec chmod 644 {} \;
  find ~/portfolio-api -type d -exec chmod 755 {} \;
  chmod -R 775 ~/portfolio-api/storage
  chmod -R 775 ~/portfolio-api/bootstrap/cache
  ```

---

### Phase 3: Supabase Data Migration & Media Ingestion

- [ ] **3.1 Execute Migration Command:**
  ```bash
  cd ~/portfolio-api
  php artisan portfolio:migrate-supabase --download-media
  ```
- [ ] **3.2 Validate Record Integrity:**
  * Profiles count == 1
  * Experience timeline records match historical employment
  * Projects have cover images and associated tech tags
  * Skills and certifications match ALX / Google Cloud credentials
- [ ] **3.3 Verify Local Media Storage:** Check that `storage/app/public/` contains downloaded assets and is symlinked to `public/storage`.

---

### Phase 4: Frontend Deployment (Vercel)

- [ ] **4.1 Deploy Branch to Vercel:** Import repository `Sardaunatechworks/sardauna-portfolio`, branch `editorial-rebuild`.
- [ ] **4.2 Set Environment Variables:** Set `VITE_API_BASE_URL` = `https://api.muhammad.sardaunatechlabs.com.ng/api/v1`.
- [ ] **4.3 Assign Production Domain:** Add `muhammad.sardaunatechlabs.com.ng` in Vercel project domain settings.
- [ ] **4.4 Verify SSL on Frontend:** Ensure HTTPS is active and padlock is valid.

---

### Phase 5: Post-Deployment Smoke Testing

- [ ] **5.1 Public Homepage:** `https://muhammad.sardaunatechlabs.com.ng` loads hero, bio, metrics, and marquee.
- [ ] **5.2 Projects & Detail:** Filter projects, open `/projects/{slug}`, check screenshots and GitHub links.
- [ ] **5.3 Contact Dispatch:** Send a test inquiry through the contact form:
  * Check that message appears in MySQL `contact_messages`.
  * Check that SMTP email arrives in `contact.sardaunatech@gmail.com`.
- [ ] **5.4 Administrator Portal:**
  * Navigate to `/admin`.
  * Verify status badge shows "Connected to Laravel 13 REST API backend".
  * Sign in with seed administrator credentials.
  * Verify dashboard metrics, edit a profile bio or project description, and confirm changes persist.

---

### Phase 6: Decommissioning Supabase (Approval Gate)

> [!CAUTION]
> **Mandatory Rule:** Do not delete or retire Supabase tables, storage buckets, or authentication projects until:
> 1. All 5 post-deployment smoke tests in Phase 5 have passed.
> 2. The live system has run without errors for at least 72 hours.
> 3. You have received **explicit written approval** from Muhammad Auwal Abubakar.
