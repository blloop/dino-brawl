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
  constructor({ position, size, source, scale, frames }) {
    super({ position, size, source });
    this.scale = scale;
    this.frames = frames;
    this.timeStamp = 0;
    this.idx = 0;
  }

  draw() {
    c.drawImage(this.image, 
      this.idx * (this.image.width / this.frames),
      0, 
      this.image.width/ this.frames, 
      this.image.height,
      this.position.x, this.position.y, 
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.timeStamp += 1;
    if (this.timeStamp % 10 == 0) {
      this.idx = (this.idx + 1) % this.frames;
      console.log('idx is: ' + this.idx);
    }
  }
}