'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, 'public');
const dataFile = path.join(publicDir, 'data', 'portfolio.json');
const dbDir = path.join(__dirname, 'data');
fs.mkdirSync(dbDir, { recursive: true });
app.disable('x-powered-by');
app.set('trust proxy', process.env.TRUST_PROXY === 'true' ? 1 : false);
app.use(express.json({ limit: '256kb' }));
app.use(express.urlencoded({ extended: false, limit: '16kb' }));

const db = new Database(path.join(dbDir, 'portfolio.sqlite'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`CREATE TABLE IF NOT EXISTS contact_submissions (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 subject TEXT NOT NULL DEFAULT '',
 message TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','read','archived')),
 created_at TEXT NOT NULL DEFAULT (datetime('now')),
 ip_hash TEXT
);
CREATE TABLE IF NOT EXISTS admin_users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 username TEXT NOT NULL UNIQUE,
 password_hash TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);`);

// Create the initial admin once. Set ADMIN_USERNAME and ADMIN_PASSWORD before first start.
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD;
if (!db.prepare('SELECT id FROM admin_users WHERE username = ?').get(adminUsername)) {
  if (adminPassword && adminPassword.length >= 12) {
    db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run(adminUsername, bcrypt.hashSync(adminPassword, 12));
    console.log(`Initial admin account created for username: ${adminUsername}`);
  } else {
    console.warn('Admin not initialized. Set ADMIN_USERNAME and ADMIN_PASSWORD (12+ characters) then restart.');
  }
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET is required in production.');
app.use(session({
  name: 'samartha_admin',
  secret: sessionSecret || crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', maxAge: 8 * 60 * 60 * 1000 }
}));

const loginAttempts = new Map();
function loginLimiter(req, res, next) {
  const key = req.ip;
  const item = loginAttempts.get(key) || { count: 0, reset: Date.now() + 15 * 60 * 1000 };
  if (Date.now() > item.reset) { item.count = 0; item.reset = Date.now() + 15 * 60 * 1000; }
  if (item.count >= 10) return res.status(429).json({ error: 'Too many login attempts. Try again in 15 minutes.' });
  req.loginAttempt = item;
  next();
}
function requireAdmin(req, res, next) {
  if (req.session && req.session.adminId) return next();
  return res.status(401).json({ error: 'Please sign in to continue.' });
}
function readPortfolio() { return JSON.parse(fs.readFileSync(dataFile, 'utf8')); }
function validatePortfolio(value) {
  if (!value || typeof value !== 'object' || !value.site || !Array.isArray(value.projects) || !value.sections || typeof value.sections !== 'object') return 'Expected site, sections, and projects in portfolio JSON.';
  if (value.projects.some(p => !p || typeof p.slug !== 'string' || typeof p.title !== 'string')) return 'Every project needs a title and slug.';
  const slugs = value.projects.map(p => p.slug);
  if (new Set(slugs).size !== slugs.length) return 'Project slugs must be unique.';
  return null;
}

app.get('/api/config', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ firebase: {
    apiKey: process.env.FIREBASE_API_KEY || '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    appId: process.env.FIREBASE_APP_ID || '',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || ''
  }});
});
app.get('/api/portfolio', (_req, res) => {
  try { res.set('Cache-Control', 'no-cache'); res.json(readPortfolio()); }
  catch { res.status(500).json({ error: 'Portfolio data could not be loaded.' }); }
});
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/contact', (req, res) => {
  if (String(req.body.website || '').trim()) return res.status(201).json({ ok: true, message: 'Thanks for reaching out.' });
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const subject = String(req.body.subject || '').trim();
  const message = String(req.body.message || '').trim();
  if (name.length < 2 || name.length > 100) return res.status(400).json({ error: 'Please enter a name between 2 and 100 characters.' });
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (subject.length > 160) return res.status(400).json({ error: 'Subject must be 160 characters or fewer.' });
  if (message.length < 10 || message.length > 5000) return res.status(400).json({ error: 'Message must be between 10 and 5,000 characters.' });
  // Hash IP for abuse diagnostics; do not store the raw address.
  const ipHash = crypto.createHash('sha256').update(String(req.ip) + (process.env.IP_HASH_SALT || 'local-salt')).digest('hex');
  const result = db.prepare('INSERT INTO contact_submissions (name,email,subject,message,ip_hash) VALUES (?,?,?,?,?)').run(name, email, subject, message, ipHash);
  res.status(201).json({ ok: true, id: result.lastInsertRowid, message: 'Thanks for reaching out. Your message has been sent.' });
});

