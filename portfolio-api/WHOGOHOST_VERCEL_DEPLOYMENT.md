# WhoGoHost & Vercel Split-Deployment Manual
## Muhammad Auwal Abubakar Personal Portfolio 2.0

This guide documents the end-to-end production deployment process for the split architecture:
- **Frontend:** Vercel (`https://muhammad.sardaunatechlabs.com.ng`)
- **Backend:** WhoGoHost Shared Hosting / cPanel (`https://api.muhammad.sardaunatechlabs.com.ng`)
- **Apex Domain Provider:** `sardaunatechlabs.com.ng` (DNS Management via cPanel or Registrar)

---

## Part 1: DNS Records Configuration

Log into your DNS Management Zone Editor (cPanel Zone Editor or your domain registrar):

| Record Type | Host / Name | Value / Destination | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `muhammad.sardaunatechlabs.com.ng` | `cname.vercel-dns.com.` | 14400 | Routes frontend to Vercel global edge |
| **A** | `api.muhammad.sardaunatechlabs.com.ng` | `[WhoGoHost Server IP]` (e.g. `102.130.114.xx`) | 14400 | Routes API to WhoGoHost server |

> [!NOTE]
> Find your WhoGoHost Server IP in the cPanel right-hand sidebar under **General Information -> Shared IP Address**.

---

## Part 2: WhoGoHost Shared Hosting (Backend) Deployment

### 1. PHP Version & Extensions Check
1. In cPanel, search for **Select PHP Version** (CloudLinux PHP Selector).
2. Choose **PHP 8.3** (or PHP 8.4 if available).
3. Ensure the following extensions are enabled:
   * `pdo_mysql`, `openssl`, `mbstring`, `tokenizer`, `xml`, `ctype`, `json`, `fileinfo`, `bcmath`, `curl`, `zip`.

### 2. Subdomain & Document Root Setup
1. In cPanel, navigate to **Domains** -> **Create A New Domain**.
2. Domain: `api.muhammad.sardaunatechlabs.com.ng`
3. Deselect "Share document root".
4. Set **Document Root** to:
   ```
   /home/username/portfolio-api/public
   ```
   *(Replace `username` with your actual cPanel username).*

### 3. Uploading Application Code (Zero-Exposure)
1. Prepare application zip on your local machine:
   ```bash
   cd portfolio-api
   composer install --no-dev --optimize-autoloader
   zip -r ../portfolio-api-deploy.zip . -x "node_modules/*" ".git/*" "tests/*"
   ```
2. In cPanel **File Manager**, navigate to `/home/username/` (one level ABOVE `public_html`).
3. Upload `portfolio-api-deploy.zip` and click **Extract**.
4. Confirm files are inside `/home/username/portfolio-api/`.

### 4. MySQL Database Setup
1. In cPanel, navigate to **MySQL Databases**.
2. Create Database: `username_portfolio`
3. Create Database User: `username_portuser` with a strong password.
4. Add User to Database with **ALL PRIVILEGES**.

### 5. Production `.env` File
In `/home/username/portfolio-api/`, create or edit `.env`:
```ini
APP_NAME="Muhammad Auwal Abubakar Portfolio API"
APP_ENV=production
APP_KEY=base64:GENERATE_KEY_HERE
APP_DEBUG=false
APP_URL=https://api.muhammad.sardaunatechlabs.com.ng
FRONTEND_URL=https://muhammad.sardaunatechlabs.com.ng

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=username_portfolio
DB_USERNAME=username_portuser
DB_PASSWORD="YourStrongDatabasePassword"

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_DOMAIN=.sardaunatechlabs.com.ng
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax

SANCTUM_STATEFUL_DOMAINS=muhammad.sardaunatechlabs.com.ng,sardauna-portfolio.vercel.app
CORS_ALLOWED_ORIGINS=https://muhammad.sardaunatechlabs.com.ng,https://sardauna-portfolio.vercel.app

ADMIN_EMAIL="admin@sardaunatech.com"
ADMIN_PASSWORD="StrongProductionPasswordHere"

FILESYSTEM_DISK=public

MAIL_MAILER=smtp
MAIL_HOST=mail.sardaunatechlabs.com.ng
MAIL_PORT=465
MAIL_USERNAME=contact@sardaunatechlabs.com.ng
MAIL_PASSWORD="YourMailPassword"
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="contact@sardaunatechlabs.com.ng"
MAIL_FROM_NAME="Muhammad Auwal Abubakar"
RECEIVER_EMAIL="contact.sardaunatech@gmail.com"
```

### 6. Migrations, Seeding & Storage Link
If you have **cPanel Terminal** access:
```bash
cd ~/portfolio-api
php artisan key:generate --force
php artisan migrate --seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
```

If terminal is disabled on your shared hosting plan:
Use the included installer runner at `portfolio-api/public/setup-installer.php` (secured with a secret token, remove immediately after execution).

### 7. File Permissions
```bash
find ~/portfolio-api -type f -exec chmod 644 {} \;
find ~/portfolio-api -type d -exec chmod 755 {} \;
chmod -R 775 ~/portfolio-api/storage
chmod -R 775 ~/portfolio-api/bootstrap/cache
```

### 8. SSL Certificate
In cPanel, open **SSL/TLS Status** and click **Run AutoSSL** for `api.muhammad.sardaunatechlabs.com.ng`.

---

## Part 3: Vercel (Frontend) Deployment

### 1. Connect Git Repository
1. Log into [Vercel Dashboard](https://vercel.com).
2. Click **Add New Project** and import `Sardaunatechworks/sardauna-portfolio`.
3. Select branch: `editorial-rebuild` (or `main` after pull request).

### 2. Build & Development Settings
* **Framework Preset:** Vite
* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* **Install Command:** `npm install`

### 3. Environment Variables in Vercel
Add the following variable under **Project Settings -> Environment Variables**:
* `VITE_API_BASE_URL` = `https://api.muhammad.sardaunatechlabs.com.ng/api/v1`

### 4. Custom Domain Assignment
1. Under **Project Settings -> Domains**, click **Add**.
2. Enter: `muhammad.sardaunatechlabs.com.ng`
3. Vercel will automatically verify the CNAME record (`cname.vercel-dns.com`) and issue a free Let's Encrypt SSL certificate.

---

## Part 4: Verification Checklist

1. [ ] **Public Landing:** `https://muhammad.sardaunatechlabs.com.ng` loads with modern editorial layout and hero portrait.
2. [ ] **API Health:** `https://api.muhammad.sardaunatechlabs.com.ng/up` returns HTTP 200.
3. [ ] **API Profile:** `https://api.muhammad.sardaunatechlabs.com.ng/api/v1/profile` returns valid JSON with profile data.
4. [ ] **Cross-Domain Session & CORS:** Browser dev tools show successful `OPTIONS` preflight with `Access-Control-Allow-Origin: https://muhammad.sardaunatechlabs.com.ng`.
5. [ ] **Contact Form:** Submitting form at `/contact` stores message in MySQL and dispatches SMTP email notification.
6. [ ] **Admin CMS:** Logging in at `/admin` authenticates via Laravel Sanctum and grants access to manage projects, experiences, and uploads.
