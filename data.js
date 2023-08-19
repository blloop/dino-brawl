// List of keyboard controls
let keys = [];

let keySet1 = {
  w: 'w',
  a: 'a',
  s: 's',
  d: 'd',
  atk: 'f'
};
let keySet2 = {
  w: 'ArrowUp',
  a: 'ArrowLeft',
  s: 'ArrowDown',
  d: 'ArrowRight',
  atk: '/'
};
   
keys[keySet1.a] = false;
keys[keySet1.d] = false;
keys[keySet2.a] = false;
keys[keySet2.d] = false;

// List of sprites
const mapSprites = [
  './stages/bg1.png',
  './stages/bg2.png',
  './stages/bg3.png',
  './stages/bg4.png'
];
const charSprites = [
  './sprites/red-sprites.png',
  './sprites/green-sprites.png',
  './sprites/blue-sprites.png',
  './sprites/yellow-sprites.png',
  './sprites/red-sprites-flip.png',
  './sprites/green-sprites-flip.png',
  './sprites/blue-sprites-flip.png',
  './sprites/yellow-sprites-flip.png'
];
const attSprites = [
  './attacks/swipe.png',
  './attacks/lick.png',
  './attacks/spit.png',
  './attacks/fire.png',
  './attacks/swipe-flip.png',
  './attacks/lick-flip.png',
  './attacks/spit-flip.png',
  './attacks/fire-flip.png'
];
const attData = { // [red, green, blue, yellow]
  width: [50, 70, 50, 40],
  height: [50, 70, 20, 15],
  count: [6, 9, 7, 6],
  rate: [16, 8, 4, 4],
  offsetX: [5, 5, 5, 2],
  offsetY: [5, 6, 8, 8],
  scale: [4, 5, 3.5, 2],
  duration: [5, 20, 30, 40], 
  speed: [0, 2, 4, 6],
  cooldown: [12, 8, 6, 4]
}

// Create char sprites from template
function makeChars(idx) {
  return ({
    src: charSprites[idx],
    frames: 34,
    idle: [0, 3], 
    run: [4, 9], 
    jump: [10, 13], 
    hit: [14, 16], 
    crouch: [17, 17],
    lowrun: [18, 23],
    attack: [24, 28],
    lowatt: [29, 33]
  });  
}

// Create attack info from template
function makeAttacks(idx) {
  return ({
    size: { 
      width: attData.width[idx], 
      height: attData.height[idx]
    },
    sprites: {
      src: attSprites[idx],
      frames: attData.count[idx],
      idle: [0, attData.count[idx] - 1]
    },
    rate: attData.rate[idx],
    offset: {
      x: attData.offsetX[idx],
      y: attData.offsetY[idx]
    }, 
    scale: attData.scale[idx],
    duration: attData.duration[idx],
    speed: attData.speed[idx],
    cooldown: attData.cooldown[idx],
  })
}

// List of fighter names
const fighterNames = [
  'chomper', 'slurper', 'spitter', 'kindler'
];

// List of fighter types
const redBase = {
  size: { width: 60, height: 75 },
  sprites: makeChars(0),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 10 },
  attackInfo: makeAttacks(0),
};

const greenBase = {
  size: { width: 60, height: 75 },
  sprites: makeChars(1),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 4.5, jump: 5, health: 100, damage: 8 },
  attackInfo: makeAttacks(1),
};

const blueBase = {
  size: { width: 60, height: 75 },
  sprites: makeChars(2),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 4.5, jump: 5, health: 100, damage: 6 },
  attackInfo: makeAttacks(2),
};

const yellowBase = {
  size: { width: 60, height: 75 },
  sprites: makeChars(3),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 4, jump: 5, health: 100, damage: 3 },
  attackInfo: makeAttacks(3),
};

const fighters = [
  redBase, greenBase, blueBase, yellowBase
];