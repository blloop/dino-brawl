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
  constructor({position, velocity, traits, keySet}) {
    this.position = position;
    this.velocity = velocity;
    this.traits = traits;
    this.keySet = keySet;
    this.height = 150;
    this.width = 50;
    this.attack = {
      loc: this.position,
      width: 100,
      height: 50
    };
  }

  draw() {
    c.fillStyle = 'red';
    c.fillRect(
      this.position.x, this.position.y, 
      this.width, this.height
    );
    if (this.keySet.atk.pressed) {
      c.fillStyle = 'yellow';
      c.fillRect(
        this.attack.loc.x, this.attack.loc.y, 
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
    if (this.keySet.w.pressed) {
      this.velocity.y = -1 * this.traits.jump;
    }
    if (this.position.y + this.height + 
      this.velocity.y > canvas.height) 
    {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
    }
    this.draw();  
  }
}

const p1 = new Fruit({
  position: { x: 200, y: 0 },
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 10 },
  keySet: keySet1
});
const p2 = new Fruit({
  position: { x: 700, y: 0 },
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 10 },
  keySet: keySet2
});

function checkBounds() {
  if (
    p1.keySet.atk.pressed &&
    p1.attack.loc.x + p1.attack.width >= p2.position.x &&
    p1.attack.loc.x <= p2.position.x + p2.width &&
    p1.attack.loc.y + p1.attack.height > p2.position.y &&
    p1.attack.loc.y <= p2.position.y + p2.height
  ) {
    // Player 1 hit player 2
    console.log('go');
  }
  if (
    p2.keySet.atk.pressed &&
    p2.attack.loc.x + p2.attack.width <= p1.position.x &&
    p2.attack.loc.x <= p1.position.x + p1.width &&
    p2.attack.loc.y + p2.attack.height > p1.position.y &&
    p2.attack.loc.y <= p1.position.y + p1.height
  ) {
    // Player 2 hit player 1
    console.log('go');
  }
}

function loop() {
  window.requestAnimationFrame(loop);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  p1.update();
  p2.update();
  checkBounds();  
}

loop();

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
