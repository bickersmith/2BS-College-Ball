// src/components/cards/gameCard.js

export function gameCard(game, teams, size = "md") {

  const away = game.awayTeam;
  const home = game.homeTeam;

  const awayLogo = away.teamLogo || "";
  const homeLogo = home.teamLogo || "";

  const awayLogoHtml = awayLogo ? `<img src="${awayLogo}" class="team-logo-sm">` : "";
  const homeLogoHtml = homeLogo ? `<img src="${homeLogo}" class="team-logo-sm">` : "";

  return `
    <a href="game.html?game=${game.gameId}" class="card-link" onclick="stopCardClick(event)">
      <div class="game-card game-card-${size}">

        <!-- MATCHUP -->
        <div class="game-card-matchup">
          ${awayLogoHtml}
          <span class="team-name">${away.teamName}</span>

          <span class="at-symbol">@</span>

          <span class="team-name">${home.teamName}</span>
          ${homeLogoHtml}
        </div>

        <!-- SCORE -->
        <div class="game-card-score">
          ${game.score.away} – ${game.score.home}
        </div>

        <!-- META -->
        <div class="game-card-meta">
          <div>${game.dateFormatted}</div>
          <div>${game.venue}</div>
          <div>${game.location}</div>
        </div>

      </div>
    </a>
  `;
}
