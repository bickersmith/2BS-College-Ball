// scripts/router/routes.js

export const routes = {
  "/index.html": {
    name: "home",
    requiredParams: []
  },
  "/teams.html": {
    name: "teams",
    requiredParams: []
  },
  "/team.html": {
    name: "team",
    requiredParams: ["teamId"]
  },
  "/owners.html": {
    name: "owners",
    requiredParams: []
  },
  "/owner.html": {
    name: "owner",
    requiredParams: ["ownerId"]
  },
  "/schedule.html": {
    name: "schedule",
    requiredParams: []
  },
  "/game.html": {
    name: "game",
    requiredParams: ["gameId"]
  },
  "/standings.html": {
    name: "standings",
    requiredParams: []
  },
  "/awards.html": {
    name: "awards",
    requiredParams: []
  },
  "/draft.html": {
    name: "draft",
    requiredParams: []
  },
  "/rivalries.html": {
    name: "rivalries",
    requiredParams: []
  },
  "/week.html": {
    name: "week",
    requiredParams: ["week"]
  },
  "/preseason.html": {
    name: "preseason",
    requiredParams: []
  }
};
