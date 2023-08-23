// Number of attacks supported in queue
const ATT_COUNT = 6;
// Crouch hitbox change
const LOW_HEIGHT = 20;

class Fighter extends AnimatedSprite {
  constructor({
    size, sprites, rate, offset, scale, 
    traits, attackInfo
  }, position, keySet, attacks, id, opp, select, color) {
    super({ 
      position, size, sprites, rate, offset, scale
    });
    this.jump = traits.jump;
    this.health = traits.health;
    this.accel = traits.accel;
    this.damage = traits.damage;
    this.attackInfo = attackInfo;
    this.keySet = keySet;
    this.attacks = attacks;
    this.id = id;
    this.opp = opp;
    this.select = select;
    this.color = color;

    this.crouch = false;
    this.attIdx = 0;
    this.attacking = false;
    this.canAttack = true;
    this.velocity = { x: 0, y: 0 };
  }

  draw() {
    // Draw player tag above player
    c.font = '42px Forte';
    c.fillStyle = '#cccccc';
    c.fillText(this.id, this.position.x + 14, this.position.y - 18, 42, 42);
    c.font = '40px Forte';
    c.fillStyle = this.color;
    c.fillText(this.id, this.position.x + 15, this.position.y - 20, 40, 40);

    // Draw sprite using parent method
    super.draw();
  }

  takeHit(damage) {
    if (this.state !== 'hit') {
      this.health = Math.max(this.health - damage, 0);
      this.sprite('hit');
    }
  }
  shiftBg(x) {
    offset += x;
    offset = Math.min(offset, OFFLIM);
    offset = Math.max(offset, OFFLIM * -1);
    this.opp.position.x -= x;
    if (this.opp.position.x < OFFPAD || 
      this.opp.position.x + this.opp.width > canvas.width - OFFPAD
    ) {
      this.opp.position.x += x;
    }
  }

  update() {
    // Horizontal velocity
    if (keys[this.keySet.a] === keys[this.keySet.d]) {
      this.velocity.x = this.velocity.x / 1.2;
    } else if (keys[this.keySet.a]) {
      this.velocity.x -= this.accel / 5;
    } else if (keys[this.keySet.d]) {
      this.velocity.x += this.accel / 5;
    }
    if (this.velocity.x > this.accel * 1.5) {
      this.velocity.x = this.accel * 1.5
    } else if (this.velocity.x < this.accel * -1.5) {
      this.velocity.x = this.accel * -1.5
    }

    this.position.x += this.velocity.x;
    if (this.position.x < OFFPAD) {
      this.shiftBg(this.position.x - OFFPAD);
      this.position.x = OFFPAD;
    } else if (this.position.x + this.width > canvas.width - OFFPAD) {
      this.shiftBg(this.position.x + this.width - canvas.width + OFFPAD);
      this.position.x = canvas.width - OFFPAD - this.width;
    } else if (collide(this, this.opp)) {
      this.position.x -= this.velocity.x;
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
      if (collide(this, this.opp)) {
        this.position.y -= this.velocity.y;
        this.velocity.y = 0;
        if (collide(this, this.opp)) {
          this.position.y -= LOW_HEIGHT;
        }
      }
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
      this.attacks[this.attIdx].setSprites(
        attSprites[this.select + (this.flip ? 4 : 0)]
      ),
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
    super.animate();
    this.draw();
  }
}