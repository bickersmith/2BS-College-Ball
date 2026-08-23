export async function loadHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const res = await fetch("./components/header.html");
  const html = await res.text();
  header.innerHTML = html;
}
