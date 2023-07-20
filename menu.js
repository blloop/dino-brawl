// Menu drawing functions
// Box dimensions: [X, Y, width, height]

// Draw main menu
function drawMain(b1) {
  c.fillStyle = 'grey';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = b1[4] ? 'green' : 'lightgreen';
  c.fillRect(b1[0], b1[1], b1[2], b1[3]);
  c.fillStyle = 'black';
  c.font = '40px Verdana';
  c.fillText('PLAY', b1[0] + 45, b1[1] + 55);
  c.fillText('DINO BRAWL', 340, 200);
}

// Draw character selection screen
function drawSelect() {
  return;
}

// Draw status bars (health, timer, result)
function drawStatus(b1, b2, b3) {
  c.fillStyle = 'red';
  c.fillRect(b1[0], b1[1], b1[2], b1[3]);
  c.fillRect(b2[0], b2[1], b2[2], b2[3]);
  c.fillStyle = 'green';
  c.fillRect(b3[0], b3[1], b3[2], b3[3]);
  if (gameStatus) {
    c.fillRect(320, 145, 320, 80);
  }
  c.fillStyle = 'yellow';
  c.fillRect(b1[0] + (4 * (100 - p1.health)), b1[1], 
    b1[2] - (4 * (100 - p1.health)), b1[3]
  );
  c.fillRect(b2[0], b2[1], b2[2] - ( 4 * (100 - p2.health)), b2[3]);
  c.font = '40px Verdana';
  c.fillStyle = 'white';
  c.fillText(timer.toString().padStart(2, '0'), 455, 75);
  if (gameStatus) {
    c.fillText(gameStatus, 340, 200);
  }
}