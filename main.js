const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 20; //varje ruta på spelplanen är 20x20px, snake moves one square at time.
const GRID_SIZE = 25; //25x25 squares

const restartBtn = document.getElementById("restart");
//Where the snake starts.
let snake = {
  x: 12, //column 12
  y: 12, // Line 12
};

// Direction the snake is moving -> right
let direction = {
  x: 1, // +1 = right, -1 = left => 0 no movement.
  y: 0, // +1 = down, -1 = up => 0 no movement.
};

function drawSnake() {
  ctx.fillStyle = "green";
  ctx.fillRect(snake.x * CELL_SIZE, snake.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function update() {
  // Update snake position based on direction
  snake.x += direction.x;
  snake.y += direction.y;

  // Checkout if the snake goes outside the board
  if (
    snake.x < 0 ||
    snake.x >= GRID_SIZE ||
    snake.y < 0 ||
    snake.y >= GRID_SIZE
  ) {
    snake.x = 12;
    snake.y = 12;
    console.log("BOOM! The snake hit the wall!");
  }
}
let isGameRunning = false;

// Main game loop
function gameLoop() {
  if (!isGameRunning) return; // Stops if its not running

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  update(); // Update snake position
  drawSnake(); // Draw the snake

  setTimeout(gameLoop, 200); // Call gameLoop every 200ms and go to next one.
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !isGameRunning) {
    isGameRunning = true;
    console.log("Game started with SPACE!");
    gameLoop();
  }
});

restartBtn.onclick = () => {
  game.stop();
  input.stop();
  startGame();
};

drawSnake();
console.log("Press SPACE to start!");

console.log("Game started");
