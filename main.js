import { Game } from "./src/Game.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas, 25, 20);
  game.init();

  console.log("Snake game loaded!");
});
