(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const safeUrl = value => { try { const u = new URL(value, location.origin); return ['http:','https:','mailto:'].includes(u.protocol) ? value : '#'; } catch { return '#'; } };
  let data, lenis, activeProject = null, lastScroll = 0, toastTimer;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  async function init() {
    try {
      const response = await fetch('/api/portfolio', { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Could not load portfolio data');
      data = await response.json();
      renderPortfolio();
      setupNavigation();
      setupMotion();
      setupCursor();
      setupInteractions();
      setupProjectRouting();
      $('#year').textContent = new Date().getFullYear();
    } catch (error) {
      console.error(error);
      document.body.innerHTML = '<main style="padding:10vw;font:16px sans-serif;color:#f1f0e9;background:#10110f;min-height:100vh"><h1>Portfolio could not load</h1><p>Start the Express server with <code>npm install</code> and <code>npm start</code>.</p></main>';
    }
  }

  function renderPortfolio() {
    const { site, navigation, hero, sections, skills, experience, projects } = data;
    document.title = `${site.name} — Developer & Digital Builder`;
    $('#availabilityText').textContent = site.availability;
    $('#navLinks').innerHTML = navigation.map(item => `<a href="${escapeHTML(item.href)}" data-magnetic>${escapeHTML(item.label)} ↘</a>`).join('');
    $('#heroEyebrow').textContent = hero.eyebrow;
    $('#heroTitle').innerHTML = hero.titleLines.map(line => `<span class="title-line"><span class="title-line-inner ${escapeHTML(line.style)}">${escapeHTML(line.text)}</span></span>`).join('');
    $('#heroIntro').innerHTML = `<strong>${escapeHTML(hero.intro.split(' — ')[0])}</strong>${hero.intro.includes(' — ') ? ` — ${escapeHTML(hero.intro.split(' — ').slice(1).join(' — '))}` : ''}`;
    $('#heroAside').innerHTML = `${escapeHTML(site.location)}<br>${hero.focus.map(escapeHTML).join(' · ')}<br>Scroll to explore ↓`;
    $('#tickerTrack').innerHTML = [...hero.ticker, ...hero.ticker].map((label, i) => `<span>${escapeHTML(label)}</span>${i < hero.ticker.length * 2 - 1 ? '<b>✳</b>' : ''}`).join('');
    $('#workKicker').textContent = sections.work.kicker;
    $('#workTitle').innerHTML = sections.work.titleLines.map(escapeHTML).join('<br>');
    $('#workDescription').textContent = sections.work.description;
    $('#projectCount').textContent = `${String(projects.length).padStart(2,'0')} PROJECTS / SELECTED WORK`;
    $('#projectGrid').innerHTML = projects.map(projectCard).join('');
    $('#aboutKicker').textContent = sections.about.kicker;
    $('#aboutTitle').innerHTML = sections.about.titleLines.map(escapeHTML).join('<br>');
    $('#aboutCopy').innerHTML = `${escapeHTML(sections.about.copyBefore)}<em>${escapeHTML(sections.about.copyEmphasis)}</em>${escapeHTML(sections.about.copyAfter)}`;
    $('#aboutNote').textContent = sections.about.note;
    $('#skillList').innerHTML = skills.map((skill, i) => `<div class="skill-row"><span>${escapeHTML(skill.name)}</span><span>${escapeHTML(skill.value)}</span></div>`).join('');
    $('#experienceKicker').textContent = sections.experience.kicker;
    $('#experienceTitle').innerHTML = sections.experience.titleLines.map(escapeHTML).join('<br>');
    $('#experienceDescription').textContent = sections.experience.description;
    $('#experienceList').innerHTML = experience.map(item => `<article class="experience-row reveal"><h3>${escapeHTML(item.role)}</h3><p>${escapeHTML(item.description)}</p><div class="meta">${escapeHTML(item.company)}<br>${escapeHTML(item.period)}</div></article>`).join('');
    $('#contactKicker').textContent = sections.contact.kicker;
    $('#contactTitle').innerHTML = `${escapeHTML(sections.contact.titleLines[0])}<br>${escapeHTML(sections.contact.titleLines[1].replace(/\.$/,''))}<span>.</span>`;
    $('#contactDescription').textContent = sections.contact.description;
    $('#contactLinks').innerHTML = [`<a href="mailto:${escapeHTML(site.email)}">Email ↗</a>`, ...site.socials.map(link => `<a href="${escapeHTML(safeUrl(link.url))}" ${link.external ? 'target="_blank" rel="noreferrer noopener"' : ''}>${escapeHTML(link.label)} ↗</a>`)].join('');
    $('#footerName').textContent = site.name;
    $('#footerTagline').textContent = site.footerTagline;
  }

  function projectCard(project) {
    return `<article class="project reveal" tabindex="0" role="button" aria-label="View case study: ${escapeHTML(project.title)}" data-project="${escapeHTML(project.slug)}" style="--project-accent:${escapeHTML(project.accent)}">
      <div class="project-visual visual-${escapeHTML(project.visual)}">${project.coverImage ? `<img class="project-cover-image" src="${escapeHTML(safeUrl(project.coverImage))}" alt="${escapeHTML(project.title)} preview" loading="lazy">` : projectVisual(project, false)}<span class="visual-number">${escapeHTML(project.number)} — ${String(data.projects.length).padStart(2,'0')}</span></div>
      <div class="project-info"><div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.short)}</p></div><div class="project-meta"><span>${escapeHTML(project.stack[0] || project.type)}</span>${project.stack.slice(1,3).map(escapeHTML).join('<br>')}<br>${escapeHTML(project.status)}</div></div>
    </article>`;
  }

  function projectVisual(project, detailed) {
    const label = `<span class="visual-label">${escapeHTML(project.number)} / ${escapeHTML(project.type)} · ${escapeHTML(project.status)}</span>`;
    if (project.visual === 'dashboard') return `${label}<div class="mock-window"><div class="mock-top"><i></i><i></i><i></i></div><div class="mock-body"><div class="mock-title">Overview / This month</div><div class="mock-card">TOTAL INCOME<strong>₹84,200</strong></div><div class="mock-card">EXPENSES<strong>₹32,450</strong></div><div class="mock-card" style="grid-column:1/-1;height:92px">Cash flow<div class="bars">${[35,58,45,80,65,96,70,87].map(h=>`<i style="height:${h}%"></i>`).join('')}</div></div></div></div>`;
    if (project.visual === 'school') return `${label}<div class="school-ui"><div class="school-head"><span>Campus / Overview</span><span>2026 — 27</span></div><div class="school-columns"><div class="school-side"><span></span><span></span><span></span><span></span><span></span></div><div class="school-content"><i></i><i></i><i></i><b></b></div></div></div>`;
    if (project.visual === 'jobs') return `${label}<div class="job-ui"><div class="job-top"><span>WORK / FIND YOUR NEXT</span><span>⌕</span></div><div class="job-search">Search role, skill, or company...　↗</div><div class="job-row"><div class="job-icon"></div><div>Frontend Engineer<small>Product company · Remote</small></div><span class="job-pill">React</span></div><div class="job-row"><div class="job-icon" style="background:#a7b9ff"></div><div>Software Developer<small>Growing team · Hybrid</small></div><span class="job-pill">TS</span></div><div class="job-row"><div class="job-icon" style="background:#ffb48d"></div><div>UI Engineer<small>Digital product · Remote</small></div><span class="job-pill">UI</span></div></div>`;
    return `${label}<div class="clip-ui"><div class="clip-screen">MAKE IT <span style="color:#d5ff4f;margin-left:6px">MOVE.</span></div><div class="clip-track">${Array.from({length:8},(_,i)=>`<i style="opacity:${i%2?.65:1}"></i>`).join('')}</div><div class="clip-caption">00:12 ━━━━━━━━━━━━━━━━━ 00:38　　9:16</div></div>`;
  }

  function setupNavigation() {
    $('#menuToggle').addEventListener('click', () => $('#navLinks').classList.toggle('is-open'));
    $$('#navLinks a').forEach(link => link.addEventListener('click', () => $('#navLinks').classList.remove('is-open')));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && activeProject) closeProject(); });
  }

  function setupMotion() {
    if (window.gsap && !reducedMotion) {
      gsap.registerPlugin(ScrollTrigger);
      if (window.Lenis) {
        lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1.2 });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(time => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }
      gsap.from('.hero-topline', { y: 20, opacity: 0, duration: .8, ease: 'power3.out', delay: .12 });
      gsap.from('.title-line-inner', { yPercent: 120, rotate: 2, stagger: .13, duration: 1.15, ease: 'power4.out', delay: .15 });
      gsap.from('.hero-bottom > *', { y: 25, opacity: 0, stagger: .14, duration: .9, ease: 'power3.out', delay: .6 });
      gsap.to('.orb', { rotate: 110, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.to('.orb-core', { x: 75, y: 40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
      gsap.from('.hero-object--one', { x: 80, y: 50, rotate: -24, scale: .7, opacity: 0, duration: 1.2, delay: .25, ease: 'power3.out' });
      gsap.from('.hero-object--two', { x: -70, y: -35, rotate: 18, scale: .6, opacity: 0, duration: 1.3, delay: .4, ease: 'power3.out' });
      gsap.utils.toArray('.section-head').forEach((head) => { gsap.from(head.querySelectorAll('.section-kicker, h2, p'), { y: 34, opacity: 0, stagger: .09, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: head, start: 'top 82%', once: true } }); });
      gsap.utils.toArray('.skill-row').forEach((row, i) => gsap.from(row, { x: i % 2 ? 24 : -24, opacity: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 92%', once: true } }));
      gsap.to('.hero-title-wrap', { yPercent: 20, opacity: .35, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.utils.toArray('.reveal').forEach((element, i) => gsap.fromTo(element, { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: .85, delay: (i % 3) * .045, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } }));
      gsap.utils.toArray('.project').forEach((card, i) => {
        gsap.fromTo(card, { y: 55, opacity: 0, rotate: i % 2 ? 1 : -1 }, { y: 0, opacity: 1, rotate: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
        if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) card.addEventListener('mousemove', e => tiltCard(e, card));
        card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: .5, ease: 'power3.out' }));
      });
      gsap.utils.toArray('.experience-row').forEach(row => gsap.from(row, { x: -30, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 90%', once: true } }));
      gsap.to('#scrollProgress', { width: '100%', ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: .15 } });
      gsap.to('.ticker-track', { xPercent: -15, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: .4 } });
      gsap.from('.contact-big', { y: 70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact', start: 'top 75%', once: true } });
    } else {
      $$('.reveal').forEach(el => el.classList.add('visible'));
      const updateProgress = () => { const max = document.documentElement.scrollHeight - innerHeight; $('#scrollProgress').style.width = `${max > 0 ? scrollY / max * 100 : 0}%`; };
      addEventListener('scroll', updateProgress, { passive: true }); updateProgress();
    }
    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reducedMotion) {
      const aura = $('.cursor-aura'); aura.style.opacity = '.9';
      document.addEventListener('mousemove', e => { aura.style.left = `${e.clientX}px`; aura.style.top = `${e.clientY}px`; });
    }
  }

  function setupCursor() {
    const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const cursor = $('.custom-cursor');
    if (!finePointer || reducedMotion || !cursor) return;
    document.body.classList.add('has-custom-cursor');
    const dot = $('.cursor-dot', cursor), ring = $('.cursor-ring', cursor), label = $('.cursor-label', cursor);
    let pointerX = innerWidth / 2, pointerY = innerHeight / 2;
    const move = (event) => {
      pointerX = event.clientX; pointerY = event.clientY;
      if (window.gsap) {
        gsap.to(dot, { x: pointerX, y: pointerY, duration: .08, ease: 'power2.out', overwrite: true });
        gsap.to(ring, { x: pointerX, y: pointerY, duration: .24, ease: 'power3.out', overwrite: true });
      } else { dot.style.transform = `translate(${pointerX}px,${pointerY}px)`; ring.style.transform = `translate(${pointerX}px,${pointerY}px)`; }
      const hero = $('.hero');
      if (hero && window.gsap) {
        const bounds = hero.getBoundingClientRect();
        const nx = (pointerX - bounds.left) / Math.max(bounds.width, 1) - .5;
        const ny = (pointerY - bounds.top) / Math.max(bounds.height, 1) - .5;
        gsap.to('.hero-object--one', { x: nx * 44, y: ny * 32, rotate: nx * 8, duration: .7, ease: 'power3.out', overwrite: true });
        gsap.to('.hero-object--two', { x: nx * -64, y: ny * -42, rotate: ny * -9, duration: .95, ease: 'power3.out', overwrite: true });
      }
    };
    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', event => {
      const target = event.target.closest('a,button,[data-project],.detail-next-wrap');
      cursor.classList.toggle('is-hovering', !!target);
      if (target && target.matches('[data-project]')) label.textContent = 'VIEW';
      else if (target) label.textContent = 'OPEN';
    });
    document.addEventListener('mousedown', () => cursor.classList.add('is-pressed'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-pressed'));
    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));
  }

  function tiltCard(event, card) {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    gsap.to(card, { rotateY: x * 3, rotateX: y * -3, y: -3, transformPerspective: 900, transformOrigin: 'center', duration: .35, ease: 'power2.out' });
  }

  function setupInteractions() {
    $('#projectGrid').addEventListener('click', event => { const card = event.target.closest('[data-project]'); if (card) openProject(card.dataset.project); });
    $('#projectGrid').addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-project]')) { event.preventDefault(); openProject(event.target.dataset.project); } });
    $('#detailClose').addEventListener('click', closeProject);
    $('#detailBack').addEventListener('click', event => { event.preventDefault(); closeProject(); });
    $('#detailNextWrap').addEventListener('click', () => { const next = getNextProject(); if (next) openProject(next.slug, true); });
    $('#detailContent').addEventListener('click', event => { const link = event.target.closest('[data-inert-link]'); if (link) { event.preventDefault(); showToast('Add your live project URL in public/data/portfolio.json'); } });
    document.addEventListener('click', event => { const magnetic = event.target.closest('[data-magnetic]'); if (!magnetic || reducedMotion) return; magnetic.animate([{ transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' }); });
  }

  function setupProjectRouting() {
    addEventListener('hashchange', () => {
      const slug = location.hash.startsWith('#project/') ? decodeURIComponent(location.hash.slice(9)) : null;
      if (slug) openProject(slug, true); else if (activeProject) closeProject(true);
    });
    if (location.hash.startsWith('#project/')) openProject(decodeURIComponent(location.hash.slice(9)), true);
  }

  function openProject(slug, fromRoute = false) {
    const project = data.projects.find(item => item.slug === slug);
    if (!project) return;
    const isSwitch = !!activeProject;
    activeProject = project;
    if (!fromRoute && location.hash !== `#project/${slug}`) history.pushState(null, '', `#project/${slug}`);
    lastScroll = window.scrollY;
    document.body.classList.add('detail-lock');
    const panel = $('#projectDetail');
    panel.scrollTop = 0;
    panel.classList.add('is-open'); panel.setAttribute('aria-hidden', 'false');
    $('#detailCounter').textContent = `${project.number} / ${String(data.projects.length).padStart(2,'0')}`;
    $('#detailContent').innerHTML = renderDetail(project);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    const next = getNextProject();
    $('#detailNextWrap').innerHTML = next ? `<div class="detail-next"><div><small>Up next · ${escapeHTML(next.number)} / ${escapeHTML(next.type)}</small><h3>${escapeHTML(next.title)}</h3></div><span class="detail-next-arrow">↗</span></div>` : `<div class="detail-next"><div><small>That’s the current selection</small><h3>Back to the work.</h3></div><span class="detail-next-arrow">↑</span></div>`;
    if (window.gsap && !reducedMotion) {
      gsap.killTweensOf(panel);
      if (!isSwitch) gsap.fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: .78, ease: 'power4.inOut', onComplete: () => { panel.style.transform = 'translateY(0)'; } });
      else gsap.fromTo('#detailContent', { opacity: .25, y: 18 }, { opacity: 1, y: 0, duration: .45, ease: 'power3.out' });
      gsap.fromTo('#detailContent .detail-reveal', { y: 35, opacity: 0 }, { y: 0, opacity: 1, stagger: .07, duration: .7, ease: 'power3.out', delay: isSwitch ? 0 : .28 });
    } else { panel.style.transform = 'translateY(0)'; }
    $('#detailClose').focus({ preventScroll: true });
  }

  function renderDetail(project) {
    const productionUrl = project.productionUrl && safeUrl(project.productionUrl) !== '#' ? safeUrl(project.productionUrl) : '';
    const standardSections = Array.isArray(project.sections) ? project.sections.map((section, index) => renderProjectSection(section, index)).join('') : '';
    const links = (project.links || []).filter(link => link.url && link.url !== '#').map(link => `<a class="detail-action" href="${escapeHTML(safeUrl(link.url))}" ${String(link.url).startsWith('http') ? 'target="_blank" rel="noreferrer noopener"' : ''}>${escapeHTML(link.label)} ↗</a>`).join('');
    return `<div class="detail-heading-meta detail-reveal"><span class="mono">${escapeHTML(project.number)} / ${escapeHTML(project.type)}</span><span class="mono">${escapeHTML(project.status)} · CASE STUDY</span></div>
      <h1 class="detail-title detail-reveal">${escapeHTML(project.title)}</h1>
      <p class="detail-summary detail-reveal">${escapeHTML(project.summary)}</p><div class="detail-stack detail-reveal">${(project.stack || []).map(tag=>`<span>${escapeHTML(tag)}</span>`).join('')}</div>
      ${project.coverImage ? `<div class="detail-hero-visual detail-reveal detail-image-wrap"><img src="${escapeHTML(safeUrl(project.coverImage))}" alt="${escapeHTML(project.title)} project preview"></div>` : `<div class="detail-hero-visual detail-reveal" style="--project-accent:${escapeHTML(project.accent)}">${projectVisual(project,true)}</div>`}
      <div class="detail-body-grid"><div>${standardSections || `<section class="detail-section detail-reveal"><div class="section-kicker">01 / The challenge</div><h3>The problem worth solving.</h3><p>${escapeHTML(project.problem || '')}</p></section><section class="detail-section detail-reveal"><div class="section-kicker">02 / Key features</div><h3>Built around real workflows.</h3><ul class="detail-feature-list">${(project.features || []).map(feature=>`<li>${escapeHTML(feature)}</li>`).join('')}</ul></section>`}</div>
      <aside class="detail-facts detail-reveal"><div class="detail-fact"><span>My role</span><strong>${escapeHTML(project.role || 'Product development')}</strong></div><div class="detail-fact"><span>Timeline</span><strong>${escapeHTML(project.duration || 'In progress')}</strong></div><div class="detail-fact"><span>Project status</span><strong>${escapeHTML(project.status || 'In progress')}</strong></div><div class="detail-fact"><span>Core stack</span><strong>${escapeHTML((project.stack || []).join(' · '))}</strong></div><div class="detail-actions">${productionUrl ? `<a class="detail-action detail-action--primary" href="${escapeHTML(productionUrl)}" target="_blank" rel="noreferrer noopener">View live product ↗</a>` : ''}${links}</div></aside></div>`;
  }

  function renderProjectSection(section, index) {
    if (!section || !section.type) return '';
    const eyebrow = escapeHTML(section.eyebrow || `Section ${String(index + 1).padStart(2,'0')}`);
    const title = escapeHTML(section.title || '');
    const intro = section.body ? `<p>${escapeHTML(section.body)}</p>` : '';
    const heading = `<div class="section-kicker">${String(index + 1).padStart(2,'0')} / ${eyebrow}</div>${title ? `<h3>${title}</h3>` : ''}`;
    if (section.type === 'text') return `<section class="detail-section detail-reveal dynamic-section dynamic-section--text">${heading}${intro}</section>`;
    if (section.type === 'points') return `<section class="detail-section detail-reveal dynamic-section dynamic-section--points">${heading}${intro}<ul class="detail-feature-list">${(section.items || []).map(item=>`<li>${escapeHTML(item)}</li>`).join('')}</ul></section>`;
    if (section.type === 'cards') return `<section class="detail-section detail-reveal dynamic-section dynamic-section--cards">${heading}${intro}<div class="dynamic-card-grid">${(section.items || []).map((item,i)=>`<article class="decision-card"><span class="mono">${String(i+1).padStart(2,'0')} / NOTE</span><h4>${escapeHTML(item.title || '')}</h4><p>${escapeHTML(item.body || item.text || '')}</p></article>`).join('')}</div></section>`;
    if (section.type === 'images') return `<section class="detail-section detail-reveal dynamic-section dynamic-section--images">${heading}${intro}<div class="dynamic-image-grid">${(section.items || []).map(item=>`<figure><img loading="lazy" src="${escapeHTML(safeUrl(item.src || ''))}" alt="${escapeHTML(item.alt || item.caption || title)}">${item.caption ? `<figcaption>${escapeHTML(item.caption)}</figcaption>` : ''}</figure>`).join('')}</div></section>`;
    if (section.type === 'links') return `<section class="detail-section detail-reveal dynamic-section dynamic-section--links">${heading}${intro}<div class="detail-actions">${(section.items || []).map(item=>`<a class="detail-action" href="${escapeHTML(safeUrl(item.url || '#'))}" ${String(item.url || '').startsWith('http') ? 'target="_blank" rel="noreferrer noopener"' : ''}>${escapeHTML(item.label || 'Open link')} ↗</a>`).join('')}</div></section>`;
    return '';
  }

  function getNextProject() {
    if (!activeProject) return data?.projects?.[0];
    const index = data.projects.findIndex(item => item.slug === activeProject.slug);
    return data.projects[(index + 1) % data.projects.length];
  }

  function closeProject(fromRoute = false) {
    if (!activeProject) return;
    const panel = $('#projectDetail');
    activeProject = null;
    if (!fromRoute && location.hash.startsWith('#project/')) history.pushState(null, '', '#work');
    if (window.gsap && !reducedMotion) {
      gsap.to(panel, { yPercent: 100, duration: .62, ease: 'power3.inOut', onComplete: () => finishClose(panel) });
    } else finishClose(panel);
  }
  function finishClose(panel) {
    panel.classList.remove('is-open'); panel.setAttribute('aria-hidden', 'true'); panel.style.transform = ''; document.body.classList.remove('detail-lock');
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2800); }
  init();
})();
