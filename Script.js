let teams = [
  { name: "Alpha Squad", pts: 0, v: 0, d: 0 },
  { name: "Neo Titans", pts: 0, v: 0, d: 0 },
  { name: "Cyber Wolves", pts: 0, v: 0, d: 0 }
];

let matches = [];

// 🔁 UPDATE CLASSEMENT
function updateRanking() {
  const table = document.getElementById("rankingTable");
  table.innerHTML = "";

  teams
    .sort((a, b) => b.pts - a.pts)
    .forEach((t, i) => {
      table.innerHTML += `
        <tr class="row">
          <td>${i + 1}</td>
          <td><b>${t.name}</b></td>
          <td class="pts">${t.pts}</td>
          <td>${t.v}</td>
          <td>${t.d}</td>
        </tr>
      `;
    });
}

// ⚔️ AJOUT MATCH
function addMatch(teamA, teamB, scoreA, scoreB) {
  matches.push({ teamA, teamB, scoreA, scoreB });

  let A = teams.find(t => t.name === teamA);
  let B = teams.find(t => t.name === teamB);

  if (!A || !B) return;

  if (scoreA > scoreB) {
    A.v++; A.pts += 3;
    B.d++;
  } else {
    B.v++; B.pts += 3;
    A.d++;
  }

  renderMatches();
  updateRanking();
}

// 📺 AFFICHAGE MATCHS
function renderMatches() {
  const container = document.getElementById("matchs");

  let html = `<h2>⚔️ Matchs</h2>`;

  if (matches.length === 0) {
    html += `<p class="empty">Aucun match pour le moment.</p>`;
  }

  matches.forEach(m => {
    html += `
      <div class="match-card">
        <span>${m.teamA}</span>
        <b>${m.scoreA} - ${m.scoreB}</b>
        <span>${m.teamB}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 🎮 DEMO (tu peux supprimer après)
addMatch("Alpha Squad", "Neo Titans", 13, 9);
addMatch("Cyber Wolves", "Alpha Squad", 8, 13);

updateRanking();
