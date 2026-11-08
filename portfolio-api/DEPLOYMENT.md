# Laravel 13 Shared Hosting & cPanel Deployment Guide

This guide details step-by-step production deployment for the **Muhammad Auwal Abubakar Personal Portfolio 2.0 Backend (`portfolio-api`)** on cPanel-compatible shared hosting or Apache/Nginx environments.

---

## 1. Architecture & Directory Layout

To ensure **zero application file exposure**, Laravel source code must never reside inside `public_html`. Only the contents of the `public/` folder are accessible to the public web.

### Recommended cPanel Directory Structure

```
/home/username/
├── portfolio-api/              # Full Laravel application (OUTSIDE public_html)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── storage/
│   ├── .env                    # Secure production environment variables
│   ├── artisan
│   └── composer.json
│
└── public_html/ (or api.sardaunatech.com / subdomain)
    ├── .htaccess               # Apache rewrite + Authorization forwarding
    ├── index.php               # Points to /home/username/portfolio-api/public/index.php
    └── storage/                # Symlink to /home/username/portfolio-api/storage/app/public
```

---

## 2. Server Requirements Check

Verify with your shared hosting provider or cPanel PHP Selector that the following are enabled:
- **PHP Version:** PHP 8.3+ (PHP 8.3 or PHP 8.4/8.5 supported)
- **Extensions:**
  - `pdo_mysql`
  - `openssl`
  - `mbstring`
  - `tokenizer`
  - `xml`
  - `ctype`
  - `json`
  - `fileinfo`
  - `bcmath`
  - `curl`

---

## 3. Preparation: Vendor Dependencies

### Option A: Deployment via SSH (Recommended)
If your cPanel hosting provides Terminal or SSH access:
1. Upload the `portfolio-api` folder to `/home/username/portfolio-api`.
2. In Terminal, run:
   ```bash
   cd ~/portfolio-api
   composer install --no-dev --optimize-autoloader
   ```

### Option B: Deployment without SSH (Pre-packaged Archive)
If your shared hosting does **not** provide SSH:
1. Run `composer install --no-dev --optimize-autoloader` locally on your development machine.
2. Compress the entire `portfolio-api` folder (including `vendor/`) into a `.zip` archive.
3. In cPanel File Manager, upload the zip archive to `/home/username/` and extract it.

---

## 4. Setting Up Document Root & Public Access

### Scenario 1: Subdomain Deployment (e.g. `api.sardaunatech.com`)
1. In cPanel, navigate to **Domains** -> **Create A New Domain**.
2. Enter Domain: `api.sardaunatech.com`.
3. Set **Document Root** directly to:
   `/home/username/portfolio-api/public`
4. This is the cleanest setup: cPanel serves directly from the `public/` directory without manual symlinks.

### Scenario 2: Main Domain Subdirectory or Standard `public_html`
If the backend is placed alongside static files:
1. Move the contents of `portfolio-api/public/` into your public folder (e.g. `public_html/api/`).
2. Update the paths in `public_html/api/index.php`:
   ```php
   // Change from:
   require __DIR__.'/../vendor/autoload.php';
   $app = require_once __DIR__.'/../bootstrap/app.php';

   // To:
   require __DIR__.'/../../portfolio-api/vendor/autoload.php';
   $app = require_once __DIR__.'/../../portfolio-api/bootstrap/app.php';
   ```

---

## 5. Apache `.htaccess` & Authorization Header Forwarding

Shared hosting running Apache via FastCGI/PHP-FPM often strips the HTTP `Authorization` header by default, which breaks Laravel Sanctum Bearer tokens.

Ensure `/portfolio-api/public/.htaccess` includes the following directives (already preconfigured in `public/.htaccess`):

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Forward HTTP Authorization Header for Sanctum
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

---

## 6. Environment Configuration (`.env`)

In cPanel File Manager, copy `.env.example` to `.env` inside `/home/username/portfolio-api/`.

Configure the production values:

