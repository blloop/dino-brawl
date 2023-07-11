class Attack extends AnimatedSprite {
  constructor({
    position, size, sprites, rate, offset, scale,
    damage, speed, flip
  }) {
    super({ 
      position, size, sprites, rate, flip, offset, scale
    });
    this.damage = damage;
    this.speed = speed;
  }

  update() {
    this.position.x += this.speed * (this.flip ? -1 : 1);
    super.update();
  }
}