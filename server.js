"use strict";
require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server: SocketIOServer } = require("socket.io");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const sanitizeHtml = require("sanitize-html");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "https://yunghog.github.io",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const PORT = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");
const seedFile = path.join(__dirname, "data", "portfolio-seed.json");
app.disable("x-powered-by");
app.set("trust proxy", process.env.TRUST_PROXY === "true" ? 1 : false);
app.use(express.json({ limit: "512kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));

function initFirebase() {
  if (!process.env.FIREBASE_DATABASE_URL)
    throw new Error(
      "FIREBASE_DATABASE_URL is required. Copy it from Firebase Console > Realtime Database.",
    );
  if (admin.apps.length) return admin.app();
  let credential;
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      credential = admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON),
      );
    } catch {
      throw new Error(
        "FIREBASE_SERVICE_ACCOUNT_JSON must contain valid service-account JSON.",
      );
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    credential = admin.credential.applicationDefault();
  } else {
    throw new Error(
      "Configure FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS for private Realtime Database access.",
    );
  }
  return admin.initializeApp({
    credential,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}
initFirebase();
const rtdb = admin.database();
const root = rtdb.ref("portfolio");
// Live chat is isolated from portfolio content and contact submissions.
const liveChat = rtdb.ref("liveChat");
let io = null;

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV === "production")
  throw new Error("SESSION_SECRET is required in production.");
const sessionMiddleware = session({
  name: "samartha_admin",
  secret: sessionSecret || crypto.randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 8 * 60 * 60 * 1000,
  },
});
app.use(sessionMiddleware);

const loginAttempts = new Map();
function loginLimiter(req, res, next) {
  const key = req.ip;
  const item = loginAttempts.get(key) || {
    count: 0,
    reset: Date.now() + 15 * 60 * 1000,
  };
  if (Date.now() > item.reset) {
    item.count = 0;
    item.reset = Date.now() + 15 * 60 * 1000;
  }
  if (item.count >= 10)
    return res
      .status(429)
      .json({ error: "Too many login attempts. Try again in 15 minutes." });
  req.loginAttempt = item;
  next();
}
function requireAdmin(req, res, next) {
  if (req.session?.admin === true) return next();
  return res.status(401).json({ error: "Please sign in to continue." });
}
function validatePortfolio(value) {
  if (
    !value ||
    typeof value !== "object" ||
    !value.site ||
    !Array.isArray(value.projects) ||
    !value.sections ||
    typeof value.sections !== "object"
  )
    return "Expected site, sections, and projects in portfolio content.";
  if (
    value.projects.some(
      (p) => !p || typeof p.slug !== "string" || typeof p.title !== "string",
    )
  )
    return "Every project needs a title and slug.";
  const slugs = value.projects.map((p) => p.slug);
  if (new Set(slugs).size !== slugs.length)
    return "Project slugs must be unique.";
  return null;
}
function composePortfolio(data) {
  const website = data.websiteConfig || {};
  return {
    site: website.site || {},
    navigation: website.navigation || [],
    hero: website.hero || {},
    skills: website.skills || [],
    experience: website.experience || [],
    sections: data.sections || {},
    projects: data.projects || [],
  };
}
async function savePortfolio(value) {
  const websiteConfig = {
    site: value.site,
    navigation: value.navigation || [],
    hero: value.hero || {},
    skills: value.skills || [],
    experience: value.experience || [],
  };
  await root.update({
    websiteConfig,
    sections: value.sections,
    projects: value.projects,
  });
}
async function ensureSeeded() {
  const snapshot = await root.once("value");
  if (snapshot.exists()) return;
  const seed = JSON.parse(fs.readFileSync(seedFile, "utf8"));
  await savePortfolio(seed);
  console.log(
    "Seeded private Firebase Realtime Database from data/portfolio-seed.json",
  );
}

