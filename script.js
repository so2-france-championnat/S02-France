let teams = [];
let players = [];
let matches = [];

/* =========================
   18 TEAMS / 90 PLAYERS FIXES
========================= */

for (let i = 1; i <= 18; i++) {

  let teamName = "Team " + i;
  let logo = `team${i}.jpg`;

  let teamPlayers = [];

  for (let j = 1; j <= 5; j++) {

    let name = `T${i}P${j}`;

    let player = {
      name,
      team: teamName,
      k: 0,
      a: 0,
      m: 0
    };

    players.push(player);
    teamPlayers.push(name);
  }

  teams.push({
    name: teamName,
    logo: logo,
    pts: 0,
    players: teamPlayers
  });
}

/* =========================
   MATCHS FIXES (SANS RANDOM)
========================= */

for (let i = 0; i < 20; i++) {

  let t1 = teams[i];
  let t2 = teams[(i + 1) % teams.length];

  matches.push({
    t1: t1.name,
    t2: t2.name,
    s1: 0,
    s2: 0
  });
}

/* =========================
   NAVIGATION
========================= */

function show(p) {
  document.querySelectorAll(".page").forEach(x => x.classList.remove("active"));
  document.getElementById(p).classList.add("active");
}

/* =========================
   PLAYERS (KD FIXE + STABLE)
========================= */

function renderPlayers() {

  let sorted = [...players].sort((a, b) => {
    return (b.k / (b.m || 1)) - (a.k / (a.m || 1));
  });

  document.getElementById("playerList").innerHTML =
    sorted.map((p, i) => {

      let kd = p.k / (p.m || 1);

      let cls = "kd-bad"; // tout à 0 donc neutre
      if (kd >= 2) cls = "kd-good";
      else if (kd >= 1) cls = "kd-mid";

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
  document.getElementById("teamList").innerHTML =
    teams.map(t => `
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

  document.getElementById("matchList").innerHTML =
    matches.map(m => {

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
   CLASSEMENT EQUIPES
========================= */

function renderRanking() {

  let sorted = [...teams].sort((a, b) => b.pts - a.pts);

  document.getElementById("rankingList").innerHTML =
    sorted.map((t, i) => {

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
   INIT
========================= */

function render() {
  renderTeams();
  renderPlayers();
  renderMatches();
  renderRanking();
}

render();