# Samartha H M — Dynamic Portfolio

A responsive editorial-style portfolio served by Node.js + Express. Portfolio content is loaded from one JSON file; project cards open into dynamic, scrollable case-study views.

## Requirements
- Node.js 18+
- npm

## Run locally
```bash
npm install
npm start
```
Then open http://localhost:3000.

## Project structure
```text
samartha-portfolio/
├── server.js
├── package.json
└── public/
    ├── index.html
    ├── css/style.css
    ├── js/app.js
    └── data/portfolio.json
```

## Update the portfolio
Edit `public/data/portfolio.json` to change the name, navigation, hero, skills, experience, contact links, project cards, and case-study details. Each project has a unique `slug`, plus `problem`, `approach`, `features`, `decisions`, `outcome`, `stack`, and `links` fields. The project detail view is generated from those fields automatically.

Replace `YOUR_EMAIL@example.com`, profile URLs, and `#` project links before publishing. The project examples are concepts/in-progress descriptions; only present outcomes as completed work when you can verify them.

## Motion libraries
- GSAP + ScrollTrigger for scroll-driven transitions and reveal animations
- Lenis for smooth scrolling

They are loaded from jsDelivr CDN. If you need an offline deployment, download and self-host those libraries and update the script URLs in `public/index.html`. Reduced-motion preferences are respected.

## Endpoints
- `GET /` — portfolio frontend
- `GET /api/portfolio` — portfolio JSON
- `GET /health` — simple health check


## Continue development with a coding agent
Read these files first:
- `AGENT_GUIDE.md` — architecture, conventions, and content schema.
- `DEVELOPMENT_PLAN.md` — stage roadmap and acceptance criteria.
- `TASKS.md` — persistent task checklist and current status.

Project details are configured in `public/data/portfolio.json`. Each project's optional `sections` array supports `text`, `points`, `cards`, `images`, and `links`. Use `productionUrl` for a real live product URL; leave it blank until verified.
