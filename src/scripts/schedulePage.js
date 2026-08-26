import { fetchGame } from "./src/data/fetch/fetchGame.js";
import { fetchTeam } from "./src/data/fetch/fetchTeam.js";
import { fetchOwner } from "./src/data/fetch/fetchOwner.js";
import { composeGame } from "./src/data/compose/composeGame.js";

export async function renderSchedulePage() {
  const teams = await fetchTeam();
  const owners = await fetchOwner();
  const rawGames = await fetchGame();

  const games = rawGames.map(g => composeGame(g, teams, owners));

  let html = `<h1>Season Schedule (Raw Mode)</h1>`;

  for (const game of games) {
    html += `
      <div>
            <strong>${game.homeTeam.teamName} vs ${game.awayTeam.teamName}</strong><br>
        Date: ${game.dateFormatted}<br>
        Location: ${game.location}<br>
        Score: ${game.score.home} - ${game.score.away}<br>
      </div>
      <hr>
    `;
  }

  document.getElementById("content").innerHTML = html;
}

renderSchedulePage();
