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

/* RATIO */
function getRatio(p){
return (p.d === 0) ? p.k : (p.k / p.d).toFixed(2);
}

/* TEAM CLICK */
function openTeam(name){
show("teamDetail");

let team = teams.find(t=>t.name===name);

document.getElementById("teamInfo").innerHTML = `
<div style="display:flex;gap:10px;align-items:center;">
<img src="${team.logo}" class="teamLogo">
<h2>${team.name}</h2>
</div>
<p>Points : ${team.pts}</p>
`;

let history = matches.filter(m=>m.t1===name || m.t2===name);

document.getElementById("teamMatches").innerHTML =
history.map(m=>`
<div class="card">
${m.t1} ${m.s1} - ${m.s2} ${m.t2}
</div>
`).join("");
}

/* TOGGLE HISTORY */
function toggleHistory(){
let el = document.getElementById("teamMatches");

el.style.display = (el.style.display === "none") ? "block" : "none";
}

/* RENDER */
function render(){

document.getElementById("teamCount").innerText = teams.length;
document.getElementById("playerCount").innerText = players.length;

/* TEAMS */
let sortedTeams=[...teams].sort((a,b)=>b.pts-a.pts);

document.getElementById("teamList").innerHTML=
sortedTeams.map(t=>`
<div onclick="openTeam('${t.name}')">
<img src="${t.logo}" class="teamLogo">
<b>${t.name}</b> — ${t.pts} pts
</div>
`).join("");

/* PLAYERS (RATIO ONLY) */
let sortedPlayers=[...players].sort((a,b)=>getRatio(b)-getRatio(a));

document.getElementById("playerList").innerHTML=
sortedPlayers.map(p=>`
<div>
👤 <b>${p.name}</b> (${p.team})<br>
Ratio: <b>${getRatio(p)}</b>
</div>
`).join("");

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