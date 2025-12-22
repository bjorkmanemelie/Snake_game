# 🐍 Snake Game - Multiplayer Edition

A modern take on the classic Snake game built with vanilla JavaScript, featuring single-player mode, localStorage scoreboard, and multiplayer capabilities.

![Snake Game](https://img.shields.io/badge/Game-Snake-green?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

## 🎯 Features

### Core Gameplay
- 🐍 Classic Snake mechanics with smooth controls
- 🍎 Random food spawning
- 💥 Collision detection (walls & self)
- 📊 Real-time score tracking
- 🚀 Progressive difficulty (speed increases every 30 points)

### User Interface
- 🎨 Retro pixel-art aesthetic with Press Start 2P font
- 🎮 Multiple control methods (keyboard & buttons)
- ⏸️ Pause/Resume functionality
- ❓ Interactive "How to Play" modal
- 📱 Responsive canvas-based rendering

### Data Persistence
- 💾 LocalStorage scoreboard
- 🏆 Top 10 high scores tracking
- 📅 Score timestamps
- 🗑️ Clear scores functionality

### Multiplayer 
- 🌐 WebSocket-based real-time multiplayer
- 🎮 Host/Join game sessions
- 👥 Two-player simultaneous gameplay
- 🔴 Visual distinction (green vs red snakes)
- 💥 Player collision detection

## 🛠️ Technologies Used

- **JavaScript ES6+** - Modern JavaScript with classes and modules
- **HTML5 Canvas** - Game rendering
- **CSS3** - Styling and animations
- **LocalStorage API** - Score persistence
- **WebSocket** - Multiplayer communication
- **Git/GitHub** - Version control

## 📁 Project Structure
```
snake_game/
├── index.html              # Main HTML file
├── style.css               # Styles and animations
├── main.js                 # Entry point and UI logic
└── src/
    ├── Game.js             # Main game controller
    ├── Snake.js            # Snake entity class
    ├── Food.js             # Food entity class
    ├── Scoreboard.js       # Score persistence logic
    ├── MultiplayerApi.js   # WebSocket API wrapper
    └── MultiplayerManager.js # Multiplayer game logic
```

## 🎮 How to Play

### Controls
- **Arrow Keys** - Move snake (↑ ↓ ← →)
- **SPACE** - Start/Pause game
- **Buttons** - Use on-screen controls

### Game Modes
1. **Single Player** - Classic Snake experience
2. **Host Multiplayer** - Create a game session
3. **Join Multiplayer** - Join with session code

### Rules
- 🍎 Eat red apples to grow and score points
- 💥 Avoid hitting walls or yourself
- 🚀 Speed increases every 30 points
- 🏆 Compete for top 10 high scores

## 🚀 Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/bjorkmanemelie/snake_game.git
cd snake_game
```

2. **Open with Live Server:**
   - Using VS Code: Right-click `index.html` → "Open with Live Server"
   - Or open `index.html` directly in a browser

3. **Play!**
   - Navigate to `http://localhost:5500` (or your local server)



### Object-Oriented Design
The game uses a class-based architecture for maintainability:

- **Game Class** - Main game loop and state management
- **Snake Class** - Entity logic (movement, growth, collision)
- **Food Class** - Spawning and rendering
- **Scoreboard Class** - Data persistence layer
- **MultiplayerManager Class** - Network synchronization


## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- ✅ JavaScript ES6+ (classes, modules, arrow functions)
- ✅ DOM manipulation and Canvas API
- ✅ Event handling and game loops
- ✅ LocalStorage and data persistence
- ✅ WebSocket real-time communication
- ✅ Git version control and GitHub workflows
- ✅ Object-Oriented Programming principles
- ✅ Code organization and architecture

---

## 🐛 Known Issues

- ⚠️ Multiplayer requires active WebSocket server
- ⚠️ Mobile touch controls not implemented
- ⚠️ No sound effects (planned feature)

## 🔮 Future Enhancements

- [ ] Mobile-responsive touch controls
- [ ] Sound effects and background music
- [ ] Multiple difficulty levels
- [ ] Power-ups and special items
- [ ] Leaderboard API integration
- [ ] Match replay system

This project was created as part of the Fullstack JavaScript course at Chas Academy.

## 🙏 Acknowledgments

- **Chas Academy** - Education and resources
- **Claude AI** - Development assistance and guidance

---

**⭐ Star this repo if you enjoyed the game!**
