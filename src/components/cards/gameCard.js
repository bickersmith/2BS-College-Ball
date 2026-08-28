// src/components/cards/gameCard.js

export function gameCard(game, teams, size = "md") {

  const team = game.team || game.homeTeam;
  const opponent = game.opponent || game.awayTeam;

  const teamLogo = team.teamLogo || "";
  const opponentLogo = opponent.teamLogo || "";

  const teamLogoHtml = teamLogo ? `<img src="${teamLogo}" class="team-logo-sm">` : "";
  const opponentLogoHtml = opponentLogo ? `<img src="${opponentLogo}" class="team-logo-sm">` : "";

  return `
    <a href="game.html?game=${game.gameId}" class="card-link" onclick="stopCardClick(event)">
      <div class="game-card game-card-${size}">

        <!-- MATCHUP ROW -->
        <div class="game-card-matchup">
          ${teamLogoHtml}
          <span class="team-name">${team.teamName}</span>

          <span class="at-symbol">@</span>

          <span class="team-name">${opponent.teamName}</span>
          ${opponentLogoHtml}
        </div>

        <!-- SCORE -->
        <div class="game-card-score">
          ${game.score.home ?? game.score.team} – ${game.score.away ?? game.score.opponent}
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