// Firebase web config is public by design; private service-account credentials never reach the browser.
app.get("/api/config", (_req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY || "",
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.FIREBASE_PROJECT_ID || "",
      appId: process.env.FIREBASE_APP_ID || "",
      measurementId: process.env.FIREBASE_MEASUREMENT_ID || "",
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
      vapidKey: process.env.FIREBASE_VAPID_KEY || "",
    },
  });
});
app.get("/api/portfolio", async (_req, res) => {
  try {
    const snapshot = await root.get();
    if (!snapshot.exists())
      return res
        .status(503)
        .json({ error: "Portfolio content has not been initialized." });
    res.set("Cache-Control", "no-store");
    res.json(composePortfolio(snapshot.val()));
  } catch (error) {
    console.error("Public portfolio read failed:", error.message);
    res.status(500).json({ error: "Portfolio data could not be loaded." });
  }
});
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/contact", async (req, res) => {
  if (String(req.body.website || "").trim())
    return res
      .status(201)
      .json({ ok: true, message: "Thanks for reaching out." });
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const subject = String(req.body.subject || "").trim();
  const message = String(req.body.message || "").trim();
  if (name.length < 2 || name.length > 100)
    return res
      .status(400)
      .json({ error: "Please enter a name between 2 and 100 characters." });
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  if (subject.length > 160)
    return res
      .status(400)
      .json({ error: "Subject must be 160 characters or fewer." });
  if (message.length < 10 || message.length > 5000)
    return res
      .status(400)
      .json({ error: "Message must be between 10 and 5,000 characters." });
  const createdAt = new Date().toISOString();
  const ipHash = crypto
    .createHash("sha256")
    .update(String(req.ip) + (process.env.IP_HASH_SALT || "local-salt"))
    .digest("hex");
  try {
    const ref = rtdb.ref("contactSubmissions").push();
    await ref.set({
      name,
      email,
      subject,
      message,
      status: "new",
      createdAt,
      ipHash,
    });
    res
      .status(201)
      .json({
        ok: true,
        id: ref.key,
        message: "Thanks for reaching out. Your message has been sent.",
      });
  } catch (error) {
    console.error("Contact submission save failed:", error.message);
    res
      .status(500)
      .json({
        error: "Your message could not be saved. Please try again later.",
      });
  }
});

// ---- Live chat API (isolated RTDB namespace: liveChat/*) ----
const chatRate = new Map();
function chatLimiter(req, res, next) {
  const key = `${req.ip}:${req.path}`;
  const now = Date.now();
  const state = chatRate.get(key) || { count: 0, start: now };
  if (now - state.start > 60_000) {
    state.count = 0;
    state.start = now;
  }
  state.count += 1;
  chatRate.set(key, state);
  if (state.count > 40)
    return res
      .status(429)
      .json({ error: "Too many chat requests. Please wait a moment." });
  next();
}
const cleanText = (value, max = 500) =>
  String(value || "")
    .trim()
    .slice(0, max);
const safeRichText = (value) =>
  sanitizeHtml(String(value || ""), {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "a",
    ],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
    },
  }).trim();
const hashToken = (value) =>
  crypto
    .createHash("sha256")
    .update(String(value || ""))
    .digest("hex");
