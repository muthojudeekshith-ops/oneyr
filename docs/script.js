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

let countdownStarted = true;

const timerInterval = setInterval(() => {

  // 🔐 Countdown ONLY on screen 1
  const screen1Active = document.getElementById('s1').classList.contains('active');
  if (!screen1Active) return;

  const diff = UNLOCK_DATE - new Date();

  if (diff <= 0) {
    clearInterval(timerInterval);   // 🛑 STOP forever
    countdownStarted = false;
    nextScreen(2);                  // 🔓 Go to password ONCE
    return;
  }

  const h = Math.floor(diff / 36e5);
  const m = Math.floor((diff % 36e5) / 6e4);
  const s = Math.floor((diff % 6e4) / 1000);

  document.getElementById('timer').innerText =
    `${h}h ${m}m ${s}s`;

}, 1000);
