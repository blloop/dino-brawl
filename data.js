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
const attCounts = [
  6, 6, 9, 9, 7, 7, 6, 6
]
const mapSprites = [
  './stages/bg1.png',
  './stages/bg2.png',
  './stages/bg3.png',
  './stages/bg4.png'
];

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

// Create attack sprites from template
function makeAttacks(idx) {
  return ({
    src: attSprites[idx],
    frames: attCounts[idx],
    idle: [0, attCounts[idx] - 1]
  })
}

// List of fighter names
const fighterNames = [
  'chomper', 'slurper', 'spitter', 'kindler'
];

// List of fighter types
const redBase = {
  position: { x: 200, y: 0 },
  size: { width: 60, height: 75 },
  sprites: makeChars(0),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 4, jump: 5, health: 100, damage: 10 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: makeAttacks(0),
    rate: 16, 
    offset: { x: 8, y: 6}, 
    scale: 4, 
    duration: 5, 
    speed: 0,
    cooldown: 12
  },
  keySet: keySet1
}

const redFlip = {
  position: { x: 700, y: 0 },
  size: { width: 60, height: 75 },
  sprites: makeChars(4),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 4, jump: 5, health: 100, damage: 10 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: makeAttacks(1),
    rate: 16, 
    offset: { x: 3, y: 6}, 
    scale: 4, 
    duration: 5, 
    speed: 0,
    cooldown: 12
  },
  keySet: keySet2
}

const greenBase = {
  position: { x: 200, y: 0 },
  size: { width: 60, height: 75 },
  sprites: makeChars(1),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 4.5, jump: 5, health: 100, damage: 8 },
  attackInfo: {
    size: { width: 70, height: 40 },
    sprites: makeAttacks(2),
    rate: 8, 
    offset: { x: 5, y: 6}, 
    scale: 5, 
    duration: 20, 
    speed: 2,
    cooldown: 8
  },
  keySet: keySet1
}

const greenFlip = {
  position: { x: 700, y: 0 },
  size: { width: 60, height: 75 },
  sprites: makeChars(5),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 4.5, jump: 5, health: 100, damage: 8 },
  attackInfo: {
    size: { width: 70, height: 40 },
    sprites: makeAttacks(3),
    rate: 8, 
    offset: { x: 5, y: 6}, 
    scale: 5, 
    duration: 20, 
    speed: 2,
    cooldown: 8
  },
  keySet: keySet2
}

const blueBase = {
  position: { x: 200, y: 0 },
  size: { width: 60, height: 75 },
  sprites: makeChars(2),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 4.5, jump: 5, health: 100, damage: 6 },
  attackInfo: {
    size: { width: 50, height: 20 },
    sprites: makeAttacks(4),
    rate: 4, 
    offset: { x: 6, y: 8}, 
    scale: 3.5, 
    duration: 30, 
    speed: 4,
    cooldown: 6
  },
  keySet: keySet1
}

const blueFlip = {
  position: { x: 700, y: 0 },
  size: { width: 60, height: 75 },
  sprites: makeChars(6),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 4.5, jump: 5, health: 100, damage: 6 },
  attackInfo: {
    size: { width: 50, height: 20 },
    sprites: makeAttacks(5),
    rate: 4, 
    offset: { x: 4, y: 8}, 
    scale: 3.5, 
    duration: 30, 
    speed: 4,
    cooldown: 6
  },
  keySet: keySet2
}

const yellowBase = {
  position: { x: 200, y: 0 },
  size: { width: 60, height: 75 },
  sprites: makeChars(3),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 3 },
  attackInfo: {
    size: { width: 40, height: 15 },
    sprites: makeAttacks(6),
    rate: 4, 
    offset: { x: 4, y: 8}, 
    scale: 2, 
    duration: 40, 
    speed: 6,
    cooldown: 4
  },
  keySet: keySet1
}

const yellowFlip = {
  position: { x: 700, y: 0 },
  size: { width: 60, height: 75 },
  sprites: makeChars(7),
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 3 },
  attackInfo: {
    size: { width: 40, height: 15 },
    sprites: makeAttacks(7),
    rate: 4, 
    offset: { x: 2, y: 8}, 
    scale: 2, 
    duration: 40, 
    speed: 6,
    cooldown: 4
  },
  keySet: keySet2
}

const fighters = [
  redBase, greenBase, blueBase, yellowBase, 
  redFlip, greenFlip, blueFlip, yellowFlip
];