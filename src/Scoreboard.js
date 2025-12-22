export class Scoreboard {
  constructor() {
    this.storageKey = "snake-highscores";
    this.maxEntries = 10;
  }

  // Get all scores from localStorage
  getScores() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading scores:", error);
      return [];
    }
  }

  // Save score to localStorage
  saveScore(playerName, score) {
    const scores = this.getScores();

    const newEntry = {
      name: playerName || "Anonymous",
      score: score,
      date: new Date().toISOString(),
      timestamp: Date.now(),
    };

    scores.push(newEntry);

    // Sort by score (highest first)
    scores.sort((a, b) => b.score - a.score);

    // Keep only top 10
    const topScores = scores.slice(0, this.maxEntries);

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(topScores));
      console.log("Score saved!", newEntry);
      return true;
    } catch (error) {
      console.error("Error saving score:", error);
      return false;
    }
  }

  // Check if score qualifies for top 10
  isHighScore(score) {
    const scores = this.getScores();
    if (scores.length < this.maxEntries) return true;
    return score > scores[scores.length - 1].score;
  }

  // Clear all scores
  clearScores() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log("All scores cleared!");
      return true;
    } catch (error) {
      console.error("Error clearing scores:", error);
      return false;
    }
  }

  // Render scoreboard to HTML
  renderScoreboard(containerId) {
    const container = document.getElementById(containerId);
    const scores = this.getScores();

    if (scores.length === 0) {
      container.innerHTML =
        '<p style="text-align: center; color: #4CAF50;">No scores yet! Play to set a record!</p>';
      return;
    }

    let html = "";
    scores.forEach((entry, index) => {
      const rank = index + 1;
      const topClass = rank <= 3 ? "top-3" : "";
      const medal =
        rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";
      const date = new Date(entry.date).toLocaleDateString();

      html += `
        <div class="score-entry ${topClass}">
          <span class="score-rank">${medal} #${rank}</span>
          <span class="score-name">${entry.name}</span>
          <span class="score-points">${entry.score} pts</span>
          <span class="score-date">${date}</span>
        </div>
      `;
    });

    container.innerHTML = html;
  }
}
