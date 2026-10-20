(() => {
  "use strict";
  if (window.__portfolioChatLoaded) return;
  window.__portfolioChatLoaded = true;
  const $ = (s) => document.querySelector(s);
  const escapeHTML = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const avatarUrl = (name) =>
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name || "Visitor")}&backgroundColor=d5ff4f&textColor=17180f`;
  const avatarFallback = (name) =>
    `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="40" fill="#d5ff4f"/><text x="40" y="46" text-anchor="middle" font-family="Arial,sans-serif" font-size="29" font-weight="700" fill="#17180f">${String(
        name || "V",
      )
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0] || "")
        .join("")
        .replace(/[^a-z0-9]/gi, "")
        .toUpperCase()}</text></svg>`,
    )}`;
  function wireAvatar(img, name) {
    if (!img) return;
    img.onerror = () => {
      img.onerror = null;
      img.src = avatarFallback(name);
    };
  }
  const tokenKey = "samartha_chat_visitor_token";
  const savedChatKey = "samartha_chat_active";
  const getToken = () => {
    let v = localStorage.getItem(tokenKey);
    if (!v) {
      const bytes = new Uint8Array(32);
      crypto.getRandomValues(bytes);
      v = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
      localStorage.setItem(tokenKey, v);
    }
    return v;
  };
  const token = getToken();
  let conversation = null,
    editor = null,
    socket = null,
    socketJoinedId = "",
    lastMessageId = "",
    initialized = false,
    config = null,
    audioCtx = null;
  const api = async (url, options = {}) => {
    const response = await fetch(url, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "x-chat-token": token,
        ...(options.headers || {}),
      },
      ...options,
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "Chat request failed.");
    return body;
  };
  function beep(kind = "received") {
    try {
      audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator(),
        gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = kind === "sent" ? 660 : 880;
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.08,
        audioCtx.currentTime + 0.012,
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + 0.13,
      );
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.14);
    } catch {}
  }
  function shell() {
    if ($("#portfolioChatRoot")) return;
    const root = document.createElement("div");
    root.id = "portfolioChatRoot";
    root.innerHTML = `<button class="chat-fab" id="publicChatFab" aria-label="Open live chat"><span class="chat-fab-icon">✳</span><span class="chat-fab-label">LET’S TALK</span><i></i></button><div class="public-chat-window" id="publicChatWindow" aria-label="Live chat" aria-hidden="true"><header class="public-chat-header"><div class="public-chat-brand"><div class="chat-bot-avatar">S<span>.</span></div><div><strong>Say hello</strong><small><i></i> Usually replies personally</small></div></div><div class="public-chat-controls"><button id="publicChatFullscreen" aria-label="Full screen chat" title="Full screen">⛶</button><button id="publicChatClose" aria-label="Close chat">×</button></div></header><div id="publicChatWelcome" class="public-chat-welcome"><div class="chat-welcome-symbol">✳</div><p class="chat-overline">SAMARTHA / LIVE CHAT</p><h3>Hey there.<br><em>What’s on your mind?</em></h3><p class="chat-welcome-copy">I’m here to help you connect with Samartha. Leave a note and start a conversation.</p><form id="publicChatStartForm"><label>Your name<input name="name" required minlength="2" maxlength="80" placeholder="What should I call you?"></label><label>What’s this about? <span>(optional)</span><textarea name="description" rows="2" maxlength="240" placeholder="A role, project, collaboration…"></textarea></label><button type="submit">Start conversation <span>↗</span></button><p id="publicChatStartError" role="status"></p></form><small class="chat-privacy-note">Your chat history is saved so you can return to it in this browser.</small></div><div id="publicChatConversation" class="public-chat-conversation hidden"><div class="public-chat-ref"><span>CONVERSATION</span><strong id="publicChatReference"></strong><button id="publicChatPushButton" type="button">Enable notifications</button></div><div id="publicChatMessages" class="public-chat-messages" aria-live="polite"></div><div class="public-chat-compose"><div id="publicChatEditor" class="chat-editor"></div><div class="public-chat-compose-footer"><span>Enter to send · Shift+Enter for a new line</span><button id="publicChatSend" type="button" aria-label="Send message">↑</button></div></div><p id="publicChatSendError" class="chat-inline-error" role="status"></p></div></div>`;
    document.body.append(root);
    $("#publicChatFab").addEventListener("click", openWindow);
    $("#publicChatClose").addEventListener("click", closeWindow);
    $("#publicChatFullscreen").addEventListener("click", () => {
      $("#publicChatWindow").classList.toggle("is-fullscreen");
      $("#publicChatFullscreen").textContent = $(
        "#publicChatWindow",
      ).classList.contains("is-fullscreen")
        ? "⤢"
        : "⛶";
    });
    $("#publicChatStartForm").addEventListener("submit", startChat);
    $("#publicChatSend").addEventListener("click", sendMessage);
    $("#publicChatPushButton").addEventListener("click", enablePush);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeWindow();
    });
    if (window.Quill)
      editor = new Quill("#publicChatEditor", {
        theme: "snow",
        placeholder: "Write your message…",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
          ],
        },
      });
    $("#publicChatEditor .ql-editor")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        sendMessage();
      }
    });
    setupSocket();
    restoreChat();
    if (location.hash.startsWith("#chat-")) openWindow();
  }
  function openWindow() {
    const win = $("#publicChatWindow");
    win.classList.add("is-open");
    win.setAttribute("aria-hidden", "false");
    $("#publicChatFab").classList.add("is-open");
    setTimeout(() => {
      if (conversation) $("#publicChatEditor .ql-editor")?.focus();
      else $("#publicChatStartForm input")?.focus();
    }, 100);
  }
  function closeWindow() {
    const win = $("#publicChatWindow");
    if (!win) return;
    win.classList.remove("is-open", "is-fullscreen");
    win.setAttribute("aria-hidden", "true");
    $("#publicChatFab").classList.remove("is-open");
    $("#publicChatFullscreen").textContent = "⛶";
  }
  async function startChat(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const error = $("#publicChatStartError");
    error.textContent = "Starting your conversation…";
    try {
      const result = await api("/api/chat/conversations", {
        method: "POST",
        body: JSON.stringify({
          visitorToken: token,
          name: form.get("name"),
          description: form.get("description"),
        }),
      });
      conversation = result.conversation;
      localStorage.setItem(
        savedChatKey,
        JSON.stringify({
          id: conversation.id,
          reference: conversation.reference,
          name: conversation.name,
          description: conversation.description,
        }),
      );
      $("#publicChatWelcome").classList.add("hidden");
      $("#publicChatConversation").classList.remove("hidden");
      $("#publicChatReference").textContent = conversation.reference;
      await refreshMessages(true);
      joinSocketConversation();
      error.textContent = "";
    } catch (err) {
      error.textContent = err.message;
    }
  }
  async function restoreChat() {
    try {
      const saved = JSON.parse(localStorage.getItem(savedChatKey) || "null");
      if (!saved?.id) return;
      const result = await api(
        `/api/chat/${encodeURIComponent(saved.id)}/messages`,
      );
      conversation = { ...saved, ...result.conversation };
      $("#publicChatWelcome").classList.add("hidden");
      $("#publicChatConversation").classList.remove("hidden");
      $("#publicChatReference").textContent = conversation.reference;
      renderMessages(result.messages || [], true);
      joinSocketConversation();
    } catch {
      localStorage.removeItem(savedChatKey);
    }
  }
  function renderMessages(messages, initial = false) {
    const box = $("#publicChatMessages");
    if (!box) return;
    const oldBottom = box.scrollHeight - box.scrollTop - box.clientHeight;
    const wasNearBottom = oldBottom < 100;
    let newest = "";
    if (messages.length) newest = messages[messages.length - 1].id;
    messages.forEach((m) => {
      if (!box.querySelector(`[data-message-id="${CSS.escape(m.id)}"]`)) {
        const row = document.createElement("article");
        row.className = `chat-message chat-message--${m.sender === "visitor" ? "own" : m.sender === "admin" ? "admin" : "bot"}`;
        row.dataset.messageId = m.id;
        const avatar =
          m.sender === "admin"
            ? avatarUrl("Samartha")
            : m.sender === "visitor"
              ? conversation?.avatar ||
                avatarUrl(conversation?.name || "Visitor")
              : "";
        row.innerHTML = `${m.sender === "visitor" ? "" : `<img class="chat-message-avatar" alt="" src="${escapeHTML(avatar)}">`}<div class="chat-message-content"><div class="chat-message-name">${escapeHTML(m.senderName || (m.sender === "bot" ? "Assistant" : m.sender === "admin" ? "Samartha" : conversation?.name))}</div><div class="chat-message-bubble">${m.html || escapeHTML(m.text || "")}</div><time>${new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time></div></article>`;
        box.append(row);
        wireAvatar(
          row.querySelector("img"),
          m.sender === "admin" ? "Samartha" : conversation?.name || "Visitor",
        );
        if (!initial && m.id !== lastMessageId && m.sender !== "visitor")
          beep("received");
      }
    });
    if (newest) lastMessageId = newest;
    if (wasNearBottom || initial) box.scrollTop = box.scrollHeight;
  }
  async function refreshMessages(initial = false) {
    if (!conversation) return;
    try {
      const result = await api(
        `/api/chat/${encodeURIComponent(conversation.id)}/messages`,
      );
      renderMessages(result.messages || [], initial);
    } catch (err) {
      $("#publicChatSendError").textContent = err.message;
    }
  }
  function setupSocket() {
    if (!window.io) return;
    socket = window.io({ withCredentials: true });
    socket.on("connect", joinSocketConversation);
    socket.on("disconnect", () => {
      socketJoinedId = "";
    });
    socket.on("chat:message", (payload) => {
      if (
        conversation &&
        payload?.conversationId === conversation.id &&
        payload.message
      )
        renderMessages([payload.message], false);
    });
    socket.on("chat:status", (payload) => {
      if (
        conversation &&
        payload?.conversationId === conversation.id &&
        payload.status === "closed"
      )
        $("#publicChatSendError").textContent =
          "This conversation has been closed by Samartha.";
    });
    socket.on("connect_error", () => {
      if (conversation)
        $("#publicChatSendError").textContent = "Reconnecting to live chat…";
    });
  }
  function joinSocketConversation() {
    if (!socket?.connected || !conversation) return Promise.resolve(false);
    return new Promise((resolve) =>
      socket.emit(
        "chat:join",
        { conversationId: conversation.id, visitorToken: token },
        (result) => {
          socketJoinedId = result?.ok ? conversation.id : "";
          if (!result?.ok)
            $("#publicChatSendError").textContent =
              result?.error || "Could not connect to live chat.";
          else $("#publicChatSendError").textContent = "";
          resolve(Boolean(result?.ok));
        },
      ),
    );
  }
  async function sendMessage() {
    if (!conversation || !editor) return;
    const html = editor.root.innerHTML;
    const text = editor.getText().trim();
    if (!text || text === "\n") return;
    const button = $("#publicChatSend");
    button.disabled = true;
    try {
      if (!socket?.connected)
        throw new Error(
          "Live connection is unavailable. Please wait for it to reconnect.",
        );
      if (
        socketJoinedId !== conversation.id &&
        !(await joinSocketConversation())
      )
        throw new Error(
          "Could not connect to this conversation. Please try again.",
        );
      await new Promise((resolve, reject) => {
        socket
          .timeout(10000)
          .emit(
            "chat:send",
            {
              conversationId: conversation.id,
              visitorToken: token,
              html,
              text,
            },
            (timeoutError, result) => {
              if (timeoutError)
                return reject(
                  new Error(
                    "Message timed out. Check your connection and try again.",
                  ),
                );
              if (!result?.ok)
                return reject(
                  new Error(result?.error || "Message could not be sent."),
                );
              resolve(result);
            },
          );
      });
      editor.setText("");
      $("#publicChatSendError").textContent = "";
      beep("sent");
    } catch (err) {
      $("#publicChatSendError").textContent = err.message;
    } finally {
      button.disabled = false;
      editor.focus();
    }
  }
  async function enablePush() {
    const button = $("#publicChatPushButton");
    try {
      if (
        !("Notification" in window) ||
        !("serviceWorker" in navigator) ||
        !window.firebase
      )
        return alert("Push notifications are not supported in this browser.");
      if (!config) config = await (await fetch("/api/config")).json();
      if (!config.firebase?.vapidKey || !config.firebase?.messagingSenderId)
        throw new Error(
          "Push notifications are not configured yet. Add Firebase Messaging sender ID and VAPID key to the server environment.",
        );
      const permission = await Notification.requestPermission();
      if (permission !== "granted")
        throw new Error(
          "Notifications were not allowed in your browser settings.",
        );
      if (!firebase.apps.length) firebase.initializeApp(config.firebase);
      const messaging = firebase.messaging();
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      );
      const tokenValue = await messaging.getToken({
        vapidKey: config.firebase.vapidKey,
        serviceWorkerRegistration: registration,
      });
      await api(`/api/chat/${encodeURIComponent(conversation.id)}/push-token`, {
        method: "POST",
        body: JSON.stringify({ visitorToken: token, token: tokenValue }),
      });
      button.textContent = "Notifications enabled ✓";
      button.disabled = true;
      messaging.onMessage((payload) => {
        if (
          payload.notification &&
          !$("#publicChatWindow").classList.contains("is-open")
        )
          beep("received");
      });
    } catch (err) {
      alert(err.message);
    }
  }
  function init() {
    if (initialized) return;
    initialized = true;
    shell();
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
