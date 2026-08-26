export async function loadHeader() {
  const container = document.getElementById("header");
  if (!container) return;

  const html = await fetch("/src/components/header.html")
    .then(res => res.text());

  container.innerHTML = html;
}
