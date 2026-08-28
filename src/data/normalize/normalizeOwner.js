import { log } from "../../scripts/diagnostics/logger.js";

export function normalizeOwner(header, row) {

  const get = key => row[header.indexOf(key)];
  const owner = {
    leagueId: get("LeagueID"),
    season: get("Season"),
    ownerId: String(get("OwnerID") || "").trim(),
    ownerName: get("OwnerName"),
    ownerAbbreviation: get("OwnerAbbreviation"),
    ownerSlug: get("OwnerSlug"),
    ownerEmail: get("OwnerEmail"),
    ownerTeamColorPrimary: get("OwnerTeamColorPrimary"),
    ownerTeamColorSecondary: get("OwnerTeamColorSecondary"),
    ownerTeamColorAlternate: get("OwnerTeamColorAlternate"),
    ownerNotes: get("OwnerNotes"),
    createdTimestamp: get("CreatedTimestamp"),
    updatedTimestamp: get("UpdatedTimestamp"),
    updatedBy: get("UpdatedBy"),
    updateFlag: get("UpdateFlag"),
    version: get("Version"),
    lastAction: get("LastAction"),
    actionNotes: get("ActionNotes"),
    updatedByScript: get("UpdatedByScript"),
    updatedByHuman: get("UpdatedByHuman"),
    status: get("Status"),
    valid: get("Valid")
  };


//log (owner);

  return owner;

}
