'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, 'public');
const seedFile = path.join(__dirname, 'data', 'portfolio-seed.json');
app.disable('x-powered-by');
app.set('trust proxy', process.env.TRUST_PROXY === 'true' ? 1 : false);
app.use(express.json({ limit: '512kb' }));
app.use(express.urlencoded({ extended: false, limit: '16kb' }));

function initFirebase() {
  if (!process.env.FIREBASE_DATABASE_URL) throw new Error('FIREBASE_DATABASE_URL is required. Copy it from Firebase Console > Realtime Database.');
  if (admin.apps.length) return admin.app();
  let credential;
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try { credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)); }
    catch { throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON must contain valid service-account JSON.'); }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    credential = admin.credential.applicationDefault();
  } else {
    throw new Error('Configure FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS for private Realtime Database access.');
  }
  return admin.initializeApp({
    credential,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}
initFirebase();
const rtdb = admin.database();
const root = rtdb.ref('portfolio');

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET is required in production.');
app.use(session({
  name: 'samartha_admin', secret: sessionSecret || crypto.randomBytes(32).toString('hex'),
  resave: false, saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', maxAge: 8 * 60 * 60 * 1000 }
}));

const loginAttempts = new Map();
function loginLimiter(req, res, next) {
  const key = req.ip;
  const item = loginAttempts.get(key) || { count: 0, reset: Date.now() + 15 * 60 * 1000 };
  if (Date.now() > item.reset) { item.count = 0; item.reset = Date.now() + 15 * 60 * 1000; }
  if (item.count >= 10) return res.status(429).json({ error: 'Too many login attempts. Try again in 15 minutes.' });
  req.loginAttempt = item; next();
}
function requireAdmin(req, res, next) {
  if (req.session?.admin === true) return next();
  return res.status(401).json({ error: 'Please sign in to continue.' });
}
function validatePortfolio(value) {
  if (!value || typeof value !== 'object' || !value.site || !Array.isArray(value.projects) || !value.sections || typeof value.sections !== 'object') return 'Expected site, sections, and projects in portfolio content.';
  if (value.projects.some(p => !p || typeof p.slug !== 'string' || typeof p.title !== 'string')) return 'Every project needs a title and slug.';
  const slugs = value.projects.map(p => p.slug);
  if (new Set(slugs).size !== slugs.length) return 'Project slugs must be unique.';
  return null;
}
function composePortfolio(data) {
  const website = data.websiteConfig || {};
  return {
    site: website.site || {}, navigation: website.navigation || [], hero: website.hero || {},
    skills: website.skills || [], experience: website.experience || [],
    sections: data.sections || {}, projects: data.projects || []
  };
}
async function savePortfolio(value) {
  const websiteConfig = { site: value.site, navigation: value.navigation || [], hero: value.hero || {}, skills: value.skills || [], experience: value.experience || [] };
  await root.update({ websiteConfig, sections: value.sections, projects: value.projects });
}
async function ensureSeeded() {
  const snapshot = await root.once('value');
  if (snapshot.exists()) return;
  const seed = JSON.parse(fs.readFileSync(seedFile, 'utf8'));
  await savePortfolio(seed);
  console.log('Seeded private Firebase Realtime Database from data/portfolio-seed.json');
}

// Firebase web config is public by design; private service-account credentials never reach the browser.
app.get('/api/config', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ firebase: {
    apiKey: process.env.FIREBASE_API_KEY || '', authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '', appId: process.env.FIREBASE_APP_ID || '',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || ''
  }});
});
app.get('/api/portfolio', async (_req, res) => {
  try {
    const snapshot = await root.get();
    if (!snapshot.exists()) return res.status(503).json({ error: 'Portfolio content has not been initialized.' });
    res.set('Cache-Control', 'no-store'); res.json(composePortfolio(snapshot.val()));
  } catch (error) { console.error('Public portfolio read failed:', error.message); res.status(500).json({ error: 'Portfolio data could not be loaded.' }); }
});
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/contact', async (req, res) => {
  if (String(req.body.website || '').trim()) return res.status(201).json({ ok: true, message: 'Thanks for reaching out.' });
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const subject = String(req.body.subject || '').trim();
  const message = String(req.body.message || '').trim();
  if (name.length < 2 || name.length > 100) return res.status(400).json({ error: 'Please enter a name between 2 and 100 characters.' });
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (subject.length > 160) return res.status(400).json({ error: 'Subject must be 160 characters or fewer.' });
  if (message.length < 10 || message.length > 5000) return res.status(400).json({ error: 'Message must be between 10 and 5,000 characters.' });
  const createdAt = new Date().toISOString();
  const ipHash = crypto.createHash('sha256').update(String(req.ip) + (process.env.IP_HASH_SALT || 'local-salt')).digest('hex');
  try {
    const ref = rtdb.ref('contactSubmissions').push();
    await ref.set({ name, email, subject, message, status: 'new', createdAt, ipHash });
    res.status(201).json({ ok: true, id: ref.key, message: 'Thanks for reaching out. Your message has been sent.' });
  } catch (error) { console.error('Contact submission save failed:', error.message); res.status(500).json({ error: 'Your message could not be saved. Please try again later.' }); }
});

