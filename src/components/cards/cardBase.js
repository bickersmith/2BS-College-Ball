import { getAccentColor, getCardSizeClass } from "../../utils/cardUtils.js";
import { buildCardSkeleton } from "../../utils/html.js";

export function cardBase({ team, size = "md", header, body, footer }) {
  const accentColor = getAccentColor(team);
  const sizeClass = getCardSizeClass(size);

  return buildCardSkeleton(accentColor, sizeClass, header, body, footer);
}
