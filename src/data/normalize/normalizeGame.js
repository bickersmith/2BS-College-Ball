export function normalizeGame(row) {
  return {
    gameId: String(row["Game ID"] || ""),
    gameUuid: String(row["Game UUID"] || ""),
    espnGameId: String(row["ESPN Game ID"] || ""),
    cfbdGameId: String(row["CFBD Game ID"] || ""),

    gameDate: row["Game Date"] ? new Date(row["Game Date"]) : null,
    bowlName: String(row["Bowl Name"] || ""),
    week: Number(row["Week"] || 0),
    weekDescription: String(row["Week Description"] || ""),
    gameType: String(row["Game Type"] || ""),
    postseasonType: String(row["Postseason Type"] || ""),
    gameDescription: String(row["Game Description"] || ""),
    gameNotes: String(row["Game Notes"] || ""),

    espnKickoffTime: String(row["ESPN Kickoff Time"] || ""),
    espnVenue: String(row["ESPN Venue"] || ""),
    espnBroadcastNetwork: String(row["ESPN Broadcast Network"] || ""),

    cfbdVenue: String(row["CFBD Venue"] || ""),
    cfbdWeather: String(row["CFBD Weather"] || ""),
    cfbdTemperature: Number(row["CFBD Temperature"] || 0),
    cfbdConditions: String(row["CFBD Conditions"] || ""),
    cfbdAttendance: Number(row["CFBD Attendance"] || 0),
    cfbdRank: Number(row["CFBD Rank"] || 0),

    neutral: row["Neutral"] === "TRUE",
    gameVenue: String(row["Game Venue"] || ""),
    gameLocation: String(row["Game Location"] || ""),
    gameAttendance: Number(row["Game Attendance"] || 0),
    gameBroadcastNetwork: String(row["Game Broadcast Network"] || ""),
    gameWeather: String(row["Game Weather"] || ""),
    gameTemperature: Number(row["Game Temperature"] || 0),
    gameConditions: String(row["Game Conditions"] || ""),

    gameDuration: String(row["Game Duration"] || ""),
    gameKeyPlays: String(row["Game Key Plays"] || ""),
    gameSummary: String(row["Game Summary"] || ""),

    teamId: String(row["Team ID"] || ""),
    opponent: String(row["Opponent"] || ""),
    opponentId: String(row["Opponent ID"] || ""),
    opponentRank: Number(row["Opponent Rank"] || 0),
    rivalry: row["Rivalry"] === "TRUE",

    schoolScore: Number(row["School Score"] || 0),
    opponentScore: Number(row["Opponent Score"] || 0),

    rankStart: Number(row["Rank Start"] || 0),
    rankEnd: Number(row["Rank End"] || 0),

    result: String(row["Result"] || ""),
    ot: row["OT"] === "TRUE",
    win: row["Win"] === "TRUE",
    loss: row["Loss"] === "TRUE",

    blowoutWin: row["Blowout Win"] === "TRUE",
    closeWin: row["Close Win"] === "TRUE",
    shutoutWin: row["Shutout Win"] === "TRUE",
    otWin: row["OT Win"] === "TRUE",
    otLoss: row["OT Loss"] === "TRUE",

    beatTop10: row["Beat Top 10"] === "TRUE",
    beatTop25: row["Beat Top 25"] === "TRUE",

    rivalWin: row["Rival Win"] === "TRUE",
    rivalLoss: row["Rival Loss"] === "TRUE",

    pollMove: Number(row["Poll Move"] || 0),
    weeklyTotal: Number(row["Weekly Total"] || 0),

    postseasonFlags: String(row["Postseason Flags"] || ""),
    postseasonPoints: Number(row["Postseason Points"] || 0),

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
    valid: row["Valid"] === "TRUE"
  };
}
