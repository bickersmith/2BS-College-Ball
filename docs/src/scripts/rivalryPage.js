import { loadConfig } from "/src/scripts/config/env.js";
import { loadNavigation } from "/src/utils/navigation.js";

import { getGames } from "/src/scripts/api/api.games.js";
import { getTeams } from "/src/scripts/api/api.teams.js";
import { getOwners } from "/src/scripts/api/api.owners.js";

import { gameCard } from "/src/components/cards/gameCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigation();
  renderRivalries();
});

async function renderRivalries() {
  const container = document.getElementById("content");

  const games = await getGames();
  const teams = await getTeams();
  const owners = await getOwners();

  // hydrate games EXACTLY like gamesPage does
  const hydratedGames = games.map(g => {
    const home = teams.find(t => t.teamId === g.teamId);
    const away = teams.find(t => t.teamId === g.opponentTeamId);

    return {
      ...g,
      homeTeam: home,
      awayTeam: away,
      score: {
        home: Number(g.teamScore),
        away: Number(g.opponentScore)
      },
      dateFormatted: g.gameDate,
      flags: {
        Rivalry: g.rivalry === true
      }
    };
  });


  const rivalryGames = hydratedGames.filter(g => g.rivalry === 1);

  const gameCardsHtml = rivalryGames
    .map(game => gameCard(game, teams, "md"))
    .join("");

  container.innerHTML = `
    <h1 class="page-title">Rivalry Games</h1>

    <div class="games-card-grid">
      ${gameCardsHtml}
    </div>
  `;
}
