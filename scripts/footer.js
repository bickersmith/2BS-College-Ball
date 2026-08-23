export async function loadFooter() {
  const footerContainer = document.getElementById("footer");
  if (!footerContainer) return;

  const res = await fetch("../components/footer.html");
  const html = await res.text();
  footerContainer.innerHTML = html;
}