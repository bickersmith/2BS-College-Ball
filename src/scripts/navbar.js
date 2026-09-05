export async function loadNavbar() {
  const container = document.getElementById("navbar");
  if (!container) return;

  const html = await fetch("/src/components/navbar.html")
    .then(res => res.text());

  container.innerHTML = html;
}

export function highlightActiveNav() {
  const path = window.location.pathname;
  const links = document.querySelectorAll(".site-navbar a");

  links.forEach(link => {
    if (link.href.includes(path)) {
      link.classList.add("active");
    }
  });
}

