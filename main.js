const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const navSectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const revealElements = [...document.querySelectorAll(".reveal")];
const featuredProjectsElement = document.getElementById("featured-projects");
const allProjectsGrid = document.getElementById("all-projects-grid");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const searchInput = document.querySelector("[data-search]");
const resultTitle = document.querySelector("[data-result-title]");
const visibleCountElement = document.querySelector("[data-visible-count]");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitLabel = document.querySelector("[data-submit-label]");
const apiStatus = document.getElementById("api-status");
const yearElement = document.getElementById("year");
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@j_edit-b5";
const YOUTUBE_INVITE_KEY = "muxtorjon-youtube-invite-seen";

const state = {
  activeCategory: "all",
  search: "",
  projects: []
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function categoryLabel(value) {
  const labels = {
    all: "All projects",
    web: "Web",
    python: "Python",
    java: "Java",
    telegram: "Telegram"
  };

  return labels[value] || "Project";
}

function toggleHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}

function rememberYoutubeInvite() {
  try {
    localStorage.setItem(YOUTUBE_INVITE_KEY, "true");
  } catch (error) {
    return;
  }
}

function hasSeenYoutubeInvite() {
  try {
    return localStorage.getItem(YOUTUBE_INVITE_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function showYoutubeInvite() {
  if (hasSeenYoutubeInvite()) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "youtube-invite";
  overlay.innerHTML = `
    <div class="youtube-invite__backdrop"></div>
    <section class="youtube-invite__dialog" role="dialog" aria-modal="true" aria-labelledby="youtube-invite-title">
      <p class="youtube-invite__eyebrow">First visit</p>
      <h2 id="youtube-invite-title">Bizning YouTube kanalimizga obuna bo'ling</h2>
      <p class="youtube-invite__text">
        Yangi darslar, edit videolar va foydali kontentlarni o'tkazib yubormaslik uchun
        <strong>j_edit-b5</strong> kanaliga obuna bo'ling.
      </p>
      <div class="youtube-invite__actions">
        <button class="button button-primary" type="button" data-youtube-subscribe>Obuna bo'lish</button>
        <button class="button button-secondary" type="button" data-youtube-dismiss>Portfolio'ga kirish</button>
      </div>
      <p class="youtube-invite__hint">Bu oyna faqat birinchi kirganingizda ko'rinadi.</p>
    </section>
  `;

  const subscribeButton = overlay.querySelector("[data-youtube-subscribe]");
  const dismissButton = overlay.querySelector("[data-youtube-dismiss]");

  function closeInvite(redirectToYoutube) {
    rememberYoutubeInvite();
    document.body.classList.remove("has-overlay");
    overlay.remove();

    if (redirectToYoutube) {
      window.location.href = YOUTUBE_CHANNEL_URL;
    }
  }

  subscribeButton?.addEventListener("click", () => {
    closeInvite(true);
  });

  dismissButton?.addEventListener("click", () => {
    closeInvite(false);
  });

  document.body.classList.add("has-overlay");
  document.body.append(overlay);
}

function closeMenu() {
  siteNav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const nextState = !siteNav.classList.contains("is-open");
  siteNav.classList.toggle("is-open", nextState);
  menuToggle.setAttribute("aria-expanded", String(nextState));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", toggleHeaderState);
toggleHeaderState();

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

if (navSectionLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navSectionLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.1
    }
  );

  [...document.querySelectorAll("main section[id]")].forEach((section) => {
    sectionObserver.observe(section);
  });
}

async function fetchJson(paths) {
  for (const path of paths) {
    try {
      const response = await fetch(path);

      if (response.ok) {
        const data = await response.json();
        return {
          data,
          source: path.includes("api") ? "api" : "file"
        };
      }
    } catch (error) {
      continue;
    }
  }

  throw new Error("Unable to load data.");
}

function animateCount(element, nextValue) {
  const target = Number(nextValue) || 0;
  const start = Number(element.textContent) || 0;
  const duration = 900;
  const startTime = performance.now();

  function frame(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.round(start + (target - start) * progress);
    element.textContent = String(value);

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function updateMetric(key, value) {
  const element = document.querySelector(`[data-count-key="${key}"]`);

  if (element) {
    animateCount(element, value);
  }
}

function buildProjectCard(project) {
  const tags = (project.stack || [])
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");

  const links = [
    project.demo ? `<a class="project-link" href="${escapeHtml(project.demo)}" target="_blank" rel="noreferrer">Demo</a>` : "",
    project.repo ? `<a class="project-link" href="${escapeHtml(project.repo)}" target="_blank" rel="noreferrer">Repo</a>` : "",
    project.tutorial ? `<a class="project-link" href="${escapeHtml(project.tutorial)}" target="_blank" rel="noreferrer">Tutorial</a>` : ""
  ]
    .filter(Boolean)
    .join("");

  return `
    <article class="project-card">
      <div class="project-media">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} preview">
      </div>
      <div class="project-body">
        <div class="project-topline">
          <span class="project-badge">${escapeHtml(categoryLabel(project.category))}</span>
          <span class="project-status">${escapeHtml(project.status || "Ready")}</span>
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.summary || "")}</p>
        <div class="project-tags">${tags}</div>
        <div class="project-links">${links || '<span class="project-link project-link--muted">Links coming soon</span>'}</div>
      </div>
    </article>
  `;
}

function getVisibleProjects() {
  const searchValue = state.search.trim().toLowerCase();

  return state.projects.filter((project) => {
    const categoryMatch = state.activeCategory === "all" || project.category === state.activeCategory;

    const searchableText = [
      project.title,
      project.category,
      project.status,
      project.summary,
      ...(project.stack || [])
    ]
      .join(" ")
      .toLowerCase();

    const searchMatch = !searchValue || searchableText.includes(searchValue);
    return categoryMatch && searchMatch;
  });
}

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === state.activeCategory);
  });
}

