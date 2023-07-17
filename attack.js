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