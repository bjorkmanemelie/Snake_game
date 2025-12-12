const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 20;
const GRID_SIZE = 25;

// Where the snake starts
let snake = [
  { x: 12, y: 12 },
  { x: 11, y: 12 },
];

// Direction the snake is moving -> right
let direction = {
  x: 1,
  y: 0,
};

let isGameRunning = false;

let food = {
  x: 18,
  y: 10,
};

// Draw the snake
function drawSnake() {
  snake.forEach((segment, index) => {
    if (index === 0) {
      ctx.fillStyle = "#00AA00"; //snakes head darker than body.
    } else {
      ctx.fillStyle = "#00FF00";
    }

    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // Draw border around each segment
    ctx.strokeStyle = "#000";
    ctx.strokeRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });
}

//draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function spawnFood() {
  food.x = Math.floor(Math.random() * GRID_SIZE); // random a nr 0-1, * with 25, rundar ner till heltal.
  food.y = Math.floor(Math.random() * GRID_SIZE);
  console.log(`New apple at x:${food.x}, y:${food.y} 🍎`);
}

// Update snake position
function update() {
  // Calculate new head position
  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };

  // Check if snake hits wall
  if (
    newHead.x < 0 ||
    newHead.x >= GRID_SIZE ||
    newHead.y < 0 ||
    newHead.y >= GRID_SIZE
  ) {
    // Reset snake
    snake = [
      { x: 12, y: 12 },
      { x: 11, y: 12 },
    ];
    direction = { x: 1, y: 0 };
    console.log("BOOM! The snake hit the wall!");
    return; // Stop updating for this tick
  }

  const hitSelf = snake.some(
    // Loops through all segment checks if any segment has same position as head. Return true/false.
    (segment) => segment.x === newHead.x && segment.y === newHead.y
  );

  if (hitSelf) {
    snake = [
      { x: 12, y: 12 },
      { x: 11, y: 12 },
    ];
    direction = { x: 1, y: 0 };
    console.log("Ooops! Snake bit itself!💥");
  }

  // Add new head to the front of the Array
  snake.unshift(newHead);

  // Check if snake eats food
  if (newHead.x === food.x && newHead.y === food.y) {
    console.log("YUM! Snake ate the apple! 🍎");
    console.log(`Snake length: ${snake.length}`);
    spawnFood();
    // Don't remove tail = snake grows!
  } else {
    // Remove tail = snake moves without growing
    snake.pop();
  }
}

// Update UI text
function updateUI() {
  const scoreElement = document.getElementById("score");
  if (isGameRunning) {
    scoreElement.textContent = "Points: 0 | ▶️ PLAYING";
  } else {
    scoreElement.textContent = "Points: 0 | ⏸️ PAUSED";
  }
}

// Main game loop
function gameLoop() {
  if (!isGameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawFood(); // Draw the apple first
  drawSnake(); // Draw snake ON the snake. Last one that draws go upon other ones.

  setTimeout(gameLoop, 200);
}

// Keyboard controls
document.addEventListener("keydown", (e) => {
  // SPACE = Start/Pause toggle
  if (e.code === "Space") {
    isGameRunning = !isGameRunning;
    updateUI();

    if (isGameRunning) {
      console.log("Game STARTED ▶️");
      gameLoop();
    } else {
      console.log("Game PAUSED ⏸️");
    }
  }

  // Ignore arrow keys if game is paused
  if (!isGameRunning) return;

  // Arrow key controls
  if (e.code === "ArrowUp" && direction.y === 0) {
    direction.x = 0;
    direction.y = -1;
    console.log("Going UP ⬆️");
  }

  if (e.code === "ArrowDown" && direction.y === 0) {
    direction.x = 0;
    direction.y = 1;
    console.log("Going DOWN ⬇️");
  }

  if (e.code === "ArrowLeft" && direction.x === 0) {
    direction.x = -1;
    direction.y = 0;
    console.log("Going LEFT ⬅️");
  }

  if (e.code === "ArrowRight" && direction.x === 0) {
    direction.x = 1;
    direction.y = 0;
    console.log("Going RIGHT ➡️");
  }
});

// Initialize game
drawSnake();
drawFood();
updateUI();
console.log("Press SPACE to start!");
