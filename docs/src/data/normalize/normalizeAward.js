export function normalizeAward(row) {
  return {
    awardId: row["Award ID"],
    awardName: row["Award Name"],
    awardCategory: row["Award Category"],

    teamId: String(row["Team ID"] || ""),
    ownerId: String(row["Owner ID"] || ""),

    awardPoints: Number(row["Award Points"]),
    awardPlayerName: row["Award Player Name"],
    awardPlayerPosition: row["Award Player Position"],
    awardPlayerClass: row["Award Player Class"],
    awardNotes: row["Award Notes"],

    heisman: row["Heisman"],
    maxwell: row["Maxwell"],
    walterCamp: row["Walter Camp"],
    daveyOBrien: row["Davey O’Brien"],
    doakWalker: row["Doak Walker"],
    biletnikoff: row["Biletnikoff"],
    johnMackey: row["John Mackey"],
    outland: row["Outland"],
    rimington: row["Rimington"],
    nagurski: row["Nagurski"],
    bednarik: row["Bednarik"],
    thorpe: row["Thorpe"],
    butkus: row["Butkus"],
    rayGuy: row["Ray Guy"],
    louGroza: row["Lou Groza"],
    paulHornung: row["Paul Hornung"],
    campbellTrophy: row["Campbell Trophy"],

    consensusAllAmericans: row["Consensus All‑Americans"],
    firstTeamAllAmericans: row["First‑Team All‑Americans"],

    playerOfTheYear: row["Player of the Year"],
    coachOfTheYear: row["Coach of the Year"],
    freshmanOfTheYear: row["Freshman of the Year"],

    finishTop25: row["Finish Top 25"] === "TRUE",
    finishTop10: row["Finish Top 10"] === "TRUE",
    finish1: row["Finish 1"] === "TRUE",

    season: Number(row["Season"] || 2026),
    createdTimestamp: new Date(row["Created Timestamp"] || new Date()),
    updatedTimestamp: new Date(row["Updated Timestamp"] || new Date()),
    updatedBy: String(row["Updated By"] || "Migration Script"),
    updateFlag: row["Update Flag"] === "TRUE",
    version: Number(row["Version"] || 1),
    lastAction: String(row["Last Action"] || "Migrated from V1"),
    actionNotes: String(row["Action Notes"] || "Auto-migration"),
    updatedByScript: row["Updated By Script"] === "TRUE",
    updatedByHuman: row["Updated By Human"] === "TRUE",
    status: String(row["Status"] || "Active"),
    valid: row["Valid"] === "TRUE",

    raw: row
  };
}
