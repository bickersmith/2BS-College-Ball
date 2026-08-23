export function loadHeader() {
  const header = document.getElementById("header");

  header.innerHTML = `
    <div class="header">
      <div class="header-inner">

        <a href="./index.html" class="header-logo-link">2BS College Ball</a>

        <nav class="header-nav">

          <a href="./index.html">Dashboard</a>
          <a href="./schedule.html">Schedule</a>
          <a href="./teams.html">Teams</a>
          <a href="./owners.html">Owners</a>
          <a href="./rivalries.html">Rivalries</a>
          <a href="./standings.html">Standings</a>
          <a href="./awards.html">Awards</a>
          <a href="./draft.html">Draft</a>
          <a href="./preseason.html">Preseason</a>

        </nav>

      </div>
    </div>
  `;
}
