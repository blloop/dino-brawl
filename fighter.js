class Fighter extends AnimatedSprite {
  constructor({
    position, velocity, traits, faceLeft, keySet,
    size, source, offset, scale, frames
  }) {
    super({ 
      position, size, source, offset, scale, frames 
    });
    this.velocity = velocity;
    this.traits = traits;
    this.health = traits.health;
    this.faceLeft = faceLeft;
    this.keySet = keySet;
    this.canAttack = true;
    this.attacking = false;
    this.attack = {
      x: this.position.x,
      y: this.position.y,
      width: 100,
      height: 50
    };
    this.timeStamp = 0;
    this.idx = 0;
  }

  // draw() {
  //   c.fillStyle = (this.faceLeft ? 'skyblue' : 'pink');
  //   c.fillRect(
  //     this.position.x, this.position.y, 
  //     this.width, this.height
  //   );
  //   if (this.attacking) {
  //     c.fillStyle = 'yellow';
  //     c.fillRect(
  //       this.attack.x + (this.faceLeft ? 
  //         this.width - this.attack.width : 0
  //       ), 
  //       this.attack.y, 
  //       this.attack.width, this.attack.height
  //     );
  //   }
  // }

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
      this.velocity.y >= canvas.height - 20) 
    {
      if (this.keySet.w.pressed) {
        this.velocity.y = -2.5 * this.traits.jump;
      } else {
        this.velocity.y = 0;
      }
    } else {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
    }
    // Attack data
    if (this.keySet.atk.pressed && this.canAttack) {
      this.attacking = true;
      this.canAttack = false;
      setTimeout(() => this.attacking = false, 200);
      setTimeout(() => this.canAttack = true, 1000);
    }
    this.attack.x = this.position.x + (this.faceLeft && -50),
    this.attack.y = this.position.y;
    this.draw();  
  }
}