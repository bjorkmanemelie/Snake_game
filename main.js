const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 20; //varje ruta på spelplanen är 20x20px, snake moves one square at time.
const GRID_SIZE = 25; //25x25 squares

// Creating a square for testing
ctx.fillStyle = "green";
ctx.fillRect(10 * CELL_SIZE, 10 * CELL_SIZE, CELL_SIZE, CELL_SIZE); //Creating a new square. Position 10 is 200px from left.

console.log("Game has started");
