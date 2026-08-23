// ===============================
// 2BS College Ball — fetchSheet.js
// Master Data Engine (Google Sheets API)
// ===============================

// Your keys
const SPREADSHEET_ID = "1FkyD_4ymAcNG8L7srOn46S4FkTb4FyDnV-AymJMml-Q";
const API_KEY = "AIzaSyCMjMKQpocsyoQjoXX9MpyOCmIcTLHXqVA";

// ===============================
// Fetch any sheet by name
// ===============================

export async function fetchSheet(sheetName) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.values || data.values.length === 0) {
    console.error("No data returned for sheet:", sheetName);
    return [];
  }

  const rows = data.values;
  const header = rows[0];
  const body = rows.slice(1);

  // Convert rows → objects using header names
  const objects = body.map(row => {
    const obj = {};
    header.forEach((colName, i) => {
      obj[colName] = row[i] || "";
    });
    return obj;
  });

  // Route sheets to correct normalizer
  if (sheetName === "Teams") return objects.map(normalizeTeamRow);
  if (sheetName === "Scores") return objects.map(normalizeScoreRow);

  // Everything else uses full master schema
  return objects.map(normalizeRow);
}

// ===============================
// SCORE NORMALIZER (schedule-friendly)
// ===============================

function normalizeScoreRow(row) {
  return {
    // Teams
    teamId: row["Team ID"] || "",
    teamSchool: row["Team School"] || "",
    teamNickname: row["Team Nickname"] || "",
    logoUrl: row["Team Logo URL"] || "",
    helmetUrl: row["Team Helmet URL"] || "",

    // Opponent
    opponent: row["Opponent"] || "",
    opponentId: row["Opponent ID"] || "",
    opponentRank: row["Opponent Rank"] || "",
    opponentLogoUrl: row["Opponent Logo URL"] || "",
    rivalry: row["Rivalry?"] || "",

    // Game info
    week: row["Week"] || "",
    weekDescription: row["Week Description"] || "",
    gameDate: row["Game Date"] || "",
    gameVenue: row["Game Venue"] || "",
    gameLocation: row["Game Location"] || "",
    gameType: row["Game Type"] || "",
    neutralSite: row["Neutral Site?"] || "",

    // IDs
    gameId: row["Game ID"] || "",
    gameUuid: row["Game UUID"] || "",
    espnGameId: row["ESPN Game ID"] || "",
    cfbdGameId: row["CFBD Game ID"] || "",

    // Raw access
    raw: row
  };
}

// ===============================
// TEAM NORMALIZER
// ===============================

function normalizeTeamRow(row) {
  return {
    // Core identity
    id: row["Team ID"] || "",
    name: row["Team Name"] || "",
    conference: row["Team Conference"] || "",
    location: row["Team Location"] || "",
    teamSchool: row["Team School"] || "",
    teamNickname: row["Team Nickname"] || "",
    teamFounded: row["Team Founded"] || "",
    teamDivision: row["Team Division"] || "",
    teamSlug: row["Team Slug"] || "",
    teamAbbreviation: row["Team Abbreviation"] || "",

    // Branding
    logoUrl: row["Team Logo URL"] || "",
    helmetUrl: row["Team Helmet URL"] || "",
    primaryColor: row["Primary Color"] || "",
    secondaryColor: row["Secondary Color"] || "",
    alternateColor: row["Alternate Color"] || "",

    // Mascot
    mascotName: row["Mascot Name"] || "",
    mascotImageUrl: row["Mascot Image URL"] || "",

    // Stadium
    homeStadium: row["Home Stadium"] || "",
    homeStadiumLocation: row["Home Stadium Location"] || "",

    // Owner
    ownerId: row["Owner ID"] || "",
    ownerName: row["Owner Name"] || "",
    ownerSlug: row["Owner Slug"] || "",
    ownerEmail: row["Owner Email"] || "",

    // Rankings
    preseasonRank: row["Preseason Rank"] || "",
    preseasonConferenceRank: row["Preseason Conference Rank"] || "",
    espnRank: row["ESPN Rank"] || "",

    // Motto / misc
    teamMotto: row["Team Motto"] || "",
    teamActive: row["Team Active"] || "",

    // Raw access
    raw: row
  };
}

