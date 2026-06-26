let teams=[];
let matches=[];

function show(page){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(page).classList.add("active");
}

/* TEAMS */
function addTeam(){
let name=document.getElementById("teamInput").value;
if(!name)return;

teams.push({name,pts:0});
document.getElementById("teamInput").value="";
renderAll();
}

/* MATCHES */
function addMatch(){
let t1=document.getElementById("t1").value;
let t2=document.getElementById("t2").value;
let s1=+document.getElementById("s1").value;
let s2=+document.getElementById("s2").value;

matches.push({t1,t2,s1,s2});

if(s1>s2) addPts(t1);
else if(s2>s1) addPts(t2);

renderAll();
}

/* POINTS */
function addPts(team){
let t=teams.find(x=>x.name===team);
if(t)t.pts+=3;
}

/* RENDER EVERYTHING */
function renderAll(){

document.getElementById("teamCount").innerText=teams.length;
document.getElementById("matchCount").innerText=matches.length;

/* teams */
document.getElementById("teamList").innerHTML=
teams.map(t=>`<div>🏆 ${t.name}</div>`).join("");

/* matches */
document.getElementById("matchList").innerHTML=
matches.map(m=>`<div>${m.t1} ${m.s1} - ${m.s2} ${m.t2}</div>`).join("");

/* ranking */
let sorted=[...teams].sort((a,b)=>b.pts-a.pts);

document.getElementById("rankingList").innerHTML=
sorted.map(t=>`<div>🏆 ${t.name} — ${t.pts} pts</div>`).join("");
}