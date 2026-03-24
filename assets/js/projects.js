const categoryLabels = {
  all: "All projects",
  web: "Web projects",
  python: "Python projects",
  java: "Java projects",
  telegram: "Telegram projects"
};

const body = document.body;
const projectsGrid = document.querySelector("[data-projects-grid]");
const resultTitle = document.querySelector("[data-result-title]");
const totalCountElements = [...document.querySelectorAll("[data-total-count]")];
const visibleCountElements = [...document.querySelectorAll("[data-visible-count]")];
const categoryCountElements = [...document.querySelectorAll("[data-category-count]")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const navLinks = [...document.querySelectorAll("[data-nav-category]")];
const searchInput = document.querySelector("[data-search]");
const yearElement = document.getElementById("year");

let allProjects = [];
const state = {
  activeCategory: body.dataset.category || "all",
  search: ""
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

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

  throw new Error("Unable to load project data.");
}

function getCategoryLabel(category) {
  return categoryLabels[category] || "Projects";
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
          <span class="project-badge">${escapeHtml(getCategoryLabel(project.category))}</span>
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

  return allProjects.filter((project) => {
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

function setTextForElements(elements, value) {
  elements.forEach((element) => {
    element.textContent = String(value);
  });
}

function updateActiveStates() {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === state.activeCategory);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.navCategory === state.activeCategory);
  });
}

function renderProjects() {
  const visibleProjects = getVisibleProjects();

  if (resultTitle) {
    resultTitle.textContent = getCategoryLabel(state.activeCategory);
  }

  setTextForElements(totalCountElements, allProjects.length);
  setTextForElements(visibleCountElements, visibleProjects.length);
  setTextForElements(
    categoryCountElements,
    new Set(allProjects.map((project) => project.category)).size
  );

  if (projectsGrid) {
    if (!visibleProjects.length) {
      projectsGrid.innerHTML = '<article class="empty-card">No projects matched this filter yet.</article>';
    } else {
      projectsGrid.innerHTML = visibleProjects.map(buildProjectCard).join("");
    }
  }

  updateActiveStates();
}

async function loadProjects() {
  try {
    const payload = await fetchJson(["/api/projects", "/data/projects.json"]);
    allProjects = Array.isArray(payload) ? payload : payload.projects || [];
    renderProjects();
  } catch (error) {
    if (projectsGrid) {
      projectsGrid.innerHTML = '<article class="empty-card">Project data could not be loaded. Start the backend with <strong>node server.js</strong>.</article>';
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

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

loadProjects();

