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
      // document.getElementById('health-2').style.width = 
      //   `${p2.health}%`;
    }
  });
  attacks2.forEach((a) => {
    if (a && collide(p1, a)) {
      p1.takeHit(p2.damage);
      a.hurt = false;
      // document.getElementById('health-1').style.width = 
      //   `${p1.health}%`;
    }
  });
}

// Announce that game has ended
let gameStatus = '';
function checkGame() {
  if (p1.health > 0 && p2.health > 0 && timer > 0) {
    return;
  }
  gameStatus = p1.health > p2.health ?
    'Player 1 Wins!' : (p2.health > p1.health ?
      'Player 2 Wins!' : '   Tie Game   ');
}

// Box dimensions (X, Y, width, height)
let box1 = [30, 40, 400, 30];
let box2 = [530, 40, 400, 30];
let box3 = [430, 10, 100, 100];
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
  c.fillRect(box1[0] + (4 * (100 - p1.health)), box1[1], box1[2] - (4 * (100 - p1.health)), box1[3]);
  c.fillRect(box2[0], box2[1], box2[2] - ( 4 * (100 - p2.health)), box2[3]);
  c.font = '40px Verdana';
  c.fillStyle = 'white';
  c.fillText(timer.toString().padStart(2, '0'), 455, 75);
  if (gameStatus) {
    c.fillText(gameStatus, 340, 200);
  }
}

// In game timer
let timer = 31;
let gameTimer;
function updateTimer() {
  if (timer > 0) {
    gameTimer = setTimeout(updateTimer, 1000);
    timer -= 1;
  }
}

// Event loop function
function loop() {
  window.requestAnimationFrame(loop);
  bg.update();
  checkCombat();
  checkGame();
  drawStatus();
  p1.update();
  p2.update();
  attacks1.forEach((a) => a ? a.update() : void(0));
  attacks2.forEach((a) => a ? a.update() : void(0));
}

loop();
updateTimer();

window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});
