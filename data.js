// List of keyboard controls
let keys = [];

let keySet1 = {
  w: 'w',
  a: 'a',
  s: 's',
  d: 'd',
  atk: 'f',
};

let keySet2 = {
  w: 'i',
  a: 'j',
  s: 'k',
  d: 'l',
  atk: ';',
};
   
keys[keySet1.a] = false;
keys[keySet1.d] = false;
keys[keySet2.a] = false;
keys[keySet2.d] = false;

// List of fighter types
const redBase = {
  position: { x: 200, y: 0 },
  size: { width: 60, height: 75 },
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
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 10 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 8, 
    offset: { x: 8, y: 6}, 
    scale: 4, 
    duration: 10, 
    speed: 0
  },
  keySet: keySet1,
  flip: false
}

const redFlip = {
  position: { x: 700, y: 0 },
  size: { width: 60, height: 75 },
  sprites: {
    src: 'img/red-sprites-flip.png',
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
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 10 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe-flip.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 8, 
    offset: { x: 8, y: 6}, 
    scale: 4, 
    duration: 10, 
    speed: 0
  },
  keySet: keySet2,
  flip: true
}

const blueBase = {
  position: { x: 200, y: 0 },
  size: { width: 60, height: 75 },
  sprites: {
    src: 'img/blue-sprites.png',
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
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 10 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 16, 
    offset: { x: 6, y: 6}, 
    scale: 4, 
    duration: 10, 
    speed: 0
  },
  keySet: keySet1,
  flip: false
}

const blueFlip = {
  position: { x: 700, y: 0 },
  size: { width: 60, height: 75 },
  sprites: {
    src: 'img/blue-sprites-flip.png',
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
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 10 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe-flip.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 16, 
    offset: { x: 6, y: 6}, 
    scale: 4, 
    duration: 10, 
    speed: 0
  },
  keySet: keySet2,
  flip: true
}

const greenBase = {
  position: { x: 200, y: 0 },
  size: { width: 60, height: 75 },
  sprites: {
    src: 'img/green-sprites.png',
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
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 7 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/lick.png',
      frames: 9, 
      idle: [0, 8]
    },
    rate: 8, 
    offset: { x: 6, y: 6}, 
    scale: 5, 
    duration: 20, 
    speed: 3
  },
  keySet: keySet1,
  flip: false
}

const greenFlip = {
  position: { x: 700, y: 0 },
  size: { width: 60, height: 75 },
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
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 7 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/lick-flip.png',
      frames: 9, 
      idle: [0, 8]
    },
    rate: 8, 
    offset: { x: 6, y: 6}, 
    scale: 5, 
    duration: 20, 
    speed: 3
  },
  keySet: keySet2,
  flip: true
}

const yellowBase = {
  position: { x: 200, y: 0 },
  size: { width: 60, height: 75 },
  sprites: {
    src: 'img/yellow-sprites.png',
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
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 10 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 16, 
    offset: { x: 6, y: 6}, 
    scale: 4, 
    duration: 10, 
    speed: 0
  },
  keySet: keySet1,
  flip: false
}

const yellowFlip = {
  position: { x: 700, y: 0 },
  size: { width: 60, height: 75 },
  sprites: {
    src: 'img/yellow-sprites-flip.png',
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
  rate: 4, 
  offset: { x: 6, y: 6 }, 
  scale: 5,
  traits: { accel: 5, jump: 5, health: 100, damage: 10 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe-flip.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 16, 
    offset: { x: 6, y: 6}, 
    scale: 4, 
    duration: 10, 
    speed: 0
  },
  keySet: keySet2,
  flip: true
}