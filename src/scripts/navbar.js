export async function loadNavbar() {
  const container = document.getElementById("navbar");
  if (!container) return;

  const html = await fetch("/src/components/navbar.html")
    .then(res => res.text());

  container.innerHTML = html;
}
