import { loadConfig } from "./config/env.js";
import { getGames } from "./api/api.games.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners } from "./api/api.owners.js";
import { gameCard } from "../components/cards/gameCard.js";

console.log("GAME PAGE: loaded");

await loadConfig();

function getGameIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("game");
}

export async function renderGamePage() {
  const gameId = getGameIdFromUrl();
  console.log("GAME PAGE: gameId =", gameId);

  // Fetch composed data
  const games = await getGames();     // composed games
  const teams = await getTeams();     // composed teams
  const owners = await getOwners();   // composed owners

  // Find the composed game
  const game = games.find(g => g.gameId === gameId);

  const container = document.getElementById("content");

  if (!game) {
    container.innerHTML = `<h1>Game Not Found</h1>`;
    return;
  }

  console.log("GAME PAGE: game =", game);

  // Render the main game card
  container.innerHTML = gameCard(game, "xl");

  // ---------------------------------------
  // Extra Details Section
  // ---------------------------------------

  const home = game.homeTeam;
  const away = game.awayTeam;

  container.innerHTML += `
    <h2>Matchup</h2>
    <p><strong>${home.teamName}</strong> vs <strong>${away.teamName}</strong></p>
    <p><strong>Date:</strong> ${game.dateFormatted}</p>
    <p><strong>Venue:</strong> ${game.venue}</p>
    <p><strong>Location:</strong> ${game.location}</p>
    <p><strong>Neutral Site:</strong> ${game.neutral ? "Yes" : "No"}</p>

    <h2>Score</h2>
    <p><strong>${home.teamName}:</strong> ${game.score.home}</p>
    <p><strong>${away.teamName}:</strong> ${game.score.away}</p>

    <h2>Teams</h2>
    <p><a href="team.html?team=${home.teamId}">View ${home.teamName}</a></p>
    <p><a href="team.html?team=${away.teamId}">View ${away.teamName}</a></p>

    <hr>
    <p><a href="games.html">Back to Games</a></p>
  `;
}

renderGamePage();



/*
import { loadConfig } from "./config/env.js";
import { getGames } from "./api/api.games.js";
import { getGameById } from "./api/api.games.js";
import { getTeams } from "./api/api.teams.js";

console.log("GAME PAGE: loaded");

await loadConfig();

function getGameIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("game");
}

export async function renderGamePage() {
  const gameId = getGameIdFromUrl();
  console.log("GAME PAGE: gameId =", gameId);

  const games = await getGames();
  const teams = await getTeams();

  const game = games.find(g => g.gameId == gameId);

  const container = document.getElementById("content");

  if (!game) {
    container.innerHTML = `<h1>Game Not Found</h1>`;
    return;
  }

  const homeTeam = teams.find(t => t.teamId == game.teamId);
  const awayTeam = teams.find(t => t.teamId == game.opponentId);

  container.innerHTML = `
    <h1>${homeTeam.teamName} vs ${awayTeam.teamName}</h1>

    <h3>Game Info</h3>
    <p><strong>Game ID:</strong> ${game.gameId}</p>
    <p><strong>Date:</strong> ${game.gameDate}</p>
    <p><strong>Week:</strong> ${game.week} — ${game.weekDescription}</p>
    <p><strong>Type:</strong> ${game.gameType}</p>
    <p><strong>Venue:</strong> ${game.gameVenue}</p>
    <p><strong>Location:</strong> ${game.gameLocation}</p>

    <h3>Score</h3>
    <p><strong>${homeTeam.teamName}:</strong> ${game.schoolScore}</p>
    <p><strong>${awayTeam.teamName}:</strong> ${game.opponentScore}</p>
    <p><strong>Result:</strong> ${game.result}</p>

    <h3>Teams</h3>
    <p><a href="team.html?team=${homeTeam.teamId}">${homeTeam.teamName}</a></p>
    <p><a href="team.html?team=${awayTeam.teamId}">${awayTeam.teamName}</a></p>

    <h3>Details</h3>
    <p><strong>Rivalry:</strong> ${game.rivalry}</p>
    <p><strong>Opponent Rank:</strong> ${game.opponentRank}</p>
    <p><strong>Rank Start:</strong> ${game.rankStart}</p>
    <p><strong>Rank End:</strong> ${game.rankEnd}</p>

    <h3>Weather</h3>
    <p><strong>Weather:</strong> ${game.gameWeather}</p>
    <p><strong>Temperature:</strong> ${game.gameTemperature}</p>
    <p><strong>Conditions:</strong> ${game.gameConditions}</p>

    <h3>Attendance</h3>
    <p><strong>Attendance:</strong> ${game.gameAttendance}</p>

    <h3>Summary</h3>
    <p>${game.gameSummary}</p>

    <h3>Timestamps</h3>
    <p><strong>Created:</strong> ${game.createdTimestamp}</p>
    <p><strong>Updated:</strong> ${game.updatedTimestamp}</p>
    <p><strong>Updated By:</strong> ${game.updatedBy}</p>

    <hr>
    <p><a href="teams.html">Back to Teams</a></p>
  `;
}

renderGamePage();
*/