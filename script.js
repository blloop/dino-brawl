// Fruit Fight
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

// List of keyboard controls
const keySet1 = {
  w: { pressed: false},
  a: { pressed: false},
  s: { pressed: false},
  d: { pressed: false},
  atk: { pressed: false}
};

const keySet2 = {
  w: { pressed: false},
  a: { pressed: false},
  s: { pressed: false},
  d: { pressed: false},
  atk: { pressed: false}
};

// Sprite class declarations
const bg = new Sprite({
  position: { x: 0, y: 0 },
  size: { width: canvas.width, height: canvas.height },
  source: 'img/bg.png',
  scale: 1,
  frames: 1,
})

// Fighter class declarations
const p1 = new Fighter({
  position: { x: 200, y: 0 },
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 10 },
  flip: false,
  keySet: keySet1,
  size: { width: 60, height: 75 },
  sprites: {
    src: 'img/red-sprites.png',
    frames: 24,
    idle: [0, 3], 
    run: [4, 9], 
    jump: [10, 13], 
    hit: [14, 16], 
    crouch: [17, 17],
    lowrun: [18, 23]
  },
  scale: 5,
  offset: { x: 6, y: 6 }
});
const p2 = new Fighter({
  position: { x: 700, y: 0 },
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 10 },
  flip: true,
  keySet: keySet2,
  size: { width: 60, height: 75 },
  sprites: {
    src: 'img/red-sprites-flip.png',
    frames: 24,
    idle: [0, 3], 
    run: [4, 9], 
    jump: [10, 13], 
    hit: [14, 16], 
    crouch: [17, 17],
    lowrun: [18, 23]
  },
  scale: 5,
  offset: { x: 6, y: 6 }
});

function collide(player, attack) {
  return attack.x + attack.width >= player.position.x &&
    attack.x <= player.position.x + player.width &&
    attack.y +  attack.height > player.position.y &&
    attack.y <= player.position.y + player.height
}

function checkCombat() {
  if (p1.attacking && collide(p2, p1.attack)) {
    p1.attacking = false;
    p2.takeHit();
    document.getElementById('health-2').style.width = 
      `${p2.health * 10}%`;
  }
  if (p2.attacking && collide(p1, p2.attack)) { 
    p2.attacking = false;  
    p1.takeHit();
    document.getElementById('health-1').style.width = 
      `${p1.health * 10}%`;
  } 
}

function endGame() {
  let text = document.getElementById('game-status');
  text.style.display = 'flex';
  text.innerHTML = p1.health > p2.health ?
    'P1 Wins!' : (p2.health > p1.health ?
      'P2 Wins!' : 'Tie Game.');
}

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

function loop() {
  window.requestAnimationFrame(loop);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  checkCombat();
  bg.update();
  p1.update();
  p2.update();
}

loop();
updateTimer();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w': 
      keySet1.w.pressed = true; break;
    case 'a': 
      keySet1.a.pressed = true; break;
    case 's': 
      keySet1.s.pressed = true; break;
    case 'd': 
      keySet1.d.pressed = true; break;
    case 'ArrowUp': 
      keySet2.w.pressed = true; break;
    case 'ArrowLeft': 
      keySet2.a.pressed = true; break;
    case 'ArrowDown': 
      keySet2.s.pressed = true; break;
    case 'ArrowRight': 
      keySet2.d.pressed = true; break;
    case 'f':
      keySet1.atk.pressed = true; break;
    case 'o':
      keySet2.atk.pressed = true; break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w': 
      keySet1.w.pressed = false; break;
    case 'a': 
      keySet1.a.pressed = false; break;
    case 's': 
      keySet1.s.pressed = false; break;
    case 'd': 
      keySet1.d.pressed = false; break;
    case 'ArrowUp': 
      keySet2.w.pressed = false; break;
    case 'ArrowLeft': 
      keySet2.a.pressed = false; break;
    case 'ArrowDown': 
      keySet2.s.pressed = false; break;
    case 'ArrowRight': 
      keySet2.d.pressed = false; break;    
    case 'f':
      keySet1.atk.pressed = false; break;
    case 'o':
      keySet2.atk.pressed = false; break;
  }
});