app.post('/api/admin/login', loginLimiter, async (req, res) => {
  const username = String(req.body.username || '').trim();
  const password = String(req.body.password || '');
  const expectedUsername = process.env.ADMIN_USERNAME || '';
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || '';
  let valid = false;
  if (username === expectedUsername && expectedHash) valid = await bcrypt.compare(password, expectedHash);
  else if (username === expectedUsername && process.env.ADMIN_PASSWORD) {
    // Compatibility for existing local .env files; prefer ADMIN_PASSWORD_HASH in production.
    valid = password.length === process.env.ADMIN_PASSWORD.length && crypto.timingSafeEqual(Buffer.from(password), Buffer.from(process.env.ADMIN_PASSWORD));
  }
  if (!valid) { req.loginAttempt.count += 1; loginAttempts.set(req.ip, req.loginAttempt); return res.status(401).json({ error: 'Invalid username or password.' }); }
  loginAttempts.delete(req.ip);
  req.session.regenerate(err => {
    if (err) return res.status(500).json({ error: 'Could not create a secure session.' });
    req.session.admin = true; req.session.username = username;
    res.json({ ok: true, username });
  });
});
app.get('/api/admin/me', requireAdmin, (req, res) => res.json({ username: req.session.username }));
app.post('/api/admin/logout', requireAdmin, (req, res) => req.session.destroy(() => res.json({ ok: true })));
app.get('/api/admin/submissions', requireAdmin, async (req, res) => {
  try {
    const status = ['new', 'read', 'archived'].includes(req.query.status) ? req.query.status : null;
    const snapshot = await rtdb.ref('contactSubmissions').orderByChild('createdAt').limitToLast(500).get();
    const submissions = [];
    snapshot.forEach(child => { const value = child.val(); if (!status || value.status === status) submissions.push({ id: child.key, ...value }); });
    submissions.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    res.json({ submissions: submissions.map(({ ipHash, ...item }) => item) });
  } catch (error) { console.error('Contact inbox read failed:', error.message); res.status(500).json({ error: 'Could not load contact submissions.' }); }
});
app.patch('/api/admin/submissions/:id', requireAdmin, async (req, res) => {
  const status = req.body.status;
  if (!['new', 'read', 'archived'].includes(status)) return res.status(400).json({ error: 'Invalid submission status.' });
  try {
    const ref = rtdb.ref(`contactSubmissions/${req.params.id}`);
    const snapshot = await ref.get(); if (!snapshot.exists()) return res.status(404).json({ error: 'Submission not found.' });
    await ref.update({ status }); res.json({ ok: true });
  } catch (error) { console.error('Contact status update failed:', error.message); res.status(500).json({ error: 'Could not update submission.' }); }
});
app.get('/api/admin/settings', requireAdmin, async (_req, res) => {
  try { const snapshot = await root.get(); if (!snapshot.exists()) return res.status(404).json({ error: 'Portfolio content is not initialized.' }); res.json(composePortfolio(snapshot.val())); }
  catch (error) { console.error('Settings read failed:', error.message); res.status(500).json({ error: 'Could not read portfolio settings.' }); }
});
app.put('/api/admin/settings', requireAdmin, async (req, res) => {
  const validationError = validatePortfolio(req.body);
  if (validationError) return res.status(400).json({ error: validationError });
  try { await savePortfolio(req.body); res.json({ ok: true, message: 'Portfolio content saved to Firebase Realtime Database.' }); }
  catch (error) { console.error('Settings save failed:', error.message); res.status(500).json({ error: 'Could not save portfolio content.' }); }
});

app.get('/admin', (_req, res) => res.sendFile(path.join(publicDir, 'admin.html')));
app.use('/css', express.static(path.join(publicDir, 'css')));
app.use('/js', express.static(path.join(publicDir, 'js')));
app.use(express.static(publicDir, { dotfiles: 'deny' }));
app.get('*', (_req, res) => res.sendFile(path.join(publicDir, 'index.html')));

ensureSeeded().then(() => app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`)))
  .catch(error => { console.error('Startup failed:', error.message); process.exit(1); });
