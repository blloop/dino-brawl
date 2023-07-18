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
    speed: 0,
    cooldown: 10
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
    speed: 0,
    cooldown: 10
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
  traits: { accel: 4.5, jump: 5, health: 100, damage: 6 },
  attackInfo: {
    size: { width: 50, height: 20 },
    sprites: {
      src: 'img/spit.png',
      frames: 7, 
      idle: [0, 6]
    },
    rate: 4, 
    offset: { x: 6, y: 8}, 
    scale: 3.5, 
    duration: 30, 
    speed: 4,
    cooldown: 6
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
  traits: { accel: 4.5, jump: 5, health: 100, damage: 6 },
  attackInfo: {
    size: { width: 50, height: 20 },
    sprites: {
      src: 'img/spit-flip.png',
      frames: 7, 
      idle: [0, 6]
    },
    rate: 4, 
    offset: { x: 6, y: 8}, 
    scale: 3.5, 
    duration: 30, 
    speed: 4,
    cooldown: 6
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
  traits: { accel: 4.5, jump: 5, health: 100, damage: 8 },
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
    speed: 2,
    cooldown: 8
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
  traits: { accel: 4.5, jump: 5, health: 100, damage: 8 },
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
    speed: 2,
    cooldown: 8
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
  traits: { accel: 4, jump: 5, health: 100, damage: 3 },
  attackInfo: {
    size: { width: 40, height: 15 },
    sprites: {
      src: 'img/fire.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 4, 
    offset: { x: 6, y: 8}, 
    scale: 2, 
    duration: 40, 
    speed: 6,
    cooldown: 4
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
  traits: { accel: 4, jump: 5, health: 100, damage: 3 },
  attackInfo: {
    size: { width: 40, height: 15 },
    sprites: {
      src: 'img/fire-flip.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 4, 
    offset: { x: 6, y: 8}, 
    scale: 2, 
    duration: 40, 
    speed: 6,
    cooldown: 4
  },
  keySet: keySet2,
  flip: true
}