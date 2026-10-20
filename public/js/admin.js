(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const loginView = $('#loginView'), dashboardView = $('#dashboardView');
  const loginForm = $('#loginForm'), loginError = $('#loginError');
  let currentTab = 'inbox';
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function api(url, options = {}) {
    const response = await fetch(url, { credentials: 'same-origin', headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
    return payload;
  }
  function setMessage(element, message, type = '') { element.textContent = message; element.className = `form-message ${type}`.trim(); }
  function showDashboard(username) {
    loginView.classList.add('hidden'); dashboardView.classList.remove('hidden'); $('#logoutButton').classList.remove('hidden'); $('#signedInAs').textContent = `SIGNED IN / ${username}`;
    loadSubmissions(); loadSettings();
  }
  async function checkSession() {
    try { const user = await api('/api/admin/me'); showDashboard(user.username); }
    catch { loginView.classList.remove('hidden'); dashboardView.classList.add('hidden'); }
  }
  loginForm.addEventListener('submit', async event => {
    event.preventDefault(); setMessage(loginError, 'Signing in…');
    const form = new FormData(loginForm);
    try { const result = await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ username: form.get('username'), password: form.get('password') }) }); loginForm.reset(); setMessage(loginError, ''); showDashboard(result.username); }
    catch (error) { setMessage(loginError, error.message, 'error'); }
  });
  $('#logoutButton').addEventListener('click', async () => { try { await api('/api/admin/logout', { method: 'POST', body: '{}' }); } finally { location.reload(); } });
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => {
    currentTab = button.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach(tab => tab.classList.toggle('is-active', tab === button));
    $('#inboxPanel').classList.toggle('hidden', currentTab !== 'inbox'); $('#settingsPanel').classList.toggle('hidden', currentTab !== 'settings');
  }));
  $('#statusFilter').addEventListener('change', loadSubmissions);
  async function loadSubmissions() {
    const list = $('#submissionsList'); list.innerHTML = '<p class="muted">Loading messages…</p>';
    try {
      const status = $('#statusFilter').value;
      const result = await api(`/api/admin/submissions${status === 'all' ? '' : `?status=${encodeURIComponent(status)}`}`);
      const items = result.submissions || [];
      $('#inboxCount').textContent = String(items.filter(item => item.status === 'new').length);
      if (!items.length) { list.innerHTML = '<p class="muted">No submissions here yet.</p>'; return; }
      list.innerHTML = items.map(item => `<article class="submission"><div><h3>${escapeHTML(item.name)}</h3><div class="submission-meta"><a href="mailto:${escapeHTML(item.email)}">${escapeHTML(item.email)}</a> · ${escapeHTML(item.created_at)} · #${item.id}</div>${item.subject ? `<p class="submission-subject">${escapeHTML(item.subject)}</p>` : ''}<p class="submission-message">${escapeHTML(item.message)}</p></div><div class="submission-actions"><span class="status-pill">${escapeHTML(item.status)}</span><select data-status-id="${item.id}" aria-label="Update status for ${escapeHTML(item.name)}"><option value="new" ${item.status === 'new' ? 'selected' : ''}>New</option><option value="read" ${item.status === 'read' ? 'selected' : ''}>Read</option><option value="archived" ${item.status === 'archived' ? 'selected' : ''}>Archived</option></select></div></article>`).join('');
      list.querySelectorAll('[data-status-id]').forEach(select => select.addEventListener('change', async () => {
        try { await api(`/api/admin/submissions/${select.dataset.statusId}`, { method: 'PATCH', body: JSON.stringify({ status: select.value }) }); await loadSubmissions(); }
        catch (error) { toast(error.message); }
      }));
    } catch (error) { list.innerHTML = `<p class="form-message error">${escapeHTML(error.message)}</p>`; }
  }
  async function loadSettings() {
    const editor = $('#settingsEditor'); editor.value = 'Loading…';
    try { const settings = await api('/api/admin/settings'); editor.value = JSON.stringify(settings, null, 2); refreshContentTools(settings); setMessage($('#settingsMessage'), ''); }
    catch (error) { editor.value = ''; setMessage($('#settingsMessage'), error.message, 'error'); }
  }
  $('#reloadSettings').addEventListener('click', loadSettings);
  function readEditorData() {
    try { return JSON.parse($('#settingsEditor').value); }
    catch (error) { setMessage($('#settingsMessage'), `Fix JSON before using content actions: ${error.message}`, 'error'); return null; }
  }
  function writeEditorData(value, message) {
    $('#settingsEditor').value = JSON.stringify(value, null, 2);
    refreshContentTools(value);
    setMessage($('#settingsMessage'), message, 'success');
  }
  function refreshContentTools(data) {
    const projectSelect = $('#projectManagerSelect');
    if (!projectSelect) return;
    const previous = projectSelect.value;
    projectSelect.innerHTML = '<option value="">Select project</option>' + (data.projects || []).map(p => `<option value="${escapeHTML(p.slug)}">${escapeHTML(p.title)} (${escapeHTML(p.slug)})</option>`).join('');
    if ((data.projects || []).some(p => p.slug === previous)) projectSelect.value = previous;
    refreshSectionSelect(data);
  }
  function refreshSectionSelect(data = readEditorData()) {
    const select = $('#projectSectionSelect'); if (!select) return;
    const project = (data?.projects || []).find(p => p.slug === $('#projectManagerSelect').value);
    select.innerHTML = project && (project.sections || []).length
      ? project.sections.map((section, i) => `<option value="${i}">${String(i + 1).padStart(2, '0')} · ${escapeHTML(section.title || section.eyebrow || section.type || 'Untitled section')} (${escapeHTML(section.type || 'unknown')})</option>`).join('')
      : '<option value="">No sections</option>';
  }
  $('#projectManagerSelect').addEventListener('change', () => refreshSectionSelect());
  $('#addProject').addEventListener('click', () => {
    const data = readEditorData(); if (!data) return;
    const title = prompt('Project title?'); if (!title || !title.trim()) return;
    const base = title.trim().toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `project-${Date.now()}`;
    let slug = base, suffix = 2; while (data.projects.some(p => p.slug === slug)) slug = `${base}-${suffix++}`;
    data.projects.push({ slug, number: String(data.projects.length + 1).padStart(2, '0'), title: title.trim(), type: 'Web application', status: 'Concept', visual: 'dashboard', accent: '#d5ff4f', summary: 'Describe the project and the value it provides.', role: 'Frontend development', duration: 'In progress', stack: ['JavaScript', 'CSS'], problem: '', approach: '', features: [], decisions: [], outcome: '', links: [], sections: [] });
    writeEditorData(data, `Added “${title.trim()}”. Edit its details in the JSON editor, then save changes.`);
    $('#projectManagerSelect').value = slug; refreshSectionSelect(data);
  });
  $('#deleteProject').addEventListener('click', () => {
    const data = readEditorData(); if (!data) return;
    const slug = $('#projectManagerSelect').value; if (!slug) { setMessage($('#settingsMessage'), 'Choose a project first.', 'error'); return; }
    const project = data.projects.find(p => p.slug === slug);
    if (!confirm(`Delete project “${project?.title || slug}” and all its case-study sections?`)) return;
    data.projects = data.projects.filter(p => p.slug !== slug);
    writeEditorData(data, `Deleted project “${project?.title || slug}”. Save changes to publish.`);
  });
  $('#addProjectSection').addEventListener('click', () => {
    const data = readEditorData(); if (!data) return;
    const project = (data.projects || []).find(p => p.slug === $('#projectManagerSelect').value);
    if (!project) { setMessage($('#settingsMessage'), 'Choose a project first.', 'error'); return; }
    const type = $('#sectionTypeSelect').value;
    const title = prompt(`Title for the new ${type} section?`, type === 'points' ? 'Key points' : type === 'cards' ? 'Design decisions' : type === 'images' ? 'Gallery' : type === 'links' ? 'Useful links' : 'Overview');
    if (title === null) return;
    const section = { type, eyebrow: type.charAt(0).toUpperCase() + type.slice(1), title: title.trim() };
    if (type === 'text') section.body = 'Add the section text here.';
    if (type === 'points') { section.body = ''; section.items = ['Add your first point']; }
    if (type === 'cards') { section.body = ''; section.items = [{ title: 'Card title', body: 'Describe this detail.' }]; }
    if (type === 'images') { section.body = ''; section.items = [{ src: '/images/project-preview.jpg', alt: 'Describe the image', caption: 'Image caption' }]; }
    if (type === 'links') { section.body = ''; section.items = [{ label: 'Production website', url: 'https://example.com' }]; }
    project.sections = project.sections || []; project.sections.push(section);
    writeEditorData(data, `Added ${type} section. Edit its items and URLs in the JSON editor, then save changes.`);
    $('#projectManagerSelect').value = project.slug; refreshSectionSelect(data);
    $('#projectSectionSelect').value = String(project.sections.length - 1);
  });
  $('#deleteProjectSection').addEventListener('click', () => {
    const data = readEditorData(); if (!data) return;
    const project = (data.projects || []).find(p => p.slug === $('#projectManagerSelect').value);
    const index = Number($('#projectSectionSelect').value);
    if (!project || !Array.isArray(project.sections) || !Number.isInteger(index) || index < 0 || index >= project.sections.length) { setMessage($('#settingsMessage'), 'Choose a project section first.', 'error'); return; }
    const section = project.sections[index];
    if (!confirm(`Delete section “${section.title || section.eyebrow || section.type}”?`)) return;
    project.sections.splice(index, 1); writeEditorData(data, 'Section deleted. Save changes to publish.');
    $('#projectManagerSelect').value = project.slug; refreshSectionSelect(data);
  });

  $('#saveSettings').addEventListener('click', async () => {
    const editor = $('#settingsEditor');
    let parsed;
    try { parsed = JSON.parse(editor.value); }
    catch (error) { setMessage($('#settingsMessage'), `JSON syntax error: ${error.message}`, 'error'); return; }
    const button = $('#saveSettings'); button.disabled = true; button.textContent = 'Saving…';
    try { const result = await api('/api/admin/settings', { method: 'PUT', body: JSON.stringify(parsed) }); setMessage($('#settingsMessage'), result.message, 'success'); toast('Portfolio settings saved'); }
    catch (error) { setMessage($('#settingsMessage'), error.message, 'error'); }
    finally { button.disabled = false; button.textContent = 'Save changes ↗'; }
  });
  let toastTimer;
  function toast(message) { const element = $('#globalToast'); element.textContent = message; element.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove('show'), 2600); }
  checkSession();
})();
