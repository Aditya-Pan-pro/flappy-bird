
function createBox(w, h, p1) {
const box1 = document.createElement("div");
box1.className = "box1";
box1.style.width = w + "px";
box1.style.height = h + "px";
box1.style.left = p1 + "px";
box1.style.position = "absolute";
document.body.appendChild(box1);
const box2 = document.createElement("div");
box2.className = "box2";
box2.style.width = w + "px";
box2.style.top =( h+200) + "px";
box2.style.height = (window.innerHeight-h-200) + "px";
box2.style.left = p1 + "px";
box2.style.position = "absolute";
document.body.appendChild(box2);
return { box1, h,box2 };
}

function getRandom() {
return Math.random() * (window.innerHeight-200);
}
let m=1;

const box = document.getElementById("box");
let position = 300;
let velocity = 0;
const acceleration = 0.3; // stronger gravity
let pos2 = window.innerWidth;

// initialize one pipe
let result = createBox(20, getRandom(), pos2);

document.addEventListener("keydown", () => {
velocity = -7; // flap upwards by setting velocity
});
let c=0,k=result.h; let gameover=false;
function update() {
  if(gameover)
    return;
// bird physics
velocity += acceleration;
position += velocity;
box.style.top = position + "px";

if (position < 0) {
 position = 0;
 velocity = 0;
}
if (position + box.offsetHeight > window.innerHeight) {
 position = window.innerHeight - box.offsetHeight;
 velocity = 0;
}

// pipe movement
pos2 -= m+c/5; // move left
result.box1.style.left = pos2 + "px";
result.box2.style.left=pos2+"px";
 result.box1.style.top = "0px";
if (pos2 + result.box1.offsetWidth < 0) {
  c++;
 pos2 = window.innerWidth;
   k=getRandom()
 result.box1.style.height = k+ "px"; // reset height
 result.box2.style.height=(window.innerHeight-200-k)+"px";
 result.box2.style.top=(k+200)+"px";
}
let birdTop = position;
let birdBottom = position + box.offsetHeight;
let birdLeft = 100;
let birdRight = 100 + box.offsetWidth;

let pipeLeft = pos2;
let pipeRight = pos2 + result.box1.offsetWidth; // safer than hardcoding 20
let gapTop = k;
let gapBottom = k + 200;

if (birdRight > pipeLeft && birdLeft < pipeRight) {
  if (birdTop < gapTop || birdBottom > gapBottom) {
    alert("Game Over Score:" + c);
    gameover = true;
    return;
  }
}
   

requestAnimationFrame(update);
}

update();