function sameToken(a, b) {
  const x = Buffer.from(String(a || ""));
  const y = Buffer.from(String(b || ""));
  return x.length === y.length && x.length > 0 && crypto.timingSafeEqual(x, y);
}
function makeChatRef() {
  return `CHAT-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}
async function getChatConversation(ref) {
  if (!/^[A-Za-z0-9_-]{5,80}$/.test(String(ref || ""))) return null;
  const snap = await liveChat.child(`conversations/${ref}`).get();
  return snap.exists() ? snap.val() : null;
}
async function authorizeChat(req, res, ref) {
  const conversation = await getChatConversation(ref);
  if (!conversation) {
    res.status(404).json({ error: "Chat not found." });
    return null;
  }
  if (req.session?.admin === true) return conversation;
  const token =
    req.get("x-chat-token") ||
    req.body?.visitorToken ||
    req.query?.visitorToken;
  if (!sameToken(hashToken(token), conversation.visitorTokenHash)) {
    res
      .status(403)
      .json({ error: "This chat belongs to another browser session." });
    return null;
  }
  return conversation;
}
async function sendChatPush(token, title, body, data = {}) {
  if (!token) return;
  try {
    await admin
      .messaging()
      .send({
        token,
        notification: { title, body },
        data: Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, String(v)]),
        ),
        webpush: {
          notification: {
            icon: "/favicon.ico",
            badge: "/favicon.ico",
            renotify: true,
          },
        },
      });
  } catch (error) {
    console.warn("Chat push delivery skipped:", error.code || error.message);
  }
}
function safeConversation(id, conversation) {
  if (!conversation) return null;
  const { visitorTokenHash, pushToken, ...value } = conversation;
  return { id, ...value };
}
async function persistChatMessage(
  conversationId,
  conversation,
  input,
  isAdmin,
) {
  if (conversation.status === "closed")
    throw Object.assign(new Error("This conversation is closed."), {
      statusCode: 409,
    });
  const html = safeRichText(input.html || input.text || "");
  const textContent = cleanText(
    String(input.text || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " "),
    4000,
  );
  if (!html || !textContent)
    throw Object.assign(new Error("Write a message before sending."), {
      statusCode: 400,
    });
  if (html.length > 10000 || textContent.length > 4000)
    throw Object.assign(new Error("Message is too long."), { statusCode: 400 });
  const createdAt = new Date().toISOString();
  const sender = isAdmin ? "admin" : "visitor";
  const messageRef = liveChat.child(`messages/${conversationId}`).push();
  const message = {
    sender,
    senderName: isAdmin
      ? conversation.adminName || "Samartha"
      : conversation.name,
    html,
    text: textContent,
    createdAt,
    reference: conversation.reference,
  };
  await messageRef.set(message);
  const conversationRef = liveChat.child(`conversations/${conversationId}`);
  const latestSnapshot = await conversationRef.get();
  const latest = latestSnapshot.val() || conversation;
  const patch = {
    updatedAt: createdAt,
    lastMessage: textContent.slice(0, 180),
    lastSender: sender,
  };
  if (isAdmin) patch.unreadVisitor = (Number(latest.unreadVisitor) || 0) + 1;
  else patch.unreadAdmin = (Number(latest.unreadAdmin) || 0) + 1;
  await conversationRef.update(patch);
  const savedMessage = { id: messageRef.key, ...message };
  io?.to(`chat:${conversationId}`).emit("chat:message", {
    conversationId,
    message: savedMessage,
  });
  const updatedSnapshot = await conversationRef.get();
  io?.to("admin:chats").emit("chat:conversation-updated", {
    conversation: safeConversation(conversationId, updatedSnapshot.val()),
  });
  if (isAdmin)
    await sendChatPush(
      latest.pushToken,
      `Reply from Samartha · ${conversation.reference}`,
      textContent.slice(0, 120),
      { reference: conversation.reference, conversationId },
    );
  else {
    const tokens = await liveChat.child("adminPushTokens").get();
    tokens.forEach((child) => {
      sendChatPush(
        child.val()?.token,
        `${conversation.name} · ${conversation.reference}`,
        textContent.slice(0, 120),
        { reference: conversation.reference, conversationId },
      );
    });
  }
  return savedMessage;
}
app.post("/api/chat/conversations", chatLimiter, async (req, res) => {
  const visitorToken = cleanText(req.body.visitorToken, 160);
  const name = cleanText(req.body.name, 80);
  const description = cleanText(req.body.description, 240);
  if (!/^[A-Za-z0-9_-]{24,160}$/.test(visitorToken))
    return res
      .status(400)
      .json({ error: "Invalid visitor session. Refresh and try again." });
  if (name.length < 2)
    return res.status(400).json({ error: "Please enter your name." });
  try {
    // Reuse this visitor's existing open chat where possible.
    const existingSnap = await liveChat
      .child("conversations")
      .orderByChild("visitorTokenHash")
      .equalTo(hashToken(visitorToken))
      .get();
    let existing = null;
    existingSnap.forEach((child) => {
      if (!existing && child.val().status !== "closed")
        existing = { id: child.key, ...child.val() };
    });
    if (existing)
      return res.json({
        conversation: {
          id: existing.id,
          reference: existing.reference,
          name: existing.name,
          description: existing.description,
          avatar: existing.avatar,
          status: existing.status,
        },
      });
    const ref = liveChat.child("conversations").push();
    const reference = makeChatRef();
    const createdAt = new Date().toISOString();
    const conversation = {
      reference,
      name,
      description,
      visitorTokenHash: hashToken(visitorToken),
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(name + "-" + reference)}`,
      status: "open",
      createdAt,
      updatedAt: createdAt,
      lastMessage: "Chat started",
      lastSender: "visitor",
      unreadAdmin: 0,
      unreadVisitor: 0,
      pushToken: "",
    };
    await ref.set(conversation);
    await liveChat
      .child(`messages/${ref.key}`)
      .push({
        sender: "bot",
        senderName: "Samartha’s assistant",
        html: `<p>Hi ${sanitizeHtml(name)}! 👋 Thanks for stopping by. I’ll help you connect with Samartha. Leave a message here and he’ll reply as soon as he can.</p>`,
        text: `Hi ${name}! Thanks for stopping by. I’ll help you connect with Samartha. Leave a message here and he’ll reply as soon as he can.`,
        createdAt,
      });
    io?.to("admin:chats").emit("chat:conversation-updated", {
      conversation: safeConversation(ref.key, conversation),
    });
    const adminTokens = await liveChat.child("adminPushTokens").get();
    adminTokens.forEach((child) => {
      sendChatPush(
        child.val()?.token,
        `New chat · ${name}`,
        description || "A visitor started a conversation.",
        { reference, conversationId: ref.key },
      );
    });
    res
      .status(201)
      .json({
        conversation: {
          id: ref.key,
          reference,
          name,
          description,
          avatar: conversation.avatar,
          status: conversation.status,
        },
      });
  } catch (error) {
    console.error("Chat create failed:", error.message);
    res.status(500).json({ error: "Could not start chat. Please try again." });
  }
});
app.get("/api/chat/:id/messages", chatLimiter, async (req, res) => {
  try {
    const conversation = await authorizeChat(req, res, req.params.id);
    if (!conversation) return;
    const snap = await liveChat
      .child(`messages/${req.params.id}`)
      .limitToLast(200)
      .get();
    const messages = [];
    snap.forEach((child) => messages.push({ id: child.key, ...child.val() }));
    messages.sort((a, b) =>
      String(a.createdAt).localeCompare(String(b.createdAt)),
    );
    if (req.session?.admin)
      await liveChat
        .child(`conversations/${req.params.id}`)
        .update({ unreadAdmin: 0 });
    else
      await liveChat
        .child(`conversations/${req.params.id}`)
        .update({ unreadVisitor: 0 });
    res.set("Cache-Control", "no-store");
    res.json({
      messages,
      conversation: {
        reference: conversation.reference,
        status: conversation.status,
      },
    });
  } catch (error) {
    console.error("Chat messages read failed:", error.message);
    res.status(500).json({ error: "Could not load chat history." });
  }
});
app.post("/api/chat/:id/messages", chatLimiter, async (req, res) => {
  try {
    const conversation = await authorizeChat(req, res, req.params.id);
    if (!conversation) return;
    const isAdmin = req.session?.admin === true;
    const message = await persistChatMessage(
      req.params.id,
      conversation,
      req.body,
      isAdmin,
    );
    res.status(201).json({ ok: true, message });
  } catch (error) {
    if (error.statusCode)
      return res.status(error.statusCode).json({ error: error.message });
    console.error("Chat message send failed:", error.message);
    res.status(500).json({ error: "Message could not be sent." });
  }
});
app.post("/api/chat/:id/push-token", chatLimiter, async (req, res) => {
  try {
    const conversation = await authorizeChat(req, res, req.params.id);
    if (!conversation) return;
    const token = cleanText(req.body.token, 4096);
    if (token.length < 20)
      return res.status(400).json({ error: "Invalid push token." });
    await liveChat
      .child(`conversations/${req.params.id}`)
      .update({ pushToken: token, pushEnabledAt: new Date().toISOString() });
    res.json({ ok: true });
  } catch (error) {
    console.error("Chat push token save failed:", error.message);
    res.status(500).json({ error: "Could not enable notifications." });
  }
});
app.post("/api/admin/chat/push-token", requireAdmin, async (req, res) => {
  const token = cleanText(req.body.token, 4096);
  if (token.length < 20)
    return res.status(400).json({ error: "Invalid push token." });
  try {
    await liveChat
      .child(`adminPushTokens/${hashToken(token)}`)
      .set({ token, updatedAt: new Date().toISOString() });
    res.json({ ok: true });
  } catch (error) {
    console.error("Admin chat push token save failed:", error.message);
    res.status(500).json({ error: "Could not save notification settings." });
  }
});
app.get("/api/admin/chats", requireAdmin, async (_req, res) => {
  try {
    const snap = await liveChat
      .child("conversations")
      .orderByChild("updatedAt")
      .limitToLast(500)
      .get();
    const conversations = [];
    snap.forEach((child) => {
      const { visitorTokenHash, pushToken, ...value } = child.val() || {};
      conversations.push({ id: child.key, ...value });
    });
    conversations.sort((a, b) =>
      String(b.updatedAt).localeCompare(String(a.updatedAt)),
    );
    res.set("Cache-Control", "no-store");
    res.json({ conversations });
  } catch (error) {
    console.error("Chat inbox read failed:", error.message);
    res.status(500).json({ error: "Could not load chat inbox." });
  }
});
app.patch("/api/admin/chats/:id", requireAdmin, async (req, res) => {
  const status = req.body.status;
  if (!["open", "closed"].includes(status))
    return res.status(400).json({ error: "Invalid chat status." });
  try {
    const ref = liveChat.child(`conversations/${req.params.id}`);
    const snap = await ref.get();
    if (!snap.exists())
      return res.status(404).json({ error: "Chat not found." });
    await ref.update({ status, updatedAt: new Date().toISOString() });
    const updated = await ref.get();
    io?.to("admin:chats").emit("chat:conversation-updated", {
      conversation: safeConversation(req.params.id, updated.val()),
    });
    io?.to(`chat:${req.params.id}`).emit("chat:status", {
      conversationId: req.params.id,
      status,
    });
    res.json({ ok: true });
  } catch (error) {
    console.error("Chat status update failed:", error.message);
    res.status(500).json({ error: "Could not update chat." });
  }
});
app.get("/firebase-messaging-sw.js", (_req, res) => {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    appId: process.env.FIREBASE_APP_ID || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  };
  res
    .type("application/javascript")
    .set("Cache-Control", "no-cache")
    .send(
      `importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');\nimportScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');\nfirebase.initializeApp(${JSON.stringify(config)});\nconst messaging=firebase.messaging();\nmessaging.onBackgroundMessage(payload=>{const n=payload.notification||{};self.registration.showNotification(n.title||'New chat message',{body:n.body||'You have a new message.',icon:'/favicon.ico',data:payload.data||{}})});\nself.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.openWindow('/'+(event.notification.data?.reference?'#chat-'+event.notification.data.reference:'')))});`,
    );
});

