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
const OFFLIM = 150; // maximum camera offset
const OFFPAD = 50; // minimum fighter distance from game border
const UILAG = 150; // interface selection delay

// Background image
const bg = new Background({
  position: { x: 0, y: 0 },
  size: { width: 1260, height: 540 },
  source: './stages/bg1.png'
})
let offset = 0; // background expansion

// Timer image
const sign = new Sprite({
  position: { x: 415, y: 0 },
  size: { width: 128, height: 128 }, 
  source: './ui/sign.png'
})

// Health bar images
const hpa = new Sprite({
  position: { x: 30, y: 25 }, 
  size: { width: 400, height: 60 }, 
  source: './ui/hp-overlay-a.png'
})
const hpb = new Sprite({
  position: { x: 530, y: 25 }, 
  size: { width: 400, height: 60 }, 
  source: './ui/hp-overlay-b.png'
})


// Fighter class declarations
const attacks1 = []; // attack queue
const attacks2 = [];
let select1 = 0; // fighter number selection, 0-3
let select2 = 0;
let p1 = null; // declare as new Fighter, w/ attacks1
let p2 = null; // declare as new Fighter, w/ attacks2
let cameraX = 0;
let cameraLimit = [-50, 50];

// Function to check collision between two objects
function collide(a, b) {
  return (b.position.x + b.width >= a.position.x &&
    b.position.x <= a.position.x + a.width &&
    b.position.y +  b.height > a.position.y &&
    b.position.y <= a.position.y + a.height);
}

// Check for all possible collisions
function checkCombat() {
  attacks1.forEach((a) => {
    if (a && a.hurt && collide(p2, a)) {
      p2.takeHit(p1.damage);
      a.hurt = false;
    }
  });
  attacks2.forEach((a) => {
    if (a && a.hurt && collide(p1, a)) {
      p1.takeHit(p2.damage);
      a.hurt = false;
    }
  });
}

// Ensure that players are facing each other
function checkFlip() {
  if (p1.flip != (p1.position.x > p2.position.x)) {
    p1.flip = !p1.flip;
    p1.setSprites(charSprites[select1 + (p1.flip ? 4 : 0)]);
  }
  if (p2.flip != (p2.position.x > p1.position.x)) {
    p2.flip = !p2.flip;
    p2.setSprites(charSprites[select2 + (p2.flip ? 4 : 0)]);
  }
}

// Character selection sprites
let chosen1 = new AnimatedSprite({
  position: {x: 220, y: 120},
  size: {x: 120, y: 150},
  sprites: {
    src: './sprites/select-p1.png',
    frames: 16,
    idle: [0, 3],
    0: [0, 3],
    1: [4, 7],
    2: [8, 11],
    3: [12, 15]
  },
  rate: 4,
  offset: { x: 6, y: 6 }, 
  scale: 7
});
let chosen2 = new AnimatedSprite({
  position: {x: 640, y: 120},
  size: {x: 120, y: 150},
  sprites: {
    src: './sprites/select-p2.png',
    frames: 16,
    idle: [0, 3],
    0: [0, 3],
    1: [4, 7],
    2: [8, 11],
    3: [12, 15]
  },
  rate: 4,
  offset: { x: 6, y: 6 }, 
  scale: 7
});

// Character selection input
let change1 = true;
let change2 = true;
function charSelect() {
  if (change1) {
    if (keys[keySet1.a] || keys[keySet1.d]) {
      select1 = keys[keySet1.a] ? 
        Math.max(0, select1 - 1) : 
        Math.min(3, select1 + 1);
      chosen1.sprite(select1);
      change1 = false;
      setTimeout(() => change1 = true, UILAG);
    }
  }
  if (change2) {
    if (keys[keySet2.a] || keys[keySet2.d]) {
      select2 = keys[keySet2.a] ? 
        Math.max(0, select2 - 1) : 
        Math.min(3, select2 + 1);
      chosen2.sprite(select2);
      change2 = false;
      setTimeout(() => change2 = true, UILAG);
    } 
  }  
}

// Map selection sprites
const maps = [];
for (let i = 0; i < 4; i++) {
  maps.push(new Sprite({    
    position: { x: 40 + (230 * i), y: 240 },
    size: { width: 200, height: 100 },
    source: mapSprites[i]
  }))
};

