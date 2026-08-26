// src/components/core/renderUtils.js

export function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderList(items, renderItem) {
  if (!items || !items.length) return "";
  return items.map(renderItem).join("");
}

export function renderIf(condition, html) {
  return condition ? html : "";
}
