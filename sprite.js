class Sprite {
  constructor({ 
    position, size, source
  }) {
    this.position = { 
      x: position.x, y: position.y
    };
    this.width = size.width;
    this.height = size.height;
    this.image = new Image();
    this.image.src = source;
  }

  draw() {
    c.drawImage(this.image, 
      this.position.x, this.position.y,
      this.width, this.height
    );
  }

  update() {
    this.draw();
  }
}

class Background extends Sprite {
  constructor({ 
    position, size, source
  }) {
    super({
      position, size, source
    });
  }

  source(string) {
    this.image.src = string;
  }

  draw() {
    c.drawImage(this.image, 
      this.position.x - offset - OFFLIM,
      this.position.y,
      this.width, this.height
    );
  }
}

class AnimatedSprite extends Sprite {
  constructor({ 
      position, size, sprites, rate,
      offset = {x: 0, y: 0}, scale = 1
  }) {
    super({ 
      position, size, source: sprites.src 
    });
    this.sprites = sprites;
    this.rate = 32 / rate; // default rate: 4
    this.offset = {
      x: offset.x, y: offset.y
    }
    this.scale = scale;

    this.frames = sprites.frames;
    this.state = 'idle';
    this.timeStamp = 0;
    this.idx = sprites.idle[0];
  }

  draw() {
    c.drawImage(this.image, 
      this.idx * (this.image.width / this.frames),
      0, 
      this.image.width / this.frames,
      this.image.height,
      this.position.x - (this.offset.x * this.scale),     
      this.position.y - (this.offset.y * this.scale),
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    );
  }

  setSprites(src) {
    this.image.src = src;
  }

  sprite(name) {
    if (this.state === name) return;
    this.state = name;
    this.idx = this.sprites[name][0];
  }

  animate() {
    this.timeStamp += 1;
    if (this.timeStamp % this.rate == 0) {
      this.idx = this.idx === this.sprites[this.state][1] ? 
        this.sprites[this.state][0] : this.idx + 1;
    }
  }

  update() {
    this.animate();
    this.draw();
  }
}

class Attack extends AnimatedSprite {
  constructor({
    position, size, sprites, rate, offset, scale,
    speed, flip, list, attIdx, duration
  }) {
    super({ 
      position, size, sprites, rate, offset, scale
    });
    this.speed = speed;
    this.flip = flip;
    this.list = list;
    this.attIdx = attIdx;
    this.duration = duration;
    this.hurt = true;
  }

  create() {
    setTimeout(() => this.list[this.attIdx] = null, 
      this.duration
    );
  }

  update() {
    if (!this.hurt) {      
      setTimeout(() => this.list[this.attIdx] = null, 200);
    }
    this.position.x += this.speed * (this.flip ? -1 : 1);
    super.update();
  }
}