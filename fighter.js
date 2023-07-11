class Fighter extends AnimatedSprite {
  constructor({
    position, velocity, traits, flip, keySet,
    size, sprites, offset, scale
  }) {
    super({ 
      position, size, sprites, flip, offset, scale
    });
    this.velocity = velocity;
    this.traits = traits;
    this.health = traits.health;
    this.keySet = keySet;
    this.canAttack = true;
    this.attacking = false;
    this.attack = {
      x: this.position.x,
      y: this.position.y,
      width: 150,
      height: 50
    };
  }
  
  draw() {
    super.draw();
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    if (this.attacking) {
      c.fillStyle = 'yellow';
      c.fillRect(
        this.attack.x, this.attack.y, 
        this.attack.width, this.attack.height
      );
    }
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
      this.attack.x = this.position.x + (this.flip && -50);
      this.attack.y = this.position.y;
      this.attacking = true;
      this.canAttack = false;
      setTimeout(() => this.attacking = false, 100);
      setTimeout(() => this.canAttack = true, 1000);
    }
    // Choose sprite based on state
    if (this.state === 'hit') {
      this.sprite('hit');
      if (this.idx === this.sprites.hit[1]) {
        this.sprite('idle');
      }
    } else if (this.velocity.y < 0) {
      this.sprite('jump');
    } else if (this.keySet.a.pressed || this.keySet.d.pressed) {
      this.sprite(this.keySet.s.pressed ? 'lowrun' : 'run');
    } else {
      this.sprite(this.keySet.s.pressed ? 'crouch' : 'idle');
    }
    this.animate();
    this.draw();
  }
}