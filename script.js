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

// Draw status bars (health, timer, result)
// Box dimensions: [X, Y, width, height]
let box1 = [30, 40, 400, 30]; // p1 health bar
let box2 = [530, 40, 400, 30]; // p2 health bar
let box3 = [430, 10, 100, 100]; // timer
function drawStatus() {
  c.fillStyle = 'red';
  c.fillRect(box1[0], box1[1], box1[2], box1[3]);
  c.fillRect(box2[0], box2[1], box2[2], box2[3]);
  c.fillStyle = 'green';
  c.fillRect(box3[0], box3[1], box3[2], box3[3]);
  if (gameStatus) {
    c.fillRect(320, 145, 320, 80);
  }
  c.fillStyle = 'yellow';
  c.fillRect(box1[0] + (4 * (100 - p1.health)), box1[1], 
    box1[2] - (4 * (100 - p1.health)), box1[3]
  );
  c.fillRect(box2[0], box2[1], box2[2] - ( 4 * (100 - p2.health)), box2[3]);
  c.font = '40px Verdana';
  c.fillStyle = 'white';
  c.fillText(timer.toString().padStart(2, '0'), 455, 75);
  if (gameStatus) {
    c.fillText(gameStatus, 340, 200);
  }
}

// Draw main menu
// Box dimensions: [X, Y, width, height]
let menu = 0;
let box4 = [380, 280, 200, 80, false]; // Play button
function drawMenu() {
  c.fillStyle = 'grey';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = box4[4] ? 'green' : 'lightgreen';
  c.fillRect(box4[0], box4[1], box4[2], box4[3]);
  c.fillStyle = 'black';
  c.font = '40px Verdana';
  c.fillText('PLAY', box4[0] + 45, box4[1] + 55);
  c.fillText('DINO BRAWL', 340, 200);
}

// Event loop function
function loop() {
  switch (menu) {
    case 0: // Main menu
      drawMenu();
      break;
    case 1: // Game
      bg.update();
      checkCombat();
      checkGame();
      drawStatus();
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
  if (mX > box4[0] && mY > box4[1] && 
    mX < box4[0] + box4[2] && mY < box4[1] + box4[3]) {
    canvas.style.cursor = 'pointer';
    box4[4] = true;
  } else {
    canvas.style.cursor = 'default';
    box4[4] = false;
  }
}

window.onmouseup = function(e) {
  let rect = canvas.getBoundingClientRect();
  let mX = e.pageX - rect.left;
  let mY = e.pageY - rect.top;
  if (mX > box4[0] && mY > box4[1] && 
    mX < box4[0] + box4[2] && mY < box4[1] + box4[3]) {
    // Start game
    menu = 1;
    startTimer(31);
  }
}