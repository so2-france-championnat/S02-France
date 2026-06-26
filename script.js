let teams=[];
let players=[];
let matches=[];

/* 18 TEAMS / 90 PLAYERS */
for(let i=1;i<=18;i++){

let teamName="Team "+i;
let logo=`logos/team${i}.jpg`;

let teamPlayers=[];

for(let j=1;j<=5;j++){

let name=`T${i}P${j}`;

players.push({
name,
team:teamName,
k:Math.floor(Math.random()*60)+10,
a:Math.floor(Math.random()*20),
m:Math.floor(Math.random()*40)+5
});

teamPlayers.push(name);
}

teams.push({
name:teamName,
logo,
pts:Math.floor(Math.random()*60),
players:teamPlayers
});
}

/* MATCHS */
for(let i=0;i<40;i++){
let a=teams[Math.floor(Math.random()*teams.length)];
let b=teams[Math.floor(Math.random()*teams.length)];

if(a.name!==b.name){
matches.push({
t1:a.name,
t2:b.name,
s1:Math.floor(Math.random()*16),
s2:Math.floor(Math.random()*16)
});
}
}

/* NAV */
function show(p){
document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
document.getElementById(p).classList.add("active");
}

/* PLAYERS RANK 1-90 */
function renderPlayers(){

let sorted=[...players].sort((a,b)=>{
return (b.k/(b.m||1)) - (a.k/(a.m||1));
});

document.getElementById("playerList").innerHTML=
sorted.map((p,i)=>{

let kd=p.k/(p.m||1);

let cls=i<30?"rank-top":i<60?"rank-mid":"rank-low";

return `
<div class="${cls}">
${i+1}. ${p.name} (${p.team})<br>
K:${p.k} A:${p.a} M:${p.m} KD:${kd.toFixed(2)}
</div>`;
}).join("");
}

/* TEAMS */
function renderTeams(){
document.getElementById("teamList").innerHTML=
teams.map(t=>`
<div>
<img src="${t.logo}" width="35">
<b>${t.name}</b><br>
👥 ${t.players.join(" • ")}
</div>
`).join("");
}

/* CLASSEMENT TEAMS */
function renderRanking(){

let sorted=[...teams].sort((a,b)=>b.pts-a.pts);

document.getElementById("rankingList").innerHTML=
sorted.map((t,i)=>{

let cls=i===0?"rank1":i===1?"rank2":i===2?"rank3":"rank-other";

return `
<div class="${cls}">
${i+1}. <img src="${t.logo}" width="25"> ${t.name} — ${t.pts} pts
</div>`;
}).join("");
}

/* MATCH */
function renderMatches(){
document.getElementById("matchList").innerHTML=
[...matches].reverse().map(m=>`
<div>${m.t1} ${m.s1} - ${m.s2} ${m.t2}</div>
`).join("");
}

/* INIT */
function render(){
renderTeams();
renderPlayers();
renderMatches();
renderRanking();
}

render();