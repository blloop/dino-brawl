// Dino Brawl
// A simple fighting game made with HTML Canvas
// By Bill Yu @blloop

// Canvas preparation
const canvas = document.getElementById('canvas');
canvas.width = 960;
canvas.height = 540;
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
c.fillRect(0, 0, canvas.width, canvas.height);

// List of game constants
const gravity = 0.5;

// Background image
const bg = new Sprite({
  position: { x: 0, y: 0 },
  size: { width: canvas.width, height: canvas.height },
  source: 'img/bg.png',
  scale: 1,
  frames: 1,
})

// Fighter class declarations
let attacks1 = [];
let attacks2 = [];
const p1 = new Fighter(redBase, attacks1);
const p2 = new Fighter(greenFlip, attacks2);

// Function to check collision between player/attack
function collide(player, attack) {
  if (!attack.hurt) return false;
  return attack.position.x + attack.width >= player.position.x &&
    attack.position.x <= player.position.x + player.width &&
    attack.position.y +  attack.height > player.position.y &&
    attack.position.y <= player.position.y + player.height
}

// Check for all possible collisions
function checkCombat() {
  attacks1.forEach((a) => {
    if (a && collide(p2, a)) {
      p2.takeHit(p1.damage);
      a.hurt = false;
    }
  });
  attacks2.forEach((a) => {
    if (a && collide(p1, a)) {
      p1.takeHit(p2.damage);
      a.hurt = false;
    }
  });
}

// Announce that game has ended
let gameStatus = '';
function checkGame() {
  if (p1.health > 0 && p2.health > 0 && timer > 0) {
    return;
  }
  timer = 0;
  gameStatus = p1.health > p2.health ?
    'Player 1 Wins!' : (p2.health > p1.health ?
      'Player 2 Wins!' : '   Tie Game   ');
}

// In game timer
let timer;
let gameTimer;
function startTimer(count) {
  timer = count;
  updateTimer();
}
function updateTimer() {
  if (timer > 0) {
    gameTimer = setTimeout(updateTimer, 1000);
    timer -= 1;
  }
}

// Drawing box declarations
let menu = 0;
let box1 = [380, 280, 200, 80, false]; // Play button
let box2 = [30, 40, 400, 30]; // p1 health bar
let box3 = [530, 40, 400, 30]; // p2 health bar
let box4 = [430, 10, 100, 100]; // timer

// Event loop function
function loop() {
  switch (menu) {
    case 0: // Main menu
      drawMain(box1);
      break;
    case 1: // Game
      bg.update();
      checkCombat();
      checkGame();
      drawStatus(box2, box3, box4);
      p1.update();
      p2.update();
      attacks1.forEach((a) => a ? a.update() : void(0));
      attacks2.forEach((a) => a ? a.update() : void(0)); 
  }
  window.requestAnimationFrame(loop);
}

loop();

// Event listeners for keyboard + mouse input

window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

// Canvas relative mouse position: 
// https://stackoverflow.com/questions/17130395
window.onmousemove = function(e) {
  let rect = canvas.getBoundingClientRect();
  let mX = e.pageX - rect.left;
  let mY = e.pageY - rect.top;
  if (mX > box1[0] && mY > box1[1] && 
    mX < box1[0] + box1[2] && mY < box1[1] + box1[3]) {
    canvas.style.cursor = 'pointer';
    box1[4] = true;
  } else {
    canvas.style.cursor = 'default';
    box1[4] = false;
  }
}

window.onmouseup = function(e) {
  let rect = canvas.getBoundingClientRect();
  let mX = e.pageX - rect.left;
  let mY = e.pageY - rect.top;
  if (mX > box1[0] && mY > box1[1] && 
    mX < box1[0] + box1[2] && mY < box1[1] + box1[3]) {
    // Start game
    menu = 1;
    startTimer(31);
  }
}