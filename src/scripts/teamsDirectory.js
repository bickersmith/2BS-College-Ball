import { fetchSheet } from "./fetchSheet.js";

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("teams-body");
  const searchInput = document.getElementById("team-search");
  const filterSelect = document.getElementById("team-filter");

  let teams = await fetchSheet("Teams");

  function normalizeTeam(team) {
    return {
      id: team.id || "",
      name: team.name || "Unknown Team",
      conference: team.conference || "Independent",
      location: team.location || "",
      logoUrl: team.logoUrl || "",
      preseasonRank: parseInt(team.preseasonRank) || null
    };
  }

  teams = teams.map(normalizeTeam);

  // Add conference options to unified filter
  const conferences = [...new Set(teams.map(t => t.conference))].sort();
  conferences.forEach(conf => {
    const opt = document.createElement("option");
    opt.value = `conf:${conf}`;
    opt.textContent = conf;
    filterSelect.appendChild(opt);
  });

  function renderTable() {
    tbody.innerHTML = "";

    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    let filtered = teams.filter(t =>
      (!searchTerm || t.name.toLowerCase().includes(searchTerm))
    );

    // Unified filter logic
    if (filterValue === "top25") {
      filtered = filtered.filter(t => t.preseasonRank && t.preseasonRank <= 25);
    }

    if (filterValue === "rank") {
      filtered.sort((a, b) => {
        const A = a.preseasonRank ?? 999;
        const B = b.preseasonRank ?? 999;
        return A - B;
      });
    }

    if (filterValue.startsWith("conf:")) {
      const conf = filterValue.replace("conf:", "");
      filtered = filtered.filter(t => t.conference === conf);
    }

    filtered.forEach(team => {
      const tr = document.createElement("tr");
      tr.classList.add("team-row");

      tr.addEventListener("mouseenter", () => showHoverCard(team, tr));
      tr.addEventListener("mouseleave", hideHoverCard);

      tr.addEventListener("click", () => {
        window.location.href = `team.html?team=${encodeURIComponent(team.id)}`;
      });

      tr.innerHTML = `
        <td>${team.preseasonRank ?? ""}</td>
        <td>
          <img src="${team.logoUrl}" class="team-logo-small">
          ${team.name}
        </td>
        <td>${team.conference}</td>
        <td>${team.location}</td>
      `;

      tbody.appendChild(tr);
    });
  }

  // Hover card
  const hoverCard = document.createElement("div");
  hoverCard.classList.add("hover-card");
  document.body.appendChild(hoverCard);

  function showHoverCard(team, row) {
    hoverCard.innerHTML = `
      <div class="hover-title">${team.name}</div>
      <div class="hover-sub">${team.conference}</div>
      <div class="hover-sub">${team.location}</div>
      <img src="${team.logoUrl}" class="hover-logo">
    `;
    const rect = row.getBoundingClientRect();
    hoverCard.style.top = `${rect.top + window.scrollY}px`;
    hoverCard.style.left = `${rect.right + 10}px`;
    hoverCard.style.display = "block";
  }

  function hideHoverCard() {
    hoverCard.style.display = "none";
  }

  // Column sorting restored
  const headers = document.querySelectorAll("th");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const sortKey = header.dataset.sort;

      teams.sort((a, b) => {
        const A = normalizeTeam(a);
        const B = normalizeTeam(b);

        if (sortKey === "preseason") {
          return (A.preseasonRank ?? 999) - (B.preseasonRank ?? 999);
        }
        if (sortKey === "team") return A.name.localeCompare(B.name);
        if (sortKey === "conference") return A.conference.localeCompare(B.conference);
        if (sortKey === "location") return A.location.localeCompare(B.location);
      });

      renderTable();
    });
  });

  searchInput.addEventListener("input", renderTable);
  filterSelect.addEventListener("change", renderTable);

  renderTable();
});
