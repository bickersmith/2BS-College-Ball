// ===============================
// 1. Load v1 UI shell (temporary)
// ===============================
import { loadHeader } from "../../scripts/header.js";
import { loadNavbar } from "../../scripts/navbar.js";
import { loadFooter } from "../../scripts/footer.js";

loadHeader();
loadNavbar();
loadFooter();

document.addEventListener("click", () => {
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mobileNavbar");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});


// ===============================
// 2. Load v2 page renderers
// ===============================
import { renderSchedulePage } from "../pages/schedulePage.js";
// import { renderTeamPage } from "../pages/teamPage.js";
// import { renderOwnersPage } from "../pages/ownersPage.js";
// Add more as you migrate pages

// ===============================
// 3. Page router
// ===============================
function init() {
  const path = window.location.pathname;

  if (path.endsWith("schedule.html")) {
    console.log("➡️ Routing to renderSchedulePage()");
    renderSchedulePage();
  } else {
    console.log("❌ Not schedule.html, skipping schedule renderer");
  }


  if (path.endsWith("team.html")) {
    // renderTeamPage();
  }

  if (path.endsWith("owners.html")) {
    // renderOwnersPage();
  }

  // Add more pages as needed
}

init();

