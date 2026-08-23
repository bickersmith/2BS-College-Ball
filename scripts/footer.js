export async function loadFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  const res = await fetch("./components/footer.html");
  const html = await res.text();
  footer.innerHTML = html;
}
