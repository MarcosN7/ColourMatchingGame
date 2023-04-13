// JavaScript code for Color Matcher Game

// Game variables
let score = 0;
let attempts = 0;
let gameOver = false;
let targetColor = '';

// DOM elements
const gameBoard = document.querySelector('.game-board');
const targetColorElement = document.getElementById('target-color');
const guessResultElement = document.getElementById('guess-result');
const scoreElement = document.getElementById('score');
const attemptsElement = document.getElementById('attempts');

// Available colors
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];

// Game start
window.onload = () => {
    createGameTiles();
    updateGameInfo();
    chooseTargetColor();
};

// Choose target color
let previousTargetColor = '';
function chooseTargetColor() {
    let newTargetColor = previousTargetColor;
    while (newTargetColor === previousTargetColor) {
        newTargetColor = colors[Math.floor(Math.random() * colors.length)];
    }
    targetColor = newTargetColor;
    previousTargetColor = newTargetColor;
    updateTargetColor();
}

// Update target color message
function updateTargetColor() {
    targetColorElement.textContent = `Find: ${targetColor}`;
}

// Create game tiles
function createGameTiles() {
    for (let i = 0; i < colors.length; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.backgroundColor = colors[i];
        tile.addEventListener('click', onTileClick);
        tile.addEventListener('touchstart', onTileClick); // Touch event listener for mobile devices
        gameBoard.appendChild(tile);
    }
}

// Handle tile click event
function onTileClick(event) {
    if (gameOver) return; // If game over, do not allow tile click
    const selectedColor = event.target.style.backgroundColor;
    if (selectedColor === targetColor) {
        score++;
        updateGameInfo();
        if (score === 5) {
            endGame('You won! Click OK to play again.', 'green');
        } else {
            showMessage('Correct! Keep going.', 'green', guessResultElement);
            chooseTargetColor();
        }
    } else {
        attempts++;
        updateGameInfo();
        showMessage('Wrong! Try again.', 'red', guessResultElement);
        if (attempts === 2) {
            endGame('Game over! Click OK to play again.', 'red');
        }
    }
}

// Update game info
function updateGameInfo() {
    scoreElement.textContent = `Score: ${score}`;
    attemptsElement.textContent = `Attempts: ${attempts}`;
}

// Show message
function showMessage(text, color, element) {
    element.textContent = text;
    element.style.color = color;
}

// End game
function endGame(text, color) {
    gameOver = true;
    showMessage(text, color, guessResultElement);
    gameBoard.removeEventListener('click', onTileClick);
    gameBoard.removeEventListener('touchstart', onTileClick); // Remove touch event listener
    setTimeout(restartGame, 2000); // Automatically restart game after 2 seconds
}

// Restart game
function restartGame() {
    score = 0;
    attempts = 0;
    gameOver = false;
    updateGameInfo();
    chooseTargetColor();
    showMessage('', '', guessResultElement);
    gameBoard.innerHTML = '';
    createGameTiles();
    gameBoard.addEventListener('click', onTileClick);
    gameBoard.addEventListener('touchstart', onTileClick); // Add touch event listener back for restart
}
