import { log } from "../scripts/diagnostics/logger.js";
import { loadConfig } from "./config/env.js";
import { getOwners } from "./api/api.owners.js";

await loadConfig();

export async function renderOwnersPage() {
  const owners = await getOwners();   // already composed

  const safeOwners = Array.isArray(owners) ? owners : [];

  const container = document.getElementById("content");

  let html = `<h1>Owners</h1>`;

  for (const owner of safeOwners) {
    html += `
      <div>
        <strong>${owner.name || "Unknown Owner"}</strong><br>
        Owner ID: ${owner.id}<br>
        <a href="owner.html?owner=${owner.id}">View Owner</a>
      </div>
      <hr>
    `;
  }

  container.innerHTML = html;
}

log("are we updated tho?");
renderOwnersPage();
