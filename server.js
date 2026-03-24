const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const PROJECTS_PATH = path.join(DATA_DIR, "projects.json");
const MESSAGES_PATH = path.join(DATA_DIR, "messages.json");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

fs.mkdirSync(DATA_DIR, { recursive: true });

if (!fs.existsSync(MESSAGES_PATH)) {
  fs.writeFileSync(MESSAGES_PATH, "[]");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension] || "application/octet-stream";

  fs.readFile(filePath, (error, fileBuffer) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendJson(response, 404, { error: "Not found" });
        return;
      }

      sendJson(response, 500, { error: "Unable to read file" });
      return;
    }

    response.writeHead(200, { "Content-Type": contentType });
    response.end(fileBuffer);
  });
}

function readJsonFile(filePath, fallbackValue) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    return fallbackValue;
  }
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getProjects() {
  return readJsonFile(PROJECTS_PATH, []);
}

function getStats() {
  const projects = getProjects();
  const categoryCount = projects.reduce((accumulator, project) => {
    accumulator[project.category] = (accumulator[project.category] || 0) + 1;
    return accumulator;
  }, {});

  return {
    projects: projects.length,
    featuredProjects: projects.filter((project) => project.featured).length,
    categories: Object.keys(categoryCount).length,
    categoryBreakdown: categoryCount
  };
}

function sanitizePath(requestPathname) {
  const decodedPath = decodeURIComponent(requestPathname);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  return normalizedPath === path.sep ? "" : normalizedPath.replace(/^[/\\]+/, "");
}

function handleProjectsApi(requestUrl, response) {
  const projects = getProjects();
  const category = requestUrl.searchParams.get("category");
  const featuredOnly = requestUrl.searchParams.get("featured") === "true";

  let result = projects;

  if (category && category !== "all") {
    result = result.filter((project) => project.category === category);
  }

  if (featuredOnly) {
    result = result.filter((project) => project.featured);
  }

  sendJson(response, 200, {
    projects: result,
    total: result.length
  });
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let rawBody = "";

    request.on("data", (chunk) => {
      rawBody += chunk;

      if (rawBody.length > 1e6) {
        request.destroy();
        reject(new Error("Payload too large"));
      }
    });

    request.on("end", () => {
      try {
        const body = rawBody ? JSON.parse(rawBody) : {};
        resolve(body);
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });

    request.on("error", reject);
  });
}

async function handleContactApi(request, response) {
  try {
    const body = await parseBody(request);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const projectType = String(body.projectType || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      sendJson(response, 400, {
        error: "Name, email and message are required."
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sendJson(response, 400, {
        error: "Please enter a valid email address."
      });
      return;
    }

    const messages = readJsonFile(MESSAGES_PATH, []);
    const newMessage = {
      id: Date.now(),
      name,
      email,
      projectType,
      message,
      createdAt: new Date().toISOString()
    };

    messages.push(newMessage);
    writeJsonFile(MESSAGES_PATH, messages);

    sendJson(response, 201, {
      ok: true,
      message: "Your message was saved successfully."
    });
  } catch (error) {
    const statusCode = error.message === "Invalid JSON" ? 400 : 500;
    sendJson(response, statusCode, {
      error: statusCode === 400 ? "Invalid JSON body." : "Unable to save your message."
    });
  }
}

function routeStaticFile(requestUrl, response) {
  const routeMap = {
    "/": "index.html",
    "/projects": "projects/index.html",
    "/projects/index.html": "projects/index.html",
    "/projects/web": "projects/web.html",
    "/projects/web.html": "projects/web.html",
    "/projects/python": "projects/python.html",
    "/projects/python.html": "projects/python.html",
    "/projects/java": "projects/java.html",
    "/projects/java.html": "projects/java.html",
    "/projects/telegram": "projects/telegram.html",
    "/projects/telegram.html": "projects/telegram.html",
    "/portfillo.html": "index.html",
    "/index.html": "index.html",
    "/web.html": "projects/web.html",
    "/python.html": "projects/python.html",
    "/java.html": "projects/java.html",
    "/telegram.html": "projects/telegram.html"
  };

  const mappedFile = routeMap[requestUrl.pathname];
  const fileToServe = mappedFile || sanitizePath(requestUrl.pathname);
  const absolutePath = path.join(ROOT_DIR, fileToServe);

  if (!absolutePath.startsWith(ROOT_DIR)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  fs.stat(absolutePath, (error, stats) => {
    if (error || !stats.isFile()) {
      sendJson(response, 404, { error: "Page not found" });
      return;
    }

    sendFile(response, absolutePath);
  });
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && requestUrl.pathname === "/api/projects") {
    handleProjectsApi(requestUrl, response);
    return;
  }

  if (request.method === "GET" && requestUrl.pathname === "/api/stats") {
    sendJson(response, 200, getStats());
    return;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/contact") {
    await handleContactApi(request, response);
    return;
  }

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  routeStaticFile(requestUrl, response);
});

server.listen(PORT, () => {
  console.log(`Portfolio server is running on http://localhost:${PORT}`);
});




