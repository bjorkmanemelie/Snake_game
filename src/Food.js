export class Food {
  constructor(gridSize, cellSize, ctx) {
    this.gridSize = gridSize;
    this.cellSize = cellSize;
    this.ctx = ctx;
    this.position = { x: 0, y: 0 };
    this.spawn();
  }

  spawn() {
    this.position.x = Math.floor(Math.random() * this.gridSize);
    this.position.y = Math.floor(Math.random() * this.gridSize);
    console.log(`Apple spwaned at x:${this.position.x}, y:${this.position.y}`);
  }

  draw() {
    this.ctx.fillstyle = "red";
    this.ctx.fillRect(
      this.position.x * this.cellSize,
      this.position.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
  get position() {
    return this.position;
  }
}
