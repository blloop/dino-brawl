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
const p1 = new Fighter(blueBase, attacks1);
const p2 = new Fighter(blueFlip, attacks2);

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
      document.getElementById('health-2').style.width = 
        `${p2.health}%`;
    }
  });
  attacks2.forEach((a) => {
    if (a && collide(p1, a)) {
      p1.takeHit(p2.damage);
      a.hurt = false;
      document.getElementById('health-1').style.width = 
        `${p1.health}%`;
    }
  });
}

// Announce that game has ended
function endGame() {
  let text = document.getElementById('game-status');
  text.style.display = 'flex';
  text.innerHTML = p1.health > p2.health ?
    'P1 Wins!' : (p2.health > p1.health ?
      'P2 Wins!' : 'Tie Game.');
}

// In game timer
let timer = 30;
let gameTimer;
function updateTimer() {
  if (p1.health == 0 || p2.health == 0) {
    endGame();
  }
  if (timer > 0) {
    gameTimer = setTimeout(updateTimer, 1000);
    timer -= 1;
    document.getElementById('timer').innerText = timer;
  } else {
    endGame();
  }  
}

// Event loop function
function loop() {
  window.requestAnimationFrame(loop);
  checkCombat();
  bg.update();
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
