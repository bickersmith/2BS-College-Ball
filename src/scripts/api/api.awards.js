import { fetchAwardData } from "../../data/fetch/fetchAward.js";
import { composeAward } from "../../data/compose/composeAward.js";

export async function getAwards(teams, owners, games) {
  const rawAwards = await fetchAwardData();
  return rawAwards.map(a => composeAward(a, teams, owners, games));
}
