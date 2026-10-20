# Samartha Portfolio

Responsive developer portfolio built with Node.js, Express, vanilla JavaScript, CSS, GSAP/ScrollTrigger/Lenis, Firebase Analytics, Firebase Realtime Database, and Socket.IO for real-time chat delivery. The admin dashboard includes a contact inbox and a visual CMS.

## Architecture

- **Firebase Realtime Database** is the only application data store. There is no SQL database dependency.
- `portfolio/websiteConfig` stores website identity, navigation, hero content, skills, and experience.
- `portfolio/sections` stores homepage section configuration separately.
- `portfolio/projects` stores projects and their project-detail sections.
- `contactSubmissions` stores contact form submissions and status metadata.
- Express uses the Firebase Admin SDK with server-side credentials. The service-account key is never sent to the browser.
- Public portfolio content is assembled by `GET /api/portfolio`. Public content will always be visible to visitors through the rendered page or API; private database access and write access remain denied to client SDKs.
- `data/portfolio-seed.json` is a private first-run seed/migration source. If the `portfolio` node is empty, the server migrates it into the three separate RTDB branches. The file is not served statically.

## Setup

1. Install Node.js 18 or newer.
2. Create a Firebase project and enable Realtime Database.
3. Create a service account with access to the project and download its JSON key. Store it outside `public/` (the `secrets/` folder is gitignored).
4. Copy `.env.example` to `.env` and set:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD` (12+ characters) or `ADMIN_PASSWORD_HASH` (bcrypt hash)
   - `SESSION_SECRET` (long random value)
   - `GOOGLE_APPLICATION_CREDENTIALS` or `FIREBASE_SERVICE_ACCOUNT_JSON`
   - `FIREBASE_DATABASE_URL`
   - Firebase web app settings for Analytics
5. Apply `database.rules.json` to Realtime Database. These rules deny all direct client reads/writes. The trusted Admin SDK on Express bypasses these client rules; secure the service-account key carefully.
6. Run:

```bash
npm install
npm start
```

Open `http://localhost:3000` for the public portfolio and `http://localhost:3000/admin` for the admin CMS.

## Visual CMS

The Content settings screen provides visual forms for website details, hero content, navigation links, homepage sections, skills, experience entries, projects, and project case-study sections. Add/delete controls are available for repeatable records and sections. Changes are sent to authenticated Express routes and saved to Realtime Database. Some nested repeaters such as social links and project cards use a structured JSON field; this field is inside the CMS form and is not the full-site editor.

Homepage sections with keys other than `work`, `about`, `experience`, and `contact` render dynamically in the custom-section area. A custom section supports `kicker`, `titleLines` or `title`, `description`/`body`, `copy`, and `items` (strings or objects with title/body/description/text/image/url/linkLabel).

## Routes

- `GET /api/config` — Firebase web configuration used by Analytics (not server credentials)
- `GET /api/portfolio` — public website content, assembled from private RTDB branches
- `POST /api/contact` — validates and stores a submission in RTDB
- `POST /api/admin/login` — admin login
- `GET /api/admin/me` — current admin session
- `POST /api/admin/logout` — end admin session
- `GET /api/admin/submissions` — authenticated contact inbox
- `PATCH /api/admin/submissions/:id` — update submission status
- `GET /api/admin/settings` — authenticated assembled CMS data
- `PUT /api/admin/settings` — validates and writes separate RTDB branches
- `POST /api/chat/conversations` — start/reuse a visitor conversation
- `GET /api/chat/:id/messages` — load persistent chat history; live messages are sent through Socket.IO events `chat:send` / `chat:message`
- `POST /api/chat/:id/push-token` — save an opted-in visitor FCM token
- `GET /api/admin/chats` and `PATCH /api/admin/chats/:id` — authenticated admin chat inbox/status
- `POST /api/admin/chat/push-token` — save an opted-in admin FCM token
- `GET /firebase-messaging-sw.js` — dynamically served Firebase Cloud Messaging service worker
- `GET /health` — health check

## Data model

```text
portfolio/
  websiteConfig/
    site/
    navigation/
    hero/
    skills/
    experience/
  sections/
  projects/
contactSubmissions/
  <push-id>/
    name, email, subject, message, status, createdAt, ipHash
```