function renderProjects() {
  const visibleProjects = getVisibleProjects();
  const featuredProjects = state.projects.filter((project) => project.featured).slice(0, 3);
  const categoryCount = new Set(state.projects.map((project) => project.category)).size;

  updateMetric("projects", state.projects.length);
  updateMetric("categories", categoryCount);
  updateMetric("featured", featuredProjects.length);

  if (featuredProjectsElement) {
    featuredProjectsElement.innerHTML = featuredProjects.length
      ? featuredProjects.map(buildProjectCard).join("")
      : '<article class="empty-card">No featured projects are available yet.</article>';
  }

  if (resultTitle) {
    resultTitle.textContent = state.activeCategory === "all"
      ? "All projects"
      : `${categoryLabel(state.activeCategory)} projects`;
  }

  if (visibleCountElement) {
    visibleCountElement.textContent = String(visibleProjects.length);
  }

  if (allProjectsGrid) {
    allProjectsGrid.innerHTML = visibleProjects.length
      ? visibleProjects.map(buildProjectCard).join("")
      : '<article class="empty-card">No projects matched this filter yet.</article>';
  }

  updateFilterButtons();
}

async function loadProjects() {
  try {
    const payload = await fetchJson(["/api/projects", "/data/projects.json"]);
    state.projects = Array.isArray(payload.data) ? payload.data : payload.data.projects || [];
    renderProjects();

    if (apiStatus) {
      apiStatus.textContent = payload.source === "api"
        ? `Backend online - ${state.projects.length} projects loaded`
        : `Static mode - ${state.projects.length} projects loaded`;
    }
  } catch (error) {
    if (featuredProjectsElement) {
      featuredProjectsElement.innerHTML = '<article class="empty-card">Project data could not be loaded.</article>';
    }

    if (allProjectsGrid) {
      allProjectsGrid.innerHTML = '<article class="empty-card">Project list could not be loaded.</article>';
    }

    if (apiStatus) {
      apiStatus.textContent = "Data unavailable";
    }
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.activeCategory = button.dataset.filter || "all";
    renderProjects();
  });
});

searchInput?.addEventListener("input", (event) => {
  state.search = event.target.value || "";
  renderProjects();
});

async function handleFormSubmit(event) {
  event.preventDefault();

  if (!form) {
    return;
  }

  const payload = Object.fromEntries(new FormData(form).entries());
  formStatus.className = "form-status";
  formStatus.textContent = "Sending message...";
  submitLabel.textContent = "Sending...";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Unable to send message.");
    }

    form.reset();
    formStatus.classList.add("is-success");
    formStatus.textContent = result.message || "Your message was sent successfully.";
  } catch (error) {
    formStatus.classList.add("is-error");
    formStatus.textContent =
      error.message === "Failed to fetch"
        ? "Backend is not running. Frontend works, but form saving needs node server.js."
        : error.message;
  } finally {
    submitLabel.textContent = "Send message";
  }
}

form?.addEventListener("submit", handleFormSubmit);

showYoutubeInvite();
loadProjects();