// Map selection input
let currMap = 0;
let changeMap = true;
function mapSelect() {
  if (changeMap && (keys[keySet1.a] || keys[keySet2.a])) {
    currMap = Math.max(0, currMap - 1);
    bg.source(mapSprites[currMap]);
    changeMap = false;
    setTimeout(() => changeMap = true, UILAG);
  }
  if (changeMap && (keys[keySet1.d] || keys[keySet2.d])) {
    currMap = Math.min(mapSprites.length - 1, currMap + 1);
    bg.source(mapSprites[currMap]);
    changeMap = false;
    setTimeout(() => changeMap = true, UILAG);
  }
}

// Announce that game has ended
let gameStatus = '';
function checkGame() {
  if (gameStatus) return;
  if (p1.health === 0 || p2.health === 0 || timer === 0) {
    timer = 0;
    gameStatus = (p1.health > p2.health ?
      'Player 1 Wins!' : (p2.health > p1.health ?
        'Player 2 Wins!' : '   Tie Game   '));
    setTimeout(() => {
      menu = 1;
      gameStatus = '';
    }, 2000);
  }
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

// Game start declarations
function startGame() {
  p1 = new Fighter(
    fighters[select1], { x: 200, y: 200 }, keySet1,
    attacks1, 'P1', null, select1, '#b30000'
  );
  p2 = new Fighter(
    fighters[select2], { x: 700, y: 200 }, keySet2,
    attacks2, 'P2', p1, select2, '#0000b3'
  );
  p1.opp = p2;
  startTimer(30);
  offset = 0;
}

// Drawing box declarations
let menu = 0;
let box1 = [370, 280, 200, 80, false]; // brawl button
let box2 = [380, 380, 180, 80, false]; // start button
let box3 = [360, 380, 220, 80, false]; // start button
let box4 = [55, 40, 350, 30]; // p1 health bar
let box5 = [555, 40, 350, 30]; // p2 health bar

// Event loop function
function loop() {
  switch (menu) {
    case 0: // Main menu
      drawMain(box1);
      break;
    case 1:  // Character Select
      drawChars(box2);
      charSelect();
      chosen1.update();
      chosen2.update();
      break;
    case 2: // Map Select
      drawMaps(box3);
      mapSelect();
      maps.forEach(m => m.update());
      break;
    default: // Game
      bg.update();
      sign.update();
      p1.update();
      p2.update();
      drawStatus(box4, box5);
      hpa.update();
      hpb.update();
      checkCombat();
      checkFlip();
      checkGame();
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

// Check for mouse collision
function cursorOn(x, y, box) {
  return (x > box[0] && y > box[1] && 
    x < box[0] + box[2] && y < box[1] + box[3]
  );
}

// Canvas relative mouse position: 
// https://stackoverflow.com/questions/17130395
window.onmousemove = function(e) {
  let rect = canvas.getBoundingClientRect();
  let mX = e.pageX - rect.left;
  let mY = e.pageY - rect.top;
  switch (menu) {
    case 0: 
      if (cursorOn(mX, mY, box1)) {
        canvas.style.cursor = 'pointer';
        box1[4] = true;
      } else {
        canvas.style.cursor = 'default';
        box1[4] = false;
      }
      break;
    case 1: 
      if (cursorOn(mX, mY, box2)) {
        canvas.style.cursor = 'pointer';
        box2[4] = true;
      } else {
        canvas.style.cursor = 'default';
        box2[4] = false;
      }
      break;
    case 2: 
      if (cursorOn(mX, mY, box3)) {
        canvas.style.cursor = 'pointer';
        box3[4] = true;
      } else {
        canvas.style.cursor = 'default';
        box3[4] = false;
      }
      break;
    default: 
      canvas.style.cursor = 'default';
  }
}

window.onmouseup = function(e) {
  let rect = canvas.getBoundingClientRect();
  let mX = e.pageX - rect.left;
  let mY = e.pageY - rect.top;
  if (menu === 0 && cursorOn(mX, mY, box1)) {
    menu = 1; // Switch to character selection screen
  } else if (menu === 1 && cursorOn(mX, mY, box2)) {
    menu = 2; // Switch to stage selection screen
  } else if (menu === 2 && cursorOn(mX, mY, box3)) {
    startGame();
    menu = 3; // Switch to game screen
  }
}
