/* CONFIG */
const UNLOCK_DATE = new Date('2026-01-10T00:00:00');
const PASSWORD = 'c5d9h';
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
    alert('Wrong password');
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
