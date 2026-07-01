let teams = [];
let players = [];
let matches = [];

let openedPlayer = null;

/* =========================
   8 EQUIPES / 24 JOUEURS
========================= */

for(let i = 1; i <= 8; i++){

    let teamName =
        i === 1
        ? "GrizzlySDBT"
        : "Team " + i;

    let logo = `team${i}.jpg`;

    let teamPlayers = [];

    for(let j = 1; j <= 3; j++){

        let playerName;

        if(i === 1){

            if(j === 1) playerName = "Freezy";
            if(j === 2) playerName = "Wanheda";
            if(j === 3) playerName = "Youko";

        }else{

            playerName = `T${i}P${j}`;

        }

        let history = [];

        for(let m = 1; m <= 14; m++){

            history.push({
                match:m,
                opponent:"TBD",
                k:0,
                a:0,
                d:0
            });

        }

        players.push({
            name:playerName,
            team:teamName,
            k:0,
            a:0,
            m:0,
            history:history
        });

        teamPlayers.push(playerName);
    }

    teams.push({
        name:teamName,
        logo:logo,
        pts:0,
        players:teamPlayers
    });
}

/* =========================
   MATCHS
========================= */

for(let i = 0; i < teams.length; i++){

    for(let j = i + 1; j < teams.length; j++){

        matches.push({
            t1:teams[i].name,
            t2:teams[j].name,
            s1:0,
            s2:0
        });

        matches.push({
            t1:teams[j].name,
            t2:teams[i].name,
            s1:0,
            s2:0
        });

    }
}

/* =========================
   NAVIGATION
========================= */

function show(page){
    document.querySelectorAll(".page")
    .forEach(p => p.classList.remove("active"));

    document.getElementById(page)
    .classList.add("active");
}

/* =========================
   LEADERBOARD
========================= */

function renderPlayers(){

    document.getElementById("playerStats").innerHTML = "";

    let sorted = [...players].sort((a,b)=>{
        return (b.k/(b.m||1)) - (a.k/(a.m||1));
    });

    document.getElementById("playerList").innerHTML =
    sorted.map((p,i)=>{

        let kd = p.k/(p.m||1);

        let kdClass =
            kd >= 2 ? "kd-good" :
            kd >= 1 ? "kd-mid" :
            "kd-bad";

        let rankClass;

        if(i === 0) rankClass = "player-rank1";
        else if(i === 1) rankClass = "player-rank2";
        else if(i === 2) rankClass = "player-rank3";
        else if(i <= 17) rankClass = "player-rank-blue";
        else rankClass = "player-rank-red";

        return `
        <div class="card ${rankClass}">
            ${i+1}. ${p.name} (${p.team})<br>
            K:${p.k} A:${p.a} D:${p.m}<br>

            <span class="${kdClass}">
                KD ${kd.toFixed(2)}
            </span>
        </div>
        `;
    }).join("");
}

/* =========================
   STATS
========================= */

function renderStatsMenu(){

    document.getElementById("playerList").innerHTML = "";

    let sorted = [...players].sort((a,b)=>{
        return (b.k/(b.m||1)) - (a.k/(a.m||1));
    });

    document.getElementById("playerStats").innerHTML =
    sorted.map((p,i)=>{

        let rankClass;

        if(i === 0) rankClass = "player-rank1";
        else if(i === 1) rankClass = "player-rank2";
        else if(i === 2) rankClass = "player-rank3";
        else if(i <= 17) rankClass = "player-rank-blue";
        else rankClass = "player-rank-red";

        return `
        <div class="card clickable ${rankClass}"
             onclick="togglePlayer('${p.name}')">

            <b>${i+1}. ${p.name}</b>
            (${p.team})

            ${openedPlayer === p.name ? `

                <hr>

                <b>Total :</b><br>
                Kills : ${p.k}<br>
                Assists : ${p.a}<br>
                Deaths : ${p.m}<br><br>

                <b>KD :
                ${(p.k/(p.m||1)).toFixed(2)}
                </b>

                <hr>

                ${p.history.map(match=>`
                    <div class="card" style="margin-top:10px;">
                        Match ${match.match}<br>
                        vs ${match.opponent}<br><br>

                        ${match.k} K<br>
                        ${match.a} A<br>
                        ${match.d} D
                    </div>
                `).join("")}

            ` : ""}

        </div>
        `;
    }).join("");
}

/* =========================
   OUVRIR / FERMER STATS
========================= */

function togglePlayer(name){

    if(openedPlayer === name){
        openedPlayer = null;
    }else{
        openedPlayer = name;
    }

    renderStatsMenu();
}

/* =========================
   TEAMS
========================= */

function renderTeams(){

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
   MATCHS
========================= */

function renderMatches(){

    document.getElementById("matchList").innerHTML =
    matches.map(m=>{

        let s1 = "";
        let s2 = "";

        if(m.s1 > m.s2) s1 = "win";
        if(m.s2 > m.s1) s2 = "win";

        if(m.s1 < m.s2) s1 = "lose";
        if(m.s2 < m.s1) s2 = "lose";

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

function renderRanking(){

    let sorted = [...teams]
    .sort((a,b)=>b.pts-a.pts);

    document.getElementById("rankingList").innerHTML =
    sorted.map((t,i)=>{

        let cls;

        if(i === 0) cls = "rank1";
        else if(i === 1) cls = "rank2";
        else if(i === 2) cls = "rank3";
        else if(i <= 5) cls = "rank-blue";
        else cls = "rank-red";

        return `
        <div class="card ${cls}">
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

window.onload = () => {
    renderTeams();
    renderPlayers();
    renderMatches();
    renderRanking();
};
