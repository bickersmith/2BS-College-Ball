// src/components/cards/ownerCard.js

import { ComponentBase } from "../core/componentBase.js";
import { escapeHtml } from "../core/renderUtils.js";
import { withFallback } from "../core/fallbacks.js";

export function ownerCard(owner) {
  const safeName = escapeHtml(owner.ownerName);
  const safeSlug = escapeHtml(owner.ownerSlug || owner.ownerId);

  return `
    <div class="card owner-card">
      <h2>${safeName}</h2>
      <p>Owner ID: ${escapeHtml(owner.ownerId)}</p>
      <a href="/pages/owner.html?ownerId=${safeSlug}">View Owner</a>
    </div>
  `;
}