// ===============================
// FULL MASTER NORMALIZER
// ===============================

function normalizeRow(row) {
  return {
    // Convenience fields
    id: row["Team ID"] || "",
    name: row["Team Name"] || "",
    conference: row["Team Conference"] || "",
    location: row["Team Location"] || "",
    logoUrl: row["Team Logo URL"] || "",
    helmetUrl: row["Team Helmet URL"] || "",
    preseasonRank: row["Preseason Rank"] || "",
    preseasonConferenceRank: row["Preseason Conference Rank"] || "",

    // Full schema (unchanged)
    source: row["Source"] || "",
    createdTimestamp: row["Created Timestamp"] || "",
    updatedTimestamp: row["Updated Timestamp"] || "",
    updatedBy: row["Updated By"] || "",
    season: row["Season"] || "",

    ownerId: row["Owner ID"] || "",
    ownerName: row["Owner Name"] || "",
    ownerAbbreviation: row["Owner Abbreviation"] || "",
    ownerSlug: row["Owner Slug"] || "",
    ownerEmail: row["Owner Email"] || "",
    ownerTeamColorPrimary: row["Owner Team Color Primary"] || "",
    ownerTeamColorSecondary: row["Owner Team Color Secondary"] || "",
    ownerTeamColorAlternate: row["Owner Team Color Alternate"] || "",

    teamSchool: row["Team School"] || "",
    teamNickname: row["Team Nickname"] || "",
    mascotName: row["Mascot Name"] || "",
    teamAbbreviation: row["Team Abbreviation"] || "",
    teamSlug: row["Team Slug"] || "",
    teamDivision: row["Team Division"] || "",
    teamFounded: row["Team Founded"] || "",
    teamActive: row["Team Active"] || "",

    primaryColor: row["Primary Color"] || "",
    secondaryColor: row["Secondary Color"] || "",
    alternateColor: row["Alternate Color"] || "",
    mascotImageUrl: row["Mascot Image URL"] || "",
    teamMotto: row["Team Motto"] || "",
    homeStadium: row["Home Stadium"] || "",
    homeStadiumLocation: row["Home Stadium Location"] || "",

    espnTeamId: row["ESPN Team ID"] || "",
    espnTeamSlug: row["ESPN Team Slug"] || "",
    espnLogoUrl: row["ESPN Logo URL"] || "",
    espnHelmetUrl: row["ESPN Helmet URL"] || "",
    espnRank: row["ESPN Rank"] || "",

    cfbdTeamId: row["CFBD Team ID"] || "",
    cfbdTeamSlug: row["CFBD Team Slug"] || "",

    gameUuid: row["Game UUID"] || "",
    gameId: row["Game ID"] || "",
    espnGameId: row["ESPN Game ID"] || "",
    cfbdGameId: row["CFBD Game ID"] || "",
    gameDate: row["Game Date"] || "",
    bowlName: row["Bowl Name"] || "",
    week: row["Week"] || "",
    weekDescription: row["Week Description"] || "",
    gameType: row["Game Type"] || "",
    postseasonType: row["Postseason Type"] || "",
    gameDescription: row["Game Description"] || "",
    gameNotes: row["Game Notes"] || "",

    espnKickoffTime: row["ESPN Kickoff Time"] || "",
    espnVenue: row["ESPN Venue"] || "",
    espnBroadcastNetwork: row["ESPN Broadcast Network"] || "",

    cfbdVenue: row["CFBD Venue"] || "",
    cfbdWeather: row["CFBD Weather"] || "",
    cfbdTemperature: row["CFBD Temperature"] || "",
    cfbdConditions: row["CFBD Conditions"] || "",
    cfbdAttendance: row["CFBD Attendance"] || "",
    cfbdRank: row["CFBD Rank"] || "",

    neutralSite: row["Neutral Site?"] || "",
    gameVenue: row["Game Venue"] || "",
    gameLocation: row["Game Location"] || "",
    gameAttendance: row["Game Attendance"] || "",
    gameBroadcastNetwork: row["Game Broadcast Network"] || "",
    gameWeather: row["Game Weather"] || "",
    gameTemperature: row["Game Temperature"] || "",
    gameConditions: row["Game Conditions"] || "",
    gameDuration: row["Game Duration"] || "",
    gameKeyPlays: row["Game Key Plays"] || "",
    gameSummary: row["Game Summary"] || "",

    opponent: row["Opponent"] || "",
    opponentId: row["Opponent ID"] || "",
    opponentRank: row["Opponent Rank"] || "",
    rivalry: row["Rivalry?"] || "",

    schoolScore: row["School Score"] || "",
    opponentScore: row["Opponent Score"] || "",
    rankStart: row["Rank Start"] || "",
    rankEnd: row["Rank End"] || "",
    result: row["Result"] || "",
    ot: row["OT?"] || "",
    win: row["Win"] || "",
    loss: row["Loss"] || "",
    blowoutWin: row["Blowout Win"] || "",
    closeWin: row["Close Win"] || "",
    shutoutWin: row["Shutout Win"] || "",
    otWin: row["OT Win"] || "",
    otLoss: row["OT Loss"] || "",
    beatTop10: row["Beat Top 10"] || "",
    beatTop25: row["Beat Top 25"] || "",
    rivalWin: row["Rival Win"] || "",
    rivalLoss: row["Rival Loss"] || "",
    pollMove: row["Poll Move"] || "",
    weeklyTotal: row["Weekly Total"] || "",

    postseasonFlags: row["Postseason Flags"] || "",
    postseasonPoints: row["Postseason Points"] || "",

    heisman: row["Heisman"] || "",
    maxwell: row["Maxwell"] || "",
    walterCamp: row["Walter Camp"] || "",
    daveyOBrien: row["Davey O’Brien"] || "",
    doakWalker: row["Doak Walker"] || "",
    biletnikoff: row["Biletnikoff"] || "",
    johnMackey: row["John Mackey"] || "",
    outland: row["Outland"] || "",
    rimington: row["Rimington"] || "",
    nagurski: row["Nagurski"] || "",
    bednarik: row["Bednarik"] || "",
    thorpe: row["Thorpe"] || "",
    butkus: row["Butkus"] || "",
    rayGuy: row["Ray Guy"] || "",
    louGroza: row["Lou Groza"] || "",
    paulHornung: row["Paul Hornung"] || "",
    campbellTrophy: row["Campbell Trophy"] || "",

    consensusAllAmericans: row["Consensus All‑Americans"] || "",
    firstTeamAllAmericans: row["First‑Team All‑Americans"] || "",
    playerOfTheYear: row["Player of the Year"] || "",
    coachOfTheYear: row["Coach of the Year"] || "",
    freshmanOfTheYear: row["Freshman of the Year"] || "",
    totalAwardPoints: row["Total Award Points"] || "",
    awardNotes: row["Award Notes"] || "",
    awardPlayerName: row["Award Player Name"] || "",
    awardPlayerPosition: row["Award Player Position"] || "",
    awardPlayerClass: row["Award Player Class"] || "",

    finishTop25: row["Finish Top 25"] || "",
    finishTop10: row["Finish Top 10"] || "",
    finish1: row["Finish 1"] || "",
    finalRankPoints: row["Final Rank Points"] || "",

    draftOwnerId: row["Draft Owner ID"] || "",
    draftPickNumber: row["Draft Pick Number"] || "",
    draftRound: row["Draft Round"] || "",
    draftSourceSheet: row["Draft Source Sheet"] || "",
    draftPickType: row["Draft Pick Type"] || "",
    draftNotes: row["Draft Notes"] || "",

    raw: row
  };
}
