# Laravel 13 REST API Documentation
## Muhammad Auwal Abubakar Personal Portfolio v1

- **Base URL:** `https://api.muhammad.sardaunatechlabs.com.ng/api/v1`
- **Default Format:** `application/json`
- **Authentication Scheme:** `Bearer <token>` (Sanctum) OR Stateful Session Cookie

---

## 1. Authentication Headers

| Header | Description | Required |
| :--- | :--- | :--- |
| `Accept` | Must be `application/json` | Yes |
| `Content-Type` | Must be `application/json` (except `multipart/form-data` uploads) | Yes |
| `Authorization` | `Bearer <token>` | For Protected `/api/v1/admin/*` endpoints |

---

## 2. Public Endpoints (Unauthenticated)

### 2.1 Get Personal Profile
* **Endpoint:** `GET /profile`
* **Response `200 OK`:**
```json
{
  "data": {
    "id": 1,
    "name": "Muhammad Auwal Abubakar",
    "title": "Software Engineer & Solutions Architect",
    "headline": "Building robust, modern software systems...",
    "about": "Full-stack engineer and solutions architect...",
    "short_bio": "...",
    "medium_bio": "...",
    "extended_bio": "...",
    "location": "Nigeria",
    "email": "contact.sardaunatech@gmail.com",
    "phone1": "+234 814 972 5800",
    "phone2": "+234 816 718 1904",
    "github": "https://github.com/Sardaunatechworks",
    "portfolio": "https://muhammad.sardaunatechlabs.com.ng",
    "profile_pic": "https://api.muhammad.sardaunatechlabs.com.ng/storage/profiles/avatar.jpg",
    "roles": ["Software Engineer", "Solutions Architect", "Community Leader"],
    "availability": "Available for selective advisory & contract roles"
  }
}
```

### 2.2 Get Work Experience Timeline
* **Endpoint:** `GET /experiences`
* **Response `200 OK`:**
```json
{
  "data": [
    {
      "id": 1,
      "role": "Lead Software Engineer & Architect",
      "company": "Sardauna Tech Works",
      "type": "Full-time",
      "location": "Remote",
      "date": "2022 – Present",
      "desc": [
        "Architected enterprise platforms...",
        "Delivered multi-tenant ERP suites..."
      ],
      "is_current": true,
      "sort_order": 0
    }
  ]
}
```

### 2.3 Get Projects List
* **Endpoint:** `GET /projects`
* **Query Parameters:**
  * `featured` (optional, boolean): Filter featured projects only (`1` or `0`).
  * `category` (optional, string): Filter by category.
  * `search` (optional, string): Filter by title or overview keywords.
* **Response `200 OK`:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Trader ERP Enterprise Platform",
      "slug": "trader-erp-enterprise-platform",
      "tagline": "Multi-tenant cloud ERP platform",
      "overview": "Comprehensive ERP suite with real-time inventory...",
      "problem": "Manual order reconciliation was taking 8+ hours...",
      "solution": "Built automated ledger syncing...",
      "category": "Enterprise Software",
      "role": "Lead Architect",
      "status": "Live",
      "tech": ["React", "TypeScript", "Node.js", "PostgreSQL"],
      "github": "https://github.com/Sardaunatechworks/tradererpwebapp",
      "demo": "https://tradererpwebapp.vercel.app",
      "img": "https://api.muhammad.sardaunatechlabs.com.ng/storage/projects/erp-cover.jpg",
      "is_featured": true
    }
  ]
}
```

### 2.4 Get Single Project Detail
* **Endpoint:** `GET /projects/{slug}`
* **Response `200 OK`:** Single project object matching schema above.
* **Response `404 Not Found`:** `{"success": false, "message": "Project not found"}`

### 2.5 Get Technical Skills
* **Endpoint:** `GET /skills`
* **Response `200 OK`:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "PHP / Laravel",
      "category": "Backend Engineering",
      "sort_order": 0
    }
  ]
}
```

### 2.6 Get Certifications
* **Endpoint:** `GET /certifications`
* **Response `200 OK`:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Full-Stack Software Engineering",
      "issuer": "ALX Africa",
      "date": "2023",
      "credential_url": "https://savannah.alxafrica.com/...",
      "badge_image": "https://..."
    }
  ]
}
```

### 2.7 Get Community Activities & Speaking
* **Endpoint:** `GET /community`
* **Response `200 OK`:**
```json
{
  "data": {
    "activities": [...],
    "speaking": [...]
  }
}
```

### 2.8 Submit Contact Inquiry
* **Endpoint:** `POST /contact`
* **Rate Limit:** 10 requests per minute per IP.
* **Payload:**
```json
{
  "name": "Dr. Amina Bello",
  "email": "amina.bello@institution.edu",
  "subject": "Conference Keynote Invitation",
  "message": "We would like to invite you to speak on enterprise cloud architecture...",
  "honeypot": ""
}
```
* **Response `200 OK`:**
```json
{
  "success": true,
  "message": "Thank you. Your message has been received successfully. I will get back to you shortly.",
  "data": {
    "id": 4
  }
}
```

---

## 3. Administrator Endpoints (Protected)

### 3.1 Administrator Login
* **Endpoint:** `POST /admin/login`
* **Rate Limit:** 5 requests per minute.
* **Payload:**
```json
{
  "email": "admin@sardaunatech.com",
  "password": "YourPasswordHere"
}
```
* **Response `200 OK`:**
```json
{
  "success": true,
  "message": "Authentication successful.",
  "data": {
    "user": {
      "id": 1,
      "name": "Muhammad Auwal Abubakar",
      "email": "admin@sardaunatech.com"
    },
    "token": "1|sanctum_plain_text_token_string_here..."
  }
}
```

### 3.2 Get Current Admin Session
* **Endpoint:** `GET /admin/me`
* **Headers:** `Authorization: Bearer <token>`
* **Response `200 OK`:**
```json
{
  "id": 1,
  "name": "Muhammad Auwal Abubakar",
  "email": "admin@sardaunatech.com"
}
```

### 3.3 Admin Logout
* **Endpoint:** `POST /admin/logout`
* **Response `200 OK`:** `{"success": true, "message": "Logged out successfully."}`

### 3.4 Dashboard Metrics
* **Endpoint:** `GET /admin/dashboard`
* **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "total_projects": 8,
    "total_experiences": 5,
    "total_skills": 24,
    "total_certifications": 6,
    "unread_messages": 3
  }
}
```

### 3.5 Update Profile
* **Endpoint:** `PUT /admin/profile`
* **Payload:** Same fields as ProfileResource.

### 3.6 CRUD Resources (Projects, Experiences, Skills, Certifications)
Standard REST operations:
* `GET /admin/projects` — List all projects
* `POST /admin/projects` — Create project
* `GET /admin/projects/{id}` — Project detail
* `PUT /admin/projects/{id}` — Update project
* `DELETE /admin/projects/{id}` — Delete project

### 3.7 Media Upload
* **Endpoint:** `POST /admin/media/upload`
* **Payload:** `multipart/form-data` with `file` (image/pdf, max 10MB) and `category` (`profiles` | `projects` | `documents`).
* **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": 7,
    "url": "https://api.muhammad.sardaunatechlabs.com.ng/storage/projects/abc123xyz.jpg",
    "filename": "abc123xyz.jpg",
    "mime_type": "image/jpeg",
    "size_bytes": 284920
  }
}
```
