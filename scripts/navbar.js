export async function loadNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const res = await fetch("./components/navbar.html");
  const html = await res.text();
  navbar.innerHTML = html;

  // Activate toggle
  const fabNav = navbar.querySelector(".fab-nav");
  const toggle = navbar.querySelector(".fab-toggle");

  toggle.addEventListener("click", () => {
    fabNav.classList.toggle("active");
  });
}
