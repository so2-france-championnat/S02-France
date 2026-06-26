let teams = [];
let players = [];
let matches = [];

/* 20 TEAMS + 100 PLAYERS + LOGOS */
for(let i=1;i<=20;i++){

let teamName = "Team" + i;

let logo = `https://placehold.co/80x80/008cff/ffffff?text=T${i}`;

let teamPlayers = [];

for(let j=1;j<=5;j++){

let playerName = "T"+i+"P"+j;

let k = Math.floor(Math.random()*60)+10;
let m = Math.floor(Math.random()*40)+5;
let a = Math.floor(Math.random()*20);

players.push({
name:playerName,
team:teamName,
k:k,
a:a,
m:m
});

teamPlayers.push(playerName);
}

teams.push({
name:teamName,
pts:Math.floor(Math.random()*40),
logo:logo,
players:teamPlayers
});
}

/* MATCHS */
for(let i=0;i<40;i++){

let t1 = teams[Math.floor(Math.random()*teams.length)];
let t2 = teams[Math.floor(Math.random()*teams.length)];

if(t1.name !== t2.name){
matches.push({
t1:t1.name,
t2:t2.name,
s1:Math.floor(Math.random()*16),
s2:Math.floor(Math.random()*16)
});
}
}

/* NAV */
function show(p){
document.querySelectorAll(".page").forEach(e=>e.classList.remove("active"));
document.getElementById(p).classList.add("active");
}

/* KD */
function getKD(p){
return p.m === 0 ? p.k : (p.k / p.m);
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
<img src="${t.logo}" width="35" height="35" style="border-radius:50%">
<div>
<b>${t.name}</b> — ${t.pts} pts<br>
👥 ${t.players.join(" • ")}
</div>
</div>
`).join("");
}

/* PLAYERS */
function renderPlayers(){
let sorted=[...players].sort((a,b)=>getKD(b)-getKD(a));

document.getElementById("playerList").innerHTML=
sorted.map(p=>{
let kd=getKD(p);
return `
<div>
👤 ${p.name} (${p.team})<br>
K:${p.k} A:${p.a} M:${p.m}<br>
KD: <span class="${getColor(kd)}">${kd.toFixed(2)}</span>
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