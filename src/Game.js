import { Snake } from "./Snake.js";
import { Food } from "./Food.js";

export class Game {
  constructor(canvas, gridSize = 25, cellSize = 20) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.gridSize = gridSize;
    this.cellSize = cellSize;

    // Game state

    this.isRunning = false;
    this.score = 0;
    this.tickRate = 200; //seconds between updates
    this.gameLoopId = null;

    // Game objects
    this.snake = new Snake(12, 12, this.cellSize, this.ctx);
    this.food = new Food(this.gridSize, this.cellSize, this.ctx);

    this.scoreElement = document.getElementById("score");

    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.setupControls();
  }

  setupControls() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.getElementById("start-btn").addEventListener("click", () => {
      this.start();
    });
    document.getElementById("restart-btn").addEventListener("click", () => {
      this.reset();
    });
  }

  handleKeyPress(e) {
    if (e.code === "Space") {
      if (!this.isRunning) {
        this.start();
      } else {
        this.pause();
      }
      return;
    }

    // Ignore arrow keys if game is paused
    if (!this.isRunning) return;

    switch (e.code) {
      case "ArrowUp":
        this.snake.setDirection(0, -1);
        break;
      case "ArrowDown":
        this.snake.setDirection(0, 1);
        break;
      case "ArrowLeft":
        this.snake.setDirection(-1, 0);
        break;
      case "ArrowRight":
        this.snake.setDirection(1, 0);
        break;
    }
  }

  // Start the Game
  start() {
    if (this.isRunning) return; // If already running

    this.isRunning = true;
    this.updateUI();
    console.log("GAME STARTED");
    this.gameLoop();
  }

  pause() {
    this.isRunning = false;
    this.updateUI();
    console.log("Game PAUSED");
  }

  reset() {
    this.isRunning = false;
    this.score = 0;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Reset game objects
    this.snake.reset(12, 12);
    this.food.spawn();

    this.draw();
    this.updateUI();

    console.log(" GAME RESET");
  }

  // Main game loop
  gameLoop() {
    if (!this.isRunning) return;

    this.update();
    this.draw();
    this.gameLoopId = setTimeout(() => this.gameLoop(), this.tickRate);
  }

  update() {
    this.snake.move();

    if (this.snake.checkWallCollision(this.gridSize)) {
      this.handleDeath("BOOM! Snake hit the wall!");
      return;
    }

    if (this.snake.checkSelfCollision()) {
      this.handleDeath("Oooouh, Snake bit itself!");
      return;
    }

    // Check food collision
    const head = this.snake.getHead();
    const foodPos = this.food.getPosition();

    if (head.x === foodPos.x && head.y === foodPos.y) {
      this.handleFoodEaten();
    }
  }

  // When snake eats food
  handleFoodEaten() {
    this.score += 10;
    this.snake.grow();
    this.food.spawn();
    this.updateUI();

    console.log(
      `YUM! 🍎 | Length: ${this.snake.getLength()} | Score: ${this.score}`
    );
  }

  // Happenes when snake dies
  handleDeath(message) {
    console.log(message);
    this.reset();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.food.draw();
    this.snake.draw();
  }

  updateUI() {
    if (this.isRunning) {
      this.scoreElement.textContent = `Points: ${this.score} | PLAYING`;
    } else {
      this.scoreElement.textContent = `Points: ${this.score} | PAUSED`;
    }
  }

  init() {
    this.draw();
    this.updateUI();
    console.log("Press SPACE or START to begin!");
  }

  // Cleanup - destroy the game
  destroy() {
    this.isRunning = false;
    if (this.gameLoopId) {
      clearTimeout(this.gameLoopId);
    }
    document.removeEventListener("keydown", this.handleKeyPress);
  }
}
