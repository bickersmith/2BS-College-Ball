// src/data/migrations/migrations.js

// Each migration is:
// { id, description, apply: (record) => record }

export const teamMigrations = [
  {
    id: "team:addLeagueIdSeasonId",
    description: "Ensure leagueId and seasonId exist on team records",
    apply(team) {
      if (!team.leagueId && team.league) {
        team.leagueId = String(team.league);
      }
      if (!team.seasonId && team.season) {
        team.seasonId = String(team.season);
      }
      return team;
    }
  },
  {
    id: "team:defaultStatusValid",
    description: "Set default status/valid flags if missing",
    apply(team) {
      if (!team.status) team.status = "active";
      if (typeof team.valid === "undefined") team.valid = true;
      return team;
    }
  }
];

export const ownerMigrations = [
  {
    id: "owner:addLeagueIdSeasonId",
    description: "Ensure leagueId and seasonId exist on owner records",
    apply(owner) {
      if (!owner.leagueId && owner.league) {
        owner.leagueId = String(owner.league);
      }
      if (!owner.seasonId && owner.season) {
        owner.seasonId = String(owner.season);
      }
      return owner;
    }
  }
];

export const gameMigrations = [
  {
    id: "game:scoreFallbacks",
    description: "Normalize missing scores to 0",
    apply(game) {
      game.schoolScore = Number(game.schoolScore || 0);
      game.opponentScore = Number(game.opponentScore || 0);
      return game;
    }
  }
];

export const awardMigrations = [
  {
    id: "award:pointsFallback",
    description: "Normalize missing totalAwardPoints to 0",
    apply(award) {
      award.totalAwardPoints = Number(award.totalAwardPoints || 0);
      return award;
    }
  }
];

export const draftMigrations = [
  {
    id: "draft:pickNumberToNumber",
    description: "Ensure draftPickNumber is numeric",
    apply(draft) {
      draft.draftPickNumber = Number(draft.draftPickNumber);
      return draft;
    }
  }
];
