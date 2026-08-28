/*//import { fetchOwnerData } from "../fetch/fetchOwner.js";
import { fetchOwnerData } from "../../data/fetch/fetchOwner.js";

//import { composeOwner } from "../compose/composeOwner.js";
import { composeOwner } from "../../data/compose/composeOwner.js";

export async function getOwners() {
  const raw = await fetchOwnerData();
  return raw.map(o => composeOwner(o));
}

export async function getOwner(ownerId) {
  const owners = await getOwners();
  return owners.find(o => o.ownerId === ownerId) || null;
}
*/

import { fetchOwnerData } from "../../data/fetch/fetchOwner.js";
import { composeOwner } from "../../data/compose/composeOwner.js";

export async function getOwners() {
  const owners = await fetchOwnerData();
  return owners.map(o => composeOwner(o));
}

export function updateOwners(owners) {
  window.__STATE__.owners = owners;
}

