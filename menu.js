// Menu drawing functions
// Box dimensions: [X, Y, width, height]

// Draw main menu
function drawMain(b1) {
  c.fillStyle = 'grey';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = b1[4] ? 'green' : 'lightgreen';
  c.fillRect(b1[0], b1[1], b1[2], b1[3]);
  c.fillStyle = 'black';
  c.font = '40px Forte';
  c.fillText('PLAY', b1[0] + 45, b1[1] + 55);
  c.fillText('DINO BRAWL', 340, 200);
}

// Draw character selection screen
const x1 = 120;
const x2 = 540;
const bY = 280;
const bW = 40;
const bB = 12;
function drawChars(b1) {
  c.fillStyle = 'grey';
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = b1[4] ? 'green' : 'lightgreen';
  c.fillRect(b1[0], b1[1], b1[2], b1[3]);
  c.fillStyle = 'black';
  c.font = '40px Forte';
  c.fillText('NEXT', b1[0] + 35, b1[1] + 55);
  
  // Highlight selected color
  c.fillRect(x1 - bB + (bW * select1 * 2), bY - bB, 
  bW + (bB * 2), bW + (bB * 2));
  c.fillRect(x2 - bB + (bW * select2 * 2), bY - bB, 
    bW + (bB * 2), bW + (bB * 2));

  // Draw character color boxes
  c.fillStyle = 'red';
  c.fillRect(x1, bY, bW, bW);
  c.fillRect(x2, bY, bW, bW);
  c.fillStyle = 'green';
  c.fillRect(x1 + (bW * 2), bY, bW, bW);
  c.fillRect(x2 + (bW * 2), bY, bW, bW);
  c.fillStyle = 'blue';
  c.fillRect(x1 + (bW * 4), bY, bW, bW);
  c.fillRect(x2 + (bW * 4), bY, bW, bW);
  c.fillStyle = 'yellow';
  c.fillRect(x1 + (bW * 6), bY, bW, bW); 
  c.fillRect(x2 + (bW * 6), bY, bW, bW);  
}

// Draw map selection screen
function drawMaps(b1) {
  c.fillStyle = 'grey';
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = b1[4] ? 'green' : 'lightgreen';
  c.fillRect(b1[0], b1[1], b1[2], b1[3]);
  c.fillStyle = 'black';
  c.font = '40px Forte';
  c.fillText('START', b1[0] + 45, b1[1] + 55);

  // Highlight selected map
  c.fillStyle = 'black';
  c.fillRect(20 + (230 * currMap), 220, 240, 140)
}

// Draw status bars (health, timer, result)
function drawStatus(b1, b2) {
  c.fillStyle = '#E04747';
  c.fillRect(b1[0], b1[1], b1[2], b1[3]);
  c.fillRect(b2[0], b2[1], b2[2], b2[3]);
  c.fillStyle = '#FFEA35';
  c.fillRect(b1[0], b1[1], 
    b1[2] - (3.5 * (100 - p1.health)), b1[3]
  );
  c.fillRect(b2[0] + (3.5 * (100 - p2.health)), 
    b2[1], b2[2] - ( 3.5 * (100 - p2.health)), b2[3]);
  c.font = '40px Forte';
  c.fillStyle = 'black';
  c.fillText(timer.toString().padStart(2, '0'), 460, 70);
  if (gameStatus) {
    c.fillText(gameStatus, 340, 200);
  }
}