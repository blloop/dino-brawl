// Number of attacks supported in queue
const ATT_COUNT = 6;
// Crouch hitbox change
const LOW_HEIGHT = 20;

class Fighter extends AnimatedSprite {
  constructor({
    position, size, sprites, rate, offset, scale, 
    traits, attackInfo, keySet, flip
  }, attacks) {
    super({ 
      position, size, sprites, rate, offset, scale
    });
    this.jump = traits.jump;
    this.health = traits.health;
    this.accel = traits.accel;
    this.damage = traits.damage;
    this.attackInfo = attackInfo;
    this.keySet = keySet;
    this.flip = flip;
    this.attacks = attacks;
    this.crouch = false;

    this.attIdx = 0;
    this.attacking = false;
    this.canAttack = true;
    this.velocity = { x: 0, y: 0 };
  }

  takeHit(damage) {
    if (this.state !== 'hit') {
      this.health = Math.max(this.health - damage, 0);
      this.sprite('hit');
    }
  }

  update() {
    // Horizontal velocity
    if (keys[this.keySet.a] === keys[this.keySet.d]) {
      this.velocity.x = this.velocity.x / 1.2;
    }
    if (keys[this.keySet.a]) {
      this.velocity.x -= this.accel / 5;
    }
    if (keys[this.keySet.d]) {
      this.velocity.x += this.accel / 5;
    }
    if (this.velocity.x > this.accel * 1.5) {
      this.velocity.x = this.accel * 1.5
    }
    if (this.velocity.x < this.accel * -1.5) {
      this.velocity.x = this.accel * -1.5
    }
    let newPos = this.position.x + this.velocity.x;
    if (newPos > OFFPAD && newPos + this.width < canvas.width - OFFPAD) {
      this.position.x = newPos;
    } else if (this.velocity.x != 0){
      shiftBg(this.velocity.x, !this.flip);
    }

    // Vertical velocity
    if (this.position.y + this.height + 
      this.velocity.y >= canvas.height * 0.8) 
    {
      if (keys[this.keySet.w]) {
        this.velocity.y = -2 * this.jump;
      } else {
        this.velocity.y = 0;
      }
    } else {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
    }
    // Crouching mechanic
    if (this.crouch && !keys[this.keySet.s]) {
      this.position.y -= LOW_HEIGHT;
      this.height += LOW_HEIGHT;
      this.offset.y -= LOW_HEIGHT / this.scale;
      this.crouch = false;
    }
    if (!this.crouch && keys[this.keySet.s]) {
      this.position.y += LOW_HEIGHT;
      this.height -= LOW_HEIGHT;
      this.offset.y += LOW_HEIGHT / this.scale;
      this.crouch = true;
    }
    // Attack data
    if (keys[this.keySet.atk] && this.canAttack) {
      this.attacks[this.attIdx] = new Attack({
        position: { 
          x: this.position.x + (this.flip ? 
            this.attackInfo.size.width * -1 :
            this.width
          ),
          y: this.position.y 
        },
        size: { 
          width: this.attackInfo.size.width,
          height: this.attackInfo.size.height
        }, 
        sprites: this.attackInfo.sprites,
        rate: this.attackInfo.rate,
        offset: this.attackInfo.offset,
        scale: this.attackInfo.scale,
        speed: this.attackInfo.speed,
        flip: this.flip,
        list: this.attacks,
        attIdx: this.attIdx,
        duration: 30 * this.attackInfo.duration
      });
      this.attacks[this.attIdx].create();
      this.attIdx = (this.attIdx + 1) % ATT_COUNT;
      this.attacking = true;
      this.canAttack = false;
      setTimeout(() => this.attacking = false, 100);
      setTimeout(() => this.canAttack = true, 
        (50 * this.attackInfo.cooldown) + 100
      );
    }
    // Choose sprite based on state
    if (this.state === 'hit') {
      this.sprite('hit');
      if (this.idx === this.sprites.hit[1]) {
        this.sprite('idle');
      }
    } else if (this.attacking) {
      this.sprite(keys[this.keySet.s] ? 'lowatt' : 'attack');
    } else if (this.velocity.y < 0) {
      this.sprite('jump');
    } else if (keys[this.keySet.a] || keys[this.keySet.d]) {
      this.sprite(keys[this.keySet.s] ? 'lowrun' : 'run');
    } else {
      this.sprite(keys[this.keySet.s] ? 'crouch' : 'idle');
    }
    super.update();
  }
}