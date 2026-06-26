let teams = [
{name:"Alpha", pts:6, logo:"alpha.png", players:["A1","A2","A3","A4","A5"]},
{name:"Beta", pts:3, logo:"beta.png", players:["B1","B2","B3","B4","B5"]},
{name:"Omega", pts:9, logo:"omega.png", players:["O1","O2","O3","O4","O5"]}
];

let players = [
{name:"A1", team:"Alpha", k:32, a:10, m:8},
{name:"A2", team:"Alpha", k:20, a:5, m:12},
{name:"A3", team:"Alpha", k:15, a:7, m:10},
{name:"A4", team:"Alpha", k:10, a:3, m:8},
{name:"A5", team:"Alpha", k:18, a:6, m:9},

{name:"B1", team:"Beta", k:22, a:10, m:11},
{name:"B2", team:"Beta", k:12, a:4, m:9},
{name:"B3", team:"Beta", k:25, a:8, m:14},
{name:"B4", team:"Beta", k:14, a:3, m:10},
{name:"B5", team:"Beta", k:17, a:6, m:8},

{name:"O1", team:"Omega", k:40, a:5, m:10},
{name:"O2", team:"Omega", k:18, a:7, m:9},
{name:"O3", team:"Omega", k:30, a:6, m:12},
{name:"O4", team:"Omega", k:22, a:4, m:11},
{name:"O5", team:"Omega", k:16, a:5, m:8}
];

let matches = [
{t1:"Alpha", t2:"Omega", s1:13, s2:10},
{t1:"Beta", t2:"Alpha", s1:7, s2:13},
{t1:"Omega", t2:"Beta", s1:13, s2:9}
];

/* NAV */
function show(p){
document.querySelectorAll(".page").forEach(e=>e.classList.remove("active"));
document.getElementById(p).classList.add("active");
}

/* KD */
function getKD(p){
return (p.m===0)?p.k:(p.k/p.m).toFixed(2);
}

function getColor(kd){
if(kd>=2) return "kd-good";
if(kd>=1) return "kd-medium";
return "kd-bad";
}

/* TEAMS */
function renderTeams(){
let sorted=[...teams].sort((a,b)=>b.pts-a.pts);

document.getElementById("teamList").innerHTML=
sorted.map(t=>`
<div>
<img src="${t.logo}" width="30">
<b>${t.name}</b> — ${t.pts} pts<br>
👥 ${t.players.join(", ")}
</div>
`).join("");
}

/* PLAYERS */
function renderPlayers(){
let sorted=[...players].sort((a,b)=>getKD(b)-getKD(a));

document.getElementById("playerList").innerHTML=
sorted.map(p=>{
let kd=parseFloat(getKD(p));
return `
<div>
👤 ${p.name} (${p.team})<br>
K:${p.k} A:${p.a} M:${p.m}<br>
KD: <span class="${getColor(kd)}">${kd}</span>
</div>`;
}).join("");
}

/* MATCHES */
function renderMatches(){
document.getElementById("matchList").innerHTML=
[...matches].reverse().map(m=>`
<div>${m.t1} ${m.s1} - ${m.s2} ${m.t2}</div>
`).join("");
}

/* INIT */
function render(){
document.getElementById("teamCount").innerText=teams.length;
document.getElementById("playerCount").innerText=players.length;

renderTeams();
renderPlayers();
renderMatches();
}

render();