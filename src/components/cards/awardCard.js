import { cardBase } from "./cardBase.js";
import { getOwnerPill, getClickableTeamLogo } from "../../utils/cardUtils.js";

export function awardCard(award, size = "sm") {
  const header = getClickableTeamLogo(award.team);

  const body = `
    <div class="award-name">${award.awardName}</div>
    <div class="award-points">${award.awardPoints} pts</div>
  `;

  const footer = getOwnerPill(award.owner);

  return cardBase({ team: award.team, size, header, body, footer });
}
