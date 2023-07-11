class Attack extends AnimatedSprite {
  constructor({
    position, size, sprites, offset, scale,
    damage, speed, flip
  }) {
    super({ 
      position, size, sprites, flip, offset, scale
    });
    this.damage = damage;
    this.speed = speed;
  }

  update() {
    this.position.x += this.speed * (this.flip ? -1 : 1);
    super.update();
  }
}