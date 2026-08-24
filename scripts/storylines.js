// ============================================================
// STORYLINES — TEXT PARSER + RENDER ENGINE (ID + DATE + HEADLINE)
// ============================================================

const PAGE_SIZE = 50;
let currentPage = 1;
let storylines = [];
let sortedStorylines = [];

// Load the text file
async function loadStorylinesText() {
  const res = await fetch("./assets/docs/storylines.txt");
  const text = await res.text();
  return parseStorylines(text);
}

// Parse storylines using "# ID:" as the separator
function parseStorylines(text) {
  const blocks = text.split("# ID:").slice(1); // remove anything before first ID
  const entries = [];

  for (const block of blocks) {
    const lines = block.trim().split("\n");

    const idLine = lines[0].trim();
    const id = idLine;

    const getSection = (key) => {
      const start = lines.findIndex(l => l.startsWith(key + ":"));
      if (start === -1) return "";

      let content = lines[start].replace(key + ":", "").trim();
      let i = start + 1;

      while (i < lines.length && !lines[i].includes(":")) {
        content += "\n" + lines[i].trim();
        i++;
      }

      return content.trim();
    };

    entries.push({
      id,
      date: getSection("DATE"),
      headline: getSection("HEADLINE"),
      title: getSection("TITLE"),
      subtitle: getSection("SUBTITLE"),
      teams: getSection("TEAMS")
        ? getSection("TEAMS").split(",").map(t => t.trim())
        : [],
      story: getSection("STORY"),
      whyItMatters: getSection("WHY"),
      gamesToWatch: getSection("WATCH")
        ? getSection("WATCH").split("\n").map(g => g.trim()).filter(Boolean)
        : [],
      tags: getSection("TAGS")
        ? getSection("TAGS").split(",").map(t => t.trim())
        : []
    });
  }

  return entries;
}

// Initialize Storylines
async function initStorylines() {
  storylines = await loadStorylinesText();

  // Sort by DATE (newest → oldest), then by ID
sortedStorylines = storylines.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (dateA.getTime() !== dateB.getTime()) {
    return dateB - dateA; // Newest date first
  }

  return b.id.localeCompare(a.id); // WRONG
});

  buildDropdown();
  renderPage();
  setupPagingControls();
}

// Build dropdown (ID + TITLE)
function buildDropdown() {
  const select = document.getElementById("storyline-select");

  select.innerHTML = sortedStorylines.map((s, idx) => `
    <option value="${idx}">
      ${s.id} — ${s.title}
    </option>
  `).join("");

  select.addEventListener("change", () => {
    const idx = parseInt(select.value, 10);
    renderSingleStoryline(idx);
  });
}

// Paging controls
function setupPagingControls() {
  document.getElementById("prev-page").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  };

  document.getElementById("next-page").onclick = () => {
    const maxPage = Math.ceil(sortedStorylines.length / PAGE_SIZE);
    if (currentPage < maxPage) {
      currentPage++;
      renderPage();
    }
  };
}

// Render a full page of storylines
function renderPage() {
  const container = document.getElementById("storylines-container");
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageStories = sortedStorylines.slice(start, end);

  container.innerHTML = pageStories.map((s, idx) =>
    renderStorylineCard(s, start + idx)
  ).join("");

  document.getElementById("page-info").innerText =
    `Page ${currentPage} of ${Math.ceil(sortedStorylines.length / PAGE_SIZE)}`;
}

// Render a single storyline (dropdown selection)
function renderSingleStoryline(idx) {
  const container = document.getElementById("storylines-container");
  container.innerHTML = renderStorylineCard(sortedStorylines[idx], idx);
}

// Build storyline card HTML (NO IMAGES, POPPED LAYOUT)
function renderStorylineCard(s, idx) {
  const teamsHtml = s.teams.length
    ? `<div class="story-teams">
        ${s.teams.map(team => `
          <div class="story-team">${team}</div>
        `).join("")}
       </div>`
    : "";

  const whyHtml = s.whyItMatters
    ? `<div class="story-section">
         <h3>Why It Matters</h3>
         <p>${s.whyItMatters.replace(/\n/g, "<br>")}</p>
       </div>`
    : "";

  const watchHtml = s.gamesToWatch.length
    ? `<div class="story-section">
         <h3>Games to Watch</h3>
         <ul class="story-watch-list">
           ${s.gamesToWatch.map(g => `<li>${g}</li>`).join("")}
         </ul>
       </div>`
    : "";

  const tagsHtml = s.tags.length
    ? `<div class="story-tags">
         ${s.tags.map(tag => `<span class="story-tag">${tag}</span>`).join("")}
       </div>`
    : "";

  return `
    <div class="story-card">

      <h4 class="story-meta">
        <span class="story-id">${s.id}</span>
        <span class="story-date">${s.date}</span>
      </h4>

      <h2 class="story-title">${s.title}</h2>
      <p class="story-subtitle">${s.subtitle}</p>

      ${teamsHtml}

      <div class="story-body">
        ${s.story ? `<p>${s.story.replace(/\n/g, "<br>")}</p>` : ""}
      </div>

      ${whyHtml}
      ${watchHtml}
      ${tagsHtml}

    </div>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  initStorylines();
});


window.addEventListener("DOMContentLoaded", () => {
  initStorylines();

  const params = new URLSearchParams(window.location.search);
  const targetId = params.get("id");

  if (targetId) {
    setTimeout(() => {
      const el = document.querySelector(`[data-story-id="${targetId}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }
});


if (targetId === "latest") {
  targetId = sortedStorylines[0].id;
}