class Sprite {
  constructor({ position, width, height, source }) {
    this.position = position;
    this.width = width;
    this.height = height;
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