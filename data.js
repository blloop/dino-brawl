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
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 16, 
    offset: { x: 8, y: 6}, 
    scale: 4, 
    damage: 10, 
    duration: 5, 
    speed: 0, 
    flip: false,
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
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/swipe-flip.png',
      frames: 6, 
      idle: [0, 5]
    },
    rate: 16, 
    offset: { x: 8, y: 6}, 
    scale: 4, 
    damage: 10, 
    duration: 5, 
    speed: 0, 
    flip: true,
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
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
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
    damage: 10, 
    duration: 10, 
    speed: 0, 
    flip: false,
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
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
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
    damage: 10, 
    duration: 10, 
    speed: 0, 
    flip: true,
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
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
  attackInfo: {
    size: { width: 50, height: 50 },
    sprites: {
      src: 'img/lick.png',
      frames: 9, 
      idle: [0, 8]
    },
    rate: 16, 
    offset: { x: 6, y: 6}, 
    scale: 5, 
    damage: 6, 
    duration: 10, 
    speed: 3, 
    flip: false
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
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
  attackInfo: {
    size: { width: 100, height: 50 },
    sprites: {
      src: 'img/lick-flip.png',
      frames: 9, 
      idle: [0, 8]
    },
    rate: 16, 
    offset: { x: 0, y: 4}, 
    scale: 4, 
    damage: 6, 
    duration: 10, 
    speed: 0, 
    flip: true,
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
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
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
    damage: 10, 
    duration: 10, 
    speed: 0, 
    flip: false,
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
  velocity: { x: 0, y: 0 },
  traits: { accel: 5, jump: 5, health: 100 },
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
    damage: 10, 
    duration: 10, 
    speed: 0, 
    flip: true,
  },
  keySet: keySet2,
  flip: true
}