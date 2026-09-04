export function renderActivityFeed(activity) {
  const container = document.getElementById("owner-activity");
  if (!container) return;

  const gameItems = activity.games.map(g => `
    <div class="activity-item game">
      <h4>Game — Week ${g.week}</h4>
      <p>${g.result} ${g.score} vs ${g.opponent}</p>
    </div>
  `).join("");

  const awardItems = activity.awards.map(a => `
    <div class="activity-item award">
      <h4>Award — Week ${a.week}</h4>
      <p>${a.name} (${a.recipient})</p>
    </div>
  `).join("");

  const draftItems = activity.draft.map(d => `
    <div class="activity-item draft">
      <h4>Draft — Round ${d.round}</h4>
      <p>Pick ${d.pick}: ${d.player}</p>
    </div>
  `).join("");

  container.innerHTML = `
    <section class="activity-feed">
      ${gameItems}
      ${awardItems}
      ${draftItems}
    </section>
  `;
}
