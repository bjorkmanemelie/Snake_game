export class Food {
  constructor(gridSize, cellSize, ctx) {
    this.gridSize = gridSize;
    this.cellSize = cellSize;
    this.ctx = ctx;
    this.positions = []; // Array for more than 1 apple
    this.spawn();
  }

  spawn() {
    const newPosition = {
      x: Math.floor(Math.random() * this.gridSize),
      y: Math.floor(Math.random() * this.gridSize),
    };
    this.positions.push(newPosition);
    console.log(`🍎 Apple spawned at x:${newPosition.x}, y:${newPosition.y}`);
  }

  draw() {
    this.ctx.font = `${this.cellSize * 0.8}px Arial`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // Draws apple
    this.positions.forEach((pos) => {
      this.ctx.fillText(
        "🍎",
        pos.x * this.cellSize + this.cellSize / 2,
        pos.y * this.cellSize + this.cellSize / 2
      );
    });
  }

  // Check if snake ate an apple.
  checkCollision(snakeHead) {
    const index = this.positions.findIndex(
      (pos) => pos.x === snakeHead.x && pos.y === snakeHead.y
    );

    if (index !== -1) {
      this.positions.splice(index, 1);
      this.spawn();
      return true;
    }
    return false;
  }

  getPositions() {
    return this.positions;
  }
}
