// src/data/normalize/normalizeStandingsRow.js

export function normalizeStandingsRow(header, row) {
  const obj = {};

  // Build raw object from header mapping
  header.forEach((key, i) => {
    obj[key] = row[i] ?? "";
  });

  return {
    teamId: obj.TeamID,
    ownerId: obj.OwnerID,

    teamScore: Number(obj.TeamScore || 0),
    opponentScore: Number(obj.OpponentScore || 0),

    win: String(obj.Win || "0").trim(),
    loss: String(obj.Loss || "0").trim(),

    gamePoints: Number(obj.GamePoints || 0),

    raw: obj
  };
}
