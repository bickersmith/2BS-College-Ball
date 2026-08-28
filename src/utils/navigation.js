/*export function goToTeam(teamId) {
  window.location.href = `./team.html?team=${teamId}`;
}

export function goToGame(gameId) {
  window.location.href = `./game.html?game=${gameId}`;
}

export function goToOwner(ownerId) {
  window.location.href = `./owner.html?owner=${ownerId}`;
}

/*
export async function loadNavigation() {
  await injectPartial("#header", "../components/header.html");
  await injectPartial("#navbar", "../components/navbar.html");
  await injectPartial("#footer", "../components/footer.html");
  highlightActiveNav();
}
*/
/*
export async function loadNavigation() {
  await injectPartial("#header", "/src/components/header.html");
  await injectPartial("#navbar", "/src/components/navbar.html");
  await injectPartial("#footer", "/src/components/footer.html");
  highlightActiveNav();
}

async function injectPartial(selector, path) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const response = await fetch(path);
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Navigation load failed for ${path}`, err);
  }
}
*/

export function goToTeam(teamId) {
  window.location.href = `./team.html?team=${teamId}`;
}

export function goToGame(gameId) {
  window.location.href = `./game.html?game=${gameId}`;
}

export function goToOwner(ownerId) {
  window.location.href = `./owner.html?owner=${ownerId}`;
}

export async function loadNavigation() {
  await injectPartial("#header", "../components/header.html");
  await injectPartial("#navbar", "../components/navbar.html");
  await injectPartial("#footer", "../components/footer.html");
  highlightActiveNav();
}

async function injectPartial(selector, path) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const response = await fetch(path);
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Navigation load failed for ${path}`, err);
  }
}

export function highlightActiveNav() {
  const path = window.location.pathname;
  const links = document.querySelectorAll("#navbar a");

  links.forEach(link => {
    if (link.href.includes(path)) {
      link.classList.add("active");
    }
  });
}
