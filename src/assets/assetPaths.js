// src/assets/assetPaths.js

import { getAsset } from "./assetLoader.js";

export function getTeamLogo(team) {
  return team.logoUrl || getAsset("logos", "default");
}

export function getTeamHelmet(team) {
  return team.helmetUrl || getAsset("helmets", "default");
}

export function getMascotImage(team) {
  return team.mascotImageUrl || getAsset("mascots", "default");
}
