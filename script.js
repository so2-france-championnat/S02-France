let teams = [];
let players = [];
let matches = [];

/* =========================
   18 TEAMS / 90 PLAYERS
========================= */

for (let i = 1; i <= 18; i++) {

  let teamName = "Team " + i;
  let logo = `team${i}.jpg`;

  let teamPlayers = [];

  for (let j = 1; j <= 5; j++) {

    let name = `T${i}P${j}`;

    players.push({
      name,
      team: teamName,
      k: 0,
      a: 0,
      m: 0
    });

    teamPlayers.push(name);
  }

  teams.push({
    name: teamName,
    logo,
    pts: 0,
    players: teamPlayers
  });
}

/* =========================
   MATCHS FIXES
========================= */

for (let i = 0; i < 18; i++) {

  matches.push({
    t1: "Team " + (i + 1),
    t2: "Team " + ((i + 2) > 18 ? 1 : (i + 2)),
    s1: 0,
    s2: 0
  });
}

/* =========================
   NAV
========================= */

function show(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

/* =========================
   PLAYERS
========================= */

function renderPlayers() {

  let sorted = [...players].sort((a, b) => {
    return (b.k / (b.m || 1)) - (a.k / (a.m || 1));
  });

  const el = document.getElementById("playerList");
  if (!el) return;

  el.innerHTML = sorted.map((p, i) => {

    let kd = p.k / (p.m || 1);

    let cls = kd >= 2 ? "kd-good" : kd >= 1 ? "kd-mid" : "kd-bad";

    return `
    <div>
    ${i + 1}. ${p.name} (${p.team})<br>
    K:${p.k} A:${p.a} M:${p.m} —
    <span class="${cls}">KD ${kd.toFixed(2)}</span>
    </div>`;
  }).join("");
}

/* =========================
   TEAMS
========================= */

function renderTeams() {

  const el = document.getElementById("teamList");
  if (!el) return;

  el.innerHTML = teams.map(t => `
    <div>
      <img src="${t.logo}" width="35">
      <b>${t.name}</b><br>
      👥 ${t.players.join(" • ")}
    </div>
  `).join("");
}

/* =========================
   MATCHS
========================= */

function renderMatches() {

  const el = document.getElementById("matchList");
  if (!el) return;

  el.innerHTML = matches.map(m => {

    let s1 = m.s1 > m.s2 ? "win" : "lose";
    let s2 = m.s2 > m.s1 ? "win" : "lose";

    return `
    <div>
    ${m.t1} <span class="${s1}">${m.s1}</span>
    -
    <span class="${s2}">${m.s2}</span>
    ${m.t2}
    </div>`;
  }).join("");
}

/* =========================
   CLASSEMENT
========================= */

function renderRanking() {

  const el = document.getElementById("rankingList");
  if (!el) return;

  let sorted = [...teams].sort((a, b) => b.pts - a.pts);

  el.innerHTML = sorted.map((t, i) => {

    let cls = "rank-other";
    if (i === 0) cls = "rank1";
    else if (i === 1) cls = "rank2";
    else if (i === 2) cls = "rank3";

    return `
    <div class="${cls}">
    ${i + 1}. <img src="${t.logo}" width="25"> ${t.name} — ${t.pts} pts
    </div>`;
  }).join("");
}

/* =========================
   SAFE INIT (IMPORTANT)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  renderTeams();
  renderPlayers();
  renderMatches();
  renderRanking();
});