app.post("/api/admin/login", loginLimiter, async (req, res) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");
  const expectedUsername = process.env.ADMIN_USERNAME || "";
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || "";
  let valid = false;
  if (username === expectedUsername && expectedHash)
    valid = await bcrypt.compare(password, expectedHash);
  else if (username === expectedUsername && process.env.ADMIN_PASSWORD) {
    // Compatibility for existing local .env files; prefer ADMIN_PASSWORD_HASH in production.
    valid =
      password.length === process.env.ADMIN_PASSWORD.length &&
      crypto.timingSafeEqual(
        Buffer.from(password),
        Buffer.from(process.env.ADMIN_PASSWORD),
      );
  }
  if (!valid) {
    req.loginAttempt.count += 1;
    loginAttempts.set(req.ip, req.loginAttempt);
    return res.status(401).json({ error: "Invalid username or password." });
  }
  loginAttempts.delete(req.ip);
  req.session.regenerate((err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Could not create a secure session." });
    req.session.admin = true;
    req.session.username = username;
    res.json({ ok: true, username });
  });
});
app.get("/api/admin/me", requireAdmin, (req, res) =>
  res.json({ username: req.session.username }),
);
app.post("/api/admin/logout", requireAdmin, (req, res) =>
  req.session.destroy(() => res.json({ ok: true })),
);
app.get("/api/admin/submissions", requireAdmin, async (req, res) => {
  try {
    const status = ["new", "read", "archived"].includes(req.query.status)
      ? req.query.status
      : null;
    const snapshot = await rtdb
      .ref("contactSubmissions")
      .orderByChild("createdAt")
      .limitToLast(500)
      .get();
    const submissions = [];
    snapshot.forEach((child) => {
      const value = child.val();
      if (!status || value.status === status)
        submissions.push({ id: child.key, ...value });
    });
    submissions.sort((a, b) =>
      String(b.createdAt).localeCompare(String(a.createdAt)),
    );
    res.json({ submissions: submissions.map(({ ipHash, ...item }) => item) });
  } catch (error) {
    console.error("Contact inbox read failed:", error.message);
    res.status(500).json({ error: "Could not load contact submissions." });
  }
});
app.patch("/api/admin/submissions/:id", requireAdmin, async (req, res) => {
  const status = req.body.status;
  if (!["new", "read", "archived"].includes(status))
    return res.status(400).json({ error: "Invalid submission status." });
  try {
    const ref = rtdb.ref(`contactSubmissions/${req.params.id}`);
    const snapshot = await ref.get();
    if (!snapshot.exists())
      return res.status(404).json({ error: "Submission not found." });
    await ref.update({ status });
    res.json({ ok: true });
  } catch (error) {
    console.error("Contact status update failed:", error.message);
    res.status(500).json({ error: "Could not update submission." });
  }
});
app.get("/api/admin/settings", requireAdmin, async (_req, res) => {
  try {
    const snapshot = await root.get();
    if (!snapshot.exists())
      return res
        .status(404)
        .json({ error: "Portfolio content is not initialized." });
    res.json(composePortfolio(snapshot.val()));
  } catch (error) {
    console.error("Settings read failed:", error.message);
    res.status(500).json({ error: "Could not read portfolio settings." });
  }
});
app.put("/api/admin/settings", requireAdmin, async (req, res) => {
  const validationError = validatePortfolio(req.body);
  if (validationError) return res.status(400).json({ error: validationError });
  try {
    await savePortfolio(req.body);
    res.json({
      ok: true,
      message: "Portfolio content saved to Firebase Realtime Database.",
    });
  } catch (error) {
    console.error("Settings save failed:", error.message);
    res.status(500).json({ error: "Could not save portfolio content." });
  }
});

