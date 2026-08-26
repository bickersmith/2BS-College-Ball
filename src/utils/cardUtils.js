// ===============================
// v2 Card Utilities (with debugging)
// ===============================


export function getClickableTeamLogo(team) {
  console.log("🔧 getClickableTeamLogo()", team);
  if (!team) return `<div class="team-logo missing"></div>`;
  return `
    <div class="team-logo" onclick="window.location.href='team.html?id=${team.teamId}'">
      <img src="${team.logoUrl}" alt="${team.teamName}" />
    </div>
  `;
}

export function getOwnerPill(owner) {
  console.log("🔧 getOwnerPill()", owner);
  if (!owner) return `<div class="owner-pill unknown">Unknown Owner</div>`;
  return `<div class="owner-pill">${owner.ownerName}</div>`;
}

export function formatGameDate(dateString) {
  console.log("🔧 formatGameDate()", dateString);

  if (!dateString) return "Unknown Date";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}


export function formatGameLocation(game) {
  console.log("🔧 formatGameLocation()", game);
  return game.location || "Unknown Location";
}

export function formatGameScore(game) {
  console.log("🔧 formatGameScore()", game);
  if (!game.score) return "TBD";
  return `${game.score.away} - ${game.score.home}`;
}

export function getAccentColor(team) {
  console.log("🔧 getAccentColor()", team);
  return team?.accentColor || "#333";
}

export function getCardSizeClass(size) {
  console.log("🔧 getCardSizeClass()", size);
  return size === "lg" ? "card-lg" : "card-md";
}
