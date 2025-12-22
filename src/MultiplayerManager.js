import { MultiplayerApi } from "./MultiplayerAPI.js";

export class MultiplayerManager {
  constructor(game) {
    this.game = game;
    this.api = new MultiplayerApi("wss://mpai.se/net");
    this.sessionId = null;
    this.clientId = null;
    this.isHost = false;
    this.opponentSnake = null;
    this.opponentData = null;
    this.unsubscribe = null;

    this.setupListeners();
  }

  setupListeners() {
    this.unsubscribe = this.api.listen((event, messageId, clientId, data) => {
      console.log(`📡 Multiplayer event: ${event}`, {
        messageId,
        clientId,
        data,
      });

      if (event === "joined") {
        console.log("Opponent joined!");
        this.game.onOpponentJoined();
      }

      if (event === "game") {
        this.handleGameData(clientId, data);
      }

      if (event === "leaved") {
        console.log("Opponent left!");
        this.handleOpponentLeft();
      }
    });
  }

  async hostGame() {
    try {
      const result = await this.api.host();
      this.sessionId = result.session;
      this.clientId = result.clientId;
      this.isHost = true;

      console.log(`🎮 Hosting session: ${this.sessionId}`);
      return this.sessionId;
    } catch (error) {
      console.error("Error hosting:", error);
      throw error;
    }
  }

  async joinGame(sessionId, playerName) {
    try {
      const result = await this.api.join(sessionId, { name: playerName });
      this.sessionId = result.session;
      this.clientId = result.clientId;
      this.isHost = false;

      console.log(`Joined session: ${this.sessionId}`);
      return this.sessionId;
    } catch (error) {
      console.error("Error joining:", error);
      throw error;
    }
  }

  sendGameState() {
    if (!this.sessionId) return;

    const head = this.game.snake.getHead();
    const data = {
      snake: {
        segments: this.game.snake.segments,
        direction: this.game.snake.direction,
      },
      score: this.game.score,
      isAlive: this.game.isRunning,
    };

    this.api.game(data);
  }

  handleGameData(clientId, data) {
    // Don't process our own data
    if (clientId === this.clientId) return;

    // Store opponent's data
    this.opponentData = data;
    this.opponentSnake = data.snake;
  }

  handleOpponentLeft() {
    this.opponentSnake = null;
    this.opponentData = null;
    alert("Opponent left the game!");
    this.game.leaveMultiplayerGame();
  }

  leaveGame() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.sessionId = null;
    this.clientId = null;
    this.opponentSnake = null;
    this.opponentData = null;
    this.isHost = false;
  }

  drawOpponentSnake(ctx, cellSize) {
    if (!this.opponentSnake || !this.opponentSnake.segments) return;

    this.opponentSnake.segments.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = "#AA0000"; // Dark red head
      } else {
        ctx.fillStyle = "#FF0000"; // Red body
      }

      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );

      ctx.strokeStyle = "#000";
      ctx.strokeRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );
    });
  }

  checkCollisionWithOpponent(head) {
    if (!this.opponentSnake || !this.opponentSnake.segments) return false;

    return this.opponentSnake.segments.some(
      (segment) => segment.x === head.x && segment.y === head.y
    );
  }
}
