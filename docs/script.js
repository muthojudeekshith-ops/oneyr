/* CONFIG */
const UNLOCK_DATE = new Date('2026-04-20T00:00:00');
const PASSWORD = '.';
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

/* 🖼️ Memories images */
document.addEventListener('DOMContentLoaded', () => {

  // mo.js animation
  const qs = document.querySelector.bind(document);
  const easingHeart = mojs.easing.path("M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0");

  const el = {
    container: qs(".mo-container"),
    i: qs(".lttr--I"),
    l: qs(".lttr--L"),
    o: qs(".lttr--O"),
    v: qs(".lttr--V"),
    e: qs(".lttr--E"),
    y: qs(".lttr--Y"),
    o2: qs(".lttr--O2"),
    u: qs(".lttr--U"),
    lineLeft: qs(".line--left"),
    lineRight: qs(".line--rght"),
    colTxt: "#763c8c",
    colHeart: "#fa4843",
    blup: qs(".blup"),
    blop: qs(".blop")
  };

  class Heart extends mojs.CustomShape {
    getShape() {
      return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
    }
    getLength() { return 200; }
  }
  mojs.addShape("heart", Heart);

  const crtBoom = (delay = 0, x = 0, rd = 46) => {
    const parent = el.container;
    const crcl = new mojs.Shape({
      shape: "circle",
      fill: "none",
      stroke: el.colTxt,
      strokeWidth: { 5: 0 },
      radius: { [rd]: [rd + 20] },
      easing: "quint.out",
      duration: 500 / 3,
      parent,
      delay,
      x
    });

    const brst = new mojs.Burst({
      radius: { [rd + 15]: 110 },
      angle: "rand(60, 180)",
      count: 3,
      timeline: { delay },
      parent,
      x,
      children: {
        radius: [5, 3, 7],
        fill: el.colTxt,
        scale: { 1: 0, easing: "quad.in" },
        pathScale: [0.8, null],
        degreeShift: ["rand(13, 60)", null],
        duration: 1000 / 3,
        easing: "quint.out"
      }
    });
    return [crcl, brst];
  };

  const crtLoveTl = () => {
    const move = 1000;
    const boom = 200;
    const easing = "sin.inOut";
    const easingBoom = "sin.in";
    const easingOut = "sin.out";
    const opts = { duration: move, easing, opacity: 1 };
    const delta = 150;

    return new mojs.Timeline().add([
      new mojs.Tween({
        duration: move,
        onStart: () => {
          [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(item => {
            item.style.opacity = 1;
            item.style.transform = "translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1)";
          });
        },
        onComplete: () => {
          [el.l, el.o, el.v, el.e].forEach(item => item.style.opacity = 0);
          if(el.blop) el.blop.play();
        }
      }),
      new mojs.Tween({
        duration: move * 2 + boom,
        onComplete: () => {
          [el.y, el.o2].forEach(item => item.style.opacity = 0);
          if(el.blop) el.blop.play();
        }
      }),
      new mojs.Tween({
        duration: move * 3 + boom * 2 - delta,
        onComplete: () => {
          el.i.style.opacity = 0;
          if(el.blop) el.blop.play();
        }
      }),
      new mojs.Tween({
        duration: move * 3 + boom * 2,
        onComplete: () => {
          el.u.style.opacity = 0;
          if(el.blup) el.blup.play();
        }
      }),
      new mojs.Tween({
        duration: 50,
        delay: 4050,
        onUpdate: progress => {
          [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(item => {
            item.style.opacity = progress;
            item.style.transform = "translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1)";
          });
        },
        onComplete: () => {
          [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(item => {
            item.style.opacity = 1;
            item.style.transform = "translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1)";
          });
        }
      }),
      new mojs.Html({ ...opts, el: el.lineLeft, x: { 0: 52 } }).then({ duration: boom + move, easing, x: { to: 106 } }).then({ duration: boom + move, easing, x: { to: 166 } }).then({ duration: 150, easing, x: { to: 176 } }).then({ duration: 300 }).then({ duration: 350, x: { to: 0 }, easing: easingOut }),
      new mojs.Html({ ...opts, el: el.lineRight, x: { 0: -52 } }).then({ duration: boom + move, easing, x: { to: -106 } }).then({ duration: boom + move, easing, x: { to: -166 } }).then({ duration: 150, easing, x: { to: -176 } }).then({ duration: 300 }).then({ duration: 350, x: { to: 0 }, easing: easingOut }),
      new mojs.Html({ ...opts, el: el.i, x: { 0: 34 } }).then({ duration: boom, easing: easingBoom, x: { to: 53 } }).then({ duration: move, easing, x: { to: 93 } }).then({ duration: boom, easing: easingBoom, x: { to: 123 } }).then({ duration: move, easing, x: { to: 153 } }),
      new mojs.Html({ ...opts, el: el.l, x: { 0: 15 } }),
      new mojs.Html({ ...opts, el: el.o, x: { 0: 11 } }),
      new mojs.Html({ ...opts, el: el.v, x: { 0: 3 } }),
      new mojs.Html({ ...opts, el: el.e, x: { 0: -3 } }),
      new mojs.Html({ ...opts, el: el.y, x: { 0: -20 } }).then({ duration: boom, easing: easingBoom, x: { to: -53 } }).then({ duration: move, easing, x: { to: -77 } }),
      new mojs.Html({ ...opts, el: el.o2, x: { 0: -27 } }).then({ duration: boom, easing: easingBoom, x: { to: -54 } }).then({ duration: move, easing, x: { to: -84 } }),
      new mojs.Html({ ...opts, el: el.u, x: { 0: -32 } }).then({ duration: boom, easing: easingBoom, x: { to: -53 } }).then({ duration: move, easing, x: { to: -89 } }).then({ duration: boom, easing: easingBoom, x: { to: -120 } }).then({ duration: move, easing, x: { to: -147 } }),
      new mojs.Shape({ parent: el.container, shape: "heart", delay: move, fill: el.colHeart, x: -64, scale: { 0: 0.95, easing: easingHeart }, duration: 500 }).then({ x: { to: -62, easing }, scale: { to: 0.65, easing }, duration: boom + move - 500 }).then({ duration: boom - 50, x: { to: -14 }, scale: { to: 0.9 }, easing: easingBoom }).then({ duration: 125, scale: { to: 0.8 }, easing: easingOut }).then({ duration: 125, scale: { to: 0.85 }, easing: easingOut }).then({ duration: move - 200, scale: { to: 0.45 }, easing }).then({ delay: -75, duration: 150, x: { to: 0 }, scale: { to: 0.9 }, easing: easingBoom }).then({ duration: 125, scale: { to: 0.8 }, easing: easingOut }).then({ duration: 125, scale: { to: 0.85 }, easing: easingOut }).then({ duration: 125 }).then({ duration: 350, scale: { to: 0 }, easing: easingOut }),
      ...crtBoom(move, -64, 46),
      ...crtBoom(move * 2 + boom, 18, 34),
      ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
      ...crtBoom(move * 3 + boom * 2, 45, 34)
    ]);
  };

  const loveTl = crtLoveTl().play();
  setInterval(() => { loveTl.replay(); }, 4300);

  const volume = 0.2;
  if(el.blup) el.blup.volume = volume;
  if(el.blop) el.blop.volume = volume;

  const track = document.getElementById('memoryTrack');
  if(!track) return;

  for(let i=1;i<=14;i++){
    const img = document.createElement('img');
    img.src = `m${i}.jpg`;   // ✅ ROOT PATH
    img.alt = `Memory ${i}`;
    track.appendChild(img);
  }

  // duplicate for infinite scroll
  for(let i=1;i<=14;i++){
    const img = document.createElement('img');
    img.src = `m${i}.jpg`;   // ✅ ROOT PATH
    img.alt = `Memory ${i}`;
    track.appendChild(img);
  }

});  
