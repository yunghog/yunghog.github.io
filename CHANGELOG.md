## v6.1.1 — Chat UI fixes
- Fixed the custom cursor being hidden by an accidental `display: none !important` rule.
- Changed the public chat window and admin chat wrappers from `section` to `div` to avoid global section padding affecting chat layout.
- Improved composer sizing and send-button visibility on desktop and mobile.
- Switched DiceBear avatar requests to the initials avatar style and added a local SVG initials fallback when remote images fail.

# Changelog

## v5.0.0 — Private Firebase data + visual CMS

- Replaced SQLite contact storage and local JSON-file runtime storage with Firebase Realtime Database through the Firebase Admin SDK.
- Split portfolio data into `portfolio/websiteConfig`, `portfolio/sections`, and `portfolio/projects`.
- Added first-run migration/seed from private `data/portfolio-seed.json` when RTDB portfolio content is empty.
- Added RTDB-backed contact submissions and inbox status changes.
- Replaced the full JSON editor with form-based CMS categories and add/delete actions for repeatable content.
- Added generic rendering for custom homepage section keys.
- Added deny-all client database rules template and updated documentation/environment configuration.
- Removed `better-sqlite3`; no SQL database is used.
- Verification: `node --check` passed for server and frontend scripts, and the private seed JSON parses. `npm install` timed out; live Firebase/database/browser checks remain pending.


## v6.0.0 — Live chat
- Added a floating public live-chat widget with welcome message, name and optional visitor context, expandable full-screen mode and persistent history.
- Added dedicated Express endpoints and Firebase Realtime Database paths under `liveChat/`; existing portfolio and contact storage remain unchanged.
- Added human-readable chat references, separate message history, visitor-token access control and open/closed conversation status.
- Added Quill rich-text messaging with server-side HTML sanitization, DiceBear avatars, and Web Audio send/receive cues.
- Added a WhatsApp-style admin chat inbox with contact list, thread view, unread indicators, rich-text replies and push-notification opt-in.
- Added Firebase Cloud Messaging web push support using environment configuration and a dynamic service worker route.
- Added RTDB query indexes and documentation for setup and deployment.
- Automated syntax checks pass; live Firebase, push and browser QA remain pending until real Firebase configuration and HTTPS deployment are available.


## v6.1.0 — Socket.IO real-time messaging
- Added Socket.IO to the existing Express HTTP server, sharing the admin Express session middleware.
- Added visitor-token authorization for socket joins and message sends; admin sockets require a signed-in admin session.
- Moved public and admin message sending to Socket.IO with server-side sanitization, Firebase RTDB persistence, live message broadcasts, and live inbox updates.
- Removed 2.6s/3s chat polling. REST endpoints remain for initial history, inbox loading, status changes, and push-token setup.
- Validation: JavaScript syntax checks and package JSON validation passed. Dependency installation and live Firebase/browser testing remain pending.
