// src/assets/assetLoader.js

import assets from "./assets.json" assert { type: "json" };

export function getAsset(category, key = "default") {
  const group = assets[category];
  if (!group) return null;
  return group[key] || group.default || null;
}
