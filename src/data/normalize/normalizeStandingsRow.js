// src/data/normalize/normalizeStandingsRow.js

export function normalizeStandingsRow(header, row) {
  const obj = {};

  // Map array-of-arrays into an object
  header.forEach((key, i) => {
    obj[key] = row[i] ?? "";
  });

  // Normalize win/loss
  const winRaw = String(obj.Win || "").trim();
  const lossRaw = String(obj.Loss || "").trim();

  const win =
    winRaw === "1" ||
    winRaw === "Y" ||
    winRaw === "true" ||
    winRaw === "TRUE";

  const loss =
    lossRaw === "1" ||
    lossRaw === "Y" ||
    lossRaw === "true" ||
    lossRaw === "TRUE";

  return {
    teamId: obj.TeamID,
    ownerId: obj.OwnerID,

    teamName: obj.TeamName,
    teamHomeAway: obj.TeamHomeAway,

    teamScore: Number(obj.TeamScore || 0),
    opponentScore: Number(obj.OpponentScore || 0),

    win,
    loss,

    gamePoints: Number(obj.GamePoints || 0),

    UpdateFlag: obj.UpdateFlag || "",

    raw: obj
  };
}
