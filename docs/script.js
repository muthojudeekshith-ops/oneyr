/* CONFIG */
const UNLOCK_DATE = new Date('2026-01-10T00:00:00');
const PASSWORD = 'foreverCC';
let unlocked = false;

const screens = document.querySelectorAll('.screen');
const music = document.getElementById('bgMusic');

/* Navigation */
function show(id){
  screens.forEach(s=>s.classList.remove('active'));
  document.getElementById('s'+id).classList.add('active');

  if(id >= 4) music.play();

  if(id === 9){
    petals();
    setTimeout(()=>finalMsg.style.display='block',2000);
  }
}

function next(id){ show(id); }

function checkPass(){
  if(pass.value === PASSWORD){
    unlocked = true;
    show(3);
  }else{
    alert('password is incorrect ❌');
  }
}

function replay(){
  music.currentTime = 0;
  finalMsg.style.display = 'none';
  show(3);
}

/* Countdown */
setInterval(()=>{
  if(unlocked) return;

  const diff = UNLOCK_DATE - new Date();

  if(diff <= 0){
    show(2);
  }else{
    const h = Math.floor(diff/36e5);
    const m = Math.floor(diff%36e5/6e4);
    const s = Math.floor(diff%6e4/1000);
    timer.innerText = `${h}h ${m}m ${s}s`;
  }
},1000);

/* 🌹 Petals */
function petals(){
  for(let i=0;i<25;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    p.innerText = '💐🌹';
    p.style.left = Math.random()*100+'vw';
    p.style.animationDuration = 5+Math.random()*5+'s';
    document.body.appendChild(p);
  }
}
/* 🖼️ LOAD MEMORIES IMAGES */
const memoryTrack = document.getElementById("memoryTrack");

for (let i = 1; i <= 14; i++) {
  const img = document.createElement("img");
  img.src = `m${i}.jpg`;
  memoryTrack.appendChild(img);
}

/* 🔁 Duplicate for seamless infinite scroll */
for (let i = 1; i <= 14; i++) {
  const img = document.createElement("img");
  img.src = `m${i}.jpg`;
  memoryTrack.appendChild(img);
}
/* 🔁 Duplicate Screen 5 Cards For Infinite Loop */
const cardContainer = document.querySelector('#s5 .card-container');

const originalCards = cardContainer.innerHTML;
cardContainer.innerHTML += originalCards;
