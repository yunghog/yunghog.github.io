# Changelog

## 2026-10-20 — v4 admin, analytics, and contact capture
- Added optional Firebase Analytics initialization using environment-provided Firebase web configuration.
- Added event tracking for portfolio page views, section clicks, project opens, and contact form submit status. Contact details are never sent as analytics parameters.
- Added responsive contact form with server-side validation and SQLite persistence.
- Added `/admin` login screen, protected contact inbox, submission status updates, and JSON settings editor.
- Added admin quick actions to add/delete projects and add/delete project case-study sections.
- Added `.env.example`, production security notes, and updated agent/development/task documentation.
- Verification: JavaScript syntax and portfolio JSON parse checks passed. `npm install` timed out in the execution environment; live API/browser tests remain pending.
