import { fetchDraftData } from "../../data/fetch/fetchDraft.js";
import { composeDraftPick } from "../../data/compose/composeDraft.js";

export async function getDraftPicks(teams, owners) {
  const rawDraft = await fetchDraftData();
  return rawDraft.map(p => composeDraftPick(p, teams, owners));
}
