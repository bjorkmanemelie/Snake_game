export class Snake {
  constructor(startX, startY, cellSize, ctx, color = "#00FF00") {
    this.cellSize = cellSize;
    this.ctx = ctx;
    this.color = color;
    this.headColor = "#00AA00";

    this.segments = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
    ];
    // Moving right ->
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 }; //Queued direction
  }
  // Change direction, with validation to 180degrees turns
  setDirection(x, y) {
    if (x === -this.direction.x && y === -this.direction.y) {
      return;
    }
    this.nextDirection = { x, y };
  }
  // update direction before moving
  updateDirection() {
    this.direction = { ...this.nextDirection };
  }
  // Move the snake
  move() {
    this.updateDirection();

    const head = this.segments[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
    };

    // Add new head to front
    this.segments.unshift(newHead);

    // Remove tail
    this.segments.pop();
  }

  //Grow the snake (doesnt remove tail on the next move)
  grow() {
    const tail = this.segments[this.segments.length - 1];
    this.segments.push({ ...tail }); //Adding duplicate of tail
  }

  // Drawing the snake
  draw() {
    this.segments.forEach((segment, index) => {
      if (index === 0) {
        this.ctx.fillStyle = this.headColor;
      } else {
        this.ctx.fillStyle = this.color;
      }

      this.ctx.fillRect(
        segment.x * this.cellSize,
        segment.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );

      // Draw border
      this.ctx.strokeStyle = "#000";
      this.ctx.strokeRect(
        segment.x * this.cellSize,
        segment.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    });
  }

  // Head position
  getHead() {
    return this.segments[0];
  }

  // Checking if head hits a position
  checkCollision(x, y) {
    const head = this.getHead();
    return head.x === x && head.y === y;
  }

  checkSelfCollision() {
    const head = this.getHead();
    //Checking if head hits any body segment
    return this.segments
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y);
  }

  // Check if snake hits walls
  checkWallColision(gridSize) {
    const head = this.getHead();
    return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
  }

  // Reset snake to start position
  reset(startX, startY) {
    this.segments = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
  }

  getLength() {
    return this.segments.length;
  }
}
