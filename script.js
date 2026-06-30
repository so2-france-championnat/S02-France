let teams = [];
let players = [];
let matches = [];

let currentPlayer = null;

/* =========================
   8 TEAMS / 24 PLAYERS
========================= */

for (let i = 1; i <= 8; i++) {

    let teamName = "Team " + i;
    let logo = `team${i}.jpg`;

    let teamPlayers = [];

    for (let j = 1; j <= 3; j++) {

        let playerName = `T${i}P${j}`;

        let history = [];

        for (let m = 1; m <= 14; m++) {
            history.push({
                opponent: "Team " + (((i + m - 1) % 8) + 1),
                k: 0,
                a: 0,
                d: 0
            });
        }

        players.push({
            name: playerName,
            team: teamName,
            k: 0,
            a: 0,
            m: 0,
            history: history
        });

        teamPlayers.push(playerName);
    }

    teams.push({
        name: teamName,
        logo: logo,
        pts: 0,
        players: teamPlayers
    });
}

/* =========================
   56 MATCHES
========================= */

for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {

        matches.push({
            t1: teams[i].name,
            t2: teams[j].name,
            s1: 0,
            s2: 0
        });

        matches.push({
            t1: teams[j].name,
            t2: teams[i].name,
            s1: 0,
            s2: 0
        });
    }
}

/* =========================
   NAVIGATION
========================= */

function show(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(page).classList.add("active");
}

/* =========================
   PLAYER DETAILS
========================= */

function showPlayer(name) {

    let player = players.find(p => p.name === name);

    if (!player) return;

    currentPlayer = player;

    document.getElementById("playerList").innerHTML = `
        <div class="card">

            <h2>${player.name}</h2>

            <p><b>Team :</b> ${player.team}</p>

            <p>Kills : ${player.k}</p>
            <p>Assists : ${player.a}</p>
            <p>Deaths : ${player.m}</p>

            <p>
            <b>KD :
            ${(player.k / (player.m || 1)).toFixed(2)}
            </b>
            </p>

            <hr>

            ${player.history.map((match,index)=>`
                <div class="card" style="margin-top:10px;">
                    <b>Match ${index+1} vs ${match.opponent}</b><br>
                    ${match.k} K<br>
                    ${match.a} A<br>
                    ${match.d} D
                </div>
            `).join("")}

            <button onclick="renderPlayers()" style="margin-top:20px;">
                Retour au classement
            </button>

        </div>
    `;
}

/* =========================
   PLAYERS
========================= */

function renderPlayers() {

    let sorted = [...players].sort((a,b)=>{
        return (b.k/(b.m||1))-(a.k/(a.m||1));
    });

    document.getElementById("playerList").innerHTML =
    sorted.map((p,i)=>{

        let kd = p.k/(p.m||1);

        let cls =
            kd >= 2 ? "kd-good" :
            kd >= 1 ? "kd-mid" :
            "kd-bad";

        return `
        <div class="card clickable"
             onclick="showPlayer('${p.name}')">

            ${i+1}. ${p.name}
            (${p.team})<br>

            K:${p.k}
            A:${p.a}
            M:${p.m}

            <br>

            <span class="${cls}">
                KD ${kd.toFixed(2)}
            </span>

        </div>
        `;
    }).join("");
}

/* =========================
   TEAMS
========================= */

function renderTeams() {

    document.getElementById("teamList").innerHTML =
    teams.map(t=>`
        <div class="card">
            <img src="${t.logo}" width="35">
            <b>${t.name}</b><br>
            👥 ${t.players.join(" • ")}
        </div>
    `).join("");
}

/* =========================
   MATCHES
========================= */

function renderMatches() {

    document.getElementById("matchList").innerHTML =
    matches.map(m=>{

        let s1 =
            m.s1 > m.s2 ? "win" :
            m.s1 < m.s2 ? "lose" :
            "";

        let s2 =
            m.s2 > m.s1 ? "win" :
            m.s2 < m.s1 ? "lose" :
            "";

        return `
        <div class="card">

            ${m.t1}

            <span class="${s1}">
                ${m.s1}
            </span>

            -

            <span class="${s2}">
                ${m.s2}
            </span>

            ${m.t2}

        </div>
        `;
    }).join("");
}

/* =========================
   RANKINGS
========================= */

function renderRanking() {

    let sorted =
        [...teams].sort((a,b)=>b.pts-a.pts);

    document.getElementById("rankingList").innerHTML =
    sorted.map((t,i)=>{

        let cls;

        if(i===0) cls="rank1";
        else if(i===1) cls="rank2";
        else if(i===2) cls="rank3";
        else if(i<=5) cls="rank-blue";
        else cls="rank-red";

        return `
        <div class="${cls}">
            ${i+1}.
            <img src="${t.logo}" width="25">
            ${t.name}
            — ${t.pts} pts
        </div>
        `;
    }).join("");
}

/* =========================
   INIT
========================= */

window.onload = ()=>{
    renderTeams();
    renderPlayers();
    renderMatches();
    renderRanking();
};
