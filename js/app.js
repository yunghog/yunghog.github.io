(() => {
  "use strict";
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escapeHTML = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (ch) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[ch],
    );
  const safeUrl = (value) => {
    try {
      const u = new URL(value, location.origin);
      return ["http:", "https:", "mailto:"].includes(u.protocol) ? value : "#";
    } catch {
      return "#";
    }
  };
  let data,
    lenis,
    activeProject = null,
    lastScroll = 0,
    toastTimer,
    firebaseAnalytics = null;
  const trackedEvents = new Set();

  async function initAnalytics() {
    try {
      const response = await fetch("https://yunghog.onrender.com/api/config", {
        cache: "no-store",
      });
      const config = await response.json();
      const firebaseConfig = config.firebase || {};
      if (
        !firebaseConfig.apiKey ||
        !firebaseConfig.projectId ||
        !firebaseConfig.appId ||
        !window.firebase ||
        !firebase.analytics
      ) {
        console.info(
          "Firebase Analytics is not configured. Set FIREBASE_* environment variables to enable event tracking.",
        );
        return;
      }
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      firebaseAnalytics = firebase.analytics();
      trackEvent("portfolio_page_view", { page_path: location.pathname });
    } catch (error) {
      console.warn("Firebase Analytics initialization skipped:", error.message);
    }
  }

  function trackEvent(name, params = {}) {
    if (!firebaseAnalytics || typeof firebaseAnalytics.logEvent !== "function")
      return;
    try {
      firebaseAnalytics.logEvent(name, params);
    } catch (error) {
      console.warn("Analytics event failed:", error.message);
    }
  }
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  async function init() {
    const finishLoading = startLoadingAnimation();
    initAnalytics();
    try {
      const response = await fetch(
        "https://yunghog.onrender.com/api/portfolio",
        {
          headers: { Accept: "application/json" },
        },
      );
      if (!response.ok) throw new Error("Could not load portfolio data");
      data = await response.json();
      renderPortfolio();
      setupNavigation();
      setupMotion();
      setupContactTitleReveal();
      setupHeroObjectParallax();
      setupCursor();
      setupInteractions();
      setupProjectRouting();
      setupContactForm();
      $("#year").textContent = new Date().getFullYear();
      finishLoading();
    } catch (error) {
      console.error(error);
      finishLoading();
      document.body.innerHTML =
        '<main style="padding:10vw;font:16px sans-serif;color:#f1f0e9;background:#10110f;min-height:100vh"><h1>Portfolio could not load</h1><p>Start the Express server with <code>npm install</code> and <code>npm start</code>.</p></main>';
    }
  }

  function startLoadingAnimation() {
    const loader = $("#siteLoader");
    const progressBar = $("#loaderProgress");
    const progressTrack = $(".loader-track", loader || document);
    const progressLabel = $("#loaderPercent");
    if (!loader || !progressBar || !progressTrack || !progressLabel) return;

    document.body.classList.add("is-loading");
    loader.classList.add("is-loading");
    progressLabel.textContent = "WAIT";
    progressTrack.removeAttribute("aria-valuenow");

    return () => {
      loader.classList.remove("is-loading");
      loader.classList.add("is-done");
      loader.setAttribute("aria-hidden", "true");
      loader.inert = true;
      document.body.classList.remove("is-loading");
      window.setTimeout(() => loader.remove(), 1050);
    };
  }

  function renderPortfolio() {
    const { site, navigation, hero, sections, skills, experience } = data;
    const visibleProjects = getVisibleProjects();
    document.title = `${site.name} — Developer & Digital Builder`;
    updateSeoMetadata({
      title: document.title,
      description: hero.intro || sections.work.description,
      type: "website",
    });
    $("#availabilityText").textContent = site.availability;
    $("#navLinks").innerHTML = navigation
      .map(
        (item) =>
          `<a href="${escapeHTML(item.href)}" data-magnetic>${escapeHTML(item.label)} ↘</a>`,
      )
      .join("");
    $("#heroEyebrow").textContent = hero.eyebrow;
    $("#heroTitle").innerHTML = hero.titleLines
      .map(
        (line) =>
          `<span class="title-line"><span class="title-line-inner ${escapeHTML(line.style)}">${escapeHTML(line.text)}</span></span>`,
      )
      .join("");
    $("#heroIntro").innerHTML =
      `<strong>${escapeHTML(hero.intro.split(" — ")[0])}</strong>${hero.intro.includes(" — ") ? ` — ${escapeHTML(hero.intro.split(" — ").slice(1).join(" — "))}` : ""}`;
    $("#heroAside").innerHTML =
      `${escapeHTML(site.location)}<br>${hero.focus.map(escapeHTML).join(" · ")}<br>Scroll to explore ↓`;
    $("#tickerTrack").innerHTML = [...hero.ticker, ...hero.ticker]
      .map(
        (label, i) =>
          `<span>${escapeHTML(label)}</span>${i < hero.ticker.length * 2 - 1 ? "<b>✳</b>" : ""}`,
      )
      .join("");
    $("#workKicker").textContent = sections.work.kicker;
    $("#workTitle").innerHTML = sections.work.titleLines
      .map(escapeHTML)
      .join("<br>");
    $("#workDescription").textContent = sections.work.description;
    $("#projectCount").textContent =
      `${String(visibleProjects.length).padStart(2, "0")} PROJECTS / SELECTED WORK`;
    $("#projectGrid").innerHTML = visibleProjects
      .map((project, index) =>
        projectCard(project, index, visibleProjects.length),
      )
      .join("");
    $("#aboutKicker").textContent = sections.about.kicker;
    $("#aboutTitle").innerHTML = sections.about.titleLines
      .map(escapeHTML)
      .join("<br>");
    $("#aboutCopy").innerHTML =
      `${escapeHTML(sections.about.copyBefore)}<em>${escapeHTML(sections.about.copyEmphasis)}</em>${escapeHTML(sections.about.copyAfter)}`;
    $("#aboutNote").textContent = sections.about.note;
    $("#skillList").innerHTML = skills
      .map(
        (skill, i) =>
          `<div class="skill-row"><span>${escapeHTML(skill.name)}</span><span>${escapeHTML(skill.value)}</span></div>`,
      )
      .join("");
    $("#experienceKicker").textContent = sections.experience.kicker;
    $("#experienceTitle").innerHTML = sections.experience.titleLines
      .map(escapeHTML)
      .join("<br>");
    $("#experienceDescription").textContent = sections.experience.description;
    $("#experienceList").innerHTML = experience
      .map(
        (item) =>
          `<article class="experience-row reveal"><h3>${escapeHTML(item.role)}</h3><p>${escapeHTML(item.description)}</p><div class="meta">${escapeHTML(item.company)}<br>${escapeHTML(item.period)}</div></article>`,
      )
      .join("");
    const fixedSectionKeys = new Set([
      "work",
      "about",
      "experience",
      "contact",
    ]);
    const customSections = Object.entries(sections).filter(
      ([key]) => !fixedSectionKeys.has(key),
    );
    $("#dynamicSections").innerHTML = customSections
      .map(([key, section], index) => {
        const title = Array.isArray(section.titleLines)
          ? section.titleLines.map(escapeHTML).join("<br>")
          : escapeHTML(section.title || key);
        const description = section.description || section.body || "";
        const items = Array.isArray(section.items) ? section.items : [];
        const cards = items
          .map((item) => {
            if (typeof item === "string")
              return `<article class="custom-content-card reveal"><p>${escapeHTML(item)}</p></article>`;
            return `<article class="custom-content-card reveal"><h3>${escapeHTML(item.title || item.label || "")}</h3><p>${escapeHTML(item.body || item.description || item.text || "")}</p>${item.image ? `<img src="${escapeHTML(safeUrl(item.image))}" alt="${escapeHTML(item.alt || item.title || "")}" loading="lazy">` : ""}${item.url ? `<a class="text-link" href="${escapeHTML(safeUrl(item.url))}" target="_blank" rel="noreferrer noopener">${escapeHTML(item.linkLabel || "Learn more")} ↗</a>` : ""}</article>`;
          })
          .join("");
        return `<section class="custom-content-section" id="${escapeHTML(key)}"><div class="section-head reveal"><div><div class="section-kicker">${escapeHTML(section.kicker || `0${index + 5} / ${key}`)}</div><h2>${title}</h2></div>${description ? `<p>${escapeHTML(description)}</p>` : ""}</div>${section.copy ? `<p class="custom-content-copy reveal">${escapeHTML(section.copy)}</p>` : ""}${cards ? `<div class="custom-content-grid">${cards}</div>` : ""}</section>`;
      })
      .join("");
    $("#contactKicker").textContent = sections.contact.kicker;
    $("#contactTitle").innerHTML =
      `${escapeHTML(sections.contact.titleLines[0])}<br>${escapeHTML(sections.contact.titleLines[1].replace(/\.$/, ""))}<span>.</span>`;
    $("#contactDescription").textContent = sections.contact.description;
    $("#contactLinks").innerHTML = [
      `<a href="mailto:${escapeHTML(site.email)}">Email ↗</a>`,
      ...site.socials.map(
        (link) =>
          `<a href="${escapeHTML(safeUrl(link.url))}" ${link.external ? 'target="_blank" rel="noreferrer noopener"' : ""}>${escapeHTML(link.label)} ↗</a>`,
      ),
    ].join("");
    $("#footerName").textContent = site.name;
    $("#footerTagline").textContent = site.footerTagline;
    $("#sharePortfolio")?.addEventListener("click", () => sharePage());
    $("#shareProject")?.addEventListener("click", () =>
      sharePage(activeProject),
    );
  }

  function updateSeoMetadata({
    title,
    description,
    type = "website",
    image,
  } = {}) {
    const site = data?.site || {};
    const pageTitle =
      title || `${site.name || "Portfolio"} — Developer & Digital Builder`;
    const pageDescription =
      description ||
      data?.hero?.intro ||
      "Thoughtful digital products and useful software.";
    const canonicalUrl = `${location.origin}${location.pathname}`;
    const shareUrl = location.href;
    document.title = pageTitle;

    const setMeta = (selector, attribute, key, value) => {
      let element = $(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = value;
    };
    setMeta('meta[name="description"]', "name", "description", pageDescription);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      pageDescription,
    );
    setMeta('meta[property="og:url"]', "property", "og:url", shareUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      pageDescription,
    );
    if (image && safeUrl(image) !== "#") {
      setMeta(
        'meta[property="og:image"]',
        "property",
        "og:image",
        new URL(image, location.href).href,
      );
      setMeta(
        'meta[name="twitter:card"]',
        "name",
        "twitter:card",
        "summary_large_image",
      );
      setMeta(
        'meta[name="twitter:image"]',
        "name",
        "twitter:image",
        new URL(image, location.href).href,
      );
    } else {
      $('meta[property="og:image"]')?.remove();
      $('meta[name="twitter:image"]')?.remove();
      setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary");
    }
    let canonical = $('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    const structuredData = $("#siteStructuredData");
    if (structuredData) {
      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name || "Portfolio",
        jobTitle: data?.hero?.eyebrow || "Frontend developer",
        description: pageDescription,
        url: canonicalUrl,
        sameAs: (site.socials || [])
          .map((social) => social.url)
          .filter((url) => {
            if (!url || safeUrl(url) === "#") return false;
            try {
              return new URL(url, location.origin).pathname !== "/";
            } catch {
              return false;
            }
          }),
      });
    }
  }

  async function sharePage(project = null) {
    const siteName = data?.site?.name || "Portfolio";
    const shareUrl = new URL(location.href);
    if (project) shareUrl.hash = `project/${encodeURIComponent(project.slug)}`;
    const shareData = {
      title: project ? `${project.title} — ${siteName}` : document.title,
      text: project?.summary || data?.hero?.intro || "Explore this portfolio.",
      url: shareUrl.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
    } catch {
      const input = document.createElement("textarea");
      input.value = shareData.url;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    showToast("Share link copied to clipboard");
  }

  function projectNumber(project, index) {
    return project.number || String(index + 1).padStart(2, "0");
  }

  function getVisibleProjects() {
    return (Array.isArray(data?.projects) ? data.projects : []).filter(
      (project) =>
        project != null && (project.active == null || project.active === true),
    );
  }

  function projectAccent(project) {
    return /^#[\da-f]{6}$/i.test(project.accent || "")
      ? project.accent
      : "#d5ff4f";
  }

  function projectCard(project, index, total) {
    const stack = Array.isArray(project.stack) ? project.stack : [];
    const number = projectNumber(project, index);
    const image =
      project.coverImage && safeUrl(project.coverImage) !== "#"
        ? `<img class="project-cover-image" src="${escapeHTML(safeUrl(project.coverImage))}" alt="${escapeHTML(project.title || "Project")} preview" loading="lazy">`
        : projectVisual(project);
    const meta = stack.slice(0, 3).map(escapeHTML);
    if (!meta.length && project.type) meta.push(escapeHTML(project.type));
    return `<article class="project reveal" tabindex="0" role="button" aria-label="View case study: ${escapeHTML(project.title || "Project")}" data-project="${escapeHTML(project.slug)}" style="--project-accent:${projectAccent(project)}">
      <div class="project-visual">${image}<span class="visual-number">${escapeHTML(number)} — ${String(total).padStart(2, "0")}</span></div>
      <div class="project-info"><div><h3>${escapeHTML(project.title || "Untitled project")}</h3><p>${escapeHTML(project.short || project.summary || "")}</p></div><div class="project-meta">${meta.length ? `<span>${meta.join("<br>")}</span>` : ""}${project.status ? escapeHTML(project.status) : ""}</div></div>
    </article>`;
  }

  function projectVisual(project) {
    const stack = (Array.isArray(project.stack) ? project.stack : []).slice(
      0,
      3,
    );
    return `<div class="project-preview"><span class="project-preview-type">${escapeHTML(project.type || "Project")}</span><div class="project-preview-title">${escapeHTML(project.title || "Untitled project")}</div>${stack.length ? `<div class="project-preview-stack">${stack.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>` : ""}</div>`;
  }

  function setupNavigation() {
    $("#menuToggle").addEventListener("click", () =>
      $("#navLinks").classList.toggle("is-open"),
    );
    $$("#navLinks a").forEach((link) =>
      link.addEventListener("click", () => {
        $("#navLinks").classList.remove("is-open");
        trackEvent("section_click", {
          section_name:
            link.getAttribute("href")?.replace(/^#/, "") || "unknown",
          section_label: link.textContent.trim(),
        });
      }),
    );
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && activeProject) closeProject();
    });
  }

  function setupMotion() {
    if (window.gsap && !reducedMotion) {
      gsap.registerPlugin(ScrollTrigger);
      if (window.Lenis) {
        lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.2,
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }
      gsap.from(".hero-topline", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.12,
      });
      gsap.from(".title-line-inner", {
        yPercent: 120,
        rotate: 2,
        stagger: 0.13,
        duration: 1.15,
        ease: "power4.out",
        delay: 0.15,
      });
      gsap.from(".hero-bottom > *", {
        y: 25,
        opacity: 0,
        stagger: 0.14,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.to(".orb", {
        rotate: 110,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".orb-core", {
        x: 75,
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.from(".hero-object--one", {
        x: 80,
        y: 50,
        rotate: -24,
        scale: 0.7,
        opacity: 0.45,
        duration: 1.2,
        delay: 0.25,
        ease: "power3.out",
      });
      gsap.from(".hero-object--two", {
        x: -70,
        y: -35,
        rotate: 18,
        scale: 0.6,
        opacity: 0.45,
        duration: 1.3,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.utils.toArray(".section-head").forEach((head) => {
        gsap.from(head.querySelectorAll(".section-kicker, h2, p"), {
          y: 34,
          opacity: 0,
          stagger: 0.09,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: head, start: "top 82%", once: true },
        });
      });
      gsap.utils.toArray(".skill-row").forEach((row, i) =>
        gsap.from(row, {
          x: i % 2 ? 24 : -24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
        }),
      );
      gsap.to(".hero-title-wrap", {
        yPercent: 20,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.utils.toArray(".reveal").forEach((element, i) =>
        gsap.fromTo(
          element,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            delay: (i % 3) * 0.045,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        ),
      );
      gsap.utils.toArray(".project").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 55, opacity: 0, rotate: i % 2 ? 1 : -1 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          },
        );
        if (window.matchMedia("(hover:hover) and (pointer:fine)").matches)
          card.addEventListener("mousemove", (e) => tiltCard(e, card));
        card.addEventListener("mouseleave", () =>
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          }),
        );
      });
      gsap.utils.toArray(".experience-row").forEach((row) =>
        gsap.from(row, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        }),
      );
      gsap.to("#scrollProgress", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      });
      gsap.to(".ticker-track", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ".ticker",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    } else {
      $$(".reveal").forEach((el) => el.classList.add("visible"));
      const updateProgress = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        $("#scrollProgress").style.width =
          `${max > 0 ? (scrollY / max) * 100 : 0}%`;
      };
      addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
    }
    if (
      window.matchMedia("(hover:hover) and (pointer:fine)").matches &&
      !reducedMotion
    ) {
      const aura = $(".cursor-aura");
      aura.style.opacity = ".9";
      document.addEventListener("mousemove", (e) => {
        aura.style.left = `${e.clientX}px`;
        aura.style.top = `${e.clientY}px`;
      });
    }
  }

  function setupContactTitleReveal() {
    const title = $("#contactTitle");
    if (!title) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      title.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        title.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(title);
  }

  function setupCursor() {
    const finePointer = window.matchMedia(
      "(hover:hover) and (pointer:fine)",
    ).matches;
    const cursor = $(".custom-cursor");
    if (!finePointer || reducedMotion || !cursor) return;
    document.body.classList.add("has-custom-cursor");
    const dot = $(".cursor-dot", cursor),
      ring = $(".cursor-ring", cursor),
      innerring = $(".cursor-inner-ring", cursor),
      label = $(".cursor-label", cursor);
    let pointerX = innerWidth / 2,
      pointerY = innerHeight / 2;
    const move = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (window.gsap) {
        gsap.to(dot, {
          x: pointerX,
          y: pointerY,
          duration: 0.08,
          ease: "power2.out",
          overwrite: true,
        });
        gsap.to(ring, {
          x: pointerX,
          y: pointerY,
          duration: 0.24,
          ease: "power3.out",
          overwrite: true,
        });
        gsap.to(innerring, {
          x: pointerX,
          y: pointerY,
          duration: 0.14,
          ease: "power3.out",
          overwrite: true,
        });
      } else {
        dot.style.transform = `translate(${pointerX}px,${pointerY}px)`;
        ring.style.transform = `translate(${pointerX}px,${pointerY}px)`;
      }
    };
    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", (event) => {
      const target = event.target.closest(
        "a,button,[data-project],.detail-next-wrap",
      );
      cursor.classList.toggle("is-hovering", !!target);
      if (target && target.matches("[data-project]"))
        label.textContent = "VIEW";
      else if (target) label.textContent = "OPEN";
    });
    document.addEventListener("mousedown", () =>
      cursor.classList.add("is-pressed"),
    );
    document.addEventListener("mouseup", () =>
      cursor.classList.remove("is-pressed"),
    );
    document.addEventListener("mouseleave", () =>
      cursor.classList.add("is-hidden"),
    );
    document.addEventListener("mouseenter", () =>
      cursor.classList.remove("is-hidden"),
    );
  }

  function setupHeroObjectParallax() {
    const hero = $(".hero");
    const objects = [$(".hero-object--one"), $(".hero-object--two")];
    if (!hero || objects.some((object) => !object)) return;
    if (
      !window.matchMedia("(hover:hover) and (pointer:fine)").matches ||
      reducedMotion
    )
      return;

    const move = (event) => {
      const bounds = hero.getBoundingClientRect();
      const nx =
        (event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5;
      const ny =
        (event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5;
      const motion = [
        { x: nx * 44, y: ny * 32, rotate: nx * 8, duration: 0.7 },
        { x: nx * -64, y: ny * -42, rotate: ny * -9, duration: 0.95 },
      ];
      objects.forEach((object, index) => {
        const values = motion[index];
        if (window.gsap) {
          gsap.to(object, { ...values, ease: "power3.out", overwrite: true });
        } else {
          object.style.transform = `translate3d(${values.x}px,${values.y}px,0) rotate(${values.rotate}deg)`;
        }
      });
    };
    const reset = () => {
      objects.forEach((object) => {
        if (window.gsap) {
          gsap.to(object, {
            x: 0,
            y: 0,
            rotate: 0,
            duration: 0.7,
            ease: "power3.out",
            overwrite: true,
          });
        } else {
          object.style.transform = "";
        }
      });
    };
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset, { passive: true });
  }

  function tiltCard(event, card) {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 3,
      rotateX: y * -3,
      y: -3,
      transformPerspective: 900,
      transformOrigin: "center",
      duration: 0.35,
      ease: "power2.out",
    });
  }

  function setupInteractions() {
    $("#projectGrid").addEventListener("click", (event) => {
      const card = event.target.closest("[data-project]");
      if (card) openProject(card.dataset.project);
    });
    $("#projectGrid").addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        event.target.matches("[data-project]")
      ) {
        event.preventDefault();
        openProject(event.target.dataset.project);
      }
    });
    $("#detailClose").addEventListener("click", closeProject);
    $("#detailBack").addEventListener("click", (event) => {
      event.preventDefault();
      closeProject();
    });
    $("#detailNextWrap").addEventListener("click", () => {
      const next = getNextProject();
      if (next) openProject(next.slug, true);
    });
    $("#detailContent").addEventListener("click", (event) => {
      if (event.target.matches(".gallery-viewer")) {
        event.target.close();
        return;
      }
      const galleryControl = event.target.closest("[data-gallery-action]");
      if (galleryControl) {
        handleGalleryAction(galleryControl);
        return;
      }
      const link = event.target.closest("[data-inert-link]");
      if (link) {
        event.preventDefault();
        showToast("Add your live project URL in the admin CMS");
      }
    });
    $("#detailContent").addEventListener("keydown", (event) => {
      const dialog = event.target.closest(".gallery-viewer");
      if (!dialog) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const gallery = dialog.closest("[data-gallery]");
        const current = Number(dialog.dataset.currentIndex || 0);
        updateGalleryViewer(
          gallery,
          current + (event.key === "ArrowRight" ? 1 : -1),
        );
      }
    });
    document.addEventListener("click", (event) => {
      const magnetic = event.target.closest("[data-magnetic]");
      if (!magnetic || reducedMotion) return;
      magnetic.animate(
        [{ transform: "scale(.97)" }, { transform: "scale(1)" }],
        { duration: 260, easing: "cubic-bezier(.22,1,.36,1)" },
      );
    });
  }

  function handleGalleryAction(control) {
    const gallery = control.closest("[data-gallery]");
    if (!gallery) return;
    const action = control.dataset.galleryAction;
    const track = gallery.querySelector("[data-gallery-track]");
    if (action === "scroll-prev" || action === "scroll-next") {
      const direction = action === "scroll-next" ? 1 : -1;
      track.scrollBy({
        left: direction * Math.max(track.clientWidth * 0.82, 280),
        behavior: reducedMotion ? "auto" : "smooth",
      });
      return;
    }
    if (action === "open") {
      const dialog = gallery.querySelector(".gallery-viewer");
      updateGalleryViewer(gallery, Number(control.dataset.galleryIndex || 0));
      if (!dialog.open) {
        const customCursor = $(".custom-cursor");
        if (customCursor && !dialog.contains(customCursor)) {
          dialog.append(customCursor);
          dialog.addEventListener(
            "close",
            () => document.body.append(customCursor),
            { once: true },
          );
        }
        dialog.showModal();
      }
      dialog.querySelector("[data-gallery-action='close']").focus();
      return;
    }
    if (action === "close") {
      gallery.querySelector(".gallery-viewer")?.close();
      return;
    }
    if (action === "viewer-prev" || action === "viewer-next") {
      const dialog = gallery.querySelector(".gallery-viewer");
      const current = Number(dialog.dataset.currentIndex || 0);
      updateGalleryViewer(
        gallery,
        current + (action === "viewer-next" ? 1 : -1),
      );
    }
  }

  function updateGalleryViewer(gallery, index) {
    const dialog = gallery?.querySelector(".gallery-viewer");
    const cards = [...(gallery?.querySelectorAll("[data-gallery-open]") || [])];
    if (!dialog || !cards.length) return;
    const current = Math.max(0, Math.min(index, cards.length - 1));
    const item = cards[current];
    dialog.dataset.currentIndex = String(current);
    const viewerImage = dialog.querySelector("[data-viewer-image]");
    viewerImage.loading = "eager";
    viewerImage.decoding = "async";
    const imageError = dialog.querySelector("[data-viewer-error]");
    if (imageError) imageError.hidden = true;
    viewerImage.onerror = () => {
      if (imageError) imageError.hidden = false;
    };
    viewerImage.src = item.dataset.imageSrc;
    viewerImage.alt = item.dataset.imageAlt || "";
    if (!reducedMotion && viewerImage.animate) {
      viewerImage.animate(
        [
          { opacity: 0.45, transform: "translateX(12px) scale(.99)" },
          { opacity: 1, transform: "translateX(0) scale(1)" },
        ],
        { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" },
      );
    }
    dialog.querySelector("[data-viewer-caption]").textContent =
      item.dataset.imageCaption ||
      item.dataset.imageAlt ||
      `Image ${current + 1}`;
    const details = dialog.querySelector("[data-viewer-details]");
    details.textContent = item.dataset.imageDetails || "";
    details.hidden = !details.textContent;
    dialog.querySelector("[data-viewer-count]").textContent =
      `${String(current + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    dialog.querySelector("[data-gallery-action='viewer-prev']").disabled =
      current === 0;
    dialog.querySelector("[data-gallery-action='viewer-next']").disabled =
      current === cards.length - 1;
  }

  function setupProjectRouting() {
    addEventListener("hashchange", () => {
      const slug = location.hash.startsWith("#project/")
        ? decodeURIComponent(location.hash.slice(9))
        : null;
      if (slug) openProject(slug, true);
      else if (activeProject) closeProject(true);
    });
    if (location.hash.startsWith("#project/"))
      openProject(decodeURIComponent(location.hash.slice(9)), true);
  }

  function openProject(slug, fromRoute = false) {
    const project = getVisibleProjects().find((item) => item.slug === slug);
    if (!project) return;
    trackEvent("project_click", {
      project_slug: project.slug,
      project_title: project.title,
      project_type: project.type || "unspecified",
    });
    const isSwitch = !!activeProject;
    activeProject = project;
    if (!fromRoute && location.hash !== `#project/${slug}`)
      history.pushState(null, "", `#project/${slug}`);
    updateSeoMetadata({
      title: `${project.title || "Project"} — ${data?.site?.name || "Portfolio"}`,
      description: project.summary || project.short || project.problem,
      type: "article",
      image: project.coverImage,
    });
    lastScroll = window.scrollY;
    document.body.classList.add("detail-lock");
    const panel = $("#projectDetail");
    panel.scrollTop = 0;
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    const projectIndex = getVisibleProjects().findIndex(
      (item) => item.slug === project.slug,
    );
    const number = projectNumber(project, Math.max(projectIndex, 0));
    $("#detailCounter").textContent =
      `${number} / ${String(getVisibleProjects().length).padStart(2, "0")}`;
    if (window.ScrollTrigger) {
      ScrollTrigger.getAll()
        .filter((trigger) => $("#detailContent").contains(trigger.trigger))
        .forEach((trigger) => trigger.kill());
    }
    $("#detailContent").innerHTML = renderDetail(project);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    const next = getNextProject();
    const visibleProjects = getVisibleProjects();
    $("#detailNextWrap").innerHTML = next
      ? `<div class="detail-next"><div><small>Up next · ${escapeHTML(next.number || projectNumber(next, visibleProjects.indexOf(next)))} / ${String(visibleProjects.length).padStart(2, "0")} · ${escapeHTML(next.type || next.status || "Project")}</small><h3>${escapeHTML(next.title || "Untitled project")}</h3></div><span class="detail-next-arrow">↗</span></div>`
      : `<div class="detail-next"><div><small>That’s the current selection</small><h3>Back to the work.</h3></div><span class="detail-next-arrow">↑</span></div>`;
    if (window.gsap && !reducedMotion) {
      gsap.killTweensOf(panel);
      if (!isSwitch)
        gsap.fromTo(
          panel,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.78,
            ease: "power4.inOut",
            onComplete: () => {
              panel.style.transform = "translateY(0)";
              if (window.ScrollTrigger) ScrollTrigger.refresh();
            },
          },
        );
      else
        gsap.fromTo(
          "#detailContent",
          { opacity: 0.25, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        );
      gsap.fromTo(
        "#detailContent .detail-reveal",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          delay: isSwitch ? 0 : 0.28,
        },
      );
      gsap.utils
        .toArray("#detailContent img.detail-image-reveal")
        .forEach((image) => {
          gsap.fromTo(
            image,
            { autoAlpha: 0, scale: 0.92, y: 28 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                scroller: panel,
                start: "top 84%",
                once: true,
              },
            },
          );
        });
    } else {
      panel.style.transform = "translateY(0)";
    }
    $("#detailClose").focus({ preventScroll: true });
  }

  function renderDetail(project) {
    const stack = Array.isArray(project.stack) ? project.stack : [];
    const projectIndex = getVisibleProjects().findIndex(
      (item) => item.slug === project.slug,
    );
    const number = projectNumber(project, Math.max(projectIndex, 0));
    const productionUrl =
      project.productionUrl && safeUrl(project.productionUrl) !== "#"
        ? safeUrl(project.productionUrl)
        : "";
    const projectSections = Array.isArray(project.sections)
      ? project.sections.map((section) => ({ ...section }))
      : project.sections && typeof project.sections === "object"
        ? Object.values(project.sections).map((section) => ({ ...section }))
        : [];
    const gallerySection = projectSections.find((section) =>
      ["images", "gallery", "image-gallery", "imagegallery"].includes(
        String(section?.type || "")
          .trim()
          .toLowerCase()
          .replace(/[\s_]+/g, "-"),
      ),
    );
    const gallerySource =
      project.gallery || project.galleryImages || project.images;
    if (gallerySource) {
      const galleryItems = Array.isArray(gallerySource)
        ? gallerySource
        : Array.isArray(gallerySource?.items)
          ? gallerySource.items
          : Array.isArray(gallerySource?.images)
            ? gallerySource.images
            : [];
      if (gallerySection) {
        const sectionItems = Array.isArray(gallerySection.items)
          ? gallerySection.items
          : Array.isArray(gallerySection.images)
            ? gallerySection.images
            : [];
        if (!sectionItems.length && galleryItems.length) {
          gallerySection.items = galleryItems;
          gallerySection.eyebrow ||= gallerySource?.eyebrow || "Gallery";
          gallerySection.title ||= gallerySource?.title || "Project gallery";
        }
      } else {
        projectSections.push({
          type: "gallery",
          eyebrow: gallerySource?.eyebrow || "Gallery",
          title: gallerySource?.title || "Project gallery",
          items: galleryItems,
        });
      }
    }
    const renderedSections = projectSections
      .map((section, index) => renderProjectSection(section, index))
      .filter(Boolean);
    const firstSection = renderedSections[0] || "";
    const remainingSections = renderedSections.slice(1).join("");
    const overviewSection = `<section class="detail-section detail-reveal"><div class="section-kicker">${escapeHTML(project.type || "Project")}</div><h3>${escapeHTML(project.title || "Project overview")}</h3><p>${escapeHTML(project.problem || project.approach || project.summary || "")}</p>${project.features?.length ? `<ul class="detail-feature-list">${project.features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join("")}</ul>` : ""}</section>`;
    const links = (project.links || [])
      .filter((link) => link.url && link.url !== "#")
      .map(
        (link) =>
          `<a class="detail-action" href="${escapeHTML(safeUrl(link.url))}" ${String(link.url).startsWith("http") ? 'target="_blank" rel="noreferrer noopener"' : ""}>${escapeHTML(link.label)} ↗</a>`,
      )
      .join("");
    return `<div class="detail-heading-meta detail-reveal"><span class="mono">${escapeHTML(number)} / ${escapeHTML(project.type || "Project")}</span><span class="mono">${escapeHTML(project.status || "CASE STUDY")}</span></div>
      <h1 class="detail-title detail-reveal">${escapeHTML(project.title || "Untitled project")}</h1>
      <p class="detail-summary detail-reveal">${escapeHTML(project.summary || project.short || "")}</p><div class="detail-stack detail-reveal">${stack.map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
      ${project.coverImage && safeUrl(project.coverImage) !== "#" ? `<div class="detail-hero-visual detail-reveal detail-image-wrap"><img class="detail-image-reveal" src="${escapeHTML(safeUrl(project.coverImage))}" alt="${escapeHTML(project.title || "Project")} project preview"></div>` : `<div class="detail-hero-visual detail-reveal" style="--project-accent:${projectAccent(project)}">${projectVisual(project)}</div>`}
      <div class="detail-body-grid"><div>${firstSection || overviewSection}</div>
      <aside class="detail-facts detail-reveal"><div class="detail-fact"><span>My role</span><strong>${escapeHTML(project.role || "Product development")}</strong></div><div class="detail-fact"><span>Timeline</span><strong>${escapeHTML(project.duration || "In progress")}</strong></div><div class="detail-fact"><span>Project status</span><strong>${escapeHTML(project.status || "In progress")}</strong></div><div class="detail-fact"><span>Core stack</span><strong>${escapeHTML(stack.join(" · "))}</strong></div><div class="detail-actions">${productionUrl ? `<a class="detail-action detail-action--primary" href="${escapeHTML(productionUrl)}" target="_blank" rel="noreferrer noopener">View live product ↗</a>` : ""}${links}</div></aside></div>${remainingSections ? `<div class="detail-sections-wide">${remainingSections}</div>` : ""}`;
  }

  function renderProjectSection(section, index) {
    if (!section || !section.type) return "";
    const sectionType = String(section.type)
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-");
    const eyebrow = escapeHTML(
      section.eyebrow || `Section ${String(index + 1).padStart(2, "0")}`,
    );
    const title = escapeHTML(section.title || "");
    const intro = section.body ? `<p>${escapeHTML(section.body)}</p>` : "";
    const heading = `<div class="section-kicker">${String(index + 1).padStart(2, "0")} / ${eyebrow}</div>${title ? `<h3>${title}</h3>` : ""}`;
    let content = "";
    if (sectionType === "text") content = `${heading}${intro}`;
    if (sectionType === "points")
      content = `${heading}${intro}<ul class="detail-feature-list">${(section.items || []).map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
    if (sectionType === "cards")
      content = `${heading}${intro}<div class="dynamic-card-grid">${(section.items || []).map((item, i) => `<article class="decision-card"><span class="mono">${String(i + 1).padStart(2, "0")} / NOTE</span><h4>${escapeHTML(item.title || "")}</h4><p>${escapeHTML(item.body || item.text || "")}</p></article>`).join("")}</div>`;
    if (["text", "points", "cards"].includes(sectionType)) {
      const image =
        typeof section.image === "string"
          ? section.image
          : section.image?.src || section.image?.url || section.image?.imageUrl;
      const imageAlt =
        typeof section.image === "object"
          ? section.image.alt
          : section.imageAlt;
      const imageCaption =
        typeof section.image === "object"
          ? section.image.caption
          : section.imageCaption;
      const imageUrl = image ? safeUrl(image) : "#";
      const split = imageUrl !== "#";
      const imageSide = section.imageSide === "left" ? "left" : "right";
      const media = split
        ? `<figure class="dynamic-section-media"><img class="detail-image-reveal" loading="lazy" src="${escapeHTML(imageUrl)}" alt="${escapeHTML(imageAlt || title || projectTitleFallback())}">${imageCaption ? `<figcaption>${escapeHTML(imageCaption)}</figcaption>` : ""}</figure>`
        : "";
      return `<section class="detail-section detail-reveal dynamic-section dynamic-section--${escapeHTML(section.type)}${split ? ` dynamic-section--split dynamic-section--image-${imageSide}` : ""}">${split ? `<div class="dynamic-section-copy">${content}</div>${media}` : content}</section>`;
    }
    if (
      ["images", "gallery", "image-gallery", "imagegallery"].includes(
        sectionType,
      )
    ) {
      const galleryItems = Array.isArray(section.items)
        ? section.items
        : Array.isArray(section.images)
          ? section.images
          : [];
      const validItems = galleryItems
        .map((item) => {
          if (typeof item === "string") return { src: item };
          if (!item || typeof item !== "object") return null;
          const image = item.image;
          return {
            ...item,
            src:
              item.src ||
              item.url ||
              item.imageUrl ||
              (typeof image === "string" ? image : image?.src || image?.url),
          };
        })
        .filter((item) => item?.src && safeUrl(item.src) !== "#")
        .map((item) => ({
          src: safeUrl(item.src),
          alt: item.alt || item.caption || title || "Project image",
          caption: item.caption || item.title || "",
          details: item.details || item.description || item.body || "",
        }));
      const galleryId = `gallery-${index}`;
      const cards = validItems
        .map(
          (item, itemIndex) =>
            `<article class="gallery-card"><button class="gallery-card-open" type="button" data-gallery-action="open" data-gallery-open data-gallery-index="${itemIndex}" data-image-src="${escapeHTML(item.src)}" data-image-alt="${escapeHTML(item.alt)}" data-image-caption="${escapeHTML(item.caption)}" data-image-details="${escapeHTML(item.details)}" aria-label="Open image ${itemIndex + 1}: ${escapeHTML(item.caption || item.alt)}"><span class="gallery-card-image"><img class="detail-image-reveal" loading="eager" src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}"></span><span class="gallery-card-copy"><span class="gallery-card-index">${String(itemIndex + 1).padStart(2, "0")} / ${String(validItems.length).padStart(2, "0")}</span><strong>${escapeHTML(item.caption || `Image ${itemIndex + 1}`)}</strong>${item.details ? `<span>${escapeHTML(item.details)}</span>` : ""}<span class="gallery-card-open-label">Open full view ↗</span></span></button></article>`,
        )
        .join("");
      const viewer = validItems.length
        ? `<dialog class="gallery-viewer" aria-label="${escapeHTML(title || "Project image gallery")}" data-gallery-viewer><div class="gallery-viewer-card"><div class="gallery-viewer-top"><span class="gallery-viewer-count" data-viewer-count></span><button type="button" class="gallery-viewer-close" data-gallery-action="close" aria-label="Close image viewer">Close <span>✕</span></button></div><div class="gallery-viewer-stage"><button type="button" class="gallery-viewer-nav" data-gallery-action="viewer-prev" aria-label="Previous image">←</button><img data-viewer-image alt=""><p class="gallery-viewer-error" data-viewer-error hidden>Image could not be loaded. Check its URL and access permissions.</p><button type="button" class="gallery-viewer-nav" data-gallery-action="viewer-next" aria-label="Next image">→</button></div><div class="gallery-viewer-copy"><h4 data-viewer-caption></h4><p data-viewer-details hidden></p></div></div></dialog>`
        : `<p class="dynamic-gallery-empty">Add image URLs to this gallery section to publish its slides.</p>`;
      return `<section class="detail-section detail-reveal dynamic-section dynamic-section--images" data-gallery="${galleryId}"><div class="gallery-heading">${heading}${intro}</div><div class="gallery-carousel"><button class="gallery-scroll-button" type="button" data-gallery-action="scroll-prev" aria-label="Scroll gallery left">←</button><div class="gallery-track" data-gallery-track tabindex="0" role="region" aria-label="${escapeHTML(title || "Project image gallery")}">${cards}</div><button class="gallery-scroll-button" type="button" data-gallery-action="scroll-next" aria-label="Scroll gallery right">→</button></div>${viewer}</section>`;
    }
    if (sectionType === "links")
      return `<section class="detail-section detail-reveal dynamic-section dynamic-section--links">${heading}${intro}<div class="detail-actions">${(section.items || []).map((item) => `<a class="detail-action" href="${escapeHTML(safeUrl(item.url || "#"))}" ${String(item.url || "").startsWith("http") ? 'target="_blank" rel="noreferrer noopener"' : ""}>${escapeHTML(item.label || "Open link")} ↗</a>`).join("")}</div></section>`;
    return "";
  }

  function projectTitleFallback() {
    return activeProject?.title || "Project detail";
  }

  function setupContactForm() {
    const form = $("#contactForm");
    if (!form) return;
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = $("#contactFormStatus");
      const submit = form.querySelector('button[type="submit"]');
      const values = Object.fromEntries(new FormData(form).entries());
      if (values.website) return; // honeypot field
      status.textContent = "Sending…";
      status.className = "contact-form-status";
      submit.disabled = true;
      try {
        const response = await fetch(
          "https://yunghog.onrender.com/api/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              subject: values.subject,
              message: values.message,
            }),
          },
        );
        const result = await response.json().catch(() => ({}));
        if (!response.ok)
          throw new Error(
            result.error || "Message could not be sent. Please try again.",
          );
        form.reset();
        status.textContent =
          result.message || "Thanks — your message has been sent.";
        status.classList.add("is-success");
        trackEvent("contact_form_submit", {
          form_name: "portfolio_contact",
          submission_status: "success",
        });
      } catch (error) {
        status.textContent = error.message;
        status.classList.add("is-error");
        trackEvent("contact_form_submit", {
          form_name: "portfolio_contact",
          submission_status: "error",
        });
      } finally {
        submit.disabled = false;
      }
    });
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (
        !anchor ||
        anchor.closest("#projectDetail") ||
        anchor.closest("#navLinks")
      )
        return;
      const target = anchor.getAttribute("href").slice(1);
      if (!target || trackedEvents.has(target)) return;
      trackEvent("section_click", {
        section_name: target,
        section_label: anchor.textContent.trim().slice(0, 80) || target,
      });
    });
  }

  function getNextProject() {
    const projects = getVisibleProjects();
    if (!projects.length) return null;
    if (!activeProject) return projects[0];
    const index = projects.findIndex(
      (item) => item.slug === activeProject.slug,
    );
    return projects[(index + 1) % projects.length];
  }

  function closeProject(fromRoute = false) {
    if (!activeProject) return;
    const panel = $("#projectDetail");
    activeProject = null;
    if (!fromRoute && location.hash.startsWith("#project/"))
      history.pushState(null, "", "#work");
    if (window.gsap && !reducedMotion) {
      gsap.to(panel, {
        yPercent: 100,
        duration: 0.62,
        ease: "power3.inOut",
        onComplete: () => finishClose(panel),
      });
    } else finishClose(panel);
  }
  function finishClose(panel) {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    panel.style.transform = "";
    document.body.classList.remove("detail-lock");
    updateSeoMetadata();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  }
  init();
})();
