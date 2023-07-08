// Fruit Fight
// A simple fighting game made with HTML Canvas
// By Bill Yu @blloop

// Canvas preparation
const canvas = document.getElementById('canvas');
canvas.width = 960;
canvas.height = 540;
const c = canvas.getContext('2d');
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

// Character class
class Fruit {
  constructor({
    position, velocity, traits, faceLeft, keySet
  }) {
    this.position = position;
    this.velocity = velocity;
    this.traits = traits;
    this.health = traits.health;
    this.faceLeft = faceLeft;
    this.keySet = keySet;
    this.height = 150;
    this.width = 50;
    this.canAttack = true;
    this.attacking = false;
    this.attack = {
      pos: {
        x: this.position.x,
        y: this.position.y
      },
      width: 100,
      height: 50
    };
  }

  draw() {
    c.fillStyle = (this.faceLeft ? 'skyblue' : 'pink');
    c.fillRect(
      this.position.x, this.position.y, 
      this.width, this.height
    );
    if (this.attacking) {
      c.fillStyle = 'yellow';
      c.fillRect(
        this.attack.pos.x + (this.faceLeft ? 
          this.width - this.attack.width : 0
        ), 
        this.attack.pos.y, 
        this.attack.width, this.attack.height
      );
    }
  }

  update() {
    // Horizontal velocity
    if (this.keySet.a.pressed === this.keySet.d.pressed) {
      this.velocity.x = this.velocity.x / 1.2;
    }
    if (this.keySet.a.pressed) {
      this.velocity.x -= this.traits.accel / 3;
    } 
    if (this.keySet.d.pressed) {
      this.velocity.x += this.traits.accel / 3;
    }
    if (this.velocity.x > this.traits.accel * 2) {
      this.velocity.x = this.traits.accel * 2
    }
    if (this.velocity.x < this.traits.accel * -2) {
      this.velocity.x = this.traits.accel * -2
    }
    this.position.x += this.velocity.x;
    // Vertical velocity
    if (this.position.y + this.height + 
      this.velocity.y >= canvas.height) 
    {
      if (this.keySet.w.pressed) {
        this.velocity.y = -2.5 * this.traits.jump;
      } else {
        this.velocity.y = 0;
      }
    } else {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
    }
    // Attack data
    if (this.keySet.atk.pressed && this.canAttack) {
      this.attacking = true;
      this.canAttack = false;
      setTimeout(() => this.attacking = false, 200);
      setTimeout(() => this.canAttack = true, 1000);
    }
    this.attack.pos.x = this.position.x + (this.faceLeft && -50),
    this.attack.pos.y = this.position.y;
    this.draw();  
  }
}

const p1 = new Fruit({
  position: { x: 200, y: 0 },
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 10 },
  faceLeft: false,
  keySet: keySet1
});
const p2 = new Fruit({
  position: { x: 700, y: 0 },
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 10 },
  faceLeft: true,
  keySet: keySet2
});

function collide(player, attack) {
  return attack.pos.x + attack.width >= player.position.x &&
    attack.pos.x <= player.position.x + player.width &&
    attack.pos.y +  attack.height > player.position.y &&
    attack.pos.y <= player.position.y + player.height
}

function endGame() {
  let text = document.getElementById('game-status');
  text.style.display = 'flex';
  text.innerHTML = p1.health > p2.health ?
    'P1 Wins!' : (p2.health > p1.health ?
      'P2 Wins!' : 'Tie Game.');
}

let timer = 5;
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
  p1.update();
  p2.update();
  if (p1.attacking && collide(p2, p1.attack)) {    
    p1.attacking = false;
    p2.health = Math.max(p2.health - 1, 0);
    document.getElementById('health-2').style.width = 
      `${p2.health * 10}%`;
    console.log("P1 WINS!");
  } 
  if (p2.attacking && collide(p1, p2.attack)) {   
    p2.attacking = false; 
    p1.health = Math.max(p1.health - 1, 0);
    document.getElementById('health-1').style.width = 
      `${p1.health * 10}%`;
    console.log("P2 WINS!");
  } 
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
      keySet2.w.pressed = true; break;
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
      keySet2.w.pressed = false; break;
    case 'ArrowRight': 
      keySet2.d.pressed = false; break;    
    case 'f':
      keySet1.atk.pressed = false; break;
    case 'o':
      keySet2.atk.pressed = false; break;
  }
});
