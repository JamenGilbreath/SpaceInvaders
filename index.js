const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const screenWidth = 480;
const screenHeight = 320;

// Player variables
const playerWidth = 20;
const playerHeight = 10;
let playerX = (screenWidth - playerWidth) / 2;
const playerY = screenHeight - playerHeight - 10;

// Keyboard event listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Keyboard input variables
let rightPressed = false;
let leftPressed = false;

// Handle key down events
function keyDownHandler(event) {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = true;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

// Handle key up events
function keyUpHandler(event) {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = false;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

// Game update function
function update() {
  // Move the player
  if (rightPressed && playerX < screenWidth - playerWidth) {
    playerX += 5;
  } else if (leftPressed && playerX > 0) {
    playerX -= 5;
  }

  // Clear the canvas
  context.clearRect(0, 0, screenWidth, screenHeight);

  // Draw the player
  context.fillStyle = 'white';
  context.fillRect(playerX, playerY, playerWidth, playerHeight);

  // Request the next animation frame
  requestAnimationFrame(update);
}

// Start the game
update();