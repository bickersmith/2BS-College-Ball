import { cardBase } from "./cardBase.js";
import { getClickableTeamLogo, getOwnerPill } from "../../utils/cardUtils.js";

export function draftCard(draft, size = "md") {
  const header = getClickableTeamLogo(draft.team);

  const body = `
    <div class="draft-round">Round ${draft.draftRound}</div>
    <div class="draft-pick">Pick ${draft.draftPickNumber}</div>
  `;

  const footer = getOwnerPill(draft.owner);

  return cardBase({ team: draft.team, size, header, body, footer });
}
