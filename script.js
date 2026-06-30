let teams = [];
let players = [];
let matches = [];

/* =========================
   CREATION EQUIPES + JOUEURS
========================= */

for(let i=1;i<=8;i++){

    let teamName = "Team " + i;
    let logo = `team${i}.jpg`;

    let teamPlayers=[];

    for(let j=1;j<=3;j++){

        let playerName=`T${i}P${j}`;

        let history=[];

        for(let m=1;m<=14;m++){

            history.push({
                match:m,
                opponent:"Team " + (((i+m-1)%8)+1),
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
   56 MATCHS
========================= */

for(let i=0;i<teams.length;i++){

    for(let j=i+1;j<teams.length;j++){

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
    .forEach(x=>x.classList.remove("active"));

    document.getElementById(page)
    .classList.add("active");

}

/* =========================
   LEADERBOARD
========================= */

function renderPlayers(){

    document.getElementById("playerStats").innerHTML="";

    let sorted=[...players].sort((a,b)=>{
        return (b.k/(b.m||1))-(a.k/(a.m||1));
    });

    document.getElementById("playerList").innerHTML=
    sorted.map((p,i)=>{

        let kd=p.k/(p.m||1);

        let cls="kd-bad";

        if(kd>=2) cls="kd-good";
        else if(kd>=1) cls="kd-mid";

        return `
        <div class="card">
            ${i+1}. ${p.name} (${p.team})<br>
            K:${p.k} A:${p.a} D:${p.m}<br>
            <span class="${cls}">
            KD ${kd.toFixed(2)}
            </span>
        </div>
        `;

    }).join("");

}

/* =========================
   MENU STATS
========================= */

function renderStatsMenu(){

    document.getElementById("playerList").innerHTML="";

    document.getElementById("playerStats").innerHTML=
    players.map(p=>`
        <div class="card clickable"
             onclick="showPlayerStats('${p.name}')">
             📊 ${p.name}
        </div>
    `).join("");

}

/* =========================
   FICHE JOUEUR
========================= */

function showPlayerStats(name){

    let player=players.find(x=>x.name===name);

    document.getElementById("playerStats").innerHTML=`

        <div class="card">

        <button onclick="renderStatsMenu()">
        ← Retour
        </button>

        <h2>${player.name}</h2>

        <b>${player.team}</b><br><br>

        Kills : ${player.k}<br>
        Assists : ${player.a}<br>
        Deaths : ${player.m}<br><br>

        <b>KD :
        ${(player.k/(player.m||1)).toFixed(2)}
        </b>

        <hr>

        ${player.history.map(match=>`
            <div class="card"
                 style="margin-top:10px;">

                Match ${match.match}
                vs ${match.opponent}<br>

                ${match.k} K<br>
                ${match.a} A<br>
                ${match.d} D

            </div>
        `).join("")}

        </div>

    `;

}

/* =========================
   TEAMS
========================= */

function renderTeams(){

    document.getElementById("teamList").innerHTML=
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

    document.getElementById("matchList").innerHTML=
    matches.map(m=>{

        let s1=m.s1>m.s2?"win":"lose";
        let s2=m.s2>m.s1?"win":"lose";

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

    let sorted=[...teams]
    .sort((a,b)=>b.pts-a.pts);

    document.getElementById("rankingList").innerHTML=
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

window.onload=()=>{

    renderTeams();
    renderPlayers();
    renderMatches();
    renderRanking();

};