app.post('/api/admin/login', loginLimiter, async (req, res) => {
  const username = String(req.body.username || '').trim();
  const password = String(req.body.password || '');
  const user = db.prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ?').get(username);
  const valid = user ? await bcrypt.compare(password, user.password_hash) : false;
  if (!valid) {
    req.loginAttempt.count += 1; loginAttempts.set(req.ip, req.loginAttempt);
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
  loginAttempts.delete(req.ip);
  req.session.regenerate(err => {
    if (err) return res.status(500).json({ error: 'Could not create a secure session.' });
    req.session.adminId = user.id;
    req.session.username = user.username;
    res.json({ ok: true, username: user.username });
  });
});
app.get('/api/admin/me', requireAdmin, (req, res) => res.json({ username: req.session.username }));
app.post('/api/admin/logout', requireAdmin, (req, res) => req.session.destroy(() => res.json({ ok: true })));
app.get('/api/admin/submissions', requireAdmin, (req, res) => {
  const status = ['new', 'read', 'archived'].includes(req.query.status) ? req.query.status : null;
  const rows = status
    ? db.prepare('SELECT id,name,email,subject,message,status,created_at FROM contact_submissions WHERE status = ? ORDER BY id DESC LIMIT 500').all(status)
    : db.prepare('SELECT id,name,email,subject,message,status,created_at FROM contact_submissions ORDER BY id DESC LIMIT 500').all();
  res.json({ submissions: rows });
});
app.patch('/api/admin/submissions/:id', requireAdmin, (req, res) => {
  const status = req.body.status;
  if (!['new', 'read', 'archived'].includes(status)) return res.status(400).json({ error: 'Invalid submission status.' });
  const result = db.prepare('UPDATE contact_submissions SET status = ? WHERE id = ?').run(status, Number(req.params.id));
  if (!result.changes) return res.status(404).json({ error: 'Submission not found.' });
  res.json({ ok: true });
});
app.get('/api/admin/settings', requireAdmin, (_req, res) => {
  try { res.json(readPortfolio()); } catch { res.status(500).json({ error: 'Could not read portfolio settings.' }); }
});
app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const validationError = validatePortfolio(req.body);
  if (validationError) return res.status(400).json({ error: validationError });
  const tempFile = `${dataFile}.tmp`;
  try {
    fs.writeFileSync(tempFile, JSON.stringify(req.body, null, 2) + '\n', { encoding: 'utf8', mode: 0o640 });
    JSON.parse(fs.readFileSync(tempFile, 'utf8'));
    fs.renameSync(tempFile, dataFile);
    res.json({ ok: true, message: 'Portfolio settings saved.' });
  } catch (error) {
    try { fs.unlinkSync(tempFile); } catch {}
    console.error('Settings save failed:', error);
    res.status(500).json({ error: 'Could not save portfolio settings.' });
  }
});

app.get('/admin', (_req, res) => res.sendFile(path.join(publicDir, 'admin.html')));
app.use('/css', express.static(path.join(publicDir, 'css')));
app.use('/js', express.static(path.join(publicDir, 'js')));
app.use('/data', express.static(path.join(publicDir, 'data')));
app.use(express.static(publicDir));
app.get('*', (_req, res) => res.sendFile(path.join(publicDir, 'index.html')));
app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
