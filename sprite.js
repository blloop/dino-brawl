class Sprite {
  constructor({ position, size, source }) {
    this.position = position;
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

class AnimatedSprite extends Sprite {
  constructor({ 
      position, size, sprites, 
      offset = {x: 0, y: 0}, scale = 1, frames = 1
    }) {
    super({ position, size, source: sprites.idle.src });
    this.sprites = sprites;
    this.offset = offset;
    this.scale = scale;
    this.frames = sprites.idle.frames;
    this.timeStamp = 0;
    this.idx = 0;
  }

  draw() {
    c.drawImage(this.image, 
      this.idx * (this.image.width / this.frames),
      0, 
      this.image.width/ this.frames, 
      this.image.height,
      this.position.x - (this.offset.x * this.scale),
      this.position.y - (this.offset.y * this.scale),
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    );
  }

  // Sprite actions: Idle, Run, Attack, ...
  sprite(name) {
    this.image.src = this.sprites[name].src;
    this.frames = this.sprites[name].frames;
    this.idx = this.idx % this.frames;
  }

  animate() {
    this.timeStamp += 1;
    if (this.timeStamp % 10 == 0) {
      this.idx = (this.idx + 1) % this.frames;
      console.log('idx is: ' + this.idx);
    }
  }

  update() {
    this.animate();
    this.draw();
  }
}