import { cardBase } from "./cardBase.js";
import { getClickableTeamLogo, getOwnerPill } from "../../utils/cardUtils.js";

export function teamCard(team, size = "md") {
  const header = getClickableTeamLogo(team);

  const body = `
    <div class="team-name">${team.teamName}</div>
    <div class="team-school">${team.teamSchool}</div>
  `;

  const footer = getOwnerPill(team.owner);

  return cardBase({ team, size, header, body, footer });
}
