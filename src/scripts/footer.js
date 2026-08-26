export async function loadFooter() {
  const container = document.getElementById("footer");
  if (!container) return;

  const html = await fetch("/src/components/footer.html")
    .then(res => res.text());

  container.innerHTML = html;
}
