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
{t1:"Alpha", t2:"Omega", s1:13, s2:10}
];

function show(page){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(page).classList.add("active");
}

function render(){

document.getElementById("teamCount").innerText = teams.length;
document.getElementById("playerCount").innerText = players.length;
document.getElementById("matchCount").innerText = matches.length;

/* TEAMS AVEC LOGO */
document.getElementById("teamList").innerHTML =
teams.map(t=>`
<div>
<img src="${t.logo}" class="teamLogo">
🏆 ${t.name} — ${t.pts} pts
</div>
`).join("");

/* PLAYERS */
document.getElementById("playerList").innerHTML =
players.map(p=>`
<div>
👤 ${p.name} (${p.team})<br>
🎯 K:${p.k} 🤝 A:${p.a} 💀 D:${p.d}<br>
⭐ Score:${p.k + p.a - p.d}
</div>
`).join("");

/* MATCHS */
document.getElementById("matchList").innerHTML =
matches.map(m=>`
<div>${m.t1} ${m.s1} - ${m.s2} ${m.t2}</div>
`).join("");

/* RANKING */
let sorted = [...teams].sort((a,b)=>b.pts-a.pts);

document.getElementById("rankingList").innerHTML =
sorted.map(t=>`
<div>
<img src="${t.logo}" class="teamLogo">
🏆 ${t.name} — ${t.pts} pts
</div>
`).join("");

}

render();