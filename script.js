let teams = [
{name:"Alpha", pts:6, logo:"alpha.png"},
{name:"Beta", pts:3, logo:"beta.png"},
{name:"Omega", pts:9, logo:"omega.png"}
];

let players = [
{name:"Player1", team:"Alpha", k:32, a:10, d:8},
{name:"Player2", team:"Beta", k:20, a:15, d:12},
{name:"Player3", team:"Omega", k:40, a:5, d:10}
];

let matches = [
{t1:"Alpha", t2:"Omega", s1:13, s2:10},
{t1:"Beta", t2:"Alpha", s1:7, s2:13},
{t1:"Omega", t2:"Beta", s1:13, s2:9}
];

/* NAV */
function show(page){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(page).classList.add("active");
}

/* KD */
function getKD(p){
return (p.d===0)?p.k:(p.k/p.d).toFixed(2);
}

function getKDColor(kd){
if(kd >= 2) return "kd-good";
if(kd >= 1) return "kd-medium";
return "kd-bad";
}

/* MVP */
function getMVP(p){
return p.k*2 + p.a - p.d;
}

/* TEAM CLICK */
function openTeam(name){
show("teamDetail");

let team = teams.find(t=>t.name===name);

document.getElementById("teamInfo").innerHTML=`
<div style="display:flex;gap:10px;align-items:center;">
<img src="${team.logo}" class="teamLogo">
<h2>${team.name}</h2>
</div>
<p>Points : ${team.pts}</p>
`;

/* roster */
let roster = players.filter(p=>p.team===name);
document.getElementById("teamPlayers").innerHTML =
roster.map(p=>`
<div class="cardSmall">${p.name} — K:${p.k} A:${p.a} D:${p.d}</div>
`).join("");

/* history */
let history = matches.filter(m=>m.t1===name || m.t2===name);
document.getElementById("teamMatches").innerHTML =
history.map(m=>`
<div class="cardSmall">${m.t1} ${m.s1} - ${m.s2} ${m.t2}</div>
`).join("");
}

/* RENDER */
function render(){

document.getElementById("teamCount").innerText=teams.length;
document.getElementById("playerCount").innerText=players.length;
document.getElementById("matchCount").innerText=matches.length;

/* TEAMS */
let sortedTeams=[...teams].sort((a,b)=>b.pts-a.pts);

document.getElementById("teamList").innerHTML=
sortedTeams.map(t=>`
<div onclick="openTeam('${t.name}')">
<img src="${t.logo}" class="teamLogo">
<b>${t.name}</b> — ${t.pts} pts
</div>
`).join("");

/* PLAYERS */
let sortedPlayers=[...players].sort((a,b)=>getMVP(b)-getMVP(a));

document.getElementById("playerList").innerHTML=
sortedPlayers.map(p=>{
let kd=parseFloat(getKD(p));
let cls=getKDColor(kd);

return `
<div>
👤 ${p.name} (${p.team})<br>
K:${p.k} A:${p.a} D:${p.d}<br>
KD: <span class="${cls}">${kd}</span> | MVP: ${getMVP(p)}
</div>`;
}).join("");

/* MATCHES */
let sortedMatches=[...matches].reverse();

document.getElementById("matchList").innerHTML=
sortedMatches.map(m=>`
<div>${m.t1} ${m.s1} - ${m.s2} ${m.t2}</div>
`).join("");

/* RANKING */
document.getElementById("rankingList").innerHTML=
sortedTeams.map(t=>`
<div>
<img src="${t.logo}" class="teamLogo">
<b>${t.name}</b> — ${t.pts} pts
</div>
`).join("");

}

render();