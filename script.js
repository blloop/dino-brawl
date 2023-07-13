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
  size: { width: 70, height: 75 },
  sprites: {
    src: 'img/red-sprites.png',
    frames: 34,
    idle: [0, 3], 
    run: [4, 9], 
    jump: [10, 13], 
    hit: [14, 16], 
    crouch: [17, 17],
    lowrun: [18, 23],
    attack: [24, 28],
    lowatt: [29, 33]
  },
  rate: 1, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 4, 
    offset: { x: 6, y: 6}, 
    scale: 4, 
    damage: 10, 
    duration: 0.3, 
    speed: 0, 
    flip: false,
  },
  keySet: keySet1,
  flip: false
});
const p2 = new Fighter({
  position: { x: 700, y: 0 },
  size: { width: 70, height: 75 },
  sprites: {
    src: 'img/green-sprites-flip.png',
    frames: 34,
    idle: [0, 3], 
    run: [4, 9], 
    jump: [10, 13], 
    hit: [14, 16], 
    crouch: [17, 17],
    lowrun: [18, 23],
    attack: [24, 28],
    lowatt: [29, 33]
  },
  rate: 1, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe-flip.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 4, 
    offset: { x: 6, y: 6}, 
    scale: 4, 
    damage: 10, 
    duration: 0.3, 
    speed: 0, 
    flip: true,
  },
  keySet: keySet2,
  flip: true
});

function collide(player, attack) {
  return attack.position.x + attack.width >= player.position.x &&
    attack.position.x <= player.position.x + player.width &&
    attack.position.y +  attack.height > player.position.y &&
    attack.position.y <= player.position.y + player.height
}

function checkCombat() {
  if (p1.attack && collide(p2, p1.attack)) {
    p2.takeHit(p1.attack.damage);
    document.getElementById('health-2').style.width = 
      `${p2.health}%`;
  }
  if (p2.attack && collide(p1, p2.attack)) { 
    p1.takeHit(p2.attack.damage);
    document.getElementById('health-1').style.width = 
      `${p1.health}%`;
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
