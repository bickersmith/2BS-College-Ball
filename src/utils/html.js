export function escapeHTML(str = "") {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

export function buildElement(tag, content = "", attrs = {}) {
  const attrString = Object.entries(attrs)
    .map(([k, v]) => `${k}="${escapeHTML(v)}"`)
    .join(" ");

  return `<${tag} ${attrString}>${content}</${tag}>`;
}

export function buildCardSkeleton(accentColor, sizeClass, header, body, footer) {
  return `
    <div class="card ${sizeClass}">
      <div class="card-accent" style="background:${accentColor}"></div>
      <div class="card-header">${header}</div>
      <div class="card-body">${body}</div>
      <div class="card-footer">${footer}</div>
    </div>
  `;
}
