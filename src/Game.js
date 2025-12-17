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
    this.baseTickRate = 200;
    this.speedIncreaseInterval = 30;
    this.minTickRate = 50;
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

    // Help button
    document.getElementById("help-btn").addEventListener("click", () => {
      this.showHelp();
    });

    const modal = document.getElementById("help-modal");
    const closeBtn = document.querySelector(".close");

    closeBtn.addEventListener("click", () => {
      this.hideHelp();
    });

    // Close if clicking outside modal
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.hideHelp();
      }
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
    this.tickRate = this.baseTickRate; // Reset speed

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Reset game objects
    this.snake.reset(12, 12);
    this.food = new Food(this.gridSize, this.cellSize, this.ctx); // Skapa nytt Food-objekt

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

    // Check food collisionss
    const head = this.snake.getHead();
    if (this.food.checkCollision(head)) {
      this.handleFoodEaten();
    }
  }

  // When snake eats food
  handleFoodEaten() {
    const oldScore = this.score;
    this.score += 10;
    this.snake.grow();
    this.updateUI();

    // Spawn extra apple when user hits 100p
    if (this.score === 100) {
      this.food.spawn();
      console.log("🎉 100 POÄNG! Extra äppel spawnat!");
    }

    // Check if we should increase speed
    const oldLevel = Math.floor(oldScore / this.speedIncreaseInterval);
    const newLevel = Math.floor(this.score / this.speedIncreaseInterval);

    if (newLevel > oldLevel) {
      this.increaseSpeed();
    }

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

  // Increase game speed
  increaseSpeed() {
    if (this.tickRate > this.minTickRate) {
      this.tickRate = Math.max(this.minTickRate, this.tickRate - 20);
      console.log(`🚀 SPEED UP! New tick rate: ${this.tickRate}ms`);
    }
  }

  // Show help box
  showHelp() {
    const modal = document.getElementById("help-modal");
    modal.style.display = "block";

    // Pause game if running
    if (this.isRunning) {
      this.pause();
    }
  }

  // Hide help box
  hideHelp() {
    const modal = document.getElementById("help-modal");
    modal.style.display = "none";
  }
}
