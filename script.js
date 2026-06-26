let teams = [
  {name:"Alpha", pts:6},
  {name:"Beta", pts:3},
  {name:"Omega", pts:9}
];

let matches = [
  {t1:"Alpha", t2:"Beta", s1:2, s2:1},
  {t1:"Omega", t2:"Alpha", s1:1, s2:3}
];

function show(page){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(page).classList.add("active");
}

function render(){

document.getElementById("teamCount").innerText = teams.length;
document.getElementById("matchCount").innerText = matches.length;

/* teams */
document.getElementById("teamList").innerHTML =
teams.map(t=>`<div>🏆 ${t.name}</div>`).join("");

/* matches */
document.getElementById("matchList").innerHTML =
matches.map(m=>`<div>${m.t1} ${m.s1} - ${m.s2} ${m.t2}</div>`).join("");

/* ranking */
let sorted=[...teams].sort((a,b)=>b.pts-a.pts);

document.getElementById("rankingList").innerHTML =
sorted.map(t=>`<div>🏆 ${t.name} — ${t.pts} pts</div>`).join("");

}

render();