```ini
APP_NAME="Muhammad Auwal Abubakar Portfolio"
APP_ENV=production
APP_KEY=base64:GENERATE_KEY_HERE
APP_DEBUG=false
APP_URL=https://api.sardaunatech.com
FRONTEND_URL=https://sardaunatech.com

LOG_CHANNEL=daily
LOG_LEVEL=info

# MySQL Database Details (Created in cPanel MySQL Databases)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cpaneluser_portfolio
DB_USERNAME=cpaneluser_dbuser
DB_PASSWORD="StrongDatabasePassword123!"

# Sessions & Cache
BROADCAST_CONNECTION=log
FILESYSTEM_DISK=public
CACHE_STORE=file
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

# Laravel Sanctum Stateful Domains (for cookie auth)
SANCTUM_STATEFUL_DOMAINS=sardaunatech.com,www.sardaunatech.com,localhost:5173

# Admin Initial Credentials (Used during initial seeding)
ADMIN_NAME="Muhammad Auwal Abubakar"
ADMIN_EMAIL="admin@sardaunatech.com"
ADMIN_PASSWORD="StrongProductionAdminPassword456!"

# SMTP Email Configuration (cPanel Webmail or Brevo / Resend / Mailgun)
MAIL_MAILER=smtp
MAIL_HOST=mail.sardaunatech.com
MAIL_PORT=465
MAIL_USERNAME=contact@sardaunatech.com
MAIL_PASSWORD="YourEmailPasswordHere"
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="contact@sardaunatech.com"
MAIL_FROM_NAME="Muhammad Auwal Abubakar"
RECEIVER_EMAIL="contact.sardaunatech@gmail.com"
```

---

## 7. Database Migration & Initial Seeding

Run via SSH Terminal or cPanel Cron Job (one-off):

```bash
cd ~/portfolio-api

# 1. Generate Application Key (if not already set)
php artisan key:generate --force

# 2. Run Database Migrations & Seed Default Content
php artisan migrate --seed --force

# 3. Create Storage Symlink for Public Media Uploads
php artisan storage:link

# 4. Cache Config & Routes for High Performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### If you don't have SSH access:
Create a temporary single-run script `portfolio-api/public/setup-installer.php` (remove immediately after execution):
```php
<?php
// Secure with secret token
if (($_GET['token'] ?? '') !== 'my_secret_setup_token_987') {
    http_response_code(403);
    exit('Unauthorized');
}

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

echo "<pre>";
echo "Generating key...\n";
$kernel->call('key:generate', ['--force' => true]);
echo "Migrating and seeding...\n";
$kernel->call('migrate', ['--seed' => true, '--force' => true]);
echo "Linking storage...\n";
$kernel->call('storage:link');
echo "Done! Please delete this file immediately.\n";
echo "</pre>";
```

---

## 8. File Permissions

Set appropriate UNIX permissions:
```bash
find ~/portfolio-api -type f -exec chmod 644 {} \;
find ~/portfolio-api -type d -exec chmod 755 {} \;
chmod -R 775 ~/portfolio-api/storage
chmod -R 775 ~/portfolio-api/bootstrap/cache
```

---

## 9. Connecting Frontend React App to Laravel Backend

In your React frontend root directory, configure `.env.production` (or Vercel / Netlify environment variables):

```ini
VITE_API_BASE_URL=https://api.sardaunatech.com/api/v1
```

Once deployed, the frontend React application will automatically route all data requests (profile, experiences, projects, skills, contact form messages, and admin authentication) to the high-performance Laravel 13 backend.

---

## 10. Verification Checklist

- [ ] `GET https://api.sardaunatech.com/api/v1/profile` returns JSON profile data.
- [ ] `GET https://api.sardaunatech.com/api/v1/projects` returns JSON project list.
- [ ] `POST https://api.sardaunatech.com/api/v1/contact` dispatches email and stores message in MySQL.
- [ ] `POST https://api.sardaunatech.com/api/v1/admin/login` returns token and user payload.
- [ ] `storage/app/public` uploads are publicly accessible via `https://api.sardaunatech.com/storage/...`.
