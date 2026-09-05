import { BadgeConfig } from "../../config/config.js";

export function filterBadges(game, isTeamPage) {
  if (isTeamPage && BadgeConfig.showAllBadgesOnTeamPage) {
    return true; // show everything
  }

  if (BadgeConfig.showOnlyOwnedBadgesInGameList) {
    return game.OwnerID && game.OwnerID !== ""; // only owned teams
  }

  return true;
}
