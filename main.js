import { Game } from "./src/Game.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(canvas, 25, 20);

  // UI elements
  const multiplayerMenu = document.getElementById("multiplayer-menu");
  const buttonContainer = document.getElementById("button-container");
  const sessionInfo = document.getElementById("session-info");
  const sessionCodeDisplay = document.getElementById("session-code");

  // Buttons
  const singleplayerBtn = document.getElementById("singleplayer-btn");
  const hostBtn = document.getElementById("host-btn");
  const joinBtn = document.getElementById("join-btn");
  const leaveBtn = document.getElementById("leave-btn");

  // Inputs
  const sessionInput = document.getElementById("session-input");
  const playerNameInput = document.getElementById("player-name-input");

  if (!singleplayerBtn || !hostBtn || !joinBtn) {
    console.error("❌ Missing buttons in HTML!");
    return;
  }

  // Single player mode
  singleplayerBtn.addEventListener("click", () => {
    multiplayerMenu.style.display = "none";
    canvas.style.display = "block";
    buttonContainer.style.display = "flex";
    game.init();
  });

  // Host multiplayer game
  hostBtn.addEventListener("click", async () => {
    try {
      hostBtn.disabled = true;
      hostBtn.textContent = "Creating...";

      const sessionId = await game.hostMultiplayerGame();

      // Show session code
      sessionCodeDisplay.textContent = sessionId;
      sessionInfo.style.display = "block";
      multiplayerMenu.querySelector("h2").style.display = "none";
      singleplayerBtn.style.display = "none";
      hostBtn.style.display = "none";
      document.getElementById("join-section").style.display = "none";

      // Show game
      canvas.style.display = "block";
      buttonContainer.style.display = "flex";
      leaveBtn.style.display = "inline-block";

      game.init();

      console.log(`Session created: ${sessionId}`);
      console.log("Share this code with your opponent!");
    } catch (error) {
      console.error("Error hosting:", error);
      alert("Failed to host game. Try again!");
      hostBtn.disabled = false;
      hostBtn.textContent = "HOST MULTIPLAYER";
    }
  });

  // Join multiplayer game
  joinBtn.addEventListener("click", async () => {
    const sessionId = sessionInput.value.trim().toUpperCase();
    const playerName = playerNameInput.value.trim() || "Player";

    if (!sessionId) {
      alert("Please enter a session code!");
      return;
    }

    try {
      joinBtn.disabled = true;
      joinBtn.textContent = "Joining...";

      await game.joinMultiplayerGame(sessionId, playerName);

      // Hide menu, show game
      multiplayerMenu.style.display = "none";
      canvas.style.display = "block";
      buttonContainer.style.display = "flex";
      leaveBtn.style.display = "inline-block";

      game.init();

      console.log(`✅ Joined session: ${sessionId}`);
    } catch (error) {
      console.error("Error joining:", error);
      alert("Failed to join game. Check the session code!");
      joinBtn.disabled = false;
      joinBtn.textContent = "JOIN GAME";
    }
  });

  // Leave multiplayer game
  leaveBtn.addEventListener("click", () => {
    if (confirm("Leave the game?")) {
      game.leaveMultiplayerGame();

      // Reset buttons
      hostBtn.disabled = false;
      hostBtn.textContent = "HOST MULTIPLAYER";
      joinBtn.disabled = false;
      joinBtn.textContent = "JOIN GAME";
      sessionInput.value = "";

      // Reset menu visibility
      multiplayerMenu.querySelector("h2").style.display = "block";
      singleplayerBtn.style.display = "block";
      hostBtn.style.display = "block";
      document.getElementById("join-section").style.display = "block";
    }
  });

  console.log("Snake Game loaded!");
  console.log("Multiplayer server: wss://mpai.se/net");
});
