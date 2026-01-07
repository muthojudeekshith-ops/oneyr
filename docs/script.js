// 🔧 CHANGE DATE LATER
const UNLOCK_DATE = new Date('2026-04-20T00:00:00');
const PASSWORD = 'c5d9';

const screens = document.querySelectorAll('.screen');
const music = document.getElementById('bgMusic');
const finalMsg = document.getElementById('finalMsg');

function show(id){
  screens.forEach(s=>s.classList.remove('active'));
  document.getElementById('s'+id).classList.add('active');

  if(id >= 4){
    music.play().catch(()=>{});
  }

  if(id === 9){
    petals();
    setTimeout(()=>finalMsg.style.display='block',2000);
  }
}

function next(id){ show(id); }

function checkPass(){
  if(document.getElementById('pass').value === PASSWORD){
    show(3);
  }else{
    alert('Wrong password');
  }
}

function replay(){
  music.currentTime = 0;
  show(3);
}

// Countdown
setInterval(()=>{
  const now = new Date();
  const diff = UNLOCK_DATE - now;

  if(diff <= 0){
    show(2);
  }else{
    const h = Math.floor(diff/36e5);
    const m = Math.floor(diff%36e5/6e4);
    const s = Math.floor(diff%6e4/1000);
    document.getElementById('timer').innerText =
      `${h}h ${m}m ${s}s`;
  }
},1000);

// Memories (14)
const memoryBox = document.getElementById('memoryCards');
for(let i=1;i<=14;i++){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerText = 'Memory ' + i;
  memoryBox.appendChild(div);
}

// Petals
function petals(){
  for(let i=0;i<25;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    p.innerText = '🌹';
    p.style.left = Math.random()*100 + 'vw';
    p.style.animationDuration = 5 + Math.random()*5 + 's';
    document.body.appendChild(p);
  }
}

