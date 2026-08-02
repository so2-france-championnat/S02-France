let teams = [];
let players = [];
let matches = [];

let openedPlayer = null;
let openedMatchTeam = null;

const purplePlayers = ["Akra", "Manji", "Nounours"];

function purpleName(name){
    return purplePlayers.includes(name)
        ? `<span class="purple-name">${name}</span>`
        : name;
}

/* =========================
   8 EQUIPES / 24 JOUEURS
========================= */

for(let i = 1; i <= 8; i++){

    let teamName;

if(i === 1){
    teamName = "BussGang";
}
else if(i === 2){
    teamName = "Nexus";
}
else if(i === 3){
    teamName = "VitriX";
}
else if(i === 4){
    teamName = "Grizzly SDBT";
}
else if(i === 5){
    teamName = "Vortex";
}
else if(i === 6){
    teamName = "CP-0";
}
else if(i === 7){
    teamName = "NSRP";
}
else if(i === 8){
    teamName = "Sp4rks"
}
else{
    teamName = "Team " + i;
}

    let logo = `team${i}.jpg`;

    let teamPlayers = [];

    let nbJoueurs = 4;

if(i === 1) nbJoueurs = 3; // BussGang
if(i === 2) nbJoueurs = 4; // Nexus
if(i === 3) nbJoueurs = 3; // VitriX
if(i === 4) nbJoueurs = 4; // Grizzly SDBT
if(i === 5) nbJoueurs = 3; // Vortex
if(i === 6) nbJoueurs = 3; // CP-0
if(i === 7) nbJoueurs = 4; // NSRP
if(i === 8) nbJoueurs = 4; // Sp4rks 
for(let j = 1; j <= nbJoueurs; j++){

        let playerName;

        if(i === 1){

    if(j === 1) playerName = "Akra";
    if(j === 2) playerName = "Homn";
    if(j === 3) playerName = "Suzuki";
    if(j === 4) playerName = "T1P4";

}
else if(i === 2){

    if(j === 1) playerName = "LaynOx";
    if(j === 2) playerName = "Gabin15";
    if(j === 3) playerName = "Qualites";
    if(j === 4) playerName = "Vlase";

}
else if(i === 3){

    if(j === 1) playerName = "Bri";
    if(j === 2) playerName = "Loic";
    if(j === 3) playerName = "Nounours";
    if(j === 4) playerName = "T3P4";

}
else if(i === 4){

    if(j === 1) playerName = "Freezy";
    if(j === 2) playerName = "Youko";
    if(j === 3) playerName = "Wanheda";
    if(j === 4) playerName = "ZoraYtB";

}
else if(i === 5){

    if(j === 1) playerName = "Narvalow";
    if(j === 2) playerName = "Stronex";
    if(j === 3) playerName = "Kurapika";
    if(j === 4) playerName = "T5P4";

}
else if(i === 6){

    if(j === 1) playerName = "Manji";
    if(j === 2) playerName = "Tata";
    if(j === 3) playerName = "Sharko";
    if(j === 4) playerName = "T6P4";

}
else if(i === 7){

    if(j === 1) playerName = "Nistugo";
    if(j === 2) playerName = "Go Silver";
    if(j === 3) playerName = "Ragnar";
    if(j === 4) playerName = "PickixBack";
   
}
else if(i === 8){

    if(j === 1) playerName = "OmarBapLO6";
    if(j === 2) playerName = "Moe Lester";
    if(j === 3) playerName = "Skiimi";
    if(j === 4) playerName = "Kitaro"
}
   
else{

    playerName = `T${i}P${j}`;

}

let history = [];

        for(let m = 1; m <= 14; m++){

            history.push({
    match:m,
    opponent:"TBD",
    k:0,
    a:0,
    d:0,
    result:""
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
    roundsWon:0,
    roundsLost:0,
    rd:0,
    players:teamPlayers
});
}

/* =========================
   MATCHS
========================= */

for(let i = 0; i < teams.length; i++){

    for(let j = i + 1; j < teams.length; j++){

        // Aller
        matches.push({
            t1: teams[i].name,
            t2: teams[j].name,
            s1:0,
            s2:0,
            mvp:null
        });

        // Retour
        matches.push({
            t1: teams[j].name,
            t2: teams[i].name,
            s1:0,
            s2:0,
            mvp:null
        });

    }

}

teams.forEach(team => {

    let teamMatches = matches.filter(
        m => m.t1 === team.name || m.t2 === team.name
    );

    team.players.forEach(playerName => {

        let player = players.find(
            p => p.name === playerName
        );

        for(let i = 0; i < teamMatches.length; i++){

            let match = teamMatches[i];

            player.history[i].opponent =
                match.t1 === team.name
                ? match.t2
                : match.t1;
        }
    });
});

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

    let kdA = a.k/(a.m||1);
    let kdB = b.k/(b.m||1);

    if(kdB !== kdA) return kdB - kdA;
    if(b.k !== a.k) return b.k - a.k;
    if(b.a !== a.a) return b.a - a.a;

    return 0;
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
        else if(i <= 22) rankClass = "player-rank-blue";
        else rankClass = "player-rank-red";

        let teamLogo = teams.find(t => t.name === p.team).logo;

return `
<div class="card ${rankClass}">

    <div style="display:flex;align-items:center;gap:12px;">

        <img src="${teamLogo}"
             style="width:45px;height:45px;border-radius:50%;object-fit:cover;">

        <div>
            ${i+1}. ${purpleName(p.name)} (${p.team})<br>
            K:${p.k} A:${p.a} D:${p.m}<br>

            <span class="${kdClass}">
                KD ${kd.toFixed(2)}
            </span>
        </div>

    </div>

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

    let kdA = a.k/(a.m||1);
    let kdB = b.k/(b.m||1);

    if(kdB !== kdA) return kdB - kdA;
    if(b.k !== a.k) return b.k - a.k;
    if(b.a !== a.a) return b.a - a.a;

    return 0;
});

    document.getElementById("playerStats").innerHTML =
    sorted.map((p,i)=>{

        let rankClass;

        if(i === 0) rankClass = "player-rank1";
        else if(i === 1) rankClass = "player-rank2";
        else if(i === 2) rankClass = "player-rank3";
        else if(i <= 22) rankClass = "player-rank-blue";
        else rankClass = "player-rank-red";

let teamLogo = teams.find(t => t.name === p.team).logo;
       
        return `
        <div class="card clickable ${rankClass} ${openedPlayer === p.name ? 'player-open' : ''}"
             onclick="togglePlayer('${p.name}')">

            <div style="display:flex;align-items:center;gap:12px;">

    <img src="${teamLogo}"
         style="width:45px;height:45px;border-radius:50%;object-fit:cover;">

    <div>
        <b>${i+1}. ${purpleName(p.name)}</b><br>
        (${p.team})
    </div>

</div>

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
    <div class="card" style="
    margin-top:10px;
    position:relative;
    overflow:hidden;
    border:2px solid ${
        match.result === "WIN"
            ? "#22c55e"
            : match.result === "LOSS"
                ? "#ef4444"
                : "transparent"
    };
">

    <div style="
        position:absolute;
        inset:0;
        pointer-events:none;
        border-radius:inherit;
        box-shadow:inset 0 0 18px ${
            match.result === "WIN"
                ? "rgba(34,197,94,.45)"
                : match.result === "LOSS"
                    ? "rgba(239,68,68,.45)"
                    : "transparent"
        };
    "></div>

    Match ${match.match}<br>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">

    <span>vs ${match.opponent}</span>

    <div style="display:flex;align-items:center;gap:8px;">

        ${
    match.result
    ? `<span style="
        color:${match.result==="WIN" ? "#22c55e" : "#ef4444"};
        font-size:11px;
        font-weight:bold;">
        ${match.result}
      </span>`
    : ""
}

        <img src="${teams.find(t => t.name === match.opponent)?.logo}"
             width="32"
             height="32"
             style="border-radius:50%;object-fit:cover;">

    </div>

</div>

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

function toggleMatchTeam(teamName){

    if(openedMatchTeam === teamName){
        openedMatchTeam = null;
    }else{
        openedMatchTeam = teamName;
    }

    renderMatches();
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

            👥 ${t.players.slice(0,3).map(purpleName).join(" • ")}

${t.players[3] ? `<br>🔄 ${purpleName(t.players[3])}` : ""}
        </div>
    `).join("");
}

/* =========================
   MATCHS
========================= */

function renderMatches(){

    document.getElementById("matchList").innerHTML =
    teams.map(team => {

        let teamMatches = matches.filter(
            m => m.t1 === team.name || m.t2 === team.name
        );

        return `
        <div class="card clickable"
     onclick="toggleMatchTeam('${team.name}')">

    <div class="match-team-header">

        <img src="${team.logo}" class="match-team-logo">

        <b>${team.name}</b>

    </div>

            ${openedMatchTeam === team.name ? `

                <hr>

                ${teamMatches.map(match => {

                    let matchNumber =
                        matches.indexOf(match) + 1;

                    let s1 = "";
                    let s2 = "";

                    if(match.s1 > match.s2) s1 = "win";
                    if(match.s2 > match.s1) s2 = "win";

                    if(match.s1 < match.s2) s1 = "lose";
                    if(match.s2 < match.s1) s2 = "lose";

                   let teamWon =
    (match.t1 === team.name && match.s1 > match.s2) ||
    (match.t2 === team.name && match.s2 > match.s1);

let resultText = "";

if(match.s1 !== 0 || match.s2 !== 0){
    resultText = teamWon ? "WIN" : "LOSS";
}

let borderColor =
    resultText === "WIN"
        ? "#22c55e"
        : resultText === "LOSS"
        ? "#ef4444"
        : "transparent";

                    return `
<div class="card match-card" style="
border:2px solid ${borderColor};
box-shadow:0 0 12px ${borderColor};
">

    <div style="
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:12px;">

        <div class="match-number">
            Match ${matchNumber}
        </div>

        ${
            resultText
            ? `<span style="
                color:${borderColor};
                font-weight:bold;
                font-size:15px;">
                ${resultText}
               </span>`
            : ""
        }

    </div>

    <div class="match-row">

        <span class="team-left">
            ${match.t1}
        </span>

        <span class="score">
            <span class="${s1 || 'pending'}">
                ${match.s1}
            </span>
            -
            <span class="${s2 || 'pending'}">
                ${match.s2}
            </span>
        </span>

        <span class="team-right">
            ${match.t2}
        </span>

    </div>

    ${
match.mvp
? `
<hr>

<div style="margin-top:12px;">

    <div style="
        font-size:18px;
        font-weight:bold;
        margin-bottom:6px;">
        👑 ${purpleName(match.mvp.name)}
    </div>

    <div>
        ${match.mvp.k} K •
        ${match.mvp.a} A •
        ${match.mvp.d} D •

        <span style="
            color:gold;
            font-weight:bold;">
            KD ${match.mvp.kd}
        </span>
    </div>

</div>
`
: ""
}

</div>
`;
                }).join("")}

            ` : ""}

        </div>
        `;
    }).join("");
}

/* =========================
   RANKINGS
========================= */

function renderRanking(){

    let sorted = [...teams]
.sort((a,b)=>{

    if(b.pts !== a.pts){
        return b.pts - a.pts;
    }

    if(b.rd !== a.rd){
        return b.rd - a.rd;
    }

    return 0;
});

    document.getElementById("rankingList").innerHTML =
    sorted.map((t,i)=>{

        let cls;
        let ptsClass;

        if(i === 0){
            cls = "rank1";
            ptsClass = "rank1-points";
        }
        else if(i === 1){
            cls = "rank2";
            ptsClass = "rank2-points";
        }
        else if(i === 2){
            cls = "rank3";
            ptsClass = "rank3-points";
        }
        else if(i <= 6){
            cls = "rank-blue";
            ptsClass = "rank-blue-points";
        }
        else{
            cls = "rank-red";
            ptsClass = "rank-red-points";
        }

        return `
<div class="card ${cls} ranking-card">

    <div class="ranking-left">
        ${i+1}.
        <img src="${t.logo}" width="25">
        ${t.name}
    </div>

    <div class="ranking-right">
        <span class="${ptsClass}">
            ${t.pts} pts
        </span>

        |

        <span class="${ptsClass}">
            RD ${t.rd >= 0 ? "+" : ""}${t.rd}
        </span>
    </div>

</div>
`;
    }).join("");
}

function updateMatch(matchNumber, score1, score2, stats1, stats2){

    let match = matches[matchNumber - 1];

    if(!match) return;

    // Empêche de compter deux fois le même match
    if(match.s1 !== 0 || match.s2 !== 0){
        return;
    }

    // Mise à jour du score
    match.s1 = score1;
    match.s2 = score2;

    // Recherche des équipes
    let team1 = teams.find(t => t.name === match.t1);
    let team2 = teams.find(t => t.name === match.t2);

    // Points championnat
    if(score1 > score2){
        team1.pts += 3;
    }else{
        team2.pts += 3;
    }

    // RD
    team1.rd += score1 - score2;
    team2.rd += score2 - score1;

    team1.roundsWon += score1;
    team1.roundsLost += score2;

    team2.roundsWon += score2;
    team2.roundsLost += score1;

    // Stats équipe 1
    stats1.forEach(stat => {

        let player = players.find(
            p => p.name === stat[0]
        );

        if(!player) return;

        player.k += stat[1];
        player.a += stat[2];
        player.m += stat[3];

        let historyMatch = player.history.find(
            h => h.opponent === team2.name &&
                 h.k === 0 &&
                 h.a === 0 &&
                 h.d === 0
        );

        if(historyMatch){
            historyMatch.k = stat[1];
            historyMatch.a = stat[2];
            historyMatch.d = stat[3];
           historyMatch.result = score1 === 13 ? "WIN" : "LOSS";
        }
    });

    // Stats équipe 2
    stats2.forEach(stat => {

        let player = players.find(
            p => p.name === stat[0]
        );

        if(!player) return;

        player.k += stat[1];
        player.a += stat[2];
        player.m += stat[3];

        let historyMatch = player.history.find(
            h => h.opponent === team1.name &&
                 h.k === 0 &&
                 h.a === 0 &&
                 h.d === 0
        );

        if(historyMatch){
            historyMatch.k = stat[1];
            historyMatch.a = stat[2];
            historyMatch.d = stat[3];
           historyMatch.result = score2 === 13 ? "WIN" : "LOSS";
        }
    });

// =========================
// MVP AUTOMATIQUE
// =========================

let allPlayers = [
    ...stats1,
    ...stats2
];

let best = allPlayers[0];

allPlayers.forEach(stat => {

    let bestKD = best[1] / (best[3] || 1);
    let statKD = stat[1] / (stat[3] || 1);

    if(
        statKD > bestKD ||

        (
            statKD === bestKD &&
            stat[1] > best[1]
        ) ||

        (
            statKD === bestKD &&
            stat[1] === best[1] &&
            stat[2] > best[2]
        )

    ){
        best = stat;
    }

});

match.mvp = {
    name: best[0],
    k: best[1],
    a: best[2],
    d: best[3],
    kd: (best[1] / (best[3] || 1)).toFixed(2)
};
   
    renderPlayers();
    renderStatsMenu();
    renderMatches();
    renderRanking();
}

updateMatch(1, 13, 2,
[
    ["Akra",19,1,5],
    ["Suzuki",13,3,6],
    ["Homn",10,2,5]
],
[
    ["On1zuka",9,1,14],
    ["LaynOx",4,0,14],
    ["Gabin15",3,1,14]
]);

updateMatch(2, 5, 13,
[
    ["On1zuka",13,4,14],
    ["Gabin15",7,0,17],
    ["LaynOx",4,2,15]
],
[
    ["Akra",20,7,7],
    ["Suzuki",17,4,9],
    ["Homn",8,3,8]
]);

updateMatch(45, 13, 9,
[
    ["Narvalow",24,4,10],
    ["Kurapika",15,2,15],
    ["Stronex",12,2,12]
],
[
    ["Sharko",18,2,17],
    ["Manji",11,3,18],
    ["Tata",7,3,16]
]);

updateMatch(32, 9, 13,
[
    ["Manji",19,1,17],
    ["Sharko",12,4,14],
    ["Tata",5,1,19]
],
[
    ["Bri",23,5,13],
    ["Loic",14,2,11],
    ["Nounours",12,2,12]
]);

updateMatch(31, 13, 8,
[
    ["Loic",15,5,11],
    ["Bri",17,5,12],
    ["Nounours",16,4,12]
],
[
    ["Manji",22,2,14],
    ["Sharko",7,3,17],
    ["Tata",6,1,17]
]);

updateMatch(23, 13, 4,
[
    ["Qualites",21,3,5],
    ["Gabin15",11,2,11],
    ["LaynOx",11,2,8]
],
[
    ["Go Silver",14,1,15],
    ["Ragnar",5,2,14],
    ["Nistugo",5,0,15]
]);

updateMatch(24, 5, 13,
[
    ["Nistugo",11,6,16],
    ["Ragnar",10,2,13],
    ["PickixBack",8,2,16]
],
[
    ["Qualites",22,5,9],
    ["Gabin15",12,3,7],
    ["LaynOx",11,1,13]
    
]);

updateMatch(13, 13, 0,
[
    ["Akra",0,0,0],
    ["Homn",0,0,0],
    ["Suzuki",0,0,0]
],
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
]);

updateMatch(14, 0, 13,
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
],
[
    ["Akra",0,0,0],
    ["Homn",0,0,0],
    ["Suzuki",0,0,0]
]);

updateMatch(25, 13, 0,
[
    ["LaynOx",0,0,0],
    ["Gabin15",0,0,0],
    ["Qualites",0,0,0],
    ["Vlase",0,0,0]
],
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
]);

updateMatch(26, 0, 13,
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
],
[
    ["LaynOx",0,0,0],
    ["Gabin15",0,0,0],
    ["Qualites",0,0,0],
    ["Vlase",0,0,0]
]);

updateMatch(35, 13, 0,
[
    ["Loic",0,0,0],
    ["Bri",0,0,0],
    ["Kazero",0,0,0],
    ["Nounours",0,0,0]
],
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
]);

updateMatch(36, 0, 13,
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
],
[
    ["Loic",0,0,0],
    ["Bri",0,0,0],
    ["Kazero",0,0,0],
    ["Nounours",0,0,0]
]);

updateMatch(43, 13, 0,
[
    ["Freezy",0,0,0],
    ["Youko",0,0,0],
    ["Wanheda",0,0,0],
    ["ZoraYtB",0,0,0]
],
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
]);

updateMatch(44, 0, 13,
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
],
[
    ["Freezy",0,0,0],
    ["Youko",0,0,0],
    ["Wanheda",0,0,0],
    ["ZoraYtB",0,0,0]
]);

updateMatch(49, 13, 0,
[
    ["Narvalow",0,0,0],
    ["Stronex",0,0,0],
    ["Kurapika",0,0,0]
],
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
]);

updateMatch(50, 0, 13,
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
],
[
    ["Narvalow",0,0,0],
    ["Stronex",0,0,0],
    ["Kurapika",0,0,0]
]);

updateMatch(53, 13, 0,
[
    ["Manji",0,0,0],
    ["Sharko",0,0,0],
    ["Tata",0,0,0]
],
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
]);

updateMatch(54, 0, 13,
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
],
[
    ["Manji",0,0,0],
    ["Sharko",0,0,0],
    ["Tata",0,0,0]
]);

updateMatch(55, 13, 0,
[
    ["Nistugo",0,0,0],
    ["Go Silver",0,0,0],
    ["Ragnar",0,0,0],
    ["PickixBack",0,0,0]
],
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
]);

updateMatch(56, 0, 13,
[
    ["OmarBapLO6",0,0,0],
    ["Moe Lester",0,0,0],
    ["Skiimi",0,0,0],
    ["Kitaro",0,0,0]
],
[
    ["Nistugo",0,0,0],
    ["Go Silver",0,0,0],
    ["Ragnar",0,0,0],
    ["PickixBack",0,0,0]
]);

/* =========================
   INIT
========================= */

window.onload = () => {
    renderTeams();
    renderPlayers();
    renderMatches();
    renderRanking();
};
