const screens = document.querySelectorAll('.screen');
const music = document.getElementById('bgMusic');

const PASSWORD = "c5d9h";
const UNLOCK_DATE = new Date("2026-01-10T00:00:00");

function nextScreen(id){
  screens.forEach(s=>s.classList.remove('active'));
  document.getElementById("s"+id).classList.add('active');
  if(id >= 4) music.play();
}

function checkPass(){
  if(document.getElementById('pass').value === PASSWORD){
    nextScreen(3);
  }else{
    alert("Wrong password");
  }
}

function replay(){
  music.currentTime = 0;
  nextScreen(3);
}

let unlocked = false;

const timerInterval = setInterval(()=>{
  const diff = UNLOCK_DATE - new Date();

  if(diff <= 0 && !unlocked){
    unlocked = true;
    clearInterval(timerInterval);   // 🔴 STOP countdown
    nextScreen(2);                  // ✅ Go to password ONCE
  }

  if(diff > 0){
    const h = Math.floor(diff/36e5);
    const m = Math.floor(diff%36e5/6e4);
    const s = Math.floor(diff%6e4/1000);
    document.getElementById('timer').innerText = `${h}h ${m}m ${s}s`;
  }
},1000);


