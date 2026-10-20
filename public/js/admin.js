(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const loginView = $('#loginView'), dashboardView = $('#dashboardView');
  const loginForm = $('#loginForm'), loginError = $('#loginError');
  let currentTab = 'inbox';
  let content = null;
  let dirty = false;
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
      list.innerHTML = items.map(item => `<article class="submission"><div><h3>${escapeHTML(item.name)}</h3><div class="submission-meta"><a href="mailto:${escapeHTML(item.email)}">${escapeHTML(item.email)}</a> · ${escapeHTML(item.createdAt || '')} · #${escapeHTML(item.id)}</div>${item.subject ? `<p class="submission-subject">${escapeHTML(item.subject)}</p>` : ''}<p class="submission-message">${escapeHTML(item.message)}</p></div><div class="submission-actions"><span class="status-pill">${escapeHTML(item.status)}</span><select data-status-id="${escapeHTML(item.id)}" aria-label="Update status for ${escapeHTML(item.name)}"><option value="new" ${item.status === 'new' ? 'selected' : ''}>New</option><option value="read" ${item.status === 'read' ? 'selected' : ''}>Read</option><option value="archived" ${item.status === 'archived' ? 'selected' : ''}>Archived</option></select></div></article>`).join('');
      list.querySelectorAll('[data-status-id]').forEach(select => select.addEventListener('change', async () => {
        try { await api(`/api/admin/submissions/${select.dataset.statusId}`, { method: 'PATCH', body: JSON.stringify({ status: select.value }) }); await loadSubmissions(); }
        catch (error) { toast(error.message); }
      }));
    } catch (error) { list.innerHTML = `<p class="form-message error">${escapeHTML(error.message)}</p>`; }
  }

  const category = () => $('#contentType').value;
  const projectSlug = () => $('#cmsProjectPicker').value;
  function selectedTarget() {
    const kind = category();
    if (!content) return null;
    if (kind === 'site') return { value: content.site, path: ['site'], label: content.site?.name || 'Website details', singleton: true };
    if (kind === 'hero') return { value: content.hero, path: ['hero'], label: 'Hero section', singleton: true };
    if (kind === 'homepageSections') { const key = $('#cmsRecordPicker').value; return key ? { value: content.sections[key], path: ['sections', key], label: key, key } : null; }
    if (kind === 'projectSections') {
      const project = content.projects.find(p => p.slug === projectSlug()); const index = Number($('#cmsRecordPicker').value);
      return project && Number.isInteger(index) && project.sections?.[index] ? { value: project.sections[index], path: ['projects', content.projects.indexOf(project), 'sections', index], label: project.sections[index].title || `Section ${index + 1}`, index } : null;
    }
    const array = content[kind]; const index = Number($('#cmsRecordPicker').value);
    return Array.isArray(array) && Number.isInteger(index) && array[index] !== undefined ? { value: array[index], path: [kind, index], label: array[index].title || array[index].label || array[index].company || array[index].name || `${kind} item ${index + 1}`, index } : null;
  }
  function getAtPath(root, path) { return path.reduce((value, key) => value == null ? undefined : value[key], root); }
  function setAtPath(root, path, value) { let cursor = root; path.slice(0, -1).forEach(key => { cursor = cursor[key]; }); cursor[path[path.length - 1]] = value; }
  function renderField(label, path, value) {
    const pathAttr = escapeHTML(JSON.stringify(path));
    const id = `field-${Math.random().toString(36).slice(2, 10)}`;
    if (Array.isArray(value) && value.every(item => typeof item === 'string') && !(value.length === 0 && /^(decisions|links|sections|socials|items|images|cards)$/i.test(label))) {
      return `<label class="cms-field cms-field-wide" for="${id}"><span>${escapeHTML(label)}</span><small>One item per line</small><textarea id="${id}" data-path="${pathAttr}" data-kind="string-array" rows="4">${escapeHTML(value.join('\n'))}</textarea></label>`;
    }
    if (value && typeof value === 'object') {
      return `<label class="cms-field cms-field-wide" for="${id}"><span>${escapeHTML(label)}</span><small>Structured list or object (valid JSON)</small><textarea id="${id}" data-path="${pathAttr}" data-kind="json" rows="6">${escapeHTML(JSON.stringify(value, null, 2))}</textarea></label>`;
    }
    if (typeof value === 'boolean') return `<label class="cms-field cms-check" for="${id}"><input id="${id}" type="checkbox" data-path="${pathAttr}" data-kind="boolean" ${value ? 'checked' : ''}><span>${escapeHTML(label)}</span></label>`;
    const kind = typeof value === 'number' ? 'number' : 'string';
    const multiline = typeof value === 'string' && (value.length > 100 || /description|intro|body|copy|summary|problem|approach|outcome|note|text|message|tagline/i.test(label));
    return `<label class="cms-field ${multiline ? 'cms-field-wide' : ''}" for="${id}"><span>${escapeHTML(label)}</span>${multiline ? `<textarea id="${id}" data-path="${pathAttr}" data-kind="${kind}" rows="4">${escapeHTML(value)}</textarea>` : `<input id="${id}" data-path="${pathAttr}" data-kind="${kind}" value="${escapeHTML(value)}">`}</label>`;
  }
  function flattenFields(value, path = [], label = '') {
    if (Array.isArray(value)) return renderField(label || 'Items', path, value);
    if (value && typeof value === 'object') {
      return Object.entries(value).map(([key, child]) => {
        const next = [...path, key];
        if (child && typeof child === 'object' && !Array.isArray(child)) return `<fieldset class="cms-fieldset"><legend>${escapeHTML(key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' '))}</legend><div class="cms-fields">${flattenFields(child, next, key)}</div></fieldset>`;
        return renderField(key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' '), next, child);
      }).join('');
    }
    return renderField(label, path, value);
  }
  function refreshRecordPicker() {
    const kind = category();
    const selectedSlug = $('#cmsProjectPicker').value;
    $('#cmsProjectPicker').innerHTML = content.projects.map(p => `<option value="${escapeHTML(p.slug)}">${escapeHTML(p.title)}</option>`).join('');
    if (content.projects.some(p => p.slug === selectedSlug)) $('#cmsProjectPicker').value = selectedSlug;
    const recordWrap = $('#recordPickerWrap');
    const projectWrap = $('#projectPickerWrap');
    projectWrap.classList.toggle('hidden', kind !== 'projectSections');
    recordWrap.classList.toggle('hidden', ['site', 'hero'].includes(kind));
    if (kind === 'projectSections') {
      const selected = content.projects.find(p => p.slug === projectSlug());
      $('#cmsRecordPicker').innerHTML = (selected?.sections || []).map((s, i) => `<option value="${i}">${String(i + 1).padStart(2, '0')} · ${escapeHTML(s.title || s.eyebrow || s.type || 'Untitled section')}</option>`).join('') || '<option value="">No sections yet</option>';
    } else if (kind === 'homepageSections') {
      $('#cmsRecordPicker').innerHTML = Object.keys(content.sections || {}).map(key => `<option value="${escapeHTML(key)}">${escapeHTML(key)}</option>`).join('') || '<option value="">No sections yet</option>';
    } else if (Array.isArray(content[kind])) {
      $('#cmsRecordPicker').innerHTML = content[kind].map((item, i) => `<option value="${i}">${String(i + 1).padStart(2, '0')} · ${escapeHTML(item.title || item.label || item.company || item.name || `${kind} item ${i + 1}`)}</option>`).join('') || '<option value="">No items yet</option>';
    }
    const canAdd = !['site', 'hero'].includes(kind);
    $('#addCmsRecord').classList.toggle('hidden', !canAdd);
    $('#deleteCmsRecord').classList.toggle('hidden', !canAdd);
  }
  function renderCmsForm() {
    if (!content) return;
    refreshRecordPicker();
    const target = selectedTarget();
    const form = $('#cmsForm');
    if (!target) { form.innerHTML = '<div class="cms-empty"><h3>No content item selected</h3><p>Create an item or select another content area.</p></div>'; return; }
    form.innerHTML = `<div class="cms-record-heading"><div><p class="eyebrow">EDITING / ${escapeHTML(category())}</p><h3>${escapeHTML(target.label)}</h3></div><span class="cms-record-tag">Visual editor</span></div><div class="cms-fields">${flattenFields(target.value, target.path)}</div>`;
    form.querySelectorAll('[data-path]').forEach(control => control.addEventListener('input', () => {
      dirty = true; setMessage($('#settingsMessage'), 'Unsaved changes', '');
      try {
        const path = JSON.parse(control.dataset.path); const kind = control.dataset.kind;
        let value;
        if (kind === 'boolean') value = control.checked;
        else if (kind === 'number') value = control.value === '' ? 0 : Number(control.value);
        else if (kind === 'string-array') value = control.value.split('\n').map(v => v.trim()).filter(Boolean);
        else if (kind === 'json') value = JSON.parse(control.value);
        else value = control.value;
        setAtPath(content, path, value);
      } catch { /* Keep invalid JSON in the field so the user can correct it before saving. */ }
    }));
  }
  async function loadSettings() {
    $('#cmsForm').innerHTML = '<p class="muted">Loading content from Firebase…</p>';
    try {
      content = await api('/api/admin/settings');
      const projectPicker = $('#cmsProjectPicker');
      projectPicker.innerHTML = content.projects.map(p => `<option value="${escapeHTML(p.slug)}">${escapeHTML(p.title)}</option>`).join('');
      dirty = false; renderCmsForm(); setMessage($('#settingsMessage'), 'Content loaded from Firebase.', 'success');
    } catch (error) { $('#cmsForm').innerHTML = `<p class="form-message error">${escapeHTML(error.message)}</p>`; setMessage($('#settingsMessage'), error.message, 'error'); }
  }
  function applyFormValues() {
    const controls = [...$('#cmsForm').querySelectorAll('[data-path]')];
    for (const control of controls) {
      const path = JSON.parse(control.dataset.path); const kind = control.dataset.kind;
      let value;
      if (kind === 'boolean') value = control.checked;
      else if (kind === 'number') value = control.value === '' ? 0 : Number(control.value);
      else if (kind === 'string-array') value = control.value.split('\n').map(v => v.trim()).filter(Boolean);
      else if (kind === 'json') { try { value = JSON.parse(control.value); } catch { throw new Error(`Invalid JSON in ${path[path.length - 1]}.`); } }
      else value = control.value;
      setAtPath(content, path, value);
    }
  }
  $('#contentType').addEventListener('change', renderCmsForm);
  $('#cmsRecordPicker').addEventListener('change', renderCmsForm);
  $('#cmsProjectPicker').addEventListener('change', renderCmsForm);
  $('#reloadSettings').addEventListener('click', async () => { if (dirty && !confirm('Discard unsaved changes and reload from Firebase?')) return; await loadSettings(); });
  $('#addCmsRecord').addEventListener('click', () => {
    const kind = category();
    if (kind === 'homepageSections') {
      const key = prompt('New homepage section key (e.g. testimonials):'); if (!key) return;
      const safeKey = key.trim().replace(/[^a-zA-Z0-9_-]/g, ''); if (!safeKey || content.sections[safeKey]) return toast('Choose a unique section key.');
      content.sections[safeKey] = { kicker: 'New section', titleLines: ['Section headline'], description: 'Add a description.', items: [] };
    } else if (kind === 'projectSections') {
      const project = content.projects.find(p => p.slug === projectSlug()); if (!project) return toast('Choose a project first.');
      const type = prompt('Section type: text, points, cards, images, links', 'text'); if (!type) return;
      const normalized = ['text', 'points', 'cards', 'images', 'links'].includes(type.trim()) ? type.trim() : 'text';
      const title = prompt('Section title:', 'New case-study section'); if (title === null) return;
      project.sections = project.sections || [];
      const item = { type: normalized, eyebrow: 'Details', title: title.trim() };
      if (normalized === 'text') item.body = 'Add section content.';
      if (normalized === 'points') item.items = ['Add a point'];
      if (normalized === 'cards') item.items = [{ title: 'Card title', body: 'Card description' }];
      if (normalized === 'images') item.items = [{ src: '', alt: '', caption: '' }];
      if (normalized === 'links') item.items = [{ label: 'Production website', url: '' }];
      project.sections.push(item);
    } else if (Array.isArray(content[kind])) {
      const defaults = { navigation: { label: 'New link', href: '#work' }, skills: { name: 'New skill', items: ['Skill one'] }, experience: { role: 'Role title', company: 'Company', period: 'Year', description: 'Describe your work.', points: [] }, projects: { slug: `new-project-${Date.now()}`, title: 'New project', type: 'Web application', status: 'In progress', summary: 'Describe this project.', stack: [], features: [], decisions: [], links: [], sections: [] } };
      content[kind].push(defaults[kind] || { title: 'New item', description: '' });
    }
    dirty = true; renderCmsForm(); setMessage($('#settingsMessage'), 'New item added. Save changes to publish.', '');
  });
  $('#deleteCmsRecord').addEventListener('click', () => {
    const kind = category(); const target = selectedTarget(); if (!target) return toast('Select an item first.');
    if (!confirm(`Delete “${target.label}”? This change is not published until you save.`)) return;
    if (kind === 'homepageSections') delete content.sections[target.key];
    else if (kind === 'projectSections') content.projects.find(p => p.slug === projectSlug()).sections.splice(target.index, 1);
    else if (Array.isArray(content[kind])) content[kind].splice(target.index, 1);
    dirty = true; renderCmsForm(); setMessage($('#settingsMessage'), 'Item deleted locally. Save changes to publish.', '');
  });
  $('#saveSettings').addEventListener('click', async () => {
    const button = $('#saveSettings'); button.disabled = true; button.textContent = 'Saving…';
    try {
      applyFormValues();
      const result = await api('/api/admin/settings', { method: 'PUT', body: JSON.stringify(content) });
      dirty = false; setMessage($('#settingsMessage'), result.message, 'success'); toast('Published to Firebase'); renderCmsForm();
    } catch (error) { setMessage($('#settingsMessage'), error.message, 'error'); }
    finally { button.disabled = false; button.textContent = 'Save changes ↗'; }
  });
  let toastTimer;
  function toast(message) { const element = $('#globalToast'); element.textContent = message; element.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove('show'), 2600); }
  checkSession();
})();