## Migration notes

On first startup, when `portfolio/` is empty, the server reads `data/portfolio-seed.json` and writes its website configuration, homepage sections, and projects into their dedicated RTDB branches. This seed file is private and must not be exposed via static hosting. The server no longer reads/writes `public/data/portfolio.json` or uses SQLite. Existing SQLite contact submissions from an older deployment are not imported automatically; export any messages you need to preserve before retiring the old deployment.

## Production checklist

- Use a persistent session store (the default Express MemoryStore is for local development only).
- Configure HTTPS, proxy trust accurately, rate limiting, contact spam protection, and a privacy/retention policy.
- Keep service-account credentials and `.env` out of source control and outside public directories.
- Consider a dedicated least-privilege service account and rotate keys if exposed.
- Validate Firebase RTDB rules are `.read: false` and `.write: false` for client access.
- Test login, contact submission, CMS save/reload, all CRUD flows, mobile layout, and analytics in a browser before launch.


## Live chat (v6)

Socket.IO is the real-time transport. The server authenticates the admin socket using the existing Express session and authorizes visitor sockets with the hashed visitor token. Messages are sanitized server-side and persisted in RTDB before they are broadcast. REST remains available for initial history and compatibility, but the current public/admin chat clients send messages over Socket.IO rather than polling.

The live chat is an isolated module: public UI assets are `public/js/chat.js` and `public/css/chat.css`; the admin inbox assets are `public/js/admin-chat.js` and `public/css/admin-chat.css`. Rich-text editing uses the open-source Quill editor (CDN), and server-side HTML is sanitized with `sanitize-html`. Avatars use DiceBear's free avatar API. Message send/receive sounds use the Web Audio API and do not require audio files.

### Firebase Realtime Database structure

- `liveChat/conversations/{conversationId}` — contact name, optional description, human-readable `reference` (for example `CHAT-261020-A1B2`), avatar, status, last message, unread counts and visitor push token. Visitor access tokens are stored only as SHA-256 hashes.
- `liveChat/messages/{conversationId}/{messageId}` — persistent, timestamped messages with sender, sanitized rich-text HTML, plain text and chat reference.
- `liveChat/adminPushTokens/{tokenHash}` — push tokens registered by an authenticated admin browser.
- Existing `portfolio/*` and `contactSubmissions/*` paths are unchanged. No SQL is used.

### Configure push notifications

1. In Firebase Console, enable **Cloud Messaging** for the same Firebase project.
2. In Project settings → Cloud Messaging → Web Push certificates, generate or copy the VAPID key.
3. Set `FIREBASE_MESSAGING_SENDER_ID` and `FIREBASE_VAPID_KEY` in `.env`. Ensure `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, and `FIREBASE_APP_ID` are also set. The public web config is expected to be public; never expose the Admin SDK service account.
4. Deploy the site on HTTPS (localhost is also accepted by browsers for development). Visitors can opt in with **Enable notifications** inside their chat; admins can opt in from Admin → Live chats. Browser permission is requested only after the user clicks.
5. Ensure Firebase Cloud Messaging is enabled and the project's browser/service-worker configuration is valid. Push delivery may be blocked by browser settings or OS focus modes.

The service worker is served dynamically from `/firebase-messaging-sw.js` so it uses the current public Firebase config without committing secrets. Firebase Admin SDK sends push messages server-side. If push configuration is missing, normal chat still works; push opt-in shows a setup message.

### Admin use

Sign in at `/admin`, open **Live chats**, select a visitor in the left contact list, and reply using the rich-text editor. Chat references remain visible in the contact list and conversation header. Chats can be closed and reopened. Socket.IO delivers messages and inbox updates in real time; REST endpoints are used for initial history, inbox loading, status changes, and push-token registration.

### Deployment notes

- Deploy the updated `database.rules.json` to preserve deny-by-default client access while adding server-side query indexes. Admin SDK access bypasses client rules.
- Quill and DiceBear are loaded from external CDNs/APIs; provide a local/self-hosted alternative if your deployment requires no third-party runtime requests.
- Push notifications require a VAPID key and HTTPS. Notifications are opt-in.
- Add production-grade rate limiting, retention policy, and a persistent Express session store before high-traffic production use. The existing session middleware still uses its default in-memory store.