app.get("/admin", (_req, res) =>
  res.sendFile(path.join(publicDir, "admin.html")),
);
app.use("/css", express.static(path.join(publicDir, "css")));
app.use("/js", express.static(path.join(publicDir, "js")));
app.use(express.static(publicDir, { dotfiles: "deny" }));
app.get("*", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));

const server = http.createServer(app);
io = new SocketIOServer(server, {
  serveClient: true,
  maxHttpBufferSize: 64 * 1024,
});
io.engine.use(sessionMiddleware);
io.on("connection", (socket) => {
  socket.on("chat:admin:join", (acknowledgement) => {
    if (socket.request.session?.admin !== true) {
      if (typeof acknowledgement === "function")
        acknowledgement({ ok: false, error: "Admin sign-in required." });
      return;
    }
    socket.join("admin:chats");
    if (typeof acknowledgement === "function") acknowledgement({ ok: true });
  });
  socket.on("chat:join", async (payload = {}, acknowledgement) => {
    try {
      const conversationId = cleanText(payload.conversationId, 80);
      const conversation = await getChatConversation(conversationId);
      if (!conversation)
        throw Object.assign(new Error("Chat not found."), { statusCode: 404 });
      const isAdmin = socket.request.session?.admin === true;
      const tokenHash = hashToken(payload.visitorToken);
      if (!isAdmin && !sameToken(tokenHash, conversation.visitorTokenHash))
        throw Object.assign(
          new Error("This chat belongs to another browser session."),
          { statusCode: 403 },
        );
      socket.join(`chat:${conversationId}`);
      socket.data.chatAuth ||= {};
      socket.data.chatAuth[conversationId] = {
        isAdmin,
        tokenHash: isAdmin ? null : tokenHash,
      };
      if (typeof acknowledgement === "function") acknowledgement({ ok: true });
    } catch (error) {
      if (typeof acknowledgement === "function")
        acknowledgement({
          ok: false,
          error: error.message || "Could not join chat.",
        });
    }
  });
  socket.on("chat:send", async (payload = {}, acknowledgement) => {
    try {
      const now = Date.now();
      const rate = socket.data.chatSendRate || { count: 0, startedAt: now };
      if (now - rate.startedAt >= 60_000) {
        rate.count = 0;
        rate.startedAt = now;
      }
      rate.count += 1;
      socket.data.chatSendRate = rate;
      if (rate.count > 30)
        throw Object.assign(
          new Error(
            "You are sending messages too quickly. Please wait a moment.",
          ),
          { statusCode: 429 },
        );
      const conversationId = cleanText(payload.conversationId, 80);
      const conversation = await getChatConversation(conversationId);
      if (!conversation)
        throw Object.assign(new Error("Chat not found."), { statusCode: 404 });
      const isAdmin = socket.request.session?.admin === true;
      if (isAdmin) {
        if (!socket.rooms.has(`chat:${conversationId}`))
          throw Object.assign(
            new Error("Join this conversation before replying."),
            { statusCode: 403 },
          );
      } else {
        const auth = socket.data.chatAuth?.[conversationId];
        const tokenHash = hashToken(payload.visitorToken);
        if (
          !auth ||
          auth.isAdmin ||
          !sameToken(auth.tokenHash, tokenHash) ||
          !sameToken(tokenHash, conversation.visitorTokenHash)
        )
          throw Object.assign(
            new Error("This chat belongs to another browser session."),
            { statusCode: 403 },
          );
      }
      const message = await persistChatMessage(
        conversationId,
        conversation,
        payload,
        isAdmin,
      );
      if (typeof acknowledgement === "function")
        acknowledgement({ ok: true, message });
    } catch (error) {
      if (typeof acknowledgement === "function")
        acknowledgement({
          ok: false,
          error: error.message || "Message could not be sent.",
          statusCode: error.statusCode || 500,
        });
    }
  });
});

ensureSeeded()
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Portfolio running at http://localhost:${PORT}`),
    ),
  )
  .catch((error) => {
    console.error("Startup failed:", error.message);
    process.exit(1);
  });
