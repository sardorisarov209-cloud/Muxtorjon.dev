const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");
const navSectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const revealElements = [...document.querySelectorAll(".reveal")];
const featuredProjectsElement = document.getElementById("featured-projects");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitLabel = document.querySelector("[data-submit-label]");
const apiStatus = document.getElementById("api-status");
const yearElement = document.getElementById("year");

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

function closeMenu() {
  siteNav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const nextState = !siteNav.classList.contains("is-open");
  siteNav.classList.toggle("is-open", nextState);
  menuToggle.setAttribute("aria-expanded", String(nextState));
});

navSectionLinks.forEach((link) => {
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

async function fetchJson(paths) {
  for (const path of paths) {
    try {
      const response = await fetch(path);

      if (response.ok) {
        return response.json();
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
    <article class="project-card reveal is-visible">
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

async function loadPortfolioData() {
  try {
    const projectsPayload = await fetchJson(["/api/projects", "data/projects.json"]);
    const projects = Array.isArray(projectsPayload) ? projectsPayload : projectsPayload.projects || [];
    const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
    const categoryCount = new Set(projects.map((project) => project.category)).size;

    updateMetric("projects", projects.length);
    updateMetric("categories", categoryCount);
    updateMetric("featured", featuredProjects.length);

    if (featuredProjectsElement) {
      featuredProjectsElement.innerHTML = featuredProjects.length
        ? featuredProjects.map(buildProjectCard).join("")
        : '<article class="empty-card">No featured projects are available yet.</article>';
    }

    apiStatus.textContent = `Online - ${projects.length} projects loaded`;
  } catch (error) {
    if (featuredProjectsElement) {
      featuredProjectsElement.innerHTML =
        '<article class="empty-card">Project data could not be loaded. Start the backend with <strong>node server.js</strong>.</article>';
    }

    apiStatus.textContent = "Offline preview";
  }
}

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
        ? "Backend is not running. Start it with node server.js."
        : error.message;
  } finally {
    submitLabel.textContent = "Send message";
  }
}

form?.addEventListener("submit", handleFormSubmit);

loadPortfolioData();
