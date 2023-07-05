// Fruit Fight
// A simple fighting game made with HTML Canvas
// By Bill Yu @blloop

// Canvas preparation
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280; 
canvas.height = 720; 
c.fillRect(0, 0, canvas.width, canvas.height);

// List of game constants
const gravity = 0.5;

// List of keyboard controls
const keys = {
  w: { pressed: false},
  a: { pressed: false},
  s: { pressed: false},
  d: { pressed: false}
}

// Character class
class Fruit {
  constructor({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
  }

  draw() {
    c.fillStyle = 'red';
    c.fillRect(
      this.position.x, this.position.y, 
      this.width, this.height
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y > canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
    }
  }
}

const p1 = new Fruit({
  position: { x: 200, y: 0 },
  velocity: { x: 0, y: 0 }
});
const p2 = new Fruit({
  position: { x: 1000, y: 0 },
  velocity: { x: 0, y: 0 }
});

function loop() {
  window.requestAnimationFrame(loop);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  p1.update();
  p2.update();

  p1.velocity.x = 0;
  if (keys.a.pressed) {
    p1.velocity.x -= 2;
  } 
  if (keys.d.pressed) {
    p1.velocity.x += 2;
  }
  if (keys.w.pressed) {
    p1.velocity.y = -10;
  }
}

loop();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w': 
      keys.w.pressed = true; break;
    case 'a': 
      keys.a.pressed = true; break;
    case 's': 
      keys.w.pressed = true; break;
    case 'd': 
      keys.d.pressed = true; break;
  }
})
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w': 
      keys.w.pressed = false; break;
    case 'a': 
      keys.a.pressed = false; break;
    case 's': 
      keys.s.pressed = false; break;
    case 'd': 
      keys.d.pressed = false; break;
  }
})
