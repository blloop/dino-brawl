class Fighter extends AnimatedSprite {
  constructor({
    position, size, sprites, offset, scale, 
    velocity, traits, attackInfo, keySet, flip
  }) {
    super({ 
      position, size, sprites, offset, scale
    });
    this.velocity = velocity;
    this.traits = traits;
    this.attackInfo = attackInfo;
    this.keySet = keySet;
    this.flip = flip;
    this.health = traits.health;
    this.canAttack = true;
    this.attack = null;
  }

  takeHit() {
    this.health = Math.max(this.health - 1, 0);
    this.sprite('hit');
  }

  update() {
    // Horizontal velocity
    if (this.keySet.a.pressed === this.keySet.d.pressed) {
      this.velocity.x = this.velocity.x / 1.2;
    }
    if (this.keySet.a.pressed) {
      this.velocity.x -= this.traits.accel / 5;
    }
    if (this.keySet.d.pressed) {
      this.velocity.x += this.traits.accel / 5;
    }
    if (this.velocity.x > this.traits.accel * 1.5) {
      this.velocity.x = this.traits.accel * 1.5
    }
    if (this.velocity.x < this.traits.accel * -1.5) {
      this.velocity.x = this.traits.accel * -1.5
    }
    this.position.x += this.velocity.x;
    // Vertical velocity
    if (this.position.y + this.height + 
      this.velocity.y >= canvas.height * 0.8) 
    {
      if (this.keySet.w.pressed) {
        this.velocity.y = -2 * this.traits.jump;
      } else {
        this.velocity.y = 0;
      }
    } else {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
    }
    // Attack data
    if (this.keySet.atk.pressed && this.canAttack) {
      console.log('making attack!');
      this.attack = new Attack({
        position: { 
          x: this.position.x + 
            (this.width * (this.flip ? -1 : 1)),
          y: this.position.y 
        },
        size: { 
          width: this.attackInfo.size.width,
          height: this.attackInfo.size.height
        }, 
        sprites: this.attackInfo.sprites,
        offset: this.attackInfo.offset,
        scale: this.attackInfo.scale,
        damage: this.attackInfo.damage,
        speed: this.attackInfo.speed,
        flip: this.flip
      });
      this.canAttack = false;
      setTimeout(() => this.canAttack = true, 650);
      setTimeout(() => this.attack = null, 100);
    }
    // Choose sprite based on state
    if (this.state === 'hit') {
      this.sprite('hit');
      if (this.idx === this.sprites.hit[1]) {
        this.sprite('idle');
      }
    } else if (!this.canAttack) {
      this.sprite('attack');
    } else if (this.velocity.y < 0) {
      this.sprite('jump');
    } else if (this.keySet.a.pressed || this.keySet.d.pressed) {
      this.sprite(this.keySet.s.pressed ? 'lowrun' : 'run');
    } else {
      this.sprite(this.keySet.s.pressed ? 'crouch' : 'idle');
    }
    if (this.attack) this.attack.update();
    super.update();
  }
}