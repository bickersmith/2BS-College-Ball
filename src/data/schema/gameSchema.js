export const gameSchema = {
  required: [
    "gameId",
    "teamId",
    "opponentId",
    "leagueId",
    "seasonId"
  ],

  fields: {
    gameId: "string",
    teamId: "string",
    opponentId: "string",

    week: "number",
    gameDate: "date",
    gameType: "string",
    postseasonType: "string",
    bowlName: "string",

    schoolScore: "number",
    opponentScore: "number",
    result: "string",
    ot: "boolean",

    rivalry: "boolean",
    opponentRank: "number",
    rankStart: "number",
    rankEnd: "number",

    venue: "string",
    location: "string",
    attendance: "number",
    broadcastNetwork: "string",
    weather: "string",
    temperature: "number",
    conditions: "string",
    neutralSite: "boolean",

    gameDescription: "string",
    gameNotes: "string",

    leagueId: "string",
    seasonId: "string",

    createdTimestamp: "date",
    updatedTimestamp: "date",
    updatedBy: "string",
    updateFlag: "boolean",
    version: "number",
    lastAction: "string",
    actionNotes: "string",
    updatedByScript: "boolean",
    updatedByHuman: "boolean",
    status: "string",
    valid: "boolean"
  }
};
