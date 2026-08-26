import { fetchOwnerData } from "../../data/fetch/fetchOwner.js";
import { normalizeOwnerRow } from "./normalizeOwner.js";
import { validateOwner } from "./validateOwner.js";
import { updateOwners } from "../state/updateState.js";

export async function getOwners(leagueId, seasonId) {
  const rows = await fetchOwnerData(leagueId, seasonId);
  const owners = rows.map(normalizeOwnerRow).filter(validateOwner);

  updateOwners(owners);
  return owners;
}
