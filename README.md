# Samartha H M — Dynamic Portfolio + Admin

A responsive, JSON-driven developer portfolio served by Node.js + Express. Includes project case studies, GSAP/ScrollTrigger/Lenis motion, Firebase Analytics event tracking, a contact form stored in SQLite, and a protected admin dashboard for inbox and portfolio content management.

## Requirements
- Node.js 18+
- npm
- Firebase project with Google Analytics enabled (for analytics only; site still runs without it)

## Local setup
1. Copy `.env.example` to `.env`.
2. Fill `ADMIN_USERNAME`, `ADMIN_PASSWORD` (12+ characters), and `SESSION_SECRET` (random secret). Fill the `FIREBASE_*` values from Firebase Console to enable analytics.
3. Install and start:
   ```bash
   npm install
   npm start
   ```
4. Open `http://localhost:3000` and admin at `http://localhost:3000/admin`.

The first start creates the admin user only if the username does not exist and a password of at least 12 characters is configured. SQLite data is stored in `data/portfolio.sqlite`; it is not committed to source control. Contact submissions are persisted there.

## Firebase Analytics
Set these server environment variables (Firebase web app config; these values are intended to be public client configuration):
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`

Enable Google Analytics in Firebase and register the web app. The portfolio loads config from `/api/config` and logs:
- `portfolio_page_view`
- `section_click` (navigation and in-page section links)
- `project_click` (case-study opens)
- `contact_form_submit` with success/error status (never sends message text or email to analytics)

Analytics is optional and silently disabled when Firebase config is missing. Test events in Firebase Analytics DebugView after configuration.

## Admin dashboard
- `GET /admin` — sign-in and admin workspace
- Inbox: view submissions, filter by status, mark new/read/archived
- Content settings: edit the full portfolio JSON, add/delete projects, add/delete project case-study sections, then save
- `GET /api/admin/settings` and `PUT /api/admin/settings` require a signed-in admin session

Use the settings editor to update any detail fields and the quick actions for project/section creation and deletion. Supported case-study section types are `text`, `points`, `cards`, `images`, and `links`. Saving validates the overall data shape and unique project slugs before atomically replacing the JSON file.

## API
- `GET /api/portfolio` — public portfolio JSON
- `GET /api/config` — public Firebase web config
- `POST /api/contact` — validates and stores a contact submission
- `POST /api/admin/login` — admin login
- `GET /api/admin/me` — current admin session
- `POST /api/admin/logout` — sign out
- `GET /api/admin/submissions?status=new|read|archived` — inbox
- `PATCH /api/admin/submissions/:id` — update inbox status
- `GET /health` — health check

## Production security checklist
- Set `NODE_ENV=production`, strong `SESSION_SECRET`, `ADMIN_PASSWORD`, and `IP_HASH_SALT`.
- Use HTTPS and set `TRUST_PROXY=true` only behind a trusted reverse proxy.
- The built-in Express session store is memory-only; configure a persistent session store before deploying to multiple instances or relying on sessions across restarts.
- Back up both `public/data/portfolio.json` and `data/portfolio.sqlite`; store DB backups securely because messages contain personal information.
- Add a managed rate limiter, spam protection, and a privacy notice/retention policy before public launch.
- Do not place private Firebase service-account credentials in `.env` for this frontend analytics setup.

## Structure
```text
samartha-portfolio/
├── server.js
├── package.json
├── .env.example
├── AGENT_GUIDE.md
├── DEVELOPMENT_PLAN.md
├── TASKS.md
├── data/                      # SQLite DB created at runtime (gitignored)
└── public/
    ├── index.html
    ├── admin.html
    ├── css/style.css
    ├── css/admin.css
    ├── js/app.js
    ├── js/admin.js
    └── data/portfolio.json
```

Read `AGENT_GUIDE.md`, `DEVELOPMENT_PLAN.md`, and `TASKS.md` before continuing work. GSAP, ScrollTrigger, Lenis, Firebase compat SDK, and fonts load from CDNs; offline use requires vendoring those assets.
